import { PrismaClient, TipoPregunta, NivelDificultad } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const dataToInsert: any[] = [
    {
      simoId: "225433", // DIAN - Facilitador II (Conductor/Logística)
      escenarios: [
        {
          contenido: "Usted es Facilitador II en la DIAN. Se le asigna la conducción de un vehículo oficial para transportar a un equipo de auditores tributarios a una zona rural de difícil acceso. Durante el viaje, el vehículo presenta una falla en el sistema de frenos por el desgaste del terreno. Usted debe garantizar la seguridad de los funcionarios, aplicar las medidas de mantenimiento preventivo y correctivo, y generar el reporte logístico correspondiente.",
          categoria: "Operación de Vehículos / Mantenimiento", dificultad: "BASICO",
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
