import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const patchSchema = z.object({
  titulo: z.string().min(2).max(300).optional(),
  numeroNorma: z.string().max(100).nullable().optional(),
  descripcion: z.string().max(2000).nullable().optional(),
  pdfUrl: z.string().url().max(2000).nullable().optional().or(z.literal("").transform(() => null)),
  vigente: z.boolean().optional(),
  orden: z.number().int().optional(),
  bloque: z
    .enum([
      "REGIMEN_SERVIDOR_PUBLICO",
      "DISCIPLINARIO",
      "INFORMACION_ARCHIVO_TRANSPARENCIA",
      "GESTION_CONTROL",
      "CONTRATACION_PRESUPUESTO_TALENTO",
      "ETICA_SERVICIO",
    ])
    .optional(),
});

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }
  const { id } = await params;
  const body = await req.json().catch(() => ({}));
  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Datos inválidos", issues: parsed.error.issues }, { status: 400 });
  }
  const updated = await prisma.recursoBiblioteca.update({
    where: { id },
    data: parsed.data,
  });
  return NextResponse.json({ ok: true, recurso: updated });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }
  const { id } = await params;
  await prisma.recursoBiblioteca.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
