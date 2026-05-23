import { PrismaClient, TipoPregunta, NivelDificultad } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const dataToInsert: any[] = [
    {
      simoId: "241888", // FUNZA - IT/Sistemas (Administración de Red)
      escenarios: [
        {
          contenido: "Usted es el encargado de TI en la Alcaldía de Funza. El municipio planea migrar sus servicios de correo electrónico y gestión documental a la nube de Microsoft 365 para mejorar la colaboración. Usted debe liderar la configuración de seguridad, asegurar la sincronización del Directorio Activo local con Azure AD y definir las políticas de retención de información para cumplir con la Ley de Transparencia, evitando que se eliminen correos institucionales con valor administrativo.",
          categoria: "Servicios Cloud", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Qué proceso técnico es crítico para garantizar que los usuarios mantengan sus mismas credenciales en la nube?",
              opciones: [
                { letra: "A", texto: "Configurar un conector de sincronización de identidades (Azure AD Connect) con autenticación de paso a través o federación.", esCorrecta: true },
                { letra: "B", texto: "Mandar una circular pidiéndole a cada funcionario que cree una cuenta nueva con la contraseña que más le guste.", esCorrecta: false },
                { letra: "C", texto: "Usar la misma cuenta para todos los funcionarios de la alcaldía para que nadie olvide cómo entrar al correo.", esCorrecta: false }
              ],
              explicacion: "La opción A garantiza la gestión centralizada y segura de identidades. Las otras opciones son vulnerabilidades críticas o ineficientes."
            },
            {
              texto: "Al definir las 'Políticas de Retención' en Microsoft 365, ¿qué criterio debe primar?",
              opciones: [
                { letra: "A", texto: "Alinear los tiempos de retención electrónica con las Tablas de Retención Documental (TRD) aprobadas para la entidad.", esCorrecta: true },
                { letra: "B", texto: "Borrar todo cada 24 horas para que el buzón de correo nunca se llene y no tengan que pagar almacenamiento extra.", esCorrecta: false },
                { letra: "C", texto: "Dejar que cada funcionario decida qué borra y qué guarda según su estado de ánimo de cada día.", esCorrecta: false }
              ],
              explicacion: "La opción A asegura el cumplimiento legal de la gestión documental pública. La B y la C afectan la memoria institucional y pueden generar hallazgos disciplinarios."
            },
            {
              texto: "¿Qué medida de seguridad adicional debe implementar para los accesos administrativos a la consola de la nube?",
              opciones: [
                { letra: "A", texto: "Habilitar la Autenticación Multifactor (MFA) obligatoria y el acceso condicional basado en ubicaciones de red seguras.", esCorrecta: true },
                { letra: "B", texto: "Poner la contraseña del administrador en un archivo de Word llamado 'claves_secretas.docx' en el escritorio del computador.", esCorrecta: false },
                { letra: "C", texto: "No poner ninguna seguridad para que si el administrador se enferma, cualquier persona que pase por la oficina pueda entrar al sistema.", esCorrecta: false }
              ],
              explicacion: "La opción A es la mejor práctica de ciberseguridad para proteger cuentas privilegiadas. Las otras opciones son negligencias graves."
            }
          ]
        },
        {
          contenido: "Como experto de TI en Funza, detecta una saturación inusual en el ancho de banda de la red interna que está bloqueando el acceso a los servicios de trámites en línea. Al investigar, identifica que varios equipos de una dependencia están infectados con un malware que realiza minería de criptomonedas en segundo plano. Usted debe aislar los equipos afectados, realizar la limpieza de las estaciones de trabajo y proponer una actualización del software de protección de puntos finales (Endpoint Protection) para prevenir futuros incidentes.",
          categoria: "Ciberseguridad", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cuál es la acción técnica inmediata para restablecer la velocidad de los servicios de trámites?",
              opciones: [
                { letra: "A", texto: "Aislar las estaciones de trabajo infectadas de la red (VLAN de cuarentena) y bloquear el tráfico hacia dominios de minería en el firewall.", esCorrecta: true },
                { letra: "B", texto: "Comprar más internet a los proveedores para que haya suficiente ancho de banda tanto para los trámites como para los virus.", esCorrecta: false },
                { letra: "C", texto: "Pedirle a los ciudadanos que no usen los trámites en línea durante una semana mientras los virus terminan su trabajo.", esCorrecta: false }
              ],
              explicacion: "La opción A es la medida de contención técnica adecuada. Las otras opciones son ineficaces o afectan la prestación del servicio público."
            },
            {
              texto: "Al seleccionar un nuevo 'Endpoint Protection', ¿qué característica técnica es fundamental según el MSPI?",
              opciones: [
                { letra: "A", texto: "Que cuente con capacidades de detección y respuesta (EDR), análisis de comportamiento y gestión centralizada desde la consola de TI.", esCorrecta: true },
                { letra: "B", texto: "Que tenga dibujos de escudos y espadas en el logo para que los virus se asusten al ver el programa instalado.", esCorrecta: false },
                { letra: "C", texto: "Que sea un programa gratuito bajado de un sitio web de dudosa procedencia para ahorrarle dinero al municipio de Funza.", esCorrecta: false }
              ],
              explicacion: "La opción A garantiza una protección moderna y alineada con los estándares de seguridad del Estado. Las otras opciones son infantiles o riesgosas."
            },
            {
              texto: "En cuanto a la concientización de los usuarios, ¿qué recomendación de seguridad es clave para evitar infecciones de malware?",
              opciones: [
                { letra: "A", texto: "No conectar dispositivos USB desconocidos, no descargar archivos de sitios no oficiales y reportar cualquier comportamiento extraño del equipo.", esCorrecta: true },
                { letra: "B", texto: "Decirles que si ven un virus en la pantalla, traten de taparlo con un papel adhesivo para que no se propague a otros computadores.", esCorrecta: false },
                { letra: "C", texto: "Instalar programas piratas para poder trabajar más rápido sin tener que esperar a que el área de sistemas autorice las licencias.", esCorrecta: false }
              ],
              explicacion: "La opción A enseña higiene digital básica. La B es absurda y la C es una de las principales causas de infección y brechas de seguridad."
            }
          ]
        }
      ]
    },
    {
      simoId: "240588", // PEREIRA - Auxiliar Administrativo
      escenarios: [
        {
          contenido: "Usted es Auxiliar Administrativo en la Alcaldía de Pereira, asignado a la oficina de atención preferencial para adultos mayores y personas con discapacidad. Se presenta un ciudadano ciego que requiere radicar una solicitud de subsidio de transporte, pero no trajo el formulario diligenciado ni cuenta con acompañante. Usted debe brindar la asistencia necesaria para que el ciudadano pueda ejercer su derecho de petición, asegurar que la información sea registrada correctamente y entregarle el soporte de radicado en un formato accesible o mediante lectura clara.",
          categoria: "Inclusión y Atención", dificultad: "BASICO",
          preguntas: [
            {
              texto: "¿Cuál es su actuación correcta frente al ciudadano con discapacidad visual?",
              opciones: [
                { letra: "A", texto: "Brindar apoyo directo para diligenciar el formulario bajo la instrucción del ciudadano, leerle el contenido final y proceder a la radicación.", esCorrecta: true },
                { letra: "B", texto: "Decirle que regrese otro día con alguien que sí pueda ver para que esa persona le ayude con el trámite de la Alcaldía.", esCorrecta: false },
                { letra: "C", texto: "Hacerle señas con las manos para indicarle dónde debe firmar, aunque sepa que el ciudadano no puede ver sus gestos.", esCorrecta: false }
              ],
              explicacion: "La opción A garantiza el acceso sin barreras y el trato digno (Ley 1437/Decreto 2106). La B es una barrera discriminatoria y la C es una falta de respeto e ineficacia."
            },
            {
              texto: "Para entregarle el soporte de radicado, ¿qué medida de accesibilidad adopta?",
              opciones: [
                { letra: "A", texto: "Informarle verbalmente el número de radicado, la fecha y dependencia, y ofrecer enviarle la confirmación por correo electrónico o audio.", esCorrecta: true },
                { letra: "B", texto: "Entregarle el papel impreso y decirle que él verá cómo hace para leerlo después cuando llegue a su casa.", esCorrecta: false },
                { letra: "C", texto: "No entregarle nada, porque usted asume que como es ciego, no necesita guardar soportes físicos de sus trámites.", esCorrecta: false }
              ],
              explicacion: "La opción A aplica ajustes razonables para la comunicación efectiva. Las otras opciones vulneran los derechos del ciudadano y los protocolos de servicio."
            },
            {
              texto: "¿Qué valor del servidor público se destaca al atender con especial cuidado a poblaciones vulnerables?",
              opciones: [
                { letra: "A", texto: "La Justicia, reconociendo que todos tienen derecho a acceder a los servicios del Estado en condiciones de igualdad real.", esCorrecta: true },
                { letra: "B", texto: "La Lástima, sintiéndose muy triste por el ciudadano pero sin ayudarle realmente con su trámite administrativo.", esCorrecta: false },
                { letra: "C", texto: "La Superioridad, demostrando que usted es más importante porque puede ver y el ciudadano no.", esCorrecta: false }
              ],
              explicacion: "La opción A es un principio constitucional y un valor del Código de Integridad. Las otras opciones son sentimientos o posturas negativas no profesionales."
            }
          ]
        },
        {
          contenido: "Como Auxiliar Administrativo en Pereira, debe organizar el archivo de gestión de su dependencia para la transferencia primaria. Encuentra varios expedientes de contratos de obra que tienen documentos en desorden, sin foliar y con ganchos oxidados. Usted debe aplicar la norma técnica archivística, retirar los elementos metálicos, clasificar los documentos cronológicamente y elaborar el inventario documental (FUID) para asegurar que la oficina jurídica pueda consultar los contratos sin riesgo de pérdida de información.",
          categoria: "Gestión Documental", dificultad: "BASICO",
          preguntas: [
            {
              texto: "¿Qué debe hacer con las grapas y ganchos de los expedientes de contrato antes de archivarlos?",
              opciones: [
                { letra: "A", texto: "Retirarlos totalmente y sustituirlos por ganchos de plástico o cintas de amarre que no dañen el papel con el tiempo.", esCorrecta: true },
                { letra: "B", texto: "Ponerles más grapas encima para que los papeles queden tan pegados que nadie pueda separarlos nunca más.", esCorrecta: false },
                { letra: "C", texto: "Lamer los ganchos oxidados para ver si todavía tienen sabor metálico antes de decidir si los quita o no.", esCorrecta: false }
              ],
              explicacion: "La opción A es la medida técnica de preservación documental. Las otras opciones son perjudiciales o absurdas."
            },
            {
              texto: "Al foliar el expediente de contrato, ¿cuál es el orden correcto de los folios?",
              opciones: [
                { letra: "A", texto: "Numerar en orden cronológico, desde el primer documento que dio inicio al proceso hasta el último (liquidación), de 1 a N.", esCorrecta: true },
                { letra: "B", texto: "Numerar al azar, saltándose números si se equivoca para no tener que borrar el lápiz en la hoja de papel.", esCorrecta: false },
                { letra: "C", texto: "Solo numerar las hojas que tengan dibujos o colores bonitos, dejando las demás en blanco para ahorrar tiempo.", esCorrecta: false }
              ],
              explicacion: "La opción A garantiza la integridad y el orden lógico del expediente. Las otras opciones imposibilitan el control documental."
            },
            {
              texto: "¿Qué importancia tiene el FUID (Formato Único de Inventario Documental) en la transferencia de archivos?",
              opciones: [
                { letra: "A", texto: "Es el instrumento que permite identificar y localizar cada expediente transferido, garantizando la recuperación de la información.", esCorrecta: true },
                { letra: "B", texto: "Es una lista de los nombres de los funcionarios que van a cargar las cajas hasta el camión de transporte del archivo.", esCorrecta: false },
                { letra: "C", texto: "Es un dibujo de cómo se ven las cajas organizadas en los estantes para que el jefe diga que la oficina se ve ordenada.", esCorrecta: false }
              ],
              explicacion: "La opción A es la definición técnica del FUID según el AGN. Las otras opciones son interpretaciones erróneas."
            }
          ]
        }
      ]
    },
    {
      simoId: "242345", // SOACHA - Prof. Universitario (Planeación/Estadística)
      escenarios: [
        {
          contenido: "Usted es Profesional Universitario en la Secretaría de Planeación de Soacha. Debe elaborar el boletín estadístico trimestral sobre el comportamiento de las licencias de construcción en el municipio. Nota que hay un incremento del 300% en las solicitudes de licencias rurales en zonas que están protegidas ambientalmente según el POT vigente. Usted debe alertar sobre esta situación, verificar la veracidad de los datos con las curadurías urbanas y proyectar un informe técnico que sirva de base para las medidas de control urbanístico que deba tomar la Alcaldía.",
          categoria: "Análisis Estadístico", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cuál es el primer paso técnico ante la detección de este incremento inusual de solicitudes en zonas protegidas?",
              opciones: [
                { letra: "A", texto: "Realizar un cruce de información geográfica (SIG) entre la ubicación de las solicitudes y las capas de protección ambiental del POT.", esCorrecta: true },
                { letra: "B", texto: "Aprobar todas las licencias rápido para que el municipio reciba más impuestos por concepto de construcción.", esCorrecta: false },
                { letra: "C", texto: "Borrar los datos del boletín estadístico para que nadie se entere de que se está construyendo en zonas prohibidas de Soacha.", esCorrecta: false }
              ],
              explicacion: "La opción A utiliza herramientas técnicas para validar la legalidad y el impacto territorial. Las otras opciones son negligencias o actos de corrupción."
            },
            {
              texto: "Al presentar el informe estadístico al Secretario de Planeación, ¿qué debe incluir obligatoriamente?",
              opciones: [
                { letra: "A", texto: "La descripción de la tendencia, la georreferenciación de los puntos críticos y la recomendación de acciones preventivas inmediatas.", esCorrecta: true },
                { letra: "B", texto: "Una lista de los nombres de los dueños de los predios que sean enemigos políticos del Alcalde para que los sancionen solo a ellos.", esCorrecta: false },
                { letra: "C", texto: "Un poema sobre la belleza de las montañas de Soacha para que el informe no sea tan técnico y aburrido de leer.", esCorrecta: false }
              ],
              explicacion: "La opción A es el contenido técnico esperado de un informe de planeación para la toma de decisiones. Las otras opciones son sesgadas o informales."
            },
            {
              texto: "¿Qué principio del MIPG se fortalece al producir información estadística veraz y oportuna sobre el territorio?",
              opciones: [
                { letra: "A", texto: "La Gestión de la Información y el Conocimiento, permitiendo una planeación basada en evidencias reales de la ciudad.", esCorrecta: true },
                { letra: "B", texto: "La Imaginación Administrativa, permitiendo inventar datos para que el municipio parezca más próspero de lo que es.", esCorrecta: false },
                { letra: "C", texto: "El principio de Inercia, dejando que las cosas pasen sin que la administración intervenga para no molestar a los constructores.", esCorrecta: false }
              ],
              explicacion: "La opción A es la finalidad de la dimensión de información en el modelo de gestión estatal. Las otras opciones son prácticas deficientes."
            }
          ]
        },
        {
          contenido: "Como Profesional en Soacha, debe diseñar la metodología para realizar la encuesta de percepción ciudadana sobre el Plan de Movilidad. Se busca conocer la opinión de los habitantes sobre el nuevo sistema de transporte y el uso de ciclorrutas. Usted debe definir el tamaño de la muestra, seleccionar los sectores representativos de las 6 comunas y asegurar que el diseño de las preguntas evite sesgos que favorezcan las respuestas positivas para el gobierno local, garantizando la objetividad técnica del estudio.",
          categoria: "Investigación Social", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Qué tipo de muestreo garantiza que todas las comunas de Soacha estén representadas proporcionalmente en la encuesta?",
              opciones: [
                { letra: "A", texto: "Un muestreo aleatorio estratificado, donde cada comuna es un estrato y se asigna una cuota de encuestas según su población.", esCorrecta: true },
                { letra: "B", texto: "Encuestar solo a las personas que estén haciendo fila frente a la Alcaldía un lunes por la mañana.", esCorrecta: false },
                { letra: "C", texto: "Preguntarle solo a sus amigos y familiares de Soacha porque ellos siempre le dan respuestas honestas a usted.", esCorrecta: false }
              ],
              explicacion: "La opción A es la técnica estadística para lograr representatividad en estudios poblacionales. Las otras opciones tienen sesgos de selección críticos."
            },
            {
              texto: "Para evitar sesgos en la redacción de las preguntas, ¿cuál es la mejor práctica técnica?",
              opciones: [
                { letra: "A", texto: "Usar preguntas neutras, lenguaje claro y opciones de respuesta balanceadas que permitan expresar tanto acuerdo como desacuerdo.", esCorrecta: true },
                { letra: "B", texto: "Hacer preguntas tipo: '¿Está usted de acuerdo con el excelente trabajo del Alcalde en las vías del municipio?', con una sola opción de 'Sí'.", esCorrecta: false },
                { letra: "C", texto: "Hacer preguntas tan largas y complicadas que el ciudadano termine respondiendo cualquier cosa por cansancio.", esCorrecta: false }
              ],
              explicacion: "La opción A garantiza la validez y objetividad del instrumento de recolección. La B es una manipulación de la opinión y la C invalida los resultados."
            },
            {
              texto: "¿Cuál es el uso técnico correcto de los resultados de esta encuesta de percepción?",
              opciones: [
                { letra: "A", texto: "Servir como insumo para ajustar el Plan de Movilidad, priorizar inversiones y mejorar los puntos críticos identificados por la ciudadanía.", esCorrecta: true },
                { letra: "B", texto: "Guardar los resultados en un cajón y no mostrarlos nunca si la gente dijo que el transporte en Soacha es malo.", esCorrecta: false },
                { letra: "C", texto: "Usarlos para identificar a los ciudadanos que se quejan y mandarles a la policía a que les pida los papeles del carro todos los días.", esCorrecta: false }
              ],
              explicacion: "La opción A es la finalidad de la participación ciudadana en el ciclo de la política pública. Las otras opciones son usos deshonestos o represivos."
            }
          ]
        }
      ]
    },
    {
      simoId: "240406", // GIRARDOT - Prof. Universitario (Tesorería/Presupuesto)
      escenarios: [
        {
          contenido: "Usted es Profesional Universitario en la Tesorería de la Alcaldía de Girardot. Debe realizar el cierre financiero del mes y nota que hay una transferencia de recursos de regalías que no coincide con el proyecto aprobado por el OCAD. Además, hay varias órdenes de pago pendientes de seguridad social de contratistas que no cuentan con el soporte de pago de la planilla (PILAS). Usted debe conciliar los saldos, suspender los pagos que no cumplan requisitos legales y proyectar el informe de ejecución presupuestal para el Alcalde.",
          categoria: "Gestión Financiera", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Qué acción técnica debe tomar frente a las órdenes de pago sin soporte de seguridad social?",
              opciones: [
                { letra: "A", texto: "Suspender el trámite de pago hasta que el contratista aporte la planilla de seguridad social pagada y verificada en el sistema de salud.", esCorrecta: true },
                { letra: "B", texto: "Pagar de inmediato porque el contratista es una persona muy necesitada y el municipio no debe ser tan estricto con los papeles.", esCorrecta: false },
                { letra: "C", texto: "Pedirle al contratista que le traiga una caja de cervezas frías para que usted le firme el pago sin mirar los soportes de ley.", esCorrecta: false }
              ],
              explicacion: "La opción A es el cumplimiento de la obligación legal de verificación de aportes (Ley 100/Ley 1562). La B es una falta disciplinaria y la C es un delito."
            },
            {
              texto: "Al detectar la inconsistencia en los recursos de regalías, ¿qué procedimiento sigue?",
              opciones: [
                { letra: "A", texto: "Realizar la nota de conciliación contable, informar al área de Presupuesto y solicitar aclaración al banco o a la entidad nacional giradora.", esCorrecta: true },
                { letra: "B", texto: "Gastar ese dinero sobrante en la fiesta de cumpleaños del municipio, asumiendo que es un 'regalo' del Estado que nadie va a reclamar.", esCorrecta: false },
                { letra: "C", texto: "Cambiar las cifras en el balance para que todo cuadre 'a la fuerza' y usted pueda irse temprano a descansar a su casa.", esCorrecta: false }
              ],
              explicacion: "La opción A garantiza la transparencia y el control de los recursos públicos. La B es un peculado y la C es una falsedad en documento público."
            },
            {
              texto: "¿Qué principio de la ley orgánica de presupuesto se protege al conciliar los saldos de forma rigurosa?",
              opciones: [
                { letra: "A", texto: "El principio de Especialidad y el de Transparencia, asegurando que los recursos se gasten solo en lo que fueron legalmente asignados.", esCorrecta: true },
                { letra: "B", texto: "El principio de Flexibilidad, permitiendo que el Tesorero use el dinero como quiera dependiendo de la urgencia del día.", esCorrecta: false },
                { letra: "C", texto: "El principio de Secreto, para que la gente no sepa cuánto dinero tiene realmente el municipio de Girardot en el banco.", esCorrecta: false }
              ],
              explicacion: "La opción A es un pilar de la gestión financiera pública. Las otras opciones son contrarias al ordenamiento jurídico colombiano."
            }
          ]
        },
        {
          contenido: "Como Profesional en Girardot, debe liderar la implementación de los Pagos Electrónicos (Botón PSE) para el impuesto predial y de industria y comercio. El municipio aún recibe el 90% de sus pagos en ventanilla física, lo que genera congestión y riesgos de manejo de efectivo. Usted debe coordinar con los bancos la integración técnica de las pasarelas de pago, asegurar la seguridad de las transacciones y realizar una campaña de pedagogía para que los contribuyentes confíen en el canal digital.",
          categoria: "Gobierno Digital / Recaudo", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Qué beneficio técnico primordial reporta la implementación del botón PSE para la Tesorería municipal?",
              opciones: [
                { letra: "A", texto: "La conciliación automática de los recaudos, la reducción del error humano y el aumento de la oportunidad en el flujo de caja.", esCorrecta: true },
                { letra: "B", texto: "Poder despedir a todos los cajeros de la Alcaldía para que el edificio se vea más vacío y silencioso durante el día.", esCorrecta: false },
                { letra: "C", texto: "Que los funcionarios de Tesorería ya no tengan que contar billetes y puedan dedicar más tiempo a navegar por redes sociales.", esCorrecta: false }
              ],
              explicacion: "La opción A identifica ventajas de eficiencia administrativa y financiera. Las otras opciones son consecuencias negativas o no profesionales."
            },
            {
              texto: "En cuanto a la seguridad de la pasarela de pagos, ¿qué estándar debe exigir al proveedor tecnológico?",
              opciones: [
                { letra: "A", texto: "El cumplimiento de estándares de seguridad de datos para la industria de tarjetas de pago (PCI DSS) y cifrado SSL de alta seguridad.", esCorrecta: true },
                { letra: "B", texto: "Que el botón de pago sea de color verde brillante porque ese color transmite confianza a los ciudadanos que tienen miedo al internet.", esCorrecta: false },
                { letra: "C", texto: "Que el sistema no pida contraseñas a nadie para que el proceso de pago sea lo más rápido posible y nadie se aburra.", esCorrecta: false }
              ],
              explicacion: "La opción A es el requisito técnico de seguridad para transacciones electrónicas. La B es un tema estético y la C es una vulnerabilidad crítica."
            },
            {
              texto: "Para lograr que los contribuyentes de Girardot usen el canal digital, ¿qué incentivo administrativo propone?",
              opciones: [
                { letra: "A", texto: "Ofrecer descuentos por pronto pago exclusivos para el canal virtual y simplificar la expedición del certificado de paz y salvo en línea.", esCorrecta: true },
                { letra: "B", texto: "Cerrar las puertas de la Alcaldía con candado para obligar a la gente a que pague por internet aunque no tengan computador.", esCorrecta: false },
                { letra: "C", texto: "Cobrarles un impuesto extra llamado 'Impuesto por usar la ventanilla física' a quienes no quieran usar el botón PSE.", esCorrecta: false }
              ],
              explicacion: "La opción A es una estrategia de fomento y facilitación al ciudadano. La B y la C son medidas coercitivas o ilegales que generan rechazo institucional."
            }
          ]
        }
      ]
    },
    {
      simoId: "241822", // FUNZA - Técnico Adm. (Cobro Coactivo)
      escenarios: [
        {
          contenido: "Usted es Técnico Administrativo en la oficina de Cobro Coactivo de Funza. Su tarea es la conformación de los expedientes físicos y digitales de los deudores morosos de multas de tránsito. Encuentra que muchos expedientes carecen del soporte de notificación de la fotomulta, lo que podría generar una nulidad del proceso. Usted debe organizar la información, solicitar a la Secretaría de Movilidad los reportes de envío por correo certificado y asegurar que el expediente esté blindado jurídicamente antes de proceder al embargo de los salarios de los deudores.",
          categoria: "Procedimiento de Cobro", dificultad: "BASICO",
          preguntas: [
            {
              texto: "¿Por qué es fundamental que el expediente contenga la prueba de la notificación de la fotomulta?",
              opciones: [
                { letra: "A", texto: "Porque sin la prueba de notificación, el ciudadano puede alegar vulneración al debido proceso y solicitar la nulidad y revocatoria del cobro.", esCorrecta: true },
                { letra: "B", texto: "Porque el papel de la notificación es muy bonito y ayuda a que el expediente se vea más grueso y profesional.", esCorrecta: false },
                { letra: "C", texto: "Porque si no hay notificación, los funcionarios de Funza no pueden cobrarle una comisión extra al ciudadano por 'debajo de cuerda'.", esCorrecta: false }
              ],
              explicacion: "La opción A es el fundamento legal del debido proceso administrativo (Sentencias Corte Constitucional sobre fotomultas). Las otras opciones son absurdas o delictivas."
            },
            {
              texto: "Al organizar el expediente digital, ¿qué medida de seguridad aplica a los archivos?",
              opciones: [
                { letra: "A", texto: "Asegurar que los archivos estén en formato no editable (PDF), con nombres estandarizados y copias de seguridad periódicas.", esCorrecta: true },
                { letra: "B", texto: "Ponerles una clave que solo usted conozca para que si usted falta a la oficina, nadie más pueda seguir trabajando en esos procesos.", esCorrecta: false },
                { letra: "C", texto: "Subirlos a un sitio web público para que cualquier persona del mundo pueda descargar los datos de los deudores de Funza.", esCorrecta: false }
              ],
              explicacion: "La opción A garantiza la integridad y disponibilidad de la información oficial. La B afecta la continuidad del servicio y la C vulnera el Habeas Data."
            },
            {
              texto: "¿Cuál es su deber al detectar que un expediente está incompleto?",
              opciones: [
                { letra: "A", texto: "Reportar de inmediato al jefe de la oficina, suspender el trámite de embargo y gestionar la consecución de las pruebas faltantes.", esCorrecta: true },
                { letra: "B", texto: "Seguir con el embargo de todas formas y esperar a que el ciudadano se queje para ver si se da cuenta de que falta el papel.", esCorrecta: false },
                { letra: "C", texto: "Inventar una fecha de notificación y escribirla a mano en el expediente para que parezca que todo está en regla.", esCorrecta: false }
              ],
              explicacion: "La opción A es la actuación ética y legal de un técnico administrativo. La B es una arbitrariedad y la C es una falsedad en documento público."
            }
          ]
        },
        {
          contenido: "Como Técnico en Funza, debe atender a un ciudadano que llega con una orden de embargo de su sueldo emitida por su oficina. El ciudadano afirma que él ya pagó esa multa hace dos años en otro municipio mediante un convenio nacional. Usted debe verificar en el sistema SIMIT, validar el soporte de pago que trae el ciudadano y, de ser verídico, proyectar de inmediato el oficio de levantamiento de embargo para evitar que la empresa del ciudadano le descuente el dinero injustamente.",
          categoria: "Atención y Levantamiento de Medidas", dificultad: "BASICO",
          preguntas: [
            {
              texto: "¿Qué sistema nacional debe consultar para verificar los pagos de multas de tránsito realizados en todo el país?",
              opciones: [
                { letra: "A", texto: "El SIMIT (Sistema Integrado de Información sobre Multas y Sanciones por Infracciones de Tránsito).", esCorrecta: true },
                { letra: "B", texto: "El Facebook de la Policía Nacional para ver si el ciudadano publicó una foto pagando la multa hace dos años.", esCorrecta: false },
                { letra: "C", texto: "Llamar a un adivino para que le diga si el ciudadano está diciendo la verdad o si está mintiendo sobre el pago.", esCorrecta: false }
              ],
              explicacion: "La opción A es la herramienta oficial de consulta para autoridades de tránsito en Colombia. Las otras opciones no tienen ningún rigor técnico."
            },
            {
              texto: "Una vez verificado el pago, ¿qué acción es prioritaria para proteger al ciudadano?",
              opciones: [
                { letra: "A", texto: "Generar el oficio de levantamiento de medida cautelar dirigido al empleador y entregarlo al ciudadano o enviarlo por canal oficial.", esCorrecta: true },
                { letra: "B", texto: "Decirle al ciudadano que ya se puede ir a su casa tranquilo y que usted 'algún día de estos' mandará el oficio de levantamiento.", esCorrecta: false },
                { letra: "C", texto: "Pedirle al ciudadano que le pague los intereses de mora en efectivo a usted personalmente por haberle hecho el favor de revisar el sistema.", esCorrecta: false }
              ],
              explicacion: "La opción A restablece el derecho del ciudadano de forma oportuna. La B es una negligencia y la C es un delito."
            },
            {
              texto: "En el marco de la Ética Pública, ¿cómo debe tratar al ciudadano que fue embargado injustamente por un error del sistema?",
              opciones: [
                { letra: "A", texto: "Con respeto, pidiendo disculpas por el inconveniente y agilizando al máximo el trámite de solución para mitigar el daño causado.", esCorrecta: true },
                { letra: "B", texto: "Tratarlo mal y decirle que la culpa es de él por ser tan distraído y no haber traído el recibo antes de que lo embargaran.", esCorrecta: false },
                { letra: "C", texto: "Ignorarlo por completo y seguir chateando por el celular mientras el ciudadano llora de la angustia por su sueldo embargado.", esCorrecta: false }
              ],
              explicacion: "La opción A aplica el valor del Servicio y la Empatía en la función pública. Las otras opciones son conductas reprochables e inhumanas."
            }
          ]
        }
      ]
    },
    {
      simoId: "241163", // CALDAS - Prof. Especializado (Gestión de Calidad)
      escenarios: [
        {
          contenido: "Usted es Profesional Especializado en la oficina de planeación de la Gobernación de Caldas, encargado del Sistema de Gestión de Calidad (ISO 9001:2015). Se aproxima la auditoría externa de seguimiento y nota que la Secretaría de Salud no ha realizado las revisiones por la dirección ni el seguimiento a los indicadores de satisfacción del usuario durante los últimos dos trimestres. Usted debe intervenir, asesorar al equipo de salud en la actualización de sus registros y asegurar que se identifiquen las causas raíz del incumplimiento para evitar una no conformidad mayor.",
          categoria: "Gestión de Calidad", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Qué requisito de la norma ISO 9001 se está incumpliendo con la falta de revisiones por la dirección?",
              opciones: [
                { letra: "A", texto: "El requisito de evaluación del desempeño y la mejora continua, que exige que la alta dirección analice el sistema periódicamente.", esCorrecta: true },
                { letra: "B", texto: "El requisito de 'Hacer felices a los auditores', que dice que siempre se deben tener los papeles limpios y sin tachones.", esCorrecta: false },
                { letra: "C", texto: "El requisito de 'Ahorro de papel', que prohíbe hacer reuniones de revisión para no gastar hojas en las actas de compromiso.", esCorrecta: false }
              ],
              explicacion: "La opción A identifica el numeral técnico de la norma internacional. Las otras opciones son interpretaciones absurdas o informales."
            },
            {
              texto: "Al identificar las causas raíz de los bajos indicadores de satisfacción, ¿qué técnica recomienda usar?",
              opciones: [
                { letra: "A", texto: "El Diagrama de Ishikawa (Espina de Pescado) o los '5 Porqués' para profundizar en las razones reales de la insatisfacción ciudadana.", esCorrecta: true },
                { letra: "B", texto: "Lanzar dados y asignarle la culpa al azar a cualquier funcionario de la secretaría para cerrar el reporte de calidad rápido.", esCorrecta: false },
                { letra: "C", texto: "Hacer una encuesta donde solo se le pregunte a la gente que se ve feliz en la calle, para que los indicadores de satisfacción suban al 100%.", esCorrecta: false }
              ],
              explicacion: "La opción A utiliza herramientas técnicas de gestión de calidad. La B y la C son prácticas mediocres o fraudulentas."
            },
            {
              texto: "¿Cuál es el fin último de mantener la certificación de calidad en la Gobernación de Caldas?",
              opciones: [
                { letra: "A", texto: "Garantizar que los procesos institucionales sean consistentes, eficaces y estén orientados a la satisfacción plena del ciudadano.", esCorrecta: true },
                { letra: "B", texto: "Poder poner el logo de la certificación en los folletos de campaña política del próximo candidato a la Gobernación.", esCorrecta: false },
                { letra: "C", texto: "Que los funcionarios tengan una excusa para no hacer su trabajo real por estar ocupados llenando formatos de calidad todo el día.", esCorrecta: false }
              ],
              explicacion: "La opción A define el propósito real del sistema de gestión. Las otras opciones son usos indebidos o percepciones negativas del sistema."
            }
          ]
        },
        {
          contenido: "Como experto en calidad de la Gobernación, debe liderar la transición del modelo de gestión tradicional al Modelo Integrado de Planeación y Gestión (MIPG). Muchos funcionarios ven este cambio como un aumento de la carga administrativa (más formatos y reportes). Usted debe diseñar una estrategia de comunicación pedagógica que demuestre los beneficios de la integración de políticas (talento humano, integridad, calidad, control interno) y cómo esto simplifica el trabajo diario al eliminar duplicidad de funciones.",
          categoria: "Integración de Sistemas (MIPG)", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cuál es el principal beneficio de la integración de políticas bajo el marco del MIPG?",
              opciones: [
                { letra: "A", texto: "La simplificación y armonización de procesos, evitando que cada oficina trabaje de forma aislada y pida la misma información varias veces.", esCorrecta: true },
                { letra: "B", texto: "Que ahora hay el doble de formatos para llenar, lo cual asegura que nadie tenga tiempo de cometer errores porque siempre están escribiendo.", esCorrecta: false },
                { letra: "C", texto: "Que el Director de Planeación tenga más poder sobre las demás secretarías y pueda mandar sobre todos los funcionarios sin importar su cargo.", esCorrecta: false }
              ],
              explicacion: "La opción A es la esencia de la integración administrativa del Estado. La B y la C son visiones erróneas o negativas de la gestión pública."
            },
            {
              texto: "En el marco del MIPG, ¿qué dimensión se encarga de asegurar que la entidad cuente con el personal idóneo y motivado?",
              opciones: [
                { letra: "A", texto: "La Dimensión de Talento Humano, considerada el corazón del modelo y el activo más importante de la organización pública.", esCorrecta: true },
                { letra: "B", texto: "La Dimensión de 'Cosas Baratas', que busca contratar a la gente que cobre menos sueldo sin importar si saben hacer el trabajo o no.", esCorrecta: false },
                { letra: "C", texto: "La Dimensión de 'Amigos del Jefe', que asegura que todos los puestos de la Gobernación sean ocupados por personas conocidas de la familia.", esCorrecta: false }
              ],
              explicacion: "La opción A identifica correctamente la estructura del MIPG. Las otras opciones son prácticas contrarias al mérito y a la eficiencia pública."
            },
            {
              texto: "¿Qué herramienta nacional se utiliza para medir el avance en la implementación del MIPG en la Gobernación de Caldas?",
              opciones: [
                { letra: "A", texto: "El formulario FURAG (Formulario Único de Reporte de Avance a la Gestión) que se diligencia anualmente ante la Función Pública.", esCorrecta: true },
                { letra: "B", texto: "Una encuesta de opinión en el periódico 'La Patria' de Manizales para ver si a la gente le gusta cómo se ve el edificio de la Gobernación.", esCorrecta: false },
                { letra: "C", texto: "Un examen de conocimientos generales que le hacen al Gobernador por televisión nacional cada vez que viaja a Bogotá.", esCorrecta: false }
              ],
              explicacion: "La opción A es el instrumento oficial de medición del desempeño institucional en Colombia. Las otras opciones no son herramientas técnicas de medición."
            }
          ]
        }
      ]
    },
    {
      simoId: "241400", // INST. SALUD NS - Técnico Adm. (Atención al Usuario/PQR)
      escenarios: [
        {
          contenido: "Usted es Técnico Administrativo en la oficina de Atención al Usuario del Instituto Departamental de Salud de Norte de Santander. Recibe a una madre desesperada porque a su hijo de 5 años con leucemia no le han entregado los medicamentos de quimioterapia en la farmacia de la EPS, bajo el argumento de que no hay inventario disponible. Usted debe activar de inmediato la ruta de protección de la salud, radicar la PQR con carácter prioritario (por riesgo de vida) y contactar al enlace regional de la Superintendencia de Salud para asegurar la entrega inmediata.",
          categoria: "Defensa del Usuario en Salud", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cuál es el término legal para dar respuesta a una PQR en salud cuando está en riesgo la vida o la integridad del paciente?",
              opciones: [
                { letra: "A", texto: "De forma inmediata o en un término no mayor a 24-48 horas, dada la urgencia vital y la protección especial a menores con enfermedades ruinosas.", esCorrecta: true },
                { letra: "B", texto: "Quince días hábiles, igual que cualquier otra carta, porque ante la ley todos los ciudadanos y todos los problemas son iguales.", esCorrecta: false },
                { letra: "C", texto: "Un mes, para darle tiempo a la farmacia de que fabrique los medicamentos o los importe de otro país con calma.", esCorrecta: false }
              ],
              explicacion: "La opción A refleja la prioridad en salud y la protección constitucional reforzada a niños y pacientes con enfermedades graves. Las otras opciones son negligencias que pueden causar la muerte."
            },
            {
              texto: "Ante el argumento de 'falta de inventario' de la EPS, ¿qué debe exigir técnicamente el Instituto de Salud?",
              opciones: [
                { letra: "A", texto: "La entrega inmediata mediante la compra en red alterna o suministro directo, ya que el desabastecimiento administrativo no es excusa para negar el servicio.", esCorrecta: true },
                { letra: "B", texto: "Decirle a la madre que tenga paciencia y que rece mucho para que los medicamentos lleguen pronto en el próximo camión.", esCorrecta: false },
                { letra: "C", texto: "Sugerir a la madre que ella misma compre los medicamentos en una farmacia comercial y que luego le pida el favor a la EPS de que le devuelvan la plata.", esCorrecta: false }
              ],
              explicacion: "La opción A protege el derecho fundamental a la salud. El riesgo administrativo de la EPS no puede trasladarse al usuario vulnerable."
            },
            {
              texto: "¿Qué valor del servicio público destaca al gestionar con rapidez este tipo de casos críticos en el Instituto de Salud?",
              opciones: [
                { letra: "A", texto: "El Compromiso, reconociendo que su labor diaria impacta directamente en la vida y el bienestar de los ciudadanos de Norte de Santander.", esCorrecta: true },
                { letra: "B", texto: "La Indiferencia, cumpliendo solo con el horario de oficina sin importar si los pacientes reciben su tratamiento o no.", esCorrecta: false },
                { letra: "C", texto: "La Frialdad, tratando a las personas como si fueran simples números de radicado en una pantalla de computador.", esCorrecta: false }
              ],
              explicacion: "La opción A es uno de los valores rectores de la integridad pública en Colombia. Las otras opciones son actitudes negativas que degradan la función pública."
            }
          ]
        },
        {
          contenido: "Como Técnico de Atención al Usuario, debe elaborar el informe mensual de los motivos de insatisfacción reportados por los ciudadanos sobre el servicio de las IPS públicas en el departamento. Nota que el 60% de las quejas se concentran en la demora para la asignación de citas con especialistas (más de 3 meses de espera). Usted debe tabular los datos por municipio, identificar las especialidades con mayor déficit y proponer al área técnica del Instituto una jornada de auditoría a la red prestadora para verificar el cumplimiento de los tiempos de oportunidad.",
          categoria: "Análisis de PQR y Oportunidad", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Qué indicador de calidad en salud se está viendo afectado principalmente según este reporte?",
              opciones: [
                { letra: "A", texto: "El indicador de Oportunidad, que mide el tiempo transcurrido entre la solicitud de la cita y la prestación efectiva del servicio.", esCorrecta: true },
                { letra: "B", texto: "El indicador de Rentabilidad, que mide cuánto dinero le queda de ganancia a la IPS después de atender a cada paciente con especialista.", esCorrecta: false },
                { letra: "C", texto: "El indicador de Estética, que evalúa si los consultorios médicos están pintados de colores bonitos que calmen a los pacientes.", esCorrecta: false }
              ],
              explicacion: "La opción A es el criterio técnico de calidad definido por el Ministerio de Salud. Las otras opciones no evalúan la oportunidad del servicio asistencial."
            },
            {
              texto: "Al tabular las quejas por municipio, ¿qué herramienta de análisis de datos es más útil para visualizar los puntos críticos?",
              opciones: [
                { letra: "A", texto: "Un mapa de calor (Georreferenciación) que muestre la intensidad de las quejas por zona geográfica, facilitando la toma de decisiones territoriales.", esCorrecta: true },
                { letra: "B", texto: "Un dibujo de un sol radiante sobre los municipios donde no hay quejas y una nube negra sobre los municipios donde la gente se queja mucho.", esCorrecta: false },
                { letra: "C", texto: "No hacer ninguna tabla y tratar de memorizar todos los nombres de los municipios y sus problemas para contárselos al jefe en el ascensor.", esCorrecta: false }
              ],
              explicacion: "La opción A es una técnica moderna de análisis de gestión pública. Las otras opciones son informales o poco profesionales."
            },
            {
              texto: "¿Cuál es el fin último de realizar este seguimiento detallado a las quejas ciudadanas en salud?",
              opciones: [
                { letra: "A", texto: "Mejorar la prestación del servicio, asegurar el cumplimiento de la norma y proteger los derechos de los usuarios del sistema departamental.", esCorrecta: true },
                { letra: "B", texto: "Descubrir qué médicos son los que más vacaciones se toman para poder chismosear sobre ellos en el descanso de la oficina.", esCorrecta: false },
                { letra: "C", texto: "Tener una base de datos de gente enojada para no contestarles el teléfono cuando vuelvan a llamar al Instituto de Salud.", esCorrecta: false }
              ],
              explicacion: "La opción A define el propósito técnico y ético del control social y la vigilancia en salud. Las otras opciones son prácticas contrarias al servicio público."
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
