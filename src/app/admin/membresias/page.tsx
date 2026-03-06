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
      className="bg-gray-900 rounded-2xl p-6 flex flex-col gap-4 border-2 transition-all"
      style={{ borderColor: editing ? borderColor : "#374151" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-3xl">{draft.emoji}</span>
          {editing ? (
            <input
              className="bg-gray-800 rounded px-2 py-1 text-white text-xl font-bold w-32"
              value={draft.nombre}
              onChange={(e) => setDraft({ ...draft, nombre: e.target.value })}
            />
          ) : (
            <span className="text-xl font-bold">{draft.nombre}</span>
          )}
        </div>
        <span
          className={`text-xs px-2 py-1 rounded-full font-semibold ${
            draft.activo ? "bg-green-900 text-green-300" : "bg-red-900 text-red-300"
          }`}
        >
          {draft.activo ? "Activo" : "Inactivo"}
        </span>
      </div>

      {/* Precio */}
      <div>
        {editing ? (
          <input
            type="number"
            className="bg-gray-800 rounded px-2 py-1 text-white text-2xl font-bold w-40"
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
          className="bg-gray-800 rounded px-2 py-1 text-gray-300 text-sm w-full"
          rows={2}
          value={draft.descripcion}
          onChange={(e) => setDraft({ ...draft, descripcion: e.target.value })}
        />
      ) : (
        <p className="text-gray-400 text-sm">{draft.descripcion}</p>
      )}

      {/* Límites */}
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="bg-gray-800 rounded-lg p-3">
          <p className="text-gray-500">Simulacros/mes</p>
          {editing ? (
            <input
              type="number"
              min={-1}
              className="bg-gray-700 rounded px-1 text-white w-20 font-bold"
              value={draft.simulacrosMes}
              onChange={(e) =>
                setDraft({ ...draft, simulacrosMes: parseInt(e.target.value) || 0 })
              }
            />
          ) : (
            <p className="font-bold text-white">
              {draft.simulacrosMes === -1 ? "∞ Ilimitados" : draft.simulacrosMes}
            </p>
          )}
        </div>
        <div className="bg-gray-800 rounded-lg p-3">
          <p className="text-gray-500">Preguntas/simulacro</p>
          {editing ? (
            <input
              type="number"
              className="bg-gray-700 rounded px-1 text-white w-16 font-bold"
              value={draft.preguntasPorSimulacro}
              onChange={(e) =>
                setDraft({ ...draft, preguntasPorSimulacro: parseInt(e.target.value) || 10 })
              }
            />
          ) : (
            <p className="font-bold text-white">{draft.preguntasPorSimulacro}</p>
          )}
        </div>
      </div>

      {/* Features */}
      <div>
        <p className="text-gray-500 text-xs mb-1 uppercase tracking-wider">Beneficios</p>
        {editing ? (
          <textarea
            className="bg-gray-800 rounded px-2 py-1 text-gray-300 text-sm w-full font-mono"
            rows={5}
            placeholder="Un beneficio por línea"
            value={featuresText}
            onChange={(e) => setFeaturesText(e.target.value)}
          />
        ) : (
          <ul className="space-y-1">
            {draft.features.map((f, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
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
            <p className="text-gray-500 text-xs mb-1">Color</p>
            <input
              type="color"
              value={draft.color}
              onChange={(e) => setDraft({ ...draft, color: e.target.value })}
              className="w-10 h-10 rounded cursor-pointer bg-transparent border-0"
            />
          </div>
          <div>
            <p className="text-gray-500 text-xs mb-1">Emoji</p>
            <input
              className="bg-gray-800 rounded px-2 py-1 text-white w-16 text-xl text-center"
              value={draft.emoji}
              onChange={(e) => setDraft({ ...draft, emoji: e.target.value })}
            />
          </div>
          <div className="flex items-end gap-2 ml-auto">
            <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
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
      <div className="flex gap-2 mt-auto pt-2 border-t border-gray-800">
        {editing ? (
          <>
            <button
              onClick={save}
              disabled={saving}
              className="flex-1 bg-green-700 hover:bg-green-600 disabled:opacity-50 py-2 rounded-lg text-sm font-semibold transition"
            >
              {saving ? "Guardando..." : "💾 Guardar"}
            </button>
            <button
              onClick={() => { setEditing(false); setDraft(plan); setFeaturesText(plan.features.join("\n")); }}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition"
            >
              Cancelar
            </button>
          </>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="w-full py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-semibold transition"
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
        <div className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-sm">
          {msg}
        </div>
      )}

      {/* Search */}
      <input
        type="text"
        placeholder="Buscar por email o nombre..."
        value={search}
        onChange={(e) => { setSearch(e.target.value); setPage(0); }}
        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
      />

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-800">
        <table className="w-full text-sm">
          <thead className="bg-gray-900 text-gray-400 uppercase text-xs">
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
                <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                  Cargando...
                </td>
              </tr>
            ) : (
              data?.usuarios.map((u) => (
                <tr key={u.id} className="border-t border-gray-800 hover:bg-gray-800/50 transition">
                  <td className="px-4 py-3">
                    <p className="font-medium text-white">{u.nombre}</p>
                    <p className="text-gray-500 text-xs">{u.email}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="px-2 py-1 rounded-full text-xs font-semibold text-white"
                      style={{ backgroundColor: PLAN_COLORS[u.suscripcion?.plan ?? "GRATUITO"] + "33", color: PLAN_COLORS[u.suscripcion?.plan ?? "GRATUITO"] }}
                    >
                      {u.suscripcion?.plan ?? "GRATUITO"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right text-yellow-400 font-mono">
                    {u.xpTotal.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-right text-gray-400">
                    {u.simulacrosTotal}
                  </td>
                  <td className="px-4 py-3 text-right text-gray-400 text-xs">
                    {u.suscripcion?.finAt
                      ? new Date(u.suscripcion.finAt).toLocaleDateString("es-CO")
                      : "—"}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => { setAssignTarget(u); setMsg(""); }}
                      className="bg-blue-700 hover:bg-blue-600 px-3 py-1 rounded-lg text-xs font-semibold transition"
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
        <div className="flex items-center justify-between text-sm text-gray-400">
          <span>{data.total} usuarios en total</span>
          <div className="flex gap-2">
            <button
              disabled={page === 0}
              onClick={() => setPage((p) => p - 1)}
              className="px-3 py-1 bg-gray-800 rounded disabled:opacity-30 hover:bg-gray-700 transition"
            >
              ← Anterior
            </button>
            <span className="px-3 py-1">Página {page + 1}</span>
            <button
              disabled={(page + 1) * 20 >= data.total}
              onClick={() => setPage((p) => p + 1)}
              className="px-3 py-1 bg-gray-800 rounded disabled:opacity-30 hover:bg-gray-700 transition"
            >
              Siguiente →
            </button>
          </div>
        </div>
      )}

      {/* Modal asignar plan */}
      {assignTarget && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-md border border-gray-700 space-y-4">
            <h3 className="text-lg font-bold">Asignar membresía</h3>
            <p className="text-gray-400 text-sm">
              Usuario: <span className="text-white">{assignTarget.email}</span>
            </p>

            <div>
              <label className="text-gray-400 text-sm block mb-1">Plan</label>
              <select
                value={assignPlan}
                onChange={(e) => setAssignPlan(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
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
                <label className="text-gray-400 text-sm block mb-1">Duración (meses)</label>
                <input
                  type="number"
                  min={1}
                  max={12}
                  value={assignMeses}
                  onChange={(e) => setAssignMeses(parseInt(e.target.value) || 1)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button
                onClick={asignarPlan}
                disabled={assigning}
                className="flex-1 bg-blue-700 hover:bg-blue-600 disabled:opacity-50 py-2 rounded-lg font-semibold transition"
              >
                {assigning ? "Asignando..." : "✅ Confirmar"}
              </button>
              <button
                onClick={() => setAssignTarget(null)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition"
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
    <div className="min-h-screen bg-gray-950 text-white p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <a href="/admin" className="text-gray-500 text-sm hover:text-white transition">
            ← Panel Admin
          </a>
          <h1 className="text-3xl font-bold mt-2">💎 Gestión de Membresías</h1>
          <p className="text-gray-400 mt-1">
            Configura los planes y asigna membresías a usuarios
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-900 rounded-xl p-1 mb-8 w-fit">
          {(["planes", "usuarios"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-6 py-2 rounded-lg text-sm font-semibold transition capitalize ${
                tab === t ? "bg-blue-700 text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              {t === "planes" ? "📋 Planes" : "👤 Usuarios"}
            </button>
          ))}
        </div>

        {/* Planes Tab */}
        {tab === "planes" && (
          <div>
            {loadingPlanes ? (
              <p className="text-gray-500">Cargando planes...</p>
            ) : planes.length === 0 ? (
              <div className="bg-yellow-900/30 border border-yellow-700 rounded-xl p-6 text-center">
                <p className="text-yellow-300 font-semibold mb-2">No hay planes configurados</p>
                <p className="text-yellow-500 text-sm">
                  Ejecuta en terminal: <code className="bg-black/30 px-2 py-0.5 rounded">npx ts-node scripts/seed-planes.ts</code>
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
