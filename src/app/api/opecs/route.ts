import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const departamento = searchParams.get("departamento");
  const entidad = searchParams.get("entidad");
  const nivel = searchParams.get("nivel");
  const busqueda = searchParams.get("q");
  const pagina = Number(searchParams.get("pagina") ?? 1);
  const porPagina = 20;

  const where: Record<string, unknown> = { estado: "ACTIVA" };
  if (departamento) where.departamento = departamento;
  if (entidad) where.entidad = { contains: entidad, mode: "insensitive" };
  if (nivel) where.nivelJerarquico = { contains: nivel, mode: "insensitive" };
  if (busqueda)
    where.OR = [
      { nombreCargo: { contains: busqueda, mode: "insensitive" } },
      { entidad: { contains: busqueda, mode: "insensitive" } },
      { simoId: { contains: busqueda, mode: "insensitive" } },
      { numerConvocatoria: { contains: busqueda, mode: "insensitive" } },
    ];

  const [opecs, total] = await Promise.all([
    prisma.opec.findMany({
      where,
      select: {
        id: true,
        simoId: true,
        numerConvocatoria: true,
        asignacionBasica: true,
        nombreCargo: true,
        entidad: true,
        nivelJerarquico: true,
        grado: true,
        numVacantes: true,
        municipio: true,
        departamento: true,
        fechaLimiteInscripcion: true,
        fechaExamen: true,
        tipoPruebas: true,
        _count: { select: { preguntas: true, inscripciones: true } },
      },
      orderBy: { fechaLimiteInscripcion: "asc" },
      skip: (pagina - 1) * porPagina,
      take: porPagina,
    }),
    prisma.opec.count({ where }),
  ]);

  return NextResponse.json({
    opecs,
    total,
    pagina,
    totalPaginas: Math.ceil(total / porPagina),
  });
}
