/**
 * Garantiza que exista un UserProfile en la DB para el usuario autenticado.
 * Se llama en cada página protegida como respaldo al webhook de Clerk.
 */

import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "./prisma";

export async function ensureUserProfile(userId: string) {
  const exists = await prisma.userProfile.findUnique({
    where: { id: userId },
    select: { id: true },
  });
  if (exists) return;

  const clerkUser = await currentUser();
  const email = clerkUser?.emailAddresses[0]?.emailAddress ?? "";
  const nombre =
    [clerkUser?.firstName, clerkUser?.lastName].filter(Boolean).join(" ") ||
    email.split("@")[0] ||
    "Usuario";

  await prisma.$transaction(async (tx) => {
    const suscripcion = await tx.suscripcion.create({
      data: { plan: "GRATUITO", simulacrosMes: 3, preguntasPorSimulacro: 10 },
    });
    await tx.userProfile.create({
      data: { id: userId, email, nombre, suscripcionId: suscripcion.id },
    });
  });
}
