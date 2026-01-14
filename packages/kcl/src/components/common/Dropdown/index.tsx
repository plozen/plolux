'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './Dropdown.module.scss';
import { Settings, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';

interface DropdownProps {
  isOpen: boolean;
  onClose: () => void;
  // Mock auth state passing
  isLoggedIn: boolean;
}

export default function MoreDropdown({ isOpen, onClose, isLoggedIn }: DropdownProps) {
  const t = useTranslations('Nav');
  const { theme, setTheme } = useTheme();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={styles.popoverContent}
      ref={dropdownRef}
      style={{ position: 'absolute', bottom: '60px', left: '12px', zIndex: 1100 }}
    >
      <div className={styles.menuItem}>
        <Settings className={styles.itemIcon} />
        <span>{t('settings')}</span>
      </div>

      <div
        className={styles.menuItem}
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        {theme === 'dark' ? (
          <Moon className={styles.itemIcon} />
        ) : (
          <Sun className={styles.itemIcon} />
        )}
        <span>{t('mode_switch')}</span>
      </div>

      <div className={styles.divider}></div>

      {/* Dynamic Auth Item */}
      {isLoggedIn ? (
        <div className={styles.menuItem}>
          <span>{t('switch_account')}</span>
        </div>
      ) : null}

      <div className={styles.menuItem}>
        <span style={{ color: isLoggedIn ? '#ED4956' : '#0095f6', fontWeight: 600 }}>
          {isLoggedIn ? t('logout') : t('login')}
        </span>
      </div>
    </div>
  );
}
