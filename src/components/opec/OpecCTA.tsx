"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { DesbloquearOpec } from "./DesbloquearOpec";

interface Props {
  opecId: string;
  tienePreguntas: boolean;
  inscrito: boolean;
  accesoPagado: boolean;
  precioCop: number;
}

export function OpecCTA({ opecId, tienePreguntas, inscrito, accesoPagado, precioCop }: Props) {
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
        <>
          <Link
            href={`/opecs/${opecId}/simulacro`}
            className="btn-primary block w-full text-center px-6 py-4 text-lg rounded-2xl"
          >
            🚀 Iniciar simulacro
          </Link>
          {accesoPagado ? (
            <div
              className="w-full px-6 py-3 rounded-2xl text-center text-sm font-medium"
              style={{ background: "rgba(39,174,96,0.12)", color: "var(--success)", border: "1px solid rgba(39,174,96,0.30)" }}
            >
              ✓ Acceso ilimitado activo hasta el examen
            </div>
          ) : (
            <DesbloquearOpec opecId={opecId} precioCop={precioCop} />
          )}
        </>
      ) : (
        <div
          className="w-full px-6 py-4 rounded-2xl text-center"
          style={{ background: 'rgba(208, 74, 28, 0.08)', border: '1px solid rgba(208, 74, 28, 0.25)', color: 'var(--accent-500)' }}
        >
          <p className="font-medium">⏳ Banco de preguntas en preparación</p>
          <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
            El simulacro estará disponible pronto. ¡Sigue esta OPEC para estar al tanto!
          </p>
        </div>
      )}

      <button
        onClick={toggleInscripcion}
        disabled={cargando}
        className="w-full px-6 py-3 rounded-2xl text-sm font-medium transition-all disabled:opacity-60"
        style={inscrito
          ? { background: 'rgba(39,174,96,0.15)', color: 'var(--success)', border: '1px solid rgba(39,174,96,0.35)' }
          : { background: 'rgba(44, 84, 122, 0.15)', color: '#4A90D9', border: '1px solid rgba(44, 84, 122, 0.35)' }}
      >
        {inscrito ? "✅ Siguiendo esta OPEC (click para dejar de seguir)" : "➕ Seguir esta OPEC"}
      </button>

      <Link
        href={`/ranking?opecId=${opecId}`}
        className="block w-full text-center px-6 py-3 rounded-2xl text-sm font-medium transition-all"
        style={{ background: 'var(--bg-card)', color: 'var(--text-secondary)', border: '1px solid var(--border-default)' }}
      >
        🏆 Ver ranking de aspirantes
      </Link>
    </div>
  );
}
