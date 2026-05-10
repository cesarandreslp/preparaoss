import { requireAdmin } from "@/lib/require-admin";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { PlanSuscripcion } from "@prisma/client";

// PUT /api/admin/planes/[plan] — actualizar configuración de un plan
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ plan: string }> }
) {
  const guard = await requireAdmin();
  if (!guard.ok) return guard.response;

  const { plan } = await params;
  const planKey = plan.toUpperCase() as PlanSuscripcion;

  if (!Object.values(PlanSuscripcion).includes(planKey)) {
    return NextResponse.json({ error: "Plan inválido" }, { status: 400 });
  }

  const body = await request.json();
  const { nombre, descripcion, precioMensualCOP, simulacrosMes, preguntasPorSimulacro, features, color, emoji, activo } = body;

  const updated = await prisma.planConfig.upsert({
    where: { plan: planKey },
    update: { nombre, descripcion, precioMensualCOP, simulacrosMes, preguntasPorSimulacro, features, color, emoji, activo },
    create: { plan: planKey, nombre, descripcion, precioMensualCOP, simulacrosMes, preguntasPorSimulacro, features, color, emoji, activo },
  });

  return NextResponse.json(updated);
}
