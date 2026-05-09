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

      // Done → ya no hay pendientes
      if (!data || data.pendientesTotal === 0) {
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

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <h1 className="text-3xl font-bold mb-2">🛠️ Panel Admin</h1>
      <p className="text-gray-400 mb-6">Generación masiva de bancos de preguntas IA</p>

      {/* Nav cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
        <a href="/admin/membresias" className="bg-gray-900 hover:bg-gray-800 border border-gray-800 rounded-xl p-4 flex items-center gap-3 transition">
          <span className="text-2xl">💎</span>
          <div>
            <p className="font-semibold">Membresías</p>
            <p className="text-gray-500 text-xs">Planes y usuarios</p>
          </div>
        </a>
        <a href="/admin/configuracion" className="bg-gray-900 hover:bg-gray-800 border border-gray-800 rounded-xl p-4 flex items-center gap-3 transition">
          <span className="text-2xl">✉️</span>
          <div>
            <p className="font-semibold">Email SMTP</p>
            <p className="text-gray-500 text-xs">Configuración de correo</p>
          </div>
        </a>
        <a href="/admin/documentos" className="bg-gray-900 hover:bg-gray-800 border border-gray-800 rounded-xl p-4 flex items-center gap-3 transition">
          <span className="text-2xl">📚</span>
          <div>
            <p className="font-semibold">Documentos</p>
            <p className="text-gray-500 text-xs">Manuales y guías por OPEC</p>
          </div>
        </a>
        <a href="/admin/concursos" className="bg-gray-900 hover:bg-gray-800 border border-gray-800 rounded-xl p-4 flex items-center gap-3 transition">
          <span className="text-2xl">🎯</span>
          <div>
            <p className="font-semibold">Concursos CNSC</p>
            <p className="text-gray-500 text-xs">Slider de landing · CMS</p>
          </div>
        </a>
        <a href="/admin/biblioteca" className="bg-gray-900 hover:bg-gray-800 border border-gray-800 rounded-xl p-4 flex items-center gap-3 transition">
          <span className="text-2xl">📖</span>
          <div>
            <p className="font-semibold">Biblioteca</p>
            <p className="text-gray-500 text-xs">Leyes y normas · subir PDFs</p>
          </div>
        </a>
        <a href="/admin/entidades-especiales" className="bg-gray-900 hover:bg-gray-800 border border-gray-800 rounded-xl p-4 flex items-center gap-3 transition">
          <span className="text-2xl">🏛️</span>
          <div>
            <p className="font-semibold">Régimen especial</p>
            <p className="text-gray-500 text-xs">Procuraduría, Banrep · scraping</p>
          </div>
        </a>
        <a href="/dashboard" className="bg-gray-900 hover:bg-gray-800 border border-gray-800 rounded-xl p-4 flex items-center gap-3 transition">
          <span className="text-2xl">📊</span>
          <div>
            <p className="font-semibold">Dashboard</p>
            <p className="text-gray-500 text-xs">Vista de usuario</p>
          </div>
        </a>
      </div>

      {/* Stats */}
      <div className="bg-gray-900 rounded-xl p-6 mb-6 flex gap-8">
        <div>
          <p className="text-gray-500 text-sm">OPECs pendientes</p>
          <p className="text-4xl font-bold text-yellow-400">
            {pendientesTotal === null ? "—" : pendientesTotal.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Estado</p>
          <p className="text-4xl font-bold text-blue-400">
            {autoMode ? "AUTO" : loading ? "..." : "—"}
          </p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Batch size</p>
          <input
            type="number"
            value={batch}
            min={1}
            max={100}
            onChange={(e) => setBatch(parseInt(e.target.value) || 50)}
            className="text-4xl font-bold text-green-400 bg-transparent w-24 border-b border-gray-700 focus:outline-none"
          />
        </div>
      </div>

      {/* Botones */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={handleManual}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-6 py-3 rounded-lg font-semibold transition"
        >
          {loading && !autoMode ? "⏳ Generando..." : "▶ Generar 1 lote"}
        </button>

        <button
          onClick={autoMode ? detenerAuto : handleAuto}
          disabled={loading && !autoMode}
          className={`px-6 py-3 rounded-lg font-semibold transition ${
            autoMode
              ? "bg-red-600 hover:bg-red-700"
              : "bg-green-600 hover:bg-green-700 disabled:opacity-50"
          }`}
        >
          {autoMode ? "⏹ Detener auto" : "🚀 Modo automático (lote tras lote)"}
        </button>

        <button
          onClick={() => setLog([])}
          disabled={loading}
          className="bg-gray-700 hover:bg-gray-600 disabled:opacity-50 px-6 py-3 rounded-lg font-semibold transition"
        >
          ↺ Limpiar log
        </button>
      </div>

      {/* Log */}
      <div className="bg-gray-900 rounded-xl p-4 h-96 overflow-y-auto font-mono text-sm">
        {log.length === 0 ? (
          <p className="text-gray-600">El log aparecerá aquí...</p>
        ) : (
          log.map((line, i) => (
            <p key={i} className="border-b border-gray-800 py-1">{line}</p>
          ))
        )}
      </div>
    </div>
  );
}
