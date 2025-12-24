import Link from 'next/link';
import styles from './Header.module.scss';
import { Button } from '@/components/atomic/Button'; // Assuming Button atom exists or I will create standard button

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo}>
          PLOLUX
        </Link>
        <nav className={styles.nav}>
          <Link href="/about">PLOLUX</Link>
          <Link href="/services">서비스</Link>
          <Link href="/portfolio">포트폴리오</Link>
          <Link href="/contact" className={styles.contactBtn}>문의/견적</Link>
        </nav>
      </div>
    </header>
  );
}
