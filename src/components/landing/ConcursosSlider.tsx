"use client";

import { useEffect, useState } from "react";
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

  if (items === null) {
    return (
      <div
        className="flex gap-5 overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent 0%, #000 6%, #000 94%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent 0%, #000 6%, #000 94%, transparent 100%)",
        }}
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="skeleton rounded-2xl shrink-0"
            style={{ width: "min(85vw, 380px)", aspectRatio: "1200 / 630" }}
          />
        ))}
      </div>
    );
  }

  if (items.length === 0) return null;

  // Duplicamos los items para loop seamless (nuestro track muestra 2x la lista
  // y la animación trasla -50% para terminar exactamente donde empieza).
  const looped = [...items, ...items];
  // Velocidad: ~9s por item — 28 items → ~250s vuelta completa, suave.
  const seconds = Math.max(items.length * 9, 30);

  return (
    <div
      className="relative overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(90deg, transparent 0%, #000 5%, #000 95%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(90deg, transparent 0%, #000 5%, #000 95%, transparent 100%)",
      }}
    >
      <div
        className="flex gap-5 will-change-transform animate-scroll-x hover:[animation-play-state:paused]"
        style={{
          width: "max-content",
          animationDuration: `${seconds}s`,
        }}
      >
        {looped.map((c, idx) => (
          <Link
            key={`${c.slug}-${idx}`}
            href="/concursos-en-desarrollo"
            className="shrink-0 group block"
            style={{ width: "min(85vw, 380px)" }}
            aria-label={c.nombre}
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
                sizes="(max-width: 640px) 85vw, 380px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                unoptimized
              />
            </div>
            <h3
              className="mt-4 px-1 text-sm font-bold leading-snug line-clamp-2 transition-colors group-hover:text-[var(--gold-300)]"
              style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
            >
              {c.nombre}
            </h3>
          </Link>
        ))}
      </div>

      <style jsx>{`
        @keyframes scrollX {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .animate-scroll-x {
          animation-name: scrollX;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-scroll-x {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
