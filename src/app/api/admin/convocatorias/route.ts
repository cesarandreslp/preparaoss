import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import type { Prisma } from "@prisma/client";
import { requireAdmin } from "@/lib/require-admin";
import { prisma } from "@/lib/prisma";
import { accesoHastaDe } from "@/lib/acceso";

// ─────────────────────────────────────────────────────────────
// Fecha de examen por convocatoria.
// SIMO no expone cronograma (ni /convocatorias/{id} ni /empleos traen fechas
// de pruebas) y CNSC la publica en PDFs por etapa. Así que la fecha se carga
// a mano UNA vez por convocatoria y baja a sus cientos de OPECs.
//
// Clave de agrupación: el id de convocatoria de SIMO cuando existe
// ("id:548594064"); para las OPECs que SIMO ya retiró y por eso nunca
// recibieron ese id, se agrupa por el número de convocatoria ("num:2676/2025").
// ─────────────────────────────────────────────────────────────

function whereDeClave(clave: string): Prisma.OpecWhereInput | null {
  if (clave.startsWith("id:")) {
    const id = Number(clave.slice(3));
    return Number.isInteger(id) ? { convocatoriaId: id } : null;
  }
  if (clave.startsWith("num:")) {
    return { convocatoriaId: null, numerConvocatoria: clave.slice(4) };
  }
  return null;
}

// GET /api/admin/convocatorias — listado con # de OPECs y fecha actual.
export async function GET() {
  const guard = await requireAdmin();
  if (!guard.ok) return guard.response;

  const filas = await prisma.$queryRaw<
    {
      clave: string;
      nombre: string | null;
      numero: string | null;
      opecs: bigint;
      fechaExamen: Date | null;
    }[]
  >`
    SELECT CASE WHEN "convocatoriaId" IS NOT NULL
                THEN 'id:'  || "convocatoriaId"
                ELSE 'num:' || COALESCE("numerConvocatoria", '')
           END                       AS clave,
           MIN("convocatoriaNombre") AS nombre,
           MIN("numerConvocatoria")  AS numero,
           COUNT(*)                  AS opecs,
           MAX("fechaExamen")        AS "fechaExamen"
    FROM "Opec"
    GROUP BY 1
    ORDER BY COUNT(*) DESC
  `;

  const convocatorias = filas.map((f) => ({
    clave: f.clave,
    nombre: f.nombre,
    numero: f.numero,
    opecs: Number(f.opecs),
    enSimo: f.clave.startsWith("id:"),
    fechaExamen: f.fechaExamen ? f.fechaExamen.toISOString().slice(0, 10) : null,
  }));

  return NextResponse.json({ convocatorias });
}

const patchSchema = z.object({
  clave: z.string().min(4).max(80),
  // yyyy-mm-dd; se guarda a mediodía UTC para que no se corra de día en Colombia.
  fechaExamen: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

// PATCH /api/admin/convocatorias — fija la fecha en todas las OPECs de la
// convocatoria y recorta el acceso de quienes ya pagaron.
export async function PATCH(req: NextRequest) {
  const guard = await requireAdmin();
  if (!guard.ok) return guard.response;

  const parsed = patchSchema.safeParse(await req.json().catch(() => ({})));
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Datos inválidos", issues: parsed.error.issues },
      { status: 400 }
    );
  }
  const where = whereDeClave(parsed.data.clave);
  if (!where) {
    return NextResponse.json({ error: "Clave de convocatoria inválida" }, { status: 400 });
  }
  const fecha = new Date(`${parsed.data.fechaExamen}T12:00:00.000Z`);

  const opecs = await prisma.opec.findMany({ where, select: { id: true } });
  if (opecs.length === 0) {
    return NextResponse.json({ error: "Convocatoria sin OPECs" }, { status: 404 });
  }
  const opecIds = opecs.map((o) => o.id);

  await prisma.opec.updateMany({ where, data: { fechaExamen: fecha } });

  // La fecha es la misma para toda la convocatoria, así que el acceso también:
  // un solo updateMany en vez de recalcular fila por fila.
  const [inscripciones, accesos] = await Promise.all([
    prisma.userOpec.updateMany({
      where: { opecId: { in: opecIds } },
      data: { fechaExamen: fecha },
    }),
    prisma.userOpec.updateMany({
      where: { opecId: { in: opecIds }, accesoPagado: true },
      data: { accesoHasta: accesoHastaDe(fecha) },
    }),
  ]);

  return NextResponse.json({
    ok: true,
    opecs: opecIds.length,
    inscripciones: inscripciones.count,
    accesosRecalculados: accesos.count,
  });
}
