"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export function TopBar() {
  return (
    <header className="sticky top-0 z-40 bg-[#0f1623]/95 backdrop-blur border-b border-white/10">
      <div className="max-w-2xl mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/dashboard" className="font-bold text-lg text-white">
          🏛️ <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">PreparaOss</span>
        </Link>
        <UserButton />
      </div>
    </header>
  );
}
