import { PrismaClient, TipoPregunta, NivelDificultad } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const opecs = await prisma.opec.findMany({
    where: {
      estado: "ACTIVA",
      escenarios: { none: {} },
    },
    take: 100,
    orderBy: { createdAt: "asc" },
  });

  const dataToInsert: any[] = [
    {
      simoId: "241812", // SECRETARIO - ATLÁNTICO
      escenarios: [
        {
          contenido: "Usted es Secretario en el despacho del Secretario de Interior de la Gobernación del Atlántico. Se recibe una llamada de urgencia de un Alcalde municipal informando sobre una alteración del orden público en su jurisdicción. El Secretario de Interior se encuentra en una reunión privada con el Gobernador y ha dado instrucciones de no ser interrumpido bajo ninguna circunstancia. Usted debe gestionar la situación, asegurar que la información llegue oportunamente a quien deba tomar decisiones y mantener la coordinación con los organismos de seguridad mientras se libera el superior.",
          categoria: "Asistencia Administrativa", dificultad: "BASICO",
          preguntas: [
            {
              texto: "¿Cuál es su acción inmediata frente a la llamada del Alcalde?",
              opciones: [
                { letra: "A", texto: "Decirle al Alcalde que llame más tarde porque el Secretario de Interior está muy ocupado y no puede atenderlo ahora.", esCorrecta: false },
                { letra: "B", texto: "Tomar los datos precisos de la situación, informar al Subsecretario de Seguridad y enviar una nota breve pero urgente al Secretario de Interior.", esCorrecta: true },
                { letra: "C", texto: "Entrar a la fuerza en la reunión del Gobernador gritando que hay una emergencia nacional para demostrar su compromiso con el cargo.", esCorrecta: false }
              ],
              explicacion: "La opción B garantiza el flujo de información por los canales jerárquicos adecuados y la celeridad administrativa. La A es una falta de atención al ciudadano y la C es una imprudencia que rompe el protocolo institucional."
            },
            {
              texto: "Respecto al manejo de la correspondencia que llega al despacho, ¿qué criterio de prioridad aplica?",
              opciones: [
                { letra: "A", texto: "Organizar los documentos por el tamaño del sobre, dejando los más grandes para el final del día porque son más difíciles de leer.", esCorrecta: false },
                { letra: "B", texto: "Clasificar la correspondencia según el grado de urgencia, términos legales de respuesta y remitentes institucionales prioritarios.", esCorrecta: true },
                { letra: "C", texto: "Abrir solo las cartas que parezcan tener invitaciones a eventos sociales o fiestas para asegurar la agenda social del jefe.", esCorrecta: false }
              ],
              explicacion: "La opción B es la gestión técnica de archivo y correspondencia. La A y la C son criterios ineficientes que ponen en riesgo los términos legales de la entidad pública."
            },
            {
              texto: "Un ciudadano llega al despacho exigiendo ver al Secretario sin cita previa y de forma agresiva. ¿Cómo actúa?",
              opciones: [
                { letra: "A", texto: "Escuchar al ciudadano con calma, explicar los canales oficiales de atención y ayudarle a radicar su solicitud por escrito si es necesario.", esCorrecta: true },
                { letra: "B", texto: "Gritarle más fuerte al ciudadano para que entienda que en la Gobernación se respeta la autoridad y el orden.", esCorrecta: false },
                { letra: "C", texto: "Prometerle que el Secretario lo atenderá de inmediato solo para que el ciudadano se calme y deje de gritar en la oficina.", esCorrecta: false }
              ],
              explicacion: "La opción A aplica los protocolos de buen trato y servicio al ciudadano. La B escala el conflicto y la C es una mentira que afecta la credibilidad de la administración departamental."
            }
          ]
        },
        {
          contenido: "Como Secretario de la Gobernación del Atlántico, usted maneja documentos que tienen reserva legal por tratarse de temas de seguridad y convivencia ciudadana. Un periodista se acerca a su escritorio mientras usted no está y comienza a revisar los documentos que dejó sobre la mesa. Al regresar, usted nota la situación. Debe actuar conforme a las normas de custodia de información reservada y asegurar que no se comprometa la integridad de los procesos administrativos y judiciales en curso en el departamento.",
          categoria: "Ética y Transparencia", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cuál es su reacción técnica y legal ante la presencia del periodista revisando archivos reservados?",
              opciones: [
                { letra: "A", texto: "Retirar los documentos de inmediato, informar al periodista sobre la reserva legal de los mismos y reportar el incidente al oficial de seguridad.", esCorrecta: true },
                { letra: "B", texto: "Permitir que el periodista termine de leer para no tener problemas con la prensa y que hablen bien de su gestión en el periódico local.", esCorrecta: false },
                { letra: "C", texto: "Pedirle al periodista que le pague una suma de dinero a cambio de dejarle tomar fotos de los documentos más importantes.", esCorrecta: false }
              ],
              explicacion: "La opción A cumple con el deber de custodia de información reservada (Ley de Transparencia). La B es una negligencia funcional y la C constituye un delito contra la administración pública (cohecho)."
            },
            {
              texto: "Para mejorar la seguridad de la información en el despacho, ¿qué medida administrativa propone?",
              opciones: [
                { letra: "A", texto: "Implementar una política de 'escritorios limpios', donde no se deje información sensible a la vista y se asegure el archivo bajo llave al finalizar la jornada.", esCorrecta: true },
                { letra: "B", texto: "No volver a imprimir nada y memorizar todos los documentos importantes para que nadie pueda leerlos si no es entrando a su mente.", esCorrecta: false },
                { letra: "C", texto: "Pegar letreros con insultos en los expedientes para que a la gente le dé miedo tocarlos sin su permiso expreso.", esCorrecta: false }
              ],
              explicacion: "La opción A es una buena práctica de gestión documental y seguridad de la información. La B es imposible técnicamente y la C es una conducta poco profesional."
            },
            {
              texto: "Al organizar la agenda del Secretario, usted nota que se cruzaron dos reuniones importantes. ¿Cómo resuelve el conflicto de agenda?",
              opciones: [
                { letra: "A", texto: "Priorizar la reunión que tenga mayor impacto en el cumplimiento de las metas del Plan de Desarrollo y reprogramar la otra con previo aviso.", esCorrecta: true },
                { letra: "B", texto: "Cancelar ambas reuniones y apagar el teléfono para no tener que darle explicaciones a ninguna de las partes interesadas.", esCorrecta: false },
                { letra: "C", texto: "Decidir por sorteo (lanzando una moneda) a qué reunión debe asistir el Secretario de Interior ese día.", esCorrecta: false }
              ],
              explicacion: "La opción A aplica criterios de planeación y eficiencia administrativa. La B es una irresponsabilidad y la C es una toma de decisiones arbitraria que no considera los fines del Estado."
            }
          ]
        }
      ]
    },
    {
      simoId: "245356", // TÉCNICO OPERATIVO - TOLIMA (Tránsito)
      escenarios: [
        {
          contenido: "Usted es Técnico Operativo en la Secretaría de Tránsito y Transporte de la Gobernación del Tolima. Durante un operativo de control en una vía departamental, detiene un vehículo de transporte público intermunicipal que parece exceder la capacidad de pasajeros permitida y cuyo conductor no presenta el extracto de contrato de prestación de servicio (FUEC) vigente. El conductor afirma que dejó los documentos en la terminal y ofrece una suma de dinero para que lo deje continuar su ruta, argumentando que lleva personas enfermas que necesitan llegar rápido a Ibagué.",
          categoria: "Control Vial", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cuál es el procedimiento legal y técnico que debe seguir ante la falta de documentos del vehículo?",
              opciones: [
                { letra: "A", texto: "Permitir el avance del vehículo por razones humanitarias, sin imponer sanción, asumiendo que el conductor dice la verdad sobre los enfermos.", esCorrecta: false },
                { letra: "B", texto: "Proceder con la imposición del comparendo respectivo y la inmovilización del vehículo conforme al Código Nacional de Tránsito y normas de transporte.", esCorrecta: true },
                { letra: "C", texto: "Recibir el dinero que ofrece el conductor y decirle que use ese dinero para pagar la multa después por internet para que le salga más barato.", esCorrecta: false }
              ],
              explicacion: "La opción B es el cumplimiento del deber legal y la garantía de la seguridad vial. La A es una omisión del deber funcional y la C es un acto de corrupción (cohecho propio)."
            },
            {
              texto: "Respecto al exceso de pasajeros, ¿qué medida de seguridad operativa debe adoptar?",
              opciones: [
                { letra: "A", texto: "Pedirle a los pasajeros que van de pie que se agachen para que no se vean desde afuera y así poder dejarlos seguir el viaje.", esCorrecta: false },
                { letra: "B", texto: "Coordinar el transbordo de los pasajeros excedentes a otro vehículo habilitado para garantizar su seguridad y la del corredor vial.", esCorrecta: true },
                { letra: "C", texto: "Decirle al conductor que si van apretados es culpa de ellos por subirse a un bus lleno, y que él no tiene nada que ver en eso.", esCorrecta: false }
              ],
              explicacion: "La opción B prioriza la vida y seguridad de los usuarios del transporte. La A es una conducta cómplice de un riesgo vial y la C es una respuesta irrespetuosa que ignora la responsabilidad del transportador."
            },
            {
              texto: "Al diligenciar el informe del operativo para su superior, ¿qué información es indispensable incluir?",
              opciones: [
                { letra: "A", texto: "Los detalles técnicos del hallazgo, la identificación plena del vehículo y conductor, y el soporte documental de la sanción impuesta.", esCorrecta: true },
                { letra: "B", texto: "Una lista de los apodos que le pusieron los pasajeros durante el operativo para que el jefe se ría un poco al leer el informe.", esCorrecta: false },
                { letra: "C", texto: "La descripción del clima que hacía en la vía y lo que usted almorzó ese día, para darle un toque más humano al reporte técnico.", esCorrecta: false }
              ],
              explicacion: "La opción A garantiza la veracidad y utilidad administrativa del informe técnico. La B y la C incluyen información irrelevante que resta profesionalismo a la gestión pública."
            }
          ]
        },
        {
          contenido: "Como Técnico Operativo en Tolima, debe atender el reporte de un derrame de ACPM en una curva peligrosa de la vía que conduce al Nevado del Ruiz, producto del volcamiento de un camión cisterna. Usted es el primer funcionario del departamento en llegar al sitio. Existe riesgo de incendio y contaminación de una fuente de agua cercana. Debe coordinar las acciones iniciales de aislamiento, reportar a los organismos de socorro y asegurar que se tomen las medidas para mitigar el impacto ambiental y vial en la zona protegida.",
          categoria: "Gestión del Riesgo", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cuál es su primera acción técnica en el sitio del accidente según el protocolo de seguridad vial?",
              opciones: [
                { letra: "A", texto: "Aislar el área afectada, establecer un perímetro de seguridad y prohibir el tránsito de vehículos y personas que porten elementos inflamables.", esCorrecta: true },
                { letra: "B", texto: "Tratar de levantar el camión cisterna usted solo usando una palanca para que la vía se despeje lo más rápido posible.", esCorrecta: false },
                { letra: "C", texto: "Llamar a los medios de comunicación para dar una entrevista en vivo antes de asegurar el área o llamar a los bomberos.", esCorrecta: false }
              ],
              explicacion: "La opción A sigue los protocolos básicos de primer respondiente y seguridad vial ante materiales peligrosos. La B es una imprudencia física y la C es una falta de prioridad en la gestión de emergencias."
            },
            {
              texto: "Para evitar la contaminación de la fuente de agua, ¿qué medida de mitigación operativa recomienda?",
              opciones: [
                { letra: "A", texto: "Construir diques de contención con tierra o material absorbente disponible para desviar el flujo del combustible lejos de la quebrada.", esCorrecta: true },
                { letra: "B", texto: "Echarle mucha agua al ACPM para que se disuelva y así los peces no se den cuenta de que hay combustible en el río.", esCorrecta: false },
                { letra: "C", texto: "Esperar a que llueva fuerte para que la naturaleza misma se encargue de lavar la carretera y limpiar el derrame de manera ecológica.", esCorrecta: false }
              ],
              explicacion: "La opción A es una medida técnica de contención inicial. La B aumenta el volumen de contaminación y la C es una omisión negligente que escala el desastre ambiental."
            },
            {
              texto: "Al entregar el mando de la escena al cuerpo de bomberos, ¿qué información técnica debe suministrar de manera prioritaria?",
              opciones: [
                { letra: "A", texto: "El tipo de sustancia derramada (según placa UN), el volumen aproximado y los riesgos específicos identificados en los primeros minutos.", esCorrecta: true },
                { letra: "B", texto: "El nombre del dueño del camión y cuánto dinero cree usted que le va a costar la reparación del vehículo accidentado.", esCorrecta: false },
                { letra: "C", texto: "Una queja formal sobre por qué los bomberos se demoraron tanto en llegar al sitio del accidente vial.", esCorrecta: false }
              ],
              explicacion: "La opción A facilita la labor de los organismos de socorro con datos técnicos precisos (Manejo de MATPEL). La B es información secundaria y la C no aporta a la solución de la emergencia en curso."
            }
          ]
        }
      ]
    },
    {
      simoId: "243205", // PROFESIONAL UNIVERSITARIO - BELLAS ARTES (Cali)
      escenarios: [
        {
          contenido: "Usted es Profesional Universitario en la Biblioteca del Instituto Departamental de Bellas Artes en Cali. Se recibe una donación de un archivo histórico que contiene partituras manuscritas de compositores vallecaucanos del siglo XIX. Muchos de los folios presentan ataques de hongos y fragilidad extrema por acidez del papel. Su tarea es liderar el proceso de catalogación técnica, asegurar la conservación preventiva y proyectar el plan de digitalización para permitir el acceso a los investigadores sin poner en riesgo los originales únicos.",
          categoria: "Bibliotecología", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cuál es la primera medida de conservación técnica que debe aplicar al recibir el material con hongos?",
              opciones: [
                { letra: "A", texto: "Lavar las partituras con agua y jabón de loza para eliminar las manchas negras de hongos de manera definitiva.", esCorrecta: false },
                { letra: "B", texto: "Aislar el material afectado, realizar una limpieza mecánica controlada bajo protocolos de bioseguridad y estabilizar la humedad ambiente.", esCorrecta: true },
                { letra: "C", texto: "Poner las partituras al sol directo durante todo el día para que los rayos ultravioleta maten los hongos de forma natural.", esCorrecta: false }
              ],
              explicacion: "La opción B sigue los estándares internacionales de conservación de papel y archivos. La A y la C destruyen irremediablemente el soporte físico de las partituras históricas."
            },
            {
              texto: "En el proceso de catalogación analítica, ¿qué elemento es fundamental para la recuperación de la información musical?",
              opciones: [
                { letra: "A", texto: "La descripción precisa del formato, la instrumentación requerida y la identificación del autor y época de creación según normas RDA.", esCorrecta: true },
                { letra: "B", texto: "El color de la tinta que usó el compositor, clasificando las partituras por si se ven 'bonitas' o 'feas' estéticamente.", esCorrecta: false },
                { letra: "C", texto: "El peso exacto en gramos de cada partitura para saber cuánto espacio van a ocupar en las estanterías de la biblioteca.", esCorrecta: false }
              ],
              explicacion: "La opción A aplica estándares técnicos de catalogación bibliográfica y musical. La B es un criterio subjetivo y la C es un dato logístico secundario frente al valor intelectual del documento."
            },
            {
              texto: "Para el plan de digitalización, ¿qué criterio técnico asegura la preservación a largo plazo de los archivos digitales?",
              opciones: [
                { letra: "A", texto: "Capturar las imágenes en alta resolución (formato TIFF sin compresión) y generar metadatos técnicos y de preservación estandarizados.", esCorrecta: true },
                { letra: "B", texto: "Tomar fotos con un celular de baja gama y guardarlas en una memoria USB que se compartirá entre todos los estudiantes de Bellas Artes.", esCorrecta: false },
                { letra: "C", texto: "Escanear todo en blanco y negro para que el archivo pese menos y sea más rápido de enviar por correo electrónico personal.", esCorrecta: false }
              ],
              explicacion: "La opción A sigue las mejores prácticas de digitalización de patrimonio documental (Preservación Digital). La B y la C comprometen la calidad y la durabilidad de la información digital generada."
            }
          ]
        },
        {
          contenido: "Como Profesional en Bellas Artes, se le encomienda diseñar un programa de extensión bibliotecaria itinerante para llevar el patrimonio musical y artístico de la institución a comunidades rurales de difícil acceso en el Valle del Cauca. Debe definir los contenidos pedagógicos, la logística de transporte y los indicadores de evaluación del programa. El presupuesto es limitado, por lo que debe buscar estrategias de cooperación interinstitucional con las bibliotecas públicas municipales y las casas de la cultura locales para garantizar la sostenibilidad del proyecto.",
          categoria: "Gestión Cultural", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Qué componente debe priorizar en el diseño pedagógico del programa itinerante?",
              opciones: [
                { letra: "A", texto: "La mediación cultural que permita que la comunidad interactúe con los contenidos de manera participativa y contextualizada a su realidad rural.", esCorrecta: true },
                { letra: "B", texto: "La entrega de folletos con la biografía detallada del Rector de Bellas Artes para que la gente sepa quién manda en la institución.", esCorrecta: false },
                { letra: "C", texto: "La realización de exámenes escritos al final de cada visita para calificar con notas de 1 a 5 el nivel cultural de los campesinos del Valle.", esCorrecta: false }
              ],
              explicacion: "La opción A promueve el acceso real a la cultura y el fortalecimiento del tejido social. La B es propaganda institucional y la C es un enfoque pedagógico autoritario que aleja al público del programa."
            },
            {
              texto: "Para asegurar la sostenibilidad del programa con bajo presupuesto, ¿cuál es la mejor estrategia de gestión?",
              opciones: [
                { letra: "A", texto: "Establecer convenios de apoyo mutuo con las alcaldías locales para compartir gastos de transporte y uso de espacios físicos comunitarios.", esCorrecta: true },
                { letra: "B", texto: "Pedirle a los estudiantes de Bellas Artes que trabajen gratis y que ellos mismos paguen sus pasajes y alimentación por amor al arte.", esCorrecta: false },
                { letra: "C", texto: "Cobrar una boleta de entrada costosa a los campesinos para financiar la compra de una camioneta de lujo para la biblioteca.", esCorrecta: false }
              ],
              explicacion: "La opción A aplica el principio de colaboración armónica entre entidades estatales. La B es una explotación del talento humano y la C vulnera el derecho al acceso gratuito a la cultura en programas de extensión estatal."
            },
            {
              texto: "Al evaluar el impacto del programa, ¿qué indicador cualitativo es más diciente?",
              opciones: [
                { letra: "A", texto: "La percepción de la comunidad sobre la recuperación de sus propias tradiciones musicales a través de las actividades de extensión.", esCorrecta: true },
                { letra: "B", texto: "El número de personas que se tomaron una foto con el camión de la biblioteca para publicarla en sus perfiles personales de Instagram.", esCorrecta: false },
                { letra: "C", texto: "La cantidad de polvo que acumuló el material bibliográfico durante los viajes por las carreteras destapadas del departamento.", esCorrecta: false }
              ],
              explicacion: "La opción A mide la transformación social y cultural que es el fin último de la extensión universitaria. La B y la C son indicadores superficiales que no reflejan el impacto real del proyecto."
            }
          ]
        }
      ]
    },
    {
      simoId: "240585", // TÉCNICO ADMINISTRATIVO - PEREIRA (Cobro Coactivo)
      escenarios: [
        {
          contenido: "Usted es Técnico Administrativo en la oficina de Cobro Coactivo de la Alcaldía de Pereira. Debe realizar la notificación de un mandamiento de pago a un contribuyente que adeuda varios años del impuesto predial. Al llegar a la dirección registrada, un familiar del deudor se niega a recibir la notificación y afirma que el propietario falleció hace dos años. Usted debe verificar la información, proceder conforme a las normas de notificación establecidas en el Estatuto Tributario y asegurar que el proceso no se vea viciado por una indebida notificación, protegiendo el recaudo municipal.",
          categoria: "Procedimiento Tributario", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cuál es el procedimiento legal ante la noticia del fallecimiento del deudor en la etapa de notificación?",
              opciones: [
                { letra: "A", texto: "Dejar la notificación debajo de la puerta y darla por entregada, asumiendo que los muertos no tienen derechos procesales.", esCorrecta: false },
                { letra: "B", texto: "Suspender la diligencia, verificar el fallecimiento en la Registraduría y proceder a vincular a los herederos o a la sucesión procesal.", esCorrecta: true },
                { letra: "C", texto: "Gritarle al familiar que si no paga hoy mismo, la alcaldía le quitará la casa mañana sin importar quién sea el dueño actual.", esCorrecta: false }
              ],
              explicacion: "La opción B garantiza el debido proceso y evita la nulidad de las actuaciones posteriores (Estatuto Tributario). La A vicia el proceso y la C es una conducta abusiva e ilegal."
            },
            {
              texto: "Respecto a la notificación por correo, ¿cuándo se entiende surtida legalmente?",
              opciones: [
                { letra: "A", texto: "Cuando el mensajero mete el sobre en el buzón, sin importar si la dirección es correcta o si alguien vive allí realmente.", esCorrecta: false },
                { letra: "B", texto: "Cuando el acto es entregado en la última dirección informada por el contribuyente en el registro tributario municipal.", esCorrecta: true },
                { letra: "C", texto: "Cuando el técnico administrativo publica la foto de la carta en su estado de WhatsApp personal para que todos la vean.", esCorrecta: false }
              ],
              explicacion: "La opción B es la regla general de notificación tributaria. La A es insuficiente para garantizar el derecho a la defensa y la C vulnera la reserva tributaria y no es un medio legal de notificación."
            },
            {
              texto: "Un deudor le ofrece pagarle a usted directamente 'en efectivo' la mitad de la deuda a cambio de que borre el proceso del sistema. ¿Qué responde?",
              opciones: [
                { letra: "A", texto: "Aceptar el dinero para ayudar al ciudadano a salir de su problema económico y de paso mejorar sus ingresos personales.", esCorrecta: false },
                { letra: "B", texto: "Rechazar de plano y explicar que los pagos solo se realizan en bancos autorizados con el recibo oficial generado por el sistema.", esCorrecta: true },
                { letra: "C", texto: "Decirle que le traiga el dinero mañana a una cafetería cerca de la alcaldía para que nadie sospeche del trámite informal.", esCorrecta: false }
              ],
              explicacion: "La opción B es la única actuación ética y legal. Las opciones A y C constituyen delitos de cohecho y concusión que generan sanciones penales y disciplinarias gravísimas."
            }
          ]
        },
        {
          contenido: "Como Técnico de Cobro Coactivo en Pereira, debe proyectar la respuesta a una solicitud de facilidad de pago (acuerdo de pago) presentada por una empresa local. La empresa propone pagar la deuda en 36 cuotas mensuales, pero no ofrece ninguna garantía real (hipoteca o prenda) alegando que están en crisis financiera. Usted debe analizar si la propuesta cumple con los requisitos del manual de cobro de la alcaldía, verificar los intereses de mora aplicables y proyectar el informe técnico que sustente la aceptación o el rechazo de la solicitud por parte del Tesorero Municipal.",
          categoria: "Gestión de Cartera", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cuál es el requisito indispensable para otorgar un plazo superior a 12 meses en una facilidad de pago?",
              opciones: [
                { letra: "A", texto: "La constitución de garantías suficientes que respalden el pago de la deuda, los intereses y las costas procesales del cobro.", esCorrecta: true },
                { letra: "B", texto: "Que el representante legal de la empresa sea amigo cercano del Alcalde o de algún concejal influyente de la ciudad de Pereira.", esCorrecta: false },
                { letra: "C", texto: "Que la empresa prometa por escrito que va a contratar a más personas el próximo año si le perdonan la deuda tributaria.", esCorrecta: false }
              ],
              explicacion: "La opción A es el mandato legal del Estatuto Tributario para proteger el patrimonio público en acuerdos de largo plazo. La B y la C son criterios ilegales y subjetivos que vulneran la igualdad tributaria."
            },
            {
              texto: "Al liquidar los intereses de mora, ¿qué tasa debe aplicar según la normatividad vigente?",
              opciones: [
                { letra: "A", texto: "La tasa de usura fijada por la Superintendencia Financiera, disminuida en dos puntos porcentuales según el Estatuto Tributario.", esCorrecta: true },
                { letra: "B", texto: "Una tasa fija del 1% mensual para todos los deudores, para que el cálculo sea más fácil de hacer sin usar calculadoras.", esCorrecta: false },
                { letra: "C", texto: "La tasa que usted decida ese día dependiendo de qué tan amable sea el contribuyente al momento de presentar su solicitud.", esCorrecta: false }
              ],
              explicacion: "La opción A sigue la fórmula legal para el cálculo de intereses de mora tributarios. La B y la C son liquidaciones erróneas que generan responsabilidad fiscal para el funcionario que las proyecte."
            },
            {
              texto: "Si el contribuyente incumple una sola cuota del acuerdo de pago, ¿qué acción administrativa procede?",
              opciones: [
                { letra: "A", texto: "Dejar sin efecto la facilidad de pago y continuar con el proceso administrativo de cobro coactivo, incluyendo el embargo de bienes.", esCorrecta: true },
                { letra: "B", texto: "Llamar al deudor y decirle que no se preocupe, que puede pagar cuando quiera siempre y cuando le traiga un regalo a la oficina.", esCorrecta: false },
                { letra: "C", texto: "Pedirle a un compañero que borre la cuota pendiente del sistema para que no se genere la alerta automática de incumplimiento.", esCorrecta: false }
              ],
              explicacion: "La opción A es la consecuencia legal del incumplimiento de acuerdos de pago estatales. La B y la C son actos de negligencia y corrupción que afectan el recaudo y la integridad del sistema tributario."
            }
          ]
        }
      ]
    },
    {
      simoId: "243348", // PROFESIONAL UNIVERSITARIO - BOYACÁ (Turismo)
      escenarios: [
        {
          contenido: "Usted es Profesional Universitario en la Secretaría de Turismo de la Gobernación de Boyacá. Se le asigna la tarea de realizar visitas de verificación de estándares de calidad a prestadores de servicios turísticos (hoteles y operadoras) ubicados en la zona de influencia del Páramo de Ocetá. Durante una visita a un nuevo hostal rural, identifica que el establecimiento no cuenta con el Registro Nacional de Turismo (RNT) actualizado y está realizando vertimientos de aguas residuales directamente a una quebrada protegida. Debe emitir el informe técnico, orientar al prestador sobre la formalización y coordinar con la autoridad ambiental departamental.",
          categoria: "Turismo Sostenible", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cuál es la consecuencia legal inmediata de operar un servicio turístico sin el RNT vigente?",
              opciones: [
                { letra: "A", texto: "La imposición de una sanción económica y el cierre temporal del establecimiento hasta que se formalice ante el Ministerio de Comercio.", esCorrecta: true },
                { letra: "B", texto: "Ninguna, el RNT es un registro opcional que solo deben tener los hoteles grandes de las ciudades capitales.", esCorrecta: false },
                { letra: "C", texto: "Una felicitación por parte de la Gobernación por emprender un negocio en una zona tan bonita del departamento de Boyacá.", esCorrecta: false }
              ],
              explicacion: "La opción A es el cumplimiento de la Ley 1558 de 2012 y normas de turismo. La B es falsa y la C ignora el deber de control y fomento de la formalidad sectorial."
            },
            {
              texto: "Ante el hallazgo del vertimiento ilegal en zona de páramo, ¿qué acción es prioritaria?",
              opciones: [
                { letra: "A", texto: "Trasladar de inmediato el hallazgo a la Corporación Autónoma Regional (Corpoboyacá) para que inicie el proceso sancionatorio ambiental.", esCorrecta: true },
                { letra: "B", texto: "Aconsejar al dueño que tape el vertimiento con piedras para que los técnicos de la autoridad ambiental no lo encuentren cuando pasen por ahí.", esCorrecta: false },
                { letra: "C", texto: "Ignorar el tema ambiental porque su función es solo verificar temas de turismo y no de ecología o recursos naturales.", esCorrecta: false }
              ],
              explicacion: "La opción A cumple con el principio de colaboración interinstitucional y protección de ecosistemas estratégicos. La B es complicidad en un daño ambiental y la C es una visión sesgada que ignora el concepto de turismo sostenible."
            },
            {
              texto: "Para fomentar la calidad turística en la zona, ¿qué acción de apoyo técnico propone?",
              opciones: [
                { letra: "A", texto: "Brindar asistencia técnica sobre las Normas Técnicas Sectoriales (NTS) de sostenibilidad para que el prestador mejore sus procesos y se certifique.", esCorrecta: true },
                { letra: "B", texto: "Escribir él mismo el manual de funciones del hostal para que el dueño no tenga que trabajar tanto en la parte administrativa del negocio.", esCorrecta: false },
                { letra: "C", texto: "Recomendarle que suba los precios de las habitaciones para que así solo vayan personas con mucho dinero al páramo.", esCorrecta: false }
              ],
              explicacion: "La opción A cumple con la función de fomento y mejora de la competitividad turística. La B es una extralimitación y la C es una medida elitista que no garantiza la calidad ni la sostenibilidad."
            }
          ]
        },
        {
          contenido: "Como Profesional de Turismo en Boyacá, usted lidera el diseño de la 'Ruta Turística del Bicentenario', que busca integrar municipios históricos como Ventaquemada, Tunja y Paipa. El proyecto debe tener un fuerte componente de turismo cultural y experiencial. Usted debe coordinar con los gremios (COTELCO, ANATO), las comunidades locales y los historiadores para crear un producto turístico competitivo a nivel nacional. Se presenta un conflicto porque algunos municipios sienten que la ruta pasa muy rápido por sus pueblos y no genera suficiente gasto turístico local, exigiendo cambios en el itinerario oficial.",
          categoria: "Desarrollo Turístico", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cómo debe abordar el conflicto con los municipios inconformes con el itinerario de la ruta?",
              opciones: [
                { letra: "A", texto: "Realizar mesas técnicas para identificar atractivos únicos en cada municipio y diseñar 'paradas de experiencia' que aumenten el tiempo de estancia.", esCorrecta: true },
                { letra: "B", texto: "Amenazar a los alcaldes con sacar a sus municipios de la ruta si siguen quejándose por decisiones técnicas tomadas en la Gobernación.", esCorrecta: false },
                { letra: "C", texto: "Prometerles a todos los pueblos que el bus turístico se quedará a dormir una noche en cada uno, aunque el viaje dure un mes entero.", esCorrecta: false }
              ],
              explicacion: "La opción A busca soluciones concertadas basadas en el desarrollo de productos turísticos (valor agregado). La B es una postura autoritaria ineficiente y la C es una promesa inviable operativamente."
            },
            {
              texto: "Para asegurar que la ruta sea sostenible ambientalmente, ¿qué requisito debe exigir a los operadores participantes?",
              opciones: [
                { letra: "A", texto: "Contar con protocolos de manejo de residuos y capacidad de carga definida para los atractivos naturales e históricos que se visitan.", esCorrecta: true },
                { letra: "B", texto: "Que todos los guías turísticos usen ropa de color verde para que la gente piense que la ruta es muy ecológica y natural.", esCorrecta: false },
                { letra: "C", texto: "Que el bus turístico siempre lleve el aire acondicionado a la temperatura más fría posible para que los turistas no suden durante el viaje.", esCorrecta: false }
              ],
              explicacion: "La opción A aplica criterios técnicos de gestión de destinos sostenibles. La B es una medida estética superficial y la C es una práctica ineficiente energéticamente y contraria a la sostenibilidad."
            },
            {
              texto: "Al evaluar el éxito del lanzamiento de la ruta, ¿qué indicador es fundamental para la Secretaría de Turismo?",
              opciones: [
                { letra: "A", texto: "El aumento en la ocupación hotelera y el gasto promedio del turista en los municipios que integran el corredor del Bicentenario.", esCorrecta: true },
                { letra: "B", texto: "El número de veces que el nombre del Gobernador de Boyacá apareció en las fotos de los folletos promocionales de la ruta.", esCorrecta: false },
                { letra: "C", texto: "La cantidad de empanadas que vendieron en el puente de Boyacá el día de la inauguración oficial del proyecto.", esCorrecta: false }
              ],
              explicacion: "La opción A mide el impacto económico real de la política pública de turismo. La B es un indicador de imagen política y la C es un dato anecdótico que no permite evaluar la estrategia de manera integral."
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
