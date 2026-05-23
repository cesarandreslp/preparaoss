import { PrismaClient, TipoPregunta, NivelDificultad } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const dataToInsert: any[] = [
    {
      simoId: "228009", // TUNJA - Prof. Universitario (Cobro Coactivo)
      escenarios: [
        {
          contenido: "Usted es Profesional Universitario en la oficina de Cobro Coactivo de la Alcaldía de Tunja. Un ciudadano solicita el desembargo de su cuenta de ahorros, argumentando que es una cuenta de nómina y que el saldo es inferior al límite legal de inembargabilidad definido por la ley. Al revisar el proceso, usted nota que la deuda por impuesto predial es de hace 5 años y que ya se han surtido todas las notificaciones. Usted debe verificar la procedencia legal del desembargo, proyectar la resolución respectiva y asegurar que el municipio mantenga otras garantías de pago si existen.",
          categoria: "Procedimiento Tributario", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cuál es el criterio legal para proceder con el desembargo de la cuenta de ahorros en este caso?",
              opciones: [
                { letra: "A", texto: "Desembargar de inmediato si se demuestra que el saldo está por debajo del límite de inembargabilidad fijado anualmente por la ley para cuentas de ahorros.", esCorrecta: true },
                { letra: "B", texto: "Negar el desembargo porque las deudas con el Estado están por encima de cualquier derecho individual a la subsistencia.", esCorrecta: false },
                { letra: "C", texto: "Pedirle al ciudadano que pague la mitad de la deuda en efectivo a cambio de que usted 'pierda' el oficio de embargo en el correo.", esCorrecta: false }
              ],
              explicacion: "La opción A respeta los límites legales a la inembargabilidad (Estatuto Tributario/Código General del Proceso). La B es una postura ilegal y la C es un delito (cohecho/concusión)."
            },
            {
              texto: "Ante el desembargo de la cuenta, ¿qué medida de control administrativo debe adoptar para asegurar el recaudo?",
              opciones: [
                { letra: "A", texto: "Investigar otros bienes del deudor (vehículos, otros inmuebles) y proceder a decretar nuevas medidas cautelares sobre bienes embargables.", esCorrecta: true },
                { letra: "B", texto: "Llamar al deudor todos los días a las 3 de la mañana para recordarle que le debe dinero a la Alcaldía de Tunja y que no lo dejará dormir.", esCorrecta: false },
                { letra: "C", texto: "Dar por terminado el proceso de cobro coactivo y condonar la deuda porque el deudor demostró que es una persona con pocos recursos.", esCorrecta: false }
              ],
              explicacion: "La opción A garantiza la gestión eficiente de la cartera pública. La B es un acoso ilegal y la C es una extralimitación de funciones que genera responsabilidad fiscal (pérdida de recursos públicos)."
            },
            {
              texto: "En el proceso de cobro coactivo, ¿qué acto administrativo da inicio formal a la etapa de ejecución?",
              opciones: [
                { letra: "A", texto: "El Mandamiento de Pago, donde se ordena al deudor cancelar las sumas adeudadas más los intereses de mora.", esCorrecta: true },
                { letra: "B", texto: "Una carta de invitación a tomar café con el Tesorero Municipal para charlar sobre la importancia de pagar los impuestos.", esCorrecta: false },
                { letra: "C", texto: "La publicación de la foto del deudor en la página web de la Alcaldía bajo el título de 'Enemigo Público del Municipio'.", esCorrecta: false }
              ],
              explicacion: "La opción A es el acto jurídico reglamentado en el Estatuto Tributario. Las otras opciones son informales, ineficaces o vulneran derechos fundamentales."
            }
          ]
        },
        {
          contenido: "Como Profesional de Cobro Coactivo en Tunja, debe identificar bienes rematables de un deudor que adeuda una cuantía superior a los 500 millones de pesos. El deudor no tiene cuentas bancarias ni vehículos a su nombre en el municipio, pero usted sospecha que posee propiedades rurales en otros departamentos. Usted debe liderar la búsqueda de bienes a nivel nacional, coordinar con las Oficinas de Registro de Instrumentos Públicos y proyectar los despachos comisorios necesarios para materializar los embargos fuera de su jurisdicción inmediata.",
          categoria: "Investigación de Bienes", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Qué herramienta tecnológica es fundamental para la búsqueda de bienes inmuebles a nivel nacional?",
              opciones: [
                { letra: "A", texto: "La consulta en el sistema VUR (Ventanilla Única de Registro) y el uso del cruce de información con la Superintendencia de Notariado y Registro.", esCorrecta: true },
                { letra: "B", texto: "Viajar personalmente a todos los municipios de Colombia y preguntar en las plazas de mercado si alguien conoce al deudor.", esCorrecta: false },
                { letra: "C", texto: "Pagarle a un detective privado para que siga al deudor y le tome fotos cuando entre a sus fincas secretas.", esCorrecta: false }
              ],
              explicacion: "La opción A es la práctica técnica y legal para la investigación de bienes en procesos estatales. Las otras opciones son ineficientes o ilegales (uso indebido de recursos públicos)."
            },
            {
              texto: "Al proyectar un despacho comisorio para un embargo en otro municipio, ¿qué debe asegurar?",
              opciones: [
                { letra: "A", texto: "La precisión en la identificación del bien (matrícula inmobiliaria, dirección) y el cumplimiento de las formalidades de ley para que el comisionado actúe.", esCorrecta: true },
                { letra: "B", texto: "Que el despacho comisorio vaya acompañado de una caja de dulces típicos de Tunja para que el funcionario del otro municipio trabaje más rápido.", esCorrecta: false },
                { letra: "C", texto: "Firmar el despacho con un seudónimo para que el deudor no sepa que usted es el funcionario que está persiguiendo sus bienes.", esCorrecta: false }
              ],
              explicacion: "La opción A garantiza la eficacia de la medida cautelar. La B es un acto inapropiado (presunto soborno) y la C vicia de nulidad el acto administrativo por falta de competencia o identidad."
            },
            {
              texto: "¿Cuál es el límite del embargo en un proceso de cobro coactivo según la ley?",
              opciones: [
                { letra: "A", texto: "El valor de la deuda más un 50% adicional para cubrir intereses, costas y gastos del proceso.", esCorrecta: true },
                { letra: "B", texto: "Todo lo que tenga el deudor, incluso su ropa y sus muebles, hasta que aprenda que no debe ser moroso con el Estado.", esCorrecta: false },
                { letra: "C", texto: "Lo que el funcionario de cobro decida ese día dependiendo de si el deudor le cayó bien o mal durante la llamada telefónica.", esCorrecta: false }
              ],
              explicacion: "La opción A es la regla técnica del Estatuto Tributario para evitar embargos excesivos o desproporcionados. La B vulnera la dignidad humana y la C es una actuación arbitraria."
            }
          ]
        }
      ]
    },
    {
      simoId: "227876", // BOYACÁ - Prof. Universitario (Disciplinario)
      escenarios: [
        {
          contenido: "Usted es Profesional Universitario en la Oficina de Control Interno Disciplinario de la Gobernación de Boyacá. Recibe un informe de auditoría donde se señala que un funcionario encargado de la custodia de computadores portátiles de una institución educativa departamental no realizó el inventario anual y se reporta la pérdida de 10 equipos. Usted debe evaluar la noticia criminal, proyectar el auto de apertura de investigación y determinar si la conducta constituye una falta gravísima por negligencia en el cuidado de los bienes del Estado.",
          categoria: "Derecho Disciplinario", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cuál es la calificación provisional de la falta ante la pérdida de bienes públicos por falta de custodia?",
              opciones: [
                { letra: "A", texto: "Falta gravísima, si se demuestra que hubo dolo o culpa gravísima en la omisión del deber de custodia y cuidado de los bienes.", esCorrecta: true },
                { letra: "B", texto: "Falta leve, porque 10 computadores no son nada comparado con todo el presupuesto que maneja la Gobernación de Boyacá.", esCorrecta: false },
                { letra: "C", texto: "No es falta, ya que el funcionario puede alegar que se le olvidó hacer el inventario porque tenía mucho trabajo acumulado.", esCorrecta: false }
              ],
              explicacion: "La opción A aplica los criterios del Código General Disciplinario sobre la protección del patrimonio público. La B y la C minimizan injustificadamente la gravedad de la conducta."
            },
            {
              texto: "En la etapa de investigación, ¿qué prueba técnica es fundamental recaudar?",
              opciones: [
                { letra: "A", texto: "El manual de funciones del investigado, el acta de entrega de los bienes bajo su responsabilidad y el informe técnico de la pérdida.", esCorrecta: true },
                { letra: "B", texto: "Una encuesta entre los estudiantes para saber si a ellos les gustaban los computadores que se perdieron o si ya estaban viejos.", esCorrecta: false },
                { letra: "C", texto: "El horóscopo del funcionario del día en que se perdieron los equipos para ver si los astros influyeron en su conducta negligente.", esCorrecta: false }
              ],
              explicacion: "La opción A constituye el sustento probatorio documental de la responsabilidad funcional. Las otras opciones carecen de valor jurídico o técnico en un proceso disciplinario."
            },
            {
              texto: "¿Qué acción adicional debe realizar ante la presunta pérdida de los bienes públicos?",
              opciones: [
                { letra: "A", texto: "Compulsar copias a la Fiscalía General y a la Contraloría General para que inicien los procesos penales y fiscales respectivos.", esCorrecta: true },
                { letra: "B", texto: "Llamar al funcionario y decirle que si compra 10 computadores usados en el mercado negro, usted archiva el proceso disciplinario.", esCorrecta: false },
                { letra: "C", texto: "No hacer nada más, para no complicarle la vida al compañero de trabajo que ya está bastante asustado con la investigación.", esCorrecta: false }
              ],
              explicacion: "La opción A cumple con el deber legal de denuncia y el principio de integralidad de la acción estatal. La B es un delito y la C es una omisión del deber funcional."
            }
          ]
        },
        {
          contenido: "Como Profesional en Control Disciplinario en Boyacá, recibe una denuncia anónima detallada sobre presunto acoso laboral de un Jefe de Oficina hacia sus subalternos. La denuncia incluye fechas, testigos y descripción de conductas como gritos en público y asignación de tareas imposibles de cumplir fuera del horario laboral. Usted debe evaluar la credibilidad de la denuncia anónima, decidir si procede la apertura de indagación previa y asegurar la protección de las posibles víctimas mientras se adelanta el proceso.",
          categoria: "Acoso Laboral", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Bajo qué condiciones una denuncia anónima puede dar lugar a una investigación disciplinaria?",
              opciones: [
                { letra: "A", texto: "Cuando contenga datos concretos, verosímiles y pruebas siquiera sumarias que permitan identificar a los autores y la ocurrencia de los hechos.", esCorrecta: true },
                { letra: "B", texto: "Nunca, las denuncias anónimas deben botarse a la basura de inmediato porque quien no da la cara no merece ser escuchado por el Estado.", esCorrecta: false },
                { letra: "C", texto: "Siempre, incluso si la denuncia solo dice 'el jefe es malo' sin dar más detalles, para demostrar que en la Gobernación se escucha a todos.", esCorrecta: false }
              ],
              explicacion: "La opción A sigue la jurisprudencia y la ley sobre el manejo de denuncias anónimas en la gestión pública. La B y la C son posturas extremas e incorrectas."
            },
            {
              texto: "¿Cuál es el fin primordial de la Indagación Previa en este caso de presunto acoso laboral?",
              opciones: [
                { letra: "A", texto: "Identificar e individualizar al posible autor, verificar la ocurrencia de la conducta y determinar si es constitutiva de falta disciplinaria.", esCorrecta: true },
                { letra: "B", texto: "Convencer a las víctimas de que retiren la denuncia para que el clima laboral de la oficina no se vea afectado por procesos legales.", esCorrecta: false },
                { letra: "C", texto: "Castigar al denunciado de inmediato, suspendiendo su sueldo antes de escuchar su versión de los hechos.", esCorrecta: false }
              ],
              explicacion: "La opción A es la finalidad legal de la indagación previa (Ley 1952). La B es una presión indebida y la C vulnera el derecho fundamental al debido proceso."
            },
            {
              texto: "Ante un caso de acoso laboral, ¿qué otra instancia debe intervenir de manera preventiva en la entidad?",
              opciones: [
                { letra: "A", texto: "El Comité de Convivencia Laboral, buscando espacios de conciliación y mejora del clima organizacional antes o durante el proceso.", esCorrecta: true },
                { letra: "B", texto: "El sindicato de la entidad, para que organicen una protesta frente a la casa del jefe denunciado y lo avergüencen públicamente.", esCorrecta: false },
                { letra: "C", texto: "La oficina de prensa, para que publiquen un artículo diciendo que en esa dependencia todos son muy felices y no pasa nada malo.", esCorrecta: false }
              ],
              explicacion: "La opción A cumple con lo establecido en la Ley 1010 de 2006. Las otras opciones son medidas no institucionales o engañosas."
            }
          ]
        }
      ]
    },
    {
      simoId: "240769", // NORTE DE SANTANDER - Prof. Especializado (Programas)
      escenarios: [
        {
          contenido: "Usted es Profesional Especializado en la Gobernación de Norte de Santander. Lidera el seguimiento al Programa de Alimentación Escolar (PAE) en los municipios no certificados del departamento. Los informes de supervisión indican un aumento en la deserción escolar en zonas rurales, y se sospecha que la mala calidad de los complementos nutricionales está influyendo. Usted debe diseñar una metodología de evaluación de impacto que cruce los datos de permanencia escolar con la calidad del servicio PAE, y proyectar las acciones correctivas contractuales contra los operadores que incumplan.",
          categoria: "Políticas Sociales", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Qué herramienta técnica es más eficaz para cruzar los datos de deserción con la calidad del PAE?",
              opciones: [
                { letra: "A", texto: "Un análisis de correlación estadística utilizando los datos del SIMAT (matrículas) y los hallazgos de las interventorías técnicas del PAE.", esCorrecta: true },
                { letra: "B", texto: "Preguntarle al conductor del bus escolar si él cree que los niños dejan de ir a clase porque el pan está muy duro.", esCorrecta: false },
                { letra: "C", texto: "Suponer que los niños no van a clase porque prefieren quedarse jugando en el río y que la comida no tiene nada que ver con el tema.", esCorrecta: false }
              ],
              explicacion: "La opción A utiliza fuentes oficiales y métodos técnicos de análisis de políticas públicas. La B y la C son criterios anecdóticos o prejuicios sin base técnica."
            },
            {
              texto: "Al identificar incumplimientos graves en la calidad de los alimentos, ¿qué medida contractual procede?",
              opciones: [
                { letra: "A", texto: "Iniciar el proceso administrativo sancionatorio, garantizando el debido proceso al contratista, y aplicar las multas o cláusula penal pactadas.", esCorrecta: true },
                { letra: "B", texto: "Pedirle al contratista que le envíe a su casa una caja de frutas de las mejores para que usted no reporte el mal estado de la comida escolar.", esCorrecta: false },
                { letra: "C", texto: "No hacer nada, porque el contratista es una empresa muy grande y poderosa que tiene abogados que pueden demandar a la Gobernación.", esCorrecta: false }
              ],
              explicacion: "La opción A es el cumplimiento del deber legal de supervisión y control contractual. La B es corrupción y la C es cobardía administrativa y omisión del deber."
            },
            {
              texto: "Para mejorar la transparencia del PAE, ¿qué mecanismo de participación ciudadana recomienda?",
              opciones: [
                { letra: "A", texto: "Fortalecer los Comités de Alimentación Escolar (CAE) integrados por padres, docentes y estudiantes para la vigilancia directa del servicio.", esCorrecta: true },
                { letra: "B", texto: "Prohibir que los padres de familia entren a los comedores escolares para que no vean cómo se prepara la comida y no se quejen.", esCorrecta: false },
                { letra: "C", texto: "Hacer una encuesta por Facebook donde solo puedan votar los funcionarios de la Gobernación que no conocen las escuelas rurales.", esCorrecta: false }
              ],
              explicacion: "La opción A promueve el control social efectivo y la transparencia (Lineamientos Ministerio de Educación). La B y la C son medidas que ocultan la realidad y limitan la participación."
            }
          ]
        },
        {
          contenido: "Como Profesional Especializado de la Gobernación, debe coordinar la respuesta institucional a un hallazgo administrativo con incidencia fiscal reportado por la Contraloría General de la República en un programa de vivienda rural. El hallazgo señala sobrecostos en la compra de materiales y falta de soportes de entrega a los beneficiarios. Usted debe liderar el equipo que recopilará las pruebas de descargo, proyectar el plan de mejoramiento institucional y asegurar que se establezcan controles para evitar que se repita la situación en futuros proyectos de inversión.",
          categoria: "Control Fiscal", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cuál es el objetivo principal del Plan de Mejoramiento ante un hallazgo de la Contraloría?",
              opciones: [
                { letra: "A", texto: "Identificar las causas raíz de la falla, establecer acciones correctivas con cronograma y responsables para eliminar el riesgo detectado.", esCorrecta: true },
                { letra: "B", texto: "Escribir un documento muy largo y confuso para que el auditor de la Contraloría se canse de leer y decida cerrar el caso por aburrimiento.", esCorrecta: false },
                { letra: "C", texto: "Culpar a los funcionarios que ya se retiraron de la entidad para que la actual administración no tenga que dar ninguna explicación.", esCorrecta: false }
              ],
              explicacion: "La opción A cumple con la finalidad técnica de los planes de mejoramiento (MIPG/Sistema de Control Interno). La B y la C son tácticas dilatorias o deshonestas."
            },
            {
              texto: "Ante un hallazgo con 'incidencia fiscal', ¿qué significa esto para la entidad?",
              opciones: [
                { letra: "A", texto: "Que existe una presunta pérdida o daño al patrimonio público que debe ser investigado y resarcido por los responsables.", esCorrecta: true },
                { letra: "B", texto: "Que el auditor de la Contraloría quiere que la Gobernación le regale una casa en el campo para él poder jubilarse tranquilo.", esCorrecta: false },
                { letra: "C", texto: "Que la Gobernación ha ganado un premio nacional por el buen manejo del dinero y que habrá una fiesta para celebrarlo.", esCorrecta: false }
              ],
              explicacion: "La opción A define correctamente la incidencia fiscal en el control estatal. La B es un delito y la C es una interpretación delirante de un proceso de auditoría."
            },
            {
              texto: "¿Qué medida de control interno propone para evitar sobrecostos en la compra de materiales?",
              opciones: [
                { letra: "A", texto: "Implementar un sistema de precios de referencia actualizado periódicamente y realizar estudios de mercado rigurosos antes de cada contratación.", esCorrecta: true },
                { letra: "B", texto: "Comprar siempre al mismo proveedor sin pedir otros precios, porque ya le tenemos confianza y él nos da los materiales rápido.", esCorrecta: false },
                { letra: "C", texto: "No comprar nada y esperar a que los materiales aparezcan por donaciones espontáneas de las empresas constructoras de la región.", esCorrecta: false }
              ],
              explicacion: "La opción A es una medida preventiva técnica y legal. La B favorece el direccionamiento de contratos y la C es una gestión administrativa inexistente."
            }
          ]
        }
      ]
    },
    {
      simoId: "240951", // CÚCUTA - Prof. Universitario (Social/Psicología)
      escenarios: [
        {
          contenido: "Usted es Profesional Universitario en la Secretaría de Seguridad Ciudadana de la Alcaldía de Cúcuta. Se le encomienda realizar una intervención comunitaria en un sector de la ciudad con altos índices de violencia intrafamiliar y pandillismo juvenil. Usted debe liderar grupos focales con las familias, identificar los factores de riesgo psicosocial y diseñar una ruta de atención integral que articule a la Comisaría de Familia, la Policía de Infancia y Adolescencia y los programas de juventud de la alcaldía.",
          categoria: "Gestión Social", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cuál es el objetivo primordial del 'Grupo Focal' en esta intervención comunitaria?",
              opciones: [
                { letra: "A", texto: "Recopilar información cualitativa sobre las percepciones, necesidades y miedos de la comunidad para diseñar soluciones pertinentes.", esCorrecta: true },
                { letra: "B", texto: "Darle una charla de 4 horas a la comunidad para que ellos escuchen todo lo que usted sabe sobre psicología sin poder hablar.", esCorrecta: false },
                { letra: "C", texto: "Repartir mercados y regalos para que la gente esté contenta y diga que en el barrio no hay ningún problema de violencia.", esCorrecta: false }
              ],
              explicacion: "La opción A es la función técnica de un grupo focal en investigación social. La B es una comunicación unidireccional ineficaz y la C es asistencialismo que oculta el problema real."
            },
            {
              texto: "Al identificar un caso de maltrato infantil durante la intervención, ¿cuál es su deber legal inmediato?",
              opciones: [
                { letra: "A", texto: "Denunciar de inmediato ante el ICBF o la Comisaría de Familia y activar la ruta de protección para garantizar los derechos del menor.", esCorrecta: true },
                { letra: "B", texto: "Tratar de convencer a los padres de que no le peguen tanto al niño para no tener que llamar a las autoridades y causar problemas.", esCorrecta: false },
                { letra: "C", texto: "Publicar el video del maltrato en sus redes sociales personales para volverse viral y que la gente critique a los padres agresores.", esCorrecta: false }
              ],
              explicacion: "La opción A cumple con el mandato constitucional y legal de protección a la infancia. La B es una omisión negligente y la C vulnera la privacidad y seguridad del menor."
            },
            {
              texto: "¿Qué factor de riesgo psicosocial es fundamental abordar para prevenir el pandillismo juvenil?",
              opciones: [
                { letra: "A", texto: "La falta de oportunidades educativas y de empleo, junto con la ausencia de espacios sanos de recreación y modelos de rol positivos.", esCorrecta: true },
                { letra: "B", texto: "La forma en que se visten los jóvenes, recomendando que todos usen corbata para que dejen de ser pandilleros de inmediato.", esCorrecta: false },
                { letra: "C", texto: "El tipo de música que escuchan, prohibiendo el reggaetón en todo el municipio para eliminar la violencia juvenil por decreto.", esCorrecta: false }
              ],
              explicacion: "La opción A identifica causas estructurales de la problemática social. La B y la C son medidas superficiales e ineficaces que no abordan la raíz del problema."
            }
          ]
        },
        {
          contenido: "Como Profesional en Cúcuta, debe diseñar una campaña de cultura ciudadana orientada a la resolución pacífica de conflictos vecinales (ruido, basuras, uso del espacio público). La campaña busca reducir las riñas y el uso de la fuerza policial en casos menores. Usted debe definir los mensajes pedagógicos, seleccionar los canales de difusión (presenciales y virtuales) y capacitar a líderes comunitarios como mediadores de paz en sus propios barrios, fomentando los valores civilistas y el respeto por el otro.",
          categoria: "Cultura Ciudadana", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Qué enfoque pedagógico es más efectivo para una campaña de resolución de conflictos?",
              opciones: [
                { letra: "A", texto: "El enfoque dialógico, promoviendo la escucha activa, la empatía y la búsqueda de acuerdos de beneficio mutuo entre los vecinos.", esCorrecta: true },
                { letra: "B", texto: "El enfoque punitivo, amenazando con multas de millones de pesos a quien se atreva a tener un conflicto con su vecino.", esCorrecta: false },
                { letra: "C", texto: "El enfoque de ignorancia, sugiriendo a la gente que si tiene un problema con un vecino, simplemente se mude de barrio para evitar líos.", esCorrecta: false }
              ],
              explicacion: "La opción A construye ciudadanía y paz social. La B genera miedo pero no resuelve el conflicto de fondo y la C es una solución inviable para la mayoría de las personas."
            },
            {
              texto: "Para capacitar a los líderes comunitarios como mediadores, ¿qué habilidad técnica debe priorizar?",
              opciones: [
                { letra: "A", texto: "La comunicación asertiva y la técnica de mediación neutral, para que ayuden a las partes a encontrar sus propias soluciones.", esCorrecta: true },
                { letra: "B", texto: "El uso de la fuerza física para separar a los vecinos que se estén peleando y obligarlos a darse la mano por la fuerza.", esCorrecta: false },
                { letra: "C", texto: "La capacidad de decidir quién tiene la razón basándose en quién es el vecino que mejor le cae al líder comunitario.", esCorrecta: false }
              ],
              explicacion: "La opción A es la base de la mediación comunitaria. La B es ilegal y peligrosa, y la C vulnera el principio de imparcialidad de la mediación."
            },
            {
              texto: "¿Cuál es el fin último de una política de cultura ciudadana en el municipio de Cúcuta?",
              opciones: [
                { letra: "A", texto: "Transformar comportamientos colectivos para mejorar la convivencia, el respeto por lo público y la calidad de vida urbana.", esCorrecta: true },
                { letra: "B", texto: "Que el Alcalde gane un premio internacional de 'Simpatía' y que la ciudad se vea bonita en los comerciales de televisión.", esCorrecta: false },
                { letra: "C", texto: "Gastar todo el presupuesto de la Secretaría de Seguridad en fiestas de barrio para que la gente se olvide de sus problemas por un día.", esCorrecta: false }
              ],
              explicacion: "La opción A define el propósito técnico y social de la cultura ciudadana. Las otras opciones son fines políticos o usos indebidos del presupuesto."
            }
          ]
        }
      ]
    },
    {
      simoId: "240990", // CÚCUTA - Técnico Operativo (Desarrollo Empresarial)
      escenarios: [
        {
          contenido: "Usted es Técnico Operativo en la Secretaría de Desarrollo Económico de la Alcaldía de Cúcuta. Debe brindar asistencia técnica a una asociación de artesanos que fabrica productos de marroquinería en la zona de frontera. La asociación tiene problemas para comercializar sus productos porque no cuentan con registro de marca, sus procesos de producción son ineficientes y no cumplen con estándares de empaque para exportación. Usted debe orientarlos en el proceso de formalización, mejora de procesos y vinculación a programas de fomento empresarial del orden nacional.",
          categoria: "Desarrollo Empresarial", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Qué paso inicial de formalización técnica es indispensable para la asociación de artesanos?",
              opciones: [
                { letra: "A", texto: "La obtención de la Personería Jurídica, la inscripción en Cámara de Comercio y la obtención del RUT ante la DIAN.", esCorrecta: true },
                { letra: "B", texto: "Mandarse a hacer tarjetas de presentación lujosas con títulos inventados para que los clientes crean que son una multinacional.", esCorrecta: false },
                { letra: "C", texto: "Comprar una oficina grande en el centro de Cúcuta antes de tener el primer cliente o haber vendido el primer cinturón.", esCorrecta: false }
              ],
              explicacion: "La opción A es el camino legal y técnico de formalización empresarial en Colombia. La B es un engaño y la C es un error de planeación financiera básica."
            },
            {
              texto: "Para mejorar la eficiencia en la producción de marroquinería, ¿qué recomendación técnica ofrece?",
              opciones: [
                { letra: "A", texto: "Implementar un diagrama de flujo del proceso productivo para identificar cuellos de botella y optimizar el uso de materias primas y tiempo.", esCorrecta: true },
                { letra: "B", texto: "Decirle a los artesanos que trabajen más rápido y que duerman menos horas para que la producción aumente 'mágicamente'.", esCorrecta: false },
                { letra: "C", texto: "Usar materiales de mala calidad (plástico en vez de cuero) para que el producto sea más barato de fabricar aunque se rompa rápido.", esCorrecta: false }
              ],
              explicacion: "La opción A aplica herramientas básicas de ingeniería industrial y gestión de operaciones. La B afecta la salud del trabajador y la C destruye la reputación de la marca."
            },
            {
              texto: "Respecto al empaque para exportación, ¿qué estándar debe considerar en su asistencia técnica?",
              opciones: [
                { letra: "A", texto: "Cumplir con las normas de rotulado, protección física del producto y sostenibilidad de los materiales exigidas por los mercados destino.", esCorrecta: true },
                { letra: "B", texto: "Envolver los productos en papel de regalo con moños grandes para que el agente de aduana piense que es un obsequio personal.", esCorrecta: false },
                { letra: "C", texto: "No ponerle empaque a nada para ahorrar costos de transporte, asumiendo que el cuero es muy resistente y no se raya.", esCorrecta: false }
              ],
              explicacion: "La opción A es el criterio técnico para la competitividad internacional. La B es un intento de evasión de controles y la C es una negligencia logística."
            }
          ]
        },
        {
          contenido: "Como Técnico Operativo en Cúcuta, realiza una visita de seguimiento a un proyecto productivo de una microempresa de confecciones que recibió capital semilla de la Alcaldía. Al llegar, nota que la maquinaria comprada con los recursos públicos no está siendo utilizada para el proyecto, sino que el dueño la está alquilando a terceros de forma informal. El beneficiario alega que 'el negocio de la ropa está malo' y que el alquiler le da ingresos fijos. Usted debe reportar la novedad, verificar el cumplimiento de las obligaciones del contrato de donación y recomendar las acciones legales por uso indebido de recursos públicos.",
          categoria: "Seguimiento a Proyectos", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cuál es la consecuencia técnica del hallazgo del uso indebido de la maquinaria?",
              opciones: [
                { letra: "A", texto: "Constituye un incumplimiento grave de las obligaciones del beneficiario, lo que puede dar lugar a la revocatoria del beneficio y la devolución de los bienes.", esCorrecta: true },
                { letra: "B", texto: "Es una muestra de emprendimiento por parte del dueño, ya que está buscando diferentes fuentes de ingresos con lo que le dio el Estado.", esCorrecta: false },
                { letra: "C", texto: "Usted debe pedirle al dueño una parte del dinero del alquiler para no contarle a su jefe en la Alcaldía lo que está pasando.", esCorrecta: false }
              ],
              explicacion: "La opción A protege la finalidad del gasto público y el cumplimiento de metas del proyecto. La B ignora la destinación específica de los recursos y la C es un delito (concusión)."
            },
            {
              texto: "Al redactar el informe de la visita técnica, ¿qué debe incluir obligatoriamente?",
              opciones: [
                { letra: "A", texto: "La descripción objetiva de los hechos encontrados, el registro fotográfico de la maquinaria y la confrontación con los compromisos firmados.", esCorrecta: true },
                { letra: "B", texto: "Una lista de excusas que el beneficiario le dio a usted para que el informe no parezca tan negativo y no lo sancionen.", esCorrecta: false },
                { letra: "C", texto: "Su opinión personal sobre si el beneficiario le pareció una 'buena persona' o no, independientemente de lo que hizo con las máquinas.", esCorrecta: false }
              ],
              explicacion: "La opción A garantiza la veracidad y utilidad probatoria del informe técnico. La B es una falta a la ética y la C es un criterio subjetivo irrelevante."
            },
            {
              texto: "¿Qué principio de la administración pública se vulnera cuando un particular usa para fin privado bienes comprados con recursos de fomento?",
              opciones: [
                { letra: "A", texto: "El principio de Moralidad Administrativa y la Eficiencia en el uso de los recursos escasos del Estado.", esCorrecta: true },
                { letra: "B", texto: "El principio de Solidaridad, porque el particular debería poder usar los bienes del Estado como si fueran suyos.", esCorrecta: false },
                { letra: "C", texto: "El principio de Secreto, porque nadie debería enterarse de cómo se gasta el dinero de los proyectos productivos de la ciudad.", esCorrecta: false }
              ],
              explicacion: "La opción A es el fundamento ético y legal de la gestión de recursos públicos. Las otras opciones son interpretaciones erróneas o contrarias a la transparencia."
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
