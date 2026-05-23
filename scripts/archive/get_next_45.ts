import { PrismaClient } from "@prisma/client";
import fs from "fs";

const prisma = new PrismaClient();

async function main() {
  const opecs = await prisma.opec.findMany({
    where: {
      estado: "ACTIVA",
      escenarios: { none: {} },
    },
    take: 45,
    orderBy: { createdAt: "asc" },
  });

  fs.writeFileSync("next_45_opecs.json", JSON.stringify(opecs, null, 2));
  console.log(`Saved ${opecs.length} OPECs to next_45_opecs.json`);
}

main().finally(() => prisma.$disconnect());
