import Groq from "groq-sdk";

export const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// llama-3.1-8b-instant: cuota TPD significativamente más alta en free tier
// y respuesta ~3× más rápida. Calidad suficiente para preguntas tipo CNSC
// con prompt detallado. Si en algún caso queremos calidad superior usamos
// el modelo premium explícitamente.
export const GROQ_MODEL = "llama-3.1-8b-instant";
export const GROQ_MODEL_PREMIUM = "llama-3.3-70b-versatile";
