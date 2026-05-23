import { PrismaClient, TipoPregunta, NivelDificultad } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const dataToInsert: any[] = [
    {
      simoId: "241799", // ATLÁNTICO - Técnico Adm. (Contabilidad)
      escenarios: [
        {
          contenido: "Usted es Técnico Administrativo en la Subsecretaría de Contabilidad de la Gobernación del Atlántico. Debe realizar la conciliación de las cuentas bancarias de la entidad al cierre del mes. Identifica que existen múltiples partidas conciliatorias (sobrantes y faltantes) de hace más de tres meses que no han sido depuradas. Usted debe investigar el origen de los movimientos, realizar los registros contables de ajuste y asegurar que el balance de prueba refleje la realidad financiera del departamento, siguiendo el Régimen de Contabilidad Pública.",
          categoria: "Contabilidad Pública / Conciliaciones", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cuál es el procedimiento técnico para depurar una partida conciliatoria bancaria antigua?",
              opciones: [
                { letra: "A", texto: "Rastrear el documento fuente (nota crédito/débito), verificar si corresponde a un ingreso no identificado o un gasto no registrado, y realizar el ajuste contable con soporte.", esCorrecta: true },
                { letra: "B", texto: "Sumar todos los faltantes y restarlos de los sobrantes para que la cuenta cuadre a la fuerza y el jefe no se dé cuenta del desorden.", esCorrecta: false },
                { letra: "C", texto: "Ignorar las partidas antiguas asumiendo que después de tres meses el banco ya no tiene la obligación de dar explicaciones.", esCorrecta: false }
              ],
              explicacion: "La opción A cumple con los principios de veracidad y oportunidad de la información contable pública. Las otras opciones son negligencias o malas prácticas contables."
            },
            {
              texto: "En cuanto al registro de un ingreso por transferencia electrónica no identificado, ¿cómo debe proceder?",
              opciones: [
                { letra: "A", texto: "Registrarlo provisionalmente como un pasivo (Ingresos Recibidos por Clasificar) y solicitar a la Tesorería la identificación del aportante y el concepto.", esCorrecta: true },
                { letra: "B", texto: "Registrarlo como una ganancia neta para la Gobernación y usar el dinero para pagar las deudas de la oficina.", esCorrecta: false },
                { letra: "C", texto: "Devolver el dinero al banco inmediatamente sin preguntar nada para no tener que hacer más asientos contables.", esCorrecta: false }
              ],
              explicacion: "La opción A aplica el criterio de prudencia y transparencia en la gestión del recaudo. Las otras opciones son manejos irregulares del dinero público."
            },
            {
              texto: "¿Qué valor del servidor público se destaca al mantener la pulcritud en las cuentas contables?",
              opciones: [
                { letra: "A", texto: "La Honestidad y la Diligencia, garantizando que el patrimonio del departamento esté debidamente controlado y reportado.", esCorrecta: true },
                { letra: "B", texto: "La Astucia, logrando que los balances parezcan perfectos aunque la contabilidad esté llena de errores escondidos.", esCorrecta: false },
                { letra: "C", texto: "El Rencor, señalando a los compañeros de Tesorería como los únicos culpables de que las cuentas no cuadren.", esCorrecta: false }
              ],
              explicacion: "La opción A es el pilar del Código de Integridad. Las otras opciones son conductas deshonestas o faltas de trabajo en equipo."
            }
          ]
        },
        {
          contenido: "Como Técnico de Contabilidad en el Atlántico, debe apoyar la elaboración de los informes financieros para la Contaduría General de la Nación (CHIP). Nota que hay una inconsistencia en el reporte de la deuda pública departamental. Usted debe verificar las tablas de amortización, cruzar los datos con la Secretaría de Hacienda y corregir el reporte antes del cierre del término legal para evitar sanciones por parte de los entes de regulación contable.",
          categoria: "Reportes Legales / CHIP", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Por qué es vital la consistencia entre los registros contables y los reportes en el sistema CHIP?",
              opciones: [
                { letra: "A", texto: "Para garantizar la integridad de la información financiera nacional, permitiendo la consolidación del Balance General de la Nación con datos veraces.", esCorrecta: true },
                { letra: "B", texto: "Para que el sistema CHIP no mande correos electrónicos automáticos molestando a los funcionarios a medianoche.", esCorrecta: false },
                { letra: "C", texto: "Para que la Gobernación del Atlántico gane un premio a la entidad con los reportes más bonitos del país.", esCorrecta: false }
              ],
              explicacion: "La opción A define el fin técnico de la información contable para la macroeconomía y el control estatal. Las otras opciones son banales."
            },
            {
              texto: "Ante una inconsistencia en la deuda pública, ¿qué documento técnico debe revisar prioritariamente?",
              opciones: [
                { letra: "A", texto: "Los contratos de empréstito, las actas de desembolso y las certificaciones de saldos emitidas por las entidades financieras acreedoras.", esCorrecta: true },
                { letra: "B", texto: "El horóscopo del Secretario de Hacienda para ver si es un buen día para pagar deudas.", esCorrecta: false },
                { letra: "C", texto: "Lo que el contador anterior dejó anotado en una servilleta antes de pensionarse.", esCorrecta: false }
              ],
              explicacion: "La opción A utiliza fuentes de información objetivas y legales para la verificación contable. Las otras opciones carecen de rigor profesional."
            },
            {
              texto: "¿Qué principio rige la actuación del técnico al reportar información financiera al Estado?",
              opciones: [
                { letra: "A", texto: "La Responsabilidad y la Veracidad, asegurando que los datos reportados coincidan fielmente con la realidad de los libros de contabilidad.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'Ahorro de Tiempo', copiando y pegando los mismos datos del año pasado para terminar rápido el reporte.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Soberbia', asumiendo que si la Contaduría General tiene dudas, el problema es de ellos y no de la Gobernación.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la gestión con los principios constitucionales de la función administrativa. Las otras opciones son negligencias o conductas arrogantes."
            }
          ]
        }
      ]
    },
    {
      simoId: "236653", // DIAN - Analista II (Cobro/Cartera)
      escenarios: [
        {
          contenido: "Usted es Analista II en la DIAN, encargado de adelantar actividades de cobro administrativo coactivo. Debe gestionar una cartera morosa de un contribuyente que adeuda más de 500 millones de pesos por concepto de IVA e Impuesto al Consumo de hace dos años. Usted identifica que el contribuyente tiene bienes inmuebles a su nombre pero está intentando traspasarlos a terceros para evitar el embargo. Usted debe proyectar la medida cautelar de embargo, solicitar el registro de la misma y asegurar que el crédito de la Nación esté debidamente garantizado.",
          categoria: "Cobro Coactivo / Medidas Cautelares", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cuál es el efecto jurídico de inscribir un embargo sobre un bien inmueble en la Oficina de Registro?",
              opciones: [
                { letra: "A", texto: "Saca el bien del comercio, impidiendo su venta o traspaso posterior y garantizando el pago de la obligación tributaria preferente.", esCorrecta: true },
                { letra: "B", texto: "Que la DIAN se convierte inmediatamente en la dueña de la casa y puede ir a vivir allí cuando quiera.", esCorrecta: false },
                { letra: "C", texto: "Ninguno, el propietario puede seguir vendiendo la casa normalmente aunque tenga el sello de embargo de la DIAN.", esCorrecta: false }
              ],
              explicacion: "La opción A refleja el efecto legal de las medidas cautelares en el proceso administrativo de cobro. Las otras opciones son erróneas o absurdas."
            },
            {
              texto: "Ante el intento de insolvencia fraudulenta del deudor, ¿qué acción adicional puede recomendar?",
              opciones: [
                { letra: "A", texto: "Informar al área jurídica para la posible interposición de una acción pauliana o denuncia penal por alzamiento de bienes.", esCorrecta: true },
                { letra: "B", texto: "Pedirle al deudor que por favor sea una buena persona y no venda sus casas para que la DIAN no tenga que demandarlo.", esCorrecta: false },
                { letra: "C", texto: "Aceptar un soborno del contribuyente a cambio de demorar la inscripción del embargo en el registro de instrumentos públicos.", esCorrecta: false }
              ],
              explicacion: "La opción A es la ruta legal para proteger el recaudo ante maniobras fraudulentas. Las otras opciones son ingenuidades o actos de corrupción."
            },
            {
              texto: "¿Qué valor del servidor público se destaca al recuperar recursos millonarios para el Estado?",
              opciones: [
                { letra: "A", texto: "La Justicia y la Integridad, asegurando que quienes tienen la obligación de contribuir lo hagan en igualdad de condiciones legales.", esCorrecta: true },
                { letra: "B", texto: "La Avaricia, disfrutando de quitarle las propiedades a los ciudadanos que se esfuerzan por tener negocios.", esCorrecta: false },
                { letra: "C", texto: "La Cobardía, dejando que el deudor poderoso evada sus impuestos por miedo a recibir amenazas personales.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la gestión de cartera con la ética del recaudo tributario. Las otras opciones son juicios negativos o faltas de carácter."
            }
          ]
        },
        {
          contenido: "Como Analista de Cartera de la DIAN, atiende a un contribuyente que solicita un acuerdo de pago para cancelar sus deudas pendientes en 36 cuotas mensuales. El contribuyente presenta una garantía bancaria, pero al revisarla, nota que la vigencia del seguro es inferior al plazo solicitado para el acuerdo de pago. Usted debe proyectar el requerimiento de ajuste, orientar al usuario sobre los requisitos de las garantías y asegurar que el acuerdo de pago se firme solo con el respaldo total de la deuda más los intereses proyectados.",
          categoria: "Acuerdos de Pago / Garantías", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Qué requisito de vigencia debe cumplir una garantía para respaldar un acuerdo de pago?",
              opciones: [
                { letra: "A", texto: "Debe cubrir la totalidad del plazo otorgado en el acuerdo de pago, más un término adicional (generalmente 3 o 4 meses) para su efectividad.", esCorrecta: true },
                { letra: "B", texto: "Puede ser por solo un mes, asumiendo que el contribuyente va a cumplir su palabra de pagar todo antes de tiempo.", esCorrecta: false },
                { letra: "C", texto: "No necesita vigencia, lo importante es que el papel tenga el logotipo de un banco famoso.", esCorrecta: false }
              ],
              explicacion: "La opción A es el estándar técnico y legal para asegurar que la garantía sea ejecutable en caso de incumplimiento de la última cuota. Las otras opciones son negligencias riesgosas."
            },
            {
              texto: "En cuanto a los intereses en un acuerdo de pago, ¿cómo deben liquidarse?",
              opciones: [
                { letra: "A", texto: "Se deben incluir los intereses de mora generados hasta la fecha del acuerdo y los intereses de financiación proyectados por el plazo otorgado.", esCorrecta: true },
                { letra: "B", texto: "No se deben cobrar intereses para ayudar a que la empresa del contribuyente crezca más rápido y sea más próspera.", esCorrecta: false },
                { letra: "C", texto: "Se cobra un valor al azar que el funcionario considere justo según la cara de buena persona que tenga el contribuyente.", esCorrecta: false }
              ],
              explicacion: "La opción A refleja la obligatoriedad legal de proteger el valor real del crédito tributario. Las otras opciones son ilegales o arbitrarias."
            },
            {
              texto: "¿Qué principio de la función administrativa se cumple al facilitar el pago mediante acuerdos legales?",
              opciones: [
                { letra: "A", texto: "La Eficacia y la Celeridad, buscando el recaudo efectivo de los recursos sin necesidad de llegar a medidas extremas de remate de bienes.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'Favoritismo', dándole plazos largos a los conocidos para que no tengan que pagar sus deudas pronto.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Papeleo Infinito', tratando de que el trámite del acuerdo de pago sea tan difícil que nadie lo logre terminar.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la labor de cartera con los fines de facilitación del cumplimiento voluntario. Las otras opciones son visiones negativas o corruptas."
            }
          ]
        }
      ]
    },
    {
      simoId: "228775", // SENA - Profesional (IT/Sistemas/Soporte)
      escenarios: [
        {
          contenido: "Usted es Profesional en el área de sistemas de un Centro de Formación del SENA. Debe garantizar el funcionamiento de la arquitectura tecnológica para la inscripción masiva de aprendices en zonas con baja conectividad. Identifica que el servidor local está sufriendo ataques de denegación de servicio (DDoS) que impiden la radicación de documentos de los aspirantes. Usted debe activar el plan de contingencia, implementar medidas de mitigación en el firewall y asegurar que la información de los inscritos se respalde correctamente para garantizar el principio de igualdad en el acceso a la formación.",
          categoria: "Seguridad Informática / Gestión de Servicios TIC", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cuál es la acción técnica prioritaria ante un ataque DDoS en curso contra el servidor de inscripciones?",
              opciones: [
                { letra: "A", texto: "Filtrar el tráfico malicioso mediante el bloqueo de IPs agresoras, activar el balanceo de carga y coordinar con el proveedor de internet medidas de mitigación de borde.", esCorrecta: true },
                { letra: "B", texto: "Apagar el servidor y esperar a que los atacantes se aburran de intentar tumbar la página del SENA.", esCorrecta: false },
                { letra: "C", texto: "Llamar a todos los aspirantes por teléfono para que dicten sus datos personales por voz y anotarlos en un cuaderno.", esCorrecta: false }
              ],
              explicacion: "La opción A es el protocolo profesional de respuesta a incidentes de ciberseguridad. Las otras opciones son ineficaces o respuestas manuales imposibles de escalar."
            },
            {
              texto: "En cuanto al respaldo de la información durante la crisis, ¿qué técnica recomienda?",
              opciones: [
                { letra: "A", texto: "Realizar copias de seguridad incrementales en un servidor de contingencia (DRP) ubicado en una red segura y verificar la integridad de los datos.", esCorrecta: true },
                { letra: "B", texto: "Tomarle fotos a la pantalla del computador con el celular como única prueba de quiénes se estaban inscribiendo.", esCorrecta: false },
                { letra: "C", texto: "No hacer nada, confiando en que si los datos se borran, los aspirantes volverán a inscribirse el próximo año por amor al SENA.", esCorrecta: false }
              ],
              explicacion: "La opción A es el procedimiento técnico de aseguramiento de continuidad del negocio. Las otras opciones carecen de rigor y seguridad técnica."
            },
            {
              texto: "¿Qué principio de la función pública se protege al garantizar la estabilidad tecnológica en los procesos de ingreso al SENA?",
              opciones: [
                { letra: "A", texto: "La Igualdad y la Transparencia, asegurando que todos los ciudadanos tengan las mismas oportunidades técnicas de acceder a la educación pública.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'Prestigio Institucional', para que la gente no piense que los ingenieros del SENA no saben de computadores.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Tecnocracia', demostrando que las máquinas son más importantes que los seres humanos en el proceso educativo.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la gestión técnica con los fines democráticos y sociales de la entidad. Las otras opciones son visiones banales o distorsionadas."
            }
          ]
        },
        {
          contenido: "Como Profesional de Sistemas en el SENA, debe evaluar la viabilidad de adquirir nuevas plataformas de aprendizaje virtual (LMS) para el Centro de Formación. Nota que una de las propuestas parece muy económica pero no cumple con los estándares de accesibilidad para personas con discapacidad visual o auditiva. Usted debe emitir el concepto técnico rechazando la opción excluyente, sustentar la necesidad de cumplir con la normativa de inclusión y asegurar que la tecnología sea una herramienta de democratización del conocimiento.",
          categoria: "Arquitectura Tecnológica e Inclusión", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Qué norma técnica de accesibilidad web debe cumplir obligatoriamente una plataforma TIC del Estado colombiano?",
              opciones: [
                { letra: "A", texto: "Los estándares de la Guía de Accesibilidad de Contenidos Web (WCAG) 2.1 nivel AA, según los lineamientos de Gobierno Digital.", esCorrecta: true },
                { letra: "B", texto: "Ninguna, la accesibilidad es un lujo que solo las empresas privadas con mucho dinero pueden darse en sus aplicaciones.", esCorrecta: false },
                { letra: "C", texto: "Solo debe cumplir con tener letras muy grandes y colores llamativos para que se vea bien en celulares viejos.", esCorrecta: false }
              ],
              explicacion: "La opción A es el mandato legal y técnico para garantizar la inclusión digital en Colombia. Las otras opciones son discriminatorias o ignoran la normativa vigente."
            },
            {
              texto: "Al evaluar el impacto de la plataforma sobre los recursos de procesamiento del Centro, ¿qué debe asegurar?",
              opciones: [
                { letra: "A", texto: "Que la solución sea escalable, interoperable y que no genere sobrecargas que comprometan otros servicios críticos de la entidad.", esCorrecta: true },
                { letra: "B", texto: "Que la plataforma sea tan pesada que consuma todo el internet del SENA para demostrar que es un software muy potente.", esCorrecta: false },
                { letra: "C", texto: "Que los servidores se calienten mucho para que funcionen como calefacción durante los días de invierno en la ciudad.", esCorrecta: false }
              ],
              explicacion: "La opción A es el criterio técnico de eficiencia y planeación de infraestructura TI. Las otras opciones son absurdas o irresponsables."
            },
            {
              texto: "¿Qué valor del servidor público se destaca al defender la inclusión tecnológica de personas con discapacidad?",
              opciones: [
                { letra: "A", texto: "La Justicia y el Compromiso con la diversidad, garantizando que el derecho a la educación no tenga barreras digitales.", esCorrecta: true },
                { letra: "B", texto: "La Amistad, queriendo ayudar a una empresa que vende software para personas ciegas solo porque el dueño es su amigo.", esCorrecta: false },
                { letra: "C", texto: "La Indiferencia, aprobando cualquier plataforma para no tener que leer los manuales técnicos de accesibilidad.", esCorrecta: false }
              ],
              explicacion: "La opción A es el pilar de la ética pública incluyente. Las otras opciones son conductas corruptas o negligentes."
            }
          ]
        }
      ]
    },
    {
      simoId: "227979", // TUNJA - Técnico Operativo (SISBEN/TI)
      escenarios: [
        {
          contenido: "Usted es Técnico Operativo en la oficina del SISBEN de la Alcaldía de Tunja. Debe realizar el cargue y sincronización masiva de las encuestas realizadas en campo mediante Dispositivos Móviles de Captura (DMC). Nota que varios archivos de sincronización arrojan errores de georreferenciación, ubicando las encuestas en municipios vecinos. Usted debe identificar la falla técnica en los equipos, depurar la base de datos para evitar registros inconsistentes y asegurar que la focalización de subsidios se realice sobre la población real de la ciudad de Tunja.",
          categoria: "Gestión de Datos SISBEN / TI", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cuál es el riesgo técnico de procesar encuestas del SISBEN con errores de georreferenciación?",
              opciones: [
                { letra: "A", texto: "Afectar la calidad del dato y la correcta focalización del gasto social, asignando puntajes a personas que no residen en la jurisdicción del municipio.", esCorrecta: true },
                { letra: "B", texto: "Que el GPS del dispositivo se confunda y empiece a hablar en otro idioma durante las encuestas futuras.", esCorrecta: false },
                { letra: "C", texto: "Que el Alcalde de Tunja tenga que viajar al municipio vecino a pedir permiso para usar esos datos en su informe.", esCorrecta: false }
              ],
              explicacion: "La opción A identifica el impacto real en la planeación y ejecución de programas sociales. Las otras opciones son visiones banales o absurdas."
            },
            {
              texto: "Ante la falla de los DMC, ¿cuál es su responsabilidad técnica inmediata?",
              opciones: [
                { letra: "A", texto: "Reportar la novedad técnica al DNP, realizar las actualizaciones de software requeridas y verificar la calibración de los sensores GPS de los equipos.", esCorrecta: true },
                { letra: "B", texto: "Golpear los dispositivos contra la mesa para ver si así se acomodan los circuitos internos y vuelven a funcionar bien.", esCorrecta: false },
                { letra: "C", texto: "Pedirle a los encuestadores que ellos mismos dibujen los mapas en un cuaderno para no usar más los equipos electrónicos.", esCorrecta: false }
              ],
              explicacion: "La opción A es el procedimiento técnico profesional de mantenimiento de herramientas de captura. Las otras opciones son vías de hecho o soluciones ineficaces."
            },
            {
              texto: "¿Qué principio rige el manejo de la base de datos del SISBEN para garantizar la transparencia?",
              opciones: [
                { letra: "A", texto: "La Integridad y la Veracidad de la información, asegurando que los subsidios del Estado lleguen a la población más pobre y vulnerable según datos reales.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'Amiguismo', modificando los puntajes de los conocidos para que reciban más ayudas del Gobierno.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Secreto Absoluto', no dejando que nadie sepa cómo se calculan los puntajes para que no haya reclamos ciudadanos.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la gestión técnica con los fines sociales del municipio. Las otras opciones son actos de corrupción o falta de transparencia."
            }
          ]
        },
        {
          contenido: "Como Técnico del SISBEN en Tunja, atiende a un ciudadano que solicita acceso a la base de datos completa de su barrio para 'hacer un estudio social independiente'. El ciudadano afirma que tiene derecho a la información pública. Usted debe negarse a entregar la base de datos protegida, explicar la reserva legal de los datos sensibles de salud y pobreza, y orientarlo sobre cómo solicitar información estadística agregada (no nominal) que no vulnere la privacidad de sus vecinos.",
          categoria: "Protección de Datos Sensibles / Reserva Legal", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Por qué los datos individuales del SISBEN tienen reserva legal?",
              opciones: [
                { letra: "A", texto: "Porque contienen información sensible sobre la intimidad familiar, condiciones socioeconómicas y salud, protegida por la Ley 1581 de 2012 y normas de Habeas Data.", esCorrecta: true },
                { letra: "B", texto: "Porque el Alcalde de Tunja quiere ser el único que sepa quiénes son los pobres del municipio para que nadie más los ayude.", esCorrecta: false },
                { letra: "C", texto: "Porque los servidores de la Alcaldía no tienen suficiente memoria para mandar archivos tan grandes por correo electrónico.", esCorrecta: false }
              ],
              explicacion: "La opción A fundamenta legalmente la protección de la privacidad en bases de datos sociales. Las otras opciones son visiones autoritarias o técnicas erróneas."
            },
            {
              texto: "En cuanto al acceso a la información pública, ¿qué tipo de datos SÍ puede entregar al ciudadano?",
              opciones: [
                { letra: "A", texto: "Datos estadísticos anonimizados y consolidados por sectores, que permitan el análisis social sin identificar a personas naturales específicas.", esCorrecta: true },
                { letra: "B", texto: "La lista completa con nombres, cédulas, direcciones y enfermedades de todos los habitantes del barrio.", esCorrecta: false },
                { letra: "C", texto: "Las claves de acceso al sistema del DNP para que el ciudadano pueda revisar lo que quiera desde su casa.", esCorrecta: false }
              ],
              explicacion: "La opción A garantiza la transparencia sin vulnerar los derechos fundamentales a la intimidad y protección de datos. Las otras opciones son delitos o negligencias graves."
            },
            {
              texto: "¿Qué valor del servidor público se destaca al proteger la privacidad de los datos de la población vulnerable?",
              opciones: [
                { letra: "A", texto: "La Honestidad y la Rectitud, actuando bajo el marco legal de protección de la información ciudadana frente a solicitudes indebidas.", esCorrecta: true },
                { letra: "B", texto: "La Grosería, echando al ciudadano de la oficina por atreverse a pedir información que es secreta.", esCorrecta: false },
                { letra: "C", texto: "La Cobardía, entregando los datos por miedo a que el ciudadano le ponga una tutela por negar la información pública.", esCorrecta: false }
              ],
              explicacion: "La opción A es un pilar del Código de Integridad. Las otras opciones son conductas irrespetuosas o faltas de carácter ético."
            }
          ]
        }
      ]
    },
    {
      simoId: "240660", // NORTE DE SANTANDER - Prof. Universitario (Multidisciplinar/Procesos)
      escenarios: [
        {
          contenido: "Usted es Profesional Universitario en la Gobernación de Norte de Santander. Debe proponer e implantar un nuevo método para el mejoramiento de la prestación de servicios en una dependencia que presenta altos índices de quejas por demora en trámites. Usted debe realizar el diagnóstico de procesos, identificar los cuellos de botella mediante flujogramas y asegurar que la propuesta de mejora se alinee con los objetivos del Plan de Desarrollo Departamental 'Más Oportunidades para Todos'.",
          categoria: "Gestión de Procesos / Mejora Continua", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cuál es la herramienta técnica recomendada para identificar demoras en un proceso administrativo?",
              opciones: [
                { letra: "A", texto: "El mapeo de procesos (flujogramas) con tiempos de respuesta (SLAs) para detectar actividades redundantes o esperas innecesarias.", esCorrecta: true },
                { letra: "B", texto: "Preguntarle a los funcionarios quién de ellos se demora más desayunando para culparlo de que el trámite no avance.", esCorrecta: false },
                { letra: "C", texto: "Eliminar todos los pasos del trámite y decir que ahora todo se resuelve por la 'buena fe' de los ciudadanos sin revisar papeles.", esCorrecta: false }
              ],
              explicacion: "La opción A utiliza metodologías de gestión de calidad y procesos (MIPG). Las otras opciones son criterios subjetivos o irresponsabilidades administrativas."
            },
            {
              texto: "Al implantar la mejora, ¿qué factor es vital para garantizar su sostenibilidad en el tiempo?",
              opciones: [
                { letra: "A", texto: "La capacitación constante de los servidores involucrados, el seguimiento a indicadores de satisfacción y el compromiso de la alta dirección.", esCorrecta: true },
                { letra: "B", texto: "Comprar computadores más caros asumiendo que la tecnología soluciona sola los problemas de organización humana.", esCorrecta: false },
                { letra: "C", texto: "Prohibir a los ciudadanos que pongan quejas para que los indicadores de satisfacción siempre salgan perfectos.", esCorrecta: false }
              ],
              explicacion: "La opción A refleja la gestión del cambio y el enfoque en la calidad del servicio. Las otras opciones son visiones puramente materiales o autoritarias."
            },
            {
              texto: "¿Qué principio de la función pública se destaca al buscar la excelencia en la atención al ciudadano?",
              opciones: [
                { letra: "A", texto: "La Eficacia y la Celeridad, garantizando que el Estado cumpla sus fines con oportunidad y respeto por el tiempo del ciudadano.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'Soberbia Estatal', demostrando que la Gobernación es más inteligente que los ciudadanos que piden servicios.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Economía de Esfuerzo', tratando de trabajar lo menos posible para que el funcionario no se estrese en su jornada.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la gestión con los mandatos constitucionales de servicio público. Las otras opciones son conductas negativas o mediocres."
            }
          ]
        },
        {
          contenido: "Como Profesional en Norte de Santander, debe proyectar un concepto técnico sobre la viabilidad de un proyecto de inversión para la construcción de una placa huella en una vereda afectada por la violencia. Usted debe analizar la coherencia técnica del presupuesto, verificar que cumpla con las normas de diseño vial y asegurar que el proyecto contribuya al cierre de brechas sociales en la región de frontera, reportando cualquier riesgo de inconsistencia en los estudios previos.",
          categoria: "Planeación y Evaluación de Proyectos", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Qué debe verificar prioritariamente en el presupuesto de una obra civil pública?",
              opciones: [
                { letra: "A", texto: "Que los precios unitarios sean los del mercado, que las cantidades de obra estén debidamente justificadas y que existan los estudios técnicos de soporte.", esCorrecta: true },
                { letra: "B", texto: "Que el nombre del contratista sugerido sea el mismo que ganó el año pasado para 'mantener la tradición' en la vereda.", esCorrecta: false },
                { letra: "C", texto: "Que el color del cemento combine con el paisaje natural de la zona para no afectar el equilibrio ecológico del Norte de Santander.", esCorrecta: false }
              ],
              explicacion: "La opción A es la labor técnica de revisión precontractual y financiera para evitar sobrecostos o detrimento. Las otras opciones son actos de corrupción o criterios banales."
            },
            {
              texto: "En cuanto al impacto social del proyecto, ¿qué indicador recomienda para medir el éxito en zona de conflicto?",
              opciones: [
                { letra: "A", texto: "El índice de reducción de tiempos de transporte para productos agrícolas y el aumento en el acceso de los niños a las escuelas rurales.", esCorrecta: true },
                { letra: "B", texto: "Cuántas veces el Gobernador fue mencionado en los discursos de agradecimiento de los líderes de la vereda.", esCorrecta: false },
                { letra: "C", texto: "Cuántos metros de placa huella se construyeron con materiales sobrantes de otras obras para ahorrar dinero.", esCorrecta: false }
              ],
              explicacion: "La opción A utiliza indicadores de impacto social y económico reales vinculados al desarrollo regional. Las otras opciones son culto a la personalidad o ineficiencia técnica."
            },
            {
              texto: "¿Qué valor del servidor público se destaca al emitir conceptos técnicos con honestidad y rigor?",
              opciones: [
                { letra: "A", texto: "La Honestidad y la Diligencia, protegiendo los recursos públicos de posibles ineficiencias o malos manejos en la etapa de planeación.", esCorrecta: true },
                { letra: "B", texto: "La Amistad, aprobando el proyecto rápido para que el ingeniero de la Alcaldía municipal no tenga que trabajar más en los diseños.", esCorrecta: false },
                { letra: "C", texto: "La Indiferencia, firmando el concepto sin leer los estudios previos para terminar rápido de calificar proyectos.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la labor profesional con el Código de Integridad. Las otras opciones son conductas negligentes o complacientes que afectan el erario."
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
