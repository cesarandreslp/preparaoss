import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = "PreparaOSS <onboarding@resend.dev>";
const APP_URL = "https://preparaoss.vercel.app";

// ──────────────────────────────────────────────
// Email: recordatorio de racha en riesgo
// Se envía cuando el usuario no ha estudiado hoy
// ──────────────────────────────────────────────
export async function enviarRecordatorioRacha(
  email: string,
  nombre: string,
  racha: number
) {
  const mensaje =
    racha === 1
      ? "Tienes <strong>1 día de racha</strong> activa. ¡No la pierdas!"
      : `Tu racha de <strong>${racha} días</strong> está en riesgo. ¡Haz un simulacro hoy!`;

  const emoji = racha >= 7 ? "🔥🔥" : racha >= 3 ? "🔥" : "⚡";

  await resend.emails.send({
    from: FROM,
    to: email,
    subject: `${emoji} Tu racha de ${racha} días está en riesgo — PreparaOSS`,
    html: baseTemplate(`
      <h2 style="margin:0 0 8px;font-size:22px;color:#F5A623;">
        ${emoji} ¡Hola, ${nombre}!
      </h2>
      <p style="margin:0 0 16px;font-size:15px;color:#A8BFDC;">
        ${mensaje}
      </p>
      <p style="margin:0 0 24px;font-size:14px;color:#6B8BAD;">
        Recuerda: cada simulacro que realizas te acerca más a superar el proceso de selección de la CNSC.
      </p>
      <a href="${APP_URL}/opecs"
         style="display:inline-block;background:linear-gradient(135deg,#1B3A6B,#2563EB);color:#fff;text-decoration:none;padding:14px 32px;border-radius:12px;font-weight:700;font-size:15px;">
        🚀 Hacer un simulacro ahora
      </a>
    `),
  });
}

// ──────────────────────────────────────────────
// Email: simulacro disponible para una OPEC seguida
// Se envía cuando el cron de IA genera preguntas para una OPEC
// ──────────────────────────────────────────────
export async function enviarSimulacroDisponible(
  email: string,
  nombre: string,
  opec: { id: string; nombreCargo: string; entidad: string; simoId: string }
) {
  await resend.emails.send({
    from: FROM,
    to: email,
    subject: `📢 Nuevo simulacro disponible: ${opec.nombreCargo} — PreparaOSS`,
    html: baseTemplate(`
      <h2 style="margin:0 0 8px;font-size:22px;color:#4A90D9;">
        📢 ¡Hola, ${nombre}!
      </h2>
      <p style="margin:0 0 6px;font-size:15px;color:#A8BFDC;">
        Ya está disponible el simulacro para la OPEC que sigues:
      </p>
      <div style="background:rgba(27,58,107,0.60);border:1px solid #2A4A7F;border-radius:12px;padding:16px;margin:16px 0;">
        <p style="margin:0 0 4px;font-size:12px;color:#6B8BAD;text-transform:uppercase;letter-spacing:1px;">
          OPEC #${opec.simoId}
        </p>
        <p style="margin:0 0 4px;font-size:17px;font-weight:700;color:#F0F4FA;">
          ${opec.nombreCargo}
        </p>
        <p style="margin:0;font-size:13px;color:#A8BFDC;">${opec.entidad}</p>
      </div>
      <p style="margin:0 0 24px;font-size:14px;color:#6B8BAD;">
        El banco de preguntas fue generado con IA especializada para este cargo. Practica ahora y mejora tu posición en el ranking.
      </p>
      <a href="${APP_URL}/opecs/${opec.id}/simulacro"
         style="display:inline-block;background:linear-gradient(135deg,#1B3A6B,#2563EB);color:#fff;text-decoration:none;padding:14px 32px;border-radius:12px;font-weight:700;font-size:15px;">
        🎯 Iniciar simulacro
      </a>
    `),
  });
}

// ──────────────────────────────────────────────
// Layout base compartido por todos los emails
// ──────────────────────────────────────────────
function baseTemplate(content: string): string {
  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#0B1628;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0B1628;padding:32px 16px;">
    <tr><td align="center">
      <table width="100%" style="max-width:520px;background:#0F1E38;border-radius:16px;border:1px solid #1E3D6E;overflow:hidden;">
        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#1B3A6B,#0F1E38);padding:24px 32px;border-bottom:1px solid #1E3D6E;">
            <p style="margin:0;font-size:20px;font-weight:800;color:#F0F4FA;letter-spacing:-0.5px;">
              Prepara<span style="color:#4A90D9;">OSS</span>
            </p>
            <p style="margin:4px 0 0;font-size:12px;color:#6B8BAD;">
              Plataforma de preparación CNSC
            </p>
          </td>
        </tr>
        <!-- Content -->
        <tr>
          <td style="padding:32px;">
            ${content}
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="padding:16px 32px 24px;border-top:1px solid #1E3D6E;">
            <p style="margin:0;font-size:11px;color:#3A5070;text-align:center;">
              © 2026 PreparaOSS · 
              <a href="${APP_URL}" style="color:#3A5070;">preparaoss.vercel.app</a>
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
