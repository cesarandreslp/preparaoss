import { PrismaClient, TipoPregunta, NivelDificultad } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const dataToInsert: any[] = [
    {
      simoId: "229295", // SENA - Profesional (Contratación)
      escenarios: [
        {
          contenido: "Usted es Profesional en el área de contratación de un Centro de Formación del SENA. Debe adelantar los estudios previos para la contratación del servicio de mantenimiento preventivo y correctivo de la infraestructura tecnológica del Centro. Durante el análisis de mercado, identifica que los precios suministrados por los posibles oferentes superan significativamente el presupuesto estimado inicialmente en el Plan Anual de Adquisiciones (PAA). Además, el Subdirector del Centro le solicita iniciar el proceso de inmediato porque los equipos están fallando y afectando las clases.",
          categoria: "Contratación Estatal", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cuál es la acción técnica y legalmente correcta frente a la insuficiencia presupuestal detectada?",
              opciones: [
                { letra: "A", texto: "Iniciar el proceso con el presupuesto del PAA y pedirle al contratista ganador que ajuste sus precios después de firmado el contrato.", esCorrecta: false },
                { letra: "B", texto: "Solicitar la actualización de los estudios de mercado, tramitar la modificación del PAA y gestionar el Certificado de Disponibilidad Presupuestal (CDP) por el valor real.", esCorrecta: true },
                { letra: "C", texto: "Reducir el alcance del mantenimiento de forma arbitraria para que encaje en el presupuesto viejo, sin importar si los equipos quedan sin cobertura.", esCorrecta: false }
              ],
              explicacion: "La opción B garantiza el principio de planeación y legalidad presupuestal (Ley 80 de 1993 y Decreto 1082 de 2015). Las otras opciones vician el proceso o comprometen la calidad del servicio."
            },
            {
              texto: "Al proyectar la matriz de riesgos del proceso, ¿qué riesgo técnico debe priorizar dado el estado de los equipos?",
              opciones: [
                { letra: "A", texto: "El riesgo de obsolescencia tecnológica por el uso de repuestos no originales que afecten la garantía de los equipos existentes.", esCorrecta: true },
                { letra: "B", texto: "El riesgo de que el contratista se gane mucho dinero y eso genere envidia entre los instructores del Centro de Formación.", esCorrecta: false },
                { letra: "C", texto: "El riesgo de que llueva el día de la firma del contrato y el representante legal del contratista no pueda llegar a la oficina.", esCorrecta: false }
              ],
              explicacion: "La opción A identifica un riesgo técnico real que impacta la sostenibilidad y el patrimonio del SENA. Las otras opciones son irrelevantes para la gestión de riesgos contractuales."
            },
            {
              texto: "Respecto a la actualización en el portal SECOP II, ¿qué documento es indispensable cargar en la etapa precontractual?",
              opciones: [
                { letra: "A", texto: "El acta de inicio del contrato, incluso antes de haber seleccionado al contratista, para ir adelantando trabajo administrativo.", esCorrecta: false },
                { letra: "B", texto: "Los estudios y documentos previos, el proyecto de pliego de condiciones y el aviso de convocatoria pública.", esCorrecta: true },
                { letra: "C", texto: "La hoja de vida de todos los funcionarios que trabajan en la oficina de contratación para que el público sepa quiénes son.", esCorrecta: false }
              ],
              explicacion: "La opción B cumple con el principio de publicidad y transparencia en la contratación estatal. La A es ilegal y la C vulnera la privacidad de los funcionarios sin ser requisito legal."
            }
          ]
        },
        {
          contenido: "Como Profesional del SENA, usted realiza el seguimiento a un contrato de prestación de servicios de apoyo a la gestión. Durante la revisión del informe mensual, nota que las actividades reportadas por el contratista son idénticas a las del mes anterior (copiar y pegar) y no adjunta las evidencias de cumplimiento de las obligaciones pactadas. El contratista argumenta que ha tenido mucha carga de trabajo y que 'el supervisor siempre le firma así'. Usted debe actuar conforme a sus funciones de apoyo a la supervisión y asegurar la transparencia del gasto público.",
          categoria: "Supervisión de Contratos", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cuál es su actuación frente al informe de actividades sin evidencias?",
              opciones: [
                { letra: "A", texto: "Devolver el informe para corrección, solicitando las evidencias tangibles de cada actividad y advirtiendo que no se tramitará el pago sin ellas.", esCorrecta: true },
                { letra: "B", texto: "Firmar el recibido del informe para no entrar en conflicto con el contratista y evitar que se retrase su pago mensual.", esCorrecta: false },
                { letra: "C", texto: "Redactar usted mismo las evidencias para ayudarle al contratista y que el proceso administrativo fluya más rápido en la entidad.", esCorrecta: false }
              ],
              explicacion: "La opción A cumple con la responsabilidad de verificar la ejecución real del objeto contractual. La B es una omisión del deber y la C podría constituir falsedad en documento público."
            },
            {
              texto: "Si el contratista persiste en no entregar las evidencias, ¿qué medida administrativa debe proponer al supervisor?",
              opciones: [
                { letra: "A", texto: "Cerrar los ojos y esperar a que el contrato se acabe para no tener que lidiar con el problema jurídico del incumplimiento.", esCorrecta: false },
                { letra: "B", texto: "Iniciar el debido proceso de requerimiento por presunto incumplimiento, citando las cláusulas contractuales y otorgando plazo para subsanar.", esCorrecta: true },
                { letra: "C", texto: "Pedirle al contratista que le dé una parte de su sueldo a cambio de que usted convenza al supervisor de que todo está bien.", esCorrecta: false }
              ],
              explicacion: "La opción B aplica el procedimiento legal para garantizar la correcta ejecución del contrato. La A es negligencia y la C es un delito (concusión/cohecho)."
            },
            {
              texto: "¿Qué principio de la función administrativa se protege primordialmente al exigir evidencias de cumplimiento en el SENA?",
              opciones: [
                { letra: "A", texto: "El principio de Moralidad, asegurando que los recursos públicos se paguen solo por servicios efectivamente prestados.", esCorrecta: true },
                { letra: "B", texto: "El principio de Amistad, demostrando que el SENA confía en sus contratistas por encima de cualquier papel o informe.", esCorrecta: false },
                { letra: "C", texto: "El principio de Velocidad, pagando lo más rápido posible sin revisar nada para que la ejecución presupuestal se vea alta.", esCorrecta: false }
              ],
              explicacion: "La opción A es un principio constitucional de la función administrativa (Art. 209 CP). Las otras opciones distorsionan los fines del Estado y la gestión pública."
            }
          ]
        }
      ]
    },
    {
      simoId: "240968", // CÚCUTA - Asesor (Estadística)
      escenarios: [
        {
          contenido: "Usted es Asesor en la Alcaldía de Cúcuta, encargado de la gestión de información estadística. Durante la formulación del Plan de Desarrollo Municipal, se detecta que los datos de pobreza multidimensional reportados por el DANE difieren significativamente de las caracterizaciones socioeconómicas realizadas por la Secretaría de Bienestar Social en los barrios de frontera. Esta discrepancia afecta la asignación de recursos para programas de subsidios. Usted debe coordinar una mesa técnica para analizar las metodologías, unificar criterios y emitir un concepto técnico que oriente la toma de decisiones del Alcalde sobre la focalización del gasto social.",
          categoria: "Gestión de Datos", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cuál es el enfoque técnico adecuado para resolver la discrepancia de datos entre fuentes oficiales?",
              opciones: [
                { letra: "A", texto: "Ignorar los datos del DANE por ser nacionales y usar solo los de la Alcaldía para demostrar autonomía municipal.", esCorrecta: false },
                { letra: "B", texto: "Realizar un análisis de comparabilidad metodológica, identificar los sesgos de cada fuente y proponer un índice de vulnerabilidad local ponderado.", esCorrecta: true },
                { letra: "C", texto: "Lanzar una moneda al aire para decidir qué cifra poner en el Plan de Desarrollo y así evitar discusiones técnicas largas.", esCorrecta: false }
              ],
              explicacion: "La opción B aplica rigor científico y estadístico para la toma de decisiones informadas. La A ignora la jerarquía de la información oficial y la C es una falta de profesionalismo absoluta."
            },
            {
              texto: "En el marco del Gobierno Digital, ¿qué estrategia propone para evitar futuras discrepancias en la información estadística?",
              opciones: [
                { letra: "A", texto: "Implementar un lago de datos (Data Lake) institucional que integre y normalice la información de todas las dependencias en tiempo real.", esCorrecta: true },
                { letra: "B", texto: "Prohibir que el DANE entre a Cúcuta para que no puedan tomar datos que contradigan los informes del municipio.", esCorrecta: false },
                { letra: "C", texto: "Pedirle a los ciudadanos que no den información real en las encuestas para que las estadísticas siempre se vean positivas.", esCorrecta: false }
              ],
              explicacion: "La opción A es una solución tecnológica moderna alineada con las políticas de gestión de TI del Estado. Las otras opciones son ilegales o inviables."
            },
            {
              texto: "Al asesorar la ejecución de proyectos basados en estos datos, ¿qué principio debe primar?",
              opciones: [
                { letra: "A", texto: "La Eficacia, asegurando que los recursos lleguen a la población que efectivamente presenta los mayores índices de carencia.", esCorrecta: true },
                { letra: "B", texto: "El Populismo, entregando los recursos donde haya más votantes potenciales para asegurar la próxima elección.", esCorrecta: false },
                { letra: "C", texto: "El Secreto, ocultando los datos de pobreza para que la ciudad parezca más próspera de lo que realmente es.", esCorrecta: false }
              ],
              explicacion: "La opción A es un principio de la función pública y la planeación. La B y la C son prácticas corruptas o contrarias a la ética administrativa."
            }
          ]
        },
        {
          contenido: "Como Asesor de la Alcaldía de Cúcuta, debe diseñar un sistema de indicadores para monitorear el impacto de la política pública de seguridad ciudadana en las comunas con mayor índice de criminalidad. El Alcalde solicita que el sistema permita visualizar no solo las capturas y operativos, sino también la percepción ciudadana y la eficacia de la justicia local. Usted debe definir las fuentes de información (Policía, Fiscalía, encuestas), establecer la periodicidad de los reportes y asegurar que los datos sean abiertos y transparentes para la ciudadanía de Cúcuta.",
          categoria: "Indicadores de Gestión", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Qué tipo de indicador es más diciente para medir el 'impacto' real de la política de seguridad?",
              opciones: [
                { letra: "A", texto: "Un indicador de resultado, como la tasa de homicidios por cada 100.000 habitantes en comparación con el año anterior.", esCorrecta: true },
                { letra: "B", texto: "Un indicador de insumo, como la cantidad de gasolina que gastan las patrullas de policía en sus recorridos diarios.", esCorrecta: false },
                { letra: "C", texto: "Un indicador de opinión, basado en cuántos 'likes' tiene el Alcalde en sus publicaciones sobre seguridad en Facebook.", esCorrecta: false }
              ],
              explicacion: "La opción A mide la transformación de la realidad social, objetivo de la política pública. La B mide recursos y la C es una métrica de redes sociales sin rigor técnico."
            },
            {
              texto: "Para garantizar la transparencia en el manejo de datos de criminalidad, ¿qué acción propone?",
              opciones: [
                { letra: "A", texto: "Publicar los datos anonimizados en un portal de Datos Abiertos, permitiendo la descarga y análisis por parte de la academia y la prensa.", esCorrecta: true },
                { letra: "B", texto: "Solo mostrar los datos positivos en las ruedas de prensa y clasificar los datos negativos como 'secreto de Estado' para no asustar a nadie.", esCorrecta: false },
                { letra: "C", texto: "Cobrar una tarifa alta a quien quiera consultar las estadísticas para financiar los eventos sociales de la Alcaldía.", esCorrecta: false }
              ],
              explicacion: "La opción A cumple con la Ley de Transparencia y Acceso a la Información Pública (Ley 1712 de 2014). La B y la C vulneran derechos ciudadanos y principios de buen gobierno."
            },
            {
              texto: "Al articular los sistemas de información de Policía y Fiscalía, ¿qué estándar técnico debe seguirse?",
              opciones: [
                { letra: "A", texto: "El marco de interoperabilidad para el Estado colombiano, asegurando el intercambio seguro y eficiente de datos entre entidades.", esCorrecta: true },
                { letra: "B", texto: "Pasar la información en cuadernos escritos a mano para que los hackers no puedan robarse los datos por internet.", esCorrecta: false },
                { letra: "C", texto: "No compartir nada y que cada entidad trabaje aislada para que no haya peleas entre generales y fiscales.", esCorrecta: false }
              ],
              explicacion: "La opción A es el mandato técnico para la modernización del Estado (X-Road/Interoperabilidad). La B es un retroceso tecnológico y la C afecta la eficiencia del Estado en la lucha contra el crimen."
            }
          ]
        }
      ]
    },
    {
      simoId: "233485", // ANLA - Prof. Especializado (Disciplinario)
      escenarios: [
        {
          contenido: "Usted es Profesional Especializado en la oficina de Control Disciplinario de la ANLA. Recibe una queja formal contra un evaluador de licencias ambientales por presunto conflicto de intereses, al haber sido asesor de la empresa solicitante meses antes de ingresar a la entidad. Debe proyectar el auto de apertura de investigación disciplinaria, asegurando el cumplimiento de las etapas del Código General Disciplinario (Ley 1952 de 2019/2094 de 2021). Durante el proceso, el investigado alega que su contrato anterior no tenía cláusula de exclusividad y que su actuación en la ANLA ha sido técnica y neutral.",
          categoria: "Derecho Disciplinario", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cuál es el criterio jurídico fundamental para determinar la existencia de un conflicto de intereses en este caso?",
              opciones: [
                { letra: "A", texto: "Si el funcionario recibió dinero extra por la licencia ambiental específica mientras trabajaba en la ANLA.", esCorrecta: false },
                { letra: "B", texto: "La existencia de un interés particular y directo que pueda afectar la imparcialidad en la toma de decisiones públicas, según la ley.", esCorrecta: true },
                { letra: "C", texto: "Si el funcionario le cae bien o mal a sus compañeros de oficina después de que se conoció el contrato anterior.", esCorrecta: false }
              ],
              explicacion: "La opción B define la esencia del conflicto de intereses y la falta disciplinaria (Ley 1437/Ley 1952). La A es cohecho y la C es un criterio subjetivo irrelevante."
            },
            {
              texto: "Al proyectar el auto de apertura, ¿qué elemento es indispensable para no viciar el proceso?",
              opciones: [
                { letra: "A", texto: "La identificación plena del investigado, la relación sucinta de los hechos y la calificación provisional de la falta (si aplica en esta etapa).", esCorrecta: true },
                { letra: "B", texto: "Una condena anticipada donde se pida la destitución inmediata para demostrar que la ANLA lucha contra la corrupción.", esCorrecta: false },
                { letra: "C", texto: "La lista de todos los familiares del investigado para llamarlos y decirles que su pariente está en problemas legales.", esCorrecta: false }
              ],
              explicacion: "La opción A cumple con los requisitos del debido proceso disciplinario. La B vulnera la presunción de inocencia y la C es una violación a la privacidad y el decoro."
            },
            {
              texto: "¿Cómo debe proceder con la notificación del auto de apertura al investigado?",
              opciones: [
                { letra: "A", texto: "Notificar personalmente o por medios electrónicos autorizados, garantizando el derecho a la defensa y contradicción.", esCorrecta: true },
                { letra: "B", texto: "Publicar el nombre del investigado en carteleras públicas con el título de 'CORRUPTO' antes de que el proceso termine.", esCorrecta: false },
                { letra: "C", texto: "No notificarle nada para que no pueda preparar su defensa y así sea más fácil sancionarlo rápido.", esCorrecta: false }
              ],
              explicacion: "La opción A respeta los principios constitucionales del debido proceso. La B y la C son actuaciones arbitrarias e ilegales que anulan el proceso disciplinario."
            }
          ]
        },
        {
          contenido: "Como Profesional de Control Disciplinario en la ANLA, debe practicar una prueba testimonial a un tercero que afirma tener pruebas de la conducta irregular del funcionario investigado. El testigo solicita que su identidad se mantenga bajo reserva por temor a represalias de la empresa interesada en la licencia ambiental. Usted debe aplicar las normas sobre reserva de la identidad en procesos administrativos y asegurar que el testimonio sea recaudado con todas las formalidades legales para que tenga valor probatorio dentro del expediente disciplinario.",
          categoria: "Pruebas en Disciplinario", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Es posible garantizar la reserva absoluta de la identidad de un testigo en un proceso disciplinario administrativo?",
              opciones: [
                { letra: "A", texto: "Sí, siempre y cuando el testigo sea un funcionario de alto rango dentro de la ANLA o de un ministerio.", esCorrecta: false },
                { letra: "B", texto: "No de forma absoluta frente al investigado, pues este tiene derecho a conocer quién lo acusa para ejercer la contradicción de la prueba.", esCorrecta: true },
                { letra: "C", texto: "Sí, usando distorsionadores de voz y capuchas durante la diligencia para que nadie sepa quién está hablando.", esCorrecta: false }
              ],
              explicacion: "La opción B refleja la tensión entre la protección al testigo y el derecho fundamental a la defensa (Jurisprudencia Corte Constitucional). Las otras opciones son erróneas o absurdas técnicamente."
            },
            {
              texto: "Al redactar el acta de la diligencia de testimonio, ¿cuál es su deber técnico?",
              opciones: [
                { letra: "A", texto: "Consignar fielmente las preguntas realizadas y las respuestas dadas, sin emitir juicios de valor u opiniones personales en el acta.", esCorrecta: true },
                { letra: "B", texto: "Escribir solo lo que a usted le parezca que sirve para culpar al investigado, omitiendo lo que pueda favorecerlo.", esCorrecta: false },
                { letra: "C", texto: "Grabar solo el audio y borrarlo después de que usted lo escuche una vez, para que no quede rastro físico de la diligencia.", esCorrecta: false }
              ],
              explicacion: "La opción A garantiza la objetividad y la integridad de la prueba. La B es una falta a la imparcialidad y la C es una destrucción de evidencia procesal."
            },
            {
              texto: "¿Qué valor tiene un testimonio que no fue ratificado o que fue obtenido bajo presión psicológica?",
              opciones: [
                { letra: "A", texto: "Tiene valor pleno porque lo importante es conseguir la sanción a cualquier costo para mejorar las estadísticas de la oficina.", esCorrecta: false },
                { letra: "B", texto: "Carece de valor probatorio o su valor es mínimo por estar viciado en su formación y vulnerar derechos fundamentales.", esCorrecta: true },
                { letra: "C", texto: "Depende de si el testigo es amigo personal del Jefe de la Oficina de Control Disciplinario o no.", esCorrecta: false }
              ],
              explicacion: "La opción B aplica la regla de exclusión de prueba ilícita. La A es ilegal y la C es un criterio de amiguismo contrario a la ley."
            }
          ]
        }
      ]
    },
    {
      simoId: "240730", // NORTE DE SANTANDER - Prof. Especializado (Administrativo)
      escenarios: [
        {
          contenido: "Usted es Profesional Especializado en la Gobernación de Norte de Santander. Se detecta que en varias dependencias la documentación se encuentra acumulada en pasillos y depósitos sin ningún orden, lo que dificulta la respuesta oportuna a derechos de petición y entes de control. Usted debe liderar la implementación de las Tablas de Retención Documental (TRD) y coordinar el proceso de organización, clasificación y transferencia de archivos al Archivo Central del departamento, asegurando el cumplimiento de la Ley General de Archivos (Ley 594 de 2000).",
          categoria: "Gestión Documental", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cuál es el primer paso técnico para organizar el archivo acumulado en una dependencia departamental?",
              opciones: [
                { letra: "A", texto: "Contratar un camión de basura y botar todo lo que tenga más de dos años de antigüedad para despejar los pasillos rápido.", esCorrecta: false },
                { letra: "B", texto: "Realizar un diagnóstico integral, identificar las series y subseries documentales según las TRD y proceder a la foliación y descripción.", esCorrecta: true },
                { letra: "C", texto: "Pedirle a los empleados de servicios generales que amontonen los papeles en cajas de cartón y les pongan un número al azar afuera.", esCorrecta: false }
              ],
              explicacion: "La opción B sigue los estándares del Archivo General de la Nación. La A es una destrucción ilegal de patrimonio documental y la C es una mala práctica que no resuelve el problema de fondo."
            },
            {
              texto: "Respecto a la foliación de los expedientes, ¿cuál es la norma técnica correcta?",
              opciones: [
                { letra: "A", texto: "Numerar consecutivamente en el extremo superior derecho, con lápiz de mina negra, en el orden en que ocurrieron los hechos (cronológico).", esCorrecta: true },
                { letra: "B", texto: "Poner números con marcador permanente rojo en el centro de la hoja para que se vea bien desde lejos y no se pierda.", esCorrecta: false },
                { letra: "C", texto: "No numerar nada porque eso daña el papel y hace que los expedientes pesen más para el transporte al archivo central.", esCorrecta: false }
              ],
              explicacion: "La opción A cumple con el Acuerdo 002 de 2014 del AGN. La B daña el documento y la C imposibilita el control de integridad de la información."
            },
            {
              texto: "¿Qué beneficio institucional reporta la correcta aplicación de las TRD en la Gobernación?",
              opciones: [
                { letra: "A", texto: "Garantizar la recuperación inmediata de la información y proteger la memoria institucional y los derechos de los ciudadanos.", esCorrecta: true },
                { letra: "B", texto: "Que los funcionarios tengan más tiempo libre para tomar café porque ya no tienen que buscar papeles en los depósitos sucios.", esCorrecta: false },
                { letra: "C", texto: "Poder vender el papel viejo como reciclaje y usar ese dinero para la fiesta de fin de año de la dependencia.", esCorrecta: false }
              ],
              explicacion: "La opción A es el fin último de la gestión documental pública. La B es un beneficio secundario no técnico y la C es un uso ilegal de bienes públicos."
            }
          ]
        },
        {
          contenido: "Como Profesional Especializado de la Gobernación, usted debe coordinar la realización de un estudio técnico para formular la Política Pública de Empleo Joven en Norte de Santander. El estudio requiere recopilar información de las Cámaras de Comercio, universidades y agencias de empleo. Usted debe definir la metodología de investigación, supervisar el trabajo de campo y proyectar el documento final con recomendaciones estratégicas que serán presentadas ante la Asamblea Departamental para su aprobación mediante ordenanza.",
          categoria: "Planeación Territorial", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Qué metodología de recolección de información es más pertinente para este estudio sectorial?",
              opciones: [
                { letra: "A", texto: "Metodología mixta (cuantitativa y cualitativa), combinando datos estadísticos de desempleo con grupos focales con jóvenes y empresarios.", esCorrecta: true },
                { letra: "B", texto: "Revisar solo lo que dicen los políticos en Twitter sobre el empleo para no tener que hablar con la gente real de los municipios.", esCorrecta: false },
                { letra: "C", texto: "Inventar los datos basados en su 'intuición profesional' para que la política pública se vea muy exitosa desde el primer día.", esCorrecta: false }
              ],
              explicacion: "La opción A garantiza una visión integral y diagnóstica de la problemática social. Las otras opciones carecen de validez técnica y ética."
            },
            {
              texto: "Al proyectar las recomendaciones de la política, ¿qué enfoque debe considerar según el MIPG?",
              opciones: [
                { letra: "A", texto: "El enfoque de resultados, estableciendo metas claras, indicadores de cumplimiento y responsables de la ejecución presupuestal.", esCorrecta: true },
                { letra: "B", texto: "El enfoque de 'buena voluntad', esperando que las empresas contraten jóvenes solo porque el Gobernador se los pide amablemente.", esCorrecta: false },
                { letra: "C", texto: "El enfoque de exclusión, recomendando que solo se contraten jóvenes que vivan en el centro de Cúcuta para ahorrar en transporte.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la política pública con los estándares de gestión del Estado. La B es ineficaz y la C vulnera el principio de igualdad y equidad territorial."
            },
            {
              texto: "Respecto a la presentación ante la Asamblea, ¿qué documento técnico es indispensable?",
              opciones: [
                { letra: "A", texto: "La exposición de motivos, donde se sustenta la necesidad técnica, jurídica y financiera de la política pública de empleo.", esCorrecta: true },
                { letra: "B", texto: "Una carta pidiendo que aprueben todo rápido sin leer porque usted tiene mucho afán de irse a vacaciones.", esCorrecta: false },
                { letra: "C", texto: "Un álbum de fotos de las reuniones donde todos se ven sonriendo para que los diputados se pongan felices al verlo.", esCorrecta: false }
              ],
              explicacion: "La opción A es el requisito procedimental y técnico para el trámite de actos administrativos de carácter general (Ordenanzas). Las otras opciones son informales e insuficientes."
            }
          ]
        }
      ]
    },
    {
      simoId: "240579", // PEREIRA - Prof. Universitario (Turismo)
      escenarios: [
        {
          contenido: "Usted es Profesional Universitario en la Secretaría de Turismo de Pereira. La cuenca alta del Río Otún ha experimentado un crecimiento desordenado de visitantes que están afectando el ecosistema y la calidad del agua que surte a la ciudad. Usted debe liderar la implementación del Sistema de Gestión de Sostenibilidad Turística en esta zona certificada. Se enfrenta a la resistencia de algunos operadores turísticos locales que consideran que las medidas de capacidad de carga y control de residuos limitan sus ganancias económicas a corto plazo.",
          categoria: "Turismo Sostenible", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cómo aborda técnicamente la resistencia de los operadores frente a las medidas de sostenibilidad?",
              opciones: [
                { letra: "A", texto: "Amenazarlos con cerrar todos sus negocios de inmediato si no firman un compromiso de protección ambiental ese mismo día.", esCorrecta: false },
                { letra: "B", texto: "Realizar jornadas de sensibilización técnica, demostrando que la conservación del recurso es lo que garantiza la viabilidad del negocio a largo plazo.", esCorrecta: true },
                { letra: "C", texto: "Eliminar las restricciones ambientales para que los operadores estén contentos y la Secretaría no tenga conflictos con el sector privado.", esCorrecta: false }
              ],
              explicacion: "La opción B aplica la gestión del cambio y el fomento de la sostenibilidad como activo estratégico. La A escala el conflicto y la C es una negligencia frente a la protección de recursos naturales."
            },
            {
              texto: "Para medir la 'Capacidad de Carga' turística del Río Otún, ¿qué factor debe evaluar?",
              opciones: [
                { letra: "A", texto: "El número máximo de visitantes que el ecosistema puede soportar sin sufrir un deterioro irreversible o afectar la experiencia del turista.", esCorrecta: true },
                { letra: "B", texto: "Cuántas personas caben paradas hombro a hombro a lo largo de la orilla del río en un día festivo de mucha afluencia.", esCorrecta: false },
                { letra: "C", texto: "La cantidad de platos de comida que pueden vender los restaurantes de la zona antes de que se les acabe el inventario de ingredientes.", esCorrecta: false }
              ],
              explicacion: "La opción A es la definición técnica de capacidad de carga turística. Las otras opciones son criterios logísticos o comerciales que ignoran la variable ambiental."
            },
            {
              texto: "Respecto al Sistema de Gestión de Sostenibilidad (SGS), ¿qué actividad es fundamental para mantener la certificación?",
              opciones: [
                { letra: "A", texto: "Realizar auditorías internas periódicas, seguimiento a indicadores ambientales y actualización de la política de sostenibilidad institucional.", esCorrecta: true },
                { letra: "B", texto: "Cambiar el logo de la Secretaría de Turismo por uno más verde y con dibujos de flores para que parezca más ecológico ante el público.", esCorrecta: false },
                { letra: "C", texto: "Pagarle a un influenciador de redes sociales para que diga que el Río Otún está perfecto aunque haya basura por todas partes.", esCorrecta: false }
              ],
              explicacion: "La opción A cumple con los requisitos de la norma técnica de sostenibilidad (NTS). Las otras opciones son 'lavado de imagen' (greenwashing) sin impacto real."
            }
          ]
        },
        {
          contenido: "Como Profesional de Turismo en Pereira, debe actualizar el inventario municipal de patrimonio cultural material e inmaterial. Durante el trabajo de campo, identifica una casona de arquitectura cafetera declarada Bien de Interés Cultural (BIC) que presenta graves problemas estructurales y riesgo de colapso, pero sus propietarios no tienen recursos para restaurarla y quieren demolerla para construir un edificio moderno. Usted debe orientar a los dueños sobre la normativa de protección, las posibles ayudas estatales y asegurar la conservación del valor patrimonial del municipio.",
          categoria: "Patrimonio Cultural", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cuál es la restricción legal sobre los Bienes de Interés Cultural (BIC) en cuanto a su demolición?",
              opciones: [
                { letra: "A", texto: "Están protegidos por ley y su demolición total o parcial está prohibida, requiriendo autorización previa de la autoridad competente para cualquier intervención.", esCorrecta: true },
                { letra: "B", texto: "Se pueden demoler si el dueño demuestra que el edificio es viejo y que a él no le gusta cómo se ve en comparación con los edificios vecinos.", esCorrecta: false },
                { letra: "C", texto: "El dueño puede hacer lo que quiera con su propiedad privada, ya que la Constitución de Colombia dice que la propiedad es sagrada por encima del Estado.", esCorrecta: false }
              ],
              explicacion: "La opción A refleja la protección constitucional y legal del patrimonio cultural (Ley 397 de 1997/Ley 1185 de 2008). Las otras opciones ignoran la función social y cultural de la propiedad."
            },
            {
              texto: "Para apoyar la conservación de la casona cafetera, ¿qué acción técnica propone?",
              opciones: [
                { letra: "A", texto: "Gestionar ante la Secretaría de Planeación la aplicación de beneficios tributarios o compensaciones por conservación de patrimonio para los dueños.", esCorrecta: true },
                { letra: "B", texto: "Decirle a los dueños que vendan rifas y tamales en la calle para que ellos mismos consigan la plata para arreglar el techo de la casa.", esCorrecta: false },
                { letra: "C", texto: "Sugerir que dejen que la casa se caiga sola con la lluvia para que el problema legal se acabe 'naturalmente' sin intervención de la alcaldía.", esCorrecta: false }
              ],
              explicacion: "La opción A es una medida de fomento y gestión pública efectiva para la protección del patrimonio. La B es insuficiente y la C es una omisión negligente y malintencionada."
            },
            {
              texto: "En cuanto al patrimonio inmaterial relacionado con la arquitectura cafetera, ¿qué debe registrar en el inventario?",
              opciones: [
                { letra: "A", texto: "Los saberes de los maestros de obra locales en el uso de la guadua, el bareque y las técnicas constructivas tradicionales de la región.", esCorrecta: true },
                { letra: "B", texto: "La lista de precios de cuánto cuesta el bulto de cemento en las ferreterías más cercanas a la casona patrimonial.", esCorrecta: false },
                { letra: "C", texto: "El nombre de todos los turistas que se han tomado una 'selfie' frente a la casa durante el último año de operación.", esCorrecta: false }
              ],
              explicacion: "La opción A identifica un elemento real de patrimonio inmaterial (saberes tradicionales). Las otras opciones son datos económicos o anecdóticos sin valor patrimonial."
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
