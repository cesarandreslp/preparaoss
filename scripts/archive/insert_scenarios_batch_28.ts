import { PrismaClient, TipoPregunta, NivelDificultad } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const dataToInsert: any[] = [
    {
      simoId: "225430", // DIAN - Gestor II (Financiero/Caja Menor/Presupuesto)
      escenarios: [
        {
          contenido: "Usted es Gestor II en la DIAN. Tiene a su cargo el manejo de la caja menor de la Dirección Seccional. A final de mes, un funcionario del área de fiscalización le solicita el reembolso urgente de gastos de transporte intermunicipal (taxis) usados en un operativo, pero los recibos que presenta no tienen el número de placa del vehículo ni están firmados por el conductor. Usted debe revisar los soportes, decidir sobre el reembolso y garantizar el adecuado funcionamiento de la caja menor.",
          categoria: "Gestión de Tesorería / Caja Menor", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cuál es el criterio técnico para proceder ante recibos de transporte con información incompleta?",
              opciones: [
                { letra: "A", texto: "Rechazar el reembolso y devolver los recibos al funcionario para que subsane los requisitos legales mínimos exigidos para legalizar el gasto.", esCorrecta: true },
                { letra: "B", texto: "Reembolsar el dinero de todas formas porque el operativo de fiscalización es una función misional muy importante para la DIAN.", esCorrecta: false },
                { letra: "C", texto: "Firmar usted mismo los recibos y ponerles cualquier placa inventada para que pasen la revisión de la auditoría interna.", esCorrecta: false }
              ],
              explicacion: "La opción A aplica el rigor documental exigido en el manejo de fondos públicos (Resoluciones de Caja Menor). Las otras opciones son irregularidades graves y falsedades."
            },
            {
              texto: "En el marco de las estrategias de mejoramiento continuo del proceso financiero, ¿qué acción preventiva debe implementar ante la recurrencia de este error?",
              opciones: [
                { letra: "A", texto: "Diseñar y socializar un instructivo claro sobre los requisitos para la legalización de gastos de transporte por caja menor y realizar capacitaciones al personal operativo.", esCorrecta: true },
                { letra: "B", texto: "Eliminar el reembolso de transporte por caja menor para que los funcionarios aprendan a pedir factura electrónica a los taxistas.", esCorrecta: false },
                { letra: "C", texto: "Cobrarle una multa de su propio bolsillo a los funcionarios que traigan recibos mal diligenciados.", esCorrecta: false }
              ],
              explicacion: "La opción A es una gestión de riesgos proactiva y educativa. Las otras opciones son inaplicables o arbitrarias."
            },
            {
              texto: "¿Qué principio rige la revisión minuciosa de los soportes de caja menor?",
              opciones: [
                { letra: "A", texto: "La Legalidad y la Transparencia, asegurando que cada peso público erogado esté debidamente justificado y soportado ante los entes de control.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'Solidaridad de equipo', ayudando a los compañeros a legalizar gastos así las facturas no sirvan.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Exageración administrativa', porque pedirle la placa al taxi es una exageración de los financieros.", esCorrecta: false }
              ],
              explicacion: "La opción A sustenta la función de control previo inherente a la tesorería. Las otras son conductas inapropiadas en el servicio público."
            }
          ]
        },
        {
          contenido: "Como Gestor II de la DIAN, usted debe elaborar el presupuesto de la Dirección Seccional. Al revisar los datos del año anterior, nota que un rubro específico (mantenimiento de equipos) fue sobreestimado y no se ejecutó en su totalidad, mientras que el rubro de papelería fue insuficiente. Al solicitar las proyecciones a las áreas, vuelven a pedir el mismo incremento del 10% para todos los rubros. Usted debe aplicar estrategias de mejoramiento continuo, analizar la realidad económica y formular un presupuesto ajustado a las necesidades reales.",
          categoria: "Planeación Financiera / Presupuesto", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cuál es el enfoque correcto para elaborar el nuevo presupuesto ante el comportamiento histórico observado?",
              opciones: [
                { letra: "A", texto: "Aplicar la técnica de presupuesto base cero o basado en resultados, ajustando a la baja el rubro de mantenimiento por su subejecución y justificando técnicamente el aumento real en papelería.", esCorrecta: true },
                { letra: "B", texto: "Aprobar el incremento del 10% lineal para todos los rubros porque es la tradición en la entidad y así nadie discute.", esCorrecta: false },
                { letra: "C", texto: "Dejar en cero el rubro de mantenimiento para castigarlos por no haber gastado la plata el año pasado.", esCorrecta: false }
              ],
              explicacion: "La opción A representa una presupuestación técnica, eficiente y basada en evidencia. Las otras opciones son antitécnicas y caprichosas."
            },
            {
              texto: "Si el nivel central emite una directriz de recorte presupuestal del 15% para gastos generales de la seccional, ¿cómo debe proceder?",
              opciones: [
                { letra: "A", texto: "Convocar a los líderes de área para concertar el recorte, priorizando la reducción en gastos suntuarios o no esenciales y protegiendo el rubro necesario para la operación misional.", esCorrecta: true },
                { letra: "B", texto: "Recortar el 15% aleatoriamente a cualquier rubro sin importar si es de papelería, aseo o mantenimiento.", esCorrecta: false },
                { letra: "C", texto: "Ignorar la directriz del nivel central y mandar el presupuesto con el valor completo esperando que en Bogotá no se den cuenta.", esCorrecta: false }
              ],
              explicacion: "La opción A es un ejercicio de racionalización del gasto concertado y técnico. Las otras opciones son negligencias u omisiones directas."
            },
            {
              texto: "¿Qué valor del servidor público se refleja al asignar los recursos presupuestales basándose en las necesidades operativas reales y no en incrementos inerciales?",
              opciones: [
                { letra: "A", texto: "La Responsabilidad y el Compromiso, velando por la distribución óptima y eficiente de los recursos públicos encomendados a la seccional.", esCorrecta: true },
                { letra: "B", texto: "La Complacencia, queriendo quedar bien con el Ministerio de Hacienda demostrando que gasta poquita plata.", esCorrecta: false },
                { letra: "C", texto: "El Egoísmo, guardando la plata del presupuesto por si el área financiera llega a necesitar algo más adelante.", esCorrecta: false }
              ],
              explicacion: "La opción A está en el núcleo de la integridad y eficiencia administrativa. Las otras opciones distorsionan el objetivo del presupuesto."
            }
          ]
        }
      ]
    },
    {
      simoId: "225433", // DIAN - Facilitador II (Conductor/Logística)
      escenarios: [
        {
          contenido: "Usted es Facilitador II en la DIAN. Se le asigna la conducción de un vehículo oficial para transportar a un equipo de auditores tributarios a una zona rural de difícil acceso. Durante el viaje, el vehículo presenta una falla en el sistema de frenos por el desgaste del terreno. Usted debe garantizar la seguridad de los funcionarios, aplicar las medidas de mantenimiento preventivo y correctivo, y generar el reporte logístico correspondiente.",
          categoria: "Operación de Vehículos / Mantenimiento", dificultad: "BÁSICO",
          preguntas: [
            {
              texto: "¿Cuál es su acción inmediata al detectar la falla en los frenos en medio del trayecto?",
              opciones: [
                { letra: "A", texto: "Detener el vehículo en un lugar seguro utilizando el freno de motor o de emergencia de ser necesario, evacuar a los pasajeros y reportar inmediatamente la novedad para solicitar asistencia técnica o grúa.", esCorrecta: true },
                { letra: "B", texto: "Seguir conduciendo despacio y pedirle a los auditores que recen para que no pase nada grave en las bajadas.", esCorrecta: false },
                { letra: "C", texto: "Dejar el carro tirado en la vía, bajarse e irse caminando a buscar ayuda sin decirle nada a los pasajeros.", esCorrecta: false }
              ],
              explicacion: "La opción A prioriza la vida humana y sigue los protocolos de seguridad vial y reporte de novedades. Las otras son gravemente negligentes."
            },
            {
              texto: "Una vez solucionada la emergencia, ¿cómo debe documentar el incidente según sus funciones logísticas?",
              opciones: [
                { letra: "A", texto: "Diligenciar el formato de reporte de servicio, detallando la falla mecánica, el kilometraje y entregarlo al coordinador de parque automotor para el registro de la hoja de vida del vehículo.", esCorrecta: true },
                { letra: "B", texto: "No reportar nada porque el mecánico de la grúa le dijo que eso era un arreglo barato y no valía la pena el papeleo.", esCorrecta: false },
                { letra: "C", texto: "Publicar una foto del carro dañado en sus redes sociales quejándose de que la DIAN no le hace mantenimiento a los vehículos.", esCorrecta: false }
              ],
              explicacion: "La opción A asegura la trazabilidad, el control de activos y el mantenimiento preventivo futuro. Las otras opciones son omisiones y faltas éticas."
            },
            {
              texto: "¿Qué principio rige la responsabilidad de verificar los niveles de líquidos y frenos antes de iniciar una comisión?",
              opciones: [
                { letra: "A", texto: "La Prevención y el Cuidado de lo público, garantizando el buen estado de las herramientas asignadas para proteger la vida y los recursos.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'Buena Suerte', asumiendo que si el carro prendió hoy, va a funcionar bien todo el día.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Delegación técnica', porque revisar eso es trabajo exclusivo del mecánico, no del conductor.", esCorrecta: false }
              ],
              explicacion: "La opción A es el deber legal y moral de todo operador de parque automotor oficial (mantenimiento preoperacional). Las otras son irresponsables."
            }
          ]
        },
        {
          contenido: "Como Facilitador II, además de sus labores de conducción, se le solicita brindar apoyo logístico en el archivo de la Dirección Seccional debido a una acumulación crítica de expedientes de cobro persuasivo. El jefe de archivo le entrega una caja con documentos mezclados y le pide organizarlos cronológicamente y registrarlos en la matriz de control, siguiendo los lineamientos de gestión documental de la DIAN.",
          categoria: "Apoyo Administrativo / Gestión Documental", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cuál es el paso principal para realizar el apoyo logístico en gestión documental de expedientes misionales?",
              opciones: [
                { letra: "A", texto: "Aplicar la Tabla de Retención Documental (TRD) para clasificar los expedientes, ordenarlos cronológicamente y registrar con exactitud su ubicación en la base de datos o matriz asignada.", esCorrecta: true },
                { letra: "B", texto: "Hacer pilas de carpetas organizadas por color para que la oficina se vea más estética y bonita a la vista.", esCorrecta: false },
                { letra: "C", texto: "Leer todos los documentos de los contribuyentes para enterarse de quién le debe plata a la DIAN y luego archivarlos.", esCorrecta: false }
              ],
              explicacion: "La opción A sigue estrictamente la normatividad archivística y las instrucciones de la dependencia. Las otras son procedimentalmente erróneas o violan la confidencialidad."
            },
            {
              texto: "Si encuentra un documento que pertenece a un expediente clasificado como reservado, ¿cómo debe manejarlo?",
              opciones: [
                { letra: "A", texto: "Entregarlo inmediatamente a su superior o al encargado de custodia de archivo reservado, manteniendo estricta confidencialidad sobre su contenido.", esCorrecta: true },
                { letra: "B", texto: "Guardarlo en su casillero personal para que no se pierda y entregarlo al día siguiente cuando tenga tiempo.", esCorrecta: false },
                { letra: "C", texto: "Tomarle una foto y enviarla al grupo de WhatsApp de los compañeros de la DIAN preguntando de quién es ese papel.", esCorrecta: false }
              ],
              explicacion: "La opción A es el procedimiento obligatorio para salvaguardar la reserva tributaria. Las opciones B y C son faltas disciplinarias graves (infidencia)."
            },
            {
              texto: "¿Qué valor del servidor público se fortalece cuando un conductor asume labores administrativas de apoyo con diligencia?",
              opciones: [
                { letra: "A", texto: "El Compromiso y el Trabajo en Equipo, demostrando disposición para apoyar el cumplimiento de las metas globales de la entidad más allá de la conducción.", esCorrecta: true },
                { letra: "B", texto: "La Resignación, haciendo el trabajo de mala gana porque lo contrataron fue para manejar y no para acomodar papeles.", esCorrecta: false },
                { letra: "C", texto: "La Pereza, escondiéndose en el parqueadero y fingiendo que está limpiando el carro todo el día para no ir al archivo.", esCorrecta: false }
              ],
              explicacion: "La opción A refleja el espíritu de servicio y adaptación exigido en el nivel asistencial del sector público. Las otras son actitudes sancionables."
            }
          ]
        }
      ]
    },
    {
      simoId: "225434", // DIAN - Gestor III (Recursos Administrativos/Bienes/Contratos)
      escenarios: [
        {
          contenido: "Usted es Gestor III en la DIAN. Tiene a su cargo el seguimiento a un contrato de dotación de mobiliario y equipos electromecánicos para una nueva sede seccional. Durante la verificación técnica de entrega, usted nota que las especificaciones de los aires acondicionados instalados (BTU y eficiencia energética) son inferiores a las descritas en el pliego de condiciones, aunque el contratista argumenta que 'enfrían igual'. Usted debe proyectar el concepto técnico, aplicar la normativa contractual y gestionar el incumplimiento de las garantías.",
          categoria: "Recursos Administrativos / Contratación Estatal", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cuál es la acción administrativa correcta ante el suministro de bienes con especificaciones inferiores a las pactadas?",
              opciones: [
                { letra: "A", texto: "Rechazar la entrega, no firmar el acta de recibo a satisfacción, requerir al contratista por escrito para que sustituya los equipos y proyectar el inicio de un proceso sancionatorio si no subsana.", esCorrecta: true },
                { letra: "B", texto: "Recibir los equipos dejándolos instalados porque igual hacen frío, y pedirle al contratista que devuelva la diferencia de dinero en efectivo a la caja de la DIAN.", esCorrecta: false },
                { letra: "C", texto: "Firmar el acta a satisfacción para no demorar la inauguración de la sede, asumiendo que nadie se va a dar cuenta de los BTU.", esCorrecta: false }
              ],
              explicacion: "La opción A protege los intereses del Estado y exige el cumplimiento estricto del contrato estatal (Ley 80). Las otras opciones son faltas graves (peculado, prevaricato, omisión)."
            },
            {
              texto: "En caso de que el contratista no sustituya los equipos, ¿qué paso sigue en el proceso de liquidación y seguimiento?",
              opciones: [
                { letra: "A", texto: "Proyectar el acto administrativo declarando el incumplimiento, hacer efectiva la garantía de cumplimiento y de calidad del contrato y reportar al supervisor.", esCorrecta: true },
                { letra: "B", texto: "Dar por terminado el contrato de manera verbal y buscar a otro contratista en Google para que termine el trabajo.", esCorrecta: false },
                { letra: "C", texto: "Aceptar que el Estado perdió ese dinero e instalar ventiladores adicionales comprados por caja menor.", esCorrecta: false }
              ],
              explicacion: "La opción A es la ruta jurídica obligatoria para resarcir el daño al Estado mediante las aseguradoras. Las otras opciones son negligencia administrativa."
            },
            {
              texto: "¿Qué principio de la función administrativa se salvaguarda al no aceptar equipos de menor calidad?",
              opciones: [
                { letra: "A", texto: "La Eficiencia, la Moralidad y la Selección Objetiva, asegurando que el Estado reciba exactamente por lo que pagó según los estudios previos.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'Conveniencia visual', porque un aire acondicionado más pequeño se ve más bonito en la pared de la oficina.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'No molestar al contratista', para mantener buenas relaciones con el sector privado.", esCorrecta: false }
              ],
              explicacion: "La opción A conecta la decisión operativa con los principios rectores de la contratación pública. Las otras opciones son falacias."
            }
          ]
        },
        {
          contenido: "Como Gestor de Recursos Administrativos de la DIAN, se le encarga viabilizar la disposición final de un lote de vehículos y mobiliario de oficina obsoleto (dados de baja) que ocupan espacio crítico en la bodega principal. Usted debe elaborar el diagnóstico, realizar los estudios previos y adelantar el trámite administrativo para la enajenación (remate o venta) de estos bienes muebles de propiedad de la entidad.",
          categoria: "Administración de Bienes / Disposición Final", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Qué requisito técnico previo es indispensable para iniciar el proceso de enajenación de bienes muebles dados de baja?",
              opciones: [
                { letra: "A", texto: "Contar con la resolución de baja de los bienes, el concepto técnico de obsolescencia y un avalúo comercial actualizado para fijar el precio base de enajenación.", esCorrecta: true },
                { letra: "B", texto: "Pedirle permiso verbal al Director de la DIAN y buscar un chatarrero de confianza para que se lleve todo rápidamente.", esCorrecta: false },
                { letra: "C", texto: "Publicar fotos de los muebles en una plataforma de ventas por internet a nombre propio y luego consignar la plata a la DIAN.", esCorrecta: false }
              ],
              explicacion: "La opción A cumple con los manuales de administración de bienes y el Estatuto de Contratación Pública (enajenación a título oneroso). Las otras opciones son ilegales (venta directa irregular)."
            },
            {
              texto: "En la proyección del acto administrativo de enajenación, ¿qué procedimiento debe seleccionarse preferentemente para la venta de estos bienes?",
              opciones: [
                { letra: "A", texto: "La venta mediante subasta pública (presencial o electrónica) a través de intermediarios idóneos como Martillo del Banco Popular o plataformas del Estado.", esCorrecta: true },
                { letra: "B", texto: "La venta directa y exclusiva a los propios funcionarios de la DIAN como beneficio laboral para que amueblen sus casas.", esCorrecta: false },
                { letra: "C", texto: "Regalar los carros y los muebles al primero que llegue a la bodega con un camión de trasteos.", esCorrecta: false }
              ],
              explicacion: "La opción A es el mecanismo establecido por la ley (Ley 1150 de 2007) para garantizar pluralidad, transparencia y el mejor precio para el Estado. Las otras violan la ley."
            },
            {
              texto: "¿Qué valor institucional demuestra el Gestor III al realizar los avalúos comerciales con peritos independientes y certificados?",
              opciones: [
                { letra: "A", texto: "La Transparencia y el cuidado del patrimonio público, evitando subestimar el valor de los activos del Estado para favorecer a terceros.", esCorrecta: true },
                { letra: "B", texto: "La Astucia, porque el perito independiente cobra más barato que el de la entidad y así le sobra plata a la DIAN.", esCorrecta: false },
                { letra: "C", texto: "El Perfeccionismo extremo, porque esos carros viejos ya no valen nada y es perder el tiempo haciendo avalúos.", esCorrecta: false }
              ],
              explicacion: "La opción A reconoce el deber ético fundamental frente a los activos de la nación. Las otras opciones demuestran ligereza en la gestión pública."
            }
          ]
        }
      ]
    },
    {
      simoId: "225435", // DIAN - Gestor III (Recursos Administrativos) - Mismas competencias
      escenarios: [
        {
          contenido: "Usted es Gestor III en la DIAN, responsable de la infraestructura física. Recibe múltiples quejas de alta complejidad por parte del Sindicato y de funcionarios sobre el deterioro del sistema eléctrico en un edificio de la entidad, el cual ha generado cortocircuitos menores. Usted debe atender los requerimientos, gestionar un diagnóstico técnico inmediato y formular un proyecto de intervención urgente de adecuación eléctrica que debe ser contratado a la mayor brevedad para mitigar el riesgo laboral.",
          categoria: "Infraestructura y Mantenimiento / Urgencia Manifiesta", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cuál es el primer paso procedimental para atender la queja de alta complejidad sobre el riesgo eléctrico?",
              opciones: [
                { letra: "A", texto: "Solicitar un diagnóstico técnico o peritaje especializado inmediato para evaluar la magnitud del riesgo y proyectar la respuesta formal al sindicato informando las acciones emprendidas.", esCorrecta: true },
                { letra: "B", texto: "Ignorar las quejas del sindicato porque ellos siempre exageran y esperar a fin de año para revisar los cables.", esCorrecta: false },
                { letra: "C", texto: "Contratar directamente a un electricista empírico del barrio para que empate los cables quemados con cinta aislante mientras tanto.", esCorrecta: false }
              ],
              explicacion: "La opción A atiende el derecho de petición, gestiona el riesgo laboral (SST) y aplica criterios técnicos para la solución. Las otras son conductas omisivas o negligentes que agravan el peligro."
            },
            {
              texto: "Si el peritaje concluye que hay inminencia de un incendio estructural, ¿qué figura de contratación proyectaría para agilizar la intervención?",
              opciones: [
                { letra: "A", texto: "Proyectar la declaratoria de urgencia manifiesta, elaborando los estudios previos y la justificación técnica y jurídica que permita contratar de manera inmediata la mitigación del riesgo.", esCorrecta: true },
                { letra: "B", texto: "Iniciar una licitación pública que tarda 4 meses, porque la ley de contratación dice que siempre hay que hacer licitaciones para obras grandes.", esCorrecta: false },
                { letra: "C", texto: "Decirles a los empleados que trabajen desde la casa permanentemente y dejar el edificio abandonado para siempre.", esCorrecta: false }
              ],
              explicacion: "La opción A aplica la figura legal idónea (Ley 80/93) para situaciones probadas de riesgo inminente y fuerza mayor. Las otras demuestran desconocimiento legal o abandono de funciones."
            },
            {
              texto: "¿Qué principio rige la elaboración de los estudios previos para contratar la obra eléctrica de emergencia?",
              opciones: [
                { letra: "A", texto: "La Planeación (incluso en emergencias) y la Responsabilidad, asegurando que se contrate exactamente lo necesario, con las especificaciones RETIE y a precios razonables del mercado.", esCorrecta: true },
                { letra: "B", texto: "El principio del 'Desespero', contratando por el triple del valor comercial con tal de que arreglen rápido la luz.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Mínimo Esfuerzo', copiando un estudio previo de un contrato de pintura y cambiándole la palabra 'pintura' por 'cables'.", esCorrecta: false }
              ],
              explicacion: "La opción A equilibra la urgencia con la defensa del patrimonio estatal. La declaratoria de urgencia manifiesta no exonera del análisis de precios y especificaciones técnicas."
            }
          ]
        },
        {
          contenido: "Como Gestor de Recursos Administrativos, usted recibe la tarea de gestionar bienes inmuebles que la DIAN ha recibido en dación en pago por obligaciones fiscales (deudas de impuestos de contribuyentes). Uno de los inmuebles es una bodega rural invadida por ocupantes irregulares. Usted debe proyectar conceptos técnicos y adelantar gestiones ante autoridades de policía para restituir el bien, asegurar su saneamiento y viabilizar su posterior comercialización.",
          categoria: "Administración de Inmuebles / Bienes Recibidos en Pago", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Qué acción administrativa es prioritaria para proteger el patrimonio de la DIAN sobre el inmueble invadido?",
              opciones: [
                { letra: "A", texto: "Radicar una querella policiva por ocupación de hecho o amparo policivo para lograr la restitución material del bien, y realizar visitas técnicas de constatación.", esCorrecta: true },
                { letra: "B", texto: "Ir personalmente a pelear con los invasores y amenazarlos con quitarles sus beneficios sociales si no se van.", esCorrecta: false },
                { letra: "C", texto: "Cobrarles un arriendo barato a los invasores en efectivo y guardar la plata en la caja menor de la entidad.", esCorrecta: false }
              ],
              explicacion: "La opción A es el curso legal establecido en el Código de Policía y los manuales de gestión de activos. Las otras opciones son delitos (abuso de autoridad, concusión)."
            },
            {
              texto: "Una vez recuperado el inmueble, para viabilizar su comercialización o monetización, ¿qué concepto técnico debe proyectar?",
              opciones: [
                { letra: "A", texto: "Un concepto sobre el estado físico, jurídico (saneamiento de hipotecas/embargos) y fiscal (paz y salvos de predial), y la solicitud de avalúo comercial del predio.", esCorrecta: true },
                { letra: "B", texto: "Un documento diciendo que la bodega se ve bonita por fuera y que se puede vender rápido por Facebook.", esCorrecta: false },
                { letra: "C", texto: "Un ensayo sobre la importancia de la agricultura en Colombia, ya que la bodega queda en zona rural.", esCorrecta: false }
              ],
              explicacion: "La opción A detalla los elementos del 'Saneamiento Inmobiliario' exigido por CISA o la DIAN antes de disponer de bienes de la Nación. Las otras opciones carecen de rigor técnico."
            },
            {
              texto: "¿Qué valor de la función pública se afecta si usted retrasa injustificadamente los trámites de saneamiento y venta de estos inmuebles?",
              opciones: [
                { letra: "A", texto: "La Eficacia, porque el Estado deja de percibir el recaudo fiscal esperado y además incurre en gastos de vigilancia y mantenimiento del predio improductivo.", esCorrecta: true },
                { letra: "B", texto: "La Solidaridad, porque los contribuyentes que entregaron la bodega en dación en pago se van a sentir muy tristes de verla vacía.", esCorrecta: false },
                { letra: "C", texto: "Ninguno, al Estado no le afecta tener bodegas abandonadas porque el Estado tiene mucha plata.", esCorrecta: false }
              ],
              explicacion: "La opción A evidencia el concepto de 'costo de oportunidad' y detrimento patrimonial por inacción administrativa (Responsabilidad Fiscal). Las otras opciones son ignorantes de las finanzas públicas."
            }
          ]
        }
      ]
    },
    {
      simoId: "225436", // DIAN - Analista I (Técnico - Apoyo Fiscalización/Destrucción/Inventarios)
      escenarios: [
        {
          contenido: "Usted es Analista I en el área de fiscalización aduanera de la DIAN. Durante un operativo en vía pública (carretera), los inspectores logran la aprehensión de un camión lleno de licores extranjeros ingresados de manera irregular. Su labor es apoyar la organización logística, realizar la verificación e inventario físico de la mercancía sujeta a medida cautelar (aprehensión) y diligenciar los reportes documentales requeridos para garantizar la trazabilidad de lo actuado.",
          categoria: "Operativos de Control / Inventario y Aprehensiones", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cuál es la regla técnica fundamental al elaborar el inventario físico de la mercancía aprehendida?",
              opciones: [
                { letra: "A", texto: "Registrar la cantidad exacta, las características físicas, marcas, referencias y el estado de conservación de cada botella o lote de licor, para evitar el 'cambiazo' o la pérdida posterior.", esCorrecta: true },
                { letra: "B", texto: "Escribir en una hoja 'muchas botellas de trago' porque es de noche en la carretera y es muy aburrido contar caja por caja.", esCorrecta: false },
                { letra: "C", texto: "No hacer inventario en la carretera; simplemente subir las cajas a la camioneta de la DIAN y contarlas tres meses después cuando haya tiempo.", esCorrecta: false }
              ],
              explicacion: "La opción A asegura la Cadena de Custodia y la protección del funcionario que asume la responsabilidad de la mercancía. Las otras opciones facilitan el peculado o el robo."
            },
            {
              texto: "Durante la diligencia, un inspector le pide que no anote dos cajas de whisky costoso para 'celebrar el éxito del operativo'. ¿Cómo debe actuar como Analista de apoyo?",
              opciones: [
                { letra: "A", texto: "Negarse rotundamente, inventariar el 100% de la mercancía y reportar el intento de peculado al superior inmediato de control interno disciplinario.", esCorrecta: true },
                { letra: "B", texto: "Ayudar a esconder las cajas, siempre y cuando le prometan que le van a dar una botella a usted también.", esCorrecta: false },
                { letra: "C", texto: "Anotar todas las cajas, pero sugerir que mejor se roben unas cervezas que son más baratas y nadie las va a extrañar.", esCorrecta: false }
              ],
              explicacion: "La opción A es el cumplimiento estricto del deber legal (denuncia) y del Código de Integridad (Honestidad). Las otras opciones lo convierten en cómplice de un delito."
            },
            {
              texto: "¿Por qué es importante la gestión documental inmediata de los trámites y reportes en un operativo aduanero de esta naturaleza?",
              opciones: [
                { letra: "A", texto: "Para garantizar el debido proceso al presunto infractor y asegurar que las pruebas físicas estén blindadas jurídicamente desde el momento de la aprehensión.", esCorrecta: true },
                { letra: "B", texto: "Para justificar las horas extras que los funcionarios van a cobrar a fin de mes por estar en la carretera.", esCorrecta: false },
                { letra: "C", texto: "Para gastar rápido la papelería institucional y pedir que les manden más resmas de hojas el próximo año.", esCorrecta: false }
              ],
              explicacion: "La opción A vincula el trabajo operativo con el éxito jurídico del proceso de decomiso a favor de la Nación. Las otras opciones son erróneas."
            }
          ]
        },
        {
          contenido: "Como Analista I de la DIAN, se le asigna apoyar la revisión de reportes de operaciones sospechosas (ROS) sobre posible lavado de activos, cruzando información de importaciones de textiles con bajos precios. Usted debe clasificar la información, consolidar las evidencias encontradas (como discrepancias entre volúmenes y capital reportado) y apoyar a los inspectores en la formulación de requerimientos de información adicionales.",
          categoria: "Apoyo a Investigaciones / Lavado de Activos y Contrabando", dificultad: "INTERMEDIO",
          preguntas: [
            {
              texto: "¿Cuál es su principal responsabilidad técnica al clasificar y cruzar los insumos de los Reportes de Operaciones Sospechosas (ROS)?",
              opciones: [
                { letra: "A", texto: "Consolidar las bases de datos de forma sistemática y precisa, garantizando absoluta reserva y confidencialidad sobre los datos financieros del investigado.", esCorrecta: true },
                { letra: "B", texto: "Llamar a los importadores sospechosos para preguntarles amablemente si ellos están lavando activos para poder cerrar el caso rápido.", esCorrecta: false },
                { letra: "C", texto: "Filtrar los reportes a la prensa local para presionar a que los inspectores de la DIAN abran la investigación más rápido.", esCorrecta: false }
              ],
              explicacion: "La opción A es crítica en delitos de lavado de activos (reserva bancaria y tributaria). Las opciones B y C son faltas gravísimas (violación de reserva, entorpecimiento de investigación)."
            },
            {
              texto: "En la gestión documental, si usted encuentra un error de digitación en los valores aduaneros reportados en un informe anterior, ¿qué debe hacer?",
              opciones: [
                { letra: "A", texto: "Notificar formalmente el hallazgo al equipo investigador para que el inspector responsable valide y autorice la corrección en el expediente, dejando trazabilidad de la actuación.", esCorrecta: true },
                { letra: "B", texto: "Borrar el número con corrector líquido y escribir encima el número correcto para no incomodar al jefe.", esCorrecta: false },
                { letra: "C", texto: "Dejar el error así, total eso es un borrador y los jueces nunca leen los detalles de las cifras.", esCorrecta: false }
              ],
              explicacion: "La opción A mantiene la integridad del acervo probatorio documental. Las otras opciones configuran alteración o falsedad documental y negligencia."
            },
            {
              texto: "¿Qué valor institucional es indispensable para un Analista que trabaja con información de inteligencia sobre contrabando técnico?",
              opciones: [
                { letra: "A", texto: "La Probidad y la Lealtad Institucional, ya que maneja información sensible que podría ser usada por mafias para evadir los controles estatales.", esCorrecta: true },
                { letra: "B", texto: "La Indiscreción, contándole a sus familiares en la cena de Navidad todo lo que descubrió sobre las empresas textiles famosas.", esCorrecta: false },
                { letra: "C", texto: "La Envidia, sintiendo rabia de los contrabandistas por tener tanto dinero y buscando cómo pedirles una comisión.", esCorrecta: false }
              ],
              explicacion: "La opción A refleja el perfil ético exigido para cargos con acceso a información clasificada (seguridad nacional y económica). Las otras son vulnerabilidades graves."
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
