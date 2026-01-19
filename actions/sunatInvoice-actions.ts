"use server";

import { SunatInvoice } from "@/app/generated/prisma/client";
import prisma from "@/lib/prisma";
import { InputSunatInvoice } from "@/models";

export const getAllSunatInvoice = async (): Promise<SunatInvoice[]> => {
  try {
    const sunatInvoice = await prisma.sunatInvoice.findMany({
      include: {
        sale: {
          select: {
            id: true,
          },
        },
      },
    });
    return sunatInvoice;
  } catch (error) {
    console.error("Error fetching SunatInvoices:", error);
    throw new Error("No se pudieron obtener los Facturas de Sunat");
  }
};

export const getSunatInvoiceId = async (
  id: string
): Promise<SunatInvoice | null> => {
  try {
    const sunatInvoiceId = await prisma.sunatInvoice.findUnique({
      where: { id },
    });
    return sunatInvoiceId;
  } catch (error) {
    console.error("Error fetching SunatInvoiceId:", error);
    throw new Error("No se pudo obtener los Factura de Sunat");
  }
};

export const createSunatInvoice = async (
  data: InputSunatInvoice
): Promise<SunatInvoice> => {
  try {
    const sunatInvoiceData = {
      ...data,
    };
    return await prisma.sunatInvoice.create({
      data: sunatInvoiceData,
    });
  } catch (error) {
    console.error("Error create SunatInvoice:", error);
    throw new Error("No se pudo crear la Factura de Sunat");
  }
};

export const updateSunatInvoice = async (
  id: string,
  data: InputSunatInvoice
): Promise<SunatInvoice> => {
  try {
    const sunatInvoiceData = {
      ...data,
    };
    return await prisma.sunatInvoice.update({
      where: { id },
      data: sunatInvoiceData,
    });
  } catch (error) {
    console.error("Error update SunatInvoice:", error);
    throw new Error("No se pudo actualizar la Factura de Sunat");
  }
};

export const deleteSunatInvoice = async (id: string): Promise<boolean> => {
  try {
    await prisma.sunatInvoice.delete({
      where: { id },
    });
    return true;
  } catch (error) {
    console.error("Error delete SunatInvoice:", error);
    throw new Error("No se pudo eliminar la Factura de Sunat");
  }
};
