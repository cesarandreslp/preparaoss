import { PrismaClient, TipoPregunta, NivelDificultad } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const opecs = await prisma.opec.findMany({
    where: {
      estado: "ACTIVA",
      escenarios: { none: {} },
    },
    take: 20,
    orderBy: { createdAt: "asc" },
  });

  const dataToInsert: any[] = [
    {
      simoId: "240166", // PROFESIONAL UNIVERSITARIO - AGUACHICA (Psicología)
      escenarios: [
        {
          contenido: "Usted es Psicólogo en la Comisaría de Familia de la Alcaldía de Aguachica. Se recibe un caso reportado por una institución educativa sobre un niño de 8 años que presenta signos de descuido personal y desnutrición aparente. Durante la entrevista inicial con la madre, ella manifiesta dificultades económicas extremas y falta de redes de apoyo. Usted debe realizar la verificación del estado de cumplimiento de los derechos del niño, emitir un concepto integral y proponer medidas de restablecimiento que garanticen su bienestar, coordinando con el Comisario de Familia y otras entidades del Sistema Nacional de Bienestar Familiar (SNBF).",
          categoria: "Protección Social", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "Al realizar la entrevista al menor, usted nota que el niño tiene miedo de hablar sobre lo que sucede en casa. ¿Cuál es su técnica de abordaje?",
              opciones: [
                { letra: "A", texto: "Presionar al niño recordándole que es su obligación decir la verdad para que la policía no se lleve a su mamá.", esCorrecta: false },
                { letra: "B", texto: "Utilizar herramientas lúdicas y un lenguaje adaptado a su edad para generar un espacio de confianza y seguridad emocional.", esCorrecta: true },
                { letra: "C", texto: "Interrumpir la entrevista y pedirle a la madre que entre para que ella explique por qué el niño está tan asustado.", esCorrecta: false }
              ],
              explicacion: "La opción B sigue los estándares de entrevista forense y psicológica para menores, garantizando el interés superior del niño. La A es revictimizante y la C contamina el testimonio y pone en riesgo al menor."
            },
            {
              texto: "En su concepto integral, usted determina que existe una vulneración por inobservancia de derechos. ¿Qué medida prioritaria recomienda?",
              opciones: [
                { letra: "A", texto: "La vinculación inmediata del menor y su familia a la oferta institucional de salud, nutrición y programas de apoyo social del municipio.", esCorrecta: true },
                { letra: "B", texto: "El retiro inmediato del niño de su hogar para ser entregado en adopción internacional, dado que la madre no tiene dinero.", esCorrecta: false },
                { letra: "C", texto: "Sugerir que el caso se archive porque la pobreza no es una razón legal para que el Estado intervenga en la vida privada de las familias.", esCorrecta: false }
              ],
              explicacion: "La opción A busca el restablecimiento de derechos manteniendo el vínculo familiar cuando es posible (Ley 1098 de 2006). La B es una medida extrema y desproporcionada, y la C ignora el deber de protección del Estado ante la vulneración de derechos mínimos."
            },
            {
              texto: "El Comisario le pide que asista a una audiencia de pruebas. ¿Cuál es el alcance de su participación en este escenario?",
              opciones: [
                { letra: "A", texto: "Actuar como abogado defensor de la madre para evitar que le quiten la custodia, basándose en su empatía personal.", esCorrecta: false },
                { letra: "B", texto: "Sustentar técnicamente su dictamen pericial y responder a los interrogatorios sobre los hallazgos psicológicos y sociales del caso.", esCorrecta: true },
                { letra: "C", texto: "Permanecer en silencio y dejar que el Comisario decida todo, ya que el psicólogo no tiene voz ni voto en las decisiones judiciales.", esCorrecta: false }
              ],
              explicacion: "La opción B define el rol técnico del psicólogo en procesos de restablecimiento de derechos. La A confunde roles profesionales, y la C desconoce la importancia del concepto interdisciplinario en la toma de decisiones administrativas."
            }
          ]
        },
        {
          contenido: "Como Profesional Universitario en la Alcaldía de Aguachica, apoya la atención de casos de violencia intrafamiliar. Se presenta una mujer solicitando medida de protección inmediata contra su pareja. Usted debe realizar la intervención psicosocial inicial. Durante el proceso, el presunto agresor se presenta en la oficina de la Comisaría de forma violenta, exigiendo hablar con la mujer. Usted debe manejar la crisis, asegurar la integridad de la víctima y continuar con el procedimiento legal de recepción de la denuncia y evaluación de riesgo, siguiendo los lineamientos de la Ley 1257 de 2008.",
          categoria: "Derechos Humanos", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "Ante la presencia violenta del agresor en las instalaciones, ¿cuál es su primera acción de gestión?",
              opciones: [
                { letra: "A", texto: "Permitir que el hombre hable con la mujer para ver si logran una conciliación rápida y así evitar trámites judiciales largos.", esCorrecta: false },
                { letra: "B", texto: "Activar el protocolo de seguridad, separar físicamente a las partes y solicitar apoyo inmediato de la policía o personal de vigilancia.", esCorrecta: true },
                { letra: "C", texto: "Salir a confrontar al agresor personalmente para demostrar que en la Comisaría de Familia no le tienen miedo a los violentos.", esCorrecta: false }
              ],
              explicacion: "La opción B garantiza la protección de la víctima y la seguridad del recinto (Ley 1257). La A está prohibida en casos de violencia (no conciliación inicial bajo coacción), y la C es una conducta imprudente que pone en riesgo al funcionario."
            },
            {
              texto: "Al evaluar el riesgo de la víctima, usted identifica que existe un peligro inminente para su vida. ¿Qué recomendación técnica es imperativa?",
              opciones: [
                { letra: "A", texto: "Sugerir al Comisario la remisión inmediata a una casa de refugio o albergue temporal para garantizar su seguridad fuera del entorno de riesgo.", esCorrecta: true },
                { letra: "B", texto: "Pedirle a la mujer que regrese a su casa y trate de no provocar al marido mientras el juez estudia el caso la próxima semana.", esCorrecta: false },
                { letra: "C", texto: "Entregarle a la víctima un silbato para que lo use si el agresor intenta atacarla nuevamente durante el fin de semana.", esCorrecta: false }
              ],
              explicacion: "La opción A es la medida de protección técnica adecuada ante riesgo extremo. La B es una negligencia que pone en peligro la vida de la mujer, y la C es una medida totalmente insuficiente frente a la gravedad del riesgo identificado."
            },
            {
              texto: "Respecto a la confidencialidad de la información en este proceso, ¿cuál es su deber profesional?",
              opciones: [
                { letra: "A", texto: "Garantizar la reserva absoluta de la identidad y testimonios de la víctima, permitiendo el acceso solo a las autoridades competentes del proceso.", esCorrecta: true },
                { letra: "B", texto: "Publicar el caso en las redes sociales de la Alcaldía para generar conciencia social sobre la violencia de género en Aguachica.", esCorrecta: false },
                { letra: "C", texto: "Compartir los detalles del caso con sus familiares en una cena para que ellos le den consejos sobre cómo manejar mejor la situación.", esCorrecta: false }
              ],
              explicacion: "La opción A cumple con la reserva legal y la ética profesional. La B y la C vulneran el derecho a la intimidad y seguridad de la víctima, además de constituir faltas disciplinarias."
            }
          ]
        }
      ]
    },
    {
      simoId: "227878", // PROFESIONAL UNIVERSITARIO - BOYACÁ (Contratación)
      escenarios: [
        {
          contenido: "Usted se desempeña como Profesional Universitario en la Gobernación de Boyacá, adscrito al área de contratación. Tiene la tarea de revisar los documentos de soporte de una licitación pública para la adquisición de equipos de cómputo destinados a escuelas rurales. Al verificar las pólizas de garantía presentadas por el proponente que ocupó el primer lugar, observa que el objeto de la póliza de seriedad de la oferta no coincide exactamente con el objeto del proceso contractual, aunque el valor asegurado es correcto. Usted debe proyectar el informe de evaluación jurídica y recomendar la acción a seguir, considerando los términos perentorios del cronograma de contratación.",
          categoria: "Contratación Estatal", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cuál es la recomendación técnica que debe incluir en el informe de evaluación jurídica respecto a la póliza?",
              opciones: [
                { letra: "A", texto: "Rechazar la oferta de inmediato por incumplimiento insubsanable del requisito de garantía según los pliegos de condiciones.", esCorrecta: false },
                { letra: "B", texto: "Solicitar al proponente que aclare o corrija el objeto de la póliza en un plazo perentorio, siempre que no se altere la oferta económica.", esCorrecta: true },
                { letra: "C", texto: "Aceptar la póliza tal como está, argumentando que lo importante es el valor asegurado y no el texto descriptivo del objeto.", esCorrecta: false }
              ],
              explicacion: "La opción B se ajusta al principio de favorabilidad y a la ley de contratación (Ley 1150 de 2007) que permite subsanar requisitos que no afecten la asignación de puntaje. La A es excesivamente formalista y la C genera un riesgo jurídico para la entidad."
            },
            {
              texto: "En la etapa de evaluación de proponentes, usted descubre que uno de los participantes tiene una sanción vigente en el Boletín de Responsabilidad Fiscal. ¿Qué acción procede?",
              opciones: [
                { letra: "A", texto: "Permitir que siga en el proceso si el proponente se compromete a pagar la deuda con la Contraloría si llega a ganar el contrato.", esCorrecta: false },
                { letra: "B", texto: "Declarar la inhabilidad del proponente para contratar con el Estado y excluir su oferta del proceso de selección actual.", esCorrecta: true },
                { letra: "C", texto: "Ignorar la sanción de la Contraloría porque el proceso de contratación es autónomo y solo le interesan los antecedentes penales.", esCorrecta: false }
              ],
              explicacion: "La opción B es el mandato legal de las inhabilidades (Ley 80 de 1993 y Constitución Política). La A y la C son omisiones que generan nulidad absoluta del contrato y responsabilidad para el funcionario."
            },
            {
              texto: "Para asegurar la transparencia, ¿qué debe hacerse con los documentos de la licitación una vez evaluados?",
              opciones: [
                { letra: "A", texto: "Publicarlos íntegramente en la plataforma SECOP para que todos los interesados y la ciudadanía puedan ejercer control social.", esCorrecta: true },
                { letra: "B", texto: "Guardarlos en una caja bajo llave y solo permitir que el ganador de la licitación los vea para que no se copien de su estrategia comercial.", esCorrecta: false },
                { letra: "C", texto: "Entregar copias físicas únicamente a los funcionarios que sean amigos personales de los contratistas que participaron.", esCorrecta: false }
              ],
              explicacion: "La opción A cumple con el principio de publicidad y transparencia del Sistema de Contratación Pública. La B y la C vulneran el derecho al acceso a la información y el control ciudadano sobre los recursos públicos."
            }
          ]
        },
        {
          contenido: "Como Profesional en Boyacá, apoya la protocolización de un convenio interadministrativo con una Universidad Pública para la realización de un estudio de impacto ambiental. Antes de la firma, usted debe verificar que se cumplan todos los requisitos previos. Identifica que el anexo técnico del convenio no tiene la firma del profesional responsable del área técnica de la Gobernación, y que la fecha de vigencia propuesta en el borrador supera el cierre de la vigencia fiscal actual sin que exista una autorización de vigencias futuras. Su labor es asegurar la legalidad total del acto administrativo para evitar hallazgos de entes de control.",
          categoria: "Gestión Administrativa", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "Respecto a la vigencia del convenio que supera el año fiscal actual, ¿cuál es el requisito previo indispensable?",
              opciones: [
                { letra: "A", texto: "Contar con la aprobación de vigencias futuras expedida por la Asamblea Departamental o el CONFIS territorial según corresponda.", esCorrecta: true },
                { letra: "B", texto: "Nada, los convenios entre entidades públicas no están sujetos a las normas de anualidad del presupuesto nacional.", esCorrecta: false },
                { letra: "C", texto: "Firmar el convenio y dejar un espacio en blanco para ponerle la fecha del próximo año cuando ya haya presupuesto nuevo.", esCorrecta: false }
              ],
              explicacion: "La opción A es el cumplimiento de la ley orgánica de presupuesto para comprometer recursos de años posteriores. La B es falsa y la C constituye una falsedad documental y una irregularidad presupuestal grave."
            },
            {
              texto: "Ante la falta de firma del responsable técnico en el anexo, ¿qué acción administrativa toma usted?",
              opciones: [
                { letra: "A", texto: "Firmar usted mismo el anexo para no molestar al jefe de área y permitir que el convenio pase a la oficina del Gobernador hoy.", esCorrecta: false },
                { letra: "B", texto: "Devolver el expediente al área técnica solicitando el aval formal del anexo como soporte de la necesidad y calidad de lo pactado.", esCorrecta: true },
                { letra: "C", texto: "Proceder con la firma del convenio, asumiendo que el anexo es un documento secundario que no afecta la validez jurídica del contrato.", esCorrecta: false }
              ],
              explicacion: "La opción B garantiza que el convenio tenga el sustento técnico idóneo antes de nacer a la vida jurídica. La A es suplantación y la C ignora que el anexo técnico es parte integral y vinculante del acuerdo."
            },
            {
              texto: "Al archivar los documentos del convenio en el sistema, ¿cuál es la mejor práctica de gestión documental?",
              opciones: [
                { letra: "A", texto: "Escanear todos los soportes en un solo archivo PDF con el nombre 'Varios Boyacá' para ahorrar espacio en el servidor del departamento.", esCorrecta: false },
                { letra: "B", texto: "Indexar cada documento de acuerdo con la Tabla de Retención Documental (TRD) y asignar metadatos que faciliten su búsqueda y control.", esCorrecta: true },
                { letra: "C", texto: "Borrar los correos electrónicos previos de negociación para que no queden rastros de las discusiones que hubo antes de la firma final.", esCorrecta: false }
              ],
              explicacion: "La opción B sigue las normas nacionales de archivo (Ley 594 de 2000) y asegura la trazabilidad. La A dificulta la gestión de la información y la C vulnera el principio de transparencia y memoria institucional."
            }
          ]
        }
      ]
    },
    {
      simoId: "238272", // PROFESIONAL UNIVERSITARIO - NEIVA (Salud)
      escenarios: [
        {
          contenido: "Usted es Profesional Universitario en la Secretaría de Salud de Neiva, encargado del programa de Seguridad Alimentaria y Nutricional. Se le asigna la coordinación de una jornada de promoción de hábitos de vida saludable en una zona vulnerable de la ciudad. Durante la ejecución, observa que el contratista encargado de suministrar los refrigerios saludables está entregando productos con alto contenido de azúcares y grasas saturadas, alegando que los productos saludables pactados inicialmente no se consiguen en el mercado local por problemas de transporte. Usted debe intervenir para asegurar que el objetivo pedagógico de la jornada no se pierda y que se cumplan las especificaciones técnicas del contrato.",
          categoria: "Salud Pública", dificultad: "BASICO",
          preguntas: [
            {
              texto: "¿Cuál es su acción inmediata frente a la entrega de refrigerios no saludables por parte del contratista?",
              opciones: [
                { letra: "A", texto: "Permitir la entrega de los dulces para no dejar a los niños sin nada que comer, pero pedirle al contratista que no lo vuelva a hacer.", esCorrecta: false },
                { letra: "B", texto: "Rechazar la entrega de los productos que no cumplen las especificaciones técnicas y exigir el suministro de los alimentos pactados o equivalentes saludables.", esCorrecta: true },
                { letra: "C", texto: "Aprovechar la situación para dar una charla sobre por qué esos dulces que está entregando el contratista son malos para la salud.", esCorrecta: false }
              ],
              explicacion: "La opción B es el ejercicio correcto de la supervisión y garantía de la política de salud. La A es permisividad ante un incumplimiento contractual, y la C es una medida paliativa que no resuelve el problema de fondo del contrato."
            },
            {
              texto: "Para fortalecer el impacto de la jornada, ¿qué estrategia pedagógica es más efectiva según su perfil profesional?",
              opciones: [
                { letra: "A", texto: "Realizar talleres prácticos de preparación de alimentos saludables con ingredientes económicos y disponibles en la región del Huila.", esCorrecta: true },
                { letra: "B", texto: "Proyectar un video de una hora sobre la estructura molecular de las vitaminas, asumiendo que los ciudadanos son expertos en química.", esCorrecta: false },
                { letra: "C", texto: "Regalar camisetas con el logo de la alcaldía sin dar ninguna información técnica sobre nutrición o estilos de vida.", esCorrecta: false }
              ],
              explicacion: "La opción A aplica el conocimiento técnico de manera contextualizada y útil para la comunidad (educación en salud). La B es antipedagógica por el nivel técnico, y la C es una actividad puramente publicitaria sin impacto en salud."
            },
            {
              texto: "Un líder comunitario le pide que incluya a su familia en el listado de beneficiarios prioritarios de un programa de suplementos, aunque no cumplen los requisitos. ¿Qué responde?",
              opciones: [
                { letra: "A", texto: "Aceptar para mantener una buena relación con el líder y asegurar que la comunidad participe en futuras jornadas de salud.", esCorrecta: false },
                { letra: "B", texto: "Explicar los criterios técnicos de focalización basados en la vulnerabilidad y el puntaje SISBEN, asegurando la equidad en el acceso.", esCorrecta: true },
                { letra: "C", texto: "Decirle que sí, pero que debe esperar a que se acaben los suplementos de los demás para que nadie se dé cuenta del favoritismo.", esCorrecta: false }
              ],
              explicacion: "La opción B garantiza los principios de igualdad y objetividad en la gestión pública. La A y la C son actos de clientelismo y corrupción administrativa que desvían recursos públicos de quienes realmente los necesitan."
            }
          ]
        },
        {
          contenido: "Como Profesional de Salud en Neiva, usted apoya la coordinación del Plan Decenal de Salud Pública. Debe realizar el seguimiento a las metas de reducción de desnutrición infantil en articulación con las IPS y EPS del municipio. Al analizar los informes mensuales, nota que una de las IPS está reportando datos de tamizaje nutricional que parecen duplicados o inconsistentes con los registros históricos. Usted debe realizar una auditoría de calidad del dato, coordinar mesas técnicas con los gerentes de las entidades y asegurar que la información reportada al Ministerio de Salud sea veraz para la toma de decisiones presupuestales.",
          categoria: "Epidemiología", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cuál es el procedimiento técnico correcto para verificar la veracidad de los datos reportados por la IPS?",
              opciones: [
                { letra: "A", texto: "Realizar una visita de auditoría de campo para confrontar los registros en las historias clínicas físicas o electrónicas con los reportes enviados.", esCorrecta: true },
                { letra: "B", texto: "Llamar por teléfono al gerente de la IPS y creer en su palabra si él asegura que los datos están bien y que fue un error de digitación.", esCorrecta: false },
                { letra: "C", texto: "Borrar los datos sospechosos del sistema municipal sin pedir explicaciones a la IPS para que el informe final se vea 'limpio'.", esCorrecta: false }
              ],
              explicacion: "La opción A es la práctica técnica de auditoría en salud. La B carece de rigor probatorio y la C es una manipulación de información pública que oculta el problema."
            },
            {
              texto: "Al identificar que la desnutrición ha aumentado en un sector específico, ¿qué acción de coordinación propone?",
              opciones: [
                { letra: "A", texto: "Activar una ruta de atención integral intersectorial que involucre salud, educación y servicios públicos para intervenir las causas básicas.", esCorrecta: true },
                { letra: "B", texto: "Culpar públicamente a los padres de familia por no alimentar bien a sus hijos y amenazarlos con quitarles la custodia de inmediato.", esCorrecta: false },
                { letra: "C", texto: "Esperar a que el Ministerio de Salud envíe una directriz nacional antes de tomar cualquier medida local en el municipio de Neiva.", esCorrecta: false }
              ],
              explicacion: "La opción A reconoce los determinantes sociales de la salud y busca una solución integral (MIPG/Modelo de Salud). La B es una respuesta estigmatizante y la C es una omisión del deber de gestión territorial."
            },
            {
              texto: "Para la presentación de los resultados ante el Consejo Municipal, usted debe preparar un informe. ¿Cómo debe presentar la información técnica?",
              opciones: [
                { letra: "A", texto: "Usar términos médicos complejos que nadie entienda para demostrar que usted es un profesional muy estudiado en el área de salud.", esCorrecta: false },
                { letra: "B", texto: "Presentar indicadores claros, tendencias comparativas y un análisis de impacto de las acciones realizadas, con lenguaje accesible.", esCorrecta: true },
                { letra: "C", texto: "Mostrar solo las fotos de los eventos donde aparece el Alcalde saludando personas, sin mencionar cifras reales de salud pública.", esCorrecta: false }
              ],
              explicacion: "La opción B es la forma técnica y profesional de rendir cuentas sobre la gestión pública. La A dificulta la comunicación y la C es propaganda política que no aporta a la evaluación técnica del plan de salud."
            }
          ]
        }
      ]
    },
    {
      simoId: "235454", // PROFESIONAL UNIVERSITARIO - AMAZONAS (Talento Humano)
      escenarios: [
        {
          contenido: "Usted es Profesional Universitario en la Secretaría de Desarrollo Institucional de la Gobernación de Amazonas. Se le asigna la tarea de liderar la implementación de la Política de Gestión Estratégica del Talento Humano bajo los lineamientos del Modelo Integrado de Planeación y GESTIÓN (MIPG). Al realizar el diagnóstico inicial, observa que existe una alta resistencia al cambio por parte de los funcionarios de carrera administrativa, quienes consideran que los nuevos procesos de evaluación del desempeño son una persecución política. Usted debe diseñar una estrategia que asegure el cumplimiento normativo y mejore el clima organizacional en la entidad departamental.",
          categoria: "Talento Humano", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cuál es la estrategia más efectiva para reducir la resistencia al cambio frente al nuevo modelo de evaluación?",
              opciones: [
                { letra: "A", texto: "Emitir una circular interna advirtiendo que quien no cumpla con los nuevos procesos será sancionado disciplinariamente de inmediato.", esCorrecta: false },
                { letra: "B", texto: "Realizar jornadas de socialización y capacitación donde se expliquen los beneficios de la evaluación para el crecimiento profesional y la meritocracia.", esCorrecta: true },
                { letra: "C", texto: "Eximir a los funcionarios antiguos de cumplir con la evaluación para evitar conflictos y enfocarse solo en el personal nuevo de contrato.", esCorrecta: false }
              ],
              explicacion: "La opción B fomenta la cultura de la gestión del cambio y el entendimiento del modelo (dimensión de talento humano de MIPG). La A genera más conflicto y la C vulnera el principio de igualdad y la normatividad de carrera administrativa."
            },
            {
              texto: "Al planear el plan de capacitación institucional, ¿qué criterio técnico debe primar para la asignación del presupuesto?",
              opciones: [
                { letra: "A", texto: "Las necesidades identificadas en la evaluación del desempeño y los objetivos estratégicos definidos en el Plan de Desarrollo Departamental.", esCorrecta: true },
                { letra: "B", texto: "Los cursos que sean más baratos y cortos para poder certificar a mucha gente sin importar si aprenden algo útil para sus funciones.", esCorrecta: false },
                { letra: "C", texto: "Las preferencias personales de los funcionarios que sean amigos del Secretario de Desarrollo Institucional para mantenerlos contentos.", esCorrecta: false }
              ],
              explicacion: "La opción A asegura la eficiencia del gasto público y el cierre de brechas de competencia. La B y la C son prácticas ineficientes y clientelistas que no aportan al fortalecimiento institucional."
            },
            {
              texto: "Se le solicita integrar la política de integridad en la gestión de talento humano. ¿Qué acción concreta recomienda?",
              opciones: [
                { letra: "A", texto: "Obligar a todos los empleados a memorizar el Código de Integridad y recitarlo en voz alta cada mañana antes de empezar a trabajar.", esCorrecta: false },
                { letra: "B", texto: "Implementar dinámicas de reconocimiento a comportamientos ejemplares y dilemas éticos reales para fomentar la reflexión en el día a día.", esCorrecta: true },
                { letra: "C", texto: "Instalar cámaras de seguridad en todos los puestos de trabajo para vigilar que nadie robe tiempo o recursos del departamento.", esCorrecta: false }
              ],
              explicacion: "La opción B promueve una apropiación real y vivencial de los valores del servicio público. La A es una medida superficial y la C es una medida de control policivo que no construye cultura de integridad."
            }
          ]
        },
        {
          contenido: "En su rol de Profesional en la Gobernación de Amazonas, debe analizar la información de la planta de personal para proyectar la provisión de empleos vacantes. Identifica que hay varios cargos en vacancia definitiva que no han sido reportados a la Comisión Nacional del Servicio Civil (CNSC) para su respectiva convocatoria a concurso. Al mismo tiempo, recibe presiones para proveer esos cargos mediante nombramientos provisionales sin seguir el orden de prioridad de la ley. Usted debe capturar los datos, analizar la normatividad de carrera y proponer una hoja de ruta que garantice la legalidad en la gestión del empleo público territorial.",
          categoria: "Derecho Administrativo", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cuál es el orden de prioridad legal que debe seguir para proveer una vacante definitiva en la entidad?",
              opciones: [
                { letra: "A", texto: "Traslado, encargo a funcionario de carrera, lista de elegibles vigente y, como última opción, nombramiento provisional.", esCorrecta: true },
                { letra: "B", texto: "Contratar a una empresa de cazatalentos para que elija al mejor perfil del sector privado para ocupar el cargo público de inmediato.", esCorrecta: false },
                { letra: "C", texto: "Realizar una rifa entre todos los contratistas actuales para ver quién se merece el nombramiento provisional por su buena suerte.", esCorrecta: false }
              ],
              explicacion: "La opción A sigue estrictamente la jerarquía establecida en la Ley 909 de 2004 y decretos reglamentarios. La B y la C son procedimientos ilegales que vulneran el régimen de carrera administrativa."
            },
            {
              texto: "Respecto al reporte de vacantes a la CNSC (OPEC), ¿qué responsabilidad tiene la entidad departamental?",
              opciones: [
                { letra: "A", texto: "Reportar todas las vacantes definitivas de manera veraz y oportuna para alimentar el Sistema de Apoyo para la Igualdad, el Mérito y la Oportunidad (SIMO).", esCorrecta: true },
                { letra: "B", texto: "Reportar solo los cargos que sean aburridos para que los interesantes sigan siendo manejados por la administración de turno.", esCorrecta: false },
                { letra: "C", texto: "Cobrarle a la CNSC una tarifa por cada cargo reportado para financiar los eventos sociales de la Gobernación del Amazonas.", esCorrecta: false }
              ],
              explicacion: "La opción A es el deber legal de toda entidad pública sujeta al régimen de carrera. La B es una omisión fraudulenta y la C es una pretensión ilegal y carente de sustento normativo."
            },
            {
              texto: "Al tomar decisiones basadas en evidencias sobre el bienestar laboral, ¿qué indicador es más relevante analizar?",
              opciones: [
                { letra: "A", texto: "El nivel de satisfacción del clima organizacional comparado con los índices de rotación y ausentismo del personal en el último año.", esCorrecta: true },
                { letra: "B", texto: "El número de seguidores que tiene la cuenta oficial de la Gobernación en Facebook para ver si la gente está feliz con la gestión.", esCorrecta: false },
                { letra: "C", texto: "La cantidad de café que se consume en cada oficina para medir el nivel de energía y productividad de los funcionarios públicos.", esCorrecta: false }
              ],
              explicacion: "La opción A utiliza datos objetivos de gestión humana para orientar políticas de bienestar con impacto real. La B y la C son indicadores superficiales que no permiten un análisis técnico serio del talento humano."
            }
          ]
        }
      ]
    },
    {
      simoId: "241409", // AUXILIAR ÁREA SALUD - IDS NORTE DE SANTANDER
      escenarios: [
        {
          contenido: "Usted es Auxiliar en el Área de Salud del Instituto Departamental de Salud (IDS) de Norte de Santander. Su labor principal es apoyar la gestión documental de la oficina de Vigilancia en Salud Pública. Se recibe un volumen importante de fichas de notificación de eventos de interés en salud pública provenientes de diferentes municipios. Usted debe clasificar, registrar y archivar esta información siguiendo los protocolos de seguridad y confidencialidad, ya que muchos documentos contienen datos sensibles de pacientes con enfermedades infectocontagiosas. Durante la jornada, nota que un colega está tomando fotos a una de las fichas para enviarla por un grupo de WhatsApp.",
          categoria: "Gestión Documental", dificultad: "BASICO",
          preguntas: [
            {
              texto: "¿Cuál es su actuación ante la conducta observada en su compañero de trabajo?",
              opciones: [
                { letra: "A", texto: "Pedirle que le pase las fotos a usted también para estar informado sobre lo que sucede en el departamento.", esCorrecta: false },
                { letra: "B", texto: "Recordarle la importancia de la reserva legal de los datos de salud y reportar la situación de inmediato al superior para evitar una filtración.", esCorrecta: true },
                { letra: "C", texto: "No decir nada porque cada persona es responsable de sus actos y usted no quiere ganarse enemigos en la oficina.", esCorrecta: false }
              ],
              explicacion: "La opción B cumple con el deber de custodia de información reservada y la ética del servidor público. La A es complicidad en una falta grave, y la C es una omisión que compromete la seguridad de la información del IDS."
            },
            {
              texto: "Para organizar los archivos de gestión documental según las TRD, ¿qué paso es fundamental?",
              opciones: [
                { letra: "A", texto: "Asignar a cada serie y subserie documental su código respectivo y organizar los expedientes de manera cronológica dentro de cada carpeta.", esCorrecta: true },
                { letra: "B", texto: "Gritar los nombres de los pacientes en el pasillo para que otros auxiliares le ayuden a encontrar las carpetas más rápido.", esCorrecta: false },
                { letra: "C", texto: "Botar a la basura los documentos que tengan más de un mes de antigüedad para que el archivo no se llene de papeles viejos.", esCorrecta: false }
              ],
              explicacion: "La opción A sigue las normas técnicas de archivo nacionales. La B vulnera la privacidad de los pacientes y la C constituye una destrucción ilegal de patrimonio documental público."
            },
            {
              texto: "Al alimentar la base de datos de las acciones realizadas, ¿qué criterio de calidad debe aplicar?",
              opciones: [
                { letra: "A", texto: "La exactitud en la trascripción de los datos, asegurando que no existan errores de digitación que alteren las estadísticas de salud.", esCorrecta: true },
                { letra: "B", texto: "La velocidad de digitación, sin importar si los nombres o los códigos de las enfermedades quedan mal escritos en el sistema.", esCorrecta: false },
                { letra: "C", texto: "Inventar algunos datos cuando el documento original no sea legible, para que la base de datos no tenga espacios en blanco.", esCorrecta: false }
              ],
              explicacion: "La opción A garantiza la integridad de la información epidemiológica. La B genera datos erróneos para la toma de decisiones, y la C es una falsedad ideológica en documento público."
            }
          ]
        },
        {
          contenido: "Como Auxiliar de Salud en el IDS, usted apoya la activación de planes de contingencia ante una alerta de brote de dengue en la zona fronteriza. Se requiere citar a un comité técnico de urgencia con los secretarios de salud municipales. Usted debe elaborar los documentos de citación, preparar la logística de la reunión y realizar el seguimiento a las actas de compromiso. Durante el comité, se genera una discusión fuerte entre los asistentes sobre la asignación de recursos para fumigación. Su jefe le pide que tome nota detallada de los acuerdos y prepare el borrador del acta de manera inmediata.",
          categoria: "Salud Pública", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Qué debe primar en la redacción del acta de la reunión del comité técnico?",
              opciones: [
                { letra: "A", texto: "La fidelidad a lo expresado por cada asistente, centrando el documento en los compromisos técnicos y administrativos adquiridos.", esCorrecta: true },
                { letra: "B", texto: "La inclusión de todos los insultos y quejas personales que se dijeron durante la discusión para que el acta sea más entretenida.", esCorrecta: false },
                { letra: "C", texto: "Redactar solo lo que el jefe dijo y omitir las peticiones de los municipios para que la Gobernación siempre quede como la ganadora.", esCorrecta: false }
              ],
              explicacion: "La opción A es la forma profesional y técnica de elaborar actas administrativas. La B incluye información irrelevante y poco profesional, y la C falta a la veracidad y transparencia de la gestión pública."
            },
            {
              texto: "Al citar a los funcionarios para la reunión de seguimiento, ¿cuál es el medio de comunicación oficial más adecuado?",
              opciones: [
                { letra: "A", texto: "Un mensaje de audio por un grupo de WhatsApp informal donde también se comparten memes y chistes de la oficina.", esCorrecta: false },
                { letra: "B", texto: "Un oficio formal o correo electrónico institucional que incluya el orden del día, la fecha, hora y el enlace de conexión si es virtual.", esCorrecta: true },
                { letra: "C", texto: "Pegar un aviso en la puerta del IDS esperando que los funcionarios de los otros municipios pasen por ahí y lo lean por casualidad.", esCorrecta: false }
              ],
              explicacion: "La opción B garantiza la formalidad, la trazabilidad y la notificación efectiva del acto administrativo. La A carece de formalidad institucional y la C es un medio de comunicación ineficiente y poco profesional."
            },
            {
              texto: "Usted debe apoyar la revisión de la información generada en la zona de frontera. ¿Cuál es su labor específica de apoyo?",
              opciones: [
                { letra: "A", texto: "Verificar que los formularios de reporte estén completos y que la información guarde coherencia con los protocolos de vigilancia epidemiológica.", esCorrecta: true },
                { letra: "B", texto: "Diagnosticar a los pacientes sospechosos de dengue usando sus conocimientos empíricos y recetarles medicamentos básicos.", esCorrecta: false },
                { letra: "C", texto: "Decidir qué municipios deben recibir más dinero de fumigación basándose en cuál de los alcaldes le cae mejor a usted personalmente.", esCorrecta: false }
              ],
              explicacion: "La opción A define el rol de apoyo técnico del auxiliar administrativo en salud. La B es una extralimitación de funciones peligrosa (ejercicio ilegal de la medicina), y la C es un acto de corrupción y favoritismo ilegal."
            }
          ]
        }
      ]
    }
  ];

  for (const item of dataToInsert) {
    const opec = opecs.find((o) => o.simoId === item.simoId);
    if (!opec) {
      console.log(`⚠️ OPEC con simoId ${item.simoId} no encontrada en el lote actual.`);
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
      console.log(`✅ OPEC ${opec.simoId} (${opec.nombreCargo.slice(0, 40)}): 2 escenarios + 6 preguntas`);
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
