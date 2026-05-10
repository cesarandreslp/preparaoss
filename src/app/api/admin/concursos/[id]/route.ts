import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/require-admin";
import { prisma } from "@/lib/prisma";

const patchSchema = z.object({
  nombreOverride: z.string().max(300).nullable().optional(),
  imagenCustomUrl: z.string().url().max(2000).nullable().optional().or(z.literal("").transform(() => null)),
  visible: z.boolean().optional(),
  orden: z.number().int().optional(),
});

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const guard = await requireAdmin();
  if (!guard.ok) return guard.response;

  const { id } = await params;

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Datos inválidos", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  try {
    const updated = await prisma.concursoEnDesarrollo.update({
      where: { id },
      data: parsed.data,
    });
    return NextResponse.json({ ok: true, concurso: updated });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
