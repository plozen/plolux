"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, Trophy, HeartHandshake, User } from 'lucide-react';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import styles from './BottomNav.module.scss';

const NAV_ITEMS = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Ranking', href: '/ranking', icon: Trophy },
  { label: 'Support', href: '/support', icon: HeartHandshake }, // Vote -> Support Mapping
  { label: 'My', href: '/my', icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();
  // 현재 locale 추출 (예: /en/ranking -> 'en')
  const currentLocale = pathname.split('/')[1] || 'en';

  return (
    <nav className={styles.navContainer}>
      <div className={styles.navGlass}>
        {NAV_ITEMS.map((item) => {
          // 경로 생성: /en + /ranking
          const linkHref = `/${currentLocale}${item.href === '/' ? '' : item.href}`;
          // Home('/')일 경우 정확히 일치, 그 외에는 포함 여부 (간단한 isActive 로직)
          const isActive = item.href === '/' 
            ? pathname === `/${currentLocale}` || pathname === `/${currentLocale}/`
            : pathname.startsWith(linkHref);
            
          const Icon = item.icon;

          return (
            <Link key={item.href} href={linkHref} className={classNames(styles.navItem, { [styles.active]: isActive })}>
              <div className={styles.iconWrapper}>
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className={styles.indicator}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </div>
              <span className={styles.label}>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
