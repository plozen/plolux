"use client";

import { useTranslations } from 'next-intl';
import { ArrowLeft, TrendingUp, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Header from '@/components/layout/Header';
import { MOCK_COMPANIES, MOCK_VOTES } from '@/lib/mock-data';
import styles from './page.module.scss';
import { useState } from 'react';
import SupportModal from '@/components/features/vote/SupportModal';
import CommentSection from '@/components/features/comments/CommentSection';
import Tabs from '@/components/common/Tabs';

// Dynamically import Chart to avoid Hydration Mismatch with random data
const StockChart = dynamic(() => import('@/components/features/chart/StockChart'), { ssr: false });

interface CompanyDetailClientProps {
  locale: string;
  id: string;
}

export default function CompanyDetailClient({ locale, id }: CompanyDetailClientProps) {
  const t = useTranslations('Home');

  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const company = MOCK_COMPANIES.find(c => c.id === id);

  if (!company) {
    return <div>Company not found</div>; // Should be handled by parent or notFound in parent
  }

  const targetName = company.name[locale as 'en' | 'ko'] || company.name['en'];
  
  const pageVariants = {
    initial: { x: '100%' },
    animate: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
    exit: { x: '100%', transition: { duration: 0.2 } }
  } as const;

  return (
    <motion.div 
      className={styles.container}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Header />
      <div style={{ height: '120px' }} />

      {/* Detail Page Specific Header */}
      <div className={styles.header}>
        <Link href={`/${locale}/ranking`} className={styles.backBtn}>
          <ArrowLeft size={24} />
        </Link>
        <span className={styles.title}>{targetName}</span>
        <div style={{ width: 24 }} /> {/* Spacer for centering */}
      </div>

      <main className={styles.content}>
        {/* Company Header Card */}
        <motion.div 
          className={styles.companyCard}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          style={{ background: company.image }}
        >
          <div className={styles.cardHeader}>
            <div className={styles.rankBadge}>No. {company.rank}</div>
            {/* Support Button in Card */}
            <button 
              className={styles.supportBtn} 
              onClick={() => setIsModalOpen(true)}
              style={{
                 background: 'rgba(255,255,255,0.2)',
                 border: '1px solid rgba(255,255,255,0.4)',
                 borderRadius: '20px',
                 padding: '6px 12px',
                 display: 'flex', alignItems: 'center', gap: '6px',
                 color: '#fff', fontWeight: 'bold', cursor: 'pointer',
                 backdropFilter: 'blur(4px)'
              }}
            >
              <Zap size={16} fill="white" />
              Support
            </button>
          </div>
          
          <div className={styles.firepower} style={{ marginBottom: '12px' }}>
             <TrendingUp size={16} />
             <span>{company.firepower.toLocaleString()}</span>
          </div>

          <h1 className={styles.companyName}>{targetName}</h1>
          <p className={styles.companyId}>K-Pop Entertainment</p>
        </motion.div>

        {/* Stock Chart Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Firepower Trend</h2>
          {company.stockHistory && (
             <div style={{ width: '100%', height: '250px' }}>
                <StockChart data={company.stockHistory} color={company.image} />
             </div>
          )}
        </section>

        {/* Analysis Tabs Section */}
        <section className={styles.section}>
           <DataAnalysisTabs companyId={company.id} />
        </section>

        {/* Comment Section */}
        <section className={styles.section}>
          <CommentSection />
        </section>
      </main>

      <SupportModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        companyName={targetName}
        companyId={company.id}
        companyImage={company.image}
      />
    </motion.div>
  );
}

function DataAnalysisTabs({ companyId }: { companyId: string }) {
  // 1. Filter votes for this company
  const votes = MOCK_VOTES.filter(v => v.companyId === companyId);
  const totalVotes = votes.length;

  if (totalVotes === 0) {
    return <div className={styles.emptyState}>No vote data available yet.</div>;
  }

  // 2. Aggregate by Group
  const groupStats = Object.entries(
    votes.reduce((acc, vote) => {
      acc[vote.groupId] = (acc[vote.groupId] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).sort((a, b) => b[1] - a[1]);

  // 3. Aggregate by Label
  const labelStats = Object.entries(
    votes.reduce((acc, vote) => {
      acc[vote.labelId] = (acc[vote.labelId] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).sort((a, b) => b[1] - a[1]);

  // 4. Aggregate by User (Top voters)
  const userStats = Object.entries(
    votes.reduce((acc, vote) => {
      acc[vote.userId] = (acc[vote.userId] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).sort((a, b) => b[1] - a[1]).slice(0, 5); // Top 5 only

  // Render Helpers
  const renderList = (items: [string, number][], type: 'Group' | 'Label') => (
    <div className={styles.statList}>
      {items.map(([name, count], idx) => {
        const percent = ((count / totalVotes) * 100).toFixed(1);
        return (
          <div key={name} className={styles.statItem}>
            <div className={styles.statInfo}>
              <span className={styles.rank}>{idx + 1}</span>
              <span className={styles.name}>{name}</span>
            </div>
            <div className={styles.statValue}>
              <div className={styles.barBg}>
                <div className={styles.barFill} style={{ width: `${percent}%` }} />
              </div>
              <span className={styles.count}>{count} ({percent}%)</span>
            </div>
          </div>
        );
      })}
    </div>
  );

  const tabItems = [
    {
      id: 'group',
      label: 'By Group',
      content: renderList(groupStats, 'Group')
    },
    {
      id: 'label',
      label: 'By Label',
      content: renderList(labelStats, 'Label')
    },
    {
      id: 'user',
      label: 'Top Fans',
      content: (
        <div className={styles.statList}>
          {userStats.map(([userId, count], idx) => (
             <div key={userId} className={styles.statItem} style={{ justifyContent: 'space-between' }}>
               <div className={styles.statInfo}>
                 <span className={styles.rank}>{idx + 1}</span>
                 <span className={styles.name}>{userId}</span>
               </div>
               <span className={styles.count}>{count} votes</span>
             </div>
          ))}
        </div>
      )
    }
  ];

  return <Tabs items={tabItems} />;
}
