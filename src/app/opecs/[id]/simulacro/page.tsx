"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { EscenarioCard } from "@/components/simulacro/EscenarioCard";
import { PreguntaTransversalCard } from "@/components/simulacro/PreguntaTransversalCard";
import { LikertCard } from "@/components/simulacro/LikertCard";
import { ResultadoScreen } from "@/components/simulacro/ResultadoScreen";

export interface Opcion {
  id: string;
  letra: string;
  texto: string;
  valorLikert: number | null;
}

export interface PreguntaSimulacro {
  id: string;
  tipo: "FUNCIONAL_ESPECIFICA" | "FUNCIONAL_TRANSVERSAL" | "COMPORTAMENTAL";
  texto: string;
  categoria: string;
  dificultad: string;
  opciones: Opcion[];
}

export interface EscenarioSimulacro {
  id: string;
  contenido: string;
  preguntas: PreguntaSimulacro[];
}

export interface RespuestaInput {
  preguntaId: string;
  opcionId?: string;
  valorLikert?: number;
}

type Estado = "cargando" | "activo" | "finalizando" | "resultado" | "error";

export default function SimulacroPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const [simulacroId, setSimulacroId] = useState<string | null>(null);
  const [escenarios, setEscenarios] = useState<EscenarioSimulacro[]>([]);
  const [preguntas, setPreguntas] = useState<PreguntaSimulacro[]>([]);
  const [respuestas, setRespuestas] = useState<Map<string, RespuestaInput>>(new Map());
  const [estado, setEstado] = useState<Estado>("cargando");
  const [resultado, setResultado] = useState<unknown>(null);
  const [error, setError] = useState<string | null>(null);

  // Aplanar todas las preguntas para la barra de progreso
  const todasLasPreguntas = [
    ...escenarios.flatMap((e) => e.preguntas),
    ...preguntas,
  ];
  const totalPreguntas = todasLasPreguntas.length;
  const respondidas = respuestas.size;

  // Iniciar simulacro
  useEffect(() => {
    const iniciar = async () => {
      try {
        const res = await fetch("/api/simulacros", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ opecId: params.id, tipoSimulacro: "MIXTO" }),
        });

        if (!res.ok) {
          const data = await res.json();
          setError(data.error ?? "Error iniciando simulacro");
          setEstado("error");
          return;
        }

        const data = await res.json();
        setSimulacroId(data.simulacroId);
        setEscenarios(data.escenarios ?? []);
        setPreguntas(data.preguntas ?? []);
        setEstado("activo");
      } catch {
        setError("Error de conexión. Verifica tu internet.");
        setEstado("error");
      }
    };

    iniciar();
  }, [params.id]);

  const guardarRespuesta = useCallback((resp: RespuestaInput) => {
    setRespuestas((prev) => new Map(prev).set(resp.preguntaId, resp));
  }, []);

  const finalizar = useCallback(async () => {
    if (!simulacroId) return;
    if (respondidas < totalPreguntas) {
      const confirmar = window.confirm(
        `Aún tienes ${totalPreguntas - respondidas} preguntas sin responder. ¿Finalizar de todas formas?`
      );
      if (!confirmar) return;
    }

    setEstado("finalizando");

    try {
      const res = await fetch(`/api/simulacros/${simulacroId}/finalizar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ respuestas: Array.from(respuestas.values()) }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Error al finalizar");
        setEstado("error");
        return;
      }

      setResultado(data);
      setEstado("resultado");
    } catch {
      setError("Error al enviar respuestas.");
      setEstado("error");
    }
  }, [simulacroId, respondidas, totalPreguntas, respuestas]);

  // ── Estados de carga / error ──
  if (estado === "cargando") {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin" style={{ borderColor: '#4A90D9', borderTopColor: 'transparent' }} />
        <p style={{ color: 'var(--text-secondary)' }}>Preparando tu simulacro...</p>
      </div>
    );
  }

  if (estado === "finalizando") {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin" style={{ borderColor: 'var(--success)', borderTopColor: 'transparent' }} />
        <p style={{ color: 'var(--text-secondary)' }}>Calculando tu puntaje...</p>
      </div>
    );
  }

  if (estado === "error") {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-4">
        <p className="text-4xl">❌</p>
        <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>{error}</p>
        <button
          onClick={() => router.back()}
          className="btn-primary px-5 py-2"
        >
          Volver
        </button>
      </div>
    );
  }

  if (estado === "resultado" && resultado) {
    return (
      <ResultadoScreen
        resultado={resultado}
        escenarios={escenarios}
        preguntas={preguntas}
        respuestas={respuestas}
        onVolver={() => router.push(`/opecs/${params.id}`)}
      />
    );
  }

  // ── Simulacro activo ──
  return (
    <div className="space-y-6 pb-8">
      {/* Barra de progreso */}
      <div className="sticky top-0 backdrop-blur pt-2 pb-3 z-10" style={{ background: 'rgba(250, 247, 242, 0.95)' }}>
        <div className="flex justify-between text-xs text-slate-400 mb-1">
          <span style={{ color: 'var(--text-secondary)' }}>{respondidas} / {totalPreguntas} respondidas</span>
          <span style={{ color: 'var(--text-secondary)' }}>{Math.round((respondidas / totalPreguntas) * 100)}%</span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300" style={{ background: 'linear-gradient(90deg,#2563EB,#4A90D9)', width: `${(respondidas / totalPreguntas) * 100}%` }}
          />
        </div>
      </div>

      {/* Escenarios de juicio situacional */}
      {escenarios.map((escenario, i) => (
        <EscenarioCard
          key={escenario.id}
          numero={i + 1}
          escenario={escenario}
          respuestas={respuestas}
          onRespuesta={guardarRespuesta}
        />
      ))}

      {/* Preguntas transversales y comportamentales */}
      {preguntas.map((pregunta, i) => (
        pregunta.tipo === "COMPORTAMENTAL" ? (
          <LikertCard
            key={pregunta.id}
            numero={escenarios.flatMap((e) => e.preguntas).length + i + 1}
            pregunta={pregunta}
            respuesta={respuestas.get(pregunta.id)}
            onRespuesta={guardarRespuesta}
          />
        ) : (
          <PreguntaTransversalCard
            key={pregunta.id}
            numero={escenarios.flatMap((e) => e.preguntas).length + i + 1}
            pregunta={pregunta}
            respuesta={respuestas.get(pregunta.id)}
            onRespuesta={guardarRespuesta}
          />
        )
      ))}

      {/* Botón finalizar */}
      <button
        onClick={finalizar}
        className="btn-primary w-full py-4 text-lg rounded-2xl"
      >
        Finalizar y ver resultados →
      </button>
    </div>
  );
}
