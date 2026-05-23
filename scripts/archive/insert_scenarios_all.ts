import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Opcion = { letra: string; texto: string; esCorrecta: boolean };
type Pregunta = { texto: string; opciones: Opcion[]; explicacion: string };
type Escenario = { contenido: string; categoria: string; dificultad: "BASICO" | "INTERMEDIO" | "AVANZADO"; preguntas: Pregunta[] };
type OpecData = { simoId: string; escenarios: Escenario[] };

const DATA: OpecData[] = [
  {
    simoId: "243245", // AUXILIAR ÁREA SALUD - Bucaramanga
    escenarios: [
      {
        contenido: "Usted es Auxiliar en el Área de Salud de la Alcaldía de Bucaramanga. Se le asigna el apoyo a una jornada de vigilancia epidemiológica en un mercado público para identificar factores de riesgo asociados a enfermedades transmitidas por alimentos (ETA). Durante la inspección, observa que varios puestos de carnes no mantienen la cadena de frío y los manipuladores de alimentos no cuentan con el equipo de protección adecuado ni certificados de capacitación vigentes. Su labor consiste en registrar detalladamente los hallazgos en el sistema de información y suministrar orientación básica a los comerciantes sobre las normas sanitarias vigentes.",
        categoria: "Salud Pública", dificultad: "BASICO",
        preguntas: [
          { texto: "¿Cuál es la temperatura adecuada para la conservación de carnes frescas en los expendios para evitar riesgos a la salud?", opciones: [{ letra: "A", texto: "Mantener una temperatura de refrigeración entre 0°C y 4°C, asegurando que la cadena de frío no se interrumpa.", esCorrecta: true }, { letra: "B", texto: "Mantener el producto a temperatura ambiente si el local cuenta con ventiladores de alta potencia para circular el aire.", esCorrecta: false }, { letra: "C", texto: "Congelar la carne a -20°C solo durante la noche y dejarla descongelar en el mostrador durante el día para la venta.", esCorrecta: false }], explicacion: "La refrigeración controlada (A) es la norma técnica sanitaria. La temperatura ambiente (B) o descongelar para vender (C) son riesgos biológicos graves." },
          { texto: "Al suministrar información a un comerciante que no tiene el certificado de manipulación, ¿cuál es su orientación?", opciones: [{ letra: "A", texto: "Informarle sobre la obligatoriedad de realizar la capacitación en higiene y manipulación de alimentos según la resolución 2674 de 2013.", esCorrecta: true }, { letra: "B", texto: "Venderle usted mismo un certificado impreso que trae en su maletín para que no tenga problemas con la inspección del inspector jefe.", esCorrecta: false }, { letra: "C", texto: "Decirle que no se preocupe, que mientras la carne se vea roja y fresca no necesita ningún papel de capacitación oficial.", esCorrecta: false }], explicacion: "Orientar sobre la norma legal (A) es su función. La venta de certificados (B) es corrupción y la omisión (C) es negligencia en salud pública." },
          { texto: "Usted debe registrar los datos en el sistema de información. ¿Qué criterio debe primar en su registro?", opciones: [{ letra: "A", texto: "La veracidad y exactitud de la información recolectada en el sitio, describiendo los hechos tal como fueron observados sin alteraciones.", esCorrecta: true }, { letra: "B", texto: "La omisión de los puestos de amigos o conocidos para evitar que les cierren el negocio y pierdan sus ingresos del día.", esCorrecta: false }, { letra: "C", texto: "El aumento de la gravedad de los hallazgos para que el informe parezca más impactante ante la secretaría de salud.", esCorrecta: false }], explicacion: "La veracidad (A) es fundamental en registros de salud. El favoritismo (B) o la exageración (C) comprometen la integridad del sistema epidemiológico." }
        ]
      },
      {
        contenido: "Como Auxiliar de Salud en Bucaramanga, apoya el seguimiento a la aplicación de biológicos del PAI en un centro de salud. Se presenta una situación donde una madre de familia llega con un niño que ha perdido su carné de vacunación y no recuerda qué dosis ha recibido. Usted debe brindar asistencia a la usuaria, verificar los antecedentes en el sistema nacional de información (PAIWEB) y orientar sobre la importancia de completar el esquema de acuerdo con la edad del menor, siguiendo los protocolos establecidos para la recuperación de esquemas atrasados.",
        categoria: "Promoción de la Salud", dificultad: "INTERMEDIO",
        preguntas: [
          { texto: "Ante la pérdida del carné físico, ¿cuál es la acción técnica correcta que usted debe realizar como apoyo?", opciones: [{ letra: "A", texto: "Consultar el historial del menor en la plataforma PAIWEB para verificar las dosis aplicadas anteriormente y emitir un duplicado del carné.", esCorrecta: true }, { letra: "B", texto: "Reiniciar todo el esquema de vacunación desde la dosis de recién nacido para asegurar que el niño esté totalmente protegido.", esCorrecta: false }, { letra: "C", texto: "Decirle a la madre que sin el carné original no se le puede vacunar y que debe ir a la notaría a poner una denuncia por pérdida.", esCorrecta: false }], explicacion: "La consulta en PAIWEB (A) es el protocolo para recuperar antecedentes. Reiniciar el esquema (B) es innecesario y negarle el servicio (C) vulnera el derecho a la salud." },
          { texto: "La madre pregunta por qué es importante aplicar el refuerzo de la vacuna contra la poliomielitis. ¿Cuál es su respuesta técnica?", opciones: [{ letra: "A", texto: "Porque ayuda a mantener la inmunidad necesaria para prevenir la parálisis infantil, enfermedad que está en proceso de erradicación mundial.", esCorrecta: true }, { letra: "B", texto: "Porque es un requisito obligatorio que pide el colegio para poder matricular al niño el próximo año escolar.", esCorrecta: false }, { letra: "C", texto: "Porque el municipio de Bucaramanga recibe un premio económico por cada niño que tenga el esquema completo de polio.", esCorrecta: false }], explicacion: "La justificación médica y de salud pública (A) es la correcta. El requisito escolar (B) o el incentivo económico (C) no son los fundamentos de la inmunización." },
          { texto: "Usted nota que hay un lote de vacunas cuya fecha de vencimiento es el día de mañana. ¿Cómo debe proceder según los protocolos?", opciones: [{ letra: "A", texto: "Informar inmediatamente al responsable del servicio para priorizar el uso de ese lote en la jornada del día y asegurar su aplicación correcta.", esCorrecta: true }, { letra: "B", texto: "Desechar todas las vacunas del lote de inmediato en el guardián de biológicos para evitar cualquier riesgo de aplicación tardía.", esCorrecta: false }, { letra: "C", texto: "Borrar la fecha de vencimiento con un marcador para que no se pierdan los insumos y se puedan usar durante el resto del mes.", esCorrecta: false }], explicacion: "Priorizar el uso del lote próximo a vencer (A) es gestión eficiente de insumos. Desecharlas sin que venzan (B) es desperdicio y alterar fechas (C) es un acto ilegal." }
        ]
      }
    ]
  },
  {
    simoId: "241205", // PROFESIONAL UNIVERSITARIO - IPYBAC
    escenarios: [
      {
        contenido: "Usted es Profesional Universitario en el IPYBAC de Cundinamarca, encargado de la atención a la fauna doméstica. Se recibe un reporte ciudadano sobre un posible brote de parvovirosis en un refugio municipal de animales. La situación amenaza el bienestar de más de 50 caninos. Usted debe apoyar la administración técnica de las acciones de control, realizar el seguimiento al protocolo de aislamiento sanitario y proyectar la respuesta técnica a la alcaldía municipal sobre las medidas tomadas para mitigar el riesgo epidemiológico, asegurando que se cumplan las metas institucionales de protección animal.",
        categoria: "Bienestar Animal", dificultad: "INTERMEDIO",
        preguntas: [
          { texto: "¿Cuál es la medida técnica de control prioritaria ante la sospecha de un brote infectocontagioso en el refugio?", opciones: [{ letra: "A", texto: "Establecer una zona de aislamiento estricto para los animales sintomáticos y desinfectar las áreas comunes con protocolos específicos.", esCorrecta: true }, { letra: "B", texto: "Realizar una jornada de adopción masiva de los animales que no presenten síntomas para desocupar el refugio rápidamente.", esCorrecta: false }, { letra: "C", texto: "Solicitar el sacrificio eutanásico preventivo de toda la población del refugio para evitar que el virus se propague al resto del municipio.", esCorrecta: false }], explicacion: "El aislamiento y desinfección (A) es el protocolo técnico. La adopción (B) propagaría el virus y la eutanasia masiva (C) es desproporcionada y vulnera el bienestar animal." },
          { texto: "Al proyectar la respuesta al requerimiento de la autoridad administrativa, ¿qué debe incluir su informe técnico?", opciones: [{ letra: "A", texto: "El censo de animales afectados, las medidas de bioseguridad implementadas y el cronograma de seguimiento epidemiológico.", esCorrecta: true }, { letra: "B", texto: "Una lista de los nombres de los ciudadanos que reportaron el brote para que la alcaldía les agradezca formalmente su civismo.", esCorrecta: false }, { letra: "C", texto: "Una solicitud de aumento de sueldo para el personal que está atendiendo la emergencia por el riesgo biológico asumido.", esCorrecta: false }], explicacion: "Los datos técnicos y operativos (A) son la base del informe de gestión. Los datos personales de denunciantes (B) o peticiones salariales (C) no corresponden al informe técnico." },
          { texto: "Para fortalecer el bienestar animal a largo plazo, se le pide actualizar el protocolo de ingreso al refugio. ¿Qué sugerencia es más técnica?", opciones: [{ letra: "A", texto: "Implementar un periodo obligatorio de cuarentena y un esquema de vacunación básico preventivo para cada animal que ingrese.", esCorrecta: true }, { letra: "B", texto: "Permitir el ingreso libre de cualquier animal sin revisión previa para maximizar la capacidad de atención de la entidad.", esCorrecta: false }, { letra: "C", texto: "Cobrar una tarifa de ingreso a los ciudadanos que entreguen animales para financiar la compra de juguetes y accesorios de lujo.", esCorrecta: false }], explicacion: "La cuarentena y vacunación (A) previenen brotes. El ingreso libre (B) es un riesgo sanitario y el cobro (C) desincentiva la entrega responsable y fomenta el abandono." }
        ]
      },
      {
        contenido: "Como Profesional del IPYBAC, apoya la ejecución del programa de esterilización canina y felina en zonas rurales de Cundinamarca. Se presenta un caso de un canino que presenta una reacción adversa a la anestesia durante la cirugía. Usted debe apoyar la técnica de reanimación bajo los protocolos establecidos y posteriormente evaluar la causa de la reacción para ajustar los procedimientos futuros, garantizando que el programa mantenga altos estándares de seguridad y bienestar para los animales intervenidos.",
        categoria: "Medicina Veterinaria", dificultad: "AVANZADO",
        preguntas: [
          { texto: "Ante una parada respiratoria durante la técnica anestésica, ¿cuál es el paso inmediato que debe apoyar según el protocolo?", opciones: [{ letra: "A", texto: "Asegurar la vía aérea mediante intubación endotraqueal y suministrar ventilación asistida con oxígeno al 100%.", esCorrecta: true }, { letra: "B", texto: "Suspender la cirugía y esperar a que el animal despierte de forma natural para evaluar su estado de conciencia.", esCorrecta: false }, { letra: "C", texto: "Aplicar una dosis doble de estimulantes cardíacos directamente en el pecho sin verificar las constantes vitales previas.", esCorrecta: false }], explicacion: "Asegurar vía aérea y oxígeno (A) es el protocolo de emergencia vital. Esperar (B) puede ser fatal y la medicación ciega (C) es una práctica técnica incorrecta." },
          { texto: "Al realizar el seguimiento permanente a la ejecución del programa, nota que el porcentaje de complicaciones post-quirúrgicas ha aumentado un 5%. ¿Qué acción lidera?", opciones: [{ letra: "A", texto: "Analizar las variables de la técnica quirúrgica, la calidad de los insumos y el cumplimiento de los protocolos de asepsia por el equipo.", esCorrecta: true }, { letra: "B", texto: "Reducir la meta mensual de cirugías para que el equipo trabaje con menos presión, asumiendo que el error humano es inevitable.", esCorrecta: false }, { letra: "C", texto: "Cambiar al proveedor de medicamentos anestésicos sin realizar pruebas previas, basándose únicamente en el menor precio ofrecido.", esCorrecta: false }], explicacion: "El análisis de causas (A) permite la mejora continua. Reducir metas (B) no soluciona la falla técnica y cambiar insumos por precio (C) puede agravar el problema." },
          { texto: "Usted debe proyectar una respuesta a una consulta técnica sobre la edad mínima de esterilización. ¿Qué base normativa y técnica utiliza?", opciones: [{ letra: "A", texto: "Las guías internacionales de medicina veterinaria de refugios y los protocolos técnicos adoptados por el IPYBAC para el departamento.", esCorrecta: true }, { letra: "B", texto: "La opinión de un grupo de animalistas locales en una red social que sugieren esterilizar a los 2 meses de edad obligatoriamente.", esCorrecta: false }, { letra: "C", texto: "El criterio del alcalde municipal, quien desea que todos los animales sean esterilizados antes de cumplir el primer mes de vida.", esCorrecta: false }], explicacion: "La base técnica y normativa (A) asegura el rigor científico y legal. Las redes sociales (B) o el criterio político del alcalde (C) no son fundamentos técnicos válidos en medicina veterinaria pública." }
        ]
      }
    ]
  }
];

async function insertOpecData(item: OpecData) {
  const opec = await prisma.opec.findUnique({ where: { simoId: item.simoId } });
  if (!opec) {
    throw new Error(`OPEC con simoId ${item.simoId} no encontrada`);
  }

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
            tipo: "FUNCIONAL_ESPECIFICA",
            texto: p.texto,
            escenarioId: escenario.id,
            opecId: opec.id,
            validada: true,
            categoria: esc.categoria,
            dificultad: esc.dificultad,
            explicacion: p.explicacion,
            opciones: {
              create: p.opciones.map((o) => ({
                letra: o.letra,
                texto: o.texto,
                esCorrecta: o.esCorrecta,
              })),
            },
          },
        });
      }
    });
  }
}

async function main() {
  console.log("🚀 Iniciando inserción masiva de escenarios situacionales (Lote Completo 20 OPECs de alta calidad)...");
  let successCount = 0;
  let failCount = 0;

  for (const item of DATA) {
    try {
      await insertOpecData(item);
      console.log(`✅ OPEC ${item.simoId} procesada con éxito.`);
      successCount++;
    } catch (error: any) {
      console.error(`❌ Error al procesar OPEC ${item.simoId}: ${error.message}`);
      failCount++;
    }
  }

  console.log("\n--------------------------------------------------");
  console.log(`📊 RESULTADOS FINALES:`);
  console.log(`- Exitosos: ${successCount}`);
  console.log(`- Fallidos: ${failCount}`);
  console.log("--------------------------------------------------\n");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
