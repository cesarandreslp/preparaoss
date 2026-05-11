/**
 * POST /api/admin/generar-lote
 * Genera preguntas IA para un lote de OPECs sin banco de preguntas.
 * Útil para la carga inicial masiva (3386 OPECs).
 *
 * Query params:
 *   ?batch=50      → cuántas OPECs procesar (default: 50, max: 100)
 *   ?offset=0      → saltar las primeras N OPECs (para paginar manualmente)
 */

import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/require-admin";
import { prisma } from "@/lib/prisma";
import { generarBancoCompleto } from "@/lib/ia-generator";

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  const guard = await requireAdmin();
  if (!guard.ok) return guard.response;

  const { searchParams } = new URL(request.url);
  const batch = Math.min(parseInt(searchParams.get("batch") ?? "10"), 50);
  const offset = parseInt(searchParams.get("offset") ?? "0");

  try {
    // La IA usa el texto completo de funciones (e.competencias del JSON SIMO)
    // como contexto principal del prompt. Si además existe un Document
    // MANUAL_FUNCIONES parseado por el cron parser, se enriquece — pero no
    // bloqueamos generación esperándolo.
    const whereListas = {
      estado: "ACTIVA" as const,
      preguntas: { none: {} },
    };

    const pendientesTotal = await prisma.opec.count({ where: whereListas });

    if (pendientesTotal === 0) {
      return NextResponse.json({
        ok: true,
        mensaje: "Todas las OPECs activas ya tienen preguntas generadas",
        pendientes: 0,
      });
    }

    const opecs = await prisma.opec.findMany({
      where: whereListas,
      select: { id: true },
      orderBy: { createdAt: "asc" },
      skip: offset,
      take: batch,
    });
    const lote = opecs.map((o) => o.id);
    const generadas: string[] = [];
    const errores: { id: string; error: string }[] = [];

    // Vercel mata la función a los 60s y devuelve HTML genérico que rompe el
    // JSON.parse del frontend. Dos defensas:
    //   - Budget global entre iteraciones (rompe el for con margen).
    //   - Timeout por OPEC: si un generarBancoCompleto se cuelga (Zhipu lento)
    //     race contra 45s, throw, y dejamos que el for continúe o rompa.
    const startedAt = Date.now();
    const BUDGET_MS = 50_000;
    const PER_OPEC_TIMEOUT_MS = 45_000;
    let timedOut = false;

    function withTimeout<T>(p: Promise<T>, ms: number, label: string): Promise<T> {
      return new Promise<T>((resolve, reject) => {
        const t = setTimeout(() => reject(new Error(`Timeout: ${label} > ${ms}ms`)), ms);
        p.then((v) => { clearTimeout(t); resolve(v); }, (e) => { clearTimeout(t); reject(e); });
      });
    }

    for (const opecId of lote) {
      if (Date.now() - startedAt > BUDGET_MS) {
        console.warn("[Admin/GenerarLote] Budget de 50s agotado, devolviendo lote parcial");
        timedOut = true;
        break;
      }
      try {
        await withTimeout(
          generarBancoCompleto(opecId),
          PER_OPEC_TIMEOUT_MS,
          `OPEC ${opecId}`
        );
        generadas.push(opecId);
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        console.error(`[Admin/GenerarLote] Error OPEC ${opecId}:`, msg);
        errores.push({ id: opecId, error: msg });

        // Si Groq O Zhipu devolvieron rate-limit, no tiene sentido seguir
        // golpeando: las siguientes OPECs van a fallar igual en milisegundos.
        // Mejor devolvemos parcial y dejamos que auto-mode aplique su backoff.
        const lower = msg.toLowerCase();
        if (
          lower.includes("rate_limit") ||
          lower.includes("rate limit") ||
          lower.includes("429") ||
          msg.includes("速率限制")
        ) {
          console.warn("[Admin/GenerarLote] Rate limit detectado, deteniendo lote");
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
      timedOut,
      // Para llamar el siguiente lote:
      siguienteOffset: offset + generadas.length + errores.length,
    });
  } catch (error) {
    console.error("[Admin/GenerarLote] Error:", error);
    return NextResponse.json({ error: "Error generando lote" }, { status: 500 });
  }
}
