import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/admin/planes — listar todos los planes configurados
export async function GET() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const planes = await prisma.planConfig.findMany({
    orderBy: { precioMensualCOP: "asc" },
  });
  return NextResponse.json(planes);
}
