"use client";
import { ReactNode, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import styles from "./sidebar.module.css";

const Dashboard = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.layout}>
      <Sidebar open={open} />

      <Header onToggle={() => setOpen(!open)} />

      <main className={styles.main}>{children}</main>

      {open && (
        <div className={styles.overlay} onClick={() => setOpen(false)} />
      )}
    </div>
  );
};

export default Dashboard;
