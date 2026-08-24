import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { eventoValido, parseReferencia } from "@/lib/wompi";
import { venceTrimestre } from "@/lib/acceso";

// POST /api/pagos/wompi/webhook — Wompi notifica el resultado del pago.
// No lleva auth de usuario: se valida con el checksum de eventos.
export async function POST(request: Request) {
  let body: {
    event?: string;
    data?: { transaction?: { status?: string; reference?: string; amount_in_cents?: number; id?: string } };
    timestamp?: number;
    signature?: { properties?: string[]; checksum?: string };
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  if (!eventoValido(body)) {
    return NextResponse.json({ error: "Firma inválida" }, { status: 401 });
  }

  const tx = body.data?.transaction;
  // Solo nos interesa el pago aprobado. Cualquier otro estado: 200 y seguir
  // (para que Wompi no reintente), sin tocar accesos.
  if (!tx || tx.status !== "APPROVED" || !tx.reference) {
    return NextResponse.json({ ok: true });
  }

  const ref = parseReferencia(tx.reference);
  if (!ref) {
    console.warn("Wompi webhook: referencia no reconocida", tx.reference);
    return NextResponse.json({ ok: true });
  }

  const montoCop = tx.amount_in_cents ? Math.round(tx.amount_in_cents / 100) : null;

  if (ref.tipo === "diario") {
    // Pase diario: UN simulacro válido 24h. Idempotente por referenciaPago.
    const existe = await prisma.paseDiario.findUnique({
      where: { referenciaPago: tx.reference },
      select: { id: true },
    });
    if (!existe) {
      await prisma.paseDiario.create({
        data: {
          userId: ref.userId,
          opecId: ref.opecId,
          referenciaPago: tx.reference,
          montoCop,
          venceAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        },
      });
    }
    return NextResponse.json({ ok: true });
  }

  // Pase trimestral: 3 meses de práctica ilimitada en hasta 3 OPECs. Aquí se
  // crea el pase y se gasta el primer cupo en la OPEC desde la que pagó; los
  // otros dos los elige después en /api/opecs/[id]/usar-pase.
  const yaCreado = await prisma.paseTrimestral.findUnique({
    where: { referenciaPago: tx.reference },
    select: { id: true, venceAt: true },
  });

  // Renovar antes de que venza no debe quitarle los días que le quedan: el
  // trimestre nuevo arranca donde termina el vigente.
  const vigente = await prisma.paseTrimestral.findFirst({
    where: { userId: ref.userId, venceAt: { gte: new Date() } },
    orderBy: { venceAt: "desc" },
    select: { venceAt: true },
  });

  const pase =
    yaCreado ??
    (await prisma.paseTrimestral.create({
      data: {
        userId: ref.userId,
        referenciaPago: tx.reference,
        montoCop,
        venceAt: venceTrimestre(vigente?.venceAt ?? new Date()),
      },
      select: { id: true, venceAt: true },
    }));

  // Upsert: el usuario puede no estar inscrito aún. Idempotente ante reintentos.
  await prisma.userOpec.upsert({
    where: { userId_opecId: { userId: ref.userId, opecId: ref.opecId } },
    create: {
      userId: ref.userId,
      opecId: ref.opecId,
      accesoPagado: true,
      accesoHasta: pase.venceAt,
      paseId: pase.id,
      referenciaPago: tx.reference,
      montoCop,
    },
    update: {
      accesoPagado: true,
      accesoHasta: pase.venceAt,
      paseId: pase.id,
      referenciaPago: tx.reference,
      montoCop,
    },
  });

  return NextResponse.json({ ok: true });
}
