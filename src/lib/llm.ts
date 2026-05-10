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

// Cuando Groq devuelve 429 (TPD agotado o por minuto), evitamos seguir
// llamándolo durante el resto del proceso. Cada llamada Groq sin esto
// gasta ~10s en reintentos internos del SDK antes de rendirse, lo cual
// agota fácilmente el timeout de 60s del route en Vercel.
let groqCooldownUntil = 0;
const GROQ_COOLDOWN_MS = 5 * 60_000;

// Zhipu free tier acepta ~1-2 req/seg. Si en un mismo route hacemos N
// OPECs × 4 LLM calls cada una, se nos van encima y devuelve 429
// "您的账户已达到速率限制". Throttle local para no provocarlo.
let zhipuLastCallAt = 0;
const ZHIPU_MIN_INTERVAL_MS = 1500;

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
  const completion = await groq.chat.completions.create(
    {
      model: GROQ_MODEL,
      messages,
      temperature: opts.temperature ?? 0.7,
      ...(opts.json ? { response_format: { type: "json_object" as const } } : {}),
    },
    { maxRetries: 0 }
  );
  return completion.choices[0]?.message?.content ?? "";
}

async function callZhipu(
  messages: ChatMessage[],
  opts: ChatOptions
): Promise<string> {
  const now = Date.now();
  const wait = zhipuLastCallAt + ZHIPU_MIN_INTERVAL_MS - now;
  if (wait > 0) {
    await new Promise((r) => setTimeout(r, wait));
  }
  // Reservamos el timestamp ANTES del await para que dos calls
  // concurrentes (Promise.all) en el mismo proceso no se pisen.
  zhipuLastCallAt = Date.now();

  const completion = await zhipu.chat.completions.create(
    {
      model: ZHIPU_MODEL,
      messages,
      temperature: opts.temperature ?? 0.7,
      ...(opts.json ? { response_format: { type: "json_object" as const } } : {}),
    },
    { maxRetries: 0 }
  );
  return completion.choices[0]?.message?.content ?? "";
}

export async function llmChat(
  messages: ChatMessage[],
  opts: ChatOptions = {}
): Promise<ChatResult> {
  const groqEnCooldown = Date.now() < groqCooldownUntil;

  if (!groqEnCooldown) {
    try {
      const content = await callGroq(messages, opts);
      return { content, provider: "groq" };
    } catch (err) {
      if (!isRateLimit(err)) throw err;
      groqCooldownUntil = Date.now() + GROQ_COOLDOWN_MS;
      console.warn("[llm] Groq rate-limit → cooldown 5min activado, fallback a Zhipu");
    }
  }

  if (!process.env.ZHIPU_API_KEY) {
    throw new Error("Groq en cooldown y ZHIPU_API_KEY no configurada");
  }

  try {
    const content = await callZhipu(messages, opts);
    return { content, provider: "zhipu" };
  } catch (zhipuErr) {
    const msg = zhipuErr instanceof Error ? zhipuErr.message : String(zhipuErr);
    console.error("[llm] Zhipu también falló:", msg);
    throw zhipuErr;
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
