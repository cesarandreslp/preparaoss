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

  // Necesitamos el nivelResponsabilidad de la OPEC para seleccionar el pool
  // comportamental correcto. Lo cargamos una sola vez al inicio.
  const opec = await prisma.opec.findUnique({
    where: { id: opecId },
    select: { nivelResponsabilidad: true },
  });
  const nivelOpec = opec?.nivelResponsabilidad ?? 3;

  // ── Composición MIXTO: 30% específica + 30% transversal + 40% comportamental ──
  // Si la OPEC no tiene banco de específicas validadas, ese 30% se reasigna a
  // transversales (queda 60% transversal + 40% comportamental).
  let cuotaEspecifica = 0;
  let cuotaTransversal = 0;
  let cuotaComport = 0;
  if (tipoSimulacro === "MIXTO") {
    cuotaEspecifica = Math.round(maxPreguntas * 0.3);
    cuotaTransversal = Math.round(maxPreguntas * 0.3);
    cuotaComport = maxPreguntas - cuotaEspecifica - cuotaTransversal;
  }

  // ── FUNCIONAL ESPECÍFICA (por escenarios, 3 preguntas c/u) ──
  // Únicas atadas al cargo concreto — generadas por OPEC.
  if (tiposAIncluir.includes("FUNCIONAL_ESPECIFICA") && preguntasRestantes > 0) {
    const objetivo = tipoSimulacro === "MIXTO" ? cuotaEspecifica : maxPreguntas;
    const numEscenarios = Math.ceil(objetivo / 3);

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
    });

    const mezclados = escenariosDB.sort(() => Math.random() - 0.5).slice(0, numEscenarios);

    for (const esc of mezclados) {
      if (preguntasRestantes <= 0) break;
      escenarios.push({
        id: esc.id,
        contenido: esc.contenido,
        preguntas: esc.preguntas.slice(0, 3).map(mapPregunta),
      });
      preguntasRestantes -= Math.min(3, esc.preguntas.length);
    }
  }

  // ── FUNCIONAL TRANSVERSAL (preguntas individuales con 4 opciones) ──
  // Pool global compartido entre todas las OPECs — normatividad/gestión pública.
  if (tiposAIncluir.includes("FUNCIONAL_TRANSVERSAL") && preguntasRestantes > 0) {
    const cantidad = tipoSimulacro === "MIXTO"
      ? Math.min(preguntasRestantes, cuotaTransversal)
      : preguntasRestantes;

    const preguntas = await prisma.pregunta.findMany({
      where: { poolKey: "TRANSVERSAL_GLOBAL", tipo: "FUNCIONAL_TRANSVERSAL", validada: true },
      include: { opciones: true },
    });

    const seleccionadas = preguntas.sort(() => Math.random() - 0.5).slice(0, cantidad);
    preguntasIndividuales.push(...seleccionadas.map(mapPregunta));
    preguntasRestantes -= seleccionadas.length;
  }

  // ── COMPORTAMENTAL (Likert 1-5) — 40% del simulacro MIXTO ──
  // Pool por nivel de responsabilidad del cargo (1=Auxiliar..5=Directivo).
  if (tiposAIncluir.includes("COMPORTAMENTAL") && preguntasRestantes > 0) {
    const preguntas = await prisma.pregunta.findMany({
      where: {
        poolKey: `COMPORT_NIVEL_${nivelOpec}`,
        tipo: "COMPORTAMENTAL",
        validada: true,
      },
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
