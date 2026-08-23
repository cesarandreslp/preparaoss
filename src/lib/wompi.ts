import { createHash, randomBytes } from "crypto";

// ─────────────────────────────────────────────────────────────
// Integración Wompi — pago por evento (desbloqueo de OPEC).
// Web Checkout por redirección + webhook de eventos. Sin SDK externo.
// Docs: https://docs.wompi.co
// ─────────────────────────────────────────────────────────────

export const PRECIO_OPEC_COP = Number(process.env.PRECIO_OPEC_COP ?? 49900);
export const CURRENCY = "COP";
const CHECKOUT_URL = "https://checkout.wompi.co/p/";
const REF_PREFIJO = "POSS";

function env(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Falta variable de entorno ${name}`);
  return v;
}

// reference = POSS-<opecId>-<userId>-<nonce>. opecId/userId son cuid (sin
// guiones), así el guion es delimitador seguro. La firma de integridad impide
// alterar el monto; el checksum del webhook prueba que el evento es de Wompi.
export function nuevaReferencia(opecId: string, userId: string): string {
  return `${REF_PREFIJO}-${opecId}-${userId}-${randomBytes(6).toString("hex")}`;
}

export function parseReferencia(
  ref: string
): { opecId: string; userId: string } | null {
  const p = ref.split("-");
  if (p.length !== 4 || p[0] !== REF_PREFIJO) return null;
  return { opecId: p[1], userId: p[2] };
}

// SHA256(reference + amountInCents + currency + integritySecret)
export function firmaIntegridad(reference: string, amountInCents: number): string {
  const cadena = `${reference}${amountInCents}${CURRENCY}${env("WOMPI_INTEGRITY_SECRET")}`;
  return createHash("sha256").update(cadena).digest("hex");
}

export function urlCheckout(params: {
  reference: string;
  amountInCents: number;
  redirectUrl: string;
}): string {
  const q = new URLSearchParams({
    "public-key": env("WOMPI_PUBLIC_KEY"),
    currency: CURRENCY,
    "amount-in-cents": String(params.amountInCents),
    reference: params.reference,
    "signature:integrity": firmaIntegridad(params.reference, params.amountInCents),
    "redirect-url": params.redirectUrl,
  });
  return `${CHECKOUT_URL}?${q.toString()}`;
}

// ── Webhook: valida el checksum del evento ──
// checksum = SHA256( <valores de properties, en orden> + timestamp + eventsSecret )
type EventoWompi = {
  data?: Record<string, unknown>;
  timestamp?: number;
  signature?: { properties?: string[]; checksum?: string };
};

function valorPorRuta(obj: unknown, ruta: string): string {
  const val = ruta.split(".").reduce<unknown>((acc, k) => {
    if (acc && typeof acc === "object") return (acc as Record<string, unknown>)[k];
    return undefined;
  }, obj);
  return val == null ? "" : String(val);
}

export function eventoValido(body: EventoWompi): boolean {
  const props = body.signature?.properties;
  const recibido = body.signature?.checksum;
  if (!props || !recibido || body.timestamp == null) return false;

  const cadena =
    props.map((p) => valorPorRuta(body.data, p)).join("") +
    body.timestamp +
    env("WOMPI_EVENTS_SECRET");
  const calculado = createHash("sha256").update(cadena).digest("hex");
  return calculado.toLowerCase() === recibido.toLowerCase();
}
