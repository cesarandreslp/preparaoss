/**
 * simulacro-engine.ts
 * Motor de armado y scoring de simulacros
 */

import { prisma } from "./prisma";
import { TipoPregunta, TipoSimulacro } from "@prisma/client";

// ─────────────────────────────────────────────────
// CONFIGURACIÓN DE PREGUNTAS POR PLAN
// ─────────────────────────────────────────────────

export const PREGUNTAS_POR_PLAN = {
  GRATUITO: 10,
  BASICO: 20,
  PRO: 40,
  PREMIUM: 60,
} as const;

// ─────────────────────────────────────────────────
// ARMAR UN SIMULACRO
// Selecciona preguntas aleatorieas según el tipo
// ─────────────────────────────────────────────────

export async function armarSimulacro(
  opecId: string,
  tipoSimulacro: TipoSimulacro,
  maxPreguntas: number
): Promise<{
  escenarios: {
    id: string;
    contenido: string;
    preguntas: PreguntaConOpciones[];
  }[];
  preguntasIndividuales: PreguntaConOpciones[];
}> {
  const escenarios: { id: string; contenido: string; preguntas: PreguntaConOpciones[] }[] = [];
  const preguntasIndividuales: PreguntaConOpciones[] = [];

  const tiposAIncluir: TipoPregunta[] = tipoSimulacro === "MIXTO"
    ? ["FUNCIONAL_ESPECIFICA", "FUNCIONAL_TRANSVERSAL", "COMPORTAMENTAL"]
    : [tipoSimulacro as TipoPregunta];

  let preguntasRestantes = maxPreguntas;

  // ── FUNCIONAL ESPECÍFICA (por escenarios, 3 preguntas c/u) ──
  if (tiposAIncluir.includes("FUNCIONAL_ESPECIFICA") && preguntasRestantes > 0) {
    const numEscenarios = tipoSimulacro === "MIXTO" ? 1 : Math.ceil(maxPreguntas / 3);

    const escenariosDB = await prisma.escenarioSituacional.findMany({
      where: {
        opecId,
        preguntas: { some: { tipo: "FUNCIONAL_ESPECIFICA", validada: true } },
      },
      include: {
        preguntas: {
          where: { tipo: "FUNCIONAL_ESPECIFICA", validada: true },
          include: { opciones: true },
          orderBy: { createdAt: "asc" },
        },
      },
      orderBy: { createdAt: "desc" },
      // Aleatoriedad: tomar más y luego mezclar
    });

    // Mezclar y tomar numEscenarios
    const mezclados = escenariosDB.sort(() => Math.random() - 0.5).slice(0, numEscenarios);

    for (const esc of mezclados) {
      if (preguntasRestantes <= 0) break;
      escenarios.push({
        id: esc.id,
        contenido: esc.contenido,
        preguntas: esc.preguntas.slice(0, 3).map(mapPregunta),
      });
      preguntasRestantes -= 3;
    }
  }

  // ── FUNCIONAL TRANSVERSAL (preguntas individuales con 4 opciones) ──
  if (tiposAIncluir.includes("FUNCIONAL_TRANSVERSAL") && preguntasRestantes > 0) {
    const cantidad = tipoSimulacro === "MIXTO" ? Math.ceil(preguntasRestantes / 2) : preguntasRestantes;

    const preguntas = await prisma.pregunta.findMany({
      where: { opecId, tipo: "FUNCIONAL_TRANSVERSAL", validada: true },
      include: { opciones: true },
      orderBy: { createdAt: "desc" },
    });

    const seleccionadas = preguntas.sort(() => Math.random() - 0.5).slice(0, cantidad);
    preguntasIndividuales.push(...seleccionadas.map(mapPregunta));
    preguntasRestantes -= seleccionadas.length;
  }

  // ── COMPORTAMENTAL (Likert 1-5) ──
  if (tiposAIncluir.includes("COMPORTAMENTAL") && preguntasRestantes > 0) {
    const preguntas = await prisma.pregunta.findMany({
      where: { opecId, tipo: "COMPORTAMENTAL", validada: true },
      include: { opciones: true },
    });

    const seleccionadas = preguntas.sort(() => Math.random() - 0.5).slice(0, preguntasRestantes);
    preguntasIndividuales.push(...seleccionadas.map(mapPregunta));
  }

  return { escenarios, preguntasIndividuales };
}

// ─────────────────────────────────────────────────
// CALCULAR PUNTAJE FINAL
// ─────────────────────────────────────────────────

export interface RespuestaInput {
  preguntaId: string;
  opcionId?: string;
  valorLikert?: number;
}

export interface PuntajeResult {
  puntajeTotal: number;       // 0-100
  puntajeFuncEsp: number | null;
  puntajeFuncTrans: number | null;
  puntajeComport: number | null;
  correctasFuncEsp: number;
  totalFuncEsp: number;
  correctasFuncTrans: number;
  totalFuncTrans: number;
  correctasComport: number;
  totalComport: number;
  respuestasDetalle: {
    preguntaId: string;
    tipo: TipoPregunta;
    esCorrecta: boolean;
    opcionSeleccionadaId?: string;
    opcionCorrectaId?: string;
    valorLikert?: number;
    explicacion: string;
  }[];
}

export async function calcularPuntaje(
  respuestas: RespuestaInput[]
): Promise<PuntajeResult> {
  const preguntaIds = respuestas.map((r) => r.preguntaId);

  const preguntas = await prisma.pregunta.findMany({
    where: { id: { in: preguntaIds } },
    include: { opciones: true },
  });

  const preguntaMap = new Map(preguntas.map((p) => [p.id, p]));

  const detalle: PuntajeResult["respuestasDetalle"] = [];
  let correctasFuncEsp = 0, totalFuncEsp = 0;
  let correctasFuncTrans = 0, totalFuncTrans = 0;
  let correctasComport = 0, totalComport = 0;

  for (const resp of respuestas) {
    const pregunta = preguntaMap.get(resp.preguntaId);
    if (!pregunta) continue;

    let esCorrecta = false;
    const opcionCorrecta = pregunta.opciones.find((o) => o.esCorrecta);

    if (pregunta.tipo === "COMPORTAMENTAL") {
      // Para Likert: correcta si seleccionó la opción marcada como correcta
      const opcionSel = pregunta.opciones.find((o) => o.id === resp.opcionId);
      esCorrecta = opcionSel?.esCorrecta ?? false;
      totalComport++;
      if (esCorrecta) correctasComport++;
    } else {
      esCorrecta = resp.opcionId === opcionCorrecta?.id;

      if (pregunta.tipo === "FUNCIONAL_ESPECIFICA") {
        totalFuncEsp++;
        if (esCorrecta) correctasFuncEsp++;
      } else {
        totalFuncTrans++;
        if (esCorrecta) correctasFuncTrans++;
      }
    }

    detalle.push({
      preguntaId: pregunta.id,
      tipo: pregunta.tipo,
      esCorrecta,
      opcionSeleccionadaId: resp.opcionId,
      opcionCorrectaId: opcionCorrecta?.id,
      valorLikert: resp.valorLikert,
      explicacion: pregunta.explicacion,
    });
  }

  const total = totalFuncEsp + totalFuncTrans + totalComport;
  const correctas = correctasFuncEsp + correctasFuncTrans + correctasComport;

  return {
    puntajeTotal: total > 0 ? Math.round((correctas / total) * 100) : 0,
    puntajeFuncEsp: totalFuncEsp > 0 ? Math.round((correctasFuncEsp / totalFuncEsp) * 100) : null,
    puntajeFuncTrans: totalFuncTrans > 0 ? Math.round((correctasFuncTrans / totalFuncTrans) * 100) : null,
    puntajeComport: totalComport > 0 ? Math.round((correctasComport / totalComport) * 100) : null,
    correctasFuncEsp, totalFuncEsp,
    correctasFuncTrans, totalFuncTrans,
    correctasComport, totalComport,
    respuestasDetalle: detalle,
  };
}

// ─────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────

export interface PreguntaConOpciones {
  id: string;
  tipo: TipoPregunta;
  texto: string;
  categoria: string;
  dificultad: string;
  opciones: {
    id: string;
    letra: string;
    texto: string;
    valorLikert: number | null;
  }[];
  // La explicación NO se envía al cliente hasta que finalice el simulacro
}

function mapPregunta(p: {
  id: string;
  tipo: TipoPregunta;
  texto: string;
  categoria: string;
  dificultad: string;
  opciones: { id: string; letra: string; texto: string; valorLikert: number | null }[];
}): PreguntaConOpciones {
  return {
    id: p.id,
    tipo: p.tipo,
    texto: p.texto,
    categoria: p.categoria,
    dificultad: p.dificultad,
    // Mezclar opciones para que no siempre aparezca la primera correcta
    opciones: p.opciones
      .sort(() => Math.random() - 0.5)
      .map((o) => ({
        id: o.id,
        letra: o.letra,
        texto: o.texto,
        valorLikert: o.valorLikert,
      })),
  };
}
