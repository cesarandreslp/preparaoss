import { PrismaClient, TipoPregunta, NivelDificultad } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const dataToInsert: any[] = [
    {
      simoId: "225437", // DIAN - Inspector IV (Fiscalización y Liquidación)
      escenarios: [
        {
          contenido: "Usted es Inspector IV en la DIAN. Durante el desarrollo de un programa de control a la evasión en el sector minero, su equipo de auditores le presenta los resultados preliminares que evidencian presuntas omisiones de ingresos en varias empresas. Sin embargo, los hallazgos se basan únicamente en presunciones estadísticas y no en pruebas contables directas. Usted debe evaluar los resultados, definir la formulación de las acciones de fiscalización y proferir el acto administrativo correspondiente para garantizar el debido proceso.",
          categoria: "Procedimiento Tributario / Fiscalización", dificultad: "EXPERTO",
          preguntas: [
            {
              texto: "¿Es jurídicamente viable proferir un Requerimiento Especial fundamentado exclusivamente en presunciones estadísticas sin pruebas contables que respalden el hallazgo?",
              opciones: [
                { letra: "A", texto: "No, el Estatuto Tributario exige que las presunciones legales o estadísticas estén soportadas por indicios probados y graves, o pruebas directas (contables, testimoniales o documentales) antes de proponer una modificación a la declaración.", esCorrecta: true },
                { letra: "B", texto: "Sí, porque la DIAN tiene la facultad de determinar impuestos como le parezca, siempre y cuando las estadísticas vengan de una universidad prestigiosa.", esCorrecta: false },
                { letra: "C", texto: "Sí, pero solo si se le envía un correo electrónico al contribuyente pidiéndole permiso para usar las estadísticas en su contra.", esCorrecta: false }
              ],
              explicacion: "La opción A reconoce el rigor probatorio exigido por el Artículo 742 y siguientes del ET. Las otras opciones violan el derecho de defensa y la legalidad de la prueba."
            },
            {
              texto: "Para fortalecer el acervo probatorio antes de proferir el acto de fondo, ¿qué acción de control debe ordenar a su equipo?",
              opciones: [
                { letra: "A", texto: "Ordenar cruces de información con terceros (clientes, proveedores), requerir los libros de contabilidad y practicar inspecciones tributarias o contables para obtener pruebas directas de la omisión.", esCorrecta: true },
                { letra: "B", texto: "Buscar en redes sociales fotos de los dueños de las minas para ver si tienen carros lujosos y usar eso como prueba de evasión.", esCorrecta: false },
                { letra: "C", texto: "Archivar el caso y decir que el sector minero es muy difícil de auditar y mejor buscar evasores en otros sectores más fáciles.", esCorrecta: false }
              ],
              explicacion: "La opción A describe las facultades de investigación de la DIAN para construir certeza jurídica. Las otras son investigaciones antitécnicas o abandono del deber."
            },
            {
              texto: "¿Qué principio rige la evaluación objetiva de los resultados presentados por los auditores?",
              opciones: [
                { letra: "A", texto: "La Imparcialidad y la Justicia, garantizando que el Estado cobre únicamente los tributos legalmente causados, sin caer en la arbitrariedad de liquidar deudas inexistentes.", esCorrecta: true },
                { letra: "B", texto: "El principio del 'Terror Fiscal', cobrando lo máximo posible para asustar a los empresarios del sector y que paguen más el próximo año.", esCorrecta: false },
                { letra: "C", texto: "La Fe ciega, creyendo todo lo que dicen los auditores junior sin revisar los papeles de trabajo.", esCorrecta: false }
              ],
              explicacion: "La opción A equilibra el deber de recaudo con los derechos constitucionales de los ciudadanos. Las otras opciones son abusos de poder o negligencia de supervisión."
            }
          ]
        },
        {
          contenido: "Como Inspector IV, usted es responsable de presentar la propuesta anual de evaluación del subproceso de fiscalización y liquidación en su jurisdicción. Los indicadores muestran que, aunque se superó la meta de requerimientos especiales proferidos, el 60% de los procesos fueron fallados a favor del contribuyente en la vía gubernativa (recursos de reconsideración) por errores procedimentales o nulidades. Usted debe proponer oportunidades de mejora estructurales en la estrategia de control.",
          categoria: "Evaluación de Gestión y Calidad", dificultad: "EXPERTO",
          preguntas: [
            {
              texto: "¿Qué diagnóstico técnico explica esta desviación en los indicadores de efectividad del proceso de fiscalización?",
              opciones: [
                { letra: "A", texto: "Una deficiencia en la calidad probatoria y en la rigurosidad procedimental durante la fase de auditoría, lo que genera alta siniestralidad jurídica en la fase de discusión y liquidación final.", esCorrecta: true },
                { letra: "B", texto: "Que los abogados de la dependencia de Recursos Jurídicos están perdiendo los casos a propósito porque no saben defender a la DIAN.", esCorrecta: false },
                { letra: "C", texto: "Que la meta de requerimientos estaba muy alta, por lo que era obvio que se iban a equivocar en la mayoría para cumplir con la cuota.", esCorrecta: false }
              ],
              explicacion: "La opción A identifica la causa raíz en la cadena de valor (calidad vs cantidad). Las otras opciones evaden la responsabilidad del subproceso de fiscalización."
            },
            {
              texto: "Al formular el plan de mejoramiento, ¿qué acción estratégica debe proponer para revertir esta tendencia?",
              opciones: [
                { letra: "A", texto: "Implementar comités de revisión técnico-jurídica obligatorios antes de proferir los actos preparatorios y capacitar a los auditores en recaudo de pruebas y debido proceso tributario.", esCorrecta: true },
                { letra: "B", texto: "Aumentar la meta de requerimientos especiales para el próximo año, esperando que por probabilidad matemática se ganen más casos.", esCorrecta: false },
                { letra: "C", texto: "Sugerir cambiar a los jueces administrativos para que le den la razón a la DIAN más seguido.", esCorrecta: false }
              ],
              explicacion: "La opción A representa una solución de aseguramiento de calidad (Quality Assurance) en la función pública. Las otras opciones son irracionales."
            },
            {
              texto: "¿Qué principio de la administración pública se fortalece al corregir los errores que llevan a la pérdida de casos en vía gubernativa?",
              opciones: [
                { letra: "A", texto: "La Eficacia y la Economía, evitando el desgaste administrativo y procesal del Estado en litigios que no tienen sustento probatorio sólido.", esCorrecta: true },
                { letra: "B", texto: "El principio del 'Perdón y Olvido', porque de los errores se aprende y no hay necesidad de medir la efectividad.", esCorrecta: false },
                { letra: "C", texto: "La Tercedad, demostrando que la DIAN es inflexible y nunca se equivoca en sus cálculos.", esCorrecta: false }
              ],
              explicacion: "La opción A optimiza los recursos de la entidad y evita el daño antijurídico. Las otras opciones justifican la ineficiencia administrativa."
            }
          ]
        }
      ]
    },
    {
      simoId: "225438", // DIAN - Inspector IV (Mismas competencias, otra ciudad)
      escenarios: [
        {
          contenido: "Usted es Inspector IV en la DIAN. Durante una investigación a un grupo económico por presunto contrabando técnico (subfacturación de importaciones), se solicita un peritaje técnico sobre la clasificación arancelaria de un tipo específico de maquinaria. El concepto emitido por el nivel central contradice la hipótesis inicial de su equipo de trabajo. Usted debe evaluar el resultado de la acción de fiscalización y proferir el acto administrativo de fondo (Liquidación Oficial o Archivo).",
          categoria: "Procedimiento Aduanero y Tributario", dificultad: "EXPERTO",
          preguntas: [
            {
              texto: "Si el peritaje técnico oficial desvirtúa la hipótesis de subfacturación por reclasificación arancelaria, ¿qué debe decidir el Inspector IV?",
              opciones: [
                { letra: "A", texto: "Acoger el concepto técnico oficial, proferir el acto administrativo de archivo de la investigación por falta de mérito (no hay daño ni infracción) y retroalimentar al equipo sobre el criterio arancelario.", esCorrecta: true },
                { letra: "B", texto: "Ignorar el peritaje oficial porque su equipo invirtió muchos meses de trabajo en la investigación y hay que sancionar al importador de todas formas.", esCorrecta: false },
                { letra: "C", texto: "Contratar un perito externo privado que diga lo que la DIAN quiere escuchar para poder cobrar los impuestos y las multas.", esCorrecta: false }
              ],
              explicacion: "La opción A respeta la unidad de criterio técnico de la entidad y la legalidad. Las otras opciones constituyen prevaricato y abuso de autoridad."
            },
            {
              texto: "En el marco de sus funciones de mejora continua, ¿qué lección aprendida debe extraer de este caso para futuras investigaciones?",
              opciones: [
                { letra: "A", texto: "La necesidad de solicitar los conceptos técnicos vinculantes y las clasificaciones arancelarias oficiales en las etapas preliminares del proceso, antes de desplegar acciones de fiscalización masivas.", esCorrecta: true },
                { letra: "B", texto: "Que no se debe confiar en los peritos de Bogotá porque no conocen la realidad comercial de las ciudades de frontera.", esCorrecta: false },
                { letra: "C", texto: "Prohibirle al equipo de trabajo investigar empresas importadoras de maquinaria porque es muy complicado.", esCorrecta: false }
              ],
              explicacion: "La opción A es una oportunidad de mejora preventiva que optimiza el ciclo PHVA (Planear, Hacer, Verificar, Actuar). Las otras opciones son subjetivas o derrotistas."
            },
            {
              texto: "¿Qué valor del servidor público de la DIAN se evidencia al reconocer objetivamente que la hipótesis de fraude era incorrecta?",
              opciones: [
                { letra: "A", texto: "La Justicia y la Rectitud, reconociendo que el fin del Estado no es sancionar por sancionar, sino aplicar la norma de manera equitativa basándose en la verdad probatoria.", esCorrecta: true },
                { letra: "B", texto: "La Debilidad, demostrando ante el sector privado que la DIAN se deja ganar fácilmente en las discusiones técnicas.", esCorrecta: false },
                { letra: "C", texto: "El Orgullo, porque es muy difícil para un Inspector IV admitir que un contribuyente tenía la razón desde el principio.", esCorrecta: false }
              ],
              explicacion: "La opción A demuestra madurez ética e institucional. Las otras son visiones distorsionadas del rol de autoridad tributaria."
            }
          ]
        },
        {
          contenido: "Como Inspector IV, debe proyectar una respuesta a una consulta técnica compleja formulada por un gremio exportador. Ellos argumentan que una nueva directriz de la DIAN contradice lo establecido en un Tratado de Libre Comercio (TLC) vigente, generando sobrecostos en las operaciones cambiarias. Usted debe analizar la información jurídica, las normas supranacionales y proyectar la respuesta con solidez técnica.",
          categoria: "Consultas Técnicas / Normativa Internacional", dificultad: "EXPERTO",
          preguntas: [
            {
              texto: "¿Cuál es la jerarquía normativa que debe orientar su análisis en la respuesta a la consulta sobre el TLC?",
              opciones: [
                { letra: "A", texto: "Los Tratados de Libre Comercio, una vez ratificados e integrados al bloque de constitucionalidad o legislación interna, prevalecen sobre las directrices administrativas o resoluciones internas de la DIAN.", esCorrecta: true },
                { letra: "B", texto: "Las circulares de la DIAN son la ley suprema del comercio exterior colombiano y ningún tratado internacional las puede modificar.", esCorrecta: false },
                { letra: "C", texto: "Lo que diga el presidente del gremio exportador, porque el objetivo de la DIAN es hacerle caso a los empresarios para fomentar el empleo.", esCorrecta: false }
              ],
              explicacion: "La opción A es el principio constitucional básico (Art 9 y 93 CN, Ley de Tratados). Las otras opciones demuestran ignorancia jurídica."
            },
            {
              texto: "Si tras el análisis usted constata que efectivamente la directriz interna contraviene el TLC, ¿cómo debe proceder?",
              opciones: [
                { letra: "A", texto: "Proyectar la respuesta reconociendo la primacía del tratado, escalar el hallazgo a la Subdirección Jurídica del nivel central y proponer la inaplicabilidad o modificación de la directriz local para evitar litigios internacionales.", esCorrecta: true },
                { letra: "B", texto: "Responderle al gremio que tienen la razón pero que lamentablemente tienen que cumplir la circular de la DIAN mientras se deroga en unos años.", esCorrecta: false },
                { letra: "C", texto: "Esconder el derecho de petición y no responderlo para no meter en problemas al funcionario que redactó la directriz equivocada.", esCorrecta: false }
              ],
              explicacion: "La opción A gestiona el riesgo jurídico institucional proactivamente y respeta el principio de legalidad. Las otras son conductas prevaricadoras o disciplinables."
            },
            {
              texto: "¿Qué principio rige la atención de las consultas técnicas formuladas por los gremios económicos?",
              opciones: [
                { letra: "A", texto: "La Seguridad Jurídica y la Confianza Legítima, brindando interpretaciones unificadas, claras y apegadas a derecho que faciliten la planeación fiscal y el comercio exterior.", esCorrecta: true },
                { letra: "B", texto: "El principio del 'Misterio', respondiendo con lenguaje muy enredado para que los gremios no entiendan y dejen de molestar a la DIAN con preguntas.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Favorabilidad empresarial', dándoles la razón en todo así la ley no los ampare, para que las encuestas de satisfacción salgan altas.", esCorrecta: false }
              ],
              explicacion: "La opción A fomenta el cumplimiento voluntario y la relación armónica Estado-Ciudadano. Las otras opciones son malas prácticas comunicativas."
            }
          ]
        }
      ]
    },
    {
      simoId: "225440", // DIAN - Inspector III (Fiscalización y Liquidación)
      escenarios: [
        {
          contenido: "Usted es Inspector III en la DIAN. Se le asigna adelantar una investigación para determinar el cumplimiento de obligaciones cambiarias de un exportador de café que presenta operaciones sospechosas, posiblemente relacionadas con reintegro ficticio de divisas (lavado de activos). Usted debe formular acciones de fiscalización, practicar pruebas solicitadas por el nivel central y proyectar los actos preparatorios asegurando el debido proceso y la confidencialidad de la inteligencia financiera.",
          categoria: "Fiscalización Cambiaria y Lavado de Activos", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Qué prueba documental es crítica para comprobar la materialidad de la exportación frente al reintegro de las divisas?",
              opciones: [
                { letra: "A", texto: "La contrastación de los DEX (Declaración de Exportación), los documentos de transporte (Bill of Lading), los certificados de la Federación de Cafeteros y las declaraciones de cambio canalizadas a través del mercado cambiario.", esCorrecta: true },
                { letra: "B", texto: "Un correo del exportador jurando que él sí vendió el café en el exterior a muy buen precio y por eso entraron tantos dólares.", esCorrecta: false },
                { letra: "C", texto: "Las fotos de los bultos de café publicadas en la página de Facebook de la empresa antes de montarlos al barco.", esCorrecta: false }
              ],
              explicacion: "La opción A describe la trazabilidad documental técnica exigida por el régimen cambiario y aduanero. Las otras opciones no tienen valor probatorio para sustentar operaciones de comercio exterior."
            },
            {
              texto: "Si en medio de la práctica de pruebas usted confirma indicios serios de lavado de activos, ¿cuál es su obligación inmediata?",
              opciones: [
                { letra: "A", texto: "Documentar los hallazgos con estricta reserva y elevar el Reporte de Operación Sospechosa (ROS) a la UIAF y a las autoridades penales competentes a través de los canales internos de la DIAN.", esCorrecta: true },
                { letra: "B", texto: "Llamar al gerente de la exportadora de café y advertirle que se dieron cuenta del lavado para que tenga tiempo de contratar un buen abogado penalista.", esCorrecta: false },
                { letra: "C", texto: "Archivar la investigación cambiaria porque el lavado de activos es un delito de la Fiscalía y la DIAN solo cobra impuestos.", esCorrecta: false }
              ],
              explicacion: "La opción A cumple con el deber legal de denuncia (Art 67 CPP) y los protocolos anti-LA/FT del Estado. Las otras opciones son omisión de denuncia o encubrimiento."
            },
            {
              texto: "¿Qué principio rige su comportamiento ético al manejar un caso con altos capitales ilícitos presuntamente involucrados?",
              opciones: [
                { letra: "A", texto: "La Probidad y la Incorruptibilidad, manteniendo independencia total y rechazando cualquier acercamiento o presión indebida por parte de los investigados o sus emisarios.", esCorrecta: true },
                { letra: "B", texto: "La Flexibilidad, negociando un porcentaje del dinero lavado a cambio de hacer un reporte cambiario con fallas que se caiga en los tribunales.", esCorrecta: false },
                { letra: "C", texto: "El Miedo, pidiendo traslado de ciudad inmediatamente sin reportar nada para que los delincuentes no tomen represalias contra usted.", esCorrecta: false }
              ],
              explicacion: "La opción A es el baluarte ético exigido en la lucha estatal contra las economías criminales. Las otras opciones son corrupción o cobardía incompatible con el cargo."
            }
          ]
        },
        {
          contenido: "Como Inspector III de la DIAN, usted está formulando un programa de control extensivo para el sector de profesionales independientes (médicos y odontólogos), cruzando información de ingresos reportados por las clínicas EPS frente a las declaraciones de renta de estos profesionales. Usted debe proponer el estudio e investigación que servirá de base, proyectar el alcance y presentar la propuesta anual al nivel directivo.",
          categoria: "Formulación de Programas de Fiscalización", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cuál es la metodología idónea para justificar la pertinencia del programa de control en este sector económico?",
              opciones: [
                { letra: "A", texto: "Elaborar un análisis de brechas de evasión (Tax Gap), utilizando analítica de datos sobre la información exógena, determinando la relación costo-beneficio de la fiscalización masiva y focalizando las acciones en los deciles de mayor riesgo.", esCorrecta: true },
                { letra: "B", texto: "Elegir el sector salud porque todos saben que los médicos ganan muy bien y siempre cobran las consultas particulares en efectivo sin dar factura electrónica.", esCorrecta: false },
                { letra: "C", texto: "Hacer una encuesta en la calle preguntándole a la gente qué profesionales creen que evaden más impuestos y basar el programa en esas opiniones.", esCorrecta: false }
              ],
              explicacion: "La opción A aplica la inteligencia corporativa, la gestión de riesgos y la eficiencia en el uso de recursos institucionales. Las otras son enfoques subjetivos y empíricos."
            },
            {
              texto: "Para ejecutar el programa, usted proyecta proferir requerimientos persuasivos. ¿Qué característica deben tener estas actuaciones preparatorias?",
              opciones: [
                { letra: "A", texto: "Deben ser actos de trámite que inviten al contribuyente a la corrección voluntaria, informando claramente las inconsistencias detectadas y otorgando un plazo legal para explicarlas o pagar.", esCorrecta: true },
                { letra: "B", texto: "Deben ser amenazas directas de embargo de cuentas bancarias si el médico no paga en 24 horas el impuesto que la DIAN calculó en el programa masivo.", esCorrecta: false },
                { letra: "C", texto: "Deben ser citaciones policiales para obligar al contribuyente a firmar una confesión de evasión de impuestos en las oficinas de la DIAN.", esCorrecta: false }
              ],
              explicacion: "La opción A respeta el debido proceso y la naturaleza persuasiva del control extensivo para fomentar el cumplimiento voluntario (Art 685 ET). Las otras son vías de hecho."
            },
            {
              texto: "¿Qué principio tributario se promueve mediante los programas de control extensivo dirigidos a sectores específicos de alta evasión?",
              opciones: [
                { letra: "A", texto: "La Equidad y la Justicia Tributaria, asegurando que todos los ciudadanos contribuyan al financiamiento del Estado según su verdadera capacidad económica, combatiendo la competencia desleal.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'Persecución focalizada', demostrándole a un gremio específico que la DIAN los tiene vigilados de cerca porque le caen mal al gobierno de turno.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Recaudo a cualquier costo', cobrando impuestos inventados a sectores que tienen capacidad de pago sin importar si la deuda es real o no.", esCorrecta: false }
              ],
              explicacion: "La opción A describe el objetivo constitucional del sistema tributario (Art 363 CN). Las otras opciones son desnaturalizaciones de la función de control."
            }
          ]
        }
      ]
    },
    {
      simoId: "225442", // DIAN - Inspector II (Fiscalización y Liquidación)
      escenarios: [
        {
          contenido: "Usted es Inspector II en la DIAN. Tiene a su cargo el análisis preliminar de un paquete de denuncias de fiscalización aduanera recibidas a través del sistema PQRS. Las denuncias indican que varios locales de un reconocido centro comercial en el centro de la ciudad venden zapatos deportivos falsificados de contrabando. Usted debe hacer la precrítica de la información, establecer la pertinencia del inicio de una acción de control en terreno y proferir los actos administrativos de trámite requeridos.",
          categoria: "Análisis de Denuncias y Operativos Aduaneros", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Qué elemento es fundamental analizar en la fase de precrítica para determinar si hay mérito para realizar el operativo en el centro comercial?",
              opciones: [
                { letra: "A", texto: "Validar que la denuncia aporte elementos suficientes de modo, tiempo y lugar (identificación de locales, modus operandi) y cruzar con bases de datos aduaneras para perfilar el riesgo de los establecimientos.", esCorrecta: true },
                { letra: "B", texto: "Revisar si el denunciante dejó su número de teléfono para llamarlo a pedirle que traiga un par de zapatos de contrabando como prueba reina antes de ir al centro comercial.", esCorrecta: false },
                { letra: "C", texto: "Aprobar el operativo inmediatamente solo si la denuncia viene de otro comerciante del sector, para ayudarle a eliminar a la competencia.", esCorrecta: false }
              ],
              explicacion: "La opción A define el análisis de viabilidad e inteligencia previa requerido para optimizar recursos en acciones de fiscalización. Las otras opciones son antitécnicas o sesgadas."
            },
            {
              texto: "Si tras la precrítica se decide intervenir, usted debe participar en la diligencia de control en el centro comercial. ¿Cuál es su deber principal durante la actuación?",
              opciones: [
                { letra: "A", texto: "Verificar el amparo legal de la mercancía exhibida solicitando las declaraciones de importación o facturas de compra nacional, y en caso de inconsistencias, aplicar la medida cautelar de aprehensión garantizando el debido proceso.", esCorrecta: true },
                { letra: "B", texto: "Cerrar todo el centro comercial con cadenas y candados durante varios días hasta que todos los dueños de locales paguen una multa generalizada a la DIAN.", esCorrecta: false },
                { letra: "C", texto: "Decomisar toda la mercancía inmediatamente sin pedir papeles, porque si un zapato es barato es obvio que es de contrabando o pirata.", esCorrecta: false }
              ],
              explicacion: "La opción A enmarca la actuación del Inspector dentro del marco legal del Estatuto Aduanero. Las otras opciones son abusos de autoridad y procedimientos ilegales."
            },
            {
              texto: "¿Qué principio rige la elaboración del acto administrativo que decreta la aprehensión de la mercancía?",
              opciones: [
                { letra: "A", texto: "La Motivación y el Debido Proceso, detallando claramente las causales de hecho y de derecho que justifican la medida y los recursos que le asisten al administrado.", esCorrecta: true },
                { letra: "B", texto: "El principio del 'Silencio Administrativo', redactando un acta en blanco y pidiéndole al comerciante que la firme para luego llenarla en la oficina de la DIAN.", esCorrecta: false },
                { letra: "C", texto: "La Amenaza, redactando el acta de tal forma que el comerciante sienta pánico y no se atreva a contratar a un abogado para defenderse.", esCorrecta: false }
              ],
              explicacion: "La opción A garantiza la validez jurídica del acto y protege los derechos constitucionales. Las otras opciones son causales de nulidad por violación al debido proceso."
            }
          ]
        },
        {
          contenido: "Como Inspector II, usted debe proyectar la respuesta técnica a una solicitud de un gran contribuyente. La empresa solicita la revocatoria directa de una liquidación oficial de revisión ejecutoriada, argumentando que la DIAN cometió un error aritmético evidente al calcular las sanciones, lo cual vulnera sus derechos. Usted debe analizar la información, realizar el estudio jurídico y proyectar la respuesta de acuerdo con la normativa vigente y los lineamientos institucionales.",
          categoria: "Trámites / Recursos y Solicitudes Técnicas", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cuál es el tratamiento procedimental correcto frente a una solicitud de revocatoria directa por error aritmético evidente en un acto en firme?",
              opciones: [
                { letra: "A", texto: "Verificar la materialidad del error aritmético invocado; si existe vulneración manifiesta a la ley (cobro de lo no debido por error de cálculo de la Administración), es procedente proyectar el acto que revoca parcialmente la liquidación para ajustar el valor.", esCorrecta: true },
                { letra: "B", texto: "Negar la solicitud de plano argumentando que como el acto ya está ejecutoriado, el Estado nunca devuelve plata, así haya sido un error matemático de la misma DIAN.", esCorrecta: false },
                { letra: "C", texto: "Decirle al contribuyente que demande a la DIAN ante un juez administrativo porque la entidad no tiene facultades para corregir sus propios errores matemáticos.", esCorrecta: false }
              ],
              explicacion: "La opción A aplica correctamente la figura jurídica de la Revocatoria Directa (Art. 93 CPACA y Art. 736 ET) frente a la vulneración manifiesta de la ley. Las otras opciones desconocen el principio de buena fe y autotutela administrativa."
            },
            {
              texto: "Al proyectar el acto administrativo de respuesta, ¿qué cuidado debe tener en la fundamentación jurídica?",
              opciones: [
                { letra: "A", texto: "Sustentar la decisión estrictamente en la jurisprudencia del Consejo de Estado sobre corrección de errores formales y aritméticos, y evidenciar el recálculo correcto en el cuerpo del acto.", esCorrecta: true },
                { letra: "B", texto: "Escribir un acto diciendo 'Nos equivocamos sumando, perdón', sin citar ninguna norma, para que el contribuyente entienda que fue sin culpa.", esCorrecta: false },
                { letra: "C", texto: "Echarle la culpa con nombres propios al funcionario anterior que hizo mal la suma, para salvar la responsabilidad institucional de la DIAN.", esCorrecta: false }
              ],
              explicacion: "La opción A dota de firmeza y rigurosidad técnica al acto administrativo. Las otras opciones carecen de la solemnidad y motivación exigida en los actos estatales."
            },
            {
              texto: "¿Qué principio de la función pública justifica que la DIAN corrija oficiosamente o a petición de parte un error matemático en contra del ciudadano?",
              opciones: [
                { letra: "A", texto: "El principio de Moralidad, Equidad y Justicia, reconociendo que el Estado no puede enriquecerse sin justa causa aprovechándose de sus propios errores de liquidación.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'Lástima fiscal', porque el contribuyente lloró mucho en la solicitud y hay que tener compasión de las grandes empresas.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Clientelismo', si la empresa es muy grande y amiga del gobierno de turno, se le arreglan los errores rápido.", esCorrecta: false }
              ],
              explicacion: "La opción A representa la ética pública en la relación Estado-contribuyente. Las otras opciones son sesgos antijurídicos."
            }
          ]
        }
      ]
    },
    {
      simoId: "225443", // DIAN - Inspector II (Mismas competencias)
      escenarios: [
        {
          contenido: "Usted es Inspector II en la DIAN. Se encuentra liderando la ejecución de una acción de control a la facturación electrónica en establecimientos comerciales de una zona rosa. Durante la visita, el dueño de un restaurante se niega a suministrar los reportes del sistema POS alegando que su contador tiene la llave del sistema y no está en la ciudad. Usted debe aplicar el procedimiento establecido, adelantar la investigación y proferir el acto administrativo preparatorio por los hechos encontrados.",
          categoria: "Control de Facturación e Infracciones Formales", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Qué acción legal procede ante la negativa del comerciante de permitir la verificación del sistema de facturación durante la visita de control?",
              opciones: [
                { letra: "A", texto: "Levantar el acta de visita de control dejando constancia expresa y detallada de la renuencia o negativa a suministrar información, lo cual constituye indicio de evasión y causal para pliego de cargos.", esCorrecta: true },
                { letra: "B", texto: "Comprar comida en el restaurante, pedir la cuenta y si le entregan un papelito escrito a mano, usar eso como única prueba para sellar el local inmediatamente.", esCorrecta: false },
                { letra: "C", texto: "Aceptar la excusa del contador ausente, pedir disculpas por la interrupción y decirle que volverán en un mes cuando el contador regrese de vacaciones.", esCorrecta: false }
              ],
              explicacion: "La opción A aplica el debido proceso tributario frente a las obstrucciones en diligencias de control (Art. 653 ET). Las otras opciones son vías de hecho o negligencia frente al deber."
            },
            {
              texto: "Al regresar a la oficina, para sancionar la presunta irregularidad detectada (no facturar o impedir la revisión), ¿qué acto preparatorio debe proferir?",
              opciones: [
                { letra: "A", texto: "Proyectar y notificar el Pliego de Cargos por la presunta infracción relacionada con la obligación formal de facturar, otorgando el término de ley para que el contribuyente presente sus descargos y pruebas.", esCorrecta: true },
                { letra: "B", texto: "Emitir directamente la Resolución Sanción de clausura del establecimiento por tres días, porque la palabra del Inspector de la DIAN es ley y no necesita descargos.", esCorrecta: false },
                { letra: "C", texto: "Proferir una Liquidación Oficial de Revisión cobrándole el 19% del IVA presunto de todas las mesas que estaban ocupadas esa noche.", esCorrecta: false }
              ],
              explicacion: "La opción A es el paso procesal obligatorio (debido proceso) antes de imponer sanciones de clausura o pecuniarias. Las otras opciones violan flagrantemente el derecho de defensa."
            },
            {
              texto: "¿Qué principio rige la ejecución de estos operativos de control en zonas de alta actividad comercial?",
              opciones: [
                { letra: "A", texto: "El principio de Presencia Institucional y Control Persuasivo, buscando generar percepción de riesgo para desincentivar la evasión masiva en la facturación de operaciones gravadas.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'Cuotas de cierre', porque el objetivo principal de los inspectores de la DIAN es quebrar negocios para demostrar poder en la ciudad.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Beneficio propio', escogiendo siempre restaurantes lujosos para realizar las visitas de control a la hora del almuerzo.", esCorrecta: false }
              ],
              explicacion: "La opción A explica la estrategia de los planes de choque y control extensivo de la administración tributaria. Las otras opciones son desviaciones graves del propósito misional."
            }
          ]
        },
        {
          contenido: "Como Inspector II, participa en la estructuración de la propuesta anual de estudios e investigaciones que servirán de base para las acciones de control del próximo año en su seccional. Usted propone investigar el sector de las criptomonedas y activos virtuales, ya que ha notado un incremento de operaciones no reportadas patrimonialmente. Debe sustentar esta propuesta basándose en la normativa vigente y en las directrices institucionales sobre nuevas economías.",
          categoria: "Investigación e Inteligencia Fiscal / Nuevas Tecnologías", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cuál es el fundamento técnico-jurídico que justifica incluir la fiscalización de criptoactivos en el plan de control anual?",
              opciones: [
                { letra: "A", texto: "Los criptoactivos, al ser considerados bienes inmateriales susceptibles de valoración económica, hacen parte del patrimonio y sus transacciones generan rentas gravables, constituyendo un alto riesgo de omisión de activos y evasión.", esCorrecta: true },
                { letra: "B", texto: "Las criptomonedas son ilegales en Colombia, por lo tanto la DIAN tiene la competencia de decomisarlas todas como si fueran mercancía de contrabando físico.", esCorrecta: false },
                { letra: "C", texto: "Investigar eso está de moda y suena muy moderno en el informe final de gestión de la entidad, aunque no haya normas para cobrarles impuestos.", esCorrecta: false }
              ],
              explicacion: "La opción A refleja la doctrina oficial de la DIAN y la realidad tributaria de los activos digitales. Las otras opciones son jurídicamente incorrectas o superficiales."
            },
            {
              texto: "Para ejecutar este programa de investigación sobre criptoactivos, ¿qué metodología de cruce de información debería proponer?",
              opciones: [
                { letra: "A", texto: "Diseñar requerimientos de información dirigidos a plataformas de intercambio (Exchanges) nacionales y extranjeras a través de convenios de intercambio de información, así como análisis de movimientos bancarios inusuales.", esCorrecta: true },
                { letra: "B", texto: "Mandar inspectores de la DIAN a caminar por los barrios preguntándole a la gente casa por casa si tienen Bitcoins guardados en sus computadores.", esCorrecta: false },
                { letra: "C", texto: "Imprimir las páginas de internet que hablan de criptomonedas y guardarlas en una carpeta como prueba suficiente de evasión generalizada.", esCorrecta: false }
              ],
              explicacion: "La opción A utiliza las herramientas tecnológicas y los convenios internacionales (FATCA, CRS) adecuados para la fiscalidad internacional digital. Las otras opciones son absurdas."
            },
            {
              texto: "¿Qué valor del servidor público se exige a los investigadores de la DIAN frente a los retos de la economía digital?",
              opciones: [
                { letra: "A", texto: "La Innovación y la Mejora Continua, manteniendo una actualización constante en sus conocimientos técnicos para poder enfrentar las nuevas modalidades de evasión globalizada.", esCorrecta: true },
                { letra: "B", texto: "El Inmovilismo, negándose a investigar cosas de internet porque a los inspectores más antiguos solo les gusta revisar facturas de papel impresas.", esCorrecta: false },
                { letra: "C", texto: "El Escepticismo, pensando que el dinero virtual no es real y por lo tanto no es problema del fisco colombiano preocuparse por eso.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea las competencias del servidor con las exigencias de modernización del Estado. Las otras actitudes garantizan la obsolescencia institucional."
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
