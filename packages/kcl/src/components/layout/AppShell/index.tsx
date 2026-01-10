"use client";

import { ReactNode } from 'react';
import styles from './AppShell.module.scss';
import Sidebar from '../Sidebar';
import BottomNav from '../BottomNav';

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className={styles.appContainer}>
      
      {/* Desktop Sidebar */}
      <div className={styles.sidebarWrapper}>
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <main className={styles.mainContent}>
        <div className={styles.contentInner}>
          {children}
        </div>

        {/* Legal Footer (Optional to include in main flow) */}
        <footer className={styles.legalFooter}>
          <p>© 2026 KCL. Unofficial Fan App.</p>
        </footer>
      </main>

      {/* Mobile Bottom Nav */}
      <div className={styles.bottomNavWrapper}>
        <BottomNav />
      </div>
    </div>
  );
}
