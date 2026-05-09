"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, MagnifyingGlass, Trophy, User } from "@phosphor-icons/react";

const TABS = [
  { href: "/dashboard", Icon: House, label: "Inicio" },
  { href: "/opecs", Icon: MagnifyingGlass, label: "OPECs" },
  { href: "/ranking", Icon: Trophy, label: "Ranking" },
  { href: "/perfil", Icon: User, label: "Perfil" },
];

export function BottomNav() {
  const path = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 backdrop-blur-xl border-t"
      style={{
        background: "rgba(10, 19, 38, 0.85)",
        borderColor: "var(--border-subtle)",
      }}
    >
      <div className="flex max-w-md mx-auto px-2">
        {TABS.map((tab) => {
          const active = path.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="flex-1 flex flex-col items-center gap-1 py-3 transition-colors relative"
              style={{ color: active ? "var(--gold-500)" : "var(--text-muted)" }}
            >
              {active && (
                <span
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-b-full"
                  style={{ background: "var(--gold-500)" }}
                />
              )}
              <tab.Icon size={22} weight={active ? "fill" : "regular"} />
              <span
                className="text-[11px]"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: active ? 600 : 500,
                }}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
