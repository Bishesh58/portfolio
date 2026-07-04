import { resume } from "@/data/resume";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <span className={styles.barcode} aria-hidden="true" />
        <p className={styles.stamp}>
          © {new Date().getFullYear()} {resume.name} · {resume.location}
        </p>
        <span className={styles.note}>Built with Next.js + too much coffee</span>
      </div>
    </footer>
  );
}
