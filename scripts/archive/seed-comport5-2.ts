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
  // ── Comunicación efectiva (Nivel 5: vocería / persuasión estratégica) ──
  { texto: '¿Con qué frecuencia actúa como el vocero oficial de la entidad ante medios de comunicación, asegurando que el mensaje institucional sea coherente y transparente?', categoria: 'Comunicación efectiva', explicacion: 'La representación pública es una función indelegable del directivo. La opción 5 es la conducta esperada para proteger la imagen institucional.', opciones: L(5) },
  { texto: 'Al dirigirse a toda la organización, ¿con qué frecuencia utiliza canales directos (reuniones generales, boletines) para comunicar los avances estratégicos de manera inspiradora?', categoria: 'Comunicación efectiva', explicacion: 'La comunicación inspiradora desde la cima fortalece el alineamiento. La opción 4 o 5 indica un liderazgo comunicativo efectivo.', opciones: L(5) },
  { texto: '¿Con qué frecuencia logra convencer a actores externos (gremios, otros entes públicos) de apoyar las iniciativas estratégicas de su entidad mediante la negociación efectiva?', categoria: 'Comunicación efectiva', explicacion: 'La persuasión externa es clave para la gestión de un directivo. La opción 4 refleja una alta capacidad de interlocución.', opciones: L(4) },
  { texto: '¿Con qué frecuencia responde personalmente llamadas de ciudadanos que solicitan información básica sobre trámites rutinarios?', categoria: 'Comunicación efectiva', explicacion: 'Un directivo debe optimizar su tiempo para la alta gestión. La respuesta 1 o 2 es realista; para la atención básica existe un equipo especializado.', opciones: L(1) },
  { texto: 'Ante una crisis de reputación institucional, ¿con qué frecuencia lidera personalmente la estrategia de comunicación para mitigar el impacto y restaurar la confianza?', categoria: 'Comunicación efectiva', explicacion: 'El manejo de crisis requiere la presencia y decisión del directivo máximo. La opción 5 es el estándar de responsabilidad esperado.', opciones: L(5) },
  // ── Manejo del cambio (Nivel 5: liderazgo transformacional) ──
  { texto: '¿Con qué frecuencia lidera procesos de transformación digital en la entidad, venciendo la resistencia cultural mediante incentivos y capacitación estratégica?', categoria: 'Manejo del cambio', explicacion: 'El directivo es el principal impulsor de la modernización. La opción 5 es la respuesta ideal para garantizar la evolución institucional.', opciones: L(5) },
  { texto: 'Cuando cambia el Plan Nacional de Desarrollo o el Gobierno Nacional, ¿con qué frecuencia adapta la estructura de la entidad para alinearse rápidamente con las nuevas directrices?', categoria: 'Manejo del cambio', explicacion: 'La agilidad institucional ante los cambios políticos es un rasgo de alta dirección. La opción 5 es la funcionalmente correcta.', opciones: L(5) },
  { texto: '¿Con qué frecuencia promueve la innovación interna permitiendo que sus equipos experimenten con nuevas formas de gestión sin temor a represalias ante el error controlado?', categoria: 'Manejo del cambio', explicacion: 'Fomentar una cultura de innovación requiere la protección del líder. La opción 4 indica un directivo que gestiona el cambio proactivamente.', opciones: L(4) },
  { texto: 'Ante una fusión o supresión de dependencias, ¿con qué frecuencia gestiona personalmente el impacto en el talento humano para minimizar la desmotivación?', categoria: 'Manejo del cambio', explicacion: 'La gestión humana del cambio es vital para la continuidad. La opción 4 refleja empatía directiva y visión organizacional.', opciones: L(4) },
  { texto: '¿Con qué frecuencia revisa y actualiza los manuales de funciones ante cambios en el entorno legal para asegurar que la entidad opere bajo el nuevo marco vigente?', categoria: 'Manejo del cambio', explicacion: 'Mantener la vigencia normativa es responsabilidad del directivo a través de sus equipos. La opción 4 es un comportamiento sólido de gestión del cambio.', opciones: L(4) },
];
async function main() {
  console.log('\n=== COMPORT NIVEL 5 — Lote 2/5 (Comunicación + Cambio) ===\n');
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
}
main().catch(console.error).finally(() => prisma.$disconnect());
