import Image from "next/image";
import styles from "./card.module.css";
import { InputCategory } from "@/models";

interface CardCategoryProps {
  category: InputCategory;
}
const CardCategory = ({ category }: CardCategoryProps) => {
  return (
    <div className={styles.card}>
      {/* Imagen */}
      <div className={styles.imageWrapper}>
        <Image
          src={"/customer.png"}
          alt={category.name}
          width={160}
          height={160}
          className={styles.image}
        />
      </div>

      {/* Badges */}
      <div className={styles.badges}>
        <span
          className={`${styles.status} ${
            category.status ? styles.active : styles.inactive
          }`}
        >
          {category.status ? "Activo" : "Inactivo"}
        </span>
      </div>

      {/* Info principal */}
      <h3 className={styles.title}>{category.name}</h3>

      {category.description && (
        <p className={styles.description}>{category.description}</p>
      )}
    </div>
  );
};

export default CardCategory;
