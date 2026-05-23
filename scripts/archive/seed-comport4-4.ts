import { PrismaClient, TipoPregunta, NivelDificultad } from '@prisma/client';
const prisma = new PrismaClient();
const POOL = 'COMPORT_NIVEL_4';
const NIVEL = 4;
type Op = { letra: string; texto: string; esCorrecta: boolean; valorLikert: number };
type PQ = { texto: string; categoria: string; explicacion: string; opciones: Op[] };
function L(c: number): Op[] {
  return ['Nunca o casi nunca lo hago.','Pocas veces lo hago.','Algunas veces lo hago.','Frecuentemente lo hago.','Siempre o casi siempre lo hago.'].map((texto, i) => ({ letra: String(i+1), texto, esCorrecta: i+1===c, valorLikert: i+1 }));
}
const PREGUNTAS: PQ[] = [
  // ── Planeación y organización (Nivel 4: visión de largo plazo) ──
  { texto: '¿Con qué frecuencia elabora cronogramas de trabajo detallados que contemplen hitos, responsables y riesgos para proyectos que superan el año de duración?', categoria: 'Planeación y organización', explicacion: 'La planeación a largo plazo es esencial para un asesor. La opción 5 es la respuesta esperada para garantizar el éxito de iniciativas estratégicas.', opciones: L(5) },
  { texto: 'Al coordinar múltiples proyectos técnicos simultáneos, ¿con qué frecuencia establece un sistema de priorización basado en el impacto institucional y la disponibilidad de recursos?', categoria: 'Planeación y organización', explicacion: 'Gestionar la complejidad requiere métodos de organización avanzados. La opción 4 o 5 indica un alto nivel de eficiencia estratégica.', opciones: L(5) },
  { texto: '¿Con qué frecuencia realiza el seguimiento técnico a los planes de acción de las áreas bajo su asesoría para asegurar el cumplimiento de las metas del PND?', categoria: 'Planeación y organización', explicacion: 'El alineamiento con el Plan Nacional de Desarrollo es vital. La opción 4 refleja una gestión organizada y orientada al cumplimiento estatal.', opciones: L(4) },
  { texto: '¿Con qué frecuencia solicita informes de avance diarios a su equipo sobre tareas operativas que ya están procedimentadas?', categoria: 'Planeación y organización', explicacion: 'Un asesor debe evitar el micro-management. La respuesta 2 o 3 es realista, ya que debe confiar en los procesos y centrarse en los resultados periódicos.', opciones: L(2) },
  { texto: 'Cuando detecta desviaciones presupuestales en un proyecto, ¿con qué frecuencia propone ajustes técnicos que permitan cumplir los objetivos con los recursos disponibles?', categoria: 'Planeación y organización', explicacion: 'La optimización técnica de recursos es una competencia de planeación táctica. La opción 4 es un comportamiento sólido en este nivel.', opciones: L(4) },
  // ── Toma de decisiones (Nivel 4: análisis de riesgo / impacto) ──
  { texto: 'Al emitir un concepto técnico sobre una política de alto impacto, ¿con qué frecuencia analiza al menos tres escenarios posibles y sus respectivos riesgos?', categoria: 'Toma de decisiones', explicacion: 'La toma de decisiones informada es la base de la asesoría. La opción 5 es el estándar de calidad esperado.', opciones: L(5) },
  { texto: '¿Con qué frecuencia toma decisiones técnicas autónomas cuando el manual de procesos permite cierta discrecionalidad basada en el criterio profesional?', categoria: 'Toma de decisiones', explicacion: 'El asesor debe ejercer su criterio experto con seguridad. La opción 4 indica una toma de decisiones decidida y responsable.', opciones: L(4) },
  { texto: 'Ante una crisis institucional inesperada, ¿con qué frecuencia presenta a los directivos opciones de decisión sustentadas en datos y marcos legales?', categoria: 'Toma de decisiones', explicacion: 'Aportar claridad en la incertidumbre es una función de alto valor. La opción 5 es el comportamiento ideal para un asesor.', opciones: L(5) },
  { texto: '¿Con qué frecuencia posterga una decisión técnica importante para consultar con instancias políticas que no tienen competencia en el asunto?', categoria: 'Toma de decisiones', explicacion: 'El asesor debe mantener la independencia técnica. La respuesta 2 o 3 es la correcta para proteger la objetividad de la decisión.', opciones: L(2) },
  { texto: 'Cuando una decisión técnica bajo su responsabilidad afecta a varias áreas de la entidad, ¿con qué frecuencia convoca a una mesa de trabajo para validar los impactos antes de formalizarla?', categoria: 'Toma de decisiones', explicacion: 'La toma de decisiones consultada reduce la resistencia y aumenta la viabilidad. La opción 4 refleja un enfoque sistémico y colaborativo.', opciones: L(4) },
];
async function main() {
  console.log('\n=== COMPORT NIVEL 4 — Lote 4/5 (Planeación + Decisiones) ===\n');
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
