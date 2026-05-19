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
    <div className="min-h-screen p-8" style={{ background: "var(--bg-base)", color: "var(--text-primary)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-2 flex-wrap gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>Admin · CMS</p>
            <h1 className="text-3xl font-bold mt-1" style={{ color: "var(--text-primary)" }}>Biblioteca de recursos</h1>
            <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>
              {items.length} documentos · {items.filter((i) => i.pdfUrl).length} con PDF cargado
            </p>
          </div>
          <a href="/admin" className="btn-secondary text-sm">
            ← Admin
          </a>
        </div>

        <div className="mt-6 mb-2 rounded-xl px-4 py-3 flex items-start gap-3 text-sm" style={{ background: "rgba(245,166,35,0.10)", border: "1px solid rgba(245,166,35,0.35)", color: "var(--warning)" }}>
          <span className="text-lg leading-none">💡</span>
          <p>
            <strong style={{ color: "var(--text-primary)" }}>Sube PDF:</strong> click en "Subir PDF" para cada recurso. Requiere
            tener configurado <code className="px-1 rounded" style={{ background: "rgba(0,0,0,0.4)" }}>BLOB_READ_WRITE_TOKEN</code> en Vercel
            (Project → Storage → Create Blob Store). Como alternativa puedes pegar una URL externa al PDF
            directamente en el campo "URL del PDF" y guardar.
          </p>
        </div>

        {loading ? (
          <div className="space-y-3 mt-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 rounded-xl animate-pulse" style={{ background: "var(--bg-card)" }} />
            ))}
          </div>
        ) : (
          <div className="mt-6 space-y-8">
            {Object.entries(grouped).map(([bloque, recursos]) => (
              <section key={bloque}>
                <h2 className="text-lg font-bold mb-3 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                  <span style={{ color: "var(--accent-500)" }}>▍</span>
                  {BLOQUE_LABEL[bloque] ?? bloque}
                  <span className="text-xs font-normal" style={{ color: "var(--text-muted)" }}>({recursos.length})</span>
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

                    const inputStyle = { background: "var(--bg-elevated)", border: "1px solid var(--border-default)", color: "var(--text-primary)" };
                    return (
                      <div key={r.id} className="rounded-xl p-4 space-y-3" style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
                        <div className="grid sm:grid-cols-[1fr_auto] gap-3 items-start">
                          <div className="space-y-2">
                            <div className="flex flex-wrap gap-2">
                              <input
                                value={numeroNorma ?? ""}
                                placeholder="Ley XXX de YYYY"
                                onChange={(ev) => setField(r.id, "numeroNorma", ev.target.value || null)}
                                className="rounded-md px-2 py-1 text-xs w-44 focus:outline-none"
                                style={inputStyle}
                              />
                              <input
                                value={titulo}
                                onChange={(ev) => setField(r.id, "titulo", ev.target.value)}
                                className="flex-1 min-w-[240px] rounded-md px-3 py-1 text-sm font-semibold focus:outline-none"
                                style={inputStyle}
                              />
                            </div>
                            <textarea
                              value={descripcion ?? ""}
                              placeholder="Descripción breve"
                              onChange={(ev) => setField(r.id, "descripcion", ev.target.value || null)}
                              rows={2}
                              className="w-full rounded-md px-3 py-1 text-xs focus:outline-none"
                              style={inputStyle}
                            />
                            <input
                              value={pdfUrl ?? ""}
                              placeholder="URL del PDF (https://… o deja vacío y sube archivo)"
                              onChange={(ev) => setField(r.id, "pdfUrl", ev.target.value || null)}
                              className="w-full rounded-md px-3 py-1 text-xs font-mono focus:outline-none"
                              style={inputStyle}
                            />
                            <label className="flex items-center gap-2 text-xs" style={{ color: "var(--text-secondary)" }}>
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
                                  className="px-3 py-2 rounded-md text-xs text-center font-semibold transition"
                                  style={{ background: "var(--success)", color: "#0B1733" }}
                                >
                                  📄 Ver PDF actual
                                </a>
                                {r.pdfFileName && (
                                  <p className="text-[10px] truncate" title={r.pdfFileName} style={{ color: "var(--text-muted)" }}>
                                    {r.pdfFileName}
                                  </p>
                                )}
                                <button
                                  onClick={() => quitarPdf(r.id)}
                                  className="btn-destructive text-xs"
                                  style={{ padding: "0.375rem 0.75rem" }}
                                >
                                  Quitar PDF
                                </button>
                              </>
                            ) : (
                              <label
                                className="px-3 py-2 rounded-md text-xs text-center font-semibold cursor-pointer transition"
                                style={{ background: "var(--accent-500)", color: "#0B1733" }}
                              >
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
                              className={dirty ? "btn-primary text-xs" : "btn-secondary text-xs"}
                              style={dirty ? { padding: "0.5rem 0.75rem" } : { padding: "0.5rem 0.75rem", opacity: 0.6, cursor: "not-allowed" }}
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
