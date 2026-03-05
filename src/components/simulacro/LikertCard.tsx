"use client";

import { PreguntaSimulacro, RespuestaInput } from "@/app/opecs/[id]/simulacro/page";

interface Props {
  numero: number;
  pregunta: PreguntaSimulacro;
  respuesta: RespuestaInput | undefined;
  onRespuesta: (r: RespuestaInput) => void;
}

const LIKERT_COLORES = [
  "border-red-500/50 bg-red-500/10 text-red-300",
  "border-orange-500/50 bg-orange-500/10 text-orange-300",
  "border-yellow-500/50 bg-yellow-500/10 text-yellow-300",
  "border-blue-500/50 bg-blue-500/10 text-blue-300",
  "border-green-500/50 bg-green-500/10 text-green-300",
];

const LIKERT_COLORES_ACTIVOS = [
  "border-red-500 bg-red-500/30 text-white",
  "border-orange-500 bg-orange-500/30 text-white",
  "border-yellow-500 bg-yellow-500/30 text-white",
  "border-blue-500 bg-blue-500/30 text-white",
  "border-green-500 bg-green-500/30 text-white",
];

export function LikertCard({ numero, pregunta, respuesta, onRespuesta }: Props) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-3">
        <span className="bg-purple-600/30 text-purple-300 text-xs font-bold px-2 py-0.5 rounded-full">
          #{numero} COMPORTAMENTAL
        </span>
        <span className="text-xs text-slate-500">{pregunta.categoria}</span>
      </div>

      <p className="text-white font-medium mb-5 leading-relaxed">{pregunta.texto}</p>

      <p className="text-xs text-slate-400 mb-3">
        ¿Con qué frecuencia harías esto?
      </p>

      {/* Escala Likert 1-5 */}
      <div className="space-y-2">
        {pregunta.opciones.map((opcion, i) => {
          const seleccionada = respuesta?.opcionId === opcion.id;
          const colorBase = LIKERT_COLORES[i % 5];
          const colorActivo = LIKERT_COLORES_ACTIVOS[i % 5];
          return (
            <button
              key={opcion.id}
              onClick={() =>
                onRespuesta({
                  preguntaId: pregunta.id,
                  opcionId: opcion.id,
                  valorLikert: opcion.valorLikert ?? i + 1,
                })
              }
              className={`w-full text-left px-4 py-3 rounded-xl border transition-all text-sm flex items-center gap-3 ${
                seleccionada ? colorActivo : `${colorBase} hover:opacity-80`
              }`}
            >
              <span className="font-bold text-lg w-6 text-center shrink-0">
                {opcion.letra}
              </span>
              <span className="flex-1">{opcion.texto}</span>
            </button>
          );
        })}
      </div>

      <div className="flex justify-between text-xs text-slate-500 mt-2 px-1">
        <span>1 = Nunca</span>
        <span>5 = Siempre</span>
      </div>
    </div>
  );
}
