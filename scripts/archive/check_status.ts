import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const simoIds = [
    "241088", "241798", "247446", "240955", "242617", 
    "240166", "227878", "238272", "235454", "241409",
    "240580", "241784", "241812", "245356", "243205",
    "240585", "243348", "241158", "243208", "243203"
  ];
  for (const id of simoIds) {
    const opec = await prisma.opec.findFirst({
      where: { simoId: id },
      include: { _count: { select: { escenarios: true } } }
    });
    console.log(`OPEC ${id}: ${opec ? opec._count.escenarios : 'NO ENCONTRADA'} escenarios`);
  }
}

main().finally(() => prisma.$disconnect());
