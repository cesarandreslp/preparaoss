import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

// Captura pública de correo (el activo #1 del plan). Idempotente por email:
// si el lead vuelve, actualizamos su OPEC/score sin duplicar.
const schema = z.object({
  email: z.string().email().max(160).transform((s) => s.trim().toLowerCase()),
  opecId: z.string().optional(),
  source: z.string().max(40).optional(),
  score: z.number().int().min(0).max(100).optional(),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Correo inválido" }, { status: 400 });
  }
  const { email, opecId, source, score } = parsed.data;

  const lead = await prisma.lead.upsert({
    where: { email },
    create: { email, opecId, source: source ?? "probador", score },
    update: {
      // No pisamos datos previos con nulos.
      ...(opecId ? { opecId } : {}),
      ...(source ? { source } : {}),
      ...(score != null ? { score } : {}),
    },
    select: { id: true },
  });

  return NextResponse.json({ ok: true, id: lead.id });
}
