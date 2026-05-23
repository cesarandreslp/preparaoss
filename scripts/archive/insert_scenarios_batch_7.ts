import { PrismaClient, TipoPregunta, NivelDificultad } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const dataToInsert: any[] = [
    {
      simoId: "241435", // INST. SALUD NS - Técnico Adm. (Sistemas)
      escenarios: [
        {
          contenido: "Usted es Técnico Administrativo en el área de sistemas del Instituto Departamental de Salud de Norte de Santander. Durante un pico epidemiológico de dengue en el departamento, el sistema de información para el reporte de casos (SIVIGILA) presenta una falla masiva en los servidores locales, impidiendo que los municipios carguen la información de manera oportuna. Usted debe liderar la recuperación de los servicios, asegurar que no se pierdan los datos ya ingresados y proponer un plan de contingencia para el flujo de información mientras se restablece la plataforma tecnológica.",
          categoria: "Sistemas de Información", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cuál es su primera acción técnica ante la falla masiva del servidor?",
              opciones: [
                { letra: "A", texto: "Verificar la integridad de las copias de respaldo (backups) más recientes y evaluar si es necesario realizar una restauración en un servidor espejo.", esCorrecta: true },
                { letra: "B", texto: "Formatear todos los computadores de la entidad de inmediato para ver si así el sistema vuelve a funcionar 'desde cero'.", esCorrecta: false },
                { letra: "C", texto: "Pedirle a los municipios que dejen de reportar casos de dengue para que el servidor no tenga tanta carga y se arregle solo.", esCorrecta: false }
              ],
              explicacion: "La opción A garantiza la disponibilidad y protección de los datos de salud pública. La B es una medida desproporcionada e inútil y la C es una negligencia que afecta la vigilancia epidemiológica."
            },
            {
              texto: "Como plan de contingencia para el reporte de casos, ¿qué medida administrativa recomienda?",
              opciones: [
                { letra: "A", texto: "Habilitar canales alternos de recepción de información (formularios en la nube protegidos o archivos planos por correo seguro) con validación posterior.", esCorrecta: true },
                { letra: "B", texto: "Decirle a los secretarios de salud municipal que guarden la información en su memoria y que la reporten cuando el sistema funcione, así sea en un mes.", esCorrecta: false },
                { letra: "C", texto: "Mandar a todos los funcionarios de sistemas a vacaciones mientras el servidor se enfría y vuelve a prender solo.", esCorrecta: false }
              ],
              explicacion: "La opción A permite la continuidad del servicio de vigilancia en salud pública. La B pone en riesgo la oportunidad de la información y la C es una falta de responsabilidad institucional."
            },
            {
              texto: "Para mejorar la seguridad de la información en el Instituto, ¿qué protocolo técnico debe reforzar?",
              opciones: [
                { letra: "A", texto: "El protocolo de acceso y autenticación multifactor para los usuarios del sistema, asegurando la trazabilidad de los cambios realizados.", esCorrecta: true },
                { letra: "B", texto: "El protocolo de 'no tocar nada', prohibiendo que cualquier persona use los computadores de la entidad para que no se dañen más.", esCorrecta: false },
                { letra: "C", texto: "El protocolo de 'compartir contraseñas', para que si alguien olvida su clave, cualquier compañero pueda prestarle la suya y seguir trabajando.", esCorrecta: false }
              ],
              explicacion: "La opción A sigue los estándares de seguridad de la información (ISO 27001/MIPG). La B es absurda en una oficina moderna y la C es una vulnerabilidad crítica de seguridad."
            }
          ]
        },
        {
          contenido: "Como Técnico de Sistemas del Instituto de Salud, recibe múltiples reportes de usuarios que afirman haber recibido correos electrónicos que parecen ser de la entidad, solicitando actualizar sus datos personales y contraseñas de acceso al sistema de salud. Al revisar, usted identifica un ataque de 'phishing' dirigido a los funcionarios. Debe actuar de inmediato para alertar a la organización, bloquear los sitios fraudulentos y realizar una jornada de capacitación técnica sobre ciberseguridad para prevenir la fuga de información sensible de pacientes.",
          categoria: "Ciberseguridad", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cuál es la medida técnica inmediata para mitigar el ataque de phishing detectado?",
              opciones: [
                { letra: "A", texto: "Alertar a través de los canales institucionales sobre el correo falso, bloquear los dominios atacantes en el firewall y solicitar el cambio de contraseñas.", esCorrecta: true },
                { letra: "B", texto: "Borrar todos los correos electrónicos de la entidad, tanto los buenos como los malos, para estar seguros de que no queda ningún virus.", esCorrecta: false },
                { letra: "C", texto: "Ignorar el tema porque usted cree que los funcionarios son lo suficientemente inteligentes para no dejarse engañar por un correo falso.", esCorrecta: false }
              ],
              explicacion: "La opción A es el protocolo estándar de respuesta ante incidentes de seguridad informática. La B es destructiva y la C es una negligencia profesional grave."
            },
            {
              texto: "En una jornada de capacitación, ¿qué recomendación técnica es clave para identificar un correo fraudulento?",
              opciones: [
                { letra: "A", texto: "Verificar la dirección real del remitente, no hacer clic en enlaces sospechosos y desconfiar de mensajes que exijan acciones urgentes bajo amenaza.", esCorrecta: true },
                { letra: "B", texto: "Fijarse solo en si el correo tiene el logo de la Gobernación, ya que los hackers nunca pueden copiar un logo oficial de manera exacta.", esCorrecta: false },
                { letra: "C", texto: "Revisar si el correo tiene errores de ortografía; si está bien escrito, entonces es totalmente seguro y se puede confiar en él.", esCorrecta: false }
              ],
              explicacion: "La opción A enseña buenas prácticas de seguridad digital. La B y la C son criterios falsos, ya que los atacantes modernos son muy precisos en sus suplantaciones."
            },
            {
              texto: "¿Qué norma nacional regula la protección de datos personales en el manejo de sistemas de información de salud?",
              opciones: [
                { letra: "A", texto: "La Ley 1581 de 2012 (Habeas Data) y normas específicas sobre reserva de la historia clínica.", esCorrecta: true },
                { letra: "B", texto: "La Ley Seca, que prohíbe que los datos personales se beban o se compartan en fiestas privadas de los funcionarios.", esCorrecta: false },
                { letra: "C", texto: "El Código de Tránsito, porque los datos viajan por las autopistas de la información y deben seguir las señales de pare.", esCorrecta: false }
              ],
              explicacion: "La opción A es la base legal para la protección de datos en Colombia. La B y la C son interpretaciones absurdas que no tienen relación con el tema técnico."
            }
          ]
        }
      ]
    },
    {
      simoId: "231572", // IBAGUÉ - Prof. Especializado (Supervisión)
      escenarios: [
        {
          contenido: "Usted es Profesional Especializado en la Alcaldía de Ibagué y ha sido designado como supervisor de un convenio de asociación suscrito con una entidad sin ánimo de lucro (ESAL) para la atención integral de adultos mayores. Durante una visita de supervisión técnica, encuentra que la calidad de los alimentos suministrados no corresponde a la minuta nutricional aprobada y que se está cobrando una cuota extra a los beneficiarios, lo cual está prohibido en el convenio. El representante legal de la ESAL argumenta que los costos han subido y que la cuota es 'voluntaria' para mejorar las instalaciones.",
          categoria: "Supervisión de Convenios", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cuál es su acción inmediata frente al incumplimiento de la minuta nutricional y el cobro de cuotas?",
              opciones: [
                { letra: "A", texto: "Aceptar la explicación de la ESAL y permitir el cobro para que los ancianos tengan mejores sillas en el comedor.", esCorrecta: false },
                { letra: "B", texto: "Levantar un acta detallada del hallazgo, conminar al cumplimiento inmediato y dar traslado a la oficina jurídica para iniciar el proceso de incumplimiento.", esCorrecta: true },
                { letra: "C", texto: "Pedirle a la ESAL que le den a usted también una parte de las cuotas 'voluntarias' para no reportar el problema al Alcalde de Ibagué.", esCorrecta: false }
              ],
              explicacion: "La opción B cumple con el deber de supervisión y protección de recursos públicos. La A es una omisión del deber y la C es un delito contra la administración pública."
            },
            {
              texto: "Respecto a la minuta nutricional, ¿qué estándar técnico debe exigir para garantizar la calidad del servicio?",
              opciones: [
                { letra: "A", texto: "El cumplimiento estricto de los gramajes, aportes calóricos y condiciones de inocuidad definidos por el ICBF o la autoridad de salud.", esCorrecta: true },
                { letra: "B", texto: "Que la comida sepa rico y que los platos se vean grandes, sin importar si los alimentos están vencidos o no tienen nutrientes.", esCorrecta: false },
                { letra: "C", texto: "Que solo se les dé arroz y lentejas todos los días para ahorrar presupuesto y que el convenio dure más meses de lo planeado.", esCorrecta: false }
              ],
              explicacion: "La opción A asegura el bienestar de la población vulnerable atendida. La B ignora la seguridad alimentaria y la C es un maltrato y una violación a los términos del convenio."
            },
            {
              texto: "En el marco del SIGAMI (Sistema de Gestión de Ibagué), ¿cómo debe documentar su gestión de supervisión?",
              opciones: [
                { letra: "A", texto: "Mediante informes periódicos de supervisión, actas de visita foliadas y el cargue de evidencias fotográficas y documentales en el software de la entidad.", esCorrecta: true },
                { letra: "B", texto: "Escribiendo notitas en papeles adhesivos y pegándolas en su escritorio para acordarse de qué pasó en cada visita.", esCorrecta: false },
                { letra: "C", texto: "No documentar nada para que si hay una investigación de la Contraloría, no encuentren pruebas de los errores de la ESAL.", esCorrecta: false }
              ],
              explicacion: "La opción A garantiza la trazabilidad y la rendición de cuentas (MIPG). Las otras opciones son prácticas administrativas deficientes o sospechosas."
            }
          ]
        },
        {
          contenido: "Como Profesional de la Alcaldía de Ibagué, se le asigna liderar un proyecto para la simplificación de trámites en la Secretaría de Planeación. Actualmente, el trámite de 'Concepto de Uso de Suelo' tarda 45 días y requiere 8 documentos físicos. Los ciudadanos se quejan constantemente y el índice de satisfacción es muy bajo. Usted debe proponer una reingeniería del proceso, aplicar tecnologías de la información y asegurar que la reducción de requisitos no comprometa la legalidad urbanística del municipio.",
          categoria: "Racionalización de Trámites", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Qué herramienta del MIPG debe utilizar para la simplificación de este trámite?",
              opciones: [
                { letra: "A", texto: "La Guía para la Simplificación de Trámites de la Función Pública, aplicando la eliminación de pasos innecesarios y la automatización.", esCorrecta: true },
                { letra: "B", texto: "Pedirle a los funcionarios que trabajen 15 horas diarias sin descanso para que los trámites salgan más rápido sin cambiar nada del proceso.", esCorrecta: false },
                { letra: "C", texto: "Eliminar el trámite por completo y que cada quien construya donde quiera en Ibagué para que no tengan que hacer filas en la alcaldía.", esCorrecta: false }
              ],
              explicacion: "La opción A sigue la política de racionalización de trámites del Estado. La B es una violación a los derechos laborales y la C genera un caos urbanístico ilegal."
            },
            {
              texto: "Respecto a la exigencia de documentos, ¿qué principio de la Ley Antitrámites debe aplicar?",
              opciones: [
                { letra: "A", texto: "La prohibición de exigir documentos que ya reposen en la entidad o que puedan ser consultados en bases de datos de otras entidades estatales.", esCorrecta: true },
                { letra: "B", texto: "Exigir siempre los documentos en original, autenticados ante notario y en carpeta de cartulina fina para que el archivo se vea elegante.", esCorrecta: false },
                { letra: "C", texto: "Pedir 5 copias de cada documento solo para asegurar que si se pierde una, queden otras 4 guardadas en diferentes oficinas.", esCorrecta: false }
              ],
              explicacion: "La opción A es el mandato del Decreto Ley 019 de 2012. La B y la C son barreras administrativas prohibidas que aumentan los costos para el ciudadano."
            },
            {
              texto: "¿Cuál es el indicador más relevante para medir el éxito de la simplificación del trámite?",
              opciones: [
                { letra: "A", texto: "La reducción del tiempo de respuesta al ciudadano y el incremento en el nivel de satisfacción reportado en las encuestas de servicio.", esCorrecta: true },
                { letra: "B", texto: "La cantidad de café que consumieron los funcionarios durante las reuniones de rediseño del proceso administrativo.", esCorrecta: false },
                { letra: "C", texto: "El número de hojas de papel que se ahorraron, sin importar si el trámite ahora es más difícil de hacer por internet.", esCorrecta: false }
              ],
              explicacion: "La opción A mide el impacto real en el ciudadano y la eficiencia administrativa. La B es irrelevante y la C es un indicador parcial que ignora la facilidad de uso."
            }
          ]
        }
      ]
    },
    {
      simoId: "235063", // TUNJA - Aux. Administrativo
      escenarios: [
        {
          contenido: "Usted es Auxiliar Administrativo en la Alcaldía de Tunja, asignado al área de atención al ciudadano. Llega una persona muy alterada gritando que hace tres meses radicó un derecho de petición sobre un problema de alcantarillado en su barrio y no ha recibido respuesta. El ciudadano amenaza con encadenarse a la puerta de la Alcaldía si no le entregan una solución hoy mismo. Usted debe gestionar la situación, calmar al ciudadano y realizar la trazabilidad del documento para identificar en qué dependencia se encuentra detenido el trámite.",
          categoria: "Atención al Ciudadano", dificultad: "BASICO",
          preguntas: [
            {
              texto: "¿Cuál es su primera reacción ante el ciudadano agresivo?",
              opciones: [
                { letra: "A", texto: "Escuchar con empatía, mantener la calma, validar su queja y solicitarle los datos del radicado para verificar el estado actual del trámite.", esCorrecta: true },
                { letra: "B", texto: "Llamar a la policía de inmediato para que se lleven al ciudadano preso por gritar dentro de una oficina pública de la Alcaldía de Tunja.", esCorrecta: false },
                { letra: "C", texto: "Gritarle más fuerte al ciudadano para demostrarle que usted es la autoridad y que en esa oficina se debe guardar silencio absoluto.", esCorrecta: false }
              ],
              explicacion: "La opción A aplica los protocolos de buen trato y servicio al ciudadano. La B escala el conflicto innecesariamente y la C es una falta de profesionalismo y respeto."
            },
            {
              texto: "Al verificar en el sistema de gestión documental, nota que el trámite no ha sido respondido por la Secretaría de Infraestructura. ¿Qué debe hacer?",
              opciones: [
                { letra: "A", texto: "Informar al ciudadano el estado actual, pedir disculpas por la demora y generar una alerta interna urgente a la dependencia responsable para su respuesta inmediata.", esCorrecta: true },
                { letra: "B", texto: "Decirle al ciudadano que la culpa es de los ingenieros de Infraestructura que son unos perezosos y que él debería ir a gritarles a ellos personalmente.", esCorrecta: false },
                { letra: "C", texto: "Borrar el radicado del sistema para que parezca que el ciudadano nunca entregó nada y así la Alcaldía no quede mal por la demora.", esCorrecta: false }
              ],
              explicacion: "La opción A asume la responsabilidad institucional y busca la solución. La B genera conflictos internos y la C es una conducta deshonesta y potencialmente ilegal."
            },
            {
              texto: "Respecto al término legal para responder un derecho de petición de interés general, ¿cuál es la norma general?",
              opciones: [
                { letra: "A", texto: "Quince (15) días hábiles siguientes a su recepción, salvo que la ley establezca un término diferente para ciertos temas específicos.", esCorrecta: true },
                { letra: "B", texto: "Toda la vida, porque el Estado tiene mucho trabajo y el ciudadano debe ser paciente y esperar años si es necesario.", esCorrecta: false },
                { letra: "C", texto: "Dos horas, porque el ciudadano siempre tiene la razón y la Alcaldía debe dejar de hacer todo para atenderlo a él solamente.", esCorrecta: false }
              ],
              explicacion: "La opción A es el término general definido en la Ley 1755 de 2015. Las otras opciones son erróneas o exageradas."
            }
          ]
        },
        {
          contenido: "Como Auxiliar Administrativo en Tunja, usted es responsable de clasificar y archivar la correspondencia de su dependencia. Al finalizar la jornada, recibe un sobre que contiene una notificación judicial con un término de respuesta que vence al día siguiente. Usted debe asegurar que el documento llegue de inmediato al Jefe de la Oficina Jurídica, realizar el registro en el sistema y verificar que se inicie el trámite de respuesta para evitar perjuicios económicos al municipio por una defensa extemporánea.",
          categoria: "Gestión Documental", dificultad: "BASICO",
          preguntas: [
            {
              texto: "¿Cuál es el procedimiento prioritario para esta correspondencia urgente?",
              opciones: [
                { letra: "A", texto: "Radicar de inmediato, digitalizar el documento y entregarlo personalmente bajo firma de recibido al responsable de la defensa jurídica.", esCorrecta: true },
                { letra: "B", texto: "Guardar el sobre en el cajón de su escritorio y esperar a que alguien pregunte por él la próxima semana cuando usted tenga más tiempo.", esCorrecta: false },
                { letra: "C", texto: "Abrir el sobre, leer la demanda y darle consejos legales al Alcalde sobre cómo ganar el caso sin ser usted abogado.", esCorrecta: false }
              ],
              explicacion: "La opción A garantiza la oportunidad en la gestión de términos legales. La B es una negligencia que genera responsabilidad administrativa y la C es una extralimitación de funciones."
            },
            {
              texto: "Al archivar los documentos en el expediente respectivo, ¿qué criterio debe seguir?",
              opciones: [
                { letra: "A", texto: "Seguir el orden cronológico de los documentos, asegurar que estén debidamente foliados y que coincidan con el índice del expediente.", esCorrecta: true },
                { letra: "B", texto: "Poner los papeles más bonitos y coloridos al principio del expediente para que el jefe se ponga alegre cuando abra la carpeta.", esCorrecta: false },
                { letra: "C", texto: "Usar clips de metal oxidados y grapas en exceso para que los papeles nunca se suelten, aunque se rompan al intentar leerlos.", esCorrecta: false }
              ],
              explicacion: "La opción A cumple con los estándares de archivo y gestión documental. La B y la C son prácticas incorrectas que dificultan la consulta y dañan el material documental."
            },
            {
              texto: "¿Qué importancia tiene la 'Tabla de Retención Documental' (TRD) en su labor diaria?",
              opciones: [
                { letra: "A", texto: "Define cuánto tiempo debe permanecer cada documento en la oficina y cuál es su destino final (eliminación o archivo histórico).", esCorrecta: true },
                { letra: "B", texto: "Es una tabla de multiplicar que usan los auxiliares administrativos para contar cuántas hojas hay en cada caja de archivo.", esCorrecta: false },
                { letra: "C", texto: "Es una lista de los nombres de todos los funcionarios de la Alcaldía de Tunja organizados por el tamaño de sus oficinas.", esCorrecta: false }
              ],
              explicacion: "La opción A es la definición técnica de la TRD. Las otras opciones son interpretaciones erróneas que no tienen relación con la gestión de archivos."
            }
          ]
        }
      ]
    },
    {
      simoId: "227821", // ASAMBLEA TOLIMA - Aux. Adm. (Actas)
      escenarios: [
        {
          contenido: "Usted es Auxiliar Administrativo en la Asamblea Departamental del Tolima. Su función principal es la grabación y digitación de las actas de las sesiones plenarias. Durante un debate acalorado sobre el presupuesto departamental, el sistema de audio presenta fallas y algunas intervenciones de los diputados no quedan grabadas con claridad. Usted debe reconstruir el acta, utilizando sus notas manuales, consultando con los secretarios de comisión y asegurando que el documento final refleje fielmente lo discutido y votado, cumpliendo con la validez legal del acta.",
          categoria: "Producción de Actas", dificultad: "BASICO",
          preguntas: [
            {
              texto: "¿Cuál es la fuente más confiable para reconstruir una intervención no grabada con claridad?",
              opciones: [
                { letra: "A", texto: "Contrastar sus notas con las de la Secretaría General y, si persiste la duda, solicitar al diputado respectivo que ratifique el sentido de su intervención.", esCorrecta: true },
                { letra: "B", texto: "Inventar lo que el diputado pudo haber dicho basándose en los rumores que escuchó en los pasillos de la Asamblea después de la sesión.", esCorrecta: false },
                { letra: "C", texto: "Dejar un espacio en blanco en el acta y poner una nota que diga: 'aquí el audio se dañó y no sabemos qué pasó, así que no importa'.", esCorrecta: false }
              ],
              explicacion: "La opción A busca la veracidad y legalidad del documento público. La B es una falta de integridad y la C resta validez al acta de una corporación pública."
            },
            {
              texto: "Al digitar el acta, un diputado le pide que borre una frase grosera que dijo durante el debate para que no quede mal ante sus electores. ¿Qué hace?",
              opciones: [
                { letra: "A", texto: "Borrar la frase de inmediato para quedar bien con el diputado y evitar que él se queje con su jefe directo.", esCorrecta: false },
                { letra: "B", texto: "Mantener la frase tal cual fue dicha, ya que el acta debe ser un reflejo fiel y exacto de lo ocurrido en la sesión pública.", esCorrecta: true },
                { letra: "C", texto: "Cambiar la frase grosera por un poema de amor para que el acta se vea más culta y elegante para el archivo histórico del Tolima.", esCorrecta: false }
              ],
              explicacion: "La opción B cumple con el deber de fidelidad de los registros públicos. La A y la C constituyen una alteración de documento público."
            },
            {
              texto: "¿Qué requisito es indispensable para que el acta de la Asamblea tenga validez legal?",
              opciones: [
                { letra: "A", texto: "Que sea aprobada por la plenaria en una sesión posterior y suscrita (firmada) por el Presidente y el Secretario de la corporación.", esCorrecta: true },
                { letra: "B", texto: "Que esté escrita en un papel con bordes dorados y que huela a perfume de rosas para que los diputados quieran leerla.", esCorrecta: false },
                { letra: "C", texto: "Que el Auxiliar Administrativo que la digitó se tome una foto con el acta y la publique en el periódico local de Ibagué.", esCorrecta: false }
              ],
              explicacion: "La opción A cumple con las normas procedimentales de las corporaciones públicas. Las otras opciones son requisitos informales o absurdos."
            }
          ]
        },
        {
          contenido: "Como Auxiliar en la Asamblea del Tolima, maneja información sobre proyectos de ordenanza que aún no han sido socializados. Un contratista de la Gobernación le ofrece una invitación a almorzar a un restaurante costoso a cambio de que le entregue una copia digital del borrador de un proyecto que afecta los intereses de su empresa. Usted debe aplicar el Código de Integridad, rechazar la oferta y reportar el intento de acceso indebido a información que aún no es pública dentro del trámite legislativo departamental.",
          categoria: "Ética Pública", dificultad: "BASICO",
          preguntas: [
            {
              texto: "¿Cuál es su respuesta ante la solicitud del contratista?",
              opciones: [
                { letra: "A", texto: "Aceptar el almuerzo pero no entregar la información, para aprovechar la comida gratis sin faltar a su deber funcional.", esCorrecta: false },
                { letra: "B", texto: "Rechazar la invitación y explicar que la información solo puede ser obtenida por los canales oficiales una vez el proyecto sea radicado.", esCorrecta: true },
                { letra: "C", texto: "Entregarle la información solo si el contratista promete que también le va a invitar a cenar a su familia el próximo fin de semana.", esCorrecta: false }
              ],
              explicacion: "La opción B cumple con los principios de integridad y reserva documental. La A y la C son conductas antiéticas y potencialmente delictivas."
            },
            {
              texto: "Respecto a la custodia de la información en su computador, ¿qué medida de seguridad aplica?",
              opciones: [
                { letra: "A", texto: "Bloquear siempre la sesión al retirarse de su puesto y usar contraseñas seguras que no sean compartidas con nadie, ni con sus compañeros.", esCorrecta: true },
                { letra: "B", texto: "Dejar el computador encendido y sin clave para que si alguien necesita un documento urgente, pueda sacarlo sin molestarlo a usted.", esCorrecta: false },
                { letra: "C", texto: "Pegar la contraseña en un papelito (post-it) en el borde de la pantalla para que nunca se le olvide cómo entrar al sistema.", esCorrecta: false }
              ],
              explicacion: "La opción A es una práctica básica de seguridad de la información institucional. La B y la C son vulnerabilidades críticas de seguridad."
            },
            {
              texto: "En el marco de los valores del servidor público, ¿cuál destaca en esta situación?",
              opciones: [
                { letra: "A", texto: "La Honestidad, actuando siempre con rectitud y transparencia en el ejercicio de sus funciones administrativas.", esCorrecta: true },
                { letra: "B", texto: "La Astucia, logrando que la gente le invite a comer sin tener que hacer nada a cambio en su trabajo diario.", esCorrecta: false },
                { letra: "C", texto: "La Velocidad, entregando los documentos a quien los pida primero para que no digan que el Estado es lento.", esCorrecta: false }
              ],
              explicacion: "La opción A es uno de los valores fundamentales del Código de Integridad del servicio público en Colombia. Las otras opciones no son valores deseables en la administración pública."
            }
          ]
        }
      ]
    },
    {
      simoId: "228701", // SENA - Asesor (Formación Profesional)
      escenarios: [
        {
          contenido: "Usted es Asesor en la Dirección de Formación Profesional del SENA. Debe proponer los lineamientos para la actualización de los programas de formación en el área de energías renovables, con el fin de responder a las metas de transición energética del Gobierno Nacional. Identifica que la infraestructura de muchos centros de formación es obsoleta para las nuevas tecnologías de hidrógeno verde y energía eólica. Usted debe diseñar una estrategia que combine la inversión en equipos, la capacitación de instructores y la articulación con empresas líderes del sector para garantizar que el SENA siga siendo pertinente.",
          categoria: "Pertinencia de la Formación", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cuál es el primer paso técnico para asegurar que los nuevos programas sean pertinentes para la industria?",
              opciones: [
                { letra: "A", texto: "Realizar un estudio de prospectiva laboral y vigilancia tecnológica para identificar las competencias reales que demanda el mercado energético actual.", esCorrecta: true },
                { letra: "B", texto: "Comprar los equipos más caros que vea en internet y luego tratar de inventar un programa que se parezca a lo que compraron.", esCorrecta: false },
                { letra: "C", texto: "Preguntarles a los estudiantes qué les gustaría aprender, asumiendo que ellos conocen mejor el futuro de la industria que los expertos.", esCorrecta: false }
              ],
              explicacion: "La opción A fundamenta el diseño curricular en necesidades reales del sector productivo. La B es una mala inversión y la C es un criterio insuficiente para la formación técnica profesional."
            },
            {
              texto: "Para solventar la falta de infraestructura propia de manera rápida, ¿qué estrategia de asesoría propone?",
              opciones: [
                { letra: "A", texto: "Promover convenios de formación en ambiente real de empresa (Dual), donde los aprendices usen la tecnología de punta de las empresas aliadas.", esCorrecta: true },
                { letra: "B", texto: "Decirle a los instructores que usen su imaginación y que dibujen los generadores eólicos en el tablero para que los alumnos se los imaginen.", esCorrecta: false },
                { letra: "C", texto: "Cerrar los programas de formación hasta que el SENA tenga dinero para construir sus propios laboratorios de última generación.", esCorrecta: false }
              ],
              explicacion: "La opción A es una estrategia de formación efectiva y moderna que optimiza recursos. La B no desarrolla competencias reales y la C afecta el acceso a la educación."
            },
            {
              texto: "Al evaluar la calidad de los nuevos programas, ¿qué indicador es fundamental para su asesoría?",
              opciones: [
                { letra: "A", texto: "La tasa de vinculación laboral efectiva de los egresados en empresas del sector de energías renovables.", esCorrecta: true },
                { letra: "B", texto: "El número de folletos coloridos que se imprimieron para promocionar el programa en las ferias educativas de los pueblos.", esCorrecta: false },
                { letra: "C", texto: "La cantidad de aplausos que recibió el Director del SENA el día que anunció la creación de los programas por televisión.", esCorrecta: false }
              ],
              explicacion: "La opción A mide el impacto misional del SENA. La B es un indicador de mercadeo y la C es un indicador de imagen política sin valor técnico pedagógico."
            }
          ]
        },
        {
          contenido: "Como Asesor del SENA, debe evaluar una propuesta de convenio internacional con una agencia de cooperación alemana para certificar las competencias laborales de técnicos colombianos en el área de construcción sostenible. El convenio exige que el SENA adapte sus normas de competencia a estándares europeos, lo que implica un cambio en la metodología de evaluación actual. Usted debe emitir un concepto técnico que valore los beneficios para los trabajadores colombianos, los riesgos de soberanía educativa y la viabilidad técnica de la implementación en los centros de formación.",
          categoria: "Cooperación Internacional", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Qué aspecto debe primar en su concepto técnico sobre la adopción de estándares internacionales?",
              opciones: [
                { letra: "A", texto: "La movilidad laboral y el reconocimiento internacional de las certificaciones del SENA para mejorar las oportunidades de los trabajadores.", esCorrecta: true },
                { letra: "B", texto: "El rechazo a cualquier norma extranjera por el simple hecho de no haber sido inventada en Colombia por funcionarios del SENA.", esCorrecta: false },
                { letra: "C", texto: "Aceptar todo lo que propongan los extranjeros solo porque ellos vienen de un país que se ve más bonito en los mapas turísticos.", esCorrecta: false }
              ],
              explicacion: "La opción A prioriza el beneficio para el ciudadano y la competitividad nacional. La B es una postura cerrada ineficiente y la C es una falta de criterio técnico propio."
            },
            {
              texto: "Al analizar la viabilidad técnica de la implementación, ¿qué factor es crítico revisar?",
              opciones: [
                { letra: "A", texto: "La capacidad instalada en los Centros de Formación (equipos y simuladores) y el nivel de actualización técnica de los evaluadores de competencias.", esCorrecta: true },
                { letra: "B", texto: "Si el restaurante del Centro de Formación sabe preparar comida alemana para recibir a los delegados de la cooperación internacional.", esCorrecta: false },
                { letra: "C", texto: "El color de la pintura de los talleres, asegurando que combine con la bandera de Alemania para que se sientan como en casa.", esCorrecta: false }
              ],
              explicacion: "La opción A evalúa las condiciones reales para el éxito del proyecto. Las otras opciones son temas protocolarios irrelevantes para la calidad técnica del convenio."
            },
            {
              texto: "¿Cuál es el fin último de la certificación de competencias laborales en el SENA según su asesoría?",
              opciones: [
                { letra: "A", texto: "Reconocer formalmente los aprendizajes previos y la experiencia del trabajador para mejorar su perfil de empleabilidad.", esCorrecta: true },
                { letra: "B", texto: "Tener una base de datos de personas para llamarlas el día de las elecciones y decirles por quién deben votar.", esCorrecta: false },
                { letra: "C", texto: "Cobrarle al trabajador una suma de dinero por cada certificado que se le entregue para financiar los lujos de la Dirección General.", esCorrecta: false }
              ],
              explicacion: "La opción A es el propósito misional del proceso de evaluación y certificación. Las otras opciones son usos indebidos o ilegales del servicio público."
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
