import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const path = nextUrl.pathname;

      const isPublicRoute =
        path === "/" ||
        path.startsWith("/login") ||
        path.startsWith("/registro") ||
        path.startsWith("/api/auth") ||
        path.startsWith("/api/cron");

      const isProtectedRoute =
        path.startsWith("/dashboard") ||
        path.startsWith("/opecs") ||
        path.startsWith("/perfil") ||
        path.startsWith("/ranking") ||
        path.startsWith("/suscripcion") ||
        path.startsWith("/admin") ||
        path.startsWith("/api/simulacros") ||
        path.startsWith("/api/opecs") ||
        path.startsWith("/api/ranking") ||
        path.startsWith("/api/usuarios") ||
        path.startsWith("/api/admin");

      if (isPublicRoute) return true;
      if (isProtectedRoute) return isLoggedIn;
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.nombre = (user as { nombre?: string }).nombre;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.nombre = token.nombre as string;
      }
      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
