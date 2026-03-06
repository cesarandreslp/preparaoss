import { auth } from "@clerk/nextjs/server";
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
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

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
    <div className="space-y-5">
      {/* Header */}
      <div>
        <Link href="/opecs" className="text-sm hover:opacity-80" style={{ color: '#4A90D9' }}>
          ← Volver
        </Link>
        <h1 className="text-xl font-bold mt-2" style={{ fontFamily: 'var(--font-display)', color: '#F0F4FA' }}>{opec.nombreCargo}</h1>
        <p style={{ color: '#A8BFDC' }}>{opec.entidad}</p>
      </div>

      {/* Info principal */}
      <div className="rounded-2xl p-5 space-y-3" style={{ background: 'rgba(30,61,110,0.40)', border: '1px solid #2A4A7F' }}>
        <div className="grid grid-cols-2 gap-3 text-sm">
          {[
            { label: "Nivel", value: opec.nivelJerarquico },
            { label: "Grado", value: opec.grado },
            { label: "Vacantes", value: String(opec.numVacantes) },
            { label: "Municipio", value: `${opec.municipio}, ${opec.departamento}` },
            ...(opec.asignacionBasica ? [{ label: "Asignación básica", value: opec.asignacionBasica.toLocaleString("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }) + "/mes" }] : []),
          ].map((item) => (
            <div key={item.label}>
              <p className="text-xs uppercase tracking-wide" style={{ color: '#6B8BAD' }}>{item.label}</p>
              <p className="font-medium" style={{ color: '#F0F4FA' }}>{item.value}</p>
            </div>
          ))}
        </div>

        {opec.fechaLimiteInscripcion && (
          <div className="pt-2 border-t" style={{ borderColor: '#2A4A7F' }}>
            <p className="text-xs uppercase tracking-wide" style={{ color: '#6B8BAD' }}>Cierre inscripciones</p>
            <p className="font-medium" style={{ color: '#F5A623' }}>
              {new Date(opec.fechaLimiteInscripcion).toLocaleDateString("es-CO", {
                day: "numeric", month: "long", year: "numeric",
              })}
            </p>
          </div>
        )}

        {opec.fechaExamen && (
          <div>
            <p className="text-xs uppercase tracking-wide" style={{ color: '#6B8BAD' }}>Fecha de examen</p>
            <p className="font-medium" style={{ color: '#27AE60' }}>
              {new Date(opec.fechaExamen).toLocaleDateString("es-CO", {
                day: "numeric", month: "long", year: "numeric",
              })}
            </p>
          </div>
        )}
      </div>

      {/* Tipos de prueba */}
      <div className="rounded-2xl p-5" style={{ background: 'rgba(30,61,110,0.40)', border: '1px solid #2A4A7F' }}>
        <h3 className="font-semibold mb-3" style={{ fontFamily: 'var(--font-display)', color: '#F0F4FA' }}>Tipos de prueba</h3>
        <div className="flex flex-wrap gap-2">
          {opec.tipoPruebas.map((t) => (
            <span key={t} className="px-3 py-1 rounded-full text-sm" style={{ background: 'rgba(74,144,217,0.20)', color: '#4A90D9' }}>
              {t}
            </span>
          ))}
        </div>
        <div className="mt-4 space-y-2 text-sm" style={{ color: '#A8BFDC' }}>
          <p>📝 <strong style={{ color: '#F0F4FA' }}>Funcional Específica:</strong> Escenario situacional (10+ líneas) → 3 preguntas, 3 opciones c/u</p>
          <p>📋 <strong style={{ color: '#F0F4FA' }}>Funcional Transversal:</strong> Pregunta directa con 4 opciones (A, B, C, D)</p>
          <p>🧠 <strong style={{ color: '#F0F4FA' }}>Comportamental:</strong> Escala Likert 1-5 según nivel de responsabilidad del cargo</p>
        </div>
      </div>

      {/* Competencias */}
      {opec.competencias.length > 0 && (
      <div className="rounded-2xl p-5" style={{ background: 'rgba(30,61,110,0.40)', border: '1px solid #2A4A7F' }}>
        <h3 className="font-semibold mb-3" style={{ fontFamily: 'var(--font-display)', color: '#F0F4FA' }}>Competencias evaluadas</h3>
          <div className="flex flex-wrap gap-2">
            {opec.competencias.map((c) => (
              <span key={c} className="px-3 py-1 rounded-full text-xs" style={{ background: 'rgba(74,144,217,0.15)', color: '#4A90D9', border: '1px solid rgba(74,144,217,0.30)' }}>
                {c}
              </span>
            ))}
          </div>
      </div>
      )}

      {/* Requisitos */}
      <div className="rounded-2xl p-5 space-y-4" style={{ background: 'rgba(30,61,110,0.40)', border: '1px solid #2A4A7F' }}>
        <div>
          <h3 className="font-semibold text-sm mb-1" style={{ color: '#F0F4FA' }}>Requisitos de estudio</h3>
          <p className="text-sm leading-relaxed" style={{ color: '#A8BFDC' }}>{opec.requisitosEstudio || "No especificado"}</p>
        </div>
        <div>
          <h3 className="font-semibold text-sm mb-1" style={{ color: '#F0F4FA' }}>Experiencia requerida</h3>
          <p className="text-sm leading-relaxed" style={{ color: '#A8BFDC' }}>{opec.requisitosExp || "No especificado"}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 text-center">
        {[
          { value: opec._count.inscripciones, label: "Aspirantes" },
          { value: opec._count.preguntas, label: "Preguntas" },
          { value: opec._count.simulacros, label: "Simulacros" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl py-3" style={{ background: 'rgba(30,61,110,0.40)', border: '1px solid #2A4A7F' }}>
            <p className="font-bold text-lg" style={{ color: '#F0F4FA' }}>{s.value}</p>
            <p className="text-xs" style={{ color: '#A8BFDC' }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <OpecCTA
        opecId={id}
        tienePreguntas={opec._count.preguntas >= 10}
        inscrito={inscrito}
      />
    </div>
  );
}
