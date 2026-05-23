import { PrismaClient, TipoPregunta, NivelDificultad } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const dataToInsert: any[] = [
    {
      simoId: "240580", // PEREIRA - Prof. Universitario (Psicólogo)
      escenarios: [
        {
          contenido: "Usted es Psicólogo en una Comisaría de Familia en Pereira. Debe realizar la evaluación integral de un niño de 8 años cuyos padres están en un proceso de custodia altamente conflictivo. El niño presenta signos de ansiedad, bajo rendimiento académico y lenguaje repetitivo sobre 'secretos' que su padre le pide guardar. Usted debe realizar la valoración clínica y forense, emitir el concepto sobre la idoneidad parental y sugerir medidas de protección si detecta riesgo de alienación parental o abuso emocional.",
          categoria: "Psicología Forense / Custodia", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cuál es el protocolo técnico para entrevistar a un niño de 8 años en un contexto forense?",
              opciones: [
                { letra: "A", texto: "Utilizar un lenguaje adaptado a su edad, realizar preguntas abiertas no sugestivas y asegurar un espacio neutral y seguro (Cámara de Gesell si está disponible).", esCorrecta: true },
                { letra: "B", texto: "Gritarle al niño para que deje de llorar y diga rápido quién es su padre favorito para terminar el informe pronto.", esCorrecta: false },
                { letra: "C", texto: "Entrevistarlo frente a sus dos padres para que ellos vean que el niño no está mintiendo sobre lo que pasa en la casa.", esCorrecta: false }
              ],
              explicacion: "La opción A sigue los estándares internacionales de entrevista forense a menores. Las otras opciones son revictimizantes o técnicamente erróneas."
            },
            {
              texto: "Ante la sospecha de alienación parental (manipulación del niño contra uno de los padres), ¿qué debe recomendar?",
              opciones: [
                { letra: "A", texto: "Terapia de revinculación familiar dirigida por especialistas y medidas para cesar la manipulación, priorizando el derecho del niño a tener una relación sana con ambos padres.", esCorrecta: true },
                { letra: "B", texto: "Permitir que el niño decida solo, asumiendo que un niño de 8 años tiene la madurez para entender complejos conflictos emocionales de adultos.", esCorrecta: false },
                { letra: "C", texto: "No hacer nada, esperando que cuando el niño crezca se dé cuenta solo de quién le mentía durante su infancia.", esCorrecta: false }
              ],
              explicacion: "La opción A busca proteger el desarrollo emocional del menor. Las otras opciones son negligencias profesionales."
            },
            {
              texto: "¿Qué principio de la función administrativa rige su actuación como perito de la Comisaría?",
              opciones: [
                { letra: "A", texto: "La Imparcialidad y la Objetividad, basando el concepto en hallazgos científicos y técnicos sin tomar partido por ninguno de los padres.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'Favoritismo de Género', dándole siempre la razón a la madre porque 'madre solo hay una'.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Amiguismo', ayudando al padre que tenga el abogado más famoso de la ciudad de Pereira.", esCorrecta: false }
              ],
              explicacion: "La opción A es el deber ser ético y legal del servidor público. Las otras opciones son sesgos o actos de corrupción."
            }
          ]
        },
        {
          contenido: "Como Psicólogo en Pereira, supervisa un contrato con una fundación que brinda albergue a mujeres víctimas de violencia de género. Identifica que la fundación no cuenta con el personal especializado (trabajador social y abogado) exigido en los pliegos de condiciones y que la alimentación de las usuarias es deficiente. Usted debe realizar la auditoría técnica, documentar los incumplimientos en el informe de supervisión y solicitar el inicio del proceso sancionatorio para proteger la vida y dignidad de las mujeres beneficiarias.",
          categoria: "Supervisión de Servicios Sociales", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cuál es su responsabilidad legal frente al incumplimiento de los perfiles profesionales por parte del contratista?",
              opciones: [
                { letra: "A", texto: "Exigir la vinculación inmediata del personal idóneo según el contrato y reportar el incumplimiento que afecta la calidad del servicio técnico especializado.", esCorrecta: true },
                { letra: "B", texto: "Hacer el trabajo del abogado y del trabajador social usted mismo para que la fundación no tenga que gastar dinero en sueldos nuevos.", esCorrecta: false },
                { letra: "C", texto: "Permitir que la fundación contrate estudiantes de primer semestre porque 'lo que importa es el amor y no el título profesional'.", esCorrecta: false }
              ],
              explicacion: "La opción A es el ejercicio correcto de la supervisión contractual. Las otras opciones son negligencias o extralimitación de funciones."
            },
            {
              texto: "Ante la mala alimentación detectada, ¿qué medida de urgencia debe tomar?",
              opciones: [
                { letra: "A", texto: "Realizar una visita de inspección con la Secretaría de Salud y exigir la mejora inmediata de la minuta alimentaria bajo amenaza de suspensión del contrato.", esCorrecta: true },
                { letra: "B", texto: "Pedirle a las mujeres víctimas que ellas mismas consigan comida en la calle para completar su nutrición diaria.", esCorrecta: false },
                { letra: "C", texto: "Decirle a la fundación que no se preocupe, que las dietas estrictas son buenas para la salud de las mujeres del albergue.", esCorrecta: false }
              ],
              explicacion: "La opción A protege los derechos fundamentales de las usuarias. Las otras opciones son negligencias gravísimas o burlas al sufrimiento humano."
            },
            {
              texto: "¿Qué valor de la integridad pública se destaca al supervisar con rigor los recursos destinados a víctimas?",
              opciones: [
                { letra: "A", texto: "La Justicia y el Compromiso con la defensa de los derechos humanos y el buen uso del tesoro público.", esCorrecta: true },
                { letra: "B", texto: "La Crueldad, tratando de que la fundación pierda el contrato solo porque no le gusta el color de las paredes del albergue.", esCorrecta: false },
                { letra: "C", texto: "La Indiferencia, firmando los informes de cumplimiento sin ir nunca a visitar físicamente las instalaciones del albergue.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la gestión con los fines sociales del Estado. Las otras opciones son conductas mezquinas o negligentes."
            }
          ]
        }
      ]
    },
    {
      simoId: "241784", // ATLÁNTICO - Prof. Universitario (Comunicador)
      escenarios: [
        {
          contenido: "Usted es Profesional en Comunicación Social en la Gerencia de Capital Social de la Gobernación del Atlántico. Debe liderar la campaña de comunicación para la prevención del embarazo adolescente en municipios con altas tasas de incidencia. Usted debe diseñar las piezas gráficas, redactar los guiones para videos en redes sociales y asegurar que el lenguaje sea cercano a los jóvenes, respetando la diversidad cultural del departamento y los lineamientos de política pública nacional de salud sexual y reproductiva.",
          categoria: "Comunicación para el Desarrollo", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cuál es el enfoque comunicativo más efectivo para una campaña de prevención dirigida a jóvenes?",
              opciones: [
                { letra: "A", texto: "Un enfoque de derechos, participativo y asertivo, que use canales digitales y lenguaje juvenil sin ser estigmatizante.", esCorrecta: true },
                { letra: "B", texto: "Un enfoque de miedo, mostrando imágenes terribles de enfermedades para asustar a los jóvenes y que no tengan relaciones sexuales.", esCorrecta: false },
                { letra: "C", texto: "Un enfoque técnico aburrido, leyendo párrafos completos de leyes nacionales frente a una cámara de video durante 2 horas.", esCorrecta: false }
              ],
              explicacion: "La opción A es el estándar de comunicación estratégica para el cambio social. Las otras opciones son ineficaces o contraproducentes."
            },
            {
              texto: "Al redactar un comunicado de prensa sobre los avances de la campaña, ¿qué debe priorizar?",
              opciones: [
                { letra: "A", texto: "Datos estadísticos verificables, testimonios reales de beneficiarios y el impacto social del programa en la reducción de tasas de embarazo.", esCorrecta: true },
                { letra: "B", texto: "Escribir muchos elogios sobre lo inteligente y guapo que es el Gobernador del Atlántico sin mencionar nada sobre los jóvenes.", esCorrecta: false },
                { letra: "C", texto: "Inventar historias fantásticas sobre milagros que ocurrieron gracias a los folletos que repartió la Gobernación.", esCorrecta: false }
              ],
              explicacion: "La opción A garantiza la veracidad y el carácter institucional de la comunicación pública. Las otras opciones son culto a la personalidad o deshonestidad."
            },
            {
              texto: "¿Qué principio de la función pública se cumple al informar con veracidad sobre la gestión social?",
              opciones: [
                { letra: "A", texto: "El principio de Publicidad y Transparencia, rindiendo cuentas a la ciudadanía sobre el uso de los recursos en programas sociales.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'Propaganda', tratando de engañar a la gente para que crean que en el departamento no hay ningún problema.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Secreto Institucional', ocultando las cifras reales de embarazo adolescente para no quedar mal ante el Gobierno Nacional.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la comunicación con los valores democráticos. Las otras opciones son contrarias a la ética pública."
            }
          ]
        },
        {
          contenido: "Como Comunicador de la Gobernación del Atlántico, debe atender una crisis reputacional en redes sociales debido a una noticia falsa (fake news) que afirma que el programa de alimentación para el adulto mayor se ha suspendido por falta de fondos. El ambiente está tenso y hay amagos de protesta. Usted debe realizar el monitoreo de medios, proyectar el comunicado oficial de desmentido con pruebas de los giros realizados y coordinar una transmisión en vivo para dar tranquilidad a los beneficiarios.",
          categoria: "Gestión de Crisis / Redes Sociales", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cuál es la acción inmediata ante una 'fake news' que genera alarma social?",
              opciones: [
                { letra: "A", texto: "Desmentir rápidamente con información oficial, veraz y contrastable, usando los mismos canales donde se difundió la noticia falsa.", esCorrecta: true },
                { letra: "B", texto: "Bloquear a todos los ciudadanos que pregunten sobre el tema en las redes sociales de la Gobernación para que no se quejen más.", esCorrecta: false },
                { letra: "C", texto: "Pagarle a un influenciador para que baile una canción de moda y así la gente se olvide del problema de los abuelos.", esCorrecta: false }
              ],
              explicacion: "La opción A es la estrategia profesional de manejo de crisis de comunicación. Las otras opciones son censura o distracciones banales."
            },
            {
              texto: "En cuanto al monitoreo de medios, ¿qué herramienta técnica le permite medir el impacto de la crisis?",
              opciones: [
                { letra: "A", texto: "El análisis de sentimiento y el alcance (reach) de las publicaciones, identificando los focos de desinformación y el tono de la conversación digital.", esCorrecta: true },
                { letra: "B", texto: "Contar cuántas veces el Secretario de Prensa dijo: 'estamos muy preocupados' durante el día de la crisis.", esCorrecta: false },
                { letra: "C", texto: "Ninguna, la comunicación pública es un arte basado en la intuición y no necesita de datos ni estadísticas digitales.", esCorrecta: false }
              ],
              explicacion: "La opción A utiliza métricas modernas de comunicación digital. Las otras opciones son criterios subjetivos o desfasados."
            },
            {
              texto: "¿Qué valor de la integridad pública se destaca al enfrentar la desinformación con honestidad?",
              opciones: [
                { letra: "A", texto: "La Honestidad y la Transparencia, brindando información real que protege el derecho de los ciudadanos a estar bien informados.", esCorrecta: true },
                { letra: "B", texto: "La Astucia, logrando engañar a los medios para que crean otra noticia falsa que favorezca a la Gobernación.", esCorrecta: false },
                { letra: "C", texto: "La Cobardía, teniendo miedo de salir a dar la cara y mandando a un practicante a que responda las quejas en Twitter.", esCorrecta: false }
              ],
              explicacion: "La opción A es el pilar de la ética comunicativa estatal. Las otras opciones son conductas deshonestas o negligentes."
            }
          ]
        }
      ]
    },
    {
      simoId: "241812", // ATLÁNTICO - Secretario (Apoyo Asistencial)
      escenarios: [
        {
          contenido: "Usted es Secretario en la Gobernación del Atlántico. Su jefe inmediato tiene una agenda muy apretada con reuniones con alcaldes municipales, visitas de inspección y comités técnicos. Recibe una llamada de un ciudadano muy molesto porque afirma que envió un derecho de petición hace 20 días y no ha recibido respuesta. Usted debe localizar el radicado en el sistema de gestión documental, verificar en qué oficina se encuentra el trámite y dar una respuesta cortés al ciudadano mientras agenda el compromiso de respuesta de su jefe.",
          categoria: "Atención al Ciudadano / Gestión Documental", dificultad: "BASICO",
          preguntas: [
            {
              texto: "¿Cuál es el término legal general para responder un derecho de petición de interés particular?",
              opciones: [
                { letra: "A", texto: "Quince (15) días hábiles siguientes a su recepción, según la Ley 1755 de 2015 (que regula el derecho de petición).", esCorrecta: true },
                { letra: "B", texto: "Un año, si el funcionario está muy ocupado trabajando en proyectos más importantes para el departamento.", esCorrecta: false },
                { letra: "C", texto: "Nunca, si al Secretario no le gusta la forma en que el ciudadano escribió la carta de petición.", esCorrecta: false }
              ],
              explicacion: "La opción A es el marco legal vigente. Las otras opciones violan los derechos ciudadanos y la ley."
            },
            {
              texto: "Ante el reclamo del ciudadano por la demora, ¿cómo debe actuar el Secretario?",
              opciones: [
                { letra: "A", texto: "Escuchar con paciencia, pedir el número de radicado, informar el estado actual del trámite y comprometerse a agilizar la respuesta interna.", esCorrecta: true },
                { letra: "B", texto: "Colgarle el teléfono al ciudadano para que aprenda que los funcionarios de la Gobernación no tienen tiempo para quejas.", esCorrecta: false },
                { letra: "C", texto: "Decirle que el derecho de petición se perdió por culpa de un virus informático y que debe volver a enviarlo desde cero.", esCorrecta: false }
              ],
              explicacion: "La opción A refleja las competencias de servicio al ciudadano y eficiencia administrativa. Las otras opciones son groserías o mentiras."
            },
            {
              texto: "¿Qué herramienta técnica debe usar para que a su jefe no se le olviden los vencimientos de términos?",
              opciones: [
                { letra: "A", texto: "Mantener una agenda actualizada con alertas de colores para los términos próximos a vencer y realizar el seguimiento diario de la correspondencia pendiente.", esCorrecta: true },
                { letra: "B", texto: "Anotar todo en el aire y confiar en que su memoria es perfecta y nunca se le va a olvidar nada importante.", esCorrecta: false },
                { letra: "C", texto: "Pedirle al ciudadano que él mismo llame a su jefe todos los días a recordarle que tiene que responder la carta.", esCorrecta: false }
              ],
              explicacion: "La opción A es la labor profesional de apoyo secretarial. Las otras opciones son negligencias o falta de organización."
            }
          ]
        },
        {
          contenido: "Como Secretario en la Gobernación, debe organizar el archivo de gestión de la dependencia siguiendo las Tablas de Retención Documental (TRD). Encuentra que hay muchos documentos duplicados, folletos publicitarios viejos y borradores de informes de hace tres años. Usted debe realizar la depuración, foliación y rotulación de las carpetas, asegurando que solo permanezcan los documentos con valor administrativo, legal o técnico para facilitar el acceso a la información.",
          categoria: "Gestión Documental / Archivo", dificultad: "BASICO",
          preguntas: [
            {
              texto: "¿Qué debe hacer con las fotocopias duplicadas de documentos que ya están en el original del expediente?",
              opciones: [
                { letra: "A", texto: "Eliminarlas físicamente (previa verificación de que el original esté completo) para evitar el crecimiento innecesario del volumen documental.", esCorrecta: true },
                { letra: "B", texto: "Guardarlas en una caja debajo del escritorio por si algún día se acaba el papel en la oficina y necesita reciclarlo.", esCorrecta: false },
                { letra: "C", texto: "Folíarlas y meterlas todas en la misma carpeta para que el expediente se vea más grueso y parezca que la oficina trabajó mucho.", esCorrecta: false }
              ],
              explicacion: "La opción A es el procedimiento técnico de eliminación de documentos de apoyo según normas archivísticas. Las otras opciones son desorden o falta de criterio técnico."
            },
            {
              texto: "En cuanto a la foliación de los documentos de un expediente, ¿cuál es la técnica correcta?",
              opciones: [
                { letra: "A", texto: "Numerar consecutivamente las hojas en la esquina superior derecha, con lápiz de mina negra, en el sentido en que se lee el documento.", esCorrecta: true },
                { letra: "B", texto: "Poner números al azar en cualquier parte de la hoja usando un marcador de color fluorescente muy llamativo.", esCorrecta: false },
                { letra: "C", texto: "No numerar nada, porque contar hojas es un trabajo muy aburrido para un Secretario de la Gobernación.", esCorrecta: false }
              ],
              explicacion: "La opción A es el estándar del Archivo General de la Nación (AGN). Las otras opciones dañan el documento o pierden el control del expediente."
            },
            {
              texto: "¿Qué principio de la administración pública se protege al tener un archivo organizado?",
              opciones: [
                { letra: "A", texto: "La Transparencia y el Acceso a la Información, permitiendo que cualquier ciudadano o ente de control localice rápidamente lo que busca.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'Decoración de Oficina', para que las estanterías de la Gobernación se vean muy bonitas frente a las visitas.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Propiedad Privada', para que los funcionarios sientan que esos papeles son de ellos y de nadie más.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la gestión documental con los fines democráticos del Estado. Las otras opciones son visiones banales o erróneas."
            }
          ]
        }
      ]
    },
    {
      simoId: "245356", // TOLIMA - Técnico Operativo (Apoyo Procesos)
      escenarios: [
        {
          contenido: "Usted es Técnico Operativo en la Gobernación del Tolima. Debe apoyar la implementación de una estrategia de simplificación de trámites para los ciudadanos que solicitan pasaportes y certificados de impuestos. Nota que hay cuellos de botella en la validación de pagos bancarios. Usted debe recolectar los datos de tiempos de respuesta, proponer una integración tecnológica con los bancos y proyectar el informe de mejora para reducir las filas en el edificio de la Gobernación.",
          categoria: "Simplificación de Trámites / MIPG", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cuál es el objetivo principal de la política de Racionalización de Trámites en el Estado?",
              opciones: [
                { letra: "A", texto: "Facilitar el acceso a los servicios del Estado, reduciendo costos, tiempos y requisitos innecesarios para el ciudadano.", esCorrecta: true },
                { letra: "B", texto: "Hacer que los trámites sean tan difíciles que los ciudadanos prefieran no pedir nada a la Gobernación.", esCorrecta: false },
                { letra: "C", texto: "Contratar a más personas para que cada una pida un papel diferente y así crear más empleos en el departamento.", esCorrecta: false }
              ],
              explicacion: "La opción A define la finalidad de la Ley Antitrámites y el MIPG. Las otras opciones son visiones ineficientes o contrarias al servicio público."
            },
            {
              texto: "Para medir el 'cuello de botella', ¿qué indicador técnico debe calcular?",
              opciones: [
                { letra: "A", texto: "El Tiempo Medio de Atención (TMA) y el tiempo de espera en fila, comparándolos con los estándares de calidad definidos.", esCorrecta: true },
                { letra: "B", texto: "Cuántos ciudadanos se ven aburridos mientras esperan su turno en el pasillo de la Gobernación.", esCorrecta: false },
                { letra: "C", texto: "La cantidad de quejas que el ciudadano grita en voz alta antes de ser atendido por el funcionario de ventanilla.", esCorrecta: false }
              ],
              explicacion: "La opción A utiliza métricas de gestión de procesos objetivas. Las otras opciones son criterios subjetivos no profesionales."
            },
            {
              texto: "¿Qué principio de la función pública se fortalece al eliminar trámites inútiles?",
              opciones: [
                { letra: "A", texto: "La Celeridad y la Eficacia, garantizando que la administración responda de manera ágil a las necesidades de la gente.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'Ocio Administrativo', para que los funcionarios tengan menos trabajo que hacer durante el día.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Soberbia Estatal', demostrando que la Gobernación es tan moderna que no necesita papeles físicos.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la gestión con los mandatos constitucionales de la función administrativa. Las otras opciones son interpretaciones erróneas."
            }
          ]
        },
        {
          contenido: "Como Técnico Operativo en el Tolima, debe manejar la base de datos de los beneficiarios de un programa de entrega de kits escolares. Identifica que hay registros duplicados de niños con el mismo número de documento pero diferentes apellidos. Usted debe realizar la depuración técnica, cruzar los datos con el SIMAT y asegurar que cada kit llegue a un niño diferente para maximizar la cobertura del programa social departamental.",
          categoria: "Gestión de Datos y Calidad de Información", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cuál es el procedimiento técnico para depurar una base de datos con registros duplicados?",
              opciones: [
                { letra: "A", texto: "Utilizar el número de identificación (llave primaria) como criterio de búsqueda, verificar la veracidad del dato con fuentes oficiales y eliminar las redundancias.", esCorrecta: true },
                { letra: "B", texto: "Borrar a todos los niños que tengan apellidos que a usted le parezcan difíciles de pronunciar.", esCorrecta: false },
                { letra: "C", texto: "Dejar los duplicados para que parezca que la Gobernación entregó el doble de kits escolares y quedar bien en el informe de gestión.", esCorrecta: false }
              ],
              explicacion: "La opción A es el procedimiento técnico correcto de limpieza de datos. Las otras opciones son negligencias, discriminaciones o actos de falsedad documental."
            },
            {
              texto: "En cuanto a la protección de datos de los niños, ¿qué medida de seguridad debe aplicar?",
              opciones: [
                { letra: "A", texto: "Restringir el acceso a la base de datos solo a personal autorizado y asegurar que la información no sea compartida con terceros sin fines legales.", esCorrecta: true },
                { letra: "B", texto: "Imprimir la lista de los niños y pegarla en la puerta de la Gobernación para que todos vean quién recibió un kit escolar gratis.", esCorrecta: false },
                { letra: "C", texto: "Vender la base de datos a una empresa de juguetes para que les manden publicidad a los niños en sus casas.", esCorrecta: false }
              ],
              explicacion: "La opción A cumple con la Ley de Protección de Datos Personales (1581). Las otras opciones violan la privacidad y la ley."
            },
            {
              texto: "¿Qué valor institucional se destaca al asegurar que los recursos lleguen a quienes realmente los necesitan?",
              opciones: [
                { letra: "A", texto: "La Justicia y la Transparencia, evitando el desperdicio de recursos y garantizando la equidad en la distribución social.", esCorrecta: true },
                { letra: "B", texto: "La Avaricia, tratando de ahorrar dinero en kits escolares para que el departamento tenga más ahorros en el banco.", esCorrecta: false },
                { letra: "C", texto: "El Rencor, quitándole el kit escolar a los niños cuyos padres no votaron por el actual Gobernador del Tolima.", esCorrecta: false }
              ],
              explicacion: "La opción A es el fundamento ético de la gestión pública. Las otras opciones son conductas corruptas o visiones distorsionadas de la administración."
            }
          ]
        }
      ]
    },
    {
      simoId: "243205", // BELLAS ARTES - Prof. Universitario (Arq/Civil)
      escenarios: [
        {
          contenido: "Usted es Profesional Universitario en el Instituto Departamental de Bellas Artes, encargado de la infraestructura física. El edificio sede, que es patrimonio arquitectónico, presenta humedades graves en el techo del salón de exposiciones principal. Usted debe realizar el levantamiento de daños, proyectar el presupuesto para una restauración que respete las normas de conservación de monumentos y elaborar los estudios previos para la contratación de una empresa experta en restauración patrimonial.",
          categoria: "Infraestructura y Conservación Patrimonial", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Qué norma técnica especial debe considerar al intervenir un edificio de patrimonio arquitectónico?",
              opciones: [
                { letra: "A", texto: "La Ley de Cultura (397 de 1997) y las directrices del Ministerio de Cultura sobre intervención en Bienes de Interés Cultural (BIC).", esCorrecta: true },
                { letra: "B", texto: "Cualquier manual de construcción moderna de edificios de apartamentos, asumiendo que el cemento es igual para todas las casas.", esCorrecta: false },
                { letra: "C", texto: "La opinión del vigilante del Instituto sobre de qué color le gustaría que pintaran la fachada este año.", esCorrecta: false }
              ],
              explicacion: "La opción A identifica el marco legal específico para la protección del patrimonio nacional. Las otras opciones son negligencias técnicas o criterios banales."
            },
            {
              texto: "Al proyectar el presupuesto de restauración, ¿qué debe asegurar respecto a los materiales?",
              opciones: [
                { letra: "A", texto: "Que los materiales sean compatibles con los originales (técnicas de época) para no alterar la esencia arquitectónica ni causar daños estructurales.", esCorrecta: true },
                { letra: "B", texto: "Comprar los materiales más baratos del mercado para que el presupuesto del Instituto rinda para muchas otras cosas.", esCorrecta: false },
                { letra: "C", texto: "Usar materiales plásticos modernos para que el edificio parezca una construcción futurista del siglo XXII.", esCorrecta: false }
              ],
              explicacion: "La opción A es el criterio técnico profesional de la restauración arquitectónica. Las otras opciones son destructivas del valor patrimonial."
            },
            {
              texto: "¿Qué principio rige la elaboración de estudios previos para esta contratación especializada?",
              opciones: [
                { letra: "A", texto: "El principio de Planeación y la Idoneidad, asegurando que el contratista seleccionado tenga la experiencia certificada en monumentos nacionales.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'Sorteo', dándole el contrato a cualquier empresa de construcción que pase por la calle frente a Bellas Artes.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Favoritismo Local', contratando solo a empresas de amigos de los profesores del Instituto.", esCorrecta: false }
              ],
              explicacion: "La opción A garantiza la calidad y seguridad de la intervención en el patrimonio público. Las otras opciones son irresponsabilidades o actos de corrupción."
            }
          ]
        },
        {
          contenido: "Como Profesional en Bellas Artes, debe coordinar el mantenimiento preventivo de los sistemas eléctricos y de iluminación de los teatros institucionales. Detecta que se están usando bombillas de alta temperatura que ponen en riesgo los telones y las escenografías de madera. Usted debe realizar el cambio tecnológico a sistemas LED de baja emisión de calor, establecer protocolos de seguridad contra incendios y supervisar que el personal de servicios generales cumpla con las normas de seguridad eléctrica.",
          categoria: "Mantenimiento Preventivo y Seguridad", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Por qué es una mejora técnica el cambio a iluminación LED en un teatro con elementos de madera y tela?",
              opciones: [
                { letra: "A", texto: "Porque reduce drásticamente el riesgo de incendio por radiación térmica, disminuye el consumo de energía y mejora la calidad lumínica.", esCorrecta: true },
                { letra: "B", texto: "Porque las luces LED son más pequeñas y así el público no las puede ver desde sus asientos durante la función.", esCorrecta: false },
                { letra: "C", texto: "Porque los artistas se ven más jóvenes y delgados bajo la luz LED que bajo la luz tradicional de bombilla caliente.", esCorrecta: false }
              ],
              explicacion: "La opción A identifica las ventajas técnicas y de seguridad reales. Las otras opciones son criterios irrelevantes o absurdos."
            },
            {
              texto: "En cuanto a la supervisión del personal de servicios generales, ¿qué debe verificar priorítariamente?",
              opciones: [
                { letra: "A", texto: "El uso de Elementos de Protección Personal (EPP), el cumplimiento del RETIE y la certificación para trabajo en alturas si aplica.", esCorrecta: true },
                { letra: "B", texto: "Que el personal use uniformes de colores que combinen con las cortinas del teatro principal del Instituto.", esCorrecta: false },
                { letra: "C", texto: "Que el personal de mantenimiento sepa tocar algún instrumento musical para que ayuden en los ensayos de las orquestas.", esCorrecta: false }
              ],
              explicacion: "La opción A es la labor legal y técnica de seguridad y salud en el trabajo. Las otras opciones son requisitos banales o ajenos al cargo."
            },
            {
              texto: "¿Qué valor del servidor público se destaca al prevenir riesgos en las instalaciones culturales?",
              opciones: [
                { letra: "A", texto: "La Diligencia y la Responsabilidad, protegiendo la vida de los artistas, el público y el patrimonio físico de la entidad.", esCorrecta: true },
                { letra: "B", texto: "La Vanidad, queriendo que el Instituto tenga la iluminación más moderna de todo el departamento solo para presumir.", esCorrecta: false },
                { letra: "C", texto: "La Indiferencia, dejando que las bombillas se quemen solas antes de decidirse a realizar el mantenimiento preventivo.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la actuación con el Código de Integridad. Las otras opciones son conductas negativas que afectan la seguridad institucional."
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
