/**
 * One-shot: marca las preguntas FUNCIONAL_ESPECIFICA ya existentes como
 * validada=true para que cuenten en el gate del simulacro.
 *
 * Se decidió no re-revisar contenido (opción 1): se asume buena calidad y
 * el script de generación masiva solo COMPLETARÁ hasta 30 por OPEC.
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.pregunta.updateMany({
    where: { tipo: "FUNCIONAL_ESPECIFICA", validada: false },
    data: { validada: true },
  });
  console.log(`Marcadas como validadas: ${result.count} preguntas FUNCIONAL_ESPECIFICA`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
