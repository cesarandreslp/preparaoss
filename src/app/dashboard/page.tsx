import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ensureUserProfile } from "@/lib/ensure-profile";
import { calcularNivel, porcentajeNivelActual } from "@/lib/gamification";
import Link from "next/link";

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  await ensureUserProfile(userId);

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

  if (!user) redirect("/sign-in");

  const nivelInfo = calcularNivel(user.xpTotal);
  const progreso = porcentajeNivelActual(user.xpTotal);

  return (
    <div className="space-y-6">
      {/* Saludo + racha */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-400 text-sm">Buenos días,</p>
          <h1 className="text-xl font-bold text-white">{user.nombre}</h1>
        </div>
        <div className="flex items-center gap-2 bg-orange-500/20 text-orange-400 px-3 py-2 rounded-xl">
          <span className="text-lg">🔥</span>
          <span className="font-bold">{user.rachaActual}</span>
        </div>
      </div>

      {/* Tarjeta de nivel / XP */}
      <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-2xl p-5">
        <div className="flex justify-between items-center mb-3">
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wider">Nivel {nivelInfo.nivel}</p>
            <p className="font-bold text-white text-lg">{nivelInfo.nombre}</p>
          </div>
          <div className="text-right">
            <p className="text-indigo-400 font-bold text-lg">{user.xpTotal.toLocaleString()} XP</p>
            <p className="text-xs text-slate-400">{user.simulacrosTotal} simulacros</p>
          </div>
        </div>
        {/* Barra de progreso */}
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all"
            style={{ width: `${progreso}%` }}
          />
        </div>
        <p className="text-xs text-slate-500 mt-1">{progreso}% al siguiente nivel</p>
      </div>

      {/* Mis OPECs */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-semibold text-white">Mis OPECs</h2>
          <Link href="/opecs" className="text-indigo-400 text-sm">
            Ver todas →
          </Link>
        </div>

        {user.inscripciones.length === 0 ? (
          <div className="bg-white/5 rounded-2xl p-8 text-center border border-white/10">
            <p className="text-slate-400 mb-4">Aún no te has inscrito a ninguna OPEC</p>
            <Link
              href="/opecs"
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-sm font-medium transition-colors"
            >
              Buscar OPECs disponibles
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {user.inscripciones.map(({ opec }) => (
              <Link
                key={opec.id}
                href={`/opecs/${opec.id}`}
                className="block bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-4 transition-colors"
              >
                <p className="font-medium text-white">{opec.nombreCargo}</p>
                <p className="text-slate-400 text-sm">{opec.entidad}</p>
                {opec.fechaExamen && (
                  <p className="text-xs text-indigo-400 mt-1">
                    📅 Examen:{" "}
                    {new Date(opec.fechaExamen).toLocaleDateString("es-CO")}
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
            className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-4 text-center transition-colors"
          >
            <div className="text-2xl mb-1">{a.icon}</div>
            <p className="text-sm font-medium text-white">{a.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
