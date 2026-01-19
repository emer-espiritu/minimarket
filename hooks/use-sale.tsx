import { Product } from "@/app/generated/prisma/client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "@/hooks/use-toast";

export interface SaleItem extends Product {
  quantity: number;
}

interface SaleStore {
  item: SaleItem[];

  addItem: (product: Product, quantity?: number, showToast?: boolean) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string, showToast?: boolean) => void;
  clear: () => void;
  initItems: (items: SaleItem[], overwrite?: boolean) => void;
  total: () => number;
}

export const useSale = create(
  persist<SaleStore>(
    (set, get) => ({
      item: [],

      // 🔹 Agregar producto
      addItem: (product, quantity = 1, showToast = true) => {
        set((state) => {
          const exists = state.item.find((p) => p.id === product.id);

          const newItems = exists
            ? state.item.map((p) =>
                p.id === product.id
                  ? { ...p, quantity: p.quantity + quantity }
                  : p
              )
            : [...state.item, { ...product, quantity }];

          if (showToast) {
            toast({
              title: exists ? "Cantidad actualizada" : "Producto agregado",
              message: `${product.name}${exists ? ` (+${quantity})` : ""}`,
              variant: "success",
            });
          }

          return { item: newItems };
        });
      },

      // 🔹 Actualizar cantidad
      updateQuantity: (id, quantity) => {
        set((state) => ({
          item: state.item.map((p) => (p.id === id ? { ...p, quantity } : p)),
        }));
      },

      // 🔹 Eliminar producto
      removeItem: (id, showToast = true) => {
        const removed = get().item.find((p) => p.id === id);

        set((state) => ({
          item: state.item.filter((p) => p.id !== id),
        }));

        if (removed && showToast) {
          toast({
            title: "Producto eliminado",
            message: removed.name,
            variant: "danger",
          });
        }
      },

      // 🔹 Limpiar carrito (Zustand se encarga del storage)
      clear: () => set({ item: [] }),

      // 🔹 Inicializar items (editar venta)
      initItems: (items, overwrite = true) => {
        set((state) => ({
          item: overwrite ? items : [...state.item, ...items],
        }));
      },

      // 🔹 Total
      total: () =>
        get().item.reduce((acc, p) => acc + p.salePrice * p.quantity, 0),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
