import { FaSearch } from "react-icons/fa";
import styles from "./ui.module.css";
import { useSearch } from "@/hooks/use-search";

const SearchInput = () => {
  const { query, setQuery } = useSearch();
  return (
    <div className={styles.wrapper}>
      <FaSearch className={styles.icon} />
      <input
        type="text"
        placeholder="Buscar producto..."
        className={styles.inputSearch}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
