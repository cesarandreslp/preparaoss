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
  // ── Planeación y organización (Nivel 2: organización técnica / cronogramas) ──
  { texto: '¿Con qué frecuencia elabora una lista de chequeo para asegurar que no olvida ningún paso técnico en los procesos complejos bajo su responsabilidad?', categoria: 'Planeación y organización', explicacion: 'El uso de herramientas de apoyo garantiza la calidad técnica. La opción 4 o 5 es el comportamiento ideal para un técnico organizado.', opciones: L(5) },
  { texto: 'Cuando tiene varios equipos técnicos por reparar o mantener, ¿con qué frecuencia establece un orden basado en la urgencia comunicada por las áreas usuarias?', categoria: 'Planeación y organización', explicacion: 'Priorizar según la necesidad del servicio es una competencia de organización clave. La opción 4 indica una gestión operativa efectiva.', opciones: L(4) },
  { texto: '¿Con qué frecuencia revisa el estado de sus herramientas de trabajo técnico (software actualizado, equipos calibrados) antes de iniciar la jornada?', categoria: 'Planeación y organización', explicacion: 'La preparación del entorno técnico previene fallas. La opción 5 es la norma esperada en este nivel.', opciones: L(5) },
  { texto: 'Al recibir una tarea técnica con un plazo de entrega ajustado, ¿con qué frecuencia desglosa la actividad en pequeños pasos para asegurar el cumplimiento?', categoria: 'Planeación y organización', explicacion: 'La planeación operativa mejora la eficiencia. La opción 4 refleja un técnico con buena capacidad de organización.', opciones: L(4) },
  { texto: '¿Con qué frecuencia solicita a su jefe que le planifique detalladamente cada hora de su jornada laboral?', categoria: 'Planeación y organización', explicacion: 'Un técnico debe tener autonomía en su organización diaria. La respuesta 1 o 2 es realista; no debe depender totalmente del superior para tareas rutinarias.', opciones: L(1) },
  // ── Toma de decisiones (Nivel 2: decisión técnica procedimental) ──
  { texto: 'Cuando un equipo presenta una falla que no está contemplada en el manual, ¿con qué frecuencia opta por consultar con el proveedor o un nivel superior antes de intentar repararlo?', categoria: 'Toma de decisiones', explicacion: 'La prudencia técnica protege los bienes de la entidad. La opción 5 es la decisión correcta ante la incertidumbre especializada.', opciones: L(5) },
  { texto: '¿Con qué frecuencia decide cambiar un componente técnico preventivamente basándose en su experiencia, aunque el manual aún no lo exija?', categoria: 'Toma de decisiones', explicacion: 'El uso del criterio técnico para prevenir fallas es valioso. La opción 4 indica una toma de decisiones proactiva y responsable.', opciones: L(4) },
  { texto: 'Ante dos solicitudes técnicas simultáneas, ¿con qué frecuencia decide cuál atender primero basándose exclusivamente en el cargo de quien la solicita?', categoria: 'Toma de decisiones', explicacion: 'Las decisiones deben basarse en la urgencia técnica y el impacto en el servicio, no en jerarquías personales. La respuesta 1 o 2 es la correcta.', opciones: L(1) },
  { texto: '¿Con qué frecuencia asume la responsabilidad de suspender un proceso técnico si detecta que las condiciones de seguridad no son las adecuadas?', categoria: 'Toma de decisiones', explicacion: 'La seguridad es prioridad sobre la operación. La opción 5 refleja una toma de decisiones íntegra y profesional.', opciones: L(5) },
  { texto: 'Cuando debe elegir entre dos soluciones técnicas para un problema, ¿con qué frecuencia opta por la que garantiza mayor durabilidad aunque requiera más tiempo de ejecución?', categoria: 'Toma de decisiones', explicacion: 'La calidad técnica a largo plazo es preferible en el servicio público. La opción 4 indica un buen criterio de decisión.', opciones: L(4) },
];
async function main() {
  console.log('\n=== COMPORT NIVEL 2 — Lote 4/5 (Planeación + Decisiones) ===\n');
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
