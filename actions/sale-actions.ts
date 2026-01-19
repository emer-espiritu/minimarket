"use server";

import { StatusSale } from "@/app/generated/prisma/client";
import prisma from "@/lib/prisma";
import { SaleSchema } from "@/models";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { parse } from "valibot";

const ITEMS_PER_PAGE = 4;

export const getAllSale = async (page: number = 1) => {
  try {
    const skip = (page - 1) * ITEMS_PER_PAGE;

    const [sales, total] = await Promise.all([
      await prisma.sale.findMany({
        skip,
        take: ITEMS_PER_PAGE,
        include: {
          user: {
            select: {
              name: true,
              lastName: true,
            },
          },
          customer: {
            select: {
              name: true,
              lastName: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.sale.count(),
    ]);
    return {
      sales,
      totalPages: Math.ceil(total / ITEMS_PER_PAGE), // Número total de páginas
      currentPage: page,
    };
  } catch (error) {
    console.error("Error fetching sales:", error);
    throw new Error("No se pudieron obtener las ventas");
  }
};

export const getSaleId = async (id: string) => {
  try {
    const saleId = await prisma.sale.findUnique({
      where: { id },
      include: {
        detail: {
          include: {
            product: {
              select: {
                name: true,
              },
            },
          },
        },
        customer: true,
        user: true,
      },
    });
    return saleId;
  } catch (error) {
    console.error("Error fetching saleId:", error);
    throw new Error("No se pudo obtener la venta");
  }
};

export const createSales = async (formData: FormData) => {
  try {
    const paymentMethodRaw = formData.get("paymentMethod");
    const documentTypeRaw = formData.get("documentType");
    const userIdRaw = formData.get("userId");
    const customerIdRaw = formData.get("customerId");
    const detailRaw = formData.get("detail");

    const rawData = {
      paymentMethod: paymentMethodRaw as string,
      documentType: documentTypeRaw as string,
      userId: userIdRaw === null ? undefined : (userIdRaw as string),
      customerId:
        customerIdRaw === null ? undefined : (customerIdRaw as string),
      detail: detailRaw ? JSON.parse(detailRaw as string) : [], // ✅ detail
    };

    // ✅ Validación con schema
    const parsed = parse(SaleSchema, rawData);

    // 🔹 Transacción con Prisma
    await prisma.$transaction(async (tx) => {
      // 1️⃣ VALIDAR STOCK
      for (const item of parsed.detail) {
        const product = await tx.product.findUnique({
          where: { id: item.productId },
          select: { stock: true },
        });

        if (!product || product.stock < Number(item.quantity)) {
          throw new Error("Stock insuficiente");
        }
      }

      // 2️⃣ DESCONTAR STOCK
      for (const item of parsed.detail) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              decrement: Number(item.quantity),
            },
          },
        });
      }

      const details = parsed.detail.map((item) => ({
        productId: item.productId,
        quantity: Number(item.quantity), // convertir a number
        price: parseFloat(item.price), // convertir a float
        subtotal: Number(item.quantity) * parseFloat(item.price),
      }));

      const saleTotal = details.reduce((acc, item) => acc + item.subtotal, 0);

      // 🔹 Serie de documentos
      let series = await tx.documentSeries.findUnique({
        where: { documentType: parsed.documentType },
      });

      if (!series) {
        series = await tx.documentSeries.create({
          data: {
            documentType: parsed.documentType,
            prefix: parsed.documentType === "FACTURA" ? "F001" : "B001",
            lastNumber: 0,
          },
        });
      }

      const next = series.lastNumber + 1;

      await tx.documentSeries.update({
        where: { id: series.id },
        data: { lastNumber: next },
      });

      const documentNumber = `${series.prefix}-${String(next).padStart(
        8,
        "0"
      )}`;

      // 🔹 Crear venta
      await tx.sale.create({
        data: {
          documentType: parsed.documentType,
          documentNumber,
          paymentMethod: parsed.paymentMethod,
          userId: parsed.userId ?? null,
          customerId: parsed.customerId ?? null,
          saleTotal,
          status: StatusSale.PENDING,
          detail: {
            create: details,
          },
        },
      });
    });
  } catch (error) {
    console.error("❌ Error createSales:", error);
    throw new Error("No se pudo registrar la venta");
    //throw error;
  }
  redirect("/dashboard/sales");
};

export const updateSale = async (formData: FormData) => {
  try {
    const saleId = formData.get("saleId")?.toString();
    if (!saleId) throw new Error("ID de la venta no proporcionado");

    const paymentMethodRaw = formData.get("paymentMethod");
    const documentTypeRaw = formData.get("documentType");
    const customerIdRaw = formData.get("customerId");
    const detailRaw = formData.get("detail");

    if (!detailRaw)
      throw new Error("No se proporcionaron productos para la venta");

    const rawData = {
      paymentMethod: paymentMethodRaw as string,
      documentType: documentTypeRaw as string,
      customerId:
        customerIdRaw === null ? undefined : (customerIdRaw as string),
      detail: JSON.parse(detailRaw as string),
    };

    const parsed = parse(SaleSchema, rawData);

    // 🔹 Usamos transacción para mantener consistencia
    await prisma.$transaction(async (tx) => {
      const existingSale = await tx.sale.findUnique({
        where: { id: saleId },
        include: {
          detail: true,
        },
      });

      if (!existingSale) throw new Error("La venta no existe");

      // 1️⃣ DEVOLVER STOCK ANTERIOR
      for (const item of existingSale.detail) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              increment: item.quantity,
            },
          },
        });
      }

      // 2️⃣ VALIDAR NUEVO STOCK
      for (const item of parsed.detail) {
        const product = await tx.product.findUnique({
          where: { id: item.productId },
          select: { stock: true },
        });

        if (!product || product.stock < Number(item.quantity)) {
          throw new Error("Stock insuficiente");
        }
      }

      // 3️⃣ DESCONTAR NUEVO STOCK
      for (const item of parsed.detail) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              decrement: Number(item.quantity),
            },
          },
        });
      }
      // 🔹 Borrar detalles anteriores
      await tx.detailSale.deleteMany({
        where: { saleId },
      });

      // 🔹 Crear nuevos detalles
      const details = parsed.detail.map((item) => {
        const quantity = Number(item.quantity);
        const price = parseFloat(item.price);
        return {
          saleId,
          productId: item.productId,
          quantity,
          price,
          subtotal: quantity * price,
        };
      });

      await tx.detailSale.createMany({ data: details });

      // 🔹 Actualizar total de la venta
      const saleTotal = details.reduce((acc, item) => acc + item.subtotal, 0);

      await tx.sale.update({
        where: { id: saleId },
        data: {
          paymentMethod: parsed.paymentMethod,
          documentType: parsed.documentType,
          customerId: parsed.customerId ?? null,
          saleTotal,
        },
      });
    });
  } catch (error) {
    console.error("❌ Error updateSale:", error);
    throw new Error("No se pudo actualizar la venta");
  }

  redirect("/dashboard/sales");
};

export const deleteSale = async (formData: FormData) => {
  const id = formData.get("id") as string;

  if (!id) throw new Error("ID no proporcionado");

  await prisma.$transaction(async (tx) => {
    // 1️⃣ borrar detalles
    await tx.detailSale.deleteMany({
      where: { saleId: id },
    });

    // 2️⃣ borrar venta
    await tx.sale.delete({
      where: { id },
    });
  });

  revalidatePath("/dashboard/sales");
};

////
