/**
 * GET  /api/admin/config        → devuelve todas las claves de configuración (sin valores sensibles)
 * POST /api/admin/config        → guarda/actualiza una clave de configuración
 * POST /api/admin/config/test   → prueba el envío de email con la config actual
 */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Claves que se enmascaran al leer (no devolver en texto plano)
const SENSITIVE_KEYS = ["SMTP_PASS"];

// Claves permitidas (whitelist)
const ALLOWED_KEYS = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "EMAIL_FROM"];

export async function GET() {
  const configs = await prisma.appConfig.findMany({
    orderBy: { key: "asc" },
  });

  // Enmascarar contraseña
  const data = configs.map((c) => ({
    key: c.key,
    value: SENSITIVE_KEYS.includes(c.key) ? (c.value ? "••••••••" : "") : c.value,
    hasValue: !!c.value,
    updatedAt: c.updatedAt,
  }));

  return NextResponse.json({ ok: true, configs: data });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { key, value } = body as { key: string; value: string };

  if (!ALLOWED_KEYS.includes(key)) {
    return NextResponse.json({ error: `Clave no permitida: ${key}` }, { status: 400 });
  }

  await prisma.appConfig.upsert({
    where: { key },
    create: { key, value },
    update: { value },
  });

  return NextResponse.json({ ok: true });
}
