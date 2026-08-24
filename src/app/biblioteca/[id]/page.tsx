import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

const BLOQUE_LABEL: Record<string, string> = {
  REGIMEN_SERVIDOR_PUBLICO: "Régimen del servidor público",
  DISCIPLINARIO: "Disciplinario",
  INFORMACION_ARCHIVO_TRANSPARENCIA: "Información, archivo y transparencia",
  GESTION_CONTROL: "Gestión y control",
  CONTRATACION_PRESUPUESTO_TALENTO: "Contratación, presupuesto y talento",
  ETICA_SERVICIO: "Ética y servicio",
};

// Lectura dentro de la app: el PDF se sirve desde nuestro dominio de Pages y
// se muestra embebido, para no sacar al aspirante a un sitio de terceros.
export default async function RecursoBibliotecaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const r = await prisma.recursoBiblioteca.findUnique({ where: { id } });
  if (!r || !r.vigente) notFound();

  return (
    <main className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <div className="max-w-5xl mx-auto px-4 py-6 space-y-4">
        <Link href="/biblioteca" className="text-sm" style={{ color: "var(--text-muted)" }}>
          ← Biblioteca
        </Link>

        <div className="flex items-end justify-between flex-wrap gap-3">
          <div className="min-w-0">
            <p className="eyebrow">{BLOQUE_LABEL[r.bloque] ?? r.bloque}</p>
            {r.numeroNorma && <span className="tag tag-gold mt-2 inline-block">{r.numeroNorma}</span>}
            <h1
              className="text-2xl font-bold mt-2"
              style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
            >
              {r.titulo}
            </h1>
          </div>

          {r.pdfUrl && (
            <a href={r.pdfUrl} download className="btn-secondary text-sm">
              Descargar ↓
            </a>
          )}
        </div>

        {r.descripcion && (
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            {r.descripcion}
          </p>
        )}

        {r.pdfUrl ? (
          <iframe
            src={r.pdfUrl}
            title={r.titulo}
            className="w-full rounded-xl"
            style={{ height: "80vh", border: "1px solid var(--border-default)", background: "#fff" }}
          />
        ) : (
          <div
            className="rounded-xl p-6 text-sm"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)", color: "var(--text-secondary)" }}
          >
            Este documento aún no está publicado.{" "}
            {r.fuenteUrl && (
              <a href={r.fuenteUrl} target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent-500)" }}>
                Consúltalo en la fuente oficial ↗
              </a>
            )}
          </div>
        )}

        {/* El PDF es una copia: si la norma se reforma, el texto vigente está
            en la fuente oficial. */}
        {r.fuenteUrl && (
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            Copia del texto consolidado.{" "}
            <a href={r.fuenteUrl} target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-secondary)" }}>
              Verificar vigencia en la fuente oficial ↗
            </a>
          </p>
        )}
      </div>
    </main>
  );
}
