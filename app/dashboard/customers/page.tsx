import Image from "next/image";
import styles from "../sales/table.module.css";
import ButtonIcon from "@/components/ui/ButtonIcon";
import { FaEdit, FaPlus, FaRegEye } from "react-icons/fa";
import Title from "@/components/ui/Title";
import { getAllCustomers } from "@/actions/customer-actions";
import LinkIcon from "@/components/ui/LinkIcon";
import Link from "next/link";
import DeleteCustomer from "@/components/form/DeleteCustomer";
import Pagination from "@/components/pagination/Pagination";

const Customers = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) => {
  // 👀 Unwrap de Promise
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;

  // Llamada server-side con paginación
  const { customers, totalPages } = await getAllCustomers(currentPage);
  //const customers = await getAllCustomers();
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Title text={"Clientes"} />
        <LinkIcon
          icon={FaPlus}
          className={styles.iconCreate}
          href={"/dashboard/customers/create"}
        />
      </div>
      <div className={styles.container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Datos Cliente</th>
              <th>Telefono</th>
              <th>Dni</th>
              <th>Fecha Registro</th>
              <th>Ultimo Movimiento</th>
              <th>Estado</th>
              <th>Accion</th>
            </tr>
          </thead>

          <tbody>
            {customers.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  style={{ textAlign: "center", padding: "1rem" }}
                >
                  No hay clientes registradas
                </td>
              </tr>
            ) : (
              customers.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className={styles.brand}>
                      <Image
                        src="/customer.png"
                        alt={item.name}
                        width={48}
                        height={48}
                        className={styles.avatar}
                      />
                      <div>
                        <div>
                          {item.name} {item.lastName}
                        </div>
                        <span>{item.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>+51 {item.phone}</td>
                  <td>{item.ruc}</td>
                  <td>
                    {" "}
                    {new Date(item.createdAt).toLocaleDateString("es-PE")}
                  </td>
                  <td>
                    {item.sales.length > 0
                      ? new Date(item.sales[0].createdAt).toLocaleDateString(
                          "es-PE"
                        )
                      : "No tienes Movimientos"}
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
                    <Link href={`/dashboard/customers/${item.id}`}>
                      <ButtonIcon icon={FaRegEye} className={styles.iconEye} />
                    </Link>
                    <Link href={`/dashboard/customers/${item.id}/edit`}>
                      <ButtonIcon icon={FaEdit} className={styles.iconEdit} />
                    </Link>
                    <DeleteCustomer id={item.id} />
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

export default Customers;
