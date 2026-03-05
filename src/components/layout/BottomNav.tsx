"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/dashboard", icon: "🏠", label: "Inicio" },
  { href: "/opecs",     icon: "🔍", label: "OPECs" },
  { href: "/ranking",   icon: "🏆", label: "Ranking" },
  { href: "/perfil",    icon: "👤", label: "Perfil" },
];

export function BottomNav() {
  const path = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#131d2e]/95 backdrop-blur border-t border-white/10 z-50">
      <div className="flex max-w-2xl mx-auto">
        {TABS.map((tab) => {
          const active = path.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex-1 flex flex-col items-center gap-0.5 py-3 text-xs transition-colors ${
                active ? "text-indigo-400" : "text-slate-500 hover:text-slate-300"
              }`}
            >
              <span className="text-xl leading-none">{tab.icon}</span>
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
