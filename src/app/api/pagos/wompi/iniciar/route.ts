import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { PRECIO_OPEC_COP, nuevaReferencia, urlCheckout } from "@/lib/wompi";

// POST /api/pagos/wompi/iniciar — arma el checkout de Wompi para desbloquear
// una OPEC. Devuelve la URL a la que el navegador debe redirigir.
export async function POST(request: Request) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const { opecId } = (await request.json()) as { opecId?: string };
  if (!opecId) {
    return NextResponse.json({ error: "opecId es requerido" }, { status: 400 });
  }

  const opec = await prisma.opec.findUnique({
    where: { id: opecId },
    select: { id: true },
  });
  if (!opec) {
    return NextResponse.json({ error: "OPEC no encontrada" }, { status: 404 });
  }

  const reference = nuevaReferencia(opecId, userId);
  const amountInCents = PRECIO_OPEC_COP * 100;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? new URL(request.url).origin;

  try {
    const url = urlCheckout({
      reference,
      amountInCents,
      redirectUrl: `${appUrl}/pago/resultado?opec=${opecId}`,
    });
    return NextResponse.json({ url });
  } catch (e) {
    // Falta de configuración (llaves) — no exponemos el detalle al cliente.
    console.error("Wompi iniciar:", e);
    return NextResponse.json(
      { error: "Pagos no disponibles temporalmente." },
      { status: 503 }
    );
  }
}
