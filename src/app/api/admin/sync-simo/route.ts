/**
 * POST /api/admin/sync-simo
 * Sincroniza OPECs desde la API pública de SIMO-CNSC hacia la DB.
 *
 * Query params:
 *   ?maxPages=5   → limitar páginas (para pruebas)
 *   ?reset=true   → borrar OPECs antes de importar
 *
 * Delega la lógica de scraping a `lib/scraper.ts` (única fuente de verdad).
 */

import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { fetchPage, mapToPrisma, SIMO_PAGE_SIZE } from "@/lib/scraper";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const maxPages = parseInt(searchParams.get("maxPages") ?? "999", 10);
  const reset = searchParams.get("reset") === "true";

  if (reset) {
    await prisma.opec.deleteMany({});
  }

  let page = 0;
  let imported = 0;
  let errors = 0;

  while (page < maxPages) {
    let items;
    try {
      items = await fetchPage(page);
    } catch {
      errors++;
      if (errors >= 3) break;
      page++;
      continue;
    }

    if (!items.length) break;

    for (const item of items) {
      try {
        const data = mapToPrisma(item);
        await prisma.opec.upsert({
          where: { simoId: data.simoId },
          create: data,
          update: {
            nombreCargo: data.nombreCargo,
            numVacantes: data.numVacantes,
            municipio: data.municipio,
            departamento: data.departamento,
            requisitosEstudio: data.requisitosEstudio,
            requisitosExp: data.requisitosExp,
            competencias: data.competencias,
            tipoPruebas: data.tipoPruebas,
            asignacionBasica: data.asignacionBasica,
            fechaLimiteInscripcion: data.fechaLimiteInscripcion,
            scrapedAt: data.scrapedAt,
          },
        });
        imported++;
      } catch {
        errors++;
      }
    }

    page++;
    if (items.length < SIMO_PAGE_SIZE) break;
  }

  const total = await prisma.opec.count();

  return NextResponse.json({
    ok: true,
    paginasProcesadas: page,
    opecsProcesadas: imported,
    errores: errors,
    totalEnDB: total,
  });
}
