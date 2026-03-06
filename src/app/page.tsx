import Link from "next/link";
import { Show, SignUpButton, SignInButton } from "@clerk/nextjs";

export default function LandingPage() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-4 py-16"
      style={{ background: "linear-gradient(180deg, #0D1F3C 0%, #1B3A6B 60%, #1a2d4e 100%)" }}
    >
      {/* Hero */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="text-6xl mb-4">🏛️</div>
        <h1
          className="text-4xl md:text-5xl font-extrabold mb-4"
          style={{
            fontFamily: "var(--font-display)",
            background: "linear-gradient(135deg, #4A90D9, #F5A623)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          PreparaOSS
        </h1>
        <p className="text-lg md:text-xl mb-2" style={{ color: "#A8BFDC" }}>
          Prepárate para los concursos de méritos de la{" "}
          <strong style={{ color: "#F0F4FA" }}>CNSC</strong> con simulacros
          generados por inteligencia artificial.
        </p>
        <p className="mb-8 text-sm" style={{ color: "#6B8BAD" }}>
          Gamificación · Rankings · Competencias entre aspirantes · 3 tipos de prueba
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Show when="signed-out">
            <SignUpButton>
              <button className="btn-primary text-lg px-8 py-3">
                Empezar gratis
              </button>
            </SignUpButton>
            <SignInButton>
              <button
                className="btn-secondary text-lg px-8 py-3"
                style={{ borderRadius: "9999px" }}
              >
                Ingresar
              </button>
            </SignInButton>
          </Show>
          <Show when="signed-in">
            <Link href="/dashboard" className="btn-primary text-lg px-8 py-3">
              Ir al Dashboard →
            </Link>
          </Show>
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
            className="card"
            style={{
              background: "rgba(30, 61, 110, 0.50)",
              borderColor: "#2A4A7F",
            }}
          >
            <div className="text-3xl mb-3">{f.icon}</div>
            <h3 className="font-semibold mb-2" style={{ fontFamily: "var(--font-display)", color: "#F0F4FA" }}>
              {f.title}
            </h3>
            <p className="text-sm" style={{ color: "#A8BFDC" }}>
              {f.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Pricing pills */}
      <div className="mt-16 text-center">
        <p className="mb-4 text-sm" style={{ color: "#6B8BAD" }}>Inversión mínima para empezar</p>
        <div className="flex flex-wrap gap-3 justify-center">
          {[
            { label: "Gratuito", tag: "$0", highlight: false },
            { label: "Básico", tag: "$15.000/mes", highlight: false },
            { label: "Pro", tag: "$35.000/mes", highlight: true },
            { label: "Premium", tag: "$60.000/mes", highlight: false },
          ].map((p) => (
            <span
              key={p.label}
              className="px-4 py-2 rounded-full text-sm font-medium"
              style={
                p.highlight
                  ? {
                      background: "linear-gradient(135deg,#F5A623,#C9962B)",
                      color: "#0D1F3C",
                      fontFamily: "var(--font-display)",
                      fontWeight: 600,
                    }
                  : {
                      background: "rgba(74,144,217,0.12)",
                      color: "#A8BFDC",
                      border: "1px solid #2A4A7F",
                    }
              }
            >
              {p.label} — {p.tag}
            </span>
          ))}
        </div>
      </div>
    </main>
  );
}
