/**
 * POST /api/opecs/[id]/generar-preguntas
 * Genera el banco completo de preguntas para una OPEC usando Groq
 * (llamado manualmente desde el detalle de la OPEC cuando no hay preguntas)
 */

import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generarBancoCompleto } from "@/lib/ia-generator";

interface Params {
  params: Promise<{ id: string }>;
}

export async function POST(req: NextRequest, { params }: Params) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const { id: opecId } = await params;

  const opec = await prisma.opec.findUnique({
    where: { id: opecId },
    select: { id: true, nombreCargo: true, _count: { select: { preguntas: true } } },
  });

  if (!opec) {
    return NextResponse.json({ error: "OPEC no encontrada" }, { status: 404 });
  }

  // Si ya tiene preguntas suficientes, no regenerar
  if (opec._count.preguntas >= 10) {
    return NextResponse.json({
      ok: true,
      mensaje: "Esta OPEC ya tiene preguntas generadas",
      preguntas: opec._count.preguntas,
    });
  }

  try {
    const resultado = await generarBancoCompleto(opecId);
    return NextResponse.json({
      ok: true,
      mensaje: `Banco generado: ${resultado.total} preguntas listas`,
      total: resultado.total,
      escenarios: resultado.escenarios,
      transversales: resultado.transversales,
      comportamentales: resultado.comportamentales,
    });
  } catch (error) {
    console.error("[generar-preguntas] Error:", error);
    return NextResponse.json(
      { error: "Error al generar preguntas con IA. Intenta de nuevo." },
      { status: 500 }
    );
  }
}
