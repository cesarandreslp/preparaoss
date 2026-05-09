import { auth } from "@/auth";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { OpecCTA } from "@/components/opec/OpecCTA";
import Link from "next/link";

export default async function OpecDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) redirect("/login");

  const opec = await prisma.opec.findUnique({
    where: { id },
    include: {
      _count: {
        select: { preguntas: true, inscripciones: true, simulacros: true },
      },
    },
  });

  if (!opec) notFound();

  const inscripcion = await prisma.userOpec.findUnique({
    where: { userId_opecId: { userId, opecId: id } },
  });

  const inscrito = !!inscripcion;

  return (
    <div className="space-y-8">
      {/* Header con back */}
      <div>
        <Link
          href="/opecs"
          className="inline-flex items-center gap-1.5 text-sm transition-colors hover:opacity-100"
          style={{ color: "var(--text-muted)" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          Volver a OPECs
        </Link>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="tag tag-gold">OPEC #{opec.simoId}</span>
          {opec.numerConvocatoria && <span className="tag tag-blue">Conv. {opec.numerConvocatoria}</span>}
          <span className="tag tag-muted">{opec.nivelJerarquico}</span>
        </div>
        <p className="mt-4 text-sm" style={{ color: "var(--text-muted)" }}>
          {opec.entidad}
        </p>
        <h1
          className="text-3xl sm:text-4xl font-extrabold mt-1"
          style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em", lineHeight: 1.1 }}
        >
          {opec.nombreCargo}
        </h1>
      </div>

      {/* Stats highlight */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { v: opec.numVacantes, label: "Vacantes", icon: "👥", accent: "var(--gold-300)" },
          { v: opec._count.inscripciones, label: "Aspirantes", icon: "🎯", accent: "var(--blue-300)" },
          { v: opec._count.preguntas, label: "Preguntas", icon: "❓", accent: "var(--success)" },
        ].map((s) => (
          <div key={s.label} className="card text-center p-4">
            <p className="text-xl">{s.icon}</p>
            <p
              className="text-xl font-extrabold mt-1"
              style={{ fontFamily: "var(--font-display)", color: s.accent }}
            >
              {s.v}
            </p>
            <p className="text-[11px] mt-0.5" style={{ color: "var(--text-muted)" }}>
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* Datos del cargo */}
      <div className="card-elevated p-6">
        <span className="eyebrow">Detalles del cargo</span>
        <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
          {[
            { label: "Grado", value: opec.grado },
            { label: "Nivel jerárquico", value: opec.nivelJerarquico },
            { label: "Ubicación", value: `${opec.municipio}, ${opec.departamento}` },
            ...(opec.asignacionBasica
              ? [
                  {
                    label: "Asignación básica",
                    value:
                      opec.asignacionBasica.toLocaleString("es-CO", {
                        style: "currency",
                        currency: "COP",
                        maximumFractionDigits: 0,
                      }) + "/mes",
                  },
                ]
              : []),
            ...(opec.fechaLimiteInscripcion
              ? [
                  {
                    label: "Cierra inscripciones",
                    value: new Date(opec.fechaLimiteInscripcion).toLocaleDateString("es-CO", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }),
                    accent: "var(--gold-300)",
                  },
                ]
              : []),
            ...(opec.fechaExamen
              ? [
                  {
                    label: "Fecha de examen",
                    value: new Date(opec.fechaExamen).toLocaleDateString("es-CO", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }),
                    accent: "var(--success)",
                  },
                ]
              : []),
          ].map((item) => (
            <div key={item.label}>
              <dt className="text-[11px] uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                {item.label}
              </dt>
              <dd
                className="font-semibold mt-1"
                style={{ color: ("accent" in item && item.accent) || "var(--text-primary)" }}
              >
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Tipos de prueba */}
      <div className="card-elevated p-6">
        <span className="eyebrow">Tipos de prueba</span>
        <div className="mt-4 flex flex-wrap gap-2">
          {opec.tipoPruebas.map((t) => (
            <span key={t} className="tag tag-blue">
              {t}
            </span>
          ))}
        </div>
        <div className="mt-5 space-y-3 text-sm" style={{ color: "var(--text-secondary)" }}>
          <p>
            📝{" "}
            <strong style={{ color: "var(--text-primary)" }}>Funcional Específica:</strong>{" "}
            escenario situacional con 3 preguntas, 3 opciones cada una.
          </p>
          <p>
            📋 <strong style={{ color: "var(--text-primary)" }}>Funcional Transversal:</strong> pregunta directa con 4 opciones (A, B, C, D).
          </p>
          <p>
            🧠 <strong style={{ color: "var(--text-primary)" }}>Comportamental:</strong> escala Likert 1-5 según nivel de responsabilidad.
          </p>
        </div>
      </div>

      {/* Competencias */}
      {opec.competencias.length > 0 && (
        <div className="card-elevated p-6">
          <span className="eyebrow">Competencias evaluadas</span>
          <div className="mt-4 flex flex-wrap gap-2">
            {opec.competencias.map((c) => (
              <span key={c} className="tag tag-muted">
                {c}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Requisitos */}
      <div className="card-elevated p-6 space-y-5">
        <div>
          <span className="eyebrow">Requisitos de estudio</span>
          <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            {opec.requisitosEstudio || "No especificado"}
          </p>
        </div>
        <div className="pt-5 border-t" style={{ borderColor: "var(--border-subtle)" }}>
          <span className="eyebrow">Experiencia requerida</span>
          <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            {opec.requisitosExp || "No especificado"}
          </p>
        </div>
      </div>

      {/* CTA sticky */}
      <OpecCTA
        opecId={id}
        tienePreguntas={opec._count.preguntas >= 10}
        inscrito={inscrito}
      />
    </div>
  );
}
