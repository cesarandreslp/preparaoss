"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";

interface Opec {
  id: string;
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
        <h1 className="text-xl font-bold text-white">Ofertas CNSC</h1>
        <p className="text-slate-400 text-sm">
          {total.toLocaleString()} OPECs disponibles
        </p>
      </div>

      {/* Búsqueda */}
      <input
        type="search"
        placeholder="Busca cargo o entidad..."
        value={busqueda}
        onChange={(e) => { setBusqueda(e.target.value); setPagina(1); }}
        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      {/* Lista */}
      {cargando ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-24 bg-white/5 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : opecs.length === 0 ? (
        <div className="text-center py-16 text-slate-400">
          No se encontraron OPECs
        </div>
      ) : (
        <div className="space-y-3">
          {opecs.map((opec) => (
            <Link
              key={opec.id}
              href={`/opecs/${opec.id}`}
              className="block bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-4 transition-colors"
            >
              <div className="flex justify-between items-start gap-2">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white truncate">{opec.nombreCargo}</p>
                  <p className="text-slate-400 text-sm truncate">{opec.entidad}</p>
                  <p className="text-slate-500 text-xs mt-1">
                    {opec.municipio}, {opec.departamento} · {opec.numVacantes} vacante
                    {opec.numVacantes !== 1 ? "s" : ""}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs bg-indigo-600/30 text-indigo-300 px-2 py-1 rounded-lg">
                    {opec.nivelJerarquico}
                  </span>
                  {opec._count.preguntas > 0 && (
                    <p className="text-xs text-green-400 mt-1">✅ Simulacros listos</p>
                  )}
                </div>
              </div>

              {opec.fechaLimiteInscripcion && (
                <p className="text-xs text-orange-400 mt-2">
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
            className="px-4 py-2 bg-white/10 rounded-xl disabled:opacity-40 text-sm"
          >
            ← Anterior
          </button>
          <span className="px-4 py-2 text-slate-400 text-sm">
            Pág. {pagina} de {Math.ceil(total / 20)}
          </span>
          <button
            onClick={() => setPagina((p) => p + 1)}
            disabled={pagina >= Math.ceil(total / 20)}
            className="px-4 py-2 bg-white/10 rounded-xl disabled:opacity-40 text-sm"
          >
            Siguiente →
          </button>
        </div>
      )}
    </div>
  );
}
