import Groq from "groq-sdk";

export const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "unset", // no reventar el build si falta
});

// llama-3.3-70b-versatile: produce JSON estructurado siguiendo el schema
// Zod estricto. El 8b-instant es ~3× más rápido y tiene cuota TPD mayor,
// pero no respeta los enums (devuelve "basico" en vez de "BASICO") ni la
// cantidad exacta de opciones — lote completo falla en validación Zod.
// La cuenta ya no tiene acceso a los Llama; usa los modelos vigentes del catálogo.
// Configurable por env por si cambia de nuevo.
export const GROQ_MODEL = process.env.GROQ_MODEL ?? "openai/gpt-oss-120b";
export const GROQ_MODEL_FAST = "llama-3.1-8b-instant";
