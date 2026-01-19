import { getSaleId } from "@/actions/sale-actions";
import LinkIcon from "@/components/ui/LinkIcon";
import Title from "@/components/ui/Title";
import { FaArrowLeft } from "react-icons/fa";
import ButtonIcon from "@/components/ui/ButtonIcon";
import { IoIosPrint } from "react-icons/io";
import styles from "@/app/dashboard/sales/create/create.module.css";
import CardSale from "@/components/card/CardSale";

const DetailSale = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const sale = await getSaleId(id);

  if (!sale) {
    return <h2>No se encontrado la venta</h2>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <LinkIcon
          icon={FaArrowLeft}
          className={styles.iconCreate}
          href="/dashboard/sales"
        />
        <Title text="Detalles de la venta" />
        <div>
          <ButtonIcon
            type="button"
            icon={IoIosPrint}
            className={styles.iconCreate}
          />
        </div>
      </div>

      <CardSale
        sale={{
          documentNumber: sale.documentNumber,
          documentType: sale.documentType,
          paymentMethod: sale.paymentMethod,
          createdAt: sale.createdAt,
          saleTotal: sale.saleTotal,
          userId: sale.userId ?? undefined,
          customerId: sale.customer
            ? {
                name: sale.customer.name,
                lastName: sale.customer.lastName ?? "",
                address: sale.customer.address ?? "",
              }
            : undefined,
          detail: sale.detail.map((d) => ({
            product: {
              productId: d.productId,
              name: d.product.name,
            },
            quantity: d.quantity,
            price: d.price,
            subtotal: d.subtotal,
          })),
        }}
      />
    </div>
  );
};

export default DetailSale;
