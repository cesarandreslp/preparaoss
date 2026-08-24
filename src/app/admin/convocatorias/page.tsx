"use client";

import { useCallback, useEffect, useState } from "react";

interface Convocatoria {
  clave: string; // "id:548594064" | "num:2676/2025"
  nombre: string | null;
  numero: string | null;
  opecs: number;
  enSimo: boolean;
  fechaExamen: string | null; // yyyy-mm-dd
}

export default function AdminConvocatoriasPage() {
  const [items, setItems] = useState<Convocatoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [draft, setDraft] = useState<Record<string, string>>({});
  const [savingId, setSavingId] = useState<string | null>(null);

  const cargar = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/convocatorias");
    const data = await res.json();
    setItems(data.convocatorias ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { cargar(); }, [cargar]);

  async function guardar(clave: string) {
    const fechaExamen = draft[clave];
    if (!fechaExamen) return;
    setSavingId(clave);
    const res = await fetch("/api/admin/convocatorias", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ clave, fechaExamen }),
    });
    const body = await res.json().catch(() => ({}));
    setSavingId(null);
    if (res.ok) {
      setDraft((p) => { const n = { ...p }; delete n[clave]; return n; });
      cargar();
    } else {
      alert("Error: " + (body.error ?? res.status));
    }
  }

  const cardStyle = { background: "var(--bg-card)", border: "1px solid var(--border-subtle)" };
  const inputStyle = { background: "var(--bg-elevated)", border: "1px solid var(--border-default)", color: "var(--text-primary)" };

  const conFecha = items.filter((c) => c.fechaExamen).length;
  const opecsSinFecha = items.filter((c) => !c.fechaExamen).reduce((s, c) => s + c.opecs, 0);

  return (
    <div className="min-h-screen p-8" style={{ background: "var(--bg-base)", color: "var(--text-primary)" }}>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-end justify-between mb-2 flex-wrap gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>Admin · CMS</p>
            <h1 className="text-3xl font-bold mt-1" style={{ color: "var(--text-primary)" }}>Fechas de examen</h1>
            <p className="mt-1 text-sm max-w-2xl" style={{ color: "var(--text-muted)" }}>
              SIMO no publica el cronograma: la fecha se carga a mano una vez por
              convocatoria (la sacas del acuerdo o aviso de la CNSC) y baja a todas
              sus OPECs. El acceso de quienes ya pagaron se recorta al examen + 3 días.
            </p>
          </div>
          <a href="/admin" className="btn-secondary text-sm">← Volver</a>
        </div>

        {!loading && (
          <p className="mt-4 text-sm" style={{ color: "var(--text-muted)" }}>
            {conFecha} de {items.length} convocatorias con fecha ·{" "}
            <strong style={{ color: "var(--text-primary)" }}>{opecsSinFecha.toLocaleString("es-CO")}</strong> OPECs aún sin fecha
          </p>
        )}

        {loading ? (
          <p className="mt-8 text-sm" style={{ color: "var(--text-muted)" }}>Cargando…</p>
        ) : (
          <div className="mt-6 space-y-3">
            {items.map((c) => (
              <div
                key={c.clave}
                className="rounded-xl p-4 flex flex-wrap items-center gap-4 justify-between"
                style={cardStyle}
              >
                <div className="min-w-0 flex-1">
                  <p className="font-semibold truncate" style={{ color: "var(--text-primary)" }}>
                    {c.nombre ?? c.numero ?? "(sin nombre)"}
                  </p>
                  <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                    {c.numero ?? "sin número"} · {c.opecs.toLocaleString("es-CO")} OPECs
                    {c.fechaExamen && ` · examen ${c.fechaExamen}`}
                    {!c.enSimo && " · retirada de SIMO (agrupada por número)"}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="date"
                    className="rounded-md px-3 py-2 text-sm"
                    style={inputStyle}
                    value={draft[c.clave] ?? c.fechaExamen ?? ""}
                    onChange={(e) => setDraft((p) => ({ ...p, [c.clave]: e.target.value }))}
                  />
                  <button
                    className="btn-primary text-sm"
                    disabled={!draft[c.clave] || savingId === c.clave}
                    onClick={() => guardar(c.clave)}
                  >
                    {savingId === c.clave ? "Guardando…" : "Guardar"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
