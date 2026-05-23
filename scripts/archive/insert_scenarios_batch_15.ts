import { PrismaClient, TipoPregunta, NivelDificultad } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const dataToInsert: any[] = [
    {
      simoId: "241024", // BOLÍVAR - Secretario Ejecutivo (Gestión Documental)
      escenarios: [
        {
          contenido: "Usted es Secretario Ejecutivo en la Gobernación de Bolívar. Recibe un volumen alto de correspondencia externa, incluyendo derechos de petición y requerimientos judiciales con términos perentorios. Usted debe realizar la radicación inmediata en el sistema de gestión documental, clasificar los documentos según la urgencia y remitirlos a las dependencias competentes, asegurando que la trazabilidad sea impecable para evitar vencimientos de términos que puedan afectar legalmente a la administración departamental.",
          categoria: "Gestión Documental", dificultad: "BASICO",
          preguntas: [
            {
              texto: "¿Cuál es el procedimiento técnico para radicar una correspondencia externa según las normas de archivo?",
              opciones: [
                { letra: "A", texto: "Asignar un número consecutivo de radicado, registrar la fecha y hora de recibo, y generar un adhesivo o sello que identifique el documento en el sistema.", esCorrecta: true },
                { letra: "B", texto: "Escribir el nombre del remitente en una servilleta y pegarla con cinta al documento para que no se pierda.", esCorrecta: false },
                { letra: "C", texto: "Guardar el documento en un cajón y esperar a que el remitente llame a preguntar si ya lo recibieron.", esCorrecta: false }
              ],
              explicacion: "La opción A garantiza el control y la validez legal del recibo de documentos públicos. Las otras opciones son informales e irresponsables."
            },
            {
              texto: "Ante un requerimiento judicial con vencimiento hoy mismo, ¿cuál es su acción prioritaria?",
              opciones: [
                { letra: "A", texto: "Radicarlo inmediatamente y llevarlo personalmente de forma prioritaria a la oficina jurídica, alertando sobre la urgencia del término.", esCorrecta: true },
                { letra: "B", texto: "Dejarlo en la bandeja de 'pendientes' y esperar a que el mensajero pase mañana a recoger la correspondencia del día.", esCorrecta: false },
                { letra: "C", texto: "Pedirle al cartero que se lleve el documento de vuelta y que diga que la Gobernación estaba cerrada por fumigación.", esCorrecta: false }
              ],
              explicacion: "La opción A demuestra compromiso con los fines del Estado y prevención del daño antijurídico. Las otras opciones son negligencias o falsedades."
            },
            {
              texto: "¿Qué principio de la función pública se destaca al mantener un archivo organizado y accesible?",
              opciones: [
                { letra: "A", texto: "El principio de Transparencia y el derecho de Acceso a la Información Pública por parte de los ciudadanos.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'Esconder los Papeles', para que nadie pueda investigar qué hace la Gobernación de Bolívar.", esCorrecta: false },
                { letra: "C", texto: "El principio de Jerarquía, demostrando que solo los jefes pueden ver los documentos importantes de la entidad.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la gestión documental con los derechos fundamentales. Las otras opciones son contrarias a la democracia y la ley."
            }
          ]
        },
        {
          contenido: "Como Secretario Ejecutivo en Bolívar, un ciudadano se acerca a su ventanilla exigiendo ver un expediente de contratación que, según él, contiene irregularidades. El ciudadano está alterado y grita que tiene derecho a la información. Usted debe aplicar el protocolo de atención al ciudadano, explicar los términos de reserva legal si existen y orientar al usuario sobre el trámite formal para solicitar copias o la consulta física del expediente en cumplimiento de la Ley 1712 de 2014.",
          categoria: "Atención al Ciudadano", dificultad: "BASICO",
          preguntas: [
            {
              texto: "¿Cómo debe manejar la comunicación con el ciudadano alterado?",
              opciones: [
                { letra: "A", texto: "Mantener la calma, escuchar con respeto, usar un tono de voz pausado y explicar con claridad los procedimientos legales de acceso a la información.", esCorrecta: true },
                { letra: "B", texto: "Gritarle más fuerte al ciudadano para demostrarle que en la Gobernación usted es la autoridad y que debe guardar silencio.", esCorrecta: false },
                { letra: "C", texto: "Llamar a la policía de inmediato sin intentar mediar palabra con el ciudadano para que se lo lleven detenido por ruidoso.", esCorrecta: false }
              ],
              explicacion: "La opción A refleja las competencias conductuales y de servicio al ciudadano. Las otras opciones escalan el conflicto y no son profesionales."
            },
            {
              texto: "En cuanto al acceso al expediente de contratación, ¿qué norma prima?",
              opciones: [
                { letra: "A", texto: "La Ley de Transparencia (1712), que establece que toda información pública es accesible a menos que tenga reserva legal expresa (ej. datos personales sensibles).", esCorrecta: true },
                { letra: "B", texto: "La voluntad del Secretario General, quien decide a quién le presta los expedientes según su estado de ánimo.", esCorrecta: false },
                { letra: "C", texto: "Ninguna, los expedientes de contratación son secretos de Estado y nadie fuera de la Gobernación puede verlos.", esCorrecta: false }
              ],
              explicacion: "La opción A es el fundamento legal de la transparencia en Colombia. Las otras opciones son interpretaciones autoritarias o erróneas."
            },
            {
              texto: "¿Qué valor del servidor público se pone a prueba en esta situación de tensión?",
              opciones: [
                { letra: "A", texto: "La Excelencia en el Servicio y el Respeto, garantizando el derecho del ciudadano a ser atendido con dignidad.", esCorrecta: true },
                { letra: "B", texto: "La Indiferencia, ignorando al ciudadano hasta que se canse de gritar y se vaya de la oficina por su cuenta.", esCorrecta: false },
                { letra: "C", texto: "La Astucia, engañando al ciudadano con promesas falsas para que no ponga una queja contra usted.", esCorrecta: false }
              ],
              explicacion: "La opción A es un pilar del Código de Integridad. Las otras opciones son conductas negativas que deterioran la imagen institucional."
            }
          ]
        }
      ]
    },
    {
      simoId: "242622", // DIAN - Gestor I (Aduanas)
      escenarios: [
        {
          contenido: "Usted es Gestor I en la DIAN, responsable de la inspección física de un cargamento de textiles proveniente de Asia. Al verificar la mercancía, encuentra que la cantidad de rollos de tela es superior a la declarada en la factura y los documentos de transporte, y que la composición de las fibras no coincide con la clasificación arancelaria reportada. Usted debe proceder con la aprehensión preventiva, documentar las inconsistencias en el acta de inspección y asegurar la cadena de custodia de las muestras enviadas al laboratorio de aduanas.",
          categoria: "Control Aduanero", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cuál es la consecuencia legal de encontrar mayor cantidad de mercancía de la declarada en una inspección física?",
              opciones: [
                { letra: "A", texto: "La aprehensión de la mercancía en exceso por no estar amparada en los documentos de importación, de acuerdo con el Estatuto Aduanero.", esCorrecta: true },
                { letra: "B", texto: "Regalarle los rollos sobrantes al importador como premio por haber traído tanta mercancía al país.", esCorrecta: false },
                { letra: "C", texto: "Que el funcionario de la DIAN se quede con la tela sobrante para hacerse unos uniformes nuevos para la oficina.", esCorrecta: false }
              ],
              explicacion: "La opción A aplica la norma legal vigente sobre control de carga. Las otras opciones son actos de corrupción o negligencia extrema."
            },
            {
              texto: "Respecto a la duda sobre la composición de las fibras, ¿qué procedimiento técnico debe seguir?",
              opciones: [
                { letra: "A", texto: "Tomar muestras representativas de la mercancía, sellarlas y enviarlas al laboratorio técnico de la DIAN para el análisis de clasificación arancelaria.", esCorrecta: true },
                { letra: "B", texto: "Quemar un pedacito de tela y oler el humo para adivinar si es algodón o poliéster según su instinto.", esCorrecta: false },
                { letra: "C", texto: "Creerle ciegamente al importador cuando dice que la tela es de la mejor calidad y no investigar más.", esCorrecta: false }
              ],
              explicacion: "La opción A es el procedimiento técnico-legal de toma de muestras. Las otras opciones son empíricas, inseguras e ilegales."
            },
            {
              texto: "¿Qué principio de la función administrativa se protege al realizar una inspección rigurosa?",
              opciones: [
                { letra: "A", texto: "La Igualdad y la Moralidad, evitando la competencia desleal y el contrabando técnico que afecta la industria nacional.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'Entorpecer el Comercio', tratando de que nada entre al país para que la DIAN no tenga trabajo.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Pagar para Pasar', buscando que los importadores ofrezcan dinero a cambio de no ser revisados.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la labor aduanera con la protección de la economía nacional. Las otras opciones son visiones negativas o corruptas."
            }
          ]
        },
        {
          contenido: "Como Gestor de Aduanas en la DIAN, debe evaluar una solicitud de levante para una importación de maquinaria industrial de segunda mano. Existe una alerta de riesgo sobre posible subvaloración y lavado de activos a través de este tipo de operaciones. Usted debe revisar detalladamente la valoración aduanera, verificar la trazabilidad de los pagos internacionales y asegurar que los documentos de transporte sean auténticos, cruzando información con las bases de datos de comercio exterior.",
          categoria: "Valoración y Riesgo Aduanero", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cuál es el criterio para aceptar el valor declarado de maquinaria usada según la OMC?",
              opciones: [
                { letra: "A", texto: "Que el valor refleje el precio realmente pagado o por pagar, ajustado según el estado de depreciación y las condiciones de mercado de bienes similares.", esCorrecta: true },
                { letra: "B", texto: "Aceptar cualquier valor que diga la factura, asumiendo que como es viejo, el precio puede ser de un dólar.", esCorrecta: false },
                { letra: "C", texto: "Ponerle el precio de una máquina nueva para que la DIAN recaude más impuestos sin importar la realidad del bien.", esCorrecta: false }
              ],
              explicacion: "La opción A utiliza los métodos de valoración legalmente establecidos. Las otras opciones son negligencias o arbitrariedades."
            },
            {
              texto: "Ante la sospecha de lavado de activos, ¿qué acción administrativa es obligatoria?",
              opciones: [
                { letra: "A", texto: "Reportar la operación sospechosa a la unidad de gestión de riesgos de la DIAN y, si es el caso, a la UIAF para su investigación.", esCorrecta: true },
                { letra: "B", texto: "Pedirle al importador que le cuente un secreto sobre sus negocios y si el secreto es bueno, dejarlo pasar sin reportar nada.", esCorrecta: false },
                { letra: "C", texto: "No decir nada para no meterse en problemas con gente peligrosa que pueda estar detrás del negocio.", esCorrecta: false }
              ],
              explicacion: "La opción A cumple con el deber legal de reporte de actividades sospechosas. Las otras opciones son faltas gravísimas a la integridad pública."
            },
            {
              texto: "¿Qué principio rige la actuación del funcionario de la DIAN al utilizar sistemas de gestión de riesgos?",
              opciones: [
                { letra: "A", texto: "La Eficacia y la Imparcialidad, enfocando los controles donde hay mayor probabilidad de irregularidad sin perseguir a nadie injustamente.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'Adivinanza', revisando a la gente según el color de los zapatos que llevan puestos ese día.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Dejar de Hacer', para que el sistema de riesgos trabaje solo mientras el funcionario descansa.", esCorrecta: false }
              ],
              explicacion: "La opción A es el fundamento de la aduana moderna basada en riesgos. Las otras opciones carecen de lógica profesional."
            }
          ]
        }
      ]
    },
    {
      simoId: "236700", // DIAN - Gestor III (Jurídico/Contable)
      escenarios: [
        {
          contenido: "Usted es Gestor III en el área jurídica de la DIAN. Debe proyectar la defensa técnica de la entidad en un proceso de nulidad y restablecimiento del derecho interpuesto por una multinacional que cuestiona una liquidación oficial de revisión por precios de transferencia. La empresa alega que el análisis de comparabilidad realizado por la DIAN fue erróneo y que se vulneró el principio de plena competencia (arm's length). Usted debe analizar los estados financieros, los reportes locales y maestros, y sustentar técnicamente la posición del Estado basándose en las directrices de la OCDE.",
          categoria: "Precios de Transferencia / Tributario", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Qué documento es la base técnica para evaluar las operaciones entre vinculados económicos?",
              opciones: [
                { letra: "A", texto: "La Documentación Comprobatoria (Reporte Local, Maestro y País por País) que detalle las funciones, activos y riesgos asumidos por las partes.", esCorrecta: true },
                { letra: "B", texto: "Una carta del gerente de la multinacional diciendo que ellos son personas honestas y que nunca evadirían impuestos.", esCorrecta: false },
                { letra: "C", texto: "Un folleto publicitario de la empresa donde digan que son líderes mundiales en su sector económico.", esCorrecta: false }
              ],
              explicacion: "La opción A identifica los soportes técnicos obligatorios en materia de precios de transferencia. Las otras opciones carecen de valor probatorio fiscal."
            },
            {
              texto: "Al defender el ajuste de la DIAN, ¿cuál es el argumento central frente al principio de 'Plena Competencia'?",
              opciones: [
                { letra: "A", texto: "Que los precios pactados entre las partes vinculadas no corresponden a los que habrían pactado terceros independientes en operaciones comparables.", esCorrecta: true },
                { letra: "B", texto: "Que a la DIAN le parece que la empresa gana mucho dinero y que por eso debe pagar más impuestos aunque todo sea legal.", esCorrecta: false },
                { letra: "C", texto: "Que la multinacional tiene un logo muy feo y que eso demuestra que no son una empresa seria para el país.", esCorrecta: false }
              ],
              explicacion: "La opción A es la esencia técnica de la fiscalización internacional. Las otras opciones son criterios subjetivos o absurdos."
            },
            {
              texto: "¿Qué valor institucional se protege al litigar con rigor técnico en defensa de los tributos nacionales?",
              opciones: [
                { letra: "A", texto: "La Justicia y la Legalidad, asegurando que todos los contribuyentes aporten de manera equitativa a las cargas públicas.", esCorrecta: true },
                { letra: "B", texto: "La Arrogancia Estatal, tratando de hundir a las empresas privadas para que el Estado sea el único dueño de todo.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Recaudar como sea', sin importar si se violan los derechos de los contribuyentes en el proceso judicial.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la gestión jurídica con los fines constitucionales del recaudo. Las otras opciones son visiones distorsionadas de la función pública."
            }
          ]
        },
        {
          contenido: "Como Gestor III Jurídico en la DIAN, debe evaluar el impacto de una reciente sentencia del Consejo de Estado que declara la nulidad parcial de una resolución sobre retención en la fuente. Debe proyectar una circular interna con los nuevos lineamientos para que los auditores no sigan aplicando la norma anulada y evitar así nulidades futuras en las liquidaciones oficiales. Usted debe realizar la hermenéutica jurídica, identificar las consecuencias contables del fallo y asegurar que la entidad actúe bajo el principio de seguridad jurídica.",
          categoria: "Hermenéutica Tributaria", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cuál es el efecto jurídico de una sentencia de nulidad de un acto administrativo de carácter general (circular o resolución)?",
              opciones: [
                { letra: "A", texto: "Tiene efectos 'erga omnes' y, por regla general, retrotrae las cosas al estado en que se encontraban antes de la expedición de la norma anulada.", esCorrecta: true },
                { letra: "B", texto: "Que solo el funcionario que perdió el juicio debe dejar de usar la norma, pero los demás pueden seguir usándola si quieren.", esCorrecta: false },
                { letra: "C", texto: "Ninguno, las sentencias del Consejo de Estado son solo sugerencias que la DIAN puede ignorar si no le gustan.", esCorrecta: false }
              ],
              explicacion: "La opción A refleja el rigor del derecho administrativo colombiano (CPACA). Las otras opciones son faltas gravísimas al orden jurídico."
            },
            {
              texto: "Al proyectar los nuevos lineamientos, ¿qué debe priorizar para proteger a la entidad?",
              opciones: [
                { letra: "A", texto: "La unificación de criterios que evite interpretaciones divergentes entre las seccionales y garantice el derecho a la igualdad de los contribuyentes.", esCorrecta: true },
                { letra: "B", texto: "Inventar una nueva norma más estricta que la anterior para castigar a los contribuyentes por haber demandado a la DIAN.", esCorrecta: false },
                { letra: "C", texto: "No decir nada y esperar a que cada auditor decida por su cuenta qué norma aplicar según lo que lea en las noticias.", esCorrecta: false }
              ],
              explicacion: "La opción A es la función técnica de unificación de doctrina de la DIAN. Las otras opciones son represalias o negligencias administrativas."
            },
            {
              texto: "¿Qué principio de la función administrativa se cumple al acatar de inmediato los fallos judiciales?",
              opciones: [
                { letra: "A", texto: "La Moralidad Administrativa y el Respeto al debido proceso y a la separación de poderes.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'Sometimiento', demostrando que la DIAN es una entidad débil que no sabe defenderse en los juzgados.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Miedo a la Multa', acatando solo porque el juez puede sancionar al Director de la DIAN personalmente.", esCorrecta: false }
              ],
              explicacion: "La opción A define el compromiso ético de la entidad con el Estado Social de Derecho. Las otras opciones son interpretaciones erróneas de la legalidad."
            }
          ]
        }
      ]
    },
    {
      simoId: "243245", // BUCARAMANGA - Auxiliar Área Salud (Salud Pública)
      escenarios: [
        {
          contenido: "Usted es Auxiliar en el área de salud de la Alcaldía de Bucaramanga. Debe participar en una jornada masiva de vacunación del PAI en un barrio con bajos índices de cobertura. Al revisar los registros, nota que varias familias se niegan a vacunar a sus hijos por mitos religiosos y falta de información. Usted debe realizar la labor educativa casa por casa, explicar los beneficios de la inmunización, diligenciar correctamente los carnés y asegurar que los biológicos se mantengan en la cadena de frío adecuada durante todo el recorrido.",
          categoria: "Salud Pública / Inmunización", dificultad: "BASICO",
          preguntas: [
            {
              texto: "¿Cuál es la temperatura estándar de conservación para la mayoría de las vacunas del PAI en el nivel local?",
              opciones: [
                { letra: "A", texto: "Entre +2°C y +8°C, garantizando la estabilidad y efectividad del biológico.", esCorrecta: true },
                { letra: "B", texto: "A temperatura ambiente, para que la vacuna no esté tan fría cuando se la pongan al niño y no llore tanto.", esCorrecta: false },
                { letra: "C", texto: "Congeladas a -20°C en un bloque de hielo seco para que duren muchos años sin dañarse.", esCorrecta: false }
              ],
              explicacion: "La opción A es el estándar técnico de la cadena de frío en salud pública. Las otras opciones dañan el biológico."
            },
            {
              texto: "Ante la negativa de los padres por mitos, ¿qué argumento técnico-educativo utiliza?",
              opciones: [
                { letra: "A", texto: "Explicar que las vacunas son seguras, que previenen enfermedades graves y discapacidades, y que es un derecho fundamental del niño a la salud.", esCorrecta: true },
                { letra: "B", texto: "Amenazarlos con llamar a la policía para que se lleven a los niños detenidos si no los dejan vacunar de inmediato.", esCorrecta: false },
                { letra: "C", texto: "Decirles que si no vacunan a los niños, el Alcalde de Bucaramanga no les va a dar más mercados ni ayudas sociales.", esCorrecta: false }
              ],
              explicacion: "La opción A refleja la labor de promoción y prevención en salud. Las otras opciones son coercitivas e ilegales."
            },
            {
              texto: "¿Qué documento debe diligenciar para asegurar la trazabilidad de la dosis aplicada?",
              opciones: [
                { letra: "A", texto: "El carné de vacunación del niño, el registro diario de vacunación y cargar la información en el sistema nominal PAIWEB.", esCorrecta: true },
                { letra: "B", texto: "Una lista en una hoja de cuaderno rayado para luego pasarla a limpio cuando tenga tiempo en la oficina.", esCorrecta: false },
                { letra: "C", texto: "Ninguno, lo importante es poner la inyección, los papeles son una pérdida de tiempo para los auxiliares de salud.", esCorrecta: false }
              ],
              explicacion: "La opción A es el procedimiento obligatorio para el monitoreo de coberturas en salud pública. Las otras opciones son negligencias administrativas."
            }
          ]
        },
        {
          contenido: "Como Auxiliar de Salud en Bucaramanga, apoya la vigilancia epidemiológica de casos de Dengue en una comuna donde se ha detectado un brote. Debe realizar la inspección de depósitos de agua en las viviendas, identificar criaderos de mosquitos (Aedes aegypti), sensibilizar a la comunidad sobre el lavado de tanques y reportar los casos probables al sistema de vigilancia SIVIGILA, siguiendo los protocolos de salud municipal.",
          categoria: "Vigilancia Epidemiológica", dificultad: "BASICO",
          preguntas: [
            {
              texto: "¿Cuál es la recomendación técnica más efectiva para eliminar los criaderos de mosquitos en el hogar?",
              opciones: [
                { letra: "A", texto: "Lavar y cepillar los tanques de agua cada 8 días y eliminar cualquier objeto que pueda acumular agua lluvia a la intemperie.", esCorrecta: true },
                { letra: "B", texto: "Ponerle mucha sal al agua del tanque para que los mosquitos se mueran por el sabor del agua.", esCorrecta: false },
                { letra: "C", texto: "Cerrar todas las ventanas de la casa para que los mosquitos no puedan entrar a poner sus huevos en el tanque.", esCorrecta: false }
              ],
              explicacion: "La opción A es la medida de control físico de vectores estándar en salud pública. Las otras opciones son ineficaces o absurdas."
            },
            {
              texto: "Al identificar una persona con fiebre alta y dolor en los huesos (posible Dengue), ¿qué debe hacer?",
              opciones: [
                { letra: "A", texto: "Remitirla de inmediato al centro de salud más cercano y reportar el caso probable en la ficha de notificación del SIVIGILA.", esCorrecta: true },
                { letra: "B", texto: "Darle una pastilla de su propio bolso y decirle que se acueste a dormir hasta que se sienta mejor.", esCorrecta: false },
                { letra: "C", texto: "Decirle que no es nada grave y que mejor se tome una sopa caliente para que le pase el malestar rápido.", esCorrecta: false }
              ],
              explicacion: "La opción A cumple con el protocolo de atención y vigilancia epidemiológica. Las otras opciones son negligencias que ponen en riesgo la vida del paciente."
            },
            {
              texto: "¿Qué valor del servidor público se destaca al trabajar directamente con la comunidad en zonas de brote?",
              opciones: [
                { letra: "A", texto: "La Vocación de Servicio y el Compromiso con la protección de la vida y el bienestar de los ciudadanos de Bucaramanga.", esCorrecta: true },
                { letra: "B", texto: "La Vanidad, usando el uniforme de la Alcaldía para que la gente del barrio lo vea y lo respete más.", esCorrecta: false },
                { letra: "C", texto: "El Miedo, tratando de no tocar a nadie para no contagiarse de Dengue durante la visita a las casas.", esCorrecta: false }
              ],
              explicacion: "La opción A es un pilar del Código de Integridad. Las otras opciones son motivaciones o sentimientos no profesionales."
            }
          ]
        }
      ]
    },
    {
      simoId: "241205", // IPYBAC - Profesional Universitario (Veterinario)
      escenarios: [
        {
          contenido: "Usted es Médico Veterinario en el IPYBAC (Cundinamarca). Lidera una jornada de esterilización de caninos y felinos en un municipio del departamento. Durante la jornada, se enfrenta a un perro que presenta complicaciones anestésicas (paro cardiorrespiratorio) en medio de la cirugía. Usted debe aplicar de inmediato el protocolo de reanimación, asegurar el suministro de oxígeno y fármacos de emergencia, y una vez estabilizado el paciente, informar a los propietarios sobre los cuidados post-operatorios especiales.",
          categoria: "Bienestar Animal / Clínica Veterinaria", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cuál es la primera acción técnica ante un paro cardiorrespiratorio en un paciente canino bajo anestesia?",
              opciones: [
                { letra: "A", texto: "Suspender de inmediato la administración del anestésico, iniciar compresiones torácicas y asegurar una vía aérea permeable con ventilación asistida.", esCorrecta: true },
                { letra: "B", texto: "Seguir operando rápido para terminar la cirugía antes de que el perro se muera del todo en la mesa de operaciones.", esCorrecta: false },
                { letra: "C", texto: "Llamar al dueño del perro para preguntarle si quiere que intenten salvarlo o si prefiere que lo dejen así.", esCorrecta: false }
              ],
              explicacion: "La opción A es el protocolo estándar de emergencia veterinaria. Las otras opciones son negligencias graves o faltas a la ética profesional."
            },
            {
              texto: "En cuanto al programa de esterilización masiva, ¿qué objetivo de salud pública persigue el IPYBAC?",
              opciones: [
                { letra: "A", texto: "Controlar la sobrepoblación de fauna doméstica, reducir el abandono animal y prevenir enfermedades zoonóticas en Cundinamarca.", esCorrecta: true },
                { letra: "B", texto: "Lograr que todos los perros y gatos del departamento se vean iguales para que sea más fácil identificarlos.", esCorrecta: false },
                { letra: "C", texto: "Gastar el presupuesto del departamento en cirugías para que el próximo año les den más dinero en la oficina.", esCorrecta: false }
              ],
              explicacion: "La opción A identifica los fines de la política pública de bienestar animal. Las otras opciones son visiones erróneas o cínicas de la gestión estatal."
            },
            {
              texto: "¿Qué norma rige el ejercicio de la medicina veterinaria y la ética profesional en este escenario?",
              opciones: [
                { letra: "A", texto: "La Ley 576 de 2000 (Código de Ética Profesional del Médico Veterinario) y la Ley 1774 de 2016 (Contra el maltrato animal).", esCorrecta: true },
                { letra: "B", texto: "La Ley del Talión, tratando a los animales según cómo se porten ellos con los médicos en la consulta.", esCorrecta: false },
                { letra: "C", texto: "No hay leyes para veterinarios, ellos pueden hacer lo que quieran porque los animales no pueden poner quejas en la procuraduría.", esCorrecta: false }
              ],
              explicacion: "La opción A señala el marco legal vigente para la profesión y la protección animal en Colombia. Las otras opciones son falsas."
            }
          ]
        },
        {
          contenido: "Como Veterinario del IPYBAC, debe atender una denuncia de maltrato animal en una finca donde se reporta que tienen varios perros en estado de desnutrición extrema y sin refugio. Usted debe realizar la valoración técnica de bienestar (las 5 libertades animales), documentar el estado físico de los ejemplares y emitir el concepto técnico para que la autoridad policiva proceda con el rescate y el inicio del proceso sancionatorio contra el tenedor.",
          categoria: "Protección y Bienestar Animal", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cuál de las '5 libertades' se está vulnerando prioritariamente en este escenario de desnutrición?",
              opciones: [
                { letra: "A", texto: "Libre de hambre, sed y desnutrición, al no contar con una dieta adecuada que mantenga su salud y vigor.", esCorrecta: true },
                { letra: "B", texto: "Libre de aburrimiento, porque los perros no tienen juguetes para divertirse durante el día en la finca.", esCorrecta: false },
                { letra: "C", texto: "Libre de ladrar, obligando a los perros a guardar silencio absoluto para no molestar a los vecinos de la vereda.", esCorrecta: false }
              ],
              explicacion: "La opción A identifica técnicamente el pilar del bienestar animal afectado. Las otras opciones no corresponden a los estándares internacionales de bienestar."
            },
            {
              texto: "Al emitir el concepto técnico veterinario, ¿qué requisito debe cumplir para que sea válido en un proceso legal?",
              opciones: [
                { letra: "A", texto: "Ser un informe objetivo, basado en hallazgos clínicos verificables, con registro fotográfico y sustentado en los protocolos del IPYBAC.", esCorrecta: true },
                { letra: "B", texto: "Escribir un poema triste sobre el sufrimiento del perro para conmover el corazón del policía que va a hacer el rescate.", esCorrecta: false },
                { letra: "C", texto: "Firmar el papel en blanco y dejar que el policía escriba lo que él crea que pasó en la finca para no trabajar tanto.", esCorrecta: false }
              ],
              explicacion: "La opción A es el soporte técnico-jurídico necesario para la defensa de los derechos de los animales. Las otras opciones carecen de rigor profesional."
            },
            {
              texto: "¿Qué valor de la integridad pública se destaca al actuar con firmeza frente al maltrato animal?",
              opciones: [
                { letra: "A", texto: "La Justicia y la Compasión, actuando como la voz de quienes no pueden defenderse y protegiendo la vida en todas sus formas.", esCorrecta: true },
                { letra: "B", texto: "La Arrogancia, demostrando a los campesinos que usted sabe más que ellos sobre cómo cuidar un perro de finca.", esCorrecta: false },
                { letra: "C", texto: "El Rencor, tratando de que al dueño de los perros le metan la multa más grande posible solo porque le cayó mal.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la actuación profesional con los valores éticos del servicio público. Las otras opciones son sentimientos negativos no deseables."
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
