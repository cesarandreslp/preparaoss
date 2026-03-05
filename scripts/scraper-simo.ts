/**
 * ============================================================
 * SCRAPER SIMO - CNSC
 * ============================================================
 * Sincroniza las OPECs públicas del sistema SIMO de la CNSC
 * con la base de datos de PreparaOss.
 *
 * Fuente: https://simo.cnsc.gov.co/empleos/ofertaPublica/?page=N&size=100
 * (API REST pública, no requiere autenticación)
 *
 * Uso:
 *   npm run scraper          → modo normal
 *   npm run scraper -- --max-pages 5  → solo primeras 5 páginas (test)
 *   npm run scraper -- --reset        → borra OPECs antes de importar
 * ============================================================
 */

import { PrismaClient, EstadoOpec } from "@prisma/client";

const prisma = new PrismaClient();

// ──────────────────────────────────────────────
// TIPOS SIMO API
// ──────────────────────────────────────────────

interface SimoMunicipio {
  id: number;
  nombre: string;
  departamento: { nombre: string };
}

interface SimoVacante {
  id: number;
  municipio: SimoMunicipio | null;
  cantidad: number;
  cantidadAscensos: number | null;
  disponible: number;
}

interface SimoRequisito {
  estudio: string;
  experiencia: string;
  otros: string;
}

interface SimoFuncion {
  id: number;
  descripcion: string;
}

interface SimoConvocatoria {
  id: number;
  nombre: string;
  codigo: string;
  agno: number;
  entidad: {
    id: number;
    nit: string;
    nombre: string;
    tipoEntidad: { id: number; nombre: string };
  };
  tipoProceso: string;
}

interface SimoEmpleo {
  id: number;
  createdDate: string;
  asignacionSalarial: number;
  codigoEmpleo: string;
  denominacion: { id: number; nombre: string };
  descripcion: string;
  concursoAscenso: boolean;
  gradoNivel: { grado: string; nivelNombre: string };
  gradoDenominacion: { grado: string };
  convocatoria: SimoConvocatoria;
  funciones: SimoFuncion[];
  requisitosMinimos: SimoRequisito[];
  vacantes: SimoVacante[];
  vigenciaSalarial: number;
  identificador: number; // ID interno entidad
}

interface SimoOpecItem {
  id: number;
  empleo: SimoEmpleo;
  estadoInscripcion: string | null;
  favorito: boolean;
  inscripcionId: number | null;
  fechaInscripcion: string | null; // "YYYY-MM-DD" — cierre inscripciones
  nivelNombre: string;
  access: unknown;
}

// ──────────────────────────────────────────────
// HELPERS
// ──────────────────────────────────────────────

const SIMO_BASE = "https://simo.cnsc.gov.co";
const PAGE_SIZE = 100;
const DELAY_MS = 500; // pausa entre páginas (ser un buen ciudadano)

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

/** Niveles CNSC → nivel de responsabilidad 1-5 */
function mapNivel(nivelNombre: string): number {
  const n = nivelNombre.toLowerCase();
  if (n.includes("auxiliar") || n.includes("operativo")) return 1;
  if (n.includes("técnico") || n.includes("tecnico") || n.includes("asistencial")) return 2;
  if (n.includes("profesional")) return 3;
  if (n.includes("asesor")) return 4;
  if (n.includes("directivo") || n.includes("director") || n.includes("gerente") || n.includes("jefe")) return 5;
  return 3; // default profesional
}

/** Extrae municipios únicos de las vacantes */
function extractMunicipios(vacantes: SimoVacante[]): string {
  const nombres = [
    ...new Set(
      vacantes
        .map((v) => v.municipio?.nombre)
        .filter((n): n is string => Boolean(n))
    ),
  ];
  return nombres.slice(0, 10).join(", ") || "Nacional";
}

/** Extrae departamentos únicos de las vacantes */
function extractDepartamentos(vacantes: SimoVacante[]): string {
  const nombres = [
    ...new Set(
      vacantes
        .map((v) => v.municipio?.departamento?.nombre)
        .filter((n): n is string => Boolean(n))
    ),
  ];
  return nombres.slice(0, 10).join(", ") || "Nacional";
}

/** Total de vacantes sumando campo "cantidad" */
function totalVacantes(vacantes: SimoVacante[]): number {
  return vacantes.reduce((sum, v) => sum + (v.cantidad || 0), 0);
}

/** Competencias: se extraen de las funciones del cargo */
function extractCompetencias(empleo: SimoEmpleo): string[] {
  // Las funciones del cargo son el proxy más cercano a competencias en la API pública
  return empleo.funciones
    .slice(0, 8)
    .map((f) => f.descripcion.slice(0, 300))
    .filter(Boolean);
}

/** Tipo de pruebas según nivel jerárquico y tipo de proceso */
function extractTipoPruebas(empleo: SimoEmpleo): string[] {
  const pruebas = ["Conocimientos específicos", "Competencias comportamentales"];
  const nivel = empleo.gradoNivel.nivelNombre.toLowerCase();
  if (nivel.includes("profesional") || nivel.includes("asesor") || nivel.includes("directivo")) {
    pruebas.push("Análisis de competencias funcionales");
  }
  return pruebas;
}

/** Construye URL de detalle del empleo en SIMO */
function buildUrlDetalle(opecId: number): string {
  return `${SIMO_BASE}/#ofertaEmpleo`;
}

/** Convierte un item SIMO al formato Prisma Opec */
function mapToPrisma(item: SimoOpecItem) {
  const { empleo } = item;
  const req = empleo.requisitosMinimos[0] || { estudio: "", experiencia: "", otros: "" };

  return {
    simoId: item.id.toString(),
    numerConvocatoria: `${empleo.convocatoria.codigo}/${empleo.convocatoria.agno}`,
    nombreCargo: empleo.denominacion.nombre,
    entidad: empleo.convocatoria.entidad.nombre,
    nivelJerarquico: empleo.gradoNivel.nivelNombre,
    grado: empleo.gradoNivel.grado,
    numVacantes: Math.max(totalVacantes(empleo.vacantes), 1),
    municipio: extractMunicipios(empleo.vacantes),
    departamento: extractDepartamentos(empleo.vacantes),
    requisitosEstudio: req.estudio || "Ver convocatoria en SIMO CNSC",
    requisitosExp: req.experiencia || "Ver convocatoria en SIMO CNSC",
    competencias: extractCompetencias(empleo),
    tipoPruebas: extractTipoPruebas(empleo),
    nivelResponsabilidad: mapNivel(empleo.gradoNivel.nivelNombre),
    fechaLimiteInscripcion: item.fechaInscripcion
      ? new Date(item.fechaInscripcion)
      : null,
    fechaExamen: null, // No disponible en la API pública de SIMO
    estado: EstadoOpec.ACTIVA,
    urlDetalle: buildUrlDetalle(item.id),
    scrapedAt: new Date(),
  };
}

// ──────────────────────────────────────────────
// FETCH DE LA API SIMO
// ──────────────────────────────────────────────

async function fetchPage(page: number, size: number): Promise<SimoOpecItem[]> {
  const url = `${SIMO_BASE}/empleos/ofertaPublica/?page=${page}&size=${size}`;
  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
      "User-Agent":
        "PreparaOss-Scraper/1.0 (preparacion-concursos-cnsc; contacto@preparaoss.co)",
    },
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status} en página ${page}: ${url}`);
  }

  const data = await res.json();
  if (!Array.isArray(data)) {
    throw new Error(`Respuesta inesperada en página ${page}: ${JSON.stringify(data).slice(0, 200)}`);
  }
  return data as SimoOpecItem[];
}

// ──────────────────────────────────────────────
// MAIN
// ──────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  const maxPagesArg = args.indexOf("--max-pages");
  const maxPages = maxPagesArg >= 0 ? parseInt(args[maxPagesArg + 1], 10) : Infinity;
  const resetMode = args.includes("--reset");

  console.log("╔════════════════════════════════════════╗");
  console.log("║   SCRAPER SIMO-CNSC → PreparaOss DB   ║");
  console.log("╚════════════════════════════════════════╝");
  console.log(`Modo: ${resetMode ? "RESET + importar" : "Upsert (incremental)"}`);
  console.log(`Páginas máximas: ${maxPages === Infinity ? "todas" : maxPages}`);
  console.log(`Tamaño de página: ${PAGE_SIZE}`);
  console.log("");

  if (resetMode) {
    console.log("⚠️  Eliminando OPECs existentes...");
    await prisma.opec.deleteMany({});
    console.log("✅ OPECs eliminadas\n");
  }

  let page = 0;
  let totalImported = 0;
  let totalUpdated = 0;
  let totalErrors = 0;
  let totalSkipped = 0;

  while (page < maxPages) {
    process.stdout.write(`[Página ${page + 1}] Descargando... `);
    let items: SimoOpecItem[];

    try {
      items = await fetchPage(page, PAGE_SIZE);
    } catch (err) {
      console.error(`\n❌ Error descargando página ${page}: ${err}`);
      totalErrors++;
      if (totalErrors >= 3) {
        console.error("Demasiados errores consecutivos, abortando.");
        break;
      }
      await sleep(2000);
      continue;
    }

    if (items.length === 0) {
      console.log("✅ Sin más resultados, sincronización completada.");
      break;
    }

    process.stdout.write(`${items.length} OPECs → Guardando en DB...\n`);

    // Upsert en lotes de 10 para no saturar la DB
    for (const item of items) {
      try {
        const data = mapToPrisma(item);
        const result = await prisma.opec.upsert({
          where: { simoId: data.simoId },
          create: data,
          update: {
            // Actualizar solo campos que pueden cambiar
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
        // Determinar si fue creado o actualizado
        if (result.scrapedAt.getTime() === result.createdAt.getTime()) {
          totalImported++;
        } else {
          totalUpdated++;
        }
      } catch (err) {
        console.error(`  ⚠️ Error procesando OPEC ${item.id}: ${err}`);
        totalSkipped++;
      }
    }

    console.log(
      `    ✅ Página ${page + 1} procesada (+${items.length} | creadas: ${totalImported} actualizadas: ${totalUpdated} errores: ${totalSkipped})`
    );

    page++;

    // Si la página estaba llena, hay más páginas
    if (items.length < PAGE_SIZE) {
      console.log("📄 Última página alcanzada.");
      break;
    }

    // Pausa respetuosa entre peticiones
    await sleep(DELAY_MS);
  }

  // Resumen final
  console.log("\n╔════════════════════════════════════════╗");
  console.log("║              RESUMEN FINAL             ║");
  console.log("╚════════════════════════════════════════╝");
  console.log(`  📥 Nuevas OPECs importadas:  ${totalImported}`);
  console.log(`  🔄 OPECs actualizadas:        ${totalUpdated}`);
  console.log(`  ⚠️  Errores individuales:     ${totalSkipped}`);
  console.log(`  📄 Páginas procesadas:         ${page}`);
  const total = await prisma.opec.count();
  console.log(`  🗄️  Total en DB ahora:         ${total}`);
  console.log("");
}

main()
  .catch((e) => {
    console.error("❌ Error fatal:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
