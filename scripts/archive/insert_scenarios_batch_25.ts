import { PrismaClient, TipoPregunta, NivelDificultad } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const dataToInsert: any[] = [
    {
      simoId: "244248", // UNIDAD ALIMENTOS PARA APRENDER - Prof. Especializado (Financiero/PAE)
      escenarios: [
        {
          contenido: "Usted es Profesional Especializado en la Unidad 'Alimentos para Aprender', encargado de la inspección y vigilancia de los recursos asignados al Programa de Alimentación Escolar (PAE). Debe analizar el informe de ejecución financiera de una Entidad Territorial Certificada (ETC) que reporta gastos administrativos superiores al 20% del total de los recursos, cuando el límite permitido es mucho menor. Usted debe emitir un requerimiento técnico, solicitar la devolución de los recursos mal ejecutados y proponer medidas de monitoreo para evitar el riesgo de desvío de fondos destinados a la ración de los estudiantes.",
          categoria: "Gestión Financiera / Vigilancia PAE", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cuál es el principio rector en el uso de los recursos del PAE por parte de las ETC?",
              opciones: [
                { letra: "A", texto: "El de Destinación Específica y Prioridad, asegurando que el recurso llegue efectivamente a la ración alimentaria del beneficiario focalizado.", esCorrecta: true },
                { letra: "B", texto: "El de 'Libre Disposición', permitiendo que el Alcalde o Gobernador use la plata de la comida de los niños para pagar deudas de la nómina municipal.", esCorrecta: false },
                { letra: "C", texto: "El de 'Ahorro de Emergencia', guardando el dinero en una cuenta de ahorros para ver si gana intereses antes de comprar la comida.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la gestión con los mandatos de la Ley 2042 de 2020 y los lineamientos de la Unidad. Las otras opciones son ilegales o negligentes."
            },
            {
              texto: "Ante el hallazgo de exceso de gastos administrativos, ¿qué acción técnica de control debe aplicar?",
              opciones: [
                { letra: "A", texto: "Diligenciar el informe de auditoría financiera, tipificar el posible incumplimiento de los lineamientos técnicos y trasladar a entes de control si hay detrimento.", esCorrecta: true },
                { letra: "B", texto: "Aceptar el informe así para no tener problemas políticos con la Entidad Territorial que reportó el gasto excesivo.", esCorrecta: false },
                { letra: "C", texto: "Sugerir a la ETC que diga que el dinero se gastó en 'papelería de oro' para que el gasto parezca justificado ante el público.", esCorrecta: false }
              ],
              explicacion: "La opción A cumple con el deber de vigilancia y protección del patrimonio público. Las otras opciones son omisiones o actos de complicidad corrupta."
            },
            {
              texto: "¿Qué valor de la integridad pública es primordial al vigilar los recursos de la alimentación escolar?",
              opciones: [
                { letra: "A", texto: "La Justicia y el Compromiso con la infancia, garantizando que el derecho fundamental a la alimentación no sea vulnerado por la mala gestión.", esCorrecta: true },
                { letra: "B", texto: "La Indiferencia, asumiendo que si los niños no comen bien es culpa exclusiva de la Alcaldía local y no de la Unidad Nacional.", esCorrecta: false },
                { letra: "C", texto: "La Vanidad, queriendo ser el funcionario que más ETCs sancione en el año para ganar un bono de desempeño.", esCorrecta: false }
              ],
              explicacion: "La opción A es el pilar ético de la función pública con impacto social. Las otras opciones son posturas negativas o distorsionadas."
            }
          ]
        },
        {
          contenido: "Como Profesional de la Unidad de Alimentos, debe brindar asistencia técnica financiera a una ETC para mejorar la calidad del dato en el sistema de información. Nota que la ETC tiene dificultades para cruzar la información de las facturas de los operadores con los registros de entrega diaria en las escuelas. Usted debe proponer una metodología de conciliación, capacitar al equipo local en el uso de herramientas de monitoreo y asegurar que los pagos se realicen solo sobre raciones efectivamente entregadas y verificadas.",
          categoria: "Asistencia Técnica / Calidad del Dato", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cuál es el insumo técnico fundamental para autorizar el pago a un operador del PAE?",
              opciones: [
                { letra: "A", texto: "La certificación de raciones entregadas, avalada por el rector de la institución y el comité de alimentación escolar (CAE) respectivo.", esCorrecta: true },
                { letra: "B", texto: "La promesa verbal del operador de que ya le dio de comer a todos los niños de la vereda.", esCorrecta: false },
                { letra: "C", texto: "Una foto borrosa de un plato de sopa que el operador mandó por WhatsApp al supervisor de la Alcaldía.", esCorrecta: false }
              ],
              explicacion: "La opción A utiliza los mecanismos de control social y administrativo establecidos en los lineamientos técnicos del PAE. Las otras opciones carecen de validez probatoria."
            },
            {
              texto: "En cuanto al riesgo de 'pagar dos veces por lo mismo', ¿qué control financiero debe sugerir?",
              opciones: [
                { letra: "A", texto: "El cruce automático de beneficiarios mediante el SIMAT (matrícula oficial) para asegurar que no se cobren raciones por estudiantes inexistentes.", esCorrecta: true },
                { letra: "B", texto: "Pagarle al operador lo que pida y luego pedirle que devuelva el cambio si sobra algo de dinero a fin de año.", esCorrecta: false },
                { letra: "C", texto: "Contar a los niños a ojo desde la puerta del colegio y multiplicar por el valor de la ración según el humor del día.", esCorrecta: false }
              ],
              explicacion: "La opción A integra los sistemas de información educativa para garantizar la eficiencia del gasto. Las otras opciones son negligencias riesgosas."
            },
            {
              texto: "¿Qué principio rige la labor de asistencia técnica del servidor nacional hacia el territorio?",
              opciones: [
                { letra: "A", texto: "La Coordinación y Subsidiariedad, fortaleciendo las capacidades locales para lograr una gestión transparente y eficiente del programa.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'Superioridad Jerárquica', tratando a los funcionarios locales como si fueran empleados de menor categoría.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Dar y Olvidar', entregando los manuales de funciones y no volviendo a contestar el teléfono a la ETC.", esCorrecta: false }
              ],
              explicacion: "La opción A refleja el espíritu de la descentralización y la colaboración armónica entre niveles de gobierno. Las otras opciones son conductas arrogantes o negligentes."
            }
          ]
        }
      ]
    },
    {
      simoId: "241447", // NORTE DE SANTANDER - Prof. Univ. (Salud/SIG)
      escenarios: [
        {
          contenido: "Usted es Profesional Universitario en el Instituto Departamental de Salud de Norte de Santander. Debe apoyar la implementación y seguimiento del Sistema Integrado de Gestión (SIG) en el área de atención en salud. Identifica que los indicadores de oportunidad en la entrega de medicamentos de alto costo no están siendo reportados correctamente por las IPS de la red pública. Usted debe realizar el monitoreo de la información, proponer ajustes al proceso de captura de datos y asegurar que el Instituto cuente con información fidedigna para la toma de decisiones estratégicas en salud.",
          categoria: "Sistemas de Gestión / Salud Pública", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cuál es la finalidad técnica del Sistema Integrado de Gestión (SIG) en una entidad de salud pública?",
              opciones: [
                { letra: "A", texto: "Asegurar la calidad, eficiencia y mejora continua de los procesos misionales y de apoyo para satisfacer las necesidades de salud de la población.", esCorrecta: true },
                { letra: "B", texto: "Llenar las paredes de la oficina con cuadros y certificados bonitos para que la gente piense que el Instituto es muy moderno.", esCorrecta: false },
                { letra: "C", texto: "Lograr que los funcionarios tengan que llenar el doble de papeles todos los días para justificar su salario.", esCorrecta: false }
              ],
              explicacion: "La opción A define el propósito técnico del SIG bajo el marco del MIPG y las normas ISO aplicadas al sector público. Las otras opciones son visiones banales o negativas."
            },
            {
              texto: "Ante el reporte incorrecto de indicadores por parte de las IPS, ¿qué acción técnica de seguimiento debe tomar?",
              opciones: [
                { letra: "A", texto: "Realizar auditorías de calidad del dato, verificar los soportes físicos de entrega y capacitar a las IPS en el correcto cargue de la información.", esCorrecta: true },
                { letra: "B", texto: "Inventarse los números de los indicadores para que el informe mensual del Director de Salud no se vea vacío.", esCorrecta: false },
                { letra: "C", texto: "No decir nada y esperar a que los pacientes se quejen en la radio para saber si les entregaron los medicamentos o no.", esCorrecta: false }
              ],
              explicacion: "La opción A cumple con las funciones de inspección, vigilancia y control (IVC) del Instituto Departamental. Las otras opciones son actos de deshonestidad o negligencia."
            },
            {
              texto: "¿Qué valor del servidor público se destaca al asegurar que la información en salud sea veraz?",
              opciones: [
                { letra: "A", texto: "La Honestidad y la Rectitud, reconociendo que los datos falsos en salud pueden costar vidas al ocultar fallas en el servicio.", esCorrecta: true },
                { letra: "B", texto: "La Vanidad, queriendo demostrar que es el funcionario que mejor sabe usar las tablas dinámicas de Excel en todo el Instituto.", esCorrecta: false },
                { letra: "C", texto: "La Indiferencia, cumpliendo con mandar el correo electrónico del reporte sin importar si los datos que van dentro son ciertos.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la gestión con la ética pública y el derecho a la salud. Las otras opciones son conductas arrogantes o irresponsables."
            }
          ]
        },
        {
          contenido: "Como Profesional del Instituto de Salud, debe apoyar el análisis de la situación patrimonial y de resultados de la entidad. Nota que existe una diferencia significativa entre los saldos reportados por el área de facturación y los registros del área contable respecto a los recobros ante el ADRES. Usted debe coordinar una mesa técnica de conciliación, identificar las facturas sin soporte y proyectar el informe de ajustes para sanear la cartera institucional.",
          categoria: "Gestión Financiera en Salud / Conciliación", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Por qué es crítica la conciliación entre facturación y contabilidad en una entidad de salud?",
              opciones: [
                { letra: "A", texto: "Para garantizar la razonabilidad de los estados financieros y asegurar que se reconozcan todos los derechos de cobro por servicios prestados.", esCorrecta: true },
                { letra: "B", texto: "Para que los contadores y los facturadores dejen de pelearse en los pasillos de la entidad por culpa de las cifras.", esCorrecta: false },
                { letra: "C", texto: "Para que el ADRES piense que el Instituto de Salud es una entidad muy rica y ya no le mande más recursos nacionales.", esCorrecta: false }
              ],
              explicacion: "La opción A refleja el cumplimiento de las normas contables y la protección del flujo de caja institucional. Las otras opciones son banales o erróneas."
            },
            {
              texto: "En cuanto al saneamiento de cartera, ¿qué acción técnica es prioritaria?",
              opciones: [
                { letra: "A", texto: "Identificar la antigüedad de las cuentas, depurar las glosas aceptadas y gestionar el cobro de las facturas radicadas ante los pagadores del sistema.", esCorrecta: true },
                { letra: "B", texto: "Borrar de la contabilidad todas las deudas que tengan más de un año para que el balance se vea 'limpio' de deudas.", esCorrecta: false },
                { letra: "C", texto: "Pedirle al ADRES que mande un cheque en blanco para que el Instituto lo llene con el valor que considere justo.", esCorrecta: false }
              ],
              explicacion: "La opción A sigue el procedimiento técnico legal de gestión de cartera en el sector salud. Las otras opciones son negligencias ilegales o imposibles."
            },
            {
              texto: "¿Qué principio rige la gestión de los recursos financieros en el sector salud público?",
              opciones: [
                { letra: "A", texto: "La Eficiencia y la Transparencia, asegurando que cada peso se registre y se use para garantizar la prestación de servicios a la población.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'Aprovechar el Momento', gastándose el dinero del presupuesto en una fiesta de fin de año antes de que se acabe la vigencia.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Especulación', guardando el dinero de la salud en criptomonedas para ver si el Instituto se vuelve millonario rápido.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la gestión con los fines del Estado y la moralidad administrativa. Las otras opciones son actos de corrupción o irresponsabilidad extrema."
            }
          ]
        }
      ]
    },
    {
      simoId: "241050", // BOLÍVAR - Técnico Operativo (Informes/Soporte)
      escenarios: [
        {
          contenido: "Usted es Técnico Operativo en la Gobernación de Bolívar. Su superior le solicita que recopile información de todas las dependencias para preparar una respuesta urgente a un requerimiento de la Contraloría General de la República sobre la ejecución del plan de adquisiciones. Usted nota que varias oficinas no han entregado sus reportes a tiempo y que la información que envían no coincide con los registros del almacén. Usted debe gestionar la recolección, verificar la exactitud de los datos y preparar el informe consolidado sistematizadamente para cumplir con el término legal establecido.",
          categoria: "Gestión de Informes / Control", dificultad: "BASICO",
          preguntas: [
            {
              texto: "¿Cuál es su responsabilidad técnica ante el incumplimiento de las otras dependencias en la entrega de datos?",
              opciones: [
                { letra: "A", texto: "Informar por escrito el retraso al superior jerárquico, insistir formalmente a las dependencias y dejar constancia de la gestión realizada para salvaguardar su responsabilidad.", esCorrecta: true },
                { letra: "B", texto: "Inventarse los datos de las oficinas que no entregaron nada para que el informe a la Contraloría salga completo.", esCorrecta: false },
                { letra: "C", texto: "No decir nada y esperar a que la Contraloría multe al Gobernador para que así todos aprendan a ser más puntuales.", esCorrecta: false }
              ],
              explicacion: "La opción A cumple con los deberes de diligencia y transparencia del servidor público. Las otras opciones son actos deshonestos o negligentes."
            },
            {
              texto: "Al consolidar la información, ¿qué técnica asegura la exactitud de los datos?",
              opciones: [
                { letra: "A", texto: "El cruce de información (triangulación) entre los reportes de las dependencias, las órdenes de compra y los registros de entrada al almacén.", esCorrecta: true },
                { letra: "B", texto: "Sumar todos los números y redondearlos hacia arriba para que la Gobernación parezca que compró muchas cosas.", esCorrecta: false },
                { letra: "C", texto: "Copiar los datos del informe del año pasado cambiando solo la fecha y los nombres de los proveedores.", esCorrecta: false }
              ],
              explicacion: "La opción A es el procedimiento técnico de verificación administrativa. Las otras opciones son negligencias o fraudes documentales."
            },
            {
              texto: "¿Qué valor de la integridad se destaca al cumplir con los términos de los entes de control?",
              opciones: [
                { letra: "A", texto: "La Diligencia y el Respeto, reconociendo la importancia de la rendición de cuentas en un Estado democrático.", esCorrecta: true },
                { letra: "B", texto: "El Miedo, trabajando solo para que los auditores de la Contraloría no le pongan una sanción personal.", esCorrecta: false },
                { letra: "C", texto: "La Indiferencia, entregando el informe incompleto porque total 'nadie lee esos reportes tan largos'.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la labor con el Código de Integridad. Las otras opciones son sentimientos o posturas negativas del servidor público."
            }
          ]
        },
        {
          contenido: "Como Técnico Operativo en Bolívar, debe organizar el sistema de archivo y correspondencia enviada por correo certificado de su dependencia. Nota que hay varios envíos devueltos por la empresa de mensajería porque la dirección era incorrecta o el destinatario ya no vive allí. Usted debe sistematizar estas devoluciones, actualizar la base de datos de contactos y asegurar que los envíos se realicen nuevamente de manera efectiva para garantizar el derecho de petición y notificación de los ciudadanos.",
          categoria: "Gestión de Correspondencia / Notificaciones", dificultad: "BASICO",
          preguntas: [
            {
              texto: "¿Por qué es vital registrar sistemáticamente las devoluciones de correo certificado?",
              opciones: [
                { letra: "A", texto: "Para tener la prueba legal del intento de notificación, identificar errores en la base de datos y evitar que se venzan los términos procesales.", esCorrecta: true },
                { letra: "B", texto: "Para poder pelear con la empresa de mensajería y pedirles que devuelvan el dinero del envío fallido.", esCorrecta: false },
                { letra: "C", texto: "Para usar los sobres devueltos como papel de reciclaje en la oficina y así ahorrar presupuesto de papelería.", esCorrecta: false }
              ],
              explicacion: "La opción A fundamenta la seguridad jurídica en las actuaciones administrativas. Las otras opciones son visiones banales o usos indebidos de bienes públicos."
            },
            {
              texto: "Ante una dirección incorrecta, ¿cuál es el procedimiento administrativo a seguir?",
              opciones: [
                { letra: "A", texto: "Verificar en otras bases de datos oficiales (RUT, Sisbén, etc.) la dirección correcta y realizar el reenvío o proceder con la notificación por aviso si persiste el error.", esCorrecta: true },
                { letra: "B", texto: "Botar la carta a la basura asumiendo que si el ciudadano no vive allí es porque no quiere ser notificado de nada.", esCorrecta: false },
                { letra: "C", texto: "Mandar a un funcionario de la Gobernación a pie a buscar la casa por toda la ciudad de Cartagena hasta que la encuentre.", esCorrecta: false }
              ],
              explicacion: "La opción A cumple con el debido proceso y el deber de diligencia en la notificación de actos administrativos. Las otras opciones son negligencias o soluciones ineficientes."
            },
            {
              texto: "¿Qué principio rige la gestión eficiente de la correspondencia oficial?",
              opciones: [
                { letra: "A", texto: "La Eficacia y la Celeridad, asegurando que las comunicaciones del Estado lleguen a su destino con oportunidad y legalidad.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'Gasto Inútil', mandando cartas a direcciones viejas sabiendo que nunca van a llegar a su destino.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Comodidad', esperando a que el ciudadano venga a la oficina a preguntar por su carta en lugar de enviársela.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la gestión técnica con los fines de la administración pública. Las otras opciones son negligencias o conductas ineficientes."
            }
          ]
        }
      ]
    },
    {
      simoId: "245456", // TOLIMA - Prof. Univ. (Sistemas/TIC Educación)
      escenarios: [
        {
          contenido: "Usted es Profesional Universitario en la Dirección de TIC de la Secretaría de Educación del Tolima. Debe planear la arquitectura tecnológica para el sistema de información misional que gestiona las notas de los estudiantes de todo el departamento. Identifica que la base de datos actual tiene vulnerabilidades críticas que podrían permitir la alteración de calificaciones por parte de usuarios externos. Usted debe diseñar los controles de acceso, implementar la trazabilidad de auditoría (logs) y asegurar que el sistema sea íntegro y confiable para la comunidad educativa.",
          categoria: "Seguridad de la Información / Sistemas Misionales", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cuál es la medida técnica más efectiva para garantizar la integridad de los datos en el sistema de notas?",
              opciones: [
                { letra: "A", texto: "Implementar autenticación de doble factor, cifrado de datos en reposo y registros de auditoría (logs) que identifiquen quién, cuándo y qué cambió en el sistema.", esCorrecta: true },
                { letra: "B", texto: "Cambiar la contraseña del administrador todos los años y ponerle el nombre de la mascota del Secretario de Educación.", esCorrecta: false },
                { letra: "C", texto: "Pedirle a los profesores que anoten las notas con lapicero rojo en un cuaderno para comparar después con el sistema.", esCorrecta: false }
              ],
              explicacion: "La opción A sigue los estándares internacionales de seguridad informática (ISO 27001) y los lineamientos de MinTIC. Las otras opciones son medidas débiles o manuales."
            },
            {
              texto: "Ante una alteración de datos detectada, ¿cuál es su responsabilidad profesional?",
              opciones: [
                { letra: "A", texto: "Identificar el origen del acceso no autorizado, restaurar el respaldo de datos íntegro, cerrar la vulnerabilidad y reportar el incidente de seguridad.", esCorrecta: true },
                { letra: "B", texto: "Borrar todo el sistema para que nadie sepa que hubo un error y decir que el servidor se quemó por un rayo.", esCorrecta: false },
                { letra: "C", texto: "Llamar al estudiante que cambió sus notas para pedirle que le enseñe a usted cómo lo hizo para mejorar su nivel técnico.", esCorrecta: false }
              ],
              explicacion: "La opción A es el protocolo técnico de respuesta a incidentes. Las otras opciones son negligencias graves o conductas deshonestas."
            },
            {
              texto: "¿Qué principio de la función pública se protege al asegurar los sistemas de información educativa?",
              opciones: [
                { letra: "A", texto: "La Veracidad y la Transparencia, garantizando que el mérito académico sea real y que los registros oficiales del Estado sean confiables.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'Control Total', queriendo vigilar cada movimiento de los profesores para que no hablen mal de la Gobernación.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Prestigio Tecnológico', para que el Tolima gane un concurso de la Gobernación con más computadores seguros.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la gestión técnica con los fines superiores del Estado y la moralidad pública. Las otras opciones son visiones distorsionadas o banales."
            }
          ]
        },
        {
          contenido: "Como Profesional de TIC en Educación del Tolima, apoya la formulación de un proyecto para dotar de internet satelital a las escuelas rurales más apartadas. Al revisar las especificaciones técnicas, nota que la empresa proveedora sugiere equipos que no son compatibles con la topografía montañosa del departamento, lo que causaría caídas constantes del servicio. Usted debe objetar las especificaciones, sugerir la tecnología adecuada (ej. microondas o satelital de baja órbita) y asegurar que la inversión pública logre la conectividad efectiva de los niños.",
          categoria: "Infraestructura TIC / Proyectos de Inversión", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Qué factor técnico es primordial al evaluar una solución de conectividad en zonas rurales montañosas?",
              opciones: [
                { letra: "A", texto: "El análisis de línea de vista, la atenuación por condiciones climáticas y la latencia del servicio según el tipo de órbita satelital.", esCorrecta: true },
                { letra: "B", texto: "Que el router de internet tenga luces de colores muy llamativas para que los niños piensen que es un juguete tecnológico.", esCorrecta: false },
                { letra: "C", texto: "Que la empresa proveedora sea la misma que le instaló el internet al Alcalde del municipio en su finca.", esCorrecta: false }
              ],
              explicacion: "La opción A utiliza criterios de ingeniería de telecomunicaciones para asegurar la viabilidad del proyecto. Las otras opciones carecen de rigor técnico."
            },
            {
              texto: "Ante especificaciones técnicas insuficientes en una licitación, ¿cuál es su deber?",
              opciones: [
                { letra: "A", texto: "Emitir un concepto técnico motivado solicitando el ajuste de los pliegos para garantizar que la solución contratada cumpla con el fin social esperado.", esCorrecta: true },
                { letra: "B", texto: "Dejar que el proceso siga así para no retrasar la ejecución del presupuesto y que el jefe no se moleste por las observaciones técnicas.", esCorrecta: false },
                { letra: "C", texto: "Pedirle a la empresa proveedora que le regale un computador para su casa a cambio de aprobar sus equipos viejos.", esCorrecta: false }
              ],
              explicacion: "La opción A protege la eficiencia del gasto público y el cumplimiento de los objetivos institucionales. Las otras opciones son negligencias o actos de corrupción."
            },
            {
              texto: "¿Qué valor del servidor público se destaca al defender la calidad técnica en proyectos para el campo?",
              opciones: [
                { letra: "A", texto: "La Justicia y el Compromiso con la equidad rural, asegurando que los niños del campo reciban una tecnología de igual calidad que los de la ciudad.", esCorrecta: true },
                { letra: "B", texto: "La Soberbia, demostrando que los ingenieros de la Gobernación saben más que los ingenieros de las empresas privadas de Bogotá.", esCorrecta: false },
                { letra: "C", texto: "La Indiferencia, asumiendo que 'con cualquier cosita de internet que les den a los campesinos ellos ya quedan contentos'.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la labor profesional con el propósito social del Estado. Las otras opciones son conductas arrogantes o discriminatorias."
            }
          ]
        }
      ]
    },
    {
      simoId: "241772", // ATLÁNTICO - Prof. Especializado (Logística/Almacén/Vehículos)
      escenarios: [
        {
          contenido: "Usted es Profesional Especializado en la Secretaría General de la Gobernación del Atlántico, encargado de la gestión del parque automotor y el almacén. Debe consolidar el Plan Anual de Adquisiciones de suministros de oficina para toda la entidad. Identifica que varias dependencias han solicitado cantidades de papel y tóners que superan en un 300% su consumo histórico sin justificación técnica. Usted debe revisar las solicitudes, ajustar las cantidades basándose en la política de cero papel y asegurar que las compras se realicen bajo principios de economía y sostenibilidad ambiental.",
          categoria: "Gestión de Suministros / Plan de Adquisiciones", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cuál es el objetivo primordial del Plan Anual de Adquisiciones en una entidad pública?",
              opciones: [
                { letra: "A", texto: "Permitir la planeación de las compras, garantizar la transparencia y buscar economías de escala mediante la agregación de demanda.", esCorrecta: true },
                { letra: "B", texto: "Tener una lista de compras para que los funcionarios puedan pedir regalos caros con presupuesto del departamento.", esCorrecta: false },
                { letra: "C", texto: "Hacer que los proveedores se desesperen esperando a que la Gobernación decida qué va a comprar este año.", esCorrecta: false }
              ],
              explicacion: "La opción A define el fin técnico de la planeación contractual según el Decreto 1082 de 2015. Las otras opciones son visiones banales o negativas."
            },
            {
              texto: "Ante solicitudes excesivas de suministros, ¿qué acción administrativa debe tomar?",
              opciones: [
                { letra: "A", texto: "Solicitar la justificación técnica de la necesidad, cruzar con el inventario actual y proponer el ajuste según el consumo real y las metas de eficiencia.", esCorrecta: true },
                { letra: "B", texto: "Aprobar todo lo que pidan para que los otros secretarios de despacho no se pongan bravos con el área de logística.", esCorrecta: false },
                { letra: "C", texto: "Comprar el doble de lo solicitado para que sobre mucho material y se pueda regalar a los amigos al final del año.", esCorrecta: false }
              ],
              explicacion: "La opción A cumple con los deberes de control y protección del erario público. Las otras opciones son negligencias o actos de corrupción."
            },
            {
              texto: "¿Qué principio de la función pública se cumple al implementar la política de 'Cero Papel' en las adquisiciones?",
              opciones: [
                { letra: "A", texto: "La Eficacia y la Responsabilidad Ambiental, optimizando el uso de recursos y modernizando la gestión mediante medios electrónicos.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'Tacañería Estatal', tratando de que los funcionarios no tengan ni donde escribir para ahorrar unos centavos.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Incomodidad', obligando a todo el mundo a usar computadores aunque prefieran usar papel y lápiz.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la gestión logística con los lineamientos nacionales de gobierno digital y sostenibilidad. Las otras opciones son visiones negativas de la eficiencia."
            }
          ]
        },
        {
          contenido: "Como Profesional encargado de vehículos en el Atlántico, recibe un reporte de un accidente de tránsito de una camioneta oficial asignada a un esquema de seguridad. El conductor informa que el vehículo sufrió daños graves pero no hubo heridos. Usted debe verificar si el vehículo tiene el SOAT y el seguro de daños vigente, coordinar el reporte a la aseguradora, iniciar la investigación administrativa interna para deslindar responsabilidades y asegurar que la entidad reciba la indemnización correspondiente para no afectar el patrimonio público.",
          categoria: "Gestión de Activos / Seguros y Siniestros", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cuál es el paso crítico para asegurar que la aseguradora cubra el siniestro del vehículo oficial?",
              opciones: [
                { letra: "A", texto: "Realizar el reporte inmediato, aportar el croquis de tránsito y asegurar que el conductor cumpla con los requisitos legales (licencia vigente, no alcohol).", esCorrecta: true },
                { letra: "B", texto: "Llevar la camioneta a un taller clandestino para que la arreglen rápido antes de que el Gobernador se dé cuenta del choque.", esCorrecta: false },
                { letra: "C", texto: "Decirle a la aseguradora que el choque ocurrió hace tres meses para ver si todavía se acuerdan de pagar la póliza.", esCorrecta: false }
              ],
              explicacion: "La opción A es el procedimiento técnico legal para la reclamación de siniestros. Las otras opciones son negligencias o fraudes que anulan la cobertura del seguro."
            },
            {
              texto: "En cuanto a la responsabilidad del conductor, ¿qué proceso administrativo debe surtirse?",
              opciones: [
                { letra: "A", texto: "Un proceso de responsabilidad fiscal y disciplinaria interna para determinar si hubo dolo o culpa grave en el manejo del bien público.", esCorrecta: true },
                { letra: "B", texto: "Ninguno, los conductores de la Gobernación tienen inmunidad diplomática y pueden chocar los carros cuantas veces quieran.", esCorrecta: false },
                { letra: "C", texto: "Hacer una colecta entre los empleados para pagar el arreglo del carro y que nadie se entere oficialmente del accidente.", esCorrecta: false }
              ],
              explicacion: "La opción A cumple con los mandatos de la Ley 610 de 2000 y el Código Disciplinario. Las otras opciones son omisiones de funciones o conductas irregulares."
            },
            {
              texto: "¿Qué valor del servidor público se destaca al gestionar con rigor los siniestros de los activos de la entidad?",
              opciones: [
                { letra: "A", texto: "La Honestidad y la Responsabilidad, velando por que los bienes del Estado sean recuperados o indemnizados con transparencia.", esCorrecta: true },
                { letra: "B", texto: "La Cobardía, tratando de ocultar el accidente para no tener que dar explicaciones a los entes de control.", esCorrecta: false },
                { letra: "C", texto: "La Indiferencia, asumiendo que como el carro no es suyo, no importa si se pierde o se queda dañado en un parqueadero.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la labor profesional con el Código de Integridad. Las otras opciones son conductas deshonestas o negligentes."
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
