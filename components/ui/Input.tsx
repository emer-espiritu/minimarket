import type { InputHTMLAttributes } from "react";
import styles from "./ui.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = ({ label, error, ...prop }: InputProps) => {
  return (
    <div className={styles.container}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        className={`${styles.input} ${error ? styles.errorInput : ""}`}
        {...prop}
      />
      {error && <p className={styles.errorText}>{error}</p>}
    </div>
  );
};

export default Input;
