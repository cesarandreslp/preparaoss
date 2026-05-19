import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const revalidate = 600;

export const metadata = {
  title: "Biblioteca · PreparaOSS",
  description:
    "Recursos transversales para todo funcionario público colombiano: leyes, decretos y manuales de consulta obligada.",
};

const BLOQUE_LABEL: Record<string, string> = {
  REGIMEN_SERVIDOR_PUBLICO: "Régimen del servidor público",
  DISCIPLINARIO: "Disciplinario",
  INFORMACION_ARCHIVO_TRANSPARENCIA: "Información, archivo y transparencia",
  GESTION_CONTROL: "Gestión y control",
  CONTRATACION_PRESUPUESTO_TALENTO: "Contratación, presupuesto y talento",
  ETICA_SERVICIO: "Ética y servicio",
};

const BLOQUE_ICON: Record<string, string> = {
  REGIMEN_SERVIDOR_PUBLICO: "⚖️",
  DISCIPLINARIO: "⚠️",
  INFORMACION_ARCHIVO_TRANSPARENCIA: "📋",
  GESTION_CONTROL: "📊",
  CONTRATACION_PRESUPUESTO_TALENTO: "💼",
  ETICA_SERVICIO: "🤝",
};

export default async function BibliotecaPage() {
  const recursos = await prisma.recursoBiblioteca.findMany({
    where: { vigente: true },
    orderBy: [{ bloque: "asc" }, { orden: "asc" }, { titulo: "asc" }],
  });

  // Agrupar por bloque
  const grouped = new Map<string, typeof recursos>();
  for (const r of recursos) {
    if (!grouped.has(r.bloque)) grouped.set(r.bloque, []);
    grouped.get(r.bloque)!.push(r);
  }

  const totalConPdf = recursos.filter((r) => r.pdfUrl).length;

  return (
    <main className="min-h-screen noise-overlay" style={{ background: "var(--gradient-hero)" }}>
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
          <span className="eyebrow">Biblioteca de consulta</span>
          <h1 className="display-2 mt-4">
            Lo que <span className="text-gradient-gold">todo funcionario público</span> debe saber
          </h1>
          <p className="mt-6 text-lg" style={{ color: "var(--text-secondary)" }}>
            Normas, leyes y manuales transversales a cualquier cargo del Estado colombiano.{" "}
            <strong style={{ color: "var(--text-primary)" }}>{recursos.length}</strong> documentos curados ·{" "}
            <strong style={{ color: "var(--text-primary)" }}>{totalConPdf}</strong> con PDF disponible.
          </p>
        </header>

        <div className="mt-12 space-y-12">
          {[...grouped.entries()].map(([bloque, items]) => (
            <section key={bloque}>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">{BLOQUE_ICON[bloque] ?? "📖"}</span>
                <div>
                  <span className="eyebrow">Bloque</span>
                  <h2 className="display-3 mt-1">{BLOQUE_LABEL[bloque] ?? bloque}</h2>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {items.map((r) => {
                  const Wrapper = r.pdfUrl
                    ? ({ children }: { children: React.ReactNode }) => (
                        <a
                          href={r.pdfUrl!}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="card group h-full flex flex-col cursor-pointer"
                        >
                          {children}
                        </a>
                      )
                    : ({ children }: { children: React.ReactNode }) => (
                        <div className="card h-full flex flex-col opacity-70 cursor-not-allowed">
                          {children}
                        </div>
                      );

                  return (
                    <Wrapper key={r.id}>
                      {r.numeroNorma && (
                        <span className="tag tag-gold mb-3 self-start">{r.numeroNorma}</span>
                      )}
                      <h3
                        className="font-bold leading-snug transition-colors group-hover:text-[var(--gold-300)]"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {r.titulo}
                      </h3>
                      {r.descripcion && (
                        <p
                          className="mt-2 text-sm leading-relaxed"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {r.descripcion}
                        </p>
                      )}
                      <div
                        className="mt-auto pt-4 text-xs flex items-center gap-1.5"
                        style={{ color: r.pdfUrl ? "var(--accent-500)" : "var(--text-muted)" }}
                      >
                        {r.pdfUrl ? (
                          <>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                              <path d="M14 2v4a2 2 0 002 2h4M5 4a2 2 0 012-2h7l5 5v13a2 2 0 01-2 2H7a2 2 0 01-2-2V4z" stroke="currentColor" strokeWidth="2" />
                            </svg>
                            Descargar PDF ↗
                          </>
                        ) : (
                          <>📦 PDF próximamente</>
                        )}
                      </div>
                    </Wrapper>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
