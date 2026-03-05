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
    if (p >= 80) return "text-green-400";
    if (p >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Puntaje total */}
      <div className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-2xl p-6 text-center">
        <p className="text-slate-400 text-sm mb-1">Puntaje total</p>
        <p className={`text-6xl font-bold mb-2 ${colorPuntaje(r.puntajeTotal)}`}>
          {r.puntajeTotal}%
        </p>
        <p className="text-indigo-400 font-medium">+{r.xpGanado} XP ganados 🔥</p>

        {r.badgesNuevos.length > 0 && (
          <div className="mt-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-3">
            <p className="text-yellow-400 text-sm font-semibold mb-1">¡Nuevos logros!</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {r.badgesNuevos.map((b) => (
                <span key={b} className="bg-yellow-500/20 text-yellow-300 text-xs px-3 py-1 rounded-full">
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
            className="bg-white/5 border border-white/10 rounded-xl p-3 text-center"
          >
            <p className={`text-2xl font-bold ${item.value !== null ? colorPuntaje(item.value) : "text-slate-500"}`}>
              {item.value !== null ? `${item.value}%` : "N/A"}
            </p>
            <p className="text-slate-400 text-xs mt-1">{item.label}</p>
          </div>
        ))}
      </div>

      {/* ─── RETROALIMENTACIÓN ───────────────────────────────
          Se muestra AL FINAL del simulacro (nunca durante)
          Justifica cada respuesta con la explicación de la IA
      ───────────────────────────────────────────────────── */}
      <div>
        <h2 className="text-white font-bold text-lg mb-4">📋 Retroalimentación</h2>

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
                className={`rounded-2xl border p-5 ${
                  retro.esCorrecta
                    ? "bg-green-600/10 border-green-500/30"
                    : "bg-red-600/10 border-red-500/30"
                }`}
              >
                {/* Número + resultado */}
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-lg ${retro.esCorrecta ? "text-green-400" : "text-red-400"}`}>
                    {retro.esCorrecta ? "✅" : "❌"}
                  </span>
                  <span className="text-xs text-slate-400">Pregunta {i + 1}</span>
                  <span className="text-xs text-slate-500 ml-auto">{pregunta.categoria}</span>
                </div>

                {/* Texto de la pregunta */}
                <p className="text-white text-sm font-medium mb-3 leading-relaxed">
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
                        className={`flex items-start gap-2 px-3 py-2 rounded-lg text-sm ${
                          esCorrecta
                            ? "bg-green-500/20 text-green-200"
                            : esSeleccionada
                            ? "bg-red-500/20 text-red-200"
                            : "text-slate-400"
                        }`}
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
                <div className="bg-white/5 rounded-xl p-4">
                  <p className="text-xs text-indigo-400 font-semibold mb-1 uppercase tracking-wide">
                    Explicación
                  </p>
                  <p className="text-slate-300 text-sm leading-relaxed">{retro.explicacion}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Botón volver */}
      <button
        onClick={onVolver}
        className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 rounded-2xl font-bold text-white text-lg transition-colors"
      >
        Volver a la OPEC
      </button>
    </div>
  );
}
