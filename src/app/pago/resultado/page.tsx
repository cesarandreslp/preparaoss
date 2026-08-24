import Link from "next/link";
import { MiPase } from "@/components/opec/MiPase";

// Wompi redirige aquí tras el pago con ?opec=<id>&id=<txId>. El desbloqueo
// real lo hace el webhook (segundos); aquí solo confirmamos y encaminamos.
export default async function PagoResultadoPage({
  searchParams,
}: {
  searchParams: Promise<{ opec?: string }>;
}) {
  const { opec } = await searchParams;

  return (
    <div className="max-w-md mx-auto text-center py-20 space-y-6">
      <div className="text-5xl">🎯</div>
      <h1 className="text-2xl font-bold">¡Gracias por tu pago!</h1>
      <p style={{ color: "var(--text-secondary)" }}>
        Estamos confirmando la transacción. Tu pase se activa en unos segundos.
        Si no aparece de inmediato, refresca la página.
      </p>

      <div className="text-left">
        <MiPase />
      </div>
      <div className="flex flex-col gap-3">
        {opec && (
          <Link href={`/opecs/${opec}`} className="btn-primary px-6 py-3 rounded-2xl">
            Ir a mi OPEC →
          </Link>
        )}
        <Link
          href="/dashboard"
          className="px-6 py-3 rounded-2xl text-sm font-medium"
          style={{ background: "var(--bg-card)", color: "var(--text-secondary)", border: "1px solid var(--border-default)" }}
        >
          Ir al dashboard
        </Link>
      </div>
    </div>
  );
}
