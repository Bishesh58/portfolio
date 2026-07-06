import { resume } from "@/data/resume";
import VisitorCounter from "@/components/VisitorCounter";
import FooterEggs from "./FooterEggs";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <FooterEggs />
      <div className={`container ${styles.inner}`}>
        <p className={styles.stamp}>
          © {new Date().getFullYear()} {resume.name} · {resume.location}
        </p>
        <span className={styles.barcode} aria-hidden="true" />
        <VisitorCounter />
        <span className={styles.note}>Built with Next.js + too much coffee</span>
        <a className={styles.top} href="#hero">
          Back to top <span aria-hidden="true">↑</span>
        </a>
      </div>
    </footer>
  );
}
