import Link from "next/link";
import styles from "./Footer.module.scss";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.logo}>
            PLO<span>ZEN</span>
          </div>
          
          <nav className={styles.links}>
            <Link href="/services">서비스</Link>
            <Link href="/portfolio">포트폴리오</Link>
            <Link href="/contact">문의하기</Link>
            <Link href="/faq">FAQ</Link>
          </nav>
        </div>

        <div className={styles.bottom}>
          <div className={styles.copyright}>
            © {currentYear} PLOZEN. All rights reserved.
          </div>
          
          <div className={styles.legal}>
            <Link href="/privacy">개인정보처리방침</Link>
            <Link href="/terms">이용약관</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
