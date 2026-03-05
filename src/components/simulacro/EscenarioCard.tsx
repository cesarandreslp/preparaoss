"use client";

import { EscenarioSimulacro, PreguntaSimulacro, RespuestaInput } from "@/app/opecs/[id]/simulacro/page";

interface Props {
  numero: number;
  escenario: EscenarioSimulacro;
  respuestas: Map<string, RespuestaInput>;
  onRespuesta: (resp: RespuestaInput) => void;
}

export function EscenarioCard({ numero, escenario, respuestas, onRespuesta }: Props) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
      {/* Escenario */}
      <div className="bg-indigo-600/10 border-b border-white/10 p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-bold bg-indigo-600 text-white px-2 py-0.5 rounded-full">
            CASO {numero}
          </span>
          <span className="text-xs text-slate-400">Juicio situacional</span>
        </div>
        {/* Párrafo del escenario — mínimo 10 líneas */}
        <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
          {escenario.contenido}
        </p>
      </div>

      {/* 3 preguntas del escenario */}
      <div className="divide-y divide-white/5">
        {escenario.preguntas.map((pregunta, i) => (
          <SubPregunta
            key={pregunta.id}
            letra={["a", "b", "c"][i]}
            pregunta={pregunta}
            seleccionada={respuestas.get(pregunta.id)?.opcionId}
            onSeleccionar={(opcionId) =>
              onRespuesta({ preguntaId: pregunta.id, opcionId })
            }
          />
        ))}
      </div>
    </div>
  );
}

function SubPregunta({
  letra,
  pregunta,
  seleccionada,
  onSeleccionar,
}: {
  letra: string;
  pregunta: PreguntaSimulacro;
  seleccionada?: string;
  onSeleccionar: (opcionId: string) => void;
}) {
  return (
    <div className="p-5 space-y-3">
      <p className="text-white font-medium text-sm">
        <span className="text-indigo-400 font-bold mr-1">{letra})</span>
        {pregunta.texto}
      </p>

      {/* 3 opciones (A, B, C) */}
      <div className="space-y-2">
        {pregunta.opciones.map((opcion) => {
          const marcada = seleccionada === opcion.id;
          return (
            <button
              key={opcion.id}
              onClick={() => onSeleccionar(opcion.id)}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all border ${
                marcada
                  ? "bg-indigo-600/40 border-indigo-400 text-white"
                  : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:border-white/20"
              }`}
            >
              <span className="font-bold mr-2 text-indigo-400">{opcion.letra}.</span>
              {opcion.texto}
            </button>
          );
        })}
      </div>
    </div>
  );
}
