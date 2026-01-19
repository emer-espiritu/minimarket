import Logo from "../ui/Logo";
import styles from "./cardSale.module.css";
import { SaleReadDTO } from "@/models/sale-read";

interface CardSaleProps {
  sale: SaleReadDTO;
}

const CardSale = ({ sale }: CardSaleProps) => {
  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.company}>
          <Logo href="/" />
          <p>+51 987654323</p>
        </div>

        <div className={styles.invoiceInfo}>
          <div className={styles.invoiceTitle}>
            INVOICE #: {sale.documentNumber}
          </div>
          <div>
            Fecha: {new Date(sale.createdAt).toLocaleDateString("es-PE")}
          </div>
          <div>Metodo de Pago: {sale.paymentMethod}</div>
        </div>
      </div>

      {/* Bill To */}
      {sale.customerId && (
        <div className={styles.billTo}>
          <h2>Datos del Cliente:</h2>
          <p>
            {sale.customerId.name} {sale.customerId.lastName}
          </p>
          <p>{sale.customerId.address}</p>
        </div>
      )}

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Description</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {sale.detail?.map((item) => (
            <tr key={item.product.productId}>
              <td>{item.product.name}</td>
              <td>{item.quantity}</td>
              <td>S/. {item.price}</td>
              <td>S/. {item.subtotal}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals */}
      <div className={styles.row}>
        <span>Total:</span>
        <span className={styles.total}>S/. {sale.saleTotal.toFixed(2)}</span>
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <p>Payment is due within 30 days. Late payments are subject to fees.</p>
        <p>Please make checks payable to Your Company Name and mail to:</p>
        <p>123 Main St., Anytown, USA 12345</p>
      </div>
    </div>
  );
};

export default CardSale;
