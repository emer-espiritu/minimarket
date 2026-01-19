import Title from "@/components/ui/Title";
import styles from "../../../sales/create/create.module.css";
import LinkIcon from "@/components/ui/LinkIcon";
import { FaArrowLeft } from "react-icons/fa";
import { getProductId } from "@/actions/product-actions";
import FormProduct from "@/components/form/FormProduct";
import { getAllCategory } from "@/actions/category-actions";

const EditProductPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const product = await getProductId(id);

  if (!product) {
    return <h2>Producto no encontrado</h2>;
  }
  const { categories } = await getAllCategory();
  const category = categories.map((c) => ({
    value: c.id,
    label: c.name,
  }));

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Title text={"Editar Productos"} />
        <div>
          <LinkIcon
            icon={FaArrowLeft}
            className={styles.iconCreate}
            href={"/dashboard/products"}
          />
        </div>
      </div>
      <FormProduct product={product} categories={category} />
    </div>
  );
};

export default EditProductPage;
