import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const count = await prisma.opec.count({
    where: {
      estado: "ACTIVA",
      escenarios: { none: {} },
    },
  });
  console.log(`Total OPECs sin escenarios: ${count}`);

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
      nivelJerarquico: true,
      competencias: true,
      requisitosEstudio: true,
      municipio: true,
      departamento: true,
    },
    orderBy: { createdAt: "asc" },
    take: 20,
  });

  console.log("OPECs encontradas:");
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
