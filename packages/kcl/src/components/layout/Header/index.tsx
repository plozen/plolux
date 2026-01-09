"use client";

import { useTheme } from 'next-themes';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Moon, Sun, Languages } from 'lucide-react';
import Button from '@/components/common/Button';
import styles from './Header.module.scss';


export default function Header() {
  const { theme, setTheme } = useTheme();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();


  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const changeLang = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>KCL</h1>
      
      <div className={styles.controls}>
        <select 
          value={locale} 
          onChange={changeLang} 
          className={styles.langSelect}
        >
          <option value="ko">한국어</option>
          <option value="en">English</option>
          <option value="id">Bahasa Indonesia</option>
          <option value="tr">Türkçe</option>
          <option value="ja">日本語</option>
          <option value="zh">中文(简体)</option>
          <option value="es">Español</option>
          <option value="pt">Português</option>
          <option value="th">ภาษาไทย</option>
          <option value="vi">Tiếng Việt</option>
          <option value="fr">Français</option>
          <option value="de">Deutsch</option>
        </select>
        <Button variant="ghost" size="sm" onClick={toggleTheme} className={styles.iconBtn}>
          <Sun size={20} className={styles.sunIcon} />
          <Moon size={20} className={styles.moonIcon} />
        </Button>
      </div>
    </header>
  );
}
