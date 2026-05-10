import "next-auth";
import type { Rol } from "@prisma/client";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    nombre: string;
    rol: Rol;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      nombre: string;
      rol: Rol;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    nombre: string;
    rol: Rol;
  }
}
