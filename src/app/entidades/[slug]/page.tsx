import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { slugify, convocatoriaValida } from "@/lib/slug";
import HubContenido, { agregadosHub } from "@/components/HubContenido";

export const revalidate = 3600;

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://preparaoss.vercel.app";

// Pre-renderiza las ~165 páginas en build; ISR las refresca cada hora.
export async function generateStaticParams() {
  const ents = await prisma.opec.findMany({
    where: { creadoPorUserId: null },
    select: { entidad: true },
    distinct: ["entidad"],
  });
  return ents.map((e) => ({ slug: slugify(e.entidad) }));
}

async function resolverEntidad(slug: string): Promise<string | null> {
  const ents = await prisma.opec.findMany({
    where: { creadoPorUserId: null },
    select: { entidad: true },
    distinct: ["entidad"],
  });
  return ents.find((e) => slugify(e.entidad) === slug)?.entidad ?? null;
}

function fmtCop(n: number | null) {
  return n == null ? null : n.toLocaleString("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const entidad = await resolverEntidad(slug);
  if (!entidad) return { title: "Entidad no encontrada" };
  const agg = await prisma.opec.aggregate({
    where: { entidad, creadoPorUserId: null },
    _count: { _all: true },
    _sum: { numVacantes: true },
  });
  const title = `${entidad} — Concurso de méritos CNSC | Simulacros PreparaOSS`;
  const description = `Prepárate para el concurso de méritos de ${entidad}: ${agg._count._all} cargos y ${agg._sum.numVacantes ?? 0} vacantes. Practica gratis con simulacros a la medida de tu cargo.`;
  const url = `${APP_URL}/entidades/${slug}`;
  return { title, description, alternates: { canonical: url }, openGraph: { title, description, url, type: "website" } };
}

export default async function EntidadPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entidad = await resolverEntidad(slug);
  if (!entidad) notFound();

  const opecs = await prisma.opec.findMany({
    where: { entidad, creadoPorUserId: null, estado: { in: ["ACTIVA", "EN_PRUEBAS"] } },
    select: { id: true, nombreCargo: true, municipio: true, nivelJerarquico: true, numVacantes: true, asignacionBasica: true, numerConvocatoria: true },
    orderBy: [{ numVacantes: "desc" }],
    take: 80,
  });
  const agg = await prisma.opec.aggregate({
    where: { entidad, creadoPorUserId: null, estado: { in: ["ACTIVA", "EN_PRUEBAS"] } },
    _count: { _all: true },
    _sum: { numVacantes: true },
  });
  const totalCargos = agg._count._all;
  const totalVacantes = agg._sum.numVacantes ?? 0;
  const convocatorias = [...new Set(opecs.map((o) => o.numerConvocatoria).filter(convocatoriaValida))] as string[];

  return (
    <main className="min-h-screen noise-overlay" style={{ background: "var(--gradient-hero)" }}>
      <div className="container-app section">
        <Link href="/entidades" className="inline-flex items-center gap-1.5 text-sm" style={{ color: "var(--text-muted)" }}>
          ← Todas las entidades
        </Link>

        <span className="eyebrow mt-6 block">Concurso de méritos · CNSC</span>
        <h1 className="display-2 mt-3 max-w-4xl">{entidad}</h1>
        <p className="mt-4 text-lg max-w-3xl" style={{ color: "var(--text-secondary)" }}>
          {totalCargos} cargos · {totalVacantes.toLocaleString("es-CO")}+ vacantes.
          Practica con simulacros generados a la medida de las funciones de cada cargo de {entidad} — gratis.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/registro" className="btn-primary text-base px-8 py-4">Practicar gratis →</Link>
          <Link href={`/opecs?q=${encodeURIComponent(entidad)}`} className="btn-secondary text-base px-8 py-4">Ver todos los cargos</Link>
        </div>

        {convocatorias.length > 0 && (
          <>
            <h2 className="display-3 mt-16 mb-6">Convocatorias</h2>
            <div className="flex flex-wrap gap-3">
              {convocatorias.map((num) => (
                <Link key={num} href={`/convocatorias/${slugify(num)}`} className="tag tag-gold px-4 py-2 hover:opacity-80">
                  Convocatoria {num}
                </Link>
              ))}
            </div>
          </>
        )}

        <h2 className="display-3 mt-16 mb-6">Cargos</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {opecs.map((o) => (
            <Link key={o.id} href={`/opecs/${o.id}`} className="card h-full flex flex-col hover:scale-[1.01] transition-transform">
              <div className="flex items-start justify-between gap-3 mb-3">
                <span className="tag tag-blue">{o.nivelJerarquico}</span>
                <span className="text-xs font-semibold" style={{ color: "var(--gold-300)" }}>{o.numVacantes} vac.</span>
              </div>
              <h3 className="text-base font-bold leading-snug">{o.nombreCargo}</h3>
              <p className="text-xs mt-auto pt-3" style={{ color: "var(--text-muted)" }}>
                {o.municipio}{o.asignacionBasica ? ` · ${fmtCop(o.asignacionBasica)}` : ""}
              </p>
            </Link>
          ))}
        </div>
        {totalCargos > opecs.length && (
          <p className="mt-6 text-sm" style={{ color: "var(--text-muted)" }}>
            Mostrando {opecs.length} de {totalCargos}.{" "}
            <Link href={`/opecs?q=${encodeURIComponent(entidad)}`} className="text-gradient-gold">Ver todos →</Link>
          </p>
        )}

        <HubContenido
          tipo="entidad"
          nombre={entidad}
          totalCargos={totalCargos}
          totalVacantes={totalVacantes}
          {...agregadosHub(opecs)}
        />
      </div>
    </main>
  );
}
