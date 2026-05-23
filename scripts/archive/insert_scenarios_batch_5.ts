import { PrismaClient, TipoPregunta, NivelDificultad } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const dataToInsert: any[] = [
    {
      simoId: "238272", // NEIVA - Adding missing scenario
      escenarios: [
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
      simoId: "241158", // CONDUCTOR - PITALITO
      escenarios: [
        {
          contenido: "Usted es Conductor en la Alcaldía de Pitalito. Se le asigna un vehículo oficial para el traslado de una comisión técnica hacia la zona rural del corregimiento de Bruselas. Antes de iniciar el recorrido, usted debe realizar la inspección pre-operacional del vehículo. Durante la revisión, detecta que el nivel de líquido de frenos está por debajo del mínimo y que la llanta de repuesto no tiene la presión adecuada. La comisión técnica lo presiona para salir de inmediato, argumentando que tienen una reunión urgente con la comunidad y que el camino es corto.",
          categoria: "Seguridad Vial", dificultad: "BASICO",
          preguntas: [
            {
              texto: "¿Cuál es su decisión técnica como conductor responsable del vehículo oficial?",
              opciones: [
                { letra: "A", texto: "Salir de inmediato para no retrasar a los funcionarios, confiando en que por ser un camino corto no pasará nada grave.", esCorrecta: false },
                { letra: "B", texto: "Informar a la comisión que el vehículo no es apto para transitar, proceder a completar el líquido de frenos y calibrar la llanta antes de salir.", esCorrecta: true },
                { letra: "C", texto: "Decirle a un funcionario de la comisión que él maneje, para que si ocurre un accidente la responsabilidad no sea suya.", esCorrecta: false }
              ],
              explicacion: "La opción B cumple con el deber de garantizar la seguridad de los pasajeros y el buen estado del bien público. La A es una conducta imprudente y negligente, y la C es una falta gravísima de abandono de funciones."
            },
            {
              texto: "Al finalizar la jornada, usted nota que el vehículo tiene un golpe en el parachoques que no estaba en la mañana. ¿Qué debe hacer?",
              opciones: [
                { letra: "A", texto: "Reportar el incidente de inmediato en la bitácora del vehículo y mediante informe escrito a su jefe de transporte para los trámites del seguro.", esCorrecta: true },
                { letra: "B", texto: "Tratar de enderezar el golpe usted mismo con un martillo para que nadie se dé cuenta y el vehículo parezca impecable.", esCorrecta: false },
                { letra: "C", texto: "Culpar a los funcionarios de la comisión técnica, diciendo que ellos fueron los que golpearon el carro mientras usted estaba almorzando.", esCorrecta: false }
              ],
              explicacion: "La opción A garantiza la transparencia y el debido reporte de daños a bienes públicos. La B oculta información relevante para el mantenimiento y la C es una conducta deshonesta que falta a la ética profesional."
            },
            {
              texto: "Un funcionario le pide que exceda el límite de velocidad en la carretera nacional porque van tarde a un evento. ¿Cómo actúa?",
              opciones: [
                { letra: "A", texto: "Acatar la orden del funcionario, asumiendo que su jerarquía es superior a las normas de tránsito nacionales.", esCorrecta: false },
                { letra: "B", texto: "Mantener la velocidad permitida por la ley, explicando cordialmente que la seguridad del personal es la prioridad absoluta.", esCorrecta: true },
                { letra: "C", texto: "Acelerar a fondo para impresionar al funcionario con sus habilidades de piloto de carreras profesionales.", esCorrecta: false }
              ],
              explicacion: "La opción B prioriza el cumplimiento de la ley y la protección de la vida. La A y la C son conductas peligrosas que pueden derivar en accidentes y sanciones legales para el conductor."
            }
          ]
        },
        {
          contenido: "Como Conductor de la Alcaldía de Pitalito, usted traslada al Alcalde hacia la ciudad de Neiva. En mitad del camino, el vehículo presenta una falla mecánica (recalentamiento) y se detiene en una zona con poca señal de celular y alta afluencia de carga pesada. Usted debe gestionar la seguridad del mandatario, realizar el diagnóstico básico de la falla y coordinar el apoyo logístico para continuar el viaje o asegurar el retorno, manteniendo la calma y el protocolo de seguridad institucional.",
          categoria: "Mecánica Básica", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cuál es la primera medida de seguridad operativa que debe tomar al detenerse en la vía?",
              opciones: [
                { letra: "A", texto: "Estacionar en la berma, activar las luces de estacionamiento y colocar los dispositivos de señalización (triángulos) a la distancia reglamentaria.", esCorrecta: true },
                { letra: "B", texto: "Bajar al Alcalde del carro de inmediato y decirle que camine hasta la próxima estación de servicio para pedir ayuda.", esCorrecta: false },
                { letra: "C", texto: "Abrir el capó del motor mientras está caliente y echarle agua fría directamente al radiador para enfriarlo rápido.", esCorrecta: false }
              ],
              explicacion: "La opción A cumple con el Código Nacional de Tránsito y garantiza la visibilidad del vehículo detenido. La B pone en riesgo la seguridad del mandatario y la C es un error técnico que puede dañar el motor y causar quemaduras al conductor."
            },
            {
              texto: "Para el reporte de la falla, ¿qué información técnica debe suministrar al taller institucional?",
              opciones: [
                { letra: "A", texto: "Los síntomas observados (humo, olores, ruidos), los testigos encendidos en el tablero y la ubicación geográfica exacta del vehículo.", esCorrecta: true },
                { letra: "B", texto: "Una queja sobre lo viejo que está el carro y cuánto tiempo hace que no le cambian el aceite de manera adecuada.", esCorrecta: false },
                { letra: "C", texto: "Decir simplemente que 'el carro se dañó' y que manden a alguien rápido sin dar más detalles técnicos porque usted no es mecánico.", esCorrecta: false }
              ],
              explicacion: "La opción A permite un diagnóstico remoto más preciso y una mejor respuesta logística. La B no ayuda a resolver la emergencia actual y la C es una comunicación ineficiente que retrasa la solución."
            },
            {
              texto: "Mientras esperan el apoyo, un particular se ofrece a llevar al Alcalde en su vehículo privado. ¿Cuál es su recomendación?",
              opciones: [
                { letra: "A", texto: "Agradecer y sugerir al Alcalde que espere el vehículo oficial de reemplazo o el apoyo de la fuerza pública por protocolos de seguridad.", esCorrecta: true },
                { letra: "B", texto: "Decirle al Alcalde que se suba rápido con el extraño para que usted pueda quedarse solo durmiendo una siesta en el carro dañado.", esCorrecta: false },
                { letra: "C", texto: "Pedirle al particular que le preste su carro a usted para que usted mismo lleve al Alcalde y deje el vehículo oficial abandonado en la vía.", esCorrecta: false }
              ],
              explicacion: "La opción A sigue los protocolos de seguridad de dignatarios. La B y la C son irresponsabilidades que ponen en riesgo la integridad del mandatario y el patrimonio público (abandono de vehículo)."
            }
          ]
        }
      ]
    },
    {
      simoId: "243208", // MAESTRO EN ARTES - BELLAS ARTES
      escenarios: [
        {
          contenido: "Usted es Maestro en Artes en el Instituto Departamental de Bellas Artes de Cali. Se encuentra dirigiendo un taller de pintura avanzada. Durante la sesión de crítica colectiva, dos estudiantes se enfrentan verbalmente de forma agresiva porque uno de ellos hizo comentarios despectivos sobre la identidad de género y el estilo estético del trabajo del otro. El clima en el salón se vuelve tenso y el proceso de aprendizaje se detiene. Usted debe mediar en el conflicto, asegurar un ambiente de respeto y diversidad, y retomar el objetivo pedagógico de la sesión artística.",
          categoria: "Pedagogía Artística", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cuál es su intervención inmediata como docente frente a la agresión verbal?",
              opciones: [
                { letra: "A", texto: "Suspender la crítica, separar a los estudiantes y recordar las normas de convivencia y el respeto a la diversidad como pilares de la institución.", esCorrecta: true },
                { letra: "B", texto: "Dejar que sigan discutiendo para que 'la pasión artística' se refleje en sus próximas obras y el taller sea más intenso.", esCorrecta: false },
                { letra: "C", texto: "Expulsar a ambos estudiantes del salón de inmediato y ponerles una nota de cero en el semestre sin darles derecho a explicarse.", esCorrecta: false }
              ],
              explicacion: "La opción A maneja el conflicto de forma pedagógica y protege el ambiente de aprendizaje. La B es una negligencia docente y la C vulnera el debido proceso estudiantil."
            },
            {
              texto: "Para retomar la crítica artística de forma constructiva, ¿qué estrategia aplica?",
              opciones: [
                { letra: "A", texto: "Enfocar la discusión en elementos técnicos y conceptuales de la obra, fomentando la argumentación basada en la teoría del arte y no en ataques personales.", esCorrecta: true },
                { letra: "B", texto: "Decidir usted mismo quién tiene la razón y obligar al otro estudiante a pedir perdón de rodillas frente a todo el grupo.", esCorrecta: false },
                { letra: "C", texto: "Decir que el arte es subjetivo y que por lo tanto cualquier insulto es válido si se dice con 'intención estética'.", esCorrecta: false }
              ],
              explicacion: "La opción A eleva el nivel académico de la crítica y neutraliza los ataques personales. La B es una medida humillante y la C es una interpretación errónea y peligrosa de la libertad artística."
            },
            {
              texto: "Respecto a la diversidad en el aula, ¿cuál es su deber como servidor público docente?",
              opciones: [
                { letra: "A", texto: "Promover activamente una cultura de inclusión y respeto por todas las identidades, integrando estos valores en el currículo del taller.", esCorrecta: true },
                { letra: "B", texto: "Ignorar las diferencias de los estudiantes para que todos pinten exactamente igual a como usted pinta para no generar polémicas.", esCorrecta: false },
                { letra: "C", texto: "Sugerir a los estudiantes que no estén de acuerdo con sus compañeros que se retiren de Bellas Artes y busquen otra universidad.", esCorrecta: false }
              ],
              explicacion: "La opción A cumple con los principios constitucionales de igualdad y no discriminación. La B coarta la libertad de expresión y la C es una conducta excluyente contraria al fin de la educación pública."
            }
          ]
        },
        {
          contenido: "Como Maestro en Artes en Cali, se le solicita diseñar un currículo para un taller de artes integradas dirigido a personas con discapacidad auditiva y visual que se vincularán al programa de extensión de Bellas Artes. Usted debe adaptar las metodologías de enseñanza, seleccionar los materiales adecuados y definir los criterios de evaluación, asegurando que el proceso sea verdaderamente inclusivo y potencie las capacidades expresivas de los participantes a través de lenguajes artísticos alternativos.",
          categoria: "Inclusión Educativa", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Qué elemento es fundamental en la adaptación metodológica para este taller inclusivo?",
              opciones: [
                { letra: "A", texto: "La multisensorialidad, utilizando texturas, vibraciones sonoras y herramientas hápticas que permitan la exploración artística más allá de la vista u oído.", esCorrecta: true },
                { letra: "B", texto: "Utilizar los mismos métodos de siempre pero hablando más fuerte para que los estudiantes con discapacidad entiendan mejor por la fuerza de su voz.", esCorrecta: false },
                { letra: "C", texto: "Enseñarles solo teoría de la historia del arte escrita en libros, asumiendo que ellos no pueden realizar práctica artística real.", esCorrecta: false }
              ],
              explicacion: "La opción A aplica principios de diseño universal para el aprendizaje (DUA) en el campo artístico. La B es una medida ineficaz y la C es una subestimación capacitista de los estudiantes."
            },
            {
              texto: "Al definir los criterios de evaluación para este grupo, ¿cuál debe ser el enfoque técnico?",
              opciones: [
                { letra: "A", texto: "Evaluar el proceso individual, la experimentación con los materiales y la capacidad de comunicar conceptos a través de sus propios lenguajes.", esCorrecta: true },
                { letra: "B", texto: "Comparar sus trabajos con los de los grandes maestros del Renacimiento y calificarlos bajo los mismos estándares de perfección anatómica.", esCorrecta: false },
                { letra: "C", texto: "Ponerles a todos la nota máxima de 'excelente' simplemente por el hecho de tener una discapacidad, sin revisar si hicieron el trabajo o no.", esCorrecta: false }
              ],
              explicacion: "La opción A reconoce la diversidad y valora el logro pedagógico real. La B es desproporcionada y la C es un paternalismo que anula la función evaluativa de la educación."
            },
            {
              texto: "Para garantizar la accesibilidad del taller, ¿qué gestión administrativa debe liderar?",
              opciones: [
                { letra: "A", texto: "Solicitar la adecuación de los espacios físicos y la adquisición de materiales didácticos especializados (braille, señalética visual, etc.).", esCorrecta: true },
                { letra: "B", texto: "Pedirle a los estudiantes que traigan sus propios materiales y sus propios intérpretes si quieren estudiar en Bellas Artes.", esCorrecta: false },
                { letra: "C", texto: "Dictar la clase en un tercer piso sin ascensor para que los estudiantes hagan ejercicio y fortalezcan sus músculos mientras suben.", esCorrecta: false }
              ],
              explicacion: "La opción A es la responsabilidad de la institución y el docente para garantizar el derecho a la educación inclusiva. La B y la C son barreras de acceso que constituyen discriminación."
            }
          ]
        }
      ]
    },
    {
      simoId: "243203", // AUXILIAR ADMINISTRATIVO - BELLAS ARTES
      escenarios: [
        {
          contenido: "Usted es Auxiliar Administrativo en la oficina de Registro y Control Académico de Bellas Artes en Cali. Durante el proceso de matrículas, un aspirante presenta un acta de grado de bachiller que parece haber sido alterada manualmente en la fecha de expedición. Al confrontar al aspirante, este se pone nervioso y ofrece 'colaborar con la oficina' si usted pasa por alto ese detalle y le permite completar su inscripción. Usted debe verificar la autenticidad del documento, seguir el procedimiento de rechazo y reportar la posible irregularidad ante las instancias competentes de la institución.",
          categoria: "Gestión Académica", dificultad: "BASICO",
          preguntas: [
            {
              texto: "¿Cuál es el procedimiento técnico ante la sospecha de alteración de un documento de matrícula?",
              opciones: [
                { letra: "A", texto: "Recibir el documento tal cual, asumiendo que el aspirante es una buena persona y que la fecha no es tan importante para estudiar artes.", esCorrecta: false },
                { letra: "B", texto: "No recibir el documento, dejar constancia de la inconsistencia y solicitar la verificación de autenticidad ante la institución educativa emisora.", esCorrecta: true },
                { letra: "C", texto: "Enojarse con el aspirante y romper el acta de grado frente a él para que aprenda que con la ley no se juega.", esCorrecta: false }
              ],
              explicacion: "La opción B sigue el debido proceso y asegura la legalidad del ingreso a la educación pública. La A es una omisión negligente y la C es una conducta agresiva y desproporcionada."
            },
            {
              texto: "Ante el ofrecimiento de 'colaboración' económica del aspirante, ¿cuál es su respuesta ética?",
              opciones: [
                { letra: "A", texto: "Rechazar contundentemente la oferta y advertir que intentar sobornar a un servidor público es un delito penal en Colombia.", esCorrecta: true },
                { letra: "B", texto: "Aceptar el dinero pero decirle que de todas formas tiene que traer el acta de grado original bien escrita mañana mismo.", esCorrecta: false },
                { letra: "C", texto: "Preguntarle cuánto dinero tiene exactamente para ver si vale la pena el riesgo de perder el empleo por ayudarlo.", esCorrecta: false }
              ],
              explicacion: "La opción A es la única actuación conforme a la ética pública y el Código de Integridad. Las opciones B y C constituyen delitos de cohecho que generan sanciones penales graves."
            },
            {
              texto: "Para organizar los expedientes de los nuevos admitidos, ¿qué criterio de archivo debe aplicar?",
              opciones: [
                { letra: "A", texto: "Organizar las carpetas por orden alfabético de apellidos, asegurando que cada documento esté debidamente foliado y relacionado en el índice.", esCorrecta: true },
                { letra: "B", texto: "Guardar todos los documentos sueltos en una caja grande y revolverlos bien para que nadie pueda encontrar la información fácilmente.", esCorrecta: false },
                { letra: "C", texto: "Organizar los expedientes por el color de la carpeta que más le guste a usted para que el archivo se vea decorado.", esCorrecta: false }
              ],
              explicacion: "La opción A sigue las normas básicas de gestión documental y archivo. La B y la C imposibilitan la recuperación de la información y la gestión administrativa eficiente."
            }
          ]
        },
        {
          contenido: "Como Auxiliar Administrativo en Bellas Artes, usted apoya la organización de la 'Muestra Anual de Estudiantes'. Debe coordinar el préstamo de equipos (proyectores, luces, sonido) y el uso de los espacios físicos del instituto. Se presenta un conflicto porque dos facultades programaron eventos diferentes en el mismo auditorio y a la misma hora. Usted debe revisar el software de reservas, identificar el error de programación y proponer una solución logística que permita la realización de ambos eventos sin afectar la calidad de las presentaciones artísticas.",
          categoria: "Apoyo Logístico", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cómo resuelve técnicamente el conflicto de duplicidad de reserva del auditorio?",
              opciones: [
                { letra: "A", texto: "Revisar la trazabilidad de las solicitudes en el sistema, identificar quién reservó primero y proponer un horario alterno o un espacio equivalente al otro.", esCorrecta: true },
                { letra: "B", texto: "Cerrar el auditorio con llave y decir que nadie puede usarlo ese día para evitar que los decanos de las dos facultades se peleen.", esCorrecta: false },
                { letra: "C", texto: "Permitir que el primero que llegue al auditorio con sus equipos sea el que haga el evento, sin importar quién tiene la reserva legal.", esCorrecta: false }
              ],
              explicacion: "La opción A aplica criterios de justicia administrativa, trazabilidad y resolución de problemas logísticos. La B y la C son soluciones ineficientes que generan caos organizacional."
            },
            {
              texto: "Respecto al préstamo de equipos de tecnología, ¿qué control administrativo debe ejercer?",
              opciones: [
                { letra: "A", texto: "Diligenciar un acta de préstamo donde conste el estado físico del equipo, el responsable de su custodia y la fecha exacta de devolución.", esCorrecta: true },
                { letra: "B", texto: "Entregar los equipos a cualquier persona que los pida sin pedirle el nombre ni firmar nada, confiando en la honestidad de los artistas.", esCorrecta: false },
                { letra: "C", texto: "Cobrarle a los estudiantes un alquiler diario por el uso de los proyectores y quedarse con ese dinero para su propio beneficio.", esCorrecta: false }
              ],
              explicacion: "La opción A asegura la protección del patrimonio público y la trazabilidad de los bienes. La B es negligencia en la custodia de bienes y la C es un acto de peculado por apropiación."
            },
            {
              texto: "Al finalizar el evento, usted debe proyectar el informe de gestión logística. ¿Qué dato es más importante para la institución?",
              opciones: [
                { letra: "A", texto: "El consolidado de recursos utilizados, el cumplimiento de los horarios y el reporte de novedades o daños en los equipos e infraestructura.", esCorrecta: true },
                { letra: "B", texto: "Una lista de cuáles estudiantes estaban mejor vestidos durante la muestra anual para que el Rector los felicite personalmente.", esCorrecta: false },
                { letra: "C", texto: "La cantidad de aplausos que recibió cada obra artística medida en decibelios con una aplicación del celular.", esCorrecta: false }
              ],
              explicacion: "La opción A proporciona información técnica valiosa para la mejora de los procesos administrativos y el control de bienes. La B y la C son datos irrelevantes para la gestión administrativa del instituto."
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
