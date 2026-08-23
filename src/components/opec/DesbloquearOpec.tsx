"use client";

import { useState } from "react";

export function DesbloquearOpec({
  opecId,
  precioCop,
}: {
  opecId: string;
  precioCop: number;
}) {
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function pagar() {
    setCargando(true);
    setError(null);
    try {
      const r = await fetch("/api/pagos/wompi/iniciar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ opecId }),
      });
      const data = await r.json();
      if (!r.ok || !data.url) {
        setError(data.error ?? "No se pudo iniciar el pago.");
        setCargando(false);
        return;
      }
      window.location.href = data.url; // → Wompi Checkout
    } catch {
      setError("Falla de red. Intenta de nuevo.");
      setCargando(false);
    }
  }

  const precio = precioCop.toLocaleString("es-CO");

  return (
    <div className="space-y-2">
      <button
        onClick={pagar}
        disabled={cargando}
        className="btn-primary block w-full text-center px-6 py-4 text-lg rounded-2xl disabled:opacity-60"
      >
        {cargando ? "Abriendo pago seguro…" : `🔓 Desbloquear ilimitado · $${precio}`}
      </button>
      <p className="text-xs text-center" style={{ color: "var(--text-muted)" }}>
        Pago único · práctica ilimitada hasta el día del examen · PSE y tarjetas
      </p>
      {error && (
        <p className="text-xs text-center" style={{ color: "var(--error)" }}>
          {error}
        </p>
      )}
    </div>
  );
}
