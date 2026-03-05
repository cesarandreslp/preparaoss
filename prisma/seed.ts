/**
 * prisma/seed.ts
 * Datos iniciales: Ligas, Badges y OPECs de ejemplo
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

  // ── OPECs DE EJEMPLO ───────────────────────────────────
  // Basadas en convocatorias reales publicadas por la CNSC
  const opecs = [
    {
      simoId: "CNSC-2025-001",
      numerConvocatoria: "No. 001 de 2025",
      nombreCargo: "Profesional Universitario",
      entidad: "Ministerio de Salud y Protección Social",
      nivelJerarquico: "Profesional",
      grado: "11",
      numVacantes: 15,
      municipio: "Bogotá D.C.",
      departamento: "Cundinamarca",
      requisitosEstudio: "Título profesional en Medicina, Enfermería, Salud Pública o áreas afines de las ciencias de la salud.",
      requisitosExp: "Un (1) año de experiencia profesional relacionada con las funciones del cargo.",
      competencias: ["Aprendizaje continuo", "Orientación a resultados", "Orientación al usuario", "Trabajo en equipo", "Adaptación al cambio"],
      tipoPruebas: ["Conocimientos específicos", "Competencias comportamentales"],
      nivelResponsabilidad: 3,
      fechaLimiteInscripcion: new Date("2026-04-15"),
      fechaExamen: new Date("2026-05-20"),
    },
    {
      simoId: "CNSC-2025-002",
      numerConvocatoria: "No. 002 de 2025",
      nombreCargo: "Técnico Administrativo",
      entidad: "Departamento Administrativo Nacional de Estadística (DANE)",
      nivelJerarquico: "Técnico",
      grado: "09",
      numVacantes: 28,
      municipio: "Bogotá D.C.",
      departamento: "Cundinamarca",
      requisitosEstudio: "Título de formación tecnológica en administración, estadística, sistemas o áreas afines.",
      requisitosExp: "Un (1) año de experiencia laboral o relacionada.",
      competencias: ["Manejo de información", "Adaptación al cambio", "Disciplina", "Relaciones interpersonales", "Colaboración"],
      tipoPruebas: ["Conocimientos específicos", "Competencias comportamentales"],
      nivelResponsabilidad: 2,
      fechaLimiteInscripcion: new Date("2026-04-20"),
      fechaExamen: new Date("2026-05-28"),
    },
    {
      simoId: "CNSC-2025-003",
      numerConvocatoria: "No. 003 de 2025",
      nombreCargo: "Ingeniero de Sistemas",
      entidad: "Agencia Nacional de Infraestructura (ANI)",
      nivelJerarquico: "Profesional",
      grado: "14",
      numVacantes: 8,
      municipio: "Bogotá D.C.",
      departamento: "Cundinamarca",
      requisitosEstudio: "Título profesional en Ingeniería de Sistemas, Ingeniería Electrónica, Ingeniería Informática o carreras afines.",
      requisitosExp: "Dos (2) años de experiencia profesional relacionada.",
      competencias: ["Aprendizaje continuo", "Orientación a resultados", "Creatividad e innovación", "Trabajo en equipo", "Iniciativa"],
      tipoPruebas: ["Conocimientos específicos", "Competencias comportamentales", "Prueba de aptitudes"],
      nivelResponsabilidad: 3,
      fechaLimiteInscripcion: new Date("2026-04-25"),
      fechaExamen: new Date("2026-06-05"),
    },
    {
      simoId: "CNSC-2025-004",
      numerConvocatoria: "No. 004 de 2025",
      nombreCargo: "Auxiliar Administrativo",
      entidad: "Instituto Nacional de Vías (INVIAS)",
      nivelJerarquico: "Auxiliar",
      grado: "04",
      numVacantes: 45,
      municipio: "Bogotá D.C.",
      departamento: "Cundinamarca",
      requisitosEstudio: "Diploma de bachiller en cualquier modalidad.",
      requisitosExp: "Un (1) año de experiencia laboral.",
      competencias: ["Manejo de información", "Adaptación al cambio", "Disciplina", "Relaciones interpersonales"],
      tipoPruebas: ["Conocimientos básicos", "Competencias comportamentales"],
      nivelResponsabilidad: 1,
      fechaLimiteInscripcion: new Date("2026-04-10"),
      fechaExamen: new Date("2026-05-15"),
    },
    {
      simoId: "CNSC-2025-005",
      numerConvocatoria: "No. 005 de 2025",
      nombreCargo: "Asesor Jurídico",
      entidad: "Contraloría General de la República",
      nivelJerarquico: "Asesor",
      grado: "03",
      numVacantes: 5,
      municipio: "Bogotá D.C.",
      departamento: "Cundinamarca",
      requisitosEstudio: "Título profesional en Derecho y título de posgrado en la modalidad de especialización en áreas relacionadas con las funciones del cargo.",
      requisitosExp: "Cuatro (4) años de experiencia profesional relacionada.",
      competencias: ["Visión estratégica", "Liderazgo de grupos de trabajo", "Toma de decisiones", "Gestión del desarrollo de las personas", "Pensamiento sistémico"],
      tipoPruebas: ["Conocimientos específicos", "Competencias comportamentales", "Entrevista"],
      nivelResponsabilidad: 4,
      fechaLimiteInscripcion: new Date("2026-05-01"),
      fechaExamen: new Date("2026-06-10"),
    },
    {
      simoId: "CNSC-2025-006",
      numerConvocatoria: "No. 006 de 2025",
      nombreCargo: "Profesional en Comunicaciones",
      entidad: "Ministerio de Tecnologías de la Información y Comunicaciones",
      nivelJerarquico: "Profesional",
      grado: "13",
      numVacantes: 12,
      municipio: "Bogotá D.C.",
      departamento: "Cundinamarca",
      requisitosEstudio: "Título profesional en Comunicación Social, Periodismo, Publicidad o áreas afines.",
      requisitosExp: "Un (1) año de experiencia profesional relacionada.",
      competencias: ["Aprendizaje continuo", "Orientación a resultados", "Creatividad e innovación", "Trabajo en equipo"],
      tipoPruebas: ["Conocimientos específicos", "Competencias comportamentales"],
      nivelResponsabilidad: 3,
      fechaLimiteInscripcion: new Date("2026-04-30"),
      fechaExamen: new Date("2026-06-01"),
    },
    {
      simoId: "CNSC-2025-007",
      numerConvocatoria: "No. 007 de 2025",
      nombreCargo: "Contador Público",
      entidad: "Superintendencia Financiera de Colombia",
      nivelJerarquico: "Profesional",
      grado: "12",
      numVacantes: 10,
      municipio: "Bogotá D.C.",
      departamento: "Cundinamarca",
      requisitosEstudio: "Título profesional en Contaduría Pública con tarjeta profesional vigente.",
      requisitosExp: "Un (1) año de experiencia profesional relacionada.",
      competencias: ["Aprendizaje continuo", "Orientación a resultados", "Manejo de información", "Trabajo en equipo"],
      tipoPruebas: ["Conocimientos específicos", "Competencias comportamentales"],
      nivelResponsabilidad: 3,
      fechaLimiteInscripcion: new Date("2026-05-05"),
      fechaExamen: new Date("2026-06-15"),
    },
    {
      simoId: "CNSC-2025-008",
      numerConvocatoria: "No. 008 de 2025",
      nombreCargo: "Director Territorial",
      entidad: "Servicio Nacional de Aprendizaje (SENA)",
      nivelJerarquico: "Directivo",
      grado: "01",
      numVacantes: 3,
      municipio: "Medellín",
      departamento: "Antioquia",
      requisitosEstudio: "Título profesional y título de posgrado en la modalidad de especialización, maestría o doctorado.",
      requisitosExp: "Cuatro (4) años de experiencia profesional, de los cuales dos (2) deben ser en cargos de dirección.",
      competencias: ["Visión estratégica", "Liderazgo efectivo", "Planeación", "Toma de decisiones", "Gestión del cambio"],
      tipoPruebas: ["Conocimientos específicos", "Competencias directivas", "Entrevista de selección"],
      nivelResponsabilidad: 5,
      fechaLimiteInscripcion: new Date("2026-05-10"),
      fechaExamen: new Date("2026-06-20"),
    },
  ];

  let opecsCreadosCount = 0;
  for (const opec of opecs) {
    await prisma.opec.upsert({
      where: { simoId: opec.simoId },
      update: { ...opec },
      create: { ...opec },
    });
    opecsCreadosCount++;
  }
  console.log(`✅ ${opecsCreadosCount} OPECs de ejemplo creadas/actualizadas`);

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
