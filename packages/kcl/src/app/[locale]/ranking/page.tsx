"use client";

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import RankingItem from '@/components/features/ranking/RankingItem';
import { MOCK_COMPANIES } from '@/lib/mock-data';
import styles from '../page.module.scss';
import { Bell } from 'lucide-react';

export default function RankingPage() {
  const t = useTranslations('Home');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<CompanyType | null>(null);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className={styles.homeContainer}>
      <Header />
      {/* Fixed Header Spacer */}
      <div style={{ height: '180px' }} />
      
      <section className={styles.ranking} style={{ paddingTop: '220px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', padding: '0 4px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>{t('ranking')}</h3>
          <Bell size={20} color="var(--color-text-dim)" />
        </div>
        
        <motion.ul
          className={styles.list}
          variants={container}
          initial="hidden"
          animate="show"
        >
          {MOCK_COMPANIES.map((company, index) => (
            <RankingItem 
              key={company.id} 
              item={company} 
              index={index} 
              onSupport={() => {
                setSelectedCompany(company);
                setIsModalOpen(true);
              }}
            />
          ))}
        </motion.ul>
      </section>

      {selectedCompany && (
        <SupportModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          companyName={selectedCompany.name['en']} // Temporary default to EN or use locale logic if needed
          companyId={selectedCompany.id}
          companyImage={selectedCompany.image}
        />
      )}
    </div>
  );
}

import { useState } from 'react';
import SupportModal from '@/components/features/vote/SupportModal';
import { CompanyType } from '@/lib/mock-data';
