// Cliente mínimo de WhatsApp Cloud API (Meta Graph). Solo enviar texto.
const TOKEN = process.env.WHATSAPP_TOKEN || "";
const PHONE_ID = process.env.WHATSAPP_PHONE_NUMBER_ID || "";
const VERSION = process.env.WHATSAPP_API_VERSION || "v21.0";

export async function waSendText(
  to: string,
  body: string,
  previewUrl = true
): Promise<{ error?: unknown; messages?: unknown }> {
  if (!TOKEN || !PHONE_ID) throw new Error("WhatsApp Cloud API no configurado (WHATSAPP_TOKEN / WHATSAPP_PHONE_NUMBER_ID)");
  const res = await fetch(`https://graph.facebook.com/${VERSION}/${PHONE_ID}/messages`, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to,
      type: "text",
      text: { preview_url: previewUrl, body },
    }),
  });
  return res.json();
}
