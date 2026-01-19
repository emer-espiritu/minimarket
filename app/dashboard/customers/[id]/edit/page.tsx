import Title from "@/components/ui/Title";
import LinkIcon from "@/components/ui/LinkIcon";
import { FaArrowLeft } from "react-icons/fa";
import styles from "@/app/dashboard/sales/create/create.module.css";
import { getCustomerId } from "@/actions/customer-actions";
import FormCustomer from "@/components/form/FormCustomer";

const EditCustomer = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params; // ✅ SIN await

  const customer = await getCustomerId(id);

  if (!customer) {
    return <h2>Cliente no encontrada</h2>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Title text={"Editar Cliente"} />
        <div>
          <LinkIcon
            icon={FaArrowLeft}
            className={styles.iconCreate}
            href={"/dashboard/customers"}
          />
        </div>
      </div>
      <FormCustomer customer={customer} />
    </div>
  );
};

export default EditCustomer;
