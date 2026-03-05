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
import { EstadoOpec } from "@prisma/client";

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

interface SimoOpecItem {
  id: number;
  fechaInscripcion: string | null;
  empleo: {
    denominacion: { nombre: string };
    descripcion: string;
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
  };
}

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

function mapToPrisma(item: SimoOpecItem) {
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
    competencias: e.funciones.slice(0, 8).map((f) => f.descripcion.slice(0, 300)).filter(Boolean),
    tipoPruebas: pruebas,
    nivelResponsabilidad: mapNivel(e.gradoNivel.nivelNombre),
    fechaLimiteInscripcion: item.fechaInscripcion ? new Date(item.fechaInscripcion) : null,
    estado: EstadoOpec.ACTIVA,
    urlDetalle: `${SIMO_BASE}/#ofertaEmpleo`,
    scrapedAt: new Date(),
  };
}

// ─────────────────────────────────────────────────
// FETCH PÁGINA
// ─────────────────────────────────────────────────

async function fetchPage(page: number): Promise<SimoOpecItem[]> {
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
  if (!Array.isArray(data)) return [];
  return data as SimoOpecItem[];
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
        const existing = await prisma.opec.findUnique({
          where: { simoId: data.simoId },
          select: { id: true },
        });
        if (!existing) {
          await prisma.opec.create({ data });
          nuevas++;
        } else {
          await prisma.opec.update({
            where: { simoId: data.simoId },
            data: {
              nombreCargo: data.nombreCargo,
              numVacantes: data.numVacantes,
              municipio: data.municipio,
              departamento: data.departamento,
              requisitosEstudio: data.requisitosEstudio,
              requisitosExp: data.requisitosExp,
              competencias: data.competencias,
              tipoPruebas: data.tipoPruebas,
              fechaLimiteInscripcion: data.fechaLimiteInscripcion,
              urlDetalle: data.urlDetalle,
              scrapedAt: data.scrapedAt,
            },
          });
          actualizadas++;
        }
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
