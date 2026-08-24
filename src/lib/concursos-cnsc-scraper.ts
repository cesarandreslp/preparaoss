/**
 * Scraper de concursos en desarrollo de CNSC.
 *
 * Fuente: https://www.cnsc.gov.co/convocatorias/en-desarrollo
 *
 * Estrategia: el listado oficial está en HTML estático. Extraemos los
 * <a href="/convocatorias/<slug>?field_tipo_de_contenido_convocat_target_id=65">…</a>
 * (target_id=65 es el filtro "en desarrollo" en su Drupal).
 *
 * Para cada slug guardamos: slug, nombre (texto del link), linkCnsc absoluto.
 * El upsert preserva nombreOverride/imagenCustomUrl/visible/orden si ya existían.
 */

import { prisma } from "./prisma";

const SOURCE_URL = "https://www.cnsc.gov.co/convocatorias/en-desarrollo";
const BASE_URL = "https://www.cnsc.gov.co";
const FILTER_QS = "?field_tipo_de_contenido_convocat_target_id=65";

interface Scraped {
  slug: string;
  nombre: string;
  linkCnsc: string;
}

export async function fetchConcursosEnDesarrollo(): Promise<Scraped[]> {
  const res = await fetch(SOURCE_URL, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (PreparaOss-Scraper/1.0; +https://preparaoss.vercel.app)",
      Accept: "text/html",
    },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`CNSC HTTP ${res.status}`);

  const html = await res.text();

  // Pares <a href="…convocatorias/<slug>?field_tipo_de_contenido_convocat_target_id=65"…>NOMBRE</a>
  const re = new RegExp(
    `<a\\s+href=["'](/convocatorias/[a-z0-9-]+)\\?field_tipo_de_contenido_convocat_target_id=65["'][^>]*>([^<]+)</a>`,
    "gi"
  );

  const seen = new Map<string, Scraped>();
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) {
    const path = m[1];
    const slug = path.split("/").pop()!;
    const nombre = m[2].replace(/\s+/g, " ").trim();
    if (!seen.has(slug) && nombre.length > 0) {
      seen.set(slug, {
        slug,
        nombre,
        linkCnsc: `${BASE_URL}${path}${FILTER_QS}`,
      });
    }
  }
  return [...seen.values()];
}

export async function sincronizarConcursosCNSC(): Promise<{
  total: number;
  nuevos: number;
  actualizados: number;
  ocultos: number;
  errores: number;
}> {
  let nuevos = 0;
  let actualizados = 0;
  const errores: string[] = [];

  let scraped: Scraped[];
  try {
    scraped = await fetchConcursosEnDesarrollo();
  } catch (e) {
    throw new Error(
      `Failed to fetch CNSC: ${e instanceof Error ? e.message : String(e)}`
    );
  }

  if (scraped.length === 0) {
    throw new Error("Scraper returned 0 concursos — abortando para no marcar todo como oculto");
  }

  const slugsScraped = new Set(scraped.map((s) => s.slug));

  for (const item of scraped) {
    try {
      const existing = await prisma.concursoEnDesarrollo.findUnique({
        where: { slug: item.slug },
        select: { id: true },
      });
      if (existing) {
        await prisma.concursoEnDesarrollo.update({
          where: { slug: item.slug },
          data: {
            nombreScraped: item.nombre,
            linkCnsc: item.linkCnsc,
            scrapedAt: new Date(),
          },
        });
        actualizados++;
      } else {
        await prisma.concursoEnDesarrollo.create({
          data: {
            slug: item.slug,
            nombreScraped: item.nombre,
            linkCnsc: item.linkCnsc,
            visible: true,
            orden: scraped.indexOf(item),
          },
        });
        nuevos++;
      }
    } catch (e) {
      errores.push(`${item.slug}: ${e instanceof Error ? e.message : String(e)}`);
    }
  }

  // Marcar como ocultos los que ya no aparecen en el scrape (se quedan en DB
  // por si admin quiere reactivar/recordar histórico).
  const ocultarRes = await prisma.concursoEnDesarrollo.updateMany({
    where: {
      visible: true,
      NOT: { slug: { in: [...slugsScraped] } },
    },
    data: { visible: false },
  });

  return {
    total: scraped.length,
    nuevos,
    actualizados,
    ocultos: ocultarRes.count,
    errores: errores.length,
  };
}
