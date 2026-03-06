"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

interface RankingEntry {
  posicion: number;
  userId: string;
  nombre: string;
  nivel: number;
  xpSemanal: number;
  xpTotal: number;
  esTuyo: boolean;
}

function RankingContent() {
  const searchParams = useSearchParams();
  const opecId = searchParams.get("opecId");
  const [ranking, setRanking] = useState<RankingEntry[]>([]);
  const [semana, setSemana] = useState<string>("");
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (!opecId) return;
    setCargando(true);
    fetch(`/api/ranking?opecId=${opecId}`)
      .then((r) => r.json())
      .then((d) => {
        setRanking(d.rankings ?? []);
        setSemana(d.semana ? new Date(d.semana).toLocaleDateString("es-CO") : "");
        setCargando(false);
      });
  }, [opecId]);

  if (!opecId) {
    return (
      <div className="text-center py-16" style={{ color: '#A8BFDC' }}>
        <p className="text-4xl mb-4">🏆</p>
        <p>Selecciona una OPEC para ver su ranking</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold" style={{ fontFamily: 'var(--font-display)', color: '#F0F4FA' }}>Ranking semanal</h1>
        {semana && <p className="text-sm" style={{ color: '#A8BFDC' }}>Semana del {semana}</p>}
      </div>

      {cargando ? (
        <div className="space-y-3">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="h-16 rounded-2xl animate-pulse" style={{ background: 'rgba(30,61,110,0.40)' }} />
          ))}
        </div>
      ) : ranking.length === 0 ? (
        <div className="text-center py-16" style={{ color: '#A8BFDC' }}>
          Aún no hay participantes en esta OPEC
        </div>
      ) : (
        <div className="space-y-2">
          {ranking.map((entry) => {
            const medallaIcon =
              entry.posicion === 1 ? "🥇" :
              entry.posicion === 2 ? "🥈" :
              entry.posicion === 3 ? "🥉" : null;

            return (
              <div
                key={entry.userId}
                className="flex items-center gap-4 px-4 py-3 rounded-2xl border transition-all"
              style={entry.esTuyo
                ? { background: 'rgba(37,99,235,0.18)', borderColor: 'rgba(74,144,217,0.50)' }
                : { background: 'rgba(30,61,110,0.30)', borderColor: '#2A4A7F' }}
              >
                <div className="w-8 text-center font-bold text-sm" style={{ color: '#A8BFDC' }}>
                  {medallaIcon ?? `#${entry.posicion}`}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate" style={{ color: entry.esTuyo ? '#4A90D9' : '#F0F4FA' }}>
                    {entry.nombre}
                    {entry.esTuyo && <span className="text-xs ml-2" style={{ color: '#4A90D9' }}>(tú)</span>}
                  </p>
                  <p className="text-xs" style={{ color: '#6B8BAD' }}>Nivel {entry.nivel}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-bold text-sm" style={{ color: '#F5A623', fontFamily: 'var(--font-display)' }}>
                    {entry.xpSemanal.toLocaleString()} XP
                  </p>
                  <p className="text-xs" style={{ color: '#6B8BAD' }}>total: {entry.xpTotal.toLocaleString()}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function RankingPage() {
  return (
    <Suspense fallback={<div className="text-center py-16 text-slate-400">Cargando...</div>}>
      <RankingContent />
    </Suspense>
  );
}
