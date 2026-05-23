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
  // ── Integridad / Ética (Nivel 5: ejemplaridad / cultura ética) ──
  { texto: '¿Con qué frecuencia rechaza solicitudes de nombramientos o contratos que no cumplen con los requisitos técnicos de ley, aun cuando provengan de instancias con alto poder político?', categoria: 'Integridad / Ética', explicacion: 'La integridad del directivo es la garantía de la legalidad institucional. La opción 5 es la única conducta aceptable frente a presiones indebidas.', opciones: L(5) },
  { texto: 'Al identificar un presunto acto de corrupción en su entidad, ¿con qué frecuencia denuncia personalmente el hecho ante la Fiscalía y los órganos de control de forma inmediata?', categoria: 'Integridad / Ética', explicacion: 'El directivo tiene el deber legal y ético de reportar irregularidades sin dilación. La opción 5 es el estándar de transparencia esperado.', opciones: L(5) },
  { texto: '¿Con qué frecuencia lidera talleres o sesiones de diálogo sobre el Código de Integridad con sus equipos directivos para fortalecer la ética organizacional?', categoria: 'Integridad / Ética', explicacion: 'Promover la ética desde la dirección fortalece la cultura institucional. La opción 4 o 5 indica un liderazgo ético activo.', opciones: L(5) },
  { texto: '¿Con qué frecuencia utiliza los vehículos oficiales de la entidad para realizar diligencias personales o familiares durante los fines de semana?', categoria: 'Integridad / Ética', explicacion: 'El uso indebido de bienes públicos es una falta gravísima (peculado por uso). La respuesta 1 es la única conducta ética y legal esperada.', opciones: L(1) },
  { texto: 'Cuando la entidad debe tomar una decisión que afecta intereses de terceros, ¿con qué frecuencia asegura que el proceso se realice bajo criterios de total imparcialidad y publicidad?', categoria: 'Integridad / Ética', explicacion: 'La imparcialidad es un principio constitucional de la función pública. La opción 5 refleja un directivo comprometido con la transparencia.', opciones: L(5) },
  // ── Orientación al servicio (Nivel 5: estrategia de valor público) ──
  { texto: '¿Con qué frecuencia diseña e implementa políticas institucionales de "Cero Papel" o "Trámites en Línea" para facilitar la vida del ciudadano?', categoria: 'Orientación al servicio', explicacion: 'El directivo genera valor público a través de la modernización del servicio. La opción 5 es el desempeño ideal en este nivel.', opciones: L(5) },
  { texto: 'Al recibir informes de baja satisfacción ciudadana, ¿con qué frecuencia ordena reestructuraciones de fondo en los procesos de atención al público?', categoria: 'Orientación al servicio', explicacion: 'La respuesta estratégica a la insatisfacción es responsabilidad del directivo. La opción 4 indica una gestión orientada a resultados ciudadanos.', opciones: L(4) },
  { texto: '¿Con qué frecuencia firma convenios interadministrativos para integrar servicios del Estado y evitar que el ciudadano deba desplazarse entre múltiples entidades?', categoria: 'Orientación al servicio', explicacion: 'La articulación institucional mejora la experiencia del ciudadano con el Estado. La opción 5 refleja una visión sistémica del servicio.', opciones: L(5) },
  { texto: '¿Con qué frecuencia se encarga de orientar personalmente a los ciudadanos en la fila de espera de la oficina de atención?', categoria: 'Orientación al servicio', explicacion: 'Un directivo debe gestionar el servicio a través de sistemas y equipos, no realizando tareas operativas de ventanilla. La respuesta 1 o 2 es realista.', opciones: L(1) },
  { texto: 'Cuando formula el presupuesto anual, ¿con qué frecuencia prioriza las inversiones que tienen un impacto directo y positivo en la calidad de vida de los usuarios del servicio?', categoria: 'Orientación al servicio', explicacion: 'La asignación de recursos debe estar alineada con el valor público. La opción 5 es el comportamiento ideal de un directivo orientado al servicio.', opciones: L(5) },
];
async function main() {
  console.log('\n=== COMPORT NIVEL 5 — Lote 3/5 (Integridad + Servicio) ===\n');
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
  console.log(`\n── Lote 3 ── Insertadas: ${insertadas} | Descartadas: ${descartadas} | Pool ahora: ${final}`);
}
main().catch(console.error).finally(() => prisma.$disconnect());
