/**
 * GET /api/admin/documents?opecId=...
 * Lista los documentos de una OPEC (sin parsedContent, solo metadatos).
 */

import { requireAdmin } from "@/lib/require-admin";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const session = await auth();
  const guard = await requireAdmin();
  if (!guard.ok) return guard.response;
  const userId = guard.userId;

  const opecId = req.nextUrl.searchParams.get("opecId");
  if (!opecId) {
    return NextResponse.json({ error: "Falta parámetro 'opecId'" }, { status: 400 });
  }

  const documents = await prisma.document.findMany({
    where: { opecId },
    select: {
      id: true,
      type: true,
      fileName: true,
      fileSize: true,
      isParsed: true,
      ocrUsed: true,
      parseError: true,
      uploadedAt: true,
      parsedContent: false,
    },
    orderBy: { uploadedAt: "desc" },
  });

  // parsedChars se calcula con un raw query mínimo para evitar mover ~MB al cliente
  const charsRows = await prisma.$queryRaw<Array<{ id: string; chars: number }>>`
    SELECT "id", COALESCE(LENGTH("parsedContent"), 0)::int AS "chars"
    FROM "Document"
    WHERE "opecId" = ${opecId}
  `;
  const charsMap = new Map(charsRows.map((r) => [r.id, r.chars]));

  return NextResponse.json({
    documents: documents.map((d) => ({
      ...d,
      parsedChars: charsMap.get(d.id) ?? 0,
    })),
  });
}
