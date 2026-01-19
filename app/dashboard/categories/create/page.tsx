import styles from "@/app/dashboard/sales/create/create.module.css";
import FormCategory from "@/components/form/FormCategorie";
import LinkIcon from "@/components/ui/LinkIcon";
import Title from "@/components/ui/Title";
import { FaArrowLeft } from "react-icons/fa";

const CategoryCreate = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Title text={"Registrar Categorias"} />
        <div>
          <LinkIcon
            icon={FaArrowLeft}
            className={styles.iconCreate}
            href={"/dashboard/categories"}
          />
        </div>
      </div>
      <FormCategory />
    </div>
  );
};

export default CategoryCreate;
