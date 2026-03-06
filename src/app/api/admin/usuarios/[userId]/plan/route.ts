import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { PlanSuscripcion, EstadoSuscripcion } from "@prisma/client";

// POST /api/admin/usuarios/[userId]/plan
// Body: { plan: "BASICO"|"PRO"|"PREMIUM"|"GRATUITO", meses: 1 }
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId: adminId } = await auth();
  if (!adminId) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const { userId } = await params;
  const body = await request.json();
  const { plan, meses = 1 } = body as { plan: PlanSuscripcion; meses?: number };

  if (!Object.values(PlanSuscripcion).includes(plan)) {
    return NextResponse.json({ error: "Plan inválido" }, { status: 400 });
  }

  // Obtener config del plan
  const planConfig = await prisma.planConfig.findUnique({ where: { plan } });
  if (!planConfig) return NextResponse.json({ error: "PlanConfig no encontrado" }, { status: 404 });

  const finAt = plan === PlanSuscripcion.GRATUITO
    ? null
    : new Date(Date.now() + meses * 30 * 24 * 60 * 60 * 1000);

  const user = await prisma.userProfile.findUnique({
    where: { id: userId },
    select: { suscripcionId: true },
  });

  if (!user) return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });

  // Upsert suscripción
  let suscripcion;
  if (user.suscripcionId) {
    suscripcion = await prisma.suscripcion.update({
      where: { id: user.suscripcionId },
      data: {
        plan,
        estado: EstadoSuscripcion.ACTIVA,
        simulacrosMes: planConfig.simulacrosMes,
        preguntasPorSimulacro: planConfig.preguntasPorSimulacro,
        inicioAt: new Date(),
        finAt,
      },
    });
  } else {
    suscripcion = await prisma.suscripcion.create({
      data: {
        plan,
        estado: EstadoSuscripcion.ACTIVA,
        simulacrosMes: planConfig.simulacrosMes,
        preguntasPorSimulacro: planConfig.preguntasPorSimulacro,
        inicioAt: new Date(),
        finAt,
        user: { connect: { id: userId } },
      },
    });
    // Vincular al user
    await prisma.userProfile.update({
      where: { id: userId },
      data: { suscripcionId: suscripcion.id },
    });
  }

  return NextResponse.json({ ok: true, suscripcion });
}
