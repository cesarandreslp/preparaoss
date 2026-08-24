/**
 * Scraper de "concursos en desarrollo" de CNSC → alimenta el carrusel de la landing.
 * Se corre local (IP Colombia); Vercel tiene bloqueada la IP como con SIMO.
 *   npx ts-node --transpile-only --project tsconfig.scripts.json scripts/scrape-cnsc.ts
 */
import { sincronizarConcursosCNSC } from "../src/lib/concursos-cnsc-scraper";

(async () => {
  console.log("Sincronizando concursos en desarrollo (CNSC)…");
  const r = await sincronizarConcursosCNSC();
  console.log("Resultado:", JSON.stringify(r));
  process.exit(0);
})().catch((e) => {
  console.error("ERROR:", e instanceof Error ? e.message : e);
  process.exit(1);
});
