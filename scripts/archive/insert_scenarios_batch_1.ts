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

  if (opecs.length === 0) {
    console.log("Todas las OPECs ya tienen escenarios.");
    return;
  }

  const dataToInsert: any[] = [
    {
      simoId: "241088", // PROFESIONAL ESPECIALIZADO - BOLÍVAR
      escenarios: [
        {
          contenido: "Usted se desempeña como Profesional Especializado en la Gobernación de Bolívar, donde tiene la responsabilidad de coordinar un grupo de trabajo encargado del seguimiento a los convenios de cooperación regional. En el marco de un proyecto de inversión para la mitigación del riesgo en municipios del canal del Dique, se le solicita revisar un borrador de convenio interadministrativo. Durante el análisis, identifica que los compromisos de cofinanciación del municipio no están debidamente soportados con el certificado de disponibilidad presupuestal (CDP) correspondiente, lo que contraviene los lineamientos de la Secretaría de Hacienda. El superior inmediato le insta a dar el visto bueno técnico para no retrasar la ejecución en temporada de lluvias, argumentando que el CDP llegará en el transcurso de la semana.",
          categoria: "Gestión Pública", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cuál es la actuación técnica y legal más apropiada que debe seguir para garantizar la validez del proceso?",
              opciones: [
                { letra: "A", texto: "Emitir el concepto técnico favorable condicionado a que el municipio allegue el CDP antes de la firma definitiva del convenio por el Gobernador.", esCorrecta: false },
                { letra: "B", texto: "Suspender la emisión del visto bueno y solicitar formalmente al municipio el soporte presupuestal como requisito indispensable para la viabilidad legal.", esCorrecta: true },
                { letra: "C", texto: "Proyectar un informe de riesgos indicando la falta del CDP, pero permitiendo que el trámite avance a la oficina jurídica para su revisión formal.", esCorrecta: false }
              ],
              explicacion: "La opción B es la correcta porque el CDP es un requisito de legalidad previo a la asunción de compromisos contractuales o conveniales (Estatuto Orgánico de Presupuesto). La opción A vulnera el principio de legalidad presupuestal, y la C traslada un vicio de procedimiento a otra instancia sin resolverlo."
            },
            {
              texto: "En su labor de coordinación, usted debe asegurar que el equipo de trabajo mantenga la eficiencia. ¿Qué estrategia es más adecuada ante la presión externa?",
              opciones: [
                { letra: "A", texto: "Establecer un cronograma de revisión prioritaria para el convenio, manteniendo el rigor técnico pero agilizando la comunicación con el municipio.", esCorrecta: true },
                { letra: "B", texto: "Delegar la responsabilidad de la revisión a un solo miembro del equipo para que asuma las consecuencias legales de cualquier omisión involuntaria.", esCorrecta: false },
                { letra: "C", texto: "Ignorar las presiones del superior y mantener los términos ordinarios de respuesta, sin considerar la urgencia climática reportada.", esCorrecta: false }
              ],
              explicacion: "La opción A equilibra la necesidad de agilidad (principio de celeridad) con la responsabilidad técnica. La B es una falta ética de liderazgo, y la C ignora la realidad del servicio público que exige respuestas contextualizadas sin romper la norma."
            },
            {
              texto: "Al realizar la supervisión de un contrato derivado de este convenio, nota que el contratista no ha actualizado la póliza de cumplimiento. ¿Qué acción lidera?",
              opciones: [
                { letra: "A", texto: "Notificar al contratista sobre el vencimiento y suspender el trámite de cualquier cuenta de cobro hasta que se presente la garantía renovada.", esCorrecta: true },
                { letra: "B", texto: "Permitir que el contrato continúe su ejecución normal mientras se proyecta una adición presupuestal que incluya el costo de la nueva póliza.", esCorrecta: false },
                { letra: "C", texto: "Solicitar verbalmente la renovación sin dejar constancia escrita para evitar que el contratista sea sancionado por la oficina de control interno.", esCorrecta: false }
              ],
              explicacion: "La opción A es el deber ser de la supervisión según la Ley 80 de 1993 y el Manual de Contratación. La B es improcedente pues la póliza es obligación del contratista, y la C es una omisión del deber funcional que genera riesgos patrimoniales."
            }
          ]
        },
        {
          contenido: "Como Profesional Especializado con funciones de asesoría jurídica en la Gobernación de Bolívar, debe atender una petición compleja de una comunidad étnica que reclama participación en un proyecto de infraestructura vial. El proyecto ya cuenta con licencia ambiental, pero la comunidad alega que la consulta previa no fue integral. Usted debe proyectar la respuesta técnica y jurídica, considerando que el retraso del proyecto genera costos financieros importantes para el departamento y posibles demandas por parte del consorcio constructor. Su labor exige armonizar el derecho a la participación con la eficiencia administrativa y el cumplimiento de las metas del plan de desarrollo departamental.",
          categoria: "Derecho Administrativo", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cuál debe ser el fundamento primordial de la respuesta que usted proyectará para la firma del superior?",
              opciones: [
                { letra: "A", texto: "La prevalencia del interés general sobre el particular, argumentando que la obra beneficia a miles de ciudadanos frente a un grupo reducido.", esCorrecta: false },
                { letra: "B", texto: "El análisis minucioso de los actos administrativos que certificaron la consulta previa, verificando si se cumplieron los estándares de la Corte Constitucional.", esCorrecta: true },
                { letra: "C", texto: "La solicitud de una indemnización económica directa a la comunidad para que retiren la petición y permitan el avance de las obras civiles.", esCorrecta: false }
              ],
              explicacion: "La opción B es la correcta porque en temas de derechos fundamentales como la consulta previa, la seguridad jurídica depende del cumplimiento estricto de estándares constitucionales. La A simplifica un conflicto de derechos, y la C es ilegal y podría constituir un acto de corrupción."
            },
            {
              texto: "Ante la amenaza de un paro por parte de la comunidad, ¿qué medida de gestión administrativa recomienda adoptar?",
              opciones: [
                { letra: "A", texto: "Solicitar la intervención de la fuerza pública para garantizar el libre tránsito y el acceso de la maquinaria al frente de obra.", esCorrecta: false },
                { letra: "B", texto: "Convocar una mesa de diálogo interinstitucional con presencia del Ministerio del Interior y la Defensoría del Pueblo para validar los acuerdos.", esCorrecta: true },
                { letra: "C", texto: "Suspender indefinidamente el proyecto hasta que exista un consenso absoluto de todos los habitantes de la zona de influencia.", esCorrecta: false }
              ],
              explicacion: "La opción B sigue los protocolos de mediación y garantía de derechos del sector público colombiano. La A puede escalar el conflicto social, y la C es inviable administrativamente por los costos de parálisis contractual."
            },
            {
              texto: "Al revisar los informes de supervisión previos, encuentra que un funcionario omitió reportar una alerta temprana de la comunidad. ¿Qué acción procede?",
              opciones: [
                { letra: "A", texto: "Sugerir al superior el traslado del hallazgo a la oficina de control disciplinario para que se investigue la posible negligencia funcional.", esCorrecta: true },
                { letra: "B", texto: "Corregir los informes anteriores de manera retroactiva para que parezca que la alerta siempre fue tenida en cuenta por la entidad.", esCorrecta: false },
                { letra: "C", texto: "Archivar la información para no perjudicar la hoja de vida del compañero, considerando que el error ya no tiene remedio.", esCorrecta: false }
              ],
              explicacion: "La opción A es el cumplimiento del deber legal de denunciar o reportar faltas disciplinarias. La B constituye falsedad en documento público, y la C es un encubrimiento que vulnera los principios de la administración pública."
            }
          ]
        }
      ]
    },
    {
      simoId: "241798", // TÉCNICO ADMINISTRATIVO - ATLÁNTICO
      escenarios: [
        {
          contenido: "Usted es Técnico Administrativo en la Secretaría de Desarrollo Económico de la Gobernación del Atlántico. Se encuentra apoyando el programa de fortalecimiento agropecuario en el municipio de Repelón. Durante una jornada de asistencia técnica, un grupo de productores manifiesta su desconfianza hacia la entidad porque en años anteriores recibieron insumos de baja calidad que afectaron sus cosechas. Su función es realizar el seguimiento y evaluación de los productores, así como promover la asociatividad. Debe lograr que la comunidad se vincule nuevamente a los proyectos actuales, asegurando transparencia en la entrega de los nuevos beneficios y demostrando el compromiso de la administración departamental.",
          categoria: "Gestión Sectorial", dificultad: "BASICO",
          preguntas: [
            {
              texto: "¿Cuál es la acción inmediata más adecuada para recuperar la confianza de los productores en el territorio?",
              opciones: [
                { letra: "A", texto: "Prometer que en esta ocasión se les entregará el doble de insumos para compensar las pérdidas que sufrieron en el pasado.", esCorrecta: false },
                { letra: "B", texto: "Socializar las fichas técnicas de los insumos actuales y explicar los nuevos protocolos de control de calidad y supervisión implementados.", esCorrecta: true },
                { letra: "C", texto: "Decirles que la administración anterior fue la culpable y que ellos no tienen derecho a reclamar sobre procesos ya cerrados.", esCorrecta: false }
              ],
              explicacion: "La opción B es técnica y transparente, permitiendo que el ciudadano verifique la calidad del servicio actual. La A es populista y sin sustento presupuestal, y la C es una respuesta irrespetuosa que rompe el canal de comunicación con el usuario."
            },
            {
              texto: "Para fomentar la asociatividad en este grupo de productores, ¿qué orientación básica debe suministrar?",
              opciones: [
                { letra: "A", texto: "Explicar los beneficios de las economías de escala y el acceso conjunto a canales de comercialización que permite la formalización asociativa.", esCorrecta: true },
                { letra: "B", texto: "Obligarlos a firmar un acta de constitución inmediata bajo la amenaza de no entregarles las semillas programadas para el ciclo.", esCorrecta: false },
                { letra: "C", texto: "Informarles que asociarse es solo un requisito de papel para que el Gobernador pueda mostrar cifras de gestión en sus redes sociales.", esCorrecta: false }
              ],
              explicacion: "La opción A es la base del desarrollo rural y la función de fomento. La B vulnera la autonomía de los productores, y la C desmerita el impacto real de la política pública de asociatividad."
            },
            {
              texto: "Al realizar el registro de la asistencia técnica en el sistema, nota que un productor no tiene el predio debidamente registrado. ¿Cómo procede?",
              opciones: [
                { letra: "A", texto: "Omitir el dato en el sistema para que el productor no pierda el beneficio y usted cumpla con la meta de registros del día.", esCorrecta: false },
                { letra: "B", texto: "Orientar al productor sobre el trámite de registro de predio ante las autoridades competentes y dejar constancia de la asesoría brindada.", esCorrecta: true },
                { letra: "C", texto: "Rechazar de inmediato al productor y pedirle que se retire de la jornada hasta que traiga la escritura original debidamente registrada.", esCorrecta: false }
              ],
              explicacion: "La opción B cumple con la función de asistencia técnica y orientación al ciudadano. La A es una falta a la veracidad de la información, y la C es una atención deficiente que desincentiva la formalización rural."
            }
          ]
        },
        {
          contenido: "Como Técnico Administrativo de la Gobernación del Atlántico, se le asigna la supervisión operativa de un contrato para la entrega de kits de herramientas a asociaciones campesinas. Durante las visitas de campo, observa que el contratista está entregando herramientas que no coinciden exactamente con la marca especificada en el anexo técnico, aunque el contratista alega que son de 'especificaciones equivalentes'. Usted debe revisar los informes del contratista, proyectar el informe técnico de supervisión y asegurar que los recursos públicos se ejecuten conforme a lo pactado, salvaguardando los intereses de la Gobernación y de los beneficiarios finales del proyecto agropecuario.",
          categoria: "Supervisión Contractual", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Qué acción técnica debe realizar antes de aceptar las herramientas con marcas diferentes a las pactadas?",
              opciones: [
                { letra: "A", texto: "Aceptar las herramientas basándose en la palabra del contratista para no retrasar la entrega a los campesinos que las necesitan.", esCorrecta: false },
                { letra: "B", texto: "Solicitar al contratista un cuadro comparativo de fichas técnicas y verificar la equivalencia funcional con el apoyo del área técnica especializada.", esCorrecta: true },
                { letra: "C", texto: "Exigir el cambio inmediato de todas las herramientas sin considerar si las nuevas son realmente mejores o iguales a las originales.", esCorrecta: false }
              ],
              explicacion: "La opción B permite una decisión basada en evidencia técnica antes de proceder con cualquier modificación al contrato. La A es negligencia en la supervisión, y la C es una posición inflexible que podría afectar la ejecución si la marca original no está disponible en el mercado."
            },
            {
              texto: "Al proyectar el informe de gestión de la Secretaría para un ente de control, ¿cómo debe reportar esta situación?",
              opciones: [
                { letra: "A", texto: "Omitir el detalle del cambio de marca para evitar que el ente de control inicie una investigación por incumplimiento contractual.", esCorrecta: false },
                { letra: "B", texto: "Consignar los hechos ocurridos, el análisis de equivalencia realizado y las medidas de control adoptadas para garantizar la calidad.", esCorrecta: true },
                { letra: "C", texto: "Redactar el informe de manera ambigua para que el auditor no entienda que hubo una variación en las especificaciones técnicas iniciales.", esCorrecta: false }
              ],
              explicacion: "La opción B garantiza el principio de transparencia y la veracidad de la información pública. La A y la C son conductas que pueden derivar en responsabilidades disciplinarias y penales por ocultamiento de información."
            },
            {
              texto: "Un representante de una asociación le ofrece un 'obsequio' por su 'flexibilidad' en la revisión de los kits. ¿Cuál es su respuesta?",
              opciones: [
                { letra: "A", texto: "Agradecer el gesto y recibir el obsequio fuera del horario laboral para no comprometer la imagen de la Gobernación en la oficina.", esCorrecta: false },
                { letra: "B", texto: "Rechazar de manera contundente el ofrecimiento y recordar que los servidores públicos tienen prohibido recibir dádivas por sus funciones.", esCorrecta: true },
                { letra: "C", texto: "Sugerir que mejor done ese obsequio a la asociación, pero que de todas formas usted será flexible en la siguiente inspección técnica.", esCorrecta: false }
              ],
              explicacion: "La opción B es la única ética y legal según el Código de Integridad y la Ley 1952 de 2019. Las opciones A y C constituyen faltas gravísimas relacionadas con la ética pública y posibles delitos contra la administración."
            }
          ]
        }
      ]
    },
    {
      simoId: "247446", // PROFESIONAL UNIVERSITARIO - IBAGUÉ
      escenarios: [
        {
          contenido: "Usted es Profesional Universitario en la Alcaldía de Ibagué, encargado de los procesos de gestión catastral. Se le asigna la verificación en campo de un sector periférico donde se han detectado inconsistencias entre los planos topográficos archivados y la realidad física de los predios, debido a procesos de urbanización informal recientes. Su labor implica realizar análisis geográficos, identificar los componentes catastrales y proyectar actos administrativos que resuelvan las solicitudes de mutación. La situación es tensa, ya que los propietarios temen que la actualización catastral derive en un aumento desproporcionado del impuesto predial sin mejoras en los servicios públicos del sector.",
          categoria: "Gestión Catastral", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "Al iniciar la verificación en campo, un grupo de ciudadanos le impide el paso. ¿Cómo debe proceder según el protocolo institucional?",
              opciones: [
                { letra: "A", texto: "Retirarse del sitio y solicitar el apoyo de la fuerza pública para realizar el censo predial de manera coercitiva e inmediata.", esCorrecta: false },
                { letra: "B", texto: "Realizar una jornada de sensibilización previa con los líderes comunales para explicar los fines de la actualización y el debido proceso.", esCorrecta: true },
                { letra: "C", texto: "Informar a los ciudadanos que si no permiten la entrada, se les asignará de oficio el avalúo más alto permitido por la ley nacional.", esCorrecta: false }
              ],
              explicacion: "La opción B prioriza el diálogo y la transparencia administrativa (principio de participación ciudadana). La A debe ser el último recurso y la C es una amenaza ilegal que vicia el procedimiento administrativo."
            },
            {
              texto: "Durante el análisis geográfico, encuentra que un predio invade parcialmente el espacio público destinado a una zona verde. ¿Qué debe consignar en su informe?",
              opciones: [
                { letra: "A", texto: "La descripción técnica precisa de la ocupación del espacio público para que se inicien las acciones de restitución por la autoridad competente.", esCorrecta: true },
                { letra: "B", texto: "Omitir la invasión en el reporte catastral para no generar problemas legales al propietario, quien lleva muchos años habitando el lugar.", esCorrecta: false },
                { letra: "C", texto: "Sugerir al propietario que mueva la cerca antes de que usted tome las fotos oficiales, dándole un plazo informal de 24 horas.", esCorrecta: false }
              ],
              explicacion: "La opción A cumple con el deber funcional de reportar la realidad física y defender el patrimonio público. La B es prevaricato por omisión, y la C es una extralimitación de funciones y favorecimiento indebido."
            },
            {
              texto: "Para garantizar la calidad de los productos cartográficos generados por su dependencia, ¿qué actividad de control es prioritaria?",
              opciones: [
                { letra: "A", texto: "Verificar la consistencia lógica entre la base de datos alfanumérica (áreas, usos) y la representación geométrica del mapa catastral.", esCorrecta: true },
                { letra: "B", texto: "Asegurarse de que los mapas tengan colores llamativos y logos de la alcaldía actual para que sean más comprensibles para el alcalde.", esCorrecta: false },
                { letra: "C", texto: "Delegar la revisión final al pasante de ingeniería, asumiendo que su conocimiento académico reciente es suficiente para validar el producto.", esCorrecta: false }
              ],
              explicacion: "La opción A es un control técnico esencial en sistemas de información geográfica (SIG). La B es un aspecto estético secundario, y la C es una irresponsabilidad jerárquica frente a la fe pública que otorgan los datos catastrales."
            }
          ]
        },
        {
          contenido: "En su rol como Profesional de Catastro en la Alcaldía de Ibagué, debe proyectar la respuesta a un recurso de reposición interpuesto por un gran contribuyente. El ciudadano alega que su predio fue clasificado como 'comercial' cuando su actividad real es 'institucional de servicios', lo que genera una diferencia significativa en la liquidación del avalúo. Usted debe extraer información de los aplicativos institucionales, analizar las pruebas aportadas (licencias de funcionamiento, registros de cámara de comercio) y aplicar la normatividad vigente sobre clasificación de usos del suelo para decidir si procede o no la modificación del registro catastral.",
          categoria: "Procedimiento Administrativo", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cuál es el criterio técnico determinante para definir la clasificación del uso en el proceso de conservación catastral?",
              opciones: [
                { letra: "A", texto: "La actividad económica predominante que se desarrolla efectivamente en el inmueble al momento de la visita de inspección técnica.", esCorrecta: true },
                { letra: "B", texto: "El estrato socioeconómico de la zona donde se ubica el predio, independientemente de la actividad que se realice dentro del mismo.", esCorrecta: false },
                { letra: "C", texto: "La capacidad económica del propietario, buscando siempre maximizar el recaudo tributario para las arcas del municipio de Ibagué.", esCorrecta: false }
              ],
              explicacion: "La opción A se ajusta a la normativa catastral vigente (Resolución IGAC). La B confunde conceptos tributarios con físicos, y la C vulnera los principios de equidad y legalidad tributaria."
            },
            {
              texto: "Al revisar el expediente, nota que el acto administrativo recurrido no fue debidamente notificado. ¿Qué recomendación jurídica debe incluir en su análisis?",
              opciones: [
                { letra: "A", texto: "Continuar con el trámite del recurso asumiendo que la interposición del mismo sanea cualquier vicio de notificación previa.", esCorrecta: false },
                { letra: "B", texto: "Sugerir la revocatoria directa por vicios de procedimiento y ordenar que se realice la notificación conforme a lo establecido en el CPACA.", esCorrecta: true },
                { letra: "C", texto: "Ignorar el error de notificación para no retrasar el proceso y evitar que el contribuyente gane el caso por una formalidad.", esCorrecta: false }
              ],
              explicacion: "La opción B garantiza el debido proceso y evita futuras nulidades del acto administrativo. La A es una interpretación riesgosa del saneamiento, y la C es una vulneración directa de los derechos del administrado."
            },
            {
              texto: "Para facilitar la toma de decisiones basada en datos, se le solicita generar un análisis estadístico de las reclamaciones. ¿Qué información es más relevante?",
              opciones: [
                { letra: "A", texto: "El porcentaje de recursos fallados a favor del ciudadano desagregado por sectores y tipos de error identificados en la actualización.", esCorrecta: true },
                { letra: "B", texto: "Una lista de los nombres de los abogados que más presentan recursos para identificarlos y no darles celeridad a sus procesos.", esCorrecta: false },
                { letra: "C", texto: "El número de veces que el alcalde ha mencionado el tema de catastro en sus discursos públicos durante el último semestre.", esCorrecta: false }
              ],
              explicacion: "La opción A permite identificar fallas sistémicas en el proceso y mejorar la gestión operativa (mejora continua). La B es una práctica discriminatoria ilegal, y la C es información política sin valor para la gestión técnica catastral."
            }
          ]
        }
      ]
    },
    {
      simoId: "240955", // TÉCNICO ADMINISTRATIVO - CÚCUTA
      escenarios: [
        {
          contenido: "Usted es Técnico Administrativo en la Alcaldía de San José de Cúcuta, apoyando el área de atención al ciudadano y gestión documental. Se presenta una situación donde un usuario adulto mayor llega muy molesto porque afirma haber radicado una denuncia por una obra ilegal hace dos meses y no ha recibido respuesta. Al buscar en el sistema de gestión documental, usted identifica que la radicación se realizó correctamente, pero el expediente no fue asignado a ningún funcionario debido a un error técnico en el módulo de distribución. El usuario exige una respuesta inmediata y amenaza con acudir a los medios de comunicación y a la Procuraduría.",
          categoria: "Atención al Ciudadano", dificultad: "BASICO",
          preguntas: [
            {
              texto: "¿Cuál es el primer paso que debe dar para manejar la situación de crisis con el ciudadano?",
              opciones: [
                { letra: "A", texto: "Informarle que el error fue del sistema y que debe volver a radicar la queja para que el término de respuesta empiece de cero.", esCorrecta: false },
                { letra: "B", texto: "Escuchar activamente al ciudadano, ofrecer excusas institucionales por la falla y proceder a la asignación manual e inmediata del caso.", esCorrecta: true },
                { letra: "C", texto: "Llamar a seguridad para que retiren al señor de la oficina, ya que sus gritos están interrumpiendo el trabajo de los demás compañeros.", esCorrecta: false }
              ],
              explicacion: "La opción B aplica los protocolos de buen servicio y resuelve la falla administrativa de inmediato. La A es una respuesta ineficiente que vulnera los derechos del ciudadano, y la C escala innecesariamente el conflicto."
            },
            {
              texto: "Para evitar que esta falla técnica afecte a otros ciudadanos, ¿qué acción administrativa debe realizar?",
              opciones: [
                { letra: "A", texto: "Elaborar un informe técnico detallando la falla detectada en el sistema para que la oficina de TIC realice los ajustes pertinentes.", esCorrecta: true },
                { letra: "B", texto: "Desconectar el sistema de gestión documental y volver a utilizar libros físicos de registro para mayor seguridad manual.", esCorrecta: false },
                { letra: "C", texto: "No decir nada a nadie para que sus superiores no se den cuenta de que usted detectó un error en el funcionamiento de la alcaldía.", esCorrecta: false }
              ],
              explicacion: "La opción A contribuye a la mejora de los procesos institucionales y previene riesgos futuros. La B es un retroceso tecnológico ineficiente, y la C es una omisión que afecta la transparencia institucional."
            },
            {
              texto: "El usuario le solicita copia del expediente digital. ¿Qué debe verificar antes de entregar la información?",
              opciones: [
                { letra: "A", texto: "Que el usuario sea el titular del derecho o tenga interés legítimo, y que los documentos no tengan reserva legal o datos sensibles de terceros.", esCorrecta: true },
                { letra: "B", texto: "Que el usuario haya pagado previamente una propina por el servicio de fotocopiado y escaneo de los documentos oficiales.", esCorrecta: false },
                { letra: "C", texto: "Nada, cualquier persona puede acceder a cualquier documento de la alcaldía sin ninguna restricción en nombre de la transparencia total.", esCorrecta: false }
              ],
              explicacion: "La opción A cumple con la Ley de Transparencia y Acceso a la Información y la Ley de Protección de Datos Personales. La B es un cobro ilegal (corrupción), y la C ignora las excepciones legales de reserva documental."
            }
          ]
        },
        {
          contenido: "Como Técnico Administrativo en Cúcuta, usted apoya la proyección de actos administrativos en la Secretaría de Gobierno. Se le pide elaborar el borrador de un auto que ordena el cierre preventivo de un establecimiento comercial que no cumple con las normas de intensidad auditiva. Usted debe recolectar los insumos documentales (informes de policía, mediciones de decibelios) y asegurar que el documento cumpla con los requisitos de motivación y citación normativa. Al revisar las pruebas, nota que el informe técnico tiene un error en la dirección del establecimiento, lo cual podría viciar la legalidad de la notificación futura.",
          categoria: "Procedimiento Administrativo", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Qué debe hacer ante la discrepancia detectada en la dirección del establecimiento en el informe técnico?",
              opciones: [
                { letra: "A", texto: "Corregir usted mismo la dirección en el informe técnico usando corrector para que coincida con la base de datos de impuestos.", esCorrecta: false },
                { letra: "B", texto: "Devolver el informe a la dependencia técnica solicitando la aclaración o corrección formal del dato para asegurar la validez del auto.", esCorrecta: true },
                { letra: "C", texto: "Proyectar el auto con la dirección correcta, ignorando que el informe técnico de base tiene una dirección diferente.", esCorrecta: false }
              ],
              explicacion: "La opción B garantiza la trazabilidad y legalidad de las pruebas dentro del debido proceso. La A es una alteración de documento público, y la C genera una contradicción probatoria que puede anular el acto administrativo."
            },
            {
              texto: "En el control de términos de este proceso, usted identifica que el plazo para que el dueño presente descargos vence mañana. ¿Cómo asegura el trámite?",
              opciones: [
                { letra: "A", texto: "Llamar al dueño del establecimiento para decirle que no presente nada, que usted le ayudará a que el proceso se archive por falta de pruebas.", esCorrecta: false },
                { letra: "B", texto: "Registrar la fecha de vencimiento en la bitácora de seguimiento y preparar el expediente para el despacho del funcionario competente una vez venza el plazo.", esCorrecta: true },
                { letra: "C", texto: "Adelantarse y proyectar la sanción definitiva hoy mismo, asumiendo que el ciudadano ya no va a presentar ningún descargo formal.", esCorrecta: false }
              ],
              explicacion: "La opción B es la gestión administrativa correcta y respetuosa de los términos legales. La A es una falta disciplinaria y ética grave, y la C vulnera el derecho a la defensa al no esperar el vencimiento del término."
            },
            {
              texto: "Para mejorar la organización del archivo digital de la dependencia, ¿qué criterio de normalización propone?",
              opciones: [
                { letra: "A", texto: "Organizar los archivos por el nombre del funcionario que proyectó el auto, para saber quién trabaja más en la oficina.", esCorrecta: false },
                { letra: "B", texto: "Implementar una nomenclatura estandarizada basada en el número de radicado, tipo de documento y fecha, facilitando la búsqueda cruzada.", esCorrecta: true },
                { letra: "C", texto: "Guardar todos los documentos en el escritorio de su computador personal para que nadie más pueda borrarlos o modificarlos por accidente.", esCorrecta: false }
              ],
              explicacion: "La opción B sigue las mejores prácticas de gestión documental y asegura la recuperación de información. La A no facilita la búsqueda por objeto del proceso, y la C vulnera la seguridad y disponibilidad de la información institucional."
            }
          ]
        }
      ]
    },
    {
      simoId: "242617", // ANALISTA II - DIAN
      escenarios: [
        {
          contenido: "Usted es Analista II en la DIAN, asignado a la Subdirección de Operador Económico Autorizado (OEA). Se encuentra revisando una solicitud de registro de una empresa exportadora de flores que busca obtener la calificación de seguridad. Al analizar los documentos, encuentra que las certificaciones de antecedentes de los socios tienen una vigencia mayor a la permitida por la resolución aduanera, y el mapa de riesgos no contempla la vulnerabilidad en el transporte terrestre hacia el puerto. Usted debe preparar la documentación para decidir sobre la aceptación o requerimiento de la solicitud, manteniendo los estándares de seguridad que exige la certificación OEA en el marco del comercio internacional.",
          categoria: "Gestión Aduanera", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cuál es el trámite administrativo adecuado frente a las inconsistencias detectadas en la solicitud inicial?",
              opciones: [
                { letra: "A", texto: "Rechazar la solicitud de plano por no cumplir con los requisitos de forma, obligando a la empresa a iniciar todo el proceso desde cero.", esCorrecta: false },
                { letra: "B", texto: "Proyectar un requerimiento de información otorgando un término legal para que la empresa subsane las inconsistencias documentales y técnicas.", esCorrecta: true },
                { letra: "C", texto: "Aprobar la solicitud bajo el compromiso verbal de la empresa de que actualizarán los documentos durante la visita presencial de auditoría.", esCorrecta: false }
              ],
              explicacion: "La opción B cumple con el debido proceso y la normativa aduanera (principio de facilitación del comercio). La A es excesivamente gravosa y la C compromete la integridad del programa OEA."
            },
            {
              texto: "Respecto a la omisión en el mapa de riesgos del transporte terrestre, ¿qué criterio técnico debe primar en su análisis?",
              opciones: [
                { letra: "A", texto: "La integralidad de la cadena logística, exigiendo que se evalúen los riesgos desde la producción hasta la entrega final en el mercado externo.", esCorrecta: true },
                { letra: "B", texto: "La flexibilidad, considerando que el transporte terrestre es responsabilidad de terceros y no de la empresa que solicita la certificación.", esCorrecta: false },
                { letra: "C", texto: "La simplificación, validando únicamente los riesgos dentro de las instalaciones físicas de la empresa que está siendo evaluada.", esCorrecta: false }
              ],
              explicacion: "La opción A es el fundamento de la certificación OEA, que busca asegurar toda la cadena de suministro. La B y la C ignoran que el solicitante debe garantizar que sus proveedores también cumplan con estándares de seguridad."
            },
            {
              texto: "Al atender al usuario externo que pregunta por el estado de su trámite, ¿qué información debe suministrar?",
              opciones: [
                { letra: "A", texto: "Informar la etapa actual del proceso y los términos legales de respuesta, sin revelar juicios de valor sobre el sentido de la decisión final.", esCorrecta: true },
                { letra: "B", texto: "Asegurarle que la solicitud será aprobada pronto si acepta invitar a los funcionarios de la DIAN a un almuerzo de agradecimiento.", esCorrecta: false },
                { letra: "C", texto: "Decirle que no puede darle ninguna información porque el proceso de OEA es secreto de estado por razones de seguridad nacional.", esCorrecta: false }
              ],
              explicacion: "La opción A es la conducta correcta de atención al ciudadano y transparencia administrativa. La B es un acto de corrupción y la C es una extralimitación que vulnera el derecho a la información pública."
            }
          ]
        },
        {
          contenido: "Como Analista de la DIAN en el área de Valoración y Clasificación, debe resolver un caso de importación de maquinaria industrial de alta tecnología. El importador declara un valor basado en una factura que parece tener un descuento excesivo por 'fidelidad comercial'. Además, existe duda sobre si la maquinaria debe clasificarse en la partida de 'procesadores de datos' o en 'maquinaria de ensamble', lo cual tiene un impacto directo en el arancel aplicable. Usted debe preparar los requerimientos técnicos, analizar las reglas de valoración de la OMC y proponer la clasificación arancelaria correcta para asegurar el recaudo justo de los tributos aduaneros.",
          categoria: "Técnica Aduanera", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "Ante la duda sobre el valor declarado por el descuento comercial, ¿qué método de valoración debe aplicar preferencialmente?",
              opciones: [
                { letra: "A", texto: "El método de valor de transacción, siempre que el descuento esté debidamente comprobado y no sea una condición que distorsione el precio.", esCorrecta: true },
                { letra: "B", texto: "El método de último recurso, asignando el valor más alto encontrado en internet para productos similares de otras marcas famosas.", esCorrecta: false },
                { letra: "C", texto: "El método de valor de mercancías idénticas, ignorando por completo la factura original por considerarla sospechosa de plano.", esCorrecta: false }
              ],
              explicacion: "La opción A sigue el orden jerárquico de los métodos de valoración de la OMC/DIAN. La B y la C se saltan los pasos legales de valoración y vulneran el derecho del importador a que se respete el valor real de su transacción."
            },
            {
              texto: "¿Cuál es la regla de oro para definir la clasificación arancelaria cuando una mercancía puede estar en dos partidas?",
              opciones: [
                { letra: "A", texto: "Clasificarla en la partida que tenga el arancel más alto para favorecer las finanzas del Estado colombiano en el corto plazo.", esCorrecta: false },
                { letra: "B", texto: "Aplicar las Reglas Generales para la Interpretación del Sistema Armonizado, buscando la partida que describa con mayor precisión el carácter esencial.", esCorrecta: true },
                { letra: "C", texto: "Permitir que el importador elija la partida que más le convenga para fomentar la inversión extranjera y el crecimiento económico del país.", esCorrecta: false }
              ],
              explicacion: "La opción B es el procedimiento técnico normado internacionalmente para la clasificación de mercancías. La A es arbitraria y la C es una dejación de las funciones de control aduanero."
            },
            {
              texto: "Usted descubre que el importador es una empresa donde trabaja un familiar suyo en segundo grado de consanguinidad. ¿Cómo actúa?",
              opciones: [
                { letra: "A", texto: "Informar inmediatamente a su superior sobre el posible conflicto de intereses y solicitar ser apartado del conocimiento del caso concreto.", esCorrecta: true },
                { letra: "B", texto: "Resolver el caso con mayor rigurosidad de lo normal para demostrar que su familiar no tiene ninguna influencia sobre sus decisiones.", esCorrecta: false },
                { letra: "C", texto: "Mantener el secreto y resolver el caso lo más rápido posible para que nadie se dé cuenta del vínculo familiar y evitar trámites molestos.", esCorrecta: false }
              ],
              explicacion: "La opción A es la obligación legal ante conflictos de intereses (Ley 1437 de 2011). La B no elimina el conflicto y la C es una falta gravísima que genera nulidad de lo actuado y sanciones disciplinarias."
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
        });
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
