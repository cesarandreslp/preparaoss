import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const revalidate = 600;

export const metadata = {
  title: "Concursos · Régimen especial",
  description:
    "Concursos de méritos de entidades de régimen especial: Procuraduría, Banco de la República y otras fuera de SIMO/CNSC.",
};

export default async function ConcursosEspecialesIndex() {
  const entidades = await prisma.entidadEspecial.findMany({
    where: { activo: true },
    orderBy: { nombre: "asc" },
    include: { _count: { select: { opecs: { where: { esActiva: true } } } } },
  });

  return (
    <main className="min-h-screen noise-overlay" style={{ background: "var(--gradient-hero)" }}>
      <div className="container-app section">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm transition-colors" style={{ color: "var(--text-muted)" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          Volver al inicio
        </Link>

        <header className="mt-8 max-w-3xl">
          <span className="eyebrow">Régimen especial</span>
          <h1 className="display-2 mt-4">
            Concursos <span className="text-gradient-gold">fuera de SIMO/CNSC</span>
          </h1>
          <p className="mt-6 text-lg" style={{ color: "var(--text-secondary)" }}>
            Entidades con concurso autónomo: Procuraduría, Banco de la República, otras a venir.
          </p>
        </header>

        {entidades.length === 0 ? (
          <div className="card-elevated mt-12 text-center py-16" style={{ borderStyle: "dashed", borderColor: "var(--border-default)" }}>
            <p className="text-5xl mb-3 opacity-60">🏛️</p>
            <p className="font-semibold">Aún no hay entidades cargadas</p>
            <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
              El admin puede añadirlas desde el panel.
            </p>
          </div>
        ) : (
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {entidades.map((e) => (
              <Link key={e.id} href={`/concursos-especiales/${e.slug}`} className="card group">
                <span className="tag tag-blue self-start">{e._count.opecs} convocatorias activas</span>
                <h3 className="mt-4 text-xl font-bold leading-snug transition-colors group-hover:text-[var(--gold-300)]" style={{ fontFamily: "var(--font-display)" }}>
                  {e.nombre}
                </h3>
                {e.descripcion && (
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {e.descripcion}
                  </p>
                )}
                <div className="mt-6 pt-4 text-xs flex items-center gap-1.5" style={{ color: "var(--accent-500)", borderTop: "1px solid var(--border-subtle)" }}>
                  Ver convocatorias →
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
