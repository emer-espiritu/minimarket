"use client";
import Link from "next/link";
import Logo from "../ui/Logo";
import { SidebarItems } from "./data";
import styles from "./sidebar.module.css";
import { usePathname } from "next/navigation";

const Sidebar = ({ open }: { open: boolean }) => {
  const pathname = usePathname();
  return (
    <aside className={`${styles.sidebar} ${open ? styles.sidebarOpen : ""}`}>
      <div className={styles.logo}>
        <Logo href={"/dashboard"} />
      </div>
      {SidebarItems.map((item) => (
        <ul className={styles.ul} key={item.id}>
          <Link
            href={item.href}
            className={`${styles.linkItem} ${
              // Si es link base (ej: /dashboard) solo exacto
              pathname === item.href ||
              // Si es link de subruta (ej: /dashboard/products) activa si la ruta empieza con él
              (item.href !== "/dashboard" && pathname.startsWith(item.href))
                ? styles.active
                : ""
            }`}
          >
            <item.icon size={19} />
            <span>{item.label}</span>
          </Link>
        </ul>
      ))}
    </aside>
  );
};

export default Sidebar;
