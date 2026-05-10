/**
 * Wrapper LLM con fallback automático Cerebras → Groq.
 *
 * Estrategia:
 *   1) Intenta Cerebras (Llama 3.3 70B, free tier ~14k req/día).
 *   2) Si responde 429 / rate_limit / quota → cae a Groq (Llama 3.3 70B).
 *   3) Si Groq también falla, propaga el error.
 *
 * Ambos clientes son OpenAI-compatible — la API de chat.completions.create
 * tiene el mismo shape en los dos.
 *
 * Zhipu fue removido del chain: free tier sin verificación de identidad
 * china tiene un cap muy bajo (~5 calls/día) que lo hace inservible para
 * generación masiva.
 */

import { cerebras, CEREBRAS_MODEL } from "./cerebras";
import { groq, GROQ_MODEL } from "./groq";

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface ChatOptions {
  temperature?: number;
  json?: boolean;
}

type Provider = "cerebras" | "groq";

interface ChatResult {
  content: string;
  provider: Provider;
}

// Cooldown por provider: tras un 429 evitamos seguir gastando 10s por
// llamada en reintentos opacos del SDK durante el timeout de 60s de Vercel.
let cerebrasCooldownUntil = 0;
let groqCooldownUntil = 0;
const COOLDOWN_MS = 5 * 60_000;

// Throttle de reserva — cada call adelanta el contador ANTES del await
// para que N llamadas concurrentes (Promise.all dentro de una OPEC) se
// serialicen correctamente espaciadas en lugar de pegarse al mismo
// timestamp. Cerebras free tier permite ~60 RPM = 1 RPS, dejamos margen.
const CEREBRAS_MIN_INTERVAL_MS = 1100;
let cerebrasNextSlotAt = 0;

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

async function callCerebras(
  messages: ChatMessage[],
  opts: ChatOptions
): Promise<string> {
  // Reserva atómica del slot — calls concurrentes ven el contador ya
  // adelantado y esperan en serie a 1100ms entre sí.
  const now = Date.now();
  const fireAt = Math.max(now, cerebrasNextSlotAt);
  cerebrasNextSlotAt = fireAt + CEREBRAS_MIN_INTERVAL_MS;
  const wait = fireAt - now;
  if (wait > 0) {
    await new Promise((r) => setTimeout(r, wait));
  }

  // El SDK Cerebras tipa cada rol con su propia interface (SystemMessage,
  // UserMessage, etc.) en lugar de una unión, así que un ChatMessage[]
  // genérico no asigna. La API real acepta el mismo shape OpenAI-compatible,
  // por eso el cast explícito.
  const completion = await cerebras.chat.completions.create({
    model: CEREBRAS_MODEL,
    messages: messages as unknown as Parameters<typeof cerebras.chat.completions.create>[0]["messages"],
    temperature: opts.temperature ?? 0.7,
    ...(opts.json ? { response_format: { type: "json_object" as const } } : {}),
  });
  const choices = (completion as { choices?: Array<{ message?: { content?: string } }> }).choices;
  return choices?.[0]?.message?.content ?? "";
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

export async function llmChat(
  messages: ChatMessage[],
  opts: ChatOptions = {}
): Promise<ChatResult> {
  const cerebrasEnCooldown = Date.now() < cerebrasCooldownUntil;
  const groqEnCooldown = Date.now() < groqCooldownUntil;

  // 1) Cerebras (primario por cuota free tier)
  if (!cerebrasEnCooldown && process.env.CEREBRAS_API_KEY) {
    try {
      const content = await callCerebras(messages, opts);
      return { content, provider: "cerebras" };
    } catch (err) {
      if (!isRateLimit(err)) throw err;
      cerebrasCooldownUntil = Date.now() + COOLDOWN_MS;
      console.warn("[llm] Cerebras rate-limit → cooldown 5min, fallback a Groq");
    }
  }

  // 2) Groq (fallback)
  if (!groqEnCooldown) {
    try {
      const content = await callGroq(messages, opts);
      return { content, provider: "groq" };
    } catch (err) {
      if (!isRateLimit(err)) throw err;
      groqCooldownUntil = Date.now() + COOLDOWN_MS;
      console.warn("[llm] Groq rate-limit → cooldown 5min");
      throw err;
    }
  }

  throw new Error("Cerebras y Groq ambos en cooldown — esperar reset de cuota");
}

/**
 * Helper específico para preguntas con response_format JSON.
 * Devuelve el JSON parseado.
 */
export async function llmJson<T>(
  prompt: string,
  opts: ChatOptions = {}
): Promise<{ data: T; provider: Provider }> {
  const { content, provider } = await llmChat(
    [{ role: "user", content: prompt }],
    { ...opts, json: true }
  );
  return { data: JSON.parse(content || "{}") as T, provider };
}
