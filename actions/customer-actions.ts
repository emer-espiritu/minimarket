"use server";

import prisma from "@/lib/prisma";
import { CustomerSchema } from "@/models";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { parse } from "valibot";

const ITEMS_PER_PAGE = 4;
export const getAllCustomers = async (page: number = 1) => {
  try {
    const skip = (page - 1) * ITEMS_PER_PAGE;
    const [customers, total] = await Promise.all([
      prisma.customer.findMany({
        skip,
        take: ITEMS_PER_PAGE,
        include: {
          sales: {
            select: {
              id: true,
              createdAt: true,
            },
            orderBy: {
              createdAt: "desc",
            },
            take: 1, // 👈 solo la última venta
          },
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.customer.count(),
    ]);
    return {
      customers, // Productos de la página actual
      totalPages: Math.ceil(total / ITEMS_PER_PAGE), // Número total de páginas
      currentPage: page, // Página actual
    };
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw new Error("No se pudieron obtener los clientes");
  }
};

export const getCustomerId = async (id: string) => {
  try {
    const customerId = await prisma.customer.findUnique({
      where: { id },
    });
    return customerId;
  } catch (error) {
    console.error("Error fetching customerId:", error);
    throw new Error("No se pudo obtener el cliente");
  }
};

export const createCustomer = async (formData: FormData) => {
  try {
    const customerData = {
      name: formData.get("name"),
      lastName: formData.get("lastName"),
      ruc: formData.get("ruc"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      address: formData.get("address"),
      status: formData.get("status") === "true",
    };

    const data = parse(CustomerSchema, customerData);

    await prisma.customer.create({
      data: {
        name: data.name,
        lastName: data.lastName,
        ruc: data.ruc,
        phone: data.phone,
        email: data.email,
        address: data.address,
        status: data.status,
      },
    });
  } catch (error) {
    console.error("Error create customer:", error);
    //throw new Error("No se pudo crear el cliente");
    throw error;
  }
  redirect("/dashboard/customers");
};

export const updateCustomer = async (formData: FormData) => {
  try {
    const id = formData.get("id")?.toString();
    if (!id) {
      throw new Error("ID del cliente no proporcionado");
    }
    const customerData = {
      name: formData.get("name"),
      lastName: formData.get("lastName"),
      ruc: formData.get("ruc"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      address: formData.get("address"),
      status: formData.get("status") === "true",
    };
    const data = parse(CustomerSchema, customerData);
    await prisma.customer.update({
      where: { id },
      data: {
        name: data.name,
        lastName: data.lastName,
        ruc: data.ruc,
        phone: data.phone,
        email: data.email,
        address: data.address,
        status: data.status,
      },
    });
  } catch (error) {
    console.error("Error update customer:", error);
    throw new Error("No se pudo actualizar el cliente");
  }
  redirect("/dashboard/customers");
};

export const deleteCustomer = async (formData: FormData) => {
  const id = formData.get("id") as string;

  await prisma.customer.delete({
    where: { id },
  });
  revalidatePath("/dashboard/customers");
};
