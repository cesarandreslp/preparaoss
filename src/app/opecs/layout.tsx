import { BottomNav } from "@/components/layout/BottomNav";
import { TopBar } from "@/components/layout/TopBar";

export default function OpecsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen noise-overlay" style={{ background: "var(--gradient-hero)" }}>
      <TopBar />
      <main className="flex-1 pb-24 pt-6">
        <div className="container-app max-w-3xl">{children}</div>
      </main>
      <BottomNav />
    </div>
  );
}
