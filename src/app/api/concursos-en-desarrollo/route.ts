import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const items = await prisma.concursoEnDesarrollo.findMany({
    where: { visible: true },
    orderBy: [{ orden: "asc" }, { nombreScraped: "asc" }],
    select: {
      id: true,
      slug: true,
      nombreScraped: true,
      nombreOverride: true,
      linkCnsc: true,
      imagenCustomUrl: true,
    },
  });

  const concursos = items.map((c) => ({
    slug: c.slug,
    nombre: c.nombreOverride ?? c.nombreScraped,
    linkCnsc: c.linkCnsc,
    imagen: c.imagenCustomUrl ?? `/api/concurso-poster/${c.slug}`,
  }));

  return NextResponse.json(
    { total: concursos.length, concursos },
    {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600",
      },
    }
  );
}
