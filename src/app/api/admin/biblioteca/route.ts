import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/require-admin";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const guard = await requireAdmin();
  if (!guard.ok) return guard.response;

  const recursos = await prisma.recursoBiblioteca.findMany({
    orderBy: [{ bloque: "asc" }, { orden: "asc" }, { titulo: "asc" }],
  });

  return NextResponse.json({ total: recursos.length, recursos });
}
