import styles from "@/app/dashboard/sales/create/create.module.css";
import LinkIcon from "../ui/LinkIcon";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import { IoIosPrint } from "react-icons/io";
import Title from "../ui/Title";
import ButtonIcon from "../ui/ButtonIcon";
import Select from "../ui/Select";
import {
  DetailSale,
  DocumentType,
  PaymentMethod,
  Product,
  Sale,
  StatusSale,
} from "@/app/generated/prisma/client";
import { getAllCustomers } from "@/actions/customer-actions";
import ItemSale from "./ItemSale";
import SelectCustomer from "../ui/SelectCustomer";
import { createSales, updateSale } from "@/actions/sale-actions";
import FormSaleClient from "./FormSaleClient";

const FormSale = async ({
  products = [],
  userId,
  sale,
}: {
  sale?: Sale & { detail: DetailSale[] };
  products?: Product[];
  userId?: string;
}) => {
  const action = sale?.id ? updateSale : createSales;
  const { customers } = await getAllCustomers();
  //console.log("User", customers, typeof customers, Array.isArray(customers));
  const customerOptions = customers.map((c) => ({
    value: c.id,
    label: `${c.name} ${c.lastName}`,
  }));

  // 👇 items para edita
  const detailProducts = sale?.detail || [];
  return (
    <FormSaleClient action={action} className={styles.wrapper}>
      {sale?.id && (
        <input
          type="hidden"
          name="saleId"
          defaultValue={sale.id} // ✅ elimina value
        />
      )}
      {/* HEADER */}
      <div className={styles.header}>
        <LinkIcon
          icon={FaArrowLeft}
          className={styles.iconCreate}
          href="/dashboard/sales"
        />
        <Title text="Realizar Venta" />
        <div>
          <ButtonIcon
            type="submit"
            icon={FaSave}
            className={styles.iconCreate}
          />
          <ButtonIcon
            type="button"
            icon={IoIosPrint}
            className={styles.iconCreate}
          />
        </div>
      </div>

      {/* USER */}
      {userId && <input type="hidden" name="userId" value={userId} />}

      {/* CAMPOS */}
      <div className={styles.grid}>
        <Select
          label="Tipo de Documento"
          name="documentType"
          defaultValue={DocumentType.BOLETA}
          options={Object.values(DocumentType).map((v) => ({
            value: v,
            label: v.replace(/_/g, " "),
          }))}
        />

        <Select
          label="Método de Pago"
          name="paymentMethod"
          defaultValue={PaymentMethod.CASH}
          options={Object.values(PaymentMethod).map((v) => ({
            value: v,
            label: v.replace(/_/g, " "),
          }))}
        />

        <Select
          label="Estado"
          name="status"
          defaultValue={StatusSale.PENDING}
          options={Object.values(StatusSale).map((v) => ({
            value: v,
            label: v.replace(/_/g, " "),
          }))}
        />

        <SelectCustomer options={customerOptions} />
      </div>

      <ItemSale products={products} detailProduct={detailProducts} />
    </FormSaleClient>
  );
};

export default FormSale;
