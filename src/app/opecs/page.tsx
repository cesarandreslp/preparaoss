"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";

interface Opec {
  id: string;
  simoId: string;
  numerConvocatoria: string | null;
  asignacionBasica: number | null;
  nombreCargo: string;
  entidad: string;
  nivelJerarquico: string;
  numVacantes: number;
  municipio: string;
  departamento: string;
  fechaLimiteInscripcion: string | null;
  tipoPruebas: string[];
  _count: { preguntas: number; inscripciones: number };
}

export default function OpecsPage() {
  const [opecs, setOpecs] = useState<Opec[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [pagina, setPagina] = useState(1);
  const [total, setTotal] = useState(0);
  const [cargando, setCargando] = useState(false);

  const cargar = useCallback(async () => {
    setCargando(true);
    const params = new URLSearchParams({ pagina: String(pagina) });
    if (busqueda) params.set("q", busqueda);

    const res = await fetch(`/api/opecs?${params}`);
    const data = await res.json();
    setOpecs(data.opecs ?? []);
    setTotal(data.total ?? 0);
    setCargando(false);
  }, [busqueda, pagina]);

  useEffect(() => {
    const t = setTimeout(cargar, busqueda ? 350 : 0);
    return () => clearTimeout(t);
  }, [cargar, busqueda]);

  return (
    <div className="space-y-6">
      <div>
        <span className="eyebrow">Catálogo</span>
        <h1
          className="text-3xl font-extrabold mt-1"
          style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
        >
          Ofertas CNSC
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
          {total.toLocaleString("es-CO")} OPECs disponibles · sincronizadas a diario
        </p>
        <a
          href="/opecs/cargar"
          className="inline-flex items-center gap-1.5 mt-3 text-sm font-medium"
          style={{ color: "#4A90D9" }}
        >
          ¿No encuentras tu OPEC? Cárgala tú mismo →
        </a>
      </div>

      {/* Búsqueda */}
      <div className="relative">
        <span
          className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
          style={{ color: "var(--text-muted)" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
        <input
          type="search"
          placeholder="Cargo, entidad o número OPEC…"
          value={busqueda}
          onChange={(e) => {
            setBusqueda(e.target.value);
            setPagina(1);
          }}
          className="input pl-11"
        />
      </div>

      {/* Lista */}
      {cargando ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-28 rounded-xl skeleton" />
          ))}
        </div>
      ) : opecs.length === 0 ? (
        <div
          className="card-elevated text-center py-16"
          style={{ borderStyle: "dashed", borderColor: "var(--border-default)" }}
        >
          <p className="text-5xl mb-3 opacity-60">🔍</p>
          <p className="font-semibold">No se encontraron OPECs</p>
          <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
            Prueba con otros términos de búsqueda
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {opecs.map((opec) => (
            <Link key={opec.id} href={`/opecs/${opec.id}`} className="card flex flex-col gap-3 group">
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="tag tag-gold">OPEC #{opec.simoId}</span>
                  {opec.numerConvocatoria && (
                    <span className="tag tag-blue">Conv. {opec.numerConvocatoria}</span>
                  )}
                  <span className="tag tag-muted">{opec.nivelJerarquico}</span>
                </div>
                {opec._count.preguntas > 0 && (
                  <span className="tag tag-success shrink-0">✓ Simulacros</span>
                )}
              </div>
              <div>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  {opec.entidad}
                </p>
                <h3
                  className="text-lg font-bold leading-snug mt-0.5 transition-colors group-hover:text-[var(--gold-300)]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {opec.nombreCargo}
                </h3>
              </div>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs" style={{ color: "var(--text-muted)" }}>
                <span>📍 {opec.municipio}, {opec.departamento}</span>
                <span>👥 {opec.numVacantes} vacante{opec.numVacantes !== 1 ? "s" : ""}</span>
                {opec.asignacionBasica && (
                  <span style={{ color: "var(--success)" }}>
                    💰{" "}
                    {opec.asignacionBasica.toLocaleString("es-CO", {
                      style: "currency",
                      currency: "COP",
                      maximumFractionDigits: 0,
                    })}
                  </span>
                )}
                {opec.fechaLimiteInscripcion && (
                  <span style={{ color: "var(--gold-300)" }}>
                    🗓{" "}
                    {new Date(opec.fechaLimiteInscripcion).toLocaleDateString("es-CO", {
                      day: "numeric",
                      month: "short",
                    })}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Paginación */}
      {total > 20 && (
        <div className="flex justify-center items-center gap-3 pt-6">
          <button
            onClick={() => setPagina((p) => Math.max(1, p - 1))}
            disabled={pagina === 1}
            className="btn-secondary disabled:opacity-40 disabled:cursor-not-allowed"
          >
            ← Anterior
          </button>
          <span className="text-sm" style={{ color: "var(--text-muted)" }}>
            {pagina} / {Math.ceil(total / 20)}
          </span>
          <button
            onClick={() => setPagina((p) => p + 1)}
            disabled={pagina >= Math.ceil(total / 20)}
            className="btn-secondary disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Siguiente →
          </button>
        </div>
      )}
    </div>
  );
}
