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
  // ── Orientación al logro (Nivel 5: resultados estratégicos / accountability) ──
  { texto: '¿Con qué frecuencia asume la responsabilidad final ante los entes de control por el cumplimiento de las metas físicas y financieras del Plan de Desarrollo de su entidad?', categoria: 'Orientación al logro', explicacion: 'Un directivo debe ser el responsable máximo de los resultados ante el Estado. La opción 5 es la única esperada para el nivel de accountability exigido.', opciones: L(5) },
  { texto: 'Al enfrentar recortes presupuestales, ¿con qué frecuencia logra renegociar prioridades con su equipo para asegurar el cumplimiento de los proyectos de mayor impacto social?', categoria: 'Orientación al logro', explicacion: 'La gestión eficiente de recursos escasos para lograr resultados es clave en la dirección. La opción 4 o 5 indica una orientación al logro estratégica.', opciones: L(5) },
  { texto: '¿Con qué frecuencia supera los indicadores de gestión establecidos para su dependencia mediante la optimización de procesos y la gestión de recursos externos?', categoria: 'Orientación al logro', explicacion: 'El directivo busca la excelencia institucional más allá del mínimo cumplimiento. La opción 4 refleja un alto desempeño ejecutivo.', opciones: L(4) },
  { texto: '¿Con qué frecuencia se encarga de revisar y corregir personalmente la redacción de los oficios rutinarios de su secretaría privada?', categoria: 'Orientación al logro', explicacion: 'Un directivo debe delegar lo operativo. La respuesta 1 o 2 es realista para evitar la microgestión y centrarse en lo estratégico.', opciones: L(1) },
  { texto: 'Cuando una meta institucional está en riesgo, ¿con qué frecuencia convoca a comités extraordinarios para tomar decisiones de fondo que garanticen el resultado?', categoria: 'Orientación al logro', explicacion: 'La acción rápida y resolutiva ante crisis es propia del liderazgo directivo. La opción 5 es el comportamiento funcional ideal.', opciones: L(5) },

  // ── Trabajo en equipo (Nivel 5: cultura colaborativa / gestión de clima) ──
  { texto: '¿Con qué frecuencia promueve una cultura de colaboración entre las diferentes subdirecciones o dependencias de la entidad para romper los silos de información?', categoria: 'Trabajo en equipo', explicacion: 'El directivo debe ser el arquitecto de la sinergia institucional. La opción 5 es fundamental para la eficiencia administrativa.', opciones: L(5) },
  { texto: 'Cuando surgen conflictos de alta intensidad entre sus directores de área, ¿con qué frecuencia interviene personalmente para mediar y restablecer el clima de confianza?', categoria: 'Trabajo en equipo', explicacion: 'La gestión de conflictos en niveles superiores es responsabilidad del jefe máximo. La opción 4 indica una capacidad de mediación oportuna.', opciones: L(4) },
  { texto: '¿Con qué frecuencia delega la representación de la entidad en eventos técnicos a sus subalternos para empoderarlos y fortalecer sus competencias de liderazgo?', categoria: 'Trabajo en equipo', explicacion: 'Fomentar el crecimiento del equipo es una forma de trabajo colaborativo a nivel directivo. La opción 4 es un comportamiento ejemplar de delegación.', opciones: L(4) },
  { texto: 'Al definir el Plan Estratégico, ¿con qué frecuencia involucra a los diferentes niveles de la organización para asegurar que la visión sea compartida y no impuesta?', categoria: 'Trabajo en equipo', explicacion: 'La construcción colectiva de la visión garantiza el compromiso de todos. La opción 5 refleja un liderazgo participativo moderno.', opciones: L(5) },
  { texto: '¿Con qué frecuencia reconoce públicamente los logros de sus equipos de trabajo ante la Junta Directiva o el Ministro?', categoria: 'Trabajo en equipo', explicacion: 'Dar visibilidad y crédito al equipo motiva y fortalece el sentido de pertenencia. La opción 5 es el estándar de un buen directivo.', opciones: L(5) },
];

async function main() {
  console.log('\n=== COMPORT NIVEL 5 — Lote 1/5 (Logro + Equipo) ===\n');
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
