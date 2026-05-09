import { NextResponse } from "next/server";
import { after } from "next/server";
import { getOpecssinPreguntas } from "@/lib/scraper";
import { generarBancoCompleto } from "@/lib/ia-generator";
import { prisma } from "@/lib/prisma";
import { enviarSimulacroDisponible } from "@/lib/mailer";

// Vercel Hobby cap: 60s — la function sigue viva post-response gracias a after().
export const maxDuration = 60;

// GET /api/cron/ia-generator
// Patrón: responde 200 inmediato y continúa procesando en background.
// Esto evita timeouts del lado del cron caller (cron-job.org tiene ~30s).
// Vercel mantiene viva la function hasta que termine o golpee maxDuration.
export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  // Batch ajustado para que ~10 OPECs quepan en los 55s post-response.
  const BATCH = 10;

  // Pre-fetch rápido para que la respuesta lleve info útil
  const opecsSinPreguntas = await getOpecssinPreguntas(BATCH);
  const pendientes = opecsSinPreguntas.length;

  if (pendientes === 0) {
    return NextResponse.json({ ok: true, mensaje: "Todas las OPECs tienen preguntas", pendientes: 0 });
  }

  // Disparamos la generación en background — el caller no se queda esperando.
  after(async () => {
    const lote = opecsSinPreguntas.slice(0, BATCH);
    let generadas = 0;
    let errores = 0;

    for (const opecId of lote) {
      try {
        await generarBancoCompleto(opecId);
        generadas++;

        // Notificar a usuarios inscritos
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
        } catch {
          /* no bloquear si falla el email */
        }
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        console.error(`[Cron/IA bg] Error OPEC ${opecId}:`, msg);
        errores++;

        if (msg.includes("rate_limit") || msg.includes("429")) {
          console.warn("[Cron/IA bg] Rate limit Groq, deteniendo lote");
          break;
        }
      }
    }

    console.log(`[Cron/IA bg] OK: ${generadas} bancos, ${errores} errores`);
  });

  return NextResponse.json({
    ok: true,
    pendientes,
    started: BATCH,
    note: "Generación lanzada en background. Revisa logs en Vercel para detalle.",
  });
}
