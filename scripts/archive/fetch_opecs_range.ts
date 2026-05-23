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
      nivelJerarquico: true,
      competencias: true,
      requisitosEstudio: true,
      municipio: true,
      departamento: true,
    },
    orderBy: { createdAt: "asc" },
    take: 20,
  });

  const start = parseInt(process.argv[2] || "0");
  const end = parseInt(process.argv[3] || "20");

  for (let i = start; i < Math.min(end, opecs.length); i++) {
    console.log(`--- OPEC ${i+1} ---`);
    console.log(JSON.stringify(opecs[i], null, 2));
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
