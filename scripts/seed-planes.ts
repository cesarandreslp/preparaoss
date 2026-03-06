/**
 * Seed inicial de PlanConfig
 * npx ts-node --project tsconfig.scripts.json scripts/seed-planes.ts
 */
import { PrismaClient, PlanSuscripcion } from "@prisma/client";

const prisma = new PrismaClient();

const planes = [
  {
    plan: PlanSuscripcion.GRATUITO,
    nombre: "Gratuito",
    descripcion: "Empieza a prepararte sin costo",
    precioMensualCOP: 0,
    simulacrosMes: 3,
    preguntasPorSimulacro: 10,
    features: [
      "3 simulacros por mes",
      "10 preguntas por simulacro",
      "Acceso a OPECs activas",
      "Resultados básicos",
    ],
    color: "#6b7280",
    emoji: "🆓",
    activo: true,
  },
  {
    plan: PlanSuscripcion.BASICO,
    nombre: "Básico",
    descripcion: "Para quienes se preparan con constancia",
    precioMensualCOP: 19900,
    simulacrosMes: 10,
    preguntasPorSimulacro: 20,
    features: [
      "10 simulacros por mes",
      "20 preguntas por simulacro",
      "Todas las OPECs disponibles",
      "Estadísticas detalladas",
      "Racha y gamificación completa",
    ],
    color: "#2563eb",
    emoji: "⚡",
    activo: true,
  },
  {
    plan: PlanSuscripcion.PRO,
    nombre: "Pro",
    descripcion: "Preparación seria con simulacros ilimitados",
    precioMensualCOP: 39900,
    simulacrosMes: -1,
    preguntasPorSimulacro: 40,
    features: [
      "Simulacros ilimitados",
      "40 preguntas por simulacro",
      "Modo desafío entre usuarios",
      "Análisis de debilidades por categoría",
      "Acceso prioritario a nuevas OPECs",
      "Ligas y ranking semanal",
    ],
    color: "#7c3aed",
    emoji: "🚀",
    activo: true,
  },
  {
    plan: PlanSuscripcion.PREMIUM,
    nombre: "Premium",
    descripcion: "La experiencia completa para ganar la convocatoria",
    precioMensualCOP: 69900,
    simulacrosMes: -1,
    preguntasPorSimulacro: 40,
    features: [
      "Todo lo de Pro",
      "Simulacros históricos oficiales CNSC",
      "Retroalimentación IA personalizada",
      "Plan de estudio adaptativo",
      "Soporte prioritario",
      "Certificado de preparación",
    ],
    color: "#b45309",
    emoji: "💎",
    activo: true,
  },
];

async function main() {
  console.log("Seeding PlanConfig...");
  for (const plan of planes) {
    await prisma.planConfig.upsert({
      where: { plan: plan.plan },
      update: plan,
      create: plan,
    });
    console.log(`✅ ${plan.emoji} ${plan.nombre} (${plan.precioMensualCOP === 0 ? "gratis" : `$${plan.precioMensualCOP.toLocaleString("es-CO")} COP/mes`})`);
  }
  console.log("Done.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
