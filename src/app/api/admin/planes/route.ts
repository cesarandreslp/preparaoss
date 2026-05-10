import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/require-admin";
import { prisma } from "@/lib/prisma";

// GET /api/admin/planes — listar todos los planes configurados
export async function GET() {
  const guard = await requireAdmin();
  if (!guard.ok) return guard.response;

  const planes = await prisma.planConfig.findMany({
    orderBy: { precioMensualCOP: "asc" },
  });
  return NextResponse.json(planes);
}
