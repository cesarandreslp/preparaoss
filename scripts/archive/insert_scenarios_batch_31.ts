import { PrismaClient, TipoPregunta, NivelDificultad } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const dataToInsert: any[] = [
    {
      simoId: "225504", // DIAN - Inspector III (Aduanas)
      escenarios: [
        {
          contenido: "Usted es Inspector III de Aduanas en la DIAN. Durante un operativo de control posterior a una empresa importadora de licores, usted encuentra que han ingresado varios contenedores de whisky bajo la modalidad de importación temporal para perfeccionamiento activo, argumentando que le van a poner una etiqueta especial en Colombia para luego reexportarlo. Sin embargo, al revisar las bodegas, usted descubre que el whisky está siendo distribuido en bares locales sin pagar los tributos aduaneros. Usted debe iniciar la actuación administrativa correspondiente.",
          categoria: "Regímenes Aduaneros / Importación Temporal", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Qué figura jurídica aduanera se configura al encontrar mercancía ingresada temporalmente siendo comercializada en el territorio nacional?",
              opciones: [
                { letra: "A", texto: "El incumplimiento del régimen de importación temporal, lo que constituye una causal de aprehensión por encontrarse la mercancía sin el amparo de una declaración de importación ordinaria que acredite el pago de tributos.", esCorrecta: true },
                { letra: "B", texto: "Una simple infracción de etiquetado, la cual se soluciona pidiéndole a la empresa que pegue las etiquetas en los bares donde se está vendiendo el licor.", esCorrecta: false },
                { letra: "C", texto: "Un error de inventario perdonable, ya que el whisky se daña rápido y la empresa tenía que venderlo antes de que se venciera.", esCorrecta: false }
              ],
              explicacion: "La opción A identifica correctamente la violación al régimen aduanero (cambio de destinación sin pago de tributos) y la consecuencia jurídica (aprehensión)."
            },
            {
              texto: "Como Inspector III, para formalizar el hallazgo y asegurar la mercancía, ¿qué documento debe diligenciar de forma inmediata en el lugar de los hechos?",
              opciones: [
                { letra: "A", texto: "El Acta de Aprehensión, detallando las cantidades, marcas, descripción de la mercancía, los fundamentos de derecho (Estatuto Aduanero) y dejando a disposición los bienes en las bodegas autorizadas de la DIAN.", esCorrecta: true },
                { letra: "B", texto: "Un memorando interno dirigido al Director General de la DIAN pidiendo permiso para empezar a redactar el acta al día siguiente.", esCorrecta: false },
                { letra: "C", texto: "Una factura comercial para cobrarle el impuesto en efectivo a los dueños de los bares.", esCorrecta: false }
              ],
              explicacion: "La opción A describe el procedimiento operativo y legal in situ para asegurar las mercancías objeto de contrabando técnico o incumplimiento de régimen."
            },
            {
              texto: "¿Qué principio rige la rigurosidad en la fiscalización de los regímenes suspensivos de tributos (como las importaciones temporales)?",
              opciones: [
                { letra: "A", texto: "La Eficiencia en el Control y la Protección del Orden Económico, evitando que los beneficios aduaneros diseñados para fomentar la industria se utilicen como fachadas para la evasión fiscal y el contrabando.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'Dejar hacer, dejar pasar', confiando ciegamente en que las empresas siempre cumplen sus promesas de reexportación.", esCorrecta: false },
                { letra: "C", texto: "El principio de Obstaculización, asumiendo que todas las importaciones temporales son delitos y deben prohibirse.", esCorrecta: false }
              ],
              explicacion: "La opción A equilibra el propósito de facilitación del régimen temporal con la necesidad de control posterior para evitar el fraude."
            }
          ]
        },
        {
          contenido: "Como Inspector III de Aduanas, usted debe emitir un estudio técnico sobre la viabilidad de otorgar la calificación de Operador Económico Autorizado (OEA) a una gran cadena de supermercados. Al revisar el expediente de seguridad corporativa, nota que la empresa tiene excelentes protocolos físicos, pero carece de un sistema robusto de seguridad informática para proteger la trazabilidad de sus importaciones, habiendo sufrido un hackeo reciente donde se alteraron manifiestos de carga. Usted debe fundamentar su decisión.",
          categoria: "Operador Económico Autorizado / Seguridad de la Cadena de Suministro", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cuál debe ser su concepto técnico respecto a la solicitud de la empresa para ser OEA?",
              opciones: [
                { letra: "A", texto: "Emitir concepto desfavorable o requerir plan de mejora obligatorio previo a la autorización, dado que la seguridad de la tecnología de la información (TI) es un requisito habilitante e indispensable en el programa OEA para prevenir la manipulación de la cadena logística.", esCorrecta: true },
                { letra: "B", texto: "Emitir concepto favorable, porque los hackers informáticos no pueden meter drogas físicas dentro de los contenedores, así que no es un riesgo aduanero.", esCorrecta: false },
                { letra: "C", texto: "Recomendar que la empresa contrate a un influencer tecnológico para que hable bien de la seguridad del supermercado en redes sociales y así otorgarles el OEA.", esCorrecta: false }
              ],
              explicacion: "La opción A aplica los estándares internacionales del Marco SAFE (OMA) sobre seguridad de la información como pilar del OEA."
            },
            {
              texto: "¿Por qué una vulnerabilidad informática en un usuario aduanero representa un riesgo para la DIAN?",
              opciones: [
                { letra: "A", texto: "Porque permite la vulneración de los sistemas de trazabilidad documental, facilitando el 'contaminado' de la carga (narcotráfico) o la alteración de valores y cantidades (contrabando) sin dejar rastro físico inicial.", esCorrecta: true },
                { letra: "B", texto: "Porque los hackers podrían robarse el logo de la DIAN para hacer memes en internet.", esCorrecta: false },
                { letra: "C", texto: "Porque el supermercado podría usar el hackeo como excusa para no pagar la suscripción mensual del programa OEA.", esCorrecta: false }
              ],
              explicacion: "La opción A reconoce la interconexión entre la seguridad lógica y la seguridad física en la cadena de suministro internacional."
            },
            {
              texto: "¿Qué principio defiende al negar o condicionar una certificación OEA a una empresa que no cumple todos los estándares de seguridad?",
              opciones: [
                { letra: "A", texto: "El principio de Confianza Verificada y Gestión del Riesgo, asegurando que los beneficios de facilitación comercial solo se otorguen a operadores que ofrezcan garantías plenas de seguridad al Estado y a la comunidad internacional.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'Favoritismo comercial', dándole el OEA a las empresas grandes solo por su nombre.", esCorrecta: false },
                { letra: "C", texto: "El principio de Rigidez extrema, buscando que ninguna empresa colombiana pueda lograr nunca la certificación OEA.", esCorrecta: false }
              ],
              explicacion: "La opción A es el fundamento filosófico de la figura del OEA (confianza a cambio de cumplimiento estricto y demostrable)."
            }
          ]
        }
      ]
    },
    {
      simoId: "225509", // DIAN - Inspector II (Aduanas)
      escenarios: [
        {
          contenido: "Usted es Inspector II de Aduanas. Se le asigna realizar el control en zona primaria (puerto) al descargue de un buque granelero que trae 20,000 toneladas de maíz amarillo. Durante la diligencia, el sistema informático aduanero (SYGA) sufre una caída a nivel nacional (contingencia declarada). El importador, argumentando altos costos de bodegaje portuario y la necesidad de abastecer al sector avícola, le exige que autorice el levante manual de la mercancía de forma inmediata. Usted debe aplicar el procedimiento de contingencia.",
          categoria: "Procedimientos Aduaneros / Contingencia Informática", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cómo debe proceder usted como Inspector II frente a la exigencia del importador durante la contingencia informática declarada?",
              opciones: [
                { letra: "A", texto: "Aplicar el procedimiento manual de contingencia autorizado por la DIAN, recibiendo las declaraciones físicas debidamente firmadas, validando el pago de tributos en el banco y otorgando el levante manual con el compromiso de transcribir la información al sistema cuando se restablezca.", esCorrecta: true },
                { letra: "B", texto: "Negarse a hacer cualquier trámite y decirle al importador que se siente a esperar hasta que el sistema vuelva, sin importar si el maíz se pudre en el puerto.", esCorrecta: false },
                { letra: "C", texto: "Decirle al importador que se lleve el maíz sin dejar ningún papel firmado y que confía en que él pagará los impuestos la próxima semana.", esCorrecta: false }
              ],
              explicacion: "La opción A aplica correctamente los planes de continuidad de negocio y contingencia aduanera (Decreto 1165/2019) garantizando el recaudo y la facilitación."
            },
            {
              texto: "En el procedimiento manual, ¿qué validación documental es crítica e indelegable antes de estampar la firma y sello de 'Levante'?",
              opciones: [
                { letra: "A", texto: "Verificar físicamente los documentos soporte (factura, documento de transporte, vistos buenos del ICA por ser producto agrícola) y el comprobante de pago de los tributos aduaneros en la entidad financiera.", esCorrecta: true },
                { letra: "B", texto: "Revisar únicamente que la firma del representante legal esté hecha con tinta azul.", esCorrecta: false },
                { letra: "C", texto: "Verificar que el capitán del buque granelero tenga su licencia de navegación al día.", esCorrecta: false }
              ],
              explicacion: "La opción A enumera los requisitos esenciales para autorizar la nacionalización de bienes restringidos (vistos buenos) y asegurar el fisco."
            },
            {
              texto: "¿Qué principio de la función pública se garantiza al tener y aplicar un procedimiento de contingencia efectivo en las aduanas?",
              opciones: [
                { letra: "A", texto: "La Continuidad del Servicio Público y la Facilitación del Comercio, asegurando que las fallas tecnológicas del Estado no paralicen la economía nacional ni generen sobrecostos injustificados a los usuarios.", esCorrecta: true },
                { letra: "B", texto: "La Modernización forzada, obligando a los usuarios a comprar mejores computadores.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Sálvese quien pueda', donde cada puerto inventa sus propias reglas cuando se cae el sistema.", esCorrecta: false }
              ],
              explicacion: "La opción A es el fundamento constitucional de la función administrativa (Art. 209 CN) aplicado a la logística portuaria."
            }
          ]
        },
        {
          contenido: "Como Inspector II, debe proyectar una respuesta a una solicitud ciudadana (Derecho de Petición) elevada por una Asociación de Artesanos. Ellos solicitan que la DIAN les explique los requisitos para exportar sus productos (mochilas y cerámicas) a Europa y si pueden acceder a algún beneficio tributario por ser una población vulnerable. Usted debe brindar orientación técnica, clara y en lenguaje accesible.",
          categoria: "Orientación al Usuario / Facilitación del Comercio Exterior", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Qué información fundamental debe incluir en su respuesta para orientar efectivamente a los artesanos en su proceso de exportación?",
              opciones: [
                { letra: "A", texto: "Explicar el paso a paso del registro como exportador (RUT), el uso de la Ventanilla Única de Comercio Exterior (VUCE), la modalidad de exportación por tráfico postal o envíos urgentes (para pequeñas cantidades) y la emisión de certificados de origen para acceder a preferencias arancelarias en Europa.", esCorrecta: true },
                { letra: "B", texto: "Responderles que la aduana es un tema muy complicado para artesanos y que es mejor que contraten a una multinacional logística carísima.", esCorrecta: false },
                { letra: "C", texto: "Enviarles un enlace de Wikipedia sobre la historia del comercio internacional y dar por respondido el derecho de petición.", esCorrecta: false }
              ],
              explicacion: "La opción A brinda orientación integral, práctica y adaptada al perfil del usuario (Mipymes/Artesanos), cumpliendo la función de facilitación."
            },
            {
              texto: "En cuanto al lenguaje y formato de la respuesta, ¿cómo debe estructurar el documento proyectado?",
              opciones: [
                { letra: "A", texto: "Utilizar lenguaje claro, directo y pedagógico, evitando tecnicismos jurídicos innecesarios, e incluir canales de contacto institucionales para brindar acompañamiento continuo.", esCorrecta: true },
                { letra: "B", texto: "Redactar la respuesta usando exclusivamente artículos del Estatuto Aduanero en latín jurídico para demostrar superioridad intelectual.", esCorrecta: false },
                { letra: "C", texto: "Mandar una nota de voz informal por WhatsApp diciendo que pasen por la oficina cuando tengan tiempo.", esCorrecta: false }
              ],
              explicacion: "La opción A aplica la política de 'Lenguaje Claro' exigida en la administración pública moderna para garantizar el derecho a la información."
            },
            {
              texto: "¿Qué valor institucional refleja la DIAN al orientar proactivamente a pequeños productores hacia la internacionalización?",
              opciones: [
                { letra: "A", texto: "El Compromiso con el Desarrollo Económico y la Equidad, democratizando el acceso a las herramientas de comercio exterior para impulsar la competitividad de las minorías productivas.", esCorrecta: true },
                { letra: "B", texto: "El Elitismo aduanero, demostrando que solo los grandes monopolios tienen derecho a exportar en Colombia.", esCorrecta: false },
                { letra: "C", texto: "La Indiferencia, respondiendo los derechos de petición solo para evitar sanciones disciplinarias.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la misión de la DIAN con los objetivos de desarrollo socioeconómico del país."
            }
          ]
        }
      ]
    },
    {
      simoId: "225523", // DIAN - Analista I (Gestión Aduanera / Garantías)
      escenarios: [
        {
          contenido: "Usted es Analista I en la DIAN. Tiene la responsabilidad de revisar la documentación presentada por una Agencia de Aduanas para la aceptación de una 'Garantía Global' (póliza de seguros) que amparará sus operaciones por el próximo año. Al revisar los anexos, usted detecta que el objeto asegurado en la póliza no incluye explícitamente el pago de sanciones administrativas, limitándose solo al pago de tributos aduaneros. Usted debe organizar el requerimiento de subsanación.",
          categoria: "Gestión de Garantías Aduaneras", dificultad: "BASICO",
          preguntas: [
            {
              texto: "¿Por qué es un error crítico que la póliza de la Agencia de Aduanas no incluya el pago de sanciones administrativas?",
              opciones: [
                { letra: "A", texto: "Porque la normativa aduanera exige que la garantía global ampare integralmente el pago de tributos aduaneros, sanciones e intereses moratorios que se deriven del incumplimiento de sus obligaciones como usuario aduanero.", esCorrecta: true },
                { letra: "B", texto: "Porque las agencias de aduanas nunca cometen infracciones, así que la aseguradora debe poner la palabra 'sanciones' solo por decoración.", esCorrecta: false },
                { letra: "C", texto: "Porque el analista debe rechazar todas las pólizas la primera vez para demostrar que sí está trabajando.", esCorrecta: false }
              ],
              explicacion: "La opción A identifica el requisito legal del objeto asegurado según el Estatuto Aduanero para proteger al fisco."
            },
            {
              texto: "¿Cuál es la acción procedimental correcta que usted debe ejecutar frente a esta póliza defectuosa?",
              opciones: [
                { letra: "A", texto: "Proyectar un oficio de requerimiento (o auto) informando a la Agencia de Aduanas sobre la inconsistencia y otorgando el término legal para que presenten el anexo modificatorio de la aseguradora subsanando el objeto amparado.", esCorrecta: true },
                { letra: "B", texto: "Aprobar la póliza en el sistema para que la agencia no se enoje, y luego rezar para que nunca los sancionen.", esCorrecta: false },
                { letra: "C", texto: "Cancelar definitivamente la licencia de la Agencia de Aduanas de manera inmediata por presentar un documento incompleto.", esCorrecta: false }
              ],
              explicacion: "La opción A aplica el debido proceso administrativo (subsanabilidad de requisitos formales/materiales) en el trámite de garantías."
            },
            {
              texto: "¿Qué principio protege usted al verificar meticulosamente el texto de las garantías aduaneras?",
              opciones: [
                { letra: "A", texto: "La Seguridad Fiscal y la Certeza del Recaudo, garantizando que, ante un incumplimiento, el Estado tenga un respaldo financiero real, exigible y sin vacíos jurídicos.", esCorrecta: true },
                { letra: "B", texto: "El enriquecimiento de las aseguradoras, obligándolas a vender pólizas más caras.", esCorrecta: false },
                { letra: "C", texto: "La burocracia documental, pidiendo papeles simplemente para llenar los archivos de la oficina.", esCorrecta: false }
              ],
              explicacion: "La opción A es el fin último del régimen de garantías en materia aduanera (proteger el patrimonio del Estado)."
            }
          ]
        },
        {
          contenido: "Como Analista I, usted atiende presencialmente a un ciudadano que llega muy ofuscado a la oficina de la DIAN. El ciudadano argumenta que le retuvieron un paquete pequeño que compró por internet (tráfico postal) y no entiende por qué tiene que pagar impuestos si es para su uso personal. Usted debe atender al usuario, consultar el sistema y brindarle la información clara según las directrices institucionales.",
          categoria: "Atención al Usuario / Tráfico Postal", dificultad: "BASICO",
          preguntas: [
            {
              texto: "¿Cuál debe ser su actitud inicial y acción técnica para atender al ciudadano ofuscado?",
              opciones: [
                { letra: "A", texto: "Mantener la calma, escuchar activamente, solicitar el número de guía (tracking) del paquete y consultar en el sistema aduanero (SYGA/MUISCA) el estado real y la causal de retención del envío.", esCorrecta: true },
                { letra: "B", texto: "Gritarle al ciudadano que si compra por internet tiene que saber las leyes antes de venir a molestar a la DIAN.", esCorrecta: false },
                { letra: "C", texto: "Llamar a los guardias de seguridad para que saquen al ciudadano porque los funcionarios públicos no deben tolerar quejas.", esCorrecta: false }
              ],
              explicacion: "La opción A combina habilidades blandas (inteligencia emocional) con competencias técnicas (consulta de sistemas) para la atención al ciudadano."
            },
            {
              texto: "Si al consultar el sistema, usted verifica que el paquete supera el límite de valor permitido para no pagar impuestos ($200 USD), ¿cómo debe explicarle la situación?",
              opciones: [
                { letra: "A", texto: "Explicarle de manera respetuosa y sencilla que la ley colombiana establece que las compras superiores a $200 USD deben pagar IVA, y orientarlo sobre cómo realizar el pago a través del intermediario postal para liberar su paquete.", esCorrecta: true },
                { letra: "B", texto: "Decirle que le robaron el paquete en la aduana y que ya no hay nada que hacer.", esCorrecta: false },
                { letra: "C", texto: "Entregarle una copia impresa de las 800 páginas del Estatuto Aduanero y decirle que ahí está la respuesta.", esCorrecta: false }
              ],
              explicacion: "La opción A cumple con el deber de orientación clara y veraz (Ley Antitrámites) justificando la actuación administrativa."
            },
            {
              texto: "¿Qué valor ético institucional demuestra al resolver la inquietud del usuario de manera eficiente y cordial?",
              opciones: [
                { letra: "A", texto: "La Vocación de Servicio y la Transparencia, demostrando que la DIAN es una entidad de puertas abiertas que educa al ciudadano sobre sus deberes tributarios y aduaneros.", esCorrecta: true },
                { letra: "B", texto: "La Ineficiencia, porque perder tiempo hablando con la gente retrasa el verdadero trabajo de oficina.", esCorrecta: false },
                { letra: "C", texto: "El Autoritarismo, haciéndole sentir al ciudadano que el Estado siempre tiene la razón por la fuerza.", esCorrecta: false }
              ],
              explicacion: "La opción A refleja la cultura de servicio esperada en las áreas de contacto con el público en la DIAN."
            }
          ]
        }
      ]
    },
    {
      simoId: "225530", // DIAN - Inspector II (Aduanas)
      escenarios: [
        {
          contenido: "Usted es Inspector II de Aduanas. Se encuentra participando en una reunión bilateral con autoridades aduaneras de Ecuador para evaluar la implementación de un Centro Nacional de Atención en Frontera (CENAF). El objetivo es unificar los controles aduaneros, migratorios y sanitarios en un solo punto para facilitar el tránsito terrestre de mercancías. La contraparte extranjera propone que los inspectores colombianos deleguen totalmente la inspección física en los funcionarios ecuatorianos. Usted debe representar la posición institucional de la DIAN.",
          categoria: "Asuntos Internacionales y Cooperación Aduanera", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cuál es la postura institucional y legal que usted debe sostener frente a la propuesta de delegar totalmente la inspección física a la aduana extranjera?",
              opciones: [
                { letra: "A", texto: "Señalar que, aunque el CENAF busca el control integrado y la facilitación, la potestad aduanera y el control físico sobre la carga que ingresa al territorio nacional es indelegable y soberano de la DIAN, proponiendo en su lugar inspecciones conjuntas simultáneas.", esCorrecta: true },
                { letra: "B", texto: "Aceptar inmediatamente la propuesta, porque así los inspectores colombianos tendrán menos trabajo y podrán descansar más en la frontera.", esCorrecta: false },
                { letra: "C", texto: "Ofenderse por la propuesta y levantarse de la mesa de negociación, rompiendo relaciones diplomáticas con el país vecino.", esCorrecta: false }
              ],
              explicacion: "La opción A defiende el principio de Soberanía y Jurisdicción (Potestad Aduanera indelegable) proponiendo una solución técnica viable (inspección conjunta)."
            },
            {
              texto: "Para formalizar el acuerdo de operaciones conjuntas en el CENAF, ¿qué instrumento jurídico debe proyectarse o suscribirse?",
              opciones: [
                { letra: "A", texto: "Un Memorando de Entendimiento (MOU) o un Acuerdo Binacional Operativo que detalle los protocolos, flujos de información y responsabilidades de las autoridades de ambos países en la zona de control común.", esCorrecta: true },
                { letra: "B", texto: "Un contrato de arrendamiento privado entre los dos directores de aduanas.", esCorrecta: false },
                { letra: "C", texto: "Un post en las redes sociales oficiales diciendo que ahora son amigos y van a trabajar juntos.", esCorrecta: false }
              ],
              explicacion: "La opción A identifica el mecanismo del Derecho Internacional y Administrativo adecuado para coordinar autoridades transfronterizas."
            },
            {
              texto: "¿Qué principio rige la participación de la DIAN en estas instancias de cooperación internacional fronteriza?",
              opciones: [
                { letra: "A", texto: "La Integración Fronteriza y la Facilitación del Comercio, buscando armonizar procedimientos para reducir tiempos y costos logísticos sin sacrificar el control aduanero y la seguridad nacional.", esCorrecta: true },
                { letra: "B", texto: "La Competencia desleal, intentando sabotear los puertos del país vecino para que toda la carga pase por Colombia.", esCorrecta: false },
                { letra: "C", texto: "El Aislamiento absoluto, construyendo muros para que no pase ni una sola caja legal o ilegal.", esCorrecta: false }
              ],
              explicacion: "La opción A refleja el mandato constitucional de integración latinoamericana y las directrices de la OMA en gestión coordinada de fronteras."
            }
          ]
        },
        {
          contenido: "Como Inspector II de Aduanas, usted lidera un equipo que realiza auditorías de control posterior a la valoración aduanera. Al analizar el comportamiento de un importador de calzado asiático, usted advierte mediante minería de datos que el precio declarado por el importador (USD $1 por par) es irrisoriamente bajo comparado con los precios de referencia internacionales de la base de datos de la DIAN (USD $8 por par). Usted debe estructurar el requerimiento para investigar posible subfacturación.",
          categoria: "Control Posterior / Valoración Aduanera", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cuál es el primer paso procedimental para cuestionar el valor en aduana declarado por este importador?",
              opciones: [
                { letra: "A", texto: "Expedir un Requerimiento Ordinario de Información solicitando al importador los documentos comerciales, contables y bancarios (giros al exterior) que demuestren que el precio declarado fue el precio realmente pagado o por pagar.", esCorrecta: true },
                { letra: "B", texto: "Ir a la tienda del importador y decomisar todos los zapatos porque son muy baratos.", esCorrecta: false },
                { letra: "C", texto: "Cambiar el valor en el sistema de forma arbitraria a USD $15 sin avisarle al usuario para cobrarle más impuestos.", esCorrecta: false }
              ],
              explicacion: "La opción A respeta el debido proceso (Acuerdo de Valoración OMC) permitiendo al importador demostrar la veracidad de su transacción antes de rechazar el valor."
            },
            {
              texto: "Si el importador no responde al requerimiento o los giros bancarios demuestran que pagó USD $8 a través de un paraíso fiscal (pago indirecto), ¿qué acción debe tomar usted?",
              opciones: [
                { letra: "A", texto: "Rechazar el método de 'Valor de Transacción', aplicar los métodos secundarios de valoración en estricto orden jerárquico, y proyectar la Liquidación Oficial de Corrección con la respectiva sanción por inexactitud.", esCorrecta: true },
                { letra: "B", texto: "Perdonarle la deuda porque descubrió un método muy inteligente para evadir impuestos usando paraísos fiscales.", esCorrecta: false },
                { letra: "C", texto: "Llamar a la embajada del país asiático para que regañen a la fábrica que vendió los zapatos.", esCorrecta: false }
              ],
              explicacion: "La opción A describe la aplicación técnica, jurídica y secuencial de la normativa de valoración aduanera frente a la comprobación de un fraude documentado."
            },
            {
              texto: "¿Qué principio de la función tributaria y aduanera defiende la DIAN al combatir la subfacturación?",
              opciones: [
                { letra: "A", texto: "La Equidad, la Protección de la Industria Nacional y el correcto recaudo, evitando que importadores deshonestos compitan deslealmente con precios artificiales y evadan sus obligaciones fiscales.", esCorrecta: true },
                { letra: "B", texto: "El Fomento de la piratería, asegurando que los ciudadanos compren productos muy baratos sin importar si son de contrabando.", esCorrecta: false },
                { letra: "C", texto: "La Inquisición fiscal, buscando arruinar a las empresas importadoras para que el Estado se quede con su dinero.", esCorrecta: false }
              ],
              explicacion: "La opción A justifica el impacto macroeconómico y social de la gestión aduanera (lealtad comercial y financiamiento del Estado)."
            }
          ]
        }
      ]
    },
    {
      simoId: "225532", // DIAN - Gestor IV (Aduanas - Garantías y OEA)
      escenarios: [
        {
          contenido: "Usted es Gestor IV de Aduanas en la DIAN. Ejerce funciones de monitoreo y control a nivel nacional sobre las garantías constituidas por Usuarios Aduaneros Permanentes (UAP) y Agencias de Aduanas. Usted detecta en el sistema que más de 50 garantías globales de alto riesgo están a punto de vencerse en los próximos 15 días y los usuarios no han presentado las renovaciones. La caducidad de estas pólizas dejaría a la DIAN sin respaldo frente a millonarias obligaciones diferidas. Usted debe diseñar e implementar una acción de choque inmediata.",
          categoria: "Control de Obligaciones Aduaneras / Garantías", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cuál es la estrategia gerencial y operativa más efectiva para mitigar este riesgo inminente de desprotección fiscal?",
              opciones: [
                { letra: "A", texto: "Emitir alertas masivas urgentes a los usuarios, ordenar el bloqueo preventivo en el sistema informático aduanero (SYGA) para impedir nuevas operaciones a quienes no renueven a tiempo, y notificar a las Direcciones Seccionales para el control en puertos.", esCorrecta: true },
                { letra: "B", texto: "Esperar a que se venzan las pólizas para poder cobrar multas más altas y así mejorar las estadísticas de sanciones de su área.", esCorrecta: false },
                { letra: "C", texto: "Llamar a las aseguradoras para pedirles el favor de que extiendan la cobertura gratis por un mes más mientras los usuarios hacen el trámite.", esCorrecta: false }
              ],
              explicacion: "La opción A aplica el control preventivo, el uso de sistemas de información para el bloqueo automático (medida cautelar) y la articulación nacional."
            },
            {
              texto: "Si un usuario aduanero deja vencer su garantía global sin presentar la renovación, ¿cuál es la consecuencia jurídica inmediata sobre su calidad autorizada?",
              opciones: [
                { letra: "A", texto: "La pérdida automática de la autorización o habilitación para operar como usuario aduanero especial o agencia de aduanas, debido a la pérdida de un requisito habilitante esencial (el respaldo patrimonial).", esCorrecta: true },
                { letra: "B", texto: "Se le hace un descuento en la próxima renovación por ser cliente antiguo de la aduana.", esCorrecta: false },
                { letra: "C", texto: "No pasa nada grave, solo se le prohíbe usar la cafetería de la DIAN cuando vaya a hacer trámites.", esCorrecta: false }
              ],
              explicacion: "La opción A es la consecuencia taxativa establecida en la normativa aduanera vigente (Estatuto Aduanero) ante la falta de garantía."
            },
            {
              texto: "¿Qué principio de la administración de riesgos rige la actuación de monitoreo preventivo de garantías?",
              opciones: [
                { letra: "A", texto: "La Proactividad y la Salvaguarda del Patrimonio Estatal, anticipándose a la materialización del riesgo operativo (vencimiento) para evitar la desprotección del fisco nacional.", esCorrecta: true },
                { letra: "B", texto: "La Pasividad, actuando solo cuando el área jurídica ordene cobrar una deuda y descubran que no hay póliza.", esCorrecta: false },
                { letra: "C", texto: "La Indolencia administrativa, pensando que si el usuario pierde su licencia es solo su problema y no afecta al Estado.", esCorrecta: false }
              ],
              explicacion: "La opción A refleja el nivel de responsabilidad proactiva de un 'Gestor IV' en el cuidado de los intereses superiores del Estado."
            }
          ]
        },
        {
          contenido: "Como Gestor IV, usted coordina el comité de revalidación de la categoría de Operador Económico Autorizado (OEA) a nivel nacional. Una de las empresas de transporte más grandes del país, certificada como OEA, ha estado involucrada recientemente en tres eventos de hallazgos de narcóticos en sus camiones. La empresa alega que son 'víctimas de bandas criminales' y que no deben perder la categoría. Usted debe evaluar la situación objetivamente según la normativa aduanera.",
          categoria: "Operador Económico Autorizado / Cancelación y Sanciones", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Bajo qué criterio técnico y jurídico debe el comité abordar los incidentes recurrentes de contaminación de carga de este OEA?",
              opciones: [
                { letra: "A", texto: "Evaluar la eficacia del sistema de gestión de riesgo de la empresa. La recurrencia evidencia una falla sistemática en sus controles de seguridad (incumplimiento de requisitos), lo que es causal para iniciar el proceso de suspensión o cancelación de la autorización.", esCorrecta: true },
                { letra: "B", texto: "Creerle ciegamente a la empresa porque son famosos, y considerar que los hallazgos de narcóticos son normales en el transporte terrestre.", esCorrecta: false },
                { letra: "C", texto: "Darle a la empresa una medalla por haber encontrado la droga, sin importar que sus propios controles fallaron repetidamente.", esCorrecta: false }
              ],
              explicacion: "La opción A se enfoca en el núcleo del OEA: la responsabilidad del operador de mantener una cadena de suministro segura. Falla sistemática implica pérdida de confianza."
            },
            {
              texto: "En el procedimiento para determinar la suspensión o cancelación del OEA, ¿qué derecho fundamental debe garantizársele a la empresa de transporte?",
              opciones: [
                { letra: "A", texto: "El Derecho al Debido Proceso y a la Defensa, permitiéndoles presentar descargos, aportar pruebas de que sus protocolos funcionaron y demostrar qué medidas correctivas inmediatas tomaron tras los incidentes.", esCorrecta: true },
                { letra: "B", texto: "El derecho a pagar una multa en secreto para que el caso no salga en las noticias y mantener su categoría OEA.", esCorrecta: false },
                { letra: "C", texto: "Ningún derecho, porque la sospecha de narcotráfico elimina automáticamente la presunción de inocencia administrativa.", esCorrecta: false }
              ],
              explicacion: "La opción A garantiza la legalidad de la actuación administrativa (Art 29 CN) frente a decisiones sancionatorias graves como la cancelación de un estatus."
            },
            {
              texto: "¿Qué principio rector del programa OEA se defiende al ser riguroso con los incumplimientos de seguridad?",
              opciones: [
                { letra: "A", texto: "La Confiabilidad Mutua y la Seguridad Nacional, demostrando que la DIAN mantiene altos estándares y que la certificación OEA no es una patente de corso (impunidad) para descuidar el control logístico.", esCorrecta: true },
                { letra: "B", texto: "La Impunidad corporativa, demostrando que las grandes empresas son intocables para el Estado.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Persecución injusta', asumiendo que la aduana quiere quebrar a las empresas de transporte colombianas.", esCorrecta: false }
              ],
              explicacion: "La opción A mantiene el prestigio nacional e internacional del programa OEA ante los Acuerdos de Reconocimiento Mutuo (ARM) con otros países."
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
