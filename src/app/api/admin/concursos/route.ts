import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/require-admin";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const guard = await requireAdmin();
  if (!guard.ok) return guard.response;

  const concursos = await prisma.concursoEnDesarrollo.findMany({
    orderBy: [{ visible: "desc" }, { orden: "asc" }, { nombreScraped: "asc" }],
  });

  return NextResponse.json({ total: concursos.length, concursos });
}
