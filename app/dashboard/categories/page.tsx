import { FaEdit, FaPlus, FaRegEye } from "react-icons/fa";
import Image from "next/image";
import styles from "../sales/table.module.css";
import Title from "@/components/ui/Title";
import ButtonIcon from "@/components/ui/ButtonIcon";
import LinkIcon from "@/components/ui/LinkIcon";
import { getAllCategory } from "@/actions/category-actions";
import Link from "next/link";
import DeleteCategory from "@/components/form/DeleteCategory";
import Pagination from "@/components/pagination/Pagination";

const Categories = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) => {
  // 👀 Unwrap de Promise
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;

  // Llamada server-side con paginación
  const { categories, totalPages } = await getAllCategory(currentPage);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Title text={"Categorias"} />
        <LinkIcon
          icon={FaPlus}
          className={styles.iconCreate}
          href={"/dashboard/categories/create"}
        />
      </div>
      <div className={styles.container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Categoria</th>
              <th>Fecha</th>
              <th>Status</th>
              <th>Accion</th>
            </tr>
          </thead>

          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  style={{ textAlign: "center", padding: "1rem" }}
                >
                  No hay categorías registradas
                </td>
              </tr>
            ) : (
              categories.map((item) => (
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
                        <div>{item.name}</div>
                        <span>{item.description}</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    {new Date(item.createdAt).toLocaleDateString("es-PE")}
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
                    <Link href={`/dashboard/categories/${item.id}`}>
                      <ButtonIcon icon={FaRegEye} className={styles.iconEye} />
                    </Link>
                    <Link href={`/dashboard/categories/${item.id}/edit`}>
                      <ButtonIcon icon={FaEdit} className={styles.iconEdit} />
                    </Link>
                    <DeleteCategory id={item.id} />
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

export default Categories;
