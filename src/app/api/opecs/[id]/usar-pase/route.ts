import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { CUPOS_PASE, paseTrimestralActivo } from "@/lib/acceso";

// POST /api/opecs/[id]/usar-pase — gasta uno de los cupos del pase trimestral
// en esta OPEC. El pase da 3 meses en hasta 3 OPECs; la del pago ya consumió
// el primero, estos son los otros dos.
export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const { id: opecId } = await params;

  const opec = await prisma.opec.findUnique({ where: { id: opecId }, select: { id: true } });
  if (!opec) return NextResponse.json({ error: "OPEC no encontrada" }, { status: 404 });

  const pase = await paseTrimestralActivo(userId);
  if (!pase) {
    return NextResponse.json(
      { error: "No tienes un pase trimestral vigente." },
      { status: 403 }
    );
  }

  // Si esta OPEC ya está desbloqueada con este pase, no gasta otro cupo.
  const actual = await prisma.userOpec.findUnique({
    where: { userId_opecId: { userId, opecId } },
    select: { paseId: true, accesoPagado: true },
  });
  const yaUsada = actual?.accesoPagado && actual.paseId === pase.id;

  if (!yaUsada && pase.disponibles <= 0) {
    return NextResponse.json(
      {
        error: `Tu pase ya cubre ${CUPOS_PASE} OPECs. Compra otro pase para desbloquear más.`,
        cupos: { usados: pase.usados, disponibles: 0 },
      },
      { status: 409 }
    );
  }

  // ponytail: sin transacción ni lock. Dos clics simultáneos podrían gastar un
  // cupo de más; con un usuario por pase no compensa. Si algún día importa,
  // envolver en $transaction con SELECT ... FOR UPDATE sobre el pase.
  await prisma.userOpec.upsert({
    where: { userId_opecId: { userId, opecId } },
    create: {
      userId,
      opecId,
      accesoPagado: true,
      accesoHasta: pase.venceAt,
      paseId: pase.id,
    },
    update: { accesoPagado: true, accesoHasta: pase.venceAt, paseId: pase.id },
  });

  const despues = await paseTrimestralActivo(userId);
  return NextResponse.json({
    ok: true,
    venceAt: pase.venceAt,
    cupos: { usados: despues?.usados ?? 0, disponibles: despues?.disponibles ?? 0 },
  });
}
