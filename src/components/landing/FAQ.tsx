"use client";

import { useState } from "react";

interface QA {
  q: string;
  a: string;
}

export function FAQ({ items }: { items: QA[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y" style={{ borderColor: "var(--border-subtle)" }}>
      {items.map((it, i) => (
        <div key={i} className="py-5" style={{ borderColor: "var(--border-subtle)" }}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between gap-6 text-left group"
          >
            <span
              className="font-semibold transition-colors"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.125rem",
                color: open === i ? "var(--text-primary)" : "var(--text-primary)",
              }}
            >
              {it.q}
            </span>
            <span
              className="shrink-0 flex items-center justify-center w-9 h-9 rounded-full transition-all"
              style={{
                background: open === i ? "var(--gold-500)" : "rgba(10, 10, 10, 0.04)",
                color: open === i ? "var(--bg-base)" : "var(--text-secondary)",
                transform: open === i ? "rotate(45deg)" : "rotate(0)",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </span>
          </button>
          <div
            className="grid transition-all duration-500"
            style={{
              gridTemplateRows: open === i ? "1fr" : "0fr",
              opacity: open === i ? 1 : 0,
            }}
          >
            <div className="overflow-hidden">
              <p
                className="pt-4 pr-12 leading-relaxed"
                style={{ color: "var(--text-secondary)", fontSize: "1rem" }}
              >
                {it.a}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
