import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { requireAdmin } from "@/lib/require-admin";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const maxDuration = 60;

/**
 * POST /api/admin/biblioteca/[id]/upload
 * Sube un PDF a Vercel Blob y guarda la URL en RecursoBiblioteca.
 * Requiere env BLOB_READ_WRITE_TOKEN (Vercel Project → Storage → Blob).
 *
 * multipart/form-data con campo "file" (PDF).
 */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const guard = await requireAdmin();
  if (!guard.ok) return guard.response;

  const { id } = await params;

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      {
        error:
          "BLOB_READ_WRITE_TOKEN no configurado. Crea un Blob store en Vercel (Project → Storage) y conéctalo al proyecto, o pega la URL del PDF directamente en el campo 'pdfUrl'.",
      },
      { status: 500 }
    );
  }

  const recurso = await prisma.recursoBiblioteca.findUnique({
    where: { id },
    select: { id: true, titulo: true, numeroNorma: true },
  });
  if (!recurso) {
    return NextResponse.json({ error: "Recurso no encontrado" }, { status: 404 });
  }

  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Falta archivo 'file'" }, { status: 400 });
  }
  if (file.type !== "application/pdf") {
    return NextResponse.json(
      { error: `Solo PDFs. Recibido: ${file.type || "desconocido"}` },
      { status: 400 }
    );
  }

  const slugBase = (recurso.numeroNorma ?? recurso.titulo)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);

  const blob = await put(`biblioteca/${slugBase}-${Date.now()}.pdf`, file, {
    access: "public",
    contentType: "application/pdf",
    addRandomSuffix: false,
  });

  const updated = await prisma.recursoBiblioteca.update({
    where: { id },
    data: {
      pdfUrl: blob.url,
      pdfFileName: file.name,
      pdfSize: file.size,
    },
  });

  return NextResponse.json({ ok: true, recurso: updated });
}

/**
 * DELETE /api/admin/biblioteca/[id]/upload
 * Quita la referencia al PDF (no borra el blob, solo limpia la fila).
 */
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const guard = await requireAdmin();
  if (!guard.ok) return guard.response;
  const { id } = await params;
  await prisma.recursoBiblioteca.update({
    where: { id },
    data: { pdfUrl: null, pdfFileName: null, pdfSize: null },
  });
  return NextResponse.json({ ok: true });
}
