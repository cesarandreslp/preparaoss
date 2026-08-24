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
import {
  generarBancoCompleto,
  generarLotePoolTransversal,
  generarLotePoolComportamental,
} from "../src/lib/ia-generator";
import { prisma } from "../src/lib/prisma";
import type { Provider } from "../src/lib/llm";

const PROVIDERS = (process.env.GEN_PROVIDERS ?? "gemini,groq,zhipu")
  .split(",").map((s) => s.trim()).filter(Boolean) as Provider[];
const GEN_MAX = Number(process.env.GEN_MAX ?? 3000);
const PAUSA_MS = Number(process.env.GEN_PAUSA_MS ?? 4000);
const BACKOFF_MS = 60_000;
const MAX_RATE_HITS = 6;

// Pools globales (transversal + comportamental por nivel): son el 70% de un
// simulacro pagado. Si no crecen, el que compró "práctica ilimitada" ve las
// mismas preguntas desde el segundo intento.
const POOL_OBJETIVO = Number(process.env.POOL_OBJETIVO ?? 300);
const POOL_LOTES = Number(process.env.POOL_LOTES ?? 6); // techo por pool y corrida
const POOL_LOTE = 10; // preguntas por llamada al LLM

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

async function topUpPools(): Promise<void> {
  // Solo los niveles que de verdad tienen OPECs (hoy 2, 3 y 4): generar para
  // niveles vacíos fue lo que dejó 100 preguntas sin dueño.
  const niveles = (
    await prisma.opec.groupBy({ by: ["nivelResponsabilidad"] })
  ).map((n) => n.nivelResponsabilidad);

  const pools = [
    { key: "TRANSVERSAL_GLOBAL", generar: (n: number) => generarLotePoolTransversal(n) },
    ...niveles.map((nivel) => ({
      key: `COMPORT_NIVEL_${nivel}`,
      generar: (n: number) => generarLotePoolComportamental(nivel, n),
    })),
  ];

  for (const pool of pools) {
    let actual = await prisma.pregunta.count({
      where: { poolKey: pool.key, validada: true },
    });
    for (let i = 0; i < POOL_LOTES && actual < POOL_OBJETIVO; i++) {
      try {
        const n = await pool.generar(Math.min(POOL_LOTE, POOL_OBJETIVO - actual));
        actual += n;
        console.log(`🧩 [pool] ${pool.key}: +${n} → ${actual}/${POOL_OBJETIVO}`);
        // 0 nuevas = el LLM solo devolvió repetidas; insistir hoy es quemar cuota.
        if (n === 0) break;
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        console.error(`❌ [pool] ${pool.key}: ${msg.slice(0, 120)}`);
        break;
      }
      await new Promise((r) => setTimeout(r, PAUSA_MS));
    }
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
  await topUpPools();
  await refill();
  await Promise.all(PROVIDERS.map((p) => worker(p)));
  console.log(`\nRESUMEN: ${hechas} bancos generados, ${errores} errores.`);
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });
