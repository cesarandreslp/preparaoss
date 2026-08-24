/**
 * Registra el webhook del bot en Telegram y el menú de comandos.
 * Se corre UNA vez (o cuando cambie la URL/el secreto).
 *
 *   npx ts-node --transpile-only --project tsconfig.scripts.json scripts/telegram-setup.ts
 *
 * Requiere en .env:  TELEGRAM_BOT_TOKEN, TELEGRAM_WEBHOOK_SECRET
 * (opcional NEXT_PUBLIC_APP_URL; por defecto la de producción).
 */
import { readFileSync } from "fs";

// Carga .env sin depender de dotenv (Prisma lo hace, pero aquí no importamos prisma).
try {
  for (const line of readFileSync(".env", "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "").trim();
  }
} catch {}

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const SECRET = process.env.TELEGRAM_WEBHOOK_SECRET;
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://preparaoss.vercel.app";

async function tg(method: string, body: unknown) {
  const res = await fetch(`https://api.telegram.org/bot${TOKEN}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return res.json();
}

async function main() {
  if (!TOKEN) throw new Error("Falta TELEGRAM_BOT_TOKEN en .env");
  if (!SECRET) throw new Error("Falta TELEGRAM_WEBHOOK_SECRET en .env");

  const webhook = await tg("setWebhook", {
    url: `${APP_URL}/api/telegram`,
    secret_token: SECRET,
    allowed_updates: ["message"],
    drop_pending_updates: true,
  });
  console.log("setWebhook →", webhook);

  const commands = await tg("setMyCommands", {
    commands: [
      { command: "convocatorias", description: "Ver todas las convocatorias abiertas" },
      { command: "entidades", description: "Ver todas las entidades con concurso" },
      { command: "ayuda", description: "Cómo usar el bot" },
    ],
  });
  console.log("setMyCommands →", commands);

  const info = await tg("getWebhookInfo", {});
  console.log("getWebhookInfo →", info);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
