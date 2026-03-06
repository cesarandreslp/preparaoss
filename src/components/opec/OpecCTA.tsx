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
          className="btn-primary block w-full text-center px-6 py-4 text-lg rounded-2xl"
        >
          🚀 Iniciar simulacro
        </Link>
      ) : (
        <div className="space-y-2">
          <button
            onClick={generarPreguntas}
            disabled={generando}
            className="btn-primary w-full px-6 py-4 text-lg rounded-2xl disabled:opacity-60 disabled:cursor-not-allowed"
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
            <p className="text-xs text-center" style={{ color: '#A8BFDC' }}>
              Groq está creando escenarios situacionales, preguntas transversales y comportamentales para este cargo.
            </p>
          )}
          {mensaje && (
            <p className="text-sm text-center" style={{ color: '#27AE60' }}>✅ {mensaje}</p>
          )}
          {error && (
            <p className="text-sm text-center" style={{ color: '#E74C3C' }}>❌ {error}</p>
          )}
        </div>
      )}

      <button
        onClick={toggleInscripcion}
        className="w-full px-6 py-3 rounded-2xl text-sm font-medium transition-all"
        style={inscrito
          ? { background: 'rgba(39,174,96,0.15)', color: '#27AE60', border: '1px solid rgba(39,174,96,0.35)' }
          : { background: 'rgba(74,144,217,0.15)', color: '#4A90D9', border: '1px solid rgba(74,144,217,0.35)' }}
      >
        {inscrito ? "✅ Siguiendo esta OPEC (click para dejar de seguir)" : "➕ Seguir esta OPEC"}
      </button>

      <Link
        href={`/ranking?opecId=${opecId}`}
        className="block w-full text-center px-6 py-3 rounded-2xl text-sm font-medium transition-all"
        style={{ background: 'rgba(30,61,110,0.40)', color: '#A8BFDC', border: '1px solid #2A4A7F' }}
      >
        🏆 Ver ranking de aspirantes
      </Link>
    </div>
  );
}
