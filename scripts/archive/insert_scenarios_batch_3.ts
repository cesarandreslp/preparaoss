import { PrismaClient, TipoPregunta, NivelDificultad } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const opecs = await prisma.opec.findMany({
    where: {
      estado: "ACTIVA",
      escenarios: { none: {} },
    },
    take: 100,
    orderBy: { createdAt: "asc" },
  });

  const dataToInsert: any[] = [
    {
      simoId: "238272", // PROFESIONAL UNIVERSITARIO - NEIVA (Salud)
      escenarios: [
        {
          contenido: "Usted es Profesional Universitario en la Secretaría de Salud de Neiva, encargado del programa de Seguridad Alimentaria y Nutricional. Se le asigna la coordinación de una jornada de promoción de hábitos de vida saludable en una zona vulnerable de la ciudad. Durante la ejecución, observa que el contratista encargado de suministrar los refrigerios saludables está entregando productos con alto contenido de azúcares y grasas saturadas, alegando que los productos saludables pactados inicialmente no se consiguen en el mercado local por problemas de transporte. Usted debe intervenir para asegurar que el objetivo pedagógico de la jornada no se pierda y que se cumplan las especificaciones técnicas del contrato.",
          categoria: "Salud Pública", dificultad: "BASICO",
          preguntas: [
            {
              texto: "¿Cuál es su acción inmediata frente a la entrega de refrigerios no saludables por parte del contratista?",
              opciones: [
                { letra: "A", texto: "Permitir la entrega de los dulces para no dejar a los niños sin nada que comer, pero pedirle al contratista que no lo vuelva a hacer.", esCorrecta: false },
                { letra: "B", texto: "Rechazar la entrega de los productos que no cumplen las especificaciones técnicas y exigir el suministro de los alimentos pactados o equivalentes saludables.", esCorrecta: true },
                { letra: "C", texto: "Aprovechar la situación para dar una charla sobre por qué esos dulces que está entregando el contratista son malos para la salud.", esCorrecta: false }
              ],
              explicacion: "La opción B es el ejercicio correcto de la supervisión y garantía de la política de salud. La A es permisividad ante un incumplimiento contractual, y la C es una medida paliativa que no resuelve el problema de fondo del contrato."
            },
            {
              texto: "Para fortalecer el impacto de la jornada, ¿qué estrategia pedagógica es más efectiva según su perfil profesional?",
              opciones: [
                { letra: "A", texto: "Realizar talleres prácticos de preparación de alimentos saludables con ingredientes económicos y disponibles en la región del Huila.", esCorrecta: true },
                { letra: "B", texto: "Proyectar un video de una hora sobre la estructura molecular de las vitaminas, asumiendo que los ciudadanos son expertos en química.", esCorrecta: false },
                { letra: "C", texto: "Regalar camisetas con el logo de la alcaldía sin dar ninguna información técnica sobre nutrición o estilos de vida.", esCorrecta: false }
              ],
              explicacion: "La opción A aplica el conocimiento técnico de manera contextualizada y útil para la comunidad (educación en salud). La B es antipedagógica por el nivel técnico, y la C es una actividad puramente publicitaria sin impacto en salud."
            },
            {
              texto: "Un líder comunitario le pide que incluya a su familia en el listado de beneficiarios prioritarios de un programa de suplementos, aunque no cumplen los requisitos. ¿Qué responde?",
              opciones: [
                { letra: "A", texto: "Aceptar para mantener una buena relación con el líder y asegurar que la comunidad participe en futuras jornadas de salud.", esCorrecta: false },
                { letra: "B", texto: "Explicar los criterios técnicos de focalización basados en la vulnerabilidad y el puntaje SISBEN, asegurando la equidad en el acceso.", esCorrecta: true },
                { letra: "C", texto: "Decirle que sí, pero que debe esperar a que se acaben los suplementos de los demás para que nadie se dé cuenta del favoritismo.", esCorrecta: false }
              ],
              explicacion: "La opción B garantiza los principios de igualdad y objetividad en la gestión pública. La A y la C son actos de clientelismo y corrupción administrativa que desvían recursos públicos de quienes realmente los necesitan."
            }
          ]
        },
        {
          contenido: "Como Profesional de Salud en Neiva, usted apoya la coordinación del Plan Decenal de Salud Pública. Debe realizar el seguimiento a las metas de reducción de desnutrición infantil en articulación con las IPS y EPS del municipio. Al analizar los informes mensuales, nota que una de las IPS está reportando datos de tamizaje nutricional que parecen duplicados o inconsistentes con los registros históricos. Usted debe realizar una auditoría de calidad del dato, coordinar mesas técnicas con los gerentes de las entidades y asegurar que la información reportada al Ministerio de Salud sea veraz para la toma de decisiones presupuestales.",
          categoria: "Epidemiología", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cuál es el procedimiento técnico correcto para verificar la veracidad de los datos reportados por la IPS?",
              opciones: [
                { letra: "A", texto: "Realizar una visita de auditoría de campo para confrontar los registros en las historias clínicas físicas o electrónicas con los reportes enviados.", esCorrecta: true },
                { letra: "B", texto: "Llamar por teléfono al gerente de la IPS y creer en su palabra si él asegura que los datos están bien y que fue un error de digitación.", esCorrecta: false },
                { letra: "C", texto: "Borrar los datos sospechosos del sistema municipal sin pedir explicaciones a la IPS para que el informe final se vea 'limpio'.", esCorrecta: false }
              ],
              explicacion: "La opción A es la práctica técnica de auditoría en salud. La B carece de rigor probatorio y la C es una manipulación de información pública que oculta el problema."
            },
            {
              texto: "Al identificar que la desnutrición ha aumentado en un sector específico, ¿qué acción de coordinación propone?",
              opciones: [
                { letra: "A", texto: "Activar una ruta de atención integral intersectorial que involucre salud, educación y servicios públicos para intervenir las causas básicas.", esCorrecta: true },
                { letra: "B", texto: "Culpar públicamente a los padres de familia por no alimentar bien a sus hijos y amenazarlos con quitarles la custodia de inmediato.", esCorrecta: false },
                { letra: "C", texto: "Esperar a que el Ministerio de Salud envíe una directriz nacional antes de tomar cualquier medida local en el municipio de Neiva.", esCorrecta: false }
              ],
              explicacion: "La opción A reconoce los determinantes sociales de la salud y busca una solución integral (MIPG/Modelo de Salud). La B es una respuesta estigmatizante y la C es una omisión del deber de gestión territorial."
            },
            {
              texto: "Para la presentación de los resultados ante el Consejo Municipal, usted debe preparar un informe. ¿Cómo debe presentar la información técnica?",
              opciones: [
                { letra: "A", texto: "Usar términos médicos complejos que nadie entienda para demostrar que usted es un profesional muy estudiado en el área de salud.", esCorrecta: false },
                { letra: "B", texto: "Presentar indicadores claros, tendencias comparativas y un análisis de impacto de las acciones realizadas, con lenguaje accesible.", esCorrecta: true },
                { letra: "C", texto: "Mostrar solo las fotos de los eventos donde aparece el Alcalde saludando personas, sin mencionar cifras reales de salud pública.", esCorrecta: false }
              ],
              explicacion: "La opción B es la forma técnica y profesional de rendir cuentas sobre la gestión pública. La A dificulta la comunicación y la C es propaganda política que no aporta a la evaluación técnica del plan de salud."
            }
          ]
        }
      ]
    },
    {
      simoId: "235454", // PROFESIONAL UNIVERSITARIO - AMAZONAS (Talento Humano)
      escenarios: [
        {
          contenido: "Usted es Profesional Universitario en la Secretaría de Desarrollo Institucional de la Gobernación de Amazonas. Se le asigna la tarea de liderar la implementación de la Política de Gestión Estratégica del Talento Humano bajo los lineamientos del Modelo Integrado de Planeación y Gestión (MIPG). Al realizar el diagnóstico inicial, observa que existe una alta resistencia al cambio por parte de los funcionarios de carrera administrativa, quienes consideran que los nuevos procesos de evaluación del desempeño son una persecución política. Usted debe diseñar una estrategia que asegure el cumplimiento normativo y mejore el clima organizacional en la entidad departamental.",
          categoria: "Talento Humano", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cuál es la estrategia más efectiva para reducir la resistencia al cambio frente al nuevo modelo de evaluación?",
              opciones: [
                { letra: "A", texto: "Emitir una circular interna advirtiendo que quien no cumpla con los nuevos procesos será sancionado disciplinariamente de inmediato.", esCorrecta: false },
                { letra: "B", texto: "Realizar jornadas de socialización y capacitación donde se expliquen los beneficios de la evaluación para el crecimiento profesional y la meritocracia.", esCorrecta: true },
                { letra: "C", texto: "Eximir a los funcionarios antiguos de cumplir con la evaluación para evitar conflictos y enfocarse solo en el personal nuevo de contrato.", esCorrecta: false }
              ],
              explicacion: "La opción B fomenta la cultura de la gestión del cambio y el entendimiento del modelo (dimensión de talento humano de MIPG). La A genera más conflicto y la C vulnera el principio de igualdad y la normatividad de carrera administrativa."
            },
            {
              texto: "Al planear el plan de capacitación institucional, ¿qué criterio técnico debe primar para la asignación del presupuesto?",
              opciones: [
                { letra: "A", texto: "Las necesidades identificadas en la evaluación del desempeño y los objetivos estratégicos definidos en el Plan de Desarrollo Departamental.", esCorrecta: true },
                { letra: "B", texto: "Los cursos que sean más baratos y cortos para poder certificar a mucha gente sin importar si aprenden algo útil para sus funciones.", esCorrecta: false },
                { letra: "C", texto: "Las preferencias personales de los funcionarios que sean amigos del Secretario de Desarrollo Institucional para mantenerlos contentos.", esCorrecta: false }
              ],
              explicacion: "La opción A asegura la eficiencia del gasto público y el cierre de brechas de competencia. La B y la C son prácticas ineficientes y clientelistas que no aportan al fortalecimiento institucional."
            },
            {
              texto: "Se le solicita integrar la política de integridad en la gestión de talento humano. ¿Qué acción concreta recomienda?",
              opciones: [
                { letra: "A", texto: "Obligar a todos los empleados a memorizar el Código de Integridad y recitarlo en voz alta cada mañana antes de empezar a trabajar.", esCorrecta: false },
                { letra: "B", texto: "Implementar dinámicas de reconocimiento a comportamientos ejemplares y dilemas éticos reales para fomentar la reflexión en el día a día.", esCorrecta: true },
                { letra: "C", texto: "Instalar cámaras de seguridad en todos los puestos de trabajo para vigilar que nadie robe tiempo o recursos del departamento.", esCorrecta: false }
              ],
              explicacion: "La opción B promueve una apropiación real y vivencial de los valores del servicio público. La A es una medida superficial y la C es una medida de control policivo que no construye cultura de integridad."
            }
          ]
        },
        {
          contenido: "En su rol de Profesional en la Gobernación de Amazonas, debe analizar la información de la planta de personal para proyectar la provisión de empleos vacantes. Identifica que hay varios cargos en vacancia definitiva que no han sido reportados a la Comisión Nacional del Servicio Civil (CNSC) para su respectiva convocatoria a concurso. Al mismo tiempo, recibe presiones para proveer esos cargos mediante nombramientos provisionales sin seguir el orden de prioridad de la ley. Usted debe capturar los datos, analizar la normatividad de carrera y proponer una hoja de ruta que garantice la legalidad en la gestión del empleo público territorial.",
          categoria: "Derecho Administrativo", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cuál es el orden de prioridad legal que debe seguir para proveer una vacante definitiva en la entidad?",
              opciones: [
                { letra: "A", texto: "Traslado, encargo a funcionario de carrera, lista de elegibles vigente y, como última opción, nombramiento provisional.", esCorrecta: true },
                { letra: "B", texto: "Contratar a una empresa de cazatalentos para que elija al mejor perfil del sector privado para ocupar el cargo público de inmediato.", esCorrecta: false },
                { letra: "C", texto: "Realizar una rifa entre todos los contratistas actuales para ver quién se merece el nombramiento provisional por su buena suerte.", esCorrecta: false }
              ],
              explicacion: "La opción A sigue estrictamente la jerarquía establecida en la Ley 909 de 2004 y decretos reglamentarios. La B y la C son procedimientos ilegales que vulneran el régimen de carrera administrativa."
            },
            {
              texto: "Respecto al reporte de vacantes a la CNSC (OPEC), ¿qué responsabilidad tiene la entidad departamental?",
              opciones: [
                { letra: "A", texto: "Reportar todas las vacantes definitivas de manera veraz y oportuna para alimentar el Sistema de Apoyo para la Igualdad, el Mérito y la Oportunidad (SIMO).", esCorrecta: true },
                { letra: "B", texto: "Reportar solo los cargos que sean aburridos para que los interesantes sigan siendo manejados por la administración de turno.", esCorrecta: false },
                { letra: "C", texto: "Cobrarle a la CNSC una tarifa por cada cargo reportado para financiar los eventos sociales de la Gobernación del Amazonas.", esCorrecta: false }
              ],
              explicacion: "La opción A es el deber legal de toda entidad pública sujeta al régimen de carrera. La B es una omisión fraudulenta y la C es una pretensión ilegal y carente de sustento normativo."
            },
            {
              texto: "Al tomar decisiones basadas en evidencias sobre el bienestar laboral, ¿qué indicador es más relevante analizar?",
              opciones: [
                { letra: "A", texto: "El nivel de satisfacción del clima organizacional comparado con los índices de rotación y ausentismo del personal en el último año.", esCorrecta: true },
                { letra: "B", texto: "El número de seguidores que tiene la cuenta oficial de la Gobernación en Facebook para ver si la gente está feliz con la gestión.", esCorrecta: false },
                { letra: "C", texto: "La cantidad de café que se consume en cada oficina para medir el nivel de energía y productividad de los funcionarios públicos.", esCorrecta: false }
              ],
              explicacion: "La opción A utiliza datos objetivos de gestión humana para orientar políticas de bienestar con impacto real. La B y la C son indicadores superficiales que no permiten un análisis técnico serio del talento humano."
            }
          ]
        }
      ]
    },
    {
      simoId: "241409", // AUXILIAR ÁREA SALUD - IDS NORTE DE SANTANDER
      escenarios: [
        {
          contenido: "Usted es Auxiliar en el Área de Salud del Instituto Departamental de Salud (IDS) de Norte de Santander. Su labor principal es apoyar la gestión documental de la oficina de Vigilancia en Salud Pública. Se recibe un volumen importante de fichas de notificación de eventos de interés en salud pública provenientes de diferentes municipios. Usted debe clasificar, registrar y archivar esta información siguiendo los protocolos de seguridad y confidencialidad, ya que muchos documentos contienen datos sensibles de pacientes con enfermedades infectocontagiosas. Durante la jornada, nota que un colega está tomando fotos a una de las fichas para enviarla por un grupo de WhatsApp.",
          categoria: "Gestión Documental", dificultad: "BASICO",
          preguntas: [
            {
              texto: "¿Cuál es su actuación ante la conducta observada en su compañero de trabajo?",
              opciones: [
                { letra: "A", texto: "Pedirle que le pase las fotos a usted también para estar informado sobre lo que sucede en el departamento.", esCorrecta: false },
                { letra: "B", texto: "Recordarle la importancia de la reserva legal de los datos de salud y reportar la situación de inmediato al superior para evitar una filtración.", esCorrecta: true },
                { letra: "C", texto: "No decir nada porque cada persona es responsable de sus actos y usted no quiere ganarse enemigos en la oficina.", esCorrecta: false }
              ],
              explicacion: "La opción B cumple con el deber de custodia de información reservada y la ética del servidor público. La A es complicidad en una falta grave, y la C es una omisión que compromete la seguridad de la información del IDS."
            },
            {
              texto: "Para organizar los archivos de gestión documental según las TRD, ¿qué paso es fundamental?",
              opciones: [
                { letra: "A", texto: "Asignar a cada serie y subserie documental su código respectivo y organizar los expedientes de manera cronológica dentro de cada carpeta.", esCorrecta: true },
                { letra: "B", texto: "Gritar los nombres de los pacientes en el pasillo para que otros auxiliares le ayuden a encontrar las carpetas más rápido.", esCorrecta: false },
                { letra: "C", texto: "Botar a la basura los documentos que tengan más de un mes de antigüedad para que el archivo no se llene de papeles viejos.", esCorrecta: false }
              ],
              explicacion: "La opción A sigue las normas técnicas de archivo nacionales. La B vulnera la privacidad de los pacientes y la C constituye una destrucción ilegal de patrimonio documental público."
            },
            {
              texto: "Al alimentar la base de datos de las acciones realizadas, ¿qué criterio de calidad debe aplicar?",
              opciones: [
                { letra: "A", texto: "La exactitud en la trascripción de los datos, asegurando que no existan errores de digitación que alteren las estadísticas de salud.", esCorrecta: true },
                { letra: "B", texto: "La velocidad de digitación, sin importar si los nombres o los códigos de las enfermedades quedan mal escritos en el sistema.", esCorrecta: false },
                { letra: "C", texto: "Inventar algunos datos cuando el documento original no sea legible, para que la base de datos no tenga espacios en blanco.", esCorrecta: false }
              ],
              explicacion: "La opción A garantiza la integridad de la información epidemiológica. La B genera datos erróneos para la toma de decisiones, y la C es una falsedad ideológica en documento público."
            }
          ]
        },
        {
          contenido: "Como Auxiliar de Salud en el IDS, usted apoya la activación de planes de contingencia ante una alerta de brote de dengue en la zona fronteriza. Se requiere citar a un comité técnico de urgencia con los secretarios de salud municipales. Usted debe elaborar los documentos de citación, preparar la logística de la reunión y realizar el seguimiento a las actas de compromiso. Durante el comité, se genera una discusión fuerte entre los asistentes sobre la asignación de recursos para fumigación. Su jefe le pide que tome nota detallada de los acuerdos y prepare el borrador del acta de manera inmediata.",
          categoria: "Salud Pública", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Qué debe primar en la redacción del acta de la reunión del comité técnico?",
              opciones: [
                { letra: "A", texto: "La fidelidad a lo expresado por cada asistente, centrando el documento en los compromisos técnicos y administrativos adquiridos.", esCorrecta: true },
                { letra: "B", texto: "La inclusión de todos los insultos y quejas personales que se dijeron durante la discusión para que el acta sea más entretenida.", esCorrecta: false },
                { letra: "C", texto: "Redactar solo lo que el jefe dijo y omitir las peticiones de los municipios para que la Gobernación siempre quede como la ganadora.", esCorrecta: false }
              ],
              explicacion: "La opción A es la forma profesional y técnica de elaborar actas administrativas. La B incluye información irrelevante y poco profesional, y la C falta a la veracidad y transparencia de la gestión pública."
            },
            {
              texto: "Al citar a los funcionarios para la reunión de seguimiento, ¿cuál es el medio de comunicación oficial más adecuado?",
              opciones: [
                { letra: "A", texto: "Un mensaje de audio por un grupo de WhatsApp informal donde también se comparten memes y chistes de la oficina.", esCorrecta: false },
                { letra: "B", texto: "Un oficio formal o correo electrónico institucional que incluya el orden del día, la fecha, hora y el enlace de conexión si es virtual.", esCorrecta: true },
                { letra: "C", texto: "Pegar un aviso en la puerta del IDS esperando que los funcionarios de los otros municipios pasen por ahí y lo lean por casualidad.", esCorrecta: false }
              ],
              explicacion: "La opción B garantiza la formalidad, la trazabilidad y la notificación efectiva del acto administrativo. La A carece de formalidad institucional y la C es un medio de comunicación ineficiente y poco profesional."
            },
            {
              texto: "Usted debe apoyar la revisión de la información generada en la zona de frontera. ¿Cuál es su labor específica de apoyo?",
              opciones: [
                { letra: "A", texto: "Verificar que los formularios de reporte estén completos y que la información guarde coherencia con los protocolos de vigilancia epidemiológica.", esCorrecta: true },
                { letra: "B", texto: "Diagnosticar a los pacientes sospechosos de dengue usando sus conocimientos empíricos y recetarles medicamentos básicos.", esCorrecta: false },
                { letra: "C", texto: "Decidir qué municipios deben recibir más dinero de fumigación basándose en cuál de los alcaldes le cae mejor a usted personalmente.", esCorrecta: false }
              ],
              explicacion: "La opción A define el rol de apoyo técnico del auxiliar administrativo en salud. La B es una extralimitación de funciones peligrosa (ejercicio ilegal de la medicina), y la C es un acto de corrupción y favoritismo ilegal."
            }
          ]
        }
      ]
    },
    {
      simoId: "240580", // PROFESIONAL UNIVERSITARIO - PEREIRA (Psicología)
      escenarios: [
        {
          contenido: "Usted es Profesional Universitario (Psicólogo) en la Alcaldía de Pereira, asignado a la Comisaría de Familia para el apoyo en procesos de restablecimiento de derechos de niños, niñas y adolescentes. Se recibe un caso de un adolescente de 14 años que ha sido encontrado en situación de calle y con presunto consumo de sustancias psicoactivas. Su labor es realizar una evaluación integral de sus derechos, emitir informes periciales y proponer la medida más idónea para su protección. El adolescente se muestra desafiante y manifiesta que prefiere seguir en la calle porque no confía en los adultos ni en las instituciones del Estado.",
          categoria: "Intervención Social", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cuál es el enfoque primordial de la entrevista inicial con el adolescente desafiante?",
              opciones: [
                { letra: "A", texto: "Establecer una relación de empatía y respeto, validando sus emociones y explicando el rol protector de la Comisaría sin juzgar su conducta.", esCorrecta: true },
                { letra: "B", texto: "Amenazarlo con llevarlo a un centro de reclusión de menores si no responde todas las preguntas de manera clara y rápida.", esCorrecta: false },
                { letra: "C", texto: "Darle dinero o regalos para comprar su confianza y que acepte entrar al programa de rehabilitación de manera voluntaria.", esCorrecta: false }
              ],
              explicacion: "La opción A sigue los principios de atención psicológica humanizada y centrada en el sujeto de derechos. La B vulnera sus derechos y la C es una práctica poco ética y técnica en psicología social."
            },
            {
              texto: "Al emitir el concepto integral para el Comisario, ¿qué factor debe ser determinante para la medida de protección?",
              opciones: [
                { letra: "A", texto: "El interés superior del adolescente, buscando una medida que garantice su salud integral y la restitución de sus vínculos familiares seguros.", esCorrecta: true },
                { letra: "B", texto: "La comodidad de la Alcaldía, buscando el cupo en el hogar de paso que quede más cerca de la oficina para facilitar las visitas.", esCorrecta: false },
                { letra: "C", texto: "El deseo del adolescente de seguir en la calle, respetando su autonomía absoluta por encima de su derecho a la protección y salud.", esCorrecta: false }
              ],
              explicacion: "La opción A aplica el principio constitucional del interés superior del menor. La B es un criterio de conveniencia administrativa erróneo, y la C ignora el deber de protección del Estado ante un menor en riesgo."
            },
            {
              texto: "En la supervisión de un contrato de un hogar de protección, usted nota deficiencias en la alimentación de los menores. ¿Qué acción lidera?",
              opciones: [
                { letra: "A", texto: "Realizar un informe de supervisión detallando las deficiencias y exigir el cumplimiento inmediato de la minuta nutricional bajo apremio legal.", esCorrecta: true },
                { letra: "B", texto: "Ignorar el tema porque usted es psicólogo y no nutricionista, y no quiere meterse en problemas con el dueño del hogar de paso.", esCorrecta: false },
                { letra: "C", texto: "Pedirle al cocinero del hogar que le guarde un poco de comida a usted para probar si de verdad está tan mala como dicen los niños.", esCorrecta: false }
              ],
              explicacion: "La opción A es el cumplimiento del deber de supervisión y garantía de derechos. La B es negligencia profesional, y la C es una conducta inapropiada y poco técnica."
            }
          ]
        },
        {
          contenido: "Como Profesional en la Alcaldía de Pereira, debe brindar asistencia e intervención terapéutica a una familia víctima de violencia intrafamiliar. Durante el seguimiento, descubre que la madre (víctima) ha decidido perdonar al agresor y solicita que se archive el proceso de restablecimiento de derechos de sus hijos, argumentando que 'él ya cambió'. Usted debe evaluar el riesgo real, emitir un concepto técnico al Comisario y garantizar que la decisión administrativa priorice la seguridad de los niños por encima de la voluntad de reconciliación de la pareja, aplicando estándares de protección integral.",
          categoria: "Psicología Jurídica", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Qué criterio técnico debe prevalecer ante la solicitud de la madre de archivar el proceso?",
              opciones: [
                { letra: "A", texto: "La autonomía de la voluntad de la madre, procediendo al archivo inmediato del caso para respetar la privacidad de la familia.", esCorrecta: false },
                { letra: "B", texto: "La evaluación objetiva del riesgo y el interés superior de los niños, manteniendo el proceso si no hay garantías reales de no repetición.", esCorrecta: true },
                { letra: "C", texto: "La opinión del párroco de la comunidad, quien asegura que el perdón es la base de la sociedad y que el Estado no debe intervenir.", esCorrecta: false }
              ],
              explicacion: "La opción B es el deber ser legal y técnico en protección de menores. La A y la C ignoran la responsabilidad del Estado de proteger a los más vulnerables frente a ciclos de violencia."
            },
            {
              texto: "Al realizar la intervención terapéutica, nota que el agresor minimiza sus actos de violencia. ¿Cómo aborda esta situación?",
              opciones: [
                { letra: "A", texto: "Confrontar técnicamente los mecanismos de defensa del agresor y trabajar en la responsabilización de sus actos y el control de impulsos.", esCorrecta: true },
                { letra: "B", texto: "Estar de acuerdo con él para que no se enoje con usted y así poder terminar la sesión de terapia más rápido y sin conflictos.", esCorrecta: false },
                { letra: "C", texto: "Recomendarle que tome un curso de yoga por internet para que se relaje y no vuelva a golpear a su familia nunca más.", esCorrecta: false }
              ],
              explicacion: "La opción A es una técnica de intervención psicológica clínica y forense adecuada. La B es negligencia y la C es una recomendación superficial que no aborda la raíz del problema de violencia."
            },
            {
              texto: "Usted debe responder una petición de la Defensoría del Pueblo sobre el caso. ¿Qué debe contener su respuesta?",
              opciones: [
                { letra: "A", texto: "Un resumen técnico de las actuaciones realizadas, el estado actual de los derechos de los menores y las medidas de protección vigentes.", esCorrecta: true },
                { letra: "B", texto: "Una crítica personal sobre lo mal que funciona la justicia en Pereira y lo mucho que le pagan a usted por hacer ese trabajo.", esCorrecta: false },
                { letra: "C", texto: "Fotos de las heridas de la madre para que en la Defensoría vean que el caso es muy impactante y le den más importancia.", esCorrecta: false }
              ],
              explicacion: "La opción A es la forma profesional y legal de responder a un ente de control. La B es poco ética y la C vulnera la intimidad y dignidad de la víctima."
            }
          ]
        }
      ]
    },
    {
      simoId: "241784", // PROFESIONAL UNIVERSITARIO - ATLÁNTICO (Comunicación)
      escenarios: [
        {
          contenido: "Usted es Profesional Universitario (Comunicador Social) en la Gerencia de Capital Social de la Gobernación del Atlántico. Se le asigna la coordinación de la campaña de comunicación para el lanzamiento de un programa de becas para jóvenes rurales. Debe producir piezas gráficas, videos y comunicados de prensa. Durante la planeación, el Gerente le solicita que el logo del programa sea reemplazado por la foto del Gobernador en todas las piezas publicitarias, argumentando que esto aumentará el impacto político de la gestión. Usted debe asesorar sobre el cumplimiento de las normas de austeridad y publicidad institucional vigentes.",
          categoria: "Comunicación Pública", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cuál es su asesoría técnica respecto a la inclusión de la imagen del mandatario en la publicidad oficial?",
              opciones: [
                { letra: "A", texto: "Aceptar la solicitud del Gerente de inmediato, ya que él es el jefe y sabe qué es lo que más le conviene al departamento políticamente.", esCorrecta: false },
                { letra: "B", texto: "Advertir sobre la prohibición legal de usar la imagen de funcionarios en publicidad oficial para promoción personal, sugiriendo el uso de la imagen institucional.", esCorrecta: true },
                { letra: "C", texto: "Sugerir que mejor pongan la foto del Gerente en lugar de la del Gobernador para que él también gane reconocimiento en los municipios.", esCorrecta: false }
              ],
              explicacion: "La opción B cumple con las normas de austeridad y transparencia (Ley 1474 de 2011 y directivas de la Función Pública). La A y la C son conductas que pueden derivar en procesos disciplinarios."
            },
            {
              texto: "Al redactar el comunicado de prensa para medios regionales, ¿qué enfoque debe priorizar?",
              opciones: [
                { letra: "A", texto: "Un enfoque informativo y de servicio, resaltando los requisitos, beneficios y plazos para que los jóvenes puedan acceder a las becas.", esCorrecta: true },
                { letra: "B", texto: "Un enfoque lírico y poético donde se exalte la bondad del Gobernador por regalar educación a los más pobres del departamento.", esCorrecta: false },
                { letra: "C", texto: "Un enfoque de ataque contra los departamentos vecinos que no tienen programas de becas tan buenos como los del Atlántico.", esCorrecta: false }
              ],
              explicacion: "La opción A cumple con el fin de la comunicación pública de informar y facilitar el acceso a los servicios del Estado. La B y la C son enfoques poco profesionales y contrarios a la ética institucional."
            },
            {
              texto: "Para medir el impacto de la campaña en redes sociales, ¿qué métrica es más relevante para la gestión?",
              opciones: [
                { letra: "A", texto: "El número de jóvenes que se inscribieron efectivamente al programa de becas a través de los enlaces compartidos en las piezas.", esCorrecta: true },
                { letra: "B", texto: "El número de 'likes' que pusieron los familiares de los funcionarios de la Gobernación para que las publicaciones parezcan exitosas.", esCorrecta: false },
                { letra: "C", texto: "La cantidad de comentarios insultantes que se lograron borrar antes de que el Gobernador los leyera en su celular.", esCorrecta: false }
              ],
              explicacion: "La opción A mide la efectividad real de la comunicación en relación con el objetivo del programa. La B y la C son métricas de vanidad que no aportan a la evaluación técnica de la política pública."
            }
          ]
        },
        {
          contenido: "Como Comunicador de la Gobernación del Atlántico, debe gestionar una crisis reputacional tras la publicación de una noticia falsa en redes sociales que afirma que los recursos del programa de Capital Social están siendo desviados. La noticia se ha vuelto viral en cuestión de horas. Usted debe realizar el monitoreo de medios, proyectar la respuesta oficial y coordinar la emisión de una fe de erratas o aclaración pública. El equipo legal le pide que guarde silencio, pero la presión ciudadana exige una explicación inmediata para mantener la confianza en la institucionalidad.",
          categoria: "Gestión de Crisis", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cuál es la estrategia de comunicación de crisis más adecuada en este escenario?",
              opciones: [
                { letra: "A", texto: "Emitir un comunicado oficial con datos abiertos y pruebas documentales que desmientan la noticia falsa de manera clara y contundente.", esCorrecta: true },
                { letra: "B", texto: "Contratar un grupo de personas para que escriban comentarios positivos y tapen la noticia falsa con mensajes de apoyo al departamento.", esCorrecta: false },
                { letra: "C", texto: "Cerrar todas las redes sociales de la Gobernación hasta que la gente se olvide del tema y la noticia deje de ser tendencia.", esCorrecta: false }
              ],
              explicacion: "La opción A basa la respuesta en la transparencia y la verdad, que son los pilares de la comunicación pública. La B es ética y técnicamente incorrecta, y la C es una medida desesperada que aumenta la desconfianza."
            },
            {
              texto: "Al proyectar la respuesta a una petición de información de un periodista de investigación, ¿cómo debe actuar?",
              opciones: [
                { letra: "A", texto: "Suministrar toda la información pública solicitada de manera oportuna, facilitando el acceso a los soportes que demuestran la transparencia.", esCorrecta: true },
                { letra: "B", texto: "Negar la información argumentando que todo el proceso está bajo reserva absoluta por orden del Secretario Privado del Gobernador.", esCorrecta: false },
                { letra: "C", texto: "Enviar al periodista información de otro proyecto diferente para confundirlo y que deje de investigar el programa de Capital Social.", esCorrecta: false }
              ],
              explicacion: "La opción A cumple con la Ley de Transparencia y el derecho al acceso a la información. La B y la C son conductas que generan sanciones y aumentan la percepción de opacidad en la gestión."
            },
            {
              texto: "Para prevenir futuras crisis similares, ¿qué mejora técnica propone en el proceso de comunicación?",
              opciones: [
                { letra: "A", texto: "Crear un observatorio de medios digital y un protocolo de respuesta rápida basado en la publicación proactiva de datos en tiempo real.", esCorrecta: true },
                { letra: "B", texto: "Pedirle a todos los empleados de la Gobernación que le entreguen sus contraseñas de redes sociales para vigilar qué publican en su tiempo libre.", esCorrecta: false },
                { letra: "C", texto: "Hacer una misa mensual para pedir que no vuelvan a aparecer noticias falsas contra la administración departamental.", esCorrecta: false }
              ],
              explicacion: "La opción A es una mejora técnica y organizacional basada en la gestión de la información. La B vulnera los derechos fundamentales y la C no es una medida de gestión administrativa técnica."
            }
          ]
        }
      ]
    }
  ];

  for (const item of dataToInsert) {
    const opec = opecs.find((o) => o.simoId === item.simoId);
    if (!opec) {
      console.log(`⚠️ OPEC con simoId ${item.simoId} no encontrada en el lote actual.`);
      continue;
    }

    try {
      for (const esc of item.escenarios) {
        await prisma.$transaction(async (tx) => {
          const escenario = await tx.escenarioSituacional.create({
            data: {
              contenido: esc.contenido,
              opecId: opec.id,
            },
          });

          for (const p of esc.preguntas) {
            await tx.pregunta.create({
              data: {
                tipo: TipoPregunta.FUNCIONAL_ESPECIFICA,
                texto: p.texto,
                escenarioId: escenario.id,
                opecId: opec.id,
                validada: true,
                categoria: esc.categoria,
                dificultad: esc.dificultad as NivelDificultad,
                explicacion: p.explicacion,
                opciones: {
                  create: p.opciones.map((o: any) => ({
                    letra: o.letra,
                    texto: o.texto,
                    esCorrecta: o.esCorrecta,
                  })),
                },
              },
            });
          }
        }, { timeout: 30000 });
      }
      console.log(`✅ OPEC ${opec.simoId} (${opec.nombreCargo.slice(0, 40)}): 2 escenarios + 6 preguntas`);
    } catch (error: any) {
      console.error(`❌ Error al procesar OPEC ${opec.simoId}: ${error.message}`);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
