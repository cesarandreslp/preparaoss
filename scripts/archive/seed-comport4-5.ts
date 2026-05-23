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
  // ── Liderazgo (Nivel 4: influencia estratégica / equipos de alto rendimiento) ──
  { texto: '¿Con qué frecuencia asume el liderazgo técnico en proyectos interinstitucionales complejos, logrando la alineación de diferentes actores hacia una meta común?', categoria: 'Liderazgo', explicacion: 'El liderazgo estratégico es fundamental en el nivel asesor. La opción 5 es la respuesta esperada para gestionar la complejidad interinstitucional.', opciones: L(5) },
  { texto: 'Cuando nota que el clima laboral de su equipo técnico está decayendo, ¿con qué frecuencia propone a los directivos estrategias para fortalecer la motivación y el sentido de pertenencia?', categoria: 'Liderazgo', explicacion: 'Preocuparse por el capital humano es parte del liderazgo integral. La opción 4 indica una gestión proactiva de equipos.', opciones: L(4) },
  { texto: '¿Con qué frecuencia delega tareas operativas en su equipo para centrarse en el análisis de impacto y la formulación de recomendaciones estratégicas?', categoria: 'Liderazgo', explicacion: 'Delegar efectivamente es una competencia crítica para un asesor. La opción 5 es el comportamiento ideal para optimizar el rol.', opciones: L(5) },
  { texto: 'Al enfrentar una resistencia fuerte de un grupo de stakeholders ante una nueva política, ¿con qué frecuencia utiliza técnicas de negociación y persuasión para lograr su aceptación?', categoria: 'Liderazgo', explicacion: 'La capacidad de influencia y negociación es vital en la asesoría. La opción 4 o 5 refleja un liderazgo político-técnico sólido.', opciones: L(5) },
  { texto: '¿Con qué frecuencia busca desarrollar las competencias técnicas de los profesionales a su cargo mediante desafíos que los saquen de su zona de confort?', categoria: 'Liderazgo', explicacion: 'El desarrollo de otros es una responsabilidad del nivel asesor. La opción 4 es valorada positivamente como gestión de talento.', opciones: L(4) },
  // ── Adaptabilidad (Nivel 4: flexibilidad ante la volatilidad) ──
  { texto: '¿Con qué frecuencia ajusta sus recomendaciones técnicas cuando se produce un cambio súbito en la dirección política o en la normativa nacional?', categoria: 'Adaptabilidad', explicacion: 'La flexibilidad ante los cambios del entorno es esencial en la asesoría pública. La opción 5 es la respuesta funcional esperada.', opciones: L(5) },
  { texto: 'Ante el fracaso de una estrategia que usted asesoró, ¿con qué frecuencia lidera la reorientación del proyecto basándose en los aprendizajes obtenidos?', categoria: 'Adaptabilidad', explicacion: 'La capacidad de pivotar y aprender es un signo de alta adaptabilidad profesional. La opción 4 indica resiliencia técnica.', opciones: L(4) },
  { texto: '¿Con qué frecuencia se siente cómodo trabajando en entornos de alta incertidumbre donde las directrices institucionales no están plenamente definidas?', categoria: 'Adaptabilidad', explicacion: 'El asesor opera frecuentemente en la ambigüedad estratégica. La opción 4 refleja una personalidad adaptada a la dinámica del Estado.', opciones: L(4) },
  { texto: 'Cuando la entidad decide fusionar procesos o áreas, ¿con qué frecuencia propone nuevas formas de organización que aprovechen las sinergias del cambio?', categoria: 'Adaptabilidad', explicacion: 'Proponer mejoras ante el cambio estructural es una señal de adaptabilidad proactiva. La opción 4 es el desempeño esperado.', opciones: L(4) },
  { texto: '¿Con qué frecuencia busca activamente actualizar sus conocimientos en tendencias internacionales para adaptar las mejores prácticas globales a la realidad local de la entidad?', categoria: 'Adaptabilidad', explicacion: 'La actualización constante permite una adaptación informada a la modernización. La opción 4 o 5 indica un asesor con visión de futuro.', opciones: L(4) },
];
async function main() {
  console.log('\n=== COMPORT NIVEL 4 — Lote 5/5 (Liderazgo + Adaptabilidad) ===\n');
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
  console.log('✅ PROCESO COMPLETADO PARA NIVEL 4');
}
main().catch(console.error).finally(() => prisma.$disconnect());
