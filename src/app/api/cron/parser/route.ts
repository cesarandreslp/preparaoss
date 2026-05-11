/**
 * GET /api/cron/parser
 *
 * Descarga y parsea los PDFs de manual de funciones que el scraper dejó
 * pendientes (Document con isParsed: false y sourceUrl != null).
 *
 * Patrón: responde 200 inmediato, sigue procesando con after() hasta los 60s
 * de Vercel. Cron-job.org externo lo dispara cada minuto para que el queue
 * de OCR avance sin pausa.
 *
 * Auth: Bearer ${CRON_SECRET}
 */

import { NextResponse } from "next/server";
import { after } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseDocument, cleanText } from "@/lib/document-parser";
import { DocumentType } from "@prisma/client";

export const maxDuration = 60;

// Batch chico para que ~3 PDFs entren en los 55s post-response. La mayoría de
// manuales son digitales (<1s parse), pero los escaneados con OCR pueden
// llegar a 10-20s c/u. Si todos son escaneados grandes, el budget guard corta.
const BATCH = 3;
const PER_DOC_TIMEOUT_MS = 35_000;
const BUDGET_MS = 50_000;

interface PendingDoc {
  id: string;
  opecId: string;
  sourceUrl: string;
  fileName: string;
}

async function descargarPdf(url: string): Promise<Buffer> {
  const res = await fetch(url, {
    headers: {
      Accept: "application/pdf,*/*",
      "User-Agent": "PreparaOss-Parser/1.0",
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} descargando ${url}`);
  const ab = await res.arrayBuffer();
  return Buffer.from(ab);
}

function withTimeout<T>(p: Promise<T>, ms: number, label: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const t = setTimeout(() => reject(new Error(`Timeout: ${label} > ${ms}ms`)), ms);
    p.then((v) => { clearTimeout(t); resolve(v); }, (e) => { clearTimeout(t); reject(e); });
  });
}

async function procesarDocumento(doc: PendingDoc): Promise<{ ok: boolean; error?: string }> {
  try {
    const buffer = await withTimeout(
      descargarPdf(doc.sourceUrl),
      15_000,
      `download ${doc.id}`
    );

    const parsed = await withTimeout(
      parseDocument(buffer, "application/pdf"),
      PER_DOC_TIMEOUT_MS - 15_000,
      `parse ${doc.id}`
    );

    await prisma.document.update({
      where: { id: doc.id },
      data: {
        parsedContent: cleanText(parsed.text) || null,
        isParsed: parsed.text.length > 0,
        ocrUsed: parsed.ocrUsed,
        fileSize: buffer.length,
        parseError: null,
      },
    });

    console.log(`[Cron/Parser] ✅ ${doc.fileName} (${parsed.text.length} chars, ocr=${parsed.ocrUsed})`);
    return { ok: true };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error(`[Cron/Parser] ❌ ${doc.fileName}:`, msg);

    await prisma.document.update({
      where: { id: doc.id },
      data: { parseError: msg.slice(0, 500) },
    }).catch(() => {});

    return { ok: false, error: msg };
  }
}

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  // Filtro de prioridad: docs cuya OPEC esté ACTIVA y SIN preguntas
  // generadas. Eso desbloquea OPECs candidatas a IA antes que perder tiempo
  // parseando manuales de OPECs que ya tienen banco.
  const filtroPrioritario = {
    isParsed: false,
    sourceUrl: { not: null },
    type: DocumentType.MANUAL_FUNCIONES,
    parseError: null,
    opec: {
      estado: "ACTIVA" as const,
      preguntas: { none: {} },
    },
  };

  // Filtro fallback: cuando ya no quedan prioritarios, parseamos el resto
  // (docs de OPECs vencidas o que ya tienen preguntas). Sirve para tener el
  // contenido del manual disponible aunque no sirva para IA inmediatamente.
  const filtroResto = {
    isParsed: false,
    sourceUrl: { not: null },
    type: DocumentType.MANUAL_FUNCIONES,
    parseError: null,
  };

  const [pendientesPrioritarios, pendientesTotal] = await Promise.all([
    prisma.document.count({ where: filtroPrioritario }),
    prisma.document.count({ where: filtroResto }),
  ]);

  if (pendientesTotal === 0) {
    return NextResponse.json({ ok: true, mensaje: "Sin documentos pendientes", pendientes: 0 });
  }

  const where = pendientesPrioritarios > 0 ? filtroPrioritario : filtroResto;

  const lote = await prisma.document.findMany({
    where,
    select: { id: true, opecId: true, sourceUrl: true, fileName: true },
    take: BATCH,
    orderBy: { uploadedAt: "asc" },
  });

  // El tipo de sourceUrl es String? — para after() necesitamos un PendingDoc
  // con sourceUrl: string. Filtramos defensivamente (la query ya lo asegura).
  const trabajos: PendingDoc[] = lote
    .filter((d): d is PendingDoc => typeof d.sourceUrl === "string")
    .map((d) => ({ id: d.id, opecId: d.opecId, sourceUrl: d.sourceUrl, fileName: d.fileName }));

  after(async () => {
    const startedAt = Date.now();
    let ok = 0;
    let errores = 0;

    for (const doc of trabajos) {
      if (Date.now() - startedAt > BUDGET_MS) {
        console.warn("[Cron/Parser] Budget 50s agotado, terminando lote");
        break;
      }
      const r = await procesarDocumento(doc);
      if (r.ok) ok++;
      else errores++;
    }

    console.log(`[Cron/Parser] Lote: ${ok} parseados, ${errores} con error, ${trabajos.length - ok - errores} sin procesar`);
  });

  return NextResponse.json({
    ok: true,
    pendientesPrioritarios,
    pendientesTotal,
    started: trabajos.length,
    fase: pendientesPrioritarios > 0 ? "prioritaria" : "resto",
    note: "Parseo lanzado en background. Revisa logs en Vercel.",
  });
}
