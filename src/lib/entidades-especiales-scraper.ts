/**
 * Scraper genérico para entidades de régimen especial.
 *
 * Cada EntidadEspecial define su propia URL de API (paginada, JSON).
 * Asumimos un shape compatible con Spring Pageable:
 *   GET <apiUrl>?<pageParam>=N&<sizeParam>=M
 *   → { <itemsKey>: [...], <totalKey>: number, ... }
 *
 * El item esperado tiene:
 *   { id, cargo, codigoConvocatoria, grado, nivel, salario,
 *     costoInscripcion, numeroPlazas, totalInscritos, esActiva,
 *     sedes: [{ id, nombreSede }] }
 *
 * Cualquier campo extra se preserva en `raw` (Json) por si después lo
 * usamos.
 */

import { prisma } from "./prisma";

interface SedeOrigen {
  id: number;
  nombreSede: string;
}

interface ItemOrigen {
  id: number | string;
  cargo?: string;
  codigoConvocatoria?: string;
  grado?: string;
  nivel?: string;
  salario?: number;
  costoInscripcion?: number;
  numeroPlazas?: number;
  totalInscritos?: number;
  esActiva?: boolean;
  sedes?: SedeOrigen[];
}

const HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (compatible; PreparaOss-Scraper/1.0; +https://preparaoss.lat)",
  Accept: "application/json",
};

function buildUrl(
  base: string,
  pageParam: string,
  sizeParam: string,
  page: number,
  size: number
): string {
  const u = new URL(base);
  u.searchParams.set(pageParam, String(page));
  u.searchParams.set(sizeParam, String(size));
  return u.toString();
}

async function fetchPagina(
  apiUrl: string,
  pageParam: string,
  sizeParam: string,
  page: number,
  size: number,
  webUrl: string | null
): Promise<{ items: ItemOrigen[]; total: number | null }> {
  const url = buildUrl(apiUrl, pageParam, sizeParam, page, size);
  const res = await fetch(url, {
    headers: {
      ...HEADERS,
      Referer: webUrl ?? new URL(apiUrl).origin + "/",
    },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} en página ${page} (${url})`);
  const data = await res.json();
  return data;
}

export async function scrapeEntidadEspecial(entidadId: string): Promise<{
  total: number;
  nuevas: number;
  actualizadas: number;
  marcadasInactivas: number;
}> {
  const entidad = await prisma.entidadEspecial.findUnique({
    where: { id: entidadId },
  });
  if (!entidad) throw new Error(`Entidad ${entidadId} no encontrada`);
  if (!entidad.activo) throw new Error(`Entidad ${entidad.slug} está desactivada`);

  let nuevas = 0;
  let actualizadas = 0;
  const idsScrapeados = new Set<string>();

  // Página 0: descubrimos total
  const first = await fetchByKeys(entidad, 0);
  for (const item of first.items) {
    const r = await upsertItem(entidad.id, item);
    if (r === "new") nuevas++;
    else if (r === "updated") actualizadas++;
    idsScrapeados.add(String(item.id));
  }

  const total = first.total ?? first.items.length;
  const totalPaginas = Math.ceil(total / entidad.pageSize);

  // Páginas restantes (con throttle suave)
  for (let p = 1; p < totalPaginas; p++) {
    const res = await fetchByKeys(entidad, p);
    for (const item of res.items) {
      const r = await upsertItem(entidad.id, item);
      if (r === "new") nuevas++;
      else if (r === "updated") actualizadas++;
      idsScrapeados.add(String(item.id));
    }
    await new Promise((r) => setTimeout(r, 300));
  }

  // Marcar inactivas las que ya no aparecen (las dejamos en DB para histórico)
  let marcadasInactivas = 0;
  if (idsScrapeados.size > 0) {
    const r = await prisma.opecEspecial.updateMany({
      where: {
        entidadId: entidad.id,
        esActiva: true,
        NOT: { externalId: { in: [...idsScrapeados] } },
      },
      data: { esActiva: false },
    });
    marcadasInactivas = r.count;
  }

  await prisma.entidadEspecial.update({
    where: { id: entidad.id },
    data: { ultimoScrape: new Date() },
  });

  return { total, nuevas, actualizadas, marcadasInactivas };
}

async function fetchByKeys(
  entidad: {
    apiUrl: string;
    pageParam: string;
    sizeParam: string;
    pageSize: number;
    itemsKey: string;
    totalKey: string;
    webUrl: string | null;
  },
  page: number
): Promise<{ items: ItemOrigen[]; total: number | null }> {
  const data = (await fetchPagina(
    entidad.apiUrl,
    entidad.pageParam,
    entidad.sizeParam,
    page,
    entidad.pageSize,
    entidad.webUrl
  )) as Record<string, unknown>;

  const items = (data[entidad.itemsKey] as ItemOrigen[]) ?? [];
  const totalRaw = data[entidad.totalKey];
  const total = typeof totalRaw === "number" ? totalRaw : null;
  return { items, total };
}

async function upsertItem(
  entidadId: string,
  item: ItemOrigen
): Promise<"new" | "updated"> {
  const sedes = (item.sedes ?? []).map((s) => s.nombreSede).filter(Boolean);
  const externalId = String(item.id);

  const data = {
    cargo: item.cargo ?? "",
    codigoConvocatoria: item.codigoConvocatoria ?? "",
    grado: item.grado ?? null,
    nivel: item.nivel ?? null,
    salario: item.salario ?? null,
    costoInscripcion: item.costoInscripcion ?? null,
    numeroPlazas: item.numeroPlazas ?? 0,
    totalInscritos: item.totalInscritos ?? 0,
    esActiva: item.esActiva ?? true,
    sedes,
    raw: item as unknown as object,
    scrapedAt: new Date(),
  };

  const existing = await prisma.opecEspecial.findUnique({
    where: { entidadId_externalId: { entidadId, externalId } },
    select: { id: true },
  });
  if (existing) {
    await prisma.opecEspecial.update({
      where: { id: existing.id },
      data,
    });
    return "updated";
  }
  await prisma.opecEspecial.create({
    data: { entidadId, externalId, ...data },
  });
  return "new";
}
