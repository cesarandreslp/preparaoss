/**
 * scripts/snapshot.mjs
 *
 * Snapshot puntual del avance — corre una sola vez y sale.
 * Igual a watch-progress.mjs pero sin loop.
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const [pendientes, hechas, escenariosTotal, preguntasEsp, ultimoEscenario] =
  await Promise.all([
    prisma.opec.count({ where: { estado: "ACTIVA", escenarios: { none: {} } } }),
    prisma.opec.count({ where: { estado: "ACTIVA", escenarios: { some: {} } } }),
    prisma.escenarioSituacional.count(),
    prisma.pregunta.count({ where: { tipo: "FUNCIONAL_ESPECIFICA" } }),
    prisma.escenarioSituacional.findFirst({
      orderBy: { createdAt: "desc" },
      select: { createdAt: true },
    }),
  ]);

const total = hechas + pendientes;
const pct = ((hechas / total) * 100).toFixed(1);
const ultimo = ultimoEscenario
  ? new Date(ultimoEscenario.createdAt).toLocaleString("es-CO")
  : "ninguno";

console.log(`\n=== Avance pipeline OPECs ===`);
console.log(`  pendientes:  ${pendientes}`);
console.log(`  hechas:      ${hechas} (${pct}%)`);
console.log(`  total ACTIVA: ${total}`);
console.log(`  escenarios:  ${escenariosTotal}`);
console.log(`  preguntas:   ${preguntasEsp}`);
console.log(`  último esc:  ${ultimo}\n`);

await prisma.$disconnect();
