"use client";

import { useState, useRef, useEffect } from 'react';
import styles from './Dropdown.module.scss';
import { Settings, Activity, Bookmark, Moon, Sun, AlertCircle } from 'lucide-react';
import { useTheme } from 'next-themes';

interface DropdownProps {
  isOpen: boolean;
  onClose: () => void;
  // Mock auth state passing
  isLoggedIn: boolean;
}

export default function MoreDropdown({ isOpen, onClose, isLoggedIn }: DropdownProps) {
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
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.popoverContent} ref={dropdownRef} style={{position: 'absolute', bottom: '60px', left: '12px', zIndex: 1100}}>
      <div className={styles.menuItem}>
        <Settings className={styles.itemIcon} />
        <span>설정</span>
      </div>
      <div className={styles.menuItem}>
        <Activity className={styles.itemIcon} />
        <span>내 활동</span>
      </div>
      <div className={styles.menuItem}>
        <Bookmark className={styles.itemIcon} />
        <span>저장됨</span>
      </div>
      
      <div 
        className={styles.menuItem}
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        {theme === 'dark' ? <Moon className={styles.itemIcon} /> : <Sun className={styles.itemIcon} />}
        <span>모드 전환</span>
      </div>
      
      <div className={styles.menuItem}>
        <AlertCircle className={styles.itemIcon} />
        <span>문제 신고</span>
      </div>
      
      <div className={styles.divider}></div>
      
      {/* Dynamic Auth Item */}
      {isLoggedIn ? (
        <div className={styles.menuItem}>
           <span>계정 전환</span>
        </div>
      ): null}
      
      <div className={styles.menuItem}>
        <span style={{color: isLoggedIn ? '#ED4956' : '#0095f6', fontWeight: 600}}>
          {isLoggedIn ? '로그아웃' : '로그인'}
        </span>
      </div>
    </div>
  );
}
