import Link from "next/link";
import { auth } from "@clerk/nextjs/server";

export default async function LandingPage() {
  const { userId } = await auth();
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-gradient-to-b from-[#0f1623] to-[#1a2540]">
      {/* Hero */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="text-6xl mb-4">🏛️</div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          PreparaOss
        </h1>
        <p className="text-lg md:text-xl text-slate-300 mb-2">
          Prepárate para los concursos de méritos de la{" "}
          <strong className="text-white">CNSC</strong> con simulacros
          generados por inteligencia artificial.
        </p>
        <p className="text-slate-400 mb-8">
          Gamificación · Rankings · Competencias entre aspirantes · 3 tipos de prueba
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {!userId ? (
            <>
              <Link
                href="/sign-up"
                className="px-8 py-3 rounded-xl font-semibold bg-indigo-600 hover:bg-indigo-500 transition-colors text-white text-lg"
              >
                Empezar gratis
              </Link>
              <Link
                href="/sign-in"
                className="px-8 py-3 rounded-xl font-semibold bg-white/10 hover:bg-white/20 transition-colors text-white text-lg"
              >
                Ingresar
              </Link>
            </>
          ) : (
            <Link
              href="/dashboard"
              className="px-8 py-3 rounded-xl font-semibold bg-indigo-600 hover:bg-indigo-500 transition-colors text-white text-lg"
            >
              Ir al Dashboard →
            </Link>
          )}
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-20 max-w-4xl w-full">
        {[
          {
            icon: "📝",
            title: "3 tipos de prueba",
            desc: "Juicio situacional, funcional transversal y comportamental Likert — exactamente como la CNSC.",
          },
          {
            icon: "🔥",
            title: "Gamificación diaria",
            desc: "Rachas, XP, ligas semanales y badges que te motivan a estudiar cada día.",
          },
          {
            icon: "🏆",
            title: "Ranking por OPEC",
            desc: "Compite con otros aspirantes a la misma oferta y sube posiciones.",
          },
        ].map((f) => (
          <div
            key={f.title}
            className="bg-white/5 rounded-2xl p-6 border border-white/10"
          >
            <div className="text-3xl mb-3">{f.icon}</div>
            <h3 className="font-semibold text-white mb-2">{f.title}</h3>
            <p className="text-slate-400 text-sm">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Pricing pills */}
      <div className="mt-16 text-center">
        <p className="text-slate-400 mb-4 text-sm">Inversión mínima para empezar</p>
        <div className="flex flex-wrap gap-3 justify-center">
          {[
            { label: "Gratuito", tag: "$0", highlight: false },
            { label: "Básico", tag: "$15.000/mes", highlight: false },
            { label: "Pro", tag: "$35.000/mes", highlight: true },
            { label: "Premium", tag: "$60.000/mes", highlight: false },
          ].map((p) => (
            <span
              key={p.label}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                p.highlight
                  ? "bg-indigo-600 text-white"
                  : "bg-white/10 text-slate-300"
              }`}
            >
              {p.label} — {p.tag}
            </span>
          ))}
        </div>
      </div>
    </main>
  );
}
