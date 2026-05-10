import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/require-admin";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const guard = await requireAdmin();
  if (!guard.ok) return guard.response;
  const entidades = await prisma.entidadEspecial.findMany({
    orderBy: { nombre: "asc" },
    include: { _count: { select: { opecs: true } } },
  });
  return NextResponse.json({ entidades });
}

const createSchema = z.object({
  slug: z.string().min(2).max(50).regex(/^[a-z0-9-]+$/),
  nombre: z.string().min(3).max(200),
  descripcion: z.string().max(2000).nullable().optional(),
  apiUrl: z.string().url().max(500),
  webUrl: z.string().url().max(500).nullable().optional(),
  pageParam: z.string().min(1).max(40).optional(),
  sizeParam: z.string().min(1).max(40).optional(),
  pageSize: z.number().int().min(1).max(200).optional(),
  itemsKey: z.string().min(1).max(80).optional(),
  totalKey: z.string().min(1).max(80).optional(),
  activo: z.boolean().optional(),
});

export async function POST(req: NextRequest) {
  const guard = await requireAdmin();
  if (!guard.ok) return guard.response;
  const body = await req.json().catch(() => ({}));
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Datos inválidos", issues: parsed.error.issues },
      { status: 400 }
    );
  }
  try {
    const ent = await prisma.entidadEspecial.create({ data: parsed.data });
    return NextResponse.json({ ok: true, entidad: ent });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : String(e) },
      { status: 500 }
    );
  }
}
