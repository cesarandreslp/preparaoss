import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const opecs = await prisma.opec.findMany({
    where: { estado: "ACTIVA" },
    select: {
      id: true,
      simoId: true,
      nombreCargo: true,
      _count: { select: { preguntas: true } },
    },
  });

  const total = opecs.length;
  const con10 = opecs.filter((o) => o._count.preguntas >= 10).length;
  const con1 = opecs.filter((o) => o._count.preguntas >= 1 && o._count.preguntas < 10).length;
  const con0 = opecs.filter((o) => o._count.preguntas === 0).length;

  console.log(`Total OPECs ACTIVAS: ${total}`);
  console.log(`Con >=10 preguntas (muestran simulacro): ${con10}`);
  console.log(`Con 1-9 preguntas (NO muestran simulacro): ${con1}`);
  console.log(`Con 0 preguntas: ${con0}`);

  const lacking = opecs.filter((o) => o._count.preguntas < 10);
  console.log(`\nPrimeras 20 OPECs sin simulacro disponible:`);
  for (const o of lacking.slice(0, 20)) {
    console.log(`  [${o._count.preguntas} preg] ${o.simoId} - ${o.nombreCargo}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => prisma.$disconnect());
