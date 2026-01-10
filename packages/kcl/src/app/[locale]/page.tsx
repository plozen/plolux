"use client";

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';
import Header from '@/components/layout/Header';
import styles from './page.module.scss';

export default function HomePage() {
  const t = useTranslations('Home');
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1] || 'en';

  const [selectedCompanyId, setSelectedCompanyId] = useState(MOCK_COMPANIES[0].id);

  const selectedCompany = MOCK_COMPANIES.find(c => c.id === selectedCompanyId) || MOCK_COMPANIES[0];

  return (
    <div className={styles.homeContainer}>
      <Header />
      
      <section className={styles.hero} style={{ minHeight: 'calc(100vh - 60px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: '40px' }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center', marginBottom: '30px' }}
        >
          <h1 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--color-primary)' }}>KCL</h1>
          <p style={{ fontSize: '1rem', opacity: 0.8 }}>Choose & Support Your Favorite</p>
        </motion.div>

        <CompanySelector 
          companies={MOCK_COMPANIES} 
          selectedCompanyId={selectedCompanyId} 
          onSelect={setSelectedCompanyId} 
        />

        <div style={{ height: '40px' }} />

        <VoteButton company={selectedCompany} />

        <div style={{ height: '60px' }} />
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push(`/${currentLocale}/ranking`)}
          style={{
            padding: '12px 32px',
            fontSize: '1rem',
            fontWeight: '600',
            borderRadius: '30px',
            border: '1px solid rgba(255,255,255,0.2)',
            background: 'rgba(255,255,255,0.05)',
            color: 'var(--color-text)',
            cursor: 'pointer',
            backdropFilter: 'blur(10px)'
          }}
        >
          View Full Ranking
        </motion.button>
      </section>
    </div>
  );
}

import { useState } from 'react';
import { MOCK_COMPANIES } from '@/lib/mock-data';
import CompanySelector from '@/components/features/home/CompanySelector';
import VoteButton from '@/components/features/home/VoteButton';
