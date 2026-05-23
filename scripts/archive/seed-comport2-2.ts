import { PrismaClient, TipoPregunta, NivelDificultad } from '@prisma/client';
const prisma = new PrismaClient();
const POOL = 'COMPORT_NIVEL_2';
const NIVEL = 2;
type Op = { letra: string; texto: string; esCorrecta: boolean; valorLikert: number };
type PQ = { texto: string; categoria: string; explicacion: string; opciones: Op[] };
function L(c: number): Op[] {
  return ['Nunca o casi nunca lo hago.','Pocas veces lo hago.','Algunas veces lo hago.','Frecuentemente lo hago.','Siempre o casi siempre lo hago.'].map((texto, i) => ({ letra: String(i+1), texto, esCorrecta: i+1===c, valorLikert: i+1 }));
}
const PREGUNTAS: PQ[] = [
  // ── Comunicación efectiva (Nivel 2: claridad técnica) ──
  { texto: 'Cuando debe explicar un problema técnico a un compañero que no domina el tema, ¿con qué frecuencia utiliza ejemplos sencillos y evita el uso excesivo de tecnicismos?', categoria: 'Comunicación efectiva', explicacion: 'La capacidad de comunicar conceptos técnicos de forma clara es vital para el soporte. La opción 4 indica un buen nivel de comunicación interpersonal.', opciones: L(4) },
  { texto: '¿Con qué frecuencia confirma con su supervisor los parámetros técnicos de una tarea antes de iniciarla para evitar errores de interpretación?', categoria: 'Comunicación efectiva', explicacion: 'Asegurar la comprensión de los requisitos técnicos previene reprocesos. La opción 4 o 5 es el comportamiento ideal.', opciones: L(5) },
  { texto: 'Al redactar un reporte de novedades técnicas, ¿con qué frecuencia se asegura de que la información sea puntual, objetiva y fácil de entender para quienes deben tomar decisiones?', categoria: 'Comunicación efectiva', explicacion: 'La calidad de los reportes técnicos es responsabilidad directa de este nivel. La opción 5 es la respuesta esperada.', opciones: L(5) },
  { texto: '¿Con qué frecuencia asume la vocería de la entidad ante medios de comunicación para explicar el Plan Estratégico Institucional?', categoria: 'Comunicación efectiva', explicacion: 'La vocería institucional estratégica no corresponde al nivel técnico. La respuesta 1 es la realista para este cargo.', opciones: L(1) },
  { texto: 'Cuando recibe una instrucción técnica escrita que contiene una aparente contradicción, ¿con qué frecuencia solicita aclaración inmediata antes de proceder?', categoria: 'Comunicación efectiva', explicacion: 'La diligencia en la comunicación técnica evita riesgos operativos. La opción 5 es el estándar de conducta profesional.', opciones: L(5) },
  // ── Manejo del cambio (Nivel 2: adaptación técnica) ──
  { texto: '¿Con qué frecuencia se muestra dispuesto a aprender a usar un nuevo equipo o software aunque considere que el anterior funcionaba bien?', categoria: 'Manejo del cambio', explicacion: 'La apertura al cambio tecnológico es fundamental para la modernización institucional. La opción 4 indica una actitud positiva y adaptable.', opciones: L(4) },
  { texto: 'Cuando cambian los procedimientos técnicos de su área, ¿con qué frecuencia los aplica rigurosamente desde el primer día de su vigencia?', categoria: 'Manejo del cambio', explicacion: 'La disciplina en la adopción de nuevos procesos garantiza la legalidad técnica. La opción 5 es la conducta funcional correcta.', opciones: L(5) },
  { texto: '¿Con qué frecuencia propone mejoras a las herramientas técnicas que utiliza cuando detecta que han quedado obsoletas?', categoria: 'Manejo del cambio', explicacion: 'Ser proactivo en la mejora técnica es una señal de adaptación constructiva. La opción 4 refleja un técnico comprometido con la eficiencia.', opciones: L(4) },
  { texto: 'Ante una reasignación de funciones técnicas temporales, ¿con qué frecuencia las asume con disposición y busca capacitarse rápidamente en lo que desconozca?', categoria: 'Manejo del cambio', explicacion: 'La flexibilidad operativa es clave en el nivel técnico. La opción 4 indica una alta adaptabilidad a las necesidades del servicio.', opciones: L(4) },
  { texto: '¿Con qué frecuencia se queja abiertamente con sus compañeros cuando la entidad decide actualizar los sistemas de información institucionales?', categoria: 'Manejo del cambio', explicacion: 'La resistencia pasiva o activa dificulta el cambio. La respuesta 1 (Nunca) es la esperada para un servidor profesional y adaptable.', opciones: L(1) },
];
async function main() {
  console.log('\n=== COMPORT NIVEL 2 — Lote 2/5 (Comunicación + Cambio) ===\n');
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
