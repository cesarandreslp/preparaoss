"use client";

import { useEffect, useState } from "react";

// ─── Types ────────────────────────────────────────────────
interface PlanConfig {
  plan: string;
  nombre: string;
  descripcion: string;
  precioMensualCOP: number;
  simulacrosMes: number;
  preguntasPorSimulacro: number;
  features: string[];
  color: string;
  emoji: string;
  activo: boolean;
}

interface UsuarioRow {
  id: string;
  email: string;
  nombre: string;
  xpTotal: number;
  nivel: number;
  simulacrosTotal: number;
  createdAt: string;
  suscripcion: { plan: string; estado: string; finAt: string | null } | null;
}

// ─── Helpers ─────────────────────────────────────────────
const PLAN_ORDER = ["GRATUITO", "BASICO", "PRO", "PREMIUM"];
const formatCOP = (n: number) =>
  n === 0 ? "Gratis" : `$${n.toLocaleString("es-CO")} /mes`;

// ─── EditablePlanCard ─────────────────────────────────────
function EditablePlanCard({
  plan,
  onSave,
}: {
  plan: PlanConfig;
  onSave: (updated: PlanConfig) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(plan);
  const [saving, setSaving] = useState(false);
  const [featuresText, setFeaturesText] = useState(plan.features.join("\n"));

  async function save() {
    setSaving(true);
    const toSave = { ...draft, features: featuresText.split("\n").filter(Boolean) };
    const res = await fetch(`/api/admin/planes/${plan.plan.toLowerCase()}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(toSave),
    });
    if (res.ok) {
      const saved = await res.json();
      onSave(saved);
      setEditing(false);
    }
    setSaving(false);
  }

  const borderColor = draft.color;

  return (
    <div
      className="rounded-2xl p-6 flex flex-col gap-4 border-2 transition-all"
      style={{ background: "var(--bg-card)", borderColor: editing ? borderColor : "var(--border-default)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-3xl">{draft.emoji}</span>
          {editing ? (
            <input
              className="rounded px-2 py-1 text-xl font-bold w-32"
              style={{ background: "var(--bg-elevated)", color: "var(--text-primary)", border: "1px solid var(--border-default)" }}
              value={draft.nombre}
              onChange={(e) => setDraft({ ...draft, nombre: e.target.value })}
            />
          ) : (
            <span className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>{draft.nombre}</span>
          )}
        </div>
        <span
          className="text-xs px-2 py-1 rounded-full font-semibold"
          style={
            draft.activo
              ? { background: "rgba(74,222,128,0.15)", color: "var(--success)" }
              : { background: "rgba(248,113,113,0.15)", color: "var(--error)" }
          }
        >
          {draft.activo ? "Activo" : "Inactivo"}
        </span>
      </div>

      {/* Precio */}
      <div>
        {editing ? (
          <input
            type="number"
            className="rounded px-2 py-1 text-2xl font-bold w-40"
            style={{ background: "var(--bg-elevated)", color: "var(--text-primary)", border: "1px solid var(--border-default)" }}
            value={draft.precioMensualCOP}
            onChange={(e) =>
              setDraft({ ...draft, precioMensualCOP: parseInt(e.target.value) || 0 })
            }
          />
        ) : (
          <span className="text-2xl font-bold" style={{ color: borderColor }}>
            {formatCOP(draft.precioMensualCOP)}
          </span>
        )}
      </div>

      {/* Descripción */}
      {editing ? (
        <textarea
          className="rounded px-2 py-1 text-sm w-full"
          style={{ background: "var(--bg-elevated)", color: "var(--text-secondary)", border: "1px solid var(--border-default)" }}
          rows={2}
          value={draft.descripcion}
          onChange={(e) => setDraft({ ...draft, descripcion: e.target.value })}
        />
      ) : (
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>{draft.descripcion}</p>
      )}

      {/* Límites */}
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="rounded-lg p-3" style={{ background: "var(--bg-elevated)" }}>
          <p style={{ color: "var(--text-muted)" }}>Simulacros/mes</p>
          {editing ? (
            <input
              type="number"
              min={-1}
              className="rounded px-1 w-20 font-bold"
              style={{ background: "var(--bg-base)", color: "var(--text-primary)", border: "1px solid var(--border-default)" }}
              value={draft.simulacrosMes}
              onChange={(e) =>
                setDraft({ ...draft, simulacrosMes: parseInt(e.target.value) || 0 })
              }
            />
          ) : (
            <p className="font-bold" style={{ color: "var(--text-primary)" }}>
              {draft.simulacrosMes === -1 ? "∞ Ilimitados" : draft.simulacrosMes}
            </p>
          )}
        </div>
        <div className="rounded-lg p-3" style={{ background: "var(--bg-elevated)" }}>
          <p style={{ color: "var(--text-muted)" }}>Preguntas/simulacro</p>
          {editing ? (
            <input
              type="number"
              className="rounded px-1 w-16 font-bold"
              style={{ background: "var(--bg-base)", color: "var(--text-primary)", border: "1px solid var(--border-default)" }}
              value={draft.preguntasPorSimulacro}
              onChange={(e) =>
                setDraft({ ...draft, preguntasPorSimulacro: parseInt(e.target.value) || 10 })
              }
            />
          ) : (
            <p className="font-bold" style={{ color: "var(--text-primary)" }}>{draft.preguntasPorSimulacro}</p>
          )}
        </div>
      </div>

      {/* Features */}
      <div>
        <p className="text-xs mb-1 uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Beneficios</p>
        {editing ? (
          <textarea
            className="rounded px-2 py-1 text-sm w-full font-mono"
            style={{ background: "var(--bg-elevated)", color: "var(--text-secondary)", border: "1px solid var(--border-default)" }}
            rows={5}
            placeholder="Un beneficio por línea"
            value={featuresText}
            onChange={(e) => setFeaturesText(e.target.value)}
          />
        ) : (
          <ul className="space-y-1">
            {draft.features.map((f, i) => (
              <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                <span style={{ color: borderColor }}>✓</span> {f}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Color + Emoji (editing only) */}
      {editing && (
        <div className="flex gap-3">
          <div>
            <p className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>Color</p>
            <input
              type="color"
              value={draft.color}
              onChange={(e) => setDraft({ ...draft, color: e.target.value })}
              className="w-10 h-10 rounded cursor-pointer bg-transparent border-0"
            />
          </div>
          <div>
            <p className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>Emoji</p>
            <input
              className="rounded px-2 py-1 w-16 text-xl text-center"
              style={{ background: "var(--bg-elevated)", color: "var(--text-primary)", border: "1px solid var(--border-default)" }}
              value={draft.emoji}
              onChange={(e) => setDraft({ ...draft, emoji: e.target.value })}
            />
          </div>
          <div className="flex items-end gap-2 ml-auto">
            <label className="flex items-center gap-2 text-sm cursor-pointer" style={{ color: "var(--text-muted)" }}>
              <input
                type="checkbox"
                checked={draft.activo}
                onChange={(e) => setDraft({ ...draft, activo: e.target.checked })}
              />
              Activo
            </label>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2 mt-auto pt-2" style={{ borderTop: "1px solid var(--border-subtle)" }}>
        {editing ? (
          <>
            <button
              onClick={save}
              disabled={saving}
              className="flex-1 btn-primary disabled:opacity-50"
            >
              {saving ? "Guardando..." : "💾 Guardar"}
            </button>
            <button
              onClick={() => { setEditing(false); setDraft(plan); setFeaturesText(plan.features.join("\n")); }}
              className="btn-secondary"
            >
              Cancelar
            </button>
          </>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="w-full btn-secondary"
          >
            ✏️ Editar plan
          </button>
        )}
      </div>
    </div>
  );
}

// ─── UsuariosTab ─────────────────────────────────────────
function UsuariosTab({ planes }: { planes: PlanConfig[] }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [data, setData] = useState<{ total: number; usuarios: UsuarioRow[] } | null>(null);
  const [loading, setLoading] = useState(false);

  const [assignTarget, setAssignTarget] = useState<UsuarioRow | null>(null);
  const [assignPlan, setAssignPlan] = useState("BASICO");
  const [assignMeses, setAssignMeses] = useState(1);
  const [assigning, setAssigning] = useState(false);
  const [msg, setMsg] = useState("");

  async function load() {
    setLoading(true);
    const res = await fetch(`/api/admin/usuarios?page=${page}&search=${encodeURIComponent(search)}`);
    const json = await res.json();
    setData(json);
    setLoading(false);
  }

  useEffect(() => { load(); }, [page, search]);

  async function asignarPlan() {
    if (!assignTarget) return;
    setAssigning(true);
    const res = await fetch(`/api/admin/usuarios/${assignTarget.id}/plan`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan: assignPlan, meses: assignMeses }),
    });
    const json = await res.json();
    if (json.ok) {
      setMsg(`✅ Plan ${assignPlan} asignado a ${assignTarget.email}`);
      setAssignTarget(null);
      load();
    } else {
      setMsg(`❌ Error: ${JSON.stringify(json)}`);
    }
    setAssigning(false);
  }

  const PLAN_COLORS: Record<string, string> = {
    GRATUITO: "#6b7280",
    BASICO: "#2563eb",
    PRO: "#7c3aed",
    PREMIUM: "#b45309",
  };

  return (
    <div className="space-y-4">
      {msg && (
        <div className="rounded-lg px-4 py-3 text-sm" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-default)", color: "var(--text-primary)" }}>
          {msg}
        </div>
      )}

      {/* Search */}
      <input
        type="text"
        placeholder="Buscar por email o nombre..."
        value={search}
        onChange={(e) => { setSearch(e.target.value); setPage(0); }}
        className="w-full rounded-lg px-4 py-2 focus:outline-none"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border-default)", color: "var(--text-primary)" }}
      />

      {/* Table */}
      <div className="overflow-x-auto rounded-xl" style={{ border: "1px solid var(--border-subtle)" }}>
        <table className="w-full text-sm">
          <thead className="uppercase text-xs" style={{ background: "var(--bg-card)", color: "var(--text-muted)" }}>
            <tr>
              <th className="px-4 py-3 text-left">Usuario</th>
              <th className="px-4 py-3 text-left">Plan</th>
              <th className="px-4 py-3 text-right">XP</th>
              <th className="px-4 py-3 text-right">Simulacros</th>
              <th className="px-4 py-3 text-right">Vence</th>
              <th className="px-4 py-3 text-center">Acción</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center" style={{ color: "var(--text-muted)" }}>
                  Cargando...
                </td>
              </tr>
            ) : (
              data?.usuarios.map((u) => (
                <tr key={u.id} className="transition hover:bg-white/5" style={{ borderTop: "1px solid var(--border-subtle)" }}>
                  <td className="px-4 py-3">
                    <p className="font-medium" style={{ color: "var(--text-primary)" }}>{u.nombre}</p>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>{u.email}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="px-2 py-1 rounded-full text-xs font-semibold"
                      style={{ backgroundColor: PLAN_COLORS[u.suscripcion?.plan ?? "GRATUITO"] + "33", color: PLAN_COLORS[u.suscripcion?.plan ?? "GRATUITO"] }}
                    >
                      {u.suscripcion?.plan ?? "GRATUITO"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-mono" style={{ color: "var(--gold-500)" }}>
                    {u.xpTotal.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-right" style={{ color: "var(--text-secondary)" }}>
                    {u.simulacrosTotal}
                  </td>
                  <td className="px-4 py-3 text-right text-xs" style={{ color: "var(--text-muted)" }}>
                    {u.suscripcion?.finAt
                      ? new Date(u.suscripcion.finAt).toLocaleDateString("es-CO")
                      : "—"}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => { setAssignTarget(u); setMsg(""); }}
                      className="btn-primary text-xs"
                      style={{ padding: "0.25rem 0.75rem" }}
                    >
                      Asignar plan
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {data && data.total > 20 && (
        <div className="flex items-center justify-between text-sm" style={{ color: "var(--text-muted)" }}>
          <span>{data.total} usuarios en total</span>
          <div className="flex gap-2">
            <button
              disabled={page === 0}
              onClick={() => setPage((p) => p - 1)}
              className="btn-secondary disabled:opacity-30"
              style={{ padding: "0.25rem 0.75rem" }}
            >
              ← Anterior
            </button>
            <span className="px-3 py-1">Página {page + 1}</span>
            <button
              disabled={(page + 1) * 20 >= data.total}
              onClick={() => setPage((p) => p + 1)}
              className="btn-secondary disabled:opacity-30"
              style={{ padding: "0.25rem 0.75rem" }}
            >
              Siguiente →
            </button>
          </div>
        </div>
      )}

      {/* Modal asignar plan */}
      {assignTarget && (
        <div className="modal-backdrop">
          <div className="modal w-full max-w-md space-y-4">
            <h3 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>Asignar membresía</h3>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Usuario: <span style={{ color: "var(--text-primary)" }}>{assignTarget.email}</span>
            </p>

            <div>
              <label className="text-sm block mb-1" style={{ color: "var(--text-muted)" }}>Plan</label>
              <select
                value={assignPlan}
                onChange={(e) => setAssignPlan(e.target.value)}
                className="w-full rounded-lg px-3 py-2 focus:outline-none"
                style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-default)", color: "var(--text-primary)" }}
              >
                {PLAN_ORDER.map((p) => {
                  const cfg = planes.find((pl) => pl.plan === p);
                  return (
                    <option key={p} value={p}>
                      {cfg?.emoji} {cfg?.nombre ?? p} — {cfg ? formatCOP(cfg.precioMensualCOP) : ""}
                    </option>
                  );
                })}
              </select>
            </div>

            {assignPlan !== "GRATUITO" && (
              <div>
                <label className="text-sm block mb-1" style={{ color: "var(--text-muted)" }}>Duración (meses)</label>
                <input
                  type="number"
                  min={1}
                  max={12}
                  value={assignMeses}
                  onChange={(e) => setAssignMeses(parseInt(e.target.value) || 1)}
                  className="w-full rounded-lg px-3 py-2 focus:outline-none"
                  style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-default)", color: "var(--text-primary)" }}
                />
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button
                onClick={asignarPlan}
                disabled={assigning}
                className="flex-1 btn-primary disabled:opacity-50"
              >
                {assigning ? "Asignando..." : "✅ Confirmar"}
              </button>
              <button
                onClick={() => setAssignTarget(null)}
                className="btn-secondary"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────
export default function AdminMembresiasPage() {
  const [tab, setTab] = useState<"planes" | "usuarios">("planes");
  const [planes, setPlanes] = useState<PlanConfig[]>([]);
  const [loadingPlanes, setLoadingPlanes] = useState(true);

  useEffect(() => {
    fetch("/api/admin/planes")
      .then((r) => r.json())
      .then((data) => {
        const ordered = PLAN_ORDER.map((p) => data.find((pl: PlanConfig) => pl.plan === p)).filter(Boolean);
        setPlanes(ordered);
        setLoadingPlanes(false);
      });
  }, []);

  function handlePlanSaved(updated: PlanConfig) {
    setPlanes((prev) => prev.map((p) => (p.plan === updated.plan ? updated : p)));
  }

  return (
    <div className="min-h-screen p-6 md:p-8" style={{ background: "var(--bg-base)", color: "var(--text-primary)" }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <a href="/admin" className="text-sm transition hover:opacity-80" style={{ color: "var(--text-muted)" }}>
            ← Panel Admin
          </a>
          <h1 className="text-3xl font-bold mt-2" style={{ color: "var(--text-primary)" }}>💎 Gestión de Membresías</h1>
          <p className="mt-1" style={{ color: "var(--text-muted)" }}>
            Configura los planes y asigna membresías a usuarios
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 rounded-xl p-1 mb-8 w-fit" style={{ background: "var(--bg-card)" }}>
          {(["planes", "usuarios"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="px-6 py-2 rounded-lg text-sm font-semibold transition capitalize"
              style={
                tab === t
                  ? { background: "var(--btn-blue)", color: "var(--text-primary)" }
                  : { color: "var(--text-muted)", background: "transparent" }
              }
            >
              {t === "planes" ? "📋 Planes" : "👤 Usuarios"}
            </button>
          ))}
        </div>

        {/* Planes Tab */}
        {tab === "planes" && (
          <div>
            {loadingPlanes ? (
              <p style={{ color: "var(--text-muted)" }}>Cargando planes...</p>
            ) : planes.length === 0 ? (
              <div className="rounded-xl p-6 text-center" style={{ background: "rgba(251,191,36,0.10)", border: "1px solid rgba(251,191,36,0.35)" }}>
                <p className="font-semibold mb-2" style={{ color: "var(--warning)" }}>No hay planes configurados</p>
                <p className="text-sm" style={{ color: "var(--warning)" }}>
                  Ejecuta en terminal: <code className="px-2 py-0.5 rounded" style={{ background: "rgba(0,0,0,0.3)" }}>npx ts-node scripts/seed-planes.ts</code>
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {planes.map((plan) => (
                  <EditablePlanCard key={plan.plan} plan={plan} onSave={handlePlanSaved} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Usuarios Tab */}
        {tab === "usuarios" && <UsuariosTab planes={planes} />}
      </div>
    </div>
  );
}
