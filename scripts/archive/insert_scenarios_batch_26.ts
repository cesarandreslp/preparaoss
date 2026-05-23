import { PrismaClient, TipoPregunta, NivelDificultad } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const dataToInsert: any[] = [
    {
      simoId: "240585", // PEREIRA - Técnico Adm. (Sistemas/Estadística)
      escenarios: [
        {
          contenido: "Usted es Técnico Administrativo en la Alcaldía de Pereira. Debe procesar la información recolectada por la dependencia para generar un informe estadístico sobre la calidad de vida de los habitantes de un sector vulnerable. Nota que las bases de datos tienen inconsistencias graves, como cédulas duplicadas y direcciones inexistentes. Usted debe depurar la información, asegurar la confidencialidad de los datos sensibles y consolidar los resultados para la toma de decisiones del Alcalde.",
          categoria: "Gestión de Información y Estadística", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cuál es el primer paso técnico para depurar una base de datos con registros duplicados?",
              opciones: [
                { letra: "A", texto: "Utilizar herramientas de filtrado avanzado para identificar duplicados por el campo 'cédula', verificar cuál es el registro más reciente y eliminar las redundancias sin perder información histórica.", esCorrecta: true },
                { letra: "B", texto: "Borrar todos los registros que parezcan sospechosos a ojo para terminar rápido el informe estadístico.", esCorrecta: false },
                { letra: "C", texto: "Dejar los duplicados así, asumiendo que más gente registrada hace que la gestión del Alcalde se vea más importante.", esCorrecta: false }
              ],
              explicacion: "La opción A sigue procedimientos técnicos de manejo de datos. Las otras opciones son negligencias o manipulación de la información."
            },
            {
              texto: "En cuanto a la confidencialidad, ¿qué medida debe aplicar al compartir el informe estadístico con otras áreas?",
              opciones: [
                { letra: "A", texto: "Anonimizar los datos personales (nombres y cédulas), presentando solo resultados agregados y tendencias sociodemográficas.", esCorrecta: true },
                { letra: "B", texto: "Publicar el Excel completo con los nombres y direcciones de todos los ciudadanos en la página web de la Alcaldía.", esCorrecta: false },
                { letra: "C", texto: "Contarle los problemas personales de los encuestados a sus compañeros de oficina durante el almuerzo.", esCorrecta: false }
              ],
              explicacion: "La opción A cumple con la Ley 1581 de Protección de Datos Personales. Las otras opciones violan la reserva legal y la ética pública."
            },
            {
              texto: "¿Qué valor de la integridad se destaca al reportar estadísticas reales aunque no sean favorables para la administración?",
              opciones: [
                { letra: "A", texto: "La Honestidad y la Veracidad, garantizando que las políticas públicas se basen en la realidad del territorio.", esCorrecta: true },
                { letra: "B", texto: "La Cobardía, teniendo miedo de que el Alcalde se enoje si ve que la pobreza aumentó en Pereira.", esCorrecta: false },
                { letra: "C", texto: "La Indiferencia, entregando los números sin analizar qué impacto tienen en la vida de la gente.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la labor técnica con la ética del servidor público. Las otras opciones son posturas negativas o mediocres."
            }
          ]
        },
        {
          contenido: "Como Técnico en Pereira, recibe una solicitud de información de un concejal sobre la ejecución de los planes de gestión de la dependencia. El concejal le pide los datos en un formato específico que no existe actualmente. Usted debe organizar la información, normalizar los documentos según el Sistema de Gestión y Control, y proyectar la respuesta dentro de los términos legales, coordinando con su equipo de trabajo para asegurar la exactitud de los datos suministrados.",
          categoria: "Atención a Entes de Control / Normalización", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cómo debe proceder si el formato solicitado por el concejal no existe en la entidad?",
              opciones: [
                { letra: "A", texto: "Extraer la información de los sistemas oficiales y adaptarla al formato solicitado, siempre que no se altere la veracidad de los datos ni se vulnere la reserva legal.", esCorrecta: true },
                { letra: "B", texto: "Decirle al concejal que si el formato no existe, la Alcaldía no tiene la obligación de darle ninguna información.", esCorrecta: false },
                { letra: "C", texto: "Mandarle al concejal un montón de carpetas desordenadas para que él mismo busque lo que necesita.", esCorrecta: false }
              ],
              explicacion: "La opción A refleja el principio de colaboración y transparencia administrativa. Las otras opciones son barreras al control político."
            },
            {
              texto: "En cuanto a los términos de ley para responder a un concejal (Derecho de Petición de Información), ¿cuál es el plazo general?",
              opciones: [
                { letra: "A", texto: "Diez (10) días hábiles, según lo establecido en el Código de Procedimiento Administrativo y de lo Contencioso Administrativo.", esCorrecta: true },
                { letra: "B", texto: "Un mes o cuando el funcionario tenga tiempo libre después de terminar sus otras tareas.", esCorrecta: false },
                { letra: "C", texto: "Inmediatamente, dejando de atender a todos los ciudadanos en ventanilla para trabajar solo para el concejal.", esCorrecta: false }
              ],
              explicacion: "La opción A identifica el término legal vigente. Las otras opciones ignoran la ley o afectan el servicio general."
            },
            {
              texto: "¿Qué principio rige la normalización de los documentos en el Sistema de Gestión de la Alcaldía?",
              opciones: [
                { letra: "A", texto: "La Eficacia y la Mejora Continua, asegurando que la información sea fácil de localizar, recuperar y auditar.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'Complicar las cosas', para que nadie que no trabaje en la Alcaldía pueda entender los archivos.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Memoria Visual', confiando en que el funcionario más antiguo sabe dónde está cada papel sin necesidad de registros.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la gestión documental con los estándares de calidad. Las otras opciones son ineficiencias o riesgos de pérdida de información."
            }
          ]
        }
      ]
    },
    {
      simoId: "243348", // BOYACÁ - Prof. Univ. (Ingeniería Civil/Vías)
      escenarios: [
        {
          contenido: "Usted es Profesional Universitario en la Secretaría de Infraestructura de la Gobernación de Boyacá. Debe actualizar el Inventario Vial Departamental para reportarlo al Ministerio de Transporte. Identifica que varios tramos de red vial secundaria han sufrido daños graves por la ola invernal que no aparecen en los planos récord. Usted debe coordinar la toma de datos en campo, consolidar la información técnica sobre el estado de la carpeta asfáltica y las obras de arte, y asegurar que el reporte sea veraz para gestionar recursos nacionales de emergencia.",
          categoria: "Infraestructura Vial / Gestión de Inventarios", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Qué elemento técnico es fundamental incluir en el inventario de un tramo vial con falla geológica?",
              opciones: [
                { letra: "A", texto: "La georreferenciación del punto crítico, el tipo de falla detectada (asentamiento, remoción en masa) y la descripción del estado actual del drenaje y muros de contención.", esCorrecta: true },
                { letra: "B", texto: "Una nota diciendo que la carretera está 'fea' y que se necesita mucha plata para arreglarla.", esCorrecta: false },
                { letra: "C", texto: "El nombre del contratista que construyó la vía hace 20 años para echarle la culpa del daño actual.", esCorrecta: false }
              ],
              explicacion: "La opción A utiliza criterios técnicos de ingeniería civil para el diagnóstico de infraestructura. Las otras opciones carecen de rigor técnico."
            },
            {
              texto: "Al reportar información al Ministerio de Transporte mediante el sistema oficial, ¿cuál es su responsabilidad?",
              opciones: [
                { letra: "A", texto: "Garantizar que los datos reportados coincidan con la realidad física de la vía y que cuenten con el sustento técnico de las visitas de campo.", esCorrecta: true },
                { letra: "B", texto: "Maquillar los datos para que parezca que en Boyacá no hay ningún hueco y que todas las vías están perfectas.", esCorrecta: false },
                { letra: "C", texto: "Pedirle a un transportador de carga que le diga qué tal le parece la vía y anotar eso como informe oficial.", esCorrecta: false }
              ],
              explicacion: "La opción A cumple con los deberes de veracidad y transparencia administrativa. Las otras opciones son fraudes documentales o falta de rigor."
            },
            {
              texto: "¿Qué principio rige la elaboración del Plan Vial Departamental en coordinación con el nivel nacional?",
              opciones: [
                { letra: "A", texto: "La Coordinación y la Eficiencia, alineando las metas regionales con la política nacional de transporte y logística.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'Autonomía Absoluta', haciendo lo que la Gobernación quiera sin importar lo que diga el Ministerio.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Soberbia Técnica', asumiendo que los ingenieros de Boyacá no necesitan seguir los manuales del INVIAS.", esCorrecta: false }
              ],
              explicacion: "La opción A refleja el funcionamiento armónico del Estado unitario descentralizado. Las otras opciones son conductas descoordinadas o arrogantes."
            }
          ]
        },
        {
          contenido: "Como Ingeniero de la Gobernación de Boyacá, debe atender una solicitud de permiso de intervención en la red vial departamental por parte de una empresa de servicios públicos que necesita instalar una tubería. Usted debe evaluar la pertinencia técnica del permiso, verificar el plan de manejo de tráfico propuesto y realizar el seguimiento para asegurar que, tras la obra, la vía quede en las mismas o mejores condiciones de transitabilidad y seguridad.",
          categoria: "Permisos de Intervención Vial / Seguimiento", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Qué requisito técnico es innegociable en un permiso de intervención de calzada?",
              opciones: [
                { letra: "A", texto: "La garantía de estabilidad de la obra y el compromiso de reposición de la carpeta asfáltica cumpliendo con las normas de compactación del INVIAS.", esCorrecta: true },
                { letra: "B", texto: "Que la empresa de servicios públicos le regale una conexión de agua gratis a la casa del ingeniero que firma el permiso.", esCorrecta: false },
                { letra: "C", texto: "Que la obra se realice solo los domingos para que el ingeniero no tenga que ir a supervisar en su horario de oficina.", esCorrecta: false }
              ],
              explicacion: "La opción A protege la integridad de la infraestructura pública. Las otras opciones son actos de corrupción o negligencias operativas."
            },
            {
              texto: "En cuanto al seguimiento a obras en periodo de estabilidad, ¿cuál es su función?",
              opciones: [
                { letra: "A", texto: "Realizar visitas periódicas para detectar fisuras, hundimientos o fallas en la zona intervenida y exigir la reparación inmediata bajo la póliza de estabilidad.", esCorrecta: true },
                { letra: "B", texto: "Esperar a que el pavimento se rompa del todo y los ciudadanos se quejen para llamar a la empresa constructora.", esCorrecta: false },
                { letra: "C", texto: "No volver por la zona de la obra una vez firmado el acta de entrega final para no tener más trabajo acumulado.", esCorrecta: false }
              ],
              explicacion: "La opción A es la labor técnica de supervisión y protección del patrimonio vial. Las otras opciones son omisiones de funciones."
            },
            {
              texto: "¿Qué valor del servidor público se destaca al defender la calidad de las obras viales ante terceros?",
              opciones: [
                { letra: "A", texto: "La Justicia y el Compromiso, asegurando que el espacio público sea respetado y devuelto en condiciones óptimas a la comunidad.", esCorrecta: true },
                { letra: "B", texto: "La Tacañería, tratando de que las empresas de servicios públicos gasten el triple de lo necesario en los arreglos.", esCorrecta: false },
                { letra: "C", texto: "La Indiferencia, asumiendo que un bache más en la carretera no le hace daño a nadie.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la labor técnica con la ética del recaudo y la inversión social. Las otras opciones son visiones negativas o negligentes."
            }
          ]
        }
      ]
    },
    {
      simoId: "241158", // PITALITO - Conductor (Maquinaria/Logística)
      escenarios: [
        {
          contenido: "Usted es Conductor en la Alcaldía de Pitalito, encargado de la maquinaria pesada para el mantenimiento de vías rurales. Recibe la orden de trasladar la retroexcavadora a una vereda para remover un derrumbe. Nota que el nivel de aceite hidráulico es bajo y que el horómetro indica que ya se pasó el tiempo para el mantenimiento preventivo. Usted debe decidir si realiza el trabajo urgente, reportar el estado de la máquina a su jefe inmediato y asegurar que el equipo no sufra daños mayores por una operación inadecuada.",
          categoria: "Operación de Maquinaria y Mantenimiento", dificultad: "BASICO",
          preguntas: [
            {
              texto: "¿Cuál es su responsabilidad técnica antes de encender la maquinaria para una labor?",
              opciones: [
                { letra: "A", texto: "Realizar la inspección pre-operacional, verificar niveles de fluidos, estado de mangueras, presión de llantas/orugas y funcionamiento de mandos.", esCorrecta: true },
                { letra: "B", texto: "Arrancar de inmediato para llegar rápido a la vereda y que la comunidad no piense que el conductor es perezoso.", esCorrecta: false },
                { letra: "C", texto: "Esperar a que la máquina empiece a echar humo para saber que algo le falta en el motor.", esCorrecta: false }
              ],
              explicacion: "La opción A es el protocolo de seguridad y cuidado de activos establecido para operadores de maquinaria. Las otras opciones son negligencias que causan daños costosos."
            },
            {
              texto: "Ante la falta de mantenimiento preventivo, ¿cuál es la conducta profesional correcta?",
              opciones: [
                { letra: "A", texto: "Informar por escrito al jefe inmediato sobre el vencimiento del mantenimiento y el riesgo de avería grave si se opera el equipo en esas condiciones.", esCorrecta: true },
                { letra: "B", texto: "Seguir trabajando hasta que la máquina se rompa del todo para que la Alcaldía tenga que comprar una nueva.", esCorrecta: false },
                { letra: "C", texto: "Echarle un poco de aceite de cocina al tanque para salir del paso y terminar el trabajo del día.", esCorrecta: false }
              ],
              explicacion: "La opción A cumple con el deber de cuidado de los bienes públicos y la gestión del riesgo. Las otras opciones son irresponsabilidades o soluciones absurdas."
            },
            {
              texto: "¿Qué valor del servidor público se destaca al cuidar las herramientas y equipos del municipio?",
              opciones: [
                { letra: "A", texto: "La Responsabilidad y la Honestidad, reconociendo que la maquinaria es un bien de todos para el servicio de la comunidad.", esCorrecta: true },
                { letra: "B", texto: "La Tacañería, no queriendo usar la máquina para que no se gaste ni se ensucie en el barro de las veredas.", esCorrecta: false },
                { letra: "C", texto: "El Miedo, cuidando la máquina solo por temor a que el jefe le cobre el arreglo de su propio sueldo.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la labor del conductor con el Código de Integridad. Las otras opciones son sentimientos o posturas negativas."
            }
          ]
        },
        {
          contenido: "Como Conductor de Pitalito, debe llevar el control del consumo de combustible de la maquinaria a su cargo. Al finalizar la jornada, nota que en la bitácora de la estación de servicio aparece registrado un galonaje superior al que realmente entró al tanque de la máquina. Usted debe negarse a firmar la bitácora con errores, reportar la inconsistencia administrativa y asegurar que los recursos públicos destinados a combustible se manejen con transparencia absoluta.",
          categoria: "Control de Insumos y Ética", dificultad: "BASICO",
          preguntas: [
            {
              texto: "¿Por qué es vital llevar el control exacto en la bitácora de combustible?",
              opciones: [
                { letra: "A", texto: "Para evitar el desperdicio o desvío de recursos públicos, permitir el cálculo de eficiencia de la máquina y cumplir con la rendición de cuentas.", esCorrecta: true },
                { letra: "B", texto: "Para que el conductor pueda demostrar que él es el que más gasolina gasta de toda la Alcaldía.", esCorrecta: false },
                { letra: "C", texto: "Para que la bitácora se vea muy llena de números y parezca que se trabajó mucho durante el mes.", esCorrecta: false }
              ],
              explicacion: "La opción A define la finalidad técnica y ética del control de insumos. Las otras opciones son visiones banales o erróneas."
            },
            {
              texto: "Ante una diferencia de galonaje en el registro de la estación de servicio, ¿qué debe hacer?",
              opciones: [
                { letra: "A", texto: "No firmar el recibido, dejar constancia de la diferencia en la observación y reportar inmediatamente al supervisor del contrato de combustible.", esCorrecta: true },
                { letra: "B", texto: "Firmar lo que sea para no retrasar el regreso a casa y no pelear con el bombero de la estación.", esCorrecta: false },
                { letra: "C", texto: "Pedirle al bombero que le dé un poco de dinero en efectivo a cambio de firmar por el galonaje inflado.", esCorrecta: false }
              ],
              explicacion: "La opción A protege el erario público y la integridad del funcionario. Las otras opciones son negligencias o actos de corrupción directos."
            },
            {
              texto: "¿Qué principio rige la custodia de la maquinaria al finalizar la jornada laboral?",
              opciones: [
                { letra: "A", texto: "La Diligencia y la Seguridad, guardando el equipo en el sitio autorizado y siguiendo los protocolos para evitar robos o vandalismo.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'Dejar donde caiga', dejando la retroexcavadora en medio de la vía para que todo el mundo la vea.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Confianza Ciega', dejando las llaves puestas por si alguien necesita mover la máquina durante la noche.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la gestión con los fines de protección de los bienes del Estado. Las otras opciones son conductas irresponsables."
            }
          ]
        }
      ]
    },
    {
      simoId: "243208", // BELLAS ARTES - Maestro en Artes (Títeres/Teatro)
      escenarios: [
        {
          contenido: "Usted es Maestro en Artes en el Instituto Departamental de Bellas Artes. Debe proponer un nuevo montaje de teatro de títeres para una gira por escuelas rurales del Valle del Cauca. Nota que la propuesta pedagógica actual es muy técnica y no conecta con la realidad social y cultural de los niños campesinos. Usted debe realizar un proceso de investigación-creación, rediseñar los personajes y la escenografía para que sean pertinentes al contexto rural y asegurar que la obra promueva el reconocimiento y valoración de las tradiciones locales.",
          categoria: "Gestión Cultural y Pedagogía Artística", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cuál es el componente fundamental de una propuesta pedagógica artística para el sector rural?",
              opciones: [
                { letra: "A", texto: "La pertinencia cultural, integrando elementos del entorno, el lenguaje local y las problemáticas del campo para generar diálogo y aprendizaje.", esCorrecta: true },
                { letra: "B", texto: "Que los títeres sean de materiales muy caros traídos de Europa para que los niños vean cosas de lujo.", esCorrecta: false },
                { letra: "C", texto: "Usar un lenguaje muy difícil y académico para que los niños piensen que el teatro es solo para gente muy inteligente.", esCorrecta: false }
              ],
              explicacion: "La opción A refleja los principios de educación artística integral y diálogo de saberes. Las otras opciones son elitistas o banales."
            },
            {
              texto: "En el diseño de personajes y vestuario, ¿qué debe priorizar para la gira por escuelas?",
              opciones: [
                { letra: "A", texto: "La funcionalidad para el transporte, la durabilidad de los materiales y la carga simbólica que facilite la identificación del público con la historia.", esCorrecta: true },
                { letra: "B", texto: "Que los personajes se parezcan a los dibujos animados de moda en la televisión comercial de Estados Unidos.", esCorrecta: false },
                { letra: "C", texto: "Hacer títeres tan grandes que no quepan en el bus de la Gobernación para obligar a contratar un camión extra.", esCorrecta: false }
              ],
              explicacion: "La opción A utiliza criterios técnicos de producción escénica y semiótica del títere. Las otras opciones son ineficiencias o falta de identidad artística."
            },
            {
              texto: "¿Qué valor del servidor público se destaca al llevar arte y cultura a las zonas más apartadas?",
              opciones: [
                { letra: "A", texto: "El Compromiso y la Inclusión, reconociendo que el derecho a la cultura es para todos los ciudadanos sin importar su ubicación geográfica.", esCorrecta: true },
                { letra: "B", texto: "La Vanidad, queriendo ser el artista más famoso de todo el departamento del Valle.", esCorrecta: false },
                { letra: "C", texto: "La Piedad, haciendo teatro para los niños pobres solo porque le dan lástima sus condiciones de vida.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la labor artística con los fines sociales de la entidad pública. Las otras opciones son sentimientos negativos o posturas arrogantes."
            }
          ]
        },
        {
          contenido: "Como Maestro en Artes de Bellas Artes, debe representar a la entidad en un festival internacional de teatro. Se le asigna la custodia de la utilería y equipos de iluminación de alta tecnología. Durante el viaje, nota que una caja de equipos no está debidamente asegurada y podría dañarse. Usted debe tomar las medidas de protección necesarias, informar sobre cualquier novedad y asegurar que las herramientas asignadas se conserven en perfecto estado para futuras funciones en el departamento.",
          categoria: "Custodia de Activos Culturales", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cuál es su deber frente al cuidado de los equipos especializados de Bellas Artes?",
              opciones: [
                { letra: "A", texto: "Velar por su correcta manipulación, almacenamiento y transporte, aplicando las normas de seguridad técnica para evitar el deterioro prevenible.", esCorrecta: true },
                { letra: "B", texto: "Asumir que si los equipos se rompen, la Gobernación tiene mucha plata para comprar otros mejores el próximo año.", esCorrecta: false },
                { letra: "C", texto: "Prestarle los equipos a amigos de otras compañías de teatro para que ellos también los usen gratis.", esCorrecta: false }
              ],
              explicacion: "La opción A cumple con los deberes de cuidado de los bienes públicos. Las otras opciones son negligencias o usos indebidos de activos del Estado."
            },
            {
              texto: "Ante un daño accidental en una herramienta artística, ¿cómo debe proceder?",
              opciones: [
                { letra: "A", texto: "Diligenciar el informe de novedad técnica explicando las causas, el estado del bien y las acciones tomadas para mitigar el daño.", esCorrecta: true },
                { letra: "B", texto: "Esconder el equipo roto en el fondo de la bodega para que nadie se dé cuenta del daño por mucho tiempo.", esCorrecta: false },
                { letra: "C", texto: "Echarle pegamento rápido al equipo y esperar a que el próximo funcionario que lo use sea el que tenga que dar explicaciones.", esCorrecta: false }
              ],
              explicacion: "La opción A refleja la transparencia y la responsabilidad en la gestión administrativa. Las otras opciones son conductas deshonestas o negligentes."
            },
            {
              texto: "¿Qué principio rige la representación institucional en eventos artísticos externos?",
              opciones: [
                { letra: "A", texto: "La Idoneidad y el Respeto, proyectando la calidad académica y artística de Bellas Artes mediante una conducta ética y profesional.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'Individualismo', actuando por cuenta propia sin seguir los lineamientos de la Dirección del Instituto.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Soberbia Artística', tratando con desprecio a los artistas de otros países que no tienen el mismo nivel técnico.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la labor con los fines de posicionamiento y misión institucional. Las otras opciones son conductas no profesionales."
            }
          ]
        }
      ]
    },
    {
      simoId: "243203", // BELLAS ARTES - Auxiliar Adm. (Almacén)
      escenarios: [
        {
          contenido: "Usted es Auxiliar Administrativo en el almacén del Instituto de Bellas Artes. Debe entregar los materiales de consumo (pinturas, lienzos, arcilla) a las diferentes facultades para el inicio del semestre. Nota que una facultad solicita el triple de materiales que las demás sin un aumento en el número de estudiantes. Usted debe verificar las existencias, registrar las salidas en el sistema, solicitar la justificación del consumo excesivo y asegurar que los recursos se distribuyan de manera equitativa y eficiente.",
          categoria: "Gestión de Almacén e Inventarios", dificultad: "BASICO",
          preguntas: [
            {
              texto: "¿Cuál es el procedimiento técnico para registrar la salida de elementos de consumo?",
              opciones: [
                { letra: "A", texto: "Diligenciar el comprobante de salida de almacén, registrar el movimiento en el software de inventarios y obtener la firma de recibido del responsable de la dependencia.", esCorrecta: true },
                { letra: "B", texto: "Entregar los materiales en el pasillo y confiar en que los profesores se acuerden de anotar lo que se llevaron en un papelito.", esCorrecta: false },
                { letra: "C", texto: "No registrar nada para que el inventario siempre parezca lleno y el contador no tenga que trabajar en los ajustes.", esCorrecta: false }
              ],
              explicacion: "La opción A sigue el proceso administrativo y contable legal para el control de activos de consumo. Las otras opciones son negligencias riesgosas."
            },
            {
              texto: "Ante una solicitud de materiales que parece desproporcionada, ¿qué debe hacer?",
              opciones: [
                { letra: "A", texto: "Informar al Profesional Universitario del área para que verifique la necesidad real antes de autorizar el despacho masivo.", esCorrecta: true },
                { letra: "B", texto: "Entregar todo lo que piden para evitar tener discusiones con los decanos de las facultades.", esCorrecta: false },
                { letra: "C", texto: "Negarse a entregar nada porque 'el almacén es suyo' y no quiere que se gasten las pinturas tan rápido.", esCorrecta: false }
              ],
              explicacion: "La opción A cumple con el deber de control y protección de los recursos de la entidad. Las otras opciones son debilidades de control o arbitrariedades."
            },
            {
              texto: "¿Qué valor del servidor público se destaca al manejar los suministros con equidad?",
              opciones: [
                { letra: "A", texto: "La Justicia y el Respeto por el bien común, asegurando que todas las facultades tengan los insumos necesarios para sus estudiantes.", esCorrecta: true },
                { letra: "B", texto: "La Avaricia, guardando los mejores pinceles solo para los profesores que le caen bien.", esCorrecta: false },
                { letra: "C", texto: "La Indiferencia, entregando materiales vencidos o en mal estado para desocupar rápido el almacén.", esCorrecta: false }
              ],
              explicacion: "La opción A es el pilar de la integridad en la gestión de apoyo. Las otras opciones son conductas deshonestas o faltas de profesionalismo."
            }
          ]
        },
        {
          contenido: "Como Auxiliar de Almacén en Bellas Artes, recibe un pedido de computadores nuevos para el área administrativa. Al verificar el envío, nota que faltan dos cables de poder y que una de las cajas tiene un golpe visible. Usted debe consignar la novedad en el acta de recibo, no aceptar los equipos dañados sin reporte oficial y asegurar que el ingreso al inventario corresponda exactamente a lo solicitado y contratado por la entidad.",
          categoria: "Recepción de Bienes y Activos Fijos", dificultad: "BASICO",
          preguntas: [
            {
              texto: "¿Qué debe verificar prioritariamente al recibir bienes que ingresan al almacén?",
              opciones: [
                { letra: "A", texto: "Que la cantidad, calidad, marcas y especificaciones técnicas coincidan exactamente con lo estipulado en la orden de compra o contrato.", esCorrecta: true },
                { letra: "B", texto: "Que el transportador sea una persona amable y que el camión de entrega esté bien pintado.", esCorrecta: false },
                { letra: "C", texto: "Que las cajas tengan un diseño bonito para que el almacén se vea más elegante con los equipos nuevos.", esCorrecta: false }
              ],
              explicacion: "La opción A es la labor técnica de control de entrada de bienes. Las otras opciones son criterios banales ajenos a la función administrativa."
            },
            {
              texto: "Ante un bien recibido con daños visibles (caja golpeada), ¿cuál es el procedimiento?",
              opciones: [
                { letra: "A", texto: "Dejar constancia detallada en la remisión, tomar registro fotográfico y solicitar el cambio inmediato del equipo antes de firmar el acta de ingreso definitivo.", esCorrecta: true },
                { letra: "B", texto: "Recibirlo así y tratar de arreglarlo usted mismo con cinta pegante para no tener que pelear con el proveedor.", esCorrecta: false },
                { letra: "C", texto: "Decirle al transportador que se lleve todo el pedido de vuelta, incluso los equipos que están en buen estado, por puro mal genio.", esCorrecta: false }
              ],
              explicacion: "La opción A protege los intereses patrimoniales de la entidad y asegura la garantía de los equipos. Las otras opciones son negligencias o conductas no profesionales."
            },
            {
              texto: "¿Qué principio rige la organización física del almacén para garantizar la seguridad?",
              opciones: [
                { letra: "A", texto: "La Eficiencia y la Responsabilidad, clasificando los bienes por naturaleza, valor y riesgo de deterioro o pérdida.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'Donde quepa', amontonando todas las cajas una encima de otra para ahorrar espacio.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Puertas Abiertas', dejando el almacén sin llave para que cualquiera pueda entrar a buscar lo que necesite.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la labor técnica con los estándares de control de inventarios. Las otras opciones son riesgos graves para el patrimonio público."
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
