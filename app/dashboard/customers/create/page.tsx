import styles from "@/app/dashboard/sales/create/create.module.css";
import FormCustomer from "@/components/form/FormCustomer";
import LinkIcon from "@/components/ui/LinkIcon";
import Title from "@/components/ui/Title";
import { FaArrowLeft } from "react-icons/fa";

const CustomerCreate = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Title text={"Registrar Clientes"} />
        <div>
          <LinkIcon
            icon={FaArrowLeft}
            className={styles.iconCreate}
            href={"/dashboard/customers"}
          />
        </div>
      </div>
      <FormCustomer />
    </div>
  );
};

export default CustomerCreate;
