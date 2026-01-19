import styles from "./ui.module.css";

const Title = ({ text }: { text: string }) => {
  return <h1 className={styles.title}>{text}</h1>;
};

export default Title;
