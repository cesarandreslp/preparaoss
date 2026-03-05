/**
 * prisma/seed.ts
 * Datos iniciales: Ligas y Badges
 * Ejecutar con: npx prisma db seed
 */

import { PrismaClient, TipoBadge } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed de la base de datos...");

  // ── LIGAS ──────────────────────────────────────────────
  const ligas = [
    { nivel: 1, nombre: "Bronce",   xpMin: 0,    color: "#cd7f32", emoji: "🥉" },
    { nivel: 2, nombre: "Plata",    xpMin: 200,  color: "#94a3b8", emoji: "🥈" },
    { nivel: 3, nombre: "Oro",      xpMin: 500,  color: "#eab308", emoji: "🥇" },
    { nivel: 4, nombre: "Platino",  xpMin: 1000, color: "#06b6d4", emoji: "💎" },
    { nivel: 5, nombre: "Diamante", xpMin: 2000, color: "#8b5cf6", emoji: "👑" },
  ];

  for (const liga of ligas) {
    await prisma.liga.upsert({
      where: { nivel: liga.nivel },
      update: { ...liga },
      create: { ...liga },
    });
  }
  console.log(`✅ ${ligas.length} ligas creadas/actualizadas`);

  // ── BADGES ─────────────────────────────────────────────
  const badges = [
    { nombre: "Primera Llama",    icono: "🔥", tipo: TipoBadge.RACHA,      umbral: 1,   descripcion: "Completa tu primer día de estudio" },
    { nombre: "7 Días Seguidos",  icono: "🔥", tipo: TipoBadge.RACHA,      umbral: 7,   descripcion: "Mantén la racha 7 días seguidos" },
    { nombre: "Racha de 30",      icono: "🔥", tipo: TipoBadge.RACHA,      umbral: 30,  descripcion: "30 días consecutivos estudiando" },
    { nombre: "Primer Simulacro", icono: "📝", tipo: TipoBadge.SIMULACROS, umbral: 1,   descripcion: "Completa tu primer simulacro" },
    { nombre: "10 Simulacros",    icono: "📚", tipo: TipoBadge.SIMULACROS, umbral: 10,  descripcion: "Completa 10 simulacros" },
    { nombre: "50 Simulacros",    icono: "🏆", tipo: TipoBadge.SIMULACROS, umbral: 50,  descripcion: "Completa 50 simulacros" },
    { nombre: "Puntería",         icono: "🎯", tipo: TipoBadge.PRECISION,  umbral: 80,  descripcion: "Supera el 80% en un simulacro" },
    { nombre: "Perfecto",         icono: "⭐", tipo: TipoBadge.PRECISION,  umbral: 100, descripcion: "Obtén el 100% en un simulacro" },
    { nombre: "Top 3",            icono: "🥇", tipo: TipoBadge.SOCIAL,     umbral: 3,   descripcion: "Llega al top 3 del ranking de una OPEC" },
    { nombre: "Competidor",       icono: "⚔️",  tipo: TipoBadge.SOCIAL,     umbral: 1,   descripcion: "Participa en tu primer desafío 1v1" },
  ];

  for (const badge of badges) {
    await prisma.badge.upsert({
      where: { nombre: badge.nombre },
      update: { ...badge },
      create: { ...badge },
    });
  }
  console.log(`✅ ${badges.length} badges creados/actualizados`);

  console.log("🎉 Seed completado exitosamente");
}

main()
  .catch((e) => {
    console.error("❌ Error durante el seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
