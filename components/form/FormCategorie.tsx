import { createCategory, updateCategorie } from "@/actions/category-actions";
import { Category } from "@/app/generated/prisma/client";
import Input from "../ui/Input";
import Select from "../ui/Select";
import Button from "../ui/Button";
import styles from "@/app/dashboard/sales/create/create.module.css";

const status = [
  { value: "true", label: "Activo" },
  { value: "false", label: "Inactivo" },
];

const FormCategory = ({ category }: { category?: Category }) => {
  const functionAction = category?.id ? updateCategorie : createCategory;
  return (
    <form action={functionAction} className={styles.grid}>
      {category?.id && <input type="hidden" name="id" value={category.id} />}
      <Input label="Nombre" name="name" defaultValue={category?.name} />
      <Input
        label="Descripcion"
        name="description"
        defaultValue={category?.description ?? undefined}
      />
      <Select
        label="Estado"
        options={status}
        name="status"
        defaultValue={category?.status ? "true" : "false"}
      />
      <Button label={category?.id ? "Actualizar" : "Registrar"} type="submit" />
    </form>
  );
};

export default FormCategory;
