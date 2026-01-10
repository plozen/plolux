"use client";

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import RankingItem from '@/components/features/ranking/RankingItem';
import { MOCK_COMPANIES, CompanyType } from '@/lib/mock-data';
import styles from '../page.module.scss';
import { Bell } from 'lucide-react';
import Tabs from '@/components/common/Tabs';
import SupportModal from '@/components/features/vote/SupportModal';

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

  const RankingList = ({ items }: { items: CompanyType[] }) => (
    <motion.ul
      className={styles.list}
      variants={container}
      initial="hidden"
      animate="show"
    >
      {items.map((company, index) => (
        <RankingItem 
          key={company.id} 
          item={company} 
          index={company.rank - 1} // Rank is 1-based in data
          onSupport={() => {
            setSelectedCompany(company);
            setIsModalOpen(true);
          }}
        />
      ))}
    </motion.ul>
  );

  // Split leagues (Simple logic: first 10 are League 1, rest are League 2)
  const league1 = MOCK_COMPANIES.slice(0, 10);
  const league2 = MOCK_COMPANIES.slice(10);

  const tabItems = [
    {
      id: 'league-1',
      label: '1st League',
      content: <RankingList items={league1} />
    },
    {
      id: 'league-2',
      label: '2nd League',
      content: <RankingList items={league2} />
    }
  ];

  return (
    <div className={styles.homeContainer}>
      <Header />
      
      <section className={styles.ranking} style={{ minHeight: '100vh', paddingTop: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', padding: '0 4px', alignItems: 'center' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '800' }}>{t('ranking')}</h3>
          <button style={{ 
            padding: '8px', 
            borderRadius: '50%', 
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)' 
          }}>
            <Bell size={20} color="var(--color-text-dim)" />
          </button>
        </div>
        
        <Tabs items={tabItems} defaultTab='league-1' />
      </section>

      {selectedCompany && (
        <SupportModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          companyName={selectedCompany.name['en']} // Localization logic can be improved
          companyId={selectedCompany.id}
          companyImage={selectedCompany.image}
        />
      )}
    </div>
  );
}
