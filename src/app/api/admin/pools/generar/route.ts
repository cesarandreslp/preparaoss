/**
 * POST /api/admin/pools/generar
 *
 * Genera preguntas para los pools globales. Una sola llamada genera UN lote
 * (10 preguntas) — se invoca varias veces hasta tener el pool deseado.
 *
 * Body JSON:
 *   { "tipo": "transversal", "cantidad": 10 }
 *   { "tipo": "comportamental", "nivel": 1, "cantidad": 10 }
 */

import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/require-admin";
import {
  generarLotePoolTransversal,
  generarLotePoolComportamental,
} from "@/lib/ia-generator";

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  const guard = await requireAdmin();
  if (!guard.ok) return guard.response;

  let body: { tipo?: string; nivel?: number; cantidad?: number };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const tipo = body.tipo;
  const cantidad = Math.min(Math.max(body.cantidad ?? 10, 1), 20);

  try {
    if (tipo === "transversal") {
      const n = await generarLotePoolTransversal(cantidad);
      return NextResponse.json({
        ok: true,
        pool: "TRANSVERSAL_GLOBAL",
        generadas: n,
      });
    }

    if (tipo === "comportamental") {
      const nivel = body.nivel;
      if (typeof nivel !== "number" || nivel < 1 || nivel > 5) {
        return NextResponse.json(
          { error: "Para tipo=comportamental se requiere nivel entre 1 y 5" },
          { status: 400 }
        );
      }
      const n = await generarLotePoolComportamental(nivel, cantidad);
      return NextResponse.json({
        ok: true,
        pool: `COMPORT_NIVEL_${nivel}`,
        generadas: n,
      });
    }

    return NextResponse.json(
      { error: "tipo debe ser 'transversal' o 'comportamental'" },
      { status: 400 }
    );
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("[admin/pools/generar] Error:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
