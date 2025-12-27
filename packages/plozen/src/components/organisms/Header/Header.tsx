"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "@/components/atomic/ThemeToggle/ThemeToggle";
import styles from "./Header.module.scss";

const navItems = [
  { name: "홈", href: "/" },
  { name: "서비스", href: "/services" },
  { name: "포트폴리오", href: "/portfolio" },
  { name: "문의하기", href: "/contact" },
  { name: "FAQ", href: "/faq" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          {/* Logo */}
          <Link href="/" className={styles.logo}>
            PLO<span>ZEN</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className={styles.nav}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={pathname === item.href ? styles.active : ""}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Actions (Theme Toggle + Quote) */}
          <div className={styles.actions}>
            <ThemeToggle />
            
            {/* Desktop Quote Button - Optional based on design, simplified here */}
            {/* Mobile Hamburger */}
            <button className={styles.hamburger} onClick={toggleMenu} aria-label="Menu">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className={styles.backdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
            />
            <motion.nav
              className={styles.mobileMenu}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <button className={styles.closeBtn} onClick={toggleMenu}>
                <X size={32} />
              </button>
              
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={toggleMenu}
                >
                  {item.name}
                </Link>
              ))}
              {/* Point to Contact page with project context logic if needed, or just encourage user to go to contact */}
              <Link href="/contact" onClick={toggleMenu} style={{ color: 'var(--accent-primary)' }}>
                프로젝트 시작하기
              </Link>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
