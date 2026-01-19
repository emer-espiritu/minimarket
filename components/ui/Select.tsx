import { SelectHTMLAttributes } from "react";
import styles from "./ui.module.css";

type Option = {
  value: string;
  label: string;
};

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: Option[];
}

/*interface SelectProps {
  label?: string;
  options: Option[];
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
  disabled?: boolean;
}*/

const Select = ({ label, options, ...props }: SelectProps) => {
  return (
    <div className={styles.container}>
      {label && <label className={styles.label}>{label}</label>}

      <select className={styles.select} {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
