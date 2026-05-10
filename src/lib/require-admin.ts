/**
 * Helper para endpoints API que requieren rol ADMIN.
 *
 * Uso:
 *   const guard = await requireAdmin();
 *   if (!guard.ok) return guard.response;
 *   const userId = guard.userId;
 */

import { NextResponse } from "next/server";
import { auth } from "@/auth";

type Guard =
  | { ok: true; userId: string }
  | { ok: false; response: NextResponse };

export async function requireAdmin(): Promise<Guard> {
  const session = await auth();
  if (!session?.user?.id) {
    return {
      ok: false,
      response: NextResponse.json({ error: "No autenticado" }, { status: 401 }),
    };
  }
  if (session.user.rol !== "ADMIN") {
    return {
      ok: false,
      response: NextResponse.json({ error: "Requiere rol ADMIN" }, { status: 403 }),
    };
  }
  return { ok: true, userId: session.user.id };
}
