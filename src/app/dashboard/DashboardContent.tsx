import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { calcularNivel, porcentajeNivelActual } from "@/lib/gamification";
import Link from "next/link";

export async function DashboardContent() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) redirect("/login");

  const user = await prisma.userProfile.findUnique({
    where: { id: userId },
    select: {
      nombre: true,
      xpTotal: true,
      nivel: true,
      rachaActual: true,
      rachaMasLarga: true,
      simulacrosTotal: true,
      preguntasCorrectas: true,
      preguntasRespondidas: true,
      inscripciones: {
        take: 5,
        orderBy: { inscritoAt: "desc" },
        include: {
          opec: {
            select: {
              id: true,
              nombreCargo: true,
              entidad: true,
              fechaExamen: true,
              fechaLimiteInscripcion: true,
            },
          },
        },
      },
    },
  });

  if (!user) redirect("/login");

  const nivelInfo = calcularNivel(user.xpTotal);
  const progreso = porcentajeNivelActual(user.xpTotal);
  const precision =
    user.preguntasRespondidas > 0
      ? Math.round((user.preguntasCorrectas / user.preguntasRespondidas) * 100)
      : 0;

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Buenos días" : hour < 19 ? "Buenas tardes" : "Buenas noches";

  return (
    <div className="space-y-8">
      {/* Saludo + racha */}
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            {greeting},
          </p>
          <h1
            className="text-3xl font-extrabold mt-1"
            style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
          >
            {user.nombre.split(" ")[0]} 👋
          </h1>
        </div>
        <div
          className="flex items-center gap-2 px-4 py-2.5 rounded-full"
          style={{
            background: "rgba(245,166,35,0.10)",
            border: "1px solid rgba(245,166,35,0.30)",
          }}
        >
          <span className="text-xl">🔥</span>
          <div>
            <p
              className="font-bold leading-none"
              style={{ color: "var(--gold-300)", fontFamily: "var(--font-display)" }}
            >
              {user.rachaActual}
            </p>
            <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>
              días seguidos
            </p>
          </div>
        </div>
      </div>

      {/* Hero card: Nivel + XP */}
      <div className="card-glow p-6">
        <div className="flex items-end justify-between gap-4 mb-5">
          <div>
            <p
              className="text-xs uppercase tracking-wider"
              style={{ color: "var(--text-muted)" }}
            >
              Nivel {nivelInfo.nivel}
            </p>
            <p
              className="text-2xl font-bold mt-1"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {nivelInfo.nombre}
            </p>
          </div>
          <div className="text-right">
            <p
              className="text-3xl font-extrabold text-gradient-gold"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {user.xpTotal.toLocaleString("es-CO")}
            </p>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              XP totales
            </p>
          </div>
        </div>
        <div className="progress">
          <div className="progress-fill" style={{ width: `${progreso}%` }} />
        </div>
        <p className="text-xs mt-2" style={{ color: "var(--text-muted)" }}>
          {progreso}% al siguiente nivel
        </p>
      </div>

      {/* KPIs en grid */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Simulacros", v: user.simulacrosTotal, icon: "📝" },
          { label: "Precisión", v: `${precision}%`, icon: "🎯" },
          { label: "Mejor racha", v: user.rachaMasLarga, icon: "⚡" },
        ].map((s) => (
          <div key={s.label} className="card text-center p-4">
            <p className="text-xl mb-1">{s.icon}</p>
            <p
              className="text-xl font-bold"
              style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
            >
              {s.v}
            </p>
            <p className="text-[11px] mt-0.5" style={{ color: "var(--text-muted)" }}>
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* Mis OPECs */}
      <section>
        <div className="flex items-end justify-between mb-4">
          <div>
            <span className="eyebrow">Mis OPECs</span>
            <h2 className="display-3 mt-1">Tu camino</h2>
          </div>
          <Link
            href="/opecs"
            className="text-sm font-semibold"
            style={{ color: "var(--gold-300)" }}
          >
            Explorar →
          </Link>
        </div>

        {user.inscripciones.length === 0 ? (
          <div
            className="card-elevated text-center py-12"
            style={{ borderStyle: "dashed", borderColor: "var(--border-default)" }}
          >
            <p className="text-4xl mb-3">🎯</p>
            <p className="font-semibold mb-1">Aún no te has inscrito a ninguna OPEC</p>
            <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
              Encuentra la vacante perfecta para ti
            </p>
            <Link href="/opecs" className="btn-primary">
              Buscar OPECs disponibles →
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {user.inscripciones.map(({ opec }) => (
              <Link
                key={opec.id}
                href={`/opecs/${opec.id}`}
                className="card flex items-start justify-between gap-3 group"
              >
                <div className="min-w-0 flex-1">
                  <p
                    className="text-xs"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {opec.entidad}
                  </p>
                  <p
                    className="font-bold mt-0.5 truncate"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {opec.nombreCargo}
                  </p>
                  {opec.fechaExamen && (
                    <p
                      className="text-xs mt-2 inline-flex items-center gap-1"
                      style={{ color: "var(--gold-300)" }}
                    >
                      📅 Examen:{" "}
                      {new Date(opec.fechaExamen).toLocaleDateString("es-CO", {
                        day: "numeric",
                        month: "short",
                      })}
                    </p>
                  )}
                </div>
                <span
                  className="text-2xl shrink-0 transition-transform group-hover:translate-x-1"
                  style={{ color: "var(--text-muted)" }}
                >
                  →
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Acciones rápidas */}
      <div className="grid grid-cols-2 gap-3">
        <Link href="/opecs" className="card text-center p-5 group">
          <p className="text-3xl mb-2 transition-transform group-hover:scale-110">🔍</p>
          <p
            className="text-sm font-bold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Buscar OPECs
          </p>
        </Link>
        <Link href="/ranking" className="card text-center p-5 group">
          <p className="text-3xl mb-2 transition-transform group-hover:scale-110">🏆</p>
          <p
            className="text-sm font-bold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Ver ranking
          </p>
        </Link>
      </div>
    </div>
  );
}
