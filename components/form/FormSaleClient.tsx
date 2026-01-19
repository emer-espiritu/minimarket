"use client";
import { useSale } from "@/hooks/use-sale";
import { ReactNode } from "react";

interface Props {
  action: (formData: FormData) => void;
  children: ReactNode;
  className: string;
}
const FormSaleClient = ({ action, children, className }: Props) => {
  const clear = useSale((s) => s.clear);
  return (
    <form
      className={className}
      action={action}
      onSubmit={() => {
        clear(); // ✅ limpiar carrito al enviar
      }}
    >
      {children}
    </form>
  );
};

export default FormSaleClient;
