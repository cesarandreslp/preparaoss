import { NextResponse } from "next/server";
import { getOpecssinPreguntas } from "@/lib/scraper";
import { generarBancoCompleto } from "@/lib/ia-generator";

// GET /api/cron/ia-generator
// Vercel Cron: "0 12 * * *" (7AM Colombia = 12PM UTC, diario)
// Genera preguntas para 50 OPECs por día → ~68 días para cubrir 3386 OPECs
// Para generación masiva manual usa: POST /api/admin/generar-lote
export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const BATCH = 50;

  try {
    const opecsSinPreguntas = await getOpecssinPreguntas();
    const pendientes = opecsSinPreguntas.length;

    if (pendientes === 0) {
      return NextResponse.json({ ok: true, mensaje: "Todas las OPECs tienen preguntas", pendientes: 0 });
    }

    const lote = opecsSinPreguntas.slice(0, BATCH);
    const generadas: string[] = [];
    const errores: { id: string; error: string }[] = [];

    for (const opecId of lote) {
      try {
        await generarBancoCompleto(opecId);
        generadas.push(opecId);
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        console.error(`[Cron/IA] Error OPEC ${opecId}:`, msg);
        errores.push({ id: opecId, error: msg });

        // Si el error es rate limit de Groq, detener el lote para no acumular errores
        if (msg.includes("rate_limit") || msg.includes("429")) {
          console.warn("[Cron/IA] Rate limit alcanzado, deteniendo lote");
          break;
        }
      }
    }

    return NextResponse.json({
      ok: true,
      pendientesAntes: pendientes,
      pendientesDespues: pendientes - generadas.length,
      bancosGenerados: generadas.length,
      errores: errores.length,
      detalleErrores: errores,
    });
  } catch (error) {
    console.error("[Cron/IA] Error general:", error);
    return NextResponse.json({ error: "Error en cron IA" }, { status: 500 });
  }
}
