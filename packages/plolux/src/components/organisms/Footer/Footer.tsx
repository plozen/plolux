import styles from './Footer.module.scss';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.info}>
          <Link href="/" className={styles.logo}>PLOLUX</Link>
          <p>
            Premium Web Development Studio<br/>
            Creating Digital Masterpieces
          </p>
          <p className={styles.copy}>&copy; {new Date().getFullYear()} PLOLUX. All rights reserved.</p>
        </div>
        <div className={styles.links}>
          <div>
            <h4>Menu</h4>
            <ul>
              <li><Link href="/about">회사 소개</Link></li>
              <li><Link href="/services">서비스</Link></li>
              <li><Link href="/portfolio">포트폴리오</Link></li>
              <li><Link href="/contact">문의하기</Link></li>
            </ul>
          </div>
          <div>
            <h4>Legal</h4>
            <ul>
              <li><Link href="/privacy">개인정보처리방침</Link></li>
              <li><Link href="/terms">이용약관</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
