import { PrismaClient, TipoPregunta, NivelDificultad } from '@prisma/client';
const prisma = new PrismaClient();
type Opcion = { letra: string; texto: string; esCorrecta: boolean };
type PQ = { texto: string; categoria: string; dificultad: NivelDificultad; explicacion: string; opciones: Opcion[] };

// 10 preguntas adicionales: 1 por tema (redondeando a 50 totales entre los 5 lotes)
const PREGUNTAS: PQ[] = [
  {
    texto: '¿Qué mecanismo constitucional permite a los ciudadanos participar directamente en las decisiones que los afectan, según la Constitución de 1991?',
    categoria: 'Constitución Política',
    dificultad: 'INTERMEDIO',
    explicacion: 'El Art. 103 CP consagra los mecanismos de participación ciudadana: voto, plebiscito, referendo, consulta popular, cabildo abierto, iniciativa legislativa y revocatoria del mandato. La tutela es un mecanismo de protección de derechos, no de participación ciudadana directa.',
    opciones: [
      { letra: 'A', texto: 'La acción de tutela', esCorrecta: false },
      { letra: 'B', texto: 'El plebiscito, referendo, consulta popular, cabildo abierto y revocatoria del mandato', esCorrecta: true },
      { letra: 'C', texto: 'El recurso de apelación ante el Consejo de Estado', esCorrecta: false },
      { letra: 'D', texto: 'La acción popular y la acción de grupo', esCorrecta: false },
    ],
  },
  {
    texto: '¿Qué es el período de prueba en la carrera administrativa y cuánto dura, según la Ley 909 de 2004?',
    categoria: 'Ley 909',
    dificultad: 'INTERMEDIO',
    explicacion: 'El Art. 31 Ley 909/04 establece que el período de prueba es la etapa de observación del desempeño del empleado recién nombrado en carrera. Dura entre 2 y 4 meses. Al superarlo satisfactoriamente, el empleado adquiere los derechos de carrera.',
    opciones: [
      { letra: 'A', texto: 'Un mes prorrogable por un mes más', esCorrecta: false },
      { letra: 'B', texto: 'Entre 2 y 4 meses', esCorrecta: true },
      { letra: 'C', texto: 'Seis meses sin posibilidad de prórroga', esCorrecta: false },
      { letra: 'D', texto: 'Un año calendario completo', esCorrecta: false },
    ],
  },
  {
    texto: '¿Qué es el principio de publicidad en el CPACA y cómo se materializa en la práctica?',
    categoria: 'CPACA',
    dificultad: 'BASICO',
    explicacion: 'El principio de publicidad (Art. 3 CPACA) exige que las autoridades den a conocer sus decisiones mediante notificaciones, publicaciones o comunicaciones, para que los interesados puedan ejercer sus derechos. Sin notificación en debida forma, el acto no produce efectos.',
    opciones: [
      { letra: 'A', texto: 'Publicar en redes sociales todas las decisiones administrativas', esCorrecta: false },
      { letra: 'B', texto: 'Dar a conocer las decisiones mediante notificaciones o publicaciones para que produzcan efectos', esCorrecta: true },
      { letra: 'C', texto: 'Transmitir en directo las sesiones de los comités de contratación', esCorrecta: false },
      { letra: 'D', texto: 'Permitir el acceso irrestricto a todos los archivos de la entidad', esCorrecta: false },
    ],
  },
  {
    texto: '¿Cuál es la diferencia entre falta grave y falta gravísima en la Ley 1952 de 2019?',
    categoria: 'Código Disciplinario',
    dificultad: 'AVANZADO',
    explicacion: 'Las faltas gravísimas están taxativamente listadas en el Art. 55 Ley 1952/19; su sanción puede ser destitución e inhabilidad. Las faltas graves y leves se determinan por los criterios de los Arts. 56 y 57 (daño, trascendencia, modalidad, etc.). Solo las gravísimas admiten destitución.',
    opciones: [
      { letra: 'A', texto: 'Las faltas graves siempre son dolosas; las gravísimas pueden ser culposas', esCorrecta: false },
      { letra: 'B', texto: 'Las gravísimas están taxativamente listadas en la ley; las graves y leves se gradúan por criterios', esCorrecta: true },
      { letra: 'C', texto: 'Solo las faltas gravísimas generan responsabilidad penal', esCorrecta: false },
      { letra: 'D', texto: 'No existe diferencia práctica; ambas llevan a destitución', esCorrecta: false },
    ],
  },
  {
    texto: 'Un servidor público que usa los bienes de la entidad para fines personales está vulnerando principalmente:',
    categoria: 'Ética',
    dificultad: 'BASICO',
    explicacion: 'El uso indebido de bienes del Estado viola el deber de diligencia del Código de Integridad, el Art. 35 núm. 15 Ley 1952/19 (prohibición de usar bienes oficiales para fines privados) y el principio constitucional de moralidad (Art. 209 CP). Es falta disciplinaria y puede ser penal (peculado por uso).',
    opciones: [
      { letra: 'A', texto: 'Solo el reglamento interno de la entidad', esCorrecta: false },
      { letra: 'B', texto: 'El deber ético de diligencia, el Código Disciplinario y el principio de moralidad', esCorrecta: true },
      { letra: 'C', texto: 'Únicamente las normas de contratación estatal', esCorrecta: false },
      { letra: 'D', texto: 'El manual de convivencia, sin consecuencias disciplinarias', esCorrecta: false },
    ],
  },
  {
    texto: '¿Puede una petición verbal ser desestimada por una entidad pública por no haberse presentado por escrito, según la Ley 1755 de 2015?',
    categoria: 'Derecho de Petición',
    dificultad: 'AVANZADO',
    explicacion: 'No. El Art. 15 Ley 1755/15 reconoce peticiones verbales, escritas, por medios electrónicos u otros. Cuando se formula verbalmente y el funcionario no puede resolverla en el momento, debe orientar al peticionario para que la presente por escrito. No puede simplemente ignorarla o negarla por el medio usado.',
    opciones: [
      { letra: 'A', texto: 'Sí, solo las peticiones escritas tienen validez legal', esCorrecta: false },
      { letra: 'B', texto: 'No; las peticiones verbales son válidas y deben atenderse o canalizarse por escrito', esCorrecta: true },
      { letra: 'C', texto: 'Solo si la entidad ha adoptado un reglamento que exija la forma escrita', esCorrecta: false },
      { letra: 'D', texto: 'Depende del nivel jerárquico al que va dirigida la petición', esCorrecta: false },
    ],
  },
  {
    texto: '¿Qué tipo de consentimiento exige la Ley 1581 de 2012 para el tratamiento de datos personales de menores de edad?',
    categoria: 'Protección de Datos',
    dificultad: 'AVANZADO',
    explicacion: 'El Art. 7 Ley 1581/12 prohíbe el tratamiento de datos de menores salvo que sea de naturaleza pública y responda al interés superior del menor. La autorización debe ser otorgada por sus representantes legales (padres o tutores) y siempre prevalece el interés superior del menor.',
    opciones: [
      { letra: 'A', texto: 'El menor puede dar su propio consentimiento si tiene más de 12 años', esCorrecta: false },
      { letra: 'B', texto: 'Debe ser autorizado por sus representantes legales y prevalecer el interés superior del menor', esCorrecta: true },
      { letra: 'C', texto: 'No se requiere consentimiento si los datos son de dominio público', esCorrecta: false },
      { letra: 'D', texto: 'Requiere aprobación del ICBF en todos los casos', esCorrecta: false },
    ],
  },
  {
    texto: '¿Cuál es el propósito del Formulario Único de Reporte de Avances de la Gestión (FURAG) en el MIPG?',
    categoria: 'MIPG',
    dificultad: 'AVANZADO',
    explicacion: 'El FURAG es el instrumento de reporte anual mediante el cual las entidades públicas reportan al DAFP el nivel de implementación de las políticas de gestión y desempeño del MIPG. Sus resultados generan el Índice de Desempeño Institucional (IDI) que permite comparar entidades.',
    opciones: [
      { letra: 'A', texto: 'Registrar los contratos suscritos por la entidad durante la vigencia', esCorrecta: false },
      { letra: 'B', texto: 'Reportar el nivel de implementación del MIPG y generar el Índice de Desempeño Institucional', esCorrecta: true },
      { letra: 'C', texto: 'Calcular el presupuesto de gastos de funcionamiento del año siguiente', esCorrecta: false },
      { letra: 'D', texto: 'Certificar el cumplimiento de la norma ISO 9001 en entidades públicas', esCorrecta: false },
    ],
  },
  {
    texto: 'En el sistema de control interno, ¿qué son los planes de mejoramiento?',
    categoria: 'Control Interno',
    dificultad: 'INTERMEDIO',
    explicacion: 'Los planes de mejoramiento son instrumentos de gestión donde la entidad define acciones correctivas y preventivas para subsanar las deficiencias detectadas por la Oficina de Control Interno o por entes de control externo. Son obligatorios cuando se encuentran hallazgos (Decreto 648/17).',
    opciones: [
      { letra: 'A', texto: 'Documentos de planificación del presupuesto a largo plazo', esCorrecta: false },
      { letra: 'B', texto: 'Acciones correctivas y preventivas para subsanar hallazgos de control interno o externo', esCorrecta: true },
      { letra: 'C', texto: 'Planes de capacitación del talento humano', esCorrecta: false },
      { letra: 'D', texto: 'Proyectos de inversión para mejorar la infraestructura institucional', esCorrecta: false },
    ],
  },
  {
    texto: '¿Cuál es la diferencia entre un expediente y un documento en el marco de la Ley 594 de 2000?',
    categoria: 'Gestión Documental',
    dificultad: 'AVANZADO',
    explicacion: 'Según la Ley 594/2000 y el Acuerdo 042 del AGN, un documento es la unidad informativa básica (escrito, imagen, grabación). El expediente es el conjunto de documentos relacionados con un mismo asunto o trámite, organizados cronológicamente. El expediente es la unidad archivística de conservación y consulta.',
    opciones: [
      { letra: 'A', texto: 'No hay diferencia; expediente y documento son sinónimos', esCorrecta: false },
      { letra: 'B', texto: 'El expediente es el conjunto de documentos relacionados con un mismo asunto o trámite', esCorrecta: true },
      { letra: 'C', texto: 'El expediente es solo el documento físico; el documento puede ser digital', esCorrecta: false },
      { letra: 'D', texto: 'El expediente corresponde únicamente a procesos judiciales', esCorrecta: false },
    ],
  },
];

async function main() {
  console.log('\n=== SEED TRANSVERSAL GLOBAL — Lote 5/5 (últimas 10 preguntas) ===\n');
  const inicial = await prisma.pregunta.count({ where: { poolKey: 'TRANSVERSAL_GLOBAL', tipo: 'FUNCIONAL_TRANSVERSAL' } });
  console.log(`Conteo actual: ${inicial}`);
  const existentes = await prisma.pregunta.findMany({ where: { poolKey: 'TRANSVERSAL_GLOBAL' }, select: { texto: true } });
  let insertadas = 0; let descartadas = 0;
  for (const pq of PREGUNTAS) {
    const words = new Set(pq.texto.toLowerCase().split(/\s+/));
    const dup = existentes.some(e => { const ew = e.texto.toLowerCase().split(/\s+/); return ew.filter(w => words.has(w)).length / ew.length > 0.7; });
    if (dup) { descartadas++; console.log(`  ⚠ DESCARTADA: ${pq.texto.substring(0, 60)}...`); continue; }
    await prisma.pregunta.create({ data: { tipo: TipoPregunta.FUNCIONAL_TRANSVERSAL, texto: pq.texto, poolKey: 'TRANSVERSAL_GLOBAL', validada: true, categoria: pq.categoria, dificultad: pq.dificultad as NivelDificultad, explicacion: pq.explicacion, opciones: { create: pq.opciones } } });
    insertadas++; existentes.push({ texto: pq.texto });
    console.log(`  ✓ ${pq.categoria} | ${pq.dificultad}: ${pq.texto.substring(0, 65)}...`);
  }
  const final = await prisma.pregunta.count({ where: { poolKey: 'TRANSVERSAL_GLOBAL', tipo: 'FUNCIONAL_TRANSVERSAL' } });
  console.log(`\n${'═'.repeat(55)}`);
  console.log(`  SEED COMPLETO`);
  console.log(`  Conteo inicial (antes del lote 1): ver output del lote 1`);
  console.log(`  Total actual en pool:               ${final}`);
  console.log(`  Insertadas este lote:               ${insertadas}`);
  console.log(`  Descartadas este lote:              ${descartadas}`);
  console.log(`${'═'.repeat(55)}\n`);
}
main().catch(console.error).finally(() => prisma.$disconnect());
