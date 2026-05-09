"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";

export function TopBar() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const initials = session?.user?.nombre
    ? session.user.nombre
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "?";

  return (
    <header
      className="sticky top-0 z-40 backdrop-blur-xl border-b"
      style={{
        background: "rgba(250, 247, 242, 0.78)",
        borderColor: "var(--border-subtle)",
      }}
    >
      <div className="container-app max-w-3xl flex items-center justify-between py-4">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 font-bold text-base"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <span
            className="inline-flex items-center justify-center w-8 h-8 rounded-lg"
            style={{ background: "var(--gradient-gold)", color: "#FFFFFF" }}
          >
            P
          </span>
          <span className="text-gradient-gold hidden sm:inline">PreparaOSS</span>
        </Link>

        <div className="relative" ref={ref}>
          <button
            onClick={() => setOpen((v) => !v)}
            className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-transform hover:scale-105"
            style={{
              background: "var(--gradient-gold)",
              color: "#FFFFFF",
              fontFamily: "var(--font-display)",
            }}
            aria-label="Menú de usuario"
          >
            {initials}
          </button>
          {open && (
            <div
              className="absolute right-0 mt-3 w-64 rounded-2xl border shadow-2xl overflow-hidden animate-fade-in"
              style={{
                background: "var(--bg-elevated)",
                borderColor: "var(--border-default)",
                boxShadow: "var(--shadow-elevated)",
              }}
            >
              <div className="px-4 py-4 border-b" style={{ borderColor: "var(--border-subtle)" }}>
                <p className="text-sm font-semibold">{session?.user?.nombre ?? "Usuario"}</p>
                <p className="text-xs truncate mt-0.5" style={{ color: "var(--text-muted)" }}>
                  {session?.user?.email}
                </p>
              </div>
              <Link
                href="/perfil"
                className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-white/5 transition-colors"
                onClick={() => setOpen(false)}
              >
                <span>👤</span> Mi perfil
              </Link>
              <Link
                href="/dashboard"
                className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-white/5 transition-colors"
                onClick={() => setOpen(false)}
              >
                <span>📊</span> Dashboard
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-white/5 transition-colors border-t"
                style={{ color: "var(--error)", borderColor: "var(--border-subtle)" }}
              >
                <span>↗</span> Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
