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
  const [cargando, setCargando] = useState(false);

  async function toggleInscripcion() {
    setCargando(true);
    await fetch(`/api/opecs/${opecId}/inscribirse`, { method: "POST" });
    router.refresh();
    setCargando(false);
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
        <div
          className="w-full px-6 py-4 rounded-2xl text-center"
          style={{ background: 'rgba(245,166,35,0.08)', border: '1px solid rgba(245,166,35,0.25)', color: '#F5A623' }}
        >
          <p className="font-medium">⏳ Banco de preguntas en preparación</p>
          <p className="text-xs mt-1" style={{ color: '#A8BFDC' }}>
            El simulacro estará disponible pronto. ¡Sigue esta OPEC para estar al tanto!
          </p>
        </div>
      )}

      <button
        onClick={toggleInscripcion}
        disabled={cargando}
        className="w-full px-6 py-3 rounded-2xl text-sm font-medium transition-all disabled:opacity-60"
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
