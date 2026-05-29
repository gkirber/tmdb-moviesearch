import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        © 2026 MovieSearch Demo · Data courtesy of TMDB.
      </div>
    </footer>
  );
}