import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { sincronizarConcursosCNSC } from "@/lib/concursos-cnsc-scraper";

export async function POST() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  try {
    const resultado = await sincronizarConcursosCNSC();
    return NextResponse.json({ ok: true, ...resultado });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
