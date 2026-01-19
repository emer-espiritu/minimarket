import { Product, UnitMeasure } from "@/app/generated/prisma/client";
import Input from "../ui/Input";
import Select from "../ui/Select";
import Button from "../ui/Button";
import styles from "@/app/dashboard/sales/create/create.module.css";
import { createProduct, updateProduct } from "@/actions/product-actions";

export type Option = {
  value: string;
  label: string;
};

const status = [
  { value: "true", label: "Activo" },
  { value: "false", label: "Inactivo" },
];

const FormProduct = ({
  product,
  categories,
}: {
  product?: Product;
  categories: Option[];
}) => {
  const functionAction = product?.id ? updateProduct : createProduct;
  return (
    <form action={functionAction} className={styles.grid}>
      {product?.id && <input type="hidden" name="id" value={product.id} />}
      <Input label="Nombre" name="name" defaultValue={product?.name} />
      <Input
        label="Descripcion"
        name="description"
        defaultValue={product?.description ?? undefined}
      />
      <Input
        label="Precio Compra"
        defaultValue={product?.purchasePrice}
        name="purchasePrice"
      />
      <Input
        label="Precio Venta"
        defaultValue={product?.salePrice}
        name="salePrice"
      />
      <Input
        label="Stock"
        type="number"
        defaultValue={product?.stock}
        name="stock"
      />
      <Select
        label="Estado"
        options={status}
        name="status"
        defaultValue={product?.status ? "true" : "false"}
      />
      <Select
        label="Unidad Medida"
        options={Object.values(UnitMeasure).map((v) => ({
          value: v,
          label: v.replace(/_/g, " "),
        }))}
        defaultValue={product?.unitMeasure}
        name="unitMeasure"
      />
      <Select
        label="Categoria"
        options={categories}
        defaultValue={product?.categoryId}
        name="categoryId"
      />
      <Button label={product?.id ? "Actualizar" : "Registrar"} type="submit" />
    </form>
  );
};

export default FormProduct;
