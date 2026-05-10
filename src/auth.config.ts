import type { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const user = auth?.user;
      const isLoggedIn = !!user;
      const isAdmin = user?.rol === "ADMIN";
      const path = nextUrl.pathname;

      const isPublicRoute =
        path === "/" ||
        path.startsWith("/login") ||
        path.startsWith("/registro") ||
        path.startsWith("/biblioteca") ||
        path.startsWith("/concursos-en-desarrollo") ||
        path.startsWith("/concursos-especiales") ||
        path.startsWith("/api/auth") ||
        path.startsWith("/api/cron") ||
        path.startsWith("/api/concursos-en-desarrollo") ||
        path.startsWith("/api/concurso-poster");

      // Rutas que requieren rol ADMIN explícito
      const isAdminRoute =
        path.startsWith("/admin") || path.startsWith("/api/admin");

      const isUserRoute =
        path.startsWith("/dashboard") ||
        path.startsWith("/opecs") ||
        path.startsWith("/perfil") ||
        path.startsWith("/ranking") ||
        path.startsWith("/suscripcion") ||
        path.startsWith("/api/simulacros") ||
        path.startsWith("/api/opecs") ||
        path.startsWith("/api/ranking") ||
        path.startsWith("/api/usuarios");

      if (isPublicRoute) return true;

      if (isAdminRoute) {
        if (!isLoggedIn) return false; // redirige a /login
        if (!isAdmin) {
          // Logged-in pero no ADMIN → para API devolvemos 403 JSON,
          // para páginas redirigimos al dashboard.
          if (path.startsWith("/api/")) {
            return NextResponse.json(
              { error: "Requiere rol ADMIN" },
              { status: 403 }
            );
          }
          return NextResponse.redirect(new URL("/dashboard", nextUrl));
        }
        return true;
      }

      if (isUserRoute) return isLoggedIn;
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.nombre = (user as { nombre?: string }).nombre ?? "";
        token.rol = (user as { rol?: "USUARIO" | "ADMIN" }).rol ?? "USUARIO";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.nombre = token.nombre as string;
        session.user.rol = (token.rol as "USUARIO" | "ADMIN") ?? "USUARIO";
      }
      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
