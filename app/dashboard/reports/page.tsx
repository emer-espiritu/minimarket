import Image from "next/image";
import styles from "../sales/table.module.css";
import ButtonIcon from "@/components/ui/ButtonIcon";
import { FaEdit, FaPlus, FaRegEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Title from "@/components/ui/Title";

const Reports = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Title text={"Reporte"} />
        <ButtonIcon icon={FaPlus} className={styles.iconCreate} />
      </div>
      <div className={styles.container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Reporte</th>
              <th>Descripcion</th>
              <th>Usuario</th>
              <th>Fecha</th>
              <th>Status</th>
              <th>Accion</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>
                <div className={styles.brand}>
                  <Image
                    src="/customer.png"
                    alt="Apple"
                    width={48}
                    height={48}
                    className={styles.avatar}
                  />
                  <div>
                    <div>RPT-003</div>
                    <span>company@example.com</span>
                  </div>
                </div>
              </td>
              <td>Productos más vendidos</td>
              <td>Bonnie Green</td>
              <td>02 Mar 2025</td>
              <td>
                <span className={`${styles.badge} ${styles.available}`}>
                  completed
                </span>
              </td>
              <td className={styles.actions}>
                <ButtonIcon icon={FaRegEye} className={styles.iconEye} />
                <ButtonIcon icon={FaEdit} className={styles.iconEdit} />
                <ButtonIcon icon={MdDelete} className={styles.iconDelete} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;
