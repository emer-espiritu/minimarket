"use client";

import { useToast } from "@/hooks/use-toast";
import { Toast } from "./toast";
import styles from "./toaster.module.css";

export function Toaster() {
  const { toasts, dismiss } = useToast();

  return (
    <div className={styles.viewport}>
      {toasts.map((t) => (
        <Toast key={t.id} toast={t} onDismiss={dismiss} />
      ))}
    </div>
  );
}
