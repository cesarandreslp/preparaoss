import { PrismaClient, TipoPregunta, NivelDificultad } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const dataToInsert: any[] = [
    {
      simoId: "225493", // DIAN - Inspector IV (Aduanas)
      escenarios: [
        {
          contenido: "Usted es Inspector IV de Aduanas en la DIAN. Tiene a su cargo administrar el cumplimiento y mantenimiento de los requisitos de varias empresas con calificación de Operador Económico Autorizado (OEA). En una auditoría de seguimiento, descubre que un exportador OEA modificó sustancialmente sus esquemas de seguridad en la cadena de suministro, tercerizando el transporte con empresas no certificadas, lo que incrementa el riesgo de contaminación de la carga con narcóticos. Usted debe aplicar la normativa aduanera vigente.",
          categoria: "Gestión Aduanera / Operador Económico Autorizado (OEA)", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Cuál es la acción inmediata que debe tomar frente al OEA que incumplió las condiciones de seguridad que originaron su autorización?",
              opciones: [
                { letra: "A", texto: "Proyectar el acto administrativo de interrupción provisional o cancelación de la autorización como OEA, garantizando el derecho de defensa, debido a la exposición al riesgo de la cadena de suministro internacional.", esCorrecta: true },
                { letra: "B", texto: "Hacer una amonestación verbal amistosa diciéndole que por favor contrate transportadores más seguros para la próxima vez.", esCorrecta: false },
                { letra: "C", texto: "Dejar que la empresa siga operando con los beneficios de OEA porque retirarles la categoría afectaría las estadísticas de exportación del gobierno.", esCorrecta: false }
              ],
              explicacion: "La opción A aplica la normatividad OEA (Decreto 3568/2011 y 1165/2019) ante la pérdida de requisitos habilitantes. Las otras opciones ponen en riesgo la seguridad nacional y la credibilidad internacional de la DIAN."
            },
            {
              texto: "¿Por qué es crítica la intervención de la DIAN en las fallas de seguridad de la cadena de suministro de un OEA?",
              opciones: [
                { letra: "A", texto: "Porque la autorización OEA otorga facilidades en comercio exterior basadas en la confianza (perfilamiento de bajo riesgo). Un fallo de seguridad compromete la lucha global contra el narcotráfico y el terrorismo.", esCorrecta: true },
                { letra: "B", texto: "Porque la DIAN cobra una membresía mensual muy costosa por ser OEA y si no cumplen, se les debe devolver la plata.", esCorrecta: false },
                { letra: "C", texto: "Porque a la aduana le gusta molestar a los grandes empresarios poniéndoles reglas imposibles de cumplir en el transporte terrestre.", esCorrecta: false }
              ],
              explicacion: "La opción A sustenta la filosofía del programa OEA de la Organización Mundial de Aduanas (OMA). Las otras opciones son falacias sobre el programa."
            },
            {
              texto: "¿Qué principio rige la auditoría estricta a los Operadores Económicos Autorizados?",
              opciones: [
                { letra: "A", texto: "La Seguridad Nacional y la Facilitación Segura del Comercio Exterior, asegurando que los beneficios aduaneros solo se otorguen a actores que demuestren un control total sobre su cadena logística.", esCorrecta: true },
                { letra: "B", texto: "El principio de 'Confianza ciega', creyendo que las grandes corporaciones nunca cometen errores y no es necesario auditarlas una vez autorizadas.", esCorrecta: false },
                { letra: "C", texto: "El principio de 'Obstaculización', buscando cualquier excusa mínima para quitarles beneficios a las empresas competitivas.", esCorrecta: false }
              ],
              explicacion: "La opción A describe el balance central del marco SAFE de la OMA. Las otras actitudes son dañinas para el programa OEA."
            }
          ]
        },
        {
          contenido: "Como Inspector IV de Aduanas, usted debe emitir un concepto técnico sobre una controversia de origen. Una empresa importa televisores desde México reclamando 0% de arancel mediante el TLC. Sin embargo, en el control posterior, se halla que el 80% de los componentes (pantallas, chips) provienen de Asia y el ensamblaje en México es mínimo (atornillado). Usted debe administrar esta solicitud, evaluar la regla de origen específica del acuerdo comercial y tomar una decisión.",
          categoria: "Regímenes Aduaneros / Origen y Valoración", dificultad: "AVANZADO",
          preguntas: [
            {
              texto: "¿Qué análisis técnico-normativo procede para determinar si la importación aplica para el trato preferencial del TLC?",
              opciones: [
                { letra: "A", texto: "Verificar si el proceso de ensamblaje en México cumple con la 'regla de origen específica' del TLC (ej. salto arancelario o valor de contenido regional). Un ensamble mínimo no confiere origen.", esCorrecta: true },
                { letra: "B", texto: "Aprobar el 0% de arancel solo porque el certificado de origen dice 'Hecho en México' y tiene un sello bonito.", esCorrecta: false },
                { letra: "C", texto: "Cobrar el arancel máximo de Asia simplemente porque las pantallas son chinas, sin importar lo que diga el texto del TLC.", esCorrecta: false }
              ],
              explicacion: "La opción A aplica la metodología internacional de reglas de origen (Transformación sustancial). Las otras ignoran la complejidad de los acuerdos de libre comercio."
            },
            {
              texto: "Si usted concluye que los bienes NO califican como originarios y deniega el trato preferencial, ¿qué acción consec কমপক্ষে debe proferir?",
              opciones: [
                { letra: "A", texto: "Proferir el acto administrativo (Liquidación Oficial) exigiendo el pago de los tributos aduaneros dejados de pagar y las sanciones por declaración inexacta de origen, garantizando el derecho de defensa.", esCorrecta: true },
                { letra: "B", texto: "Decomisar todos los televisores y regalarlos a las escuelas públicas porque se intentó defraudar a la aduana con un falso origen.", esCorrecta: false },
                { letra: "C", texto: "Mandar una queja formal a la embajada de México para que regañen a la empresa que expidió el certificado de origen.", esCorrecta: false }
              ],
              explicacion: "La opción A es el procedimiento sancionatorio y de recuperación de tributos establecido en el Estatuto Aduanero. Las otras opciones son antijurídicas y diplomáticamente improcedentes."
            },
            {
              texto: "¿Qué principio de la función pública defiende al aplicar estrictamente las reglas de origen de los Acuerdos Comerciales?",
              opciones: [
                { letra: "A", texto: "La Protección de la Industria Nacional y la Equidad, impidiendo que terceros países hagan 'triangulación' para evadir aranceles y competir de manera desleal en el mercado colombiano.", esCorrecta: true },
                { letra: "B", texto: "El Aislacionismo económico, buscando cobrar siempre aranceles altos para que Colombia no le compre nada a ningún otro país.", esCorrecta: false },
                { letra: "C", texto: "La Enemistad internacional, peleando con las aduanas extranjeras para demostrar superioridad.", esCorrecta: false }
              ],
              explicacion: "La opción A explica el propósito económico y legal del control de origen. Las otras opciones son posiciones políticas extremas ajenas al rol del empleado público aduanero."
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
