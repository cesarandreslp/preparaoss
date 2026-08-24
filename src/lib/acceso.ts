import { prisma } from "./prisma";

// ─────────────────────────────────────────────────────────────
// Gate de simulacros. Tres modos de acceso, en orden de prioridad:
//   - evento : pagó la OPEC → práctica ilimitada hasta el día del examen.
//   - diario : pase de $6.000 → UN simulacro válido 24h (incluye específicas).
//   - trial  : gratis, solo pools globales (transversal+comportamental).
// ─────────────────────────────────────────────────────────────

export const DIAS_GRACIA_EXAMEN = 3; // el acceso sigue vivo unos días tras el examen
export const MESES_ACCESO_SIN_FECHA = 12;

// Ventana del pase de evento. SIMO no publica cronograma, así que la mayoría de
// OPECs no tiene fechaExamen: sin este tope, un pago único daba acceso perpetuo.
// Cuando el admin fija la fecha de la convocatoria, la ventana se recorta.
export function accesoHastaDe(
  fechaExamen: Date | null | undefined,
  desde: Date = new Date()
): Date {
  if (fechaExamen) {
    return new Date(fechaExamen.getTime() + DIAS_GRACIA_EXAMEN * 86_400_000);
  }
  const d = new Date(desde);
  d.setMonth(d.getMonth() + MESES_ACCESO_SIN_FECHA);
  return d;
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

  // 1) Pase evento (ilimitado hasta el examen)
  const uo = await prisma.userOpec.findUnique({
    where: { userId_opecId: { userId, opecId } },
    select: { accesoPagado: true, accesoHasta: true },
  });
  const eventoValido =
    !!uo?.accesoPagado && (!uo.accesoHasta || uo.accesoHasta >= ahora);
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
