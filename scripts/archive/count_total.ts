import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const opecCount = await prisma.opec.count({
    where: {
      escenarios: {
        some: {}
      }
    }
  });

  const scenarioCount = await prisma.escenarioSituacional.count();
  const questionCount = await prisma.pregunta.count();

  console.log(`Total OPECs with scenarios: ${opecCount}`);
  console.log(`Total scenarios: ${scenarioCount}`);
  console.log(`Total questions: ${questionCount}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
