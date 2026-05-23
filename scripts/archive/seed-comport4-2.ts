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
  // ── Comunicación efectiva (Nivel 4: negociación / persuasión) ──
  { texto: 'Cuando debe sustentar una propuesta técnica ante un comité de directivos, ¿con qué frecuencia prepara presentaciones que vinculen los datos técnicos con los objetivos estratégicos de la entidad?', categoria: 'Comunicación efectiva', explicacion: 'El asesor debe hablar el lenguaje de la alta dirección. La opción 5 es el comportamiento esperado para lograr impacto institucional.', opciones: L(5) },
  { texto: '¿Con qué frecuencia utiliza un lenguaje sencillo y libre de tecnicismos excesivos al explicar políticas institucionales complejas a actores externos o ciudadanos?', categoria: 'Comunicación efectiva', explicacion: 'La capacidad de simplificar lo complejo es un rasgo de comunicación efectiva en un asesor. La opción 4 es valorada positivamente.', opciones: L(4) },
  { texto: 'Cuando surgen malentendidos técnicos entre diferentes dependencias, ¿con qué frecuencia asume el rol de comunicador para aclarar los conceptos y alinear las visiones?', categoria: 'Comunicación efectiva', explicacion: 'Actuar como puente de comunicación es una función típica del nivel asesor. La opción 4 indica una gestión proactiva de la comunicación interna.', opciones: L(4) },
  { texto: '¿Con qué frecuencia responde personalmente correos electrónicos de solicitudes ciudadanas básicas de primer nivel que deberían ser atendidas por un auxiliar?', categoria: 'Comunicación efectiva', explicacion: 'Un asesor debe gestionar su tiempo hacia lo estratégico. La respuesta 2 o 3 es realista para evitar el micro-manejo operativo.', opciones: L(2) },
  { texto: 'Al recibir instrucciones ambiguas de la alta dirección, ¿con qué frecuencia solicita una reunión de aclaración para definir alcances y expectativas antes de proceder?', categoria: 'Comunicación efectiva', explicacion: 'Garantizar la alineación con la directriz es vital. La opción 5 es el comportamiento ideal para evitar reprocesos estratégicos.', opciones: L(5) },
  // ── Manejo del cambio (Nivel 4: gestión de transiciones) ──
  { texto: 'Cuando la entidad atraviesa un proceso de reestructuración, ¿con qué frecuencia actúa como un agente de cambio ayudando a los demás a comprender los beneficios de la nueva estructura?', categoria: 'Manejo del cambio', explicacion: 'El asesor debe ser un facilitador de la transformación institucional. La opción 4 es la respuesta esperada en este nivel de influencia.', opciones: L(4) },
  { texto: '¿Con qué frecuencia propone ajustes a los planes estratégicos cuando detecta cambios significativos en el entorno legal o social que afectan a la institución?', categoria: 'Manejo del cambio', explicacion: 'La adaptabilidad estratégica es clave. La opción 4 refleja un asesor atento a la dinámica del entorno público.', opciones: L(4) },
  { texto: 'Ante la implementación de una nueva tecnología compleja, ¿con qué frecuencia lidera el análisis de impacto y los planes de mitigación de riesgos para su área?', categoria: 'Manejo del cambio', explicacion: 'Gestionar el riesgo del cambio es una responsabilidad técnica del asesor. La opción 5 es el desempeño ideal.', opciones: L(5) },
  { texto: 'Cuando un proyecto bajo su asesoría debe ser cancelado por cambio de prioridades del gobierno, ¿con qué frecuencia asume la situación con profesionalismo y documenta las lecciones aprendidas?', categoria: 'Manejo del cambio', explicacion: 'La resiliencia y el aprovechamiento del conocimiento son vitales. La opción 4 indica madurez profesional ante la volatilidad política.', opciones: L(4) },
  { texto: '¿Con qué frecuencia fomenta en su equipo de trabajo una mentalidad abierta hacia la innovación y la mejora continua de los procesos tradicionales?', categoria: 'Manejo del cambio', explicacion: 'Promover la cultura de innovación es parte del liderazgo técnico. La opción 4 es un indicador de gestión del cambio efectiva.', opciones: L(4) },
];
async function main() {
  console.log('\n=== COMPORT NIVEL 4 — Lote 2/5 (Comunicación + Cambio) ===\n');
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
  console.log(`\n── Lote 2 ── Insertadas: ${insertadas} | Descartadas: ${descartadas} | Pool ahora: ${final}`);
}
main().catch(console.error).finally(() => prisma.$disconnect());
