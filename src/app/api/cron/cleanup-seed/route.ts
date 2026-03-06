/**
 * POST /api/admin/cleanup-seed?secret=preparaoss-cron-secret-2026
 * Elimina los OPECs falsos insertados por el seed (simoId = CNSC-2025-xxx)
 */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const result = await prisma.opec.deleteMany({
    where: {
      simoId: {
        startsWith: "CNSC-2025-",
      },
    },
  });

  return NextResponse.json({ ok: true, eliminados: result.count });
}
