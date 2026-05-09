"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";

export function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") ?? "/dashboard";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    setLoading(false);
    if (res?.error) {
      setError("Email o contraseña incorrectos.");
      return;
    }
    router.push(callbackUrl);
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
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                placeholder="••••••••"
                autoComplete="current-password"
              />
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
