"use client";

import { PreguntaSimulacro, RespuestaInput } from "@/app/opecs/[id]/simulacro/page";

interface Props {
  numero: number;
  pregunta: PreguntaSimulacro;
  respuesta: RespuestaInput | undefined;
  onRespuesta: (r: RespuestaInput) => void;
}

const LIKERT_STYLES = [
  { borderColor: 'rgba(231,76,60,0.50)', background: 'rgba(231,76,60,0.10)', color: '#f87171' },
  { borderColor: 'rgba(243,156,18,0.50)', background: 'rgba(243,156,18,0.10)', color: '#fbbf24' },
  { borderColor: 'rgba(208, 74, 28, 0.50)', background: 'rgba(208, 74, 28, 0.10)', color: 'var(--accent-500)' },
  { borderColor: 'rgba(44, 84, 122, 0.50)', background: 'rgba(44, 84, 122, 0.10)', color: '#4A90D9' },
  { borderColor: 'rgba(39,174,96,0.50)',  background: 'rgba(39,174,96,0.10)',  color: 'var(--success)' },
];
const LIKERT_STYLES_ACTIVOS = [
  { borderColor: '#E74C3C', background: 'rgba(231,76,60,0.30)', color: 'var(--text-primary)' },
  { borderColor: '#F39C12', background: 'rgba(243,156,18,0.30)', color: 'var(--text-primary)' },
  { borderColor: 'var(--accent-500)', background: 'rgba(208, 74, 28, 0.30)', color: 'var(--text-primary)' },
  { borderColor: '#4A90D9', background: 'rgba(44, 84, 122, 0.30)', color: 'var(--text-primary)' },
  { borderColor: 'var(--success)', background: 'rgba(39,174,96,0.30)',  color: 'var(--text-primary)' },
];

export function LikertCard({ numero, pregunta, respuesta, onRespuesta }: Props) {
  return (
    <div className="rounded-2xl p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)' }}>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(212,175,55,0.18)', color: 'var(--gold-300)', fontFamily: 'var(--font-display)' }}>
          #{numero} COMPORTAMENTAL
        </span>
        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{pregunta.categoria}</span>
      </div>

      <p className="font-medium mb-5 leading-relaxed" style={{ color: 'var(--text-primary)' }}>{pregunta.texto}</p>

      <p className="text-xs mb-3" style={{ color: 'var(--text-secondary)' }}>
        ¿Con qué frecuencia harías esto?
      </p>

      {/* Escala Likert 1-5 */}
      <div className="space-y-2">
        {pregunta.opciones.map((opcion, i) => {
          const seleccionada = respuesta?.opcionId === opcion.id;
          const estilo = LIKERT_STYLES[i % 5];
          const estiloActivo = LIKERT_STYLES_ACTIVOS[i % 5];
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
              className="w-full text-left px-4 py-3 rounded-xl border transition-all text-sm flex items-center gap-3"
              style={seleccionada ? estiloActivo : estilo}
            >
              <span className="font-bold text-lg w-6 text-center shrink-0">
                {opcion.letra}
              </span>
              <span className="flex-1">{opcion.texto}</span>
            </button>
          );
        })}
      </div>

      <div className="flex justify-between text-xs px-1 mt-2" style={{ color: 'var(--text-muted)' }}>
        <span>1 = Nunca</span>
        <span>5 = Siempre</span>
      </div>
    </div>
  );
}
