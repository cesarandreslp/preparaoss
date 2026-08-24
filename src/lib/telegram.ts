// Cliente mínimo del Bot API de Telegram. Solo lo que usamos: enviar mensajes.
const TOKEN = process.env.TELEGRAM_BOT_TOKEN || "";
const API = `https://api.telegram.org/bot${TOKEN}`;

// parse_mode HTML: hay que escapar estos tres caracteres en el texto dinámico.
export function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function tgSend(
  chatId: number | bigint | string,
  text: string,
  extra: Record<string, unknown> = {}
): Promise<{ ok: boolean; error_code?: number }> {
  if (!TOKEN) throw new Error("TELEGRAM_BOT_TOKEN no configurado");
  const res = await fetch(`${API}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId.toString(),
      text,
      parse_mode: "HTML",
      link_preview_options: { is_disabled: true },
      ...extra,
    }),
  });
  return res.json();
}
