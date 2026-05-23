import { PrismaClient, TipoPregunta, NivelDificultad } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const dataToInsert: any[] = [
    {
      simoId: "240585", // PEREIRA - Técnico Adm. (IT/Sistemas)
      escenarios: [
        {
          contenido: "Usted es Técnico Administrativo en el área de sistemas de la Alcaldía de Pereira. Debe gestionar la base de datos de los contribuyentes del impuesto predial. Detecta que existe un acceso no autorizado desde una dirección IP externa que está intentando extraer información masiva de los propietarios. Usted debe activar el protocolo de seguridad informática, bloquear la IP agresora, realizar el respaldo de la información y documentar el incidente para la oficina de TI y los entes de control.",
          categoria: "Seguridad de la Información / TI", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cuál es la acción técnica inmediata ante la detección de un acceso no autorizado a la base de datos?",
              opciones: [
                { letra: "A", texto: "Bloquear el acceso de la IP identificada en el firewall, suspender temporalmente las conexiones externas y realizar un cambio preventivo de credenciales de administración.", esCorrecta: true },
                { letra: "B", texto: "Mandar un correo electrónico al 'hacker' pidiéndole amablemente que por favor deje de robarse los datos de la Alcaldía.", esCorrecta: false },
                { letra: "C", texto: "Apagar todos los computadores de la Alcaldía y decirle a los ciudadanos que no hay sistema por tiempo indefinido.", esCorrecta: false }
              ],
              explicacion: "La opción A es el protocolo técnico de respuesta a incidentes de seguridad. Las otras opciones son ineficaces o respuestas exageradas e improductivas."
            },
            {
              texto: "En cuanto a la protección de datos personales, ¿qué ley está salvaguardando con su actuación?",
              opciones: [
                { letra: "A", texto: "La Ley 1581 de 2012 (Ley de Protección de Datos Personales) y el marco de seguridad de la información institucional.", esCorrecta: true },
                { letra: "B", texto: "La Ley del Embudo, tratando de que los datos solo se queden dentro de la oficina de sistemas de la Alcaldía.", esCorrecta: false },
                { letra: "C", texto: "La Ley de Murphy, asumiendo que si algo malo puede pasar con los datos, seguramente pasará de todas formas.", esCorrecta: false }
              ],
              explicacion: "La opción A identifica el marco legal obligatorio para el manejo de información de ciudadanos. Las otras opciones son erróneas."
            },
            {
              texto: "¿Qué valor del servidor público se destaca al proteger la confidencialidad de la información de los pereiranos?",
              opciones: [
                { letra: "A", texto: "La Responsabilidad y la Integridad, asegurando que la información sensible de los contribuyentes esté protegida contra usos indebidos.", esCorrecta: true },
                { letra: "B", texto: "La Curiosidad, revisando personalmente los datos de los vecinos para ver cuánto deben de impuesto predial.", esCorrecta: false },
                { letra: "C", texto: "La Indiferencia, dejando que el firewall trabaje solo sin revisar nunca los registros de acceso al sistema.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la labor técnica con los valores éticos del servicio público. Las otras opciones son conductas negativas o negligentes."
            }
          ]
        },
        {
          contenido: "Como Técnico de Sistemas en Pereira, debe generar un informe estadístico sobre los niveles de recaudo por comunas para la Secretaría de Hacienda. Nota que la base de datos tiene muchos campos vacíos en la dirección de notificación y números de teléfono erróneos. Usted debe proponer una campaña de actualización de datos, sistematizar la información actual y asegurar que los informes estadísticos sean precisos para la toma de decisiones financieras de la administración municipal.",
          categoria: "Gestión de Datos y Estadística", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cuál es el riesgo de tomar decisiones financieras basadas en datos incompletos o erróneos?",
              opciones: [
                { letra: "A", texto: "Realizar proyecciones presupuestales falsas, dificultar el cobro de impuestos y generar ineficiencia en la inversión pública municipal.", esCorrecta: true },
                { letra: "B", texto: "Que el Secretario de Hacienda tenga que comprar una calculadora más grande para tratar de entender los números del informe.", esCorrecta: false },
                { letra: "C", texto: "Que la gente se ría de la Alcaldía porque los gráficos de los informes estadísticos no tienen colores bonitos.", esCorrecta: false }
              ],
              explicacion: "La opción A identifica el impacto real de la mala calidad del dato en la gestión estatal. Las otras opciones son visiones banales o irrelevantes."
            },
            {
              texto: "Al proponer la campaña de actualización de datos, ¿qué canal recomienda para facilitar la participación ciudadana?",
              opciones: [
                { letra: "A", texto: "Un formulario digital seguro integrado a la página web oficial, acompañado de puntos de actualización física en los Centros de Atención Oportuna.", esCorrecta: true },
                { letra: "B", texto: "Pedirle a los ciudadanos que manden su dirección y teléfono por un mensaje directo a la cuenta de TikTok de la Alcaldía.", esCorrecta: false },
                { letra: "C", texto: "Obligar a todos los ciudadanos a que lleven una carta escrita a mano y notariada con su dirección actualizada.", esCorrecta: false }
              ],
              explicacion: "La opción A utiliza la política de Gobierno Digital y simplificación de trámites. Las otras opciones son inseguras o imponen barreras innecesarias."
            },
            {
              texto: "¿Qué principio de la función administrativa se cumple al garantizar la calidad de la información estadística?",
              opciones: [
                { letra: "A", texto: "La Eficacia y la Planeación, permitiendo que el Estado actúe con base en realidades técnicas y no en suposiciones.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'Confundir para Reinar', entregando datos difíciles de entender para que nadie pueda criticar la gestión.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Papeleo Digital', creando bases de datos solo para llenar el disco duro del servidor de la oficina.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la gestión técnica con los fines superiores del municipio. Las otras opciones son visiones negativas o erróneas."
            }
          ]
        }
      ]
    },
    {
      simoId: "243348", // BOYACÁ - Prof. Universitario (Vías)
      escenarios: [
        {
          contenido: "Usted es Profesional Universitario en la Secretaría de Infraestructura de la Gobernación de Boyacá. Debe actualizar el inventario vial del departamento. Durante el recorrido por una vía veredal, identifica que un tramo pavimentado hace menos de un año presenta grietas profundas y hundimientos (piel de cocodrilo). Usted debe realizar el registro fotográfico, medir el área afectada, verificar quién fue el contratista y proyectar el informe técnico para exigir la aplicación de la póliza de estabilidad de la obra.",
          categoria: "Infraestructura Vial / Supervisión", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Qué tipo de falla técnica indica la presencia de 'piel de cocodrilo' en un pavimento asfáltico nuevo?",
              opciones: [
                { letra: "A", texto: "Falla por fatiga de la estructura del pavimento, posiblemente debido a un diseño insuficiente de la base o al uso de materiales de mala calidad.", esCorrecta: true },
                { letra: "B", texto: "Que el asfalto es de una marca especial que imita la piel de los animales para que la vía se vea más natural en el paisaje.", esCorrecta: false },
                { letra: "C", texto: "Que los camiones que pasan por la vía son muy pesados y el asfalto se asustó y se rompió por el ruido de los motores.", esCorrecta: false }
              ],
              explicacion: "La opción A identifica técnicamente la patología del pavimento. Las otras opciones son absurdas o carecen de rigor de ingeniería."
            },
            {
              texto: "En cuanto a la póliza de estabilidad, ¿qué debe asegurar el Profesional de la Gobernación?",
              opciones: [
                { letra: "A", texto: "Que la póliza esté vigente, que cubra la cuantía del daño detectado y que el contratista sea notificado formalmente del siniestro técnico.", esCorrecta: true },
                { letra: "B", texto: "Que el contratista le dé una explicación emocional sobre por qué la vía se dañó tan rápido y aceptar sus disculpas sin cobrar la póliza.", esCorrecta: false },
                { letra: "C", texto: "Pedirle a los campesinos del sector que ellos mismos tapen los huecos con tierra para no molestar a la empresa contratista.", esCorrecta: false }
              ],
              explicacion: "La opción A es el procedimiento legal y administrativo para proteger el patrimonio departamental. Las otras opciones son negligencias gravísimas."
            },
            {
              texto: "¿Qué valor institucional se destaca al realizar un seguimiento riguroso a las obras públicas?",
              opciones: [
                { letra: "A", texto: "La Justicia y la Responsabilidad, asegurando que los recursos de los boyacenses se inviertan en obras de calidad y duraderas.", esCorrecta: true },
                { letra: "B", texto: "La Arrogancia, tratando de que los ingenieros contratistas se sientan mal por los errores técnicos cometidos.", esCorrecta: false },
                { letra: "C", texto: "La Indiferencia, anotando el hueco en el informe pero sin hacer nada para que el contratista lo repare.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la labor técnica con el Código de Integridad. Las otras opciones son conductas negativas."
            }
          ]
        },
        {
          contenido: "Como Profesional de Vías en Boyacá, debe atender una solicitud de una comunidad rural que pide la construcción de un puente sobre un río que se desborda en invierno, dejando aisladas a 50 familias. Usted debe realizar el estudio de prefactibilidad, evaluar el riesgo hidrológico, proyectar el presupuesto inicial y asegurar que el proyecto se incluya en el Plan Vial Departamental para la búsqueda de recursos de regalías.",
          categoria: "Planeación y Proyectos Viales", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cuál es el primer paso técnico para justificar la construcción del puente?",
              opciones: [
                { letra: "A", texto: "El estudio topográfico e hidrológico que determine la luz del puente, el nivel de aguas máximas y la necesidad social de conectividad.", esCorrecta: true },
                { letra: "B", texto: "Hacer una encuesta para ver si la gente del pueblo prefiere un puente de color verde o un puente de color azul.", esCorrecta: false },
                { letra: "C", texto: "Esperar a que el río se seque del todo para poder pasar caminando y así ahorrarle el dinero del puente al departamento.", esCorrecta: false }
              ],
              explicacion: "La opción A es el requisito técnico de ingeniería para cualquier obra civil. Las otras opciones son banales o negligentes ante el riesgo."
            },
            {
              texto: "Al proyectar el presupuesto, ¿qué debe contemplar para asegurar la durabilidad de la obra en zona de inundación?",
              opciones: [
                { letra: "A", texto: "Costos de cimentaciones profundas, obras de protección de estribos y materiales resistentes a la corrosión y socavación.", esCorrecta: true },
                { letra: "B", texto: "Comprar madera barata del bosque vecino para hacer un puente colgante que se vea muy artesanal y rústico.", esCorrecta: false },
                { letra: "C", texto: "No ponerle barandas al puente para que la gente tenga más cuidado al cruzar y no se distraiga mirando el agua.", esCorrecta: false }
              ],
              explicacion: "La opción A identifica los componentes técnicos de costo para una infraestructura segura. Las otras opciones son soluciones inseguras e ilegales."
            },
            {
              texto: "¿Qué principio de la función administrativa se cumple al priorizar proyectos por riesgo y necesidad social?",
              opciones: [
                { letra: "A", texto: "La Eficacia y la Equidad, dirigiendo la inversión pública a solucionar problemas vitales de las poblaciones más aisladas.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'Favoritismo Político', haciendo el puente solo si los líderes de la vereda son amigos del Gobernador.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Gasto Lento', tratando de que el proyecto demore 10 años en estudios para no tener que gastar el dinero rápido.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la gestión con los fines del Estado Social de Derecho. Las otras opciones son actos de corrupción o ineficiencia administrativa."
            }
          ]
        }
      ]
    },
    {
      simoId: "241158", // PITALITO - Conductor (Maquinaria)
      escenarios: [
        {
          contenido: "Usted es Conductor de maquinaria pesada (motoniveladora) en la Alcaldía de Pitalito. Debe realizar el mantenimiento de una vía rural afectada por las lluvias. Durante la jornada, nota que el motor de la máquina empieza a recalentarse y que el nivel de aceite hidráulico está bajando rápidamente por una manguera rota. Usted debe suspender la operación, aplicar el protocolo de seguridad para evitar daños mayores a la máquina y reportar la novedad al jefe de taller para la reparación técnica inmediata.",
          categoria: "Operación y Mantenimiento de Maquinaria", dificultad: "BASICO",
          preguntas: [
            {
              texto: "¿Cuál es su acción inmediata al detectar el recalentamiento y la fuga de aceite hidráulico?",
              opciones: [
                { letra: "A", texto: "Detener la máquina en un lugar seguro, apagar el motor, señalizar la zona y reportar la falla mecánica al supervisor del equipo.", esCorrecta: true },
                { letra: "B", texto: "Seguir trabajando a toda velocidad para terminar el tramo de vía antes de que la máquina se funda por completo.", esCorrecta: false },
                { letra: "C", texto: "Echarle agua fría al motor caliente mientras está encendido para ver si así se enfría rápido y puede seguir trabajando.", esCorrecta: false }
              ],
              explicacion: "La opción A es el protocolo de seguridad y cuidado de activos públicos. Las otras opciones causan daños irreparables o accidentes de trabajo."
            },
            {
              texto: "En cuanto al control de insumos, ¿qué debe registrar en la bitácora de la maquinaria?",
              opciones: [
                { letra: "A", texto: "El horómetro inicial y final, el consumo de combustible, las fallas detectadas y el reporte de mantenimiento realizado.", esCorrecta: true },
                { letra: "B", texto: "Cuántas canciones escuchó en la radio mientras manejaba la máquina durante el día.", esCorrecta: false },
                { letra: "C", texto: "El nombre de todas las personas que se quedaron mirando cómo trabajaba la motoniveladora en la vereda.", esCorrecta: false }
              ],
              explicacion: "La opción A es el registro técnico obligatorio para la gestión de maquinaria amarilla. Las otras opciones son irrelevantes."
            },
            {
              texto: "¿Qué valor del servidor público se destaca al cuidar la maquinaria de la Alcaldía como si fuera propia?",
              opciones: [
                { letra: "A", texto: "La Honestidad y el Compromiso con el cuidado de los recursos públicos que pertenecen a todos los ciudadanos de Pitalito.", esCorrecta: true },
                { letra: "B", texto: "La Pereza, buscando cualquier excusa mecánica para dejar de trabajar y sentarse a descansar bajo un árbol.", esCorrecta: false },
                { letra: "C", texto: "La Indiferencia, asumiendo que como la máquina es del Estado, no importa si se daña porque el Alcalde compra otra nueva.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la conducta con el Código de Integridad. Las otras opciones son actitudes negativas que afectan el patrimonio municipal."
            }
          ]
        },
        {
          contenido: "Como Conductor de la Alcaldía de Pitalito, debe transportar materiales de construcción a una escuela rural. Un líder comunitario le pide que, 'ya que está por allá', le lleve un viaje de arena a su finca personal para un arreglo privado. Usted debe negarse cortésmente, explicar que los vehículos oficiales solo pueden usarse para fines institucionales y que el uso indebido de los mismos puede acarrear sanciones disciplinarias y penales.",
          categoria: "Uso de Bienes Públicos / Ética", dificultad: "BASICO",
          preguntas: [
            {
              texto: "¿Qué prohibición legal existe respecto al uso de vehículos y maquinaria de la Alcaldía?",
              opciones: [
                { letra: "A", texto: "Está prohibido usar bienes públicos para beneficios particulares o fines diferentes a los establecidos en el cumplimiento de las funciones oficiales.", esCorrecta: true },
                { letra: "B", texto: "Se pueden usar los fines de semana para pasear con la familia siempre y cuando el conductor pague la gasolina de su bolsillo.", esCorrecta: false },
                { letra: "C", texto: "Se pueden prestar a los amigos de la Alcaldía para que hagan sus mudanzas personales y así ahorrar dinero.", esCorrecta: false }
              ],
              explicacion: "La opción A refleja la norma legal de protección del patrimonio público (Código Disciplinario). Las otras opciones son actos ilegales."
            },
            {
              texto: "Ante la presión del líder comunitario, ¿cuál es la respuesta correcta del servidor público?",
              opciones: [
                { letra: "A", texto: "Explicar que el vehículo tiene una ruta asignada y que desviarse para un fin privado constituye una falta grave contra la administración.", esCorrecta: true },
                { letra: "B", texto: "Aceptar el viaje de arena a cambio de que el líder comunitario hable bien de usted con el Alcalde de Pitalito.", esCorrecta: false },
                { letra: "C", texto: "Decirle que sí, pero que debe pagarle una 'propina' por el favor de llevarle la arena hasta su finca privada.", esCorrecta: false }
              ],
              explicacion: "La opción A es la conducta íntegra y legal. Las otras opciones son actos de corrupción o tráfico de influencias."
            },
            {
              texto: "¿Qué principio rige la actuación del conductor al priorizar el servicio a la escuela sobre el favor personal?",
              opciones: [
                { letra: "A", texto: "La Moralidad Administrativa y la Primacía del Interés General sobre el interés particular.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'Ser antipático', demostrando que los funcionarios del Estado no ayudan a nadie en el pueblo.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Miedo a la Ley', actuando bien solo porque sabe que hay cámaras de seguridad vigilando la vía.", esCorrecta: false }
              ],
              explicacion: "La opción A es el fundamento ético de la función pública en Colombia. Las otras opciones son interpretaciones erróneas de la conducta profesional."
            }
          ]
        }
      ]
    },
    {
      simoId: "243208", // BELLAS ARTES - Maestro Artes (Teatro)
      escenarios: [
        {
          contenido: "Usted es Maestro en Artes Escénicas en el Instituto Departamental de Bellas Artes. Debe proponer el montaje de una obra de teatro de títeres para ser presentada en municipios del Valle del Cauca como parte de un programa de cultura para la paz. Usted debe realizar la investigación temática, diseñar los personajes y la escenografía, y asegurar que la propuesta pedagógica sea adecuada para un público infantil y juvenil en zonas que han sido afectadas por el conflicto armado.",
          categoria: "Pedagogía y Creación Artística", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cuál es el criterio principal para diseñar una propuesta pedagógica teatral en zonas de post-conflicto?",
              opciones: [
                { letra: "A", texto: "Un enfoque reparador, lúdico y de fomento de valores ciudadanos, que evite la revictimización y promueva la resolución pacífica de conflictos.", esCorrecta: true },
                { letra: "B", texto: "Mostrar escenas muy violentas para que los niños se acostumbren a la realidad de la guerra desde pequeños.", esCorrecta: false },
                { letra: "C", texto: "Hacer una obra que no tenga ningún mensaje y que solo sirva para que los niños se rían y se olviden de sus problemas por un momento.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la labor artística con los fines de la política pública de paz y cultura. Las otras opciones son contraproducentes o carecen de valor social."
            },
            {
              texto: "En cuanto al diseño de la escenografía itinerante, ¿qué requisito técnico debe cumplir?",
              opciones: [
                { letra: "A", texto: "Ser ligera, fácil de montar y desmontar, resistente al transporte por carretera y adaptable a diferentes espacios (plazas, escuelas, teatros).", esCorrecta: true },
                { letra: "B", texto: "Ser una estructura de mármol y hierro muy pesada que necesite una grúa gigante para moverse de un pueblo a otro.", esCorrecta: false },
                { letra: "C", texto: "No llevar escenografía y pedirle a la gente de cada pueblo que ellos mismos construyan el escenario con lo que encuentren en la calle.", esCorrecta: false }
              ],
              explicacion: "La opción A identifica la necesidad logística de la itinerancia cultural. Las otras opciones son ineficientes o irresponsables."
            },
            {
              texto: "¿Qué valor del servicio público se destaca al llevar el arte a las zonas más apartadas del Valle?",
              opciones: [
                { letra: "A", texto: "La Justicia Social y la Inclusión, garantizando el derecho al acceso a la cultura de todas las comunidades del departamento.", esCorrecta: true },
                { letra: "B", texto: "La Vanidad, queriendo ser el artista más famoso de todo el Valle del Cauca.", esCorrecta: false },
                { letra: "C", texto: "La Indiferencia, haciendo la función lo más rápido posible para poder devolverse a Cali el mismo día.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la labor con el propósito social del Instituto de Bellas Artes. Las otras opciones son motivaciones personales o negligentes."
            }
          ]
        },
        {
          contenido: "Como Maestro de Teatro en Bellas Artes, debe representar a la institución en un festival internacional de teatro de muñecos. Nota que el presupuesto asignado para el viaje es limitado y debe decidir entre llevar una escenografía completa o realizar una adaptación simplificada que permita ahorrar costos sin perder la calidad artística. Usted debe realizar el análisis de viabilidad técnica, proponer la mejor opción costo-beneficio y asegurar que la imagen institucional del departamento quede en alto.",
          categoria: "Gestión Cultural y Representación", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cómo debe abordar la adaptación de la obra ante la limitación presupuestal?",
              opciones: [
                { letra: "A", texto: "Realizar un ejercicio de síntesis creativa, priorizando los elementos simbólicos esenciales que mantengan la potencia del mensaje y la calidad interpretativa.", esCorrecta: true },
                { letra: "B", texto: "Pedir dinero prestado a los otros artistas del festival para poder pagar el exceso de equipaje de la escenografía pesada.", esCorrecta: false },
                { letra: "C", texto: "Presentarse sin ningún tipo de títeres ni escenografía y decir que es un nuevo estilo de 'teatro invisible' para ahorrar dinero.", esCorrecta: false }
              ],
              explicacion: "La opción A es la respuesta profesional y creativa ante la escasez de recursos. Las otras opciones son informales o deshonestas artísticamente."
            },
            {
              texto: "Al representar a Bellas Artes en el exterior, ¿qué principio de la función pública debe observar?",
              opciones: [
                { letra: "A", texto: "La Excelencia y el Respeto, actuando con decoro y profesionalismo como embajador de la cultura vallecaucana ante el mundo.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'Cada quien por su cuenta', actuando como si fuera un artista independiente que no tiene nada que ver con la Gobernación.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Soberbia', tratando con desprecio a los artistas de otros países para que vean que el Valle es superior en artes.", esCorrecta: false }
              ],
              explicacion: "La opción A define el comportamiento esperado de un servidor público en misión oficial. Las otras opciones son faltas a la ética institucional."
            },
            {
              texto: "¿Qué documento debe entregar al finalizar la representación internacional?",
              opciones: [
                { letra: "A", texto: "Un informe técnico de gestión que incluya el impacto de la participación, los contactos realizados, el registro fotográfico y la rendición de cuentas de los gastos.", esCorrecta: true },
                { letra: "B", texto: "Un imán para la nevera del Director del Instituto como único recuerdo de que el viaje se realizó con éxito.", esCorrecta: false },
                { letra: "C", texto: "Ninguno, los artistas no deben perder el tiempo llenando informes administrativos aburridos para la oficina.", esCorrecta: false }
              ],
              explicacion: "La opción A es la obligación legal de todo servidor público que cumple una comisión de servicios. Las otras opciones son negligencias administrativas."
            }
          ]
        }
      ]
    },
    {
      simoId: "243203", // BELLAS ARTES - Auxiliar Adm. (Almacén)
      escenarios: [
        {
          contenido: "Usted es Auxiliar Administrativo en el almacén del Instituto Departamental de Bellas Artes. Recibe un pedido masivo de instrumentos musicales (violines y guitarras) para los semilleros juveniles. Al realizar la inspección de recibo, nota que tres guitarras presentan rajaduras en la caja de resonancia y que un violín no coincide con las especificaciones de marca y calidad pactadas en el contrato. Usted debe dejar constancia en el acta de recibo, informar al jefe de almacén y no autorizar el ingreso al inventario de los elementos defectuosos.",
          categoria: "Gestión de Almacén e Inventarios", dificultad: "BASICO",
          preguntas: [
            {
              texto: "¿Cuál es su función técnica al recibir bienes en el almacén de la entidad?",
              opciones: [
                { letra: "A", texto: "Verificar físicamente que los elementos entregados coincidan exactamente en cantidad, calidad y especificaciones técnicas con lo solicitado en el contrato.", esCorrecta: true },
                { letra: "B", texto: "Firmar el acta de recibido rápido para que el conductor del camión se pueda ir a su casa a descansar temprano.", esCorrecta: false },
                { letra: "C", texto: "Recibir lo que sea que manden, asumiendo que el proveedor es una persona honesta y que no mandaría cosas dañadas a propósito.", esCorrecta: false }
              ],
              explicacion: "La opción A es la labor fundamental del almacenista para proteger el patrimonio institucional. Las otras opciones son negligencias gravísimas."
            },
            {
              texto: "Ante el hallazgo de las guitarras rajadas, ¿cuál es el procedimiento correcto?",
              opciones: [
                { letra: "A", texto: "Rechazar el ingreso de los elementos dañados, dejar la observación detallada en el acta y solicitar la reposición inmediata por parte del proveedor.", esCorrecta: true },
                { letra: "B", texto: "Tratar de pegar las guitarras con pegamento blanco en la oficina para que nadie note que llegaron rotas al Instituto.", esCorrecta: false },
                { letra: "C", texto: "Entregárselas así a los estudiantes, diciéndoles que una guitarra rajada tiene un sonido 'más artístico y experimental'.", esCorrecta: false }
              ],
              explicacion: "La opción A cumple con los deberes de control de calidad y salvaguarda de recursos. Las otras opciones son fraudes o falta de respeto a los beneficiarios."
            },
            {
              texto: "¿Qué principio rige la gestión de inventarios para garantizar la transparencia en Bellas Artes?",
              opciones: [
                { letra: "A", texto: "La Veracidad y la Responsabilidad, asegurando que el sistema de inventarios refleje exactamente los bienes existentes en la bodega.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'Desorden Creativo', donde cada quien saca lo que necesita del almacén sin anotar nada en ningún papel.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Ahorro de Trabajo', no haciendo inventarios anuales para que el personal del almacén no se canse contando cosas.", esCorrecta: false }
              ],
              explicacion: "La opción A es el fundamento de la administración de bienes públicos. Las otras opciones son focos de corrupción o ineficiencia."
            }
          ]
        },
        {
          contenido: "Como Auxiliar de Almacén en Bellas Artes, debe consolidar el plan de necesidades de papelería y elementos de aseo para el próximo año. Nota que algunas dependencias piden cantidades exageradas de resmas de papel y tóner que no coinciden con su histórico de consumo. Usted debe realizar el análisis de consumo real, ajustar las cantidades basándose en la política de cero papel del Estado y proyectar el pedido consolidado que garantice el funcionamiento sin desperdicios innecesarios.",
          categoria: "Planeación de Necesidades / Consumo", dificultad: "BASICO",
          preguntas: [
            {
              texto: "¿Qué criterio debe usar para ajustar un pedido de papelería que parece excesivo?",
              opciones: [
                { letra: "A", texto: "El consumo promedio histórico de la dependencia y los lineamientos de eficiencia administrativa y política ambiental de la entidad.", esCorrecta: true },
                { letra: "B", texto: "Darle todo lo que pidan a las dependencias donde trabajan sus amigos y recortarle el presupuesto a los que le caen mal.", esCorrecta: false },
                { letra: "C", texto: "Lanzar una moneda al aire para decidir si aprueba o no el pedido de papel de cada oficina.", esCorrecta: false }
              ],
              explicacion: "La opción A utiliza criterios técnicos y de sostenibilidad. Las otras opciones son actos de favoritismo o azar no profesional."
            },
            {
              texto: "En cuanto al registro de salidas de almacén, ¿qué documento es obligatorio?",
              opciones: [
                { letra: "A", texto: "El comprobante de salida de almacén debidamente firmado por el funcionario responsable que recibe los elementos.", esCorrecta: true },
                { letra: "B", texto: "Un mensaje de voz por WhatsApp diciendo: 'ya me llevé las escobas y el detergente de la bodega'.", esCorrecta: false },
                { letra: "C", texto: "Ninguno, lo importante es que la gente use los materiales, los papeles de control son una pérdida de tiempo.", esCorrecta: false }
              ],
              explicacion: "La opción A garantiza la trazabilidad y legalidad del movimiento de bienes. Las otras opciones son informales e inseguras."
            },
            {
              texto: "¿Qué valor del servidor público se destaca al evitar el desperdicio de materiales en la entidad?",
              opciones: [
                { letra: "A", texto: "La Honestidad y la Diligencia, velando por el uso austero y eficiente de los recursos que paga la ciudadanía con sus impuestos.", esCorrecta: true },
                { letra: "B", texto: "La Tacañería, no queriendo entregarle ni un lápiz a los profesores para que el almacén siempre esté lleno.", esCorrecta: false },
                { letra: "C", texto: "La Indiferencia, dejando que cada quien se lleve lo que quiera aunque sepa que se lo van a robar o a malgastar.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la conducta con los principios de la ética pública. Las otras opciones son interpretaciones negativas o negligentes."
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
