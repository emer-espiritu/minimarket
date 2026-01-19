import { getCustomerId } from "@/actions/customer-actions";
import styles from "@/app/dashboard/sales/create/create.module.css";
import CardCustomer from "@/components/card/CardCustomer";
import LinkIcon from "@/components/ui/LinkIcon";
import Title from "@/components/ui/Title";
import { FaArrowLeft } from "react-icons/fa";

const CustomerDetail = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const customer = await getCustomerId(id);

  if (!customer) {
    return <h2>Producto no encontrado</h2>;
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Title text={"Detalles del producto"} />
        <LinkIcon
          icon={FaArrowLeft}
          className={styles.iconCreate}
          href={"/dashboard/customers"}
        />
      </div>
      <div className={styles.cardProduct}>
        <CardCustomer
          customers={{
            name: customer.name,
            lastName: customer.lastName ?? undefined,
            ruc: customer.ruc ?? undefined,
            phone: customer.phone ?? undefined,
            email: customer.email ?? undefined,
            address: customer.address ?? undefined,
            status: customer.status,
          }}
        />
      </div>
    </div>
  );
};

export default CustomerDetail;
