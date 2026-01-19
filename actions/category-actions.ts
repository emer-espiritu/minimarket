"use server";

import { Category } from "@/app/generated/prisma/client";
import prisma from "@/lib/prisma";
import { CategorySchema } from "@/models";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { parse } from "valibot";

const ITEMS_PER_PAGE = 4;
export const getAllCategory = async (page: number = 1) => {
  try {
    const skip = (page - 1) * ITEMS_PER_PAGE;

    // Obtener productos y total de productos al mismo tiempo
    const [categories, total] = await Promise.all([
      await prisma.category.findMany({
        skip,
        take: ITEMS_PER_PAGE,
        orderBy: { createdAt: "desc" },
      }),
      prisma.category.count(),
    ]);
    return {
      categories,
      totalPages: Math.ceil(total / ITEMS_PER_PAGE), // Número total de páginas
      currentPage: page,
    };
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("No se pudieron obtener las categorias");
  }
};

export const getCategoryId = async (id: string): Promise<Category | null> => {
  try {
    const categoryId = await prisma.category.findUnique({
      where: { id },
    });
    return categoryId;
  } catch (error) {
    console.error("Error fetching categoryId:", error);
    throw new Error("No se pudo obtener la categoria");
  }
};

export const createCategory = async (formData: FormData) => {
  try {
    const categoryData = {
      name: formData.get("name")?.toString(),
      description: formData.get("description")?.toString() || null,
      status: formData.get("status") === "true",
    };
    const data = parse(CategorySchema, categoryData);

    // Creamos la categoría en la base de datos
    await prisma.category.create({
      data: {
        name: data.name,
        description: data.description ?? null,
        status: data.status,
      },
    });
  } catch (error) {
    console.error("Error create category:", error);
    throw new Error("No se pudo crear la categoria");
    //throw error;
  }
  redirect("/dashboard/categories");
};

export const updateCategorie = async (formData: FormData) => {
  try {
    const id = formData.get("id")?.toString();
    if (!id) {
      throw new Error("ID de categoría no proporcionado");
    }

    const categoryData = {
      name: formData.get("name")?.toString(),
      description: formData.get("description")?.toString() || null,
      status: formData.get("status") === "true",
    };
    const data = parse(CategorySchema, categoryData);

    await prisma.category.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        status: data.status,
      },
    });
  } catch (error) {
    console.error("Error update category:", error);
    throw new Error("No se pudo actualizar la categoria");
  }
  redirect("/dashboard/categories");
};

export const deleteCategory = async (formData: FormData) => {
  const id = formData.get("id") as string;

  await prisma.category.delete({
    where: { id },
  });
  revalidatePath("/dashboard/categories");
};
