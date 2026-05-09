"use client";

import { useEffect, useState, useCallback } from "react";

const BLOQUE_LABEL: Record<string, string> = {
  REGIMEN_SERVIDOR_PUBLICO: "Régimen del servidor público",
  DISCIPLINARIO: "Disciplinario",
  INFORMACION_ARCHIVO_TRANSPARENCIA: "Información, archivo y transparencia",
  GESTION_CONTROL: "Gestión y control",
  CONTRATACION_PRESUPUESTO_TALENTO: "Contratación, presupuesto y talento",
  ETICA_SERVICIO: "Ética y servicio",
};

interface Recurso {
  id: string;
  bloque: string;
  titulo: string;
  numeroNorma: string | null;
  descripcion: string | null;
  pdfUrl: string | null;
  pdfFileName: string | null;
  pdfSize: number | null;
  vigente: boolean;
  orden: number;
}

export default function AdminBibliotecaPage() {
  const [items, setItems] = useState<Recurso[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Record<string, Partial<Recurso>>>({});
  const [savingId, setSavingId] = useState<string | null>(null);
  const [uploadingId, setUploadingId] = useState<string | null>(null);

  const cargar = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/biblioteca");
    const data = await res.json();
    setItems(data.recursos ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { cargar(); }, [cargar]);

  function setField(id: string, field: keyof Recurso, value: unknown) {
    setEditing((p) => ({ ...p, [id]: { ...p[id], [field]: value } }));
  }

  async function guardar(id: string) {
    const patch = editing[id];
    if (!patch) return;
    setSavingId(id);
    const res = await fetch(`/api/admin/biblioteca/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
    setSavingId(null);
    if (res.ok) {
      setEditing((p) => {
        const n = { ...p };
        delete n[id];
        return n;
      });
      cargar();
    } else {
      const body = await res.json().catch(() => ({}));
      alert("Error: " + (body.error ?? res.status));
    }
  }

  async function uploadPdf(id: string, file: File) {
    setUploadingId(id);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch(`/api/admin/biblioteca/${id}/upload`, {
      method: "POST",
      body: fd,
    });
    setUploadingId(null);
    if (res.ok) {
      cargar();
    } else {
      const body = await res.json().catch(() => ({}));
      alert("Error subiendo: " + (body.error ?? res.status));
    }
  }

  async function quitarPdf(id: string) {
    if (!confirm("¿Quitar referencia al PDF?")) return;
    await fetch(`/api/admin/biblioteca/${id}/upload`, { method: "DELETE" });
    cargar();
  }

  // Agrupar por bloque
  const grouped: Record<string, Recurso[]> = {};
  for (const r of items) {
    grouped[r.bloque] ??= [];
    grouped[r.bloque].push(r);
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-2 flex-wrap gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-500">Admin · CMS</p>
            <h1 className="text-3xl font-bold mt-1">Biblioteca de recursos</h1>
            <p className="text-gray-400 mt-1 text-sm">
              {items.length} documentos · {items.filter((i) => i.pdfUrl).length} con PDF cargado
            </p>
          </div>
          <a href="/admin" className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition">
            ← Admin
          </a>
        </div>

        <div className="mt-6 mb-2 rounded-xl px-4 py-3 flex items-start gap-3 text-sm" style={{ background: "rgba(245,166,35,0.10)", border: "1px solid rgba(245,166,35,0.35)", color: "#FBBF24" }}>
          <span className="text-lg leading-none">💡</span>
          <p>
            <strong className="text-white">Sube PDF:</strong> click en "Subir PDF" para cada recurso. Requiere
            tener configurado <code className="bg-black/40 px-1 rounded">BLOB_READ_WRITE_TOKEN</code> en Vercel
            (Project → Storage → Create Blob Store). Como alternativa puedes pegar una URL externa al PDF
            directamente en el campo "URL del PDF" y guardar.
          </p>
        </div>

        {loading ? (
          <div className="space-y-3 mt-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-900 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="mt-6 space-y-8">
            {Object.entries(grouped).map(([bloque, recursos]) => (
              <section key={bloque}>
                <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
                  <span className="text-orange-500">▍</span>
                  {BLOQUE_LABEL[bloque] ?? bloque}
                  <span className="text-xs text-gray-500 font-normal">({recursos.length})</span>
                </h2>
                <div className="space-y-3">
                  {recursos.map((r) => {
                    const e = editing[r.id] ?? {};
                    const dirty = Object.keys(e).length > 0;
                    const titulo = e.titulo ?? r.titulo;
                    const numeroNorma = e.numeroNorma !== undefined ? e.numeroNorma : r.numeroNorma;
                    const descripcion = e.descripcion !== undefined ? e.descripcion : r.descripcion;
                    const pdfUrl = e.pdfUrl !== undefined ? e.pdfUrl : r.pdfUrl;
                    const vigente = e.vigente !== undefined ? e.vigente : r.vigente;

                    return (
                      <div key={r.id} className="bg-gray-900 border border-gray-800 rounded-xl p-4 space-y-3">
                        <div className="grid sm:grid-cols-[1fr_auto] gap-3 items-start">
                          <div className="space-y-2">
                            <div className="flex flex-wrap gap-2">
                              <input
                                value={numeroNorma ?? ""}
                                placeholder="Ley XXX de YYYY"
                                onChange={(ev) => setField(r.id, "numeroNorma", ev.target.value || null)}
                                className="bg-gray-800 border border-gray-700 rounded-md px-2 py-1 text-xs w-44 focus:outline-none focus:border-orange-600"
                              />
                              <input
                                value={titulo}
                                onChange={(ev) => setField(r.id, "titulo", ev.target.value)}
                                className="flex-1 min-w-[240px] bg-gray-800 border border-gray-700 rounded-md px-3 py-1 text-sm font-semibold focus:outline-none focus:border-orange-600"
                              />
                            </div>
                            <textarea
                              value={descripcion ?? ""}
                              placeholder="Descripción breve"
                              onChange={(ev) => setField(r.id, "descripcion", ev.target.value || null)}
                              rows={2}
                              className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-1 text-xs focus:outline-none focus:border-orange-600"
                            />
                            <input
                              value={pdfUrl ?? ""}
                              placeholder="URL del PDF (https://… o deja vacío y sube archivo)"
                              onChange={(ev) => setField(r.id, "pdfUrl", ev.target.value || null)}
                              className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-1 text-xs font-mono focus:outline-none focus:border-orange-600"
                            />
                            <label className="flex items-center gap-2 text-xs">
                              <input
                                type="checkbox"
                                checked={vigente}
                                onChange={(ev) => setField(r.id, "vigente", ev.target.checked)}
                              />
                              Vigente (visible al público)
                            </label>
                          </div>

                          <div className="flex flex-col gap-2 sm:w-44">
                            {r.pdfUrl ? (
                              <>
                                <a
                                  href={r.pdfUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-3 py-2 bg-green-700 hover:bg-green-600 rounded-md text-xs text-center font-semibold transition"
                                >
                                  📄 Ver PDF actual
                                </a>
                                {r.pdfFileName && (
                                  <p className="text-[10px] text-gray-500 truncate" title={r.pdfFileName}>
                                    {r.pdfFileName}
                                  </p>
                                )}
                                <button
                                  onClick={() => quitarPdf(r.id)}
                                  className="px-3 py-1.5 bg-red-900/40 hover:bg-red-900/60 border border-red-800 rounded-md text-xs"
                                >
                                  Quitar PDF
                                </button>
                              </>
                            ) : (
                              <label className="px-3 py-2 bg-orange-700 hover:bg-orange-600 rounded-md text-xs text-center font-semibold cursor-pointer transition">
                                {uploadingId === r.id ? "Subiendo…" : "📤 Subir PDF"}
                                <input
                                  type="file"
                                  accept="application/pdf"
                                  className="hidden"
                                  onChange={(ev) => {
                                    const f = ev.target.files?.[0];
                                    if (f) uploadPdf(r.id, f);
                                    ev.target.value = "";
                                  }}
                                  disabled={uploadingId !== null}
                                />
                              </label>
                            )}

                            <button
                              onClick={() => guardar(r.id)}
                              disabled={!dirty || savingId === r.id}
                              className={`px-3 py-2 rounded-md text-xs font-semibold transition ${
                                dirty
                                  ? "bg-orange-600 hover:bg-orange-700 text-white"
                                  : "bg-gray-800 text-gray-500 cursor-not-allowed"
                              }`}
                            >
                              {savingId === r.id ? "…" : dirty ? "Guardar cambios" : "Sin cambios"}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
