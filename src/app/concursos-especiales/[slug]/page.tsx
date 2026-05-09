import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export const revalidate = 600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ent = await prisma.entidadEspecial.findUnique({ where: { slug } });
  return {
    title: ent ? `${ent.nombre} · Concursos` : "Entidad no encontrada",
    description: ent?.descripcion ?? "",
  };
}

function fmtCop(n: number | null) {
  if (n == null) return "—";
  return n.toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  });
}

export default async function EntidadEspecialPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entidad = await prisma.entidadEspecial.findUnique({
    where: { slug },
    include: {
      opecs: {
        where: { esActiva: true },
        orderBy: [{ numeroPlazas: "desc" }, { codigoConvocatoria: "asc" }],
      },
    },
  });
  if (!entidad || !entidad.activo) notFound();

  const totalPlazas = entidad.opecs.reduce((s, o) => s + (o.numeroPlazas ?? 0), 0);
  const totalInscritos = entidad.opecs.reduce((s, o) => s + (o.totalInscritos ?? 0), 0);

  return (
    <main className="min-h-screen noise-overlay" style={{ background: "var(--gradient-hero)" }}>
      <div className="container-app section">
        <Link
          href="/concursos-especiales"
          className="inline-flex items-center gap-1.5 text-sm transition-colors"
          style={{ color: "var(--text-muted)" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          Régimen especial
        </Link>

        <header className="mt-6 max-w-3xl">
          <span className="eyebrow">Régimen especial</span>
          <h1 className="display-2 mt-4">{entidad.nombre}</h1>
          {entidad.descripcion && (
            <p className="mt-6 text-lg" style={{ color: "var(--text-secondary)" }}>
              {entidad.descripcion}
            </p>
          )}
          {entidad.webUrl && (
            <a
              href={entidad.webUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-sm transition-colors"
              style={{ color: "var(--accent-500)" }}
            >
              Página oficial ↗
            </a>
          )}
        </header>

        <div className="mt-10 grid grid-cols-3 gap-3">
          {[
            { v: entidad.opecs.length, label: "Convocatorias" },
            { v: totalPlazas, label: "Plazas totales" },
            { v: totalInscritos, label: "Inscritos" },
          ].map((s) => (
            <div key={s.label} className="card text-center p-5">
              <p className="text-3xl font-extrabold text-gradient-gold" style={{ fontFamily: "var(--font-display)" }}>
                {s.v.toLocaleString("es-CO")}
              </p>
              <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>

        <section className="mt-12">
          <span className="eyebrow">Convocatorias activas</span>
          <h2 className="display-3 mt-2 mb-6">
            {entidad.opecs.length} convocatorias en desarrollo
          </h2>

          {entidad.opecs.length === 0 ? (
            <div className="card-elevated text-center py-12" style={{ borderStyle: "dashed", borderColor: "var(--border-default)" }}>
              <p className="text-5xl mb-3 opacity-60">⏳</p>
              <p className="font-semibold">Sin convocatorias activas</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {entidad.opecs.map((o) => (
                <article key={o.id} className="card flex flex-col">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex flex-wrap gap-2">
                      <span className="tag tag-gold">#{o.codigoConvocatoria}</span>
                      {o.nivel && <span className="tag tag-blue">{o.nivel}</span>}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold leading-snug" style={{ fontFamily: "var(--font-display)" }}>
                    {o.cargo} {o.grado && <span style={{ color: "var(--text-muted)", fontWeight: 500 }}>· {o.grado}</span>}
                  </h3>

                  <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                    <div>
                      <dt className="text-[11px] uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Asignación</dt>
                      <dd className="font-semibold" style={{ color: "var(--success)" }}>{fmtCop(o.salario)}</dd>
                    </div>
                    <div>
                      <dt className="text-[11px] uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Plazas</dt>
                      <dd className="font-semibold">{o.numeroPlazas}</dd>
                    </div>
                    <div>
                      <dt className="text-[11px] uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Inscritos</dt>
                      <dd className="font-semibold">{o.totalInscritos}</dd>
                    </div>
                    <div>
                      <dt className="text-[11px] uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Inscripción</dt>
                      <dd className="font-semibold">{fmtCop(o.costoInscripcion)}</dd>
                    </div>
                  </dl>

                  {o.sedes.length > 0 && (
                    <div className="mt-4 pt-4 border-t" style={{ borderColor: "var(--border-subtle)" }}>
                      <p className="text-[11px] uppercase tracking-wider mb-2" style={{ color: "var(--text-muted)" }}>
                        Sedes ({o.sedes.length})
                      </p>
                      <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                        {o.sedes.slice(0, 6).join(" · ")}
                        {o.sedes.length > 6 && (
                          <span style={{ color: "var(--accent-500)" }}> +{o.sedes.length - 6} más</span>
                        )}
                      </p>
                    </div>
                  )}

                  {o.pdfUrl && (
                    <a
                      href={o.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 btn-primary text-sm"
                    >
                      📄 Ver convocatoria
                    </a>
                  )}
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
