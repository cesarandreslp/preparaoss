import { PrismaClient } from '@prisma/client';
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
  if (opecs.length === 0) {
    console.log("TODAS_TIENEN");
  } else {
    console.log(JSON.stringify(opecs));
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
