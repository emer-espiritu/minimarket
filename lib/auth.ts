import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

export type AuthUser = {
  id: string;
  name: string;
  lastName: string;
  email: string;
  role: "ADMIN" | "USER";
};

export async function getAuthUser(): Promise<AuthUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) return null;

  try {
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as {
      userId: string;
      role: "ADMIN" | "USER";
    };

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        name: true,
        lastName: true,
        email: true,
        role: true,
      },
    });

    if (!user) return null;

    return user;
  } catch {
    return null;
  }
}
