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
      simulacrosTotal: true,
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
            },
          },
        },
      },
    },
  });

  if (!user) redirect("/login");

  const nivelInfo = calcularNivel(user.xpTotal);
  const progreso = porcentajeNivelActual(user.xpTotal);

  return (
    <div className="space-y-6">
      {/* Saludo + racha */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm" style={{ color: "#A8BFDC" }}>Buenos días,</p>
          <h1 className="text-xl font-bold" style={{ fontFamily: "var(--font-display)", color: "#F0F4FA" }}>
            {user.nombre}
          </h1>
        </div>
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-xl"
          style={{ background: "rgba(245,166,35,0.15)", color: "#F5A623", border: "1px solid rgba(245,166,35,0.30)" }}
        >
          <span className="text-lg">🔥</span>
          <span className="font-bold" style={{ fontFamily: "var(--font-display)" }}>{user.rachaActual}</span>
        </div>
      </div>

      {/* Tarjeta de nivel / XP */}
      <div
        className="rounded-2xl p-5"
        style={{ background: "linear-gradient(135deg,rgba(27,58,107,0.50),rgba(37,99,235,0.25))", border: "1px solid #2A4A7F" }}
      >
        <div className="flex justify-between items-center mb-3">
          <div>
            <p className="text-xs uppercase tracking-wider" style={{ color: "#A8BFDC" }}>Nivel {nivelInfo.nivel}</p>
            <p className="font-bold text-lg" style={{ fontFamily: "var(--font-display)", color: "#F0F4FA" }}>{nivelInfo.nombre}</p>
          </div>
          <div className="text-right">
            <p className="font-bold text-lg" style={{ color: "#F5A623", fontFamily: "var(--font-display)" }}>
              {user.xpTotal.toLocaleString()} XP
            </p>
            <p className="text-xs" style={{ color: "#A8BFDC" }}>{user.simulacrosTotal} simulacros</p>
          </div>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all"
            style={{ background: "linear-gradient(90deg,#2563EB,#4A90D9)", width: `${progreso}%` }}
          />
        </div>
        <p className="text-xs mt-1" style={{ color: "#6B8BAD" }}>{progreso}% al siguiente nivel</p>
      </div>

      {/* Mis OPECs */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-semibold" style={{ fontFamily: "var(--font-display)", color: "#F0F4FA" }}>Mis OPECs</h2>
          <Link href="/opecs" className="text-sm font-medium" style={{ color: "#4A90D9" }}>Ver todas →</Link>
        </div>

        {user.inscripciones.length === 0 ? (
          <div
            className="rounded-2xl p-8 text-center"
            style={{ background: "rgba(30,61,110,0.40)", border: "1px solid #2A4A7F" }}
          >
            <p className="mb-4" style={{ color: "#A8BFDC" }}>Aún no te has inscrito a ninguna OPEC</p>
            <Link href="/opecs" className="btn-primary text-sm px-5 py-2">Buscar OPECs disponibles</Link>
          </div>
        ) : (
          <div className="space-y-3">
            {user.inscripciones.map(({ opec }) => (
              <Link
                key={opec.id}
                href={`/opecs/${opec.id}`}
                className="block rounded-2xl p-4 transition-all hover:brightness-110"
                style={{ background: "rgba(30,61,110,0.40)", border: "1px solid #2A4A7F" }}
              >
                <p className="font-medium" style={{ color: "#F0F4FA" }}>{opec.nombreCargo}</p>
                <p className="text-sm" style={{ color: "#A8BFDC" }}>{opec.entidad}</p>
                {opec.fechaExamen && (
                  <p className="text-xs mt-1" style={{ color: "#4A90D9" }}>
                    📅 Examen: {new Date(opec.fechaExamen).toLocaleDateString("es-CO")}
                  </p>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Acciones rápidas */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { href: "/opecs", icon: "🔍", label: "Buscar OPECs" },
          { href: "/ranking", icon: "🏆", label: "Rankings" },
        ].map((a) => (
          <Link
            key={a.href}
            href={a.href}
            className="rounded-2xl p-4 text-center transition-all hover:brightness-110"
            style={{ background: "rgba(30,61,110,0.40)", border: "1px solid #2A4A7F" }}
          >
            <div className="text-2xl mb-1">{a.icon}</div>
            <p className="text-sm font-medium" style={{ fontFamily: "var(--font-display)", color: "#F0F4FA" }}>{a.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
