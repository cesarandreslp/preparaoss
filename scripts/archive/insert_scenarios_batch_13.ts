import { PrismaClient, TipoPregunta, NivelDificultad } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const dataToInsert: any[] = [
    {
      simoId: "236590", // DIAN - Inspector II (Gestión Documental)
      escenarios: [
        {
          contenido: "Usted es Inspector II en la DIAN, responsable de supervisar el proceso de gestión documental en una seccional de aduanas. Durante una inspección, encuentra que los expedientes de aprehensión de mercancías de gran cuantía no están debidamente foliados ni cuentan con hoja de control, y algunos documentos originales se encuentran mezclados con copias informales. Usted debe ordenar la normalización inmediata de los expedientes, verificar la trazabilidad de los títulos valores asociados y asegurar el cumplimiento de la política de cero papel mediante la digitalización certificada de los soportes.",
          categoria: "Gestión Documental Tributaria", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cuál es la consecuencia técnica de la falta de foliación y hoja de control en un expediente de aprehensión aduanera?",
              opciones: [
                { letra: "A", texto: "La pérdida de la integridad y seguridad jurídica del expediente, facilitando la extracción o alteración de pruebas en procesos legales.", esCorrecta: true },
                { letra: "B", texto: "Que el expediente pese menos y sea más fácil de cargar por los funcionarios de la bodega de la DIAN.", esCorrecta: false },
                { letra: "C", texto: "Que el archivo se vea más 'vintage' y artesanal, dándole un toque de historia a la administración aduanera.", esCorrecta: false }
              ],
              explicacion: "La opción A identifica el riesgo real de seguridad y debido proceso en la gestión documental pública. Las otras opciones son irrelevantes o absurdas."
            },
            {
              texto: "Al implementar la 'Digitalización Certificada', ¿qué requisito técnico debe garantizar según las normas de la DIAN?",
              opciones: [
                { letra: "A", texto: "El uso de firmas digitales, metadatos de preservación y un proceso que garantice la inalterabilidad de la imagen respecto al original.", esCorrecta: true },
                { letra: "B", texto: "Sacarle una foto con el celular al documento y mandarla por un grupo de WhatsApp llamado 'Archivos DIAN'.", esCorrecta: false },
                { letra: "C", texto: "Escanear solo las hojas que tengan sellos de colores para que el archivo digital no ocupe mucho espacio en el servidor.", esCorrecta: false }
              ],
              explicacion: "La opción A cumple con los estándares legales de validez probatoria de los documentos digitales. Las otras opciones son informales e inseguras."
            },
            {
              texto: "¿Qué acción debe tomar frente a la mezcla de documentos originales con copias informales?",
              opciones: [
                { letra: "A", texto: "Depurar el expediente, dejando los originales como soporte principal y las copias solo si son estrictamente necesarias como auxiliares.", esCorrecta: true },
                { letra: "B", texto: "Botar todos los originales a la basura porque las copias son más fáciles de leer y no se manchan con el tiempo.", esCorrecta: false },
                { letra: "C", texto: "Pegar los originales con las copias usando mucho pegante industrial para que nunca se puedan volver a separar.", esCorrecta: false }
              ],
              explicacion: "La opción A garantiza la calidad y relevancia del archivo administrativo. La B es una destrucción de patrimonio público y la C es un daño físico al documento."
            }
          ]
        },
        {
          contenido: "Como Inspector de la DIAN, debe supervisar el contrato de prestación de servicios para la organización de archivos históricos. El contratista reporta un retraso del 40% en la meta de organización documental debido a la falta de personal calificado. Usted debe evaluar el impacto del retraso en las auditorías de la Contraloría, proyectar el informe de supervisión con las recomendaciones de apremio o sanción al contratista y asegurar que se cumplan las Tablas de Retención Documental (TRD) vigentes.",
          categoria: "Supervisión Contractual", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cuál es su deber prioritario como supervisor ante el incumplimiento del cronograma por parte del contratista?",
              opciones: [
                { letra: "A", texto: "Exigir un plan de choque inmediato con refuerzo de personal y dejar constancia del incumplimiento para posibles multas.", esCorrecta: true },
                { letra: "B", texto: "Hacer usted mismo el trabajo del contratista los fines de semana para que la DIAN no tenga problemas con la Contraloría.", esCorrecta: false },
                { letra: "C", texto: "Pedirle al contratista que le regale una cena elegante a cambio de que usted no reporte el retraso en el informe oficial.", esCorrecta: false }
              ],
              explicacion: "La opción A es la labor legal de supervisión para proteger los intereses de la entidad. La B es una extralimitación y la C es un acto de corrupción."
            },
            {
              texto: "En cuanto a la aplicación de las TRD, ¿qué debe verificar técnicamente en el trabajo entregado?",
              opciones: [
                { letra: "A", texto: "Que la clasificación de las series y subseries documentales corresponda fielmente a las funciones de la oficina productora.", esCorrecta: true },
                { letra: "B", texto: "Que todas las carpetas tengan el mismo olor a papel nuevo, sin importar si el contenido está bien organizado o no.", esCorrecta: false },
                { letra: "C", texto: "Que los expedientes estén organizados por el color del lapicero con el que fueron firmados los documentos originales.", esCorrecta: false }
              ],
              explicacion: "La opción A es el fundamento técnico de la organización archivística. Las otras opciones son criterios irrelevantes."
            },
            {
              texto: "¿Qué principio de la función pública se vulnera si no se realiza un control estricto a los archivos de la DIAN?",
              opciones: [
                { letra: "A", texto: "El principio de Transparencia y el de Responsabilidad en la custodia de la información estatal y tributaria.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'Dejar pasar, dejar hacer', permitiendo que cada funcionario haga con los documentos lo que quiera.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Esconder la Verdad', para que nadie pueda investigar cómo se manejan los impuestos en el país.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la gestión documental con los fines esenciales del Estado. Las otras opciones son posturas negligentes o deshonestas."
            }
          ]
        }
      ]
    },
    {
      simoId: "229297", // SENA - Profesional (Bienestar/Seguridad Social)
      escenarios: [
        {
          contenido: "Usted es Profesional en un Centro de Formación del SENA, encargado de administrar el Plan Institucional de Bienestar. Debe diseñar una jornada de salud mental y prevención del riesgo psicosocial para los instructores y administrativos, considerando el aumento de casos de estrés laboral. Usted debe coordinar con la ARL la realización de tamizajes, seleccionar las actividades pedagógicas y asegurar que la jornada no afecte la prestación del servicio educativo, midiendo al final el impacto en el clima organizacional del centro.",
          categoria: "Bienestar Laboral", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cuál es el objetivo técnico de involucrar a la ARL en la jornada de bienestar?",
              opciones: [
                { letra: "A", texto: "Cumplir con el Sistema de Gestión de Seguridad y Salud en el Trabajo (SG-SST) y enfocar las actividades en la prevención de enfermedades laborales.", esCorrecta: true },
                { letra: "B", texto: "Que la ARL pague los refrigerios de la jornada para que el SENA se ahorre ese dinero del presupuesto de bienestar.", esCorrecta: false },
                { letra: "C", texto: "Tener a alguien a quien culpar si algún instructor se pone más estresado después de participar en la jornada de salud mental.", esCorrecta: false }
              ],
              explicacion: "La opción A es el fundamento legal y técnico de la salud ocupacional en Colombia. Las otras opciones son enfoques financieros o de evasión de responsabilidad."
            },
            {
              texto: "Al medir el 'Clima Organizacional' tras la jornada, ¿qué indicador es más relevante?",
              opciones: [
                { letra: "A", texto: "La mejora en la percepción de apoyo institucional y el aumento en el sentido de pertenencia de los servidores públicos.", esCorrecta: true },
                { letra: "B", texto: "El número de personas que se rieron durante las charlas de los psicólogos de la ARL.", esCorrecta: false },
                { letra: "C", texto: "La cantidad de fotos bonitas que se publicaron en la página web del SENA sobre el evento de bienestar.", esCorrecta: false }
              ],
              explicacion: "La opción A evalúa el impacto real en la cultura y bienestar laboral. La B y la C son métricas superficiales."
            },
            {
              texto: "En cuanto a los estímulos e incentivos, ¿qué criterio debe primar para premiar a los mejores funcionarios del centro?",
              opciones: [
                { letra: "A", texto: "El mérito demostrado a través de la evaluación del desempeño y el cumplimiento de metas institucionales excepcionales.", esCorrecta: true },
                { letra: "B", texto: "Que el funcionario sea el más simpático del grupo y que siempre traiga dulces para compartir en la oficina.", esCorrecta: false },
                { letra: "C", texto: "Hacer un sorteo al azar para que nadie se ponga bravo si no gana un premio por su trabajo este año.", esCorrecta: false }
              ],
              explicacion: "La opción A cumple con los principios de la carrera administrativa y el mérito en el sector público. Las otras opciones son criterios subjetivos o arbitrarios."
            }
          ]
        },
        {
          contenido: "Como Profesional del SENA, debe gestionar los trámites de bonos pensionales y cuotas partes de exfuncionarios del Centro de Formación ante la Dirección General. Identifica que hay varios expedientes con vacíos de información en la historia laboral de los años 80. Usted debe realizar la búsqueda en los archivos históricos, contactar a las entidades anteriores y proyectar la certificación electrónica de tiempos de servicio (CETIL) para asegurar que el exfuncionario pueda acceder a su derecho pensional sin dilaciones.",
          categoria: "Gestión Pensional", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Qué herramienta tecnológica oficial debe usar para certificar los tiempos de servicio en el sector público?",
              opciones: [
                { letra: "A", texto: "El aplicativo CETIL (Certificación Electrónica de Tiempos de Servicio), siguiendo los lineamientos del Ministerio de Hacienda.", esCorrecta: true },
                { letra: "B", texto: "Escribir un correo electrónico desde su cuenta personal diciendo que el señor trabajó muchos años en el SENA y ya se puede jubilar.", esCorrecta: false },
                { letra: "C", texto: "Una hoja de Excel con el logo del SENA pegado en una esquina para que parezca una certificación oficial del Estado.", esCorrecta: false }
              ],
              explicacion: "La opción A es el sistema obligatorio para la transparencia y seguridad en trámites pensionales. Las otras opciones carecen de validez legal."
            },
            {
              texto: "Ante la falta de soportes físicos de los años 80, ¿cuál es el procedimiento técnico de reconstrucción de historia laboral?",
              opciones: [
                { letra: "A", texto: "Consultar las planillas de nómina de la época, los libros de registros de personal y cruzar con la información de la base de datos de la seguridad social.", esCorrecta: true },
                { letra: "B", texto: "Pedirle al exfuncionario que él mismo se invente las fechas en las que trabajó y que jure que está diciendo la verdad.", esCorrecta: false },
                { letra: "C", texto: "Decirle que como no hay papeles, el SENA no le va a reconocer nada y que mejor se busque otro trabajo a sus 65 años.", esCorrecta: false }
              ],
              explicacion: "La opción A es el método técnico y ético de recuperación de memoria institucional laboral. La B es una falta de control y la C vulnera derechos fundamentales."
            },
            {
              texto: "¿Qué principio de la función pública se destaca al agilizar este trámite pensional?",
              opciones: [
                { letra: "A", texto: "El principio de Eficacia y el de Dignidad Humana, al garantizar el acceso oportuno a la seguridad social del adulto mayor.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'Espera Eterna', obligando al ciudadano a rogar por sus derechos hasta que se canse de pedir información.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Papelismo', exigiendo documentos que la misma entidad ya debería tener en sus archivos oficiales.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la gestión administrativa con los fines sociales del Estado. Las otras opciones son prácticas burocráticas negativas."
            }
          ]
        }
      ]
    },
    {
      simoId: "240726", // NORTE DE SANTANDER - Prof. Especializado (Programas/Mejora)
      escenarios: [
        {
          contenido: "Usted es Profesional Especializado en la Gobernación de Norte de Santander. Debe liderar un equipo de trabajo para rediseñar el proceso de 'Atención a Víctimas del Conflicto' en la Secretaría de Gobierno, que actualmente presenta cuellos de botella y quejas por mal trato. Usted debe aplicar metodologías de mejora de procesos (Lean, Design Thinking), involucrar a los usuarios finales en el codiseño y asegurar que los nuevos procedimientos cumplan con la Ley 1448 de 2011 y los estándares de integridad del Estado.",
          categoria: "Mejora de Procesos", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cuál es el primer paso técnico para rediseñar un proceso administrativo ineficiente?",
              opciones: [
                { letra: "A", texto: "El levantamiento y diagnóstico del mapa de proceso actual (AS-IS), identificando los puntos de falla y las actividades que no agregan valor.", esCorrecta: true },
                { letra: "B", texto: "Comprar muebles más caros para la oficina de víctimas para ver si eso hace que los funcionarios trabajen más rápido.", esCorrecta: false },
                { letra: "C", texto: "Despedir a todos los funcionarios de la oficina sin investigar antes quiénes son los que están fallando en su trabajo.", esCorrecta: false }
              ],
              explicacion: "La opción A es la metodología estándar de gestión por procesos (MIPG). Las otras opciones son gastos innecesarios o arbitrariedades administrativas."
            },
            {
              texto: "Al involucrar a las víctimas en el codiseño del proceso, ¿qué valor busca garantizar?",
              opciones: [
                { letra: "A", texto: "La Empatía y la Humanización del servicio, asegurando que el trámite sea digno y responda a las necesidades reales de la población vulnerable.", esCorrecta: true },
                { letra: "B", texto: "Que las víctimas hagan el trabajo de los funcionarios para que la Gobernación se ahorre dinero en salarios de secretarias.", esCorrecta: false },
                { letra: "C", texto: "Que las víctimas le den las gracias al Gobernador personalmente en un video para publicarlo en TikTok.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la mejora con los principios de reparación integral. Las otras opciones son explotaciones o usos políticos de la población vulnerable."
            },
            {
              texto: "¿Qué herramienta técnica de control recomienda para medir el éxito del nuevo proceso?",
              opciones: [
                { letra: "A", texto: "La definición de indicadores de resultado (impacto) y de producto (tiempos de respuesta), junto con encuestas de satisfacción post-trámite.", esCorrecta: true },
                { letra: "B", texto: "Contar cuántas veces sonríen los funcionarios al día y asumir que si sonríen mucho es porque el proceso es perfecto.", esCorrecta: false },
                { letra: "C", texto: "No medir nada, para que si el proceso sigue fallando, nadie pueda demostrarlo con cifras reales ante la opinión pública.", esCorrecta: false }
              ],
              explicacion: "La opción A es el enfoque de gestión pública orientada a resultados. Las otras opciones carecen de rigor técnico."
            }
          ]
        },
        {
          contenido: "Como Profesional Especializado de la Gobernación, debe proyectar un concepto técnico-jurídico sobre la viabilidad de un convenio de asociación con una ONG para la entrega de kits escolares en el Catatumbo. Existe el riesgo de que la ONG no tenga la capacidad logística para llegar a zonas de difícil acceso y que el convenio sea usado para proselitismo político. Usted debe verificar los requisitos de idoneidad del contratista (Decreto 092 de 2017), establecer las cláusulas de supervisión estricta y asegurar que la entrega se realice bajo criterios de transparencia total.",
          categoria: "Gestión Contractual Social", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cuál es el requisito de idoneidad principal para contratar con una Entidad Sin Ánimo de Lucro (ESAL) según la norma?",
              opciones: [
                { letra: "A", texto: "Que la ESAL demuestre experiencia específica, capacidad financiera y técnica directamente relacionada con el objeto a contratar.", esCorrecta: true },
                { letra: "B", texto: "Que el director de la ONG sea una persona muy piadosa que vaya a misa todos los domingos y ayude a los pobres.", esCorrecta: false },
                { letra: "C", texto: "Que la ONG tenga un nombre que suene muy bonito y que use colores que combinen con la bandera de Norte de Santander.", esCorrecta: false }
              ],
              explicacion: "La opción A es el mandato técnico del régimen de contratación con ESALs (Decreto 092). Las otras opciones son criterios irrelevantes o subjetivos."
            },
            {
              texto: "Para evitar el proselitismo político en la entrega de los kits, ¿qué restricción debe incluir en el convenio?",
              opciones: [
                { letra: "A", texto: "La prohibición expresa de usar logos, nombres o imágenes de políticos en el material y asegurar que el acto sea institucional y neutro.", esCorrecta: true },
                { letra: "B", texto: "Obligar a los niños a que canten canciones alabando al Alcalde antes de recibir sus cuadernos y lápices.", esCorrecta: false },
                { letra: "C", texto: "Entregar los kits solo a las familias que presenten el carné de afiliación a un partido político determinado.", esCorrecta: false }
              ],
              explicacion: "La opción A protege la transparencia y evita el uso indebido de recursos públicos para fines electorales. Las otras opciones son violaciones a la ley."
            },
            {
              texto: "¿Qué principio de la administración se protege al proyectar un concepto técnico riguroso sobre este convenio?",
              opciones: [
                { letra: "A", texto: "El principio de Moralidad Administrativa y la protección del patrimonio público frente a riesgos de ineficiencia o corrupción.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'Todo Vale', con tal de entregar los kits rápido sin importar quién se robe una parte del presupuesto.", esCorrecta: false },
                { letra: "C", texto: "El principio de Silencio, para que nadie pregunte cómo se eligió a esa ONG para repartir los útiles escolares en el campo.", esCorrecta: false }
              ],
              explicacion: "La opción A define la responsabilidad ética del servidor público en la etapa precontractual. Las otras opciones son contrarias a la integridad estatal."
            }
          ]
        }
      ]
    },
    {
      simoId: "240416", // GIRARDOT - Comisario de Familia (Derecho/Infancia)
      escenarios: [
        {
          contenido: "Usted es el Comisario de Familia de Girardot. Recibe una denuncia ciudadana sobre un niño de 7 años que permanece encerrado solo en su casa durante todo el día, sin alimentación adecuada y con signos de descuido físico. La madre trabaja en otra ciudad y regresa solo los fines de semana. Usted debe liderar el equipo interdisciplinario (psicólogo, trabajador social), realizar la visita de verificación de derechos y determinar si procede el rescate administrativo y la ubicación en medio institucional o familiar de emergencia.",
          categoria: "Restablecimiento de Derechos", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cuál es la primera acción legal que debe realizar el Comisario al llegar a la vivienda y confirmar el riesgo del menor?",
              opciones: [
                { letra: "A", texto: "Realizar la verificación de garantía de derechos y emitir el auto de apertura del proceso administrativo de restablecimiento de derechos (PARD).", esCorrecta: true },
                { letra: "B", texto: "Romper la puerta a patadas sin ningún soporte escrito y llevarse al niño a su propia casa para cuidarlo él mismo.", esCorrecta: false },
                { letra: "C", texto: "Dejar una nota por debajo de la puerta pidiéndole a la mamá que cuando regrese por favor le dé de comer al niño.", esCorrecta: false }
              ],
              explicacion: "La opción A sigue el debido proceso legal establecido en el Código de Infancia y Adolescencia (Ley 1098). La B es una vía de hecho ilegal y la C es una omisión del deber de protección."
            },
            {
              texto: "En cuanto al equipo interdisciplinario, ¿cuál es su función técnica en este escenario?",
              opciones: [
                { letra: "A", texto: "Realizar la valoración psicológica y social del niño y su entorno para brindar los insumos técnicos que soporten la decisión del Comisario.", esCorrecta: true },
                { letra: "B", texto: "Hacer de testigos para que si los vecinos pelean, ellos puedan decir quién empezó la discusión en la calle.", esCorrecta: false },
                { letra: "C", texto: "Cargar las maletas del Comisario y traerle café mientras él habla con la policía sobre el rescate del menor.", esCorrecta: false }
              ],
              explicacion: "La opción A define el rol profesional del equipo de apoyo en la Comisaría de Familia. Las otras opciones son degradantes o irrelevantes."
            },
            {
              texto: "¿Qué principio constitucional prima en todas las decisiones que tome el Comisario de Familia sobre este menor?",
              opciones: [
                { letra: "A", texto: "El Interés Superior del Niño, que obliga a que sus derechos prevalezcan sobre los derechos de los demás.", esCorrecta: true },
                { letra: "B", texto: "El principio de Economía, tratando de gastar lo menos posible en la alimentación y cuidado del niño rescatado.", esCorrecta: false },
                { letra: "C", texto: "El principio de Jerarquía, donde lo que diga el Comisario es ley absoluta y nadie puede cuestionar sus decisiones.", esCorrecta: false }
              ],
              explicacion: "La opción A es el mandato constitucional (Art. 44) y legal para la protección de la infancia. Las otras opciones son erróneas o autoritarias."
            }
          ]
        },
        {
          contenido: "Como Comisario de Familia en Girardot, atiende un caso de violencia intrafamiliar donde una mujer solicita medidas de protección contra su esposo, quien la amenaza de muerte constantemente. El agresor es un funcionario influyente del municipio. Usted debe dictar las medidas de protección inmediatas (desalojo del agresor, prohibición de acercamiento), coordinar con la Policía Nacional su cumplimiento efectivo y asegurar que la víctima reciba atención integral de salud y refugio si es necesario, sin dejarse presionar por el cargo del agresor.",
          categoria: "Violencia Intrafamiliar", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cuál es el término legal para dictar las medidas de protección provisionales una vez recibida la solicitud?",
              opciones: [
                { letra: "A", texto: "De forma inmediata o dentro de las cuatro (4) horas siguientes al conocimiento de los hechos, dada la gravedad de la amenaza.", esCorrecta: true },
                { letra: "B", texto: "Esperar a que pase el fin de semana para ver si la pareja se reconcilia y así ahorrarse el papeleo administrativo.", esCorrecta: false },
                { letra: "C", texto: "Llamar primero al jefe del agresor para pedirle permiso de dictar la medida de protección contra su empleado.", esCorrecta: false }
              ],
              explicacion: "La opción A refleja la urgencia vital en casos de violencia de género (Ley 1257 de 2008). Las otras opciones son negligencias peligrosas o faltas a la imparcialidad."
            },
            {
              texto: "Ante las amenazas de muerte, ¿qué medida de protección es la más idónea para garantizar la vida de la mujer?",
              opciones: [
                { letra: "A", texto: "Ordenar el desalojo inmediato del agresor de la vivienda compartida y la prohibición de comunicación y acercamiento a la víctima.", esCorrecta: true },
                { letra: "B", texto: "Sugerirle a la mujer que use un chaleco antibalas cada vez que vaya a hablar con su esposo para evitar tragedias.", esCorrecta: false },
                { letra: "C", texto: "Pedirles que hagan un taller de manualidades juntos para que el amor vuelva a florecer y se olviden de las amenazas.", esCorrecta: false }
              ],
              explicacion: "La opción A es la medida legal de protección efectiva. Las otras opciones son ridículas e irresponsables frente a un riesgo de feminicidio."
            },
            {
              texto: "En el marco de la Integridad Pública, ¿cómo actúa el Comisario frente a la influencia política del agresor?",
              opciones: [
                { letra: "A", texto: "Con imparcialidad y firmeza, aplicando la ley con igual rigor sin importar el cargo, rango o conexiones del presunto agresor.", esCorrecta: true },
                { letra: "B", texto: "Dictar una medida de protección muy suave para no quedar mal con los políticos que mandan en el municipio de Girardot.", esCorrecta: false },
                { letra: "C", texto: "Renunciar al caso y decir que tiene una enfermedad repentina para que sea otro el que tenga que pelear con el funcionario influyente.", esCorrecta: false }
              ],
              explicacion: "La opción A es el deber ser del servidor público bajo el Código de Integridad. Las otras opciones son actos de cobardía o corrupción administrativa."
            }
          ]
        }
      ]
    },
    {
      simoId: "230551", // INDERBU Bucaramanga - Técnico Operativo (Deporte)
      escenarios: [
        {
          contenido: "Usted es Técnico Operativo en el INDERBU Bucaramanga. Debe apoyar la supervisión de un contrato para la construcción de un nuevo parque biosaludable en el barrio Mutis. Al realizar la visita técnica, nota que el contratista está instalando máquinas de ejercicio que no corresponden a las especificaciones técnicas (materiales de menor resistencia al óxido) y que el terreno no ha sido nivelado correctamente. Usted debe reportar estas novedades al supervisor jurídico, exigir los certificados de calidad de los materiales y documentar con fotos las fallas detectadas.",
          categoria: "Supervisión de Infraestructura Deportiva", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cuál es su responsabilidad técnica al detectar materiales de menor calidad en la obra?",
              opciones: [
                { letra: "A", texto: "Dejar constancia en la bitácora de obra, informar al supervisor del contrato y recomendar la suspensión de la instalación hasta que se cumpla lo pactado.", esCorrecta: true },
                { letra: "B", texto: "Decirle al contratista que pinte las máquinas de otro color para que nadie se dé cuenta de que el metal es de mala calidad.", esCorrecta: false },
                { letra: "C", texto: "Recibir la obra así, asumiendo que los ciudadanos de Bucaramanga no saben de materiales y no se van a quejar por el óxido.", esCorrecta: false }
              ],
              explicacion: "La opción A es la labor técnica de control para garantizar la durabilidad de los bienes públicos. Las otras opciones son actos de negligencia o complicidad con el contratista."
            },
            {
              texto: "Para validar la nivelación del terreno, ¿qué debe exigirle al equipo de ingeniería del contratista?",
              opciones: [
                { letra: "A", texto: "Los planos topográficos actualizados, los ensayos de compactación de suelos y las pruebas de drenaje de aguas lluvias.", esCorrecta: true },
                { letra: "B", texto: "Que traigan un nivel de mano de los que usan los maestros de obra y que juren por su honor que el piso está derechito.", esCorrecta: false },
                { letra: "C", texto: "Poner una pelota de fútbol en el suelo y si la pelota no se mueve sola, asumir que el terreno está perfectamente nivelado.", esCorrecta: false }
              ],
              explicacion: "La opción A utiliza soportes técnicos de ingeniería. Las otras opciones son empíricas y no garantizan la estabilidad de la infraestructura."
            },
            {
              texto: "¿Qué principio de la contratación estatal se protege al exigir el cumplimiento exacto de las fichas técnicas?",
              opciones: [
                { letra: "A", texto: "El principio de Transparencia y la Responsabilidad de asegurar que el dinero público se invierta en bienes que cumplan su fin social.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'Comprar lo más barato', sin importar si las máquinas se rompen al primer mes de uso por los deportistas.", esCorrecta: false },
                { letra: "C", texto: "El principio de Amistad, ayudando al contratista a que gane más dinero entregando materiales mediocres a la ciudad.", esCorrecta: false }
              ],
              explicacion: "La opción A es el fin de la supervisión estatal. Las otras opciones son contrarias a la ética y a la ley de contratación."
            }
          ]
        },
        {
          contenido: "Como Técnico en el INDERBU, debe organizar la logística para la inauguración de las 'Olimpiadas Comunales de Bucaramanga'. Se espera la participación de 2.000 deportistas aficionados. Usted debe coordinar el préstamo de los escenarios deportivos, asegurar que existan servicios de hidratación y primeros auxilios disponibles, y gestionar el archivo de los consentimientos informados y seguros de vida de todos los participantes para prevenir responsabilidades legales del instituto ante posibles accidentes.",
          categoria: "Logística y Gestión de Riesgos", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Por qué es un requisito administrativo crítico contar con los consentimientos informados de los deportistas?",
              opciones: [
                { letra: "A", texto: "Para garantizar que el participante conoce los riesgos de la actividad física y liberar al INDERBU de responsabilidad por negligencia del deportista.", esCorrecta: true },
                { letra: "B", texto: "Para tener una colección de firmas de la gente de Bucaramanga y guardarlas en un álbum de recuerdos del Instituto.", esCorrecta: false },
                { letra: "C", texto: "Para poder vender los datos personales de los deportistas a empresas que venden ropa de gimnasio y tenis de marca.", esCorrecta: false }
              ],
              explicacion: "La opción A es una medida de prevención jurídica básica en eventos deportivos. Las otras opciones son absurdas o violan la ley de protección de datos."
            },
            {
              texto: "En cuanto a los primeros auxilios, ¿cuál es el estándar mínimo exigible para un evento de 2.000 personas?",
              opciones: [
                { letra: "A", texto: "Contar con un Plan de Contingencia aprobado, ambulancias medicalizadas en sitio y personal paramédico certificado y equipado.", esCorrecta: true },
                { letra: "B", texto: "Tener una caja de curitas y un frasco de alcohol en la puerta del estadio por si alguien se raspa una rodilla jugando.", esCorrecta: false },
                { letra: "C", texto: "Decirle a los deportistas que si se lesionan, se vayan caminando hasta el hospital más cercano porque el INDERBU no tiene médicos.", esCorrecta: false }
              ],
              explicacion: "La opción A cumple con las normas nacionales de gestión de riesgo en eventos masivos. Las otras opciones son irresponsabilidades que pueden causar tragedias."
            },
            {
              texto: "¿Qué documento debe archivar como soporte de que los escenarios deportivos fueron entregados en buen estado tras las olimpiadas?",
              opciones: [
                { letra: "A", texto: "Actas de Entrega y Devolución firmadas por los administradores de cada escenario, con registro fotográfico del estado final de las canchas.", esCorrecta: true },
                { letra: "B", texto: "Un audio de WhatsApp del vigilante del parque diciendo: 'todo quedó bien, un poco de basura pero nada roto'.", esCorrecta: false },
                { letra: "C", texto: "Ninguno, se asume que si los deportistas son buenas personas, no van a dañar nada de lo que les prestó el Instituto.", esCorrecta: false }
              ],
              explicacion: "La opción A es el soporte documental necesario para el control de inventarios y bienes públicos. Las otras opciones son informales e insuficientes."
            }
          ]
        }
      ]
    },
    {
      simoId: "231573", // IBAGUÉ - Agentes de Tránsito (Control/Movilidad)
      escenarios: [
        {
          contenido: "Usted es Agente de Tránsito en la ciudad de Ibagué. Durante un control rutinario de embriaguez un sábado por la noche, detiene a un conductor que presenta signos evidentes de alcoholemia (habla traposa, aliento alcohólico). El conductor se niega a realizar la prueba de alcoholemia, afirmando que es un alto funcionario de la Alcaldía de Ibagué y que usted tendrá problemas si procede con el comparendo. Usted debe aplicar el protocolo legal, realizar el informe de la negativa y asegurar la inmovilización del vehículo cumpliendo con el debido proceso.",
          categoria: "Control de Tránsito", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cuál es la consecuencia legal de que un conductor se niegue a realizar la prueba de alcoholemia según el Código Nacional de Tránsito?",
              opciones: [
                { letra: "A", texto: "Se presume el grado más alto de embriaguez, lo que conlleva a la máxima multa, suspensión de licencia por 10 años e inmovilización.", esCorrecta: true },
                { letra: "B", texto: "No pasa nada, el ciudadano tiene derecho a negarse y el Agente de Tránsito debe pedirle disculpas y dejarlo seguir manejando.", esCorrecta: false },
                { letra: "C", texto: "El Agente de Tránsito debe obligar al conductor a beber dos litros de agua para que se le pase el efecto del alcohol rápido.", esCorrecta: false }
              ],
              explicacion: "La opción A es el mandato del Art. 150 del CNT. La negativa se sanciona con la máxima penalidad para prevenir riesgos viales. Las otras opciones son ilegales o absurdas."
            },
            {
              texto: "Ante las amenazas del conductor por su cargo en la Alcaldía, ¿cómo actúa usted éticamente?",
              opciones: [
                { letra: "A", texto: "Mantener la imparcialidad, realizar el procedimiento completo sin distinción de la persona y grabar la actuación para su propia seguridad jurídica.", esCorrecta: true },
                { letra: "B", texto: "Dejar ir al conductor sin hacerle la prueba para evitarse problemas con sus jefes directos en la Alcaldía de Ibagué.", esCorrecta: false },
                { letra: "C", texto: "Pedirle al conductor que le firme una nota donde prometa que no va a chocar contra nadie de camino a su casa.", esCorrecta: false }
              ],
              explicacion: "La opción A aplica el principio de igualdad ante la ley y la integridad del servidor público. Las otras opciones son actos de cobardía administrativa o negligencia."
            },
            {
              texto: "¿Qué documento debe diligenciar para legalizar la inmovilización del vehículo en este caso?",
              opciones: [
                { letra: "A", texto: "El Inventario de Vehículo Inmovilizado y la Orden de Comparendo con la observación de la negativa a la prueba.", esCorrecta: true },
                { letra: "B", texto: "Un mapa dibujado a mano indicando dónde se dejó parqueado el carro del funcionario para que él lo recoja mañana.", esCorrecta: false },
                { letra: "C", texto: "No llenar nada, simplemente llevarse el carro y esperar a que el dueño llame a preguntar por él al día siguiente.", esCorrecta: false }
              ],
              explicacion: "La opción A es el soporte legal de la medida cautelar de inmovilización. Las otras opciones vulneran el debido proceso y la trazabilidad del bien."
            }
          ]
        },
        {
          contenido: "Como Agente de Tránsito en Ibagué, es el primero en llegar a un accidente de tránsito con heridos en la Avenida Mirolindo. Debe asegurar el área para evitar nuevos accidentes, brindar la orientación inicial a los involucrados, solicitar el apoyo médico y realizar el Informe Policial de Accidentes de Tránsito (IPAT) recolectando las evidencias (huellas de frenado, posición de los vehículos, testimonios) para que la autoridad competente determine la responsabilidad.",
          categoria: "Gestión de Accidentes", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cuál es su primera prioridad técnica al llegar a la escena de un accidente con heridos?",
              opciones: [
                { letra: "A", texto: "Asegurar la zona con conos o señalización reflectiva para proteger la vida de los heridos y de los demás conductores en la vía.", esCorrecta: true },
                { letra: "B", texto: "Sacar su celular y empezar a transmitir en vivo por Facebook para que la ciudad sepa que hubo un accidente grave.", esCorrecta: false },
                { letra: "C", texto: "Empezar a gritarles a los conductores para que se quiten de la mitad de la calle sin importar si están heridos o no.", esCorrecta: false }
              ],
              explicacion: "La opción A es el protocolo de seguridad vial y preservación de la vida. La B y la C son acciones no profesionales e irresponsables."
            },
            {
              texto: "Al diligenciar el IPAT, ¿qué información es vital para la reconstrucción técnica del accidente?",
              opciones: [
                { letra: "A", texto: "Las medidas exactas de la posición de los vehículos respecto a puntos fijos, las señales de tránsito presentes y el estado de la vía.", esCorrecta: true },
                { letra: "B", texto: "La marca de la ropa que llevan puesta los conductores para saber si son personas con dinero para pagar los daños.", esCorrecta: false },
                { letra: "C", texto: "Qué música estaban escuchando en la radio de los carros al momento del choque para saber si eso influyó en su ánimo.", esCorrecta: false }
              ],
              explicacion: "La opción A proporciona los datos técnicos objetivos para el análisis de responsabilidad. Las otras opciones son datos irrelevantes para el proceso de tránsito."
            },
            {
              texto: "¿Qué valor institucional del Agente de Tránsito se pone a prueba en medio del caos de un accidente?",
              opciones: [
                { letra: "A", texto: "La Templanza y la Vocación de Servicio, manteniendo el control de la situación y brindando ayuda eficiente a los afectados.", esCorrecta: true },
                { letra: "B", texto: "La Arrogancia, demostrando a todo el mundo que usted es la autoridad y que nadie puede hablarle sin su permiso.", esCorrecta: false },
                { letra: "C", texto: "El Miedo, saliendo corriendo de la escena del accidente para no tener que ver sangre ni gente sufriendo.", esCorrecta: false }
              ],
              explicacion: "La opción A es la conducta esperada de un profesional de la movilidad y la seguridad. Las otras opciones son debilidades de carácter incompatibles con el cargo."
            }
          ]
        }
      ]
    },
    {
      simoId: "240850", // TRÁNSITO META - Ayudante (Archivo/Licencias)
      escenarios: [
        {
          contenido: "Usted es Ayudante en el Instituto Departamental de Tránsito del Meta. Debe realizar el registro de una serie de licencias de tránsito de vehículos nuevos (matrículas iniciales) en el sistema nacional RUNT. Nota que varios formularios tienen improntas de motor y chasis que parecen haber sido alteradas o no coinciden con la ficha técnica del vehículo. Usted debe suspender el trámite, informar a su jefe inmediato y asegurar que los documentos físicos se mantengan en custodia para una posible investigación judicial por falsedad marcaria.",
          categoria: "Registro Vehicular", dificultad: "BASICO",
          preguntas: [
            {
              texto: "¿Qué acción debe tomar ante la sospecha de alteración de improntas en un trámite de matrícula?",
              opciones: [
                { letra: "A", texto: "Suspender el trámite de inmediato y reportar la posible irregularidad ante la oficina jurídica o la autoridad de policía judicial (SIJIN).", esCorrecta: true },
                { letra: "B", texto: "Limpiar las improntas con un trapo húmedo para ver si se ven mejor y proceder con el registro en el RUNT para no retrasar el trabajo.", esCorrecta: false },
                { letra: "C", texto: "Aconsejarle al ciudadano que vaya a otro municipio donde los ayudantes de tránsito sean menos estrictos con la revisión de improntas.", esCorrecta: false }
              ],
              explicacion: "La opción A es el deber legal de denunciar posibles delitos y proteger la fe pública. Las otras opciones son negligencias o complicidades delictivas."
            },
            {
              texto: "En cuanto al manejo del archivo de matrículas iniciales, ¿cómo debe proceder con los soportes físicos?",
              opciones: [
                { letra: "A", texto: "Organizarlos cronológicamente en el historial del vehículo, foliarlos y asegurar que las improntas estén debidamente protegidas con cinta adhesiva transparente.", esCorrecta: true },
                { letra: "B", texto: "Pegarlos en la pared de la oficina para que todos los que entren vean cómo se hace el trámite de una matrícula de carro nuevo.", esCorrecta: false },
                { letra: "C", texto: "Botar los documentos a la basura una vez que el dato ya esté cargado en el computador porque el papel ya no sirve para nada.", esCorrecta: false }
              ],
              explicacion: "La opción A garantiza la integridad del historial vehicular y la preservación de la prueba. Las otras opciones son usos indebidos o destrucción de archivo público."
            },
            {
              texto: "¿Qué principio de la administración pública se aplica al realizar un registro veraz en el RUNT?",
              opciones: [
                { letra: "A", texto: "El principio de Transparencia y el de Seguridad Jurídica, asegurando que la información de los vehículos del departamento sea confiable.", esCorrecta: true },
                { letra: "B", texto: "El principio de Velocidad, registrando cualquier cosa rápida para que el Instituto del Meta parezca el más eficiente de Colombia.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Favoritismo', ayudando más rápido a los amigos del Director aunque sus papeles estén incompletos.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la labor asistencial con los fines de control estatal. Las otras opciones son prácticas deficientes o corruptas."
            }
          ]
        },
        {
          contenido: "Como Ayudante del Instituto de Tránsito, debe atender a un ciudadano que solicita un duplicado de su licencia de conducción porque se le perdió. El sistema arroja que el ciudadano tiene una multa pendiente de pago desde hace 4 años. El ciudadano afirma que la multa ya prescribió y que usted debe 'borrarla' del sistema para dejarlo sacar su licencia. Usted debe explicarle los términos de prescripción, orientarlo sobre el trámite de solicitud de prescripción ante la autoridad de tránsito y negarle la expedición de la licencia hasta que el estado del ciudadano sea 'paz y salvo' en el sistema.",
          categoria: "Trámites de Licencias", dificultad: "BASICO",
          preguntas: [
            {
              texto: "¿Puede usted como Ayudante 'borrar' una multa del sistema solo porque el ciudadano se lo pide?",
              opciones: [
                { letra: "A", texto: "No, el levantamiento de multas por prescripción debe ser declarado mediante un acto administrativo motivado por la autoridad competente, no por el auxiliar de ventanilla.", esCorrecta: true },
                { letra: "B", texto: "Sí, si el ciudadano le trae un tinto y le cuenta una historia muy triste sobre por qué no ha podido pagar la multa en 4 años.", esCorrecta: false },
                { letra: "C", texto: "Sí, siempre y cuando el ciudadano prometa que no volverá a cometer ninguna infracción de tránsito en los próximos 10 años.", esCorrecta: false }
              ],
              explicacion: "La opción A respeta el debido proceso y la jerarquía administrativa. Borrar multas sin sustento legal es un delito de falsedad y fraude. Las otras opciones son actos de corrupción."
            },
            {
              texto: "Al orientar al ciudadano sobre la prescripción de la multa, ¿qué información técnica le brinda?",
              opciones: [
                { letra: "A", texto: "Que debe radicar una petición formal de prescripción, la cual será evaluada por el área jurídica según los términos de ley y la existencia de mandamientos de pago.", esCorrecta: true },
                { letra: "B", texto: "Decirle que se esconda de los agentes de tránsito durante otros dos años más para que la multa desaparezca sola por arte de magia.", esCorrecta: false },
                { letra: "C", texto: "Sugerirle que use una licencia de conducción falsa mientras se resuelve el problema de su deuda con el Instituto de Tránsito.", esCorrecta: false }
              ],
              explicacion: "La opción A es la orientación legal correcta. Las otras opciones son consejos ilegales o erróneos que perjudican al ciudadano."
            },
            {
              texto: "¿Qué valor del servidor público se destaca al negarse a realizar un acto ilegal a pesar de la insistencia del ciudadano?",
              opciones: [
                { letra: "A", texto: "La Honestidad y la Rectitud, actuando siempre bajo el marco de la ley y protegiendo los recursos y la fe pública.", esCorrecta: true },
                { letra: "B", texto: "La Terquedad, no queriendo ayudar a la gente solo por el placer de verlos sufrir con sus problemas de dinero.", esCorrecta: false },
                { letra: "C", texto: "La Timidez, teniendo miedo de apretar el botón de 'borrar' en el computador para que el jefe no lo regañe.", esCorrecta: false }
              ],
              explicacion: "La opción A es un pilar del Código de Integridad. Las otras opciones son interpretaciones negativas de una actuación legalmente correcta."
            }
          ]
        }
      ]
    },
    {
      simoId: "242581", // DIAN - Gestor IV (Aduanas/OEA)
      escenarios: [
        {
          contenido: "Usted es Gestor IV en la DIAN, encargado de evaluar solicitudes de empresas que desean obtener la calificación de Operador Económico Autorizado (OEA). Debe realizar la auditoría a la cadena de suministro de una gran exportadora de flores. Durante la visita, observa fallas en el control de acceso a las zonas de cargue y falta de trazabilidad en la contratación del personal de seguridad. Usted debe decidir si suspende el proceso de certificación, otorga un plazo para subsanar los riesgos o niega la solicitud basándose en el riesgo de contaminación de la carga por redes de narcotráfico.",
          categoria: "Operador Económico Autorizado (OEA)", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cuál es el objetivo primordial de la certificación OEA para la DIAN y el comercio exterior?",
              opciones: [
                { letra: "A", texto: "Garantizar la seguridad de la cadena de suministro internacional mediante la gestión de riesgos y facilitar el comercio para empresas confiables.", esCorrecta: true },
                { letra: "B", texto: "Cobrarles una cuota mensual extra a las empresas para que la DIAN tenga presupuesto para comprar más escáneres de contenedores.", esCorrecta: false },
                { letra: "C", texto: "Permitir que las empresas amigas del gobierno nacional puedan exportar mercancías sin que nadie les revise nunca las cajas.", esCorrecta: false }
              ],
              explicacion: "La opción A es la finalidad técnica y global del programa OEA (Marco SAFE de la OMA). Las otras opciones son visiones distorsionadas o corruptas del programa."
            },
            {
              texto: "Ante las fallas de seguridad detectadas en la zona de cargue, ¿cuál es su decisión técnica como Gestor IV?",
              opciones: [
                { letra: "A", texto: "Emitir un informe de no conformidad detallando los riesgos de seguridad y suspender el proceso hasta que la empresa implemente controles efectivos.", esCorrecta: true },
                { letra: "B", texto: "Aprobar la certificación de todas formas, confiando en que los narcotraficantes no se van a dar cuenta de que la puerta de la bodega queda abierta por las noches.", esCorrecta: false },
                { letra: "C", texto: "Sugerir a la empresa que contrate a un primo suyo que sabe mucho de seguridad para que él le arregle los problemas de la bodega rápido.", esCorrecta: false }
              ],
              explicacion: "La opción A garantiza la integridad del programa OEA y la seguridad nacional. La B es una negligencia gravísima y la C es un conflicto de intereses y posible corrupción."
            },
            {
              texto: "En cuanto a la valoración aduanera, ¿qué impacto tiene la calificación OEA para el importador/exportador?",
              opciones: [
                { letra: "A", texto: "Reducción en el número de inspecciones físicas y documentales, y agilidad en los trámites de desaduanamiento ante la DIAN.", esCorrecta: true },
                { letra: "B", texto: "Derecho a declarar los precios que ellos quieran sin que la DIAN pueda revisar nunca si el valor de la mercancía es real o no.", esCorrecta: false },
                { letra: "C", texto: "Que el Director de la DIAN los invite a almorzar una vez al año para agradecerles por ser tan buenas empresas para el país.", esCorrecta: false }
              ],
              explicacion: "La opción A identifica los beneficios reales de facilitación del comercio para operadores confiables. Las otras opciones son erróneas o irrelevantes."
            }
          ]
        },
        {
          contenido: "Como Gestor IV de la DIAN, debe resolver un recurso de apelación sobre una liquidación oficial de corrección de valor aduanero. Un importador de maquinaria industrial declaró un valor de transacción 50% inferior al precio de referencia internacional. La empresa alega que el bajo precio se debe a una liquidación por quiebra del proveedor en el extranjero. Usted debe analizar la prueba documental aportada (facturas, contratos, certificaciones consulares), aplicar los métodos de valoración de la OMC y determinar si la DIAN confirma el ajuste de valor y la respectiva sanción.",
          categoria: "Valoración Aduanera", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cuál es el primer método de valoración aduanera que debe intentar aplicar según el Acuerdo de la OMC?",
              opciones: [
                { letra: "A", texto: "El Valor de Transacción de las mercancías importadas, siempre que se cumplan los requisitos de vinculación y veracidad del precio.", esCorrecta: true },
                { letra: "B", texto: "El Método de la Moneda, donde se tira una moneda al aire y si sale cara se le cree al importador y si sale sello se le cobra el doble.", esCorrecta: false },
                { letra: "C", texto: "El Método del Ojo, donde el funcionario de la DIAN mira la máquina y decide cuánto cree él que debería costar según su apariencia.", esCorrecta: false }
              ],
              explicacion: "La opción A es el método principal y obligatorio del Acuerdo de Valoración de la OMC. Las otras opciones son métodos arbitrarios e ilegales."
            },
            {
              texto: "Si el importador alega una liquidación por quiebra para justificar el bajo precio, ¿qué debe verificar usted técnicamente?",
              opciones: [
                { letra: "A", texto: "La veracidad de la circunstancia de venta, asegurando que el precio no fue influido por una vinculación entre las partes y que es un precio real de mercado en esas condiciones.", esCorrecta: true },
                { letra: "B", texto: "Si el dueño de la empresa extranjera que quebró es una persona que le cae bien a usted para decidir si le acepta el precio bajo o no.", esCorrecta: false },
                { letra: "C", texto: "Pedirle al importador que le traiga una muestra de la maquinaria a su casa para probarla antes de decidir si el precio es justo.", esCorrecta: false }
              ],
              explicacion: "La opción A aplica los criterios técnicos de valoración aduanera sobre circunstancias de la venta. Las otras opciones son faltas a la ética o al rigor técnico."
            },
            {
              texto: "¿Qué consecuencia administrativa tiene para la empresa si se confirma la subvaloración intencional de la mercancía?",
              opciones: [
                { letra: "A", texto: "El reajuste de los tributos aduaneros, el cobro de intereses de mora y la imposición de sanciones por inexactitud en la declaración.", esCorrecta: true },
                { letra: "B", texto: "Que el importador tenga que escribir 1.000 veces en un cuaderno: 'No debo mentirle a la DIAN sobre el precio de mis máquinas'.", esCorrecta: false },
                { letra: "C", texto: "Ninguna, porque en Colombia el comercio exterior es libre y cada quien puede poner el precio que quiera en sus facturas.", esCorrecta: false }
              ],
              explicacion: "La opción A describe las medidas legales sancionatorias del Estatuto Aduanero. Las otras opciones son castigos infantiles o posturas contrarias a la ley."
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
