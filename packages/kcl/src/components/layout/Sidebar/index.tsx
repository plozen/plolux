'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Home, Trophy, MessageSquare, PlusSquare, UserCircle, Menu, AtSign } from 'lucide-react';
import styles from './Sidebar.module.scss';
import classNames from 'classnames';
import { useState } from 'react';
import MoreDropdown from '../../common/Dropdown';

export default function Sidebar() {
  const t = useTranslations('Nav');
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'ko';
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  // MOCK: Assume logged in for profile development as requested
  const isLoggedIn = true;

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === `/${locale}` || pathname === `/${locale}/`;
    }
    return pathname?.startsWith(`/${locale}${path}`);
  };

  const navItems = [
    { label: t('home'), icon: Home, path: '/' },
    { label: t('report'), icon: MessageSquare, path: '/report' },
    // { label: t('ranking'), icon: Trophy, path: '/ranking' },
    // { label: '게시판', icon: MessageSquare, path: '/community' },
    // { label: '만들기', icon: PlusSquare, path: '#' },
    /*
    { 
      label: t('my'), 
      icon: UserCircle, 
      path: isLoggedIn ? '/profile' : '/login' 
    },
    */
  ];

  return (
    <aside className={styles.sidebar}>
      {/* Logo Area */}
      <div className={styles.logoArea}>
        <div className={styles.kclLogo}>KCL</div>
        <div className={styles.kclIconLogo}>K</div>
      </div>

      {/* Navigation */}
      <nav className={styles.nav}>
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={`/${locale}${item.path === '/' ? '' : item.path}`}
            className={classNames(styles.navItem, { [styles.active]: isActive(item.path) })}
          >
            <div className={styles.iconWrapper}>
              <item.icon className={styles.icon} />
            </div>
            <span className={styles.label}>{item.label}</span>
          </Link>
        ))}
        {/* <div className={styles.navItem}>
           <div className={styles.iconWrapper}>
              <PlusSquare className={styles.icon} />
            </div>
            <span className={styles.label}>만들기</span>
        </div> */}
      </nav>

      {/* Footer / More */}
      <div className={styles.footer} style={{ position: 'relative' }}>
        {/* <div className={styles.navItem}>
           <div className={styles.iconWrapper}>
              <AtSign className={styles.icon} />
           </div>
           <span className={styles.label}>Threads</span>
        </div> */}

        {/* More Menu Trigger */}
        <div
          className={classNames(styles.navItem, { [styles.active]: isMoreOpen })}
          onClick={() => setIsMoreOpen(!isMoreOpen)}
        >
          <div className={styles.iconWrapper}>
            <Menu className={styles.icon} />
          </div>
          <span className={styles.label}>더 보기</span>
        </div>

        {/* Dropdown Popup */}
        <MoreDropdown
          isOpen={isMoreOpen}
          onClose={() => setIsMoreOpen(false)}
          isLoggedIn={isLoggedIn}
        />
      </div>
    </aside>
  );
}
