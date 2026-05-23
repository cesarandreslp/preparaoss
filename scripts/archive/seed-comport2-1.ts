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
  // ── Orientación al logro (Nivel 2: precisión técnica / cumplimiento especializado) ──
  { texto: 'Cuando debe entregar un informe técnico especializado, ¿con qué frecuencia revisa exhaustivamente los datos para asegurar que no existan inconsistencias antes de la entrega?', categoria: 'Orientación al logro', explicacion: 'La precisión técnica es fundamental en el nivel técnico. La opción 5 es la respuesta esperada para garantizar la calidad del soporte técnico.', opciones: L(5) },
  { texto: '¿Con qué frecuencia busca actualizarse en el manejo de las nuevas herramientas de software o equipos técnicos que la entidad adquiere para su área?', categoria: 'Orientación al logro', explicacion: 'La actualización técnica constante permite mejorar el desempeño. La opción 4 indica una orientación al logro proactiva en este nivel.', opciones: L(4) },
  { texto: 'Al enfrentar una falla técnica recurrente en un proceso, ¿con qué frecuencia propone soluciones de fondo para evitar que el problema se repita?', categoria: 'Orientación al logro', explicacion: 'Proponer soluciones técnicas demuestra compromiso con los resultados. La opción 4 es un comportamiento sólido para un técnico.', opciones: L(4) },
  { texto: '¿Con qué frecuencia logra cumplir con el cronograma de mantenimiento o procesamiento de datos asignado, incluso cuando surgen tareas imprevistas?', categoria: 'Orientación al logro', explicacion: 'El cumplimiento de cronogramas técnicos es vital para la operación. La opción 4 refleja eficiencia y responsabilidad.', opciones: L(4) },
  { texto: '¿Con qué frecuencia solicita apoyo a su jefe para realizar tareas de archivo básico que están definidas como parte de su rol de soporte técnico?', categoria: 'Orientación al logro', explicacion: 'Un técnico debe ser autónomo en sus tareas de soporte. La respuesta 1 o 2 es realista; no debería cargar a su superior con tareas propias de su nivel.', opciones: L(1) },

  // ── Trabajo en equipo (Nivel 2: soporte técnico / colaboración operativa) ──
  { texto: 'Cuando un profesional del área requiere información técnica para un proyecto urgente, ¿con qué frecuencia se la suministra de manera oportuna y organizada?', categoria: 'Trabajo en equipo', explicacion: 'El soporte efectivo a los niveles superiores es una forma clave de trabajo en equipo para el técnico. La opción 5 es el estándar ideal.', opciones: L(5) },
  { texto: '¿Con qué frecuencia comparte sus "trucos" o mejores prácticas en el manejo de equipos técnicos con sus compañeros para mejorar el rendimiento del grupo?', categoria: 'Trabajo en equipo', explicacion: 'Compartir el conocimiento técnico fortalece al equipo. La opción 4 indica un espíritu colaborativo valioso.', opciones: L(4) },
  { texto: 'Al trabajar en un proyecto conjunto, ¿con qué frecuencia se asegura de que su parte del trabajo técnico sea compatible con lo que están haciendo los demás?', categoria: 'Trabajo en equipo', explicacion: 'La coordinación técnica es esencial para evitar reprocesos. La opción 4 refleja un enfoque de equipo responsable.', opciones: L(4) },
  { texto: 'Cuando el equipo enfrenta una carga de trabajo técnica muy alta, ¿con qué frecuencia ofrece su apoyo en tareas que no son de su especialidad pero que conoce?', categoria: 'Trabajo en equipo', explicacion: 'La polivalencia técnica ayuda a superar picos de trabajo. La opción 3 o 4 es un comportamiento positivo y realista.', opciones: L(4) },
  { texto: '¿Con qué frecuencia asume el liderazgo de una mesa técnica de nivel estratégico para definir políticas institucionales de largo plazo?', categoria: 'Trabajo en equipo', explicacion: 'Las definiciones estratégicas corresponden a niveles superiores. Un técnico puede participar, pero la respuesta 2 es realista para no extralimitar sus funciones.', opciones: L(2) },
];

async function main() {
  console.log('\n=== COMPORT NIVEL 2 — Lote 1/5 (Logro + Equipo) ===\n');
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
