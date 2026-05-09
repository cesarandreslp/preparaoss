import { ImageResponse } from "next/og";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const W = 1200;
const H = 630;

const COLORS = {
  bg: "#FFFFFF",
  bg2: "#FFFCEF",
  ink: "#0A0A0A",
  inkSoft: "#3F3A35",
  muted: "#7A736B",
  accent: "#003893",
  accent2: "#CE1126",
};

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const concurso = await prisma.concursoEnDesarrollo.findUnique({
    where: { slug },
    select: { nombreScraped: true, nombreOverride: true },
  });

  const titulo = concurso
    ? (concurso.nombreOverride ?? concurso.nombreScraped)
    : slug.replace(/-/g, " ").toUpperCase();

  const titleSize = titulo.length > 80 ? 60 : titulo.length > 50 ? 76 : 96;

  return new ImageResponse(
    (
      <div
        style={{
          width: W,
          height: H,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: `linear-gradient(135deg, ${COLORS.bg} 0%, ${COLORS.bg2} 100%)`,
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Decorative shapes */}
        <div
          style={{
            position: "absolute",
            top: -180,
            right: -180,
            width: 480,
            height: 480,
            borderRadius: 9999,
            background: `radial-gradient(circle, ${COLORS.accent} 0%, transparent 70%)`,
            opacity: 0.18,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -240,
            left: -120,
            width: 520,
            height: 520,
            borderRadius: 9999,
            background: `radial-gradient(circle, ${COLORS.accent2} 0%, transparent 70%)`,
            opacity: 0.14,
            display: "flex",
          }}
        />

        {/* Top: eyebrow */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: COLORS.accent,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FFFFFF",
              fontSize: 28,
              fontWeight: 800,
              letterSpacing: -1,
            }}
          >
            P
          </div>
          <div
            style={{
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: COLORS.accent,
              display: "flex",
            }}
          >
            Convocatoria · CNSC
          </div>
        </div>

        {/* Center: title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            maxWidth: 1000,
          }}
        >
          <div
            style={{
              fontSize: titleSize,
              lineHeight: 1.0,
              fontWeight: 800,
              letterSpacing: -3,
              color: COLORS.ink,
              display: "flex",
            }}
          >
            {titulo}
          </div>
        </div>

        {/* Bottom: divider + footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: `2px solid ${COLORS.ink}`,
            paddingTop: 24,
          }}
        >
          <div
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: COLORS.inkSoft,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span>En desarrollo</span>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: 9999,
                background: COLORS.accent,
              }}
            />
            <span>Inscripciones abiertas</span>
          </div>
          <div
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: COLORS.ink,
              letterSpacing: -0.5,
              display: "flex",
            }}
          >
            preparaoss.com
          </div>
        </div>
      </div>
    ),
    {
      width: W,
      height: H,
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
      },
    }
  );
}
