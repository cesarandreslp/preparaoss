import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { getLunesDeEstaSemana } from "@/lib/utils";

// GET /api/ranking?opecId=xxx
export async function GET(request: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const opecId = searchParams.get("opecId");

  if (!opecId) {
    return NextResponse.json({ error: "opecId requerido" }, { status: 400 });
  }

  const semana = getLunesDeEstaSemana();

  const [rankings, miRanking] = await Promise.all([
    prisma.ranking.findMany({
      where: { opecId, semana },
      orderBy: { xpSemanal: "desc" },
      take: 50,
      include: {
        user: { select: { nombre: true, nivel: true } },
      },
    }),
    prisma.ranking.findUnique({
      where: { userId_opecId_semana: { userId, opecId, semana } },
    }),
  ]);

  return NextResponse.json({
    rankings: rankings.map((r, i) => ({
      posicion: i + 1,
      userId: r.userId,
      nombre: r.user.nombre,
      nivel: r.user.nivel,
      xpSemanal: r.xpSemanal,
      xpTotal: r.xpTotal,
      esTuyo: r.userId === userId,
    })),
    miPosicion: miRanking
      ? rankings.findIndex((r) => r.userId === userId) + 1
      : null,
    semana,
  });
}
