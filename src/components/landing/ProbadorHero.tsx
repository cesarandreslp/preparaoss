"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

// Gancho top-of-funnel del plan: "Consulta tu OPEC → 5 preguntas gratis →
// desbloquea el simulacro completo". Sin registro para catar; captura el
// correo justo cuando el aspirante ya vio su resultado (máxima intención).

type OpecLite = {
  id: string;
  nombreCargo: string;
  entidad: string;
  numerConvocatoria?: string | null;
  _count?: { preguntas: number };
};

type Opcion = { letra: string; texto: string; esCorrecta: boolean };
type Pregunta = {
  id: string;
  texto: string;
  categoria: string;
  explicacion: string;
  opciones: Opcion[];
};

export function ProbadorHero() {
  const [query, setQuery] = useState("");
  const [resultados, setResultados] = useState<OpecLite[]>([]);
  const [abierto, setAbierto] = useState(false);
  const [opec, setOpec] = useState<OpecLite | null>(null);

  const [preguntas, setPreguntas] = useState<Pregunta[]>([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [respuestas, setRespuestas] = useState<Record<string, string>>({});

  const [emailEnviado, setEmailEnviado] = useState(false);
  const [email, setEmail] = useState("");
  const [enviando, setEnviando] = useState(false);

  const debounce = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Búsqueda de OPEC (debounced) contra el API público existente.
  useEffect(() => {
    if (opec) return; // ya elegida
    if (query.trim().length < 3) {
      setResultados([]);
      return;
    }
    if (debounce.current) clearTimeout(debounce.current);
    debounce.current = setTimeout(async () => {
      try {
        const r = await fetch(`/api/opecs?q=${encodeURIComponent(query.trim())}`);
        const data = await r.json();
        setResultados((data.opecs ?? []).slice(0, 6));
        setAbierto(true);
      } catch {
        /* silencioso: es un buscador de landing */
      }
    }, 300);
    return () => {
      if (debounce.current) clearTimeout(debounce.current);
    };
  }, [query, opec]);

  async function elegirOpec(o: OpecLite) {
    setOpec(o);
    setAbierto(false);
    setQuery(o.nombreCargo);
    setCargando(true);
    setError(null);
    try {
      const r = await fetch(`/api/probar/${o.id}`);
      const data = await r.json();
      if (!r.ok) {
        setError(data.error ?? "No se pudo cargar el simulacro.");
        setPreguntas([]);
      } else {
        setPreguntas(data.preguntas ?? []);
      }
    } catch {
      setError("Falla de red. Intenta de nuevo.");
    } finally {
      setCargando(false);
    }
  }

  function reiniciar() {
    setOpec(null);
    setPreguntas([]);
    setRespuestas({});
    setQuery("");
    setResultados([]);
    setError(null);
    setEmailEnviado(false);
  }

  const totalRespondidas = Object.keys(respuestas).length;
  const terminado = preguntas.length > 0 && totalRespondidas === preguntas.length;
  const aciertos = preguntas.reduce((acc, p) => {
    const elegida = respuestas[p.id];
    const correcta = p.opciones.find((o) => o.esCorrecta)?.letra;
    return acc + (elegida && elegida === correcta ? 1 : 0);
  }, 0);
  const score =
    preguntas.length > 0 ? Math.round((aciertos / preguntas.length) * 100) : 0;

  async function capturar(e: React.FormEvent) {
    e.preventDefault();
    setEnviando(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          opecId: opec?.id,
          source: "probador",
          score,
        }),
      });
      setEmailEnviado(true);
    } catch {
      // Aun si falla el guardado, dejamos avanzar al registro.
      setEmailEnviado(true);
    } finally {
      setEnviando(false);
    }
  }

  // ── UI ──
  return (
    <div className="card-glow p-6 md:p-8">
      {/* Paso 1: buscar OPEC */}
      {!opec && (
        <>
          <p className="text-xs uppercase tracking-wider mb-2" style={{ color: "var(--text-muted)" }}>
            Pruébalo ahora · sin registro
          </p>
          <h3 className="text-xl font-bold mb-4">Digita tu OPEC y resuelve 5 preguntas reales</h3>
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => resultados.length && setAbierto(true)}
              placeholder="Cargo, entidad o número de convocatoria…"
              className="w-full px-4 py-3 rounded-xl text-base outline-none"
              style={{
                background: "rgba(10,10,10,0.03)",
                border: "1px solid var(--border-default)",
                color: "var(--text-primary)",
              }}
            />
            {abierto && resultados.length > 0 && (
              <ul
                className="absolute z-20 mt-2 w-full rounded-xl overflow-hidden shadow-xl"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border-default)" }}
              >
                {resultados.map((o) => (
                  <li key={o.id}>
                    <button
                      type="button"
                      onClick={() => elegirOpec(o)}
                      className="w-full text-left px-4 py-3 hover:bg-black/5 transition-colors"
                    >
                      <p className="text-sm font-semibold leading-snug">{o.nombreCargo}</p>
                      <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                        {o.entidad}
                        {o.numerConvocatoria ? ` · ${o.numerConvocatoria}` : ""}
                      </p>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <p className="mt-3 text-xs" style={{ color: "var(--text-muted)" }}>
            Escribe al menos 3 letras. Datos directos de SIMO-CNSC.
          </p>
        </>
      )}

      {/* Cargando / error */}
      {opec && cargando && (
        <p className="text-sm py-8 text-center" style={{ color: "var(--text-muted)" }}>
          Preparando tus preguntas…
        </p>
      )}
      {opec && error && (
        <div className="py-4">
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{error}</p>
          <button type="button" onClick={reiniciar} className="btn-secondary mt-4">
            Buscar otra OPEC
          </button>
        </div>
      )}

      {/* Paso 2: preguntas */}
      {opec && !cargando && preguntas.length > 0 && (
        <>
          <div className="flex items-start justify-between gap-3 mb-5">
            <div>
              <p className="text-sm font-bold leading-snug">{opec.nombreCargo}</p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>{opec.entidad}</p>
            </div>
            <button
              type="button"
              onClick={reiniciar}
              className="text-xs shrink-0"
              style={{ color: "var(--text-muted)" }}
            >
              cambiar
            </button>
          </div>

          <div className="space-y-6">
            {preguntas.map((p, i) => {
              const elegida = respuestas[p.id];
              const correcta = p.opciones.find((o) => o.esCorrecta)?.letra;
              const respondida = Boolean(elegida);
              return (
                <div key={p.id}>
                  <p className="text-xs uppercase tracking-wider mb-1.5" style={{ color: "var(--text-muted)" }}>
                    Pregunta {i + 1} de {preguntas.length} · {p.categoria}
                  </p>
                  <p className="text-sm font-medium leading-relaxed mb-3">{p.texto}</p>
                  <div className="space-y-2">
                    {p.opciones.map((o) => {
                      let estado: "default" | "correct" | "wrong" | "muted" = "default";
                      if (respondida) {
                        if (o.letra === correcta) estado = "correct";
                        else if (o.letra === elegida) estado = "wrong";
                        else estado = "muted";
                      }
                      return (
                        <button
                          type="button"
                          key={o.letra}
                          disabled={respondida}
                          onClick={() => setRespuestas((r) => ({ ...r, [p.id]: o.letra }))}
                          className="w-full flex items-center gap-3 p-3 rounded-lg border text-left transition-colors disabled:cursor-default"
                          style={{
                            background:
                              estado === "correct"
                                ? "rgba(34,197,94,0.08)"
                                : estado === "wrong"
                                ? "rgba(239,68,68,0.06)"
                                : "rgba(10,10,10,0.02)",
                            borderColor:
                              estado === "correct"
                                ? "rgba(34,197,94,0.40)"
                                : estado === "wrong"
                                ? "rgba(239,68,68,0.30)"
                                : "var(--border-subtle)",
                            opacity: estado === "muted" ? 0.55 : 1,
                          }}
                        >
                          <span
                            className="w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold shrink-0"
                            style={{
                              background:
                                estado === "correct"
                                  ? "var(--success)"
                                  : estado === "wrong"
                                  ? "var(--error)"
                                  : "rgba(10,10,10,0.06)",
                              color: estado === "default" || estado === "muted" ? "var(--text-secondary)" : "white",
                            }}
                          >
                            {o.letra}
                          </span>
                          <span className="text-sm flex-1">{o.texto}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Paso 3: muro de correo + resultado */}
          {terminado && (
            <div
              className="mt-8 pt-6 border-t"
              style={{ borderColor: "var(--border-subtle)" }}
            >
              {!emailEnviado ? (
                <>
                  <p className="text-lg font-bold">
                    Acertaste {aciertos} de {preguntas.length}{" "}
                    <span className="text-gradient-gold">({score}%)</span>
                  </p>
                  <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                    Déjanos tu correo y desbloquea el <strong>simulacro completo</strong> de tu
                    OPEC —100 preguntas con explicación detallada— más el material de estudio.
                  </p>
                  <form onSubmit={capturar} className="mt-4 flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu@correo.com"
                      className="flex-1 px-4 py-3 rounded-xl text-base outline-none"
                      style={{
                        background: "rgba(10,10,10,0.03)",
                        border: "1px solid var(--border-default)",
                        color: "var(--text-primary)",
                      }}
                    />
                    <button type="submit" disabled={enviando} className="btn-primary px-6 py-3 disabled:opacity-60">
                      {enviando ? "Enviando…" : "Desbloquear →"}
                    </button>
                  </form>
                  <p className="mt-2 text-xs" style={{ color: "var(--text-muted)" }}>
                    Sin spam. Material de estudio de tu convocatoria y avisos de fechas.
                  </p>
                </>
              ) : (
                <div className="text-center py-2">
                  <p className="text-lg font-bold text-gradient-gold">¡Listo! 🎯</p>
                  <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                    Crea tu cuenta gratis para generar el simulacro completo de{" "}
                    {opec.nombreCargo}.
                  </p>
                  <Link
                    href={`/registro?email=${encodeURIComponent(email)}&opec=${opec.id}`}
                    className="btn-primary mt-4 inline-flex px-8 py-3"
                  >
                    Crear mi cuenta gratis →
                  </Link>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
