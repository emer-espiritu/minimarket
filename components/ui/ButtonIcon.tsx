import type { ButtonHTMLAttributes } from "react";
import styles from "./ui.module.css";
import type { IconType } from "react-icons";

interface ButtonIconProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconType;
  className: string;
}

const ButtonIcon = ({ icon: Icon, className, ...props }: ButtonIconProps) => {
  return (
    <button className={styles.containerButtonIcon} {...props}>
      {Icon && <Icon className={className} />}
    </button>
  );
};

export default ButtonIcon;
