/**
 * Wrapper LLM con fallback automático Gemini → Groq → Zhipu.
 *
 * Estrategia:
 *   1) Gemini Flash Lite (free tier amplio, ~1500 RPD).
 *   2) Si rate-limit → Groq Llama 3.3 70B.
 *   3) Si Groq también → Zhipu GLM (último recurso).
 *
 * Los 3 clientes son OpenAI-compatible.
 */

import { gemini, GEMINI_MODEL } from "./gemini";
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

type Provider = "gemini" | "groq" | "zhipu";

interface ChatResult {
  content: string;
  provider: Provider;
}

// Cooldowns por provider — tras 429 no insistimos durante 5 min.
let geminiCooldownUntil = 0;
let groqCooldownUntil = 0;
const COOLDOWN_MS = 5 * 60_000;

// Throttle reservado para providers con rate-limit estricto. Patrón:
// cada call adelanta el contador ANTES del await, así N llamadas
// concurrentes (Promise.all en generarBancoCompleto) se serializan
// correctamente espaciadas en lugar de pegarse al mismo timestamp.

// Gemini free tier de flash-lite tolera ~30 RPM, dejamos margen.
const GEMINI_MIN_INTERVAL_MS = 2000;
let geminiNextSlotAt = 0;

// Zhipu free tier ~1 RPM en frío, deja margen mayor.
const ZHIPU_MIN_INTERVAL_MS = 1500;
let zhipuNextSlotAt = 0;

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
    msg.includes("too many requests") ||
    msg.includes("resource_exhausted")
  );
}

async function callGemini(
  messages: ChatMessage[],
  opts: ChatOptions
): Promise<string> {
  // Reserva atómica del slot (ver comentario arriba del bloque de throttles).
  const now = Date.now();
  const fireAt = Math.max(now, geminiNextSlotAt);
  geminiNextSlotAt = fireAt + GEMINI_MIN_INTERVAL_MS;
  const wait = fireAt - now;
  if (wait > 0) await new Promise((r) => setTimeout(r, wait));

  const completion = await gemini.chat.completions.create(
    {
      model: GEMINI_MODEL,
      messages,
      temperature: opts.temperature ?? 0.7,
      ...(opts.json ? { response_format: { type: "json_object" as const } } : {}),
    },
    { maxRetries: 0 }
  );
  return completion.choices[0]?.message?.content ?? "";
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
  const fireAt = Math.max(now, zhipuNextSlotAt);
  zhipuNextSlotAt = fireAt + ZHIPU_MIN_INTERVAL_MS;
  const wait = fireAt - now;
  if (wait > 0) await new Promise((r) => setTimeout(r, wait));

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
  const geminiEnCooldown = Date.now() < geminiCooldownUntil;
  const groqEnCooldown = Date.now() < groqCooldownUntil;

  // 1) Gemini (primario)
  if (!geminiEnCooldown && process.env.GEMINI_API_KEY) {
    try {
      const content = await callGemini(messages, opts);
      return { content, provider: "gemini" };
    } catch (err) {
      if (!isRateLimit(err)) throw err;
      geminiCooldownUntil = Date.now() + COOLDOWN_MS;
      console.warn("[llm] Gemini rate-limit → cooldown 5min, fallback a Groq");
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
      console.warn("[llm] Groq rate-limit → cooldown 5min, fallback a Zhipu");
    }
  }

  // 3) Zhipu (último recurso)
  if (!process.env.ZHIPU_API_KEY) {
    throw new Error("Todos los providers en cooldown y Zhipu no configurado");
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
 * Sanea la respuesta JSON del LLM. Algunos modelos (especialmente Gemini
 * Flash) a veces devuelven:
 *   - markdown fences ```json ... ```
 *   - texto adicional después del cierre del objeto/array
 *   - dos objetos JSON concatenados
 * En esos casos, extraemos el primer objeto/array balanceado y descartamos
 * el resto. Si nada de eso aplica, devuelve el original.
 */
function sanitizeJson(raw: string): string {
  let s = raw.trim();
  // Quitar fences de markdown si vinieron
  s = s.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/i, "").trim();

  if (!s) return s;
  const first = s[0];
  if (first !== "{" && first !== "[") return s;
  const opener = first;
  const closer = opener === "{" ? "}" : "]";

  // Balance brackets respetando strings y escapes — devolvemos el sub-string
  // que abarca el primer objeto/array balanceado.
  let depth = 0;
  let inString = false;
  let escape = false;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (escape) {
      escape = false;
      continue;
    }
    if (c === "\\" && inString) {
      escape = true;
      continue;
    }
    if (c === '"') {
      inString = !inString;
      continue;
    }
    if (inString) continue;
    if (c === opener) depth++;
    else if (c === closer) {
      depth--;
      if (depth === 0) return s.slice(0, i + 1);
    }
  }
  return s; // no balanceó — que falle el JSON.parse con el original
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
  const sane = sanitizeJson(content || "{}");
  return { data: JSON.parse(sane) as T, provider };
}
