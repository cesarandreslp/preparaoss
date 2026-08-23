import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Probador PÚBLICO de OPEC — el gancho top-of-funnel del plan.
// Sirve 5 preguntas YA generadas (cache en DB): costo LLM = 0 por visitante.
// NUNCA dispara generación para anónimos. Si la OPEC aún no tiene preguntas
// específicas, rellena con el pool transversal global (siempre poblado).
const N = 5;

function sanitizar(p: {
  id: string;
  texto: string;
  categoria: string;
  explicacion: string;
  opciones: { letra: string; texto: string; esCorrecta: boolean }[];
}) {
  return {
    id: p.id,
    texto: p.texto,
    categoria: p.categoria,
    explicacion: p.explicacion,
    // El taster revela la correcta al responder (se califica en el cliente).
    // Es un imán de captación, no un examen calificable: fuga aceptable.
    opciones: p.opciones.map((o) => ({
      letra: o.letra,
      texto: o.texto,
      esCorrecta: o.esCorrecta,
    })),
  };
}

const selectPregunta = {
  id: true,
  texto: true,
  categoria: true,
  explicacion: true,
  opciones: { select: { letra: true, texto: true, esCorrecta: true } },
} as const;

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ opecId: string }> }
) {
  const { opecId } = await params;

  const opec = await prisma.opec.findUnique({
    where: { id: opecId },
    select: { id: true, nombreCargo: true, entidad: true, numerConvocatoria: true },
  });
  if (!opec) {
    return NextResponse.json({ error: "OPEC no encontrada" }, { status: 404 });
  }

  // 1) Preguntas específicas del cargo (validadas primero)
  const especificas = await prisma.pregunta.findMany({
    where: { opecId, tipo: "FUNCIONAL_ESPECIFICA", validada: true },
    select: selectPregunta,
    take: N,
    orderBy: { createdAt: "desc" },
  });

  // 2) Relleno con pool transversal global si faltan
  let preguntas = especificas;
  if (preguntas.length < N) {
    const relleno = await prisma.pregunta.findMany({
      where: { poolKey: "TRANSVERSAL_GLOBAL", validada: true },
      select: selectPregunta,
      take: N - preguntas.length,
      orderBy: { createdAt: "desc" },
    });
    preguntas = [...preguntas, ...relleno];
  }

  if (preguntas.length === 0) {
    return NextResponse.json(
      { error: "Aún no hay preguntas listas para esta OPEC. Vuelve pronto." },
      { status: 409 }
    );
  }

  return NextResponse.json({
    opec,
    total: preguntas.length,
    preguntas: preguntas.map(sanitizar),
  });
}
