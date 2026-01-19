"use client";
import { useState } from "react";
import Select from "./Select";
import Input from "./Input";

interface Option {
  value: string;
  label: string;
}

const SelectCustomer = ({ options }: { options: Option[] }) => {
  const [isNewCustomer, setIsNewCustomer] = useState(false);
  return (
    <>
      <Select
        label="Cliente"
        name="customerId"
        options={[...options, { value: "new", label: "Nuevo Cliente" }]}
        onChange={(e) => setIsNewCustomer(e.target.value === "new")}
        defaultValue={options[0]?.value}
      />

      {isNewCustomer && (
        <Input
          label="Cliente"
          name="newCustomer"
          placeholder="Nombre del nuevo cliente"
        />
      )}
    </>
  );
};

export default SelectCustomer;
