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
  // ── Planeación y organización (Nivel 5: visión estratégica / gestión de recursos) ──
  { texto: '¿Con qué frecuencia lidera la formulación del Plan Estratégico Institucional (PEI) asegurando que esté plenamente alineado con las metas del Plan Nacional de Desarrollo?', categoria: 'Planeación y organización', explicacion: 'La alineación estratégica es la función de planeación máxima del directivo. La opción 5 es la respuesta esperada para garantizar la coherencia estatal.', opciones: L(5) },
  { texto: 'Al asignar el presupuesto anual entre las diferentes áreas, ¿con qué frecuencia utiliza criterios técnicos de impacto y eficiencia por encima de presiones internas?', categoria: 'Planeación y organización', explicacion: 'La gestión responsable de recursos públicos requiere firmeza y criterio técnico. La opción 5 indica una alta competencia de planeación y organización estratégica.', opciones: L(5) },
  { texto: '¿Con qué frecuencia realiza el seguimiento cuatrimestral al cumplimiento del Plan de Acción Institucional para corregir desviaciones estratégicas a tiempo?', categoria: 'Planeación y organización', explicacion: 'El control estratégico es vital para el éxito de la gestión. La opción 4 o 5 refleja un directivo con alta capacidad de organización y seguimiento.', opciones: L(5) },
  { texto: '¿Con qué frecuencia dedica su jornada a organizar los expedientes físicos que reposan en los estantes de su despacho directivo?', categoria: 'Planeación y organización', explicacion: 'Un directivo debe delegar la organización física y centrarse en la planeación de alto nivel. La respuesta 1 es la correcta para evitar el desperdicio de talento directivo.', opciones: L(1) },
  { texto: 'Cuando la entidad debe ejecutar proyectos de gran envergadura, ¿con qué frecuencia asegura que se cuente con un mapa de riesgos y planes de contingencia aprobados por el comité directivo?', categoria: 'Planeación y organización', explicacion: 'La gestión de riesgos es parte esencial de la planeación en la alta dirección. La opción 4 indica una visión preventiva y organizada.', opciones: L(4) },
  // ── Toma de decisiones (Nivel 5: decisión bajo incertidumbre / impacto sistémico) ──
  { texto: 'Ante una situación de alta incertidumbre donde no existe un precedente claro, ¿con qué frecuencia toma la decisión técnica asumiendo la responsabilidad plena del resultado?', categoria: 'Toma de decisiones', explicacion: 'El directivo debe decidir aun en la ambigüedad. La opción 5 es el comportamiento esperado para un líder de nivel 5.', opciones: L(5) },
  { texto: '¿Con qué frecuencia basa sus decisiones de política institucional en análisis de datos, tendencias y estudios de prospectiva realizados por sus asesores?', categoria: 'Toma de decisiones', explicacion: 'La toma de decisiones informada reduce el riesgo de error. La opción 5 refleja un estilo de dirección profesional y técnico.', opciones: L(5) },
  { texto: 'Frente a una recomendación unánime de su comité técnico que va en contra de su opinión inicial, ¿con qué frecuencia decide cambiar su postura en favor del criterio experto de su equipo?', categoria: 'Toma de decisiones', explicacion: 'Saber escuchar y valorar el conocimiento técnico del equipo es una señal de sabiduría directiva. La opción 4 indica una toma de decisiones equilibrada.', opciones: L(4) },
  { texto: '¿Con qué frecuencia posterga una decisión urgente y necesaria para la entidad por temor a la responsabilidad legal o disciplinaria que esta conlleva?', categoria: 'Toma de decisiones', explicacion: 'El directivo debe actuar con valentía y diligencia. La respuesta 1 es la única funcionalmente correcta; el temor no debe paralizar la gestión pública.', opciones: L(1) },
  { texto: 'Cuando una decisión estratégica afecta la relación con otras entidades del Estado, ¿con qué frecuencia busca espacios de concertación previa para asegurar la viabilidad política del proyecto?', categoria: 'Toma de decisiones', explicacion: 'La visión política y sistémica es crucial en la alta dirección. La opción 4 refleja una toma de decisiones inteligente y colaborativa.', opciones: L(4) },
];
async function main() {
  console.log('\n=== COMPORT NIVEL 5 — Lote 4/5 (Planeación + Decisiones) ===\n');
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
  console.log(`\n── Lote 4 ── Insertadas: ${insertadas} | Descartadas: ${descartadas} | Pool ahora: ${final}`);
}
main().catch(console.error).finally(() => prisma.$disconnect());
