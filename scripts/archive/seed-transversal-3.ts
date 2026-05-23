import { PrismaClient, TipoPregunta, NivelDificultad } from '@prisma/client';
const prisma = new PrismaClient();
type Opcion = { letra: string; texto: string; esCorrecta: boolean };
type PQ = { texto: string; categoria: string; dificultad: NivelDificultad; explicacion: string; opciones: Opcion[] };

const PREGUNTAS: PQ[] = [
  // ── Ley 1755 de 2015 — Derecho de petición ──
  {
    texto: '¿En qué plazo debe resolverse una petición de documentos ante una entidad pública según la Ley 1755 de 2015?',
    categoria: 'Derecho de Petición',
    dificultad: 'BASICO',
    explicacion: 'El Art. 14 Ley 1755/15 fija 10 días hábiles para peticiones de entrega de documentos. Las peticiones de interés general o particular tienen 15 días hábiles, y las consultas 30 días hábiles. Es un plazo diferenciado por tipo de petición.',
    opciones: [
      { letra: 'A', texto: '15 días hábiles', esCorrecta: false },
      { letra: 'B', texto: '10 días hábiles', esCorrecta: true },
      { letra: 'C', texto: '30 días calendario', esCorrecta: false },
      { letra: 'D', texto: '5 días hábiles', esCorrecta: false },
    ],
  },
  {
    texto: '¿Cuáles son los requisitos mínimos que debe contener una petición escrita conforme a la Ley 1755 de 2015?',
    categoria: 'Derecho de Petición',
    dificultad: 'BASICO',
    explicacion: 'El Art. 16 Ley 1755/15 exige: designación de la autoridad, nombres y apellidos del peticionario e identificación, dirección para notificaciones, asunto de la petición, hechos en que se funda y firma. No exige poder notarial ni abogado.',
    opciones: [
      { letra: 'A', texto: 'Poder notarial y representación por abogado', esCorrecta: false },
      { letra: 'B', texto: 'Nombre, identificación, dirección, asunto, hechos y firma del peticionario', esCorrecta: true },
      { letra: 'C', texto: 'Pago de una tasa administrativa previa', esCorrecta: false },
      { letra: 'D', texto: 'Concepto previo del Ministerio Público', esCorrecta: false },
    ],
  },
  {
    texto: 'Según la Ley 1755 de 2015, ¿cuándo puede una entidad reservarse el contenido de un documento solicitado por petición?',
    categoria: 'Derecho de Petición',
    dificultad: 'INTERMEDIO',
    explicacion: 'El Art. 24 Ley 1755/15 permite reserva cuando la ley así lo determine, para proteger: defensa nacional, relaciones internacionales, prevención de delitos, intimidad de terceros o secreto comercial o industrial. La reserva debe fundamentarse expresamente.',
    opciones: [
      { letra: 'A', texto: 'Cuando el jefe de la entidad lo considere conveniente', esCorrecta: false },
      { letra: 'B', texto: 'Cuando la ley establezca reserva, por razones como defensa nacional, intimidad o secreto comercial', esCorrecta: true },
      { letra: 'C', texto: 'Siempre que el documento tenga más de 10 años de antigüedad', esCorrecta: false },
      { letra: 'D', texto: 'Únicamente durante procesos judiciales en curso', esCorrecta: false },
    ],
  },
  {
    texto: '¿Ante qué autoridad puede acudir el ciudadano si una entidad pública no da respuesta a su petición dentro del plazo legal?',
    categoria: 'Derecho de Petición',
    dificultad: 'INTERMEDIO',
    explicacion: 'Ante el silencio o respuesta tardía, el Art. 20 Ley 1755/15 habilita al peticionario a interponer acción de tutela por violación del derecho fundamental de petición. También puede acudir al superior jerárquico para que sancione al funcionario omiso.',
    opciones: [
      { letra: 'A', texto: 'Solo ante la Contraloría General de la República', esCorrecta: false },
      { letra: 'B', texto: 'Puede interponer acción de tutela o acudir al superior jerárquico', esCorrecta: true },
      { letra: 'C', texto: 'Ante la Fiscalía General de la Nación por prevaricato', esCorrecta: false },
      { letra: 'D', texto: 'Ante el Consejo de Estado mediante acción popular', esCorrecta: false },
    ],
  },
  {
    texto: '¿Aplica la Ley 1755 de 2015 a las peticiones formuladas ante organizaciones privadas que prestan servicios públicos?',
    categoria: 'Derecho de Petición',
    dificultad: 'AVANZADO',
    explicacion: 'El Art. 32 Ley 1755/15 extiende el derecho de petición a organizaciones privadas que presten servicios públicos o realicen actividades de interés colectivo (EPS, empresas de servicios, etc.). El procedimiento y plazos son los mismos que para entidades públicas.',
    opciones: [
      { letra: 'A', texto: 'No, solo aplica a entidades del Estado', esCorrecta: false },
      { letra: 'B', texto: 'Sí, también aplica a privados que presten servicios públicos o de interés colectivo', esCorrecta: true },
      { letra: 'C', texto: 'Solo si la empresa tiene más del 50 % de capital público', esCorrecta: false },
      { letra: 'D', texto: 'Solo a empresas de servicios públicos domiciliarios certificadas por la SSPD', esCorrecta: false },
    ],
  },

  // ── Ley 1581 de 2012 — Protección de datos personales ──
  {
    texto: '¿Qué principio de la Ley 1581 de 2012 exige que los datos personales sean exactos, completos y actualizados?',
    categoria: 'Protección de Datos',
    dificultad: 'BASICO',
    explicacion: 'El Art. 4 Ley 1581/12 lista los principios del tratamiento. El principio de calidad exige que los datos sean veraces, completos, exactos, actualizados y verificables. El de finalidad exige propósito legítimo. El de acceso y circulación restringida limita la difusión.',
    opciones: [
      { letra: 'A', texto: 'Principio de finalidad', esCorrecta: false },
      { letra: 'B', texto: 'Principio de calidad', esCorrecta: true },
      { letra: 'C', texto: 'Principio de seguridad', esCorrecta: false },
      { letra: 'D', texto: 'Principio de circulación restringida', esCorrecta: false },
    ],
  },
  {
    texto: '¿Qué derechos tiene el titular de los datos personales frente al responsable del tratamiento, según la Ley 1581 de 2012?',
    categoria: 'Protección de Datos',
    dificultad: 'BASICO',
    explicacion: 'El Art. 8 Ley 1581/12 reconoce los derechos ARCO: Acceso, Rectificación, Cancelación y Oposición. El titular puede conocer sus datos, actualizarlos, suprimirlos cuando no haya deber legal de conservarlos, y revocar la autorización.',
    opciones: [
      { letra: 'A', texto: 'Solo el derecho a conocer qué datos se tienen sobre él', esCorrecta: false },
      { letra: 'B', texto: 'Acceso, rectificación, cancelación y oposición (derechos ARCO)', esCorrecta: true },
      { letra: 'C', texto: 'Solo el derecho a solicitar la eliminación total de sus datos', esCorrecta: false },
      { letra: 'D', texto: 'El derecho a demandar al responsable sin agotar vía administrativa', esCorrecta: false },
    ],
  },
  {
    texto: '¿Cuál entidad es la autoridad de protección de datos en Colombia, según la Ley 1581 de 2012?',
    categoria: 'Protección de Datos',
    dificultad: 'INTERMEDIO',
    explicacion: 'La Superintendencia de Industria y Comercio (SIC) es la autoridad de protección de datos en Colombia (Art. 19 Ley 1581/12). Impone sanciones administrativas a los responsables y encargados que incumplan la ley. No es el Ministerio TIC ni la DIAN.',
    opciones: [
      { letra: 'A', texto: 'Ministerio de Tecnologías de la Información y las Comunicaciones', esCorrecta: false },
      { letra: 'B', texto: 'Superintendencia de Industria y Comercio (SIC)', esCorrecta: true },
      { letra: 'C', texto: 'Dirección de Impuestos y Aduanas Nacionales (DIAN)', esCorrecta: false },
      { letra: 'D', texto: 'Departamento Nacional de Planeación (DNP)', esCorrecta: false },
    ],
  },
  {
    texto: 'En el tratamiento de datos sensibles (salud, filiación política, orientación sexual), ¿qué condición adicional exige la Ley 1581 de 2012?',
    categoria: 'Protección de Datos',
    dificultad: 'AVANZADO',
    explicacion: 'El Art. 6 Ley 1581/12 prohíbe el tratamiento de datos sensibles salvo autorización expresa del titular, finalidad legítima, y que no atente contra derechos fundamentales. La autorización debe ser inequívoca y específica para este tipo de datos.',
    opciones: [
      { letra: 'A', texto: 'No requiere condición adicional si la entidad es pública', esCorrecta: false },
      { letra: 'B', texto: 'Autorización expresa del titular, finalidad legítima y que no vulnere derechos fundamentales', esCorrecta: true },
      { letra: 'C', texto: 'Solo que el tratamiento sea aprobado por la SIC previamente', esCorrecta: false },
      { letra: 'D', texto: 'Concepto previo del Ministerio de Salud o del ICBF según el caso', esCorrecta: false },
    ],
  },
  {
    texto: '¿Qué obligación tiene el servidor público cuando recibe datos personales de ciudadanos en el ejercicio de sus funciones?',
    categoria: 'Protección de Datos',
    dificultad: 'INTERMEDIO',
    explicacion: 'Como encargado del tratamiento (Art. 3 Ley 1581/12), el servidor debe garantizar la confidencialidad, usarlos solo para la finalidad autorizada por ley, no transferirlos sin respaldo legal y adoptar medidas de seguridad para evitar su pérdida o acceso no autorizado.',
    opciones: [
      { letra: 'A', texto: 'Puede compartirlos con cualquier otra entidad del Estado sin restricción', esCorrecta: false },
      { letra: 'B', texto: 'Garantizar confidencialidad, uso limitado a la finalidad legal y medidas de seguridad', esCorrecta: true },
      { letra: 'C', texto: 'Publicarlos en el sitio web institucional para garantizar transparencia', esCorrecta: false },
      { letra: 'D', texto: 'No tiene obligaciones especiales, pues los datos son propiedad del Estado', esCorrecta: false },
    ],
  },

  // ── MIPG / Planeación estratégica ──
  {
    texto: '¿Qué significa MIPG y cuál es su propósito en el Estado colombiano?',
    categoria: 'MIPG',
    dificultad: 'BASICO',
    explicacion: 'MIPG es el Modelo Integrado de Planeación y Gestión. Su propósito (Decreto 1499/17) es dirigir, planear, ejecutar, hacer seguimiento, evaluar y controlar la gestión de las entidades públicas para garantizar derechos a los ciudadanos con integridad y calidad.',
    opciones: [
      { letra: 'A', texto: 'Modelo de Inversión y Presupuesto General; controla el gasto fiscal', esCorrecta: false },
      { letra: 'B', texto: 'Modelo Integrado de Planeación y Gestión; articula la gestión institucional hacia resultados', esCorrecta: true },
      { letra: 'C', texto: 'Manual Institucional de Políticas de Gobierno; define el plan de gobierno', esCorrecta: false },
      { letra: 'D', texto: 'Marco de Inversión Pública y Gestión; regula la contratación estatal', esCorrecta: false },
    ],
  },
  {
    texto: '¿Cuántas dimensiones operativas tiene el MIPG según el Decreto 1499 de 2017?',
    categoria: 'MIPG',
    dificultad: 'INTERMEDIO',
    explicacion: 'El MIPG tiene 7 dimensiones: 1) Talento Humano, 2) Integridad, 3) Direccionamiento Estratégico, 4) Gestión con Valores para Resultados, 5) Evaluación de Resultados, 6) Información y Comunicación, 7) Gestión del Conocimiento e Innovación.',
    opciones: [
      { letra: 'A', texto: '5 dimensiones', esCorrecta: false },
      { letra: 'B', texto: '7 dimensiones', esCorrecta: true },
      { letra: 'C', texto: '10 dimensiones', esCorrecta: false },
      { letra: 'D', texto: '4 dimensiones', esCorrecta: false },
    ],
  },
  {
    texto: '¿Qué herramienta de gestión estratégica permite a una entidad pública definir su misión, visión, objetivos y metas en el marco del MIPG?',
    categoria: 'MIPG',
    dificultad: 'INTERMEDIO',
    explicacion: 'El Plan Estratégico Institucional (PEI) o Plan de Acción es la herramienta del MIPG para el direccionamiento estratégico. Articula la misión, visión, objetivos estratégicos y metas con el Plan Nacional de Desarrollo y el plan sectorial correspondiente.',
    opciones: [
      { letra: 'A', texto: 'Manual de Contratación', esCorrecta: false },
      { letra: 'B', texto: 'Plan Estratégico Institucional o Plan de Acción', esCorrecta: true },
      { letra: 'C', texto: 'Protocolo de Auditoría Interna', esCorrecta: false },
      { letra: 'D', texto: 'Reglamento Interno de Trabajo', esCorrecta: false },
    ],
  },
  {
    texto: '¿Qué papel cumple el servidor público de nivel operativo en el MIPG?',
    categoria: 'MIPG',
    dificultad: 'AVANZADO',
    explicacion: 'El MIPG concibe al servidor en todos los niveles como gestor de valor público. El nivel operativo ejecuta los procesos, documenta evidencias, propone mejoras y contribuye a la cultura de la integridad. No es un actor pasivo; es corresponsable del logro de resultados.',
    opciones: [
      { letra: 'A', texto: 'Únicamente ejecutar tareas asignadas sin rol en la planeación', esCorrecta: false },
      { letra: 'B', texto: 'Ejecutar procesos, proponer mejoras y contribuir a la cultura de integridad', esCorrecta: true },
      { letra: 'C', texto: 'Aprobar los planes estratégicos institucionales', esCorrecta: false },
      { letra: 'D', texto: 'Supervisar el desempeño de los niveles directivo y asesor', esCorrecta: false },
    ],
  },
  {
    texto: 'En el marco del MIPG, ¿qué es la gestión del riesgo de corrupción?',
    categoria: 'MIPG',
    dificultad: 'AVANZADO',
    explicacion: 'La Política de Gestión del Riesgo de Corrupción (Ley 1474/11, Guía DAFP) exige que cada entidad elabore un mapa de riesgos de corrupción, identifique controles y establezca medidas preventivas. Es parte de la dimensión de Integridad del MIPG.',
    opciones: [
      { letra: 'A', texto: 'Un informe anual de la Contraloría sobre pérdidas por corrupción', esCorrecta: false },
      { letra: 'B', texto: 'El proceso de identificar, valorar y controlar riesgos de actos corruptos en la entidad', esCorrecta: true },
      { letra: 'C', texto: 'La investigación penal de servidores señalados de corrupción', esCorrecta: false },
      { letra: 'D', texto: 'La eliminación de todos los procesos discrecionales de la entidad', esCorrecta: false },
    ],
  },
];

async function main() {
  console.log('\n=== SEED TRANSVERSAL GLOBAL — Lote 3/5 (preguntas 26-40) ===\n');
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
  console.log(`\n── Lote 3 ── Insertadas: ${insertadas} | Descartadas: ${descartadas} | Total ahora: ${final}`);
  console.log('✅ Lote 3 completo. Ejecuta: npx ts-node --project tsconfig.scripts.json scripts/seed-transversal-4.ts');
}
main().catch(console.error).finally(() => prisma.$disconnect());
