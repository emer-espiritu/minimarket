"use client";
import Modal from "@/components/modal/Modal";
import { useState } from "react";

const Invoices = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>modal</button>
      <Modal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default Invoices;
