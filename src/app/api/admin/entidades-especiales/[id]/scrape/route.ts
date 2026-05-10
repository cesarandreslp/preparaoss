import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/require-admin";
import { scrapeEntidadEspecial } from "@/lib/entidades-especiales-scraper";

export const maxDuration = 60;

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const guard = await requireAdmin();
  if (!guard.ok) return guard.response;
  const { id } = await params;
  try {
    const r = await scrapeEntidadEspecial(id);
    return NextResponse.json({ ok: true, ...r });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : String(e) },
      { status: 500 }
    );
  }
}
