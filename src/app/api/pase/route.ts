import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { CUPOS_PASE, estadoPase, estadoPaseDiario } from "@/lib/acceso";

// GET /api/pase — estado del pase trimestral del usuario: el vigente con sus
// OPECs y cupos libres, y el anterior (para ofrecer "sigue con las mismas").
export async function GET() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const [{ activo, anterior }, diario] = await Promise.all([
    estadoPase(userId),
    estadoPaseDiario(userId),
  ]);

  // OPECs del pase anterior que aún no están cubiertas por el vigente: son las
  // que el usuario puede recuperar con un clic al renovar.
  const yaCubiertas = new Set(activo?.opecs.map((o) => o.id) ?? []);
  const renovables = (anterior?.opecs ?? []).filter((o) => !yaCubiertas.has(o.id));

  return NextResponse.json({
    cupos: CUPOS_PASE,
    activo: activo
      ? {
          venceAt: activo.venceAt.toISOString(),
          usados: activo.usados,
          disponibles: activo.disponibles,
          opecs: activo.opecs,
        }
      : null,
    anterior: anterior
      ? { venceAt: anterior.venceAt.toISOString(), opecs: anterior.opecs }
      : null,
    renovables,
    diario: diario
      ? {
          opec: diario.opec,
          venceAt: diario.venceAt.toISOString(),
          usado: diario.usado,
          vigente: diario.vigente,
        }
      : null,
  });
}
