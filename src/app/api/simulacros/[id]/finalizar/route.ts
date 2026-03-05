import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { calcularPuntaje, RespuestaInput } from "@/lib/simulacro-engine";
import {
  calcularXPSimulacro,
  actualizarRacha,
  agregarXP,
  verificarBadges,
} from "@/lib/gamification";

// POST /api/simulacros/[id]/finalizar
// Recibe todas las respuestas, calcula puntaje, guarda y retorna retroalimentación
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const { id: simulacroId } = await params;

  // Verificar que el simulacro pertenece al usuario
  const simulacro = await prisma.simulacro.findUnique({
    where: { id: simulacroId },
    select: {
      id: true,
      userId: true,
      opecId: true,
      estado: true,
      iniciadoAt: true,
    },
  });

  if (!simulacro) {
    return NextResponse.json({ error: "Simulacro no encontrado" }, { status: 404 });
  }
  if (simulacro.userId !== userId) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }
  if (simulacro.estado !== "EN_PROGRESO") {
    return NextResponse.json({ error: "Simulacro ya finalizado" }, { status: 400 });
  }

  const body = await request.json();
  const { respuestas } = body as { respuestas: RespuestaInput[] };

  if (!respuestas || respuestas.length === 0) {
    return NextResponse.json({ error: "No se recibieron respuestas" }, { status: 400 });
  }

  // Calcular puntaje y retroalimentación
  const puntaje = await calcularPuntaje(respuestas);

  // Calcular tiempo total
  const tiempoSegundos = Math.round(
    (Date.now() - new Date(simulacro.iniciadoAt).getTime()) / 1000
  );

  // Verificar si es el primer simulacro en esta OPEC
  const simulacrosPrevios = await prisma.simulacro.count({
    where: {
      userId,
      opecId: simulacro.opecId,
      estado: "COMPLETADO",
      id: { not: simulacroId },
    },
  });

  // Actualizar racha
  const { rachaActual } = await actualizarRacha(userId);

  // Calcular XP ganado
  const xpGanado = calcularXPSimulacro({
    correctas: puntaje.correctasFuncEsp + puntaje.correctasFuncTrans + puntaje.correctasComport,
    total: puntaje.totalFuncEsp + puntaje.totalFuncTrans + puntaje.totalComport,
    tipo: "MIXTO",
    esPrimeroEnOpec: simulacrosPrevios === 0,
    rachaActual,
  });

  // Guardar respuestas individuales en BD
  await prisma.respuestaUsuario.createMany({
    data: respuestas.map((r) => {
      const detalle = puntaje.respuestasDetalle.find(
        (d) => d.preguntaId === r.preguntaId
      );
      return {
        simulacroId,
        preguntaId: r.preguntaId,
        opcionId: r.opcionId ?? null,
        valorLikert: r.valorLikert ?? null,
        esCorrecta: detalle?.esCorrecta ?? false,
      };
    }),
  });

  // Marcar simulacro como COMPLETADO
  await prisma.simulacro.update({
    where: { id: simulacroId },
    data: {
      estado: "COMPLETADO",
      puntajeTotal: puntaje.puntajeTotal,
      puntajeFuncEsp: puntaje.puntajeFuncEsp,
      puntajeFuncTrans: puntaje.puntajeFuncTrans,
      puntajeComport: puntaje.puntajeComport,
      xpGanado,
      tiempoSegundos,
      finalizadoAt: new Date(),
    },
  });

  // Agregar XP al usuario y ranking de OPEC
  await agregarXP(userId, xpGanado, simulacro.opecId);

  // Verificar si ganó nuevos badges
  const badgesNuevos = await verificarBadges(userId);

  return NextResponse.json({
    puntajeTotal: puntaje.puntajeTotal,
    puntajeFuncEsp: puntaje.puntajeFuncEsp,
    puntajeFuncTrans: puntaje.puntajeFuncTrans,
    puntajeComport: puntaje.puntajeComport,
    xpGanado,
    tiempoSegundos,
    badgesNuevos,
    // Retroalimentación: se envía DESPUÉS de finalizar (no durante el simulacro)
    retroalimentacion: puntaje.respuestasDetalle,
  });
}
