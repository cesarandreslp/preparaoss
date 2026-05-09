"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function RegistroPage() {
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await fetch("/api/auth/registro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre: nombre.trim(),
        email: email.toLowerCase().trim(),
        password,
      }),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(body.error ?? "No se pudo crear la cuenta.");
      setLoading(false);
      return;
    }

    const signInRes = await signIn("credentials", {
      email: email.toLowerCase().trim(),
      password,
      redirect: false,
    });
    setLoading(false);
    if (signInRes?.error) {
      setError("Cuenta creada, pero no pudimos iniciar sesión. Intenta entrar manualmente.");
      router.push("/login");
      return;
    }
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div
      className="min-h-screen grid lg:grid-cols-2 noise-overlay"
      style={{ background: "var(--gradient-hero)" }}
    >
      {/* ─── Visual column ─── */}
      <div
        className="hidden lg:flex relative overflow-hidden items-center justify-center p-12 order-2"
        style={{
          background:
            "radial-gradient(circle at 70% 30%, rgba(245,166,35,0.18) 0%, transparent 60%), linear-gradient(135deg, var(--bg-base) 0%, var(--bg-elevated) 100%)",
        }}
      >
        <div className="relative max-w-md">
          <span className="eyebrow">Bienvenido a PreparaOSS</span>
          <h2 className="display-2 mt-4">
            Tu primer simulacro está a{" "}
            <span className="text-gradient-gold">90 segundos</span>.
          </h2>
          <ul className="mt-10 space-y-4">
            {[
              "3 simulacros gratis cada mes para siempre",
              "Acceso a 3.000+ OPECs sincronizadas con SIMO-CNSC",
              "Bancos de preguntas únicos generados con IA",
              "Sin tarjeta de crédito, sin compromiso",
            ].map((li) => (
              <li key={li} className="flex items-start gap-3">
                <span
                  className="mt-1 inline-flex items-center justify-center w-5 h-5 rounded-full shrink-0"
                  style={{ background: "var(--gold-500)", color: "#1a0f00" }}
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span style={{ color: "var(--text-secondary)" }}>{li}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ─── Form column ─── */}
      <div className="flex flex-col p-6 sm:p-12 order-1">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-lg w-fit"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <span
            className="inline-flex items-center justify-center w-8 h-8 rounded-lg"
            style={{ background: "var(--gradient-gold)", color: "#1a0f00" }}
          >
            P
          </span>
          <span className="text-gradient-gold">PreparaOSS</span>
        </Link>

        <div className="flex-1 flex flex-col justify-center max-w-md w-full mx-auto py-12">
          <span className="eyebrow">Empezar gratis</span>
          <h1 className="display-3 mt-3">Crea tu cuenta</h1>
          <p className="mt-3" style={{ color: "var(--text-secondary)" }}>
            En 30 segundos estás generando tu primer simulacro.
          </p>

          <form onSubmit={onSubmit} className="mt-10 space-y-5">
            <div>
              <label className="block text-xs uppercase tracking-wider mb-2 font-semibold" style={{ color: "var(--text-muted)" }}>
                Nombre
              </label>
              <input
                type="text"
                required
                minLength={2}
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="input"
                placeholder="Cómo te llamamos"
                autoComplete="name"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider mb-2 font-semibold" style={{ color: "var(--text-muted)" }}>
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                placeholder="tu@email.com"
                autoComplete="email"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider mb-2 font-semibold" style={{ color: "var(--text-muted)" }}>
                Contraseña
              </label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                placeholder="Mínimo 6 caracteres"
                autoComplete="new-password"
              />
            </div>

            {error && (
              <div
                className="text-sm rounded-lg px-4 py-3 flex items-start gap-2"
                style={{
                  background: "rgba(239,68,68,0.08)",
                  color: "#FCA5A5",
                  border: "1px solid rgba(239,68,68,0.30)",
                }}
              >
                <span>⚠</span>
                <span>{error}</span>
              </div>
            )}

            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? "Creando cuenta…" : "Crear cuenta gratis →"}
            </button>

            <p className="text-xs text-center" style={{ color: "var(--text-muted)" }}>
              Al crear cuenta aceptas guardarte tu progreso y XP.
            </p>
          </form>

          <p className="text-sm text-center mt-8" style={{ color: "var(--text-muted)" }}>
            ¿Ya tienes cuenta?{" "}
            <Link href="/login" className="font-semibold" style={{ color: "var(--gold-300)" }}>
              Inicia sesión
            </Link>
          </p>
        </div>

        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          © 2026 PreparaOSS
        </p>
      </div>
    </div>
  );
}
