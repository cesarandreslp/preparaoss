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
  // ── Integridad / Ética ──
  { texto: 'Cuando observa que un compañero utiliza los recursos de la oficina (papelería, fotocopias) para fines personales, ¿con qué frecuencia se abstiene de hacer lo mismo aunque no haya vigilancia?', categoria: 'Integridad / Ética', explicacion: 'La integridad implica actuar correctamente aun sin supervisión. Para un auxiliar, el respeto por los recursos públicos es fundamental. La opción 5 (siempre) es la esperada.', opciones: L(5) },
  { texto: 'Si un ciudadano le ofrece un pequeño obsequio como agradecimiento por agilizar su trámite, ¿con qué frecuencia lo rechaza amablemente explicando las normas de la entidad?', categoria: 'Integridad / Ética', explicacion: 'Los servidores públicos tienen prohibido recibir dádivas. La respuesta 5 (siempre) es la única aceptable éticamente.', opciones: L(5) },
  { texto: 'Cuando comete un error en un proceso administrativo que nadie ha notado todavía, ¿con qué frecuencia lo informa a su jefe de inmediato?', categoria: 'Integridad / Ética', explicacion: 'La honestidad sobre los errores propios es vital para la mejora de procesos. La opción 4 o 5 es valorada positivamente.', opciones: L(5) },
  { texto: 'Al manejar información confidencial de ciudadanos en el cumplimiento de sus tareas auxiliares, ¿con qué frecuencia evita comentarla con personas ajenas al proceso?', categoria: 'Integridad / Ética', explicacion: 'El manejo ético de la información es un deber legal y ético. La opción 5 es la norma esperada.', opciones: L(5) },
  { texto: 'Cuando presencia una situación injusta o contraria a los valores de la entidad, ¿con qué frecuencia informa a las instancias correspondientes?', categoria: 'Integridad / Ética', explicacion: 'El compromiso con los valores institucionales requiere valentía ética. La opción 4 es un comportamiento sólido para el nivel operativo.', opciones: L(4) },
  // ── Orientación al servicio ──
  { texto: 'Cuando atiende a un ciudadano que se encuentra visiblemente molesto por un retraso en su trámite, ¿con qué frecuencia mantiene la calma y le ofrece alternativas de solución?', categoria: 'Orientación al servicio', explicacion: 'El manejo de usuarios difíciles requiere empatía y profesionalismo. La opción 4 es la respuesta esperada para un auxiliar de servicio.', opciones: L(4) },
  { texto: 'Cuando un usuario le solicita información que no es competencia de su área, ¿con qué frecuencia se toma el tiempo de orientarlo hacia la oficina correcta?', categoria: 'Orientación al servicio', explicacion: 'La orientación integral es clave en el servicio público. La opción 4 indica un compromiso genuino con el ciudadano.', opciones: L(4) },
  { texto: 'Cuando el volumen de ciudadanos a atender es muy alto, ¿con qué frecuencia mantiene la calidad y calidez en su trato a pesar del cansancio?', categoria: 'Orientación al servicio', explicacion: 'La constancia en el servicio es fundamental. La opción 4 refleja un desempeño profesional estable.', opciones: L(4) },
  { texto: '¿Con qué frecuencia busca activamente formas de agilizar la atención a los ciudadanos en los procesos que están bajo su responsabilidad directa?', categoria: 'Orientación al servicio', explicacion: 'La proactividad en el servicio mejora la percepción ciudadana del Estado. La opción 3 o 4 es valiosa para nivel auxiliar.', opciones: L(4) },
  { texto: 'Al recibir una queja de un ciudadano sobre el servicio, ¿con qué frecuencia la recibe como una oportunidad de mejora y la reporta adecuadamente?', categoria: 'Orientación al servicio', explicacion: 'La gestión de quejas es parte del ciclo de calidad del servicio. La opción 5 es la ideal para registrar y procesar insatisfacciones.', opciones: L(5) },
];
async function main() {
  console.log('\n=== COMPORT NIVEL 1 — Lote 3/5 (Integridad + Servicio) ===\n');
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
  console.log('▶ Siguiente: npx ts-node --project tsconfig.scripts.json scripts/seed-comport1-4.ts');
}
main().catch(console.error).finally(() => prisma.$disconnect());
