import Title from "@/components/ui/Title";
import LinkIcon from "@/components/ui/LinkIcon";
import { FaArrowLeft } from "react-icons/fa";
import styles from "../../sales/create/create.module.css";
import CardCategory from "@/components/card/CardCategory";
import { getCategoryId } from "@/actions/category-actions";

const CategoryDetail = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const categories = await getCategoryId(id);

  if (!categories) {
    return <h2>Categoria no encontrado</h2>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Title text={"Detalles de la Categoria"} />
        <LinkIcon
          icon={FaArrowLeft}
          className={styles.iconCreate}
          href={"/dashboard/categories"}
        />
      </div>
      <div className={styles.cardProduct}>
        <CardCategory
          category={{
            name: categories.name,
            description: categories.description ?? undefined,
            status: categories.status,
          }}
        />
      </div>
    </div>
  );
};

export default CategoryDetail;
