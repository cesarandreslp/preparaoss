import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { slugify, convocatoriaValida } from "@/lib/slug";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Convocatorias CNSC — Simulacros de preparación | PreparaOSS",
  description:
    "Todas las convocatorias de concursos de méritos de la CNSC. Elige la tuya y practica gratis con simulacros de preguntas a la medida de tu cargo.",
  alternates: { canonical: "/convocatorias" },
};

export default async function ConvocatoriasIndex() {
  const grupos = await prisma.opec.groupBy({
    by: ["numerConvocatoria"],
    where: { creadoPorUserId: null, estado: { in: ["ACTIVA", "EN_PRUEBAS"] } },
    _count: { _all: true },
    _sum: { numVacantes: true },
  });

  const convs = grupos
    .filter((g) => convocatoriaValida(g.numerConvocatoria))
    .map((g) => ({
      num: g.numerConvocatoria!,
      slug: slugify(g.numerConvocatoria!),
      cargos: g._count._all,
      vacantes: g._sum.numVacantes ?? 0,
    }))
    .sort((a, b) => b.vacantes - a.vacantes);

  return (
    <main className="min-h-screen noise-overlay" style={{ background: "var(--gradient-hero)" }}>
      <div className="container-app section">
        <span className="eyebrow">Concursos de méritos · CNSC</span>
        <h1 className="display-2 mt-3 max-w-3xl">
          Convocatorias <span className="text-gradient-gold">abiertas y en pruebas</span>
        </h1>
        <p className="mt-4 text-lg max-w-2xl" style={{ color: "var(--text-secondary)" }}>
          Elige tu convocatoria y practica con simulacros generados a la medida de tu cargo.
          Datos sincronizados a diario con SIMO-CNSC.
        </p>

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {convs.map((c) => (
            <Link key={c.slug} href={`/convocatorias/${c.slug}`} className="card h-full flex flex-col hover:scale-[1.01] transition-transform">
              <span className="tag tag-gold self-start mb-3">Convocatoria</span>
              <h2 className="text-lg font-bold leading-snug">{c.num}</h2>
              <p className="text-sm mt-auto pt-3" style={{ color: "var(--text-muted)" }}>
                {c.cargos} cargos · {c.vacantes.toLocaleString("es-CO")}+ vacantes
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-12">
          <Link href="/entidades" className="btn-secondary">Ver por entidad →</Link>
        </div>
      </div>
    </main>
  );
}
