/**
 * POST /api/admin/sync-simo
 * Sincroniza OPECs desde la API pública de SIMO-CNSC hacia la DB.
 * Solo accesible por usuarios autenticados (se puede reforzar con check de rol).
 *
 * Query params:
 *   ?maxPages=5   → limitar páginas (para pruebas)
 *   ?reset=true   → borrar OPECs antes de importar
 */

import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { EstadoOpec } from "@prisma/client";

const SIMO_BASE = "https://simo.cnsc.gov.co";
const PAGE_SIZE = 100;

// ──────────────────────────────────────────────
// TIPOS SIMO
// ──────────────────────────────────────────────
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

// ──────────────────────────────────────────────
// HELPERS
// ──────────────────────────────────────────────
function mapNivel(n: string): number {
  const l = n.toLowerCase();
  if (l.includes("auxiliar") || l.includes("operativo")) return 1;
  if (l.includes("técnico") || l.includes("tecnico") || l.includes("asistencial")) return 2;
  if (l.includes("profesional")) return 3;
  if (l.includes("asesor")) return 4;
  if (l.includes("directivo") || l.includes("director") || l.includes("jefe")) return 5;
  return 3;
}

function unique(arr: (string | undefined)[]): string[] {
  return [...new Set(arr.filter((x): x is string => Boolean(x)))];
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

// ──────────────────────────────────────────────
// HANDLER
// ──────────────────────────────────────────────
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
  let updated = 0;
  let errors = 0;

  while (page < maxPages) {
    const url = `${SIMO_BASE}/empleos/ofertaPublica/?page=${page}&size=${PAGE_SIZE}`;
    let items: SimoOpecItem[];

    try {
      const res = await fetch(url, {
        headers: { Accept: "application/json" },
        next: { revalidate: 0 },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      items = (await res.json()) as SimoOpecItem[];
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
    if (items.length < PAGE_SIZE) break;
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
