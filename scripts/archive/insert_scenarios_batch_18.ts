import { PrismaClient, TipoPregunta, NivelDificultad } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const dataToInsert: any[] = [
    {
      simoId: "241088", // BOLÍVAR - Prof. Especializado (Jurídico/Coordinación)
      escenarios: [
        {
          contenido: "Usted es Profesional Especializado en la Gobernación de Bolívar, encargado de coordinar un grupo de trabajo para la defensa judicial del departamento. Recibe una notificación sobre una acción popular que busca la protección del derecho al medio ambiente sano en un municipio costero. Usted debe coordinar la recolección de pruebas técnicas con la Secretaría de Ambiente, asesorar al Gobernador en la estrategia de defensa y asegurar que los informes para los entes de control se entreguen dentro de los términos perentorios fijados por el juez.",
          categoria: "Coordinación y Defensa Judicial", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cuál es su función técnica prioritaria al recibir la notificación de la acción popular?",
              opciones: [
                { letra: "A", texto: "Analizar la legitimación en la causa, identificar las dependencias responsables del hecho y coordinar la elaboración de la respuesta técnica y jurídica debidamente soportada.", esCorrecta: true },
                { letra: "B", texto: "Esconder la notificación en un archivo viejo para que el juez crea que la Gobernación nunca fue notificada del proceso.", esCorrecta: false },
                { letra: "C", texto: "Llamar a los líderes de la acción popular para ofrecerles dinero a cambio de que retiren la demanda contra el departamento.", esCorrecta: false }
              ],
              explicacion: "La opción A cumple con los deberes de defensa técnica y probatoria del Estado. Las otras opciones son negligencias o actos de corrupción."
            },
            {
              texto: "En cuanto a la supervisión de contratos de apoyo a la defensa judicial, ¿qué debe verificar?",
              opciones: [
                { letra: "A", texto: "El cumplimiento de las obligaciones contractuales, la idoneidad de los productos entregados y el respeto a los términos judiciales por parte de los abogados externos.", esCorrecta: true },
                { letra: "B", texto: "Que el abogado externo sea el que mejor cuente chistes durante las reuniones de coordinación del grupo de trabajo.", esCorrecta: false },
                { letra: "C", texto: "Que el contratista le invite a almorzar todos los días como agradecimiento por haberle dado el contrato de defensa judicial.", esCorrecta: false }
              ],
              explicacion: "La opción A define la labor técnica de supervisión contractual. Las otras opciones son criterios irrelevantes o corruptos."
            },
            {
              texto: "¿Qué principio rige la coordinación de grupos de trabajo para garantizar la eficiencia en la Gobernación?",
              opciones: [
                { letra: "A", texto: "El principio de Colaboración Armónica y la Coordinación, asegurando que todas las dependencias aporten a la defensa de los intereses colectivos.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'Sálvese quien pueda', donde cada oficina responde lo que quiera sin hablar con las demás dependencias.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Autoritarismo', donde el coordinador impone su voluntad sin escuchar los conceptos técnicos de sus compañeros.", esCorrecta: false }
              ],
              explicacion: "La opción A es el fundamento de la gestión pública efectiva. Las otras opciones son posturas desarticuladas o antidemocráticas."
            }
          ]
        },
        {
          contenido: "Como Profesional Especializado, debe resolver un recurso de apelación contra la decisión de un supervisor de contrato que negó el pago de un acta parcial por falta de soportes de seguridad social. El contratista afirma que el sistema de la ARL falló y no pudo generar los certificados a tiempo. Usted debe evaluar la legalidad del pago, verificar si existen otros medios probatorios del cumplimiento de las obligaciones parafiscales y proyectar la decisión respetando el principio de legalidad.",
          categoria: "Gestión Contractual y Recursos", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Puede el departamento autorizar el pago de un acta sin la verificación de los aportes a seguridad social?",
              opciones: [
                { letra: "A", texto: "No, la ley de contratación y las normas de seguridad social prohíben el pago de facturas a contratistas que no demuestren estar al día con sus obligaciones.", esCorrecta: true },
                { letra: "B", texto: "Sí, si el contratista es una persona de palabra y jura que pagará la seguridad social apenas reciba el dinero del departamento.", esCorrecta: false },
                { letra: "C", texto: "Sí, siempre y cuando el contratista prometa que no se va a enfermar ni a accidentar durante lo que queda del contrato.", esCorrecta: false }
              ],
              explicacion: "La opción A refleja la obligatoriedad legal de la verificación de aportes parafiscales. Las otras opciones son ilegales."
            },
            {
              texto: "Ante la falla del sistema de la ARL alegada, ¿qué medio probatorio alternativo podría aceptar?",
              opciones: [
                { letra: "A", texto: "La planilla de autoliquidación con el sello de pagado y el soporte de la transferencia bancaria realizada a la entidad de seguridad social.", esCorrecta: true },
                { letra: "B", texto: "Un dibujo del logotipo de la ARL hecho a mano por el contador de la empresa contratista.", esCorrecta: false },
                { letra: "C", texto: "Un correo electrónico del contratista diciendo que 'el sistema está caído' como única prueba del pago realizado.", esCorrecta: false }
              ],
              explicacion: "La opción A es un soporte financiero válido que demuestra la ejecución del pago. Las otras opciones carecen de rigor probatorio."
            },
            {
              texto: "¿Qué valor de la integridad pública se destaca al mantener la firmeza frente a presiones para realizar pagos irregulares?",
              opciones: [
                { letra: "A", texto: "La Honestidad y la Justicia, protegiendo los recursos públicos y garantizando el cumplimiento de las cargas sociales.", esCorrecta: true },
                { letra: "B", texto: "La Terquedad, no queriendo ayudar al contratista a pesar de que el sistema de la ARL falló realmente.", esCorrecta: false },
                { letra: "C", texto: "La Timidez, teniendo miedo de firmar cualquier papel para que la Contraloría no lo investigue nunca.", esCorrecta: false }
              ],
              explicacion: "La opción A es un pilar del servicio público íntegro. Las otras opciones son interpretaciones negativas de una actuación legal."
            }
          ]
        }
      ]
    },
    {
      simoId: "241798", // ATLÁNTICO - Técnico Adm. (Agropecuario)
      escenarios: [
        {
          contenido: "Usted es Técnico Administrativo en la Secretaría de Desarrollo Económico de la Gobernación del Atlántico. Debe realizar el seguimiento a un proyecto de asociatividad para pequeños productores de yuca en el sur del departamento. Nota que los productores no están asistiendo a las capacitaciones técnicas y que las herramientas entregadas no se encuentran en los centros de acopio comunitarios. Usted debe realizar la visita de campo, documentar el estado de los bienes y sensibilizar a la comunidad sobre la importancia del modelo asociativo para el éxito del proyecto.",
          categoria: "Asistencia Técnica y Asociatividad", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cuál es su acción inmediata al no encontrar las herramientas en el sitio de acopio pactado?",
              opciones: [
                { letra: "A", texto: "Levantar un acta de inspección, solicitar a los representantes de la asociación el paradero de los bienes y reportar la novedad al supervisor del contrato.", esCorrecta: true },
                { letra: "B", texto: "Comprar herramientas nuevas con su propio dinero para que el Gobernador no se entere de que se perdieron las originales.", esCorrecta: false },
                { letra: "C", texto: "Asumir que los productores se las llevaron para sus casas por seguridad y no preguntar nada para no generar conflictos.", esCorrecta: false }
              ],
              explicacion: "La opción A es la labor técnica de control y custodia de bienes financiados con recursos públicos. Las otras opciones son negligencias o encubrimientos."
            },
            {
              texto: "Para incentivar la participación en las capacitaciones, ¿qué estrategia técnica recomienda?",
              opciones: [
                { letra: "A", texto: "Ajustar los horarios a la jornada laboral de los productores, usar metodologías demostrativas en finca y vincular la capacitación con beneficios tangibles para el cultivo.", esCorrecta: true },
                { letra: "B", texto: "Amenazarlos con quitarles las tierras si no asisten a escuchar las charlas de los técnicos de la Gobernación.", esCorrecta: false },
                { letra: "C", texto: "Hacer las capacitaciones en un hotel de lujo en Barranquilla para que los campesinos se sientan importantes aunque no aprendan nada de agricultura.", esCorrecta: false }
              ],
              explicacion: "La opción A aplica principios de extensión rural y andragogía. Las otras opciones son coercitivas o ineficientes logísticamente."
            },
            {
              texto: "¿Qué valor del servicio público se destaca al trabajar hombro a hombro con los campesinos del Atlántico?",
              opciones: [
                { letra: "A", texto: "El Compromiso y la Vocación de Servicio, buscando el desarrollo rural y el bienestar de los pequeños productores.", esCorrecta: true },
                { letra: "B", texto: "La Vanidad, tomándose fotos con los campesinos solo para subirlas a sus redes sociales personales.", esCorrecta: false },
                { letra: "C", texto: "La Indiferencia, cumpliendo con el horario de visita sin interesarse realmente por si el proyecto de yuca funciona o no.", esCorrecta: false }
              ],
              explicacion: "La opción A es el fundamento ético del extensionista rural. Las otras opciones son conductas superficiales o negligentes."
            }
          ]
        },
        {
          contenido: "Como Técnico Agropecuario, debe apoyar la supervisión de un contrato para la entrega de silos de maíz a ganaderos afectados por la sequía. Identifica que el maíz entregado tiene un alto contenido de humedad, lo que puede generar la aparición de hongos (aflatoxinas) peligrosos para el ganado. Usted debe tomar muestras del silo, solicitar el análisis técnico de laboratorio y recomendar la suspensión de la entrega hasta que se garantice la calidad nutricional del insumo según la ficha técnica del contrato.",
          categoria: "Supervisión de Proyectos Agropecuarios", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Por qué es una falta técnica grave entregar silos con exceso de humedad a los ganaderos?",
              opciones: [
                { letra: "A", texto: "Porque favorece la fermentación indeseada y el crecimiento de hongos tóxicos que pueden causar enfermedades y muerte del ganado.", esCorrecta: true },
                { letra: "B", texto: "Porque el maíz húmedo pesa más y el camión de la Gobernación gasta más gasolina transportándolo hasta las fincas.", esCorrecta: false },
                { letra: "C", texto: "Porque a las vacas les gusta el maíz crocante y se ponen tristes si les dan comida húmeda para el almuerzo.", esCorrecta: false }
              ],
              explicacion: "La opción A identifica el riesgo real de inocuidad alimentaria animal. Las otras opciones son irrelevantes o absurdas."
            },
            {
              texto: "En cuanto a la supervisión contractual, ¿qué debe exigirle al contratista frente a la mala calidad detectada?",
              opciones: [
                { letra: "A", texto: "La reposición inmediata de los silos que no cumplan con el porcentaje de humedad pactado y el ajuste de los procesos de secado.", esCorrecta: true },
                { letra: "B", texto: "Que le regale una vaca a usted a cambio de que usted firme el acta de recibido a satisfacción de todo el maíz dañado.", esCorrecta: false },
                { letra: "C", texto: "Que ponga el maíz al sol durante una hora antes de entregarlo para ver si así se seca rápido mágicamente.", esCorrecta: false }
              ],
              explicacion: "La opción A es la labor legal de supervisión para asegurar el cumplimiento del objeto contractual. Las otras opciones son actos de corrupción o soluciones inútiles."
            },
            {
              texto: "¿Qué principio rige la actuación del técnico al proteger la sanidad animal del departamento?",
              opciones: [
                { letra: "A", texto: "El principio de Responsabilidad y la Eficacia, asegurando que los recursos del Estado cumplan su fin de mitigar la emergencia climática.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'Comprar lo más barato', sin importar si los animales se enferman por la mala calidad de los insumos.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Dejar de Hacer', asumiendo que el ganadero debe saber qué le da de comer a sus vacas sin que la Gobernación intervenga.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la gestión técnica con los objetivos superiores de la entidad. Las otras opciones son negligencias administrativas."
            }
          ]
        }
      ]
    },
    {
      simoId: "247446", // IBAGUÉ - Prof. Universitario (Catastro)
      escenarios: [
        {
          contenido: "Usted es Profesional Universitario en la oficina de catastro de la Alcaldía de Ibagué. Debe realizar la verificación en campo de un sector que ha pasado de ser rural a urbano debido a la construcción de un gran proyecto de vivienda. Los propietarios reclaman que el avalúo catastral es desproporcionado respecto a la realidad del sector que aún no cuenta con servicios públicos completos. Usted debe realizar la identificación predial, verificar los linderos, valorar las mejoras y proyectar el informe técnico que sustente la base gravable para el impuesto predial.",
          categoria: "Gestión Catastral", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cuál es la fuente técnica principal para determinar la zonificación física y económica de los predios?",
              opciones: [
                { letra: "A", texto: "El Plan de Ordenamiento Territorial (POT) vigente, las cartas catastrales y el estudio de zonas geoeconómicas homologadas.", esCorrecta: true },
                { letra: "B", texto: "Lo que los vecinos digan que valen sus casas basándose en los avisos de 'se vende' que ponen en las ventanas.", esCorrecta: false },
                { letra: "C", texto: "La opinión del vigilante del proyecto de vivienda sobre cuánto cree él que va a costar el metro cuadrado el próximo año.", esCorrecta: false }
              ],
              explicacion: "La opción A identifica los instrumentos técnicos legales de la gestión catastral. Las otras opciones carecen de rigor técnico."
            },
            {
              texto: "Ante el reclamo por falta de servicios públicos, ¿cómo debe reflejarse técnicamente en el avalúo?",
              opciones: [
                { letra: "A", texto: "Debe considerarse como un factor de demérito o limitación en la valoración de las características del sector dentro del estudio de zonas geoeconómicas.", esCorrecta: true },
                { letra: "B", texto: "Ignorar el reclamo porque el catastro no tiene nada que ver con los tubos del agua ni con los cables de la luz.", esCorrecta: false },
                { letra: "C", texto: "Sugerirle a los propietarios que ellos mismos instalen los servicios públicos para que sus casas valgan más dinero pronto.", esCorrecta: false }
              ],
              explicacion: "La opción A aplica criterios técnicos de valoración masiva y puntual. Las otras opciones son negligencias o consejos impertinentes."
            },
            {
              texto: "¿Qué principio rige la actualización catastral para garantizar la justicia tributaria en Ibagué?",
              opciones: [
                { letra: "A", texto: "La Equidad y la Veracidad, asegurando que cada ciudadano pague impuestos según la realidad física y económica de su propiedad.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'Recaudar lo Máximo', subiendo los avalúos a todo el mundo sin importar si la información es real o no.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Favoritismo', bajándole el avalúo a los amigos de los funcionarios de la Alcaldía.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la labor catastral con los principios constitucionales del sistema tributario. Las otras opciones son actos de injusticia o corrupción."
            }
          ]
        },
        {
          contenido: "Como Profesional de Catastro en Ibagué, debe supervisar el proceso de digitalización de la cartografía predial. Nota que existen traslapos (superposiciones) entre varios predios de una zona de expansión, lo que genera conflictos jurídicos de propiedad. Usted debe analizar las escrituras, los certificados de libertad y tradición, y los levantamientos topográficos para corregir el error cartográfico y asegurar que la base de datos catastral sea un espejo fiel de la realidad jurídica y física de los inmuebles.",
          categoria: "Cartografía y Conservación Catastral", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Qué acción técnica permite resolver un traslapo cartográfico entre dos predios?",
              opciones: [
                { letra: "A", texto: "La realización de una verificación de linderos en campo con equipos de precisión GPS y la confrontación con los títulos de propiedad debidamente registrados.", esCorrecta: true },
                { letra: "B", texto: "Borrar la línea del mapa que divide los dos predios y decir que ahora son una sola finca gigante para que no peleen más.", esCorrecta: false },
                { letra: "C", texto: "Hacer un sorteo entre los dos propietarios para ver quién se queda con el pedazo de tierra que aparece traslapado en el sistema.", esCorrecta: false }
              ],
              explicacion: "La opción A es el procedimiento técnico y legal de deslinde y amojonamiento. Las otras opciones son arbitrariedades que violan el derecho de propiedad."
            },
            {
              texto: "En cuanto a la integridad de la información, ¿por qué es vital que Catastro esté sincronizado con la Oficina de Registro de Instrumentos Públicos?",
              opciones: [
                { letra: "A", texto: "Para garantizar la seguridad jurídica del territorio, asegurando que quien figura como dueño en el papel sea quien tiene la posesión física y jurídica del predio.", esCorrecta: true },
                { letra: "B", texto: "Para que las dos entidades puedan compartir los mismos memes durante las horas de descanso de los funcionarios.", esCorrecta: false },
                { letra: "C", texto: "Para que el ciudadano tenga que ir a dos oficinas diferentes a hacer el mismo trámite y así el Estado parezca más ocupado.", esCorrecta: false }
              ],
              explicacion: "La opción A define el fin del catastro multipropósito y la seguridad jurídica. Las otras opciones son visiones absurdas o mediocres."
            },
            {
              texto: "¿Qué valor del servidor público se destaca al resolver conflictos de linderos con imparcialidad?",
              opciones: [
                { letra: "A", texto: "La Honestidad y la Rectitud, actuando bajo criterios técnicos objetivos sin favorecer a ninguna de las partes en conflicto.", esCorrecta: true },
                { letra: "B", texto: "La Arrogancia, demostrando a los campesinos que usted es el que manda sobre sus tierras porque tiene un GPS moderno.", esCorrecta: false },
                { letra: "C", texto: "La Timidez, no queriendo tomar una decisión para no quedar mal con ninguno de los dos vecinos que pelean.", esCorrecta: false }
              ],
              explicacion: "La opción A es un pilar del Código de Integridad. Las otras opciones son conductas negativas que afectan la confianza en la institución."
            }
          ]
        }
      ]
    },
    {
      simoId: "240955", // CÚCUTA - Técnico Adm. (Jurídico)
      escenarios: [
        {
          contenido: "Usted es Técnico Administrativo en la oficina de control interno disciplinario de la Alcaldía de Cúcuta. Debe apoyar la organización de los expedientes de procesos que están próximos a prescribir. Nota que varios autos de cargos no han sido notificados personalmente a los implicados porque las direcciones registradas están incompletas. Usted debe realizar la búsqueda de datos en las bases de datos institucionales, proyectar los edictos de notificación y asegurar que el archivo digital sea un reflejo exacto del físico para facilitar la labor de los abogados sustanciadores.",
          categoria: "Procedimiento Administrativo Disciplinario", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cuál es el término legal para realizar una notificación por edicto cuando no es posible la notificación personal?",
              opciones: [
                { letra: "A", texto: "Fijar el edicto en un lugar visible de la secretaría por el término de diez (10) días, según lo establecido en el Código General del Proceso y el Código Disciplinario.", esCorrecta: true },
                { letra: "B", texto: "Publicar un mensaje en el grupo de Facebook 'Gente de Cúcuta' y esperar a que el implicado le dé 'like' a la publicación.", esCorrecta: false },
                { letra: "C", texto: "Gritar el nombre del implicado en la plaza del parque Santander durante 5 minutos seguidos frente a todos los transeúntes.", esCorrecta: false }
              ],
              explicacion: "La opción A cumple con el debido proceso legal de notificación subsidiaria. Las otras opciones no tienen validez jurídica."
            },
            {
              texto: "Ante el riesgo de prescripción, ¿cuál es su labor técnica prioritaria?",
              opciones: [
                { letra: "A", texto: "Alertar inmediatamente al jefe de la oficina sobre los términos próximos a vencer y priorizar la foliación y organización de esos expedientes para su decisión rápida.", esCorrecta: true },
                { letra: "B", texto: "Cambiarle la fecha al reloj de la oficina para que parezca que todavía falta un año para que el proceso prescriba.", esCorrecta: false },
                { letra: "C", texto: "Botar el expediente a la basura para que nadie se dé cuenta de que el proceso se venció por culpa de la oficina.", esCorrecta: false }
              ],
              explicacion: "La opción A es la labor ética y técnica de apoyo administrativo para evitar la impunidad. Las otras opciones son delitos de falsedad y destrucción de documentos públicos."
            },
            {
              texto: "¿Qué principio rige la gestión de los expedientes disciplinarios para garantizar la transparencia?",
              opciones: [
                { letra: "A", texto: "La Integridad y la Responsabilidad en la custodia de la información, asegurando el respeto al debido proceso y al derecho de defensa.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'Favoritismo', ayudando a que los procesos de los amigos del Alcalde prescriban más rápido.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Oscuridad', tratando de que los expedientes estén tan desordenados que nadie pueda entender qué pasó realmente.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la labor asistencial con los fines del control disciplinario. Las otras opciones son conductas corruptas o negligentes."
            }
          ]
        },
        {
          contenido: "Como Técnico Administrativo en Cúcuta, debe atender a un funcionario que solicita copias de su propio expediente disciplinario. El funcionario está muy nervioso y trata de persuadirlo para que 'le haga el favor' de arrancar una hoja que contiene una prueba testimonial en su contra. Usted debe negarse rotundamente, explicar las consecuencias penales de la alteración de documentos públicos y realizar la entrega de las copias siguiendo el protocolo de seguridad y costos de reproducción autorizados por la Alcaldía.",
          categoria: "Ética y Custodia Documental", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Qué delito cometería el servidor público si accede a 'arrancar una hoja' de un expediente?",
              opciones: [
                { letra: "A", texto: "Falsedad material en documento público y destrucción, supresión u ocultamiento de documento público, sancionados por el Código Penal.", esCorrecta: true },
                { letra: "B", texto: "Ninguno, es solo una hoja de papel y la Alcaldía tiene muchas más hojas para imprimir copias si se necesita.", esCorrecta: false },
                { letra: "C", texto: "Un 'pecadillo' administrativo que se soluciona pidiendo disculpas al jefe de la oficina por la distracción.", esCorrecta: false }
              ],
              explicacion: "La opción A identifica las graves consecuencias penales de la alteración de archivos oficiales. Las otras opciones minimizan actos delictivos."
            },
            {
              texto: "En cuanto al derecho de acceso a las copias por parte del implicado, ¿qué restricción existe?",
              opciones: [
                { letra: "A", texto: "Ninguna, el implicado tiene derecho a acceder a todas las piezas de su proceso para ejercer su defensa, previo pago de los costos de fotocopiado.", esCorrecta: true },
                { letra: "B", texto: "Solo puede ver las hojas que no tengan pruebas en su contra para que no se ponga triste durante la lectura del expediente.", esCorrecta: false },
                { letra: "C", texto: "Debe pedirle permiso al Gobernador de Norte de Santander para que autorice el uso de la fotocopiadora de la Alcaldía.", esCorrecta: false }
              ],
              explicacion: "La opción A garantiza el derecho fundamental a la defensa y la transparencia. Las otras opciones son arbitrariedades ilegales."
            },
            {
              texto: "¿Qué valor de la integridad pública se pone a prueba ante el intento de soborno o persuasión indebida?",
              opciones: [
                { letra: "A", texto: "La Honestidad y la Rectitud, actuando con carácter frente a propuestas que vulneran la ética y la ley.", esCorrecta: true },
                { letra: "B", texto: "La Amistad, demostrando que uno es buen compañero ayudando al otro funcionario a que no lo sancionen.", esCorrecta: false },
                { letra: "C", texto: "La Astucia, cobrando un dinero extra por arrancar la hoja y no dejar rastro del acto ilegal.", esCorrecta: false }
              ],
              explicacion: "La opción A es el pilar del Código de Integridad. Las otras opciones son conductas corruptas e ilegales."
            }
          ]
        }
      ]
    },
    {
      simoId: "242617", // DIAN - Analista II (OEA/Garantías)
      escenarios: [
        {
          contenido: "Usted es Analista II en la DIAN, responsable de procesar las solicitudes de calificación como Operador Económico Autorizado (OEA) para agencias de aduanas. Al revisar los requisitos, nota que una agencia de gran trayectoria tiene su garantía global vencida y no ha actualizado la póliza de responsabilidad civil. Usted debe informar al interesado, suspender el trámite de certificación y asegurar que la documentación de respaldo cumpla con todos los términos de validez jurídica para garantizar que la agencia pueda responder por sus operaciones ante la DIAN.",
          categoria: "Garantías y Requisitos Aduaneros", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cuál es el propósito técnico de exigir una garantía global a los usuarios aduaneros?",
              opciones: [
                { letra: "A", texto: "Asegurar el pago de los tributos aduaneros, intereses y sanciones que se puedan causar por el incumplimiento de las obligaciones legales.", esCorrecta: true },
                { letra: "B", texto: "Tener un fondo de dinero ahorrado por si los funcionarios de la DIAN quieren irse de paseo a final de año.", esCorrecta: false },
                { letra: "C", texto: "Demostrar que la empresa tiene mucho dinero y que puede pagar lujos innecesarios para sus directivos.", esCorrecta: false }
              ],
              explicacion: "La opción A define el fin legal de las garantías en el comercio exterior. Las otras opciones son interpretaciones absurdas o corruptas."
            },
            {
              texto: "Ante una póliza vencida, ¿qué acción administrativa debe realizar el Analista?",
              opciones: [
                { letra: "A", texto: "Emitir un requerimiento de subsanación otorgando un plazo legal y suspender la autorización para operar hasta que la garantía sea renovada y aprobada.", esCorrecta: true },
                { letra: "B", texto: "Anotar en una servilleta que la póliza ya se va a renovar y dejar que la agencia siga operando normalmente por confianza.", esCorrecta: false },
                { letra: "C", texto: "Gritarle al representante legal de la agencia por ser tan descuidado con sus documentos oficiales.", esCorrecta: false }
              ],
              explicacion: "La opción A cumple con el debido proceso aduanero y protege los intereses del Estado. Las otras opciones son negligencias o conductas no profesionales."
            },
            {
              texto: "¿Qué principio rige la validación de requisitos para obtener la calidad de OEA?",
              opciones: [
                { letra: "A", texto: "La Seguridad y la Confianza en la cadena de suministro internacional, asegurando que solo operadores confiables obtengan beneficios de facilitación.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'Todo el que pague entra', permitiendo que cualquier empresa sea OEA sin importar sus antecedentes de seguridad.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Trámites Infinitos', tratando de que el proceso sea lo más difícil posible para que las empresas desistan.", esCorrecta: false }
              ],
              explicacion: "La opción A identifica la esencia técnica del programa OEA (Marco SAFE). Las otras opciones son contrarias al espíritu del comercio seguro y ágil."
            }
          ]
        },
        {
          contenido: "Como Analista de la DIAN, atiende a un usuario que solicita la cancelación de su registro como importador por cese de actividades. El usuario presenta la solicitud pero usted identifica que tiene procesos de cobro coactivo pendientes y deudas por impuestos de aduana de hace tres años. Usted debe explicarle que la cancelación no extingue las deudas pendientes, orientarlo sobre el proceso de paz y salvo y asegurar que el registro se mantenga activo con las anotaciones de morosidad hasta que se resuelva la situación financiera con la entidad.",
          categoria: "Gestión de Registros y Deudas", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Puede cancelarse un registro aduanero si existen deudas pendientes con la DIAN?",
              opciones: [
                { letra: "A", texto: "El registro puede suspenderse o entrar en proceso de cancelación, pero el usuario no queda liberado de sus obligaciones tributarias ni de los procesos de cobro vigentes.", esCorrecta: true },
                { letra: "B", texto: "Sí, la cancelación borra automáticamente todas las deudas del pasado como si el usuario nunca hubiera importado nada.", esCorrecta: false },
                { letra: "C", texto: "No, el usuario debe permanecer registrado por el resto de su vida hasta que la DIAN decida perdonarle la deuda por caridad.", esCorrecta: false }
              ],
              explicacion: "La opción A refleja la realidad jurídica de la responsabilidad tributaria. Las otras opciones son interpretaciones erróneas de la ley."
            },
            {
              texto: "En cuanto a la atención al usuario moroso, ¿cómo debe actuar el Analista?",
              opciones: [
                { letra: "A", texto: "Brindar información clara y precisa sobre el estado de su cuenta, los pasos para el pago y las consecuencias de mantener la morosidad en el sistema nacional.", esCorrecta: true },
                { letra: "B", texto: "Insultar al usuario y decirle que es una vergüenza para el país por no pagar sus impuestos a tiempo.", esCorrecta: false },
                { letra: "C", texto: "Aconsejarle que cambie de nombre y de número de cédula para que la DIAN no lo pueda volver a encontrar nunca.", esCorrecta: false }
              ],
              explicacion: "La opción A es la conducta profesional de servicio al contribuyente. Las otras opciones son maltrato o complicidad con la evasión."
            },
            {
              texto: "¿Qué valor del servidor público se destaca al proteger el recaudo nacional frente a solicitudes de retiro de usuarios?",
              opciones: [
                { letra: "A", texto: "La Honestidad y el Compromiso con los fines del Estado, asegurando que nadie evada sus responsabilidades legales.", esCorrecta: true },
                { letra: "B", texto: "La Avaricia, tratando de quitarle hasta el último peso a la gente que ya no quiere tener negocios.", esCorrecta: false },
                { letra: "C", texto: "La Indiferencia, tramitando la cancelación rápido para no tener que atender más a ese usuario en la ventanilla.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la actuación con los principios éticos del recaudo tributario. Las otras opciones son visiones negativas o negligentes."
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
