import { PrismaClient, TipoPregunta, NivelDificultad } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const dataToInsert: any[] = [
    {
      simoId: "240166", // AGUACHICA - Prof. Universitario (Psicólogo)
      escenarios: [
        {
          contenido: "Usted es Psicólogo en la Comisaría de Familia de Aguachica. Debe realizar la evaluación psicológica a un adolescente de 14 años que ha sido aprehendido por presunto consumo de sustancias psicoactivas y deserción escolar. Durante la entrevista, el adolescente manifiesta que sufre maltrato físico por parte de su padrastro. Usted debe realizar la valoración forense inicial, emitir el concepto técnico integral para el Comisario y coordinar con la red de salud para el inicio de un proceso de desintoxicación y apoyo psicosocial familiar.",
          categoria: "Psicología Forense / Restablecimiento", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cuál es el objetivo primordial de la entrevista psicológica en este contexto de restablecimiento de derechos?",
              opciones: [
                { letra: "A", texto: "Identificar factores de riesgo, vulnerabilidad y protección del adolescente para orientar la medida de restablecimiento más idónea.", esCorrecta: true },
                { letra: "B", texto: "Lograr que el adolescente confiese todos sus delitos para que la policía lo pueda meter a la cárcel más rápido.", esCorrecta: false },
                { letra: "C", texto: "Hacerse amigo del adolescente para que le cuente chismes sobre lo que pasa en su barrio de Aguachica.", esCorrecta: false }
              ],
              explicacion: "La opción A define la labor técnica y ética del psicólogo en la Comisaría de Familia. Las otras opciones son abusivas o no profesionales."
            },
            {
              texto: "Ante el relato de maltrato físico por parte del padrastro, ¿qué acción debe priorizar?",
              opciones: [
                { letra: "A", texto: "Reportar de inmediato el hallazgo al Comisario de Familia para que se incluya en el PARD y se dicten medidas de protección urgentes.", esCorrecta: true },
                { letra: "B", texto: "Ir a la casa del padrastro a pelear con él personalmente para que aprenda a respetar a los niños.", esCorrecta: false },
                { letra: "C", texto: "Decirle al adolescente que no sea exagerado y que aguante un poco más porque la familia es sagrada.", esCorrecta: false }
              ],
              explicacion: "La opción A cumple con el deber legal de protección y activación de rutas. Las otras opciones son vías de hecho o negligencias peligrosas."
            },
            {
              texto: "¿Qué principio rige la valoración psicosocial de niños y adolescentes según el Código de Infancia?",
              opciones: [
                { letra: "A", texto: "El Interés Superior del Menor, asegurando que su bienestar y derechos prevalezcan sobre cualquier otra consideración.", esCorrecta: true },
                { letra: "B", texto: "El principio de Economía, tratando de gastar lo menos posible en terapias para los niños pobres del municipio.", esCorrecta: false },
                { letra: "C", texto: "El principio de Adultocentrismo, dándole siempre la razón a los padres sin importar lo que el niño sienta o diga.", esCorrecta: false }
              ],
              explicacion: "La opción A es el mandato constitucional y legal. Las otras opciones son contrarias a la doctrina de protección integral."
            }
          ]
        },
        {
          contenido: "Como Psicólogo en Aguachica, debe atender un caso de violencia intrafamiliar donde la víctima es una mujer de la tercera edad abandonada por sus hijos. Usted debe realizar la visita domiciliaria, valorar el estado emocional y cognitivo de la mujer, y proponer un plan de intervención que incluya la vinculación a centros de vida día y la exigencia de cuota alimentaria a sus descendientes a través de la vía legal.",
          categoria: "Intervención Psicosocial Tercera Edad", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Qué herramienta técnica utiliza para valorar el estado de abandono y riesgo social?",
              opciones: [
                { letra: "A", texto: "La visita domiciliaria con aplicación de instrumentos de valoración social y psicológica (ej. Escala de Gijón, valoración de redes de apoyo).", esCorrecta: true },
                { letra: "B", texto: "Mirar la casa desde afuera por la ventana y asumir que si está sucia es porque la señora está abandonada.", esCorrecta: false },
                { letra: "C", texto: "Preguntarle al tendero de la esquina si él cree que los hijos de la señora son buenas personas o no.", esCorrecta: false }
              ],
              explicacion: "La opción A utiliza instrumentos técnicos de trabajo social y psicología. Las otras opciones carecen de rigor profesional."
            },
            {
              texto: "En cuanto a la obligación de los hijos hacia los padres adultos mayores, ¿qué establece la ley?",
              opciones: [
                { letra: "A", texto: "Los hijos tienen la obligación legal y moral de brindar alimentos, cuidado y protección a sus padres, so pena de sanciones civiles y penales.", esCorrecta: true },
                { letra: "B", texto: "Que los hijos solo deben ayudar a los padres si les sobra dinero después de irse de vacaciones.", esCorrecta: false },
                { letra: "C", texto: "Que el Estado es el único responsable de cuidar a los ancianos y que las familias pueden desentenderse totalmente de ellos.", esCorrecta: false }
              ],
              explicacion: "La opción A refleja la corresponsabilidad familia-sociedad-estado establecida en la Constitución y la Ley 1850 de 2017. Las otras opciones son erróneas."
            },
            {
              texto: "¿Qué valor del servidor público se destaca al proteger a la población adulta mayor vulnerable?",
              opciones: [
                { letra: "A", texto: "La Justicia y la Dignidad Humana, garantizando que el adulto mayor viva sus últimos años con respeto y protección institucional.", esCorrecta: true },
                { letra: "B", texto: "La Lástima, llorando junto a la anciana para que ella se sienta acompañada en su tristeza.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'No molestarse', tratando de que el caso se resuelva rápido para no tener que volver a visitar ese barrio tan lejos.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la gestión con los valores éticos superiores. Las otras opciones son sentimientos o posturas no profesionales."
            }
          ]
        }
      ]
    },
    {
      simoId: "227878", // BOYACÁ - Prof. Universitario (Contratación)
      escenarios: [
        {
          contenido: "Usted es Profesional en el área de contratación de la Gobernación de Boyacá. Debe revisar las garantías (pólizas) presentadas por un contratista para un proyecto de pavimentación de una vía secundaria. Identifica que la póliza de estabilidad de la obra tiene un valor asegurado inferior al 20% del valor total del contrato exigido en los pliegos de condiciones. Usted debe proyectar la comunicación de rechazo de la garantía, solicitar la corrección inmediata y asegurar que no se firme el acta de inicio hasta que la cobertura sea la adecuada.",
          categoria: "Contratación / Garantías", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cuál es la función técnica de la póliza de estabilidad de la obra en un contrato de infraestructura?",
              opciones: [
                { letra: "A", texto: "Garantizar que el contratista repare los daños que surjan en la vía por fallas en la construcción durante un periodo determinado tras la entrega.", esCorrecta: true },
                { letra: "B", texto: "Asegurar que el Gobernador de Boyacá tenga un seguro de vida por si se cae caminando por la vía nueva.", esCorrecta: false },
                { letra: "C", texto: "Pagarle las vacaciones a los ingenieros de la Gobernación si la obra se termina antes de tiempo.", esCorrecta: false }
              ],
              explicacion: "La opción A define el fin legal de la garantía de estabilidad. Las otras opciones son absurdas."
            },
            {
              texto: "Ante el error en el valor asegurado de la póliza, ¿cuál es el procedimiento legal?",
              opciones: [
                { letra: "A", texto: "No aprobar la garantía, informar al contratista sobre el incumplimiento del pliego y exigir el anexo modificatorio con el valor correcto.", esCorrecta: true },
                { letra: "B", texto: "Aprobarla así para no retrasar el inicio de la obra y rezar para que la vía no se dañe en los próximos diez años.", esCorrecta: false },
                { letra: "C", texto: "Pedirle al contratista que le regale el dinero que falta en efectivo para guardarlo en la caja menor de la Gobernación.", esCorrecta: false }
              ],
              explicacion: "La opción A cumple con el deber de vigilancia precontractual y contractual. Las otras opciones son negligencias o actos de corrupción."
            },
            {
              texto: "¿Qué principio rige la publicación de los documentos contractuales en el SECOP?",
              opciones: [
                { letra: "A", texto: "El principio de Publicidad y Transparencia, permitiendo el control social sobre el uso de los recursos del departamento.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'Esconder la Verdad', publicando solo los documentos que hagan ver bien a la administración departamental.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Papeleo por Papeleo', subiendo documentos al azar solo para que el sistema no arroje alertas rojas.", esCorrecta: false }
              ],
              explicacion: "La opción A es el fundamento de la transparencia en la contratación estatal. Las otras opciones son visiones negativas o erróneas."
            }
          ]
        },
        {
          contenido: "Como Profesional de Contratación en Boyacá, atiende una solicitud de un ciudadano que pide acceso a las propuestas económicas de todos los participantes en una licitación que ya fue adjudicada. Usted debe verificar si existe reserva legal sobre alguna información técnica (secretos industriales), proyectar el acto administrativo de respuesta y garantizar el acceso a la información pública en cumplimiento de la Ley 1712 de 2014.",
          categoria: "Transparencia Contractual", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Son públicas las propuestas de los oferentes en un proceso de licitación pública?",
              opciones: [
                { letra: "A", texto: "Sí, una vez cerrado el proceso y adjudicado el contrato, las propuestas son documentos públicos accesibles a cualquier ciudadano, salvo información bajo reserva legal expresa.", esCorrecta: true },
                { letra: "B", texto: "No, son propiedad privada de las empresas y nadie puede ver cuánto dinero cobraron por el trabajo.", esCorrecta: false },
                { letra: "C", texto: "Solo pueden verlas los familiares de los dueños de las empresas que perdieron la licitación para que puedan llorar juntos.", esCorrecta: false }
              ],
              explicacion: "La opción A refleja el principio de transparencia en la contratación del Estado. Las otras opciones son erróneas."
            },
            {
              texto: "Al entregar la información, ¿qué precaución debe tomar respecto a los datos personales?",
              opciones: [
                { letra: "A", texto: "Anonimizar datos sensibles como números de cuenta personales, direcciones de residencia de empleados o teléfonos privados, protegiendo la privacidad.", esCorrecta: true },
                { letra: "B", texto: "Entregar todo tal cual sin revisar nada, si alguien tiene problemas de privacidad que demande a la empresa que mandó la propuesta.", esCorrecta: false },
                { letra: "C", texto: "Cobrarle al ciudadano una 'tarifa de fotocopiado premium' diez veces más cara de lo normal para desanimarlo de pedir información.", esCorrecta: false }
              ],
              explicacion: "La opción A cumple con la Ley de Protección de Datos (1581) sin vulnerar la Ley de Transparencia. Las otras opciones son negligencias o abusos."
            },
            {
              texto: "¿Qué valor del servidor público se destaca al facilitar el control ciudadano sobre la contratación?",
              opciones: [
                { letra: "A", texto: "La Honestidad y la Apertura, promoviendo una cultura de integridad y lucha contra la corrupción en el departamento.", esCorrecta: true },
                { letra: "B", texto: "La Cobardía, teniendo miedo de decirle que no al ciudadano para no tener problemas legales.", esCorrecta: false },
                { letra: "C", texto: "La Indiferencia, entregando los papeles rápido para que el ciudadano se vaya y lo deje seguir mirando el paisaje de Boyacá.", esCorrecta: false }
              ],
              explicacion: "La opción A es un pilar del Código de Integridad. Las otras opciones son interpretaciones negativas de una conducta ética."
            }
          ]
        }
      ]
    },
    {
      simoId: "238272", // NEIVA - Prof. Universitario (Salud/Nutrición)
      escenarios: [
        {
          contenido: "Usted es Profesional de Nutrición en la Secretaría de Salud de Neiva. Debe liderar un programa de prevención de la obesidad infantil en colegios públicos. Nota que las tiendas escolares siguen vendiendo productos ultraprocesados con altos niveles de azúcar a pesar de la normatividad vigente. Usted debe realizar la inspección a los menús escolares, capacitar a los manipuladores de alimentos en dietas balanceadas y proyectar el informe técnico para que la Secretaría de Educación tome medidas correctivas contra los operadores de las tiendas.",
          categoria: "Seguridad Alimentaria y Nutrición", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cuál es el fundamento técnico para restringir la venta de productos ultraprocesados en colegios?",
              opciones: [
                { letra: "A", texto: "La evidencia científica sobre el impacto negativo del azúcar y grasas trans en el desarrollo infantil y el cumplimiento de la Ley 2120 de 2021 (Comida Chatarra).", esCorrecta: true },
                { letra: "B", texto: "Que los empaques de los dulces son muy ruidosos y distraen a los niños durante las clases de matemáticas.", esCorrecta: false },
                { letra: "C", texto: "Que el Alcalde de Neiva prefiere que los niños coman solo frutas que crezcan en el departamento del Huila.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la gestión con las políticas de salud pública y la legislación nacional. Las otras opciones son argumentos banales o puramente regionalistas."
            },
            {
              texto: "Al capacitar a los manipuladores de alimentos, ¿qué concepto de 'dieta balanceada' debe priorizar?",
              opciones: [
                { letra: "A", texto: "La inclusión proporcional de todos los grupos de alimentos (proteínas, carbohidratos, frutas y verduras) según la edad y necesidades calóricas de los niños.", esCorrecta: true },
                { letra: "B", texto: "Decirles que les den mucha sopa a los niños porque la sopa llena rápido y es más barata de producir.", esCorrecta: false },
                { letra: "C", texto: "Permitir que los niños coman lo que quieran siempre y cuando prometan que van a hacer ejercicio después del recreo.", esCorrecta: false }
              ],
              explicacion: "La opción A es el criterio técnico nutricional profesional. Las otras opciones son empíricas, ineficaces o irresponsables."
            },
            {
              texto: "¿Qué principio de la función pública se destaca al proteger la salud de la infancia en Neiva?",
              opciones: [
                { letra: "A", texto: "El principio de Interés Superior del Niño y la Responsabilidad del Estado en la garantía de derechos fundamentales como la salud y la vida.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'Prohibir por Prohibir', demostrando que la Secretaría de Salud tiene el poder de decidir qué se vende en las tiendas.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Gasto Eficiente', tratando de que los operadores de las tiendas gasten menos dinero en ingredientes caros.", esCorrecta: false }
              ],
              explicacion: "La opción A es el mandato constitucional para la protección de la niñez. Las otras opciones son visiones autoritarias o puramente financieras."
            }
          ]
        },
        {
          contenido: "Como Profesional de Salud en Neiva, debe asesorar a una EPS sobre la implementación de programas de detección temprana de la diabetes en población adulta mayor de estratos 1 y 2. Nota que la EPS tiene bajas tasas de tamizaje en estas zonas. Usted debe proponer una estrategia de búsqueda activa comunitaria, coordinar con las juntas de acción comunal y asegurar que los pacientes detectados ingresen efectivamente a la ruta de atención integral en salud.",
          categoria: "Gestión en Salud Pública", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Qué herramienta técnica de salud pública recomienda para aumentar el tamizaje en zonas vulnerables?",
              opciones: [
                { letra: "A", texto: "La realización de micro-jornadas de salud en los salones comunales y la labor de los Equipos Básicos de Salud realizando tamizajes casa a casa.", esCorrecta: true },
                { letra: "B", texto: "Enviar un mensaje de texto masivo diciendo que si no se hacen la prueba del azúcar les van a quitar el subsidio de Familias en Acción.", esCorrecta: false },
                { letra: "C", texto: "Poner un aviso en la puerta del hospital central de Neiva y esperar a que los ancianos del barrio más lejano lleguen caminando solitos.", esCorrecta: false }
              ],
              explicacion: "La opción A es la estrategia de atención primaria en salud (APS) efectiva para poblaciones con barreras de acceso. Las otras opciones son coercitivas o ineficaces."
            },
            {
              texto: "Al detectar un paciente con niveles altos de glucosa, ¿cuál es su responsabilidad?",
              opciones: [
                { letra: "A", texto: "Asegurar el reporte al sistema de información, dar la orientación inicial y verificar que la EPS le asigne la cita de confirmación diagnóstica en menos de 48 horas.", esCorrecta: true },
                { letra: "B", texto: "Decirle que deje de comer pan y que se tome un jugo de limón todas las mañanas para curarse solo de la diabetes.", esCorrecta: false },
                { letra: "C", texto: "Preguntarle si tiene dinero para pagar los exámenes y si dice que no, decirle que mejor no se preocupe por su salud.", esCorrecta: false }
              ],
              explicacion: "La opción A garantiza la continuidad en la ruta de atención integral. Las otras opciones son negligencias médicas o discriminaciones por capacidad de pago."
            },
            {
              texto: "¿Qué valor de la integridad pública se pone a prueba al exigirle resultados a una EPS privada?",
              opciones: [
                { letra: "A", texto: "La Justicia y el Compromiso, actuando como garante del derecho a la salud del ciudadano frente a posibles ineficiencias del asegurador.", esCorrecta: true },
                { letra: "B", texto: "La Arrogancia, queriendo demostrar que los funcionarios de la Alcaldía mandan sobre los gerentes de las empresas privadas.", esCorrecta: false },
                { letra: "C", texto: "La Amistad, aceptando invitaciones a cenas elegantes de los dueños de la EPS a cambio de no reportar sus bajas metas de salud.", esCorrecta: false }
              ],
              explicacion: "La opción A define el rol regulador y protector del Estado. Las otras opciones son conductas arrogantes o actos de corrupción."
            }
          ]
        }
      ]
    },
    {
      simoId: "235454", // AMAZONAS - Prof. Universitario (Talento Humano)
      escenarios: [
        {
          contenido: "Usted es Profesional de Talento Humano en la Gobernación de Amazonas. Debe diseñar el Plan Institucional de Capacitación (PIC) para los servidores públicos de la entidad, considerando la alta dispersión geográfica y las dificultades de conectividad en los corregimientos departamentales. Usted debe identificar las necesidades de formación basadas en la evaluación del desempeño, proponer metodologías híbridas y asegurar que el PIC se alinee con el Plan de Desarrollo Departamental 'Amazonas para Todos'.",
          categoria: "Gestión del Talento Humano / PIC", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cuál es el insumo técnico primordial para determinar qué capacitaciones necesitan los funcionarios de la Gobernación?",
              opciones: [
                { letra: "A", texto: "Los resultados de la Evaluación del Desempeño Laboral (EDL) y el diagnóstico de brechas de competencias transversales y específicas.", esCorrecta: true },
                { letra: "B", texto: "Hacer una encuesta en Instagram para ver qué temas de capacitación tienen más 'likes' entre los empleados de la entidad.", esCorrecta: false },
                { letra: "C", texto: "Preguntarle al Gobernador qué libro leyó el último fin de semana y obligar a todos los funcionarios a tomar una clase sobre ese tema.", esCorrecta: false }
              ],
              explicacion: "La opción A es el procedimiento técnico estándar de la función pública para la planeación del talento humano. Las otras opciones carecen de rigor administrativo."
            },
            {
              texto: "Ante la falta de internet en los corregimientos alejados del Amazonas, ¿qué metodología de capacitación propone?",
              opciones: [
                { letra: "A", texto: "El envío de kits pedagógicos físicos (módulos impresos) combinados con sesiones presenciales itinerantes de formadores en las zonas.", esCorrecta: true },
                { letra: "B", texto: "Obligar a los funcionarios a que viajen 10 horas en lancha hasta Leticia cada vez que tengan que tomar una clase de 1 hora por internet.", esCorrecta: false },
                { letra: "C", texto: "No capacitarlos, asumiendo que como viven lejos no necesitan aprender nada nuevo para cumplir con su trabajo.", esCorrecta: false }
              ],
              explicacion: "La opción A es una solución técnica realista y equitativa para un territorio con brechas digitales. Las otras opciones son ineficientes o discriminatorias."
            },
            {
              texto: "¿Qué principio rige la gestión del talento humano en la administración pública colombiana?",
              opciones: [
                { letra: "A", texto: "El Mérito y la Transparencia, asegurando que la formación contribuya a la excelencia en el servicio al ciudadano.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'Clientelismo', capacitando solo a los que ayudaron en la campaña política del Gobernador.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Ahorro de Salarios', capacitando a la gente para que haga más trabajo sin pagarle nada extra por su mayor productividad.", esCorrecta: false }
              ],
              explicacion: "La opción A es el fundamento de la carrera administrativa. Las otras opciones son prácticas corruptas o visiones mediocres."
            }
          ]
        },
        {
          contenido: "Como Profesional de Talento Humano en Amazonas, debe coordinar la implementación del Código de Integridad entre los funcionarios de la Secretaría de Desarrollo. Identifica que hay conductas de trato descortés hacia la población indígena que acude a solicitar ayudas. Usted debe diseñar una estrategia de sensibilización que respete la diversidad cultural, proponer talleres de ética pública y asegurar que los valores de Honestidad y Respeto sean vividos en el día a día de la oficina, midiendo el cambio en la satisfacción del ciudadano.",
          categoria: "Cultura Organizacional e Integridad", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cuál es el primer paso para implementar el Código de Integridad en una entidad pública?",
              opciones: [
                { letra: "A", texto: "La socialización de los valores del código (Honestidad, Respeto, Compromiso, Diligencia, Justicia) mediante ejercicios prácticos y el ejemplo de los líderes.", esCorrecta: true },
                { letra: "B", texto: "Pegar los carteles del código con mucho pegamento en todas las puertas de los baños para que nadie deje de leerlos.", esCorrecta: false },
                { letra: "C", texto: "Hacer un examen escrito de 100 preguntas y despedir a quien no se sepa de memoria todos los párrafos del Código de Integridad.", esCorrecta: false }
              ],
              explicacion: "La opción A refleja la metodología de gestión del cambio propuesta por Función Pública. Las otras opciones son medidas superficiales o autoritarias e ilegales."
            },
            {
              texto: "Al trabajar con población indígena, ¿qué valor del código debe resaltarse especialmente?",
              opciones: [
                { letra: "A", texto: "El Respeto, reconociendo el valor de la diversidad cultural y brindando una atención incluyente y digna a las comunidades étnicas.", esCorrecta: true },
                { letra: "B", texto: "La Diligencia, atendiendo a los indígenas muy rápido para que se vayan pronto de la oficina y no 'afeen' el salón de espera.", esCorrecta: false },
                { letra: "C", texto: "La Curiosidad, haciéndoles muchas preguntas personales sobre sus costumbres tradicionales solo por diversión del funcionario.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la actuación con los mandatos de pluralismo étnico de la Constitución. Las otras opciones son discriminatorias o irrespetuosas."
            },
            {
              texto: "¿Qué herramienta técnica recomienda para medir si la cultura de integridad está mejorando?",
              opciones: [
                { letra: "A", texto: "La aplicación de encuestas de Clima Organizacional y el seguimiento a los indicadores de quejas y reclamos por mal trato (PQR).", esCorrecta: true },
                { letra: "B", texto: "Contar cuántas veces al día los funcionarios dicen 'buenos días' y asumir que si saludan mucho son muy íntegros.", esCorrecta: false },
                { letra: "C", texto: "No medir nada, confiando en que después de los talleres todos los funcionarios se volvieron buenas personas mágicamente.", esCorrecta: false }
              ],
              explicacion: "La opción A utiliza indicadores objetivos de gestión del talento humano. Las otras opciones carecen de rigor técnico."
            }
          ]
        }
      ]
    },
    {
      simoId: "241409", // SALUD NS - Auxiliar Salud (Apoyo Administrativo)
      escenarios: [
        {
          contenido: "Usted es Auxiliar en el Instituto Departamental de Salud de Norte de Santander. Debe apoyar la gestión documental de las solicitudes de habilitación de nuevas IPS en la ciudad de Cúcuta. Nota que varios expedientes tienen documentos con fechas vencidas (pólizas, certificados de equipos biomédicos). Usted debe realizar la revisión exhaustiva de cada carpeta, informar al supervisor sobre los faltantes y mantener el archivo organizado cronológicamente para que la comisión de habilitación pueda realizar las visitas técnicas sin contratiempos.",
          categoria: "Gestión Documental en Salud", dificultad: "BASICO",
          preguntas: [
            {
              texto: "¿Cuál es su responsabilidad técnica al detectar un documento vencido en el expediente de habilitación?",
              opciones: [
                { letra: "A", texto: "Registrar la novedad en la lista de chequeo del expediente e informar de inmediato al profesional encargado para que se realice el requerimiento de subsanación.", esCorrecta: true },
                { letra: "B", texto: "Usar un corrector líquido (liquid paper) para cambiarle la fecha al documento y que parezca que todavía está vigente.", esCorrecta: false },
                { letra: "C", texto: "Esconder el documento vencido al final del expediente esperando que los auditores no lo vean durante la revisión técnica.", esCorrecta: false }
              ],
              explicacion: "La opción A garantiza el cumplimiento de los estándares de calidad en salud (Resolución 3100). Las otras opciones son actos de fraude o negligencia administrativa."
            },
            {
              texto: "En cuanto a la organización del archivo, ¿qué debe asegurar según las Tablas de Retención Documental (TRD)?",
              opciones: [
                { letra: "A", texto: "Que cada expediente esté foliado, clasificado por series y guardado en carpetas libres de ácido para su conservación a largo plazo.", esCorrecta: true },
                { letra: "B", texto: "Que las carpetas estén organizadas por el color de la portada para que el archivo del Instituto se vea más decorado.", esCorrecta: false },
                { letra: "C", texto: "Que los documentos más viejos se boten a la basura cada vez que la bodega del archivo esté muy llena de papeles.", esCorrecta: false }
              ],
              explicacion: "La opción A es el procedimiento técnico archivístico oficial. Las otras opciones son criterios irrelevantes o destructivos del patrimonio documental."
            },
            {
              texto: "¿Qué principio de la función pública se destaca al realizar un apoyo administrativo riguroso en el sector salud?",
              opciones: [
                { letra: "A", texto: "La Responsabilidad y la Eficacia, asegurando que las IPS cumplan con los requisitos mínimos para prestar servicios seguros a la comunidad.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'Trámites Lentos', tratando de que las clínicas se demoren mucho en abrir para que no haya competencia.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Favoritismo', ayudando a que las carpetas de sus amigos estén siempre de primeras en la lista de revisión.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la labor auxiliar con los objetivos superiores de calidad en salud. Las otras opciones son conductas negligentes o corruptas."
            }
          ]
        },
        {
          contenido: "Como Auxiliar del Instituto de Salud, apoya la activación de un plan de contingencia ante un aumento inusual de casos de sarampión en la zona de frontera. Debe colaborar en la logística de distribución de biológicos a los puntos de vacunación, registrar la salida de insumos en las bases de datos y citar a los funcionarios a las reuniones de emergencia del comité epidemiológico, asegurando que la información fluya de manera oportuna entre las áreas del instituto.",
          categoria: "Apoyo en Emergencias de Salud Pública", dificultad: "BASICO",
          preguntas: [
            {
              texto: "¿Cuál es su función técnica al citar a una reunión de emergencia del comité epidemiológico?",
              opciones: [
                { letra: "A", texto: "Asegurar que la convocatoria llegue a todos los integrantes, confirmar la asistencia y preparar los insumos documentales (actas, informes previos) necesarios.", esCorrecta: true },
                { letra: "B", texto: "Llamar solo a los funcionarios que le caen bien para que la reunión sea más amena y no haya discusiones técnicas difíciles.", esCorrecta: false },
                { letra: "C", texto: "Publicar un grito en el pasillo del instituto diciendo '¡reunión ya!' y ver quién llega al salón de juntas.", esCorrecta: false }
              ],
              explicacion: "La opción A define la labor administrativa profesional de apoyo a órganos colegiados. Las otras opciones son informales e ineficientes."
            },
            {
              texto: "Al registrar la salida de biológicos (vacunas), ¿qué dato es vital para el control del inventario?",
              opciones: [
                { letra: "A", texto: "El número de lote, la fecha de vencimiento, la cantidad de dosis y la temperatura de salida del refrigerador de la cava.", esCorrecta: true },
                { letra: "B", texto: "El nombre del conductor del camión y si el camión es de color blanco o gris.", esCorrecta: false },
                { letra: "C", texto: "Cuántas cajas de vacunas le pareció a usted que salieron basándose en un vistazo rápido desde lejos.", esCorrecta: false }
              ],
              explicacion: "La opción A es el registro técnico obligatorio para la trazabilidad y seguridad de los medicamentos. Las otras opciones carecen de rigor administrativo."
            },
            {
              texto: "¿Qué valor del servidor público se destaca al trabajar bajo presión durante una alerta de salud pública?",
              opciones: [
                { letra: "A", texto: "El Compromiso y la Diligencia, actuando con prontitud para proteger la salud de la comunidad frente a un brote de enfermedad.", esCorrecta: true },
                { letra: "B", texto: "El Pánico, saliendo corriendo de la oficina para no contagiarse de sarampión mientras organiza los papeles.", esCorrecta: false },
                { letra: "C", texto: "La Indiferencia, tomándose su tiempo para registrar los datos aunque las vacunas se necesiten urgente en la frontera.", esCorrecta: false }
              ],
              explicacion: "La opción A es un pilar del Código de Integridad. Las otras opciones son respuestas emocionales o conductas negligentes no profesionales."
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
