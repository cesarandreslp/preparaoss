import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/require-admin";
import { sincronizarConcursosCNSC } from "@/lib/concursos-cnsc-scraper";

export async function POST() {
  const guard = await requireAdmin();
  if (!guard.ok) return guard.response;

  try {
    const resultado = await sincronizarConcursosCNSC();
    return NextResponse.json({ ok: true, ...resultado });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
