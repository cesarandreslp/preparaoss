/**
 * POST /api/admin/opecs/[opecId]/generar-preguntas
 * Genera (o regenera) un nuevo banco de preguntas para una OPEC específica.
 * Si la OPEC tiene documentos parseados, la IA los usará como contexto primario.
 *
 * Body JSON opcional:
 *   { "limpiarPrevias": boolean }  // default false
 *
 * Si limpiarPrevias=true, intenta borrar las preguntas previas antes de generar.
 * Falla con 409 si alguna pregunta previa tiene respuestas de usuarios (FK).
 */

import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generarBancoCompleto } from "@/lib/ia-generator";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ opecId: string }> }
) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const { opecId } = await params;

  const opec = await prisma.opec.findUnique({
    where: { id: opecId },
    select: { id: true, nombreCargo: true, _count: { select: { preguntas: true, documentos: true } } },
  });
  if (!opec) {
    return NextResponse.json({ error: "OPEC no encontrada" }, { status: 404 });
  }

  let limpiarPrevias = false;
  try {
    const body = await req.json();
    limpiarPrevias = !!body?.limpiarPrevias;
  } catch {
    // body opcional, ignorar
  }

  if (limpiarPrevias && opec._count.preguntas > 0) {
    // Verificar que ninguna pregunta tenga respuestas de usuarios (bloqueo FK)
    const preguntasConRespuestas = await prisma.pregunta.count({
      where: { opecId, respuestas: { some: {} } },
    });

    if (preguntasConRespuestas > 0) {
      return NextResponse.json(
        {
          error: "No se pueden eliminar preguntas previas porque hay usuarios que ya las respondieron.",
          preguntasConRespuestas,
          sugerencia: "Genera sin limpiarPrevias para añadir un nuevo banco encima del existente.",
        },
        { status: 409 }
      );
    }

    // Borrar preguntas (cascade limpia opciones) y escenarios huérfanos
    await prisma.pregunta.deleteMany({ where: { opecId } });
    await prisma.escenarioSituacional.deleteMany({ where: { opecId } });
  }

  try {
    const resultado = await generarBancoCompleto(opecId);
    return NextResponse.json({
      success: true,
      opecId,
      cargo: opec.nombreCargo,
      documentosUsados: opec._count.documentos,
      limpiezaPrevia: limpiarPrevias,
      resultado,
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error(`[admin/generar-preguntas] OPEC ${opecId}:`, msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
