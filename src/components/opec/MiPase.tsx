"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface OpecMin {
  id: string;
  nombreCargo: string;
  entidad: string;
}

interface Estado {
  cupos: number;
  activo: { venceAt: string; usados: number; disponibles: number; opecs: OpecMin[] } | null;
  anterior: { venceAt: string; opecs: OpecMin[] } | null;
  renovables: OpecMin[];
  diario: { opec: OpecMin; venceAt: string; usado: boolean; vigente: boolean } | null;
}

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("es-CO", { day: "numeric", month: "long", year: "numeric" });

/**
 * Estado del pase trimestral: qué OPECs cubre, cuándo vence y qué hacer al
 * renovar — seguir con las mismas (un clic) o cambiarlas.
 */
export function MiPase() {
  const router = useRouter();
  const [estado, setEstado] = useState<Estado | null>(null);
  const [ocupado, setOcupado] = useState(false);

  const cargar = useCallback(async () => {
    const res = await fetch("/api/pase");
    if (!res.ok) return setEstado(null);
    setEstado(await res.json());
  }, []);

  useEffect(() => { cargar(); }, [cargar]);

  async function mantener(opecIds: string[]) {
    setOcupado(true);
    const res = await fetch("/api/pase/mantener", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ opecIds }),
    });
    if (!res.ok) {
      const b = await res.json().catch(() => ({}));
      alert(b.error ?? "No se pudo aplicar el pase.");
    }
    await cargar();
    router.refresh();
    setOcupado(false);
  }

  async function comprar(opecId: string, tipo: "evento" | "diario") {
    setOcupado(true);
    const res = await fetch("/api/pagos/wompi/iniciar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ opecId, tipo }),
    });
    const data = await res.json().catch(() => ({}));
    if (data.url) window.location.href = data.url;
    else {
      alert(data.error ?? "No se pudo abrir el pago.");
      setOcupado(false);
    }
  }

  // Sin ningún pase comprado: nada que mostrar aquí (el CTA vive en la OPEC).
  if (!estado || (!estado.activo && !estado.anterior && !estado.diario)) return null;

  const { activo, anterior, renovables, cupos, diario } = estado;

  return (
    <div className="space-y-4">
      {/* ── Pase diario ($6.000): repetir en la misma OPEC o cambiar ── */}
      {diario && (
        <div className="card-elevated p-6 space-y-3">
          <div className="flex items-start justify-between flex-wrap gap-3">
            <div className="min-w-0">
              <span className="eyebrow">Tu pase diario</span>
              <Link href={`/opecs/${diario.opec.id}`} className="block mt-1 min-w-0">
                <span className="font-semibold block truncate" style={{ color: "var(--text-primary)" }}>
                  {diario.opec.nombreCargo}
                </span>
                <span className="text-xs block truncate" style={{ color: "var(--text-muted)" }}>
                  {diario.opec.entidad}
                </span>
              </Link>
            </div>
            <span
              className="tag self-start"
              style={
                diario.vigente
                  ? { background: "rgba(39,174,96,0.12)", color: "var(--success)" }
                  : { background: "var(--bg-elevated)", color: "var(--text-muted)" }
              }
            >
              {diario.vigente ? `Listo · vence ${fmt(diario.venceAt)}` : diario.usado ? "Ya lo usaste" : "Venció"}
            </span>
          </div>

          {diario.vigente ? (
            <Link href={`/opecs/${diario.opec.id}/simulacro`} className="btn-primary text-sm inline-block">
              Iniciar mi simulacro →
            </Link>
          ) : (
            <div className="flex flex-wrap gap-2">
              <button
                className="btn-primary text-sm"
                disabled={ocupado}
                onClick={() => comprar(diario.opec.id, "diario")}
              >
                {ocupado ? "Abriendo pago…" : "Repetir en esta OPEC · $6.000"}
              </button>
              <Link href="/opecs" className="btn-secondary text-sm">
                Cambiar de OPEC
              </Link>
            </div>
          )}
        </div>
      )}

      {(activo || anterior) && (
    <div className="card-elevated p-6 space-y-4">
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <span className="eyebrow">Tu pase trimestral</span>
          <h3 className="text-xl font-bold mt-1" style={{ fontFamily: "var(--font-display)" }}>
            {activo ? `Vence el ${fmt(activo.venceAt)}` : `Venció el ${fmt(anterior!.venceAt)}`}
          </h3>
        </div>
        {activo && (
          <span className="tag tag-gold self-start">
            {activo.usados} de {cupos} OPECs · {activo.disponibles} cupos libres
          </span>
        )}
      </div>

      {activo && activo.opecs.length > 0 && (
        <ul className="space-y-2">
          {activo.opecs.map((o) => (
            <li key={o.id} className="flex items-center justify-between gap-3 text-sm">
              <Link href={`/opecs/${o.id}`} className="min-w-0">
                <span className="font-medium block truncate" style={{ color: "var(--text-primary)" }}>
                  {o.nombreCargo}
                </span>
                <span className="text-xs block truncate" style={{ color: "var(--text-muted)" }}>
                  {o.entidad}
                </span>
              </Link>
              <span className="text-xs shrink-0" style={{ color: "var(--success)" }}>✓ activa</span>
            </li>
          ))}
        </ul>
      )}

      {/* Renovó y le sobran cupos: puede recuperar las del trimestre pasado. */}
      {activo && activo.disponibles > 0 && renovables.length > 0 && (
        <div
          className="rounded-xl p-4 space-y-3"
          style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)" }}
        >
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Del trimestre anterior te quedaron {renovables.length}{" "}
            {renovables.length === 1 ? "OPEC" : "OPECs"} sin renovar. ¿Sigues con{" "}
            {renovables.length === 1 ? "ella" : "ellas"} o prefieres cambiar?
          </p>
          <ul className="text-xs space-y-1" style={{ color: "var(--text-muted)" }}>
            {renovables.map((o) => (
              <li key={o.id} className="truncate">• {o.nombreCargo} — {o.entidad}</li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-2">
            <button
              className="btn-primary text-sm"
              disabled={ocupado || renovables.length > activo.disponibles}
              onClick={() => mantener(renovables.slice(0, activo.disponibles).map((o) => o.id))}
            >
              {ocupado ? "Aplicando…" : `Seguir con ${renovables.length === 1 ? "esa" : "esas"}`}
            </button>
            <Link href="/opecs" className="btn-secondary text-sm">
              Elegir otras OPECs
            </Link>
          </div>
        </div>
      )}

      {activo && activo.disponibles > 0 && renovables.length === 0 && (
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          Te {activo.disponibles === 1 ? "queda" : "quedan"} {activo.disponibles}{" "}
          {activo.disponibles === 1 ? "cupo" : "cupos"}.{" "}
          <Link href="/opecs" style={{ color: "var(--accent-500)" }}>
            Elige otra OPEC
          </Link>{" "}
          y la desbloqueas sin pagar de nuevo.
        </p>
      )}

      {/* Pase vencido: renovar manteniendo las mismas OPECs, o cambiarlas. */}
      {!activo && anterior && (
        <div className="space-y-3">
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Tu pase cubría {anterior.opecs.length}{" "}
            {anterior.opecs.length === 1 ? "OPEC" : "OPECs"}. Renuévalo y sigues con{" "}
            {anterior.opecs.length === 1 ? "la misma" : "las mismas"}, o eliges otras.
          </p>
          <ul className="text-xs space-y-1" style={{ color: "var(--text-muted)" }}>
            {anterior.opecs.map((o) => (
              <li key={o.id} className="truncate">• {o.nombreCargo} — {o.entidad}</li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-2">
            {anterior.opecs[0] && (
              <button
                className="btn-primary text-sm"
                disabled={ocupado}
                onClick={() => comprar(anterior.opecs[0].id, "evento")}
              >
                {ocupado ? "Abriendo pago…" : "Renovar y seguir con las mismas"}
              </button>
            )}
            <Link href="/opecs" className="btn-secondary text-sm">
              Renovar con otras OPECs
            </Link>
          </div>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            Al renovar recuperas la primera de inmediato; las demás las reactivas
            aquí con un clic.
          </p>
        </div>
      )}
    </div>
      )}
    </div>
  );
}
