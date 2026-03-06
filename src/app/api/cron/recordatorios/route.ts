/**
 * GET /api/cron/recordatorios
 * Vercel Cron: "0 1 * * *" (8PM Colombia = 1AM UTC)
 *
 * Envía email de recordatorio a usuarios que:
 *  - Tienen rachaActual > 0
 *  - No han tenido actividad hoy (ultimaActividad < inicio del día UTC)
 */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { enviarRecordatorioRacha } from "@/lib/resend";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  // Inicio del día actual en UTC
  const hoy = new Date();
  hoy.setUTCHours(0, 0, 0, 0);

  // Usuarios con racha activa que no han estudiado hoy
  const usuarios = await prisma.userProfile.findMany({
    where: {
      rachaActual: { gt: 0 },
      OR: [
        { ultimaActividad: null },
        { ultimaActividad: { lt: hoy } },
      ],
    },
    select: {
      email: true,
      nombre: true,
      rachaActual: true,
    },
  });

  if (usuarios.length === 0) {
    return NextResponse.json({ ok: true, enviados: 0, mensaje: "Todos estudiaron hoy 🎉" });
  }

  let enviados = 0;
  let errores = 0;

  for (const u of usuarios) {
    try {
      await enviarRecordatorioRacha(u.email, u.nombre, u.rachaActual);
      enviados++;
    } catch (e) {
      console.error(`[Cron/Recordatorios] Error enviando a ${u.email}:`, e);
      errores++;
    }
    // Pequeña pausa para no saturar la API de Resend
    await new Promise((r) => setTimeout(r, 200));
  }

  return NextResponse.json({ ok: true, usuariosConRacha: usuarios.length, enviados, errores });
}
