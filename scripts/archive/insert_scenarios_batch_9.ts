import { PrismaClient, TipoPregunta, NivelDificultad } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const dataToInsert: any[] = [
    {
      simoId: "246280", // NEIVA - Auxiliar Administrativo
      escenarios: [
        {
          contenido: "Usted es Auxiliar Administrativo en la Alcaldía de Neiva. Al llegar a su puesto de trabajo, encuentra una pila de correspondencia recibida el viernes al final de la jornada que no fue radicada. Entre los documentos, identifica una citación para una audiencia de conciliación prejudicial que se llevará a cabo el martes a primera hora. Usted debe asegurar que el documento llegue al despacho del Alcalde y a la Oficina Jurídica de inmediato, siguiendo el procedimiento de registro y distribución oficial.",
          categoria: "Gestión de Correspondencia", dificultad: "BASICO",
          preguntas: [
            {
              texto: "¿Cuál es el procedimiento técnico correcto para manejar esta correspondencia atrasada?",
              opciones: [
                { letra: "A", texto: "Radicar con la fecha y hora actual, dejando constancia de la fecha real de recepción física para efectos de términos legales.", esCorrecta: true },
                { letra: "B", texto: "Ponerle una fecha de radicado del viernes pasado, aunque ya el sistema haya cerrado, para que no lo regañen por el retraso.", esCorrecta: false },
                { letra: "C", texto: "Esconder el documento debajo de otros papeles y esperar a que pase la audiencia para decir que nunca llegó a la Alcaldía.", esCorrecta: false }
              ],
              explicacion: "La opción A garantiza la transparencia y la legalidad del registro documental. La B es una alteración de registro público y la C es una falta gravísima que afecta la defensa jurídica de la entidad."
            },
            {
              texto: "Al entregar el documento en la Oficina Jurídica, ¿qué requisito debe cumplir para que la entrega sea válida?",
              opciones: [
                { letra: "A", texto: "Entregar el documento físico junto con el reporte de radicación y obtener una firma de recibido con fecha y hora en su planilla de control.", esCorrecta: true },
                { letra: "B", texto: "Dejar el papel encima de cualquier escritorio vacío y salir corriendo antes de que alguien le haga preguntas sobre el retraso.", esCorrecta: false },
                { letra: "C", texto: "Lanzar el sobre por debajo de la puerta de la oficina jurídica antes de que abran para que crean que alguien lo dejó allí por la noche.", esCorrecta: false }
              ],
              explicacion: "La opción A asegura la trazabilidad y responsabilidad en la cadena de custodia de la información. Las otras opciones son informales e irresponsables."
            },
            {
              texto: "En cuanto al servicio al ciudadano, si el abogado del demandante llama a preguntar por el radicado, ¿qué información debe suministrar?",
              opciones: [
                { letra: "A", texto: "El número de radicado oficial, la fecha de registro y la dependencia a la cual fue asignado el trámite para su atención.", esCorrecta: true },
                { letra: "B", texto: "Decirle que no sabe nada y colgarle el teléfono porque los abogados son personas muy complicadas de atender.", esCorrecta: false },
                { letra: "C", texto: "Darle el número personal del Alcalde para que él mismo le resuelva las dudas al abogado sobre el proceso legal.", esCorrecta: false }
              ],
              explicacion: "La opción A cumple con el principio de transparencia y derecho a la información. La B vulnera el buen servicio y la C es una falta al protocolo de comunicaciones institucionales."
            }
          ]
        },
        {
          contenido: "Como Auxiliar Administrativo en Neiva, atiende a un ciudadano que reclama airadamente porque su factura de impuesto predial no refleja un pago realizado hace un mes. El ciudadano presenta el recibo sellado por el banco, pero en el sistema de la Alcaldía aún aparece la deuda con intereses de mora. Usted debe verificar el soporte, consultar con el área de Tesorería la causa de la falta de aplicación del pago y orientar al ciudadano en el trámite de corrección para evitar que sigan corriendo los intereses.",
          categoria: "Atención al Ciudadano", dificultad: "BASICO",
          preguntas: [
            {
              texto: "¿Qué acción técnica realiza para validar el reclamo del ciudadano?",
              opciones: [
                { letra: "A", texto: "Verificar la autenticidad del sello bancario, confrontar el número de referencia de pago y el valor contra el reporte de recaudo de Tesorería.", esCorrecta: true },
                { letra: "B", texto: "Decirle al ciudadano que el banco seguramente se robó su dinero y que debe ir a pelear allá y no en la Alcaldía.", esCorrecta: false },
                { letra: "C", texto: "Borrar la deuda del sistema de inmediato solo con ver el papel que trae el ciudadano, sin consultar con ninguna otra oficina.", esCorrecta: false }
              ],
              explicacion: "La opción A sigue el debido proceso administrativo de validación de recaudo. La B es una falta de respeto y la C es una extralimitación que afecta las finanzas públicas sin soporte legal."
            },
            {
              texto: "Si detecta que el error fue de digitación en la Alcaldía al cargar los archivos planos del banco, ¿qué trámite procede?",
              opciones: [
                { letra: "A", texto: "Remitir el caso con el soporte a la dependencia de Impuestos para que realicen el ajuste manual del pago con la fecha real del sello bancario.", esCorrecta: true },
                { letra: "B", texto: "Pedirle al ciudadano que vuelva a pagar y que después pida que le devuelvan la plata, lo cual tardará unos dos años más o menos.", esCorrecta: false },
                { letra: "C", texto: "Sugerir al ciudadano que use el recibo viejo para prender una fogata porque ya no sirve para nada ante el sistema de la Alcaldía.", esCorrecta: false }
              ],
              explicacion: "La opción A garantiza la justicia tributaria y corrige el error administrativo sin perjudicar al ciudadano. Las otras opciones son ineficientes o burlonas."
            },
            {
              texto: "En el marco de la Gestión Documental, ¿cómo debe proceder con la fotocopia del recibo que deja el ciudadano?",
              opciones: [
                { letra: "A", texto: "Adjuntarla al expediente del contribuyente, debidamente radicada como soporte de la solicitud de corrección de cuenta.", esCorrecta: true },
                { letra: "B", texto: "Usarla como papel de borrador para anotar sus recordatorios personales y luego botarla a la basura ordinaria.", esCorrecta: false },
                { letra: "C", texto: "Guardarla en su billetera personal para tener los datos del ciudadano y llamarlo después para ofrecerle servicios privados.", esCorrecta: false }
              ],
              explicacion: "La opción A asegura la integridad del expediente y la prueba del trámite realizado. La B y la C son usos indebidos de documentos públicos y datos personales."
            }
          ]
        }
      ]
    },
    {
      simoId: "241433", // INST. SALUD NS - Técnico Adm. (Cuentas Médicas)
      escenarios: [
        {
          contenido: "Usted es Técnico Administrativo en el Instituto Departamental de Salud de Norte de Santander, encargado de la auditoría de cuentas médicas. Al revisar un lote de facturas de una IPS por servicios de urgencias, detecta que se están cobrando insumos de alta complejidad en casos de triaje 4 y 5, lo cual no es pertinente según los protocolos médicos. Además, varias facturas no adjuntan el Registro Individual de Prestación de Servicios (RIPS). Usted debe proyectar las glosas correspondientes y comunicar las inconsistencias a la IPS para que realicen los ajustes o sustenten técnicamente el cobro.",
          categoria: "Auditoría de Cuentas", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cuál es el fundamento técnico para aplicar la glosa por falta de pertinencia médica?",
              opciones: [
                { letra: "A", texto: "La discrepancia entre la severidad del caso clínico (Triaje) y el nivel de complejidad de los insumos facturados, según las guías de práctica clínica.", esCorrecta: true },
                { letra: "B", texto: "Que a usted le parece que la factura es muy cara y que el Instituto no tiene presupuesto para pagar tanto dinero este mes.", esCorrecta: false },
                { letra: "C", texto: "Que el médico que firmó la orden tiene una letra muy fea y usted no entiende qué fue lo que le recetó al paciente.", esCorrecta: false }
              ],
              explicacion: "La opción A aplica criterios técnicos de auditoría médica y pertinencia del gasto en salud. Las otras opciones son subjetivas o financieras sin base técnica."
            },
            {
              texto: "Respecto a la falta de los archivos RIPS, ¿cuál es la medida administrativa correcta?",
              opciones: [
                { letra: "A", texto: "Devolver la cuenta completa sin trámite de auditoría hasta que la IPS cargue la información obligatoria en el formato estándar definido por el Ministerio.", esCorrecta: true },
                { letra: "B", texto: "Inventar usted mismo los datos de los pacientes para que la cuenta pase rápido y el Director del Instituto no tenga problemas con la IPS.", esCorrecta: false },
                { letra: "C", texto: "Pagar la cuenta así, asumiendo que si la IPS dice que atendió a la gente es porque seguramente sí lo hizo y no hay que dudar de ellos.", esCorrecta: false }
              ],
              explicacion: "La opción A cumple con los requisitos legales de facturación en salud. La B es una falsedad documental y la C es una negligencia que facilita el fraude al sistema."
            },
            {
              texto: "¿Qué norma regula los términos y el procedimiento para la respuesta a glosas entre entidades responsables de pago e IPS?",
              opciones: [
                { letra: "A", texto: "La Ley 1438 de 2011 y el Decreto Único Reglamentario del Sector Salud (780 de 2016).", esCorrecta: true },
                { letra: "B", texto: "El Código de Comercio, porque la salud es un negocio como cualquier otro y se rige por la oferta y la demanda.", esCorrecta: false },
                { letra: "C", texto: "El manual de convivencia de la IPS, que dice que ellos siempre tienen la razón y que nadie puede criticar sus facturas.", esCorrecta: false }
              ],
              explicacion: "La opción A identifica el marco legal específico del sistema de salud colombiano. Las otras opciones son incorrectas técnicamente."
            }
          ]
        },
        {
          contenido: "Como Técnico del Instituto de Salud, debe organizar el archivo de gestión de la oficina de auditoría para una visita de inspección de la Superintendencia Nacional de Salud. Los auditores de la Super pedirán evidencias de la trazabilidad de las glosas aplicadas durante el último año. Usted encuentra que muchas respuestas de las IPS se encuentran en correos electrónicos personales de exfuncionarios y no han sido impresas ni archivadas en los expedientes físicos ni en el software de la entidad. Debe recuperar la información y normalizar los expedientes para evitar hallazgos.",
          categoria: "Gestión Documental en Salud", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cuál es la falta técnica principal detectada en la organización del archivo de auditoría?",
              opciones: [
                { letra: "A", texto: "La ruptura de la unidad documental y la falta de integridad de los expedientes al tener información dispersa en medios no oficiales.", esCorrecta: true },
                { letra: "B", texto: "Que los expedientes físicos no tienen ganchos legajadores de color azul, que es el color institucional del Instituto de Salud.", esCorrecta: false },
                { letra: "C", texto: "Que hay demasiada información y eso hace que los estantes de la oficina se vean muy llenos y poco elegantes para la visita.", esCorrecta: false }
              ],
              explicacion: "La opción A identifica un problema real de gestión documental que afecta la transparencia y la defensa técnica de la entidad. Las otras opciones son estéticas o irrelevantes."
            },
            {
              texto: "Para normalizar los expedientes antes de la visita, ¿qué acción debe priorizar?",
              opciones: [
                { letra: "A", texto: "Solicitar acceso técnico a las cuentas institucionales, extraer las comunicaciones, radicarlas y foliarlas en los expedientes correspondientes.", esCorrecta: true },
                { letra: "B", texto: "Decirle a la Superintendencia que los archivos se quemaron en un incendio accidental y que por eso no tienen pruebas de nada.", esCorrecta: false },
                { letra: "C", texto: "Pedirle a las IPS que les manden otra vez todo lo que ya enviaron, para ver si ellas también tienen el archivo desordenado.", esCorrecta: false }
              ],
              explicacion: "La opción A es la medida técnica de recuperación y organización de la memoria institucional. La B es un engaño y la C es una ineficiencia que demuestra falta de control."
            },
            {
              texto: "¿Qué principio de la función administrativa se pone en riesgo con un archivo de auditoría desordenado?",
              opciones: [
                { letra: "A", texto: "El principio de Eficacia y el de Transparencia, al no poder demostrar el seguimiento real al uso de los recursos de salud.", esCorrecta: true },
                { letra: "B", texto: "El principio de Diversidad, porque todos los expedientes deberían ser diferentes y creativos para no aburrir a los auditores.", esCorrecta: false },
                { letra: "C", texto: "El principio de Silencio, porque entre menos se sepa de lo que hace el Instituto, mejor le va a todos los funcionarios.", esCorrecta: false }
              ],
              explicacion: "La opción A es la consecuencia real de la mala gestión documental en el control público. Las otras opciones son interpretaciones erróneas de los principios estatales."
            }
          ]
        }
      ]
    },
    {
      simoId: "241443", // INST. SALUD NS - Prof. Universitario (Bacteriólogo/Calidad)
      escenarios: [
        {
          contenido: "Usted es Profesional Universitario (Bacteriólogo) en el Instituto de Salud de Norte de Santander. Realiza una visita de habilitación a un laboratorio clínico privado. Durante la inspección, observa que el área de toma de muestras no cuenta con lavamanos de accionamiento no manual y que los registros de control de calidad interno de los equipos de química sanguínea no se han realizado en la última semana. El director del laboratorio argumenta que el lavamanos se dañó ayer y que no han hecho controles porque los reactivos están próximos a vencer y no quieren gastarlos.",
          categoria: "Habilitación de Servicios", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cuál es su decisión técnica frente a los hallazgos en la visita de habilitación?",
              opciones: [
                { letra: "A", texto: "Declarar el incumplimiento de los estándares de infraestructura y procesos prioritarios, otorgando un plazo para subsanar o restringiendo el servicio si el riesgo es alto.", esCorrecta: true },
                { letra: "B", texto: "Aceptar la excusa del director y firmar el acta de cumplimiento total porque el laboratorio es de un médico muy reconocido en Cúcuta.", esCorrecta: false },
                { letra: "C", texto: "Sugerir al director que use alcohol en gel en vez de lavarse las manos y que se invente los datos de control de calidad en el cuaderno.", esCorrecta: false }
              ],
              explicacion: "La opción A garantiza la seguridad del paciente y el cumplimiento de la Resolución 3100 de 2019. Las otras opciones ponen en riesgo la salud pública y la ética profesional."
            },
            {
              texto: "Respecto al control de calidad de los equipos, ¿qué importancia técnica tiene para la seguridad del paciente?",
              opciones: [
                { letra: "A", texto: "Asegura la exactitud y precisión de los resultados de laboratorio, evitando diagnósticos erróneos o tratamientos inadecuados.", esCorrecta: true },
                { letra: "B", texto: "Sirve para que el equipo dure más años prendido y no se gaste tan rápido la bombilla interna del aparato de análisis.", esCorrecta: false },
                { letra: "C", texto: "Es un requisito inútil que inventó el gobierno para que los laboratorios tengan que gastar más dinero en reactivos caros.", esCorrecta: false }
              ],
              explicacion: "La opción A es el fundamento técnico de la gestión de calidad en salud. La B es un tema de mantenimiento y la C es una postura contraria a la ciencia médica."
            },
            {
              texto: "En el marco del Sistema Obligatorio de Garantía de Calidad (SOGC), ¿qué componente está evaluando en esta visita?",
              opciones: [
                { letra: "A", texto: "El Sistema Único de Habilitación (SUH), que define las condiciones mínimas indispensables para la entrada y permanencia en el sistema.", esCorrecta: true },
                { letra: "B", texto: "El Sistema de Acreditación, que evalúa la excelencia y los estándares superiores de calidad que son voluntarios para el laboratorio.", esCorrecta: false },
                { letra: "C", texto: "El Sistema de Auditoría para el Mejoramiento, que el laboratorio debe aplicarse a sí mismo para castigar a los empleados que se equivoquen.", esCorrecta: false }
              ],
              explicacion: "La opción A es el componente obligatorio que evalúan las direcciones territoriales de salud. Las otras opciones son componentes diferentes del SOGC."
            }
          ]
        },
        {
          contenido: "Como Profesional del Instituto de Salud, usted asesora a una ESE municipal en la implementación de su Programa de Auditoría para el Mejoramiento de la Calidad (PAMEC). La ESE ha seleccionado como proceso prioritario la 'Atención Materno-Perinatal' debido al aumento de casos de morbilidad materna extrema en el municipio. Usted debe guiar al equipo de calidad de la ESE en la definición de la ruta crítica, la selección de indicadores de resultado y la formulación del plan de acción para cerrar las brechas detectadas entre la práctica real y las guías de atención.",
          categoria: "Gestión de la Calidad (PAMEC)", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cuál es el primer paso metodológico para desarrollar el PAMEC en la ESE municipal?",
              opciones: [
                { letra: "A", texto: "La Autoevaluación diagnóstica frente a los estándares de calidad esperados para identificar las brechas de atención.", esCorrecta: true },
                { letra: "B", texto: "Contratar una orquesta para celebrar que van a empezar a trabajar en la calidad de la atención de las mujeres embarazadas.", esCorrecta: false },
                { letra: "C", texto: "Comprar computadores nuevos para toda la oficina de calidad antes de saber qué es lo que está fallando en la atención médica.", esCorrecta: false }
              ],
              explicacion: "La opción A es el punto de partida técnico definido por el Ministerio de Salud para el PAMEC. Las otras opciones son gastos innecesarios o no técnicos."
            },
            {
              texto: "¿Qué indicador de resultado es más pertinente para evaluar el impacto del PAMEC en este caso?",
              opciones: [
                { letra: "A", texto: "La disminución en la tasa de complicaciones prevenibles en el binomio madre-hijo y el cumplimiento de las metas de control prenatal.", esCorrecta: true },
                { letra: "B", texto: "El número de lapiceros que gastaron los médicos escribiendo las historias clínicas de las pacientes durante el último mes.", esCorrecta: false },
                { letra: "C", texto: "La cantidad de sonrisas que los porteros de la ESE le dan a las embarazadas cuando entran al hospital por la puerta principal.", esCorrecta: false }
              ],
              explicacion: "La opción A mide el impacto real en salud y calidad de vida. La B y la C son métricas que no evalúan la efectividad clínica del servicio."
            },
            {
              texto: "Al formular el plan de acción, ¿qué debe asegurar según la metodología de mejora continua (Ciclo PHVA)?",
              opciones: [
                { letra: "A", texto: "Definir actividades claras, asignar responsables, establecer cronogramas y asegurar que existan mecanismos de verificación del cumplimiento.", esCorrecta: true },
                { letra: "B", texto: "Escribir metas imposibles de cumplir para que la ESE parezca muy ambiciosa ante el Instituto Departamental de Salud.", esCorrecta: false },
                { letra: "C", texto: "No poner fechas de cumplimiento para que nadie se estrese si las cosas no se hacen a tiempo durante el año.", esCorrecta: false }
              ],
              explicacion: "La opción A garantiza la ejecución y el seguimiento de la mejora. La B genera frustración y la C imposibilita la gestión administrativa de la calidad."
            }
          ]
        }
      ]
    },
    {
      simoId: "242132", // SOACHA - Prof. Universitario (Cobro Coactivo)
      escenarios: [
        {
          contenido: "Usted es Profesional Universitario en la Dirección de Tesorería de la Alcaldía de Soacha. Debe proyectar un mandamiento de pago masivo para recuperar la cartera morosa del impuesto de Industria y Comercio (ICA). Al analizar la base de datos, nota que hay varias empresas que han cambiado de razón social o que se encuentran en proceso de liquidación judicial. Usted debe determinar la responsabilidad solidaria de los socios, verificar la prelación de créditos y asegurar que los actos administrativos de cobro se notifiquen correctamente para evitar nulidades procesales.",
          categoria: "Procedimiento Tributario Territorial", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cómo debe proceder con las empresas en proceso de liquidación judicial según la ley?",
              opciones: [
                { letra: "A", texto: "Notificar el mandamiento de pago al liquidador y hacerse parte en el proceso de liquidación para garantizar la prelación del crédito tributario.", esCorrecta: true },
                { letra: "B", texto: "Mandar a la policía a que cierre la empresa a la fuerza y se lleve las máquinas para venderlas en el mercado de pulgas de Soacha.", esCorrecta: false },
                { letra: "C", texto: "Dar por perdida la deuda y archivar el proceso de inmediato para que la base de datos de morosos se vea más pequeña.", esCorrecta: false }
              ],
              explicacion: "La opción A sigue el procedimiento legal de cobro frente a entes en liquidación (Ley 1116 de 2006). La B es una vía de hecho ilegal y la C es una falta al deber de gestión de cartera pública."
            },
            {
              texto: "Respecto a la responsabilidad solidaria de los socios en deudas tributarias de sociedades limitadas, ¿cuál es la norma?",
              opciones: [
                { letra: "A", texto: "Los socios responden solidariamente por los impuestos de la sociedad a prorrata de sus aportes y durante el tiempo en que los hayan poseído.", esCorrecta: true },
                { letra: "B", texto: "Los socios no responden por nada, ya que la sociedad es una persona jurídica diferente y sus dueños están protegidos totalmente.", esCorrecta: false },
                { letra: "C", texto: "Solo responde el socio que tenga el carro más costoso, porque es el que tiene más dinero para pagarle a la Alcaldía.", esCorrecta: false }
              ],
              explicacion: "La opción A es el mandato del Estatuto Tributario (Art. 794). La B es una interpretación errónea de la responsabilidad tributaria y la C es un criterio arbitrario e ilegal."
            },
            {
              texto: "¿Qué requisito de notificación es indispensable para que el mandamiento de pago sea válido?",
              opciones: [
                { letra: "A", texto: "Notificación personal o por correo enviado a la dirección registrada en el RIT (Registro Información Tributaria) o el RUT.", esCorrecta: true },
                { letra: "B", texto: "Publicar el nombre del deudor en un cartel pegado en el poste de luz frente a su casa para que todos los vecinos se enteren.", esCorrecta: false },
                { letra: "C", texto: "Llamar por teléfono y dejar un mensaje con el vigilante del edificio diciendo que el deudor debe mucha plata.", esCorrecta: false }
              ],
              explicacion: "La opción A cumple con el debido proceso de notificación legal. Las otras opciones vulneran el derecho a la intimidad y no tienen validez procesal."
            }
          ]
        },
        {
          contenido: "Como Profesional de Tesorería en Soacha, recibe una notificación de una Acción de Tutela interpuesta por un ciudadano al que se le embargó su cuenta de ahorros donde recibe su pensión. El ciudadano alega que se vulneró su mínimo vital ya que el embargo supera el 50% de sus ingresos mensuales y no tiene otros recursos para subsistir. Usted debe proyectar la respuesta técnica a la tutela, verificando si el ciudadano informó previamente la naturaleza de la cuenta y proponiendo las medidas de alivio o desembargo parcial según la jurisprudencia de la Corte Constitucional.",
          categoria: "Defensa Jurídica del Cobro", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cuál es el criterio constitucional sobre el embargo de mesadas pensionales?",
              opciones: [
                { letra: "A", texto: "Son inembargables por regla general, salvo por deudas con cooperativas o por alimentos, y siempre respetando el mínimo vital del pensionado.", esCorrecta: true },
                { letra: "B", texto: "Se pueden embargar totalmente porque las deudas de impuestos con Soacha son más importantes que la comida del anciano.", esCorrecta: false },
                { letra: "C", texto: "Depende de si el pensionado se porta bien con los funcionarios de la Alcaldía cuando va a pedir información sobre su proceso.", esCorrecta: false }
              ],
              explicacion: "La opción A refleja la protección constitucional al mínimo vital y la seguridad social. La B es inhumana e ilegal y la C es un criterio subjetivo prohibido."
            },
            {
              texto: "Al proyectar la respuesta a la tutela, ¿qué argumento técnico debe incluir?",
              opciones: [
                { letra: "A", texto: "La legalidad del proceso de cobro previo, la buena fe de la administración y la disposición de ajustar la medida una vez demostrada la afectación al mínimo vital.", esCorrecta: true },
                { letra: "B", texto: "Decirle al juez que el ciudadano es un mentiroso y que seguramente tiene mucho dinero escondido debajo del colchón de su cama.", esCorrecta: false },
                { letra: "C", texto: "Pedir que declaren la tutela improcedente porque el ciudadano debió haber pagado sus impuestos a tiempo para no ser embargado.", esCorrecta: false }
              ],
              explicacion: "La opción A plantea una defensa técnica basada en el derecho y la equidad. La B es una acusación sin pruebas y la C ignora la procedencia de la tutela frente a derechos fundamentales."
            },
            {
              texto: "En caso de que el juez ordene el desembargo, ¿cuál es el término para dar cumplimiento a la orden judicial?",
              opciones: [
                { letra: "A", texto: "De inmediato o dentro del término perentorio fijado por el juez en el fallo de tutela, so pena de incurrir en desacato.", esCorrecta: true },
                { letra: "B", texto: "Cuando el Director de Tesorería regrese de su viaje de negocios, así sea en dos semanas, porque solo él tiene la clave del sistema.", esCorrecta: false },
                { letra: "C", texto: "Nunca, porque la Alcaldía de Soacha es autónoma y no tiene por qué obedecer lo que diga un juez de la república sobre sus impuestos.", esCorrecta: false }
              ],
              explicacion: "La opción A cumple con el carácter imperativo de los fallos de tutela. Las otras opciones son desacatos flagrantes a la ley y la constitución."
            }
          ]
        }
      ]
    },
    {
      simoId: "241896", // FUNZA - Prof. Especializado (Archivo/Gestión Documental)
      escenarios: [
        {
          contenido: "Usted es Profesional Especializado en la Alcaldía de Funza, responsable del sistema de gestión documental. El municipio ha decidido modernizar su gestión pasando de un archivo físico a uno digital mediante la implementación de un SGDEA (Sistema de Gestión de Documentos Electrónicos de Archivo). Usted debe liderar el proceso de selección tecnológica, asegurar que el sistema cumpla con los requisitos del Archivo General de la Nación (AGN) sobre preservación a largo plazo y capacitar a todas las dependencias en la producción de documentos nativos digitales con firma electrónica.",
          categoria: "Gestión Documental Electrónica", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Qué requisito técnico es indispensable para que los documentos electrónicos tengan valor probatorio y legal?",
              opciones: [
                { letra: "A", texto: "Asegurar su autenticidad, integridad, disponibilidad y preservación mediante el uso de firmas digitales y metadatos estándar.", esCorrecta: true },
                { letra: "B", texto: "Que el documento tenga una marca de agua con el escudo de Funza y que el tipo de letra sea 'Comic Sans' para que se vea amigable.", esCorrecta: false },
                { letra: "C", texto: "Imprimir el documento digital, firmarlo con lapicero rojo y volverlo a escanear para que se note que es un documento real.", esCorrecta: false }
              ],
              explicacion: "La opción A cumple con los principios de la gestión documental electrónica (Decreto 1080 de 2015). La B es un tema estético y la C es una mala práctica que rompe la naturaleza digital del documento."
            },
            {
              texto: "Respecto a la 'Preservación a Largo Plazo', ¿qué estrategia técnica propone para el SGDEA?",
              opciones: [
                { letra: "A", texto: "El uso de formatos abiertos y estándares (como PDF/A), la migración periódica de soportes y la implementación de un Plan de Preservación Digital.", esCorrecta: true },
                { letra: "B", texto: "Guardar todo en un solo CD-ROM y esconderlo en la caja fuerte de la Alcaldía para que nadie pueda borrar la información por accidente.", esCorrecta: false },
                { letra: "C", texto: "Confiar en que la tecnología nunca va a cambiar y que los archivos actuales se podrán leer en mil años sin hacerles nada.", esCorrecta: false }
              ],
              explicacion: "La opción A es la metodología técnica recomendada por el AGN para evitar la obsolescencia tecnológica. La B y la C son riesgosas e inviables a futuro."
            },
            {
              texto: "Al capacitar a los funcionarios en firma electrónica, ¿qué concepto debe aclarar?",
              opciones: [
                { letra: "A", texto: "Que la firma electrónica o digital tiene la misma validez legal que la firma manuscrita, siempre que cumpla con los requisitos de ley.", esCorrecta: true },
                { letra: "B", texto: "Que la firma electrónica es solo poner el nombre en letras grandes al final del correo electrónico sin ninguna seguridad adicional.", esCorrecta: false },
                { letra: "C", texto: "Que firmar digitalmente es ilegal y que el Archivo General de la Nación va a multar a quien no use lapicero de tinta negra.", esCorrecta: false }
              ],
              explicacion: "La opción A es el fundamento de la Ley 527 de 1999. La B es una creencia errónea peligrosa y la C es una afirmación falsa."
            }
          ]
        },
        {
          contenido: "Como Profesional en Funza, se enfrenta al reto de organizar el 'Fondo Acumulado' del municipio, que contiene documentos de los años 60 a los 90 sin ningún tipo de inventario o clasificación. Esta documentación se encuentra en riesgo de deterioro biológico por humedad. Usted debe formular las Tablas de Valoración Documental (TVD), realizar el proceso de limpieza y desinfección, y determinar qué documentos tienen valor histórico y deben ser conservados permanentemente para la memoria del municipio de Funza.",
          categoria: "Fondos Acumulados", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cuál es la diferencia técnica entre las Tablas de Retención (TRD) y las de Valoración (TVD)?",
              opciones: [
                { letra: "A", texto: "Las TRD se aplican a documentos actuales de la gestión, mientras que las TVD se aplican a fondos documentales ya acumulados del pasado.", esCorrecta: true },
                { letra: "B", texto: "Las TRD son para documentos de papel blanco y las TVD son para documentos que ya se pusieron amarillos por el paso del tiempo.", esCorrecta: false },
                { letra: "C", texto: "No hay ninguna diferencia, solo que un nombre suena más importante que el otro para que el presupuesto de archivo sea mayor.", esCorrecta: false }
              ],
              explicacion: "La opción A es la distinción técnica correcta según la normatividad archivística colombiana. Las otras opciones son interpretaciones absurdas o informales."
            },
            {
              texto: "Ante el deterioro biológico (hongos, bacterias) de los documentos, ¿qué medida de seguridad industrial es obligatoria?",
              opciones: [
                { letra: "A", texto: "El uso de Elementos de Protección Personal (EPP) completos: tapabocas N95, guantes, overol y careta para evitar enfermedades laborales.", esCorrecta: true },
                { letra: "B", texto: "Llevar un gato al archivo para que se coma a los ratones y así los ratones no se coman el papel de las actas viejas de la Alcaldía.", esCorrecta: false },
                { letra: "C", texto: "Trabajar sin protección para demostrar que los archivistas de Funza son personas muy fuertes y resistentes a cualquier bacteria antigua.", esCorrecta: false }
              ],
              explicacion: "La opción A cumple con las normas de salud y seguridad en el trabajo con archivos (Acuerdo 049 de 2000 AGN). La B y la C son peligrosas y no resuelven el problema biológico."
            },
            {
              texto: "¿Qué criterio define que un documento del fondo acumulado deba conservarse permanentemente?",
              opciones: [
                { letra: "A", texto: "Sus valores secundarios: valores históricos, científicos o culturales que aporten a la memoria e identidad de la sociedad.", esCorrecta: true },
                { letra: "B", texto: "Que el documento esté escrito con una letra muy bonita o que tenga sellos de colores que se vean llamativos para una exposición.", esCorrecta: false },
                { letra: "C", texto: "Que el documento mencione el nombre de algún familiar del actual Alcalde para que él se sienta orgulloso de sus antepasados.", esCorrecta: false }
              ],
              explicacion: "La opción A es el criterio técnico de valoración documental secundaria. Las otras opciones son criterios subjetivos o sentimentales sin rigor archivístico."
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
