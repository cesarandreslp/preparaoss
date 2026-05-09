import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const opec = await prisma.opec.findUnique({
    where: { id },
    include: {
      _count: {
        select: {
          preguntas: true,
          inscripciones: true,
          simulacros: true,
        },
      },
    },
  });

  if (!opec) {
    return NextResponse.json({ error: "OPEC no encontrada" }, { status: 404 });
  }

  return NextResponse.json(opec);
}
