import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const patchSchema = z.object({
  nombre: z.string().min(3).max(200).optional(),
  descripcion: z.string().max(2000).nullable().optional(),
  apiUrl: z.string().url().max(500).optional(),
  webUrl: z.string().url().max(500).nullable().optional(),
  pageParam: z.string().min(1).max(40).optional(),
  sizeParam: z.string().min(1).max(40).optional(),
  pageSize: z.number().int().min(1).max(200).optional(),
  itemsKey: z.string().min(1).max(80).optional(),
  totalKey: z.string().min(1).max(80).optional(),
  activo: z.boolean().optional(),
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
    return NextResponse.json(
      { error: "Datos inválidos", issues: parsed.error.issues },
      { status: 400 }
    );
  }
  const updated = await prisma.entidadEspecial.update({
    where: { id },
    data: parsed.data,
  });
  return NextResponse.json({ ok: true, entidad: updated });
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
  await prisma.entidadEspecial.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
