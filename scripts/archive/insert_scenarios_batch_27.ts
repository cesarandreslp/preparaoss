import { PrismaClient, TipoPregunta, NivelDificultad } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const dataToInsert: any[] = [
    {
      simoId: "225278", // DIAN - Gestor II (Fiscalización)
      escenarios: [
        {
          contenido: "Usted es Gestor II en la DIAN. Recibe una denuncia ciudadana anónima sobre una bodega que presuntamente almacena mercancía de contrabando. Al hacer la precrítica de la información, nota que la denuncia carece de dirección exacta y pruebas documentales. Usted debe realizar el análisis preliminar, cruzar información con otras bases de datos y determinar si existe mérito técnico para iniciar una acción formal de fiscalización y organizar la logística del operativo.",
          categoria: "Fiscalización / Análisis de Denuncias", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cuál es el criterio técnico principal para decidir el inicio de una acción de fiscalización ante una denuncia anónima incompleta?",
              opciones: [
                { letra: "A", texto: "La verificación de indicios graves mediante cruce de información exógena, RUT y bases de datos aduaneras que permitan individualizar al presunto infractor y la ubicación de la mercancía.", esCorrecta: true },
                { letra: "B", texto: "Archivar inmediatamente la denuncia porque la DIAN no tramita quejas de ciudadanos que no den su nombre y cédula.", esCorrecta: false },
                { letra: "C", texto: "Allanamientos inmediatos a todas las bodegas de la ciudad para ver en cuál de todas encuentran el contrabando.", esCorrecta: false }
              ],
              explicacion: "La opción A sigue el debido proceso y la gestión de riesgos en fiscalización aduanera. Las otras opciones son omisiones de deberes o actos arbitrarios ilegales."
            },
            {
              texto: "En cuanto a la planeación logística de la acción de control, ¿qué factor es indispensable?",
              opciones: [
                { letra: "A", texto: "Coordinar con la Policía Fiscal y Aduanera (POLFA), asegurar el transporte seguro de la mercancía aprehendida y designar el personal idóneo para la diligencia.", esCorrecta: true },
                { letra: "B", texto: "Ir solo a la bodega sospechosa en su vehículo particular para no llamar la atención de los contrabandistas.", esCorrecta: false },
                { letra: "C", texto: "Avisarle por redes sociales a la comunidad que la DIAN va a hacer un operativo para que la gente esté preparada.", esCorrecta: false }
              ],
              explicacion: "La opción A garantiza la seguridad, legalidad y efectividad del operativo institucional. Las otras opciones son riesgos inaceptables para la vida y el éxito del control."
            },
            {
              texto: "¿Qué valor de la integridad pública rige el manejo de la información en investigaciones de fiscalización?",
              opciones: [
                { letra: "A", texto: "El Compromiso con el secreto profesional y la reserva sumarial, evitando fugas de información que alerten a los investigados.", esCorrecta: true },
                { letra: "B", texto: "La Vanidad, presumiendo con sus amigos que usted es el que atrapa a todos los evasores de impuestos de la ciudad.", esCorrecta: false },
                { letra: "C", texto: "La Indiferencia, dejando los expedientes abiertos encima del escritorio para que cualquier contratista los lea.", esCorrecta: false }
              ],
              explicacion: "La opción A protege el debido proceso y la eficacia de la administración tributaria. Las otras opciones vulneran la reserva legal."
            }
          ]
        },
        {
          contenido: "Como Gestor II de Fiscalización de la DIAN, participa en una diligencia de destrucción de mercancía aprehendida que fue declarada no apta para consumo humano por el INVIMA. Durante el procedimiento, el operador logístico contratado sugiere quedarse con algunos productos 'que se ven bien' en lugar de destruirlos. Usted debe supervisar el proceso, garantizar la destrucción total según el acto administrativo y levantar el acta respectiva sin permitir irregularidades.",
          categoria: "Disposición de Mercancías / Destrucción", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cuál es el propósito legal de la destrucción de mercancías impropias o averiadas?",
              opciones: [
                { letra: "A", texto: "Proteger la salud pública, la moralidad y el medio ambiente, asegurando que productos no aptos no ingresen al mercado nacional bajo ninguna circunstancia.", esCorrecta: true },
                { letra: "B", texto: "Hacer espacio rápido en las bodegas de la DIAN para meter mercancía nueva más costosa.", esCorrecta: false },
                { letra: "C", texto: "Gastar el presupuesto de la entidad pagándole a empresas destructoras para que justifiquen su contrato.", esCorrecta: false }
              ],
              explicacion: "La opción A define el fin esencial del Estado en la disposición final de mercancías riesgosas. Las otras opciones son visiones puramente logísticas o erróneas."
            },
            {
              texto: "Ante la sugerencia del operador logístico de salvar algunos productos, ¿cómo debe actuar?",
              opciones: [
                { letra: "A", texto: "Rechazar tajantemente la solicitud, ordenar la destrucción inmediata del 100% del lote según el acto administrativo y reportar el incidente a su superior.", esCorrecta: true },
                { letra: "B", texto: "Permitir que se lleven unas pocas cajas siempre y cuando le den una parte a los funcionarios de la DIAN.", esCorrecta: false },
                { letra: "C", texto: "Hacerse el de la vista gorda y mirar para otro lado mientras el operador se guarda las cosas en los bolsillos.", esCorrecta: false }
              ],
              explicacion: "La opción A es la única conducta ética y legal permitida. Las otras opciones constituyen delitos (peculado, prevaricato por omisión)."
            },
            {
              texto: "¿Qué principio rige la elaboración del acta de destrucción de mercancías?",
              opciones: [
                { letra: "A", texto: "La Veracidad y la Transparencia, documentando con precisión las cantidades, pesos y métodos de destrucción utilizados como prueba legal del acto.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'Aproximación', anotando cantidades al azar porque es muy difícil contar la basura.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Economía de papel', haciendo un acta de un solo renglón para no gastar tinta de la impresora.", esCorrecta: false }
              ],
              explicacion: "La opción A asegura la trazabilidad y la responsabilidad fiscal de los bienes bajo custodia del Estado. Las otras opciones son falsedades ideológicas."
            }
          ]
        }
      ]
    },
    {
      simoId: "225289", // DIAN - Gestor II (Fiscalización) - Mismas competencias, otra ubicación
      escenarios: [
        {
          contenido: "Usted es Gestor II en la DIAN. Tiene a su cargo el análisis del cruce de información exógena de un grupo de empresas importadoras. Detecta inconsistencias recurrentes entre los valores declarados en aduanas (importaciones) y los costos registrados en sus declaraciones de renta. Usted debe proferir los actos preparatorios, requerir la información contable a los contribuyentes y elaborar un informe técnico que fundamente la apertura de una investigación formal por evasión fiscal.",
          categoria: "Fiscalización / Cruce de Información", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Qué acto preparatorio es el idóneo para iniciar la validación de las inconsistencias detectadas?",
              opciones: [
                { letra: "A", texto: "Emitir un requerimiento ordinario de información solicitando los soportes contables, facturas comerciales y declaraciones de importación para confrontarlos.", esCorrecta: true },
                { letra: "B", texto: "Emitir inmediatamente una liquidación oficial de revisión con la multa máxima sin escuchar al contribuyente.", esCorrecta: false },
                { letra: "C", texto: "Llamar por teléfono al gerente de la empresa y decirle que si no paga un soborno lo van a investigar.", esCorrecta: false }
              ],
              explicacion: "La opción A respeta el debido proceso y las etapas de la actuación administrativa tributaria. Las otras opciones son violaciones procesales o actos de corrupción."
            },
            {
              texto: "Al elaborar el informe técnico para solicitar la apertura de investigación, ¿qué elemento no puede faltar?",
              opciones: [
                { letra: "A", texto: "La motivación jurídica, la cuantificación preliminar del presunto daño fiscal y la relación detallada de las pruebas recaudadas en la fase de precrítica.", esCorrecta: true },
                { letra: "B", texto: "Un ensayo de diez páginas sobre la historia de los impuestos en Colombia para impresionar al jefe de la división.", esCorrecta: false },
                { letra: "C", texto: "El nombre de los funcionarios de la DIAN que quieren cobrar la prima de éxito por la investigación.", esCorrecta: false }
              ],
              explicacion: "La opción A contiene los elementos estructurales de un informe de inteligencia corporativa fiscal. Las otras opciones son irrelevantes o inapropiadas."
            },
            {
              texto: "¿Qué principio rige la valoración de la información exógena reportada por terceros?",
              opciones: [
                { letra: "A", texto: "La Eficacia probatoria y la Imparcialidad, contrastando la información de buena fe pero aplicando el rigor técnico para detectar simulaciones o fraudes.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'Desconfianza Total', asumiendo siempre que todos los ciudadanos son delincuentes sin importar lo que digan las pruebas.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Credulidad', creyendo ciegamente lo que el contador de la empresa dice en su defensa para no tener que revisar papeles.", esCorrecta: false }
              ],
              explicacion: "La opción A equilibra la presunción de inocencia con el deber de control del Estado. Las otras opciones son sesgos antitécnicos."
            }
          ]
        },
        {
          contenido: "Como Gestor de Fiscalización de la DIAN, se le asigna liderar una visita de control (auditoría tributaria) a las instalaciones de un gran contribuyente. El objetivo es verificar el cumplimiento de las obligaciones cambiarias en sus operaciones de comercio exterior. Usted debe preparar la diligencia, revisar los antecedentes en los sistemas de la entidad y proyectar el auto de inspección contable garantizando que no se vulneren los derechos del investigado.",
          categoria: "Procedimiento Tributario y Aduanero", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Qué actuación garantiza el debido proceso antes de iniciar la visita de inspección contable?",
              opciones: [
                { letra: "A", texto: "La notificación formal del Auto de Inspección al representante legal o apoderado, indicando claramente el alcance, los periodos a revisar y los funcionarios comisionados.", esCorrecta: true },
                { letra: "B", texto: "Llegar de sorpresa con la policía, tumbar la puerta de la empresa y llevarse todos los computadores sin decir por qué.", esCorrecta: false },
                { letra: "C", texto: "Mandar un correo electrónico anónimo pidiendo que tengan listos los libros contables para cuando la DIAN decida pasar.", esCorrecta: false }
              ],
              explicacion: "La opción A es el procedimiento de rigor exigido por el Estatuto Tributario para la validez de las pruebas. Las otras opciones generan nulidad procesal."
            },
            {
              texto: "Si durante la visita el contribuyente se niega a exhibir los soportes de las operaciones cambiarias, ¿cuál es su deber técnico?",
              opciones: [
                { letra: "A", texto: "Levantar un acta dejando constancia de la renuencia, lo cual constituye un indicio grave en contra del contribuyente y puede dar lugar a sanciones por no enviar información.", esCorrecta: true },
                { letra: "B", texto: "Pelear a gritos con el gerente de la empresa para demostrarle que la DIAN es la máxima autoridad del país.", esCorrecta: false },
                { letra: "C", texto: "Irse tranquilamente para su casa y cerrar el caso porque el contribuyente no quiso colaborar.", esCorrecta: false }
              ],
              explicacion: "La opción A aplica las sanciones por no enviar información (Art 651 ET) y salvaguarda la actuación del funcionario. Las otras opciones son faltas disciplinarias."
            },
            {
              texto: "¿Qué valor del servidor público de la DIAN se evidencia al ejecutar una auditoría de manera técnica y respetuosa?",
              opciones: [
                { letra: "A", texto: "El Respeto y la Justicia, ejerciendo la autoridad del Estado con firmeza pero sin atropellar los derechos fundamentales del ciudadano.", esCorrecta: true },
                { letra: "B", texto: "La Soberbia, tratando a los empleados de la empresa investigada como si fueran criminales confesos.", esCorrecta: false },
                { letra: "C", texto: "La Complacencia, aceptando regalos costosos durante la visita para 'suavizar' el informe final de auditoría.", esCorrecta: false }
              ],
              explicacion: "La opción A refleja el equilibrio ético de la función de control. Las otras opciones son abusos de autoridad o corrupción."
            }
          ]
        }
      ]
    },
    {
      simoId: "225424", // DIAN - Analista V (Financiero/Presupuesto)
      escenarios: [
        {
          contenido: "Usted es Analista V en la dependencia financiera de la DIAN. Se acerca el cierre de vigencia fiscal y debe revisar el estado de la ejecución del presupuesto. Nota que existen varias obligaciones presupuestales pendientes de pago por contratos de prestación de servicios, pero algunos contratistas no han entregado las planillas de seguridad social requeridas. Usted debe hacer el cruce de información, garantizar el cumplimiento legal para los pagos y proyectar el informe financiero evitando que la entidad incurra en reservas innecesarias o pagos indebidos.",
          categoria: "Gestión Presupuestal / Ejecución", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cuál es el requisito indispensable previo al reconocimiento de una obligación para el pago de un contratista?",
              opciones: [
                { letra: "A", texto: "La certificación de cumplimiento expedida por el supervisor del contrato y la verificación del pago de aportes a seguridad social integral.", esCorrecta: true },
                { letra: "B", texto: "Que el contratista llame a pedir el favor de que le paguen rápido porque necesita el dinero para fin de año.", esCorrecta: false },
                { letra: "C", texto: "Aprobar el pago automáticamente para que la ejecución presupuestal de la DIAN llegue al 100% y se vea muy bien.", esCorrecta: false }
              ],
              explicacion: "La opción A es el cumplimiento normativo exigido por el Estatuto General de Contratación y las leyes de seguridad social. Las otras opciones son faltas disciplinarias y fiscales."
            },
            {
              texto: "Si no se logra subsanar el requisito antes del 31 de diciembre, ¿qué tratamiento presupuestal debe aplicarse al recurso comprometido?",
              opciones: [
                { letra: "A", texto: "Constituir una cuenta por pagar si ya se recibió el servicio a satisfacción, o una reserva presupuestal si el compromiso se adquirió pero el servicio no se ha prestado.", esCorrecta: true },
                { letra: "B", texto: "Repartir el dinero sobrante entre los empleados de la sección financiera como bono navideño.", esCorrecta: false },
                { letra: "C", texto: "Perder el dinero y decirle al contratista que ya no se le va a pagar nada por demorado.", esCorrecta: false }
              ],
              explicacion: "La opción A aplica la normatividad presupuestal colombiana sobre el cierre de vigencias (Estatuto Orgánico del Presupuesto). Las otras opciones son peculado o enriquecimiento sin justa causa del Estado."
            },
            {
              texto: "¿Qué principio de la función financiera se protege al no pagar sin el lleno de requisitos legales?",
              opciones: [
                { letra: "A", texto: "La Legalidad y la Responsabilidad Fiscal, asegurando que los recursos del tesoro público se eroguen estrictamente bajo el marco de la ley.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'Comodidad', para que el analista financiero no tenga que hacer tantas transferencias bancarias en diciembre.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Castigo', para enseñarle a los contratistas quién es el que manda en la DIAN.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la gestión con el cuidado del patrimonio estatal. Las otras opciones son visiones distorsionadas del deber público."
            }
          ]
        },
        {
          contenido: "Como Analista Financiero de la DIAN, usted es el encargado de realizar conciliaciones bancarias y el cruce de información de operaciones recíprocas. Al comparar el saldo de las cuentas de recaudo de impuestos reportado por una entidad bancaria autorizada, con los registros del sistema de información financiera de la DIAN (SIF), nota una diferencia significativa de varios millones de pesos a favor del Estado. Usted debe investigar el origen de la inconsistencia, aplicar ajustes si es necesario y preparar el reporte de conciliación para el ente de control.",
          categoria: "Conciliación Financiera y Contable", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cuál es el procedimiento técnico para abordar una diferencia no justificada en la conciliación bancaria de recaudo?",
              opciones: [
                { letra: "A", texto: "Verificar las partidas conciliatorias (remesas en tránsito, consignaciones no identificadas), requerir al banco los soportes del movimiento y elaborar las notas contables de ajuste correspondientes.", esCorrecta: true },
                { letra: "B", texto: "Ignorar la diferencia porque como es plata a favor del Estado, nadie se va a poner bravo si sobra dinero en la cuenta.", esCorrecta: false },
                { letra: "C", texto: "Mandar ese dinero a la caja menor de la oficina para gastos de papelería sin hacer ningún registro contable.", esCorrecta: false }
              ],
              explicacion: "La opción A es la aplicación rigurosa de las normas de contabilidad pública para la depuración de saldos. Las otras opciones son graves violaciones al régimen contable."
            },
            {
              texto: "En relación con los informes financieros para los entes de control, ¿cuál es su responsabilidad sobre estas conciliaciones?",
              opciones: [
                { letra: "A", texto: "Garantizar que los estados financieros reflejen razonablemente la realidad económica de la entidad, soportando cada cifra con las conciliaciones debidamente firmadas y auditadas.", esCorrecta: true },
                { letra: "B", texto: "Cuadrar las cifras 'a la fuerza' en el Excel para que la Contraloría no haga preguntas molestas durante la auditoría.", esCorrecta: false },
                { letra: "C", texto: "Enviar el reporte vacío y decir que el sistema se cayó y no se pudo hacer la conciliación del mes.", esCorrecta: false }
              ],
              explicacion: "La opción A cumple con los postulados del Régimen de Contabilidad Pública (CGN). Las otras opciones son alteraciones de estados financieros o negligencia."
            },
            {
              texto: "¿Qué valor ético es fundamental en el analista que maneja el cruce de cuentas del recaudo nacional?",
              opciones: [
                { letra: "A", texto: "La Honestidad y la Transparencia, reconociendo que la integridad de las cifras financieras es la base de la confianza pública en la DIAN.", esCorrecta: true },
                { letra: "B", texto: "La Creatividad, inventando números que hagan parecer que la DIAN recaudó el doble de impuestos este año.", esCorrecta: false },
                { letra: "C", texto: "El Miedo, trabajando solo por el pánico a que la Procuraduría lo destituya si se equivoca en una suma.", esCorrecta: false }
              ],
              explicacion: "La opción A vincula el quehacer contable con los fines esenciales del Estado y el Código de Integridad. Las otras opciones son actitudes indeseables."
            }
          ]
        }
      ]
    },
    {
      simoId: "225425", // DIAN - Analista V (Financiero/Presupuesto) - Mismas competencias
      escenarios: [
        {
          contenido: "Usted es Analista V en la DIAN. Tiene a su cargo el seguimiento al Plan Anual Mensualizado de Caja (PAC). Un área misional solicita un pago urgente para un proveedor tecnológico estratégico, pero al revisar el SIF, usted constata que el PAC del mes ya está agotado y que el pago no fue programado con la debida anticipación. Usted debe gestionar la situación, orientar al área sobre el procedimiento de reprogramación y evitar que la entidad incumpla pagos sin violar la normatividad del flujo de caja.",
          categoria: "Gestión de Tesorería / PAC", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Por qué no se puede realizar el pago inmediato si no hay PAC disponible, a pesar de tener el registro presupuestal?",
              opciones: [
                { letra: "A", texto: "Porque el PAC es el instrumento que regula el flujo de pagos (giros) según la disponibilidad real de fondos en el Tesoro Nacional, y los pagos sin PAC violan la legalidad del gasto.", esCorrecta: true },
                { letra: "B", texto: "Porque a los de la sección financiera no les gusta hacer pagos de afán para no estresarse.", esCorrecta: false },
                { letra: "C", texto: "Porque el proveedor tecnológico seguramente puede esperar unos meses más ya que es una empresa multinacional con mucha plata.", esCorrecta: false }
              ],
              explicacion: "La opción A explica técnicamente la función del Plan Anual Mensualizado de Caja. Las otras opciones son excusas sin fundamento legal."
            },
            {
              texto: "Ante la urgencia del pago estratégico, ¿cuál es la acción administrativa procedente?",
              opciones: [
                { letra: "A", texto: "Solicitar una modificación o reprogramación del PAC ante la Dirección General de Crédito Público y Tesoro Nacional, justificando técnicamente la urgencia del giro.", esCorrecta: true },
                { letra: "B", texto: "Sacar la plata de los sueldos de los funcionarios de la DIAN para pagarle al proveedor y luego reponerla el otro mes.", esCorrecta: false },
                { letra: "C", texto: "Girar un cheque sin fondos esperando a que el Ministerio de Hacienda consigne la plata al día siguiente.", esCorrecta: false }
              ],
              explicacion: "La opción A es el trámite legal establecido en el Estatuto Orgánico del Presupuesto. Las otras opciones son prácticas ilegales (peculado, peculado por aplicación oficial diferente)."
            },
            {
              texto: "¿Qué principio rige la programación y ejecución del PAC en una entidad estatal?",
              opciones: [
                { letra: "A", texto: "La Unidad de Caja y la Planeación, garantizando que el Estado pueda cumplir oportunamente sus obligaciones sin generar desequilibrios macroeconómicos.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'El que primero cobra, primero se le paga', entregando el dinero a quien más presione en la oficina.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Sorpresa Presupuestal', donde nadie sabe cuánta plata hay en el banco hasta el momento de hacer el pago.", esCorrecta: false }
              ],
              explicacion: "La opción A corresponde a los principios del sistema presupuestal colombiano. Las otras opciones representan caos administrativo."
            }
          ]
        },
        {
          contenido: "Como Analista Financiero de la DIAN, usted es el responsable de elaborar las declaraciones tributarias de la propia entidad (Retención en la Fuente, IVA retenido, etc.). Al revisar la información consolidada enviada por las direcciones seccionales, detecta que una seccional no reportó las retenciones practicadas por la compra de bienes en un contrato de suministros. Usted debe requerir la corrección, consolidar los datos reales y asegurar la presentación y pago oportuno de los impuestos a cargo de la Nación.",
          categoria: "Obligaciones Tributarias Institucionales", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cuál es el riesgo legal para la entidad si se presenta la declaración de retención en la fuente incompleta?",
              opciones: [
                { letra: "A", texto: "Incurrir en inexactitud, lo que puede generar sanciones tributarias e intereses moratorios, afectando el presupuesto y generando responsabilidad disciplinaria para los funcionarios.", esCorrecta: true },
                { letra: "B", texto: "Ninguno, porque como la DIAN es la misma que cobra los impuestos, la DIAN no se puede multar a sí misma.", esCorrecta: false },
                { letra: "C", texto: "Que el director de la seccional que se equivocó tenga que pagar los impuestos de su propio bolsillo.", esCorrecta: false }
              ],
              explicacion: "La opción A reconoce que el Estado como agente retenedor tiene las mismas obligaciones y sanciones que un particular. La opción B es un error común; las entidades públicas sí son sancionables."
            },
            {
              texto: "Para evitar estas omisiones en el futuro, ¿qué estrategia de mejoramiento continuo debe implementar?",
              opciones: [
                { letra: "A", texto: "Implementar controles cruzados automáticos en el SIF entre la causación de facturas y la generación de comprobantes de retención antes de autorizar las órdenes de pago.", esCorrecta: true },
                { letra: "B", texto: "Quitarle a las seccionales el permiso de comprar cosas para que todo se compre centralizado en Bogotá y sea más fácil sumar.", esCorrecta: false },
                { letra: "C", texto: "Enviar un correo amenazante todos los meses diciendo que van a despedir al que se equivoque en un peso.", esCorrecta: false }
              ],
              explicacion: "La opción A ataca la causa raíz del problema mediante controles de sistema. Las otras opciones son ineficientes o generadoras de mal clima laboral."
            },
            {
              texto: "¿Qué valor del servidor público se destaca al ser riguroso con los impuestos que paga la propia DIAN?",
              opciones: [
                { letra: "A", texto: "La Coherencia y la Integridad, demostrando que la entidad encargada de recaudar impuestos da ejemplo cumpliendo estrictamente con sus propias obligaciones formales.", esCorrecta: true },
                { letra: "B", texto: "La Hipocresía, cobrando duro a los ciudadanos pero perdonando los errores de los compañeros de trabajo.", esCorrecta: false },
                { letra: "C", texto: "La Indiferencia, llenando los formularios de impuestos con cualquier número porque total la plata pasa del bolsillo izquierdo al derecho del Estado.", esCorrecta: false }
              ],
              explicacion: "La opción A refleja el liderazgo moral de la institución. Las otras opciones son actitudes corruptas o irresponsables."
            }
          ]
        }
      ]
    },
    {
      simoId: "225429", // DIAN - Gestor III (Presupuesto/Caja Menor/Conciliaciones)
      escenarios: [
        {
          contenido: "Usted es Gestor III en la Dirección Seccional de la DIAN. Tiene a su cargo el funcionamiento de la caja menor. Identifica que un área misional está pasando facturas para reembolso por conceptos de 'atenciones a visitantes' y 'papelería general' por montos que, sumados mensualmente, fraccionan compras que deberían hacerse por el plan anual de adquisiciones. Usted debe ejercer el control, rechazar los gastos improcedentes y garantizar el cumplimiento normativo sobre el uso de los fondos de caja menor.",
          categoria: "Gestión de Tesorería / Caja Menor", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cuál es la restricción principal legal frente al uso de la caja menor para la compra de papelería general?",
              opciones: [
                { letra: "A", texto: "La caja menor es exclusiva para gastos imprevistos, urgentes y de menor cuantía; no se puede usar para eludir los procesos de contratación del Plan Anual de Adquisiciones.", esCorrecta: true },
                { letra: "B", texto: "Ninguna, la caja menor sirve para comprar cualquier cosa siempre y cuando alcance el billete que está en la gaveta.", esCorrecta: false },
                { letra: "C", texto: "Solo se puede comprar papelería si el vendedor acepta fiar y pasar la factura al final del año.", esCorrecta: false }
              ],
              explicacion: "La opción A define correctamente la naturaleza excepcional y urgente de la caja menor según el Decreto 1068 de 2015. Las otras opciones fomentan el fraccionamiento de contratos."
            },
            {
              texto: "Ante el intento de fraccionamiento de compras a través de caja menor, ¿qué acción técnica y de control debe aplicar?",
              opciones: [
                { letra: "A", texto: "Rechazar los soportes, devolverlos sin reembolso, emitir una circular recordando la reglamentación de austeridad del gasto y reportar el intento de elusión normativa.", esCorrecta: true },
                { letra: "B", texto: "Pagarles los recibos por esta vez, pero pedirles el favor de que no lo vuelvan a hacer para que la Contraloría no se dé cuenta.", esCorrecta: false },
                { letra: "C", texto: "Modificar las facturas con un bolígrafo para que parezcan de otro concepto permitido en la resolución de caja menor.", esCorrecta: false }
              ],
              explicacion: "La opción A ejerce el control previo y protege la legalidad del gasto. Las otras opciones son conductas de complicidad punible y falsedad material."
            },
            {
              texto: "¿Qué principio rige la ejecución eficiente de los gastos de la caja menor?",
              opciones: [
                { letra: "A", texto: "La Economía y la Transparencia, asegurando que solo se gaste en lo estrictamente necesario para garantizar la operación continua de la seccional.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'Gastar todo', porque si no se acaba la plata de la caja menor, el próximo año mandan un presupuesto más bajito.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Ocultamiento', comprando cosas a nombre de otros para que los jefes no sepan en qué se va la plata.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la gestión del fondo con las normas de austeridad del gasto público. Las otras opciones son malas prácticas de la administración pública."
            }
          ]
        },
        {
          contenido: "Como Gestor Financiero III de la DIAN, debe liderar la consolidación del anteproyecto de presupuesto de la Dirección Seccional para la próxima vigencia. Al revisar los requerimientos de las diferentes áreas operativas, nota que las estimaciones de gastos de inversión para renovación tecnológica están desconectadas de las metas estratégicas del nivel central y superan ampliamente el techo presupuestal asignado. Usted debe realizar la concertación, ajustar el anteproyecto a la realidad económica y justificar técnicamente las prioridades de gasto.",
          categoria: "Planeación Financiera / Anteproyecto de Presupuesto", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cuál es el criterio técnico principal para ajustar los requerimientos de inversión de las áreas al elaborar el anteproyecto?",
              opciones: [
                { letra: "A", texto: "La alineación con el Plan Estratégico Institucional, las directrices macroeconómicas del nivel central y la priorización de proyectos misionales sobre los de apoyo.", esCorrecta: true },
                { letra: "B", texto: "Darle más presupuesto a las áreas cuyos jefes son más amigos del Director Seccional para evitar problemas de clima laboral.", esCorrecta: false },
                { letra: "C", texto: "Cortar el presupuesto de todas las áreas a la mitad exactamente, sin importar qué proyectos sean, para ser 'justos' con todos.", esCorrecta: false }
              ],
              explicacion: "La opción A aplica la programación presupuestal basada en resultados y planeación estratégica. Las otras opciones son arbitrarias o antitécnicas."
            },
            {
              texto: "En el proceso de elaboración del anteproyecto de presupuesto de la seccional, ¿cuál es su rol?",
              opciones: [
                { letra: "A", texto: "Consolidar las necesidades, verificar la racionalidad de los costos estimados, armonizar el documento con las cuotas asignadas y defender las partidas prioritarias ante el Nivel Central.", esCorrecta: true },
                { letra: "B", texto: "Copiar el presupuesto del año anterior, sumarle un 10% por la inflación y mandarlo rápido por correo electrónico para cumplir el trámite.", esCorrecta: false },
                { letra: "C", texto: "Inventarse los proyectos de inversión desde su escritorio sin preguntarle a las áreas operativas qué es lo que realmente necesitan.", esCorrecta: false }
              ],
              explicacion: "La opción A es la labor técnica de integración y sustentación presupuestal. Las otras opciones son negligencias de planeación."
            },
            {
              texto: "¿Qué valor del servidor público se destaca al elaborar presupuestos realistas y austeros?",
              opciones: [
                { letra: "A", texto: "La Responsabilidad y la Eficiencia, entendiendo que el presupuesto público es finito y debe dirigirse a donde genere mayor valor público.", esCorrecta: true },
                { letra: "B", texto: "La Avaricia, negando todas las solicitudes de equipos nuevos porque los funcionarios deberían traer sus propios computadores de la casa.", esCorrecta: false },
                { letra: "C", texto: "La Soberbia, creyendo que solo el área financiera sabe cómo se debe gastar la plata en la DIAN.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la labor de presupuestación con la ética del cuidado de lo público. Las otras opciones son actitudes negativas u hostiles."
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
