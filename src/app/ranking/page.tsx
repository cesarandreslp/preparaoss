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
      <div className="text-center py-16" style={{ color: 'var(--text-secondary)' }}>
        <p className="text-4xl mb-4">🏆</p>
        <p>Selecciona una OPEC para ver su ranking</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>Ranking semanal</h1>
        {semana && <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Semana del {semana}</p>}
      </div>

      {cargando ? (
        <div className="space-y-3">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="h-16 rounded-2xl animate-pulse" style={{ background: 'var(--bg-card)' }} />
          ))}
        </div>
      ) : ranking.length === 0 ? (
        <div className="text-center py-16" style={{ color: 'var(--text-secondary)' }}>
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
                ? { background: 'rgba(37,99,235,0.18)', borderColor: 'rgba(44, 84, 122, 0.50)' }
                : { background: 'var(--bg-card)', borderColor: 'var(--border-default)' }}
              >
                <div className="w-8 text-center font-bold text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {medallaIcon ?? `#${entry.posicion}`}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate" style={{ color: entry.esTuyo ? '#4A90D9' : 'var(--text-primary)' }}>
                    {entry.nombre}
                    {entry.esTuyo && <span className="text-xs ml-2" style={{ color: '#4A90D9' }}>(tú)</span>}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Nivel {entry.nivel}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-bold text-sm" style={{ color: 'var(--accent-500)', fontFamily: 'var(--font-display)' }}>
                    {entry.xpSemanal.toLocaleString()} XP
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>total: {entry.xpTotal.toLocaleString()}</p>
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
    <Suspense fallback={<div className="text-center py-16" style={{ color: 'var(--text-muted)' }}>Cargando...</div>}>
      <RankingContent />
    </Suspense>
  );
}
