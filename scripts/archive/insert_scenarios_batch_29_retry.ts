import { PrismaClient, TipoPregunta, NivelDificultad } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const dataToInsert: any[] = [
    {
      simoId: "225437", // DIAN - Inspector IV (Fiscalización y Liquidación)
      escenarios: [
        {
          contenido: "Usted es Inspector IV en la DIAN. Durante el desarrollo de un programa de control a la evasión en el sector minero, su equipo de auditores le presenta los resultados preliminares que evidencian presuntas omisiones de ingresos en varias empresas. Sin embargo, los hallazgos se basan únicamente en presunciones estadísticas y no en pruebas contables directas. Usted debe evaluar los resultados, definir la formulación de las acciones de fiscalización y proferir el acto administrativo correspondiente para garantizar el debido proceso.",
          categoria: "Procedimiento Tributario / Fiscalización", dificultad: "AVANZADO",
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
          categoria: "Evaluación de Gestión y Calidad", dificultad: "AVANZADO",
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
          categoria: "Procedimiento Aduanero y Tributario", dificultad: "AVANZADO",
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
          categoria: "Consultas Técnicas / Normativa Internacional", dificultad: "AVANZADO",
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
