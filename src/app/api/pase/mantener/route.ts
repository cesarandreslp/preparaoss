import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { CUPOS_PASE, paseTrimestralActivo } from "@/lib/acceso";

const bodySchema = z.object({
  opecIds: z.array(z.string().min(1)).min(1).max(CUPOS_PASE),
});

// POST /api/pase/mantener — gasta cupos del pase vigente en varias OPECs de una
// sola vez. Es el "sigue con las mismas" al renovar: el usuario no tiene que
// entrar a cada OPEC a reactivarla.
export async function POST(req: Request) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const parsed = bodySchema.safeParse(await req.json().catch(() => ({})));
  if (!parsed.success) {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }

  const pase = await paseTrimestralActivo(userId);
  if (!pase) {
    return NextResponse.json(
      { error: "No tienes un pase trimestral vigente." },
      { status: 403 }
    );
  }

  // Las que ya están en este pase no gastan cupo; solo cuentan las nuevas.
  const yaEnPase = new Set(
    (
      await prisma.userOpec.findMany({
        where: { userId, paseId: pase.id },
        select: { opecId: true },
      })
    ).map((u) => u.opecId)
  );

  const opecIds = [...new Set(parsed.data.opecIds)];
  const existentes = await prisma.opec.findMany({
    where: { id: { in: opecIds } },
    select: { id: true },
  });
  const validas = existentes.map((o) => o.id);

  const nuevas = validas.filter((id) => !yaEnPase.has(id));
  if (nuevas.length > pase.disponibles) {
    return NextResponse.json(
      {
        error: `Te quedan ${pase.disponibles} cupos y pediste ${nuevas.length}. Elige menos OPECs.`,
        cupos: { usados: pase.usados, disponibles: pase.disponibles },
      },
      { status: 409 }
    );
  }

  // ponytail: secuencial y sin lock, igual que usar-pase. Son 3 filas como
  // máximo; si algún día hay concurrencia real, envolver en $transaction.
  for (const opecId of validas) {
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
  }

  const despues = await paseTrimestralActivo(userId);
  return NextResponse.json({
    ok: true,
    mantenidas: validas.length,
    venceAt: pase.venceAt.toISOString(),
    cupos: { usados: despues?.usados ?? 0, disponibles: despues?.disponibles ?? 0 },
  });
}
