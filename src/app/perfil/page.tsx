import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ensureUserProfile } from "@/lib/ensure-profile";
import {
  calcularNivel,
  porcentajeNivelActual,
  xpParaSiguienteNivel,
  NIVELES,
} from "@/lib/gamification";
import { formatXP } from "@/lib/utils";

export default async function PerfilPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  await ensureUserProfile(userId);

  const user = await prisma.userProfile.findUnique({
    where: { id: userId },
    select: {
      nombre: true,
      email: true,
      xpTotal: true,
      nivel: true,
      rachaActual: true,
      rachaMasLarga: true,
      simulacrosTotal: true,
      preguntasRespondidas: true,
      preguntasCorrectas: true,
      suscripcion: { select: { plan: true, simulacrosMes: true } },
      badges: {
        include: { badge: true },
        orderBy: { obtenidoAt: "desc" },
      },
    },
  });

  if (!user) redirect("/sign-in");

  const nivelInfo = calcularNivel(user.xpTotal);
  const progreso = porcentajeNivelActual(user.xpTotal);
  const xpFaltante = xpParaSiguienteNivel(user.xpTotal);
  const precision = user.preguntasRespondidas > 0
    ? Math.round((user.preguntasCorrectas / user.preguntasRespondidas) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* Header perfil */}
      <div className="rounded-2xl p-6" style={{ background: 'linear-gradient(135deg,rgba(27,58,107,0.50),rgba(37,99,235,0.25))', border: '1px solid #2A4A7F' }}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold" style={{ fontFamily: 'var(--font-display)', color: '#F0F4FA' }}>{user.nombre}</h1>
            <p className="text-sm" style={{ color: '#A8BFDC' }}>{user.email}</p>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-wide" style={{ color: '#6B8BAD' }}>Plan</p>
            <span className="text-xs px-3 py-1 rounded-full font-medium" style={{ background: 'rgba(74,144,217,0.20)', color: '#4A90D9' }}>
              {user.suscripcion?.plan ?? "GRATUITO"}
            </span>
          </div>
        </div>

        {/* Nivel y XP */}
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold" style={{ color: '#F0F4FA' }}>
            Nivel {nivelInfo.nivel} — {nivelInfo.nombre}
          </span>
          <span className="font-bold" style={{ color: '#F5A623', fontFamily: 'var(--font-display)' }}>{formatXP(user.xpTotal)}</span>
        </div>
        <div className="h-3 bg-white/10 rounded-full overflow-hidden mb-1">
          <div
            className="h-full rounded-full transition-all" style={{ background: 'linear-gradient(90deg,#2563EB,#4A90D9)', width: `${progreso}%` }}
          />
        </div>
        {nivelInfo.nivel < 5 && (
          <p className="text-xs" style={{ color: '#6B8BAD' }}>
            Faltan {formatXP(xpFaltante)} para {NIVELES[nivelInfo.nivel as 0 | 1 | 2 | 3]?.nombre ?? "Élite"}
          </p>
        )}
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Racha actual", value: `🔥 ${user.rachaActual} días` },
          { label: "Racha más larga", value: `⚡ ${user.rachaMasLarga} días` },
          { label: "Simulacros", value: user.simulacrosTotal },
          { label: "Precisión", value: `${precision}%` },
          { label: "Preguntas", value: user.preguntasRespondidas },
          { label: "Correctas", value: user.preguntasCorrectas },
        ].map((s) => (
          <div key={s.label} className="rounded-xl p-4" style={{ background: 'rgba(30,61,110,0.40)', border: '1px solid #2A4A7F' }}>
            <p className="font-bold text-lg" style={{ color: '#F0F4FA' }}>{String(s.value)}</p>
            <p className="text-xs" style={{ color: '#A8BFDC' }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Badges */}
      <div>
        <h2 className="font-semibold mb-3" style={{ fontFamily: 'var(--font-display)', color: '#F0F4FA' }}>
          Logros{" "}
          <span className="text-sm font-normal" style={{ color: '#A8BFDC' }}>
            ({user.badges.length})
          </span>
        </h2>

        {user.badges.length === 0 ? (
          <div className="rounded-2xl p-8 text-center" style={{ background: 'rgba(30,61,110,0.40)', border: '1px solid #2A4A7F' }}>
            <p className="text-4xl mb-2">🏅</p>
            <p className="text-sm" style={{ color: '#A8BFDC' }}>
              Completa simulacros y mantén tu racha para ganar logros
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {user.badges.map(({ badge, obtenidoAt }) => (
              <div
                key={badge.id}
                className="rounded-xl p-4 flex items-start gap-3"
                style={{ background: 'rgba(30,61,110,0.40)', border: '1px solid #2A4A7F' }}
              >
                <span className="text-2xl">{badge.icono}</span>
                <div>
                  <p className="text-sm font-semibold" style={{ color: '#F0F4FA' }}>{badge.nombre}</p>
                  <p className="text-xs" style={{ color: '#A8BFDC' }}>{badge.descripcion}</p>
                  <p className="text-xs mt-1" style={{ color: '#6B8BAD' }}>
                    {new Date(obtenidoAt).toLocaleDateString("es-CO")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Mejorar plan */}
      {(!user.suscripcion || user.suscripcion.plan === "GRATUITO") && (
        <div className="rounded-2xl p-5" style={{ background: 'linear-gradient(135deg,rgba(201,150,43,0.20),rgba(245,166,35,0.15))', border: '1px solid rgba(245,166,35,0.35)' }}>
          <p className="font-semibold mb-1" style={{ fontFamily: 'var(--font-display)', color: '#F5A623' }}>¡Desbloquea más simulacros!</p>
          <p className="text-sm mb-3" style={{ color: '#A8BFDC' }}>
            Con el Plan Pro tienes simulacros ilimitados, 40 preguntas y rankings avanzados.
          </p>
          <button className="btn-primary text-sm px-5 py-2">
            Ver planes →
          </button>
        </div>
      )}
    </div>
  );
}
