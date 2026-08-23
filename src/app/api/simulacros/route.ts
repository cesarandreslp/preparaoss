import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { armarSimulacro } from "@/lib/simulacro-engine";
import { verificarAccesoOpec } from "@/lib/acceso";
import { TipoSimulacro } from "@prisma/client";

// POST /api/simulacros — Crear nuevo simulacro
export async function POST(request: Request) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const body = await request.json();
  const { opecId, tipoSimulacro = "MIXTO" } = body as {
    opecId: string;
    tipoSimulacro?: TipoSimulacro;
  };

  if (!opecId) {
    return NextResponse.json({ error: "opecId es requerido" }, { status: 400 });
  }

  // Gate por evento: ¿pagó esta OPEC, o le quedan simulacros gratis?
  const acceso = await verificarAccesoOpec(userId, opecId);
  if (!acceso.permitido) {
    // 402 Payment Required: la UI muestra el paywall de la OPEC.
    return NextResponse.json(
      { error: acceso.razon, requierePago: true, opecId },
      { status: 402 }
    );
  }

  const maxPreguntas = acceso.maxPreguntas;

  // Armar el banco de preguntas
  const { escenarios, preguntasIndividuales } = await armarSimulacro(
    opecId,
    tipoSimulacro,
    maxPreguntas,
    userId
  );

  if (escenarios.length === 0 && preguntasIndividuales.length === 0) {
    return NextResponse.json(
      {
        error:
          "Esta OPEC aún no tiene preguntas generadas. Vuelve en unos minutos.",
      },
      { status: 404 }
    );
  }

  // Crear el simulacro en BD (estado: EN_PROGRESO)
  const simulacro = await prisma.simulacro.create({
    data: {
      userId,
      opecId,
      tipoSimulacro,
      estado: "EN_PROGRESO",
    },
    select: { id: true, iniciadoAt: true },
  });

  // Incrementar contador mensual
  await prisma.userProfile.update({
    where: { id: userId },
    data: { simulacrosMesActual: { increment: 1 } },
  });

  return NextResponse.json({
    simulacroId: simulacro.id,
    iniciadoAt: simulacro.iniciadoAt,
    pagado: acceso.pagado,
    simulacrosFreeRestantes: acceso.simulacrosFreeRestantes,
    escenarios,        // Escenarios de juicio situacional
    preguntas: preguntasIndividuales, // Transversales + Comportamentales
    totalPreguntas:
      escenarios.reduce((acc, e) => acc + e.preguntas.length, 0) +
      preguntasIndividuales.length,
  });
}

// GET /api/simulacros — Historial de simulacros del usuario
export async function GET(request: Request) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const opecId = searchParams.get("opecId");

  const simulacros = await prisma.simulacro.findMany({
    where: {
      userId,
      ...(opecId ? { opecId } : {}),
      estado: "COMPLETADO",
    },
    select: {
      id: true,
      opecId: true,
      tipoSimulacro: true,
      puntajeTotal: true,
      puntajeFuncEsp: true,
      puntajeFuncTrans: true,
      puntajeComport: true,
      xpGanado: true,
      tiempoSegundos: true,
      finalizadoAt: true,
      opec: { select: { nombreCargo: true, entidad: true } },
    },
    orderBy: { finalizadoAt: "desc" },
    take: 20,
  });

  return NextResponse.json(simulacros);
}
