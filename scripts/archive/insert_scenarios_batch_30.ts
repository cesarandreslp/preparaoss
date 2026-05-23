import { PrismaClient, TipoPregunta, NivelDificultad } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const dataToInsert: any[] = [
    {
      simoId: "225446", // DIAN - Inspector I (Fiscalización y Liquidación)
      escenarios: [
        {
          contenido: "Usted es Inspector I en la DIAN. Durante el desarrollo de una investigación a una empresa comercializadora por presunto contrabando técnico, le es asignada la tarea de efectuar el análisis preliminar de las declaraciones de importación y facturas de venta. Usted detecta que hay una diferencia sustancial entre los precios declarados en aduana y los precios de venta al público en el mercado nacional. Debe preparar la información, realizar la práctica de pruebas y proferir el acto administrativo preparatorio para continuar la investigación.",
          categoria: "Fiscalización / Contrabando Técnico", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Qué prueba documental inicial debe solicitar para verificar la veracidad de los valores declarados en aduana?",
              opciones: [
                { letra: "A", texto: "Requerir los giros internacionales al exterior canalizados a través del mercado cambiario y la contabilidad interna de la empresa para cruzarlos con el valor en aduana declarado.", esCorrecta: true },
                { letra: "B", texto: "Solicitarle al comerciante que firme un pagaré en blanco por si acaso se descubre que sí evadió impuestos.", esCorrecta: false },
                { letra: "C", texto: "Ir a las tiendas del centro comercial, comprar los productos y guardar las tirillas como única prueba del fraude aduanero.", esCorrecta: false }
              ],
              explicacion: "La opción A permite trazar el flujo de dinero real pagado al proveedor en el exterior, que es la prueba principal de subfacturación. Las otras opciones son antitécnicas."
            },
            {
              texto: "Al estructurar el acto administrativo preparatorio (ej. Requerimiento Especial Aduanero), ¿qué debe garantizar en su redacción?",
              opciones: [
                { letra: "A", texto: "La descripción clara, detallada y motivada de los hechos investigados, las normas presuntamente infringidas y la liquidación propuesta, garantizando el derecho de defensa y contradicción.", esCorrecta: true },
                { letra: "B", texto: "Usar términos ambiguos y generales para que el contribuyente no sepa exactamente de qué se le acusa y no se pueda defender bien.", esCorrecta: false },
                { letra: "C", texto: "Amenazar con cárcel al representante legal en el primer párrafo del requerimiento para que pague rápido.", esCorrecta: false }
              ],
              explicacion: "La opción A respeta el debido proceso consagrado en la Constitución y el Estatuto Aduanero. Las otras opciones generan nulidad por violación del derecho de defensa."
            },
            {
              texto: "¿Qué principio rige su labor al analizar objetivamente las pruebas aportadas por el investigado?",
              opciones: [
                { letra: "A", texto: "El principio de Imparcialidad y la Búsqueda de la Verdad Material, valorando tanto las pruebas que perjudican como las que favorecen al contribuyente.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'Presunción de Culpabilidad', rechazando cualquier prueba que entregue el comerciante porque todos mienten.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Amistad', aceptando cualquier papel que presente el contribuyente si es amable con los funcionarios de la DIAN.", esCorrecta: false }
              ],
              explicacion: "La opción A describe el deber probatorio de la administración pública (Sana Crítica). Las otras actitudes son sesgadas o corruptas."
            }
          ]
        },
        {
          contenido: "Como Inspector I de la DIAN, usted apoya un equipo que realiza visitas de control a casas de cambio de divisas en zona de frontera. Su función es verificar el cumplimiento de las obligaciones cambiarias (identificación de clientes, topes transaccionales) y apoyar el reporte de operaciones sospechosas (ROS). Durante una visita, encuentra que la casa de cambio no tiene los registros de identificación de varios clientes que compraron grandes sumas de dólares.",
          categoria: "Control Cambiario / Lavado de Activos", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "Ante el hallazgo de falta de identificación de clientes (incumplimiento del SIPLAFT/SAGRILAFT), ¿qué actuación debe realizar en el lugar de los hechos?",
              opciones: [
                { letra: "A", texto: "Dejar constancia expresa en el acta de visita de control de las operaciones no documentadas, recaudar las copias de los recibos incompletos y escalar el hallazgo para iniciar la investigación sancionatoria.", esCorrecta: true },
                { letra: "B", texto: "Cerrar la casa de cambio inmediatamente y llevarse todo el dinero en efectivo en bolsas de basura hacia las oficinas de la DIAN.", esCorrecta: false },
                { letra: "C", texto: "Decirle al dueño que llene los datos con nombres inventados rápido antes de que se acabe la visita para que no lo multen.", esCorrecta: false }
              ],
              explicacion: "La opción A documenta la infracción cambiaria de manera legal y técnica para el pliego de cargos. Las otras opciones son delitos (abuso de autoridad, falsedad)."
            },
            {
              texto: "Si usted percibe que estas operaciones sin identificar podrían estar vinculadas al lavado de activos de grupos ilegales de la región, ¿cuál es su deber legal?",
              opciones: [
                { letra: "A", texto: "Elaborar un informe confidencial detallado para que, a través de los canales institucionales de la DIAN, se genere el Reporte de Operación Sospechosa (ROS) a la UIAF.", esCorrecta: true },
                { letra: "B", texto: "Llamar a la emisora de radio local para denunciar públicamente a la casa de cambio.", esCorrecta: false },
                { letra: "C", texto: "Hacerse el desentendido porque investigar grupos ilegales es peligroso y eso le toca a la policía.", esCorrecta: false }
              ],
              explicacion: "La opción A cumple con el deber legal de reporte de la autoridad cambiaria (UIAF). Las otras opciones violan la reserva legal o incurren en omisión."
            },
            {
              texto: "¿Qué valor de la integridad pública le permite actuar con firmeza frente a estas casas de cambio, a pesar de las presiones de la zona de frontera?",
              opciones: [
                { letra: "A", texto: "La Rectitud y la Valentía, cumpliendo su deber funcional sin dejarse intimidar o sobornar por actores económicos que operan al margen de la ley.", esCorrecta: true },
                { letra: "B", texto: "El Ocultamiento, trabajando siempre escondido en la oficina para no tener que salir a la calle a hacer visitas.", esCorrecta: false },
                { letra: "C", texto: "La Indiferencia, pensando que de todas formas en la frontera siempre va a haber contrabando y no vale la pena esforzarse.", esCorrecta: false }
              ],
              explicacion: "La opción A refleja el perfil idóneo de un inspector fiscal. Las otras opciones son incompatibles con el servicio público."
            }
          ]
        }
      ]
    },
    {
      simoId: "225447", // DIAN - Gestor IV (Fiscalización y Liquidación)
      escenarios: [
        {
          contenido: "Usted es Gestor IV en la DIAN. Tiene la responsabilidad de preparar los asuntos que serán llevados al comité directivo del proceso de fiscalización. Uno de los temas es un programa nacional de control a empresas del sector tecnológico que están declarando operaciones exentas de IVA de manera cuestionable. Usted debe hacer la precrítica de los insumos, organizar la información y presentar una propuesta metodológica sólida al nivel directivo para decidir el inicio de las acciones de control.",
          categoria: "Planeación Estratégica / Programas de Control", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Qué elementos técnicos debe incluir su propuesta metodológica para que el nivel directivo apruebe el inicio del programa de fiscalización?",
              opciones: [
                { letra: "A", texto: "El análisis del comportamiento sectorial, la estimación del riesgo fiscal (cuantía presuntamente evadida), la normatividad presuntamente vulnerada y la matriz de recursos humanos y tecnológicos necesarios para el operativo.", esCorrecta: true },
                { letra: "B", texto: "Un listado de nombres de las tres empresas tecnológicas más famosas del país, sugiriendo auditarlas porque tienen mucho dinero para pagar multas.", esCorrecta: false },
                { letra: "C", texto: "Una presentación de PowerPoint con muchos colores pero sin datos estadísticos, apelando a la intuición de los directivos.", esCorrecta: false }
              ],
              explicacion: "La opción A consolida la información técnica requerida para la toma de decisiones gerenciales basadas en riesgo fiscal. Las otras carecen del rigor analítico exigido a un Gestor IV."
            },
            {
              texto: "Durante la precrítica de insumos, descubre que algunas empresas justifican sus exenciones en un concepto emitido por otra división de la DIAN hace varios años. ¿Cómo debe manejar esta información en el comité?",
              opciones: [
                { letra: "A", texto: "Exponer el hallazgo transparentemente y proponer que, antes de iniciar la fiscalización, se eleve una consulta a la Subdirección Jurídica para unificar el criterio doctrinario vigente sobre esas exenciones.", esCorrecta: true },
                { letra: "B", texto: "Ocultar el concepto antiguo para que los directivos aprueben la investigación, ya que si se enteran, se podría caer el programa de control.", esCorrecta: false },
                { letra: "C", texto: "Ignorar el concepto de la otra división porque solo importa lo que opine el área de fiscalización.", esCorrecta: false }
              ],
              explicacion: "La opción A protege a la entidad del riesgo jurídico y el daño antijurídico por fallos en contra. Las otras opciones son desleales con la entidad y generan pleitos perdidos."
            },
            {
              texto: "¿Qué principio rige la presentación objetiva de la información ante el nivel directivo?",
              opciones: [
                { letra: "A", texto: "La Veracidad y la Transparencia, suministrando datos completos, verificables y no sesgados para garantizar decisiones acertadas en la política de control.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'Adulación', mostrando solo los datos que los jefes quieren escuchar para asegurar ascensos laborales.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Alarma innecesaria', exagerando las cifras de evasión para que el proyecto parezca más importante de lo que es.", esCorrecta: false }
              ],
              explicacion: "La opción A es el fundamento ético de la asesoría y gestión directiva. Las otras son manipulaciones de la información pública."
            }
          ]
        },
        {
          contenido: "Como Gestor IV, usted lidera el análisis preliminar de un caso de fraude tributario internacional. Se sospecha que una multinacional está utilizando precios de transferencia artificiales (refacturación) con empresas vinculadas en paraísos fiscales para erosionar la base gravable en Colombia. Usted debe organizar la información, solicitar el cruce de pruebas internacionales y orientar la expedición de los actos preparatorios.",
          categoria: "Fiscalidad Internacional / Precios de Transferencia", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cuál es la herramienta legal idónea para recaudar pruebas formales sobre las operaciones de la multinacional en el paraíso fiscal?",
              opciones: [
                { letra: "A", texto: "La solicitud de intercambio de información tributaria a través de los Acuerdos Bilaterales (CDI) o Multilaterales vigentes, canalizada por la dependencia competente de la DIAN.", esCorrecta: true },
                { letra: "B", texto: "Mandar un correo electrónico desde su cuenta personal de Gmail al Ministerio de Hacienda del paraíso fiscal pidiéndole los libros contables.", esCorrecta: false },
                { letra: "C", texto: "Buscar en Wikipedia cuánto ganan las multinacionales y usar esa cifra para liquidar el impuesto en Colombia.", esCorrecta: false }
              ],
              explicacion: "La opción A es el mecanismo establecido en el derecho tributario internacional. Las otras opciones son informales, inválidas e ineficaces."
            },
            {
              texto: "Al proyectar el acto preparatorio (Requerimiento Especial) por manipulación de precios de transferencia, ¿qué análisis económico debe estar soportado?",
              opciones: [
                { letra: "A", texto: "La aplicación estricta de uno de los métodos reconocidos por la OCDE (ej. Precio Comparable No Controlado, Márgenes Transaccionales) que demuestre que la operación no cumplió el principio de plena competencia (Arm's Length).", esCorrecta: true },
                { letra: "B", texto: "Un análisis subjetivo de que la empresa 'gana demasiada plata' y por lo tanto tiene que dejar más impuestos en Colombia.", esCorrecta: false },
                { letra: "C", texto: "La simple afirmación de que operar con un paraíso fiscal es delito, sin necesidad de probar el sobrecosto real de los productos.", esCorrecta: false }
              ],
              explicacion: "La opción A describe el estándar probatorio exigido por el Régimen de Precios de Transferencia (Art 260-1 ET y ss). Las otras opciones carecen de sustento técnico-legal."
            },
            {
              texto: "¿Qué valor institucional es crítico al manejar expedientes que involucran a conglomerados económicos multinacionales con gran poder de lobby?",
              opciones: [
                { letra: "A", texto: "La Integridad y la Independencia, aplicando la ley tributaria de manera estricta y sin ceder a presiones, influencias o favores de firmas auditoras internacionales.", esCorrecta: true },
                { letra: "B", texto: "La Sumisión, porque si la DIAN multa a una multinacional grande, se van del país y se pierde inversión extranjera.", esCorrecta: false },
                { letra: "C", texto: "La Ambición, filtrando información del caso a la competencia de la multinacional para ganar dinero por debajo de la mesa.", esCorrecta: false }
              ],
              explicacion: "La opción A garantiza la soberanía fiscal del Estado. Las otras actitudes son cobardes o corruptas."
            }
          ]
        }
      ]
    },
    {
      simoId: "225449", // DIAN - Gestor III (Fiscalización y Liquidación)
      escenarios: [
        {
          contenido: "Usted es Gestor III en la DIAN. Tiene la responsabilidad de analizar las denuncias recibidas por el canal virtual institucional contra empresas que se niegan a expedir factura electrónica, entregando solo 'pre-cuentas' o tirillas de control interno. Usted debe hacer la precrítica de las quejas, organizar un operativo relámpago con su equipo de inspectores y proyectar los actos administrativos de cierre de establecimientos si se comprueba la reincidencia.",
          categoria: "Control de Facturación / Sanciones", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Qué requisito procedimental es indispensable antes de proferir una resolución de clausura del establecimiento (sello de la DIAN)?",
              opciones: [
                { letra: "A", texto: "Haber proferido previamente el pliego de cargos por no facturar o facturar sin requisitos, haber garantizado el término legal para los descargos del contribuyente y haber emitido la resolución sanción debidamente notificada y ejecutoriada.", esCorrecta: true },
                { letra: "B", texto: "Llegar con los sellos de clausura directamente el día de la primera visita de control para causar impacto mediático en la ciudad.", esCorrecta: false },
                { letra: "C", texto: "Pedirle permiso al Alcalde del municipio para poder cerrar los locales comerciales sin problemas políticos.", esCorrecta: false }
              ],
              explicacion: "La opción A describe el debido proceso sancionatorio tributario (Art 657 ET). Cerrar sin acto ejecutoriado es vía de hecho (opción B)."
            },
            {
              texto: "Al realizar la precrítica de las denuncias por no facturación electrónica, ¿qué evidencia aportada por el ciudadano es la más contundente para abrir el proceso?",
              opciones: [
                { letra: "A", texto: "La copia física o fotográfica de la 'pre-cuenta' o 'comanda' entregada por el establecimiento tras realizar el pago, acompañada de la información de ubicación del local.", esCorrecta: true },
                { letra: "B", texto: "Un mensaje de voz del ciudadano diciendo que fue a un restaurante y sintió que le cobraron muy caro.", esCorrecta: false },
                { letra: "C", texto: "Un pantallazo del menú del restaurante en internet sin ninguna prueba de transacción comercial.", esCorrecta: false }
              ],
              explicacion: "La opción A aporta el elemento material probatorio del hecho económico no facturado con requisitos de ley. Las otras opciones no prueban transacción alguna."
            },
            {
              texto: "¿Qué principio tributario rige la exigencia del cumplimiento de la facturación electrónica?",
              opciones: [
                { letra: "A", texto: "El principio de Legalidad y Control, garantizando la trazabilidad de las operaciones económicas en tiempo real para combatir la evasión del IVA y Renta.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'Papeleo excesivo', buscando que los comerciantes gasten dinero contratando proveedores de software para mover la economía.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Persecución a pequeños negocios', enfocándose solo en las tiendas de barrio y dejando a las grandes superficies sin control.", esCorrecta: false }
              ],
              explicacion: "La opción A sustenta la modernización de la administración tributaria. Las otras opciones son mitos o sesgos anti-Estado."
            }
          ]
        },
        {
          contenido: "Como Gestor III, usted debe presentar al nivel directivo de la Dirección Seccional un balance sobre la ejecución de los programas de control de devoluciones de saldos a favor en IVA. Usted ha descubierto que una red de contadores está creando empresas fachada que declaran grandes compras (con IVA descontable) pero cero ventas, para solicitar devoluciones fraudulentas a la DIAN. Usted debe organizar la información y proponer acciones penales y de liquidación.",
          categoria: "Fiscalización / Fraude en Devoluciones", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Qué cruce de información es clave para demostrar la falsedad de los saldos a favor (empresas fachada)?",
              opciones: [
                { letra: "A", texto: "Verificar la inexistencia material de los supuestos proveedores (empresas de papel sin empleados, sede física ni capacidad operativa) y el cruce de medios magnéticos para detectar facturación simulada.", esCorrecta: true },
                { letra: "B", texto: "Revisar únicamente que las facturas tengan buena ortografía y estén impresas a color, asumiendo que si se ven bien, son verdaderas.", esCorrecta: false },
                { letra: "C", texto: "Llamar a los contadores que firman las declaraciones y preguntarles si están haciendo trampa, confiando en su palabra.", esCorrecta: false }
              ],
              explicacion: "La opción A utiliza las técnicas de auditoría forense para desvirtuar la realidad económica (proveedores ficticios, Art 671 ET). Las otras son actuaciones ingenuas."
            },
            {
              texto: "Frente a los hallazgos comprobados de devoluciones fraudulentas consumadas o en grado de tentativa, ¿qué actos administrativos e interinstitucionales debe proferir?",
              opciones: [
                { letra: "A", texto: "Proferir el rechazo definitivo de la devolución, imponer la sanción por improcedencia (devolución improcedente) y trasladar copias penales a la Fiscalía General de la Nación por fraude procesal y falsedad.", esCorrecta: true },
                { letra: "B", texto: "Hacerles devolver la plata suavemente, sin multas ni Fiscalía, para no dañarles la hoja de vida a los contadores implicados.", esCorrecta: false },
                { letra: "C", texto: "Suspender las devoluciones a todas las empresas de la ciudad, buenas y malas, por culpa de esta red de fraude.", esCorrecta: false }
              ],
              explicacion: "La opción A aplica el marco sancionatorio tributario y el deber de denuncia penal obligatorio. Las otras son conductas prevaricadoras o desproporcionadas."
            },
            {
              texto: "¿Qué principio de la función pública se defiende al perseguir agresivamente a los carteles de devoluciones fraudulentas?",
              opciones: [
                { letra: "A", texto: "La Defensa del Patrimonio Público, ya que el fraude en devoluciones no solo es no pagar impuestos, sino robar activamente dinero de la Nación destinado a inversión social.", esCorrecta: true },
                { letra: "B", texto: "El Egoísmo institucional, porque la DIAN no quiere compartir su presupuesto con los ciudadanos creativos.", esCorrecta: false },
                { letra: "C", texto: "La Inquisición fiscal, asumiendo que el Estado debe castigar severamente cualquier intento de planeación tributaria, sea legal o ilegal.", esCorrecta: false }
              ],
              explicacion: "La opción A evidencia la gravedad material del fraude en devoluciones. Las otras son afirmaciones sin sentido ético ni legal."
            }
          ]
        }
      ]
    },
    {
      simoId: "225453", // DIAN - Gestor III (Fiscalización y Liquidación - Mismas competencias)
      escenarios: [
        {
          contenido: "Usted es Gestor III en la DIAN. Durante la evaluación de un programa de control de ingresos a grandes contribuyentes del sector constructor, nota que sus inspectores están rechazando costos y deducciones basándose únicamente en sospechas informales, sin solicitar la contabilidad ni aplicar la técnica probatoria. Esto ha provocado que el 80% de los requerimientos especiales proferidos se caigan en la respuesta del contribuyente. Usted debe intervenir, retroalimentar a los equipos y corregir el curso del programa.",
          categoria: "Supervisión de Fiscalización y Técnica Probatoria", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Qué lineamiento técnico debe impartir inmediatamente a los inspectores sobre el rechazo de costos y deducciones?",
              opciones: [
                { letra: "A", texto: "Que cualquier rechazo debe estar sustentado en pruebas directas de inexistencia, falta de causalidad, necesidad, proporcionalidad o incumplimiento de requisitos de bancarización y facturación (Art 107 y 771-2 ET).", esCorrecta: true },
                { letra: "B", texto: "Que sigan rechazando costos basándose en corazonadas porque en la fase de liquidación de pronto el contribuyente no se defiende y paga el impuesto.", esCorrecta: false },
                { letra: "C", texto: "Que aprueben todos los costos que pidan las constructoras para evitar el trabajo de leer respuestas largas a los requerimientos especiales.", esCorrecta: false }
              ],
              explicacion: "La opción A detalla la base técnico-jurídica para desconocer expensas. Las otras opciones son prácticas antitécnicas que generan desgaste administrativo y posibles demandas de nulidad."
            },
            {
              texto: "Para evitar que se sigan emitiendo actos preparatorios deficientes, ¿qué control procedimental debe implementar en el proceso de fiscalización de su jurisdicción?",
              opciones: [
                { letra: "A", texto: "Establecer filtros de revisión jurídica y técnica obligatoria previos a la notificación de los requerimientos especiales, asegurando que cada glosa (rechazo) tenga su soporte probatorio en el expediente.", esCorrecta: true },
                { letra: "B", texto: "Prohibirle a los contribuyentes que contraten abogados para responder los requerimientos de la DIAN, y así asegurar que los actos queden en firme.", esCorrecta: false },
                { letra: "C", texto: "Esconder las respuestas de los contribuyentes en el archivo para poder proferir la Liquidación Oficial sin modificaciones.", esCorrecta: false }
              ],
              explicacion: "La opción A representa una gestión de calidad y mitigación del riesgo antijurídico. Las opciones B y C violan el derecho de defensa y constituyen faltas disciplinarias y penales."
            },
            {
              texto: "¿Qué valor institucional demuestra al corregir a sus propios equipos cuando actúan sin el rigor legal exigido?",
              opciones: [
                { letra: "A", texto: "La Rectitud y el Liderazgo, garantizando que el ejercicio de la autoridad tributaria se haga dentro del marco de la Constitución y no mediante arbitrariedades.", esCorrecta: true },
                { letra: "B", texto: "La Deslealtad, porque un buen jefe siempre defiende a sus subalternos frente a terceros así estén haciendo las cosas mal y violando la ley.", esCorrecta: false },
                { letra: "C", texto: "La Inseguridad, porque cambiar de opinión en medio de una auditoría demuestra debilidad institucional ante los gremios de la construcción.", esCorrecta: false }
              ],
              explicacion: "La opción A refleja el verdadero liderazgo público ético. La opción B confunde el espíritu de cuerpo con la complicidad."
            }
          ]
        },
        {
          contenido: "Como Gestor III, usted es delegado para organizar la información y pruebas recaudadas en un sonado caso de subfacturación de importaciones de licores que involucra a una red criminal. El nivel directivo requiere una propuesta unificada para decidir si se decreta el decomiso administrativo de las mercancías, se aplican sanciones aduaneras millonarias y se trasladan copias por contrabando (delito penal). Usted debe asegurar que el expediente no tenga fallas procedimentales.",
          categoria: "Procedimiento Aduanero Sancionatorio", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "Al estructurar la propuesta de resolución sanción y decomiso, ¿qué aspecto del debido proceso es el más crítico a revisar en el expediente?",
              opciones: [
                { letra: "A", texto: "Garantizar que el pliego de cargos o acta de aprehensión fue debidamente notificado, que se respetaron los términos de descargos, que las pruebas pedidas fueron practicadas y que hay motivación jurídica exhaustiva.", esCorrecta: true },
                { letra: "B", texto: "Asegurarse de que el documento tenga el logo nuevo de la DIAN y esté impreso en papel de alta calidad para impresionar al juez si llega a haber demanda.", esCorrecta: false },
                { letra: "C", texto: "Revisar que la multa sea lo más alta posible calculando intereses compuestos diarios inventados para que el Estado gane más dinero.", esCorrecta: false }
              ],
              explicacion: "La opción A describe los elementos esenciales del debido proceso administrativo sancionatorio (CPACA y Estatuto Aduanero). Las otras no protegen la legalidad del acto."
            },
            {
              texto: "Si el importador argumenta en su defensa que la subfacturación fue 'un error de digitación' del proveedor extranjero, pero usted tiene copias de los correos donde se acuerda doble facturación, ¿cómo debe proceder?",
              opciones: [
                { letra: "A", texto: "Desvirtuar la defensa en la resolución, argumentando con las pruebas (correos) el dolo y la intención de defraudar al fisco, confirmando así el decomiso y la sanción.", esCorrecta: true },
                { letra: "B", texto: "Aceptar la excusa del error de digitación por el principio de la buena fe y archivar el caso de contrabando devolviendo los licores.", esCorrecta: false },
                { letra: "C", texto: "Extorsionar al importador diciéndole que si le paga una comisión usted 'desaparece' los correos electrónicos del expediente.", esCorrecta: false }
              ],
              explicacion: "La opción A aplica la sana crítica probatoria para desvirtuar coartadas en delitos fiscales. Las otras son impunidad y corrupción."
            },
            {
              texto: "¿Qué principio superior tutela el Estado al aplicar sanciones severas contra el contrabando de licores?",
              opciones: [
                { letra: "A", texto: "La protección del Orden Económico Social, la salud pública (frente a la alteración de licores) y las finanzas territoriales, pues el impuesto al consumo de licores financia salud y educación departamental.", esCorrecta: true },
                { letra: "B", texto: "La venganza institucional contra los comerciantes que venden licor más barato que las licoreras oficiales.", esCorrecta: false },
                { letra: "C", texto: "La moralidad puritana, buscando que la población colombiana deje de consumir alcohol haciéndolo más costoso.", esCorrecta: false }
              ],
              explicacion: "La opción A vincula el quehacer aduanero con los fines misionales del Estado (financiación del monopolio rentístico de salud y educación). Las otras opciones son sesgadas."
            }
          ]
        }
      ]
    },
    {
      simoId: "225493", // DIAN - Inspector IV (Aduanas)
      escenarios: [
        {
          contenido: "Usted es Inspector IV de Aduanas en la DIAN. Tiene a su cargo administrar el cumplimiento y mantenimiento de los requisitos de varias empresas con calificación de Operador Económico Autorizado (OEA). En una auditoría de seguimiento, descubre que un exportador OEA modificó sustancialmente sus esquemas de seguridad en la cadena de suministro, tercerizando el transporte con empresas no certificadas, lo que incrementa el riesgo de contaminación de la carga con narcóticos. Usted debe aplicar la normativa aduanera vigente.",
          categoria: "Gestión Aduanera / Operador Económico Autorizado (OEA)", dificultad: "EXPERTO",
          preguntas: [
            {
              texto: "¿Cuál es la acción inmediata que debe tomar frente al OEA que incumplió las condiciones de seguridad que originaron su autorización?",
              opciones: [
                { letra: "A", texto: "Proyectar el acto administrativo de interrupción provisional o cancelación de la autorización como OEA, garantizando el derecho de defensa, debido a la exposición al riesgo de la cadena de suministro internacional.", esCorrecta: true },
                { letra: "B", texto: "Hacer una amonestación verbal amistosa diciéndole que por favor contrate transportadores más seguros para la próxima vez.", esCorrecta: false },
                { letra: "C", texto: "Dejar que la empresa siga operando con los beneficios de OEA porque retirarles la categoría afectaría las estadísticas de exportación del gobierno.", esCorrecta: false }
              ],
              explicacion: "La opción A aplica la normatividad OEA (Decreto 3568/2011 y 1165/2019) ante la pérdida de requisitos habilitantes. Las otras opciones ponen en riesgo la seguridad nacional y la credibilidad internacional de la DIAN."
            },
            {
              texto: "¿Por qué es crítica la intervención de la DIAN en las fallas de seguridad de la cadena de suministro de un OEA?",
              opciones: [
                { letra: "A", texto: "Porque la autorización OEA otorga facilidades en comercio exterior basadas en la confianza (perfilamiento de bajo riesgo). Un fallo de seguridad compromete la lucha global contra el narcotráfico y el terrorismo.", esCorrecta: true },
                { letra: "B", texto: "Porque la DIAN cobra una membresía mensual muy costosa por ser OEA y si no cumplen, se les debe devolver la plata.", esCorrecta: false },
                { letra: "C", texto: "Porque a la aduana le gusta molestar a los grandes empresarios poniéndoles reglas imposibles de cumplir en el transporte terrestre.", esCorrecta: false }
              ],
              explicacion: "La opción A sustenta la filosofía del programa OEA de la Organización Mundial de Aduanas (OMA). Las otras opciones son falacias sobre el programa."
            },
            {
              texto: "¿Qué principio rige la auditoría estricta a los Operadores Económicos Autorizados?",
              opciones: [
                { letra: "A", texto: "La Seguridad Nacional y la Facilitación Segura del Comercio Exterior, asegurando que los beneficios aduaneros solo se otorguen a actores que demuestren un control total sobre su cadena logística.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'Confianza ciega', creyendo que las grandes corporaciones nunca cometen errores y no es necesario auditarlas una vez autorizadas.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Obstaculización', buscando cualquier excusa mínima para quitarles beneficios a las empresas competitivas.", esCorrecta: false }
              ],
              explicacion: "La opción A describe el balance central del marco SAFE de la OMA. Las otras actitudes son dañinas para el programa OEA."
            }
          ]
        },
        {
          contenido: "Como Inspector IV de Aduanas, usted debe emitir un concepto técnico sobre una controversia de origen. Una empresa importa televisores desde México reclamando 0% de arancel mediante el TLC. Sin embargo, en el control posterior, se halla que el 80% de los componentes (pantallas, chips) provienen de Asia y el ensamblaje en México es mínimo (atornillado). Usted debe administrar esta solicitud, evaluar la regla de origen específica del acuerdo comercial y tomar una decisión.",
          categoria: "Regímenes Aduaneros / Origen y Valoración", dificultad: "EXPERTO",
          preguntas: [
            {
              texto: "¿Qué análisis técnico-normativo procede para determinar si la importación aplica para el trato preferencial del TLC?",
              opciones: [
                { letra: "A", texto: "Verificar si el proceso de ensamblaje en México cumple con la 'regla de origen específica' del TLC (ej. salto arancelario o valor de contenido regional). Un ensamble mínimo no confiere origen.", esCorrecta: true },
                { letra: "B", texto: "Aprobar el 0% de arancel solo porque el certificado de origen dice 'Hecho en México' y tiene un sello bonito.", esCorrecta: false },
                { letra: "C", texto: "Cobrar el arancel máximo de Asia simplemente porque las pantallas son chinas, sin importar lo que diga el texto del TLC.", esCorrecta: false }
              ],
              explicacion: "La opción A aplica la metodología internacional de reglas de origen (Transformación sustancial). Las otras ignoran la complejidad de los acuerdos de libre comercio."
            },
            {
              texto: "Si usted concluye que los bienes NO califican como originarios y deniega el trato preferencial, ¿qué acción consecuente debe proferir?",
              opciones: [
                { letra: "A", texto: "Proferir el acto administrativo (Liquidación Oficial) exigiendo el pago de los tributos aduaneros dejados de pagar y las sanciones por declaración inexacta de origen, garantizando el derecho de defensa.", esCorrecta: true },
                { letra: "B", texto: "Decomisar todos los televisores y regalarlos a las escuelas públicas porque se intentó defraudar a la aduana con un falso origen.", esCorrecta: false },
                { letra: "C", texto: "Mandar una queja formal a la embajada de México para que regañen a la empresa que expidió el certificado de origen.", esCorrecta: false }
              ],
              explicacion: "La opción A es el procedimiento sancionatorio y de recuperación de tributos establecido en el Estatuto Aduanero. Las otras opciones son antijurídicas y diplomáticamente improcedentes."
            },
            {
              texto: "¿Qué principio de la función pública defiende al aplicar estrictamente las reglas de origen de los Acuerdos Comerciales?",
              opciones: [
                { letra: "A", texto: "La Protección de la Industria Nacional y la Equidad, impidiendo que terceros países hagan 'triangulación' para evadir aranceles y competir de manera desleal en el mercado colombiano.", esCorrecta: true },
                { letra: "B", texto: "El Aislacionismo económico, buscando cobrar siempre aranceles altos para que Colombia no le compre nada a ningún otro país.", esCorrecta: false },
                { letra: "C", texto: "La Enemistad internacional, peleando con las aduanas extranjeras para demostrar superioridad.", esCorrecta: false }
              ],
              explicacion: "La opción A explica el propósito económico y legal del control de origen. Las otras opciones son posiciones políticas extremas ajenas al rol del empleado público aduanero."
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
