import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { tgSend, esc } from "@/lib/telegram";
import { buscarOpecs, hubEntidad, APP_URL } from "@/lib/bot-busqueda";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SECRET = process.env.TELEGRAM_WEBHOOK_SECRET || "";
const UTM = "utm_source=telegram&utm_medium=bot";
const registro = `${APP_URL}/registro?${UTM}`;

const START = `👋 <b>¡Hola! Soy el bot de PreparaOSS.</b>

Te ayudo a preparar tu concurso de méritos de la CNSC con simulacros a la medida de tu cargo.

Escríbeme el <b>nombre de tu cargo o entidad</b> y te muestro qué hay.
Ej: <i>auxiliar administrativo</i> · <i>DIAN</i> · <i>fiscalía</i>

Comandos: /convocatorias · /entidades · /ayuda`;

const teclado = {
  inline_keyboard: [
    [{ text: "🚀 Practicar gratis", url: registro }],
    [
      { text: "📋 Convocatorias", url: `${APP_URL}/convocatorias` },
      { text: "🏛 Entidades", url: `${APP_URL}/entidades` },
    ],
  ],
};

export async function POST(req: Request) {
  // Telegram firma cada request con el secreto que registramos en setWebhook.
  if (SECRET && req.headers.get("x-telegram-bot-api-secret-token") !== SECRET) {
    return new NextResponse("forbidden", { status: 403 });
  }

  const update = await req.json().catch(() => null);
  const msg = update?.message ?? update?.edited_message;
  const chat = msg?.chat;
  const text: string = (msg?.text ?? "").trim();
  if (!chat?.id || !text) return NextResponse.json({ ok: true });

  const chatId = BigInt(chat.id);
  await prisma.telegramSub.upsert({
    where: { chatId },
    create: { chatId, username: chat.username ?? null, nombre: msg.from?.first_name ?? null },
    update: { activo: true, username: chat.username ?? null },
  });

  try {
    if (text.startsWith("/start")) {
      await tgSend(chatId, START, { reply_markup: teclado });
    } else if (text.startsWith("/convocatorias")) {
      await tgSend(chatId, `📋 Todas las convocatorias abiertas:\n${APP_URL}/convocatorias`, { reply_markup: teclado });
    } else if (text.startsWith("/entidades")) {
      await tgSend(chatId, `🏛 Todas las entidades con concurso:\n${APP_URL}/entidades`, { reply_markup: teclado });
    } else if (text.startsWith("/ayuda") || text.startsWith("/help")) {
      await tgSend(chatId, START, { reply_markup: teclado });
    } else {
      await responderBusqueda(chatId, text.replace(/^\/buscar\s*/i, "").trim());
    }
  } catch (e) {
    // Nunca devolvemos error a Telegram (reintentaría en bucle). Log y 200.
    console.error("telegram handler", e);
  }

  return NextResponse.json({ ok: true });
}

async function responderBusqueda(chatId: bigint, q: string) {
  if (q.length < 3) {
    await tgSend(chatId, "Escríbeme el nombre de tu <b>cargo</b> o <b>entidad</b>. Ej: <i>auxiliar dian</i>", { reply_markup: teclado });
    return;
  }

  const { cargos: opecs, entidades } = await buscarOpecs(q);

  if (opecs.length === 0) {
    await tgSend(
      chatId,
      `No encontré cargos para <b>${esc(q)}</b> 🤔\nMira todas las convocatorias abiertas o prueba con otra palabra.`,
      { reply_markup: teclado }
    );
    return;
  }

  const cargos = opecs
    .slice(0, 6)
    .map((o) => `• <b>${esc(o.nombreCargo)}</b>\n   ${esc(o.entidad)} · ${esc(o.municipio)} · ${o.numVacantes} vac.`)
    .join("\n");

  // Enlaces a los hubs públicos de las entidades encontradas (máx 4).
  const links = entidades
    .map((e) => `🏛 <a href="${hubEntidad(e)}">${esc(e)}</a>`)
    .join("\n");

  await tgSend(
    chatId,
    `Esto encontré para <b>${esc(q)}</b>:\n\n${cargos}\n\n${links}\n\n👉 <b>Practica gratis</b>, sin tarjeta:`,
    {
      link_preview_options: { is_disabled: false },
      reply_markup: { inline_keyboard: [[{ text: "🚀 Empezar ahora", url: registro }]] },
    }
  );
}
