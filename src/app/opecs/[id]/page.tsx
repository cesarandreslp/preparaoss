import { auth } from "@clerk/nextjs/server";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
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
        <Link href="/opecs" className="text-slate-400 text-sm hover:text-white">
          ← Volver
        </Link>
        <h1 className="text-xl font-bold text-white mt-2">{opec.nombreCargo}</h1>
        <p className="text-slate-400">{opec.entidad}</p>
      </div>

      {/* Info principal */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3">
        <div className="grid grid-cols-2 gap-3 text-sm">
          {[
            { label: "Nivel", value: opec.nivelJerarquico },
            { label: "Grado", value: opec.grado },
            { label: "Vacantes", value: String(opec.numVacantes) },
            { label: "Municipio", value: `${opec.municipio}, ${opec.departamento}` },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-slate-500 text-xs uppercase tracking-wide">{item.label}</p>
              <p className="text-white font-medium">{item.value}</p>
            </div>
          ))}
        </div>

        {opec.fechaLimiteInscripcion && (
          <div className="pt-2 border-t border-white/10">
            <p className="text-xs text-slate-500 uppercase tracking-wide">Cierre inscripciones</p>
            <p className="text-orange-400 font-medium">
              {new Date(opec.fechaLimiteInscripcion).toLocaleDateString("es-CO", {
                day: "numeric", month: "long", year: "numeric",
              })}
            </p>
          </div>
        )}

        {opec.fechaExamen && (
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wide">Fecha de examen</p>
            <p className="text-green-400 font-medium">
              {new Date(opec.fechaExamen).toLocaleDateString("es-CO", {
                day: "numeric", month: "long", year: "numeric",
              })}
            </p>
          </div>
        )}
      </div>

      {/* Tipos de prueba */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
        <h3 className="text-white font-semibold mb-3">Tipos de prueba</h3>
        <div className="flex flex-wrap gap-2">
          {opec.tipoPruebas.map((t) => (
            <span key={t} className="px-3 py-1 bg-indigo-600/30 text-indigo-300 rounded-full text-sm">
              {t}
            </span>
          ))}
        </div>
        <div className="mt-4 space-y-2 text-sm text-slate-400">
          <p>📝 <strong className="text-white">Funcional Específica:</strong> Escenario situacional (10+ líneas) → 3 preguntas, 3 opciones c/u</p>
          <p>📋 <strong className="text-white">Funcional Transversal:</strong> Pregunta directa con 4 opciones (A, B, C, D)</p>
          <p>🧠 <strong className="text-white">Comportamental:</strong> Escala Likert 1-5 según nivel de responsabilidad del cargo</p>
        </div>
      </div>

      {/* Competencias */}
      {opec.competencias.length > 0 && (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <h3 className="text-white font-semibold mb-3">Competencias evaluadas</h3>
          <div className="flex flex-wrap gap-2">
            {opec.competencias.map((c) => (
              <span key={c} className="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-xs">
                {c}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Requisitos */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
        <div>
          <h3 className="text-white font-semibold text-sm mb-1">Requisitos de estudio</h3>
          <p className="text-slate-400 text-sm leading-relaxed">{opec.requisitosEstudio || "No especificado"}</p>
        </div>
        <div>
          <h3 className="text-white font-semibold text-sm mb-1">Experiencia requerida</h3>
          <p className="text-slate-400 text-sm leading-relaxed">{opec.requisitosExp || "No especificado"}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 text-center">
        {[
          { value: opec._count.inscripciones, label: "Aspirantes" },
          { value: opec._count.preguntas, label: "Preguntas" },
          { value: opec._count.simulacros, label: "Simulacros" },
        ].map((s) => (
          <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl py-3">
            <p className="text-white font-bold text-lg">{s.value}</p>
            <p className="text-slate-400 text-xs">{s.label}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="space-y-3 pb-4">
        {opec._count.preguntas > 0 ? (
          <Link
            href={`/opecs/${id}/simulacro`}
            className="block w-full text-center px-6 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-2xl font-semibold text-white text-lg transition-colors"
          >
            🚀 Iniciar simulacro
          </Link>
        ) : (
          <div className="w-full text-center px-6 py-4 bg-white/10 rounded-2xl text-slate-400">
            ⏳ Generando banco de preguntas...
          </div>
        )}

        {!inscrito && (
          <form action={`/api/opecs/${id}/inscribirse`} method="POST">
            <button
              type="submit"
              className="w-full px-6 py-3 bg-white/10 hover:bg-white/20 rounded-2xl text-sm font-medium text-white transition-colors"
            >
              ➕ Seguir esta OPEC (recibir notificaciones)
            </button>
          </form>
        )}

        <Link
          href={`/ranking?opecId=${id}`}
          className="block w-full text-center px-6 py-3 bg-white/5 hover:bg-white/10 rounded-2xl text-sm font-medium text-slate-300 transition-colors"
        >
          🏆 Ver ranking de aspirantes
        </Link>
      </div>
    </div>
  );
}
