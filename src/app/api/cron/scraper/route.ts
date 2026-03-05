import { NextResponse } from "next/server";
import { sincronizarOpecs, getOpecssinPreguntas } from "@/lib/scraper";
import { generarBancoCompleto } from "@/lib/ia-generator";

// GET /api/cron/scraper
// Vercel Cron: "0 11 * * *" (6AM Colombia = 11AM UTC)
export async function GET(request: Request) {
  // Validar que la llamada viene de Vercel Cron o un valor autorizado
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    // 1. Sincronizar OPECs desde SIMO
    const resultado = await sincronizarOpecs();

    // 2. Generar preguntas para OPECs nuevas (hasta 5 por ejecución para no agotar cuota IA)
    const opecsSinPreguntas = await getOpecssinPreguntas();
    const generadas: string[] = [];
    const erroresIA: string[] = [];

    for (const opecId of opecsSinPreguntas.slice(0, 5)) {
      try {
        await generarBancoCompleto(opecId);
        generadas.push(opecId);
      } catch (e) {
        console.error(`[Cron] Error generando preguntas para OPEC ${opecId}:`, e);
        erroresIA.push(opecId);
      }
    }

    return NextResponse.json({
      ok: true,
      scraping: resultado,
      ia: {
        bancosGenerados: generadas.length,
        errores: erroresIA.length,
      },
    });
  } catch (error) {
    console.error("[Cron/Scraper] Error:", error);
    return NextResponse.json({ error: "Error en cron" }, { status: 500 });
  }
}
