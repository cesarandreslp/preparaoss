import { prisma } from "./prisma";

// ─────────────────────────────────────────────────────────────
// Gate de simulacros. Tres modos de acceso, en orden de prioridad:
//   - evento : pase trimestral → práctica ilimitada 3 meses, hasta 3 OPECs.
//   - diario : pase de $6.000 → UN simulacro válido 24h (incluye específicas).
//   - trial  : gratis, solo pools globales (transversal+comportamental).
// ─────────────────────────────────────────────────────────────

// ── Pase trimestral ($49.900): 3 meses, hasta 3 OPECs ──
// El acceso NO se ata a la fecha de examen: la CNSC no la publica de forma
// obtenible y un proceso puede arrastrarse años. Una ventana fija es lo único
// que se le puede prometer al usuario y medir sin depender de nadie.
export const MESES_PASE = 3;
export const CUPOS_PASE = 3;

export function venceTrimestre(desde: Date = new Date()): Date {
  const d = new Date(desde);
  d.setMonth(d.getMonth() + MESES_PASE);
  return d;
}

export type PaseActivo = {
  id: string;
  venceAt: Date;
  usados: number;
  disponibles: number;
};

export type OpecDelPase = { id: string; nombreCargo: string; entidad: string };

export type EstadoPase = {
  activo: (PaseActivo & { opecs: OpecDelPase[] }) | null;
  /** Último pase vencido: sus OPECs son las que puede "seguir" al renovar. */
  anterior: { venceAt: Date; opecs: OpecDelPase[] } | null;
};

/**
 * Estado del pase para la UI: el vigente con sus OPECs y cupos, y el anterior
 * para poder ofrecer "sigue con las mismas" al renovar.
 */
export async function estadoPase(userId: string): Promise<EstadoPase> {
  const pases = await prisma.paseTrimestral.findMany({
    where: { userId },
    orderBy: { venceAt: "desc" },
    take: 2,
    select: {
      id: true,
      venceAt: true,
      opecs: {
        select: { opec: { select: { id: true, nombreCargo: true, entidad: true } } },
      },
    },
  });

  const ahora = new Date();
  const vigente = pases.find((p) => p.venceAt >= ahora) ?? null;
  const previo = pases.find((p) => p !== vigente && p.venceAt < ahora) ?? null;

  return {
    activo: vigente
      ? {
          id: vigente.id,
          venceAt: vigente.venceAt,
          usados: vigente.opecs.length,
          disponibles: Math.max(0, CUPOS_PASE - vigente.opecs.length),
          opecs: vigente.opecs.map((u) => u.opec),
        }
      : null,
    anterior: previo
      ? { venceAt: previo.venceAt, opecs: previo.opecs.map((u) => u.opec) }
      : null,
  };
}

export type EstadoDiario = {
  opec: OpecDelPase;
  venceAt: Date;
  /** Ya lo gastó en un simulacro. */
  usado: boolean;
  /** Comprado, sin usar y aún dentro de las 24 h. */
  vigente: boolean;
};

/**
 * Último pase diario del usuario, con la OPEC en la que lo compró — para
 * ofrecerle repetir ahí o cambiar de OPEC cuando se le acabe.
 */
export async function estadoPaseDiario(userId: string): Promise<EstadoDiario | null> {
  const pase = await prisma.paseDiario.findFirst({
    where: { userId },
    orderBy: { compradoAt: "desc" },
    select: { opecId: true, venceAt: true, simulacroId: true },
  });
  if (!pase) return null;

  // PaseDiario no tiene relación con Opec (se guarda solo el id), así que la
  // OPEC se busca aparte.
  const opec = await prisma.opec.findUnique({
    where: { id: pase.opecId },
    select: { id: true, nombreCargo: true, entidad: true },
  });
  if (!opec) return null;

  const usado = pase.simulacroId !== null;
  return {
    opec,
    venceAt: pase.venceAt,
    usado,
    vigente: !usado && pase.venceAt >= new Date(),
  };
}

/** Pase vigente del usuario con cupos libres, si tiene. */
export async function paseTrimestralActivo(userId: string): Promise<PaseActivo | null> {
  const pase = await prisma.paseTrimestral.findFirst({
    where: { userId, venceAt: { gte: new Date() } },
    orderBy: { compradoAt: "desc" },
    select: { id: true, venceAt: true, _count: { select: { opecs: true } } },
  });
  if (!pase) return null;
  const usados = pase._count.opecs;
  return {
    id: pase.id,
    venceAt: pase.venceAt,
    usados,
    disponibles: Math.max(0, CUPOS_PASE - usados),
  };
}

export const LIMITE_FREE_POR_OPEC = 3; // simulacros gratis por OPEC (trial)
export const PREGUNTAS_FREE = 10; // tamaño del simulacro en el trial
export const PREGUNTAS_PAGADO = 100; // tamaño con acceso pagado
// ponytail: valores fijos por ahora. Si hay que ajustarlos por convocatoria,
// muévelos a AppConfig; hoy no hace falta.

export type ModoAcceso = "evento" | "diario" | "trial" | "bloqueado";

export type ResultadoAcceso = {
  pagado: boolean; // true = incluye específicas (evento o diario)
  permitido: boolean;
  maxPreguntas: number;
  modo: ModoAcceso;
  // Solo cuando modo === "diario": el pase a consumir al iniciar el simulacro.
  paseDiarioId?: string;
  razon?: string;
  simulacrosFreeRestantes?: number;
};

export async function verificarAccesoOpec(
  userId: string,
  opecId: string
): Promise<ResultadoAcceso> {
  const ahora = new Date();

  // 1) Cupo del pase trimestral gastado en esta OPEC (ilimitado hasta venceAt).
  const uo = await prisma.userOpec.findUnique({
    where: { userId_opecId: { userId, opecId } },
    select: { accesoPagado: true, accesoHasta: true },
  });
  // accesoHasta es obligatorio: sin él, un desbloqueo viejo daría acceso eterno.
  const eventoValido = !!uo?.accesoPagado && !!uo.accesoHasta && uo.accesoHasta >= ahora;
  if (eventoValido) {
    return { pagado: true, permitido: true, maxPreguntas: PREGUNTAS_PAGADO, modo: "evento" };
  }

  // 2) Pase diario disponible: comprado, aún sin simulacro iniciado y vigente.
  const pase = await prisma.paseDiario.findFirst({
    where: { userId, opecId, simulacroId: null, venceAt: { gte: ahora } },
    orderBy: { compradoAt: "desc" },
    select: { id: true },
  });
  if (pase) {
    return {
      pagado: true,
      permitido: true,
      maxPreguntas: PREGUNTAS_PAGADO,
      modo: "diario",
      paseDiarioId: pase.id,
    };
  }

  // 3) Trial gratis: cuenta simulacros que el usuario ya hizo de ESTA OPEC.
  const usados = await prisma.simulacro.count({ where: { userId, opecId } });
  const restantes = LIMITE_FREE_POR_OPEC - usados;

  if (restantes <= 0) {
    return {
      pagado: false,
      permitido: false,
      maxPreguntas: PREGUNTAS_FREE,
      modo: "bloqueado",
      simulacrosFreeRestantes: 0,
      razon:
        "Usaste tus simulacros gratis de esta OPEC. Compra un pase diario ($6.000) o desbloquéala hasta el examen.",
    };
  }

  return {
    pagado: false,
    permitido: true,
    maxPreguntas: PREGUNTAS_FREE,
    modo: "trial",
    simulacrosFreeRestantes: restantes,
  };
}
