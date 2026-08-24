"use client";

import { useState } from "react";

export function DesbloquearOpec({
  opecId,
  precioCop,
  precioDiarioCop,
}: {
  opecId: string;
  precioCop: number;
  precioDiarioCop: number;
}) {
  const [cargando, setCargando] = useState<"diario" | "evento" | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function pagar(tipo: "diario" | "evento") {
    setCargando(tipo);
    setError(null);
    try {
      const r = await fetch("/api/pagos/wompi/iniciar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ opecId, tipo }),
      });
      const data = await r.json();
      if (!r.ok || !data.url) {
        setError(data.error ?? "No se pudo iniciar el pago.");
        setCargando(null);
        return;
      }
      window.location.href = data.url; // → Wompi Checkout
    } catch {
      setError("Falla de red. Intenta de nuevo.");
      setCargando(null);
    }
  }

  const evento = precioCop.toLocaleString("es-CO");
  const diario = precioDiarioCop.toLocaleString("es-CO");

  return (
    <div className="space-y-2">
      <button
        onClick={() => pagar("diario")}
        disabled={cargando !== null}
        className="block w-full text-center px-6 py-3 rounded-2xl font-semibold transition-all disabled:opacity-60"
        style={{ background: "rgba(44, 84, 122, 0.15)", color: "#4A90D9", border: "1px solid rgba(44, 84, 122, 0.35)" }}
      >
        {cargando === "diario" ? "Abriendo pago…" : `⚡ Pase diario · $${diario}`}
      </button>
      <p className="text-xs text-center" style={{ color: "var(--text-muted)" }}>
        Un simulacro completo, válido 24 h. Ideal para foguearte.
      </p>

      <button
        onClick={() => pagar("evento")}
        disabled={cargando !== null}
        className="btn-primary block w-full text-center px-6 py-4 text-lg rounded-2xl disabled:opacity-60"
      >
        {cargando === "evento" ? "Abriendo pago…" : `🔓 3 meses ilimitados · $${evento}`}
      </button>
      <p className="text-xs text-center" style={{ color: "var(--text-muted)" }}>
        Pago único · práctica ilimitada en hasta 3 OPECs · PSE y tarjetas
      </p>

      {error && (
        <p className="text-xs text-center" style={{ color: "var(--error)" }}>
          {error}
        </p>
      )}
    </div>
  );
}
