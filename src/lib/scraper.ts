/**
 * scraper.ts
 * Scraper del portal SIMO (CNSC) — https://simo.cnsc.gov.co/#ofertaEmpleo
 *
 * ESTRATEGIA:
 * 1. Intentar consumir la API REST/GraphQL interna del portal Angular (más estable)
 * 2. Si falla, usar fetch directo a los endpoints descubiertos vía DevTools Network tab
 *
 * NOTA: Ejecutar desde Vercel Cron Job (GET /api/cron/scraper)
 *       Una vez al día a las 6AM Colombia (UTC-5 = 11:00 UTC)
 */

import { prisma } from "./prisma";

const SIMO_BASE = "https://simo.cnsc.gov.co";
const SIMO_API = `${SIMO_BASE}/api`; // Ajustar según endpoints reales descubiertos

// Headers que simula un navegador real para evitar bloqueos
const HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/121 Safari/537.36",
  Accept: "application/json, text/plain, */*",
  "Accept-Language": "es-CO,es;q=0.9",
  Referer: `${SIMO_BASE}/`,
  Origin: SIMO_BASE,
};

// ─────────────────────────────────────────────────
// TIPOS DE RESPUESTA DE LA API SIMO
// (Ajustar según los endpoints reales del portal)
// ─────────────────────────────────────────────────

interface SimoOpecRaw {
  id: string;
  numerConvocatoria?: string;
  nombreCargo: string;
  entidad: string;
  nivelJerarquico: string;
  grado: string;
  numVacantes: number;
  municipio: string;
  departamento: string;
  requisitosEstudio: string;
  requisitosExp: string;
  competencias: string[];
  tipoPruebas: string[];
  nivelResponsabilidad?: number;
  fechaLimiteInscripcion?: string;
  fechaExamen?: string;
  urlDetalle?: string;
}

// ─────────────────────────────────────────────────
// OBTENER LISTA DE OPECs ACTIVAS
// ─────────────────────────────────────────────────

async function fetchOpecs(pagina: number = 1, porPagina: number = 50): Promise<SimoOpecRaw[]> {
  // IMPORTANTE: Estos endpoints son ejemplos. Debes inspeccionar el Network tab de
  // https://simo.cnsc.gov.co/#ofertaEmpleo con Chrome DevTools (pestaña Fetch/XHR)
  // para encontrar los endpoints reales del portal Angular.
  //
  // Endpoints comunes en portales Angular de entidades públicas colombianas:
  // - /api/ofertaempleo?page=1&size=50&estado=ACTIVA
  // - /api/convocatorias/vigentes
  // - /opec/list?status=open

  const url = `${SIMO_API}/ofertaempleo?page=${pagina}&size=${porPagina}&estado=ACTIVA`;

  const res = await fetch(url, { headers: HEADERS, next: { revalidate: 0 } });

  if (!res.ok) {
    throw new Error(`[Scraper] SIMO API error: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();

  // AJUSTAR según estructura real de la respuesta
  return data.content ?? data.data ?? data.results ?? data ?? [];
}

// ─────────────────────────────────────────────────
// OBTENER DETALLE DE UNA OPEC
// ─────────────────────────────────────────────────

async function fetchDetalleOpec(simoId: string): Promise<Partial<SimoOpecRaw>> {
  const url = `${SIMO_API}/ofertaempleo/${simoId}`;
  const res = await fetch(url, { headers: HEADERS, next: { revalidate: 0 } });

  if (!res.ok) return {};

  return await res.json();
}

// ─────────────────────────────────────────────────
// MAPEAR NIVEL JERÁRQUICO → NIVEL DE RESPONSABILIDAD
// ─────────────────────────────────────────────────

function mapearNivelResponsabilidad(nivelJerarquico: string): number {
  const nivel = nivelJerarquico.toLowerCase();
  if (nivel.includes("auxiliar") || nivel.includes("operativo")) return 1;
  if (nivel.includes("técnico") || nivel.includes("asistencial")) return 2;
  if (nivel.includes("profesional")) return 3;
  if (nivel.includes("asesor") || nivel.includes("ejecutivo")) return 4;
  if (nivel.includes("directivo") || nivel.includes("gerente") || nivel.includes("director")) return 5;
  return 3; // Default: Profesional
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

  try {
    console.log("[Scraper] Iniciando sincronización SIMO...");

    let pagina = 1;
    let hayMas = true;

    while (hayMas) {
      const opecs = await fetchOpecs(pagina, 50);

      if (!opecs || opecs.length === 0) {
        hayMas = false;
        break;
      }

      for (const raw of opecs) {
        try {
          // Verificar si ya existe
          const existe = await prisma.opec.findUnique({
            where: { simoId: raw.id },
            select: { id: true, updatedAt: true },
          });

          const data = {
            simoId: raw.id,
            numerConvocatoria: raw.numerConvocatoria ?? null,
            nombreCargo: raw.nombreCargo,
            entidad: raw.entidad,
            nivelJerarquico: raw.nivelJerarquico,
            grado: raw.grado ?? "N/A",
            numVacantes: raw.numVacantes ?? 1,
            municipio: raw.municipio,
            departamento: raw.departamento,
            requisitosEstudio: raw.requisitosEstudio ?? "",
            requisitosExp: raw.requisitosExp ?? "",
            competencias: raw.competencias ?? [],
            tipoPruebas: raw.tipoPruebas ?? [],
            nivelResponsabilidad: raw.nivelResponsabilidad ?? mapearNivelResponsabilidad(raw.nivelJerarquico),
            fechaLimiteInscripcion: raw.fechaLimiteInscripcion ? new Date(raw.fechaLimiteInscripcion) : null,
            fechaExamen: raw.fechaExamen ? new Date(raw.fechaExamen) : null,
            urlDetalle: raw.urlDetalle ?? `${SIMO_BASE}/#ofertaEmpleo/${raw.id}`,
            scrapedAt: new Date(),
            estado: "ACTIVA" as const,
          };

          if (!existe) {
            await prisma.opec.create({ data });
            nuevas++;
          } else {
            await prisma.opec.update({ where: { simoId: raw.id }, data });
            actualizadas++;
          }
        } catch (e) {
          console.error(`[Scraper] Error procesando OPEC ${raw.id}:`, e);
          errores++;
        }
      }

      // Si devolvió menos de 50, no hay más páginas
      if (opecs.length < 50) {
        hayMas = false;
      } else {
        pagina++;
        // Pausa para no saturar el servidor de la CNSC
        await new Promise((r) => setTimeout(r, 500));
      }
    }

    // Marcar como VENCIDAS las OPECs con fecha límite pasada
    await prisma.opec.updateMany({
      where: {
        estado: "ACTIVA",
        fechaLimiteInscripcion: { lt: new Date() },
      },
      data: { estado: "VENCIDA" },
    });

    console.log(`[Scraper] ✅ Sincronización completa: ${nuevas} nuevas, ${actualizadas} actualizadas, ${errores} errores`);
  } catch (error) {
    console.error("[Scraper] ❌ Error en sincronización:", error);
    throw error;
  }

  return { nuevas, actualizadas, errores };
}

// ─────────────────────────────────────────────────
// OBTENER OPECs NUEVAS QUE AÚN NO TIENEN PREGUNTAS
// ─────────────────────────────────────────────────

export async function getOpecssinPreguntas(): Promise<string[]> {
  const opecs = await prisma.opec.findMany({
    where: {
      estado: "ACTIVA",
      preguntas: { none: {} },
    },
    select: { id: true },
    take: 10, // Procesar de a 10 para no superar timeout de Vercel
  });

  return opecs.map((o) => o.id);
}
