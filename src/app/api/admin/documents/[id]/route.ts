/**
 * DELETE /api/admin/documents/[id]
 * Elimina un documento (no toca preguntas ya generadas a partir de él).
 */

import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const { id } = await params;

  const doc = await prisma.document.findUnique({ where: { id }, select: { id: true } });
  if (!doc) {
    return NextResponse.json({ error: "Documento no encontrado" }, { status: 404 });
  }

  await prisma.document.delete({ where: { id } });

  return NextResponse.json({ success: true, deletedId: id });
}
