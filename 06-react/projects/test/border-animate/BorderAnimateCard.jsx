import styles from "./BorderAnimateCard.module.css";

export default function BorderAnimateCard({ children, className = "" }) {
  return (
    <div className={`${styles.wrapper} ${className}`}>
      <div className={styles.glow} />
      <div className={styles.border} />
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}
