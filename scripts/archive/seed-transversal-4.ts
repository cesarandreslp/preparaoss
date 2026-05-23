import { PrismaClient, TipoPregunta, NivelDificultad } from '@prisma/client';
const prisma = new PrismaClient();
type Opcion = { letra: string; texto: string; esCorrecta: boolean };
type PQ = { texto: string; categoria: string; dificultad: NivelDificultad; explicacion: string; opciones: Opcion[] };

const PREGUNTAS: PQ[] = [
  // ── Control Interno — Ley 87 de 1993 ──
  {
    texto: '¿Cuál es el objeto de la Ley 87 de 1993 en materia de control interno?',
    categoria: 'Control Interno',
    dificultad: 'BASICO',
    explicacion: 'La Ley 87/93 establece normas para el ejercicio del control interno en las entidades del Estado. Su propósito es garantizar que las actividades se realicen de acuerdo con los planes, programas y presupuestos, y proteger los recursos públicos.',
    opciones: [
      { letra: 'A', texto: 'Regular el control fiscal externo a cargo de la Contraloría', esCorrecta: false },
      { letra: 'B', texto: 'Establecer normas para el control interno de las entidades del Estado', esCorrecta: true },
      { letra: 'C', texto: 'Crear el sistema de control disciplinario interno', esCorrecta: false },
      { letra: 'D', texto: 'Definir los procedimientos de auditoría del sector privado', esCorrecta: false },
    ],
  },
  {
    texto: '¿Qué elemento del control interno busca asegurar que las operaciones se ejecuten en forma efectiva y se protejan los activos de la entidad?',
    categoria: 'Control Interno',
    dificultad: 'INTERMEDIO',
    explicacion: 'Los controles de actividad (procedimientos de control) son el elemento operativo del MECI/Ley 87 que garantiza la salvaguarda de activos y la efectividad de las operaciones. El ambiente de control es el entorno ético; la evaluación de riesgos identifica amenazas; el monitoreo supervisa.',
    opciones: [
      { letra: 'A', texto: 'Ambiente de control', esCorrecta: false },
      { letra: 'B', texto: 'Evaluación de riesgos', esCorrecta: false },
      { letra: 'C', texto: 'Actividades de control', esCorrecta: true },
      { letra: 'D', texto: 'Información y comunicación', esCorrecta: false },
    ],
  },
  {
    texto: '¿A cargo de quién está el Sistema de Control Interno en una entidad pública colombiana, según la Ley 87 de 1993?',
    categoria: 'Control Interno',
    dificultad: 'BASICO',
    explicacion: 'El Art. 6 Ley 87/93 establece que el control interno es responsabilidad de la máxima autoridad de la entidad (representante legal / jefe del organismo). La Oficina de Control Interno asesora y evalúa, pero la responsabilidad primaria es del directivo.',
    opciones: [
      { letra: 'A', texto: 'Exclusivamente de la Oficina de Control Interno', esCorrecta: false },
      { letra: 'B', texto: 'De la máxima autoridad de la entidad y de todos los servidores', esCorrecta: true },
      { letra: 'C', texto: 'De la Contraloría General de la República', esCorrecta: false },
      { letra: 'D', texto: 'Del Ministerio de Hacienda para entidades del orden nacional', esCorrecta: false },
    ],
  },
  {
    texto: '¿Qué función principal cumple el Jefe de la Oficina de Control Interno en una entidad pública?',
    categoria: 'Control Interno',
    dificultad: 'INTERMEDIO',
    explicacion: 'Según la Ley 87/93 y el Decreto 648/17, el Jefe de Control Interno evalúa el sistema de control interno, asesora a la dirección, elabora informes de seguimiento (planes de mejoramiento), y verifica el cumplimiento de las metas del plan de acción. No ejerce funciones disciplinarias.',
    opciones: [
      { letra: 'A', texto: 'Imponer sanciones disciplinarias a los servidores', esCorrecta: false },
      { letra: 'B', texto: 'Evaluar el sistema de control interno y asesorar a la alta dirección', esCorrecta: true },
      { letra: 'C', texto: 'Aprobar el presupuesto anual de la entidad', esCorrecta: false },
      { letra: 'D', texto: 'Representar judicialmente a la entidad en procesos de control fiscal', esCorrecta: false },
    ],
  },
  {
    texto: '¿Qué diferencia existe entre el control interno y el control fiscal en el Estado colombiano?',
    categoria: 'Control Interno',
    dificultad: 'AVANZADO',
    explicacion: 'El control interno (Ley 87/93) es ejercido por la propia entidad para autogestionar sus riesgos y garantizar eficiencia. El control fiscal (Art. 267 CP, Ley 42/93) es externo, posterior y selectivo, ejercido por la Contraloría para vigilar la gestión fiscal de quienes administran recursos públicos.',
    opciones: [
      { letra: 'A', texto: 'No hay diferencia; ambos los ejerce la Contraloría General', esCorrecta: false },
      { letra: 'B', texto: 'El control interno es ejercido por la propia entidad; el fiscal es externo a cargo de la Contraloría', esCorrecta: true },
      { letra: 'C', texto: 'El control fiscal es preventivo; el control interno es posterior', esCorrecta: false },
      { letra: 'D', texto: 'Solo el control fiscal aplica a entidades del orden nacional', esCorrecta: false },
    ],
  },

  // ── Gestión Documental — Ley 594 de 2000 ──
  {
    texto: '¿Cuál es el objeto de la Ley 594 de 2000 (Ley General de Archivos)?',
    categoria: 'Gestión Documental',
    dificultad: 'BASICO',
    explicacion: 'La Ley 594/2000 establece las reglas y principios generales para la organización, conservación y divulgación del patrimonio documental del Estado. Crea el Sistema Nacional de Archivos (SNA) y define la responsabilidad de entidades públicas y privadas que cumplen funciones públicas.',
    opciones: [
      { letra: 'A', texto: 'Digitalizar todos los archivos físicos del Estado', esCorrecta: false },
      { letra: 'B', texto: 'Establecer reglas para la organización y conservación del patrimonio documental del Estado', esCorrecta: true },
      { letra: 'C', texto: 'Regular la contratación de servicios de almacenamiento documental', esCorrecta: false },
      { letra: 'D', texto: 'Crear la firma digital en Colombia', esCorrecta: false },
    ],
  },
  {
    texto: '¿Qué es la Tabla de Retención Documental (TRD) en el marco de la Ley 594 de 2000?',
    categoria: 'Gestión Documental',
    dificultad: 'BASICO',
    explicacion: 'La TRD es el instrumento archivístico que lista los tipos documentales producidos por una entidad, indicando el tiempo de retención en archivo de gestión y central, y la disposición final (conservación total, eliminación, digitalización o selección). Su elaboración es obligatoria (Art. 24 Ley 594).',
    opciones: [
      { letra: 'A', texto: 'Un registro de usuarios que acceden al archivo de la entidad', esCorrecta: false },
      { letra: 'B', texto: 'El instrumento que define los tiempos de retención y disposición final de los documentos', esCorrecta: true },
      { letra: 'C', texto: 'La lista de documentos clasificados como secretos de Estado', esCorrecta: false },
      { letra: 'D', texto: 'El contrato de almacenamiento documental con un tercero', esCorrecta: false },
    ],
  },
  {
    texto: '¿Cuáles son las etapas del ciclo vital del documento según la Ley 594 de 2000?',
    categoria: 'Gestión Documental',
    dificultad: 'INTERMEDIO',
    explicacion: 'El ciclo vital del documento (Art. 23 Ley 594) comprende: Archivo de Gestión (activo), Archivo Central (semiactivo) y Archivo Histórico (inactivo/permanente). Cada etapa tiene tiempos definidos en la TRD o TVD. No existe etapa de "archivo virtual" como fase independiente.',
    opciones: [
      { letra: 'A', texto: 'Producción, digitalización y eliminación', esCorrecta: false },
      { letra: 'B', texto: 'Archivo de gestión, archivo central y archivo histórico', esCorrecta: true },
      { letra: 'C', texto: 'Archivo físico, archivo virtual y archivo en la nube', esCorrecta: false },
      { letra: 'D', texto: 'Clasificación, ordenación y descripción', esCorrecta: false },
    ],
  },
  {
    texto: '¿A qué entidad le corresponde fijar políticas y dictar normas de archivo en Colombia?',
    categoria: 'Gestión Documental',
    dificultad: 'INTERMEDIO',
    explicacion: 'El Archivo General de la Nación (AGN) es el órgano rector de la política archivística colombiana (Art. 4 Ley 594/2000). Dicta normas técnicas, orienta el Sistema Nacional de Archivos y vigila la gestión documental en entidades públicas y privadas con funciones públicas.',
    opciones: [
      { letra: 'A', texto: 'Ministerio del Interior', esCorrecta: false },
      { letra: 'B', texto: 'Archivo General de la Nación (AGN)', esCorrecta: true },
      { letra: 'C', texto: 'Departamento Nacional de Planeación', esCorrecta: false },
      { letra: 'D', texto: 'Departamento Administrativo de la Función Pública', esCorrecta: false },
    ],
  },
  {
    texto: '¿Qué principio archivístico de la Ley 594 de 2000 prohíbe mezclar los documentos de distintos productores en un mismo fondo?',
    categoria: 'Gestión Documental',
    dificultad: 'AVANZADO',
    explicacion: 'El principio de procedencia (o respeto al fondo) establece que los documentos de una entidad u organismo no deben mezclarse con los de otra. El principio de orden original establece que los documentos deben mantenerse en el orden en que fueron producidos. Ambos son fundamentales en archivística.',
    opciones: [
      { letra: 'A', texto: 'Principio de orden original', esCorrecta: false },
      { letra: 'B', texto: 'Principio de procedencia (respeto al fondo)', esCorrecta: true },
      { letra: 'C', texto: 'Principio de disponibilidad', esCorrecta: false },
      { letra: 'D', texto: 'Principio de integridad documental', esCorrecta: false },
    ],
  },
];

async function main() {
  console.log('\n=== SEED TRANSVERSAL GLOBAL — Lote 4/5 (preguntas 41-50) ===\n');
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
  console.log(`\n── Lote 4 ── Insertadas: ${insertadas} | Descartadas: ${descartadas} | Total ahora: ${final}`);
  console.log('✅ Lote 4 completo. Ejecuta: npx ts-node --project tsconfig.scripts.json scripts/seed-transversal-5.ts');
}
main().catch(console.error).finally(() => prisma.$disconnect());
