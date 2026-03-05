"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Props {
  opecId: string;
  tienePreguntas: boolean;
  inscrito: boolean;
}

export function OpecCTA({ opecId, tienePreguntas, inscrito }: Props) {
  const router = useRouter();
  const [generando, setGenerando] = useState(false);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  async function generarPreguntas() {
    setGenerando(true);
    setError("");
    setMensaje("");
    try {
      const res = await fetch(`/api/opecs/${opecId}/generar-preguntas`, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setMensaje(data.mensaje);
      router.refresh(); // Refresca el Server Component para mostrar el botón de simulacro
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Error desconocido");
    } finally {
      setGenerando(false);
    }
  }

  async function toggleInscripcion() {
    await fetch(`/api/opecs/${opecId}/inscribirse`, { method: "POST" });
    router.refresh();
  }

  return (
    <div className="space-y-3 pb-4">
      {tienePreguntas ? (
        <Link
          href={`/opecs/${opecId}/simulacro`}
          className="block w-full text-center px-6 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-2xl font-semibold text-white text-lg transition-colors"
        >
          🚀 Iniciar simulacro
        </Link>
      ) : (
        <div className="space-y-2">
          <button
            onClick={generarPreguntas}
            disabled={generando}
            className="w-full px-6 py-4 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed rounded-2xl font-semibold text-white text-lg transition-colors"
          >
            {generando ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin">⚙️</span>
                Generando preguntas con IA... (30–60 seg)
              </span>
            ) : (
              "🤖 Generar banco de preguntas"
            )}
          </button>
          {generando && (
            <p className="text-xs text-slate-400 text-center">
              Groq está creando escenarios situacionales, preguntas transversales y comportamentales para este cargo.
            </p>
          )}
          {mensaje && (
            <p className="text-green-400 text-sm text-center">✅ {mensaje}</p>
          )}
          {error && (
            <p className="text-red-400 text-sm text-center">❌ {error}</p>
          )}
        </div>
      )}

      <button
        onClick={toggleInscripcion}
        className={`w-full px-6 py-3 rounded-2xl text-sm font-medium transition-colors ${
          inscrito
            ? "bg-green-600/20 text-green-400 hover:bg-red-600/20 hover:text-red-400"
            : "bg-white/10 hover:bg-white/20 text-white"
        }`}
      >
        {inscrito ? "✅ Siguiendo esta OPEC (click para dejar de seguir)" : "➕ Seguir esta OPEC"}
      </button>

      <Link
        href={`/ranking?opecId=${opecId}`}
        className="block w-full text-center px-6 py-3 bg-white/5 hover:bg-white/10 rounded-2xl text-sm font-medium text-slate-300 transition-colors"
      >
        🏆 Ver ranking de aspirantes
      </Link>
    </div>
  );
}
