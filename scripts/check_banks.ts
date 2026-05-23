import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const MIN_ESPECIFICA = 30;
const MIN_TRANSVERSAL = 30;
const MIN_COMPORTAMENTAL = 40;

async function main() {
  const transversal = await prisma.pregunta.count({
    where: { poolKey: "TRANSVERSAL_GLOBAL", tipo: "FUNCIONAL_TRANSVERSAL", validada: true },
  });
  console.log(`Transversal global: ${transversal} (umbral ${MIN_TRANSVERSAL}) ${transversal >= MIN_TRANSVERSAL ? "OK" : "FALTA"}`);

  for (let n = 1; n <= 5; n++) {
    const c = await prisma.pregunta.count({
      where: { poolKey: `COMPORT_NIVEL_${n}`, tipo: "COMPORTAMENTAL", validada: true },
    });
    console.log(`Comportamental nivel ${n}: ${c} (umbral ${MIN_COMPORTAMENTAL}) ${c >= MIN_COMPORTAMENTAL ? "OK" : "FALTA"}`);
  }

  const opecs = await prisma.opec.findMany({
    where: { estado: "ACTIVA" },
    select: {
      id: true,
      simoId: true,
      preguntas: {
        where: { tipo: "FUNCIONAL_ESPECIFICA", validada: true },
        select: { id: true },
      },
    },
  });

  let opecsCumplenEspecifica = 0;
  const distribucion: Record<number, number> = {};
  for (const o of opecs) {
    const n = o.preguntas.length;
    distribucion[n] = (distribucion[n] ?? 0) + 1;
    if (n >= MIN_ESPECIFICA) opecsCumplenEspecifica++;
  }

  console.log(`\nOPECs activas: ${opecs.length}`);
  console.log(`OPECs con >= ${MIN_ESPECIFICA} específicas validadas: ${opecsCumplenEspecifica}`);
  console.log(`Faltantes para cumplir mínimo de específicas: ${opecs.length - opecsCumplenEspecifica}`);

  console.log(`\nDistribución de específicas validadas por OPEC:`);
  const sorted = Object.entries(distribucion).sort((a, b) => Number(a[0]) - Number(b[0]));
  for (const [n, count] of sorted) {
    console.log(`  ${n} preg: ${count} OPECs`);
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
