import { PrismaClient, TipoPregunta, NivelDificultad } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const dataToInsert: any[] = [
    {
      simoId: "241442", // INST. SALUD NS - Prof. Universitario (IT/Redes)
      escenarios: [
        {
          contenido: "Usted es Profesional Universitario en el área de TI del Instituto Departamental de Salud de Norte de Santander. El Instituto planea expandir su red corporativa (Intranet) para conectar a los hospitales municipales de frontera de manera segura. Usted debe asesorar a la alta gerencia en la definición de la arquitectura de red, seleccionando los protocolos de seguridad (VPN, túneles cifrados) y asegurando que la infraestructura soporte el tráfico masivo de historias clínicas digitales sin comprometer la velocidad ni la confidencialidad de los datos de salud.",
          categoria: "Redes y Telecomunicaciones", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Qué tecnología de conectividad es la más adecuada para garantizar la seguridad de los datos en la conexión con hospitales externos?",
              opciones: [
                { letra: "A", texto: "Implementar redes privadas virtuales (VPN) con cifrado de extremo a extremo y autenticación de doble factor para cada punto de acceso.", esCorrecta: true },
                { letra: "B", texto: "Usar una red Wi-Fi abierta sin contraseña para que cualquier persona pueda ayudar a cargar los datos de salud más rápido.", esCorrecta: false },
                { letra: "C", texto: "Mandar la información grabada en disquetes por correo certificado para estar seguros de que nadie la intercepta por internet.", esCorrecta: false }
              ],
              explicacion: "La opción A es el estándar de seguridad para la interconexión de entidades públicas. La B es una vulnerabilidad crítica y la C es un método obsoleto e ineficiente."
            },
            {
              texto: "Al definir el Plan Estratégico de Tecnologías de la Información (PETI), ¿qué objetivo debe priorizar respecto a la red?",
              opciones: [
                { letra: "A", texto: "La optimización del ancho de banda y la garantía de disponibilidad del servicio para soportar la transformación digital del Instituto.", esCorrecta: true },
                { letra: "B", texto: "Comprar los cables de red de colores más llamativos para que el centro de cómputo se vea moderno en las fotos de la rendición de cuentas.", esCorrecta: false },
                { letra: "C", texto: "Limitar el acceso a internet a solo 10 minutos al día por funcionario para ahorrar energía eléctrica en la entidad.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la gestión de TI con los objetivos misionales del Estado. Las otras opciones son temas estéticos o medidas restrictivas sin sentido técnico."
            },
            {
              texto: "En cuanto al derecho de acceso a las TIC, ¿qué debe asegurar en la implementación de servicios digitales?",
              opciones: [
                { letra: "A", texto: "Garantizar la accesibilidad web (WCAG) para que personas con discapacidad puedan consultar sus trámites de salud sin barreras.", esCorrecta: true },
                { letra: "B", texto: "Cobrar una tarifa especial a los ciudadanos que quieran usar la página web del Instituto de Salud para financiar los cafés de la oficina de TI.", esCorrecta: false },
                { letra: "C", texto: "Poner un examen de ingeniería de sistemas antes de dejar que un ciudadano use cualquier servicio digital de la entidad.", esCorrecta: false }
              ],
              explicacion: "La opción A cumple con los principios de Gobierno Digital e inclusión social. Las otras opciones son barreras ilegales o arbitrarias al acceso a la información."
            }
          ]
        },
        {
          contenido: "Como Profesional de TI en el Instituto de Salud, detecta un acceso no autorizado a la base de datos de red que almacena las credenciales de los usuarios de los hospitales de la red departamental. Debe activar el protocolo de respuesta ante incidentes, realizar el análisis forense inicial para determinar el alcance de la brecha y coordinar con el CSIRT nacional la mitigación del riesgo de suplantación de identidad de los profesionales de salud en el departamento.",
          categoria: "Seguridad Digital", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cuál es la primera acción técnica tras confirmar la brecha de seguridad en las credenciales?",
              opciones: [
                { letra: "A", texto: "Aislar los sistemas afectados, forzar el cambio masivo de contraseñas y revocar los certificados digitales comprometidos.", esCorrecta: true },
                { letra: "B", texto: "Apagar todos los computadores del departamento de Norte de Santander y no volverlos a prender hasta el próximo año.", esCorrecta: false },
                { letra: "C", texto: "Tratar de negociar con el hacker para que le devuelva las claves a cambio de que usted le dé una buena recomendación laboral.", esCorrecta: false }
              ],
              explicacion: "La opción A es el protocolo estándar de contención de incidentes informáticos. Las otras opciones son desproporcionadas o delictivas."
            },
            {
              texto: "Al realizar el análisis forense inicial, ¿qué debe proteger para garantizar la validez de la investigación futura?",
              opciones: [
                { letra: "A", texto: "La cadena de custodia de las evidencias digitales (logs, imágenes de memoria) evitando cualquier modificación accidental de los sistemas.", esCorrecta: true },
                { letra: "B", texto: "Las llaves de la oficina de TI, para que nadie pueda entrar a limpiar el polvo mientras usted está investigando el ataque informático.", esCorrecta: false },
                { letra: "C", texto: "El buen nombre del hacker, por si acaso resulta ser un genio incomprendido que solo quería ayudar a probar la seguridad del sistema.", esCorrecta: false }
              ],
              explicacion: "La opción A es fundamental para cualquier proceso legal o técnico posterior. Las otras opciones no tienen relevancia para la ciberseguridad profesional."
            },
            {
              texto: "¿Qué norma nacional obliga a reportar los incidentes de ciberseguridad en el sector público colombiano?",
              opciones: [
                { letra: "A", texto: "La política de Gobierno Digital y los lineamientos del Modelo de Seguridad y Privacidad de la Información (MSPI).", esCorrecta: true },
                { letra: "B", texto: "La Ley del Deporte, porque la ciberseguridad es como una carrera de obstáculos digital donde todos deben competir.", esCorrecta: false },
                { letra: "C", texto: "El Código de Policía, que dice que todo lo que pase en internet es responsabilidad exclusiva de los proveedores de energía eléctrica.", esCorrecta: false }
              ],
              explicacion: "La opción A identifica el marco regulatorio del Ministerio TIC. Las otras opciones no tienen relación técnica con el reporte de incidentes."
            }
          ]
        }
      ]
    },
    {
      simoId: "241410", // INST. SALUD NS - Auxiliar Administrativo (Servicio Social Obligatorio - SSO)
      escenarios: [
        {
          contenido: "Usted es Auxiliar Administrativo en el Instituto de Salud de Norte de Santander, encargado de apoyar el proceso de Servicio Social Obligatorio (SSO) para médicos y enfermeras. Debe proyectar las resoluciones de autorización de plazas en los municipios del departamento y reportar las novedades ante el Ministerio de Salud. Se presenta un caso donde una plaza de una zona de conflicto no ha sido ocupada en dos sorteos consecutivos. Usted debe orientar al hospital sobre el trámite de eliminación o exoneración de la plaza para no afectar la prestación del servicio asistencial.",
          categoria: "Servicio Social Obligatorio", dificultad: "BASICO",
          preguntas: [
            {
              texto: "¿Cuál es el procedimiento técnico para reportar una plaza de SSO vacante ante el Ministerio de Salud?",
              opciones: [
                { letra: "A", texto: "Realizar el cargue de la novedad en la plataforma del Ministerio dentro de los términos establecidos, adjuntando el acta de vacancia del sorteo.", esCorrecta: true },
                { letra: "B", texto: "Mandar una carta escrita a mano y esperar a que el Ministro de Salud le responda personalmente con un saludo cordial.", esCorrecta: false },
                { letra: "C", texto: "No reportar nada y esperar a que el Ministerio se dé cuenta solo cuando hagan auditoría en el municipio el próximo año.", esCorrecta: false }
              ],
              explicacion: "La opción A cumple con los lineamientos técnicos de reporte de información en salud. Las otras opciones son informales o negligentes."
            },
            {
              texto: "Ante la imposibilidad de ocupar la plaza en zona de riesgo, ¿qué orientación administrativa ofrece al hospital?",
              opciones: [
                { letra: "A", texto: "Tramitar ante el Instituto la solicitud de exoneración de la plaza debidamente sustentada, para que el hospital pueda contratar personal de planta o contrato.", esCorrecta: true },
                { letra: "B", texto: "Obligar a cualquier médico que pase por la calle a que se vaya para ese municipio aunque él no quiera y sea peligroso.", esCorrecta: false },
                { letra: "C", texto: "Decirle al hospital que cierre el servicio de urgencias hasta que algún médico acepte irse para allá voluntariamente.", esCorrecta: false }
              ],
              explicacion: "La opción A permite la continuidad del servicio de salud mediante otras formas de vinculación legal. Las otras opciones son ilegales o afectan la salud pública."
            },
            {
              texto: "En cuanto a la gestión documental de las resoluciones de SSO, ¿qué debe asegurar?",
              opciones: [
                { letra: "A", texto: "La foliación exacta del expediente de cada profesional, incluyendo el diploma, el acta de grado y el acta de posesión en la plaza asignada.", esCorrecta: true },
                { letra: "B", texto: "Ponerle un sticker de una carita feliz a las resoluciones de los médicos que mejor le caigan a usted en la oficina.", esCorrecta: false },
                { letra: "C", texto: "No guardar copias de las resoluciones para ahorrar papel y así contribuir al cuidado del medio ambiente en la Gobernación.", esCorrecta: false }
              ],
              explicacion: "La opción A garantiza la integridad del historial laboral y administrativo del profesional de salud. Las otras opciones son informales o constituyen una falta a la memoria institucional."
            }
          ]
        },
        {
          contenido: "Como Auxiliar Administrativo del Instituto de Salud, recibe una petición de un profesional de salud que terminó su SSO y solicita el certificado de cumplimiento para poder tramitar su tarjeta profesional ante el colegio respectivo. Al revisar el expediente, nota que el profesional no adjuntó el informe final de actividades avalado por el gerente del hospital donde prestó el servicio. Usted debe proyectar el requerimiento de información y orientar al ciudadano para que subsane el requisito y así poder expedir la certificación legal.",
          categoria: "Trámites Administrativos en Salud", dificultad: "BASICO",
          preguntas: [
            {
              texto: "¿Qué acción administrativa realiza frente a la petición incompleta del certificado de SSO?",
              opciones: [
                { letra: "A", texto: "Informar al peticionario por escrito sobre el documento faltante, otorgando el término legal para subsanar antes de que opere el desistimiento.", esCorrecta: true },
                { letra: "B", texto: "Negar el certificado de inmediato y decirle al profesional que debe volver a repetir todo el año de servicio social por su mala memoria.", esCorrecta: false },
                { letra: "C", texto: "Expedir el certificado así falte información, para no tener que volver a hablar con ese profesional y despejar su escritorio rápido.", esCorrecta: false }
              ],
              explicacion: "La opción A cumple con el procedimiento administrativo sancionatorio y de trámite de peticiones (CPACA). Las otras opciones son excesivas o ilegales (certificación falsa)."
            },
            {
              texto: "Respecto al informe final de actividades del SSO, ¿qué debe verificar técnicamente en el documento una vez sea entregado?",
              opciones: [
                { letra: "A", texto: "Que cuente con el aval del supervisor o gerente de la ESE y que describa el cumplimiento de las metas de salud pública asignadas.", esCorrecta: true },
                { letra: "B", texto: "Que el informe tenga muchas fotos del profesional comiendo en el municipio para saber si le gustó la comida regional.", esCorrecta: false },
                { letra: "C", texto: "Que el informe esté escrito en inglés para demostrar que el profesional de salud es una persona bilingüe y muy culta.", esCorrecta: false }
              ],
              explicacion: "La opción A valida la ejecución real de las obligaciones del servicio social. Las otras opciones son datos irrelevantes para la validez técnica del certificado."
            },
            {
              texto: "¿Qué principio de la atención al ciudadano aplica al orientar al profesional de salud en su trámite?",
              opciones: [
                { letra: "A", texto: "El principio de Celeridad y Eficacia, ayudando al ciudadano a completar su trámite de la manera más ágil y correcta posible.", esCorrecta: true },
                { letra: "B", texto: "El principio de Obstáculo, tratando de que el ciudadano tenga que ir muchas veces a la oficina para que aprenda a ser ordenado.", esCorrecta: false },
                { letra: "C", texto: "El principio de Misterio, no dándole toda la información completa para que el ciudadano tenga que adivinar qué es lo que le falta.", esCorrecta: false }
              ],
              explicacion: "La opción A es un principio rector de la función administrativa. Las otras opciones son prácticas contrarias al buen gobierno y al servicio público."
            }
          ]
        }
      ]
    },
    {
      simoId: "231128", // ANLA - Prof. Especializado (Jurídico/Sancionatorio)
      escenarios: [
        {
          contenido: "Usted es Profesional Especializado en la Oficina Asesora Jurídica de la ANLA. Debe proyectar el acto administrativo que resuelve un recurso de reposición interpuesto por una multinacional minera contra una sanción impuesta por incumplimiento del Plan de Manejo Ambiental. La empresa alega que el retraso en la reforestación se debió a una temporada de sequía extrema que constituye fuerza mayor. Usted debe evaluar la prueba técnica aportada (reportes del IDEAM), verificar la jurisprudencia sobre el riesgo ambiental y decidir si confirma, modifica o revoca la sanción inicial.",
          categoria: "Procedimiento Sancionatorio Ambiental", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cuál es el criterio jurídico para evaluar la 'fuerza mayor' alegada por la empresa en materia ambiental?",
              opciones: [
                { letra: "A", texto: "Que el hecho sea imprevisible, irresistible y externo a la actividad del sancionado, y que haya sido la causa única del incumplimiento.", esCorrecta: true },
                { letra: "B", texto: "Que la empresa sea muy grande y dé muchos empleos, por lo que no se le debe cobrar ninguna multa aunque contamine el agua.", esCorrecta: false },
                { letra: "C", texto: "Que el abogado de la empresa sea un exministro y por eso su palabra vale más que los reportes técnicos del IDEAM.", esCorrecta: false }
              ],
              explicacion: "La opción A define los elementos constitutivos de la fuerza mayor en derecho. Las otras opciones son criterios de favoritismo contrarios a la ley."
            },
            {
              texto: "Al proyectar el acto administrativo que resuelve el recurso, ¿qué debe garantizar para que no sea anulado por la justicia administrativa?",
              opciones: [
                { letra: "A", texto: "La debida motivación fáctica y jurídica, respondiendo todos y cada uno de los argumentos planteados por el recurrente en su escrito.", esCorrecta: true },
                { letra: "B", texto: "Usar términos legales tan complicados que ni los jueces de la república puedan entender por qué se tomó la decisión.", esCorrecta: false },
                { letra: "C", texto: "Decir que se resuelve el recurso por 'corazonada' del Director de la ANLA sin necesidad de citar ninguna ley o prueba técnica.", esCorrecta: false }
              ],
              explicacion: "La opción A cumple con el requisito de motivación de los actos administrativos (CPACA). Las otras opciones vician el acto de nulidad por falta de motivación o arbitrariedad."
            },
            {
              texto: "En el marco de la jerarquía normativa, ¿cuál es la fuente principal para aplicar sanciones ambientales en la ANLA?",
              opciones: [
                { letra: "A", texto: "La Ley 1333 de 2009 (Procedimiento Sancionatorio Ambiental) y el Código de Procedimiento Administrativo y de lo Contencioso Administrativo.", esCorrecta: true },
                { letra: "B", texto: "Las normas de tránsito, porque el transporte de los minerales por carretera es lo más importante de la minería.", esCorrecta: false },
                { letra: "C", texto: "La Biblia, aplicando la ley del talión contra las empresas que dañen la naturaleza creada por Dios.", esCorrecta: false }
              ],
              explicacion: "La opción A identifica el marco legal específico del derecho sancionatorio ambiental colombiano. Las otras opciones son erróneas o no jurídicas."
            }
          ]
        },
        {
          contenido: "Como Profesional Jurídico en la ANLA, se le asigna la tarea de adelantar una audiencia pública ambiental en un municipio donde se pretende instalar un relleno sanitario regional. Existe una fuerte oposición de las comunidades étnicas locales que reclaman el derecho a la consulta previa. Usted debe coordinar la logística jurídica de la audiencia, asegurar la participación de todos los actores y emitir un concepto sobre la procedencia de la consulta previa basándose en la certificación del Ministerio del Interior y el convenio 169 de la OIT.",
          categoria: "Consulta Previa y Participación", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cuál es el requisito técnico-legal para determinar si procede la consulta previa en un proyecto ambiental?",
              opciones: [
                { letra: "A", texto: "La certificación del Ministerio del Interior sobre la presencia de comunidades étnicas en el área de influencia directa del proyecto.", esCorrecta: true },
                { letra: "B", texto: "Que el alcalde del municipio diga que a él le parece que en ese barrio vive mucha gente que parece de comunidades étnicas.", esCorrecta: false },
                { letra: "C", texto: "Hacer una votación en la plaza del pueblo y si gana el 'Sí', entonces no se hace ninguna consulta a los indígenas.", esCorrecta: false }
              ],
              explicacion: "La opción A es el procedimiento legal definido para identificar la procedencia del derecho fundamental a la consulta previa. Las otras opciones son informales o vulneran derechos."
            },
            {
              texto: "Durante la audiencia pública, ¿cuál es su rol como funcionario jurídico de la ANLA?",
              opciones: [
                { letra: "A", texto: "Garantizar el orden, la transparencia y que todas las intervenciones técnicas y ciudadanas queden consignadas en el expediente ambiental.", esCorrecta: true },
                { letra: "B", texto: "Defender a la empresa que quiere hacer el relleno sanitario y tratar de convencer a la gente de que la basura no huele mal.", esCorrecta: false },
                { letra: "C", texto: "Sentarse en la mesa principal y no dejar que nadie hable para que la audiencia termine rápido y usted pueda regresar a Bogotá.", esCorrecta: false }
              ],
              explicacion: "La opción A cumple con los fines de participación ciudadana en materia ambiental. La B es una falta a la imparcialidad y la C es una vulneración al derecho de participación."
            },
            {
              texto: "¿Qué valor jurídico tienen las intervenciones de la comunidad en una audiencia pública ambiental?",
              opciones: [
                { letra: "A", texto: "Son insumos para la decisión administrativa, que deben ser valorados técnicamente por la autoridad pero no son vinculantes (obligatorios).", esCorrecta: true },
                { letra: "B", texto: "No tienen ningún valor y se escuchan solo por protocolo para que la gente crea que el Estado les pone atención.", esCorrecta: false },
                { letra: "C", texto: "Son órdenes que la ANLA debe cumplir al pie de la letra, incluso si la comunidad pide algo que es técnicamente imposible.", esCorrecta: false }
              ],
              explicacion: "La opción A define correctamente la naturaleza jurídica de las audiencias públicas ambientales. La B es una falta de respeto al control social y la C ignora la autonomía de la autoridad técnica."
            }
          ]
        }
      ]
    },
    {
      simoId: "242076", // SOACHA - Técnico Operativo (Planeación/Rendición de Cuentas)
      escenarios: [
        {
          contenido: "Usted es Técnico Operativo en la Secretaría de Planeación de Soacha. Debe apoyar la preparación del informe de Rendición de Cuentas a la Ciudadanía sobre el avance del Plan de Desarrollo Municipal. Su tarea es recolectar los indicadores de cumplimiento de todas las secretarías, verificar que los datos coincidan con los reportes financieros y diseñar las piezas gráficas y cuadros estadísticos que se presentarán en la audiencia pública para asegurar que la información sea clara, veraz y comprensible para todos los habitantes de Soacha.",
          categoria: "Rendición de Cuentas", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Qué característica debe tener la información presentada en una rendición de cuentas pública?",
              opciones: [
                { letra: "A", texto: "Debe ser lenguaje claro, sencillo, con datos verificables y que refleje tanto los logros como los retos o metas no alcanzadas.", esCorrecta: true },
                { letra: "B", texto: "Debe ser un documento de 500 páginas lleno de tecnicismos legales para que nadie pueda entender nada y no hagan preguntas difíciles.", esCorrecta: false },
                { letra: "C", texto: "Solo se deben mostrar fotos del Alcalde inaugurando parques, aunque los parques todavía no tengan juegos ni luz eléctrica.", esCorrecta: false }
              ],
              explicacion: "La opción A cumple con el principio de transparencia y el Manual Único de Rendición de Cuentas. Las otras opciones son prácticas de comunicación engañosa."
            },
            {
              texto: "Si detecta que una secretaría está reportando un avance del 90% pero en el sistema financiero solo tiene una ejecución del 10%, ¿qué acción realiza?",
              opciones: [
                { letra: "A", texto: "Informar la inconsistencia a su jefe inmediato y solicitar a la dependencia la aclaración técnica del desfase antes de incluir el dato en el informe.", esCorrecta: true },
                { letra: "B", texto: "Poner el 90% en el informe final porque lo importante es que la Alcaldía de Soacha se vea muy eficiente ante la prensa nacional.", esCorrecta: false },
                { letra: "C", texto: "Llamar al funcionario que mandó el dato y pedirle que le invite a almorzar a cambio de que usted no diga nada sobre el error estadístico.", esCorrecta: false }
              ],
              explicacion: "La opción A garantiza la veracidad de la información pública. La B es una falsedad y la C es un acto de corrupción."
            },
            {
              texto: "En el marco del Plan Anticorrupción, ¿qué componente se fortalece con este proceso de rendición de cuentas?",
              opciones: [
                { letra: "A", texto: "El componente de Transparencia y Acceso a la Información Pública y el de Control Social a la gestión estatal.", esCorrecta: true },
                { letra: "B", texto: "El componente de 'Gastos Reservados', para que nadie sepa en qué se gasta el dinero de los impuestos de Soacha.", esCorrecta: false },
                { letra: "C", texto: "El componente de 'Publicidad Política', para asegurar que el Alcalde actual sea reelegido en las próximas elecciones municipales.", esCorrecta: false }
              ],
              explicacion: "La opción A es la finalidad técnica de la rendición de cuentas según el MIPG. Las otras opciones son contrarias al buen gobierno."
            }
          ]
        },
        {
          contenido: "Como Técnico de Planeación en Soacha, debe actualizar las bases de datos de los proyectos de inversión financiados con recursos del Sistema General de Regalías (SGR). El sistema nacional (Gesproy) reporta alertas rojas en dos proyectos de pavimentación por falta de registro de bitácoras de obra y retrasos en los pagos a proveedores. Usted debe realizar la visita técnica de campo, verificar el estado real de las obras y asegurar que el supervisor cargue la información necesaria para levantar las alertas y evitar la suspensión de giros de regalías al municipio.",
          categoria: "Gestión de Regalías", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cuál es el riesgo para el municipio si las alertas en el sistema Gesproy no son atendidas a tiempo?",
              opciones: [
                { letra: "A", texto: "La suspensión de los giros de recursos de regalías por parte del nivel nacional y el inicio de procesos de control fiscal.", esCorrecta: true },
                { letra: "B", texto: "Que el computador de la Secretaría de Planeación se bloquee y no deje jugar solitario a los funcionarios durante la hora de almuerzo.", esCorrecta: false },
                { letra: "C", texto: "Ninguno, el gobierno nacional nunca se da cuenta de lo que pasa con la plata de las regalías en los municipios de Cundinamarca.", esCorrecta: false }
              ],
              explicacion: "La opción A es la consecuencia legal del incumplimiento en el reporte de proyectos de regalías. Las otras opciones son absurdas."
            },
            {
              texto: "Durante la visita de campo, ¿qué evidencia física es indispensable para validar el avance de la obra?",
              opciones: [
                { letra: "A", texto: "El registro fotográfico con coordenadas georreferenciadas, la revisión de las cantidades de obra ejecutadas y la firma del diario de obra.", esCorrecta: true },
                { letra: "B", texto: "Ver si el letrero que dice 'Obra del Alcalde' está bien pintado y se ve desde lejos en la carretera principal.", esCorrecta: false },
                { letra: "C", texto: "Preguntarles a los vecinos si ellos creen que la obra va rápido o si los trabajadores son muy perezosos.", esCorrecta: false }
              ],
              explicacion: "La opción A es la técnica de seguimiento a proyectos de infraestructura pública. La B es publicidad política y la C es un criterio subjetivo no técnico."
            },
            {
              texto: "¿Qué principio de la administración pública se aplica al mantener bases de datos veraces sobre la inversión de regalías?",
              opciones: [
                { letra: "A", texto: "El principio de Responsabilidad y Transparencia en el manejo de recursos públicos que pertenecen a todos los ciudadanos.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'Esconder los Errores', para que los entes de control no molesten a los funcionarios que no saben hacer su trabajo.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Gastar Rápido', sin importar si las obras quedan mal hechas o si se pierde el dinero en el camino.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la gestión técnica con los valores del servicio público. Las otras opciones son prácticas corruptas o negligentes."
            }
          ]
        }
      ]
    },
    {
      simoId: "240586", // PEREIRA - Auxiliar Administrativo (Logística/Atención)
      escenarios: [
        {
          contenido: "Usted es Auxiliar Administrativo en la Alcaldía de Pereira. Su oficina debe organizar un evento masivo de socialización del Plan de Ordenamiento Territorial (POT) en el Centro Cultural Lucy Tejada. Se esperan más de 500 asistentes. Usted debe coordinar la logística (reserva del espacio, sonido, registros de asistencia), asegurar que los materiales informativos (folletos, mapas) estén listos y disponibles, y gestionar la atención a los ciudadanos que lleguen con dudas específicas sobre la afectación de sus predios por la nueva normativa urbana.",
          categoria: "Apoyo Logístico y Servicio", dificultad: "BASICO",
          preguntas: [
            {
              texto: "¿Cuál es su prioridad logística minutos antes de iniciar el evento masivo?",
              opciones: [
                { letra: "A", texto: "Verificar el funcionamiento del sonido, la disposición de las salidas de emergencia y que el personal de registro tenga los listados y bolígrafos necesarios.", esCorrecta: true },
                { letra: "B", texto: "Elegir la mejor silla de la primera fila para sentarse usted mismo y ver el evento sin que nadie lo moleste.", esCorrecta: false },
                { letra: "C", texto: "Irse a tomar café a la plaza de Bolívar asumiendo que todo va a salir perfecto porque usted es una persona muy afortunada.", esCorrecta: false }
              ],
              explicacion: "La opción A garantiza el éxito operativo y la seguridad del evento público. La B es una falta de vocación de servicio y la C es una negligencia logística."
            },
            {
              texto: "Durante el registro, un ciudadano exige que le entreguen 20 folletos para llevarle a todos sus amigos del barrio. ¿Cómo procede?",
              opciones: [
                { letra: "A", texto: "Entregar un ejemplar por persona para garantizar que todos los asistentes alcancen material, y ofrecer la versión digital para descargar.", esCorrecta: true },
                { letra: "B", texto: "Entregarle todos los que pida para que el ciudadano no se ponga bravo y deje de gritar en la mesa de registro.", esCorrecta: false },
                { letra: "C", texto: "Quitarle los folletos de las manos de forma agresiva y decirle que si quiere más información, que él mismo la imprima en su casa.", esCorrecta: false }
              ],
              explicacion: "La opción A aplica criterios de eficiencia en el uso de materiales públicos y buen trato. La B es un desperdicio de recursos y la C es una falta de respeto al ciudadano."
            },
            {
              texto: "¿Qué importancia tiene el 'Registro de Asistencia' para la Alcaldía de Pereira?",
              opciones: [
                { letra: "A", texto: "Es la evidencia legal de la participación ciudadana en el proceso de formulación del POT y sirve para la rendición de cuentas institucional.", esCorrecta: true },
                { letra: "B", texto: "Es una lista de nombres para que los políticos de la ciudad puedan llamar a la gente después para pedirles votos.", esCorrecta: false },
                { letra: "C", texto: "Es un papel inútil que se llena solo para que la gente pierda tiempo haciendo fila antes de entrar al auditorio.", esCorrecta: false }
              ],
              explicacion: "La opción A define el valor administrativo y democrático del registro de participación. Las otras opciones son usos indebidos o interpretaciones erróneas."
            }
          ]
        },
        {
          contenido: "Como Auxiliar Administrativo en Pereira, debe elaborar el reporte mensual de las llamadas recibidas en la línea de atención al ciudadano. Nota que el 40% de las quejas son sobre el mal estado de los parques en la Comuna Cuba. Usted debe tabular la información, clasificar las solicitudes por tipo de daño (iluminación, juegos, basura) y remitir el reporte detallado a la Secretaría de Infraestructura y a la Empresa de Aseo, asegurando que la información sirva para priorizar las jornadas de mantenimiento en el municipio.",
          categoria: "Gestión de Información y Reportes", dificultad: "BASICO",
          preguntas: [
            {
              texto: "¿Qué herramienta de software es más pertinente para tabular y graficar este reporte de quejas ciudadanas?",
              opciones: [
                { letra: "A", texto: "Una hoja de cálculo (como Excel) que permita crear tablas dinámicas y gráficos de barras para visualizar las problemáticas por sector.", esCorrecta: true },
                { letra: "B", texto: "Escribir los nombres de los parques en un bloc de notas (txt) sin ningún orden para que el jefe tenga que leer todo el archivo.", esCorrecta: false },
                { letra: "C", texto: "Dibujar los parques en un programa de diseño artístico para que el reporte se vea muy bonito aunque no tenga datos estadísticos.", esCorrecta: false }
              ],
              explicacion: "La opción A es la herramienta técnica adecuada para el análisis de datos administrativos. Las otras opciones son ineficientes o no cumplen el objetivo del reporte."
            },
            {
              texto: "Al clasificar las quejas, ¿qué criterio debe seguir para que el reporte sea útil a las otras dependencias?",
              opciones: [
                { letra: "A", texto: "La precisión en la ubicación del parque y el tipo de daño reportado, para que las cuadrillas de mantenimiento sepan qué materiales llevar.", esCorrecta: true },
                { letra: "B", texto: "Clasificarlas por el tono de voz del ciudadano: 'Gente amable', 'Gente gritona' y 'Gente que no se entiende lo que dice'.", esCorrecta: false },
                { letra: "C", texto: "Poner todas las quejas en una sola categoría llamada 'Cosas dañadas en Pereira' para no cansarse clasificando información.", esCorrecta: false }
              ],
              explicacion: "La opción A garantiza la efectividad de la respuesta administrativa. Las otras opciones son criterios irrelevantes o negligentes."
            },
            {
              texto: "¿Cuál es el fin último de realizar estos reportes periódicos de atención al ciudadano?",
              opciones: [
                { letra: "A", texto: "Detectar fallas recurrentes en la prestación de servicios públicos y generar alertas tempranas para el mejoramiento de la gestión municipal.", esCorrecta: true },
                { letra: "B", texto: "Tener una excusa para no contestar el teléfono mientras usted está ocupado haciendo cuadros de colores en el computador.", esCorrecta: false },
                { letra: "C", texto: "Descubrir quiénes son los ciudadanos que más se quejan para bloquear sus números de teléfono y que no vuelvan a llamar a la Alcaldía.", esCorrecta: false }
              ],
              explicacion: "La opción A es el propósito de la vigilancia y control social en el Estado. Las otras opciones son prácticas contrarias a la ética y al buen servicio público."
            }
          ]
        }
      ]
    }
  ];

  for (const item of dataToInsert) {
    const opec = await prisma.opec.findFirst({
      where: { simoId: item.simoId }
    });

    if (!opec) {
      console.log(`⚠️ OPEC con simoId ${item.simoId} no encontrada.`);
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
      console.log(`✅ OPEC ${opec.simoId} (${opec.nombreCargo.slice(0, 40)}): escenarios agregados`);
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
