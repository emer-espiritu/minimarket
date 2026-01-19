import { InputCustomer } from "@/models";
import styles from "./card.module.css";
import Image from "next/image";

interface CardCustomerProps {
  customers: InputCustomer;
}

const CardCustomer = ({ customers }: CardCustomerProps) => {
  return (
    <div className={styles.card}>
      {/* Imagen */}
      <div className={styles.imageWrapper}>
        <Image
          src={"/customer.png"}
          alt={customers.name}
          width={160}
          height={160}
          className={styles.image}
        />
      </div>

      {/* Badges */}
      <div className={styles.badges}>
        <span className={styles.category}>+51 {customers.phone}</span>
        <span
          className={`${styles.status} ${
            customers.status ? styles.active : styles.inactive
          }`}
        >
          {customers.status ? "Activo" : "Inactivo"}
        </span>
      </div>

      {/* Info principal */}
      <h3 className={styles.title}>
        {customers.name} {customers.lastName}
      </h3>

      <div className={styles.priceWrapper}>
        <span className={styles.unit}>Dni: {customers.ruc}</span>
      </div>
      <span className={styles.unit}>Direccion: {customers.address}</span>

      <span className={styles.unit}>Email: {customers.email}</span>
    </div>
  );
};

export default CardCustomer;
