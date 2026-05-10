/**
 * POST /api/admin/documents/upload
 * Sube un documento (PDF/DOCX/TXT/imagen) asociado a una OPEC.
 * Auto-detecta PDFs escaneados y aplica OCR (Tesseract).
 * Guarda el contenido parseado en DB para que la IA lo use al generar preguntas.
 *
 * FormData:
 *   - file: archivo (PDF, DOCX, TXT, PNG, JPG, WEBP)
 *   - opecId: id de la OPEC ya existente
 *   - type: DocumentType (MANUAL_FUNCIONES | GUIA_ORIENTACION | EJES_TEMATICOS | DOCUMENTO_ENTIDAD | OTHER)
 */

import { requireAdmin } from "@/lib/require-admin";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseDocument, cleanText } from "@/lib/document-parser";
import { OCR_CONFIG } from "@/lib/ocr-processor";
import type { DocumentType } from "@prisma/client";

const VALID_TYPES: DocumentType[] = [
  "MANUAL_FUNCIONES",
  "GUIA_ORIENTACION",
  "EJES_TEMATICOS",
  "DOCUMENTO_ENTIDAD",
  "OTHER",
];

export async function POST(req: NextRequest) {
  const session = await auth();
  const guard = await requireAdmin();
  if (!guard.ok) return guard.response;
  const userId = guard.userId;

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Cuerpo inválido (esperaba multipart/form-data)" }, { status: 400 });
  }

  const file = formData.get("file") as File | null;
  const opecId = formData.get("opecId") as string | null;
  const typeRaw = formData.get("type") as string | null;

  if (!file || !opecId) {
    return NextResponse.json(
      { error: "Faltan parámetros: 'file' y 'opecId' son requeridos" },
      { status: 400 }
    );
  }

  if (file.size > OCR_CONFIG.MAX_FILE_SIZE_BYTES) {
    return NextResponse.json(
      {
        error: `Archivo demasiado grande (${Math.round(file.size / 1024 / 1024)}MB). ` +
               `Máximo permitido: ${OCR_CONFIG.MAX_FILE_SIZE_BYTES / 1024 / 1024}MB.`,
      },
      { status: 413 }
    );
  }

  const type: DocumentType = VALID_TYPES.includes(typeRaw as DocumentType)
    ? (typeRaw as DocumentType)
    : "OTHER";

  // Verificar que la OPEC exista
  const opec = await prisma.opec.findUnique({ where: { id: opecId }, select: { id: true } });
  if (!opec) {
    return NextResponse.json({ error: "OPEC no encontrada" }, { status: 404 });
  }

  // Procesar archivo en memoria (sin escribir a disco)
  const buffer = Buffer.from(await file.arrayBuffer());

  let parsedContent = "";
  let ocrUsed = false;
  let parseError: string | null = null;

  try {
    const result = await parseDocument(buffer, file.type);
    parsedContent = cleanText(result.text);
    ocrUsed = result.ocrUsed;
  } catch (e) {
    parseError = e instanceof Error ? e.message : String(e);
    console.error("[admin/documents/upload] parse failed:", parseError);

    // Errores de tamaño o formato → 400 al cliente sin guardar
    if (
      parseError.includes("OCR_FILE_TOO_LARGE") ||
      parseError.includes("Formato no soportado")
    ) {
      return NextResponse.json({ error: parseError }, { status: 400 });
    }
    // Otros errores: guardamos el documento con parseError para retry/debug posterior
  }

  const document = await prisma.document.create({
    data: {
      opecId: opec.id,
      type,
      fileName: file.name,
      fileSize: file.size,
      parsedContent: parsedContent || null,
      isParsed: parsedContent.length > 0,
      parseError,
      ocrUsed,
    },
  });

  return NextResponse.json({
    success: true,
    documentId: document.id,
    opecId: opec.id,
    fileName: document.fileName,
    isParsed: document.isParsed,
    ocrUsed: document.ocrUsed,
    parsedChars: parsedContent.length,
    parseError,
  });
}
