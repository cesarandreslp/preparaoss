"use client";

import { useState, useRef } from "react";

interface LoteResult {
  ok: boolean;
  pendientesTotal: number;
  bancosGenerados: number;
  errores: number;
  siguienteOffset: number;
  mensaje?: string;
}

export default function AdminPage() {
  const [batch, setBatch] = useState(10);
  const [loading, setLoading] = useState(false);
  const [log, setLog] = useState<string[]>([]);
  const [pendientesTotal, setPendientesTotal] = useState<number | null>(null);
  const [autoMode, setAutoMode] = useState(false);
  // Ref para que el loop pueda detenerse desde el botón "Detener" sin
  // depender del state (closure bug clásico).
  const autoStopRef = useRef(false);

  function addLog(msg: string) {
    setLog((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev]);
  }

  async function generarLote(): Promise<LoteResult | null> {
    setLoading(true);
    try {
      // Siempre offset 0 — los OPECs ya generadas salen del query (preguntas: { none })
      const res = await fetch(
        `/api/admin/generar-lote?batch=${batch}&offset=0`,
        { method: "POST" }
      );
      const data: LoteResult = await res.json();

      if (!res.ok) {
        addLog(`❌ Error HTTP ${res.status}`);
        return null;
      }

      if (data.mensaje) {
        addLog(`✅ ${data.mensaje}`);
        setPendientesTotal(0);
        return data;
      }

      setPendientesTotal(data.pendientesTotal - data.bancosGenerados);
      addLog(
        `✅ +${data.bancosGenerados} generadas · ${data.errores} errores · pendientes ${data.pendientesTotal - data.bancosGenerados}`
      );
      return data;
    } catch (e) {
      addLog(`❌ Error de red: ${e}`);
      return null;
    } finally {
      setLoading(false);
    }
  }

  async function handleManual() {
    await generarLote();
  }

  async function handleAuto() {
    autoStopRef.current = false;
    setAutoMode(true);
    let consecutiveZeros = 0;

    while (!autoStopRef.current) {
      const data = await generarLote();
      if (autoStopRef.current) break;

      // Error de red / timeout de Vercel — generarLote ya logueó el detalle.
      // Tratamos como "lote sin progreso" y aplicamos backoff abajo en lugar
      // de salir como si hubiéramos terminado.
      if (!data) {
        consecutiveZeros++;
        if (consecutiveZeros >= 5) {
          addLog("⏹ 5 errores seguidos — detengo auto-mode");
          break;
        }
        const wait = Math.min(30 + consecutiveZeros * 30, 120);
        addLog(`⏳ Reintentando tras error · ${wait}s (${consecutiveZeros}/5)`);
        await new Promise((r) => setTimeout(r, wait * 1000));
        continue;
      }

      // Done → ya no hay pendientes (data confirmada por la API)
      if (data.pendientesTotal === 0) {
        addLog("🎉 No quedan OPECs pendientes");
        break;
      }

      if (data.bancosGenerados === 0) {
        // Probablemente rate-limit Groq + Zhipu o errores persistentes.
        // Cooldown progresivo: 30s, 60s, 120s.
        consecutiveZeros++;
        if (consecutiveZeros >= 5) {
          addLog("⏹ 5 lotes seguidos sin generar — detengo auto-mode");
          break;
        }
        const wait = Math.min(30 + consecutiveZeros * 30, 120);
        addLog(`⏳ Sin progreso · esperando ${wait}s y reintento (${consecutiveZeros}/5)`);
        await new Promise((r) => setTimeout(r, wait * 1000));
      } else {
        consecutiveZeros = 0;
        // Pausa corta entre lotes exitosos
        await new Promise((r) => setTimeout(r, 3000));
      }
    }
    setAutoMode(false);
    addLog("⏹ Auto-mode detenido");
  }

  function detenerAuto() {
    autoStopRef.current = true;
    setAutoMode(false);
  }

  const navCards = [
    { href: "/admin/membresias",         icon: "💎", title: "Membresías",        sub: "Planes y usuarios" },
    { href: "/admin/configuracion",      icon: "✉️", title: "Email SMTP",        sub: "Configuración de correo" },
    { href: "/admin/documentos",         icon: "📚", title: "Documentos",        sub: "Manuales y guías por OPEC" },
    { href: "/admin/concursos",          icon: "🎯", title: "Concursos CNSC",    sub: "Slider de landing · CMS" },
    { href: "/admin/convocatorias",      icon: "📅", title: "Fechas de examen",  sub: "Cronograma por convocatoria" },
    { href: "/admin/biblioteca",         icon: "📖", title: "Biblioteca",        sub: "Leyes y normas · subir PDFs" },
    { href: "/admin/entidades-especiales", icon: "🏛️", title: "Régimen especial", sub: "Procuraduría · Banrep · scraping" },
    { href: "/dashboard",                icon: "📊", title: "Dashboard",         sub: "Vista de usuario" },
  ];

  return (
    <main className="min-h-screen noise-overlay" style={{ background: "var(--gradient-hero)" }}>
      <div className="container-app section">
        <header className="mb-10">
          <span className="eyebrow">Panel admin</span>
          <h1 className="display-2 mt-3">🛠️ Centro de control</h1>
          <p className="mt-3 text-base max-w-xl" style={{ color: "var(--text-secondary)" }}>
            Generación masiva de bancos de preguntas y CMS de toda la plataforma.
          </p>
        </header>

        {/* Nav cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {navCards.map((c) => (
            <a key={c.href} href={c.href} className="card flex items-center gap-4 group">
              <span className="text-3xl shrink-0">{c.icon}</span>
              <div className="min-w-0">
                <p className="font-bold transition-colors group-hover:text-[#003893]" style={{ fontFamily: "var(--font-display)" }}>
                  {c.title}
                </p>
                <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                  {c.sub}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* Stats */}
        <section className="card-elevated p-6 mb-8">
          <div className="grid grid-cols-3 gap-6">
            <div>
              <p className="text-xs uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                OPECs pendientes
              </p>
              <p
                className="text-4xl font-extrabold mt-1 text-gradient-gold"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {pendientesTotal === null ? "—" : pendientesTotal.toLocaleString("es-CO")}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                Estado
              </p>
              <p
                className="text-4xl font-extrabold mt-1"
                style={{ fontFamily: "var(--font-display)", color: autoMode ? "var(--btn-red)" : "var(--btn-blue)" }}
              >
                {autoMode ? "AUTO" : loading ? "…" : "—"}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                Batch size
              </p>
              <input
                type="number"
                value={batch}
                min={1}
                max={50}
                onChange={(e) => setBatch(parseInt(e.target.value) || 10)}
                className="text-4xl font-extrabold mt-1 bg-transparent w-24 outline-none"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--success)",
                  borderBottom: "1px solid var(--border-default)",
                }}
              />
            </div>
          </div>
        </section>

        {/* Botones */}
        <div className="flex gap-3 flex-wrap mb-8">
          <button
            onClick={handleManual}
            disabled={loading}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading && !autoMode ? "⏳ Generando…" : "▶ Generar 1 lote"}
          </button>

          <button
            onClick={autoMode ? detenerAuto : handleAuto}
            disabled={loading && !autoMode}
            className={`btn-primary ${autoMode ? "is-red" : ""} disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {autoMode ? "⏹ Detener auto" : "🚀 Modo automático (lote tras lote)"}
          </button>

          <button
            onClick={() => setLog([])}
            disabled={loading}
            className="btn-secondary disabled:opacity-50"
          >
            ↺ Limpiar log
          </button>
        </div>

        {/* Log */}
        <section>
          <span className="eyebrow">Log de ejecución</span>
          <div
            className="mt-3 rounded-2xl p-4 h-96 overflow-y-auto font-mono text-sm border"
            style={{
              background: "var(--bg-card)",
              borderColor: "var(--border-default)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            {log.length === 0 ? (
              <p style={{ color: "var(--text-muted)" }}>El log aparecerá aquí cuando inicies la generación…</p>
            ) : (
              log.map((line, i) => (
                <p
                  key={i}
                  className="py-1.5"
                  style={{
                    borderBottom: "1px solid var(--border-subtle)",
                    color: "var(--text-primary)",
                  }}
                >
                  {line}
                </p>
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
