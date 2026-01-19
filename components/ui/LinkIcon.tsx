import { IconType } from "react-icons";
import styles from "./ui.module.css";
import Link from "next/link";

interface ButtonIconProps {
  icon: IconType;
  className: string;
  href: string;
}

const LinkIcon = ({ icon: Icon, className, href }: ButtonIconProps) => {
  return (
    <Link className={styles.containerButtonIcon} href={href}>
      {Icon && <Icon className={className} />}
    </Link>
  );
};

export default LinkIcon;
