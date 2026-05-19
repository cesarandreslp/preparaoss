"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signIn, getSession } from "next-auth/react";

export function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const res = await signIn("credentials", {
      email: email.toLowerCase().trim(),
      password,
      redirect: false,
    });
    if (res?.error) {
      setLoading(false);
      setError("Email o contraseña incorrectos.");
      return;
    }
    // Si el caller pidió un destino específico (?callbackUrl=…), respetarlo.
    // Si no, ADMIN va a /admin y USUARIO a /dashboard.
    let destino = callbackUrl;
    if (!destino) {
      const session = await getSession();
      destino = session?.user?.rol === "ADMIN" ? "/admin" : "/dashboard";
    }
    setLoading(false);
    router.push(destino);
    router.refresh();
  }

  return (
    <div
      className="min-h-screen grid lg:grid-cols-2 noise-overlay"
      style={{ background: "var(--gradient-hero)" }}
    >
      {/* ─── Form column ─── */}
      <div className="flex flex-col p-6 sm:p-12">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-lg w-fit"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <span
            className="inline-flex items-center justify-center w-8 h-8 rounded-lg"
            style={{ background: "var(--gradient-gold)", color: "#FFFFFF" }}
          >
            P
          </span>
          <span className="text-gradient-gold">PreparaOSS</span>
        </Link>

        <div className="flex-1 flex flex-col justify-center max-w-md w-full mx-auto py-12">
          <span className="eyebrow">Bienvenido de vuelta</span>
          <h1 className="display-3 mt-3">Iniciar sesión</h1>
          <p className="mt-3" style={{ color: "var(--text-secondary)" }}>
            Continúa donde lo dejaste.
          </p>

          <form onSubmit={onSubmit} className="mt-10 space-y-5">
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
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input pr-12"
                  placeholder={showPassword ? "tu contraseña" : "••••••••"}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  tabIndex={-1}
                  className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-8 h-8 rounded-md transition-colors hover:bg-white/5"
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  aria-pressed={showPassword}
                  style={{ color: "var(--text-muted)" }}
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M3 3l18 18M10.58 10.58a2 2 0 002.83 2.83M9.88 5.09A10.94 10.94 0 0112 5c5 0 9.27 3.11 11 7.5a11.84 11.84 0 01-3.17 4.39M6.61 6.61C4.32 8.04 2.59 10.13 1 12.5 2.73 16.89 7 20 12 20a11 11 0 005.39-1.39" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M1 12.5C2.73 8.11 7 5 12 5s9.27 3.11 11 7.5C21.27 16.89 17 20 12 20S2.73 16.89 1 12.5z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                      <circle cx="12" cy="12.5" r="3" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div
                className="text-sm rounded-lg px-4 py-3 flex items-start gap-2"
                style={{
                  background: "rgba(239,68,68,0.08)",
                  color: "var(--error)",
                  border: "1px solid rgba(239,68,68,0.30)",
                }}
              >
                <span>⚠</span>
                <span>{error}</span>
              </div>
            )}

            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? "Ingresando…" : "Ingresar →"}
            </button>
          </form>

          <p className="text-sm text-center mt-8" style={{ color: "var(--text-muted)" }}>
            ¿No tienes cuenta?{" "}
            <Link href="/registro" className="font-semibold" style={{ color: "var(--gold-300)" }}>
              Regístrate gratis
            </Link>
          </p>
        </div>

        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          © 2026 PreparaOSS
        </p>
      </div>

      {/* ─── Visual column ─── */}
      <div
        className="hidden lg:flex relative overflow-hidden items-center justify-center p-12"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(208, 74, 28, 0.15) 0%, transparent 60%), linear-gradient(135deg, var(--bg-elevated) 0%, var(--bg-base) 100%)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 70% 70%, rgba(44, 84, 122, 0.12) 0%, transparent 50%)",
          }}
        />
        <div className="relative max-w-md text-center">
          <span className="text-6xl">🏛️</span>
          <h2 className="display-3 mt-8">
            Cada día sin estudiar es{" "}
            <span className="text-gradient-gold">un día más lejos</span> del cargo.
          </h2>
          <p className="mt-6" style={{ color: "var(--text-secondary)" }}>
            Volvamos al simulacro donde te quedaste.
          </p>
        </div>
      </div>
    </div>
  );
}
