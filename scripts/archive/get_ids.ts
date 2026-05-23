import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const opecs = await prisma.opec.findMany({
    where: {
      estado: "ACTIVA",
      escenarios: { none: {} },
    },
    select: {
      id: true,
      simoId: true,
      nombreCargo: true,
      entidad: true,
    },
    orderBy: { createdAt: "asc" },
    take: 20,
  });

  console.log(JSON.stringify(opecs, null, 2));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
