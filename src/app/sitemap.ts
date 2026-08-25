import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { slugify, convocatoriaValida } from "@/lib/slug";

export const revalidate = 3600;

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://preparaoss.lat";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [convs, ents] = await Promise.all([
    prisma.opec.findMany({
      where: { creadoPorUserId: null },
      select: { numerConvocatoria: true },
      distinct: ["numerConvocatoria"],
    }),
    prisma.opec.findMany({
      where: { creadoPorUserId: null },
      select: { entidad: true },
      distinct: ["entidad"],
    }),
  ]);

  const estaticas = ["", "/convocatorias", "/entidades", "/opecs", "/registro"].map((p) => ({
    url: `${APP_URL}${p}`,
    changeFrequency: "daily" as const,
    priority: p === "" ? 1 : 0.8,
  }));

  const convUrls = convs
    .filter((c) => convocatoriaValida(c.numerConvocatoria))
    .map((c) => ({ url: `${APP_URL}/convocatorias/${slugify(c.numerConvocatoria!)}`, changeFrequency: "weekly" as const, priority: 0.7 }));

  const entUrls = ents.map((e) => ({
    url: `${APP_URL}/entidades/${slugify(e.entidad)}`,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...estaticas, ...convUrls, ...entUrls];
}
