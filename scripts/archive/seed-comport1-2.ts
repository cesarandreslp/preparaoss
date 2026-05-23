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
  // ── Comunicación efectiva ──
  { texto: 'Cuando su jefe le da una instrucción verbal para realizar una tarea, ¿con qué frecuencia la repite o confirma para asegurarse de haberla entendido correctamente?', categoria: 'Comunicación efectiva', explicacion: 'Confirmar las instrucciones verbales es un hábito clave de comunicación efectiva en el nivel Auxiliar. La respuesta 4 (frecuentemente) indica que es un comportamiento consolidado, reduciendo errores por malentendidos.', opciones: L(4) },
  { texto: 'Cuando detecta un inconveniente o falla en su área de trabajo (equipo dañado, insumo agotado, error en sistema), ¿con qué frecuencia lo comunica de inmediato a su superior?', categoria: 'Comunicación efectiva', explicacion: 'Reportar oportunamente los inconvenientes es esencial para mantener la continuidad del servicio. La respuesta 4 (frecuentemente) refleja un Auxiliar proactivo en la comunicación ascendente.', opciones: L(4) },
  { texto: 'Cuando un ciudadano llega a su ventanilla con una solicitud, ¿con qué frecuencia le explica el procedimiento que debe seguir de manera clara, ordenada y amable?', categoria: 'Comunicación efectiva', explicacion: 'La comunicación clara y amable con el ciudadano es la función central de muchos Auxiliares de atención al público. La respuesta 4 indica constancia en este comportamiento.', opciones: L(4) },
  { texto: 'Cuando diligencia un formato, acta o registro oficial, ¿con qué frecuencia verifica que toda la información sea completa, legible y sin errores antes de entregarlo?', categoria: 'Comunicación efectiva', explicacion: 'La precisión documental es una responsabilidad directa del nivel Auxiliar. La respuesta 5 (siempre) es la esperada: los documentos oficiales no admiten descuidos recurrentes.', opciones: L(5) },
  { texto: 'Cuando una instrucción escrita (circular, memorando, procedimiento) no le queda del todo clara, ¿con qué frecuencia consulta con su jefe antes de proceder?', categoria: 'Comunicación efectiva', explicacion: 'Consultar ante la ambigüedad evita errores costosos. La respuesta 4 (frecuentemente) indica que el Auxiliar no asume interpretaciones propias cuando hay duda, sino que busca aclaración.', opciones: L(4) },
  // ── Manejo del cambio ──
  { texto: 'Cuando la entidad implementa un nuevo procedimiento para realizar tareas que usted ya hacía de cierta manera, ¿con qué frecuencia lo adopta sin resistencia desde el inicio?', categoria: 'Manejo del cambio', explicacion: 'Adoptar nuevos procedimientos sin resistencia es un indicador clave de adaptación al cambio en el nivel Auxiliar. La respuesta 4 (frecuentemente) es realista: hay un proceso de ajuste, pero la disposición es positiva.', opciones: L(4) },
  { texto: 'Cuando cambia el sistema informático o herramienta que usa en su trabajo diario, ¿con qué frecuencia busca aprender su funcionamiento lo más rápido posible?', categoria: 'Manejo del cambio', explicacion: 'Aprender activamente las nuevas herramientas es esencial para la continuidad del servicio. La respuesta 4 indica proactividad ante los cambios tecnológicos a nivel Auxiliar.', opciones: L(4) },
  { texto: 'Cuando le asignan una tarea diferente a las que realiza habitualmente, ¿con qué frecuencia la asume con disposición positiva aunque requiera aprender algo nuevo?', categoria: 'Manejo del cambio', explicacion: 'La disposición positiva ante tareas nuevas es un comportamiento esperado de un Auxiliar flexible. La respuesta 4 (frecuentemente) indica que esta actitud es parte de su perfil habitual.', opciones: L(4) },
  { texto: 'Cuando la institución cambia su horario de trabajo o lugar de atención por necesidades del servicio, ¿con qué frecuencia se adapta sin afectar su desempeño?', categoria: 'Manejo del cambio', explicacion: 'Adaptarse a cambios en condiciones laborales (horario, lugar) con impacto mínimo en el desempeño es un comportamiento de nivel 3 (algunas veces) para Auxiliar: es realista reconocer que algunos cambios sí afectan temporalmente.', opciones: L(3) },
  { texto: 'Cuando sus compañeros o jefes cambian de opinión sobre cómo debe realizarse una tarea que usted ya había iniciado, ¿con qué frecuencia acepta el cambio y ajusta su trabajo sin quejarse?', categoria: 'Manejo del cambio', explicacion: 'Aceptar cambios de instrucción sin queja es parte de la flexibilidad operativa en el nivel Auxiliar. La respuesta 4 (frecuentemente) indica madurez ante las variaciones del día a día.', opciones: L(4) },
];
async function main() {
  console.log('\n=== COMPORT NIVEL 1 — Lote 2/5 (Comunicación efectiva + Manejo del cambio) ===\n');
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
  console.log('▶ Siguiente: npx ts-node --project tsconfig.scripts.json scripts/seed-comport1-3.ts');
}
main().catch(console.error).finally(() => prisma.$disconnect());
