import { PrismaClient, TipoPregunta, NivelDificultad } from '@prisma/client';
const prisma = new PrismaClient();
const POOL = 'COMPORT_NIVEL_1';
const NIVEL = 1;
type Op = { letra: string; texto: string; esCorrecta: boolean; valorLikert: number };
type PQ = { texto: string; categoria: string; explicacion: string; opciones: Op[] };
function L(c: number): Op[] {
  return ['Nunca o casi nunca lo hago.','Pocas veces lo hago.','Algunas veces lo hago.','Frecuentemente lo hago.','Siempre o casi siempre lo hago.'].map((texto, i) => ({ letra: String(i+1), texto, esCorrecta: i+1===c, valorLikert: i+1 }));
}
const PREGUNTAS: PQ[] = [
  // ── Planeación y organización ──
  { texto: 'Al llegar a su puesto de trabajo, ¿con qué frecuencia revisa sus tareas pendientes y organiza el orden en que las realizará durante el día?', categoria: 'Planeación y organización', explicacion: 'La organización básica del tiempo es fundamental para la eficiencia operativa. La opción 4 es un comportamiento sólido para un auxiliar.', opciones: L(4) },
  { texto: '¿Con qué frecuencia mantiene su archivo (físico o digital) ordenado de tal manera que cualquier compañero pueda encontrar un documento en su ausencia?', categoria: 'Planeación y organización', explicacion: 'El orden documental garantiza la continuidad administrativa. La opción 5 es la norma esperada en este nivel.', opciones: L(5) },
  { texto: 'Cuando debe realizar múltiples trámites en diferentes dependencias, ¿con qué frecuencia planea la ruta o el orden de entrega para optimizar su tiempo?', categoria: 'Planeación y organización', explicacion: 'La optimización de tareas rutinarias demuestra capacidad de planeación operativa. La opción 4 es realista.', opciones: L(4) },
  { texto: '¿Con qué frecuencia revisa los niveles de insumos de oficina (papel, tóner, formatos) para solicitar reposición antes de que se agoten totalmente?', categoria: 'Planeación y organización', explicacion: 'La prevención operativa evita parálisis en el servicio. La opción 4 indica una gestión responsable de recursos.', opciones: L(4) },
  { texto: 'Ante una solicitud imprevista de su jefe, ¿con qué frecuencia logra ajustar su cronograma del día para incluir la nueva tarea sin descuidar las urgentes?', categoria: 'Planeación y organización', explicacion: 'La capacidad de ajuste operativo es clave en el entorno público. La opción 3 o 4 es un desempeño equilibrado.', opciones: L(4) },
  // ── Toma de decisiones ──
  { texto: 'Cuando un procedimiento tiene un paso que parece innecesario, ¿con qué frecuencia decide seguirlo rigurosamente a menos que reciba una instrucción oficial en contra?', categoria: 'Toma de decisiones', explicacion: 'En el nivel auxiliar, las decisiones deben enmarcarse en el cumplimiento de normas. La opción 5 es la correcta para garantizar la legalidad.', opciones: L(5) },
  { texto: 'Ante una duda sobre la validez de un documento entregado por un ciudadano, ¿con qué frecuencia opta por consultar con su superior inmediato antes de aceptarlo?', categoria: 'Toma de decisiones', explicacion: 'Consultar ante la incertidumbre es una decisión prudente en el nivel operativo. La opción 5 es la esperada.', opciones: L(5) },
  { texto: 'Cuando debe elegir entre dos tareas pendientes de similar importancia, ¿con qué frecuencia decide basándose en el orden de llegada o la fecha de vencimiento?', categoria: 'Toma de decisiones', explicacion: 'El uso de criterios objetivos para priorizar es una forma básica de toma de decisiones operativa. La opción 4 es habitual.', opciones: L(4) },
  { texto: '¿Con qué frecuencia asume la responsabilidad de decidir qué información técnica compartir con un usuario si esta ya está definida en el manual de procesos?', categoria: 'Toma de decisiones', explicacion: 'La autonomía en el nivel auxiliar está limitada por los manuales de procesos. La opción 4 indica un uso correcto de la guía institucional.', opciones: L(4) },
  { texto: 'Cuando observa una anomalía en un proceso bajo su responsabilidad, ¿con qué frecuencia decide detenerlo preventivamente y dar aviso inmediato?', categoria: 'Toma de decisiones', explicacion: 'La decisión de reportar anomalías protege a la institución de riesgos mayores. La opción 5 es el comportamiento ideal.', opciones: L(5) },
];
async function main() {
  console.log('\n=== COMPORT NIVEL 1 — Lote 4/5 (Planeación + Decisiones) ===\n');
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
  console.log('▶ Siguiente: npx ts-node --project tsconfig.scripts.json scripts/seed-comport1-5.ts');
}
main().catch(console.error).finally(() => prisma.$disconnect());
