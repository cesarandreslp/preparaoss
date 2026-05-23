/**
 * ia-generator.ts
 * Pipeline de generación de preguntas con Groq (Llama 3.3 70B)
 * 
 * Tipos de preguntas según la CNSC:
 * 1. FUNCIONAL_ESPECIFICA   → Juicio situacional: escenario + 3 preguntas, 3 opciones c/u
 * 2. FUNCIONAL_TRANSVERSAL → Pregunta directa con 4 opciones
 * 3. COMPORTAMENTAL        → Escala Likert 1-5 según nivel de responsabilidad del cargo
 */

import { llmJson } from "./llm";
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

/**
 * Normalizador tolerante para el enum de dificultad.
 * Los modelos LLM (especialmente Zhipu/GLM y Llama 8B) devuelven a veces
 * "basico", "Básico", "BÁSICO" en lugar del literal exacto. Preprocess
 * uppercase + sin diacríticos antes de validar contra el enum.
 */
const DificultadSchema = z.preprocess((v) => {
  if (typeof v !== "string") return v;
  return v
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // quita acentos
    .toUpperCase()
    .trim();
}, z.enum(["BASICO", "INTERMEDIO", "AVANZADO"]));

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
  dificultad: DificultadSchema,
});

const PreguntaFuncTransSchema = z.object({
  texto: z.string(),
  opciones: z.array(OpcionSchema).length(4), // Exactamente 4 opciones
  respuestaCorrecta: z.string(), // "A", "B", "C" o "D"
  explicacion: z.string().min(50),
  categoria: z.string(),
  dificultad: DificultadSchema,
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

  // UN solo request al LLM devuelve los `cantidad` escenarios completos en un
  // array. Antes hacíamos 1 request por escenario en paralelo (Promise.all),
  // lo que saturaba el rate-limit de Gemini Flash (30 RPM). Con este patrón:
  // 1 OPEC = 1 request, así con 1500 RPD/free-tier cabe muy fácil.
  const prompt = `Eres un experto en diseño de pruebas para concursos de méritos del Estado colombiano (CNSC).

Genera EXACTAMENTE ${cantidad} escenarios DISTINTOS de juicio situacional para el cargo: "${opec.nombreCargo}" en "${opec.entidad}" (nivel: ${opec.nivelJerarquico}).
Competencias evaluadas: ${opec.competencias.join(", ")}.${bloqueContexto(contexto)}

REGLAS ESTRICTAS:
- Genera ${cantidad} escenarios cubriendo SITUACIONES y COMPETENCIAS DISTINTAS entre sí (no repetir el mismo tipo de conflicto/decisión).
- Cada escenario (párrafo situacional) debe tener MÍNIMO 10 líneas describiendo una situación laboral compleja y realista.
- De cada escenario deben desprenderse EXACTAMENTE 3 preguntas de juicio situacional.
- Cada pregunta tiene EXACTAMENTE 3 opciones (A, B, C). Solo UNA es la más adecuada.
- La explicación justifica POR QUÉ cada opción es correcta o incorrecta (mín. 50 chars).
- Lenguaje formal colombiano de entidades públicas.

Responde ÚNICAMENTE con JSON válido con esta estructura exacta — un objeto con la clave "escenarios" que contiene un array de ${cantidad} elementos:
{
  "escenarios": [
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
    }
    // ... ${cantidad - 1} más
  ]
}`;

  const { data: raw } = await llmJson<unknown>(prompt, { temperature: 0.7 });
  const items = Array.isArray(raw)
    ? raw
    : (raw as { escenarios?: unknown[] })?.escenarios ?? [];
  const escenarios = z.array(PreguntaFuncEspSchema).parse(items);

  for (const parsed of escenarios) {
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
          validada: true,
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

  const { data: raw } = await llmJson<unknown>(prompt, { temperature: 0.7 });
  const items = Array.isArray(raw)
    ? raw
    : (raw as { preguntas?: unknown[] })?.preguntas ?? raw;
  const preguntas = z.array(PreguntaFuncTransSchema).parse(items);

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

  const { data: raw } = await llmJson<unknown>(prompt, { temperature: 0.6 });
  const items = Array.isArray(raw)
    ? raw
    : (raw as { preguntas?: unknown[] })?.preguntas ?? raw;
  const preguntas = z.array(PreguntaComportamentalSchema).parse(items);

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

// Umbral de específicas validadas por OPEC para que el simulacro quede habilitado.
export const ESPECIFICAS_OBJETIVO = 30;
const PREGUNTAS_POR_ESCENARIO = 3;

export async function generarBancoCompleto(opecId: string): Promise<ResultadoBanco> {
  // Calcula el déficit: cuántos escenarios faltan para llegar al objetivo.
  // Los pools transversal y comportamental son globales — se generan una vez
  // vía /api/admin/pools/generar y se reusan en TODAS las OPECs.
  const validadas = await prisma.pregunta.count({
    where: { opecId, tipo: "FUNCIONAL_ESPECIFICA", validada: true },
  });

  const faltan = Math.max(0, ESPECIFICAS_OBJETIVO - validadas);
  if (faltan === 0) {
    console.log(`[IA] OPEC ${opecId} ya tiene ${validadas} específicas (objetivo ${ESPECIFICAS_OBJETIVO}). Skip.`);
    return { total: 0, escenarios: 0, transversales: 0, comportamentales: 0 };
  }

  const escenariosFaltantes = Math.ceil(faltan / PREGUNTAS_POR_ESCENARIO);
  console.log(`[IA] OPEC ${opecId}: ${validadas} validadas, generando ${escenariosFaltantes} escenarios (un solo request al LLM)`);

  try {
    await generarPreguntasFuncionalEspecifica(opecId, escenariosFaltantes);
    const total = escenariosFaltantes * PREGUNTAS_POR_ESCENARIO;
    console.log(`[IA] 🎉 Banco específico generado para OPEC ${opecId} (+${total} preguntas)`);
    return { total, escenarios: escenariosFaltantes, transversales: 0, comportamentales: 0 };
  } catch (error) {
    console.error("[IA] ❌ Error generando banco:", error);
    throw error;
  }
}

// ─────────────────────────────────────────────────
// POOLS GLOBALES — preguntas reutilizables entre OPECs
// ─────────────────────────────────────────────────

/**
 * Genera un lote de preguntas transversales para el pool global.
 * Se ejecuta UNA SOLA VEZ (o cuando se necesite ampliar el pool).
 * Cada lote son `cantidad` preguntas en un único LLM call.
 */
export async function generarLotePoolTransversal(cantidad: number = 10): Promise<number> {
  const prompt = `Eres un experto en diseño de pruebas para concursos de méritos del Estado colombiano (CNSC).

Genera EXACTAMENTE ${cantidad} preguntas de competencias funcionales transversales aplicables a CUALQUIER servidor público colombiano (no a un cargo específico).

REGLAS:
- Cada pregunta tiene EXACTAMENTE 4 opciones (A, B, C, D).
- Solo UNA es correcta.
- La explicación justifica el porqué de la respuesta correcta y por qué las demás son incorrectas (mínimo 50 caracteres).
- Cubrir temas diversos: Constitución Política, Ley 909 (carrera administrativa), Ley 1437 (CPACA), Código Disciplinario Único (Ley 1952), ética del servidor público, Ley 1755 (derecho de petición), Ley 1581 (protección de datos), planeación estratégica, control interno, gestión documental, presupuesto público.
- DIVERSIDAD: cada una de las ${cantidad} preguntas debe tratar un tema/ley distinto. No repitas tópicos.
- Dificultad mixta entre BASICO, INTERMEDIO y AVANZADO.

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

  const { data: raw } = await llmJson<unknown>(prompt, { temperature: 0.8 });
  const items = Array.isArray(raw)
    ? raw
    : (raw as { preguntas?: unknown[] })?.preguntas ?? raw;
  const preguntas = z.array(PreguntaFuncTransSchema).parse(items);

  for (const p of preguntas) {
    await prisma.pregunta.create({
      data: {
        tipo: "FUNCIONAL_TRANSVERSAL",
        texto: p.texto,
        poolKey: "TRANSVERSAL_GLOBAL",
        validada: true,
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

  return preguntas.length;
}

/**
 * Genera un lote de preguntas comportamentales (Likert 1-5) para el pool del
 * nivel de responsabilidad indicado. Pool válido por nivel: 1..5.
 */
export async function generarLotePoolComportamental(
  nivelResponsabilidad: number,
  cantidad: number = 10
): Promise<number> {
  if (nivelResponsabilidad < 1 || nivelResponsabilidad > 5) {
    throw new Error(`nivelResponsabilidad debe estar entre 1 y 5 (recibido: ${nivelResponsabilidad})`);
  }

  const descripcionNivel = [
    "",
    "Auxiliar (nivel 1): tareas operativas básicas, seguimiento de instrucciones",
    "Técnico (nivel 2): aplicación de conocimientos técnicos específicos",
    "Profesional (nivel 3): análisis, propuestas, toma de decisiones operativas",
    "Asesor (nivel 4): liderazgo técnico, orientación a otros, impacto institucional",
    "Directivo (nivel 5): liderazgo estratégico, toma de decisiones de alto impacto, gestión de equipos",
  ][nivelResponsabilidad];

  const prompt = `Eres un experto en evaluación de competencias comportamentales para el Estado colombiano (CNSC).

Genera EXACTAMENTE ${cantidad} preguntas de comportamiento laboral en escala Likert para cargos de nivel: ${descripcionNivel}.

REGLAS:
- Cada pregunta describe una SITUACIÓN LABORAL concreta aplicable a cualquier cargo del nivel ${nivelResponsabilidad}.
- El evaluado responde con qué frecuencia haría eso: 1=Nunca, 2=Casi nunca, 3=A veces, 4=Casi siempre, 5=Siempre.
- La respuesta "socialmente deseable" (esCorrecta: true) va calibrada según el nivel ${nivelResponsabilidad}.
- Para niveles directivos (4-5): se esperan frecuencias altas en liderazgo, iniciativa, decisión.
- Para niveles auxiliares/técnicos (1-2): se esperan frecuencias altas en seguimiento de normas, precisión, colaboración.
- DIVERSIDAD: cada pregunta evalúa una competencia distinta (orientación al logro, trabajo en equipo, comunicación, manejo del cambio, integridad, etc.).
- La explicación argumenta por qué esa es la respuesta esperada para este nivel.

Responde ÚNICAMENTE con JSON válido: array de ${cantidad} objetos:
[
  {
    "texto": "Cuando recibo instrucciones que considero no son óptimas...",
    "opciones": [
      {"letra": "1", "texto": "Nunca consulto, solo ejecuto", "valorLikert": 1, "esCorrecta": false},
      {"letra": "2", "texto": "Casi nunca menciono mis dudas", "valorLikert": 2, "esCorrecta": false},
      {"letra": "3", "texto": "A veces comento informalmente", "valorLikert": 3, "esCorrecta": false},
      {"letra": "4", "texto": "Casi siempre expreso propuestas respetuosamente", "valorLikert": 4, "esCorrecta": true},
      {"letra": "5", "texto": "Siempre cuestiono y exijo justificación formal", "valorLikert": 5, "esCorrecta": false}
    ],
    "nivelResponsabilidadAplicado": ${nivelResponsabilidad},
    "explicacion": "Para un nivel ${nivelResponsabilidad}, la respuesta esperada es 4 porque...",
    "categoria": "Orientación al logro"
  }
]`;

  const { data: raw } = await llmJson<unknown>(prompt, { temperature: 0.7 });
  const items = Array.isArray(raw)
    ? raw
    : (raw as { preguntas?: unknown[] })?.preguntas ?? raw;
  const preguntas = z.array(PreguntaComportamentalSchema).parse(items);

  for (const p of preguntas) {
    await prisma.pregunta.create({
      data: {
        tipo: "COMPORTAMENTAL",
        texto: p.texto,
        poolKey: `COMPORT_NIVEL_${nivelResponsabilidad}`,
        validada: true,
        nivelResponsabilidad,
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

  return preguntas.length;
}
