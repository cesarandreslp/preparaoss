import { BottomNav } from "@/components/layout/BottomNav";
import { TopBar } from "@/components/layout/TopBar";

export default function PerfilLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      <TopBar />
      <main className="flex-1 pb-20 pt-4 px-4 max-w-2xl mx-auto w-full">{children}</main>
      <BottomNav />
    </div>
  );
}
