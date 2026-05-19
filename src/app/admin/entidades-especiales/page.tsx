"use client";

import { useEffect, useState, useCallback } from "react";

interface Entidad {
  id: string;
  slug: string;
  nombre: string;
  descripcion: string | null;
  apiUrl: string;
  webUrl: string | null;
  pageParam: string;
  sizeParam: string;
  pageSize: number;
  itemsKey: string;
  totalKey: string;
  activo: boolean;
  ultimoScrape: string | null;
  _count: { opecs: number };
}

const EMPTY_NEW = {
  slug: "",
  nombre: "",
  descripcion: "",
  apiUrl: "",
  webUrl: "",
  pageParam: "page",
  sizeParam: "size",
  pageSize: 25,
  itemsKey: "convocatorias",
  totalKey: "totalElementos",
};

export default function AdminEntidadesEspecialesPage() {
  const [items, setItems] = useState<Entidad[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [draft, setDraft] = useState(EMPTY_NEW);
  const [scrapingId, setScrapingId] = useState<string | null>(null);
  const [editing, setEditing] = useState<Record<string, Partial<Entidad>>>({});
  const [savingId, setSavingId] = useState<string | null>(null);

  const cargar = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/entidades-especiales");
    const data = await res.json();
    setItems(data.entidades ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { cargar(); }, [cargar]);

  function setField(id: string, field: keyof Entidad, value: unknown) {
    setEditing((p) => ({ ...p, [id]: { ...p[id], [field]: value } }));
  }

  async function guardar(id: string) {
    const patch = editing[id];
    if (!patch) return;
    setSavingId(id);
    const res = await fetch(`/api/admin/entidades-especiales/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
    setSavingId(null);
    if (res.ok) {
      setEditing((p) => { const n = { ...p }; delete n[id]; return n; });
      cargar();
    } else {
      const body = await res.json().catch(() => ({}));
      alert("Error: " + (body.error ?? res.status));
    }
  }

  async function scrape(id: string) {
    setScrapingId(id);
    const res = await fetch(`/api/admin/entidades-especiales/${id}/scrape`, { method: "POST" });
    setScrapingId(null);
    const body = await res.json().catch(() => ({}));
    if (res.ok) {
      alert(`Scrape OK: ${body.total} total, ${body.nuevas} nuevas, ${body.actualizadas} actualizadas, ${body.marcadasInactivas} marcadas inactivas`);
      cargar();
    } else {
      alert("Error: " + (body.error ?? res.status));
    }
  }

  async function eliminar(id: string, nombre: string) {
    if (!confirm(`¿Eliminar "${nombre}" y todas sus OPECs? No se puede deshacer.`)) return;
    const res = await fetch(`/api/admin/entidades-especiales/${id}`, { method: "DELETE" });
    if (res.ok) cargar();
    else alert("Error: " + res.status);
  }

  async function crear() {
    setCreating(true);
    const res = await fetch("/api/admin/entidades-especiales", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...draft,
        descripcion: draft.descripcion || null,
        webUrl: draft.webUrl || null,
        pageSize: Number(draft.pageSize) || 25,
      }),
    });
    setCreating(false);
    if (res.ok) {
      setDraft(EMPTY_NEW);
      cargar();
      alert('Entidad creada. Click en "🔄 Scrape ahora" para traer las OPECs.');
    } else {
      const body = await res.json().catch(() => ({}));
      alert("Error: " + (body.error ?? res.status));
    }
  }

  const cardStyle = { background: "var(--bg-card)", border: "1px solid var(--border-subtle)" };
  const inputStyle = { background: "var(--bg-elevated)", border: "1px solid var(--border-default)", color: "var(--text-primary)" };

  return (
    <div className="min-h-screen p-8" style={{ background: "var(--bg-base)", color: "var(--text-primary)" }}>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-end justify-between mb-2 flex-wrap gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>Admin · CMS</p>
            <h1 className="text-3xl font-bold mt-1" style={{ color: "var(--text-primary)" }}>Entidades de régimen especial</h1>
            <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>
              Concursos fuera de SIMO/CNSC: Procuraduría, Banrep, Ecopetrol, etc.
            </p>
          </div>
          <a href="/admin" className="btn-secondary text-sm">
            ← Admin
          </a>
        </div>

        {/* Form crear */}
        <details className="mt-6 rounded-xl p-5" style={cardStyle}>
          <summary className="cursor-pointer font-semibold" style={{ color: "var(--text-primary)" }}>+ Añadir entidad</summary>
          <div className="mt-4 grid sm:grid-cols-2 gap-3 text-sm">
            <input className="rounded-md px-3 py-2" style={inputStyle} placeholder="slug (ej: banrep)" value={draft.slug} onChange={(e) => setDraft({ ...draft, slug: e.target.value })} />
            <input className="rounded-md px-3 py-2" style={inputStyle} placeholder="Nombre completo" value={draft.nombre} onChange={(e) => setDraft({ ...draft, nombre: e.target.value })} />
            <textarea className="sm:col-span-2 rounded-md px-3 py-2" style={inputStyle} rows={2} placeholder="Descripción breve" value={draft.descripcion} onChange={(e) => setDraft({ ...draft, descripcion: e.target.value })} />
            <input className="sm:col-span-2 rounded-md px-3 py-2 font-mono text-xs" style={inputStyle} placeholder="API URL (https://… del XHR de la SPA)" value={draft.apiUrl} onChange={(e) => setDraft({ ...draft, apiUrl: e.target.value })} />
            <input className="sm:col-span-2 rounded-md px-3 py-2 font-mono text-xs" style={inputStyle} placeholder="Web URL pública (opcional)" value={draft.webUrl} onChange={(e) => setDraft({ ...draft, webUrl: e.target.value })} />
            <div className="grid grid-cols-3 gap-2 sm:col-span-2">
              <input className="rounded-md px-2 py-1 text-xs" style={inputStyle} placeholder="pageParam" value={draft.pageParam} onChange={(e) => setDraft({ ...draft, pageParam: e.target.value })} />
              <input className="rounded-md px-2 py-1 text-xs" style={inputStyle} placeholder="sizeParam" value={draft.sizeParam} onChange={(e) => setDraft({ ...draft, sizeParam: e.target.value })} />
              <input className="rounded-md px-2 py-1 text-xs" style={inputStyle} type="number" placeholder="pageSize" value={draft.pageSize} onChange={(e) => setDraft({ ...draft, pageSize: parseInt(e.target.value) || 25 })} />
              <input className="rounded-md px-2 py-1 text-xs" style={inputStyle} placeholder="itemsKey" value={draft.itemsKey} onChange={(e) => setDraft({ ...draft, itemsKey: e.target.value })} />
              <input className="rounded-md px-2 py-1 text-xs" style={inputStyle} placeholder="totalKey" value={draft.totalKey} onChange={(e) => setDraft({ ...draft, totalKey: e.target.value })} />
            </div>
            <button onClick={crear} disabled={creating || !draft.slug || !draft.nombre || !draft.apiUrl} className="sm:col-span-2 btn-primary disabled:opacity-40">
              {creating ? "Creando…" : "Crear entidad"}
            </button>
          </div>
        </details>

        {loading ? (
          <div className="space-y-3 mt-6">
            {[...Array(3)].map((_, i) => <div key={i} className="h-20 rounded-xl animate-pulse" style={{ background: "var(--bg-card)" }} />)}
          </div>
        ) : items.length === 0 ? (
          <div className="mt-6 text-center py-12 rounded-2xl" style={{ border: "1px dashed var(--border-default)", color: "var(--text-muted)" }}>
            Sin entidades aún. Añade una arriba.
          </div>
        ) : (
          <div className="mt-6 space-y-3">
            {items.map((e) => {
              const ed = editing[e.id] ?? {};
              const dirty = Object.keys(ed).length > 0;
              return (
                <div key={e.id} className="rounded-xl p-4" style={cardStyle}>
                  <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
                    <div>
                      <p className="font-bold text-lg" style={{ color: "var(--text-primary)" }}>{ed.nombre ?? e.nombre}</p>
                      <p className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>/{e.slug} · {e._count.opecs} OPECs</p>
                      {e.ultimoScrape && (
                        <p className="text-[10px] mt-1" style={{ color: "var(--text-muted)" }}>
                          último scrape: {new Date(e.ultimoScrape).toLocaleString("es-CO")}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <a href={`/concursos-especiales/${e.slug}`} target="_blank" rel="noopener noreferrer" className="btn-secondary text-xs" style={{ padding: "0.375rem 0.75rem" }}>
                        Ver pública ↗
                      </a>
                      <button onClick={() => scrape(e.id)} disabled={scrapingId === e.id} className="btn-primary text-xs disabled:opacity-50" style={{ padding: "0.375rem 0.75rem" }}>
                        {scrapingId === e.id ? "Scrapeando…" : "🔄 Scrape ahora"}
                      </button>
                      <button onClick={() => eliminar(e.id, e.nombre)} className="btn-destructive text-xs" style={{ padding: "0.375rem 0.75rem" }}>
                        Eliminar
                      </button>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-2 text-sm">
                    <input className="rounded-md px-3 py-1.5" style={inputStyle} value={ed.nombre ?? e.nombre} onChange={(ev) => setField(e.id, "nombre", ev.target.value)} />
                    <input className="rounded-md px-3 py-1.5" style={inputStyle} value={ed.webUrl ?? e.webUrl ?? ""} placeholder="Web URL" onChange={(ev) => setField(e.id, "webUrl", ev.target.value || null)} />
                    <input className="sm:col-span-2 rounded-md px-3 py-1.5 font-mono text-xs" style={inputStyle} value={ed.apiUrl ?? e.apiUrl} onChange={(ev) => setField(e.id, "apiUrl", ev.target.value)} />
                    <textarea className="sm:col-span-2 rounded-md px-3 py-1.5 text-xs" style={inputStyle} rows={2} value={(ed.descripcion as string) ?? e.descripcion ?? ""} placeholder="Descripción" onChange={(ev) => setField(e.id, "descripcion", ev.target.value || null)} />
                    <label className="flex items-center gap-2 text-xs" style={{ color: "var(--text-secondary)" }}>
                      <input type="checkbox" checked={ed.activo ?? e.activo} onChange={(ev) => setField(e.id, "activo", ev.target.checked)} />
                      Activo (visible en público y se scrapea por cron)
                    </label>
                    <button onClick={() => guardar(e.id)} disabled={!dirty || savingId === e.id} className={dirty ? "btn-primary text-xs" : "btn-secondary text-xs"} style={dirty ? { padding: "0.375rem 0.75rem" } : { padding: "0.375rem 0.75rem", opacity: 0.6, cursor: "not-allowed" }}>
                      {savingId === e.id ? "…" : dirty ? "Guardar cambios" : "Sin cambios"}
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
