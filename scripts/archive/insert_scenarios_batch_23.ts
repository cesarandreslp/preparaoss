import { PrismaClient, TipoPregunta, NivelDificultad } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const dataToInsert: any[] = [
    {
      simoId: "241024", // BOLÍVAR - Secretario Ejecutivo
      escenarios: [
        {
          contenido: "Usted es Secretario Ejecutivo en la Gobernación de Bolívar. Su jefe inmediato, un directivo de alto nivel, le pide que organice el archivo de gestión de la dependencia siguiendo las Tablas de Retención Documental (TRD). Nota que hay muchos documentos originales de contratos de hace cinco años que aún están en la oficina y no han sido transferidos al archivo central. Usted debe clasificar la información, asegurar la foliación correcta y coordinar la transferencia documental para liberar espacio y cumplir con las normas archivísticas nacionales.",
          categoria: "Gestión Documental / Archivo", dificultad: "BASICO",
          preguntas: [
            {
              texto: "¿Cuál es el procedimiento técnico para realizar una transferencia documental primaria?",
              opciones: [
                { letra: "A", texto: "Organizar los expedientes por series, foliarlos, elaborar el Inventario Documental (FUID) y coordinar la entrega física al Archivo Central según el cronograma.", esCorrecta: true },
                { letra: "B", texto: "Meter todos los papeles en bolsas negras y dejarlos en el pasillo para que los de servicios generales se los lleven a la bodega.", esCorrecta: false },
                { letra: "C", texto: "Quemar los documentos que tengan más de tres años para que no ocupen espacio y así evitar el polvo en la oficina.", esCorrecta: false }
              ],
              explicacion: "La opción A sigue los estándares del Archivo General de la Nación (AGN). Las otras opciones son negligencias o destrucción de patrimonio documental."
            },
            {
              texto: "En cuanto a la foliación de un expediente de contrato, ¿cuál es la regla técnica?",
              opciones: [
                { letra: "A", texto: "Numerar consecutivamente cada hoja en la esquina superior derecha, con lápiz de mina negra, siguiendo el orden cronológico de los documentos.", esCorrecta: true },
                { letra: "B", texto: "Poner números al azar con un marcador rojo muy grande en el centro de cada hoja para que se vea bien.", esCorrecta: false },
                { letra: "C", texto: "No numerar las hojas para que el que necesite buscar algo tenga que leer todo el expediente desde el principio.", esCorrecta: false }
              ],
              explicacion: "La opción A es el estándar técnico de foliación. Las otras opciones dañan el documento o dificultan el control del expediente."
            },
            {
              texto: "¿Qué principio rige la custodia de los documentos oficiales por parte del Secretario Ejecutivo?",
              opciones: [
                { letra: "A", texto: "La Responsabilidad y la Transparencia, asegurando que la información pública esté disponible y protegida contra pérdidas o alteraciones.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'Propiedad Privada', asumiendo que los documentos de la oficina son del Secretario y nadie más puede verlos.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Desorden Creativo', donde cada quien guarda los papeles donde mejor le parezca.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la labor con los fines del Estado y el acceso a la información. Las otras opciones son conductas erróneas o negligentes."
            }
          ]
        },
        {
          contenido: "Como Secretario Ejecutivo en Bolívar, atiende a un ciudadano que solicita información sobre el estado de un trámite de pago de una cuenta de cobro. El ciudadano está muy alterado porque afirma que lleva dos meses esperando. Usted debe consultar el sistema de gestión, verificar en qué etapa se encuentra el documento, brindar una respuesta amable y orientar al ciudadano sobre los pasos a seguir, respetando siempre los protocolos de atención al usuario de la Gobernación.",
          categoria: "Atención al Ciudadano / Servicio", dificultad: "BASICO",
          preguntas: [
            {
              texto: "¿Cuál debe ser su actitud técnica ante un ciudadano molesto por demoras administrativas?",
              opciones: [
                { letra: "A", texto: "Escuchar con empatía, mantener la calma, brindar información veraz sobre el estado del trámite y dar alternativas de solución o tiempos estimados.", esCorrecta: true },
                { letra: "B", texto: "Gritarle también al ciudadano para que entienda que en la Gobernación hay mucho trabajo y poca gente.", esCorrecta: false },
                { letra: "C", texto: "Cerrar la ventanilla y decirle que vuelva otro día cuando esté de mejor humor para ser atendido.", esCorrecta: false }
              ],
              explicacion: "La opción A refleja las competencias de servicio al ciudadano y manejo de conflictos. Las otras opciones son faltas graves de respeto y ética pública."
            },
            {
              texto: "Al suministrar información sobre un trámite, ¿qué restricción legal debe considerar?",
              opciones: [
                { letra: "A", texto: "La reserva legal sobre datos personales sensibles o información protegida por ley, asegurando que solo el interesado o su apoderado accedan a ella.", esCorrecta: true },
                { letra: "B", texto: "Contarle los chismes de la oficina al ciudadano para que se distraiga y se le olvide que está molesto por el pago.", esCorrecta: false },
                { letra: "C", texto: "Entregarle el expediente original al ciudadano para que él mismo lo lleve a la otra oficina y así 'agilice' el trámite.", esCorrecta: false }
              ],
              explicacion: "La opción A cumple con la Ley 1581 de Protección de Datos y la Ley 1712 de Transparencia. Las otras opciones son conductas no profesionales o riesgosas para la custodia documental."
            },
            {
              texto: "¿Qué valor de la integridad pública se destaca al atender con diligencia las solicitudes de los ciudadanos?",
              opciones: [
                { letra: "A", texto: "El Respeto y la Diligencia, reconociendo que el servidor público está para servir a la comunidad con excelencia.", esCorrecta: true },
                { letra: "B", texto: "La Piedad, atendiendo rápido al ciudadano solo porque le dio lástima verlo tan enojado.", esCorrecta: false },
                { letra: "C", texto: "La Indiferencia, cumpliendo con el horario de atención sin interesarse realmente por solucionar el problema del ciudadano.", esCorrecta: false }
              ],
              explicacion: "La opción A es el pilar del Código de Integridad. Las otras opciones son sentimientos o posturas negativas del servidor público."
            }
          ]
        }
      ]
    },
    {
      simoId: "242622", // DIAN - Gestor I (Operaciones Aduaneras)
      escenarios: [
        {
          contenido: "Usted es Gestor I en la DIAN, encargado de atender las operaciones aduaneras de ingreso de mercancías. Un importador presenta una declaración de importación de maquinaria industrial, pero al realizar la inspección física, usted detecta que la clasificación arancelaria declarada no corresponde a la naturaleza técnica de la máquina, lo que resultaría en un menor pago de tributos aduaneros. Usted debe realizar la reclasificación, proyectar el acta de inspección con las observaciones técnicas y asegurar que se liquiden correctamente los impuestos para proteger el recaudo nacional.",
          categoria: "Operaciones Aduaneras / Clasificación", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cuál es el criterio técnico para determinar la clasificación arancelaria de una mercancía?",
              opciones: [
                { letra: "A", texto: "La aplicación de las Reglas Generales de Interpretación del Arancel de Aduanas y las Notas Explicativas de la partida correspondiente.", esCorrecta: true },
                { letra: "B", texto: "Preguntarle al importador cuál es la partida que él prefiere para pagar menos impuestos este año.", esCorrecta: false },
                { letra: "C", texto: "Buscar en Google Imágenes y clasificar la máquina basándose en el color y el tamaño aparente.", esCorrecta: false }
              ],
              explicacion: "La opción A es el procedimiento técnico legal establecido por la OMA y la legislación aduanera colombiana. Las otras opciones carecen de rigor técnico y legal."
            },
            {
              texto: "Ante una discrepancia en la clasificación arancelaria, ¿qué acción administrativa debe tomar?",
              opciones: [
                { letra: "A", texto: "Consignar la novedad en el acta de inspección, proponer el cambio de partida y suspender el levante hasta que se realice la corrección y el pago de la diferencia.", esCorrecta: true },
                { letra: "B", texto: "Aceptar la declaración así para no retrasar el comercio exterior y evitar que el importador se moleste con la DIAN.", esCorrecta: false },
                { letra: "C", texto: "Pedirle al importador que le regale una parte del dinero que se ahorró con la mala clasificación.", esCorrecta: false }
              ],
              explicacion: "La opción A cumple con los deberes de control y protección del recaudo. Las otras opciones son negligencias o actos de corrupción."
            },
            {
              texto: "¿Qué principio rige la labor de control aduanero para garantizar la competencia leal?",
              opciones: [
                { letra: "A", texto: "La Igualdad y la Justicia Tributaria, asegurando que todos los importadores cumplan con las mismas reglas y cargas impositivas.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'Favorecer a los Grandes', permitiendo que las empresas famosas no paguen impuestos para que sigan trayendo cosas al país.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Dificultad Extrema', tratando de que ningún importador pueda sacar su mercancía rápido de la aduana.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la gestión con los fines del Estado Social de Derecho. Las otras opciones son injusticias o ineficiencias administrativas."
            }
          ]
        },
        {
          contenido: "Como Gestor de la DIAN, recibe una solicitud de aprobación de una garantía global para un usuario aduanero permanente (UAP). Nota que la póliza de seguros tiene una vigencia menor a la exigida por la norma y que el objeto del seguro no cubre todas las obligaciones aduaneras que el usuario pretende garantizar. Usted debe proyectar el requerimiento de subsanación, explicar técnicamente los errores detectados y asegurar que el Estado cuente con un respaldo jurídico sólido para el recaudo de posibles sanciones.",
          categoria: "Garantías Aduaneras / Control", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Por qué es vital que el objeto de la póliza de garantía sea exacto según la normativa aduanera?",
              opciones: [
                { letra: "A", texto: "Para garantizar que, en caso de incumplimiento, la aseguradora no pueda alegar exclusiones y el Estado pueda hacer efectivo el cobro de tributos y multas.", esCorrecta: true },
                { letra: "B", texto: "Para que la póliza se vea más profesional y elegante dentro del expediente del usuario aduanero.", esCorrecta: false },
                { letra: "C", texto: "Para que las aseguradoras ganen más dinero cobrando pólizas con lenguaje muy complicado.", esCorrecta: false }
              ],
              explicacion: "La opción A identifica el fin legal de la garantía como protección del erario público. Las otras opciones son visiones banales o erróneas."
            },
            {
              texto: "Ante una póliza con vigencia insuficiente, ¿cuál es el procedimiento legal correcto?",
              opciones: [
                { letra: "A", texto: "No aprobar la garantía y emitir un requerimiento otorgando un plazo legal para presentar el anexo modificatorio con la vigencia correcta.", esCorrecta: true },
                { letra: "B", texto: "Aprobarla así y pedirle al usuario que por favor se acuerde de renovarla el próximo mes 'por la buena fe'.", esCorrecta: false },
                { letra: "C", texto: "Gritarle al representante legal del usuario por ser tan descuidado con sus trámites ante la DIAN.", esCorrecta: false }
              ],
              explicacion: "La opción A cumple con el debido proceso y protege los intereses del Estado. Las otras opciones son negligencias o conductas no profesionales."
            },
            {
              texto: "¿Qué valor del servidor público se destaca al proteger el recaudo nacional mediante la revisión de garantías?",
              opciones: [
                { letra: "A", texto: "La Honestidad y la Responsabilidad, asegurando que nadie evada sus compromisos legales con el país.", esCorrecta: true },
                { letra: "B", texto: "La Tacañería, tratando de que los usuarios aduaneros gasten mucho dinero en seguros costosos.", esCorrecta: false },
                { letra: "C", texto: "La Indiferencia, aprobando cualquier papel que le entreguen para terminar rápido su jornada laboral.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la actuación con los principios éticos de la DIAN. Las otras opciones son visiones negativas o negligentes."
            }
          ]
        }
      ]
    },
    {
      simoId: "236700", // DIAN - Gestor III (Jurídico/Precios de Transferencia)
      escenarios: [
        {
          contenido: "Usted es Gestor III en el área jurídica de la DIAN, especializado en precios de transferencia. Debe analizar el informe local de una multinacional que reporta compras de servicios de consultoría a su casa matriz en el exterior por valores significativamente superiores a los del mercado. Usted debe evaluar si se cumple el principio de plena competencia (Arm's Length), proyectar el concepto técnico sobre la posible erosión de la base gravable en Colombia y sugerir las correcciones en la declaración de renta de la compañía para evitar la fuga de capitales mediante operaciones vinculadas.",
          categoria: "Precios de Transferencia / Tributario", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Qué busca el 'Principio de Plena Competencia' (Arm's Length) en las operaciones entre vinculados?",
              opciones: [
                { letra: "A", texto: "Asegurar que los precios pactados entre empresas del mismo grupo sean iguales a los que se pactarían entre partes independientes en condiciones similares.", esCorrecta: true },
                { letra: "B", texto: "Permitir que las multinacionales no paguen impuestos en Colombia para incentivar la inversión extranjera a cualquier costo.", esCorrecta: false },
                { letra: "C", texto: "Lograr que todas las empresas del mundo cobren exactamente el mismo precio por el mismo servicio sin importar el país.", esCorrecta: false }
              ],
              explicacion: "La opción A define el estándar internacional (OCDE) adoptado por Colombia en el Estatuto Tributario para el control de precios de transferencia. Las otras opciones son erróneas."
            },
            {
              texto: "Al detectar precios inflados en servicios del exterior, ¿cuál es el impacto fiscal principal?",
              opciones: [
                { letra: "A", texto: "La disminución artificial de la utilidad neta en Colombia mediante gastos excesivos, lo que reduce el impuesto de renta a pagar al Estado.", esCorrecta: true },
                { letra: "B", texto: "Que la empresa multinacional tenga menos dinero para pagarle el sueldo a sus empleados en el extranjero.", esCorrecta: false },
                { letra: "C", texto: "Que el dólar suba de precio porque las empresas están mandando mucho dinero fuera del país.", esCorrecta: false }
              ],
              explicacion: "La opción A identifica técnicamente el riesgo de erosión de la base imponible y traslado de beneficios (BEPS). Las otras opciones son visiones banales o macroeconómicas ajenas al control tributario puntual."
            },
            {
              texto: "¿Qué valor de la integridad pública se destaca al enfrentar la planeación tributaria agresiva de grandes capitales?",
              opciones: [
                { letra: "A", texto: "La Justicia y el Compromiso con el bien común, asegurando que las grandes corporaciones contribuyan equitativamente al sostenimiento del país.", esCorrecta: true },
                { letra: "B", texto: "La Envidia, tratando de quitarle dinero a las empresas exitosas solo porque ganan mucho dinero.", esCorrecta: false },
                { letra: "C", texto: "La Cobardía, aceptando los argumentos de la multinacional por miedo a sus abogados internacionales de alto nivel.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la labor técnica con la ética del recaudo equitativo. Las otras opciones son sentimientos negativos o faltas de carácter profesional."
            }
          ]
        },
        {
          contenido: "Como Gestor Jurídico de la DIAN, debe representar a la entidad en un comité de conciliación para decidir si se acepta una propuesta de transacción en un proceso judicial complejo de liquidación oficial. Debe realizar el análisis costo-beneficio, evaluar las probabilidades de éxito en la última instancia judicial y proyectar la recomendación técnica que proteja los intereses patrimoniales de la Nación, evitando condenas que generen intereses de mora onerosos para la entidad.",
          categoria: "Conciliación Contencioso-Administrativa", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cuál es el criterio principal para recomendar una conciliación judicial por parte de la DIAN?",
              opciones: [
                { letra: "A", texto: "La existencia de una alta probabilidad de condena contra la entidad y el riesgo de un mayor detrimento patrimonial por intereses y costas procesales.", esCorrecta: true },
                { letra: "B", texto: "Que el abogado de la contraparte sea un buen amigo del funcionario de la DIAN y le haya pedido el favor de conciliar.", esCorrecta: false },
                { letra: "C", texto: "Conciliar siempre para que los jueces tengan menos trabajo y puedan irse a descansar temprano a sus casas.", esCorrecta: false }
              ],
              explicacion: "La opción A refleja la política de defensa jurídica del Estado y la gestión eficiente de la litigiosidad. Las otras opciones son actos de corrupción o visiones ajenas a la responsabilidad administrativa."
            },
            {
              texto: "En cuanto al cálculo de la probabilidad de éxito, ¿qué debe analizar el Gestor Jurídico?",
              opciones: [
                { letra: "A", texto: "La jurisprudencia unificada del Consejo de Estado sobre el tema, la solidez de las pruebas aportadas y el cumplimiento del debido proceso administrativo.", esCorrecta: true },
                { letra: "B", texto: "Cuántos seguidores tiene la empresa demandante en sus redes sociales para ver si pueden generar mala prensa contra la DIAN.", esCorrecta: false },
                { letra: "C", texto: "El horóscopo del día de la audiencia para ver si los astros favorecen la posición legal de la entidad.", esCorrecta: false }
              ],
              explicacion: "La opción A utiliza criterios técnicos de análisis jurídico profesional. Las otras opciones carecen de rigor y racionalidad."
            },
            {
              texto: "¿Qué principio rige la actuación del servidor público en un comité de conciliación?",
              opciones: [
                { letra: "A", texto: "La Legalidad y la Protección del Patrimonio Público, buscando siempre la solución más favorable para los intereses del Estado.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'Generosidad', regalando el dinero del Estado a cualquier ciudadano que demande a la DIAN por cualquier motivo.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Obstinación', negándose a conciliar siempre, incluso cuando se sabe que la DIAN va a perder el proceso judicial.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la gestión con los fines del Estado y la eficiencia administrativa. Las otras opciones son negligencias o conductas temerarias."
            }
          ]
        }
      ]
    },
    {
      simoId: "243245", // BUCARAMANGA - Auxiliar Área Salud (Vacunación/Vigilancia)
      escenarios: [
        {
          contenido: "Usted es Auxiliar de Enfermería en la Secretaría de Salud de Bucaramanga. Debe participar en una jornada masiva de vacunación del Programa Ampliado de Inmunizaciones (PAI) en un barrio con bajos índices de cobertura. Al llegar al puesto de salud, nota que el refrigerador de vacunas marca una temperatura de 10°C, fuera del rango permitido (2°C a 8°C). Usted debe suspender la vacunación, activar el protocolo de cadena de frío, reportar la novedad al supervisor y asegurar que los biológicos no pierdan su efectividad para proteger la salud de los niños de la comunidad.",
          categoria: "Cadena de Frío y Vacunación (PAI)", dificultad: "BASICO",
          preguntas: [
            {
              texto: "¿Cuál es el rango de temperatura óptimo para la conservación de la mayoría de vacunas del PAI?",
              opciones: [
                { letra: "A", texto: "Entre +2°C y +8°C constantes, para garantizar la potencia inmunológica de los biológicos.", esCorrecta: true },
                { letra: "B", texto: "Entre -10°C y 0°C, para que las vacunas se mantengan bien congeladas como helados.", esCorrecta: false },
                { letra: "C", texto: "A temperatura ambiente, siempre y cuando no les dé el sol de Bucaramanga directamente.", esCorrecta: false }
              ],
              explicacion: "La opción A es el estándar técnico de salud pública para la red de frío. Las otras opciones inactivan las vacunas o dañan su estructura."
            },
            {
              texto: "Ante la ruptura de la cadena de frío (10°C), ¿cuál es su responsabilidad técnica inmediata?",
              opciones: [
                { letra: "A", texto: "Trasladar las vacunas a un termo debidamente preparado, no aplicarlas, y diligenciar el acta de rotura de cadena de frío para evaluación técnica.", esCorrecta: true },
                { letra: "B", texto: "Seguir vacunando a los niños rápidamente para que las vacunas no se calienten más mientras están fuera del refrigerador.", esCorrecta: false },
                { letra: "C", texto: "Echarle cubos de hielo picado dentro del refrigerador para ver si la temperatura baja mágicamente en cinco minutos.", esCorrecta: false }
              ],
              explicacion: "La opción A garantiza la seguridad del paciente y el manejo técnico de insumos en salud. Las otras opciones son negligencias peligrosas o soluciones ineficaces."
            },
            {
              texto: "¿Qué valor del servidor público se destaca al priorizar la seguridad del paciente sobre la meta de vacunación?",
              opciones: [
                { letra: "A", texto: "La Honestidad y el Compromiso con la vida, actuando con rectitud aunque eso implique no cumplir con la meta diaria programada.", esCorrecta: true },
                { letra: "B", texto: "La Cobardía, teniendo miedo de aplicar las vacunas solo porque el termómetro marcó un número un poquito más alto de lo normal.", esCorrecta: false },
                { letra: "C", texto: "La Indiferencia, dejando que las vacunas se dañen sin avisarle a nadie para no tener que llenar papeles de reporte.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la labor asistencial con el Código de Integridad. Las otras opciones son juicios negativos o negligentes."
            }
          ]
        },
        {
          contenido: "Como Auxiliar de Salud en Bucaramanga, realiza visitas de vigilancia epidemiológica para identificar focos de reproducción del mosquito Aedes Aegypti (Dengue) en viviendas. Identifica una casa con múltiples recipientes de agua estancada y llantas viejas. Usted debe realizar la educación sanitaria a la familia, explicar el ciclo de vida del mosquito, sugerir la eliminación de criaderos y registrar el hallazgo en el sistema de información de salud pública municipal.",
          categoria: "Vigilancia Epidemiológica / Dengue", dificultad: "BASICO",
          preguntas: [
            {
              texto: "¿Cuál es la recomendación técnica más efectiva para prevenir la reproducción del mosquito transmisor del Dengue?",
              opciones: [
                { letra: "A", texto: "Lavar y cepillar los tanques de agua cada 8 días, tapar los recipientes y eliminar cualquier objeto que pueda acumular agua lluvia.", esCorrecta: true },
                { letra: "B", texto: "Fumigar la casa con insecticida para moscas todos los días antes de irse a dormir.", esCorrecta: false },
                { letra: "C", texto: "Cerrar todas las ventanas de la casa para que el aire no circule y el mosquito se asfixie por falta de oxígeno.", esCorrecta: false }
              ],
              explicacion: "La opción A es la estrategia de control físico y social más efectiva recomendada por la OMS y el Ministerio de Salud. Las otras opciones son ineficaces o peligrosas para la salud."
            },
            {
              texto: "En cuanto al registro de la información, ¿por qué es vital que el Auxiliar sea preciso en los datos de la vivienda?",
              opciones: [
                { letra: "A", texto: "Para permitir que el equipo de salud pública identifique los conglomerados (clúster) de riesgo y planifique intervenciones de fumigación selectiva.", esCorrecta: true },
                { letra: "B", texto: "Para que la Alcaldía sepa quiénes son las personas más desordenadas del barrio y les ponga una multa económica.", esCorrecta: false },
                { letra: "C", texto: "Para llenar el mapa de Bucaramanga con muchos puntos rojos y que parezca que la Secretaría de Salud está muy ocupada.", esCorrecta: false }
              ],
              explicacion: "La opción A fundamenta la toma de decisiones basada en evidencia epidemiológica. Las otras opciones son visiones punitivas o banales de la gestión pública."
            },
            {
              texto: "¿Qué principio rige la labor educativa del auxiliar de salud en la comunidad?",
              opciones: [
                { letra: "A", texto: "La Corresponsabilidad ciudadana en la salud, empoderando a la familia para que sea gestora de su propio bienestar ambiental.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'Sermonear', regañando a la gente por ser descuidada con sus llantas viejas y su basura.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Invasión de Privacidad', entrando a las casas de la gente sin permiso para revisar debajo de las camas.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la gestión con los modelos de promoción de la salud. Las otras opciones son conductas irrespetuosas o ilegales."
            }
          ]
        }
      ]
    },
    {
      simoId: "241205", // IPYBAC - Prof. Universitario (Veterinario/Esterilización)
      escenarios: [
        {
          contenido: "Usted es Médico Veterinario en el Instituto de Protección y Bienestar Animal de Cundinamarca (IPYBAC). Debe liderar una jornada de esterilización canina y felina en un municipio lejano del departamento. Recibe a un perro mestizo para cirugía, pero al realizar el examen clínico previo, nota que el animal presenta fiebre, mucosas pálidas y signos de dificultad respiratoria. Usted debe decidir si procede con la cirugía, explicar al propietario los riesgos y asegurar que el bienestar del animal sea la prioridad técnica del programa departamental.",
          categoria: "Bienestar Animal / Técnica Quirúrgica", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Qué decisión técnica debe tomar respecto a la cirugía del perro con signos de enfermedad?",
              opciones: [
                { letra: "A", texto: "Suspender la cirugía, no someter al animal al riesgo anestésico y orientar al propietario para que inicie tratamiento médico prioritario.", esCorrecta: true },
                { letra: "B", texto: "Operarlo de todas formas para cumplir con la meta de cirugías del día y no perder el viaje hasta ese municipio.", esCorrecta: false },
                { letra: "C", texto: "Pedirle al dueño que firme un papel donde diga que si el perro se muere en la cirugía la culpa es de la mala suerte del animal.", esCorrecta: false }
              ],
              explicacion: "La opción A cumple con los principios de bioética y técnica profesional veterinaria. Las otras opciones son negligencias gravísimas o actos deshonestos."
            },
            {
              texto: "En cuanto al protocolo anestésico, ¿cuál es su responsabilidad técnica como Veterinario del IPYBAC?",
              opciones: [
                { letra: "A", texto: "Calcular la dosis exacta según el peso y estado clínico, monitorear los signos vitales durante todo el proceso y asegurar una recuperación controlada.", esCorrecta: true },
                { letra: "B", texto: "Ponerle la misma cantidad de anestesia a todos los perros para no perder tiempo pesándolos uno por uno.", esCorrecta: false },
                { letra: "C", texto: "Dejar al animal solo en una jaula después de la cirugía mientras usted se va a almorzar con los otros funcionarios de la Alcaldía.", esCorrecta: false }
              ],
              explicacion: "La opción A es el estándar de práctica clínica segura. Las otras opciones son negligencias que comprometen la vida del animal."
            },
            {
              texto: "¿Qué valor del servidor público se destaca al proteger la vida de los animales vulnerables de Cundinamarca?",
              opciones: [
                { letra: "A", texto: "La Compasión y la Responsabilidad, actuando con ética y rigor científico en beneficio de los seres sintientes.", esCorrecta: true },
                { letra: "B", texto: "La Vanidad, presumiendo ante los campesinos que usted es el único doctor que sabe operar perros en todo el departamento.", esCorrecta: false },
                { letra: "C", texto: "La Indiferencia, tratando a los animales como si fueran objetos inanimados que no sienten dolor durante los procedimientos.", esCorrecta: false }
              ],
              explicacion: "La opción A alinea la labor con la Ley 1774 de 2016 y el Código de Integridad. Las otras opciones son conductas arrogantes o crueles."
            }
          ]
        },
        {
          contenido: "Como Veterinario del IPYBAC, apoya la formulación de una estrategia preventiva contra el maltrato animal en zonas rurales. Debe realizar la inspección a un albergue privado que recibe subsidios del departamento y nota que los animales viven en condiciones de hacinamiento y falta de higiene. Usted debe documentar la situación, proyectar el informe técnico para suspender el apoyo financiero y asegurar que el Instituto active las rutas de protección legal para el traslado de los animales a un lugar seguro.",
          categoria: "Inspección y Vigilancia / Protección Animal", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Qué criterio técnico define el 'bienestar animal' en un albergue o refugio?",
              opciones: [
                { letra: "A", texto: "El cumplimiento de las 'cinco libertades' (libre de hambre/sed, incomodidades, dolor/enfermedad, miedo y capaz de expresar su comportamiento natural).", esCorrecta: true },
                { letra: "B", texto: "Que los animales tengan un techo de color bonito y que la gente del refugio les ponga nombres de personajes de películas famosas.", esCorrecta: false },
                { letra: "C", texto: "Que el refugio esté ubicado en una zona donde el ruido de los ladridos no moleste a los vecinos que tienen mucho dinero.", esCorrecta: false }
              ],
              explicacion: "La opción A es el marco técnico internacional de bienestar animal. Las otras opciones son criterios irrelevantes o banales."
            },
            {
              texto: "Ante el hallazgo de maltrato por negligencia en el albergue, ¿cuál es su deber legal?",
              opciones: [
                { letra: "A", texto: "Reportar formalmente el hallazgo a la autoridad policiva o inspectora y sustentar técnicamente la medida de aprehensión preventiva de los animales.", esCorrecta: true },
                { letra: "B", texto: "Darle un consejo de limpieza al dueño del albergue y volver dentro de un año a ver si por casualidad ya limpió las jaulas.", esCorrecta: false },
                { letra: "C", texto: "No decir nada porque el dueño del albergue es una persona muy influyente en la política del departamento de Cundinamarca.", esCorrecta: false }
              ],
              explicacion: "La opción A cumple con el deber de denuncia y protección establecido en la ley. Las otras opciones son omisiones de funciones o actos de complicidad."
            },
            {
              texto: "¿Qué principio rige la actuación del veterinario oficial como garante de derechos de los animales?",
              opciones: [
                { letra: "A", texto: "El principio de Solidaridad Social y la Prevalencia del Bienestar Animal como un fin de interés general y ético de la sociedad.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'Ahorro Presupuestal', tratando de que el Estado no gaste dinero en rescatar animales que están sufriendo.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Propiedad Privada', asumiendo que si el dueño del albergue quiere tener a los perros sucios es su decisión personal.", esCorrecta: false }
              ],
              explicacion: "La opción A refleja el espíritu de la legislación protectora de animales en Colombia. Las otras opciones son negligencias éticas."
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
