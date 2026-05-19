import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";

export const revalidate = 300;

export const metadata = {
  title: "Concursos en desarrollo · PreparaOSS",
  description:
    "Lista actualizada de los concursos de méritos CNSC actualmente en desarrollo. Datos sincronizados con cnsc.gov.co.",
};

export default async function ConcursosEnDesarrolloPage() {
  const concursos = await prisma.concursoEnDesarrollo.findMany({
    where: { visible: true },
    orderBy: [{ orden: "asc" }, { nombreScraped: "asc" }],
    select: {
      slug: true,
      nombreScraped: true,
      nombreOverride: true,
      linkCnsc: true,
      imagenCustomUrl: true,
      scrapedAt: true,
    },
  });

  return (
    <main
      className="min-h-screen noise-overlay"
      style={{ background: "var(--gradient-hero)" }}
    >
      <div className="container-app section">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm transition-colors"
          style={{ color: "var(--text-muted)" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          Volver al inicio
        </Link>

        <header className="mt-8 max-w-3xl">
          <span className="eyebrow">Concursos CNSC</span>
          <h1 className="display-2 mt-4">En desarrollo ahora mismo</h1>
          <p className="mt-6 text-lg" style={{ color: "var(--text-secondary)" }}>
            {concursos.length} concursos de méritos activos. Datos sincronizados con{" "}
            <a
              href="https://www.cnsc.gov.co/convocatorias/en-desarrollo"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
              style={{ color: "var(--accent-500)" }}
            >
              cnsc.gov.co
            </a>
            .
          </p>
        </header>

        {concursos.length === 0 ? (
          <div
            className="card-elevated mt-12 text-center py-16"
            style={{ borderStyle: "dashed", borderColor: "var(--border-default)" }}
          >
            <p className="text-5xl mb-3 opacity-60">🔍</p>
            <p className="font-semibold">Aún no hay concursos sincronizados</p>
            <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
              El cron diario los traerá pronto.
            </p>
          </div>
        ) : (
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {concursos.map((c) => {
              const nombre = c.nombreOverride ?? c.nombreScraped;
              const imagen = c.imagenCustomUrl ?? `/api/concurso-poster/${c.slug}`;
              return (
                <a
                  key={c.slug}
                  href={c.linkCnsc}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card group p-0 overflow-hidden flex flex-col"
                >
                  <div
                    className="relative w-full"
                    style={{ aspectRatio: "1200 / 630", background: "var(--bg-card-hover)" }}
                  >
                    <Image
                      src={imagen}
                      alt={nombre}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform group-hover:scale-105"
                      unoptimized
                    />
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <h3
                      className="text-base font-bold leading-snug"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {nombre}
                    </h3>
                    <span
                      className="mt-auto pt-3 text-xs inline-flex items-center gap-1 transition-colors group-hover:text-[var(--gold-300)]"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Ver en CNSC ↗
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        )}

        <p className="mt-12 text-xs" style={{ color: "var(--text-muted)" }}>
          Última sincronización:{" "}
          {concursos[0]?.scrapedAt
            ? new Date(concursos[0].scrapedAt).toLocaleString("es-CO")
            : "—"}
        </p>
      </div>
    </main>
  );
}
