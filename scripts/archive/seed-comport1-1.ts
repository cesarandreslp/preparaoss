import { PrismaClient, TipoPregunta, NivelDificultad } from '@prisma/client';
const prisma = new PrismaClient();
const POOL = 'COMPORT_NIVEL_1';
const NIVEL = 1;

type Op = { letra: string; texto: string; esCorrecta: boolean; valorLikert: number };
type PQ = { texto: string; categoria: string; explicacion: string; opciones: Op[] };

/** Genera las 5 opciones Likert estándar; la letra `c` (1-5) es la correcta */
function L(c: number): Op[] {
  const labels = [
    'Nunca o casi nunca lo hago.',
    'Pocas veces lo hago.',
    'Algunas veces lo hago.',
    'Frecuentemente lo hago.',
    'Siempre o casi siempre lo hago.',
  ];
  return labels.map((texto, i) => ({ letra: String(i + 1), texto, esCorrecta: i + 1 === c, valorLikert: i + 1 }));
}

const PREGUNTAS: PQ[] = [
  // ── Orientación al logro ──
  { texto: 'Cuando le asignan una tarea con fecha límite en su puesto de trabajo, ¿con qué frecuencia la entrega completa y a tiempo?', categoria: 'Orientación al logro', explicacion: 'Un Auxiliar debe cumplir los plazos establecidos de forma constante. La respuesta 4 (frecuentemente) es realista: hay días con imprevistos, pero el patrón predominante debe ser el cumplimiento oportuno.', opciones: L(4) },
  { texto: 'Cuando detecta un error en un registro o formato que acaba de diligenciar, ¿con qué frecuencia lo corrige de inmediato y lo notifica a su jefe?', categoria: 'Orientación al logro', explicacion: 'La corrección inmediata y la comunicación oportuna del error son comportamientos esperados de un Auxiliar orientado al logro. La opción 4 (frecuentemente) indica hábito sólido sin pretender perfección irreal.', opciones: L(4) },
  { texto: 'Cuando su carga de trabajo aumenta de manera imprevista, ¿con qué frecuencia reorganiza sus actividades para cumplir con todas sin afectar la calidad?', categoria: 'Orientación al logro', explicacion: 'Reorganizar prioridades ante cargas adicionales es una señal de orientación al logro en el nivel operativo. La opción 4 es realista para un Auxiliar que conoce bien su trabajo.', opciones: L(4) },
  { texto: 'Cuando termina una tarea antes del tiempo previsto, ¿con qué frecuencia aprovecha ese tiempo para revisar o mejorar algo en su puesto de trabajo?', categoria: 'Orientación al logro', explicacion: 'Un Auxiliar con orientación al logro aprovecha los tiempos libres para agregar valor. La opción 3 (algunas veces) es realista: no siempre hay tareas adicionales disponibles, pero sí es un comportamiento recurrente.', opciones: L(3) },
  { texto: 'Cuando recibe retroalimentación de su jefe sobre errores o áreas de mejora en su trabajo, ¿con qué frecuencia aplica las correcciones en sus siguientes tareas?', categoria: 'Orientación al logro', explicacion: 'Aplicar la retroalimentación de forma consistente es la base del aprendizaje continuo en el nivel Auxiliar. La opción 5 (siempre) es la esperada: la retroalimentación directa del jefe debe adoptarse sin excepción.', opciones: L(5) },

  // ── Trabajo en equipo ──
  { texto: 'Cuando un compañero de su área necesita apoyo para completar una tarea operativa rutinaria, ¿con qué frecuencia le ofrece su ayuda si usted ya terminó las propias?', categoria: 'Trabajo en equipo', explicacion: 'Ofrecer apoyo espontáneo cuando hay capacidad disponible es clave en el trabajo en equipo a nivel Auxiliar. La respuesta 4 (frecuentemente) es realista y esperada, sin exigir que siempre abandone sus propias tareas.', opciones: L(4) },
  { texto: 'Cuando hay diferencias de criterio en el equipo sobre cómo realizar una tarea operativa, ¿con qué frecuencia escucha las propuestas de los demás antes de expresar la suya?', categoria: 'Trabajo en equipo', explicacion: 'Escuchar activamente antes de opinar es un indicador de trabajo en equipo maduro. La respuesta 4 indica que es un comportamiento habitual, no esporádico.', opciones: L(4) },
  { texto: 'Cuando un compañero se ausenta por incapacidad o permiso, ¿con qué frecuencia asume temporalmente algunas de sus tareas para no interrumpir el servicio?', categoria: 'Trabajo en equipo', explicacion: 'Asumir temporalmente responsabilidades de un compañero es parte del trabajo en equipo, pero depende de la instrucción del jefe y de la capacidad real. La opción 3 (algunas veces) es realista para nivel Auxiliar.', opciones: L(3) },
  { texto: 'Cuando el equipo logra un buen resultado colectivo, ¿con qué frecuencia reconoce la contribución de sus compañeros al celebrar el éxito?', categoria: 'Trabajo en equipo', explicacion: 'Reconocer el aporte del equipo fortalece la cohesión grupal. La opción 4 (frecuentemente) indica un patrón positivo de reconocimiento interpersonal en el nivel Auxiliar.', opciones: L(4) },
  { texto: 'Cuando el equipo debe cumplir una meta colectiva con plazo definido, ¿con qué frecuencia coordina sus avances con los demás para asegurarse de que todos vayan al mismo ritmo?', categoria: 'Trabajo en equipo', explicacion: 'Coordinar con el equipo es esencial para alcanzar metas compartidas. La opción 4 (frecuentemente) señala que el Auxiliar tiene integrado este comportamiento como norma habitual de trabajo.', opciones: L(4) },
];

async function main() {
  console.log('\n=== COMPORT NIVEL 1 — Lote 1/5 (Orientación al logro + Trabajo en equipo) ===\n');
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
    const correcta = pq.opciones.find(o => o.esCorrecta)!;
    console.log(`  ✓ [${pq.categoria}] → correcta: ${correcta.letra} | ${pq.texto.substring(0, 55)}...`);
  }
  const final = await prisma.pregunta.count({ where: { poolKey: POOL, tipo: 'COMPORTAMENTAL' } });
  console.log(`\n── Lote 1 ── Insertadas: ${insertadas} | Descartadas: ${descartadas} | Pool ahora: ${final}`);
  console.log('▶ Siguiente: npx ts-node --project tsconfig.scripts.json scripts/seed-comport1-2.ts');
}
main().catch(console.error).finally(() => prisma.$disconnect());
