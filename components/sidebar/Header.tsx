import Avatar from "../ui/Avatar";
import SearchInput from "../ui/SearchInput";
import styles from "./sidebar.module.css";

const Header = ({ onToggle }: { onToggle: () => void }) => {
  return (
    <header className={styles.header}>
      <button className={styles.menuButton} onClick={onToggle}>
        ☰
      </button>

      <SearchInput />

      <div className={styles.avatarWrapper}>
        <Avatar />
      </div>
    </header>
  );
};

export default Header;
