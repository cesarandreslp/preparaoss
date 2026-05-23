import { PrismaClient, TipoPregunta, NivelDificultad } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const dataToInsert: any[] = [
    {
      simoId: "236575", // DIAN - Analista III (Bienes Adjudicados/Mercancías)
      escenarios: [
        {
          contenido: "Usted es Analista III en la DIAN, responsable del proceso de ingreso y egreso de mercancías aprehendidas y decomisadas. Recibe un lote de equipos electrónicos de alta gama que han sido declarados en abandono a favor de la Nación. Usted debe realizar la inspección física, clasificar los bienes según su estado de conservación, asegurar el correcto almacenamiento para evitar el deterioro y preparar la documentación para su futura comercialización o donación, cumpliendo con la normativa aduanera vigente.",
          categoria: "Gestión de Mercancías y Bienes Adjudicados", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cuál es el primer paso técnico al recibir mercancía decomisada en el almacén de la DIAN?",
              opciones: [
                { letra: "A", texto: "Realizar el inventario detallado, verificar el estado físico de los empaques y sellos, y confrontar con el acta de aprehensión o decomiso.", esCorrecta: true },
                { letra: "B", texto: "Llevarse un equipo a casa para probar si funciona bien antes de registrarlo oficialmente en el sistema.", esCorrecta: false },
                { letra: "C", texto: "Vender los equipos rápidamente a los otros funcionarios para desocupar espacio en la bodega de la entidad.", esCorrecta: false }
              ],
              explicacion: "La opción A cumple con los protocolos de custodia y control de bienes públicos. Las otras opciones son delitos de peculado o falta de integridad."
            },
            {
              texto: "Ante mercancía que presenta deterioro por humedad en la bodega, ¿qué acción administrativa debe reportar?",
              opciones: [
                { letra: "A", texto: "Emitir un informe técnico de novedad indicando el estado de conservación y sugerir la reubicación o aceleración del proceso de disposición final.", esCorrecta: true },
                { letra: "B", texto: "No decir nada para que el jefe no se enoje por el mal estado de la bodega de la DIAN.", esCorrecta: false },
                { letra: "C", texto: "Secar los equipos con un secador de pelo y guardarlos de nuevo esperando que nadie note el daño.", esCorrecta: false }
              ],
              explicacion: "La opción A es la labor técnica de seguimiento y protección de activos. Las otras opciones son negligencias o conductas poco profesionales."
            },
            {
              texto: "¿Qué principio rige la disposición de bienes adjudicados a la Nación para garantizar la transparencia?",
              opciones: [
                { letra: "A", texto: "La Eficiencia y la Publicidad, asegurando que el proceso de comercialización o donación se realice bajo subasta pública o convenios legales.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'Regalar a los amigos', entregando los bienes a las empresas que mejor le caigan al Director Seccional.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Destrucción Total', quemando toda la mercancía para no tener que hacer inventarios nunca más.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la gestión con los fines del Estado y el control social. Las otras opciones son actos de corrupción o ineficiencia extrema."
            }
          ]
        },
        {
          contenido: "Como Analista de la DIAN, debe notificar un acto administrativo de decomiso directo a un importador. El importador se niega a recibir la notificación personal alegando que el proceso es injusto. Usted debe proceder con la notificación por aviso, certificar el trámite surtido en el sistema de gestión documental y asegurar que se cumplan los términos de ejecutoria para que el acto adquiera firmeza legal.",
          categoria: "Procedimiento y Notificación Aduanera", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cuándo se considera surtida la notificación por aviso según el Estatuto Tributario y Aduanero?",
              opciones: [
                { letra: "A", texto: "Al finalizar el día siguiente al de la entrega del aviso en el lugar de destino, dejando constancia en el expediente.", esCorrecta: true },
                { letra: "B", texto: "Inmediatamente el funcionario deja el papel debajo de la puerta de la oficina del importador.", esCorrecta: false },
                { letra: "C", texto: "Cuando el importador publica un video en redes sociales quejándose de que recibió el aviso de la DIAN.", esCorrecta: false }
              ],
              explicacion: "La opción A refleja el procedimiento legal de notificación subsidiaria. Las otras opciones carecen de validez jurídica."
            },
            {
              texto: "En cuanto a la certificación de los términos de ejecutoria, ¿por qué es vital para el proceso de decomiso?",
              opciones: [
                { letra: "A", texto: "Para garantizar la seguridad jurídica, determinando el momento exacto en que la decisión ya no admite recursos y puede ser ejecutada.", esCorrecta: true },
                { letra: "B", texto: "Para que el funcionario pueda irse de vacaciones tranquilo sabiendo que ya no tiene que hablar más con ese importador.", esCorrecta: false },
                { letra: "C", texto: "Para que la DIAN pueda cobrar una multa extra por cada día que el ciudadano se demore en leer el acta.", esCorrecta: false }
              ],
              explicacion: "La opción A define la importancia procesal de la firmeza de los actos administrativos. Las otras opciones son visiones banales o abusivas."
            },
            {
              texto: "¿Qué valor de la integridad pública se destaca al realizar notificaciones con estricto apego a la ley?",
              opciones: [
                { letra: "A", texto: "La Justicia y el Respeto al Debido Proceso, garantizando que el ciudadano tenga la oportunidad de defensa legal.", esCorrecta: true },
                { letra: "B", texto: "La Astucia, logrando que el ciudadano no se entere de la notificación para que pierda el plazo de reclamar.", esCorrecta: false },
                { letra: "C", texto: "La Indiferencia, mandando el aviso a una dirección vieja sabiendo que nunca va a llegar a manos del interesado.", esCorrecta: false }
              ],
              explicacion: "La opción A es el fundamento ético de la función pública. Las otras opciones son conductas deshonestas o negligentes."
            }
          ]
        }
      ]
    },
    {
      simoId: "242081", // SOACHA - Prof. Especializado (Derecho/Contratación)
      escenarios: [
        {
          contenido: "Usted es Profesional Especializado en la Alcaldía de Soacha, encargado del área jurídica y de contratación. Debe proyectar el pliego de condiciones para una licitación pública destinada a la construcción de un nuevo Centro de Salud. Identifica que los requisitos técnicos sugeridos por la Secretaría de Salud parecen estar dirigidos a un único proveedor local. Usted debe revisar la legalidad de los criterios de selección, proponer indicadores financieros y técnicos que garanticen la pluralidad de oferentes y asegurar que el proceso cumpla con los principios de transparencia y economía.",
          categoria: "Contratación Estatal / Licitación", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cuál es su obligación legal ante la detección de requisitos 'sastre' (dirigidos a un solo proponente)?",
              opciones: [
                { letra: "A", texto: "Objetar los requisitos, solicitar la justificación técnica de la necesidad y exigir la apertura de los criterios para permitir la competencia real.", esCorrecta: true },
                { letra: "B", texto: "Dejarlos así para que el contrato se adjudique rápido y el Alcalde pueda inaugurar la obra antes de las elecciones.", esCorrecta: false },
                { letra: "C", texto: "Llamar al proveedor favorito para pedirle una comisión a cambio de no decir nada sobre los requisitos dirigidos.", esCorrecta: false }
              ],
              explicacion: "La opción A cumple con los deberes de transparencia y protección del interés general en la contratación pública. Las otras opciones son negligencias o delitos de corrupción."
            },
            {
              texto: "En cuanto a los indicadores financieros (Liquidez, Endeudamiento, etc.), ¿qué debe asegurar en los pliegos?",
              opciones: [
                { letra: "A", texto: "Que sean proporcionales al valor del contrato y a la complejidad de la obra, permitiendo la participación de empresas idóneas sin barreras innecesarias.", esCorrecta: true },
                { letra: "B", texto: "Que sean tan altos que solo una empresa multinacional pueda participar en la licitación de Soacha.", esCorrecta: false },
                { letra: "C", texto: "No pedir requisitos financieros para que cualquier persona con ganas de trabajar pueda construir el hospital.", esCorrecta: false }
              ],
              explicacion: "La opción A aplica el principio de proporcionalidad y concurrencia. Las otras opciones generan barreras ilegales o riesgos de incumplimiento por falta de solidez."
            },
            {
              texto: "¿Qué principio rige la respuesta a las observaciones de los posibles oferentes durante la etapa de pliegos?",
              opciones: [
                { letra: "A", texto: "El principio de Transparencia y el Derecho a la Igualdad, respondiendo de manera técnica y motivada a todos los interesados.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'Silencio Administrativo', ignorando las quejas de los oferentes que no son amigos de la administración.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Sarcasmo', burlándose de las preguntas de las empresas que no entienden los pliegos de Soacha.", esCorrecta: false }
              ],
              explicacion: "La opción A es el mandato legal para garantizar la moralidad en la selección objetiva. Las otras opciones son arbitrariedades o faltas de respeto."
            }
          ]
        },
        {
          contenido: "Como Profesional Jurídico en Soacha, debe resolver un recurso de reposición contra una multa impuesta a un contratista de alimentación escolar (PAE) por entrega de raciones incompletas. El contratista alega fuerza mayor por un paro de transportadores. Usted debe analizar las pruebas, verificar si el paro fue un hecho imprevisible e irresistible, y proyectar la decisión que proteja el derecho fundamental a la alimentación de los niños del municipio.",
          categoria: "Gestión Contractual y Sanciones", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Qué requisito debe cumplirse para aceptar la 'fuerza mayor' como causal de exoneración de responsabilidad?",
              opciones: [
                { letra: "A", texto: "Que el hecho sea imprevisible, irresistible y externo a la voluntad del contratista, debidamente probado en el expediente.", esCorrecta: true },
                { letra: "B", texto: "Que el contratista simplemente diga que 'le dio pereza' llevar la comida porque ese día estaba lloviendo mucho.", esCorrecta: false },
                { letra: "C", texto: "Que el contratista sea familiar de un concejal de Soacha y por eso no se le deba cobrar ninguna multa.", esCorrecta: false }
              ],
              explicacion: "La opción A define los elementos constitutivos de la fuerza mayor o caso fortuito en derecho civil y administrativo. Las otras opciones carecen de base legal."
            },
            {
              texto: "Ante el incumplimiento en el PAE, ¿cuál es el bien jurídico prevalente que debe proteger la Alcaldía?",
              opciones: [
                { letra: "A", texto: "El interés superior de los niños y niñas a recibir una alimentación digna y oportuna para su desarrollo y permanencia escolar.", esCorrecta: true },
                { letra: "B", texto: "El interés económico del contratista para que no pierda dinero por las multas de la Alcaldía.", esCorrecta: false },
                { letra: "C", texto: "El interés de la oficina jurídica de no tener que redactar resoluciones de sanción muy largas y aburridas.", esCorrecta: false }
              ],
              explicacion: "La opción A aplica el mandato constitucional de protección a la infancia. Las otras opciones son intereses subalternos o negligentes."
            },
            {
              texto: "¿Qué valor del servidor público se destaca al mantener la firmeza en las sanciones por incumplimientos sociales?",
              opciones: [
                { letra: "A", texto: "La Justicia y el Compromiso con la ciudadanía, asegurando que los recursos públicos cumplan su fin social efectivo.", esCorrecta: true },
                { letra: "B", texto: "La Crueldad, disfrutando de ver cómo las empresas sufren pagando multas al municipio de Soacha.", esCorrecta: false },
                { letra: "C", texto: "La Indiferencia, dejando que el contratista haga lo que quiera para no tener conflictos legales desgastantes.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la labor jurídica con la ética pública. Las otras opciones son visiones distorsionadas o negligentes."
            }
          ]
        }
      ]
    },
    {
      simoId: "228788", // SENA - Profesional (Jurídico/Representación)
      escenarios: [
        {
          contenido: "Usted es Profesional Jurídico en el SENA, encargado de la defensa judicial de la entidad. Recibe una demanda de reparación directa por un presunto accidente ocurrido dentro de un centro de formación. Debe analizar la demanda, recolectar las pruebas técnicas sobre el estado de las instalaciones y proyectar la contestación de la demanda buscando evitar el daño antijurídico y el detrimento patrimonial de la institución, basándose en la jurisprudencia vigente del Consejo de Estado.",
          categoria: "Defensa Judicial del Estado", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cuál es su primera acción técnica al recibir la notificación de la demanda contra el SENA?",
              opciones: [
                { letra: "A", texto: "Verificar los requisitos de procedibilidad, identificar posibles caducidades y coordinar con el Centro de Formación la remisión de antecedentes administrativos.", esCorrecta: true },
                { letra: "B", texto: "Llamar al demandante para decirle que el SENA es una entidad muy buena y que por favor retire la demanda por caridad.", esCorrecta: false },
                { letra: "C", texto: "Ignorar la demanda asumiendo que el juez se dará cuenta solo de que el SENA no tiene la culpa de nada.", esCorrecta: false }
              ],
              explicacion: "La opción A cumple con los deberes de defensa técnica y procesal del Estado. Las otras opciones son negligencias que pueden causar condenas millonarias."
            },
            {
              texto: "En cuanto a la prueba de 'culpa exclusiva de la víctima', ¿qué debe demostrar para exonerar al SENA?",
              opciones: [
                { letra: "A", texto: "Que el accidente ocurrió por una conducta imprudente o violatoria de los protocolos de seguridad por parte del afectado, rompiendo el nexo causal.", esCorrecta: true },
                { letra: "B", texto: "Que el afectado tiene mala suerte y que las cosas malas siempre le pasan a la misma gente.", esCorrecta: false },
                { letra: "C", texto: "Que el SENA no tiene presupuesto para pagar indemnizaciones y que por eso la víctima debe perdonar el daño.", esCorrecta: false }
              ],
              explicacion: "La opción A identifica una causal legal de exoneración de responsabilidad estatal. Las otras opciones son argumentos absurdos o irrelevantes en derecho."
            },
            {
              texto: "¿Qué principio rige la actuación del abogado del SENA para evitar el detrimento patrimonial?",
              opciones: [
                { letra: "A", texto: "El principio de Responsabilidad y Eficacia, defendiendo con rigor técnico los recursos públicos que pertenecen a la formación de los colombianos.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'Ganar a toda costa', incluso si eso implica esconder pruebas que favorezcan al ciudadano accidentado.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Litigiosidad Infinita', tratando de que el proceso dure 20 años para que el pago de la condena le toque a otro Director.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la defensa judicial con la ética administrativa. Las otras opciones son conductas deshonestas o ineficientes."
            }
          ]
        },
        {
          contenido: "Como Profesional del SENA, debe proyectar un concepto jurídico sobre la viabilidad de celebrar un convenio de cooperación internacional para transferencia tecnológica. Usted debe revisar si el convenio cumple con la misión institucional del SENA, verificar la capacidad legal de la entidad extranjera y asegurar que no se vulneren normas de contratación estatal ni de soberanía nacional.",
          categoria: "Derecho Administrativo / Convenios", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Qué aspecto es fundamental verificar sobre la entidad extranjera antes de firmar un convenio?",
              opciones: [
                { letra: "A", texto: "Su existencia y representación legal mediante documentos apostillados y traducidos, y su idoneidad técnica en el objeto del convenio.", esCorrecta: true },
                { letra: "B", texto: "Que el Director de la entidad extranjera hable español perfectamente para no tener que usar traductores en las reuniones.", esCorrecta: false },
                { letra: "C", texto: "Que la entidad extranjera sea de un país que le guste al Presidente de la República de turno.", esCorrecta: false }
              ],
              explicacion: "La opción A es el requisito legal y técnico para la validez de actos con sujetos internacionales. Las otras opciones son criterios banales o políticos ajenos a la técnica jurídica."
            },
            {
              texto: "En cuanto al objeto del convenio, ¿por qué debe alinearse estrictamente con la misión del SENA?",
              opciones: [
                { letra: "A", texto: "Para evitar la desviación de poder y garantizar que los recursos y esfuerzos se dirijan al cumplimiento de los fines de formación profesional integral.", esCorrecta: true },
                { letra: "B", texto: "Para que el SENA pueda salir en las noticias internacionales y parecer una entidad muy moderna ante el mundo.", esCorrecta: false },
                { letra: "C", texto: "Para que los funcionarios del SENA puedan viajar gratis a otros países con la excusa de la cooperación técnica.", esCorrecta: false }
              ],
              explicacion: "La opción A refleja el principio de especialidad de las entidades públicas. Las otras opciones son visiones banales o corruptas."
            },
            {
              texto: "¿Qué valor del servidor público se destaca al proyectar conceptos jurídicos con rigor y honestidad?",
              opciones: [
                { letra: "A", texto: "La Excelencia y el Compromiso, brindando seguridad jurídica para la toma de decisiones estratégicas de la entidad.", esCorrecta: true },
                { letra: "B", texto: "La Obediencia ciega, escribiendo lo que el jefe quiera leer aunque sea ilegal o inconveniente para el SENA.", esCorrecta: false },
                { letra: "C", texto: "La Astucia, redactando conceptos con lenguaje muy difícil para que nadie entienda realmente cuál es el riesgo del convenio.", esCorrecta: false }
              ],
              explicacion: "La opción A es el pilar de la integridad en la asesoría jurídica estatal. Las otras opciones son conductas faltas de ética profesional."
            }
          ]
        }
      ]
    },
    {
      simoId: "228736", // SENA - Profesional (Emprendimiento/Asesoría)
      escenarios: [
        {
          contenido: "Usted es Profesional en un Centro de Formación del SENA, encargado de asesorar a emprendedores rurales para la creación de unidades productivas sostenibles. Atiende a un grupo de jóvenes que quieren crear una empresa de procesamiento de frutas amazónicas, pero no tienen conocimientos sobre formalización legal ni sobre fuentes de financiación como el Fondo Emprender. Usted debe orientarlos en la formulación de su plan de negocio, identificar las brechas de mercado y asegurar que su proyecto cumpla con los requisitos técnicos para acceder a capital semilla.",
          categoria: "Gestión de Emprendimiento / Fondo Emprender", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cuál es el componente clave que debe resaltar al asesorar sobre el Fondo Emprender?",
              opciones: [
                { letra: "A", texto: "Que los recursos son capital semilla condonable si se cumplen las metas de generación de empleo y ejecución del plan de negocio pactado.", esCorrecta: true },
                { letra: "B", texto: "Que el Fondo Emprender es un regalo de dinero que el SENA le da a la gente para que gaste en lo que quiera sin rendir cuentas.", esCorrecta: false },
                { letra: "C", texto: "Que el SENA se queda con la mitad de las ganancias de la empresa a cambio de haberles dado la asesoría técnica inicial.", esCorrecta: false }
              ],
              explicacion: "La opción A define la naturaleza jurídica y operativa del Fondo Emprender. Las otras opciones son erróneas o deshonestas."
            },
            {
              texto: "En cuanto a la formalización, ¿qué trámite inicial es vital para que la unidad productiva sea legalmente constituida?",
              opciones: [
                { letra: "A", texto: "El registro en la Cámara de Comercio correspondiente y la obtención del RUT ante la DIAN como persona jurídica o natural comerciante.", esCorrecta: true },
                { letra: "B", texto: "Pedirle permiso al párroco del pueblo para que bendiga el negocio y así sea legal ante los ojos de la comunidad.", esCorrecta: false },
                { letra: "C", texto: "Poner un letrero muy grande en la puerta de la fábrica que diga 'Empresa Legal' aunque no tenga ningún papel registrado.", esCorrecta: false }
              ],
              explicacion: "La opción A identifica los requisitos legales de formalización empresarial en Colombia. Las otras opciones carecen de validez jurídica."
            },
            {
              texto: "¿Qué valor del servidor público se destaca al promover el emprendimiento en poblaciones vulnerables?",
              opciones: [
                { letra: "A", texto: "El Compromiso y la Inclusión, buscando generar oportunidades reales de vida y desarrollo económico en el territorio.", esCorrecta: true },
                { letra: "B", texto: "La Vanidad, presumiendo ante sus compañeros que él es el que más sabe de negocios internacionales de todo el Centro de Formación.", esCorrecta: false },
                { letra: "C", texto: "La Indiferencia, dándole los folletos a los jóvenes y diciéndoles que lean solos porque usted está muy ocupado con sus cosas.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la labor con la misión social del SENA. Las otras opciones son conductas arrogantes o negligentes."
            }
          ]
        },
        {
          contenido: "Como Profesional de Emprendimiento del SENA, debe evaluar un plan de negocio que solicita recursos para una granja avícola. Nota que el emprendedor ha inflado los costos de los insumos y ha proyectado ventas poco realistas basándose en datos inexistentes del mercado local. Usted debe realizar la retroalimentación técnica, exigir el ajuste a la realidad del mercado y garantizar que los recursos públicos se asignen a proyectos viables y honestos.",
          categoria: "Evaluación de Proyectos / Viabilidad", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Qué debe hacer si identifica datos falsos o inflados en un plan de negocio?",
              opciones: [
                { letra: "A", texto: "Rechazar la propuesta o solicitar la corrección inmediata, advirtiendo sobre las consecuencias de presentar información falsa para obtener recursos públicos.", esCorrecta: true },
                { letra: "B", texto: "Aprobarlo así para que el emprendedor sea feliz y el SENA pueda decir que entregó muchos créditos este mes.", esCorrecta: false },
                { letra: "C", texto: "Cobrarle al emprendedor una parte del dinero extra que infló en el proyecto a cambio de guardar el secreto profesional.", esCorrecta: false }
              ],
              explicacion: "La opción A protege la transparencia y el uso eficiente de los recursos estatales. Las otras opciones son negligencias o actos de corrupción."
            },
            {
              texto: "En cuanto al análisis de mercado, ¿cuál es la fuente técnica más confiable para proyectar ventas?",
              opciones: [
                { letra: "A", texto: "Estudios sectoriales gremiales (ej. FENAVI), datos históricos de consumo local y cotizaciones reales de posibles clientes potenciales.", esCorrecta: true },
                { letra: "B", texto: "Lo que el emprendedor soñó que iba a vender porque él se considera una persona con mucha suerte en la vida.", esCorrecta: false },
                { letra: "C", texto: "La opinión de un vidente que lee las cartas y dice que el negocio de las gallinas va a ser un éxito total este año.", esCorrecta: false }
              ],
              explicacion: "La opción A utiliza criterios técnicos de formulación de proyectos. Las otras opciones son irracionales y carecen de rigor profesional."
            },
            {
              texto: "¿Qué principio rige la evaluación de planes de negocio en el SENA?",
              opciones: [
                { letra: "A", texto: "La Imparcialidad y la Objetividad, evaluando la viabilidad técnica y financiera sin favoritismos personales.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'Ayudar al que más suplique', dándole el dinero a quien más veces llame a la oficina a pedirlo.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Sorteo', sacando los nombres de los ganadores de una tómbola para que nadie se queje de la evaluación.", esCorrecta: false }
              ],
              explicacion: "La opción A es el fundamento de la transparencia administrativa. Las otras opciones son arbitrariedades que violan el mérito."
            }
          ]
        }
      ]
    },
    {
      simoId: "236689", // DIAN - Gestor I (Control Interno/Auditoría)
      escenarios: [
        {
          contenido: "Usted es Gestor I en la Oficina de Control Interno de la DIAN. Debe participar en una auditoría de desempeño al proceso de fiscalización de grandes contribuyentes. Identifica que varios expedientes de auditoría no tienen el soporte documental completo de las visitas realizadas a las empresas. Usted debe documentar el hallazgo, comunicar la debilidad del control al jefe de la dependencia auditada y asegurar que se proponga un plan de mejoramiento efectivo para garantizar la calidad probatoria de las actuaciones de la DIAN.",
          categoria: "Control Interno / Auditoría de Desempeño", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cuál es el objetivo primordial de una auditoría de desempeño en el sector público?",
              opciones: [
                { letra: "A", texto: "Evaluar la economía, eficiencia, eficacia y efectividad en el cumplimiento de los fines institucionales y el manejo de los recursos.", esCorrecta: true },
                { letra: "B", texto: "Buscar a quién echarle la culpa por los errores del pasado para que el Director de la DIAN pueda despedir gente.", esCorrecta: false },
                { letra: "C", texto: "Hacer que todos los funcionarios se pongan nerviosos y dejen de trabajar durante la semana que dure la visita de auditoría.", esCorrecta: false }
              ],
              explicacion: "La opción A define el propósito técnico de la auditoría según estándares internacionales (INTOSAI) y el MECI. Las otras opciones son visiones punitivas o negativas del control."
            },
            {
              texto: "Ante el hallazgo de expedientes incompletos, ¿qué debe contener el informe de auditoría?",
              opciones: [
                { letra: "A", texto: "La descripción de la condición (lo hallado), el criterio (la norma incumplida), el efecto (el riesgo causado) y la causa (por qué ocurrió).", esCorrecta: true },
                { letra: "B", texto: "Una lista de insultos dirigidos a los funcionarios responsables de los expedientes desordenados.", esCorrecta: false },
                { letra: "C", texto: "Un resumen de cuán elegante estaba vestida la secretaria de la oficina auditada el día de la visita técnica.", esCorrecta: false }
              ],
              explicacion: "La opción A utiliza la metodología técnica de redacción de hallazgos de auditoría. Las otras opciones son faltas de profesionalismo o irrelevantes."
            },
            {
              texto: "¿Qué valor de la integridad pública se destaca al realizar auditorías objetivas y rigurosas?",
              opciones: [
                { letra: "A", texto: "La Honestidad y la Rectitud, actuando con independencia para mejorar la gestión pública sin presiones externas.", esCorrecta: true },
                { letra: "B", texto: "La Cobardía, aceptando regalos de los auditados a cambio de no reportar las fallas graves detectadas.", esCorrecta: false },
                { letra: "C", texto: "La Soberbia, demostrando que los auditores son superiores a los demás funcionarios de la DIAN porque tienen poder de vigilancia.", esCorrecta: false }
              ],
              explicacion: "La opción A es el pilar ético del auditor público. Las otras opciones son conductas corruptas o arrogantes."
            }
          ]
        },
        {
          contenido: "Como Gestor de Control Interno, debe realizar el seguimiento a un plan de mejoramiento suscrito por el área de devoluciones tras una auditoría de la Contraloría. Nota que el área ha reportado un avance del 90%, pero usted identifica que las acciones preventivas para evitar que se repitan los errores en los pagos no han sido implementadas realmente. Usted debe alertar sobre el riesgo de reincidencia, solicitar evidencias reales del cumplimiento y asegurar que el reporte a los entes de control sea veraz.",
          categoria: "Seguimiento a Planes de Mejoramiento", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Por qué es vital verificar la efectividad de las acciones preventivas en un plan de mejoramiento?",
              opciones: [
                { letra: "A", texto: "Para garantizar que se elimine la causa raíz del hallazgo y evitar que el riesgo se materialice nuevamente en el futuro afectando el patrimonio.", esCorrecta: true },
                { letra: "B", texto: "Para que el papel del informe se vea más largo y la Contraloría crea que la DIAN trabaja muchas horas extras.", esCorrecta: false },
                { letra: "C", texto: "Para molestar a los funcionarios del área de devoluciones y recordarles que siempre están bajo vigilancia.", esCorrecta: false }
              ],
              explicacion: "La opción A explica la finalidad técnica del control interno preventivo. Las otras opciones son visiones banales o de acoso laboral."
            },
            {
              texto: "En cuanto al reporte de información a entes de control, ¿cuál es su responsabilidad ética?",
              opciones: [
                { letra: "A", texto: "Asegurar que la información sea exacta, veraz, oportuna y debidamente soportada con evidencias objetivas de la gestión.", esCorrecta: true },
                { letra: "B", texto: "Tratar de maquillar las cifras para que la DIAN siempre parezca la entidad más eficiente del país aunque no sea cierto.", esCorrecta: false },
                { letra: "C", texto: "No reportar nada si el hallazgo es muy grave para no dañar la reputación institucional ante el público.", esCorrecta: false }
              ],
              explicacion: "La opción A garantiza la transparencia y la legalidad en el control estatal. Las otras opciones son actos de deshonestidad o encubrimiento."
            },
            {
              texto: "¿Qué principio rige la cultura de control y mejoramiento continuo en la DIAN?",
              opciones: [
                { letra: "A", texto: "El principio de Autocontrol y Autorregulación, donde cada servidor es responsable de la calidad de su trabajo y del cumplimiento normativo.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'Miedo al Jefe', donde solo se trabaja bien cuando el superior jerárquico está mirando directamente.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Dejar de Hacer', esperando que los problemas se solucionen solos con el paso del tiempo.", esCorrecta: false }
              ],
              explicacion: "La opción A es el fundamento del MECI y la ética pública moderna. Las otras opciones son conductas mediocres o irresponsables."
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
