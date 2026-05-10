import { requireAdmin } from "@/lib/require-admin";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/admin/usuarios?page=0&search=email
export async function GET(request: NextRequest) {
  const guard = await requireAdmin();
  if (!guard.ok) return guard.response;

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") ?? "0");
  const search = searchParams.get("search") ?? "";
  const PAGE_SIZE = 20;

  const where = search
    ? { OR: [{ email: { contains: search, mode: "insensitive" as const } }, { nombre: { contains: search, mode: "insensitive" as const } }] }
    : {};

  const [total, usuarios] = await Promise.all([
    prisma.userProfile.count({ where }),
    prisma.userProfile.findMany({
      where,
      skip: page * PAGE_SIZE,
      take: PAGE_SIZE,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        email: true,
        nombre: true,
        xpTotal: true,
        nivel: true,
        simulacrosTotal: true,
        createdAt: true,
        suscripcion: {
          select: {
            plan: true,
            estado: true,
            inicioAt: true,
            finAt: true,
          },
        },
      },
    }),
  ]);

  return NextResponse.json({ total, page, pageSize: PAGE_SIZE, usuarios });
}
