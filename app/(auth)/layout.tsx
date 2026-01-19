import { ReactNode } from "react";
import styles from "./signIn.module.css";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <div className={styles.signin}>{children}</div>;
}
