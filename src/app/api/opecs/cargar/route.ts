import { NextResponse, after, type NextRequest } from "next/server";
import { randomUUID } from "crypto";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { parseDocument, cleanText } from "@/lib/document-parser";
import { OCR_CONFIG } from "@/lib/ocr-processor";
import { generarBancoCompleto } from "@/lib/ia-generator";

// El banco puede tardar más que el default; damos margen a la generación
// en segundo plano (after) tras responder.
export const maxDuration = 60;

const LIMITE_CARGAS = 3; // OPECs cargadas por usuario (anti-abuso de costo IA)

// nivelJerarquico (texto) → nivelResponsabilidad 1-5 (pool comportamental).
function mapNivel(n: string): number {
  const s = n.toLowerCase();
  if (s.includes("asist") || s.includes("auxil")) return 1;
  if (s.includes("tecn") || s.includes("técn")) return 2;
  if (s.includes("asesor")) return 4;
  if (s.includes("direct")) return 5;
  return 3; // profesional u otros
}

// POST /api/opecs/cargar — el usuario sube el manual de funciones de su cargo
// (PDF/Word/txt/imagen con OCR). Creamos una OPEC privada suya y disparamos la
// generación del banco en segundo plano; mientras, ya puede practicar los
// pools globales (transversal + comportamental).
export async function POST(req: NextRequest) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const cargas = await prisma.opec.count({ where: { creadoPorUserId: userId } });
  if (cargas >= LIMITE_CARGAS) {
    return NextResponse.json(
      { error: `Alcanzaste el límite de ${LIMITE_CARGAS} OPECs cargadas.` },
      { status: 403 }
    );
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Esperaba multipart/form-data" }, { status: 400 });
  }

  const file = formData.get("file") as File | null;
  const nombreCargo = ((formData.get("nombreCargo") as string) || "").trim();
  const entidad = ((formData.get("entidad") as string) || "").trim();
  const nivelJerarquico = ((formData.get("nivelJerarquico") as string) || "Profesional").trim();

  if (!file || !nombreCargo || !entidad) {
    return NextResponse.json(
      { error: "Faltan datos: archivo, nombre del cargo y entidad son requeridos." },
      { status: 400 }
    );
  }
  if (file.size > OCR_CONFIG.MAX_FILE_SIZE_BYTES) {
    return NextResponse.json(
      { error: `Archivo demasiado grande. Máximo ${OCR_CONFIG.MAX_FILE_SIZE_BYTES / 1024 / 1024}MB.` },
      { status: 413 }
    );
  }

  // Extraer texto (OCR de respaldo para escaneados/imágenes)
  let texto = "";
  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const r = await parseDocument(buffer, file.type);
    texto = cleanText(r.text);
  } catch (e) {
    console.error("[cargar] parse:", e);
    return NextResponse.json(
      { error: "No pudimos leer el archivo. Prueba con PDF, Word, txt o una imagen nítida." },
      { status: 400 }
    );
  }
  if (texto.length < 100) {
    return NextResponse.json(
      { error: "El documento no tiene texto suficiente. Si es una imagen, que sea legible." },
      { status: 400 }
    );
  }

  // competencias = funciones/párrafos del manual (contexto principal del prompt IA)
  const competencias = texto
    .split(/\n+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 15)
    .slice(0, 40);
  if (competencias.length === 0) competencias.push(texto.slice(0, 2000));

  const opec = await prisma.opec.create({
    data: {
      simoId: `USER-${randomUUID()}`, // único; el scraper (por simoId de SIMO) nunca lo toca
      nombreCargo,
      entidad,
      nivelJerarquico,
      grado: "",
      numVacantes: 1,
      municipio: "Nacional",
      departamento: "Nacional",
      requisitosEstudio: "Cargado por el usuario",
      requisitosExp: "Cargado por el usuario",
      competencias,
      tipoPruebas: [],
      nivelResponsabilidad: mapNivel(nivelJerarquico),
      estado: "EN_PRUEBAS",
      creadoPorUserId: userId,
    },
    select: { id: true },
  });

  // Documento con el texto completo → contexto adicional para el generador.
  await prisma.document.create({
    data: {
      opecId: opec.id,
      type: "MANUAL_FUNCIONES",
      fileName: file.name,
      fileSize: file.size,
      parsedContent: texto,
      isParsed: true,
      ocrUsed: false,
    },
  });

  // Inscribir al usuario para que la vea en su panel.
  await prisma.userOpec.create({ data: { userId, opecId: opec.id } });

  // Generar el banco específico en segundo plano (tras responder). Si se corta,
  // el cron ia-generator la recoge (getOpecssinPreguntas incluye EN_PRUEBAS).
  after(async () => {
    try {
      await generarBancoCompleto(opec.id);
    } catch (e) {
      console.error("[cargar] generación en segundo plano:", e);
    }
  });

  return NextResponse.json({ opecId: opec.id });
}
