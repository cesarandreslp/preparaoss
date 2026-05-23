import { PrismaClient, TipoPregunta, NivelDificultad } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const dataToInsert: any[] = [
    {
      simoId: "244248", // PAE - Prof. Especializado (Financiero)
      escenarios: [
        {
          contenido: "Usted es Profesional Especializado en la Unidad Alimentos para Aprender (PAE). Debe realizar el seguimiento financiero a los recursos transferidos a una Entidad Territorial Certificada (ETC) para la operación del programa. Detecta que la ETC ha desviado parte de los recursos destinados a la alimentación escolar para el pago de deudas de nómina de docentes, alegando una emergencia financiera. Usted debe documentar el hallazgo, proyectar el requerimiento de reintegro de recursos y alertar a la oficina jurídica sobre la posible configuración de un peculado por aplicación oficial diferente.",
          categoria: "Seguimiento Financiero PAE", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cuál es la consecuencia legal de usar recursos del PAE (destinación específica) en otros rubros de la entidad territorial?",
              opciones: [
                { letra: "A", texto: "Se configura una falta gravísima y un posible delito de peculado por aplicación oficial diferente, ya que los recursos del PAE tienen destinación específica por ley.", esCorrecta: true },
                { letra: "B", texto: "Es una práctica permitida siempre y cuando se devuelva el dinero antes de que termine el año fiscal y nadie se dé cuenta.", esCorrecta: false },
                { letra: "C", texto: "No pasa nada, lo importante es que los docentes reciban su sueldo y que los niños entiendan que el Estado tiene prioridades financieras.", esCorrecta: false }
              ],
              explicacion: "La opción A identifica el rigor legal de la destinación específica de recursos públicos. Las otras opciones son ilegales o justifican el mal uso de fondos."
            },
            {
              texto: "Al proyectar el requerimiento de reintegro, ¿qué debe exigir técnicamente a la ETC?",
              opciones: [
                { letra: "A", texto: "La devolución inmediata de los recursos al rubro del PAE, con los respectivos intereses si aplica, y el soporte del movimiento bancario correctivo.", esCorrecta: true },
                { letra: "B", texto: "Que le manden una caja de manzanas a su oficina para que usted no reporte el hallazgo en el informe nacional de supervisión.", esCorrecta: false },
                { letra: "C", texto: "Que publiquen en el periódico local que el PAE es el mejor programa del mundo para distraer la atención de la falta financiera.", esCorrecta: false }
              ],
              explicacion: "La opción A es la labor técnica de recuperación de recursos estatales. Las otras opciones son actos de corrupción o distracciones ineficaces."
            },
            {
              texto: "¿Qué principio de la administración se protege al realizar esta inspección financiera?",
              opciones: [
                { letra: "A", texto: "La Moralidad Administrativa y la Eficacia, asegurando que los niños reciban efectivamente el servicio de alimentación contratado.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'Complicidad', ayudando a las alcaldías a tapar sus huecos financieros con dinero de los niños.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Soberbia', demostrando que el nivel nacional manda sobre el nivel territorial en todo momento.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la gestión financiera con los fines sociales del programa. Las otras opciones son contrarias a la integridad pública."
            }
          ]
        },
        {
          contenido: "Como Profesional Financiero del PAE, participa en el diseño de la metodología de asignación de recursos para la próxima vigencia. Debe proponer criterios de focalización para que los recursos lleguen prioritariamente a los municipios con mayores índices de desnutrición infantil y ruralidad dispersa. Usted debe analizar las bases de datos de matrícula (SIMAT), los índices de pobreza (SISBEN) y proyectar el modelo financiero que garantice la cobertura universal en las zonas más críticas del país.",
          categoria: "Planeación Financiera y Focalización", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cuál es la fuente de información primaria para determinar el número de beneficiarios del PAE?",
              opciones: [
                { letra: "A", texto: "El sistema SIMAT (Sistema Integrado de Matrícula), que reporta los estudiantes oficialmente matriculados en el sector público.", esCorrecta: true },
                { letra: "B", texto: "Lo que el Alcalde de cada municipio diga en una entrevista de radio sobre cuántos niños cree él que tienen hambre.", esCorrecta: false },
                { letra: "C", texto: "Contar cuántos niños pasan caminando frente a la Alcaldía en un día cualquiera de la semana.", esCorrecta: false }
              ],
              explicacion: "La opción A es la fuente técnica oficial del Ministerio de Educación. Las otras opciones carecen de rigor estadístico y legal."
            },
            {
              texto: "Al aplicar el criterio de 'Ruralidad Dispersa', ¿qué costo adicional debe contemplar el modelo financiero?",
              opciones: [
                { letra: "A", texto: "Mayores costos de logística, transporte y almacenamiento de alimentos debido a las dificultades de acceso a las escuelas rurales lejanas.", esCorrecta: true },
                { letra: "B", texto: "El costo de comprarle un caballo a cada niño para que pueda ir a la escuela a desayunar más rápido.", esCorrecta: false },
                { letra: "C", texto: "Ninguno, se asume que en el campo la gente produce su propia comida y el Estado no debe gastar tanto en ellos.", esCorrecta: false }
              ],
              explicacion: "La opción A identifica la variable técnica de costo en la operación rural del PAE. Las otras opciones son absurdas o discriminatorias."
            },
            {
              texto: "¿Qué valor institucional se destaca al priorizar a los municipios más pobres en la asignación de recursos?",
              opciones: [
                { letra: "A", texto: "La Equidad y la Justicia Social, buscando nivelar las oportunidades de aprendizaje a través de una nutrición adecuada.", esCorrecta: true },
                { letra: "B", texto: "El 'Favoritismo', ayudando solo a los municipios donde el Director del PAE tiene amigos o familiares.", esCorrecta: false },
                { letra: "C", texto: "La Avaricia, tratando de guardar la mayor cantidad de dinero posible en las cuentas del nivel nacional.", esCorrecta: false }
              ],
              explicacion: "La opción A es el fundamento ético de las políticas públicas de focalización. Las otras opciones son contrarias a la integridad del servicio."
            }
          ]
        }
      ]
    },
    {
      simoId: "241447", // INST. SALUD NS - Prof. Universitario (Adm/Fin)
      escenarios: [
        {
          contenido: "Usted es Profesional Universitario en el Instituto Departamental de Salud de Norte de Santander. Debe apoyar la gestión del presupuesto para la red pública hospitalaria. Se detecta que varios hospitales de la frontera están operando con déficit debido a la atención masiva de población migrante no asegurada. Usted debe proyectar la solicitud de recursos adicionales ante el Ministerio de Salud, sustentar los costos de atención de urgencias y asegurar que la contabilidad del instituto refleje fielmente las cuentas por cobrar a la Nación por este concepto.",
          categoria: "Gestión Financiera en Salud", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cuál es el soporte técnico para cobrar a la Nación la atención de urgencias a población migrante no asegurada?",
              opciones: [
                { letra: "A", texto: "Los Registros Individuales de Prestación de Servicios (RIPS) debidamente validados y los soportes de atención en el servicio de urgencias.", esCorrecta: true },
                { letra: "B", texto: "Una carta escrita a mano por el gerente del hospital diciendo que atendieron a mucha gente y que necesitan dinero urgente.", esCorrecta: false },
                { letra: "C", texto: "Fotos de la sala de espera llena de gente para que en Bogotá vean que el hospital está trabajando mucho.", esCorrecta: false }
              ],
              explicacion: "La opción A es el estándar técnico de facturación y reporte en el sistema de salud colombiano. Las otras opciones carecen de validez administrativa."
            },
            {
              texto: "En cuanto al presupuesto, ¿qué principio debe aplicar para evitar que el instituto caiga en cesación de pagos?",
              opciones: [
                { letra: "A", texto: "El principio de Planeación y Sostenibilidad Financiera, priorizando el gasto según la disponibilidad real de recursos y la urgencia vital.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'Gastar y Luego Ver', comprometiendo dinero que la entidad no tiene asegurado en su presupuesto oficial.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Pedir Prestado a los Amigos', para tapar los huecos financieros del Instituto de Salud.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la gestión con las normas de presupuesto público. Las otras opciones son irresponsabilidades financieras."
            },
            {
              texto: "¿Qué valor del servidor público se destaca al gestionar recursos para la salud en una zona de crisis?",
              opciones: [
                { letra: "A", texto: "La Vocación de Servicio y la Empatía, trabajando para que ningún ciudadano se quede sin atención médica por falta de gestión financiera.", esCorrecta: true },
                { letra: "B", texto: "La Arrogancia, sintiéndose más importante que los médicos por ser quien maneja el dinero del hospital.", esCorrecta: false },
                { letra: "C", texto: "La Indiferencia, dejando que los hospitales se quiebren mientras el presupuesto esté cuadrado en los papeles de la oficina.", esCorrecta: false }
              ],
              explicacion: "La opción A es un pilar de la integridad en el sector salud. Las otras opciones son conductas negativas."
            }
          ]
        },
        {
          contenido: "Como Profesional del Instituto de Salud, debe supervisar el cumplimiento del sistema de control interno en las oficinas administrativas. Nota que el área de tesorería no está realizando los arqueos de caja diarios y que existen cheques sin firmar guardados en cajones sin llave. Usted debe realizar la observación técnica, proponer los correctivos inmediatos de seguridad y documentar el riesgo de pérdida de recursos o fraude en el sistema integrado de gestión (SIG).",
          categoria: "Control Interno Administrativo", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cuál es la medida de control interno inmediata para el manejo de efectivo y títulos valores?",
              opciones: [
                { letra: "A", texto: "Realizar arqueos sorpresivos, mantener los valores en cajas fuertes con acceso restringido y asegurar la custodia documental bajo llave.", esCorrecta: true },
                { letra: "B", texto: "Dejar que cada funcionario se lleve los cheques para su casa para que estén más seguros durante la noche.", esCorrecta: false },
                { letra: "C", texto: "No hacer nada, confiando en que todos los funcionarios del Instituto son personas muy honestas y nada se va a perder.", esCorrecta: false }
              ],
              explicacion: "La opción A es el estándar de control y salvaguarda de activos públicos. Las otras opciones son negligencias o riesgos de seguridad."
            },
            {
              texto: "Al documentar el riesgo en el SIG, ¿qué debe identificar prioritariamente?",
              opciones: [
                { letra: "A", texto: "La probabilidad de ocurrencia del fraude, el impacto financiero para la entidad y los controles actuales que están fallando.", esCorrecta: true },
                { letra: "B", texto: "Qué funcionario le cae peor para poner su nombre como el principal sospechoso de cualquier pérdida futura.", esCorrecta: false },
                { letra: "C", texto: "Qué tan bonito se ve el formato de riesgos impreso en una hoja de papel brillante.", esCorrecta: false }
              ],
              explicacion: "La opción A es la metodología técnica de gestión de riesgos (ISO 31000 / MIPG). Las otras opciones son criterios subjetivos o irrelevantes."
            },
            {
              texto: "¿Qué principio de la función administrativa se protege al fortalecer el control interno?",
              opciones: [
                { letra: "A", texto: "La Moralidad y la Eficiencia, previniendo actos de corrupción y asegurando el buen uso de los recursos de la salud.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'Vigilancia Persecutoria', tratando de incomodar a los compañeros de trabajo con reglas estrictas.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Papeleo por Papeleo', creando trabas para que nadie pueda gastar el dinero de la salud.", esCorrecta: false }
              ],
              explicacion: "La opción A define el fin ético del control estatal. Las otras opciones son visiones negativas del control interno."
            }
          ]
        }
      ]
    },
    {
      simoId: "241050", // BOLÍVAR - Técnico Operativo (Apoyo Procesos)
      escenarios: [
        {
          contenido: "Usted es Técnico Operativo en la Gobernación de Bolívar. Debe apoyar la consolidación estadística de los proyectos financiados con regalías en el departamento. Recibe informes parciales de diferentes municipios que tienen errores de suma y datos contradictorios sobre el avance físico de las obras. Usted debe realizar la depuración de la información, solicitar las aclaraciones a los supervisores locales y generar el tablero de control consolidado para que el Gobernador pueda rendir cuentas ante el OCAD regional.",
          categoria: "Gestión de Regalías / Estadística", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cuál es el procedimiento técnico para depurar información estadística inconsistente?",
              opciones: [
                { letra: "A", texto: "Verificar las fuentes primarias de información, realizar el cruce de datos y solicitar la corrección de los errores detectados antes de la consolidación final.", esCorrecta: true },
                { letra: "B", texto: "Inventar los datos que faltan basándose en su intuición para que el informe se vea completo y el Gobernador esté contento.", esCorrecta: false },
                { letra: "C", texto: "Sumar los errores con los aciertos y sacar un promedio, asumiendo que al final todo se compensa matemáticamente.", esCorrecta: false }
              ],
              explicacion: "La opción A garantiza la veracidad y calidad de la información pública. Las otras opciones son faltas a la ética y al rigor técnico."
            },
            {
              texto: "En el marco del Sistema General de Regalías (SGR), ¿por qué es crítico reportar el avance físico real de las obras?",
              opciones: [
                { letra: "A", texto: "Porque el flujo de recursos depende del cumplimiento de metas y el reporte falso puede acarrear sanciones y suspensión de giros al departamento.", esCorrecta: true },
                { letra: "B", texto: "Para que el Gobernador pueda salir en la televisión diciendo que ya terminó todas las obras aunque apenas estén empezando.", esCorrecta: false },
                { letra: "C", texto: "Porque a la gente de Planeación Nacional le gusta leer informes largos y detallados durante sus descansos de almuerzo.", esCorrecta: false }
              ],
              explicacion: "La opción A identifica las consecuencias legales y financieras del seguimiento a regalías. Las otras opciones son visiones cínicas o irrelevantes."
            },
            {
              texto: "¿Qué herramienta tecnológica es la oficial para el reporte de proyectos de regalías en Colombia?",
              opciones: [
                { letra: "A", texto: "El aplicativo Gesproy o el sistema que determine el Departamento Nacional de Planeación (DNP) para el seguimiento a proyectos.", esCorrecta: true },
                { letra: "B", texto: "Un blog personal del Técnico Operativo donde publica fotos de las obras que le parecen bonitas.", esCorrecta: false },
                { letra: "C", texto: "Enviar un mensaje de texto masivo a todos los habitantes de Bolívar con el porcentaje de avance de las obras.", esCorrecta: false }
              ],
              explicacion: "La opción A es el sistema técnico oficial de gestión. Las otras opciones carecen de validez administrativa."
            }
          ]
        },
        {
          contenido: "Como Técnico Operativo en Bolívar, debe organizar el archivo de gestión de la oficina de Planeación. Encuentra que los planos de los proyectos de infraestructura de los últimos 5 años están amontonados en una bodega húmeda y sin ningún tipo de inventario. Usted debe realizar la limpieza, clasificación, foliación y descripción de los expedientes técnicos, asegurando que se cumplan las Tablas de Retención Documental y que la información sea fácilmente localizable para futuras auditorías de la Contraloría.",
          categoria: "Archivo y Gestión Documental", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cuál es el primer paso técnico para organizar un archivo acumulado y desordenado?",
              opciones: [
                { letra: "A", texto: "Realizar el diagnóstico integral del estado de los documentos y proceder con la clasificación por series y subseries según las funciones de la oficina.", esCorrecta: true },
                { letra: "B", texto: "Botar a la basura todo lo que huela a humedad para que la oficina huela mejor de inmediato.", esCorrecta: false },
                { letra: "C", texto: "Vender los planos viejos como papel reciclado para comprar una cafetera nueva para los funcionarios de Planeación.", esCorrecta: false }
              ],
              explicacion: "La opción A sigue la metodología archivística oficial (AGN). Las otras opciones son destrucción de patrimonio público o actos ilegales."
            },
            {
              texto: "En cuanto a la foliación de planos de gran formato, ¿cuál es la técnica correcta?",
              opciones: [
                { letra: "A", texto: "Asignar un número consecutivo a cada plano en una esquina visible, tratándolo como una unidad documental dentro del expediente respectivo.", esCorrecta: true },
                { letra: "B", texto: "Doblar los planos muchas veces hasta que queden del tamaño de una moneda para que quepan en un sobre pequeño.", esCorrecta: false },
                { letra: "C", texto: "No foliarlos, porque el papel de los planos es muy grueso y los lápices no marcan bien sobre ellos.", esCorrecta: false }
              ],
              explicacion: "La opción A garantiza el control de la integridad del expediente técnico. Las otras opciones dañan el material o pierden el control documental."
            },
            {
              texto: "¿Qué principio de la función pública se destaca al recuperar la memoria técnica de los proyectos del departamento?",
              opciones: [
                { letra: "A", texto: "La Transparencia y la Responsabilidad en la custodia de la información que soporta la inversión de los recursos públicos.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'Esconder el Pasado', tratando de que nadie sepa qué proyectos se hicieron antes de que usted llegara al cargo.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Ahorro de Espacio', buscando que las oficinas se vean vacías y minimalistas aunque no haya archivos.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la gestión documental con los fines del Estado. Las otras opciones son conductas negligentes o contrarias a la ley."
            }
          ]
        }
      ]
    },
    {
      simoId: "245456", // TOLIMA - Prof. Universitario (IT/Educación)
      escenarios: [
        {
          contenido: "Usted es Profesional IT en la Secretaría de Educación del Tolima. Debe gestionar los sistemas de información de los 46 municipios no certificados del departamento. Identifica que la base de datos de estudiantes (SIMAT) tiene inconsistencias graves (estudiantes fantasma) que están afectando el giro de recursos de gratuidad educativa. Usted debe liderar la auditoría de datos, cruzar la información con el registro civil de la Registraduría y asegurar que cada registro corresponda a un niño real asistiendo a clase, para proteger el presupuesto departamental.",
          categoria: "Sistemas de Información Educativa", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cuál es el riesgo legal y fiscal de mantener 'estudiantes fantasma' en el sistema SIMAT?",
              opciones: [
                { letra: "A", texto: "El giro indebido de recursos públicos del Sistema General de Participaciones (SGP), lo que constituye un detrimento patrimonial y responsabilidad penal.", esCorrecta: true },
                { letra: "B", texto: "Que el departamento gane un premio por tener la mayor cantidad de estudiantes del mundo aunque nadie vaya a la escuela.", esCorrecta: false },
                { letra: "C", texto: "Que los profesores tengan menos alumnos reales que atender y puedan pasar más tiempo descansando en la sala de profesores.", esCorrecta: false }
              ],
              explicacion: "La opción A identifica el impacto real de la corrupción o negligencia en el reporte de matrícula. Las otras opciones son visiones absurdas o cínicas."
            },
            {
              texto: "Al realizar el cruce de datos con la Registraduría, ¿qué protocolo de seguridad debe seguir?",
              opciones: [
                { letra: "A", texto: "Asegurar la interoperabilidad mediante canales seguros y cumplir con la reserva legal de los datos personales de menores de edad.", esCorrecta: true },
                { letra: "B", texto: "Publicar la lista de todos los estudiantes en su muro personal de Facebook para que la gente le ayude a ver quién es real y quién no.", esCorrecta: false },
                { letra: "C", texto: "Mandarle la base de datos completa a un amigo que trabaja en un banco para que él le haga el favor de revisar los números de cédula.", esCorrecta: false }
              ],
              explicacion: "La opción A cumple con las normas de seguridad de la información y protección de datos (Ley 1581). Las otras opciones violan la privacidad y la ley."
            },
            {
              texto: "¿Qué principio de Gobierno Digital se aplica al integrar las bases de datos de diferentes entidades?",
              opciones: [
                { letra: "A", texto: "El principio de Interoperabilidad, que permite el intercambio de información entre entidades para mejorar la gestión pública y el servicio al ciudadano.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'Curiosidad Institucional', permitiendo que cada entidad sepa todo sobre la vida privada de los ciudadanos sin ningún control.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Pereza Administrativa', dejando que otras entidades hagan el trabajo de revisión que le corresponde a la Secretaría de Educación.", esCorrecta: false }
              ],
              explicacion: "La opción A es el fundamento técnico de la eficiencia estatal moderna. Las otras opciones son interpretaciones erróneas del modelo de gobierno digital."
            }
          ]
        },
        {
          contenido: "Como Profesional IT de Educación en el Tolima, debe formular el Plan Estratégico de Tecnologías de la Información (PETI) para el sector educativo departamental. Debe incluir metas para la conectividad de las escuelas rurales y la capacitación de docentes en el uso de herramientas digitales. Se enfrenta a un presupuesto limitado y a la difícil geografía del departamento. Usted debe proponer soluciones innovadoras (internet satelital, contenidos offline) y asegurar que el PETI esté alineado con el Plan de Desarrollo Departamental y las metas nacionales del Ministerio TIC.",
          categoria: "Planeación Estratégica TIC (PETI)", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cuál es el objetivo principal del PETI en una entidad pública?",
              opciones: [
                { letra: "A", texto: "Alinear el uso de la tecnología con los objetivos estratégicos de la entidad para generar valor público y mejorar la prestación de los servicios.", esCorrecta: true },
                { letra: "B", texto: "Hacer una lista de mercado de computadores y tablets caros para comprar antes de que se acabe el año.", esCorrecta: false },
                { letra: "C", texto: "Demostrar que el Secretario de Educación tiene el computador más moderno de todo el departamento del Tolima.", esCorrecta: false }
              ],
              explicacion: "La opción A refleja la finalidad técnica del PETI según el marco de referencia de GGD. Las otras opciones son visiones limitadas o banales."
            },
            {
              texto: "Ante la falta de internet en zonas rurales remotas, ¿qué estrategia técnica es más viable para el aprendizaje?",
              opciones: [
                { letra: "A", texto: "Implementar servidores locales en las escuelas con contenidos educativos precargados (bibliotecas digitales offline) y capacitación docente en su uso.", esCorrecta: true },
                { letra: "B", texto: "Decirle a los niños que suban a la montaña más alta del pueblo todos los días a ver si captan un poco de señal de celular para sus tareas.", esCorrecta: false },
                { letra: "C", texto: "No hacer nada y esperar a que el gobierno nacional instale fibra óptica en medio de la selva algún día en el futuro lejano.", esCorrecta: false }
              ],
              explicacion: "La opción A es una solución técnica realista y pedagógicamente útil frente a la brecha digital. Las otras opciones son burlas o negligencias ante la realidad rural."
            },
            {
              texto: "¿Qué valor de la integridad pública se destaca al planear el futuro tecnológico de la educación del Tolima?",
              opciones: [
                { letra: "A", texto: "El Liderazgo y la Justicia, trabajando para que la tecnología sea una herramienta de cierre de brechas y no un privilegio de pocos.", esCorrecta: true },
                { letra: "B", texto: "La Vanidad, queriendo que el Tolima sea el departamento con más páginas web aunque nadie las use.", esCorrecta: false },
                { letra: "C", texto: "La Indiferencia, comprando tablets baratas que se dañan al mes solo por cumplir con la meta del Plan de Desarrollo.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la labor profesional con el propósito social del Estado. Las otras opciones son conductas negativas que afectan el impacto de la inversión pública."
            }
          ]
        }
      ]
    },
    {
      simoId: "241772", // ATLÁNTICO - Prof. Especializado (Servicios Generales)
      escenarios: [
        {
          contenido: "Usted es Profesional Especializado en la Secretaría General de la Gobernación del Atlántico, encargado de los Servicios Generales. Debe estructurar el Plan Anual de Adquisiciones (PAA) para el mantenimiento del edificio central y las sedes regionales. Identifica que los costos de energía eléctrica han aumentado un 40% debido a sistemas de aire acondicionado obsoletos y falta de cultura de ahorro. Usted debe proyectar la compra de equipos eficientes, establecer políticas de ahorro de energía y asegurar que el PAA esté alineado con el presupuesto departamental y los principios de contratación estatal.",
          categoria: "Gestión de Servicios Generales / PAA", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cuál es la función técnica del Plan Anual de Adquisiciones (PAA) en la gestión pública?",
              opciones: [
                { letra: "A", texto: "Permitir que la entidad planee sus compras de manera transparente, facilitando la participación de proveedores y el control ciudadano sobre el gasto.", esCorrecta: true },
                { letra: "B", texto: "Es una lista secreta de las empresas a las que el Gobernador les quiere dar los contratos más grandes este año.", esCorrecta: false },
                { letra: "C", texto: "Un documento aburrido que se llena por obligación legal pero que nadie en la Gobernación debe seguir realmente.", esCorrecta: false }
              ],
              explicacion: "La opción A define el propósito legal y técnico del PAA (Decreto 1082 de 2015). Las otras opciones son visiones corruptas o mediocres de la administración."
            },
            {
              texto: "Al proponer el cambio a equipos de aire acondicionado eficientes, ¿qué análisis debe sustentar ante la Secretaría de Hacienda?",
              opciones: [
                { letra: "A", texto: "Un análisis de costo-beneficio que demuestre que el ahorro en la factura de energía compensará la inversión inicial en un tiempo razonable (Retorno de Inversión).", esCorrecta: true },
                { letra: "B", texto: "Decir que los equipos actuales se ven feos y viejos y que la Gobernación necesita verse más moderna frente a los visitantes.", esCorrecta: false },
                { letra: "C", texto: "Argumentar que el calor en Barranquilla es tan fuerte que los funcionarios ya no pueden trabajar si no tienen aire acondicionado de última generación.", esCorrecta: false }
              ],
              explicacion: "La opción A es el sustento técnico y financiero profesional para la eficiencia administrativa. Las otras opciones son argumentos banales o puramente emocionales."
            },
            {
              texto: "¿Qué principio de la contratación estatal se protege al publicar el PAA de manera oportuna?",
              opciones: [
                { letra: "A", texto: "El principio de Transparencia y la Publicidad, garantizando que el mercado conozca las necesidades de compra de la entidad.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'Confundir al Proveedor', para que solo los que tienen información privilegiada puedan participar en las licitaciones.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Soberbia Institucional', demostrando que la Gobernación tiene mucho dinero para gastar en servicios generales.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la actuación con los mandatos de Colombia Compra Eficiente. Las otras opciones son contrarias a la integridad y a la ley."
            }
          ]
        },
        {
          contenido: "Como Profesional de Servicios Generales en la Gobernación del Atlántico, debe supervisar el contrato de mantenimiento del parque automotor. Nota que el taller contratado está facturando repuestos nuevos pero instalando piezas de segunda mano o reconstruidas en los vehículos oficiales. Usted debe realizar la auditoría a las facturas, inspeccionar físicamente los vehículos con apoyo de un perito mecánico y documentar el presunto fraude para iniciar el proceso de incumplimiento contractual y las denuncias penales correspondientes.",
          categoria: "Supervisión Contractual / Mantenimiento", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cuál es su obligación inmediata al detectar el presunto fraude en la instalación de repuestos?",
              opciones: [
                { letra: "A", texto: "Suspender los pagos al contratista, dejar constancia en el acta de supervisión y reportar formalmente a la oficina jurídica y a los entes de control.", esCorrecta: true },
                { letra: "B", texto: "Pedirle al dueño del taller que le regale un juego de llantas nuevas para su carro personal y así olvidar el incidente de los repuestos de segunda.", esCorrecta: false },
                { letra: "C", texto: "Hacerse el desentendido para no tener problemas legales ni peleas con el contratista que es una persona muy influyente en Barranquilla.", esCorrecta: false }
              ],
              explicacion: "La opción A es el deber legal de todo servidor público para proteger el patrimonio estatal. Las otras opciones son actos de corrupción o negligencia gravísima."
            },
            {
              texto: "En cuanto a la seguridad de los funcionarios, ¿qué riesgo implica el uso de repuestos reconstruidos en vehículos oficiales?",
              opciones: [
                { letra: "A", texto: "Un alto riesgo de fallas mecánicas catastróficas que pueden causar accidentes de tránsito, poniendo en peligro la vida de los servidores públicos y de terceros.", esCorrecta: true },
                { letra: "B", texto: "Que el carro haga ruidos extraños que molesten el sueño del conductor mientras maneja por la carretera.", esCorrecta: false },
                { letra: "C", texto: "Ninguno, los repuestos reconstruidos son igual de buenos que los nuevos pero más ecológicos para el medio ambiente del Atlántico.", esCorrecta: false }
              ],
              explicacion: "La opción A identifica el riesgo técnico real y humano de la mala gestión del mantenimiento. Las otras opciones son absurdas o falsedades peligrosas."
            },
            {
              texto: "¿Qué valor de la integridad pública se destaca al denunciar actos de corrupción en la supervisión de contratos?",
              opciones: [
                { letra: "A", texto: "La Honestidad y la Valentía, actuando con rectitud y defendiendo el interés general sobre cualquier interés particular o amenaza.", esCorrecta: true },
                { letra: "B", texto: "La Arrogancia, queriendo demostrar que usted es el más honesto de toda la Gobernación para que le den un premio.", esCorrecta: false },
                { letra: "C", texto: "El Rencor, tratando de que cierren el taller del contratista solo porque el mecánico no lo saludó con respeto una vez.", esCorrecta: false }
              ],
              explicacion: "La opción A es la conducta esperada de un líder del servicio público íntegro. Las otras opciones son interpretaciones mezquinas de una actuación correcta."
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
