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
  // ── Constitución Política ──
  {
    texto: '¿Cuál artículo de la Constitución Política de Colombia consagra los principios de la función pública (igualdad, moralidad, eficacia, economía, celeridad, imparcialidad y publicidad)?',
    categoria: 'Constitución Política',
    dificultad: 'BASICO',
    explicacion: 'El Art. 209 CP enuncia los siete principios de la función administrativa. El Art. 122 regula los empleos públicos; el 125 la carrera administrativa; el 123 define los servidores públicos. Solo el 209 lista los siete principios.',
    opciones: [
      { letra: 'A', texto: 'Artículo 122', esCorrecta: false },
      { letra: 'B', texto: 'Artículo 123', esCorrecta: false },
      { letra: 'C', texto: 'Artículo 209', esCorrecta: true },
      { letra: 'D', texto: 'Artículo 125', esCorrecta: false },
    ],
  },
  {
    texto: 'Según el Art. 123 de la Constitución, ¿quiénes son servidores públicos?',
    categoria: 'Constitución Política',
    dificultad: 'BASICO',
    explicacion: 'El Art. 123 CP define servidores públicos como los miembros de corporaciones públicas, empleados y trabajadores del Estado y sus entidades descentralizadas. Los contratistas NO son servidores públicos.',
    opciones: [
      { letra: 'A', texto: 'Solo los empleados de carrera administrativa', esCorrecta: false },
      { letra: 'B', texto: 'Miembros de corporaciones públicas, empleados y trabajadores del Estado y sus entidades descentralizadas', esCorrecta: true },
      { letra: 'C', texto: 'Únicamente los funcionarios del poder ejecutivo', esCorrecta: false },
      { letra: 'D', texto: 'Contratistas y empleados públicos por igual', esCorrecta: false },
    ],
  },
  {
    texto: '¿Qué establece el Art. 125 de la Constitución sobre el ingreso a los cargos de carrera administrativa?',
    categoria: 'Constitución Política',
    dificultad: 'INTERMEDIO',
    explicacion: 'El Art. 125 CP establece que los empleos en los órganos y entidades del Estado son de carrera, excepto los de elección popular, libre nombramiento, períodos fijos y los demás que determine la ley. El ingreso debe hacerse previo concurso de méritos.',
    opciones: [
      { letra: 'A', texto: 'Todos los cargos públicos son de libre nombramiento y remoción', esCorrecta: false },
      { letra: 'B', texto: 'El ingreso a cargos de carrera se realiza previo concurso de méritos', esCorrecta: true },
      { letra: 'C', texto: 'Solo el Presidente puede nombrar servidores de carrera', esCorrecta: false },
      { letra: 'D', texto: 'Los cargos de carrera son hereditarios en entidades descentralizadas', esCorrecta: false },
    ],
  },
  {
    texto: '¿Cuál es la consecuencia constitucional de que un servidor público ejerza funciones distintas a las asignadas por la Constitución o la ley, según el Art. 6 CP?',
    categoria: 'Constitución Política',
    dificultad: 'INTERMEDIO',
    explicacion: 'El Art. 6 CP establece que los particulares solo son responsables ante las autoridades por infringir la ley, pero los servidores públicos son responsables por la misma causa y además por omisión o extralimitación en el ejercicio de sus funciones.',
    opciones: [
      { letra: 'A', texto: 'Sanciones únicamente de carácter penal', esCorrecta: false },
      { letra: 'B', texto: 'Responsabilidad disciplinaria, penal, civil y fiscal según sea el caso', esCorrecta: true },
      { letra: 'C', texto: 'Suspensión automática por 30 días hábiles', esCorrecta: false },
      { letra: 'D', texto: 'Ninguna, si actúa de buena fe', esCorrecta: false },
    ],
  },
  {
    texto: '¿Qué garantiza el Art. 53 de la Constitución Política en el marco de la relación laboral de los servidores públicos?',
    categoria: 'Constitución Política',
    dificultad: 'AVANZADO',
    explicacion: 'El Art. 53 CP establece los principios mínimos del trabajo: igualdad de oportunidades, remuneración mínima, estabilidad en el empleo, irrenunciabilidad de beneficios mínimos, situación más favorable al trabajador en caso de duda, primacía de la realidad. Aplica también al empleo público.',
    opciones: [
      { letra: 'A', texto: 'Solo el derecho a la huelga de los trabajadores privados', esCorrecta: false },
      { letra: 'B', texto: 'Los principios mínimos del trabajo, como la estabilidad y la primacía de la realidad', esCorrecta: true },
      { letra: 'C', texto: 'La libre negociación colectiva exclusiva del sector privado', esCorrecta: false },
      { letra: 'D', texto: 'La prohibición de despidos colectivos en entidades públicas', esCorrecta: false },
    ],
  },

  // ── Ley 909 de 2004 ──
  {
    texto: '¿Cuál es el objeto principal de la Ley 909 de 2004?',
    categoria: 'Ley 909',
    dificultad: 'BASICO',
    explicacion: 'La Ley 909 de 2004 regula el sistema de carrera administrativa, la función pública y el empleo público en Colombia. No regula contratación estatal (Ley 80/93), seguridad social (Ley 100/93) ni disciplina (Ley 1952/19).',
    opciones: [
      { letra: 'A', texto: 'Regular la contratación estatal y la responsabilidad fiscal', esCorrecta: false },
      { letra: 'B', texto: 'Establecer el sistema de carrera administrativa y la función pública en Colombia', esCorrecta: true },
      { letra: 'C', texto: 'Definir el régimen de seguridad social de los empleados públicos', esCorrecta: false },
      { letra: 'D', texto: 'Reglamentar el Código Disciplinario Único', esCorrecta: false },
    ],
  },
  {
    texto: '¿Qué entidad es la encargada de administrar el sistema de carrera administrativa general según la Ley 909 de 2004?',
    categoria: 'Ley 909',
    dificultad: 'BASICO',
    explicacion: 'La CNSC (Comisión Nacional del Servicio Civil) es el órgano de administración y vigilancia de las carreras de los servidores públicos, según el Art. 11 de la Ley 909. El DAFP orienta políticas pero no administra la carrera.',
    opciones: [
      { letra: 'A', texto: 'Departamento Administrativo de la Función Pública (DAFP)', esCorrecta: false },
      { letra: 'B', texto: 'Ministerio del Interior', esCorrecta: false },
      { letra: 'C', texto: 'Comisión Nacional del Servicio Civil (CNSC)', esCorrecta: true },
      { letra: 'D', texto: 'Contraloría General de la República', esCorrecta: false },
    ],
  },
  {
    texto: 'Según la Ley 909 de 2004, ¿qué empleos están excluidos del sistema general de carrera administrativa?',
    categoria: 'Ley 909',
    dificultad: 'INTERMEDIO',
    explicacion: 'El Art. 5 de la Ley 909 excluye de la carrera general: empleos de elección popular, libre nombramiento y remoción, trabajadores oficiales, período fijo y los de las carreras especiales (diplomática, judicial, docente, etc.).',
    opciones: [
      { letra: 'A', texto: 'Solo los empleos de alto gobierno y presidencia', esCorrecta: false },
      { letra: 'B', texto: 'Empleos de elección popular, libre nombramiento, período fijo y carreras especiales', esCorrecta: true },
      { letra: 'C', texto: 'Todos los empleos con remuneración superior a 10 SMLV', esCorrecta: false },
      { letra: 'D', texto: 'Únicamente los cargos del nivel directivo', esCorrecta: false },
    ],
  },
  {
    texto: '¿Qué derechos de carrera adquiere un empleado que supera satisfactoriamente el período de prueba, conforme a la Ley 909 de 2004?',
    categoria: 'Ley 909',
    dificultad: 'INTERMEDIO',
    explicacion: 'Según el Art. 31 Ley 909, al superar el período de prueba el empleado inscribe su nombre en el registro público de la CNSC y adquiere los derechos de carrera: estabilidad, ascenso por mérito, capacitación y demás garantías del sistema.',
    opciones: [
      { letra: 'A', texto: 'Solo el derecho a permanecer en el cargo sin evaluación', esCorrecta: false },
      { letra: 'B', texto: 'Estabilidad laboral, derecho al ascenso por mérito y a la capacitación', esCorrecta: true },
      { letra: 'C', texto: 'Libre nombramiento automático en nivel directivo', esCorrecta: false },
      { letra: 'D', texto: 'Exención de evaluación de desempeño por cinco años', esCorrecta: false },
    ],
  },
  {
    texto: '¿Qué causal puede dar lugar a la declaratoria de insubsistencia de un empleado de carrera administrativa?',
    categoria: 'Ley 909',
    dificultad: 'AVANZADO',
    explicacion: 'El Art. 41 Ley 909 establece que la calificación no satisfactoria en la evaluación de desempeño es causal para declarar la insubsistencia. Un empleado de carrera NO puede ser declarado insubsistente por conveniencia o libre decisión del nominador.',
    opciones: [
      { letra: 'A', texto: 'Necesidad del servicio o conveniencia institucional', esCorrecta: false },
      { letra: 'B', texto: 'Calificación no satisfactoria en la evaluación del desempeño', esCorrecta: true },
      { letra: 'C', texto: 'Solicitud del jefe inmediato sin motivación', esCorrecta: false },
      { letra: 'D', texto: 'Cambio de gobierno o de administración', esCorrecta: false },
    ],
  },
];

async function main() {
  console.log('\n=== SEED TRANSVERSAL GLOBAL — Lote 1/5 (preguntas 1-10) ===\n');

  const inicial = await prisma.pregunta.count({
    where: { poolKey: 'TRANSVERSAL_GLOBAL', tipo: 'FUNCIONAL_TRANSVERSAL' },
  });
  console.log(`Conteo inicial en pool: ${inicial}`);

  const existentes = await prisma.pregunta.findMany({
    where: { poolKey: 'TRANSVERSAL_GLOBAL' },
    select: { texto: true },
  });

  let insertadas = 0;
  let descartadas = 0;

  for (const pq of PREGUNTAS) {
    const esDuplicado = existentes.some(e => overlap(e.texto, pq.texto) > 0.7);
    if (esDuplicado) {
      console.log(`  ⚠ DESCARTADA (duplicado): ${pq.texto.substring(0, 60)}...`);
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
    console.log(`  ✓ Insertada: ${pq.texto.substring(0, 70)}...`);
  }

  const final = await prisma.pregunta.count({
    where: { poolKey: 'TRANSVERSAL_GLOBAL', tipo: 'FUNCIONAL_TRANSVERSAL' },
  });

  console.log(`\n── Resumen Lote 1 ──`);
  console.log(`  Inicial: ${inicial} | Insertadas: ${insertadas} | Descartadas: ${descartadas} | Total ahora: ${final}`);
  console.log('✅ Lote 1 completo. Ejecuta: npx ts-node --project tsconfig.scripts.json --env-file .env.local scripts/seed-transversal-2.ts');
}

main().catch(console.error).finally(() => prisma.$disconnect());
