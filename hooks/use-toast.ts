"use client";

import { ReactNode, useEffect, useState } from "react";

export type ToastVariant =
  | "info"
  | "success"
  | "warning"
  | "danger"
  | "message";

export interface Toast {
  id: string;
  variant: ToastVariant;
  title?: ReactNode;
  message?: ReactNode;
  sender?: {
    name?: string;
    avatar?: string;
  };
}

interface State {
  toasts: Toast[];
}

const listeners: Array<(state: State) => void> = [];
let memoryState: State = { toasts: [] };

function dispatch(action: any) {
  switch (action.type) {
    case "ADD_TOAST":
      memoryState = {
        toasts: [...memoryState.toasts, action.toast].slice(-20),
      };
      break;

    case "REMOVE_TOAST":
      memoryState = {
        toasts: memoryState.toasts.filter((t) => t.id !== action.toastId),
      };
      break;
  }

  listeners.forEach((listener) => listener(memoryState));
}

export function toast(toast: Omit<Toast, "id">) {
  const id = crypto.randomUUID();

  dispatch({
    type: "ADD_TOAST",
    toast: { ...toast, id },
  });

  return {
    dismiss: () => dispatch({ type: "REMOVE_TOAST", toastId: id }),
  };
}

export function useToast() {
  const [state, setState] = useState<State>(memoryState);

  useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) listeners.splice(index, 1);
    };
  }, []);

  return {
    ...state,
    toast,
    dismiss: (id: string) => dispatch({ type: "REMOVE_TOAST", toastId: id }),
  };
}
