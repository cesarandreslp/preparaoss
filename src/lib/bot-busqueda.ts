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

export async function buscarOpecs(q: string): Promise<ResultadoBusqueda> {
  const opecs = await prisma.opec.findMany({
    where: {
      creadoPorUserId: null,
      estado: { in: ["ACTIVA", "EN_PRUEBAS"] },
      OR: [
        { nombreCargo: { contains: q, mode: "insensitive" } },
        { entidad: { contains: q, mode: "insensitive" } },
        { numerConvocatoria: { contains: q, mode: "insensitive" } },
      ],
    },
    select: { nombreCargo: true, entidad: true, municipio: true, numVacantes: true },
    orderBy: { numVacantes: "desc" },
    take: 8,
  });
  const entidades = [...new Set(opecs.map((o) => o.entidad))].slice(0, 4);
  return { cargos: opecs, entidades };
}
