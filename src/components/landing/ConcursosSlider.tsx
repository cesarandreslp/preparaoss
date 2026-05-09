"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Concurso {
  slug: string;
  nombre: string;
  linkCnsc: string;
  imagen: string;
}

export function ConcursosSlider() {
  const [items, setItems] = useState<Concurso[] | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let alive = true;
    fetch("/api/concursos-en-desarrollo")
      .then((r) => r.json())
      .then((d) => {
        if (alive) setItems(d.concursos ?? []);
      })
      .catch(() => alive && setItems([]));
    return () => {
      alive = false;
    };
  }, []);

  function scroll(dir: 1 | -1) {
    const el = trackRef.current;
    if (!el) return;
    const w = el.clientWidth;
    el.scrollBy({ left: dir * (w * 0.8), behavior: "smooth" });
  }

  if (items === null) {
    return (
      <div className="flex gap-5 overflow-hidden">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="skeleton rounded-2xl shrink-0"
            style={{ width: "min(85vw, 420px)", aspectRatio: "1200 / 630" }}
          />
        ))}
      </div>
    );
  }

  if (items.length === 0) return null;

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-6">
        <Link
          href="/concursos-en-desarrollo"
          className="btn-ghost text-sm"
        >
          Ver todos →
        </Link>
        <div className="flex gap-2">
          <button
            onClick={() => scroll(-1)}
            aria-label="Anterior"
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-105"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-default)",
              color: "var(--text-primary)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </button>
          <button
            onClick={() => scroll(1)}
            aria-label="Siguiente"
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-105"
            style={{
              background: "var(--accent-500)",
              color: "#FFFFFF",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth"
        style={{
          scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {items.map((c) => (
          <Link
            key={c.slug}
            href="/concursos-en-desarrollo"
            className="shrink-0 snap-start group"
            style={{ width: "min(85vw, 420px)" }}
          >
            <div
              className="relative w-full overflow-hidden rounded-2xl border transition-all group-hover:-translate-y-1 group-hover:shadow-xl"
              style={{
                aspectRatio: "1200 / 630",
                borderColor: "var(--border-default)",
                background: "var(--bg-card-hover)",
              }}
            >
              <Image
                src={c.imagen}
                alt={c.nombre}
                fill
                sizes="(max-width: 640px) 85vw, 420px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                unoptimized
              />
            </div>
            <div className="mt-4 px-1">
              <h3
                className="text-base font-bold leading-snug line-clamp-2"
                style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
              >
                {c.nombre}
              </h3>
              <p
                className="text-xs mt-1 transition-colors group-hover:text-[#D04A1C]"
                style={{ color: "var(--text-muted)" }}
              >
                Ver detalles →
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
