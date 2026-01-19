import styles from "./modal.module.css";
import { IoIosCloseCircle } from "react-icons/io";
import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}
const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onMouseDown={onClose}>
      <div
        className={styles.modalContent}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button className={styles.closeButton} onClick={onClose}>
          <IoIosCloseCircle size={30} />
        </button>
        <p className={styles.text}>Estas seguro de eliminar?</p>

        {children}
      </div>
    </div>
  );
};

export default Modal;
