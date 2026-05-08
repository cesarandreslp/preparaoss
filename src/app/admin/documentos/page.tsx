"use client";

import { useEffect, useState, useCallback } from "react";

type DocumentType =
  | "MANUAL_FUNCIONES"
  | "GUIA_ORIENTACION"
  | "EJES_TEMATICOS"
  | "DOCUMENTO_ENTIDAD"
  | "OTHER";

interface OpecLite {
  id: string;
  simoId: string;
  nombreCargo: string;
  entidad: string;
  numerConvocatoria: string | null;
  _count: { preguntas: number; inscripciones: number };
}

interface Doc {
  id: string;
  type: DocumentType;
  fileName: string;
  fileSize: number;
  isParsed: boolean;
  ocrUsed: boolean;
  parseError: string | null;
  uploadedAt: string;
  parsedChars: number;
}

const TYPE_LABEL: Record<DocumentType, string> = {
  MANUAL_FUNCIONES: "Manual de funciones",
  GUIA_ORIENTACION: "Guía de orientación",
  EJES_TEMATICOS: "Ejes temáticos",
  DOCUMENTO_ENTIDAD: "Documento de entidad",
  OTHER: "Otro",
};

const TYPE_COLOR: Record<DocumentType, string> = {
  MANUAL_FUNCIONES: "bg-blue-900 text-blue-200",
  GUIA_ORIENTACION: "bg-purple-900 text-purple-200",
  EJES_TEMATICOS: "bg-green-900 text-green-200",
  DOCUMENTO_ENTIDAD: "bg-amber-900 text-amber-200",
  OTHER: "bg-gray-700 text-gray-200",
};

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export default function AdminDocumentosPage() {
  const [query, setQuery] = useState("");
  const [resultados, setResultados] = useState<OpecLite[]>([]);
  const [buscando, setBuscando] = useState(false);
  const [opec, setOpec] = useState<OpecLite | null>(null);

  const [docs, setDocs] = useState<Doc[]>([]);
  const [cargandoDocs, setCargandoDocs] = useState(false);

  const [archivo, setArchivo] = useState<File | null>(null);
  const [tipoDoc, setTipoDoc] = useState<DocumentType>("MANUAL_FUNCIONES");
  const [subiendo, setSubiendo] = useState(false);
  const [mensaje, setMensaje] = useState<{ tipo: "ok" | "error"; texto: string } | null>(null);

  const [generando, setGenerando] = useState(false);
  const [limpiarPrevias, setLimpiarPrevias] = useState(false);

  // Búsqueda OPEC con debounce simple
  useEffect(() => {
    if (query.trim().length < 3) {
      setResultados([]);
      return;
    }
    const t = setTimeout(async () => {
      setBuscando(true);
      try {
        const res = await fetch(`/api/opecs?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResultados(data.opecs ?? []);
      } finally {
        setBuscando(false);
      }
    }, 350);
    return () => clearTimeout(t);
  }, [query]);

  const cargarDocs = useCallback(async (opecId: string) => {
    setCargandoDocs(true);
    try {
      const res = await fetch(`/api/admin/documents?opecId=${opecId}`);
      const data = await res.json();
      setDocs(data.documents ?? []);
    } finally {
      setCargandoDocs(false);
    }
  }, []);

  useEffect(() => {
    if (opec) cargarDocs(opec.id);
  }, [opec, cargarDocs]);

  async function handleSubir() {
    if (!archivo || !opec) return;
    setSubiendo(true);
    setMensaje(null);
    try {
      const fd = new FormData();
      fd.append("file", archivo);
      fd.append("opecId", opec.id);
      fd.append("type", tipoDoc);
      const res = await fetch("/api/admin/documents/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) {
        setMensaje({ tipo: "error", texto: data.error ?? `HTTP ${res.status}` });
      } else {
        setMensaje({
          tipo: "ok",
          texto: `Subido: ${data.fileName} · ${data.parsedChars.toLocaleString()} chars${data.ocrUsed ? " (OCR aplicado)" : ""}`,
        });
        setArchivo(null);
        // limpiar input file
        const input = document.getElementById("doc-file") as HTMLInputElement | null;
        if (input) input.value = "";
        await cargarDocs(opec.id);
      }
    } catch (e) {
      setMensaje({ tipo: "error", texto: e instanceof Error ? e.message : "Error de red" });
    } finally {
      setSubiendo(false);
    }
  }

  async function handleEliminar(docId: string, fileName: string) {
    if (!confirm(`¿Eliminar el documento "${fileName}"?`)) return;
    const res = await fetch(`/api/admin/documents/${docId}`, { method: "DELETE" });
    if (res.ok && opec) {
      await cargarDocs(opec.id);
      setMensaje({ tipo: "ok", texto: "Documento eliminado" });
    } else {
      const data = await res.json().catch(() => ({}));
      setMensaje({ tipo: "error", texto: data.error ?? `HTTP ${res.status}` });
    }
  }

  async function handleGenerar() {
    if (!opec) return;
    if (
      limpiarPrevias &&
      opec._count.preguntas > 0 &&
      !confirm(
        `Esto borrará las ${opec._count.preguntas} preguntas existentes para esta OPEC y generará un banco nuevo. ¿Continuar?`
      )
    ) {
      return;
    }
    setGenerando(true);
    setMensaje(null);
    try {
      const res = await fetch(`/api/admin/opecs/${opec.id}/generar-preguntas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ limpiarPrevias }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMensaje({
          tipo: "error",
          texto: data.error + (data.sugerencia ? ` — ${data.sugerencia}` : ""),
        });
      } else {
        setMensaje({
          tipo: "ok",
          texto: `Banco generado: ${data.resultado.total} preguntas (usando ${data.documentosUsados} documentos)`,
        });
        // refrescar contador
        setOpec({
          ...opec,
          _count: { ...opec._count, preguntas: data.resultado.total + (limpiarPrevias ? 0 : opec._count.preguntas) },
        });
      }
    } catch (e) {
      setMensaje({ tipo: "error", texto: e instanceof Error ? e.message : "Error de red" });
    } finally {
      setGenerando(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="flex items-center gap-2 text-gray-500 text-sm mb-6">
        <a href="/admin" className="hover:text-gray-300 transition">🛠️ Admin</a>
        <span>›</span>
        <span className="text-white">Documentos por OPEC</span>
      </div>

      <h1 className="text-3xl font-bold mb-1">📚 Documentos por OPEC</h1>
      <p className="text-gray-400 mb-8">
        Sube manuales y guías oficiales. La IA los usará como contexto al generar preguntas.
      </p>

      {/* Buscador OPEC */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-6">
        <label className="block text-sm font-semibold text-gray-300 mb-2">Buscar OPEC</label>
        <input
          type="text"
          placeholder="Cargo, entidad, simoId o convocatoria (mín. 3 caracteres)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
        />

        {buscando && <p className="text-gray-500 text-xs mt-2">Buscando...</p>}

        {resultados.length > 0 && !opec && (
          <div className="mt-3 space-y-2 max-h-64 overflow-y-auto">
            {resultados.map((o) => (
              <button
                key={o.id}
                onClick={() => {
                  setOpec(o);
                  setQuery("");
                  setResultados([]);
                }}
                className="w-full text-left bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg p-3 transition"
              >
                <p className="font-semibold text-sm">{o.nombreCargo}</p>
                <p className="text-xs text-gray-400">
                  {o.entidad} · simoId: {o.simoId}
                  {o.numerConvocatoria ? ` · conv. ${o.numerConvocatoria}` : ""}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {o._count.preguntas} preguntas · {o._count.inscripciones} inscritos
                </p>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* OPEC seleccionada + gestión */}
      {opec && (
        <>
          <div className="bg-gray-900 border border-blue-700 rounded-xl p-5 mb-6">
            <div className="flex justify-between items-start gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">OPEC seleccionada</p>
                <h2 className="font-bold text-lg">{opec.nombreCargo}</h2>
                <p className="text-sm text-gray-400">{opec.entidad}</p>
                <p className="text-xs text-gray-500 mt-1">
                  simoId: <span className="font-mono">{opec.simoId}</span> ·{" "}
                  {opec._count.preguntas} preguntas existentes
                </p>
              </div>
              <button
                onClick={() => {
                  setOpec(null);
                  setDocs([]);
                  setMensaje(null);
                }}
                className="text-gray-500 hover:text-white text-xs"
              >
                Cambiar
              </button>
            </div>
          </div>

          {/* Mensaje global */}
          {mensaje && (
            <div
              className={`rounded-lg p-3 mb-6 text-sm border ${
                mensaje.tipo === "ok"
                  ? "bg-green-950 border-green-800 text-green-300"
                  : "bg-red-950 border-red-800 text-red-300"
              }`}
            >
              {mensaje.tipo === "ok" ? "✅ " : "❌ "}
              {mensaje.texto}
            </div>
          )}

          {/* Subir documento */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-6">
            <h3 className="font-semibold mb-3">📤 Subir documento</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Tipo</label>
                <select
                  value={tipoDoc}
                  onChange={(e) => setTipoDoc(e.target.value as DocumentType)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                >
                  {(Object.keys(TYPE_LABEL) as DocumentType[]).map((t) => (
                    <option key={t} value={t}>
                      {TYPE_LABEL[t]}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">Archivo (PDF, DOCX, TXT, PNG, JPG, WEBP — máx. 15MB)</label>
                <input
                  id="doc-file"
                  type="file"
                  accept=".pdf,.docx,.txt,.png,.jpg,.jpeg,.webp"
                  onChange={(e) => setArchivo(e.target.files?.[0] ?? null)}
                  className="w-full text-sm file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:cursor-pointer"
                />
              </div>
            </div>

            <button
              onClick={handleSubir}
              disabled={!archivo || subiendo}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed px-5 py-2 rounded-lg text-sm font-semibold transition"
            >
              {subiendo ? "⏳ Procesando (puede tomar 1-2 min con OCR)..." : "📤 Subir y procesar"}
            </button>
          </div>

          {/* Lista de documentos */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-6">
            <h3 className="font-semibold mb-3">📁 Documentos cargados ({docs.length})</h3>

            {cargandoDocs ? (
              <p className="text-gray-500 text-sm">Cargando...</p>
            ) : docs.length === 0 ? (
              <p className="text-gray-500 text-sm">Aún no hay documentos para esta OPEC.</p>
            ) : (
              <div className="space-y-2">
                {docs.map((d) => (
                  <div
                    key={d.id}
                    className="bg-gray-800 border border-gray-700 rounded-lg p-3 flex justify-between items-start gap-3"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className={`text-xs px-2 py-0.5 rounded ${TYPE_COLOR[d.type]}`}>
                          {TYPE_LABEL[d.type]}
                        </span>
                        {d.ocrUsed && (
                          <span className="text-xs px-2 py-0.5 rounded bg-orange-900 text-orange-200">
                            OCR
                          </span>
                        )}
                        {!d.isParsed && (
                          <span className="text-xs px-2 py-0.5 rounded bg-red-900 text-red-200">
                            sin parsear
                          </span>
                        )}
                      </div>
                      <p className="font-mono text-sm truncate">{d.fileName}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatBytes(d.fileSize)} · {d.parsedChars.toLocaleString()} chars ·{" "}
                        {new Date(d.uploadedAt).toLocaleDateString("es-CO")}
                      </p>
                      {d.parseError && (
                        <p className="text-xs text-red-400 mt-1 truncate">⚠️ {d.parseError}</p>
                      )}
                    </div>

                    <button
                      onClick={() => handleEliminar(d.id, d.fileName)}
                      className="text-red-400 hover:text-red-300 text-xs whitespace-nowrap"
                    >
                      🗑️ Eliminar
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Generar/Regenerar banco */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <h3 className="font-semibold mb-2">🤖 Generar banco de preguntas</h3>
            <p className="text-gray-400 text-sm mb-4">
              {docs.filter((d) => d.isParsed).length > 0
                ? `La IA usará los ${docs.filter((d) => d.isParsed).length} documento(s) cargado(s) como contexto al generar las preguntas.`
                : "No hay documentos parseados; la IA generará a partir de las competencias y datos de la OPEC."}
            </p>

            <label className="flex items-center gap-2 mb-4 text-sm text-gray-300">
              <input
                type="checkbox"
                checked={limpiarPrevias}
                onChange={(e) => setLimpiarPrevias(e.target.checked)}
                className="w-4 h-4"
              />
              Borrar las {opec._count.preguntas} preguntas previas antes de generar
              <span className="text-xs text-gray-500">(falla si hay respuestas de usuarios)</span>
            </label>

            <button
              onClick={handleGenerar}
              disabled={generando}
              className="bg-green-600 hover:bg-green-700 disabled:opacity-40 disabled:cursor-not-allowed px-5 py-2.5 rounded-lg text-sm font-semibold transition"
            >
              {generando ? "⏳ Generando (~30-60s)..." : "🚀 Generar banco completo"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
