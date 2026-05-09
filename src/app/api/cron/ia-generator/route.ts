import { NextResponse } from "next/server";
import { getOpecssinPreguntas } from "@/lib/scraper";
import { generarBancoCompleto } from "@/lib/ia-generator";
import { prisma } from "@/lib/prisma";
import { enviarSimulacroDisponible } from "@/lib/mailer";

// Permitir hasta 5 minutos por ejecución (Vercel Pro). En Hobby cap a 60s.
export const maxDuration = 300;

// GET /api/cron/ia-generator
// Vercel Cron: 4 veces/día (00, 06, 12, 18 UTC). 50 OPECs por ejecución
// → 200 OPECs/día → ~14 días para cubrir las 2.678 pendientes.
// Para generación masiva manual usa: POST /api/admin/generar-lote
export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const BATCH = 50;

  try {
    const opecsSinPreguntas = await getOpecssinPreguntas(BATCH);
    const pendientes = opecsSinPreguntas.length;

    if (pendientes === 0) {
      return NextResponse.json({ ok: true, mensaje: "Todas las OPECs tienen preguntas", pendientes: 0 });
    }

    const lote = opecsSinPreguntas.slice(0, BATCH);
    const generadas: string[] = [];
    const errores: { id: string; error: string }[] = [];

    for (const opecId of lote) {
      try {
        await generarBancoCompleto(opecId);
        generadas.push(opecId);

        // Notificar a los usuarios que siguen esta OPEC
        try {
          const opec = await prisma.opec.findUnique({
            where: { id: opecId },
            select: {
              id: true, simoId: true, nombreCargo: true, entidad: true,
              inscripciones: { select: { user: { select: { email: true, nombre: true } } } },
            },
          });
          if (opec && opec.inscripciones.length > 0) {
            for (const ins of opec.inscripciones) {
              await enviarSimulacroDisponible(ins.user.email, ins.user.nombre, opec).catch(() => {});
              await new Promise((r) => setTimeout(r, 150));
            }
          }
        } catch { /* no bloquear si falla el email */ }
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        console.error(`[Cron/IA] Error OPEC ${opecId}:`, msg);
        errores.push({ id: opecId, error: msg });

        // Si el error es rate limit de Groq, detener el lote para no acumular errores
        if (msg.includes("rate_limit") || msg.includes("429")) {
          console.warn("[Cron/IA] Rate limit alcanzado, deteniendo lote");
          break;
        }
      }
    }

    return NextResponse.json({
      ok: true,
      pendientesAntes: pendientes,
      pendientesDespues: pendientes - generadas.length,
      bancosGenerados: generadas.length,
      errores: errores.length,
      detalleErrores: errores,
    });
  } catch (error) {
    console.error("[Cron/IA] Error general:", error);
    return NextResponse.json({ error: "Error en cron IA" }, { status: 500 });
  }
}
