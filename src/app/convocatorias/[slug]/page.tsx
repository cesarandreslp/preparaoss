import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { slugify, convocatoriaValida } from "@/lib/slug";

export const revalidate = 3600; // ISR: se regenera cada hora

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://preparaoss.vercel.app";

// Pre-renderiza las ~84 páginas en build; ISR las refresca cada hora.
export async function generateStaticParams() {
  const convs = await prisma.opec.findMany({
    where: { creadoPorUserId: null },
    select: { numerConvocatoria: true },
    distinct: ["numerConvocatoria"],
  });
  return convs
    .filter((c) => convocatoriaValida(c.numerConvocatoria))
    .map((c) => ({ slug: slugify(c.numerConvocatoria!) }));
}

// slug → numerConvocatoria (comparando slugs sobre la lista distinta)
async function resolverConvocatoria(slug: string): Promise<string | null> {
  const convs = await prisma.opec.findMany({
    where: { creadoPorUserId: null },
    select: { numerConvocatoria: true },
    distinct: ["numerConvocatoria"],
  });
  const match = convs.find(
    (c) => convocatoriaValida(c.numerConvocatoria) && slugify(c.numerConvocatoria!) === slug
  );
  return match?.numerConvocatoria ?? null;
}

function fmtCop(n: number | null) {
  return n == null ? null : n.toLocaleString("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const num = await resolverConvocatoria(slug);
  if (!num) return { title: "Convocatoria no encontrada" };
  const agg = await prisma.opec.aggregate({
    where: { numerConvocatoria: num, creadoPorUserId: null },
    _count: { _all: true },
    _sum: { numVacantes: true },
  });
  const ent = await prisma.opec.findFirst({
    where: { numerConvocatoria: num, creadoPorUserId: null },
    select: { entidad: true },
  });
  const title = `Simulacro Convocatoria ${num} — ${ent?.entidad ?? "CNSC"} | PreparaOSS`;
  const description = `Prepárate para la convocatoria ${num} de la CNSC: ${agg._count._all} cargos y ${agg._sum.numVacantes ?? 0} vacantes. Practica gratis con simulacros de preguntas a la medida de tu cargo.`;
  const url = `${APP_URL}/convocatorias/${slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "website" },
  };
}

export default async function ConvocatoriaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const num = await resolverConvocatoria(slug);
  if (!num) notFound();

  const opecs = await prisma.opec.findMany({
    where: { numerConvocatoria: num, creadoPorUserId: null },
    select: { id: true, nombreCargo: true, entidad: true, municipio: true, nivelJerarquico: true, numVacantes: true, asignacionBasica: true, estado: true },
    orderBy: [{ numVacantes: "desc" }],
    take: 80,
  });

  const totalCargos = await prisma.opec.count({ where: { numerConvocatoria: num, creadoPorUserId: null } });
  const totalVacantes = opecs.reduce((s, o) => s + (o.numVacantes ?? 0), 0);
  const entidades = [...new Set(opecs.map((o) => o.entidad))];

  return (
    <main className="min-h-screen noise-overlay" style={{ background: "var(--gradient-hero)" }}>
      <div className="container-app section">
        <Link href="/convocatorias" className="inline-flex items-center gap-1.5 text-sm" style={{ color: "var(--text-muted)" }}>
          ← Todas las convocatorias
        </Link>

        <span className="eyebrow mt-6 block">Convocatoria CNSC</span>
        <h1 className="display-2 mt-3 max-w-4xl">
          Simulacros para la <span className="text-gradient-gold">Convocatoria {num}</span>
        </h1>
        <p className="mt-4 text-lg max-w-3xl" style={{ color: "var(--text-secondary)" }}>
          {totalCargos} cargos · {totalVacantes.toLocaleString("es-CO")}+ vacantes
          {entidades.length === 1 ? ` · ${entidades[0]}` : ` · ${entidades.length} entidades`}.
          Practica con preguntas generadas a la medida de las funciones de tu cargo — gratis,
          sin registro para empezar.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/registro" className="btn-primary text-base px-8 py-4">Practicar gratis →</Link>
          <Link href={`/opecs?q=${encodeURIComponent(num)}`} className="btn-secondary text-base px-8 py-4">
            Ver todos los cargos
          </Link>
        </div>

        <h2 className="display-3 mt-16 mb-6">Cargos de esta convocatoria</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {opecs.map((o) => (
            <Link key={o.id} href={`/opecs/${o.id}`} className="card h-full flex flex-col hover:scale-[1.01] transition-transform">
              <div className="flex items-start justify-between gap-3 mb-3">
                <span className="tag tag-blue">{o.nivelJerarquico}</span>
                <span className="text-xs font-semibold" style={{ color: "var(--gold-300)" }}>{o.numVacantes} vac.</span>
              </div>
              <h3 className="text-base font-bold leading-snug">{o.nombreCargo}</h3>
              <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>{o.entidad}</p>
              <p className="text-xs mt-auto pt-3" style={{ color: "var(--text-muted)" }}>
                {o.municipio}{o.asignacionBasica ? ` · ${fmtCop(o.asignacionBasica)}` : ""}
              </p>
            </Link>
          ))}
        </div>
        {totalCargos > opecs.length && (
          <p className="mt-6 text-sm" style={{ color: "var(--text-muted)" }}>
            Mostrando {opecs.length} de {totalCargos} cargos.{" "}
            <Link href={`/opecs?q=${encodeURIComponent(num)}`} className="text-gradient-gold">Ver todos →</Link>
          </p>
        )}
      </div>
    </main>
  );
}
