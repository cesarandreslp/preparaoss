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
  // ── Integridad / Ética (Nivel 4: criterio / imparcialidad) ──
  { texto: '¿Con qué frecuencia mantiene su posición técnica basada en evidencias ante presiones de directivos para modificar un informe en favor de intereses políticos particulares?', categoria: 'Integridad / Ética', explicacion: 'La integridad técnica es fundamental en el nivel asesor para garantizar la legalidad y objetividad. La opción 5 es la única esperada.', opciones: L(5) },
  { texto: 'Cuando detecta un conflicto de interés en un proceso de contratación donde usted asesora técnicamente, ¿con qué frecuencia se declara impedido de inmediato?', categoria: 'Integridad / Ética', explicacion: 'La transparencia es obligatoria por ley y ética. La opción 5 es la norma absoluta en el servicio público.', opciones: L(5) },
  { texto: '¿Con qué frecuencia actúa como un modelo de conducta ética para los profesionales a su cargo, fomentando el respeto por lo público y la transparencia?', categoria: 'Integridad / Ética', explicacion: 'El asesor debe ser un referente de integridad. La opción 4 o 5 indica un liderazgo ético consolidado.', opciones: L(5) },
  { texto: 'Al manejar información privilegiada sobre planes de desarrollo institucional, ¿con qué frecuencia se abstiene de usarla para beneficio propio o de terceros?', categoria: 'Integridad / Ética', explicacion: 'El uso indebido de información privilegiada es una falta gravísima. La opción 5 es la conducta legal y ética esperada.', opciones: L(5) },
  { texto: 'Cuando observa prácticas administrativas poco transparentes en otras áreas de la entidad, ¿con qué frecuencia propone mecanismos de control y auditoría preventiva?', categoria: 'Integridad / Ética', explicacion: 'El asesor contribuye activamente al fortalecimiento de la transparencia institucional. La opción 4 refleja un compromiso proactivo.', opciones: L(4) },
  // ── Orientación al servicio (Nivel 4: diseño de experiencia / impacto) ──
  { texto: '¿Con qué frecuencia diseña e implementa estrategias técnicas para reducir los tiempos de respuesta de la entidad hacia los ciudadanos en trámites críticos?', categoria: 'Orientación al servicio', explicacion: 'El asesor impacta el servicio mediante el diseño de procesos más eficientes. La opción 5 es el desempeño ideal para este nivel.', opciones: L(5) },
  { texto: 'Al recibir retroalimentación negativa de la ciudadanía sobre un servicio, ¿con qué frecuencia lidera el análisis de causa raíz y propone soluciones de fondo?', categoria: 'Orientación al servicio', explicacion: 'Transformar quejas en mejoras estructurales es una función de la asesoría. La opción 4 indica una gestión orientada al ciudadano.', opciones: L(4) },
  { texto: '¿Con qué frecuencia coordina con otras entidades del Estado para simplificar trámites interinstitucionales que afectan al ciudadano común?', categoria: 'Orientación al servicio', explicacion: 'La coordinación interinstitucional es clave para un servicio público moderno. La opción 4 refleja una visión sistémica del servicio.', opciones: L(4) },
  { texto: '¿Con qué frecuencia atiende personalmente solicitudes de información básica en la ventanilla única de la entidad?', categoria: 'Orientación al servicio', explicacion: 'Si bien el servicio es importante, las tareas operativas de ventanilla deben ser delegadas. La respuesta 2 o 3 es realista para un nivel 4.', opciones: L(2) },
  { texto: 'Cuando propone una nueva política institucional, ¿con qué frecuencia incluye mecanismos de consulta ciudadana para validar la aceptación y necesidades del servicio?', categoria: 'Orientación al servicio', explicacion: 'El diseño centrado en el usuario es una competencia de alta asesoría. La opción 4 o 5 indica un enfoque democrático del servicio.', opciones: L(4) },
];
async function main() {
  console.log('\n=== COMPORT NIVEL 4 — Lote 3/5 (Integridad + Servicio) ===\n');
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
