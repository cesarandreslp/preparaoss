"use client";

import { EscenarioSimulacro, PreguntaSimulacro, RespuestaInput } from "@/app/opecs/[id]/simulacro/page";

interface RetroItem {
  preguntaId: string;
  tipo: string;
  esCorrecta: boolean;
  opcionSeleccionadaId?: string;
  opcionCorrectaId?: string;
  explicacion: string;
}

interface Resultado {
  puntajeTotal: number;
  puntajeFuncEsp: number | null;
  puntajeFuncTrans: number | null;
  puntajeComport: number | null;
  xpGanado: number;
  badgesNuevos: string[];
  retroalimentacion: RetroItem[];
}

interface Props {
  resultado: unknown;
  escenarios: EscenarioSimulacro[];
  preguntas: PreguntaSimulacro[];
  respuestas: Map<string, RespuestaInput>;
  onVolver: () => void;
}

export function ResultadoScreen({ resultado, escenarios, preguntas, onVolver }: Props) {
  const r = resultado as Resultado;

  const todasPreguntas = [
    ...escenarios.flatMap((e) => e.preguntas),
    ...preguntas,
  ];

  const retroMap = new Map(r.retroalimentacion.map((x) => [x.preguntaId, x]));

  const colorPuntaje = (p: number) => {
    if (p >= 80) return { color: 'var(--success)' };
    if (p >= 60) return { color: 'var(--accent-500)' };
    return { color: '#E74C3C' };
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Puntaje total */}
      <div className="rounded-2xl p-6 text-center" style={{ background: 'linear-gradient(135deg,rgba(255, 255, 255, 0.50),rgba(37,99,235,0.25))', border: '1px solid var(--border-default)' }}>
        <p className="text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>Puntaje total</p>
        <p className="text-6xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)', ...colorPuntaje(r.puntajeTotal) }}>
          {r.puntajeTotal}%
        </p>
        <p className="font-medium" style={{ color: 'var(--accent-500)' }}>+{r.xpGanado} XP ganados 🔥</p>

        {r.badgesNuevos.length > 0 && (
          <div className="mt-4 rounded-xl p-3" style={{ background: 'rgba(208, 74, 28, 0.12)', border: '1px solid rgba(208, 74, 28, 0.35)' }}>
            <p className="text-sm font-semibold mb-1" style={{ color: 'var(--accent-500)' }}>¡Nuevos logros!</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {r.badgesNuevos.map((b) => (
                <span key={b} className="text-xs px-3 py-1 rounded-full" style={{ background: 'rgba(208, 74, 28, 0.20)', color: 'var(--accent-500)' }}>
                  🏅 {b}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Desglose por tipo */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "F. Específica", value: r.puntajeFuncEsp },
          { label: "F. Transversal", value: r.puntajeFuncTrans },
          { label: "Comportamental", value: r.puntajeComport },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-xl p-3 text-center"
            style={{ background: 'rgba(255, 255, 255, 0.40)', border: '1px solid var(--border-default)' }}
          >
            <p className="text-2xl font-bold" style={item.value !== null ? colorPuntaje(item.value) : { color: 'var(--text-muted)' }}>
              {item.value !== null ? `${item.value}%` : "N/A"}
            </p>
            <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>{item.label}</p>
          </div>
        ))}
      </div>

      {/* ─── RETROALIMENTACIÓN ───────────────────────────────
          Se muestra AL FINAL del simulacro (nunca durante)
          Justifica cada respuesta con la explicación de la IA
      ───────────────────────────────────────────────────── */}
      <div>
        <h2 className="font-bold text-lg mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>📋 Retroalimentación</h2>

        <div className="space-y-4">
          {todasPreguntas.map((pregunta, i) => {
            const retro = retroMap.get(pregunta.id);
            if (!retro) return null;

            const opcionSeleccionada = pregunta.opciones.find(
              (o) => o.id === retro.opcionSeleccionadaId
            );
            const opcionCorrecta = pregunta.opciones.find(
              (o) => o.id === retro.opcionCorrectaId
            );

            return (
              <div
                key={pregunta.id}
                className="rounded-2xl border p-5"
                style={retro.esCorrecta
                  ? { background: 'rgba(39,174,96,0.10)', borderColor: 'rgba(39,174,96,0.35)' }
                  : { background: 'rgba(231,76,60,0.10)', borderColor: 'rgba(231,76,60,0.35)' }}
              >
                {/* Número + resultado */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg" style={{ color: retro.esCorrecta ? 'var(--success)' : '#E74C3C' }}>
                    {retro.esCorrecta ? "✅" : "❌"}
                  </span>
                  <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>Pregunta {i + 1}</span>
                  <span className="text-xs ml-auto" style={{ color: 'var(--text-muted)' }}>{pregunta.categoria}</span>
                </div>

                {/* Texto de la pregunta */}
                <p className="text-sm font-medium mb-3 leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                  {pregunta.texto}
                </p>

                {/* Opciones con indicadores */}
                <div className="space-y-1 mb-4">
                  {pregunta.opciones.map((opcion) => {
                    const esSeleccionada = opcion.id === retro.opcionSeleccionadaId;
                    const esCorrecta = opcion.id === retro.opcionCorrectaId;
                    return (
                      <div
                        key={opcion.id}
                        className="flex items-start gap-2 px-3 py-2 rounded-lg text-sm"
                        style={esCorrecta
                          ? { background: 'rgba(39,174,96,0.20)', color: '#6ee7a0' }
                          : esSeleccionada
                          ? { background: 'rgba(231,76,60,0.20)', color: 'var(--error)' }
                          : { color: 'var(--text-secondary)' }}
                      >
                        <span className="shrink-0 mt-0.5">
                          {esCorrecta ? "✓" : esSeleccionada ? "✗" : "·"}
                        </span>
                        <span>
                          <strong>{opcion.letra}.</strong> {opcion.texto}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Explicación de la IA */}
                <div className="rounded-xl p-4" style={{ background: 'rgba(255, 255, 255, 0.40)', border: '1px solid var(--border-default)' }}>
                  <p className="text-xs font-semibold mb-1 uppercase tracking-wide" style={{ color: '#4A90D9' }}>
                    Explicación
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{retro.explicacion}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Botón volver */}
      <button
        onClick={onVolver}
        className="btn-primary w-full py-4 text-lg rounded-2xl"
      >
        Volver a la OPEC
      </button>
    </div>
  );
}
