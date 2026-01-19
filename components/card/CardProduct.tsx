import Image from "next/image";
import Button from "../ui/Button";
import styles from "./card.module.css";
import { InputProduct } from "@/models";

interface CardProductProps {
  products: InputProduct;
}

const CardProduct = ({ products }: CardProductProps) => {
  const profit =
    parseFloat(products.salePrice) - parseFloat(products.purchasePrice);

  return (
    <div className={styles.card}>
      {/* Imagen */}
      <div className={styles.imageWrapper}>
        <Image
          src={"/customer.png"}
          alt={products.name}
          width={160}
          height={160}
          className={styles.image}
        />
      </div>

      {/* Badges */}
      <div className={styles.badges}>
        <span className={styles.category}>{products.categoryId}</span>
        <span
          className={`${styles.status} ${
            products.status ? styles.active : styles.inactive
          }`}
        >
          {products.status ? "Activo" : "Inactivo"}
        </span>
      </div>

      {/* Info principal */}
      <h3 className={styles.title}>{products.name}</h3>

      {products.description && (
        <p className={styles.description}>{products.description}</p>
      )}

      {/* Precio */}
      <div className={styles.priceWrapper}>
        <span className={styles.price}>S/ {products.salePrice}</span>

        <span className={styles.unit}>/{products.unitMeasure}</span>
      </div>

      {/* Stock */}
      <span
        className={`${styles.stock} ${
          products.stock === 0 ? styles.outStock : ""
        }`}
      >
        {products.stock > 0 ? `Stock: ${products.stock}` : "Sin stock"}
      </span>

      {/* Margen (opcional para admin) */}
      {profit !== null && (
        <span className={styles.profit}>Ganancia: S/ {profit.toFixed(2)}</span>
      )}

      <Button
        label="Agregar al carrito"
        disabled={!products.status || products.stock === 0}
      />
    </div>
  );
};

export default CardProduct;
