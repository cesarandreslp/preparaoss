/**
 * POST /api/admin/generar-lote
 * Genera preguntas IA para un lote de OPECs sin banco de preguntas.
 * Útil para la carga inicial masiva (3386 OPECs).
 *
 * Query params:
 *   ?batch=50      → cuántas OPECs procesar (default: 50, max: 100)
 *   ?offset=0      → saltar las primeras N OPECs (para paginar manualmente)
 */

import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generarBancoCompleto } from "@/lib/ia-generator";

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const batch = Math.min(parseInt(searchParams.get("batch") ?? "10"), 50);
  const offset = parseInt(searchParams.get("offset") ?? "0");

  try {
    const pendientesTotal = await prisma.opec.count({
      where: { estado: "ACTIVA", preguntas: { none: {} } },
    });

    if (pendientesTotal === 0) {
      return NextResponse.json({ ok: true, mensaje: "Todas las OPECs ya tienen preguntas", pendientes: 0 });
    }

    const opecs = await prisma.opec.findMany({
      where: { estado: "ACTIVA", preguntas: { none: {} } },
      select: { id: true },
      orderBy: { createdAt: "asc" },
      skip: offset,
      take: batch,
    });
    const lote = opecs.map((o) => o.id);
    const generadas: string[] = [];
    const errores: { id: string; error: string }[] = [];

    for (const opecId of lote) {
      try {
        await generarBancoCompleto(opecId);
        generadas.push(opecId);
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        console.error(`[Admin/GenerarLote] Error OPEC ${opecId}:`, msg);
        errores.push({ id: opecId, error: msg });

        // Detener si hay rate limit de Groq
        if (msg.includes("rate_limit") || msg.includes("429")) {
          console.warn("[Admin/GenerarLote] Rate limit Groq, deteniendo lote");
          break;
        }
      }
    }

    return NextResponse.json({
      ok: true,
      pendientesTotal,
      loteDesde: offset,
      loteHasta: offset + lote.length,
      bancosGenerados: generadas.length,
      errores: errores.length,
      detalleErrores: errores,
      // Para llamar el siguiente lote:
      siguienteOffset: offset + generadas.length + errores.length,
    });
  } catch (error) {
    console.error("[Admin/GenerarLote] Error:", error);
    return NextResponse.json({ error: "Error generando lote" }, { status: 500 });
  }
}
