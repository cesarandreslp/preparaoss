import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { scrapeEntidadEspecial } from "@/lib/entidades-especiales-scraper";

export const maxDuration = 300;

// GET /api/cron/entidades-especiales
// Vercel Cron: diario, recorre todas las entidades activas y las scrapea.
export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const entidades = await prisma.entidadEspecial.findMany({
    where: { activo: true },
    select: { id: true, slug: true, nombre: true },
  });

  const resultados: Array<{
    slug: string;
    ok: boolean;
    detalle?: unknown;
    error?: string;
  }> = [];

  for (const e of entidades) {
    try {
      const r = await scrapeEntidadEspecial(e.id);
      resultados.push({ slug: e.slug, ok: true, detalle: r });
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`[Cron/EntidadesEspeciales] ${e.slug}:`, msg);
      resultados.push({ slug: e.slug, ok: false, error: msg });
    }
  }

  return NextResponse.json({ ok: true, resultados });
}
