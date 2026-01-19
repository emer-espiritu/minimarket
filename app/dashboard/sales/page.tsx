import ButtonIcon from "@/components/ui/ButtonIcon";
import styles from "./table.module.css";
import Image from "next/image";
import { FaEdit, FaPlus, FaRegEye } from "react-icons/fa";
import Title from "@/components/ui/Title";
import LinkIcon from "@/components/ui/LinkIcon";
import { getAllSale } from "@/actions/sale-actions";
import Link from "next/link";
import DeleteSale from "@/components/form/DeleteSale";
import Pagination from "@/components/pagination/Pagination";

const Sales = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) => {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;

  // Llamada server-side con paginación
  const { sales, totalPages } = await getAllSale(currentPage);
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Title text={"Ventas"} />
        <LinkIcon
          icon={FaPlus}
          className={styles.iconCreate}
          href={"/dashboard/sales/create"}
        />
      </div>
      <div className={styles.container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Factura</th>
              <th>Usuario</th>
              <th>Fecha</th>
              <th>Cantidad</th>
              <th>Status</th>
              <th>Accion</th>
            </tr>
          </thead>

          <tbody>
            {sales.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  style={{ textAlign: "center", padding: "1rem" }}
                >
                  No hay ventas registradas
                </td>
              </tr>
            ) : (
              sales.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className={styles.brand}>
                      <Image
                        src="/customer.png"
                        alt={item.documentType}
                        width={48}
                        height={48}
                        className={styles.avatar}
                      />
                      <div>
                        <div>{item.documentNumber}</div>
                        <span>
                          {item.customer?.name} {item.customer?.lastName}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    {item.user?.name} {item.user?.lastName}
                  </td>
                  <td>
                    {" "}
                    {new Date(item.createdAt).toLocaleDateString("es-PE")}
                  </td>
                  <td className={styles.price}>{item.saleTotal}</td>
                  <td>
                    <span
                      className={`${styles.badge} ${
                        item.status ? styles.active : styles.inactive
                      }`}
                    >
                      {item.status ? "PENDING" : "PAID"}
                    </span>
                  </td>
                  <td className={styles.actions}>
                    <Link href={`/dashboard/sales/${item.id}`}>
                      <ButtonIcon icon={FaRegEye} className={styles.iconEye} />
                    </Link>
                    <Link href={`/dashboard/sales/${item.id}/edit`}>
                      <ButtonIcon icon={FaEdit} className={styles.iconEdit} />
                    </Link>

                    <DeleteSale id={item.id} />
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

export default Sales;
