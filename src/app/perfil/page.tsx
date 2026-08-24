import { auth } from "@/auth";
import { MiPase } from "@/components/opec/MiPase";
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
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) redirect("/login");

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
      badges: {
        include: { badge: true },
        orderBy: { obtenidoAt: "desc" },
      },
    },
  });

  if (!user) redirect("/login");

  const nivelInfo = calcularNivel(user.xpTotal);
  const progreso = porcentajeNivelActual(user.xpTotal);
  const xpFaltante = xpParaSiguienteNivel(user.xpTotal);
  const precision =
    user.preguntasRespondidas > 0
      ? Math.round((user.preguntasCorrectas / user.preguntasRespondidas) * 100)
      : 0;

  const initials = user.nombre
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="space-y-8">
      {/* Hero perfil con avatar grande */}
      <div className="card-glow p-6 sm:p-8 text-center">
        <div
          className="w-20 h-20 rounded-full mx-auto flex items-center justify-center text-2xl font-extrabold mb-4"
          style={{
            background: "var(--gradient-gold)",
            color: "#FFFFFF",
            fontFamily: "var(--font-display)",
            boxShadow: "var(--shadow-glow-gold)",
          }}
        >
          {initials}
        </div>
        <h1
          className="text-2xl font-extrabold"
          style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
        >
          {user.nombre}
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
          {user.email}
        </p>
      </div>

      {/* Nivel y XP */}
      <div className="card-elevated p-6">
        <div className="flex items-end justify-between mb-3">
          <div>
            <p className="text-xs uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
              Nivel {nivelInfo.nivel}
            </p>
            <p
              className="text-xl font-bold mt-1"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {nivelInfo.nombre}
            </p>
          </div>
          <p
            className="text-3xl font-extrabold text-gradient-gold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {formatXP(user.xpTotal)}
          </p>
        </div>
        <div className="progress">
          <div className="progress-fill" style={{ width: `${progreso}%` }} />
        </div>
        {nivelInfo.nivel < 5 && (
          <p className="text-xs mt-2" style={{ color: "var(--text-muted)" }}>
            Faltan {formatXP(xpFaltante)} para{" "}
            <span style={{ color: "var(--gold-300)" }}>
              {NIVELES[nivelInfo.nivel as 0 | 1 | 2 | 3]?.nombre ?? "Élite"}
            </span>
          </p>
        )}
      </div>

      {/* Estadísticas grid */}
      <div>
        <span className="eyebrow">Estadísticas</span>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
          {[
            { label: "Racha actual", value: user.rachaActual, suffix: "días", icon: "🔥" },
            { label: "Mejor racha", value: user.rachaMasLarga, suffix: "días", icon: "⚡" },
            { label: "Simulacros", value: user.simulacrosTotal, suffix: "", icon: "📝" },
            { label: "Precisión", value: precision, suffix: "%", icon: "🎯" },
            { label: "Preguntas", value: user.preguntasRespondidas, suffix: "", icon: "❓" },
            { label: "Correctas", value: user.preguntasCorrectas, suffix: "", icon: "✅" },
          ].map((s) => (
            <div key={s.label} className="card p-4">
              <p className="text-xl mb-1">{s.icon}</p>
              <p
                className="text-xl font-bold"
                style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
              >
                {s.value}
                {s.suffix && (
                  <span className="text-sm font-medium ml-1" style={{ color: "var(--text-muted)" }}>
                    {s.suffix}
                  </span>
                )}
              </p>
              <p className="text-[11px] mt-0.5" style={{ color: "var(--text-muted)" }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Badges */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="eyebrow">Logros</span>
          <span className="tag tag-muted">{user.badges.length}</span>
        </div>

        {user.badges.length === 0 ? (
          <div
            className="card-elevated text-center py-12"
            style={{ borderStyle: "dashed", borderColor: "var(--border-default)" }}
          >
            <p className="text-5xl mb-3 opacity-60">🏅</p>
            <p className="font-semibold mb-1">Aún sin logros</p>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Completa simulacros y mantén tu racha para desbloquear badges
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {user.badges.map(({ badge, obtenidoAt }) => (
              <div key={badge.id} className="card flex items-start gap-3 p-4">
                <span className="text-3xl shrink-0">{badge.icono}</span>
                <div className="min-w-0">
                  <p className="font-bold" style={{ fontFamily: "var(--font-display)" }}>
                    {badge.nombre}
                  </p>
                  <p className="text-sm leading-snug mt-0.5" style={{ color: "var(--text-secondary)" }}>
                    {badge.descripcion}
                  </p>
                  <p className="text-xs mt-2" style={{ color: "var(--text-muted)" }}>
                    {new Date(obtenidoAt).toLocaleDateString("es-CO", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pase trimestral: OPECs cubiertas, vencimiento y renovación */}
      <MiPase />
    </div>
  );
}
