import { prisma } from "./prisma";

// ─────────────────────────────────────────────────────────────
// Acceso por evento (pago único por OPEC). Reemplaza la cuota mensual
// por suscripción como gate de los simulacros.
//   - Pagó esta OPEC  → práctica ilimitada hasta el día del examen.
//   - No pagó         → trial gratis de cortesía para enganchar, luego paywall.
// ─────────────────────────────────────────────────────────────

export const LIMITE_FREE_POR_OPEC = 3; // simulacros gratis por OPEC (trial)
export const PREGUNTAS_FREE = 10; // tamaño del simulacro en el trial
export const PREGUNTAS_PAGADO = 100; // tamaño con acceso pagado
// ponytail: valores fijos por ahora. Si hay que ajustarlos por convocatoria,
// muévelos a AppConfig; hoy no hace falta.

export type ResultadoAcceso = {
  pagado: boolean;
  permitido: boolean;
  maxPreguntas: number;
  razon?: string;
  simulacrosFreeRestantes?: number;
};

export async function verificarAccesoOpec(
  userId: string,
  opecId: string
): Promise<ResultadoAcceso> {
  const uo = await prisma.userOpec.findUnique({
    where: { userId_opecId: { userId, opecId } },
    select: { accesoPagado: true, accesoHasta: true },
  });

  const ahora = new Date();
  const pagado =
    !!uo?.accesoPagado && (!uo.accesoHasta || uo.accesoHasta >= ahora);

  if (pagado) {
    return { pagado: true, permitido: true, maxPreguntas: PREGUNTAS_PAGADO };
  }

  // Trial gratis: cuenta simulacros que el usuario ya hizo de ESTA OPEC.
  const usados = await prisma.simulacro.count({ where: { userId, opecId } });
  const restantes = LIMITE_FREE_POR_OPEC - usados;

  if (restantes <= 0) {
    return {
      pagado: false,
      permitido: false,
      maxPreguntas: PREGUNTAS_FREE,
      simulacrosFreeRestantes: 0,
      razon:
        "Usaste tus simulacros gratis de esta OPEC. Desbloquéala y practica sin límite hasta el día del examen.",
    };
  }

  return {
    pagado: false,
    permitido: true,
    maxPreguntas: PREGUNTAS_FREE,
    simulacrosFreeRestantes: restantes,
  };
}
