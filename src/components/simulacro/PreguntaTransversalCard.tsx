"use client";

import { PreguntaSimulacro, RespuestaInput } from "@/app/opecs/[id]/simulacro/page";

interface Props {
  numero: number;
  pregunta: PreguntaSimulacro;
  respuesta: RespuestaInput | undefined;
  onRespuesta: (r: RespuestaInput) => void;
}

export function PreguntaTransversalCard({ numero, pregunta, respuesta, onRespuesta }: Props) {
  return (
    <div className="rounded-2xl p-5" style={{ background: 'rgba(255, 255, 255, 0.40)', border: '1px solid var(--border-default)' }}>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(44, 84, 122, 0.20)', color: '#4A90D9', fontFamily: 'var(--font-display)' }}>
          #{numero}
        </span>
        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{pregunta.categoria}</span>
      </div>

      <p className="font-medium mb-4 leading-relaxed" style={{ color: 'var(--text-primary)' }}>{pregunta.texto}</p>

      {/* 4 opciones (A, B, C, D) */}
      <div className="space-y-2">
        {pregunta.opciones.map((opcion) => {
          const seleccionada = respuesta?.opcionId === opcion.id;
          return (
            <button
              key={opcion.id}
              onClick={() => onRespuesta({ preguntaId: pregunta.id, opcionId: opcion.id })}
              className="w-full text-left px-4 py-3 rounded-xl border transition-all text-sm"
              style={seleccionada
                ? { background: 'rgba(37,99,235,0.30)', borderColor: '#4A90D9', color: 'var(--text-primary)' }
                : { background: 'rgba(255, 255, 255, 0.30)', borderColor: 'var(--border-default)', color: 'var(--text-secondary)' }}
            >
              <span className="font-bold mr-2" style={{ color: '#4A90D9' }}>{opcion.letra}.</span>
              {opcion.texto}
            </button>
          );
        })}
      </div>
    </div>
  );
}
