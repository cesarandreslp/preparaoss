import { PrismaClient, TipoPregunta, NivelDificultad } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const dataToInsert: any[] = [
    {
      simoId: "236575", // DIAN - Analista III (Gestión Mercancías)
      escenarios: [
        {
          contenido: "Usted es Analista III en la DIAN, encargado de la disposición de mercancías aprehendidas en una bodega de frontera. Recibe un lote de equipos médicos de alta tecnología que han sido declarados en abandono a favor de la Nación. Usted debe verificar el estado de conservación, clasificar la mercancía según el arancel y proyectar el acto administrativo para su donación a un hospital público regional, asegurando que se cumplan los protocolos de inventario y que la entrega se realice con todas las garantías técnicas.",
          categoria: "Gestión de Mercancías", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cuál es el procedimiento técnico para formalizar el ingreso de estas mercancías al inventario de la DIAN?",
              opciones: [
                { letra: "A", texto: "Elaborar el acta de inspección detallada, registrar las improntas o números de serie y cargar la información en el sistema de gestión de inventarios institucional.", esCorrecta: true },
                { letra: "B", texto: "Guardar los equipos en una caja sin marcar y esperar a que alguien pregunte por ellos para ver qué se hace.", esCorrecta: false },
                { letra: "C", texto: "Llevarse un equipo para su casa para probar si funciona bien antes de donarlo al hospital público.", esCorrecta: false }
              ],
              explicacion: "La opción A garantiza la trazabilidad y el control de los bienes públicos. Las otras opciones son negligencias o actos de corrupción."
            },
            {
              texto: "En cuanto a la donación a entidades públicas, ¿qué requisito de idoneidad debe verificar en el hospital receptor?",
              opciones: [
                { letra: "A", texto: "Que la entidad receptora tenga la necesidad técnica del bien y cuente con la infraestructura para su correcta operación y mantenimiento.", esCorrecta: true },
                { letra: "B", texto: "Que el director del hospital sea amigo del jefe de la bodega de la DIAN para agilizar la entrega del regalo.", esCorrecta: false },
                { letra: "C", texto: "Que el hospital prometa vender los equipos y repartir la ganancia con los funcionarios que tramitaron la donación.", esCorrecta: false }
              ],
              explicacion: "La opción A asegura el fin social de la disposición de mercancías. Las otras opciones vulneran la transparencia y la ley."
            },
            {
              texto: "¿Qué documento legal extingue la responsabilidad de la DIAN sobre la mercancía una vez entregada?",
              opciones: [
                { letra: "A", texto: "El Acta de Entrega y Recibo a Satisfacción, suscrita por los representantes legales de ambas entidades y el supervisor de la DIAN.", esCorrecta: true },
                { letra: "B", texto: "Un mensaje de texto confirmando que los equipos ya llegaron al hospital y que 'todo bien'.", esCorrecta: false },
                { letra: "C", texto: "No se necesita ningún documento, la palabra del conductor del camión es suficiente para la administración pública.", esCorrecta: false }
              ],
              explicacion: "La opción A es el soporte documental obligatorio en la gestión de bienes estatales. Las otras opciones son informales e inseguras."
            }
          ]
        },
        {
          contenido: "Como Analista en la DIAN, atiende una PQR de un ciudadano que reclama la devolución de una mercancía que, según él, fue aprehendida ilegalmente por falta de una etiqueta de origen. El ciudadano presenta una factura de compra nacional pero el acta de aprehensión indica que el bien es de procedencia extranjera y no tiene el sello de importación. Usted debe analizar la concordancia entre la prueba aportada, la norma aduanera vigente y proyectar la respuesta técnica de fondo a la solicitud.",
          categoria: "Gestión de PQR Aduaneras", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cuál es el criterio técnico para validar la legal permanencia de una mercancía extranjera en el país?",
              opciones: [
                { letra: "A", texto: "La exhibición de la Declaración de Importación debidamente presentada y pagada, o la factura de compra nacional que incluya el número de levante.", esCorrecta: true },
                { letra: "B", texto: "Que el ciudadano jure por lo más sagrado que compró la mercancía en un mercado legal y que no sabía que era de contrabando.", esCorrecta: false },
                { letra: "C", texto: "Que la mercancía se vea usada y vieja, lo cual automáticamente la legaliza según la creencia popular de los comerciantes.", esCorrecta: false }
              ],
              explicacion: "La opción A identifica los soportes legales exigidos por el Estatuto Aduanero. Las otras opciones no tienen validez jurídica."
            },
            {
              texto: "Al proyectar la respuesta a la PQR, ¿qué debe asegurar según el CPACA?",
              opciones: [
                { letra: "A", texto: "La motivación clara de la decisión, citando los hechos del acta de aprehensión y el fundamento legal que sustenta la legalidad del procedimiento.", esCorrecta: true },
                { letra: "B", texto: "Responder con evasivas para que el ciudadano se confunda y no sepa cómo seguir reclamando sus derechos.", esCorrecta: false },
                { letra: "C", texto: "Darle la razón al ciudadano solo para evitar que ponga una queja contra usted en la oficina de control interno.", esCorrecta: false }
              ],
              explicacion: "La opción A cumple con el deber de motivación de los actos administrativos. Las otras opciones son faltas a la ética o al debido proceso."
            },
            {
              texto: "¿Qué principio de la función pública se destaca al resolver esta PQR con rigor técnico?",
              opciones: [
                { letra: "A", texto: "La Transparencia y la Legalidad, asegurando que las acciones de la DIAN se ajusten estrictamente al derecho aduanero.", esCorrecta: true },
                { letra: "B", texto: "La Amistad, tratando de quedar bien con el ciudadano para que lo invite a su fiesta de cumpleaños.", esCorrecta: false },
                { letra: "C", texto: "La Velocidad, respondiendo cualquier cosa rápida sin importar si el ciudadano tiene la razón o no.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la actuación con los fines del Estado. Las otras opciones son conductas no profesionales."
            }
          ]
        }
      ]
    },
    {
      simoId: "242081", // SOACHA - Prof. Especializado (Jurídico)
      escenarios: [
        {
          contenido: "Usted es Profesional Especializado en la oficina jurídica de la Alcaldía de Soacha. Debe proyectar el acto administrativo que resuelve un recurso de reposición contra una sanción urbanística impuesta a una constructora por edificar en una zona de ronda de río. La empresa alega que el error fue de la Curaduría al otorgar la licencia inicial. Usted debe evaluar la responsabilidad de la administración, el impacto ambiental y determinar si la sanción debe mantenerse basándose en la primacía del interés general y la protección del medio ambiente.",
          categoria: "Derecho Administrativo / Urbanístico", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cuál es el fundamento jurídico para mantener la sanción a pesar de la existencia de una licencia previa errónea?",
              opciones: [
                { letra: "A", texto: "El principio de legalidad y la naturaleza de las normas ambientales, que son de orden público y no pueden ser vulneradas por actos administrativos de menor jerarquía.", esCorrecta: true },
                { letra: "B", texto: "Que la constructora tiene mucho dinero y el municipio necesita recaudar multas para pagar las fiestas patronales de Soacha.", esCorrecta: false },
                { letra: "C", texto: "Que el Alcalde tiene una pelea personal con el dueño de la constructora y ordenó que no se les perdone nada.", esCorrecta: false }
              ],
              explicacion: "La opción A identifica el rigor jerárquico de las normas ambientales y urbanísticas. Las otras opciones son criterios arbitrarios o ilegales."
            },
            {
              texto: "En cuanto al daño ambiental en la ronda del río, ¿qué medida adicional debe proponer en el acto administrativo?",
              opciones: [
                { letra: "A", texto: "La obligación de demolición de lo construido y la restauración ecológica del área afectada a cargo de la empresa infractora.", esCorrecta: true },
                { letra: "B", texto: "Pedirle a la constructora que pinte el edificio de color verde para que combine con el pasto del río y no se note el daño.", esCorrecta: false },
                { letra: "C", texto: "Permitir que sigan construyendo si prometen regalarle un apartamento a cada funcionario de la oficina jurídica de Soacha.", esCorrecta: false }
              ],
              explicacion: "La opción A aplica el principio de 'quien contamina paga' y la restauración del orden urbanístico. Las otras opciones son ineficaces o delictivas."
            },
            {
              texto: "¿Qué recurso procede ante la vía gubernativa tras la resolución del recurso de reposición en este caso?",
              opciones: [
                { letra: "A", texto: "El recurso de apelación ante el superior jerárquico, si este existe y fue interpuesto en subsidio, o acudir a la jurisdicción contencioso administrativa.", esCorrecta: true },
                { letra: "B", texto: "Quejarse con el presidente de la junta de acción comunal del barrio para que él solucione el problema legal.", esCorrecta: false },
                { letra: "C", texto: "Escribir una carta al Papa Francisco para que interceda por la constructora ante el Alcalde de Soacha.", esCorrecta: false }
              ],
              explicacion: "La opción A describe el trámite legal de los recursos administrativos. Las otras opciones no tienen validez jurídica."
            }
          ]
        },
        {
          contenido: "Como Profesional Jurídico en Soacha, debe proyectar la respuesta a un requerimiento de la Contraloría General sobre una presunta irregularidad en un contrato de obra pública para el arreglo de vías. Se investiga la falta de estudios previos adecuados y el aumento del valor del contrato en un 50% mediante un otrosí. Usted debe revisar el expediente contractual, verificar el cumplimiento de la Ley 80 y la Ley 1150, y proyectar la defensa técnica de la entidad sustentada en los imprevistos de obra debidamente probados por la interventoría.",
          categoria: "Contratación Estatal", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cuál es el límite legal para las adiciones en valor de los contratos estatales en Colombia?",
              opciones: [
                { letra: "A", texto: "Hasta el cincuenta por ciento (50%) del valor inicial, expresado en salarios mínimos legales mensuales, según la Ley 80 de 1993.", esCorrecta: true },
                { letra: "B", texto: "No hay límite, se puede adicionar el dinero que el contratista pida hasta que la vía quede perfecta y brillante.", esCorrecta: false },
                { letra: "C", texto: "Solo se puede adicionar un peso, porque la ley de austeridad prohíbe gastar más de lo planeado inicialmente.", esCorrecta: false }
              ],
              explicacion: "La opción A es el mandato legal del Art. 40 de la Ley 80. Las otras opciones son erróneas."
            },
            {
              texto: "Al justificar el otrosí ante la Contraloría, ¿qué documento es la prueba técnica fundamental?",
              opciones: [
                { letra: "A", texto: "El concepto técnico de la interventoría que detalle la aparición de imprevistos no contemplados en los estudios previos y su necesidad para el fin del contrato.", esCorrecta: true },
                { letra: "B", texto: "Una foto del contratista rascándose la cabeza con cara de preocupación frente a un hueco en la calle.", esCorrecta: false },
                { letra: "C", texto: "Una encuesta de satisfacción donde los vecinos digan que les gusta que la obra se demore más porque así hay más empleo en el barrio.", esCorrecta: false }
              ],
              explicacion: "La opción A es el soporte técnico-legal requerido para las modificaciones contractuales. Las otras opciones carecen de rigor probatorio."
            },
            {
              texto: "¿Qué principio de la contratación se pone en duda cuando los estudios previos son deficientes?",
              opciones: [
                { letra: "A", texto: "El principio de Planeación, que obliga a la entidad a definir con precisión el objeto y los costos antes de iniciar el proceso de selección.", esCorrecta: true },
                { letra: "B", texto: "El principio de Velocidad, que dice que lo importante es contratar rápido y luego ver cómo se soluciona lo técnico.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Buena Suerte', asumiendo que los problemas de la obra se arreglarán solos con el tiempo.", esCorrecta: false }
              ],
              explicacion: "La opción A es el pilar de la gestión contractual pública. Las otras opciones son posturas negligentes."
            }
          ]
        }
      ]
    },
    {
      simoId: "228788", // SENA - Profesional (Jurídico)
      escenarios: [
        {
          contenido: "Usted es Profesional Jurídico en la Dirección General del SENA. Debe representar a la entidad en una audiencia de conciliación prejudicial ante la Procuraduría por una demanda de un excontratista que reclama el pago de mayores cantidades de obra y el reconocimiento de intereses de mora. Al revisar el caso, identifica que el contratista no entregó los informes de supervisión debidamente firmados. Usted debe definir la postura de la entidad, analizar los riesgos procesales y proponer fórmulas de arreglo solo si existe sustento técnico real de la deuda.",
          categoria: "Representación Judicial", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cuál es el requisito indispensable para que un Profesional Jurídico pueda conciliar en nombre del SENA?",
              opciones: [
                { letra: "A", texto: "Contar con la autorización expresa y la delimitación del rango de negociación aprobada por el Comité de Conciliación de la entidad.", esCorrecta: true },
                { letra: "B", texto: "Que el contratista le caiga bien y que le prometa que no volverá a demandar al Estado nunca más.", esCorrecta: false },
                { letra: "C", texto: "Tener un traje muy elegante para impresionar al Procurador y que este le dé la razón al SENA sin mirar las pruebas.", esCorrecta: false }
              ],
              explicacion: "La opción A cumple con el procedimiento legal de defensa del Estado (Ley 2220 de 2022). Las otras opciones son criterios subjetivos o irrelevantes."
            },
            {
              texto: "Ante la falta de informes de supervisión firmados, ¿qué argumento de defensa plantea?",
              opciones: [
                { letra: "A", texto: "La falta de cumplimiento de los requisitos contractuales para el pago y la ausencia de prueba de la ejecución efectiva de las obras reclamadas.", esCorrecta: true },
                { letra: "B", texto: "Decir que se perdió el sello de la entidad y que por eso nadie pudo firmar los informes durante todo el año de contrato.", esCorrecta: false },
                { letra: "C", texto: "Acusar al contratista de haberle robado los informes de la oficina para hacer quedar mal al supervisor del SENA.", esCorrecta: false }
              ],
              explicacion: "La opción A es una defensa técnica basada en la realidad del expediente. Las otras opciones son excusas o acusaciones sin fundamento."
            },
            {
              texto: "¿Qué política del SENA busca evitar que este tipo de demandas lleguen a los estrados judiciales?",
              opciones: [
                { letra: "A", texto: "La Política de Prevención del Daño Antijurídico, que promueve la mejora en la supervisión y la resolución pacífica de conflictos.", esCorrecta: true },
                { letra: "B", texto: "La Política de 'No Pagar Nada', negando todas las solicitudes de los contratistas así tengan la razón legal.", esCorrecta: false },
                { letra: "C", texto: "La Política de 'Cambio de Abogados', despidiendo a quien pierda un caso judicial contra la entidad.", esCorrecta: false }
              ],
              explicacion: "La opción A es la estrategia institucional correcta según los lineamientos de la Agencia de Defensa Jurídica del Estado. Las otras opciones son ilegales o ineficientes."
            }
          ]
        },
        {
          contenido: "Como Profesional Jurídico del SENA, debe proyectar una circular reglamentaria sobre el uso de la firma digital en los contratos de aprendizaje. Debe asegurar que la circular sea clara, que cumpla con la Ley 527 de 1999 y que brinde seguridad jurídica tanto a los aprendices como a las empresas patrocinadoras. Se enfrenta a dudas de las regionales sobre la validez de los contratos firmados en plataformas de terceros y la integridad de los documentos electrónicos que se cargan en el sistema SOFIA Plus.",
          categoria: "Hermenéutica y Normatividad", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Qué característica técnica define la validez de una firma digital según la ley colombiana?",
              opciones: [
                { letra: "A", texto: "Que sea única a la persona que la usa, que sea susceptible de verificación y que esté vinculada al documento de forma que si este cambia, la firma quede invalidada.", esCorrecta: true },
                { letra: "B", texto: "Que se vea igualita a la firma de lapicero pero en color azul brillante sobre la pantalla del computador.", esCorrecta: false },
                { letra: "C", texto: "Que el aprendiz tenga que poner su huella digital en la pantalla del celular para que el sistema reconozca quién es.", esCorrecta: false }
              ],
              explicacion: "La opción A refleja los requisitos de ley para la firma digital. Las otras opciones son percepciones erróneas de la tecnología."
            },
            {
              texto: "En cuanto a la integridad del contrato electrónico en SOFIA Plus, ¿qué medida de control recomienda?",
              opciones: [
                { letra: "A", texto: "El uso de estampas cronológicas (Time Stamping) y metadatos que aseguren que el documento no fue alterado tras su firma.", esCorrecta: true },
                { letra: "B", texto: "Imprimir el contrato, guardarlo en una caja fuerte y ponerle un candado de combinación secreta.", esCorrecta: false },
                { letra: "C", texto: "Confiar en que nadie va a querer cambiar los datos de un contrato de aprendizaje porque no tiene sentido hacerlo.", esCorrecta: false }
              ],
              explicacion: "La opción A garantiza la seguridad técnica del documento electrónico. La B rompe la cadena digital y la C es una falta de control."
            },
            {
              texto: "¿Qué principio de la función administrativa se promueve al facilitar el uso de TIC en la contratación del SENA?",
              opciones: [
                { letra: "A", texto: "El principio de Celeridad y Eficacia, reduciendo costos y tiempos de desplazamiento para ciudadanos y empresas.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'Modernidad por Moda', usando tecnología solo para parecer una entidad del primer mundo sin ninguna utilidad real.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Ahorro de Lapiceros', para que el presupuesto de papelería del SENA alcance para más cosas.", esCorrecta: false }
              ],
              explicacion: "La opción A es el fin último de la transformación digital en el Estado. Las otras opciones son visiones superficiales del proceso."
            }
          ]
        }
      ]
    },
    {
      simoId: "228736", // SENA - Profesional (Emprendimiento)
      escenarios: [
        {
          contenido: "Usted es Profesional de Emprendimiento en un Centro de Formación del SENA. Debe asesorar a un grupo de jóvenes rurales que quieren crear una asociación de productores de cacao fino de aroma. Ellos tienen el conocimiento técnico pero desconocen cómo estructurar el plan de negocios, cómo acceder a los recursos del Fondo Emprender y cómo legalizar la asociación ante la Cámara de Comercio. Usted debe guiarlos en la formulación del proyecto, asegurar que cumplan los requisitos de innovación y escalabilidad, y conectarlos con mentores técnicos para el fortalecimiento empresarial.",
          categoria: "Gestión de Emprendimiento", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cuál es el requisito principal para que un emprendedor pueda postularse a los recursos del Fondo Emprender?",
              opciones: [
                { letra: "A", texto: "Ser estudiante, egresado o aprendiz del SENA o de entidades reconocidas, y presentar un plan de negocios viable con componente innovador.", esCorrecta: true },
                { letra: "B", texto: "Tener muchos seguidores en redes sociales y que su idea de negocio sea 'tendencia' en la ciudad donde vive.", esCorrecta: false },
                { letra: "C", texto: "Ser familiar de algún funcionario de alto rango de la Dirección General del SENA para asegurar la aprobación de los recursos.", esCorrecta: false }
              ],
              explicacion: "La opción A identifica el perfil y requisito técnico del Fondo Emprender. Las otras opciones son criterios irrelevantes o corruptos."
            },
            {
              texto: "Al estructurar el Plan de Negocios, ¿qué componente es crítico para demostrar la viabilidad financiera?",
              opciones: [
                { letra: "A", texto: "La proyección de flujo de caja, el punto de equilibrio y el análisis de mercado que sustente la demanda real del producto.", esCorrecta: true },
                { letra: "B", texto: "Que el logotipo de la empresa de cacao sea muy colorido y que el eslogan rime con la palabra 'delicioso'.", esCorrecta: false },
                { letra: "C", texto: "Decir que no van a tener gastos porque los familiares de los emprendedores van a trabajar gratis por siempre.", esCorrecta: false }
              ],
              explicacion: "La opción A es el rigor técnico de la planeación financiera. La B es mercadeo superficial y la C es una inconsistencia financiera que invalida el plan."
            },
            {
              texto: "¿Qué valor institucional del SENA se destaca al apoyar a emprendedores rurales en zonas de difícil acceso?",
              opciones: [
                { letra: "A", texto: "La Equidad y el Liderazgo, llevando oportunidades de progreso a los sectores más necesitados para cerrar brechas sociales.", esCorrecta: true },
                { letra: "B", texto: "La Curiosidad, solo yendo al campo para ver cómo viven los campesinos sin intención de ayudarles realmente.", esCorrecta: false },
                { letra: "C", texto: "El Orgullo, para que el SENA pueda decir que es la mejor entidad del país aunque los proyectos rurales fracasen.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la labor con la misión social del SENA. Las otras opciones son sentimientos o posturas negativas."
            }
          ]
        },
        {
          contenido: "Como Profesional de Emprendimiento, debe evaluar el desempeño de 10 unidades productivas que recibieron capital semilla el año pasado. Nota que 3 de ellas han cambiado el objeto social sin autorización y una ha utilizado los recursos para gastos personales del emprendedor. Usted debe iniciar el proceso de seguimiento, documentar el incumplimiento del contrato de donación condicionada y recomendar la recuperación de los recursos ante la interventoría para proteger el presupuesto público asignado al fomento empresarial.",
          categoria: "Control y Seguimiento a Emprendimientos", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Qué acción técnica debe tomar frente al emprendedor que usó el dinero en gastos personales?",
              opciones: [
                { letra: "A", texto: "Documentar la novedad, suspender nuevos desembolsos y reportar a la interventoría para iniciar el proceso de cobro y devolución de los recursos por incumplimiento contractual.", esCorrecta: true },
                { letra: "B", texto: "Pedirle que le preste un poco de ese dinero a usted para que así los dos estén implicados y nadie pueda denunciar a nadie.", esCorrecta: false },
                { letra: "C", texto: "Aconsejarle que mienta en el informe final y diga que se gastó la plata en máquinas invisibles que no se pueden auditar.", esCorrecta: false }
              ],
              explicacion: "La opción A es la labor ética y legal de seguimiento a recursos públicos. Las otras opciones son delitos de corrupción y fraude."
            },
            {
              texto: "Respecto al cambio de objeto social sin autorización, ¿por qué es una falta grave en el Fondo Emprender?",
              opciones: [
                { letra: "A", texto: "Porque los recursos fueron asignados con base en un plan de negocios específico evaluado técnicamente, y el cambio altera la viabilidad y el fin del proyecto.", esCorrecta: true },
                { letra: "B", texto: "Porque al Director del SENA le molesta que la gente cambie de opinión tan rápido y eso lo pone de mal humor.", esCorrecta: false },
                { letra: "C", texto: "Porque el sistema SOFIA Plus no tiene una opción para cambiar el nombre de la empresa una vez registrado.", esCorrecta: false }
              ],
              explicacion: "La opción A identifica el fundamento técnico de la asignación de capital semilla. Las otras opciones son criterios irrelevantes."
            },
            {
              texto: "¿Cuál es la función de la Interventoría en los proyectos del Fondo Emprender?",
              opciones: [
                { letra: "A", texto: "Verificar el cumplimiento técnico, administrativo y financiero del plan de negocios y autorizar los desembolsos según el avance real.", esCorrecta: true },
                { letra: "B", texto: "Ir a las empresas solo a tomar café y a hablar con los empleados sobre el clima de la región.", esCorrecta: false },
                { letra: "C", texto: "Ayudar al emprendedor a esconder las facturas falsas para que la auditoría nacional no encuentre ningún problema.", esCorrecta: false }
              ],
              explicacion: "La opción A define el rol técnico de la interventoría estatal. Las otras opciones son negligencias o complicidades con el fraude."
            }
          ]
        }
      ]
    },
    {
      simoId: "236689", // DIAN - Gestor I (Control Interno)
      escenarios: [
        {
          contenido: "Usted es Gestor I en la oficina de Control Interno de la DIAN. Debe participar en una auditoría de desempeño al proceso de 'Devoluciones y Compensaciones'. Identifica que los funcionarios no están cumpliendo con los términos de ley para resolver las solicitudes de los contribuyentes, lo que genera el pago de intereses moratorios por parte de la Nación. Usted debe recolectar la evidencia, entrevistar a los responsables, identificar los riesgos no mitigados y proponer acciones de mejora en el Plan de Mejoramiento Institucional para optimizar los tiempos de respuesta.",
          categoria: "Control Interno / Auditoría", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cuál es su rol técnico durante la realización de la auditoría de desempeño?",
              opciones: [
                { letra: "A", texto: "Evaluar de forma objetiva e independiente la eficiencia, eficacia y economía del proceso, recolectando evidencias verificables según las normas de auditoría.", esCorrecta: true },
                { letra: "B", texto: "Actuar como un espía secreto para descubrir qué funcionarios llegan tarde a la oficina y reportarlos al Director para que los despida.", esCorrecta: false },
                { letra: "C", texto: "Ayudar a los auditados a esconder los expedientes atrasados para que la auditoría salga 'limpia' y no haya hallazgos negativos.", esCorrecta: false }
              ],
              explicacion: "La opción A define la naturaleza técnica y ética de la auditoría interna bajo el MECI y las NIA. Las otras opciones son persecuciones o complicidades ilegales."
            },
            {
              texto: "Ante el hallazgo del pago de intereses moratorios por retrasos, ¿qué tipo de hallazgo debe reportar?",
              opciones: [
                { letra: "A", texto: "Un hallazgo administrativo con incidencia fiscal, ya que el pago de intereses innecesarios constituye un detrimento al patrimonio público.", esCorrecta: true },
                { letra: "B", texto: "Un hallazgo de 'Mala Suerte', asumiendo que los intereses se pagan solos y que no es culpa de nadie en la DIAN.", esCorrecta: false },
                { letra: "C", texto: "Un hallazgo estético, sugiriendo que las resoluciones de pago de intereses se impriman en papel de colores para que se vean más alegres.", esCorrecta: false }
              ],
              explicacion: "La opción A califica técnicamente la falta según las normas de control fiscal. Las otras opciones son irresponsables o absurdas."
            },
            {
              texto: "¿Qué componente del MECI (Modelo Estándar de Control Interno) se está fortaleciendo con esta auditoría?",
              opciones: [
                { letra: "A", texto: "El componente de Evaluación Independiente, que permite el seguimiento continuo y la mejora del sistema de control de la entidad.", esCorrecta: true },
                { letra: "B", texto: "El componente de 'Castigo Ejemplar', buscando a quién echarle la culpa de todo lo que sale mal en la administración tributaria.", esCorrecta: false },
                { letra: "C", texto: "El componente de 'Papeleo Infinito', creando más formatos para que los funcionarios tengan menos tiempo de atender a la gente.", esCorrecta: false }
              ],
              explicacion: "La opción A identifica correctamente la estructura del MECI. Las otras opciones son visiones negativas o erróneas del modelo de control."
            }
          ]
        },
        {
          contenido: "Como Gestor de Control Interno en la DIAN, debe realizar el seguimiento al Plan de Mejoramiento suscrito tras la última visita de la Contraloría. Nota que una de las acciones de mejora, relacionada con la seguridad física de los depósitos de mercancía, ha sido reportada como 'cumplida' por el área responsable, pero al verificar físicamente, usted encuentra que las cámaras de seguridad siguen sin funcionar. Usted debe documentar la inconsistencia, alertar a la alta dirección y proponer el ajuste al seguimiento para asegurar que el cumplimiento sea real y no solo documental.",
          categoria: "Seguimiento a Planes de Mejora", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cuál es su deber ético y técnico frente a la falsedad detectada en el reporte de cumplimiento?",
              opciones: [
                { letra: "A", texto: "Invalidar el reporte de cumplimiento, dejar constancia de la falta de veracidad en el informe de seguimiento y reportar la situación ante la oficina de integridad o disciplinaria.", esCorrecta: true },
                { letra: "B", texto: "Hacerse el de la vista gorda y marcar como 'cumplido' en su sistema también para no tener problemas con los jefes de las otras oficinas.", esCorrecta: false },
                { letra: "C", texto: "Aceptar un soborno del encargado de la bodega a cambio de no decir nada sobre las cámaras dañadas en el informe oficial.", esCorrecta: false }
              ],
              explicacion: "La opción A es la actuación íntegra y profesional esperada de un auditor interno. Las otras opciones son negligencias o delitos gravísimos."
            },
            {
              texto: "En cuanto a la gestión de riesgos, ¿qué representa una cámara de seguridad dañada en un depósito de la DIAN?",
              opciones: [
                { letra: "A", texto: "Una vulnerabilidad crítica que aumenta el riesgo de pérdida, hurto o contaminación de las mercancías bajo custodia del Estado.", esCorrecta: true },
                { letra: "B", texto: "Un ahorro de energía eléctrica muy importante para que la factura de la luz de la DIAN llegue más barata este mes.", esCorrecta: false },
                { letra: "C", texto: "Un elemento de decoración que no sirve para nada porque los ladrones siempre saben cómo evitar las cámaras.", esCorrecta: false }
              ],
              explicacion: "La opción A identifica técnicamente el riesgo operativo y de seguridad. Las otras opciones son interpretaciones absurdas o mediocres."
            },
            {
              texto: "¿Cuál es el valor del 'Control Social' y la 'Transparencia' en este escenario de Control Interno?",
              opciones: [
                { letra: "A", texto: "Asegurar que la administración rinda cuentas sobre realidades y no sobre falsas apariencias, protegiendo los recursos de todos los colombianos.", esCorrecta: true },
                { letra: "B", texto: "Permitir que la gente sepa que las cámaras no sirven para que puedan ir a robar a la bodega con más confianza.", esCorrecta: false },
                { letra: "C", texto: "Lograr que la DIAN gane un premio a la mejor entidad del país aunque el control interno sea de papel y no funcione en la vida real.", esCorrecta: false }
              ],
              explicacion: "La opción A define el propósito ético del control estatal. Las otras opciones son perjudiciales o fraudulentas."
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
