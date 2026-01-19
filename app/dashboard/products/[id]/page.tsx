import CardProduct from "@/components/card/CardProduct";
import Title from "@/components/ui/Title";
import LinkIcon from "@/components/ui/LinkIcon";
import { FaArrowLeft } from "react-icons/fa";
import styles from "../../sales/create/create.module.css";
import { getProductId } from "@/actions/product-actions";

const ProductDetail = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const product = await getProductId(id);

  if (!product) {
    return <h2>Producto no encontrado</h2>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Title text={"Detalles del producto"} />
        <LinkIcon
          icon={FaArrowLeft}
          className={styles.iconCreate}
          href={"/dashboard/products"}
        />
      </div>
      <div className={styles.cardProduct}>
        <CardProduct
          products={{
            name: product.name,
            description: product.description ?? undefined,
            purchasePrice: product.purchasePrice.toString(),
            salePrice: product.salePrice.toString(),
            categoryId: [product.category.name],
            stock: product.stock,
            unitMeasure: product.unitMeasure,
            status: product.status,
          }}
        />
      </div>
    </div>
  );
};

export default ProductDetail;
