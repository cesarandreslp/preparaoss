import { PrismaClient, TipoPregunta, NivelDificultad } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const dataToInsert: any[] = [
    {
      simoId: "241799", // ATLÁNTICO - Técnico Adm. (Contable)
      escenarios: [
        {
          contenido: "Usted es Técnico Administrativo en la Secretaría de Hacienda de la Gobernación del Atlántico, encargado del área contable. Al realizar el cierre periódico, detecta un sobregiro injustificado en una de las cuentas de gastos de funcionamiento. Al investigar, encuentra que se realizaron registros contables duplicados de varias facturas de servicios públicos del mes anterior. Usted debe proceder con el ajuste contable correctivo, analizar las causas de la falla en el proceso y proyectar el informe de conciliación para asegurar la veracidad de los balances institucionales.",
          categoria: "Contabilidad Pública", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cuál es la acción técnica inmediata ante la detección de registros contables duplicados?",
              opciones: [
                { letra: "A", texto: "Realizar una nota contable de ajuste para reversar los registros duplicados, asegurando que el saldo refleje la realidad económica de la entidad.", esCorrecta: true },
                { letra: "B", texto: "Borrar los registros del sistema como si nunca hubieran existido para que el contador no se dé cuenta del error.", esCorrecta: false },
                { letra: "C", texto: "Dejar el sobregiro así y esperar a que el presupuesto del próximo año cubra el error contable de este periodo.", esCorrecta: false }
              ],
              explicacion: "La opción A cumple con los principios de contabilidad pública y transparencia. Las otras opciones son negligencias o faltas al debido proceso contable."
            },
            {
              texto: "En el marco del Régimen de Contabilidad Pública, ¿qué principio se vulnera si no se corrigen estos errores?",
              opciones: [
                { letra: "A", texto: "El principio de Representación Fiel, ya que la información financiera no reflejaría la situación real de la Gobernación.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'Ahorro Forzoso', haciendo creer que la entidad tiene más deudas de las que realmente posee.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Confusión Administrativa', para que sea más difícil auditar las cuentas del departamento.", esCorrecta: false }
              ],
              explicacion: "La opción A es el fundamento técnico de la calidad de la información contable. Las otras opciones son interpretaciones erróneas."
            },
            {
              texto: "¿Qué herramienta técnica debe utilizar para prevenir que este error se repita en el futuro?",
              opciones: [
                { letra: "A", texto: "Implementar una lista de chequeo de validación de soportes previo al registro y fortalecer la conciliación bancaria mensual.", esCorrecta: true },
                { letra: "B", texto: "Prohibir el uso de computadores para la contabilidad y volver a llevar los libros a mano con tinta y pluma.", esCorrecta: false },
                { letra: "C", texto: "Pedirle a los proveedores que no manden facturas para no tener nada que registrar en el sistema contable.", esCorrecta: false }
              ],
              explicacion: "La opción A es una medida de control interno efectiva. Las otras opciones son retrocesos tecnológicos o acciones absurdas."
            }
          ]
        },
        {
          contenido: "Como Técnico Contable de la Gobernación del Atlántico, debe atender una PQR de un exfuncionario que reclama el pago de una prima técnica que, según él, no aparece reflejada en su liquidación final. Usted debe revisar la historia laboral contable, verificar los actos administrativos de reconocimiento y cruzar con los comprobantes de egreso del sistema financiero para determinar si existe un saldo pendiente o si el pago ya fue efectuado de manera correcta.",
          categoria: "Conciliación de Nómina", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Qué documento es la prueba reina para demostrar que un pago ya fue efectuado por la Gobernación?",
              opciones: [
                { letra: "A", texto: "El comprobante de egreso debidamente firmado o el reporte de transferencia bancaria exitosa generado por el sistema financiero.", esCorrecta: true },
                { letra: "B", texto: "Un testigo que diga que vio al funcionario salir muy contento del banco el día del pago de la nómina.", esCorrecta: false },
                { letra: "C", texto: "Una foto del cajero automático donde el funcionario solía retirar su sueldo todos los meses.", esCorrecta: false }
              ],
              explicacion: "La opción A es el soporte documental legal y financiero obligatorio. Las otras opciones carecen de rigor probatorio administrativo."
            },
            {
              texto: "Si detecta que efectivamente hubo un error en la liquidación y no se pagó la prima, ¿cuál es el procedimiento?",
              opciones: [
                { letra: "A", texto: "Proyectar la resolución de reconocimiento de saldos pendientes y tramitar la orden de pago con cargo al presupuesto de la vigencia actual.", esCorrecta: true },
                { letra: "B", texto: "Decirle al exfuncionario que ya es muy tarde para reclamar y que mejor se olvide de ese dinero para no molestar a la administración.", esCorrecta: false },
                { letra: "C", texto: "Pagarle al exfuncionario con dinero de su propio bolsillo para que no ponga la queja ante la oficina de control interno.", esCorrecta: false }
              ],
              explicacion: "La opción A sigue el debido proceso administrativo para corregir errores de la entidad. Las otras opciones son negligencias o conductas indebidas."
            },
            {
              texto: "¿Qué valor institucional se destaca al resolver una reclamación ciudadana de forma justa y oportuna?",
              opciones: [
                { letra: "A", texto: "La Transparencia y la Responsabilidad, reconociendo los derechos de los servidores y exservidores públicos.", esCorrecta: true },
                { letra: "B", texto: "La Generosidad, regalándole dinero a la gente para que hablen bien de la Gobernación del Atlántico.", esCorrecta: false },
                { letra: "C", texto: "La Timidez, teniendo miedo de que el exfuncionario demande a la entidad si no se le da lo que pide.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la gestión con los valores éticos del servicio público. Las otras opciones son interpretaciones erróneas."
            }
          ]
        }
      ]
    },
    {
      simoId: "236653", // DIAN - Analista II (Cartera)
      escenarios: [
        {
          contenido: "Usted es Analista II en el área de cartera de la DIAN. Debe gestionar el cobro persuasivo de un grupo de grandes contribuyentes que presentan morosidad superior a 90 días en el pago del IVA. Usted debe analizar la cuenta corriente de cada contribuyente, verificar si existen compensaciones pendientes por saldos a favor en renta y emitir las comunicaciones de cobro, advirtiendo sobre las consecuencias del inicio del proceso administrativo de cobro coactivo y las posibles medidas cautelares.",
          categoria: "Gestión de Cartera Tributaria", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cuál es el objetivo principal de la etapa de cobro persuasivo en la DIAN?",
              opciones: [
                { letra: "A", texto: "Invitar al contribuyente al cumplimiento voluntario de sus obligaciones para evitar los costos y las medidas cautelares de un proceso coactivo.", esCorrecta: true },
                { letra: "B", texto: "Asustar al contribuyente con amenazas ilegales para que pague rápido aunque no deba nada.", esCorrecta: false },
                { letra: "C", texto: "Pedirle al contribuyente una colaboración económica para los gastos de café de la oficina a cambio de no cobrarle la deuda.", esCorrecta: false }
              ],
              explicacion: "La opción A define la finalidad legal de la etapa persuasiva. Las otras opciones son conductas delictivas o ajenas al procedimiento."
            },
            {
              texto: "Al verificar la cuenta corriente, ¿qué debe asegurar respecto a los saldos a favor?",
              opciones: [
                { letra: "A", texto: "Que los saldos a favor estén debidamente liquidados y sean susceptibles de compensación legal contra las deudas actuales antes de proceder con el cobro.", esCorrecta: true },
                { letra: "B", texto: "Ignorar los saldos a favor para que la deuda del contribuyente parezca más grande y se le pueda cobrar más intereses.", esCorrecta: false },
                { letra: "C", texto: "Sugerir al contribuyente que le regale ese saldo a favor a otro amigo suyo que también le deba dinero a la DIAN.", esCorrecta: false }
              ],
              explicacion: "La opción A garantiza el derecho del contribuyente y la veracidad de la deuda. Las otras opciones son negligencias o actos de corrupción."
            },
            {
              texto: "¿Qué principio de la administración pública se protege al realizar una gestión de cobro rigurosa?",
              opciones: [
                { letra: "A", texto: "La Eficacia en el recaudo de los recursos públicos necesarios para el cumplimiento de los fines del Estado.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'Persecución Ciudadana', tratando de que ningún empresario pueda tener éxito en sus negocios.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Enriquecimiento Estatal', buscando quitarle todo el dinero a la gente por cualquier medio.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la labor de cartera con los objetivos nacionales. Las otras opciones son visiones distorsionadas de la función tributaria."
            }
          ]
        },
        {
          contenido: "Como Analista de Cartera en la DIAN, un contribuyente solicita la aplicación de un beneficio de amnistía para el pago de sanciones e intereses contemplado en una reciente reforma tributaria. Usted debe verificar si el contribuyente cumple con los requisitos de ley (tipos de impuestos cubiertos, fechas de pago), proyectar el acto administrativo de reconocimiento del beneficio y actualizar la cuenta corriente en el sistema informático, asegurando que no se apliquen descuentos no autorizados por la norma.",
          categoria: "Beneficios y Amnistías Tributarias", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Qué documento rige la aplicación de beneficios tributarios por encima de los manuales internos?",
              opciones: [
                { letra: "A", texto: "La Ley de la República que creó el beneficio y su correspondiente decreto reglamentario expedido por el Gobierno Nacional.", esCorrecta: true },
                { letra: "B", texto: "Lo que el contribuyente diga que leyó en un grupo de WhatsApp de contadores de su ciudad.", esCorrecta: false },
                { letra: "C", texto: "La opinión personal del Analista de Cartera según le parezca que el contribuyente es buena gente o no.", esCorrecta: false }
              ],
              explicacion: "La opción A refleja el principio de legalidad en materia tributaria. Las otras opciones carecen de validez jurídica."
            },
            {
              texto: "Si el contribuyente paga el capital pero se niega a pagar la parte de la sanción no cubierta por el beneficio, ¿qué debe hacer?",
              opciones: [
                { letra: "A", texto: "Aplicar el pago proporcionalmente según la ley y mantener el saldo restante en cobro coactivo hasta su total cancelación.", esCorrecta: true },
                { letra: "B", texto: "Perdonarle el resto de la deuda por su propia cuenta para que el contribuyente no se vaya bravo de la oficina.", esCorrecta: false },
                { letra: "C", texto: "Gritarle al contribuyente que es un tramposo y prohibirle la entrada a las oficinas de la DIAN para siempre.", esCorrecta: false }
              ],
              explicacion: "La opción A sigue el procedimiento legal de recaudo. Las otras opciones son extralimitaciones de funciones o conductas no profesionales."
            },
            {
              texto: "¿Qué valor del servidor público se destaca al aplicar con exactitud los beneficios de ley?",
              opciones: [
                { letra: "A", texto: "La Honestidad y la Rectitud, evitando favorecimientos indebidos o cobros injustos a la ciudadanía.", esCorrecta: true },
                { letra: "B", texto: "La Astucia, tratando de que el contribuyente no entienda el beneficio para que termine pagando de más sin querer.", esCorrecta: false },
                { letra: "C", texto: "La Indiferencia, dejando que el sistema informático haga lo que quiera sin revisar si los cálculos son correctos.", esCorrecta: false }
              ],
              explicacion: "La opción A es un pilar de la integridad pública. Las otras opciones son comportamientos contrarios a la ética."
            }
          ]
        }
      ]
    },
    {
      simoId: "228775", // SENA - Profesional (IT)
      escenarios: [
        {
          contenido: "Usted es Profesional IT en un Centro de Formación del SENA. Debe liderar la migración de los servicios de almacenamiento de datos de los aprendices hacia una nueva arquitectura en la nube. Durante el proceso, identifica que la infraestructura actual tiene vulnerabilidades de seguridad que podrían comprometer la privacidad de los datos personales. Usted debe diseñar el plan de contingencia, asegurar que el nuevo proveedor cumpla con los estándares de ciberseguridad estatales y garantizar que la transición no afecte el acceso de los aprendices a sus herramientas de formación.",
          categoria: "Infraestructura y Seguridad TI", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cuál es el estándar técnico y legal prioritario al manejar datos de aprendices en la nube?",
              opciones: [
                { letra: "A", texto: "El cumplimiento de la Ley de Protección de Datos Personales (1581 de 2012) y los lineamientos de Gobierno Digital sobre ciberseguridad.", esCorrecta: true },
                { letra: "B", texto: "Que el logo del proveedor de nube sea de un color llamativo para que los aprendices crean que el sistema es muy moderno.", esCorrecta: false },
                { letra: "C", texto: "Que el servidor esté ubicado físicamente en la oficina del Director del Centro de Formación para que él lo pueda vigilar personalmente.", esCorrecta: false }
              ],
              explicacion: "La opción A es el marco legal y técnico obligatorio para las entidades públicas en Colombia. Las otras opciones son criterios irrelevantes o erróneos."
            },
            {
              texto: "Ante las vulnerabilidades detectadas, ¿cuál es su acción técnica inmediata?",
              opciones: [
                { letra: "A", texto: "Aplicar parches de seguridad urgentes, restringir accesos no autorizados y documentar el incidente para la mejora de la arquitectura.", esCorrecta: true },
                { letra: "B", texto: "Apagar todos los servidores del SENA y decir que se fue la luz por culpa de un rayo para que nadie sospeche de la falla de seguridad.", esCorrecta: false },
                { letra: "C", texto: "Pedirle a los aprendices que ellos mismos arreglen el sistema si tanto saben de computación.", esCorrecta: false }
              ],
              explicacion: "La opción A es la gestión profesional de incidentes de seguridad. Las otras opciones son negligencias o respuestas no profesionales."
            },
            {
              texto: "¿Qué principio de la función pública se fortalece al garantizar la disponibilidad de los servicios TIC?",
              opciones: [
                { letra: "A", texto: "El principio de Continuidad en la prestación del servicio educativo y la Eficacia administrativa mediada por tecnología.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'Siempre Fallar', para que la gente se acostumbre a que los sistemas del Estado nunca funcionan bien.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Gasto Innecesario', comprando tecnología cara aunque no sirva para mejorar el aprendizaje.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la labor de IT con los fines del SENA. Las otras opciones son visiones cínicas o erróneas."
            }
          ]
        },
        {
          contenido: "Como Profesional IT del SENA, debe gestionar los Acuerdos de Niveles de Servicio (SLA) con el contratista que provee el soporte técnico de las salas de cómputo. El contratista reporta un cumplimiento del 95%, pero las encuestas de los instructores indican que las reparaciones demoran más de lo pactado. Usted debe realizar la auditoría a los tickets de servicio, verificar los tiempos de respuesta reales y proyectar el informe de supervisión con las recomendaciones de aplicación de multas si se demuestra el incumplimiento del contrato.",
          categoria: "Gestión de Servicios TI (SLA)", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Qué indicador técnico es fundamental para evaluar el cumplimiento de un SLA de soporte?",
              opciones: [
                { letra: "A", texto: "El Tiempo Medio de Respuesta (MTTR) y el porcentaje de incidentes resueltos dentro del término pactado contractualmente.", esCorrecta: true },
                { letra: "B", texto: "La cantidad de sonrisas que el técnico le dio al instructor mientras intentaba arreglar el computador dañado.", esCorrecta: false },
                { letra: "C", texto: "El número de veces que el técnico dijo: 'reinicie el equipo que eso se arregla solo'.", esCorrecta: false }
              ],
              explicacion: "La opción A utiliza métricas técnicas objetivas de gestión de servicios (ITIL). Las otras opciones son criterios subjetivos o mediocres."
            },
            {
              texto: "Al detectar inconsistencias entre el reporte del contratista y la realidad de los usuarios, ¿qué debe hacer?",
              opciones: [
                { letra: "A", texto: "Realizar un cruce de información detallado, exigir evidencias de los tiempos de cierre de tickets y dejar constancia del hallazgo en el informe de supervisión.", esCorrecta: true },
                { letra: "B", texto: "Creerle al contratista porque ellos son una empresa grande y famosa y seguramente no se equivocarían en sus reportes.", esCorrecta: false },
                { letra: "C", texto: "Pedirle al contratista que le regale un computador nuevo a usted para que el informe de cumplimiento salga perfecto.", esCorrecta: false }
              ],
              explicacion: "La opción A es el deber ser del supervisor estatal para proteger el patrimonio público. Las otras opciones son negligencias o actos de corrupción."
            },
            {
              texto: "¿Qué valor de la integridad pública se destaca al supervisar con rigor los contratos estatales?",
              opciones: [
                { letra: "A", texto: "La Justicia y el Compromiso con el buen uso de los recursos públicos, asegurando que la entidad reciba lo que paga.", esCorrecta: true },
                { letra: "B", texto: "La Crueldad, tratando de que los contratistas pierdan dinero para que el Estado se sienta poderoso.", esCorrecta: false },
                { letra: "C", texto: "La Indiferencia, dejando que cada quien haga su trabajo como quiera sin molestar con auditorías técnicas.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la supervisión con los valores éticos del servicio público. Las otras opciones son interpretaciones erróneas."
            }
          ]
        }
      ]
    },
    {
      simoId: "227979", // TUNJA - Técnico Operativo (SISBEN)
      escenarios: [
        {
          contenido: "Usted es Técnico Operativo del SISBEN en la Alcaldía de Tunja. Debe coordinar la salida a campo del equipo de encuestadores para la actualización de datos de una zona rural dispersa. Al revisar los Dispositivos Móviles de Captura (DMC), nota que varios no están sincronizando correctamente con la base de datos nacional del DNP. Usted debe realizar la configuración técnica de los equipos, asegurar que el personal sepa manejar las fallas de conectividad en el campo y supervisar que la información recolectada cumpla con los estándares de calidad para evitar errores en la categorización de los ciudadanos.",
          categoria: "Operación SISBEN", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cuál es el procedimiento técnico ante una falla de sincronización del DMC en campo?",
              opciones: [
                { letra: "A", texto: "Almacenar la información localmente en el dispositivo y realizar la sincronización manual una vez se cuente con una conexión a internet estable y segura.", esCorrecta: true },
                { letra: "B", texto: "Borrar toda la información recolectada y volver a empezar la encuesta desde cero cada vez que se pierda la señal de celular.", esCorrecta: false },
                { letra: "C", texto: "Pedirle al ciudadano que él mismo suba sus datos a la nube usando su propio plan de datos personal.", esCorrecta: false }
              ],
              explicacion: "La opción A es el protocolo técnico de manejo de información en zonas desconectadas. Las otras opciones son ineficientes o irresponsables."
            },
            {
              texto: "En cuanto a la calidad del dato, ¿qué debe verificar el Técnico Operativo antes del cargue masivo?",
              opciones: [
                { letra: "A", texto: "Que no existan campos vacíos críticos, que las coordenadas GPS coincidan con el predio visitado y que la lógica de la encuesta sea consistente.", esCorrecta: true },
                { letra: "B", texto: "Que el encuestador haya escrito con letra muy bonita en la pantalla táctil del dispositivo móvil.", esCorrecta: false },
                { letra: "C", texto: "Que todos los ciudadanos hayan quedado en la categoría A para que puedan recibir todos los subsidios del gobierno.", esCorrecta: false }
              ],
              explicacion: "La opción A garantiza la integridad y veracidad de la base de datos social del Estado. La B es irrelevante y la C es una falta a la objetividad técnica."
            },
            {
              texto: "¿Qué principio de la función pública se protege al garantizar la veracidad de la base de datos del SISBEN?",
              opciones: [
                { letra: "A", texto: "La Justicia Social y la Transparencia, asegurando que los subsidios lleguen a quienes realmente los necesitan según su condición socioeconómica.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'Ayudar a los Amigos', usando el SISBEN para favorecer a los votantes del Alcalde de Tunja.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Papeleo por Papeleo', recolectando datos que nadie va a usar nunca para nada importante.", esCorrecta: false }
              ],
              explicacion: "La opción A define el fin último del sistema de identificación de beneficiarios. Las otras opciones son actos de corrupción o visiones mediocres de la gestión pública."
            }
          ]
        },
        {
          contenido: "Como Técnico del SISBEN en Tunja, atiende a un ciudadano molesto porque su categoría cambió de B a C, lo que le hizo perder el beneficio de una beca educativa. El ciudadano afirma que el encuestador no anotó correctamente que él está desempleado. Usted debe revisar la ficha socioeconómica, verificar si existe una inconsistencia técnica en el cargue de datos y orientar al ciudadano sobre el proceso de solicitud de nueva encuesta si sus condiciones de vida han cambiado realmente.",
          categoria: "Atención Ciudadana SISBEN", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Puede el Técnico Operativo cambiar la categoría de un ciudadano manualmente en el sistema?",
              opciones: [
                { letra: "A", texto: "No, la categoría es asignada automáticamente por el sistema del DNP con base en la información recolectada en la encuesta; el técnico solo gestiona los datos de entrada.", esCorrecta: true },
                { letra: "B", texto: "Sí, si el ciudadano le trae un certificado de desempleo, el técnico puede ponerle la letra que el ciudadano quiera con un clic.", esCorrecta: false },
                { letra: "C", texto: "Sí, siempre y cuando el ciudadano le prometa que le va a dar una parte de la beca cuando se la gane.", esCorrecta: false }
              ],
              explicacion: "La opción A refleja la estructura técnica y de seguridad del SISBEN IV. Las otras opciones son imposibles técnicamente o constituyen actos de corrupción."
            },
            {
              texto: "Ante la inconformidad por presunto error del encuestador, ¿cuál es el trámite legal?",
              opciones: [
                { letra: "A", texto: "Radicar una solicitud de revisión de la ficha y, si se demuestra el error o cambio de condiciones, programar una nueva visita de encuesta al domicilio.", esCorrecta: true },
                { letra: "B", texto: "Decirle al ciudadano que se resigne porque el sistema nunca se equivoca y que mejor busque trabajo pronto.", esCorrecta: false },
                { letra: "C", texto: "Sugerirle al ciudadano que demande al Estado por daños y perjuicios morales por haberle cambiado la categoría del SISBEN.", esCorrecta: false }
              ],
              explicacion: "La opción A es el camino legal y administrativo para garantizar el derecho del ciudadano. Las otras opciones son negligencias o consejos no profesionales."
            },
            {
              texto: "¿Qué valor de la integridad pública se destaca al explicar con paciencia y claridad el funcionamiento del sistema?",
              opciones: [
                { letra: "A", texto: "La Vocación de Servicio y el Respeto, brindando una atención digna y transparente al ciudadano inconforme.", esCorrecta: true },
                { letra: "B", texto: "La Superioridad, demostrando que usted sabe más que el ciudadano y que por eso él debe guardar silencio.", esCorrecta: false },
                { letra: "C", texto: "La Astucia, logrando que el ciudadano se vaya rápido de la oficina para poder seguir mirando sus redes sociales.", esCorrecta: false }
              ],
              explicacion: "La opción A es un pilar del servicio público. Las otras opciones son conductas arrogantes o negligentes."
            }
          ]
        }
      ]
    },
    {
      simoId: "240660", // NORTE DE SANTANDER - Profesional Universitario (Programas)
      escenarios: [
        {
          contenido: "Usted es Profesional Universitario en la Gobernación de Norte de Santander. Debe apoyar la formulación del 'Plan Departamental de Juventud'. Debe coordinar mesas de trabajo con jóvenes de diferentes municipios, incluyendo zonas de conflicto, para recoger sus necesidades en educación, empleo y paz. Usted debe sistematizar la información, asegurar que el plan se alinee con los Objetivos de Desarrollo Sostenible (ODS) y proyectar el documento técnico que servirá de base para la asignación presupuestal de la próxima vigencia.",
          categoria: "Formulación de Políticas Públicas", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cuál es el primer paso técnico para formular una política pública de juventud efectiva?",
              opciones: [
                { letra: "A", texto: "La realización de un diagnóstico participativo que identifique los problemas reales y las brechas sociales de la población joven del departamento.", esCorrecta: true },
                { letra: "B", texto: "Hacer una fiesta masiva con música urbana para que los jóvenes crean que la Gobernación es muy divertida.", esCorrecta: false },
                { letra: "C", texto: "Copiar el plan de juventud de otro departamento y solo cambiarle el nombre por 'Norte de Santander' para ahorrar tiempo.", esCorrecta: false }
              ],
              explicacion: "La opción A es la metodología estándar de gestión pública participativa. Las otras opciones son gastos banales o faltas a la ética profesional (plagio)."
            },
            {
              texto: "Al sistematizar las necesidades recogidas en zonas de conflicto, ¿qué enfoque debe priorizar?",
              opciones: [
                { letra: "A", texto: "El enfoque Diferencial y de Derechos, reconociendo las vulnerabilidades específicas de los jóvenes víctimas de la violencia.", esCorrecta: true },
                { letra: "B", texto: "El enfoque de 'Omitir lo Malo', para que el plan se vea muy bonito y no asuste a los inversionistas extranjeros.", esCorrecta: false },
                { letra: "C", texto: "El enfoque de 'Promesas Imposibles', anotando todo lo que la gente pida aunque el departamento no tenga dinero para cumplirlo.", esCorrecta: false }
              ],
              explicacion: "La opción A garantiza la pertinencia y legalidad de la política pública. Las otras opciones son deshonestas o técnicamente inviables."
            },
            {
              texto: "¿Qué principio de la administración pública se cumple al involucrar a los ciudadanos en la planeación?",
              opciones: [
                { letra: "A", texto: "El principio de Participación Democrática y la Transparencia en la gestión de los intereses colectivos.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'Hacer de cuenta que escuchamos', para cumplir con el requisito legal sin tomar en cuenta lo que la gente dice.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Transferencia de Trabajo', para que los ciudadanos hagan el trabajo que le corresponde a los funcionarios.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la gestión con los mandatos constitucionales. Las otras opciones son visiones cínicas de la participación."
            }
          ]
        },
        {
          contenido: "Como Profesional en la Gobernación, debe supervisar el cumplimiento de un convenio con una universidad para la capacitación de 500 mujeres emprendedoras del departamento. Nota que la universidad está entregando los certificados de asistencia sin que las participantes hayan completado el 80% de las horas exigidas. Usted debe realizar la auditoría a las listas de asistencia, solicitar las pruebas de los trabajos realizados y emitir un informe de supervisión exigiendo los correctivos inmediatos para evitar el pago de recursos por un servicio no prestado adecuadamente.",
          categoria: "Supervisión de Convenios", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cuál es su responsabilidad técnica frente a la certificación irregular detectada?",
              opciones: [
                { letra: "A", texto: "Invalidar las certificaciones que no cumplan los requisitos, informar al supervisor jurídico y suspender los pagos hasta que se subsane la falta.", esCorrecta: true },
                { letra: "B", texto: "Firmar el acta de cumplimiento de todas formas para no tener problemas con la Universidad y que el convenio termine rápido.", esCorrecta: false },
                { letra: "C", texto: "Pedirle a la Universidad que le regale un título de maestría a usted a cambio de no reportar la irregularidad detectada.", esCorrecta: false }
              ],
              explicacion: "La opción A es el ejercicio legal y ético de la supervisión estatal. Las otras opciones son negligencias o actos de corrupción."
            },
            {
              texto: "En cuanto a los recursos públicos del convenio, ¿qué principio está protegiendo al ser estricto con la asistencia?",
              opciones: [
                { letra: "A", texto: "El principio de Economía y Responsabilidad, asegurando que el dinero público se invierta realmente en la formación de las mujeres.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'Ser Malo con los Profesores', para que la Universidad sepa que con la Gobernación no se juega.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Ahorro a Toda Costa', tratando de que la Universidad trabaje gratis para el departamento.", esCorrecta: false }
              ],
              explicacion: "La opción A define el fin de la supervisión contractual. Las otras opciones son interpretaciones erróneas o negativas."
            },
            {
              texto: "¿Qué documento debe archivar como soporte final de que la capacitación fue exitosa?",
              opciones: [
                { letra: "A", texto: "El informe final de actividades, las listas de asistencia verificadas, las encuestas de satisfacción y el acta de liquidación del convenio.", esCorrecta: true },
                { letra: "B", texto: "Una foto de la graduación donde todas las mujeres estén sonriendo y sosteniendo su diploma en el aire.", esCorrecta: false },
                { letra: "C", texto: "Un correo electrónico del Rector de la Universidad diciendo que todo salió perfecto y que les quedó debiendo un almuerzo.", esCorrecta: false }
              ],
              explicacion: "La opción A es el soporte documental completo y legal exigido para el cierre de convenios públicos. Las otras opciones son insuficientes."
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
