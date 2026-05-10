/**
 * GET /api/admin/test-zhipu
 *
 * Endpoint diagnóstico: llama a Zhipu DIRECTAMENTE (saltando Groq y todo el
 * wrapper de fallback) con un prompt mínimo y devuelve raw output + métricas.
 * Sirve para confirmar empíricamente:
 *   - que la API key responde
 *   - el modelo aceptado
 *   - latencia real
 *   - si produce JSON válido para nuestro schema
 *
 * Uso: GET con ?type=simple|schema  (default: simple)
 */

import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/require-admin";
import { zhipu, ZHIPU_MODEL } from "@/lib/zhipu";

export const maxDuration = 60;

const PROMPT_SIMPLE = `Responde EXACTAMENTE con este JSON: {"ok": true, "mensaje": "hola"}`;

const PROMPT_SCHEMA = `Genera EXACTAMENTE 2 preguntas tipo CNSC sobre derecho administrativo colombiano.

Reglas:
- Cada pregunta tiene 4 opciones (A, B, C, D), solo una correcta.
- "dificultad" debe ser EXACTAMENTE uno de estos valores literales: "BASICO", "INTERMEDIO" o "AVANZADO".

Responde SOLO con JSON válido en este formato:
[
  {
    "texto": "pregunta...",
    "opciones": [
      {"letra": "A", "texto": "...", "esCorrecta": false},
      {"letra": "B", "texto": "...", "esCorrecta": true},
      {"letra": "C", "texto": "...", "esCorrecta": false},
      {"letra": "D", "texto": "...", "esCorrecta": false}
    ],
    "respuestaCorrecta": "B",
    "explicacion": "explicación >50 caracteres...",
    "categoria": "Normatividad",
    "dificultad": "INTERMEDIO"
  }
]`;

export async function GET(request: NextRequest) {
  const guard = await requireAdmin();
  if (!guard.ok) return guard.response;

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") ?? "simple";
  const prompt = type === "schema" ? PROMPT_SCHEMA : PROMPT_SIMPLE;

  if (!process.env.ZHIPU_API_KEY) {
    return NextResponse.json({ ok: false, error: "ZHIPU_API_KEY no configurada" }, { status: 400 });
  }

  const t0 = Date.now();
  try {
    const completion = await zhipu.chat.completions.create(
      {
        model: ZHIPU_MODEL,
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        response_format: { type: "json_object" as const },
      },
      { maxRetries: 0 }
    );
    const elapsed = Date.now() - t0;
    const raw = completion.choices[0]?.message?.content ?? "";

    let parsed: unknown = null;
    let parseError: string | null = null;
    try {
      parsed = JSON.parse(raw);
    } catch (e) {
      parseError = e instanceof Error ? e.message : String(e);
    }

    return NextResponse.json({
      ok: true,
      modelo: ZHIPU_MODEL,
      tipoPrompt: type,
      latenciaMs: elapsed,
      raw,
      parsed,
      parseError,
      usage: completion.usage ?? null,
    });
  } catch (e) {
    const elapsed = Date.now() - t0;
    const err = e as { status?: number; message?: string; code?: string; error?: unknown };
    return NextResponse.json(
      {
        ok: false,
        modelo: ZHIPU_MODEL,
        latenciaMs: elapsed,
        status: err.status ?? null,
        code: err.code ?? null,
        message: err.message ?? String(e),
        errorBody: err.error ?? null,
      },
      { status: 500 }
    );
  }
}
