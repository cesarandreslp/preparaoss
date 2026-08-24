/**
 * Scraper de entidades especiales (Procuraduría, etc.) → OpecEspecial.
 * Corre local (IP Colombia); Vercel bloqueado como con SIMO/CNSC.
 * Recorre las entidades activas. FORCE_SLUG=<slug> fuerza una (para probar).
 *   npx ts-node --transpile-only --project tsconfig.scripts.json scripts/scrape-entidades.ts
 */
import { prisma } from "../src/lib/prisma";
import { scrapeEntidadEspecial } from "../src/lib/entidades-especiales-scraper";

(async () => {
  const force = process.env.FORCE_SLUG;
  const entidades = force
    ? await prisma.entidadEspecial.findMany({ where: { slug: force }, select: { id: true, slug: true } })
    : await prisma.entidadEspecial.findMany({ where: { activo: true }, select: { id: true, slug: true } });

  console.log(`Entidades a scrapear: ${entidades.length}${force ? " (forzada: " + force + ")" : " (activas)"}`);
  for (const e of entidades) {
    try {
      const r = await scrapeEntidadEspecial(e.id);
      console.log(`  ✅ ${e.slug}: ${JSON.stringify(r)}`);
    } catch (err) {
      console.error(`  ❌ ${e.slug}: ${err instanceof Error ? err.message : err}`);
    }
  }
  process.exit(0);
})().catch((e) => { console.error("ERROR:", e instanceof Error ? e.message : e); process.exit(1); });
