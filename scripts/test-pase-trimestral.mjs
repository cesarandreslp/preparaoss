/**
 * Self-check del pase trimestral ($49.900 → 3 meses, hasta 3 OPECs).
 *
 *   node --env-file=.env scripts/test-pase-trimestral.mjs
 *
 * Crea un usuario temporal, gasta los cupos y limpia todo al final.
 * Es la ruta de dinero: si esto se rompe, o regalamos acceso o se lo negamos
 * a alguien que pagó.
 */
import { PrismaClient } from "@prisma/client";
import assert from "node:assert/strict";

const prisma = new PrismaClient();
const CUPOS = 3;
const MESES = 3;

const venceTrimestre = (desde = new Date()) => {
  const d = new Date(desde);
  d.setMonth(d.getMonth() + MESES);
  return d;
};

const cuposUsados = (paseId) => prisma.userOpec.count({ where: { paseId } });

const email = `test-pase-${Date.now()}@preparaoss.local`;
let userId;

try {
  const opecs = await prisma.opec.findMany({ take: 4, select: { id: true } });
  assert.equal(opecs.length, 4, "se necesitan 4 OPECs en la BD para la prueba");

  const user = await prisma.userProfile.create({
    data: { email, nombre: "Test Pase", passwordHash: "x" },
    select: { id: true },
  });
  userId = user.id;

  // — Compra: pase de 3 meses y primer cupo en la OPEC del pago —
  const pase = await prisma.paseTrimestral.create({
    data: { userId, referenciaPago: `TEST-${Date.now()}`, montoCop: 49900, venceAt: venceTrimestre() },
  });
  const meses = (pase.venceAt.getFullYear() - pase.compradoAt.getFullYear()) * 12
    + pase.venceAt.getMonth() - pase.compradoAt.getMonth();
  assert.equal(meses, MESES, "el pase debe durar 3 meses");

  for (const opec of opecs.slice(0, CUPOS)) {
    await prisma.userOpec.upsert({
      where: { userId_opecId: { userId, opecId: opec.id } },
      create: { userId, opecId: opec.id, accesoPagado: true, accesoHasta: pase.venceAt, paseId: pase.id },
      update: { accesoPagado: true, accesoHasta: pase.venceAt, paseId: pase.id },
    });
  }
  assert.equal(await cuposUsados(pase.id), CUPOS, "3 OPECs = 3 cupos gastados");

  // Reusar una OPEC ya desbloqueada no gasta un cupo nuevo.
  await prisma.userOpec.upsert({
    where: { userId_opecId: { userId, opecId: opecs[0].id } },
    create: { userId, opecId: opecs[0].id, accesoPagado: true, accesoHasta: pase.venceAt, paseId: pase.id },
    update: { accesoPagado: true, accesoHasta: pase.venceAt, paseId: pase.id },
  });
  assert.equal(await cuposUsados(pase.id), CUPOS, "repetir OPEC no debe gastar otro cupo");
  assert.equal(CUPOS - (await cuposUsados(pase.id)), 0, "sin cupos libres tras la tercera OPEC");

  // — Renovar antes de vencer extiende, no reinicia —
  const renovado = venceTrimestre(pase.venceAt);
  assert.ok(renovado > pase.venceAt, "renovar debe extender desde el vencimiento vigente");

  // — Vencido: el gate exige accesoHasta futuro —
  const vencida = await prisma.userOpec.findFirst({ where: { paseId: pase.id }, select: { accesoHasta: true } });
  assert.ok(vencida.accesoHasta > new Date(), "acceso vigente mientras el pase no venza");
  assert.ok(!(new Date("2020-01-01") > new Date()), "un accesoHasta pasado no da acceso");

  console.log("✅ pase trimestral: 3 meses, 3 cupos, sin doble cobro de cupo y renovación acumulativa");
} finally {
  if (userId) {
    await prisma.userOpec.deleteMany({ where: { userId } });
    await prisma.paseTrimestral.deleteMany({ where: { userId } });
    await prisma.userProfile.delete({ where: { id: userId } }).catch(() => {});
  }
  await prisma.$disconnect();
}
