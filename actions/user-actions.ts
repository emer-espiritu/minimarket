"use server";
import { createAccessToken, createRefreshToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import { compare, hash } from "bcrypt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const createUser = async (formData: FormData) => {
  const userData = {
    name: formData.get("name") as string,
    lastName: formData.get("lastName") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    dni: formData.get("dni") as string,
    phone: formData.get("phone") as string,
    address: (formData.get("address") as string) ?? null,
    role: "USER" as const,
  };

  const hashedPassword = await hash(userData.password, 10);

  await prisma.user.create({
    data: {
      ...userData,
      password: hashedPassword,
    },
  });

  redirect("/signin");
};

export type AuthState = {
  error: string | null;
};

export const authUser = async (
  state: AuthState,
  formData: FormData
): Promise<AuthState> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !user.status) {
    return {
      error: "Usuario no válido",
    };
    //throw new Error("Usuario no válido");
  }

  const valid = await compare(password, user.password);

  if (!valid) {
    return {
      error: "Credenciales incorrectas",
    };
    //throw new Error("Credenciales incorrectas");
  }

  const accessToken = createAccessToken({
    userId: user.id,
    role: user.role,
  });

  const refreshToken = createRefreshToken({
    userId: user.id,
  });

  // guardar refresh token en DB
  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken },
  });

  const cookieStore = await cookies();

  cookieStore.set("access_token", accessToken, {
    httpOnly: true,
    secure: true,
    path: "/",
    maxAge: 60 * 15,
  });

  cookieStore.set("refresh_token", refreshToken, {
    httpOnly: true,
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect("/dashboard");
};

export const logoutUser = async () => {
  const cookieStore = await cookies();

  cookieStore.delete("access_token");
  cookieStore.delete("refresh_token");
  redirect("/signin");
};

export const getUserId = async (id: string) => {
  try {
    const userId = await prisma.user.findUnique({
      where: { id },
    });
    return userId;
  } catch (error) {
    console.error("Error fetching customerId:", error);
    throw new Error("No se pudo obtener el cliente");
  }
};
