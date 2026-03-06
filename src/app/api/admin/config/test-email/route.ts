/**
 * POST /api/admin/config/test-email
 * Envía un email de prueba al SMTP_USER configurado
 */
import { NextResponse } from "next/server";
import { enviarEmailPrueba } from "@/lib/mailer";

export async function POST() {
  try {
    await enviarEmailPrueba();
    return NextResponse.json({ ok: true, mensaje: "Email de prueba enviado ✅" });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
