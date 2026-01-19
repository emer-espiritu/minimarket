"use server";

import { InventoryMovement } from "@/app/generated/prisma/client";
import prisma from "@/lib/prisma";
import { InputInventoryMovement } from "@/models";

export const getAllInventoryMovement = async (): Promise<
  InventoryMovement[]
> => {
  try {
    const inventoryMovement = await prisma.inventoryMovement.findMany({
      include: {
        user: {
          select: {
            name: true,
            lastName: true,
          },
        },
        product: {
          select: {
            name: true,
          },
        },
      },
    });
    return inventoryMovement;
  } catch (error) {
    console.error("Error fetching InventoryMovement:", error);
    throw new Error("No se pudieron obtener los inventarios");
  }
};

export const getInventoryMovementId = async (
  id: string
): Promise<InventoryMovement | null> => {
  try {
    const inventoryMovementId = await prisma.inventoryMovement.findUnique({
      where: { id },
    });
    return inventoryMovementId;
  } catch (error) {
    console.error("Error fetching InventoryMovementId:", error);
    throw new Error("No se pudo obtener el inventario");
  }
};

export const createInventoryMovement = async (
  data: InputInventoryMovement
): Promise<InventoryMovement> => {
  try {
    const inventoryMovementData = {
      ...data,
    };
    return await prisma.inventoryMovement.create({
      data: inventoryMovementData,
    });
  } catch (error) {
    console.error("Error create InventoryMovement:", error);
    throw new Error("No se pudo crear el inventario");
  }
};

export const updateInventoryMovement = async (
  id: string,
  data: InputInventoryMovement
): Promise<InventoryMovement | null> => {
  try {
    const inventoryMovementData = {
      ...data,
    };
    return await prisma.inventoryMovement.update({
      where: { id },
      data: inventoryMovementData,
    });
  } catch (error) {
    console.error("Error update InventoryMovement:", error);
    throw new Error("No se pudo actualizar el inventario");
  }
};

export const deleteInventoryMovement = async (id: string): Promise<boolean> => {
  try {
    await prisma.inventoryMovement.delete({
      where: { id },
    });
    return true;
  } catch (error) {
    console.error("Error delete InventoryMovement:", error);
    throw new Error("No se pudo eliminar el inventario");
  }
};
