import Title from "@/components/ui/Title";
import LinkIcon from "@/components/ui/LinkIcon";
import { FaArrowLeft } from "react-icons/fa";
import styles from "@/app/dashboard/sales/create/create.module.css";
import { getCategoryId } from "@/actions/category-actions";
import FormCategory from "@/components/form/FormCategorie";

const EditCategory = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params; // ✅ SIN await

  const category = await getCategoryId(id);

  if (!category) {
    return <h2>Categoria no encontrada</h2>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Title text={"Editar Categoria"} />
        <div>
          <LinkIcon
            icon={FaArrowLeft}
            className={styles.iconCreate}
            href={"/dashboard/categories"}
          />
        </div>
      </div>
      <FormCategory category={category} />
    </div>
  );
};

export default EditCategory;
