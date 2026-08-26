// Búsqueda de OPECs compartida por los bots (Telegram, WhatsApp).
// Devuelve datos crudos; cada canal formatea su propio mensaje.
import { prisma } from "./prisma";
import { slugify } from "./slug";

export type Cargo = { nombreCargo: string; entidad: string; municipio: string; numVacantes: number };
export type ResultadoBusqueda = { cargos: Cargo[]; entidades: string[] };

export const APP_URL = process.env.NEXT_PUBLIC_APP_URL?.startsWith("https://")
  ? process.env.NEXT_PUBLIC_APP_URL
  : "https://preparaoss.lat";

export function hubEntidad(entidad: string): string {
  return `${APP_URL}/entidades/${slugify(entidad)}`;
}

// Saludos / mensajes triviales → bienvenida instantánea (sin LLM). Así el
// primer mensaje (casi siempre un saludo) no se pierde por cold start.
const SALUDOS = new Set([
  "hola", "holi", "holis", "ola", "buenas", "hi", "hello", "hey", "ey",
  "menu", "menú", "start", "inicio", "quiubo", "que mas", "qué más",
]);
export function esSaludo(text: string): boolean {
  const low = text.trim().toLowerCase().replace(/[!¡.,]/g, "");
  if (low.length < 3) return true;
  return SALUDOS.has(low) || low.startsWith("hola") || low.startsWith("buenas") || low.startsWith("buenos");
}

export async function buscarOpecs(q: string): Promise<ResultadoBusqueda> {
  // Tokeniza: cada palabra (>=2 letras) debe aparecer en ALGÚN campo.
  // Así "auxiliar dian" cruza cargo+entidad, no exige la frase literal.
  const tokens = q.split(/\s+/).map((t) => t.trim()).filter((t) => t.length >= 2).slice(0, 5);
  const enAlgunCampo = (t: string) => ({
    OR: [
      { nombreCargo: { contains: t, mode: "insensitive" as const } },
      { entidad: { contains: t, mode: "insensitive" as const } },
      { municipio: { contains: t, mode: "insensitive" as const } },
      { numerConvocatoria: { contains: t, mode: "insensitive" as const } },
    ],
  });
  const opecs = await prisma.opec.findMany({
    where: {
      creadoPorUserId: null,
      estado: { in: ["ACTIVA", "EN_PRUEBAS"] },
      ...(tokens.length ? { AND: tokens.map(enAlgunCampo) } : {}),
    },
    select: { nombreCargo: true, entidad: true, municipio: true, numVacantes: true },
    orderBy: { numVacantes: "desc" },
    take: 8,
  });
  const entidades = [...new Set(opecs.map((o) => o.entidad))].slice(0, 4);
  return { cargos: opecs, entidades };
}
