import Link from "next/link";
import styles from "./pagination.module.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

const Pagination = ({ currentPage, totalPages }: PaginationProps) => {
  return (
    <div className={styles.container}>
      {/* PREV */}
      <Link
        href={currentPage > 1 ? `?page=${currentPage - 1}` : "#"}
        className={`${styles.button} ${
          currentPage === 1 ? styles.disabled : ""
        }`}
        aria-disabled={currentPage === 1}
      >
        Prev
      </Link>

      {/* PAGES */}
      {Array.from({ length: totalPages }, (_, i) => {
        const page = i + 1;
        const isActive = page === currentPage;

        return (
          <Link
            key={page}
            href={`?page=${page}`}
            className={`${styles.pageButton} ${
              isActive ? styles.active : styles.inactive
            }`}
            aria-current={isActive ? "page" : undefined}
          >
            {page}
          </Link>
        );
      })}

      {/* NEXT */}
      <Link
        href={currentPage < totalPages ? `?page=${currentPage + 1}` : "#"}
        className={`${styles.button} ${
          currentPage === totalPages ? styles.disabled : ""
        }`}
        aria-disabled={currentPage === totalPages}
      >
        Next
      </Link>
    </div>
  );
};

export default Pagination;
