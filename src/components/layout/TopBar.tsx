"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export function TopBar() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur border-b" style={{ background: 'rgba(13,31,60,0.95)', borderColor: '#2A4A7F' }}>
      <div className="max-w-2xl mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/dashboard" className="flex items-center gap-2 font-bold text-lg" style={{ fontFamily: 'var(--font-display)' }}>
          🏛️ <span style={{ background: 'linear-gradient(135deg,#4A90D9,#F5A623)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>PreparaOSS</span>
        </Link>
        <UserButton />
      </div>
    </header>
  );
}
