import Title from "@/components/ui/Title";
import styles from "../../sales/create/create.module.css";
import { FaArrowLeft } from "react-icons/fa";
import LinkIcon from "@/components/ui/LinkIcon";
import FormProduct from "@/components/form/FormProduct";
import { getAllCategory } from "@/actions/category-actions";

const ProductCreate = async () => {
  const { categories } = await getAllCategory();
  const categoryOptions = categories.map((c) => ({
    value: c.id,
    label: c.name,
  }));
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Title text={"Registrar Productos"} />
        <div>
          <LinkIcon
            icon={FaArrowLeft}
            className={styles.iconCreate}
            href={"/dashboard/products"}
          />
        </div>
      </div>
      <FormProduct categories={categoryOptions} />
    </div>
  );
};

export default ProductCreate;
