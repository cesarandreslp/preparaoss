import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getLunesDeEstaSemana } from "@/lib/utils";

// GET /api/cron/rankings
// Vercel Cron: "0 0 * * 1" (Lunes 00:00 UTC — reinicio semanal de ligas)
export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const semana = getLunesDeEstaSemana();

  // Recalcular posiciones en rankings de OPECs vigentes (ACTIVA + EN_PRUEBAS).
  // Los usuarios siguen haciendo simulacros aún con la inscripción cerrada.
  const opecs = await prisma.opec.findMany({
    where: { estado: { in: ["ACTIVA", "EN_PRUEBAS"] } },
    select: { id: true },
  });

  let actualizados = 0;

  for (const opec of opecs) {
    const rankings = await prisma.ranking.findMany({
      where: { opecId: opec.id, semana },
      orderBy: { xpSemanal: "desc" },
    });

    // Actualizar posiciones
    for (let i = 0; i < rankings.length; i++) {
      await prisma.ranking.update({
        where: { id: rankings[i].id },
        data: { posicion: i + 1 },
      });
      actualizados++;
    }
  }

  return NextResponse.json({ ok: true, posicionesActualizadas: actualizados });
}
