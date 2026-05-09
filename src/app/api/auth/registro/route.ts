import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const registroSchema = z.object({
  nombre: z.string().min(2).max(100),
  email: z.string().email().toLowerCase(),
  password: z.string().min(6).max(100),
});

export async function POST(req: NextRequest) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const parsed = registroSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }

  const { nombre, email, password } = parsed.data;

  const existing = await prisma.userProfile.findUnique({
    where: { email },
    select: { id: true },
  });
  if (existing) {
    return NextResponse.json(
      { error: "Ya existe una cuenta con ese email." },
      { status: 409 }
    );
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.$transaction(async (tx) => {
    const suscripcion = await tx.suscripcion.create({
      data: { plan: "GRATUITO", simulacrosMes: 3, preguntasPorSimulacro: 10 },
    });
    await tx.userProfile.create({
      data: {
        email,
        nombre,
        passwordHash,
        suscripcionId: suscripcion.id,
      },
    });
  });

  return NextResponse.json({ ok: true });
}
