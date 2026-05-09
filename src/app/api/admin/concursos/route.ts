import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const concursos = await prisma.concursoEnDesarrollo.findMany({
    orderBy: [{ visible: "desc" }, { orden: "asc" }, { nombreScraped: "asc" }],
  });

  return NextResponse.json({ total: concursos.length, concursos });
}
