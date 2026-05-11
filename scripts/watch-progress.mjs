/**
 * scripts/watch-progress.mjs
 *
 * Reporta el avance del pipeline de generación de escenarios cada 60s.
 * Útil para correrlo en una terminal aparte mientras se ejecutan las
 * sesiones de Gemini Flash en Antigravity.
 *
 * Uso:
 *   cd c:\Projects\preparaoss
 *   node scripts/watch-progress.mjs
 *
 * Ctrl+C para detener.
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

let prevPendientes = null;
let prevTime = null;

async function snapshot() {
  const [pendientes, hechas, escenariosTotal, preguntasEsp] = await Promise.all([
    prisma.opec.count({ where: { estado: "ACTIVA", escenarios: { none: {} } } }),
    prisma.opec.count({ where: { estado: "ACTIVA", escenarios: { some: {} } } }),
    prisma.escenarioSituacional.count(),
    prisma.pregunta.count({ where: { tipo: "FUNCIONAL_ESPECIFICA" } }),
  ]);

  const now = Date.now();
  const time = new Date().toLocaleTimeString("es-CO", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  const pct = ((hechas / (hechas + pendientes)) * 100).toFixed(1);

  let extra = "";
  if (prevPendientes !== null && prevTime !== null) {
    const procesadas = prevPendientes - pendientes;
    const elapsedMin = (now - prevTime) / 60_000;
    if (procesadas > 0 && elapsedMin > 0) {
      const rate = procesadas / elapsedMin; // OPECs/min
      const horasRestantes = pendientes / rate / 60;
      extra = ` | +${procesadas} en ${elapsedMin.toFixed(1)}min (${rate.toFixed(1)}/min) | ETA ${horasRestantes.toFixed(1)}h`;
    } else if (procesadas === 0) {
      extra = ` | sin cambios en ${elapsedMin.toFixed(1)}min`;
    }
  }

  console.log(
    `[${time}] pendientes=${pendientes} | hechas=${hechas} (${pct}%) | esc=${escenariosTotal} | pregEsp=${preguntasEsp}${extra}`
  );

  prevPendientes = pendientes;
  prevTime = now;
}

console.log("Watcher de avance iniciado. Ctrl+C para detener.\n");
await snapshot();
setInterval(snapshot, 60_000);
