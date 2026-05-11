/**
 * Cliente Gemini — primario en el chain de fallback de llm.ts.
 *
 * Usa el endpoint OpenAI-compatible de Google (no requiere SDK separado).
 * Free tier de gemini-3.1-flash-lite es generoso (1500 RPD aprox), apto
 * para el cron de generación masiva de escenarios.
 *
 * Docs: https://ai.google.dev/gemini-api/docs/openai
 * Modelo configurable vía GEMINI_MODEL env var.
 */

import OpenAI from "openai";

export const gemini = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

export const GEMINI_MODEL = process.env.GEMINI_MODEL ?? "gemini-3.1-flash-lite";
