import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/admin/planes — listar todos los planes configurados
export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const planes = await prisma.planConfig.findMany({
    orderBy: { precioMensualCOP: "asc" },
  });
  return NextResponse.json(planes);
}
