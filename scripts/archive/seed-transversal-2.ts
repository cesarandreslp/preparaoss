import { PrismaClient, TipoPregunta, NivelDificultad } from '@prisma/client';

const prisma = new PrismaClient();

type Opcion = { letra: string; texto: string; esCorrecta: boolean };
type PQ = { texto: string; categoria: string; dificultad: NivelDificultad; explicacion: string; opciones: Opcion[] };

function overlap(a: string, b: string): number {
  const wa = new Set(a.toLowerCase().split(/\s+/));
  const wb = b.toLowerCase().split(/\s+/);
  const hits = wb.filter(w => wa.has(w)).length;
  return wb.length === 0 ? 0 : hits / wb.length;
}

const PREGUNTAS: PQ[] = [
  // ── CPACA Ley 1437 de 2011 ──
  {
    texto: '¿Cuál es el plazo máximo para resolver una petición de interés general presentada ante una entidad pública, según la Ley 1437 de 2011 (CPACA)?',
    categoria: 'CPACA',
    dificultad: 'BASICO',
    explicacion: 'El Art. 14 CPACA fija 15 días hábiles para peticiones de interés general o particular, salvo que norma especial señale otro término. Las quejas y reclamos tienen el mismo plazo. Las consultas tienen 30 días hábiles.',
    opciones: [
      { letra: 'A', texto: '30 días calendario', esCorrecta: false },
      { letra: 'B', texto: '15 días hábiles', esCorrecta: true },
      { letra: 'C', texto: '10 días hábiles', esCorrecta: false },
      { letra: 'D', texto: '5 días hábiles', esCorrecta: false },
    ],
  },
  {
    texto: '¿Qué recurso procede en sede administrativa cuando el acto no agota la vía gubernativa y el interesado no está de acuerdo con la decisión?',
    categoria: 'CPACA',
    dificultad: 'INTERMEDIO',
    explicacion: 'El Art. 74 CPACA establece que contra actos definitivos procede el recurso de reposición ante el mismo funcionario (optativo) y apelación ante el superior. El recurso de queja procede cuando se niega el de apelación. La nulidad es acción contencioso-administrativa, no recurso en sede administrativa.',
    opciones: [
      { letra: 'A', texto: 'Acción de nulidad simple', esCorrecta: false },
      { letra: 'B', texto: 'Recurso de reposición y/o apelación', esCorrecta: true },
      { letra: 'C', texto: 'Recurso de casación', esCorrecta: false },
      { letra: 'D', texto: 'Acción de tutela inmediata', esCorrecta: false },
    ],
  },
  {
    texto: 'En el CPACA, ¿cuándo se entiende que el silencio administrativo es positivo?',
    categoria: 'CPACA',
    dificultad: 'AVANZADO',
    explicacion: 'El Art. 83 CPACA establece que el silencio administrativo es positivo solo cuando la ley expresamente así lo disponga. La regla general es que el silencio es negativo (Art. 83). El interesado puede invocar el silencio positivo mediante escrito bajo la gravedad de juramento.',
    opciones: [
      { letra: 'A', texto: 'Siempre que la entidad no responda en 15 días hábiles', esCorrecta: false },
      { letra: 'B', texto: 'Solo cuando la ley expresamente lo disponga así', esCorrecta: true },
      { letra: 'C', texto: 'Cuando el peticionario sea una persona jurídica de derecho público', esCorrecta: false },
      { letra: 'D', texto: 'Nunca; el silencio administrativo siempre es negativo en Colombia', esCorrecta: false },
    ],
  },
  {
    texto: '¿Ante qué jurisdicción se demandan los actos administrativos de las entidades del orden nacional en Colombia, según el CPACA?',
    categoria: 'CPACA',
    dificultad: 'INTERMEDIO',
    explicacion: 'La Jurisdicción Contencioso Administrativa (Consejo de Estado y Tribunales Administrativos) conoce de las demandas contra actos, hechos y contratos de entidades públicas. El CPACA en su Art. 104 fija esta competencia.',
    opciones: [
      { letra: 'A', texto: 'Jurisdicción ordinaria civil', esCorrecta: false },
      { letra: 'B', texto: 'Jurisdicción contencioso administrativa', esCorrecta: true },
      { letra: 'C', texto: 'Jurisdicción constitucional', esCorrecta: false },
      { letra: 'D', texto: 'Jurisdicción penal especializada', esCorrecta: false },
    ],
  },
  {
    texto: '¿Qué principio del CPACA obliga a la administración a resolver todos los asuntos planteados por los administrados, incluyendo los no formulados expresamente, cuando se infieran del contexto?',
    categoria: 'CPACA',
    dificultad: 'AVANZADO',
    explicacion: 'El principio de eficacia (Art. 3 CPACA) exige que las autoridades remuevan obstáculos formales. El de decisión (congruencia) obliga a resolver todos los asuntos del expediente. El principio específico es el de eficacia e informalidad conjuntamente. El de economía busca la celeridad.',
    opciones: [
      { letra: 'A', texto: 'Principio de publicidad', esCorrecta: false },
      { letra: 'B', texto: 'Principio de eficacia e informalidad', esCorrecta: true },
      { letra: 'C', texto: 'Principio de moralidad', esCorrecta: false },
      { letra: 'D', texto: 'Principio de igualdad', esCorrecta: false },
    ],
  },

  // ── Código Disciplinario (Ley 1952 de 2019) ──
  {
    texto: '¿A quiénes aplica la Ley 1952 de 2019 (Código General Disciplinario)?',
    categoria: 'Código Disciplinario',
    dificultad: 'BASICO',
    explicacion: 'El Art. 1 de la Ley 1952 aplica a los servidores públicos y excepcionalmente a los particulares que ejerzan funciones públicas. No aplica a los miembros de la Fuerza Pública en lo atinente a la disciplina militar (tienen régimen especial).',
    opciones: [
      { letra: 'A', texto: 'Solo a los empleados de libre nombramiento y remoción', esCorrecta: false },
      { letra: 'B', texto: 'Servidores públicos y particulares que ejerzan funciones públicas', esCorrecta: true },
      { letra: 'C', texto: 'Únicamente a los servidores de carrera administrativa', esCorrecta: false },
      { letra: 'D', texto: 'Solo a los contratistas del Estado que reciban salario fijo', esCorrecta: false },
    ],
  },
  {
    texto: '¿Cuál es la sanción disciplinaria más grave que puede imponer la Procuraduría General de la Nación?',
    categoria: 'Código Disciplinario',
    dificultad: 'BASICO',
    explicacion: 'El Art. 48 Ley 1952 establece como sanciones: amonestación escrita, multa, suspensión e inhabilidad general. La destitución e inhabilidad general es la máxima sanción, inhabilitando hasta 20 años para ejercer cargos públicos.',
    opciones: [
      { letra: 'A', texto: 'Suspensión temporal del cargo por 180 días', esCorrecta: false },
      { letra: 'B', texto: 'Destitución e inhabilidad general', esCorrecta: true },
      { letra: 'C', texto: 'Multa equivalente a 180 días de salario', esCorrecta: false },
      { letra: 'D', texto: 'Amonestación escrita con anotación en hoja de vida', esCorrecta: false },
    ],
  },
  {
    texto: '¿Cuál es el término de prescripción de la acción disciplinaria para faltas gravísimas, según la Ley 1952 de 2019?',
    categoria: 'Código Disciplinario',
    dificultad: 'INTERMEDIO',
    explicacion: 'El Art. 34 Ley 1952 establece que la acción disciplinaria prescribe en 5 años para faltas gravísimas y graves, contados desde la ocurrencia del hecho. Para faltas leves el término es de 2 años. El cómputo se interrumpe con la apertura de investigación.',
    opciones: [
      { letra: 'A', texto: '2 años', esCorrecta: false },
      { letra: 'B', texto: '10 años', esCorrecta: false },
      { letra: 'C', texto: '5 años', esCorrecta: true },
      { letra: 'D', texto: '3 años', esCorrecta: false },
    ],
  },
  {
    texto: 'En el proceso disciplinario ordinario de la Ley 1952 de 2019, ¿en cuál etapa se formulan los cargos?',
    categoria: 'Código Disciplinario',
    dificultad: 'INTERMEDIO',
    explicacion: 'El proceso disciplinario ordinario tiene: indagación preliminar, investigación disciplinaria, calificación provisional (pliego de cargos), juicio, fallo de primera instancia y fallo de segunda instancia. El pliego de cargos se expide al final de la investigación (Art. 161 Ley 1952).',
    opciones: [
      { letra: 'A', texto: 'Durante la indagación preliminar', esCorrecta: false },
      { letra: 'B', texto: 'Al iniciar la investigación disciplinaria', esCorrecta: false },
      { letra: 'C', texto: 'Al finalizar la investigación disciplinaria, mediante pliego de cargos', esCorrecta: true },
      { letra: 'D', texto: 'Únicamente ante el fallo de primera instancia', esCorrecta: false },
    ],
  },
  {
    texto: '¿Qué principio disciplinario impide juzgar dos veces a un servidor público por la misma conducta?',
    categoria: 'Código Disciplinario',
    dificultad: 'AVANZADO',
    explicacion: 'El principio non bis in idem (Art. 11 Ley 1952) prohíbe que un servidor sea investigado o sancionado disciplinariamente más de una vez por la misma conducta. Sin embargo, la sanción disciplinaria es independiente de la penal, fiscal o civil, pues protegen bienes jurídicos distintos.',
    opciones: [
      { letra: 'A', texto: 'Principio de legalidad', esCorrecta: false },
      { letra: 'B', texto: 'Principio non bis in idem', esCorrecta: true },
      { letra: 'C', texto: 'Principio de proporcionalidad', esCorrecta: false },
      { letra: 'D', texto: 'Principio de culpabilidad', esCorrecta: false },
    ],
  },

  // ── Ética del servidor público ──
  {
    texto: '¿Cuál de los siguientes valores es considerado fundamental en el Código de Integridad del Servidor Público colombiano adoptado por el DAFP?',
    categoria: 'Ética',
    dificultad: 'BASICO',
    explicacion: 'El Código de Integridad (DAFP, 2018) define cinco valores: Honestidad, Respeto, Compromiso, Diligencia y Justicia. Estos orientan el comportamiento de todos los servidores del Estado. La "burocracia" no es un valor ético; la "eficiencia" es un principio, no un valor del Código.',
    opciones: [
      { letra: 'A', texto: 'Eficiencia presupuestal', esCorrecta: false },
      { letra: 'B', texto: 'Honestidad', esCorrecta: true },
      { letra: 'C', texto: 'Burocracia ordenada', esCorrecta: false },
      { letra: 'D', texto: 'Rentabilidad social', esCorrecta: false },
    ],
  },
  {
    texto: '¿Qué implica el conflicto de interés para un servidor público colombiano?',
    categoria: 'Ética',
    dificultad: 'INTERMEDIO',
    explicacion: 'El conflicto de interés existe cuando el servidor tiene un interés particular (económico, familiar, amistoso) que puede afectar la imparcialidad en el ejercicio de sus funciones. La Ley 1952/19 (Art. 40) y la Constitución (Art. 182) obligan a declararlo y apartarse del asunto.',
    opciones: [
      { letra: 'A', texto: 'Situación en la que el servidor recibe dos salarios del Estado', esCorrecta: false },
      { letra: 'B', texto: 'Cuando el servidor tiene un interés particular que puede comprometer su imparcialidad', esCorrecta: true },
      { letra: 'C', texto: 'Desacuerdo entre el servidor y su jefe sobre una decisión administrativa', esCorrecta: false },
      { letra: 'D', texto: 'Competencia entre dos entidades del mismo nivel por los mismos recursos', esCorrecta: false },
    ],
  },
  {
    texto: '¿Cuál es la conducta éticamente correcta cuando un servidor público recibe un regalo de un contratista durante un proceso de selección?',
    categoria: 'Ética',
    dificultad: 'BASICO',
    explicacion: 'El Código de Integridad y la Ley 1952/19 (Art. 35 núm. 3) prohíben al servidor recibir dádivas, presentes u obsequios en razón de su cargo. La conducta correcta es rechazar el regalo e informar al superior y/o a la oficina de control interno disciplinario.',
    opciones: [
      { letra: 'A', texto: 'Aceptarlo si el valor no supera un salario mínimo diario', esCorrecta: false },
      { letra: 'B', texto: 'Rechazarlo e informar al superior y a control interno disciplinario', esCorrecta: true },
      { letra: 'C', texto: 'Declararlo en la hoja de vida y conservarlo', esCorrecta: false },
      { letra: 'D', texto: 'Donarlo a una fundación benéfica sin reportarlo', esCorrecta: false },
    ],
  },
  {
    texto: '¿Qué diferencia existe entre la ética pública y la legalidad en el ejercicio de la función pública?',
    categoria: 'Ética',
    dificultad: 'AVANZADO',
    explicacion: 'La legalidad exige actuar conforme a la norma jurídica vigente. La ética pública va más allá: exige actuar con integridad, transparencia y orientación al bien común, incluso en espacios de discrecionalidad donde la ley no prohíbe explícitamente. Una acción puede ser legal pero no ética.',
    opciones: [
      { letra: 'A', texto: 'No existe diferencia; lo legal siempre es ético', esCorrecta: false },
      { letra: 'B', texto: 'La ética exige más que la legalidad: orienta el ejercicio discrecional hacia el bien común', esCorrecta: true },
      { letra: 'C', texto: 'La ética aplica solo a los directivos; la legalidad a todos los servidores', esCorrecta: false },
      { letra: 'D', texto: 'La ética es subjetiva y no tiene aplicación en el derecho administrativo', esCorrecta: false },
    ],
  },
  {
    texto: 'El deber de transparencia de un servidor público implica, entre otras cosas:',
    categoria: 'Ética',
    dificultad: 'INTERMEDIO',
    explicacion: 'La transparencia (Art. 209 CP, Ley 1712/14) exige que las actuaciones y decisiones de los servidores sean accesibles, comprensibles y verificables por la ciudadanía. Incluye publicar información de oficio, rendir cuentas y actuar de forma que cualquier ciudadano pueda examinar el proceso.',
    opciones: [
      { letra: 'A', texto: 'Guardar reserva absoluta sobre todos los actos administrativos internos', esCorrecta: false },
      { letra: 'B', texto: 'Que sus actuaciones y decisiones sean accesibles y verificables por la ciudadanía', esCorrecta: true },
      { letra: 'C', texto: 'Publicar únicamente los actos que beneficien a la comunidad', esCorrecta: false },
      { letra: 'D', texto: 'Informar solo a sus superiores jerárquicos sobre sus decisiones', esCorrecta: false },
    ],
  },
];

async function main() {
  console.log('\n=== SEED TRANSVERSAL GLOBAL — Lote 2/5 (preguntas 11-25) ===\n');

  const inicial = await prisma.pregunta.count({
    where: { poolKey: 'TRANSVERSAL_GLOBAL', tipo: 'FUNCIONAL_TRANSVERSAL' },
  });
  console.log(`Conteo actual en pool: ${inicial}`);

  const existentes = await prisma.pregunta.findMany({
    where: { poolKey: 'TRANSVERSAL_GLOBAL' },
    select: { texto: true },
  });

  let insertadas = 0;
  let descartadas = 0;

  for (const pq of PREGUNTAS) {
    const esDuplicado = existentes.some(e => e.texto.toLowerCase().split(/\s+/).filter(w => pq.texto.toLowerCase().includes(w)).length / pq.texto.toLowerCase().split(/\s+/).length > 0.7);
    if (esDuplicado) {
      console.log(`  ⚠ DESCARTADA: ${pq.texto.substring(0, 60)}...`);
      descartadas++;
      continue;
    }
    await prisma.pregunta.create({
      data: {
        tipo: TipoPregunta.FUNCIONAL_TRANSVERSAL,
        texto: pq.texto,
        poolKey: 'TRANSVERSAL_GLOBAL',
        validada: true,
        categoria: pq.categoria,
        dificultad: pq.dificultad as NivelDificultad,
        explicacion: pq.explicacion,
        opciones: { create: pq.opciones },
      },
    });
    insertadas++;
    existentes.push({ texto: pq.texto });
    console.log(`  ✓ ${pq.categoria} | ${pq.dificultad}: ${pq.texto.substring(0, 65)}...`);
  }

  const final = await prisma.pregunta.count({
    where: { poolKey: 'TRANSVERSAL_GLOBAL', tipo: 'FUNCIONAL_TRANSVERSAL' },
  });
  console.log(`\n── Resumen Lote 2 ── Insertadas: ${insertadas} | Descartadas: ${descartadas} | Total ahora: ${final}`);
  console.log('✅ Lote 2 completo. Ejecuta: npx ts-node --project tsconfig.scripts.json scripts/seed-transversal-3.ts');
}

main().catch(console.error).finally(() => prisma.$disconnect());
