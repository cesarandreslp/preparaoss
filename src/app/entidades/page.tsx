import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slug";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Entidades con concurso de méritos CNSC | PreparaOSS",
  description:
    "Todas las entidades con concursos de méritos de la CNSC. Elige la tuya y practica gratis con simulacros a la medida de tu cargo.",
  alternates: { canonical: "/entidades" },
};

export default async function EntidadesIndex() {
  const grupos = await prisma.opec.groupBy({
    by: ["entidad"],
    where: { creadoPorUserId: null, estado: { in: ["ACTIVA", "EN_PRUEBAS"] } },
    _count: { _all: true },
    _sum: { numVacantes: true },
  });

  const ents = grupos
    .map((g) => ({ entidad: g.entidad, slug: slugify(g.entidad), cargos: g._count._all, vacantes: g._sum.numVacantes ?? 0 }))
    .sort((a, b) => b.vacantes - a.vacantes);

  return (
    <main className="min-h-screen noise-overlay" style={{ background: "var(--gradient-hero)" }}>
      <div className="container-app section">
        <span className="eyebrow">Concursos de méritos · CNSC</span>
        <h1 className="display-2 mt-3 max-w-3xl">
          Entidades con <span className="text-gradient-gold">concurso abierto</span>
        </h1>
        <p className="mt-4 text-lg max-w-2xl" style={{ color: "var(--text-secondary)" }}>
          Elige la entidad a la que aspiras y practica con simulacros a la medida de tu cargo.
        </p>

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ents.map((e) => (
            <Link key={e.slug} href={`/entidades/${e.slug}`} className="card h-full flex flex-col hover:scale-[1.01] transition-transform">
              <h2 className="text-base font-bold leading-snug">{e.entidad}</h2>
              <p className="text-sm mt-auto pt-3" style={{ color: "var(--text-muted)" }}>
                {e.cargos} cargos · {e.vacantes.toLocaleString("es-CO")}+ vacantes
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-12">
          <Link href="/convocatorias" className="btn-secondary">Ver por convocatoria →</Link>
        </div>
      </div>
    </main>
  );
}
