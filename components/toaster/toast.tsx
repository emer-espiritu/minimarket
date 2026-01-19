"use client";

import { useEffect, useRef, useState } from "react";
import { Toast as ToastType } from "@/hooks/use-toast";
import styles from "./toaster.module.css";

interface Props {
  toast: ToastType;
  onDismiss: (id: string) => void;
}

export function Toast({ toast, onDismiss }: Props) {
  const [open, setOpen] = useState(false);
  const timer = useRef<NodeJS.Timeout | null>(null);

  const close = () => {
    setOpen(false);
    setTimeout(() => {
      onDismiss(toast.id);
    }, 300); // tiempo para animación de salida
  };

  useEffect(() => {
    setOpen(true);
    timer.current = setTimeout(close, 8000);

    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const pause = () => timer.current && clearTimeout(timer.current);
  const resume = () => {
    timer.current = setTimeout(close, 8000);
  };

  return (
    <div
      role="alert"
      onMouseEnter={pause}
      onMouseLeave={resume}
      className={`
        ${styles.toast}
        ${styles[toast.variant]}
        ${open ? styles.open : styles.closed}
      `}
    >
      {toast.variant === "message" && toast.sender?.avatar && (
        <img src={toast.sender.avatar} alt="" className={styles.avatar} />
      )}

      <div className={styles.body}>
        {toast.sender?.name && (
          <strong className={styles.sender}>{toast.sender.name}</strong>
        )}

        {toast.title && <strong className={styles.title}>{toast.title}</strong>}

        {toast.message && <p className={styles.message}>{toast.message}</p>}

        {toast.variant === "message" && (
          <div className={styles.actions}>
            <button className={styles.primary}>Reply</button>
            <button onClick={close}>Dismiss</button>
          </div>
        )}
      </div>

      <button onClick={close} className={styles.close}>
        ✕
      </button>
    </div>
  );
}
