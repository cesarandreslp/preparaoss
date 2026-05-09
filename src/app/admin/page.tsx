"use client";

import { useState } from "react";

interface LoteResult {
  ok: boolean;
  pendientesTotal: number;
  bancosGenerados: number;
  errores: number;
  siguienteOffset: number;
  mensaje?: string;
}

export default function AdminPage() {
  const [offset, setOffset] = useState(0);
  const [batch, setBatch] = useState(50);
  const [loading, setLoading] = useState(false);
  const [log, setLog] = useState<string[]>([]);
  const [pendientesTotal, setPendientesTotal] = useState<number | null>(null);
  const [autoMode, setAutoMode] = useState(false);

  function addLog(msg: string) {
    setLog((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev]);
  }

  async function generarLote(currentOffset: number, auto = false): Promise<number> {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/admin/generar-lote?batch=${batch}&offset=${currentOffset}`,
        { method: "POST" }
      );
      const data: LoteResult = await res.json();

      if (!res.ok) {
        addLog(`❌ Error HTTP ${res.status}`);
        return -1;
      }

      if (data.mensaje) {
        addLog(`✅ ${data.mensaje}`);
        setPendientesTotal(0);
        return -1;
      }

      setPendientesTotal(data.pendientesTotal - data.bancosGenerados);
      addLog(
        `✅ Offset ${currentOffset}: +${data.bancosGenerados} generadas, ${data.errores} errores. Pendientes: ${data.pendientesTotal - data.bancosGenerados}`
      );
      setOffset(data.siguienteOffset);

      if (auto && data.bancosGenerados > 0 && data.pendientesTotal - data.bancosGenerados > 0) {
        // Pausa 3s entre lotes para respetar rate limit de Groq
        addLog(`⏳ Esperando 3s antes del siguiente lote...`);
        await new Promise((r) => setTimeout(r, 3000));
        return data.siguienteOffset;
      }
      return data.siguienteOffset;
    } catch (e) {
      addLog(`❌ Error de red: ${e}`);
      return -1;
    } finally {
      setLoading(false);
    }
  }

  async function handleManual() {
    await generarLote(offset);
  }

  async function handleAuto() {
    setAutoMode(true);
    let current = offset;
    while (current >= 0) {
      current = await generarLote(current, true);
      if (current < 0) break;
      if (!autoMode) break; // usuario detuvo
    }
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
          <p className="text-gray-500 text-sm">Offset actual</p>
          <p className="text-4xl font-bold text-blue-400">{offset}</p>
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
          onClick={autoMode ? () => setAutoMode(false) : handleAuto}
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
          onClick={() => { setOffset(0); setLog([]); }}
          disabled={loading}
          className="bg-gray-700 hover:bg-gray-600 disabled:opacity-50 px-6 py-3 rounded-lg font-semibold transition"
        >
          ↺ Reiniciar offset
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
