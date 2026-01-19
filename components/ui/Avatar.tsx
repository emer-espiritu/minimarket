import { useState, useTransition } from "react";
import styles from "./ui.module.css";
import Image from "next/image";
import { logoutUser } from "@/actions/user-actions";
import Link from "next/link";
import { useAuth } from "@/app/context/authContext";

const Avatar = () => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const user = useAuth();
  const handleLogout = () => {
    startTransition(async () => {
      await logoutUser();
    });
  };

  return (
    <div className={styles.container}>
      {/* Avatar */}
      <button
        className={styles.avatarButton}
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="true"
        aria-expanded={open}
      >
        <Image
          src="/customer.png"
          alt="User dropdown"
          width={80}
          height={80}
          className={styles.img}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className={styles.dropdown}>
          <div className={styles.header}>
            <div className={styles.name}>
              {user?.name} {user?.lastName}
            </div>
            <div className={styles.email}>{user?.email}</div>
          </div>

          <ul className={styles.menu}>
            <li>
              <Link href="/dashboard" className={styles.item}>
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="dashboard/settings" className={styles.item}>
                Settings
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                disabled={isPending}
                className={`${styles.item} ${styles.danger}`}
              >
                {isPending ? "Cerrando..." : "Sign out"}
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Avatar;
