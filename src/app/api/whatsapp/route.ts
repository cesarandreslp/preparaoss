import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { waSendText } from "@/lib/whatsapp";
import { buscarOpecs, hubEntidad, APP_URL, esSaludo } from "@/lib/bot-busqueda";
import { responderConversacional } from "@/lib/bot-conversacion";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const registro = `${APP_URL}/registro?utm_source=whatsapp&utm_medium=bot`;

const BIENVENIDA = `👋 *¡Hola! Soy PreparaOSS.*
Te preparo para tu concurso de méritos de la CNSC con simulacros a la medida de tu cargo.

Escríbeme el *nombre de tu cargo o entidad* y te muestro qué hay.
Ej: _auxiliar administrativo_ · _DIAN_ · _fiscalía_

🚀 Practica gratis, sin tarjeta: ${registro}`;

// Verificación del webhook (Meta hace un GET al configurarlo).
export async function GET(req: Request) {
  const url = new URL(req.url);
  const mode = url.searchParams.get("hub.mode");
  const token = url.searchParams.get("hub.verify_token");
  const challenge = url.searchParams.get("hub.challenge");
  if (mode === "subscribe" && token && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    return new NextResponse(challenge ?? "", { status: 200 });
  }
  return new NextResponse("forbidden", { status: 403 });
}

// Valida la firma X-Hub-Signature-256 con el App Secret (evita que cualquiera
// dispare envíos a números arbitrarios a nuestra costa).
function firmaValida(raw: string, sig: string | null): boolean {
  const secret = process.env.WHATSAPP_APP_SECRET;
  if (!secret) return true; // sin secreto configurado no bloqueamos (dev)
  if (!sig) return false;
  const esperada = "sha256=" + crypto.createHmac("sha256", secret).update(raw).digest("hex");
  try {
    return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(esperada));
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  const raw = await req.text();
  if (!firmaValida(raw, req.headers.get("x-hub-signature-256"))) {
    return new NextResponse("forbidden", { status: 403 });
  }

  const body = JSON.parse(raw || "{}");
  const value = body?.entry?.[0]?.changes?.[0]?.value;
  const msg = value?.messages?.[0];
  // Ignora callbacks de estado (entregado/leído) y mensajes no-texto.
  if (!msg || msg.type !== "text") return NextResponse.json({ ok: true });

  const from: string = msg.from;
  const text: string = (msg.text?.body ?? "").trim();
  const nombre: string | null = value?.contacts?.[0]?.profile?.name ?? null;
  if (!from) return NextResponse.json({ ok: true });

  await prisma.whatsAppSub.upsert({
    where: { waId: from },
    create: { waId: from, nombre },
    update: { activo: true, nombre },
  });

  try {
    const low = text.toLowerCase();
    if (esSaludo(text) || low === "ayuda") {
      await waSendText(from, BIENVENIDA);
    } else {
      // Texto libre: intenta responder conversacionalmente (LLM); si no hay
      // LLM o falla, cae a la búsqueda determinística.
      const conv = await responderConversacional(text);
      if (conv) {
        await waSendText(from, `${conv}\n\n👉 Practica gratis, sin tarjeta:\n${registro}`);
      } else {
        await responderBusqueda(from, text);
      }
    }
  } catch (e) {
    console.error("whatsapp handler", e);
  }

  return NextResponse.json({ ok: true });
}

async function responderBusqueda(to: string, q: string) {
  const { cargos, entidades } = await buscarOpecs(q);

  if (cargos.length === 0) {
    await waSendText(
      to,
      `No encontré cargos para *${q}* 🤔\nPrueba con otra palabra, o mira todas las convocatorias:\n${APP_URL}/convocatorias`
    );
    return;
  }

  const lista = cargos
    .slice(0, 6)
    .map((o) => `• *${o.nombreCargo}*\n   ${o.entidad} · ${o.municipio} · ${o.numVacantes} vac.`)
    .join("\n");
  const links = entidades.map((e) => `🏛 ${e}\n   ${hubEntidad(e)}`).join("\n");

  await waSendText(
    to,
    `Esto encontré para *${q}*:\n\n${lista}\n\n${links}\n\n👉 *Practica gratis*, sin tarjeta:\n${registro}`
  );
}
