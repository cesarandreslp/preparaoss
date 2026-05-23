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
  // ── Liderazgo (Nivel 2: referencia técnica / apoyo a pares) ──
  { texto: '¿Con qué frecuencia orienta voluntariamente a los auxiliares de su área en el uso correcto de las herramientas técnicas institucionales?', categoria: 'Liderazgo', explicacion: 'El liderazgo técnico se manifiesta como guía para niveles operativos. La opción 5 es la respuesta esperada para un técnico ejemplar.', opciones: L(5) },
  { texto: 'Cuando detecta que un compañero está realizando un procedimiento técnico de forma incorrecta, ¿con qué frecuencia se lo señala de manera constructiva y le muestra la forma correcta?', categoria: 'Liderazgo', explicacion: 'Corregir y enseñar a los pares fortalece la calidad técnica del equipo. La opción 4 indica un liderazgo técnico positivo.', opciones: L(4) },
  { texto: '¿Con qué frecuencia propone pequeñas innovaciones en las rutinas de mantenimiento técnico que mejoran la vida útil de los equipos de la entidad?', categoria: 'Liderazgo', explicacion: 'Aportar ideas de mejora demuestra compromiso y liderazgo especializado. La opción 4 es valorada positivamente.', opciones: L(4) },
  { texto: 'En situaciones de emergencia técnica, ¿con qué frecuencia mantiene la calma y ayuda a coordinar las primeras acciones de respuesta mientras llega un superior?', categoria: 'Liderazgo', explicacion: 'La capacidad de respuesta inicial en crisis demuestra liderazgo operativo. La opción 4 refleja un técnico confiable y decidido.', opciones: L(4) },
  { texto: '¿Con qué frecuencia delega sus responsabilidades técnicas en los auxiliares para poder dedicarse a tareas administrativas de oficina?', categoria: 'Liderazgo', explicacion: 'Un técnico no debe delegar sus funciones especializadas para hacer tareas administrativas ajenas a su cargo. La respuesta 1 o 2 es la correcta.', opciones: L(1) },
  // ── Adaptabilidad (Nivel 2: respuesta a contingencias técnicas) ──
  { texto: 'Cuando el sistema institucional presenta una caída prolongada, ¿con qué frecuencia busca alternativas manuales para adelantar su trabajo técnico sin bloquearse?', categoria: 'Adaptabilidad', explicacion: 'La capacidad de encontrar soluciones ante fallas de herramientas es vital. La opción 4 indica una alta adaptabilidad técnica.', opciones: L(4) },
  { texto: '¿Con qué frecuencia se adapta rápidamente a trabajar con nuevas normativas técnicas que exigen cambiar hábitos de trabajo de muchos años?', categoria: 'Adaptabilidad', explicacion: 'La flexibilidad ante los cambios normativos garantiza la legalidad. La opción 5 es la conducta funcional esperada.', opciones: L(5) },
  { texto: 'Ante una solicitud urgente de apoyo técnico en una dependencia diferente a la suya, ¿con qué frecuencia se traslada con disposición y eficiencia?', categoria: 'Adaptabilidad', explicacion: 'La movilidad y disposición al servicio son fundamentales. La opción 4 refleja un técnico adaptable a las necesidades de la entidad.', opciones: L(4) },
  { texto: '¿Con qué frecuencia solicita capacitación extra cuando siente que sus conocimientos técnicos han quedado rezagados frente a los nuevos retos de la entidad?', categoria: 'Adaptabilidad', explicacion: 'La disposición al aprendizaje continuo es una forma de adaptación proactiva. La opción 5 es el estándar de excelencia.', opciones: L(5) },
  { texto: 'Cuando su jefe decide cambiar las prioridades técnicas del día a mitad de jornada, ¿con qué frecuencia ajusta su trabajo sin mostrar resistencia o molestia?', categoria: 'Adaptabilidad', explicacion: 'La respuesta rápida a las necesidades dinámicas del servicio es una exigencia del nivel operativo especializado. La opción 5 es la ideal.', opciones: L(5) },
];
async function main() {
  console.log('\n=== COMPORT NIVEL 2 — Lote 5/5 (Liderazgo + Adaptabilidad) ===\n');
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
  console.log('✅ PROCESO COMPLETADO PARA NIVEL 2');
}
main().catch(console.error).finally(() => prisma.$disconnect());
