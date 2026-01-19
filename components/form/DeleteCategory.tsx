"use client";
import { MdDelete } from "react-icons/md";
import ButtonIcon from "../ui/ButtonIcon";
import styles from "@/app/dashboard/sales/table.module.css";
import { useState } from "react";
import Modal from "../modal/Modal";
import { deleteCategory } from "@/actions/category-actions";
import Button from "../ui/Button";

const DeleteCategory = ({ id }: { id: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ButtonIcon
        icon={MdDelete}
        className={styles.iconDelete}
        onClick={() => setIsOpen(true)}
      />
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <form action={deleteCategory}>
          <input type="hidden" name="id" value={id} />
          <Button label="Confirmar" type="submit" />
        </form>
      </Modal>
    </>
  );
};

export default DeleteCategory;
