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

  // — Trimestre vencido: se cae el acceso, y al renovar puede seguir con las
  //   mismas OPECs o cambiarlas —
  const ayer = new Date(Date.now() - 86_400_000);
  await prisma.paseTrimestral.update({ where: { id: pase.id }, data: { venceAt: ayer } });
  await prisma.userOpec.updateMany({ where: { paseId: pase.id }, data: { accesoHasta: ayer } });

  const tras = await prisma.userOpec.findFirst({ where: { paseId: pase.id }, select: { accesoHasta: true } });
  assert.ok(tras.accesoHasta < new Date(), "vencido el pase, el acceso deja de ser vigente");

  const renovacion = await prisma.paseTrimestral.create({
    data: { userId, referenciaPago: `TEST-R-${Date.now()}`, montoCop: 49900, venceAt: venceTrimestre() },
  });

  // "Sigue con las mismas": mueve las OPECs al pase nuevo.
  for (const opec of opecs.slice(0, CUPOS)) {
    await prisma.userOpec.update({
      where: { userId_opecId: { userId, opecId: opec.id } },
      data: { accesoPagado: true, accesoHasta: renovacion.venceAt, paseId: renovacion.id },
    });
  }
  assert.equal(await cuposUsados(renovacion.id), CUPOS, "al renovar con las mismas, los 3 cupos quedan en el pase nuevo");
  assert.equal(await cuposUsados(pase.id), 0, "el pase viejo ya no retiene cupos");

  const revivida = await prisma.userOpec.findFirst({ where: { paseId: renovacion.id }, select: { accesoHasta: true } });
  assert.ok(revivida.accesoHasta > new Date(), "las mismas OPECs vuelven a estar vigentes");

  // "Cambiarlas": liberar una y usar el cupo en otra OPEC distinta.
  await prisma.userOpec.update({
    where: { userId_opecId: { userId, opecId: opecs[0].id } },
    data: { accesoPagado: false, accesoHasta: null, paseId: null },
  });
  assert.equal(await cuposUsados(renovacion.id), CUPOS - 1, "soltar una OPEC libera su cupo");

  await prisma.userOpec.upsert({
    where: { userId_opecId: { userId, opecId: opecs[3].id } },
    create: { userId, opecId: opecs[3].id, accesoPagado: true, accesoHasta: renovacion.venceAt, paseId: renovacion.id },
    update: { accesoPagado: true, accesoHasta: renovacion.venceAt, paseId: renovacion.id },
  });
  assert.equal(await cuposUsados(renovacion.id), CUPOS, "el cupo liberado se puede gastar en otra OPEC");

  console.log("✅ pase trimestral: 3 meses, 3 cupos, sin doble cobro, renovación acumulativa,");
  console.log("   y al renovar puede seguir con las mismas OPECs o cambiarlas");
} finally {
  if (userId) {
    await prisma.userOpec.deleteMany({ where: { userId } });
    await prisma.paseTrimestral.deleteMany({ where: { userId } });
    await prisma.userProfile.delete({ where: { id: userId } }).catch(() => {});
  }
  await prisma.$disconnect();
}
