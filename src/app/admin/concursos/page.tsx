"use client";

import { useEffect, useState, useCallback } from "react";

interface Item {
  id: string;
  slug: string;
  nombreScraped: string;
  nombreOverride: string | null;
  linkCnsc: string;
  imagenCustomUrl: string | null;
  visible: boolean;
  orden: number;
  scrapedAt: string;
}

export default function AdminConcursosPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [scraping, setScraping] = useState(false);
  const [editing, setEditing] = useState<Record<string, Partial<Item>>>({});
  const [savingId, setSavingId] = useState<string | null>(null);

  const cargar = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/concursos");
    const data = await res.json();
    setItems(data.concursos ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    cargar();
  }, [cargar]);

  function setField(id: string, field: keyof Item, value: unknown) {
    setEditing((p) => ({ ...p, [id]: { ...p[id], [field]: value } }));
  }

  async function guardar(id: string) {
    const patch = editing[id];
    if (!patch) return;
    setSavingId(id);
    const res = await fetch(`/api/admin/concursos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
    setSavingId(null);
    if (res.ok) {
      setEditing((p) => {
        const { [id]: _, ...rest } = p;
        void _;
        return rest;
      });
      cargar();
    } else {
      alert("Error guardando: " + res.status);
    }
  }

  async function scrapeManual() {
    setScraping(true);
    const res = await fetch("/api/admin/concursos/scrape", { method: "POST" });
    const data = await res.json();
    setScraping(false);
    if (res.ok) {
      alert(
        `Scrape OK: ${data.total} total, ${data.nuevos} nuevos, ${data.actualizados} actualizados, ${data.ocultos} ocultados`
      );
      cargar();
    } else {
      alert("Error: " + (data.error ?? res.status));
    }
  }

  return (
    <div className="min-h-screen p-8" style={{ background: "var(--bg-base)", color: "var(--text-primary)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-2 flex-wrap gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
              Admin · CMS
            </p>
            <h1 className="text-3xl font-bold mt-1" style={{ color: "var(--text-primary)" }}>Concursos en desarrollo</h1>
            <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>
              {items.length} en DB. Sincronizado desde cnsc.gov.co.
            </p>
          </div>
          <div className="flex gap-3">
            <a
              href="/admin"
              className="btn-secondary text-sm"
            >
              ← Admin
            </a>
            <button
              onClick={scrapeManual}
              disabled={scraping}
              className="btn-primary disabled:opacity-50"
            >
              {scraping ? "Scrapeando…" : "🔄 Scrape ahora"}
            </button>
          </div>
        </div>

        {/* Aviso de tamaño de imagen */}
        <div
          className="mt-6 mb-2 rounded-xl px-4 py-3 flex items-start gap-3 text-sm"
          style={{
            background: "rgba(245, 166, 35, 0.10)",
            border: "1px solid rgba(245, 166, 35, 0.35)",
            color: "var(--warning)",
          }}
        >
          <span className="text-lg leading-none">💡</span>
          <p>
            <strong style={{ color: "var(--text-primary)" }}>Al subir una imagen custom:</strong> usa una
            imagen de <strong style={{ color: "var(--text-primary)" }}>1200×630 px (ratio 1.91:1)</strong>
            {" "}para que calce perfecto con la grid del slider y la página de listado.
            Si la dejas vacía, se usa la auto-generada con next/og.
          </p>
        </div>

        {loading ? (
          <div className="space-y-3 mt-8">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-20 rounded-xl animate-pulse" style={{ background: "var(--bg-card)" }} />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="mt-12 text-center py-16 rounded-2xl" style={{ border: "1px dashed var(--border-default)" }}>
            <p className="text-5xl mb-3">🎯</p>
            <p className="font-semibold" style={{ color: "var(--text-primary)" }}>Aún no hay concursos en DB</p>
            <p className="text-sm mt-2" style={{ color: "var(--text-muted)" }}>
              Click en "Scrape ahora" para traerlos desde cnsc.gov.co.
            </p>
          </div>
        ) : (
          <div className="mt-8 space-y-3">
            {items.map((c) => {
              const e = editing[c.id] ?? {};
              const dirty = Object.keys(e).length > 0;
              const nombreActual =
                (e.nombreOverride !== undefined ? e.nombreOverride : c.nombreOverride) ??
                c.nombreScraped;
              const imagenActual =
                e.imagenCustomUrl !== undefined ? e.imagenCustomUrl : c.imagenCustomUrl;
              const visibleActual =
                e.visible !== undefined ? e.visible : c.visible;
              const ordenActual =
                e.orden !== undefined ? e.orden : c.orden;

              const inputStyle = { background: "var(--bg-elevated)", border: "1px solid var(--border-default)", color: "var(--text-primary)" };
              return (
                <div
                  key={c.id}
                  className="rounded-xl p-4 grid lg:grid-cols-[120px_1fr_auto] gap-4"
                  style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}
                >
                  {/* Preview imagen */}
                  <a
                    href={imagenActual || `/api/concurso-poster/${c.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <img
                      src={imagenActual || `/api/concurso-poster/${c.slug}`}
                      alt={nombreActual}
                      className="w-full rounded-lg"
                      style={{ aspectRatio: "1200 / 630", objectFit: "cover", border: "1px solid var(--border-subtle)" }}
                    />
                    <p className="text-[10px] mt-1 text-center" style={{ color: "var(--text-muted)" }}>
                      {imagenActual ? "Custom" : "Auto-generada"}
                    </p>
                  </a>

                  {/* Campos */}
                  <div className="space-y-2 min-w-0">
                    <div>
                      <label className="text-[10px] uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                        Nombre {e.nombreOverride !== undefined || c.nombreOverride ? "(override)" : "(scraped, sin override)"}
                      </label>
                      <input
                        value={nombreActual}
                        onChange={(ev) =>
                          setField(c.id, "nombreOverride", ev.target.value || null)
                        }
                        className="w-full rounded-md px-3 py-1.5 text-sm focus:outline-none"
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                        URL imagen custom (vacío = auto-generada)
                      </label>
                      <input
                        value={imagenActual ?? ""}
                        placeholder="https://… (deja vacío para usar la generada)"
                        onChange={(ev) =>
                          setField(c.id, "imagenCustomUrl", ev.target.value || null)
                        }
                        className="w-full rounded-md px-3 py-1.5 text-sm focus:outline-none"
                        style={inputStyle}
                      />
                    </div>
                    <div className="flex items-center gap-3 text-xs flex-wrap" style={{ color: "var(--text-secondary)" }}>
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={visibleActual}
                          onChange={(ev) => setField(c.id, "visible", ev.target.checked)}
                        />
                        Visible
                      </label>
                      <label className="flex items-center gap-1.5">
                        Orden:{" "}
                        <input
                          type="number"
                          value={ordenActual}
                          onChange={(ev) =>
                            setField(c.id, "orden", parseInt(ev.target.value) || 0)
                          }
                          className="rounded px-2 py-0.5 w-16"
                          style={inputStyle}
                        />
                      </label>
                      <span className="truncate" style={{ color: "var(--text-muted)" }}>
                        {c.slug} ·{" "}
                        <a
                          href={c.linkCnsc}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                          style={{ color: "var(--accent-500)" }}
                        >
                          CNSC ↗
                        </a>
                      </span>
                    </div>
                  </div>

                  {/* Acción guardar */}
                  <div className="flex flex-col items-stretch justify-center">
                    <button
                      onClick={() => guardar(c.id)}
                      disabled={!dirty || savingId === c.id}
                      className={dirty ? "btn-primary" : "btn-secondary"}
                      style={dirty ? undefined : { opacity: 0.6, cursor: "not-allowed" }}
                    >
                      {savingId === c.id ? "…" : dirty ? "Guardar" : "Sin cambios"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
