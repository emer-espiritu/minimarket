"use client";

import { useEffect } from "react";
import { SaleItem, useSale } from "@/hooks/use-sale";
import { useSearch } from "@/hooks/use-search";
import styles from "@/app/dashboard/sales/create/create.module.css";
import { DetailSale, Product } from "@/app/generated/prisma/client";
import ButtonIcon from "../ui/ButtonIcon";
import { FaSave } from "react-icons/fa";
import Quantity from "../ui/Quantity";
import { MdDelete } from "react-icons/md";

interface ItemSaleProps {
  products: Product[];
  detailProduct: DetailSale[];
}

const ItemSale = ({ products, detailProduct }: ItemSaleProps) => {
  const { query } = useSearch();
  const { item, addItem, removeItem, updateQuantity, initItems, clear, total } =
    useSale();

  // ✅ Inicializar carrito SOLO al editar
  useEffect(() => {
    if (detailProduct.length > 0) {
      const initialItems: SaleItem[] = detailProduct
        .map((d) => {
          const prod = products.find((p) => p.id === d.productId);
          if (!prod) return null;
          return { ...prod, quantity: d.quantity };
        })
        .filter(Boolean) as SaleItem[];

      initItems(initialItems, true);
    }
  }, [detailProduct, products, initItems]);

  // ✅ Limpiar carrito al salir de la ruta
  useEffect(() => {
    return () => {
      clear();
    };
  }, [clear]);

  // 🔍 Buscar productos
  const filteredProducts =
    query.trim() === ""
      ? []
      : products.filter((p) =>
          p.name.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <>
      {/* 👇 datos para el backend */}
      <input
        type="hidden"
        name="detail"
        value={JSON.stringify(
          item.map((p) => ({
            productId: p.id,
            quantity: p.quantity,
            price: String(p.salePrice),
          }))
        )}
      />

      {/* BUSCADOR */}
      <div className={styles.container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Precio</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.salePrice}</td>
                <td>
                  <ButtonIcon
                    icon={FaSave}
                    type="button"
                    onClick={() => addItem(product)}
                    className={styles.iconCreate}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CARRITO */}
      <div className={styles.container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {item.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.salePrice}</td>
                <td>
                  <Quantity
                    value={product.quantity}
                    min={1}
                    onChange={(qty) => updateQuantity(product.id, qty)}
                  />
                </td>
                <td>{product.salePrice * product.quantity}</td>
                <td>
                  <ButtonIcon
                    icon={MdDelete}
                    type="button"
                    onClick={() => removeItem(product.id)}
                    className={styles.iconDelete}
                  />
                </td>
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr>
              <td colSpan={3}>Total a pagar:</td>
              <td>{total()}</td>
              <td />
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default ItemSale;
