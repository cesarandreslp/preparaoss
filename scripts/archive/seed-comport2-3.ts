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
  // ── Integridad / Ética (Nivel 2: veracidad técnica / responsabilidad) ──
  { texto: 'Al procesar datos técnicos sensibles, ¿con qué frecuencia se asegura de que la información sea registrada exactamente como fue capturada, sin alteraciones?', categoria: 'Integridad / Ética', explicacion: 'La veracidad de los datos técnicos es la base de la integridad en este nivel. La opción 5 es la única conducta ética aceptable.', opciones: L(5) },
  { texto: '¿Con qué frecuencia utiliza los equipos tecnológicos de la entidad para realizar trabajos personales fuera de su horario laboral?', categoria: 'Integridad / Ética', explicacion: 'El respeto por los bienes públicos es un deber legal. La respuesta 1 (Nunca) es el estándar de conducta esperado.', opciones: L(1) },
  { texto: 'Cuando detecta un error técnico en un informe que ya fue entregado y que podría afectarlo negativamente, ¿con qué frecuencia lo informa a su jefe de inmediato?', categoria: 'Integridad / Ética', explicacion: 'La honestidad técnica prima sobre el interés personal. La opción 5 indica una alta integridad profesional.', opciones: L(5) },
  { texto: '¿Con qué frecuencia comparte sus claves de acceso a los sistemas institucionales con compañeros de confianza para agilizar el trabajo?', categoria: 'Integridad / Ética', explicacion: 'La seguridad de la información es una responsabilidad ética y legal. La respuesta 1 (Nunca) es la única correcta.', opciones: L(1) },
  { texto: 'Cuando observa que un equipo técnico está siendo mal utilizado por un compañero, ¿con qué frecuencia le advierte sobre el riesgo o informa al responsable?', categoria: 'Integridad / Ética', explicacion: 'Cuidar el patrimonio público es un compromiso ético de todo servidor. La opción 4 refleja una actitud responsable.', opciones: L(4) },
  // ── Orientación al servicio (Nivel 2: soporte técnico al usuario) ──
  { texto: '¿Con qué frecuencia brinda soporte técnico a los usuarios internos con amabilidad y paciencia, incluso cuando las dudas son muy básicas?', categoria: 'Orientación al servicio', explicacion: 'La calidez en el soporte técnico mejora el clima laboral y la eficiencia. La opción 5 es el comportamiento ideal.', opciones: L(5) },
  { texto: 'Al recibir una solicitud de reparación o soporte técnico, ¿con qué frecuencia informa al usuario sobre el tiempo estimado de solución y los avances?', categoria: 'Orientación al servicio', explicacion: 'Mantener informado al usuario es una forma de respeto y buen servicio. La opción 4 indica una gestión de servicio efectiva.', opciones: L(4) },
  { texto: '¿Con qué frecuencia busca simplificar los procesos técnicos para que sean más amigables y accesibles para el usuario final?', categoria: 'Orientación al servicio', explicacion: 'La orientación al servicio implica pensar en la facilidad para el usuario. La opción 4 refleja un técnico proactivo.', opciones: L(4) },
  { texto: '¿Con qué frecuencia decide qué ciudadano debe ser atendido primero basándose exclusivamente en su cercanía personal con el solicitante?', categoria: 'Orientación al servicio', explicacion: 'El servicio público debe ser imparcial. La respuesta 1 (Nunca) es la correcta para garantizar la equidad en la atención.', opciones: L(1) },
  { texto: 'Cuando soluciona un problema técnico, ¿con qué frecuencia se asegura de que el usuario haya quedado satisfecho con el resultado antes de cerrar el caso?', categoria: 'Orientación al servicio', explicacion: 'Cerrar el ciclo de servicio con la validación del usuario garantiza la calidad. La opción 5 es la respuesta esperada.', opciones: L(5) },
];
async function main() {
  console.log('\n=== COMPORT NIVEL 2 — Lote 3/5 (Integridad + Servicio) ===\n');
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
