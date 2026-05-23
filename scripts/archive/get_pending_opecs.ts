import { PrismaClient } from "@prisma/client";
import fs from "fs";

const prisma = new PrismaClient();

async function main() {
  const pendingOpecs = await prisma.opec.findMany({
    where: {
      escenarios: {
        none: {}
      }
    },
    take: 50,
    select: {
      id: true,
      simoId: true,
      nombreCargo: true,
      entidad: true,
      nivelJerarquico: true,
      competencias: true,
      requisitosEstudio: true,
      municipio: true,
      departamento: true
    }
  });

  console.log(`Found ${pendingOpecs.length} pending OPECs.`);
  fs.writeFileSync('next_batch_50.json', JSON.stringify(pendingOpecs, null, 2), 'utf-8');
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
