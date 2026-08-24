/**
 * Backfill de bancos específicos con Groq — corre hasta agotar el free tier.
 * Prioriza por inscritos (getOpecssinPreguntas). Frena solo cuando Groq
 * responde 429 de forma sostenida (cuota diaria agotada) o al llegar a GEN_MAX.
 *
 *   npx ts-node --project tsconfig.scripts.json scripts/generar-lote.ts
 */
import { getOpecssinPreguntas } from "../src/lib/scraper";
import { generarBancoCompleto } from "../src/lib/ia-generator";

const GEN_MAX = Number(process.env.GEN_MAX ?? 400); // techo de seguridad por corrida
const PAUSA_MS = Number(process.env.GEN_PAUSA_MS ?? 5000); // ~12/min, gentil con TPM
const BACKOFF_MS = 60_000;
const MAX_RATE_HITS = 6; // 429 sostenidos → cuota diaria agotada, paramos

async function main() {
  let hechas = 0, errores = 0, rateHits = 0;
  console.log(`Backfill Groq — techo ${GEN_MAX}, pausa ${PAUSA_MS}ms`);

  while (hechas + errores < GEN_MAX) {
    const lote = await getOpecssinPreguntas(20);
    if (lote.length === 0) {
      console.log("✔ No quedan OPECs pendientes.");
      break;
    }
    for (const opecId of lote) {
      if (hechas + errores >= GEN_MAX) break;
      try {
        await generarBancoCompleto(opecId);
        hechas++;
        rateHits = 0; // éxito resetea la racha de rate-limit
        console.log(`✅ ${hechas} bancos | último ${opecId}`);
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        if (/rate.?limit|429|quota|exhaust/i.test(msg)) {
          rateHits++;
          console.warn(`⏳ Rate limit (#${rateHits}) — espero ${BACKOFF_MS / 1000}s`);
          if (rateHits >= MAX_RATE_HITS) {
            console.warn("🛑 Cuota diaria de Groq agotada. Fin.");
            console.log(`\nRESUMEN: ${hechas} bancos, ${errores} errores.`);
            return;
          }
          await new Promise((r) => setTimeout(r, BACKOFF_MS));
          continue; // reintenta la misma OPEC en la próxima vuelta del lote
        }
        errores++;
        console.error(`❌ ${opecId}: ${msg.slice(0, 140)}`);
      }
      await new Promise((r) => setTimeout(r, PAUSA_MS));
    }
  }
  console.log(`\nRESUMEN: ${hechas} bancos generados, ${errores} errores.`);
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });
