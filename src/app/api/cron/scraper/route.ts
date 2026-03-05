import { NextResponse } from "next/server";
import { sincronizarOpecs } from "@/lib/scraper";

// GET /api/cron/scraper
// Vercel Cron: "0 11 * * *" (6AM Colombia = 11AM UTC)
// Solo sincroniza metadatos de OPECs desde SIMO — la generación IA la maneja /api/cron/ia-generator
export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const resultado = await sincronizarOpecs();
    return NextResponse.json({ ok: true, scraping: resultado });
  } catch (error) {
    console.error("[Cron/Scraper] Error:", error);
    return NextResponse.json({ error: "Error en cron" }, { status: 500 });
  }
}
