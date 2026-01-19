import ButtonIcon from "@/components/ui/ButtonIcon";
import styles from "../sales/table.module.css";
import Image from "next/image";
import { FaEdit, FaPlus, FaRegEye } from "react-icons/fa";
import Title from "@/components/ui/Title";
import Link from "next/link";
import LinkIcon from "@/components/ui/LinkIcon";
import { getAllProducts } from "@/actions/product-actions";
import DeleteProduct from "@/components/form/DeleteProduct";
import Pagination from "@/components/pagination/Pagination";

const Product = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) => {
  // 👀 Unwrap de Promise
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;

  // Llamada server-side con paginación
  const { products, totalPages } = await getAllProducts(currentPage);
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Title text={"Productos"} />
        <LinkIcon
          icon={FaPlus}
          className={styles.iconCreate}
          href={"/dashboard/products/create"}
        />
      </div>
      <div className={styles.container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Categoria</th>
              <th>Precio venta</th>
              <th>Precio compra</th>
              <th>Stock</th>
              <th>Estado</th>
              <th>Accion</th>
            </tr>
          </thead>

          <tbody>
            {products.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  style={{ textAlign: "center", padding: "1rem" }}
                >
                  No hay productos registradas
                </td>
              </tr>
            ) : (
              products.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className={styles.brand}>
                      <Image
                        src={"/customer.png"}
                        alt={item.name}
                        width={48}
                        height={48}
                        className={styles.avatar}
                      />
                      <div>
                        <div>{item.name}</div>
                        <span>{item.description}</span>
                      </div>
                    </div>
                  </td>
                  <td>{item.category?.name ?? "Sin categoría"}</td>

                  <td>S/ {item.salePrice}</td>
                  <td>S/ {item.purchasePrice}</td>
                  <td>
                    {item.stock === 0 ? (
                      <span className={`${styles.badge} ${styles.outStock}`}>
                        Agotado
                      </span>
                    ) : (
                      item.stock
                    )}
                  </td>

                  <td>
                    <span
                      className={`${styles.badge} ${
                        item.status ? styles.active : styles.inactive
                      }`}
                    >
                      {item.status ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td className={styles.actions}>
                    <Link href={`/dashboard/products/${item.id}`}>
                      <ButtonIcon icon={FaRegEye} className={styles.iconEye} />
                    </Link>

                    <Link href={`/dashboard/products/${item.id}/edit`}>
                      <ButtonIcon icon={FaEdit} className={styles.iconEdit} />
                    </Link>
                    <DeleteProduct id={item.id} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className={styles.pagination}>
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </div>
  );
};

export default Product;
