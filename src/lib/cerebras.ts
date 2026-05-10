/**
 * Cliente Cerebras Cloud — primario para generación de bancos de preguntas.
 *
 * Free tier: ~14k requests/día con Llama 3.3 70B. Cuota >> Groq free
 * (~20 OPECs/día), permite procesar el lote completo de OPECs sin pagar.
 *
 * Docs: https://inference-docs.cerebras.ai/
 * Modelo configurable vía CEREBRAS_MODEL env var por si el ID cambia.
 */

import Cerebras from "@cerebras/cerebras_cloud_sdk";

export const cerebras = new Cerebras({
  apiKey: process.env.CEREBRAS_API_KEY,
});

// Modelo verificado en el catálogo de la cuenta:
//   qwen-3-235b-a22b-instruct-2507 — 235B MoE (~22B activos), instruct-tuned,
//   multilingual fuerte y sigue JSON schemas estrictos. Configurable vía
//   CEREBRAS_MODEL env var.
export const CEREBRAS_MODEL = process.env.CEREBRAS_MODEL ?? "qwen-3-235b-a22b-instruct-2507";
