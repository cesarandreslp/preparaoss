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
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-2 flex-wrap gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-500">
              Admin · CMS
            </p>
            <h1 className="text-3xl font-bold mt-1">Concursos en desarrollo</h1>
            <p className="text-gray-400 mt-1 text-sm">
              {items.length} en DB. Sincronizado desde cnsc.gov.co.
            </p>
          </div>
          <div className="flex gap-3">
            <a
              href="/admin"
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition"
            >
              ← Admin
            </a>
            <button
              onClick={scrapeManual}
              disabled={scraping}
              className="px-4 py-2 bg-orange-600 hover:bg-orange-700 disabled:opacity-50 rounded-lg text-sm font-semibold transition"
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
            color: "#FBBF24",
          }}
        >
          <span className="text-lg leading-none">💡</span>
          <p>
            <strong className="text-white">Al subir una imagen custom:</strong> usa una
            imagen de <strong className="text-white">1200×630 px (ratio 1.91:1)</strong>
            {" "}para que calce perfecto con la grid del slider y la página de listado.
            Si la dejas vacía, se usa la auto-generada con next/og.
          </p>
        </div>

        {loading ? (
          <div className="space-y-3 mt-8">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-900 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="mt-12 text-center py-16 border border-dashed border-gray-800 rounded-2xl">
            <p className="text-5xl mb-3">🎯</p>
            <p className="font-semibold">Aún no hay concursos en DB</p>
            <p className="text-sm text-gray-400 mt-2">
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

              return (
                <div
                  key={c.id}
                  className="bg-gray-900 border border-gray-800 rounded-xl p-4 grid lg:grid-cols-[120px_1fr_auto] gap-4"
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
                      className="w-full rounded-lg border border-gray-800"
                      style={{ aspectRatio: "1200 / 630", objectFit: "cover" }}
                    />
                    <p className="text-[10px] mt-1 text-gray-500 text-center">
                      {imagenActual ? "Custom" : "Auto-generada"}
                    </p>
                  </a>

                  {/* Campos */}
                  <div className="space-y-2 min-w-0">
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-gray-500">
                        Nombre {e.nombreOverride !== undefined || c.nombreOverride ? "(override)" : "(scraped, sin override)"}
                      </label>
                      <input
                        value={nombreActual}
                        onChange={(ev) =>
                          setField(c.id, "nombreOverride", ev.target.value || null)
                        }
                        className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-orange-600"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-gray-500">
                        URL imagen custom (vacío = auto-generada)
                      </label>
                      <input
                        value={imagenActual ?? ""}
                        placeholder="https://… (deja vacío para usar la generada)"
                        onChange={(ev) =>
                          setField(c.id, "imagenCustomUrl", ev.target.value || null)
                        }
                        className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-orange-600"
                      />
                    </div>
                    <div className="flex items-center gap-3 text-xs flex-wrap">
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
                          className="bg-gray-800 border border-gray-700 rounded px-2 py-0.5 w-16"
                        />
                      </label>
                      <span className="text-gray-600 truncate">
                        {c.slug} ·{" "}
                        <a
                          href={c.linkCnsc}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:underline"
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
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                        dirty
                          ? "bg-orange-600 hover:bg-orange-700 text-white"
                          : "bg-gray-800 text-gray-500 cursor-not-allowed"
                      }`}
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
