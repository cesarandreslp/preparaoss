/**
 * scraper.ts
 * Sincroniza OPECs desde la API REST pública de SIMO (CNSC)
 *
 * Endpoint real descubierto: GET /empleos/ofertaPublica/?page=N&size=100
 * No requiere autenticación. Devuelve JSON con todas las OPECs vigentes.
 *
 * NOTA: Ejecutado por Vercel Cron Job (GET /api/cron/scraper)
 *       Diariamente a las 6 AM Colombia = 11:00 UTC
 */

import { prisma } from "./prisma";
import { EstadoOpec, DocumentType } from "@prisma/client";

const SIMO_BASE = "https://simo.cnsc.gov.co";
const PAGE_SIZE = 100;
const MAX_PAGES = 40; // Techo de seguridad (3400+ OPECs ÷ 100 = ~34 páginas)

// ─────────────────────────────────────────────────
// TIPOS API SIMO
// ─────────────────────────────────────────────────

interface SimoVacante {
  municipio: { nombre: string; departamento: { nombre: string } } | null;
  cantidad: number;
}

/**
 * Metadatos del PDF del manual de funciones que SIMO adjunta a cada empleo.
 * El PDF se descarga en:
 *   GET {SIMO_BASE}/documents/get-document?docId={version}&contentType={contentType}
 */
interface SimoDocumento {
  id: number;
  nombre: string;
  rutaArchivo: string;
  contentType: string;
  /** UUID-like que SIMO usa como docId en la URL de descarga */
  version: string;
}

export interface SimoOpecItem {
  id: number;
  fechaInscripcion: string | null;
  empleo: {
    denominacion: { nombre: string };
    descripcion: string;
    asignacionSalarial?: number;
    gradoNivel: { grado: string; nivelNombre: string };
    convocatoria: {
      nombre: string;
      codigo: string;
      agno: number;
      entidad: { nombre: string };
    };
    funciones: Array<{ descripcion: string }>;
    requisitosMinimos: Array<{ estudio: string; experiencia: string }>;
    vacantes: SimoVacante[];
    documento?: SimoDocumento | null;
  };
}

/** Construye la URL de descarga del PDF del manual desde el SIMO. */
export function buildSimoPdfUrl(doc: SimoDocumento): string {
  return `${SIMO_BASE}/documents/get-document?docId=${encodeURIComponent(
    doc.version
  )}&contentType=${encodeURIComponent(doc.contentType)}`;
}

export const SIMO_API_BASE = SIMO_BASE;
export const SIMO_PAGE_SIZE = PAGE_SIZE;

// ─────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────

function unique(arr: (string | undefined)[]): string[] {
  return [...new Set(arr.filter((x): x is string => Boolean(x)))];
}

function mapNivel(n: string): number {
  const l = n.toLowerCase();
  if (l.includes("auxiliar") || l.includes("operativo")) return 1;
  if (l.includes("técnico") || l.includes("tecnico") || l.includes("asistencial")) return 2;
  if (l.includes("profesional")) return 3;
  if (l.includes("asesor")) return 4;
  if (l.includes("directivo") || l.includes("director") || l.includes("jefe")) return 5;
  return 3;
}

export function mapToPrisma(item: SimoOpecItem) {
  const e = item.empleo;
  const req = e.requisitosMinimos[0] ?? { estudio: "", experiencia: "" };
  const municipios = unique(e.vacantes.map((v) => v.municipio?.nombre));
  const deptos = unique(e.vacantes.map((v) => v.municipio?.departamento?.nombre));
  const totalVac = e.vacantes.reduce((s, v) => s + (v.cantidad || 0), 0);
  const pruebas = ["Conocimientos específicos", "Competencias comportamentales"];
  const nivel = e.gradoNivel.nivelNombre.toLowerCase();
  if (nivel.includes("profesional") || nivel.includes("asesor") || nivel.includes("directivo")) {
    pruebas.push("Análisis de competencias funcionales");
  }

  return {
    simoId: item.id.toString(),
    numerConvocatoria: `${e.convocatoria.codigo}/${e.convocatoria.agno}`,
    nombreCargo: e.denominacion.nombre,
    entidad: e.convocatoria.entidad.nombre,
    nivelJerarquico: e.gradoNivel.nivelNombre,
    grado: e.gradoNivel.grado,
    numVacantes: Math.max(totalVac, 1),
    municipio: municipios.slice(0, 10).join(", ") || "Nacional",
    departamento: deptos.slice(0, 10).join(", ") || "Nacional",
    requisitosEstudio: req.estudio || "Ver convocatoria en SIMO CNSC",
    requisitosExp: req.experiencia || "Ver convocatoria en SIMO CNSC",
    // Texto completo de TODAS las funciones del cargo (sin truncar). Estas
    // son el equivalente textual del "manual de funciones" — el PDF tiene
    // mismo contenido con formato. Las usamos como contexto principal del
    // prompt IA cuando el OCR del PDF aún no ha corrido.
    competencias: e.funciones.map((f) => f.descripcion?.trim()).filter((s): s is string => Boolean(s && s.length > 10)),
    tipoPruebas: pruebas,
    nivelResponsabilidad: mapNivel(e.gradoNivel.nivelNombre),
    asignacionBasica: e.asignacionSalarial ?? null,
    fechaLimiteInscripcion: item.fechaInscripcion ? new Date(item.fechaInscripcion) : null,
    estado: EstadoOpec.ACTIVA,
    urlDetalle: `${SIMO_BASE}/#ofertaEmpleo`,
    scrapedAt: new Date(),
  };
}

/** Campos que se actualizan en cada scrape (excluye id/simoId/createdAt). */
function camposActualizables(data: ReturnType<typeof mapToPrisma>) {
  return {
    nombreCargo: data.nombreCargo,
    entidad: data.entidad,
    nivelJerarquico: data.nivelJerarquico,
    grado: data.grado,
    numVacantes: data.numVacantes,
    municipio: data.municipio,
    departamento: data.departamento,
    requisitosEstudio: data.requisitosEstudio,
    requisitosExp: data.requisitosExp,
    competencias: data.competencias,
    tipoPruebas: data.tipoPruebas,
    nivelResponsabilidad: data.nivelResponsabilidad,
    asignacionBasica: data.asignacionBasica,
    fechaLimiteInscripcion: data.fechaLimiteInscripcion,
    urlDetalle: data.urlDetalle,
    scrapedAt: data.scrapedAt,
  };
}

// ─────────────────────────────────────────────────
// FETCH PÁGINA
// ─────────────────────────────────────────────────

export async function fetchPage(page: number): Promise<SimoOpecItem[]> {
  const url = `${SIMO_BASE}/empleos/ofertaPublica/?page=${page}&size=${PAGE_SIZE}`;
  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
      "User-Agent": "PreparaOss-Scraper/1.0 (preparacion-concursos-cnsc)",
    },
    next: { revalidate: 0 },
  });
  if (!res.ok) throw new Error(`SIMO HTTP ${res.status} en página ${page}`);
  const data = await res.json();

  // SIMO ahora devuelve { value: [...], Count: N }. Antes era array plano.
  // Soportamos ambos por compatibilidad.
  if (Array.isArray(data)) return data as SimoOpecItem[];
  if (data && Array.isArray(data.value)) return data.value as SimoOpecItem[];
  return [];
}

// ─────────────────────────────────────────────────
// SINCRONIZAR OPECs CON LA BASE DE DATOS
// ─────────────────────────────────────────────────

export async function sincronizarOpecs(): Promise<{
  nuevas: number;
  actualizadas: number;
  errores: number;
}> {
  let nuevas = 0;
  let actualizadas = 0;
  let errores = 0;

  console.log("[Scraper] Iniciando sincronización SIMO...");

  let page = 0;

  while (page < MAX_PAGES) {
    let items: SimoOpecItem[];
    try {
      items = await fetchPage(page);
    } catch (e) {
      console.error(`[Scraper] Error descargando página ${page}:`, e);
      errores++;
      if (errores >= 3) break;
      page++;
      continue;
    }

    if (!items.length) break;

    for (const item of items) {
      try {
        const data = mapToPrisma(item);
        const result = await prisma.opec.upsert({
          where: { simoId: data.simoId },
          create: data,
          update: camposActualizables(data),
          select: { id: true, createdAt: true, updatedAt: true },
        });
        // upsert no distingue create/update; usamos timestamps para inferir
        if (result.createdAt.getTime() === result.updatedAt.getTime()) {
          nuevas++;
        } else {
          actualizadas++;
        }

        // Si SIMO adjuntó el PDF del manual de funciones, registramos/actualizamos
        // el Document como pendiente de parseo. El cron parser lo descargará y
        // OCRará después. No tocamos isParsed/parsedContent si ya estaba parseado
        // (otro scraper o admin lo cargó antes).
        await upsertManualFunciones(result.id, item.empleo.documento);
      } catch (e) {
        console.error(`[Scraper] Error procesando OPEC ${item.id}:`, e);
        errores++;
      }
    }

    page++;
    if (items.length < PAGE_SIZE) break;
    // Pausa respetuosa entre páginas
    await new Promise((r) => setTimeout(r, 300));
  }

  // Marcar como VENCIDAS las OPECs con fecha límite pasada
  await prisma.opec.updateMany({
    where: {
      estado: "ACTIVA",
      fechaLimiteInscripcion: { lt: new Date() },
    },
    data: { estado: "VENCIDA" },
  });

  console.log(
    `[Scraper] ✅ Completo: ${nuevas} nuevas, ${actualizadas} actualizadas, ${errores} errores`
  );

  return { nuevas, actualizadas, errores };
}

// ─────────────────────────────────────────────────
// OBTENER OPECs NUEVAS QUE AÚN NO TIENEN PREGUNTAS
// ─────────────────────────────────────────────────

export async function getOpecssinPreguntas(limit = 50): Promise<string[]> {
  const opecs = await prisma.opec.findMany({
    where: {
      estado: "ACTIVA",
      preguntas: { none: {} },
    },
    select: { id: true },
    take: limit,
  });

  return opecs.map((o) => o.id);
}

// ─────────────────────────────────────────────────
// DOCUMENT del manual de funciones (descubierto por scraper)
// ─────────────────────────────────────────────────

/**
 * Para una OPEC recién scrapeada, registra/actualiza el `Document` del manual
 * de funciones si SIMO lo adjuntó. No re-procesa parseo: solo registra la URL
 * de descarga y deja el archivo en estado pendiente para el cron parser.
 *
 * Idempotente — si ya existe un Document MANUAL_FUNCIONES con la misma
 * sourceUrl, no hace nada. Si la URL cambió (SIMO publicó nueva versión),
 * resetea isParsed para que se vuelva a parsear.
 */
async function upsertManualFunciones(
  opecId: string,
  documento: SimoDocumento | null | undefined
): Promise<void> {
  if (!documento || !documento.version) return;

  const sourceUrl = buildSimoPdfUrl(documento);
  const fileName = `${documento.nombre || documento.version}.pdf`;

  const existente = await prisma.document.findFirst({
    where: { opecId, type: DocumentType.MANUAL_FUNCIONES },
    select: { id: true, sourceUrl: true, isParsed: true },
  });

  if (!existente) {
    await prisma.document.create({
      data: {
        opecId,
        type: DocumentType.MANUAL_FUNCIONES,
        fileName,
        fileSize: 0, // se actualizará al descargar
        isParsed: false,
        ocrUsed: false,
        sourceUrl,
      },
    });
    return;
  }

  // Si SIMO cambió la URL (nueva versión del manual), invalidamos el parseo
  // anterior para forzar re-OCR. Si no cambió, no tocamos nada.
  if (existente.sourceUrl !== sourceUrl) {
    await prisma.document.update({
      where: { id: existente.id },
      data: {
        sourceUrl,
        fileName,
        isParsed: false,
        parsedContent: null,
        parseError: null,
        ocrUsed: false,
      },
    });
  }
}
