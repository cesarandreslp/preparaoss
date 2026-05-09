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
      className="sticky top-0 z-40 backdrop-blur border-b"
      style={{ background: "rgba(13,31,60,0.95)", borderColor: "#2A4A7F" }}
    >
      <div className="max-w-2xl mx-auto flex items-center justify-between px-4 py-3">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 font-bold text-lg"
          style={{ fontFamily: "var(--font-display)" }}
        >
          🏛️{" "}
          <span
            style={{
              background: "linear-gradient(135deg,#4A90D9,#F5A623)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            PreparaOSS
          </span>
        </Link>

        <div className="relative" ref={ref}>
          <button
            onClick={() => setOpen((v) => !v)}
            className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold text-white"
            style={{ background: "linear-gradient(135deg,#2563EB,#4A90D9)" }}
            aria-label="Menú de usuario"
          >
            {initials}
          </button>
          {open && (
            <div
              className="absolute right-0 mt-2 w-56 rounded-xl border shadow-lg overflow-hidden"
              style={{ background: "#0D1F3C", borderColor: "#2A4A7F" }}
            >
              <div className="px-4 py-3 border-b" style={{ borderColor: "#2A4A7F" }}>
                <p className="text-sm font-medium" style={{ color: "#F0F4FA" }}>
                  {session?.user?.nombre ?? "Usuario"}
                </p>
                <p className="text-xs truncate" style={{ color: "#A8BFDC" }}>
                  {session?.user?.email}
                </p>
              </div>
              <Link
                href="/perfil"
                className="block px-4 py-2 text-sm hover:bg-white/5"
                style={{ color: "#F0F4FA" }}
                onClick={() => setOpen(false)}
              >
                Mi perfil
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="w-full text-left px-4 py-2 text-sm hover:bg-white/5"
                style={{ color: "#F87171" }}
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
