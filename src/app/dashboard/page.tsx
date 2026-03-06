import { Suspense } from "react";
import { DashboardContent } from "./DashboardContent";

export const dynamic = "force-dynamic";

function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Saludo skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-3 w-24 rounded-full" style={{ background: "rgba(168,191,220,0.2)" }} />
          <div className="h-5 w-36 rounded-full" style={{ background: "rgba(168,191,220,0.2)" }} />
        </div>
        <div className="h-10 w-16 rounded-xl" style={{ background: "rgba(245,166,35,0.15)" }} />
      </div>

      {/* Tarjeta XP skeleton */}
      <div className="rounded-2xl p-5 space-y-3" style={{ background: "rgba(27,58,107,0.30)", border: "1px solid #2A4A7F" }}>
        <div className="flex justify-between">
          <div className="space-y-2">
            <div className="h-3 w-16 rounded-full" style={{ background: "rgba(168,191,220,0.2)" }} />
            <div className="h-5 w-28 rounded-full" style={{ background: "rgba(168,191,220,0.2)" }} />
          </div>
          <div className="space-y-2 text-right">
            <div className="h-5 w-24 rounded-full ml-auto" style={{ background: "rgba(245,166,35,0.2)" }} />
            <div className="h-3 w-20 rounded-full ml-auto" style={{ background: "rgba(168,191,220,0.2)" }} />
          </div>
        </div>
        <div className="h-2 rounded-full" style={{ background: "rgba(255,255,255,0.1)" }} />
      </div>

      {/* Mis OPECs skeleton */}
      <div className="space-y-3">
        <div className="h-5 w-24 rounded-full" style={{ background: "rgba(168,191,220,0.2)" }} />
        <div className="rounded-2xl p-4 space-y-2" style={{ background: "rgba(30,61,110,0.40)", border: "1px solid #2A4A7F" }}>
          <div className="h-4 w-3/4 rounded-full" style={{ background: "rgba(168,191,220,0.2)" }} />
          <div className="h-3 w-1/2 rounded-full" style={{ background: "rgba(168,191,220,0.2)" }} />
        </div>
        <div className="rounded-2xl p-4 space-y-2" style={{ background: "rgba(30,61,110,0.40)", border: "1px solid #2A4A7F" }}>
          <div className="h-4 w-2/3 rounded-full" style={{ background: "rgba(168,191,220,0.2)" }} />
          <div className="h-3 w-1/2 rounded-full" style={{ background: "rgba(168,191,220,0.2)" }} />
        </div>
      </div>

      {/* Acciones skeleton */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl p-4 h-20" style={{ background: "rgba(30,61,110,0.40)", border: "1px solid #2A4A7F" }} />
        <div className="rounded-2xl p-4 h-20" style={{ background: "rgba(30,61,110,0.40)", border: "1px solid #2A4A7F" }} />
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContent />
    </Suspense>
  );
}
