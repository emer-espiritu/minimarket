"use client";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import styles from "./ui.module.css";

interface QuantityProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
}

const Quantity = ({
  value,
  min = 1,
  max = Infinity,
  onChange,
}: QuantityProps) => {
  const increment = () => {
    if (value < max) onChange(value + 1);
  };

  const decrement = () => {
    if (value > min) onChange(value - 1);
  };

  return (
    <div className={styles.containerQuantity}>
      <button
        type="button"
        className={styles.buttonQuantity}
        onClick={decrement}
        disabled={value <= min}
      >
        <AiOutlineMinus />
      </button>

      <input
        type="number"
        className={styles.inputQuantity}
        value={value}
        readOnly
      />

      <button
        type="button"
        className={styles.buttonQuantity}
        onClick={increment}
      >
        <AiOutlinePlus />
      </button>
    </div>
  );
};

export default Quantity;
