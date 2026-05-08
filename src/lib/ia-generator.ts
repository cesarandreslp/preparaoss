/**
 * ia-generator.ts
 * Pipeline de generación de preguntas con Groq (Llama 3.3 70B)
 * 
 * Tipos de preguntas según la CNSC:
 * 1. FUNCIONAL_ESPECIFICA   → Juicio situacional: escenario + 3 preguntas, 3 opciones c/u
 * 2. FUNCIONAL_TRANSVERSAL → Pregunta directa con 4 opciones
 * 3. COMPORTAMENTAL        → Escala Likert 1-5 según nivel de responsabilidad del cargo
 */

import { groq, GROQ_MODEL } from "./groq";
import { prisma } from "./prisma";
import { z } from "zod";

// ─────────────────────────────────────────────────
// CONTEXTO DOCUMENTAL — alimenta los prompts con el
// texto parseado de los manuales/guías oficiales
// que el admin haya subido para la OPEC.
// ─────────────────────────────────────────────────

// Presupuesto total de caracteres del contexto inyectado.
// Llama 3.3 70B tiene 128K de contexto. Reservamos ~10K tokens (~40K chars)
// para contexto documental, dejando holgura para prompt + respuesta JSON.
const MAX_CONTEXT_CHARS = 40_000;

// Prioridad por tipo: el manual de funciones es más relevante que un anexo genérico.
const TYPE_PRIORITY: Record<string, number> = {
  MANUAL_FUNCIONES: 1,
  EJES_TEMATICOS: 2,
  GUIA_ORIENTACION: 3,
  DOCUMENTO_ENTIDAD: 4,
  OTHER: 5,
};

async function obtenerContextoDocumentos(opecId: string): Promise<string> {
  const docs = await prisma.document.findMany({
    where: { opecId, isParsed: true, parsedContent: { not: null } },
    select: { type: true, fileName: true, parsedContent: true },
  });

  if (docs.length === 0) return "";

  const ordenados = [...docs].sort(
    (a, b) => (TYPE_PRIORITY[a.type] ?? 99) - (TYPE_PRIORITY[b.type] ?? 99)
  );

  const partes: string[] = [];
  let usados = 0;

  for (const d of ordenados) {
    const restante = MAX_CONTEXT_CHARS - usados;
    if (restante <= 200) break; // sin espacio útil para otro doc
    const recorte = (d.parsedContent ?? "").slice(0, restante - 100);
    partes.push(`### ${d.type} — ${d.fileName}\n${recorte}`);
    usados += recorte.length + 100;
  }

  return partes.join("\n\n");
}

function bloqueContexto(contexto: string): string {
  if (!contexto) return "";
  return `\n\nCONTEXTO DOCUMENTAL OFICIAL DEL CARGO (úsalo como fuente PRIMARIA — las preguntas deben evaluar conocimiento concreto de este material):\n"""\n${contexto}\n"""\n`;
}

// ─────────────────────────────────────────────────
// SCHEMAS ZOD de validación
// ─────────────────────────────────────────────────

const OpcionSchema = z.object({
  letra: z.string(),
  texto: z.string(),
  esCorrecta: z.boolean(),
});

const PreguntaFuncEspSchema = z.object({
  escenario: z.string().min(500), // ≥10 líneas / ~500 caracteres
  preguntas: z.array(
    z.object({
      texto: z.string(),
      opciones: z.array(OpcionSchema).length(3), // Exactamente 3 opciones
      respuestaCorrecta: z.string(), // "A", "B" o "C"
      explicacion: z.string().min(50),
    })
  ).length(3), // Exactamente 3 preguntas por escenario
  categoria: z.string(),
  dificultad: z.enum(["BASICO", "INTERMEDIO", "AVANZADO"]),
});

const PreguntaFuncTransSchema = z.object({
  texto: z.string(),
  opciones: z.array(OpcionSchema).length(4), // Exactamente 4 opciones
  respuestaCorrecta: z.string(), // "A", "B", "C" o "D"
  explicacion: z.string().min(50),
  categoria: z.string(),
  dificultad: z.enum(["BASICO", "INTERMEDIO", "AVANZADO"]),
});

const PreguntaComportamentalSchema = z.object({
  texto: z.string(), // Enunciado de la situación laboral
  opciones: z.array(
    z.object({
      letra: z.string(), // "1" a "5"
      texto: z.string(),
      valorLikert: z.number().int().min(1).max(5),
      // La respuesta "correcta" depende del nivelResponsabilidad del cargo
      esCorrecta: z.boolean(),
    })
  ).length(5), // 5 opciones Likert
  nivelResponsabilidadAplicado: z.number().int().min(1).max(5),
  explicacion: z.string().min(50),
  categoria: z.string(),
});

// ─────────────────────────────────────────────────
// TIPO 1: FUNCIONAL ESPECÍFICA (Juicio situacional)
// ─────────────────────────────────────────────────

export async function generarPreguntasFuncionalEspecifica(
  opecId: string,
  cantidad: number = 2 // Cuántos escenarios generar (cada uno = 3 preguntas)
): Promise<void> {
  const opec = await prisma.opec.findUniqueOrThrow({
    where: { id: opecId },
    select: {
      nombreCargo: true,
      entidad: true,
      nivelJerarquico: true,
      competencias: true,
      requisitosEstudio: true,
    },
  });

  const contexto = await obtenerContextoDocumentos(opecId);

  for (let i = 0; i < cantidad; i++) {
    const prompt = `Eres un experto en diseño de pruebas para concursos de méritos del Estado colombiano (CNSC).

Genera UN escenario de juicio situacional para el cargo: "${opec.nombreCargo}" en "${opec.entidad}" (nivel: ${opec.nivelJerarquico}).
Competencias evaluadas: ${opec.competencias.join(", ")}.${bloqueContexto(contexto)}

REGLAS ESTRICTAS para el escenario:
- El escenario (párrafo situacional) debe tener MÍNIMO 10 líneas de texto, describiendo una situación laboral compleja y realista.
- Del escenario deben desprenderse EXACTAMENTE 3 preguntas de juicio situacional.
- Cada pregunta tiene EXACTAMENTE 3 opciones de respuesta (A, B, C).
- Solo UNA opción es la más adecuada/correcta.
- La explicación debe justificar PORQUÉ cada opción es correcta o incorrecta.
- Usa lenguaje formal colombiano de entidades públicas.

Responde ÚNICAMENTE con JSON válido con esta estructura exacta:
{
  "escenario": "texto del escenario de al menos 10 líneas...",
  "preguntas": [
    {
      "texto": "pregunta 1...",
      "opciones": [
        {"letra": "A", "texto": "...", "esCorrecta": false},
        {"letra": "B", "texto": "...", "esCorrecta": true},
        {"letra": "C", "texto": "...", "esCorrecta": false}
      ],
      "respuestaCorrecta": "B",
      "explicacion": "La opción B es correcta porque... La A es incorrecta porque... La C es incorrecta porque..."
    },
    { "texto": "pregunta 2...", "opciones": [...], "respuestaCorrecta": "...", "explicacion": "..." },
    { "texto": "pregunta 3...", "opciones": [...], "respuestaCorrecta": "...", "explicacion": "..." }
  ],
  "categoria": "Gestión Pública",
  "dificultad": "INTERMEDIO"
}`;

    const completion = await groq.chat.completions.create({
      model: GROQ_MODEL,
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    const raw = JSON.parse(completion.choices[0].message.content ?? "{}");
    const parsed = PreguntaFuncEspSchema.parse(raw);

    // Guardar en BD
    const escenario = await prisma.escenarioSituacional.create({
      data: { contenido: parsed.escenario, opecId },
    });

    for (const p of parsed.preguntas) {
      await prisma.pregunta.create({
        data: {
          tipo: "FUNCIONAL_ESPECIFICA",
          texto: p.texto,
          escenarioId: escenario.id,
          opecId,
          categoria: parsed.categoria,
          dificultad: parsed.dificultad,
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
  }
}

// ─────────────────────────────────────────────────
// TIPO 2: FUNCIONAL TRANSVERSAL (4 opciones)
// ─────────────────────────────────────────────────

export async function generarPreguntasFuncionalTransversal(
  opecId: string,
  cantidad: number = 10
): Promise<void> {
  const opec = await prisma.opec.findUniqueOrThrow({
    where: { id: opecId },
    select: {
      nombreCargo: true,
      entidad: true,
      nivelJerarquico: true,
      competencias: true,
    },
  });

  const contexto = await obtenerContextoDocumentos(opecId);

  const prompt = `Eres un experto en diseño de pruebas para concursos de méritos del Estado colombiano (CNSC).

Genera EXACTAMENTE ${cantidad} preguntas de competencias funcionales transversales para el cargo: "${opec.nombreCargo}" en "${opec.entidad}".
Competencias: ${opec.competencias.join(", ")}.${bloqueContexto(contexto)}

REGLAS:
- Cada pregunta tiene EXACTAMENTE 4 opciones (A, B, C, D).
- Solo UNA es correcta.
- La explicación justifica el porqué de la respuesta correcta y por qué las demás son incorrectas.
- Cubre temas: normatividad colombiana, gestión pública, ética del servidor público, planeación, etc.

Responde ÚNICAMENTE con JSON válido: array de ${cantidad} objetos con esta estructura:
[
  {
    "texto": "pregunta...",
    "opciones": [
      {"letra": "A", "texto": "...", "esCorrecta": false},
      {"letra": "B", "texto": "...", "esCorrecta": true},
      {"letra": "C", "texto": "...", "esCorrecta": false},
      {"letra": "D", "texto": "...", "esCorrecta": false}
    ],
    "respuestaCorrecta": "B",
    "explicacion": "La opción B es correcta porque...",
    "categoria": "Normatividad",
    "dificultad": "INTERMEDIO"
  }
]`;

  const completion = await groq.chat.completions.create({
    model: GROQ_MODEL,
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
    temperature: 0.7,
  });

  const raw = JSON.parse(completion.choices[0].message.content ?? "{}");
  const preguntas = z.array(PreguntaFuncTransSchema).parse(raw.preguntas ?? raw);

  for (const p of preguntas) {
    await prisma.pregunta.create({
      data: {
        tipo: "FUNCIONAL_TRANSVERSAL",
        texto: p.texto,
        opecId,
        categoria: p.categoria,
        dificultad: p.dificultad,
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
}

// ─────────────────────────────────────────────────
// TIPO 3: COMPORTAMENTAL (Escala Likert 1-5)
// ─────────────────────────────────────────────────

export async function generarPreguntasComportamental(
  opecId: string,
  cantidad: number = 10
): Promise<void> {
  const opec = await prisma.opec.findUniqueOrThrow({
    where: { id: opecId },
    select: {
      nombreCargo: true,
      entidad: true,
      nivelJerarquico: true,
      nivelResponsabilidad: true,
      competencias: true,
    },
  });

  const descripcionNivel = [
    "",
    "Auxiliar (nivel 1): tareas operativas básicas, seguimiento de instrucciones",
    "Técnico (nivel 2): aplicación de conocimientos técnicos específicos",
    "Profesional (nivel 3): análisis, propuestas, toma de decisiones operativas",
    "Asesor (nivel 4): liderazgo técnico, orientación a otros, impacto institucional",
    "Directivo (nivel 5): liderazgo estratégico, toma de decisiones de alto impacto, gestión de equipos",
  ][opec.nivelResponsabilidad];

  const contexto = await obtenerContextoDocumentos(opecId);

  const prompt = `Eres un experto en evaluación de competencias comportamentales para el Estado colombiano (CNSC).

Genera EXACTAMENTE ${cantidad} preguntas de comportamiento laboral en escala Likert para el cargo: "${opec.nombreCargo}".
Nivel de responsabilidad: ${descripcionNivel}${bloqueContexto(contexto)}

REGLAS:
- Cada pregunta describe una SITUACIÓN LABORAL concreta.
- El evaluado debe responder con qué frecuencia haría eso: 1=Nunca, 2=Casi nunca, 3=A veces, 4=Casi siempre, 5=Siempre.
- La respuesta "socialmente deseable" (esCorrecta: true) varía según el nivel de responsabilidad del cargo.
- Para cargos directivos (nivel 4-5): se esperan frecuencias más altas en liderazgo, iniciativa y decisión.
- Para cargos auxiliares/técnicos (nivel 1-2): se esperan frecuencias altas en seguimiento de normas, precisión y colaboración.
- La explicación debe argumentar por qué esa es la respuesta esperada para ese nivel de responsabilidad.

Responde ÚNICAMENTE con JSON válido: array de ${cantidad} objetos:
[
  {
    "texto": "Cuando recibo instrucciones de mi jefe que considero que no son la mejor manera de hacer el trabajo...",
    "opciones": [
      {"letra": "1", "texto": "Nunca consulto ni expreso mi opinión, simplemente ejecuto", "valorLikert": 1, "esCorrecta": false},
      {"letra": "2", "texto": "Casi nunca menciono mis dudas al respecto", "valorLikert": 2, "esCorrecta": false},
      {"letra": "3", "texto": "A veces comento informalmente con otro compañero", "valorLikert": 3, "esCorrecta": false},
      {"letra": "4", "texto": "Casi siempre expreso mis propuestas de mejora respetuosamente a mi jefe", "valorLikert": 4, "esCorrecta": true},
      {"letra": "5", "texto": "Siempre cuestiono abiertamente y exijo una justificación formal", "valorLikert": 5, "esCorrecta": false}
    ],
    "nivelResponsabilidadAplicado": ${opec.nivelResponsabilidad},
    "explicacion": "Para un cargo de nivel ${opec.nivelResponsabilidad}, la respuesta esperada es 4 porque...",
    "categoria": "Orientación al logro"
  }
]`;

  const completion = await groq.chat.completions.create({
    model: GROQ_MODEL,
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
    temperature: 0.6,
  });

  const raw = JSON.parse(completion.choices[0].message.content ?? "{}");
  const preguntas = z.array(PreguntaComportamentalSchema).parse(raw.preguntas ?? raw);

  for (const p of preguntas) {
    await prisma.pregunta.create({
      data: {
        tipo: "COMPORTAMENTAL",
        texto: p.texto,
        opecId,
        nivelResponsabilidad: opec.nivelResponsabilidad,
        categoria: p.categoria,
        dificultad: "INTERMEDIO",
        explicacion: p.explicacion,
        opciones: {
          create: p.opciones.map((o) => ({
            letra: o.letra,
            texto: o.texto,
            esCorrecta: o.esCorrecta,
            valorLikert: o.valorLikert,
          })),
        },
      },
    });
  }
}

// ─────────────────────────────────────────────────
// GENERAR TODAS LAS PREGUNTAS DE UNA OPEC
// ─────────────────────────────────────────────────

export interface ResultadoBanco {
  total: number;
  escenarios: number;
  transversales: number;
  comportamentales: number;
}

export async function generarBancoCompleto(opecId: string): Promise<ResultadoBanco> {
  console.log(`[IA] Generando banco de preguntas para OPEC: ${opecId}`);

  try {
    // 2 escenarios situacionales × 3 preguntas = 6 preguntas FUNCIONAL_ESPECIFICA
    await generarPreguntasFuncionalEspecifica(opecId, 2);
    console.log("[IA] ✅ Funcional Específica generada");

    // 10 preguntas transversales
    await generarPreguntasFuncionalTransversal(opecId, 10);
    console.log("[IA] ✅ Funcional Transversal generada");

    // 10 preguntas comportamentales
    await generarPreguntasComportamental(opecId, 10);
    console.log("[IA] ✅ Comportamental generada");

    const escenarios = 2;
    const transversales = 10;
    const comportamentales = 10;
    const total = escenarios * 3 + transversales + comportamentales;

    console.log(`[IA] 🎉 Banco completo generado para OPEC: ${opecId} (${total} preguntas)`);
    return { total, escenarios, transversales, comportamentales };
  } catch (error) {
    console.error("[IA] ❌ Error generando banco:", error);
    throw error;
  }
}
