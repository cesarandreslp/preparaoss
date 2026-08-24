/**
 * Backfill PARALELO de bancos con varios proveedores a la vez.
 * Un worker por proveedor; cada uno toma OPECs DISTINTAS de una cola
 * compartida (JS es single-thread: shift() no se pisa entre workers).
 *
 *   GEN_PROVIDERS=gemini,groq,zhipu npx ts-node --transpile-only \
 *     --project tsconfig.scripts.json scripts/generar-paralelo.ts
 *
 * Mistral se agrega poniendo un MODELO GENERAL en MISTRAL_MODEL (NO Leanstral,
 * que es de teoremas Lean 4) y añadiéndolo a GEN_PROVIDERS.
 */
import { getOpecssinPreguntas } from "../src/lib/scraper";
import { generarBancoCompleto } from "../src/lib/ia-generator";
import type { Provider } from "../src/lib/llm";

const PROVIDERS = (process.env.GEN_PROVIDERS ?? "gemini,groq,zhipu")
  .split(",").map((s) => s.trim()).filter(Boolean) as Provider[];
const GEN_MAX = Number(process.env.GEN_MAX ?? 3000);
const PAUSA_MS = Number(process.env.GEN_PAUSA_MS ?? 4000);
const BACKOFF_MS = 60_000;
const MAX_RATE_HITS = 6;

const queue: string[] = [];
const seen = new Set<string>();
let hechas = 0, errores = 0, agotado = false, refilling = false;

async function refill(): Promise<void> {
  if (agotado || refilling) return;
  refilling = true;
  try {
    const lote = await getOpecssinPreguntas(200);
    const nuevos = lote.filter((id) => !seen.has(id));
    for (const id of nuevos) { seen.add(id); queue.push(id); }
    if (nuevos.length === 0) agotado = true;
  } finally {
    refilling = false;
  }
}

async function worker(provider: Provider): Promise<void> {
  let rateHits = 0;
  while (hechas + errores < GEN_MAX) {
    if (queue.length === 0) {
      await refill();
      if (queue.length === 0) return; // nada más pendiente
    }
    const opecId = queue.shift();
    if (!opecId) continue;
    try {
      await generarBancoCompleto(opecId, provider);
      hechas++; rateHits = 0;
      console.log(`✅ [${provider}] ${hechas} bancos | ${opecId}`);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      if (/rate.?limit|429|quota|exhaust/i.test(msg)) {
        rateHits++;
        queue.unshift(opecId); // devolver para que otro worker la tome
        if (rateHits >= MAX_RATE_HITS) {
          console.warn(`🛑 [${provider}] cuota diaria agotada — worker termina`);
          return;
        }
        console.warn(`⏳ [${provider}] rate-limit #${rateHits} — espero ${BACKOFF_MS / 1000}s`);
        await new Promise((r) => setTimeout(r, BACKOFF_MS));
        continue;
      }
      errores++;
      console.error(`❌ [${provider}] ${opecId}: ${msg.slice(0, 120)}`);
    }
    await new Promise((r) => setTimeout(r, PAUSA_MS));
  }
}

async function main() {
  console.log(`Backfill PARALELO — proveedores: ${PROVIDERS.join(", ")} | techo ${GEN_MAX}`);
  await refill();
  await Promise.all(PROVIDERS.map((p) => worker(p)));
  console.log(`\nRESUMEN: ${hechas} bancos generados, ${errores} errores.`);
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });
