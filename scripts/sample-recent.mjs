/**
 * scripts/sample-recent.mjs
 *
 * Saca 3 escenarios random de los últimos 200 creados, con sus preguntas,
 * opciones y explicaciones. Sirve para verificar la calidad de lo que está
 * generando Gemini Flash sin tener que pedírselo a él (que solo muestra
 * uno y siempre el mismo de la sesión más reciente).
 *
 * Uso:
 *   node scripts/sample-recent.mjs        → 3 muestras
 *   node scripts/sample-recent.mjs 5      → 5 muestras
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const N = parseInt(process.argv[2] ?? "3", 10);

const pool = await prisma.escenarioSituacional.findMany({
  take: 200,
  orderBy: { createdAt: "desc" },
  include: {
    opec: { select: { simoId: true, nombreCargo: true, entidad: true } },
    preguntas: {
      include: { opciones: { orderBy: { letra: "asc" } } },
      orderBy: { createdAt: "asc" },
    },
  },
});

if (pool.length === 0) {
  console.log("No hay escenarios todavía.");
  process.exit(0);
}

const muestras = pool.sort(() => Math.random() - 0.5).slice(0, Math.min(N, pool.length));

console.log(`\n=== ${muestras.length} escenarios random de los últimos ${pool.length} ===\n`);

for (let i = 0; i < muestras.length; i++) {
  const e = muestras[i];
  const fechaCreacion = new Date(e.createdAt).toLocaleString("es-CO");

  console.log("─".repeat(80));
  console.log(`MUESTRA ${i + 1}/${muestras.length}  (creado: ${fechaCreacion})`);
  console.log(`OPEC ${e.opec.simoId} · ${e.opec.nombreCargo}`);
  console.log(`Entidad: ${e.opec.entidad}`);
  const cat = e.preguntas[0]?.categoria ?? "-";
  const dif = e.preguntas[0]?.dificultad ?? "-";
  console.log(`Categoría: ${cat}  |  Dificultad: ${dif}`);
  console.log(`\nESCENARIO (${e.contenido.length} chars):`);
  // Indent the scenario text for readability
  console.log("  " + e.contenido.replace(/\n/g, "\n  "));
  console.log("\nPREGUNTAS:");
  for (let pi = 0; pi < e.preguntas.length; pi++) {
    const p = e.preguntas[pi];
    console.log(`\n  ${pi + 1}. ${p.texto}`);
    for (const o of p.opciones) {
      const marca = o.esCorrecta ? "  ✓" : "   ";
      console.log(`     ${marca} ${o.letra}) ${o.texto}`);
    }
    console.log(`     [Explicación] ${p.explicacion}`);
  }
  console.log("");
}

console.log("─".repeat(80));
await prisma.$disconnect();
