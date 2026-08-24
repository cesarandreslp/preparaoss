/**
 * Cliente Mistral — endpoint OpenAI-compatible.
 * Docs: https://docs.mistral.ai/api/
 * La llave vive en la variable de entorno MISTRAL (no MISTRAL_API_KEY).
 * El modelo es configurable por MISTRAL_MODEL (pon el string exacto de tu cuenta).
 */

import OpenAI from "openai";

export const mistral = new OpenAI({
  apiKey: process.env.MISTRAL,
  baseURL: "https://api.mistral.ai/v1",
});

// Modelo GENERAL y gratuito (NO Leanstral, que es de teoremas Lean 4).
// open-mistral-nemo: 12B multilingüe, pesos abiertos, free tier.
export const MISTRAL_MODEL = process.env.MISTRAL_MODEL ?? "open-mistral-nemo";
