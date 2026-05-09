/**
 * Wrapper LLM con fallback automático Groq → Zhipu.
 *
 * Estrategia:
 *   1) Intenta Groq (Llama 3.3 70B).
 *   2) Si responde 429 / rate_limit / quota → cae a Zhipu (GLM-4-Flash).
 *   3) Si Zhipu también falla, propaga el error original.
 *
 * Ambos clientes son OpenAI-compatible, así que el shape de mensajes
 * y respuesta es idéntico.
 */

import { groq, GROQ_MODEL } from "./groq";
import { zhipu, ZHIPU_MODEL } from "./zhipu";

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface ChatOptions {
  temperature?: number;
  json?: boolean;
}

interface ChatResult {
  content: string;
  provider: "groq" | "zhipu";
}

function isRateLimit(err: unknown): boolean {
  if (!err || typeof err !== "object") return false;
  const e = err as Record<string, unknown>;
  const msg = String(e.message ?? "").toLowerCase();
  const status = e.status ?? (e as { response?: { status?: number } }).response?.status;
  return (
    status === 429 ||
    msg.includes("rate_limit") ||
    msg.includes("rate limit") ||
    msg.includes("429") ||
    msg.includes("quota") ||
    msg.includes("too many requests")
  );
}

async function callGroq(
  messages: ChatMessage[],
  opts: ChatOptions
): Promise<string> {
  const completion = await groq.chat.completions.create({
    model: GROQ_MODEL,
    messages,
    temperature: opts.temperature ?? 0.7,
    ...(opts.json ? { response_format: { type: "json_object" as const } } : {}),
  });
  return completion.choices[0]?.message?.content ?? "";
}

async function callZhipu(
  messages: ChatMessage[],
  opts: ChatOptions
): Promise<string> {
  const completion = await zhipu.chat.completions.create({
    model: ZHIPU_MODEL,
    messages,
    temperature: opts.temperature ?? 0.7,
    ...(opts.json ? { response_format: { type: "json_object" as const } } : {}),
  });
  return completion.choices[0]?.message?.content ?? "";
}

export async function llmChat(
  messages: ChatMessage[],
  opts: ChatOptions = {}
): Promise<ChatResult> {
  try {
    const content = await callGroq(messages, opts);
    return { content, provider: "groq" };
  } catch (err) {
    if (!isRateLimit(err)) throw err;
    if (!process.env.ZHIPU_API_KEY) {
      console.warn("[llm] Groq rate-limit y ZHIPU_API_KEY no configurada — propago error");
      throw err;
    }
    console.warn("[llm] Groq rate-limit → fallback a Zhipu");
    try {
      const content = await callZhipu(messages, opts);
      return { content, provider: "zhipu" };
    } catch (zhipuErr) {
      console.error("[llm] Zhipu también falló:", zhipuErr instanceof Error ? zhipuErr.message : zhipuErr);
      // Propagamos el error original de Groq (más informativo) si Zhipu falló igual
      throw err;
    }
  }
}

/**
 * Helper específico para preguntas con response_format JSON.
 * Devuelve el JSON parseado.
 */
export async function llmJson<T>(
  prompt: string,
  opts: ChatOptions = {}
): Promise<{ data: T; provider: "groq" | "zhipu" }> {
  const { content, provider } = await llmChat(
    [{ role: "user", content: prompt }],
    { ...opts, json: true }
  );
  return { data: JSON.parse(content || "{}") as T, provider };
}
