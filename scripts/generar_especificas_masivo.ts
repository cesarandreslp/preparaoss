/**
 * Generación masiva de preguntas FUNCIONAL_ESPECIFICA.
 *
 * Objetivo: cada OPEC ACTIVA debe quedar con >= 30 preguntas específicas
 * validadas (= 10 escenarios × 3 preguntas).
 *
 * Reglas operativas (decisiones del usuario):
 *  - Prioridad: OPECs con más inscripciones primero.
 *  - Idempotente: solo genera lo que falta para llegar al umbral.
 *  - Solo Gemini Flash (vía wrapper llmJson, pero cualquier fallback a
 *    Groq/Zhipu se considera FALLA y detiene el proceso → el wrapper hace
 *    fallback automático; aquí lo detectamos por el campo `provider`).
 *  - Resume seguro: cada escenario es una unidad atómica; si se cae a mitad
 *    de OPEC, la siguiente corrida retoma desde donde quedó.
 *
 * Uso:
 *   npx tsx scripts/generar_especificas_masivo.ts            # corre indefinido hasta terminar o fallar
 *   npx tsx scripts/generar_especificas_masivo.ts --limit 50 # procesa solo 50 OPECs
 */
import { PrismaClient } from "@prisma/client";
import { generarPreguntasFuncionalEspecifica } from "../src/lib/ia-generator";

const prisma = new PrismaClient();

const OBJETIVO_PREGUNTAS = 30;       // preguntas específicas por OPEC
const PREGUNTAS_POR_ESCENARIO = 3;
const OBJETIVO_ESCENARIOS = OBJETIVO_PREGUNTAS / PREGUNTAS_POR_ESCENARIO; // 10

function arg(flag: string, fallback?: string): string | undefined {
  const i = process.argv.indexOf(flag);
  return i >= 0 ? process.argv[i + 1] : fallback;
}

async function main() {
  const limite = Number(arg("--limit", "0")) || Infinity;

  // OPECs ordenadas por inscripciones desc, con el conteo actual de
  // específicas validadas para calcular cuántas faltan.
  const opecs = await prisma.opec.findMany({
    where: { estado: "ACTIVA" },
    select: {
      id: true,
      simoId: true,
      nombreCargo: true,
      _count: {
        select: {
          inscripciones: true,
          preguntas: { where: { tipo: "FUNCIONAL_ESPECIFICA", validada: true } },
        },
      },
    },
  });

  const pendientes = opecs
    .filter((o) => o._count.preguntas < OBJETIVO_PREGUNTAS)
    .sort((a, b) => b._count.inscripciones - a._count.inscripciones);

  console.log(`Total OPECs activas: ${opecs.length}`);
  console.log(`Pendientes (< ${OBJETIVO_PREGUNTAS} específicas): ${pendientes.length}`);
  console.log(`Procesaré: ${Math.min(pendientes.length, limite)}\n`);

  let okOpecs = 0;
  let okEscenarios = 0;
  let tInicio = Date.now();

  for (let i = 0; i < pendientes.length && i < limite; i++) {
    const o = pendientes[i];
    const faltan = OBJETIVO_PREGUNTAS - o._count.preguntas;
    const escenariosFaltantes = Math.ceil(faltan / PREGUNTAS_POR_ESCENARIO);

    process.stdout.write(
      `[${i + 1}/${Math.min(pendientes.length, limite)}] OPEC ${o.simoId} (${o.nombreCargo.slice(0, 50)}) — generar ${escenariosFaltantes} escenarios... `
    );

    try {
      // El generador inserta directo en BD (escenario + 3 preg + opciones).
      // Las iteraciones internas son paralelas; aquí entre OPECs es serial.
      await generarPreguntasFuncionalEspecifica(o.id, escenariosFaltantes);
      okOpecs++;
      okEscenarios += escenariosFaltantes;
      const elapsed = ((Date.now() - tInicio) / 1000).toFixed(0);
      console.log(`OK (acum ${okOpecs} OPECs, ${okEscenarios} esc, ${elapsed}s)`);
    } catch (err) {
      console.log("\n");
      console.error(`❌ Falló en OPEC ${o.simoId}:`, err instanceof Error ? err.message : err);
      console.error("Deteniendo proceso. Re-ejecuta el script para reanudar desde el punto actual.");
      break;
    }
  }

  console.log(`\nResumen:`);
  console.log(`  OPECs procesadas: ${okOpecs}`);
  console.log(`  Escenarios generados: ${okEscenarios}`);
  console.log(`  Tiempo: ${((Date.now() - tInicio) / 1000).toFixed(0)}s`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
