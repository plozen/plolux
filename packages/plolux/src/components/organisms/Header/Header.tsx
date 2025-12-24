'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import styles from './Header.module.scss';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo}>
          PLOLUX
        </Link>
        
        {/* 햄버거 메뉴 버튼 (모바일 전용) */}
        <button 
          className={styles.hamburger}
          onClick={toggleMenu}
          aria-label="메뉴 열기/닫기"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* 네비게이션 메뉴 */}
        <nav className={styles.nav} data-menu-open={isMenuOpen}>
          <Link href="/about">PLOLUX</Link>
          <Link href="/services">서비스</Link>
          <Link href="/portfolio">포트폴리오</Link>
          <Link href="/contact" className={styles.contactBtn}>문의/견적</Link>
        </nav>
      </div>
    </header>
  );
}
