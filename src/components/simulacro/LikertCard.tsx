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
  { borderColor: 'rgba(245,166,35,0.50)', background: 'rgba(245,166,35,0.10)', color: '#F5A623' },
  { borderColor: 'rgba(74,144,217,0.50)', background: 'rgba(74,144,217,0.10)', color: '#4A90D9' },
  { borderColor: 'rgba(39,174,96,0.50)',  background: 'rgba(39,174,96,0.10)',  color: '#27AE60' },
];
const LIKERT_STYLES_ACTIVOS = [
  { borderColor: '#E74C3C', background: 'rgba(231,76,60,0.30)', color: '#F0F4FA' },
  { borderColor: '#F39C12', background: 'rgba(243,156,18,0.30)', color: '#F0F4FA' },
  { borderColor: '#F5A623', background: 'rgba(245,166,35,0.30)', color: '#F0F4FA' },
  { borderColor: '#4A90D9', background: 'rgba(74,144,217,0.30)', color: '#F0F4FA' },
  { borderColor: '#27AE60', background: 'rgba(39,174,96,0.30)',  color: '#F0F4FA' },
];

export function LikertCard({ numero, pregunta, respuesta, onRespuesta }: Props) {
  return (
    <div className="rounded-2xl p-5" style={{ background: 'rgba(30,61,110,0.40)', border: '1px solid #2A4A7F' }}>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(74,144,217,0.20)', color: '#4A90D9', fontFamily: 'var(--font-display)' }}>
          #{numero} COMPORTAMENTAL
        </span>
        <span className="text-xs" style={{ color: '#6B8BAD' }}>{pregunta.categoria}</span>
      </div>

      <p className="font-medium mb-5 leading-relaxed" style={{ color: '#F0F4FA' }}>{pregunta.texto}</p>

      <p className="text-xs mb-3" style={{ color: '#A8BFDC' }}>
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

      <div className="flex justify-between text-xs px-1 mt-2" style={{ color: '#6B8BAD' }}>
        <span>1 = Nunca</span>
        <span>5 = Siempre</span>
      </div>
    </div>
  );
}
