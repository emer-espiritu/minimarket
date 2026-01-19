import { createCustomer, updateCustomer } from "@/actions/customer-actions";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Select from "../ui/Select";
import { Customer } from "@/app/generated/prisma/client";
import styles from "@/app/dashboard/sales/create/create.module.css";

const status = [
  { value: "true", label: "Activo" },
  { value: "false", label: "Inactivo" },
];

const FormCustomer = ({ customer }: { customer?: Customer }) => {
  const functionAction = customer?.id ? updateCustomer : createCustomer;
  return (
    <form action={functionAction} className={styles.grid}>
      {customer?.id && <input type="hidden" name="id" value={customer.id} />}
      <Input label="Nombre" name="name" defaultValue={customer?.name} />
      <Input
        label="Apellidos"
        name="lastName"
        defaultValue={customer?.lastName ?? undefined}
      />
      <Input
        label="Dni - Ruc"
        defaultValue={customer?.ruc ?? undefined}
        name="ruc"
      />
      <Input
        label="Telefono"
        defaultValue={customer?.phone ?? undefined}
        name="phone"
      />
      <Input
        label="Correo"
        defaultValue={customer?.email ?? undefined}
        name="email"
      />
      <Input
        label="Dirreccion"
        defaultValue={customer?.email ?? undefined}
        name="address"
      />
      <Select
        label="Estado"
        options={status}
        name="status"
        defaultValue={customer?.status ? "true" : "false"}
      />

      <Button label={customer?.id ? "Actualizar" : "Registrar"} type="submit" />
    </form>
  );
};

export default FormCustomer;
