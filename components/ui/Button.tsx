import type { ButtonHTMLAttributes } from "react";
import styles from "./ui.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

const Button = ({ label, ...prop }: ButtonProps) => {
  return (
    <button className={styles.btn} {...prop}>
      {label}
    </button>
  );
};

export default Button;
