/**
 * POST /api/opecs/[id]/inscribirse
 * Inscribe (o desinscribe) al usuario en una OPEC
 */

import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Params {
  params: Promise<{ id: string }>;
}

export async function POST(req: NextRequest, { params }: Params) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const { id: opecId } = await params;

  // Verificar que la OPEC existe
  const opec = await prisma.opec.findUnique({ where: { id: opecId } });
  if (!opec) {
    return NextResponse.json({ error: "OPEC no encontrada" }, { status: 404 });
  }

  // UserProfile.id IS the Clerk userId
  // Verify profile exists
  const perfil = await prisma.userProfile.findUnique({ where: { id: userId } });
  if (!perfil) {
    return NextResponse.json({ error: "Perfil de usuario no encontrado" }, { status: 404 });
  }

  // Toggle: si ya está inscrito, desinscribir; si no, inscribir
  const yaInscrito = await prisma.userOpec.findUnique({
    where: { userId_opecId: { userId, opecId } },
  });

  if (yaInscrito) {
    await prisma.userOpec.delete({
      where: { userId_opecId: { userId, opecId } },
    });
    return NextResponse.json({ inscrito: false, mensaje: "Te has desinscrito de esta OPEC" });
  }

  await prisma.userOpec.create({
    data: { userId, opecId },
  });

  return NextResponse.json({ inscrito: true, mensaje: "¡Inscrito exitosamente! Ya puedes practicar." });
}

export async function GET(req: NextRequest, { params }: Params) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const { id: opecId } = await params;

  const perfil = await prisma.userProfile.findUnique({ where: { id: userId } });
  if (!perfil) {
    return NextResponse.json({ inscrito: false });
  }

  const inscripcion = await prisma.userOpec.findUnique({
    where: { userId_opecId: { userId, opecId } },
  });

  return NextResponse.json({ inscrito: !!inscripcion });
}
