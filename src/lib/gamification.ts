/**
 * gamification.ts
 * Lógica de XP, streaks, niveles y badges de PreparaOss
 */

import { prisma } from "./prisma";
import { getMesActual } from "./utils";

// ─────────────────────────────────────────────────
// CONSTANTES DE XP
// ─────────────────────────────────────────────────

export const XP_CONFIG = {
  PREGUNTA_CORRECTA: 10,
  PREGUNTA_INCORRECTA: 2,        // XP de consolación
  SIMULACRO_COMPLETADO: 30,
  PERFECTO_100: 100,             // Bonus por simulacro perfecto
  RACHA_BONUS_DIA: 5,            // XP extra por mantener la racha
  PRIMER_SIMULACRO_OPEC: 20,     // Primera vez en una OPEC
} as const;

// ─────────────────────────────────────────────────
// NIVELES
// ─────────────────────────────────────────────────

export const NIVELES = [
  { nivel: 1, nombre: "Principiante", xpMin: 0,    xpMax: 499,  color: "#94a3b8" },
  { nivel: 2, nombre: "Aspirante",    xpMin: 500,  xpMax: 1499, color: "#22c55e" },
  { nivel: 3, nombre: "Candidato",    xpMin: 1500, xpMax: 3499, color: "#3b82f6" },
  { nivel: 4, nombre: "Experto",      xpMin: 3500, xpMax: 6999, color: "#a855f7" },
  { nivel: 5, nombre: "Élite",        xpMin: 7000, xpMax: Infinity, color: "#f59e0b" },
] as const;

export function calcularNivel(xpTotal: number): typeof NIVELES[number] {
  return NIVELES.findLast((n) => xpTotal >= n.xpMin) ?? NIVELES[0];
}

export function xpParaSiguienteNivel(xpTotal: number): number {
  const nivelActual = calcularNivel(xpTotal);
  if (nivelActual.nivel === 5) return 0;
  return nivelActual.xpMax - xpTotal + 1;
}

export function porcentajeNivelActual(xpTotal: number): number {
  const nivel = calcularNivel(xpTotal);
  if (nivel.nivel === 5) return 100;
  const rango = nivel.xpMax - nivel.xpMin + 1;
  const avance = xpTotal - nivel.xpMin;
  return Math.round((avance / rango) * 100);
}

// ─────────────────────────────────────────────────
// LIGAS SEMANALES
// ─────────────────────────────────────────────────

export const LIGAS = [
  { nivel: 1, nombre: "Bronce",   xpMin: 0,    color: "#cd7f32", emoji: "🥉" },
  { nivel: 2, nombre: "Plata",    xpMin: 200,  color: "#94a3b8", emoji: "🥈" },
  { nivel: 3, nombre: "Oro",      xpMin: 500,  color: "#eab308", emoji: "🥇" },
  { nivel: 4, nombre: "Platino",  xpMin: 1000, color: "#06b6d4", emoji: "💎" },
  { nivel: 5, nombre: "Diamante", xpMin: 2000, color: "#8b5cf6", emoji: "👑" },
];

// ─────────────────────────────────────────────────
// BADGES
// ─────────────────────────────────────────────────

export const BADGES_CONFIG = [
  { nombre: "Primera Llama",   icono: "🔥", tipo: "RACHA",       umbral: 1,   descripcion: "Completa tu primer día de estudio" },
  { nombre: "7 Días Seguidos", icono: "🔥", tipo: "RACHA",       umbral: 7,   descripcion: "Mantén la racha 7 días seguidos" },
  { nombre: "Racha de 30",     icono: "🔥", tipo: "RACHA",       umbral: 30,  descripcion: "30 días consecutivos estudiando" },
  { nombre: "Primer Simulacro",icono: "📝", tipo: "SIMULACROS",  umbral: 1,   descripcion: "Completa tu primer simulacro" },
  { nombre: "10 Simulacros",   icono: "📚", tipo: "SIMULACROS",  umbral: 10,  descripcion: "Completa 10 simulacros" },
  { nombre: "50 Simulacros",   icono: "🏆", tipo: "SIMULACROS",  umbral: 50,  descripcion: "Completa 50 simulacros" },
  { nombre: "Puntería",        icono: "🎯", tipo: "PRECISION",   umbral: 80,  descripcion: "Supera el 80% en un simulacro" },
  { nombre: "Perfecto",        icono: "⭐", tipo: "PRECISION",   umbral: 100, descripcion: "Obtén el 100% en un simulacro" },
  { nombre: "Top 3",           icono: "🥇", tipo: "SOCIAL",      umbral: 3,   descripcion: "Llega al top 3 del ranking de una OPEC" },
  { nombre: "Competidor",      icono: "⚔️",  tipo: "SOCIAL",      umbral: 1,   descripcion: "Participa en tu primer desafío 1v1" },
] as const;

// ─────────────────────────────────────────────────
// CALCULAR XP DE UN SIMULACRO
// ─────────────────────────────────────────────────

export interface ResultadoSimulacro {
  correctas: number;
  total: number;
  tipo: "FUNCIONAL_ESPECIFICA" | "FUNCIONAL_TRANSVERSAL" | "COMPORTAMENTAL" | "MIXTO";
  esPrimeroEnOpec: boolean;
  rachaActual: number;
}

export function calcularXPSimulacro(resultado: ResultadoSimulacro): number {
  let xp = 0;

  // XP por preguntas respondidas
  xp += resultado.correctas * XP_CONFIG.PREGUNTA_CORRECTA;
  xp += (resultado.total - resultado.correctas) * XP_CONFIG.PREGUNTA_INCORRECTA;

  // Bonus por completar
  xp += XP_CONFIG.SIMULACRO_COMPLETADO;

  // Bonus perfecto
  if (resultado.correctas === resultado.total) {
    xp += XP_CONFIG.PERFECTO_100;
  }

  // Bonus primera vez en OPEC
  if (resultado.esPrimeroEnOpec) {
    xp += XP_CONFIG.PRIMER_SIMULACRO_OPEC;
  }

  // Bonus racha
  if (resultado.rachaActual > 0) {
    xp += XP_CONFIG.RACHA_BONUS_DIA;
  }

  return xp;
}

// ─────────────────────────────────────────────────
// ACTUALIZAR RACHA
// ─────────────────────────────────────────────────

export async function actualizarRacha(userId: string): Promise<{
  rachaActual: number;
  rachaMasLarga: number;
  rachaRota: boolean;
}> {
  const user = await prisma.userProfile.findUnique({
    where: { id: userId },
    select: { rachaActual: true, rachaMasLarga: true, ultimaActividad: true },
  });

  if (!user) throw new Error("Usuario no encontrado");

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  const ayer = new Date(hoy);
  ayer.setDate(ayer.getDate() - 1);

  let rachaActual = user.rachaActual;
  let rachaRota = false;

  if (!user.ultimaActividad) {
    // Primera vez
    rachaActual = 1;
  } else {
    const ultimaFecha = new Date(user.ultimaActividad);
    ultimaFecha.setHours(0, 0, 0, 0);

    if (ultimaFecha.getTime() === hoy.getTime()) {
      // Ya estudió hoy, no cambia la racha
    } else if (ultimaFecha.getTime() === ayer.getTime()) {
      // Continuó la racha
      rachaActual += 1;
    } else {
      // Racha rota
      rachaActual = 1;
      rachaRota = true;
    }
  }

  const rachaMasLarga = Math.max(user.rachaMasLarga, rachaActual);

  await prisma.userProfile.update({
    where: { id: userId },
    data: {
      rachaActual,
      rachaMasLarga,
      ultimaActividad: new Date(),
    },
  });

  return { rachaActual, rachaMasLarga, rachaRota };
}

// ─────────────────────────────────────────────────
// ACTUALIZAR XP Y NIVEL
// ─────────────────────────────────────────────────

export async function agregarXP(userId: string, xp: number, opecId?: string): Promise<void> {
  // Actualizar XP del usuario
  await prisma.userProfile.update({
    where: { id: userId },
    data: {
      xpTotal: { increment: xp },
      simulacrosTotal: { increment: 1 },
    },
  });

  // Actualizar XP en ranking de OPEC si aplica
  if (opecId) {
    const { getLunesDeEstaSemana } = await import("./utils");
    const semana = getLunesDeEstaSemana();

    await prisma.ranking.upsert({
      where: { userId_opecId_semana: { userId, opecId, semana } },
      create: { userId, opecId, xpSemanal: xp, xpTotal: xp, semana },
      update: { xpSemanal: { increment: xp }, xpTotal: { increment: xp } },
    });
  }
}

// ─────────────────────────────────────────────────
// VERIFICAR Y OTORGAR BADGES
// ─────────────────────────────────────────────────

export async function verificarBadges(userId: string): Promise<string[]> {
  const user = await prisma.userProfile.findUnique({
    where: { id: userId },
    select: {
      xpTotal: true,
      rachaActual: true,
      simulacrosTotal: true,
      badges: { select: { badge: { select: { nombre: true } } } },
    },
  });

  if (!user) return [];

  const badgesActuales = new Set(user.badges.map((b) => b.badge.nombre));
  const badgesNuevos: string[] = [];

  const allBadges = await prisma.badge.findMany();

  for (const badge of allBadges) {
    if (badgesActuales.has(badge.nombre)) continue;

    let cumple = false;

    switch (badge.tipo) {
      case "RACHA":
        cumple = user.rachaActual >= (badge.umbral ?? 0);
        break;
      case "SIMULACROS":
        cumple = user.simulacrosTotal >= (badge.umbral ?? 0);
        break;
    }

    if (cumple) {
      await prisma.userBadge.create({
        data: { userId, badgeId: badge.id },
      });
      badgesNuevos.push(badge.nombre);
    }
  }

  return badgesNuevos;
}

// ─────────────────────────────────────────────────
// VERIFICAR LÍMITE DE SUSCRIPCIÓN
// ─────────────────────────────────────────────────

export async function verificarLimiteSimulacro(userId: string): Promise<{
  permitido: boolean;
  razon?: string;
  simulacrosRestantes?: number;
}> {
  const user = await prisma.userProfile.findUnique({
    where: { id: userId },
    select: {
      simulacrosMesActual: true,
      mesContador: true,
      suscripcion: {
        select: { plan: true, simulacrosMes: true, estado: true },
      },
    },
  });

  if (!user) return { permitido: false, razon: "Usuario no encontrado" };

  const plan = user.suscripcion ?? { plan: "GRATUITO", simulacrosMes: 3, estado: "ACTIVA" };

  if (plan.estado !== "ACTIVA") {
    return { permitido: false, razon: "Suscripción vencida o cancelada" };
  }

  // Suscripción ilimitada
  if (plan.simulacrosMes === -1) return { permitido: true };

  // Resetear contador si cambió el mes
  const mesActual = getMesActual();
  let simulacrosMes = user.simulacrosMesActual;

  if (user.mesContador !== mesActual) {
    simulacrosMes = 0;
    await prisma.userProfile.update({
      where: { id: userId },
      data: { simulacrosMesActual: 0, mesContador: mesActual },
    });
  }

  const limiteMes = plan.simulacrosMes;
  const restantes = limiteMes - simulacrosMes;

  if (restantes <= 0) {
    return {
      permitido: false,
      razon: `Alcanzaste el límite de ${limiteMes} simulacros este mes. Mejora tu plan para continuar.`,
      simulacrosRestantes: 0,
    };
  }

  return { permitido: true, simulacrosRestantes: restantes };
}
