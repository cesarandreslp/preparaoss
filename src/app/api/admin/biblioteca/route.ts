import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const recursos = await prisma.recursoBiblioteca.findMany({
    orderBy: [{ bloque: "asc" }, { orden: "asc" }, { titulo: "asc" }],
  });

  return NextResponse.json({ total: recursos.length, recursos });
}
