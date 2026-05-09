import { NextResponse } from "next/server";
import { sincronizarConcursosCNSC } from "@/lib/concursos-cnsc-scraper";

// GET /api/cron/concursos-cnsc
// Vercel Cron: diario 7AM Colombia = 12 UTC
// Sincroniza la lista de "concursos en desarrollo" desde cnsc.gov.co
// para alimentar el slider de la landing.
export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const resultado = await sincronizarConcursosCNSC();
    return NextResponse.json({ ok: true, ...resultado });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("[Cron/ConcursosCNSC] Error:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
