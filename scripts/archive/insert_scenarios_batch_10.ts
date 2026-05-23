import { PrismaClient, TipoPregunta, NivelDificultad } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const dataToInsert: any[] = [
    {
      simoId: "245443", // TOLIMA - Prof. Especializado (Sistemas/IT)
      escenarios: [
        {
          contenido: "Usted es Profesional Especializado en el área de sistemas de la Gobernación del Tolima. Durante el proceso de formulación del Plan Estratégico de Tecnologías de la Información (PETI), identifica que la infraestructura de servidores de la entidad no cuenta con un sistema de redundancia ni con un plan de recuperación ante desastres (DRP) probado. El Secretario Administrativo le solicita definir las especificaciones técnicas para la contratación de un servicio de nube híbrida que garantice la alta disponibilidad de los sistemas críticos de la Gobernación, cumpliendo con los estándares de seguridad de la información del Ministerio TIC.",
          categoria: "Arquitectura TI", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cuál es el componente técnico esencial que debe exigir en la contratación de la nube híbrida para garantizar la continuidad del negocio?",
              opciones: [
                { letra: "A", texto: "Un Acuerdo de Niveles de Servicio (SLA) con disponibilidad superior al 99.9%, junto con protocolos de replicación de datos en tiempo real.", esCorrecta: true },
                { letra: "B", texto: "Que los servidores de la nube tengan luces de colores que parpadeen muy rápido para demostrar que están procesando mucha información.", esCorrecta: false },
                { letra: "C", texto: "Que la empresa proveedora le regale un computador personal a usted para que pueda vigilar el sistema desde su casa los fines de semana.", esCorrecta: false }
              ],
              explicacion: "La opción A es el estándar técnico para la alta disponibilidad en infraestructuras críticas. Las otras opciones son irrelevantes o constituyen una falta a la ética (soborno)."
            },
            {
              texto: "Al diseñar el Plan de Recuperación ante Desastres (DRP), ¿qué métrica debe definir prioritariamente?",
              opciones: [
                { letra: "A", texto: "El RTO (Tiempo de Recuperación Objetivo) y el RPO (Punto de Recuperación Objetivo) para cada sistema de información crítico.", esCorrecta: true },
                { letra: "B", texto: "La cantidad de galletas y café que se necesitan en la sala de crisis mientras los ingenieros arreglan el problema del servidor.", esCorrecta: false },
                { letra: "C", texto: "El número de seguidores que tiene la cuenta de Twitter de la Gobernación para publicar allí que el sistema se cayó.", esCorrecta: false }
              ],
              explicacion: "La opción A son las métricas estándar de la industria (ISO 22301) para medir la capacidad de recuperación de TI. Las otras opciones no tienen rigor técnico."
            },
            {
              texto: "En cuanto a la seguridad de la información, ¿qué política de acceso debe implementar en la nueva plataforma de nube?",
              opciones: [
                { letra: "A", texto: "El modelo de 'Privilegio Mínimo', asegurando que cada usuario solo tenga acceso a los recursos estrictamente necesarios para su función.", esCorrecta: true },
                { letra: "B", texto: "El modelo de 'Confianza Total', entregando la contraseña de administrador a todos los funcionarios para que no tengan que pedir permiso.", esCorrecta: false },
                { letra: "C", texto: "No poner contraseñas, para que el sistema sea más rápido de usar y nadie pierda tiempo recordando claves complicadas.", esCorrecta: false }
              ],
              explicacion: "La opción A es un principio básico de ciberseguridad (ISO 27001). Las otras opciones son vulnerabilidades críticas que comprometen la integridad del Estado."
            }
          ]
        },
        {
          contenido: "Como Profesional de TI en la Gobernación, debe supervisar la ejecución del contrato de mantenimiento preventivo de la plataforma tecnológica. El contratista reporta que varios equipos de red están fallando debido a picos de voltaje en el centro de datos. Usted debe verificar si el sistema de UPS y la planta eléctrica cumplieron su función, proyectar el informe técnico de daños y supervisar que el contratista realice los reemplazos bajo garantía, asegurando que no se afecte la prestación de los servicios digitales al ciudadano.",
          categoria: "Infraestructura TI", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cuál es su deber técnico en la supervisión de los daños por picos de voltaje?",
              opciones: [
                { letra: "A", texto: "Revisar los logs de los equipos, las bitácoras de mantenimiento de la UPS y exigir el informe técnico detallado de la causa raíz de la falla.", esCorrecta: true },
                { letra: "B", texto: "Decirle al contratista que no se preocupe, que la Gobernación tiene mucho dinero para comprar equipos nuevos y que no hay que investigar nada.", esCorrecta: false },
                { letra: "C", texto: "Culpar al clima de Ibagué por los picos de voltaje y archivar el caso sin pedir ninguna reparación o cambio al contratista.", esCorrecta: false }
              ],
              explicacion: "La opción A es la labor técnica de supervisión para proteger el patrimonio público. La B es una negligencia fiscal y la C es una omisión del deber de control."
            },
            {
              texto: "Respecto a la garantía de los equipos, ¿qué debe verificar en el contrato suscrito?",
              opciones: [
                { letra: "A", texto: "Los términos de la garantía técnica, los tiempos de respuesta (SLA) para el reemplazo de partes y las obligaciones de mantenimiento.", esCorrecta: true },
                { letra: "B", texto: "Si el contrato dice que el contratista es amigo del Gobernador, para saber si se le puede exigir que trabaje rápido o no.", esCorrecta: false },
                { letra: "C", texto: "Si la garantía cubre daños causados por ataques de extraterrestres, por si acaso esa fue la causa del pico de voltaje en el centro de datos.", esCorrecta: false }
              ],
              explicacion: "La opción A identifica los elementos contractuales que garantizan la operatividad del servicio. Las otras opciones son criterios irrelevantes o absurdos."
            },
            {
              texto: "¿Qué documento debe suscribir para dejar constancia de que los equipos fueron reparados satisfactoriamente?",
              opciones: [
                { letra: "A", texto: "Un Acta de Recibo a Satisfacción técnica, detallando las pruebas realizadas y el estado final de los componentes intervenidos.", esCorrecta: true },
                { letra: "B", texto: "Una servilleta firmada con un 'OK' por cualquier funcionario que pase por el pasillo del centro de datos en ese momento.", esCorrecta: false },
                { letra: "C", texto: "No firmar nada, para que si los equipos se vuelven a dañar, usted pueda decir que nunca supo que el contratista había ido a arreglarlos.", esCorrecta: false }
              ],
              explicacion: "La opción A es el soporte documental legal y técnico de la ejecución contractual. Las otras opciones son informales o constituyen una falta a la transparencia administrativa."
            }
          ]
        }
      ]
    },
    {
      simoId: "242102", // SOACHA - Prof. Universitario (Educación/Atención Ciudadano)
      escenarios: [
        {
          contenido: "Usted es Profesional Universitario en la Secretaría de Educación de Soacha. Durante el proceso de matrículas, se presenta una avalancha de padres de familia solicitando cupos escolares en instituciones educativas que ya están al límite de su capacidad. Usted debe gestionar la atención a los ciudadanos, aplicar los criterios de priorización (vulnerabilidad, cercanía, hermanos en el colegio) y coordinar con los rectores la búsqueda de alternativas en otras instituciones o la ampliación de coberturas mediante convenios.",
          categoria: "Atención al Ciudadano", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cuál es el criterio técnico legal para asignar los cupos escolares disponibles cuando la demanda supera la oferta?",
              opciones: [
                { letra: "A", texto: "Seguir estrictamente los criterios de priorización del Ministerio de Educación, dando prelación a población víctima, con discapacidad o de menores recursos.", esCorrecta: true },
                { letra: "B", texto: "Darle el cupo a los padres de familia que hablen más fuerte o que amenacen con encadenarse a la puerta de la Secretaría.", esCorrecta: false },
                { letra: "C", texto: "Hacer una subasta y darle el cupo al padre de familia que ofrezca donar más dinero para las fiestas del colegio.", esCorrecta: false }
              ],
              explicacion: "La opción A garantiza el derecho a la educación bajo principios de equidad y legalidad. La B premia la violencia y la C es un acto de corrupción."
            },
            {
              texto: "Ante un padre de familia agresivo que no acepta que su hijo no tenga cupo en el colegio de su preferencia, ¿cómo actúa?",
              opciones: [
                { letra: "A", texto: "Mantener la calma, explicar con claridad los criterios de asignación y ofrecer alternativas reales de cupo en otras instituciones cercanas.", esCorrecta: true },
                { letra: "B", texto: "Decirle que la culpa es de él por no haber hecho el trámite hace seis meses y que ahora se aguante las consecuencias.", esCorrecta: false },
                { letra: "C", texto: "Llamar a los medios de comunicación para que graben al padre gritando y así avergonzarlo públicamente en las noticias locales.", esCorrecta: false }
              ],
              explicacion: "La opción A aplica los protocolos de servicio al ciudadano y resolución de conflictos. La B y la C son comportamientos no profesionales que escalan el conflicto."
            },
            {
              texto: "¿Qué herramienta tecnológica del Ministerio de Educación debe alimentar diariamente para el control de la matrícula?",
              opciones: [
                { letra: "A", texto: "El SIMAT (Sistema de Matrícula Estudiantil), asegurando que cada cupo asignado esté debidamente registrado y validado.", esCorrecta: true },
                { letra: "B", texto: "Un grupo de WhatsApp con todos los rectores de Soacha para mandarles fotos de las carpetas de los alumnos nuevos.", esCorrecta: false },
                { letra: "C", texto: "Una hoja de cálculo personal en su computador que nadie más pueda ver para que no se den cuenta de sus errores.", esCorrecta: false }
              ],
              explicacion: "La opción A es el sistema oficial y obligatorio para la gestión educativa en Colombia. Las otras opciones son informales e insuficientes para el control estatal."
            }
          ]
        },
        {
          contenido: "Como Profesional en Soacha, recibe una Petición, Queja y Reclamo (PQR) masiva de un grupo de docentes que denuncian irregularidades en la entrega de la dotación anual de calzado y vestido de labor. Afirman que los materiales son de mala calidad y no corresponden a sus tallas. Usted debe proyectar la respuesta técnica a la PQR, verificar los términos del contrato de suministro y proponer una jornada de auditoría física para validar las denuncias de los docentes ante el contratista.",
          categoria: "Gestión de PQR", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cuál es el término legal máximo para responder de fondo esta PQR interpuesta por los docentes?",
              opciones: [
                { letra: "A", texto: "Quince (15) días hábiles siguientes a su recepción, según lo establecido en la Ley 1755 de 2015.", esCorrecta: true },
                { letra: "B", texto: "Tres meses, porque los docentes tienen vacaciones y pueden esperar más tiempo que un ciudadano común.", esCorrecta: false },
                { letra: "C", texto: "Toda la vida, si la Secretaría de Educación decide que el tema de los zapatos no es importante para la calidad educativa.", esCorrecta: false }
              ],
              explicacion: "La opción A es el término general para derechos de petición. Las otras opciones vulneran el derecho fundamental de petición y el debido proceso."
            },
            {
              texto: "Al realizar la auditoría física de la dotación, ¿qué aspecto técnico debe verificar prioritariamente?",
              opciones: [
                { letra: "A", texto: "La concordancia entre las especificaciones técnicas contratadas (materiales, resistencia, diseño) y los productos entregados a los docentes.", esCorrecta: true },
                { letra: "B", texto: "Si el color de los zapatos combina con el color de las paredes de los salones de clase de los colegios de Soacha.", esCorrecta: false },
                { letra: "C", texto: "Preguntarles a los docentes si estarían dispuestos a recibir un bono de cine en lugar de los zapatos de labor que les corresponden por ley.", esCorrecta: false }
              ],
              explicacion: "La opción A garantiza el cumplimiento del objeto contractual y la calidad de los bienes públicos. La B es irrelevante y la C es un cambio ilegal de los términos del contrato."
            },
            {
              texto: "En el marco del MIPG, ¿qué valor institucional se protege al dar respuesta oportuna y veraz a esta PQR?",
              opciones: [
                { letra: "A", texto: "La Transparencia y la Justicia, asegurando que los servidores públicos reciban los beneficios legales que les corresponden con dignidad.", esCorrecta: true },
                { letra: "B", texto: "La Velocidad, respondiendo cualquier cosa rápida para que el indicador de cumplimiento de la oficina se vea bien.", esCorrecta: false },
                { letra: "C", texto: "El Secreto, tratando de que los docentes no hablen con la prensa sobre el problema de los zapatos de mala calidad.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la respuesta con los fines del Estado y el buen gobierno. La B y la C son prácticas administrativas mediocres o deshonestas."
            }
          ]
        }
      ]
    },
    {
      simoId: "240779", // NORTE DE SANTANDER - Técnico Operativo (Estudios/Documental)
      escenarios: [
        {
          contenido: "Usted es Técnico Operativo en la Gobernación de Norte de Santander. Se le solicita realizar un estudio estadístico sobre la accidentalidad vial en las carreteras secundarias del departamento durante el último año. Debe recolectar información de la Policía de Tránsito, los hospitales y las concesiones viales, consolidar los datos y presentar un informe técnico que identifique los puntos críticos (puntos negros) para orientar la inversión en señalización y seguridad vial.",
          categoria: "Análisis Estadístico", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Qué técnica estadística es más adecuada para identificar los tramos viales con mayor riesgo de accidentalidad?",
              opciones: [
                { letra: "A", texto: "El cálculo de la frecuencia de accidentes por kilómetro y la severidad de los mismos (heridos/muertos) para priorizar la intervención.", esCorrecta: true },
                { letra: "B", texto: "Contar cuántas vallas publicitarias hay en cada carretera y suponer que donde hay más vallas, la gente se distrae y choca más.", esCorrecta: false },
                { letra: "C", texto: "Preguntarles a los conductores que van rápido por la carretera cuáles son sus curvas favoritas para correr y evitarlas.", esCorrecta: false }
              ],
              explicacion: "La opción A utiliza indicadores reales de seguridad vial. La B es una correlación sin base técnica y la C es un criterio subjetivo irrelevante."
            },
            {
              texto: "Al recolectar datos de diferentes fuentes, ¿qué proceso técnico debe realizar para asegurar la calidad de la información?",
              opciones: [
                { letra: "A", texto: "La depuración y normalización de los datos, eliminando duplicados y asegurando que las variables (fechas, lugares) coincidan.", esCorrecta: true },
                { letra: "B", texto: "Sumar todos los números que encuentre sin importar si son de accidentes, de pacientes o de multas de tránsito, para que la cifra total sea muy grande.", esCorrecta: false },
                { letra: "C", texto: "Elegir solo los datos que hagan quedar bien a la Gobernación y ocultar aquellos donde la accidentalidad haya aumentado este año.", esCorrecta: false }
              ],
              explicacion: "La opción A garantiza el rigor estadístico del estudio. La B es un error técnico básico y la C es una manipulación de información pública contraria a la ética."
            },
            {
              texto: "Respecto a la reserva de la información, ¿cómo debe manejar los nombres de las víctimas de los accidentes en su informe técnico público?",
              opciones: [
                { letra: "A", texto: "Anonimizar los datos personales de las víctimas, presentando solo cifras consolidadas para proteger el derecho a la intimidad (Habeas Data).", esCorrecta: true },
                { letra: "B", texto: "Publicar la lista completa de nombres y fotos de las víctimas para que el informe sea más impactante y la gente tenga miedo de manejar rápido.", esCorrecta: false },
                { letra: "C", texto: "Vender la lista de nombres a las funerarias de la ciudad para que ellas puedan ofrecer sus servicios a las familias de los accidentados.", esCorrecta: false }
              ],
              explicacion: "La opción A cumple con la Ley 1581 de 2012 de protección de datos personales. La B vulnera derechos fundamentales y la C es un uso ilegal de información pública."
            }
          ]
        },
        {
          contenido: "Como Técnico Operativo en la Gobernación, usted es responsable de la organización del archivo de gestión de la Secretaría de Hacienda. Al recibir las cajas con las declaraciones de impuestos municipales de hace 10 años, nota que muchos documentos presentan humedad y grapas oxidadas. Usted debe coordinar la transferencia documental al archivo central, aplicando las TRD, asegurando la correcta foliación y el retiro de elementos metálicos para garantizar la preservación a largo plazo de la historia financiera del departamento.",
          categoria: "Gestión Documental", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Por qué es un requisito técnico retirar las grapas metálicas antes de archivar los documentos?",
              opciones: [
                { letra: "A", texto: "Porque el metal se oxida con el tiempo y mancha el papel, destruyendo la información y dificultando la digitalización futura.", esCorrecta: true },
                { letra: "B", texto: "Porque las grapas metálicas pueden ser usadas como armas secretas por los archivistas que quieran hacer una revolución en la oficina.", esCorrecta: false },
                { letra: "C", texto: "Porque el metal pesa mucho y hace que las cajas de archivo sean imposibles de cargar por los funcionarios del departamento.", esCorrecta: false }
              ],
              explicacion: "La opción A es la razón técnica de conservación documental. Las otras opciones son absurdas o exageradas."
            },
            {
              texto: "En cuanto a la foliación del expediente, ¿cuál es la técnica correcta que debe supervisar?",
              opciones: [
                { letra: "A", texto: "Numerar consecutivamente cada hoja en la esquina superior derecha, con lápiz de mina negra, siguiendo el orden de llegada de los documentos.", esCorrecta: true },
                { letra: "B", texto: "Poner números con un sello de caucho gigante en el centro de la hoja para que nadie pueda borrar la numeración nunca.", esCorrecta: false },
                { letra: "C", texto: "No numerar las hojas, para que si se pierde un documento, nadie se dé cuenta de que el expediente está incompleto.", esCorrecta: false }
              ],
              explicacion: "La opción A sigue el Acuerdo 002 del Archivo General de la Nación. La B puede tapar información importante y la C facilita la pérdida de documentos sin control."
            },
            {
              texto: "¿Qué herramienta técnica debe diligenciar para realizar la transferencia de las cajas al Archivo Central?",
              opciones: [
                { letra: "A", texto: "El Formato Único de Inventario Documental (FUID), detallando el contenido, fechas extremas y cantidad de cada caja.", esCorrecta: true },
                { letra: "B", texto: "Una carta de amor al Archivista Central para que le reciba las cajas rápido sin revisar si el contenido está bien organizado.", esCorrecta: false },
                { letra: "C", texto: "Un dibujo de un mapa del tesoro indicando dónde se dejaron las cajas en el depósito para que alguien las encuentre algún día.", esCorrecta: false }
              ],
              explicacion: "La opción A es el instrumento obligatorio para transferencias documentales. Las otras opciones son informales e inútiles para la gestión técnica."
            }
          ]
        }
      ]
    },
    {
      simoId: "240902", // CÚCUTA - Prof. Universitario (Cobro Coactivo)
      escenarios: [
        {
          contenido: "Usted es Profesional Universitario en el área de Cobro Coactivo de la Alcaldía de Cúcuta. Debe liderar la recuperación de una cartera de más de 2.000 millones de pesos por concepto de multas de tránsito de años anteriores que están próximas a prescribir. Usted debe proyectar las resoluciones que declaran la interrupción de la prescripción, verificar la correcta notificación de los actos y decretar las medidas cautelares (embargo de salarios y vehículos) para asegurar el pago de las multas a favor del municipio.",
          categoria: "Procedimiento de Cobro Coactivo", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cuál es el acto jurídico que interrumpe el término de prescripción de la acción de cobro?",
              opciones: [
                { letra: "A", texto: "La notificación debida del Mandamiento de Pago al deudor, según lo establecido en el Estatuto Tributario.", esCorrecta: true },
                { letra: "B", texto: "Una llamada telefónica del funcionario de cobro diciendo: 'hola, le recordamos que usted nos debe plata'.", esCorrecta: false },
                { letra: "C", texto: "Un pensamiento positivo del Alcalde de Cúcuta deseando que todos los deudores paguen sus multas este mes.", esCorrecta: false }
              ],
              explicacion: "La opción A es el requisito legal para la interrupción de la prescripción. Las otras opciones no tienen validez jurídica."
            },
            {
              texto: "Al embargar un vehículo por multas de tránsito, ¿qué acción técnica ante el RUNT debe realizar?",
              opciones: [
                { letra: "A", texto: "Inscribir la orden de embargo en el sistema RUNT para que figure el gravamen y se impida el traspaso del vehículo a terceros.", esCorrecta: true },
                { letra: "B", texto: "Ir personalmente a pincharle las llantas al carro del deudor para que no pueda manejarlo mientras paga la multa.", esCorrecta: false },
                { letra: "C", texto: "Pintar el carro de color amarillo con un letrero que diga 'Este carro debe multas' para avergonzar al dueño ante la ciudad.", esCorrecta: false }
              ],
              explicacion: "La opción A es la medida legal y técnica de efectividad del embargo. Las otras opciones son vías de hecho ilegales y delictivas."
            },
            {
              texto: "En cuanto al cobro de multas de tránsito, ¿cuál es el término general de prescripción de la acción de cobro?",
              opciones: [
                { letra: "A", texto: "Tres (3) años contados a partir de la ocurrencia de la infracción, salvo que se interrumpa por el mandamiento de pago.", esCorrecta: true },
                { letra: "B", texto: "Cien años, porque el Estado nunca pierde el derecho a cobrar lo que le deben por infracciones de tránsito.", esCorrecta: false },
                { letra: "C", texto: "Diez minutos, si el deudor logra escapar de la vista del agente de tránsito después de cometer la infracción.", esCorrecta: false }
              ],
              explicacion: "La opción A es el término establecido en el Código Nacional de Tránsito (Art. 159). Las otras opciones son erróneas."
            }
          ]
        },
        {
          contenido: "Como Profesional en Cúcuta, debe gestionar la aplicación o devolución de títulos judiciales producto de embargos efectivos que superan el valor de la deuda. Un ciudadano reclama que se le embargaron 10 millones de pesos por una deuda de solo 2 millones. Usted debe proyectar la resolución de terminación del proceso por pago, liquidar las costas procesales e intereses, y realizar el trámite ante el Banco Agrario para la devolución del excedente al ciudadano en el menor tiempo posible.",
          categoria: "Liquidación de Crédito", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cuál es el procedimiento técnico para manejar el excedente de un título judicial de embargo?",
              opciones: [
                { letra: "A", texto: "Aplicar al pago de la deuda (capital e intereses), liquidar las costas y ordenar la devolución del saldo restante mediante resolución motivada.", esCorrecta: true },
                { letra: "B", texto: "Quedarse con el excedente para comprar muebles nuevos para la oficina de cobro coactivo, ya que 'lo que entra a la Alcaldía no se devuelve'.", esCorrecta: false },
                { letra: "C", texto: "Pedirle al ciudadano que le dé el 20% del excedente a usted como comisión por haberle ayudado a que le devuelvan su propia plata.", esCorrecta: false }
              ],
              explicacion: "La opción A es el debido proceso legal y administrativo. La B es un enriquecimiento sin causa del Estado y la C es un delito (concusión)."
            },
            {
              texto: "Al liquidar los intereses de mora de una deuda tributaria en Cúcuta, ¿qué tasa debe aplicar?",
              opciones: [
                { letra: "A", texto: "La tasa de interés moratorio vigente fijada por la Superintendencia Financiera para efectos tributarios (Tasa de usura menos dos puntos).", esCorrecta: true },
                { letra: "B", texto: "La tasa que usted quiera, dependiendo de si el deudor le parece una persona simpática o antipática durante el proceso.", esCorrecta: false },
                { letra: "C", texto: "Cero intereses, para que el deudor no se ponga triste y quiera seguir siendo amigo de la administración municipal.", esCorrecta: false }
              ],
              explicacion: "La opción A es el mandato legal del Estatuto Tributario Nacional y Municipal. Las otras opciones son actuaciones arbitrarias o ilegales."
            },
            {
              texto: "¿Qué importancia tiene la 'Resolución de Terminación y Archivo' en este escenario?",
              opciones: [
                { letra: "A", texto: "Extingue la obligación jurídica, ordena el levantamiento de todas las medidas cautelares y libera al ciudadano de la carga del proceso.", esCorrecta: true },
                { letra: "B", texto: "Es solo un papel para que el funcionario de cobro se divierta escribiendo párrafos largos y complicados que nadie entiende.", esCorrecta: false },
                { letra: "C", texto: "Sirve para que el ciudadano pueda enmarcarla y colgarla en la sala de su casa como trofeo por haber pagado sus impuestos.", esCorrecta: false }
              ],
              explicacion: "La opción A define el efecto jurídico del acto administrativo. Las otras opciones son interpretaciones burlescas o erróneas."
            }
          ]
        }
      ]
    },
    {
      simoId: "241257", // CALDAS - Prof. Especializado (Planeación/Gestión)
      escenarios: [
        {
          contenido: "Usted es Profesional Especializado en la Gobernación de Caldas. Debe liderar la adopción de la política institucional de 'Gestión con Valores para el Resultado' en el marco del MIPG. Identifica que los indicadores de desempeño de la Secretaría de Infraestructura son muy bajos y que hay una falta de cultura de autoevaluación. Usted debe diseñar herramientas de seguimiento proactivo, orientar a los jefes de área en la formulación de planes de acción eficaces y asegurar que la planeación institucional se traduzca en impactos reales para los ciudadanos caldenses.",
          categoria: "Gestión Pública (MIPG)", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Qué herramienta del MIPG recomienda para fomentar la cultura de la autoevaluación en la dependencia?",
              opciones: [
                { letra: "A", texto: "La implementación de tableros de control (Dashboards) con indicadores de avance real y jornadas de rendición de cuentas internas periódicas.", esCorrecta: true },
                { letra: "B", texto: "Instalar cámaras de seguridad en todos los escritorios para vigilar que los funcionarios no se queden dormidos frente al computador.", esCorrecta: false },
                { letra: "C", texto: "Hacer un concurso de dibujo sobre cómo se imaginan los funcionarios una Gobernación perfecta, sin evaluar resultados reales.", esCorrecta: false }
              ],
              explicacion: "La opción A promueve la transparencia y el control orientado a resultados. La B vulnera la privacidad y no evalúa la gestión, y la C es una actividad no técnica."
            },
            {
              texto: "Al diagnosticar los bajos indicadores de Infraestructura, ¿qué factor debe analizar técnicamente?",
              opciones: [
                { letra: "A", texto: "La cadena de valor del proceso, identificando cuellos de botella en la contratación, la ejecución presupuestal o la supervisión técnica.", esCorrecta: true },
                { letra: "B", texto: "Si los ingenieros de la secretaría tienen nombres que rimen con la palabra 'progreso' para ver si eso influye en su éxito laboral.", esCorrecta: false },
                { letra: "C", texto: "Cuántas veces al día los funcionarios van al baño, asumiendo que el tiempo perdido allí es la causa de los retrasos en las obras.", esCorrecta: false }
              ],
              explicacion: "La opción A aplica el enfoque de procesos y gestión pública moderna. Las otras opciones son criterios absurdos sin base técnica."
            },
            {
              texto: "¿Cuál es el objetivo final de modernizar la orientación estratégica del sistema de gestión en Caldas?",
              opciones: [
                { letra: "A", texto: "Lograr que la entidad sea más eficiente, transparente y entregue bienes y servicios de mayor calidad que resuelvan las necesidades de la gente.", esCorrecta: true },
                { letra: "B", texto: "Que la Gobernación de Caldas sea la que tenga el logo más grande y brillante de todos los departamentos de Colombia.", esCorrecta: false },
                { letra: "C", texto: "Poder despedir a todos los funcionarios actuales para contratar solo a los amigos de los nuevos asesores de planeación.", esCorrecta: false }
              ],
              explicacion: "La opción A define el propósito misional del MIPG y la modernización del Estado. Las otras opciones son fines estéticos o políticos indebidos."
            }
          ]
        },
        {
          contenido: "Como Profesional de Planeación en Caldas, debe realizar la etapa precontractual para la contratación de un estudio de factibilidad sobre el 'Tren del Café'. Usted debe definir los términos de referencia, asegurar que el objeto sea claro y técnico, y establecer los criterios de evaluación (calidad y precio) que garanticen la selección del consultor más idóneo. Se enfrenta a presiones para que el estudio se adjudique rápidamente a una firma local sin experiencia, pero con vínculos políticos fuertes en la región.",
          categoria: "Etapa Precontractual", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Qué principio de la contratación estatal debe defender primordialmente ante las presiones políticas?",
              opciones: [
                { letra: "A", texto: "El principio de Selección Objetiva, asegurando que la adjudicación se base solo en criterios técnicos, financieros y de experiencia.", esCorrecta: true },
                { letra: "B", texto: "El principio de Amistad Regional, dándole el contrato a los conocidos del barrio para que la plata se quede en la familia.", esCorrecta: false },
                { letra: "C", texto: "El principio de Velocidad Extrema, contratando a cualquiera que pase por la calle para que el proyecto empiece mañana mismo.", esCorrecta: false }
              ],
              explicacion: "La opción A es el mandato legal de la Ley 80 de 1993 y la Ley 1150 de 2007. Las otras opciones son contrarias a la transparencia y la eficiencia pública."
            },
            {
              texto: "Al redactar los Términos de Referencia, ¿qué elemento es crítico para evitar pleitos futuros con el contratista?",
              opciones: [
                { letra: "A", texto: "La definición clara del alcance, los entregables técnicos detallados, el cronograma y la matriz de riesgos del proyecto.", esCorrecta: true },
                { letra: "B", texto: "Poner muchas palabras difíciles en latín para que el contratista crea que los funcionarios de la Gobernación son muy inteligentes.", esCorrecta: false },
                { letra: "C", texto: "No poner ninguna obligación clara para que el contratista pueda hacer lo que quiera y todos estén felices durante la ejecución.", esCorrecta: false }
              ],
              explicacion: "La opción A garantiza la seguridad jurídica y técnica del contrato. La B es una formalidad inútil y la C es una negligencia contractual grave."
            },
            {
              texto: "En el marco de la planeación, ¿qué documento debe soportar la necesidad del estudio del Tren del Café?",
              opciones: [
                { letra: "A", texto: "El Estudio Previo de Necesidad, Conveniencia y Oportunidad, justificando por qué el proyecto es importante para el departamento.", esCorrecta: true },
                { letra: "B", texto: "Una columna de opinión en el periódico local diciendo que los trenes son muy bonitos y que Caldas debería tener uno.", esCorrecta: false },
                { letra: "C", texto: "Una lista de deseos escrita a mano por los alcaldes de los municipios por donde pasaría el tren, sin ningún sustento técnico.", esCorrecta: false }
              ],
              explicacion: "La opción A es el requisito legal de planeación contractual. Las otras opciones son insuficientes y no tienen validez administrativa."
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
