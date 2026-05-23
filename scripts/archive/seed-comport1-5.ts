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
  // ── Liderazgo (Nivel 1: liderazgo informal / ejemplo) ──
  { texto: 'Cuando nota que un compañero nuevo tiene dificultades para realizar una tarea técnica que usted domina, ¿con qué frecuencia se ofrece a orientarlo por iniciativa propia?', categoria: 'Liderazgo', explicacion: 'El liderazgo en nivel auxiliar se manifiesta como apoyo técnico y disposición para guiar a pares. La opción 4 es un comportamiento ejemplar.', opciones: L(4) },
  { texto: 'Durante las reuniones de equipo, ¿con qué frecuencia propone ideas sencillas para mejorar la organización del trabajo operativo en su área?', categoria: 'Liderazgo', explicacion: 'Aportar ideas de mejora demuestra liderazgo informal y compromiso. La opción 3 o 4 es valorada positivamente para un auxiliar.', opciones: L(4) },
  { texto: '¿Con qué frecuencia mantiene una actitud positiva y motivadora frente a sus compañeros cuando el equipo enfrenta una jornada de trabajo pesada?', categoria: 'Liderazgo', explicacion: 'El liderazgo actitudinal influye en el clima laboral. La opción 4 refleja un servidor público que inspira a su equipo.', opciones: L(4) },
  { texto: 'Cuando detecta que un proceso puede ser más ágil, ¿con qué frecuencia convence a sus compañeros de adoptar mejores prácticas antes de que sean obligatorias?', categoria: 'Liderazgo', explicacion: 'Influir positivamente en los pares es una competencia de liderazgo informal. La opción 3 es realista para el nivel 1.', opciones: L(3) },
  { texto: '¿Con qué frecuencia asume el rol de mediador cuando se presenta un conflicto menor entre sus compañeros de oficina para mantener la armonía?', categoria: 'Liderazgo', explicacion: 'Promover la armonía es un rasgo de liderazgo interpersonal. La opción 3 indica una participación constructiva sin extralimitarse.', opciones: L(3) },
  // ── Adaptabilidad ──
  { texto: 'Cuando se presentan fallas técnicas imprevistas que le impiden usar su computador, ¿con qué frecuencia busca realizar otras tareas manuales pendientes sin esperar instrucciones?', categoria: 'Adaptabilidad', explicacion: 'La capacidad de encontrar alternativas ante obstáculos demuestra alta adaptabilidad operativa. La opción 4 es el desempeño esperado.', opciones: L(4) },
  { texto: '¿Con qué frecuencia se adapta rápidamente a trabajar con diferentes jefes o estilos de supervisión sin que su rendimiento se vea afectado?', categoria: 'Adaptabilidad', explicacion: 'La flexibilidad ante diferentes liderazgos es vital en la administración pública. La opción 4 indica una competencia sólida.', opciones: L(4) },
  { texto: 'Cuando se requiere que trabaje temporalmente en una sede o dependencia diferente, ¿con qué frecuencia mantiene su disposición y eficiencia habitual?', categoria: 'Adaptabilidad', explicacion: 'La movilidad y flexibilidad son requerimientos comunes. La opción 4 es un comportamiento funcional para el nivel auxiliar.', opciones: L(4) },
  { texto: 'Ante un cambio súbito en las prioridades del día ordenado por su superior, ¿con qué frecuencia detiene lo que está haciendo y se enfoca en lo nuevo sin mostrar molestia?', categoria: 'Adaptabilidad', explicacion: 'La respuesta rápida a las prioridades del servicio es una exigencia del nivel operativo. La opción 5 es la ideal.', opciones: L(5) },
  { texto: '¿Con qué frecuencia solicita capacitación o apoyo para aprender nuevas funciones que no formaban parte de su perfil original pero que la entidad ahora requiere?', categoria: 'Adaptabilidad', explicacion: 'La disposición al aprendizaje ante nuevos retos institucionales es una señal de adaptabilidad proactiva. La opción 4 es valorada.', opciones: L(4) },
];
async function main() {
  console.log('\n=== COMPORT NIVEL 1 — Lote 5/5 (Liderazgo + Adaptabilidad) ===\n');
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
  console.log('✅ PROCESO COMPLETADO');
}
main().catch(console.error).finally(() => prisma.$disconnect());
