import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { Webhook } from "svix"; // Clerk usa Svix para firmar los webhooks
import { prisma } from "@/lib/prisma";

type ClerkUserCreatedEvent = {
  type: "user.created";
  data: {
    id: string;
    email_addresses: { email_address: string; id: string }[];
    first_name: string | null;
    last_name: string | null;
  };
};

// POST /api/webhooks/clerk
// Crear perfil de usuario en Neon cuando se registra en Clerk
export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) {
    return NextResponse.json({ error: "No webhook secret" }, { status: 500 });
  }

  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json({ error: "Missing svix headers" }, { status: 400 });
  }

  const payload = await req.text();

  const wh = new Webhook(WEBHOOK_SECRET);
  let event: ClerkUserCreatedEvent;

  try {
    event = wh.verify(payload, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as ClerkUserCreatedEvent;
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "user.created") {
    const { id, email_addresses, first_name, last_name } = event.data;

    const email = email_addresses[0]?.email_address ?? "";
    const nombre = [first_name, last_name].filter(Boolean).join(" ") || email.split("@")[0];

    // Crear perfil con suscripción gratuita
    await prisma.$transaction(async (tx) => {
      const suscripcion = await tx.suscripcion.create({
        data: {
          plan: "GRATUITO",
          simulacrosMes: 3,
          preguntasPorSimulacro: 10,
        },
      });

      await tx.userProfile.create({
        data: {
          id,
          email,
          nombre,
          suscripcionId: suscripcion.id,
        },
      });
    });
  }

  return NextResponse.json({ ok: true });
}
