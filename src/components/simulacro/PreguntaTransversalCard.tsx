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
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-3">
        <span className="bg-white/10 text-slate-300 text-xs font-bold px-2 py-0.5 rounded-full">
          #{numero}
        </span>
        <span className="text-xs text-slate-500">{pregunta.categoria}</span>
      </div>

      <p className="text-white font-medium mb-4 leading-relaxed">{pregunta.texto}</p>

      {/* 4 opciones (A, B, C, D) */}
      <div className="space-y-2">
        {pregunta.opciones.map((opcion) => {
          const seleccionada = respuesta?.opcionId === opcion.id;
          return (
            <button
              key={opcion.id}
              onClick={() => onRespuesta({ preguntaId: pregunta.id, opcionId: opcion.id })}
              className={`w-full text-left px-4 py-3 rounded-xl border transition-all text-sm ${
                seleccionada
                  ? "bg-indigo-600/30 border-indigo-500 text-white"
                  : "bg-white/5 border-white/10 text-slate-300 hover:border-white/30"
              }`}
            >
              <span className="font-bold text-indigo-400 mr-2">{opcion.letra}.</span>
              {opcion.texto}
            </button>
          );
        })}
      </div>
    </div>
  );
}
