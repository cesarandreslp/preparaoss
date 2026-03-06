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
    cargar();
  }, [cargar]);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold" style={{ fontFamily: 'var(--font-display)', color: '#F0F4FA' }}>Ofertas CNSC</h1>
        <p className="text-sm" style={{ color: '#A8BFDC' }}>
          {total.toLocaleString()} OPECs disponibles
        </p>
      </div>

      {/* Búsqueda */}
      <input
        type="search"
        placeholder="Busca cargo, entidad o número OPEC..."
        value={busqueda}
        onChange={(e) => { setBusqueda(e.target.value); setPagina(1); }}
        className="w-full rounded-xl px-4 py-3 focus:outline-none"
        style={{ background: 'rgba(30,61,110,0.40)', border: '1px solid #2A4A7F', color: '#F0F4FA' }}
      />

      {/* Lista */}
      {cargando ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-24 rounded-2xl animate-pulse" style={{ background: 'rgba(30,61,110,0.40)' }} />
          ))}
        </div>
      ) : opecs.length === 0 ? (
        <div className="text-center py-16" style={{ color: '#A8BFDC' }}>
          No se encontraron OPECs
        </div>
      ) : (
        <div className="space-y-3">
          {opecs.map((opec) => (
            <Link
              key={opec.id}
              href={`/opecs/${opec.id}`}
              className="block rounded-2xl p-4 transition-all hover:brightness-110"
              style={{ background: 'rgba(30,61,110,0.40)', border: '1px solid #2A4A7F' }}
            >
              <div className="flex justify-between items-start gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    {opec.numerConvocatoria && (
                      <span className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'rgba(245,166,35,0.15)', color: '#F5A623', border: '1px solid rgba(245,166,35,0.25)' }}>
                        Conv. {opec.numerConvocatoria}
                      </span>
                    )}
                  </div>
                  <p className="font-semibold truncate" style={{ color: '#F0F4FA' }}>{opec.nombreCargo}</p>
                  <p className="text-sm truncate" style={{ color: '#A8BFDC' }}>{opec.entidad}</p>
                  <p className="text-xs mt-1" style={{ color: '#6B8BAD' }}>
                    {opec.municipio}, {opec.departamento} · {opec.numVacantes} vacante
                    {opec.numVacantes !== 1 ? "s" : ""}
                  </p>
                  {opec.asignacionBasica && (
                    <p className="text-xs mt-1 font-medium" style={{ color: '#27AE60' }}>
                      💰 {opec.asignacionBasica.toLocaleString("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 })}/mes
                    </p>
                  )}
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs px-2 py-1 rounded-lg" style={{ background: 'rgba(74,144,217,0.20)', color: '#4A90D9' }}>
                    {opec.nivelJerarquico}
                  </span>
                  {opec._count.preguntas > 0 && (
                    <p className="text-xs mt-1" style={{ color: '#27AE60' }}>✅ Simulacros listos</p>
                  )}
                </div>
              </div>

              {opec.fechaLimiteInscripcion && (
                <p className="text-xs mt-2" style={{ color: '#F5A623' }}>
                  🗓 Cierra: {new Date(opec.fechaLimiteInscripcion).toLocaleDateString("es-CO")}
                </p>
              )}
            </Link>
          ))}
        </div>
      )}

      {/* Paginación */}
      {total > 20 && (
        <div className="flex justify-center gap-3 pt-4">
          <button
            onClick={() => setPagina((p) => Math.max(1, p - 1))}
            disabled={pagina === 1}
            className="px-4 py-2 rounded-xl disabled:opacity-40 text-sm"
            style={{ background: 'rgba(30,61,110,0.50)', color: '#A8BFDC', border: '1px solid #2A4A7F' }}
          >
            ← Anterior
          </button>
          <span className="px-4 py-2 text-sm" style={{ color: '#A8BFDC' }}>
            Pág. {pagina} de {Math.ceil(total / 20)}
          </span>
          <button
            onClick={() => setPagina((p) => p + 1)}
            disabled={pagina >= Math.ceil(total / 20)}
            className="px-4 py-2 rounded-xl disabled:opacity-40 text-sm"
            style={{ background: 'rgba(30,61,110,0.50)', color: '#A8BFDC', border: '1px solid #2A4A7F' }}
          >
            Siguiente →
          </button>
        </div>
      )}
    </div>
  );
}
