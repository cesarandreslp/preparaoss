import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "./prisma";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function authorizeCredentials(credentials: unknown) {
  const parsed = credentialsSchema.safeParse(credentials);
  if (!parsed.success) return null;

  const { email, password } = parsed.data;
  const user = await prisma.userProfile.findUnique({
    where: { email: email.toLowerCase() },
    select: { id: true, email: true, nombre: true, passwordHash: true, rol: true },
  });
  if (!user) return null;

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return null;

  return { id: user.id, email: user.email, nombre: user.nombre, rol: user.rol };
}
