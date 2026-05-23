import { PrismaClient, TipoPregunta, NivelDificultad } from '@prisma/client';
const prisma = new PrismaClient();
const POOL = 'COMPORT_NIVEL_5';
const NIVEL = 5;
type Op = { letra: string; texto: string; esCorrecta: boolean; valorLikert: number };
type PQ = { texto: string; categoria: string; explicacion: string; opciones: Op[] };
function L(c: number): Op[] {
  return ['Nunca o casi nunca lo hago.','Pocas veces lo hago.','Algunas veces lo hago.','Frecuentemente lo hago.','Siempre o casi siempre lo hago.'].map((texto, i) => ({ letra: String(i+1), texto, esCorrecta: i+1===c, valorLikert: i+1 }));
}
const PREGUNTAS: PQ[] = [
  // ── Liderazgo (Nivel 5: liderazgo estratégico / gestión de talento de alto nivel) ──
  { texto: '¿Con qué frecuencia asume el liderazgo en la definición de la cultura organizacional de la entidad, asegurando que los valores de integridad y excelencia sean el eje central?', categoria: 'Liderazgo', explicacion: 'El directivo es el máximo responsable de la cultura institucional. La opción 5 es la respuesta esperada para modelar la organización.', opciones: L(5) },
  { texto: 'Cuando debe conformar su equipo de directores, ¿con qué frecuencia prioriza las competencias técnicas y el liderazgo probado sobre las afinidades personales o políticas?', categoria: 'Liderazgo', explicacion: 'La gestión de talento de alto nivel requiere objetividad y visión de excelencia. La opción 5 indica un liderazgo profesional y orientado a resultados.', opciones: L(5) },
  { texto: '¿Con qué frecuencia delega la toma de decisiones técnicas complejas en sus asesores expertos, reservándose para sí la decisión política y estratégica final?', categoria: 'Liderazgo', explicacion: 'Saber delegar el análisis técnico para enfocarse en la decisión estratégica es vital. La opción 5 es el comportamiento ideal para un ejecutivo.', opciones: L(5) },
  { texto: 'Al enfrentar una huelga o protesta de sus colaboradores, ¿con qué frecuencia lidera personalmente la mesa de diálogo para encontrar soluciones que equilibren los derechos laborales con el servicio público?', categoria: 'Liderazgo', explicacion: 'El manejo de relaciones laborales críticas requiere la presencia del líder máximo. La opción 4 o 5 refleja un liderazgo dialogante y resolutivo.', opciones: L(5) },
  { texto: '¿Con qué frecuencia dedica tiempo a identificar y preparar a sus potenciales sucesores dentro de la entidad para asegurar la continuidad de la gestión estratégica?', categoria: 'Liderazgo', explicacion: 'La planificación de la sucesión es una competencia de alta dirección. La opción 4 indica una visión de largo plazo y generosidad directiva.', opciones: L(4) },
  // ── Adaptabilidad (Nivel 5: resiliencia estratégica / visión de futuro) ──
  { texto: '¿Con qué frecuencia logra adaptar el rumbo estratégico de la entidad ante cambios drásticos en la política macroeconómica o social del país sin paralizar la operación?', categoria: 'Adaptabilidad', explicacion: 'La flexibilidad estratégica es esencial en el entorno volátil del Estado. La opción 5 es la respuesta funcional para este nivel de responsabilidad.', opciones: L(5) },
  { texto: 'Ante la aparición de una nueva tendencia tecnológica disruptiva (como la IA), ¿con qué frecuencia lidera la creación de un comité de expertos para evaluar cómo integrarla en la entidad?', categoria: 'Adaptabilidad', explicacion: 'La adaptabilidad proactiva ante la innovación permite que la entidad se modernice oportunamente. La opción 4 indica una visión de futuro.', opciones: L(4) },
  { texto: '¿Con qué frecuencia se muestra resiliente y mantiene la calma del equipo directivo ante situaciones de crisis institucional severa o escándalos externos?', categoria: 'Adaptabilidad', explicacion: 'El líder debe ser el ancla de estabilidad en la tormenta. La opción 5 es el estándar de inteligencia emocional esperado en la alta dirección.', opciones: L(5) },
  { texto: 'Cuando un proyecto de gran importancia es rechazado por el Congreso o la Junta Directiva, ¿con qué frecuencia rediseña la estrategia rápidamente para lograr los objetivos por otras vías legales?', categoria: 'Adaptabilidad', explicacion: 'La persistencia estratégica y la capacidad de rediseño son claves para el éxito directivo. La opción 4 refleja una alta adaptabilidad resolutiva.', opciones: L(4) },
  { texto: '¿Con qué frecuencia busca activamente la cooperación internacional para adaptar modelos de gestión exitosos de otros países a la realidad institucional propia?', categoria: 'Adaptabilidad', explicacion: 'La apertura al aprendizaje global permite una adaptación informada a los estándares de modernización. La opción 4 es un comportamiento valorado.', opciones: L(4) },
];
async function main() {
  console.log('\n=== COMPORT NIVEL 5 — Lote 5/5 (Liderazgo + Adaptabilidad) ===\n');
  const inicial = await prisma.pregunta.count({ where: { poolKey: POOL, tipo: 'COMPORTAMENTAL' } });
  console.log(`Conteo actual: ${inicial}`);
  const existentes = await prisma.pregunta.findMany({ where: { poolKey: POOL, tipo: 'COMPORTAMENTAL' }, select: { texto: true } });
  let insertadas = 0, descartadas = 0;
  for (const pq of PREGUNTAS) {
    const words = new Set(pq.texto.toLowerCase().split(/\s+/));
    const dup = existentes.some(e => { const ew = e.texto.toLowerCase().split(/\s+/); return ew.filter(w => words.has(w)).length / ew.length > 0.7; });
    if (dup) { descartadas++; console.log(`  ⚠ DESCARTADA: ${pq.texto.substring(0,60)}...`); continue; }
    await prisma.pregunta.create({ data: { tipo: TipoPregunta.COMPORTAMENTAL, texto: pq.texto, poolKey: POOL, validada: true, nivelResponsabilidad: NIVEL, categoria: pq.categoria, dificultad: NivelDificultad.INTERMEDIO, explicacion: pq.explicacion, opciones: { create: pq.opciones } } });
    insertadas++; existentes.push({ texto: pq.texto });
    const c = pq.opciones.find(o => o.esCorrecta)!;
    console.log(`  ✓ [${pq.categoria}] → correcta: ${c.letra} | ${pq.texto.substring(0,55)}...`);
  }
  const final = await prisma.pregunta.count({ where: { poolKey: POOL, tipo: 'COMPORTAMENTAL' } });
  console.log(`\n── Lote 5 ── Insertadas: ${insertadas} | Descartadas: ${descartadas} | Pool ahora: ${final}`);
  console.log('✅ PROCESO COMPLETADO PARA NIVEL 5');
}
main().catch(console.error).finally(() => prisma.$disconnect());
