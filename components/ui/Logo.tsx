import Link from "next/link";
import styles from "./ui.module.css";
import Image from "next/image";

const Logo = ({ href }: { href: string }) => {
  return (
    <Link href={href} className={styles.logo}>
      <Image src="/androide.png" alt="Logo" width={45} height={35} priority />
    </Link>
  );
};

export default Logo;
