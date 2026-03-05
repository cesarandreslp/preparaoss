import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
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
      <div className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-2xl p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold text-white">{user.nombre}</h1>
            <p className="text-slate-400 text-sm">{user.email}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-500 uppercase tracking-wide">Plan</p>
            <span className="bg-indigo-600/30 text-indigo-300 text-xs px-3 py-1 rounded-full font-medium">
              {user.suscripcion?.plan ?? "GRATUITO"}
            </span>
          </div>
        </div>

        {/* Nivel y XP */}
        <div className="flex justify-between items-center mb-2">
          <span className="text-white font-semibold">
            Nivel {nivelInfo.nivel} — {nivelInfo.nombre}
          </span>
          <span className="text-indigo-400 font-bold">{formatXP(user.xpTotal)}</span>
        </div>
        <div className="h-3 bg-white/10 rounded-full overflow-hidden mb-1">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all"
            style={{ width: `${progreso}%` }}
          />
        </div>
        {nivelInfo.nivel < 5 && (
          <p className="text-xs text-slate-500">
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
          <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-4">
            <p className="text-white font-bold text-lg">{String(s.value)}</p>
            <p className="text-slate-400 text-xs">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Badges */}
      <div>
        <h2 className="text-white font-semibold mb-3">
          Logros{" "}
          <span className="text-slate-400 text-sm font-normal">
            ({user.badges.length})
          </span>
        </h2>

        {user.badges.length === 0 ? (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
            <p className="text-4xl mb-2">🏅</p>
            <p className="text-slate-400 text-sm">
              Completa simulacros y mantén tu racha para ganar logros
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {user.badges.map(({ badge, obtenidoAt }) => (
              <div
                key={badge.id}
                className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-start gap-3"
              >
                <span className="text-2xl">{badge.icono}</span>
                <div>
                  <p className="text-white text-sm font-semibold">{badge.nombre}</p>
                  <p className="text-slate-400 text-xs">{badge.descripcion}</p>
                  <p className="text-slate-600 text-xs mt-1">
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
        <div className="bg-gradient-to-r from-yellow-600/20 to-orange-600/20 border border-yellow-500/30 rounded-2xl p-5">
          <p className="text-yellow-400 font-semibold mb-1">¡Desbloquea más simulacros!</p>
          <p className="text-slate-400 text-sm mb-3">
            Con el Plan Pro tienes simulacros ilimitados, 40 preguntas y rankings avanzados.
          </p>
          <button className="px-5 py-2 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-xl text-sm transition-colors">
            Ver planes →
          </button>
        </div>
      )}
    </div>
  );
}
