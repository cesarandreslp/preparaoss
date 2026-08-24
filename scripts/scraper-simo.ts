/**
 * CLI del scraper SIMO — lo corre la tarea programada de Windows
 * (PreparaOSS-Scraper, 6 AM) porque SIMO bloquea la IP de Vercel.
 *
 *   npm run scraper                    → sincroniza todo
 *   npm run scraper:test               → solo 2 páginas (prueba rápida)
 *
 * La lógica vive en src/lib/scraper.ts. Antes este archivo tenía su PROPIA
 * copia del mapeo SIMO→Prisma, que se fue quedando atrás de la del lib (por
 * eso los campos nuevos no se guardaban). Ahora solo invoca al lib.
 */
import { sincronizarOpecs } from "../src/lib/scraper";
import { prisma } from "../src/lib/prisma";

async function main() {
  const args = process.argv.slice(2);
  const i = args.indexOf("--max-pages");
  const maxPages = i >= 0 ? parseInt(args[i + 1], 10) : undefined;

  console.log("╔════════════════════════════════════════╗");
  console.log("║   SCRAPER SIMO-CNSC → PreparaOss DB   ║");
  console.log("╚════════════════════════════════════════╝");
  console.log(`Páginas máximas: ${maxPages ?? "todas"}\n`);

  const r = await sincronizarOpecs(maxPages);

  console.log("\n  📥 Nuevas OPECs importadas:", r.nuevas);
  console.log("  🔄 OPECs actualizadas:     ", r.actualizadas);
  console.log("  ⚠️  Errores individuales:   ", r.errores);
  console.log("  🗄️  Total en DB ahora:      ", await prisma.opec.count());
}

main()
  .then(async () => {
    await prisma.$disconnect();
    process.exit(0);
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
