"use server";
import prisma from "@/lib/prisma";
import { ProductSchema } from "@/models";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { parse } from "valibot";

const ITEMS_PER_PAGE = 4; // Número de productos por página

export const getAllProducts = async (page: number = 1) => {
  try {
    const skip = (page - 1) * ITEMS_PER_PAGE;

    // Obtener productos y total de productos al mismo tiempo
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        skip,
        take: ITEMS_PER_PAGE,
        include: {
          category: { select: { name: true } },
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.product.count(),
    ]);

    return {
      products, // Productos de la página actual
      totalPages: Math.ceil(total / ITEMS_PER_PAGE), // Número total de páginas
      currentPage: page, // Página actual
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("No se pudieron obtener los productos");
  }
};

export const getProductId = async (id: string) => {
  try {
    const productId = await prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return productId;
  } catch (error) {
    console.error("Error fetching productId:", error);
    throw new Error("No se pudieron obtener el producto");
  }
};

export const createProduct = async (formData: FormData) => {
  try {
    const productData = {
      name: formData.get("name"),
      description: formData.get("description"),
      purchasePrice: formData.get("purchasePrice"),
      salePrice: formData.get("salePrice"),
      stock: Number(formData.get("stock")),
      unitMeasure: formData.get("unitMeasure"),
      status: formData.get("status") === "true",
      categoryId: formData.getAll("categoryId") as string[],
    };
    const data = parse(ProductSchema, productData);
    // 🔹 Crear producto
    await prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        purchasePrice: parseFloat(data.purchasePrice),
        salePrice: parseFloat(data.salePrice),
        stock: data.stock,
        unitMeasure: data.unitMeasure,
        status: data.status,
        categoryId: data.categoryId.join(","),
      },
    });
    //revalidatePath("/dashboard/products");
  } catch (error) {
    console.error("Error create Product", error);
    throw new Error("No se pudo crear el producto");
    //throw error;
  }
  redirect("/dashboard/products");
};

export const updateProduct = async (formData: FormData) => {
  try {
    const id = formData.get("id")?.toString();
    if (!id) {
      throw new Error("ID del producto no proporcionado");
    }
    const productData = {
      name: formData.get("name"),
      description: formData.get("description"),
      purchasePrice: formData.get("purchasePrice"),
      salePrice: formData.get("salePrice"),
      stock: Number(formData.get("stock")),
      unitMeasure: formData.get("unitMeasure"),
      status: formData.get("status") === "true",
      categoryId: formData.getAll("categoryId") as string[],
    };
    const data = parse(ProductSchema, productData);
    await prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        purchasePrice: parseFloat(data.purchasePrice),
        salePrice: parseFloat(data.salePrice),
        stock: data.stock,
        unitMeasure: data.unitMeasure,
        status: data.status,
        categoryId: data.categoryId.join(","),
      },
    });
  } catch (error) {
    console.error("Error update Product", error);
    throw new Error("No se pudo actualizar el producto");
  }
  redirect("/dashboard/products");
};

export const deleteProduct = async (formData: FormData) => {
  const id = formData.get("id") as string;
  await prisma.product.delete({
    where: { id },
  });
  revalidatePath("/dashboard/categories");
};
