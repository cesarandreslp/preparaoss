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
    <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255, 255, 255, 0.40)', border: '1px solid var(--border-default)' }}>
      {/* Escenario */}
      <div className="p-5" style={{ background: 'rgba(37,99,235,0.12)', borderBottom: '1px solid var(--border-default)' }}>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: 'linear-gradient(135deg,var(--bg-card),#2563EB)', color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
            CASO {numero}
          </span>
          <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>Juicio situacional</span>
        </div>
        <p className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: 'var(--text-secondary)' }}>
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
      <p className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>
        <span className="font-bold mr-1" style={{ color: '#4A90D9' }}>{letra})</span>
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
            className="w-full text-left px-4 py-3 rounded-xl text-sm transition-all border"
              style={marcada
                ? { background: 'rgba(37,99,235,0.35)', borderColor: '#4A90D9', color: 'var(--text-primary)' }
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
