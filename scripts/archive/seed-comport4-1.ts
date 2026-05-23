import { PrismaClient, TipoPregunta, NivelDificultad } from '@prisma/client';
const prisma = new PrismaClient();
const POOL = 'COMPORT_NIVEL_4';
const NIVEL = 4;

type Op = { letra: string; texto: string; esCorrecta: boolean; valorLikert: number };
type PQ = { texto: string; categoria: string; explicacion: string; opciones: Op[] };

function L(c: number): Op[] {
  return ['Nunca o casi nunca lo hago.','Pocas veces lo hago.','Algunas veces lo hago.','Frecuentemente lo hago.','Siempre o casi siempre lo hago.'].map((texto, i) => ({ letra: String(i+1), texto, esCorrecta: i+1===c, valorLikert: i+1 }));
}

const PREGUNTAS: PQ[] = [
  // ── Orientación al logro (Nivel 4: impacto institucional) ──
  { texto: 'Cuando formula propuestas técnicas para mejorar la eficiencia de un proceso sectorial, ¿con qué frecuencia se asegura de incluir indicadores que permitan medir el impacto real en la ciudadanía?', categoria: 'Orientación al logro', explicacion: 'Un asesor debe orientar sus propuestas hacia resultados medibles de alto impacto. La opción 5 es la esperada para este nivel táctico-estratégico.', opciones: L(5) },
  { texto: '¿Con qué frecuencia supera las metas técnicas establecidas para su cargo al proponer soluciones innovadoras que trascienden sus funciones básicas?', categoria: 'Orientación al logro', explicacion: 'El asesor se distingue por aportar valor agregado. La opción 4 o 5 indica un alto compromiso con la excelencia institucional.', opciones: L(5) },
  { texto: 'Al identificar un cuello de botella en una política pública bajo su análisis, ¿con qué frecuencia desarrolla planes de acción detallados para remover los obstáculos?', categoria: 'Orientación al logro', explicacion: 'La proactividad resolutiva es clave en la asesoría. La opción 4 refleja una gestión efectiva de problemas complejos.', opciones: L(4) },
  { texto: '¿Con qué frecuencia se encarga personalmente de realizar registros operativos básicos (como archivar correspondencia física) si no hay un auxiliar disponible?', categoria: 'Orientación al logro', explicacion: 'Un asesor debe enfocarse en tareas de alto valor. Si bien puede apoyar, la respuesta 2 o 3 es realista para evitar descuidar sus funciones estratégicas por tareas delegables.', opciones: L(2) },
  { texto: 'Cuando un proyecto estratégico bajo su coordinación presenta retrasos, ¿con qué frecuencia asume el liderazgo para renegociar plazos y recursos con los directivos?', categoria: 'Orientación al logro', explicacion: 'El asesor debe gestionar el éxito de los proyectos ante la alta dirección. La opción 4 es un comportamiento sólido de gestión de logros.', opciones: L(4) },

  // ── Trabajo en equipo (Nivel 4: liderazgo técnico / mentoría) ──
  { texto: '¿Con qué frecuencia dedica tiempo a brindar retroalimentación técnica y mentoría a los profesionales de menor rango que participan en sus proyectos?', categoria: 'Trabajo en equipo', explicacion: 'La mentoría es una función esencial del asesor para fortalecer el equipo. La opción 4 es la respuesta esperada en este nivel.', opciones: L(4) },
  { texto: 'Cuando coordina un grupo de trabajo interdependiente, ¿con qué frecuencia promueve espacios para que los integrantes compartan sus lecciones aprendidas?', categoria: 'Trabajo en equipo', explicacion: 'Fomentar el aprendizaje colectivo es una señal de liderazgo en equipo. La opción 4 es valorada positivamente.', opciones: L(4) },
  { texto: '¿Con qué frecuencia solicita la opinión técnica de sus pares antes de entregar un informe final a un directivo?', categoria: 'Trabajo en equipo', explicacion: 'La validación cruzada y el trabajo colaborativo aumentan la calidad técnica. La opción 4 indica humildad profesional y enfoque de equipo.', opciones: L(4) },
  { texto: 'Cuando surgen conflictos de intereses entre diferentes áreas en un proyecto común, ¿con qué frecuencia actúa como facilitador para encontrar puntos de acuerdo?', categoria: 'Trabajo en equipo', explicacion: 'La mediación técnica y política es propia del nivel asesor. La opción 4 refleja una alta capacidad de concertación.', opciones: L(4) },
  { texto: '¿Con qué frecuencia reconoce públicamente los aportes de los demás miembros del equipo en las presentaciones ante la alta dirección?', categoria: 'Trabajo en equipo', explicacion: 'Dar crédito al equipo fortalece el liderazgo y la confianza. La opción 5 es el comportamiento ideal para un líder técnico.', opciones: L(5) },
];

async function main() {
  console.log('\n=== COMPORT NIVEL 4 — Lote 1/5 (Logro + Equipo) ===\n');
  const inicial = await prisma.pregunta.count({ where: { poolKey: POOL, tipo: 'COMPORTAMENTAL' } });
  console.log(`Conteo inicial en pool: ${inicial}`);
  const existentes = await prisma.pregunta.findMany({ where: { poolKey: POOL, tipo: 'COMPORTAMENTAL' }, select: { texto: true } });
  let insertadas = 0, descartadas = 0;
  for (const pq of PREGUNTAS) {
    const words = new Set(pq.texto.toLowerCase().split(/\s+/));
    const dup = existentes.some(e => { const ew = e.texto.toLowerCase().split(/\s+/); return ew.filter(w => words.has(w)).length / ew.length > 0.7; });
    if (dup) { descartadas++; console.log(`  ⚠ DESCARTADA: ${pq.texto.substring(0, 60)}...`); continue; }
    await prisma.pregunta.create({ data: { tipo: TipoPregunta.COMPORTAMENTAL, texto: pq.texto, poolKey: POOL, validada: true, nivelResponsabilidad: NIVEL, categoria: pq.categoria, dificultad: NivelDificultad.INTERMEDIO, explicacion: pq.explicacion, opciones: { create: pq.opciones } } });
    insertadas++; existentes.push({ texto: pq.texto });
    const c = pq.opciones.find(o => o.esCorrecta)!;
    console.log(`  ✓ [${pq.categoria}] → correcta: ${c.letra} | ${pq.texto.substring(0, 55)}...`);
  }
  const final = await prisma.pregunta.count({ where: { poolKey: POOL, tipo: 'COMPORTAMENTAL' } });
  console.log(`\n── Lote 1 ── Insertadas: ${insertadas} | Descartadas: ${descartadas} | Pool ahora: ${final}`);
}
main().catch(console.error).finally(() => prisma.$disconnect());
