"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, MagnifyingGlass, Trophy, User } from "@phosphor-icons/react";

const TABS = [
  { href: "/dashboard", Icon: House,            label: "Inicio" },
  { href: "/opecs",     Icon: MagnifyingGlass,   label: "OPECs" },
  { href: "/ranking",   Icon: Trophy,            label: "Ranking" },
  { href: "/perfil",    Icon: User,              label: "Perfil" },
];

export function BottomNav() {
  const path = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 backdrop-blur border-t z-50" style={{ background: 'rgba(15,28,50,0.97)', borderColor: '#2A4A7F' }}>
      <div className="flex max-w-2xl mx-auto">
        {TABS.map((tab) => {
          const active = path.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="flex-1 flex flex-col items-center gap-0.5 py-3 text-xs transition-colors"
              style={{ color: active ? '#F5A623' : '#6B8BAD' }}
            >
              <tab.Icon size={22} weight={active ? "fill" : "regular"} />
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: active ? 600 : 400 }}>{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
