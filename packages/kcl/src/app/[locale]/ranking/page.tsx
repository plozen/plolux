/**
 * RankingPage
 * 
 * 랭킹 페이지 컴포넌트
 * 리그별 회사 순위를 탭 형태로 표시합니다.
 * 
 * 기능:
 * - 1st League / 2nd League 탭 전환
 * - 회사 순위 목록 표시
 * - 서포트 모달 (투표)
 */

"use client";

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Bell } from 'lucide-react';
import RankingItem from '@/components/features/ranking/RankingItem';
import { MOCK_COMPANIES, CompanyType } from '@/lib/mock-data';
import Tabs from '@/components/common/Tabs';
import SupportModal from '@/components/features/vote/SupportModal';
import styles from './page.module.scss';

export default function RankingPage() {
  const t = useTranslations('Home');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<CompanyType | null>(null);

  // 애니메이션 설정
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  /**
   * 랭킹 리스트 컴포넌트
   * @param items - 표시할 회사 목록
   */
  const RankingList = ({ items }: { items: CompanyType[] }) => (
    <motion.ul
      className={styles.rankingList}
      variants={container}
      initial="hidden"
      animate="show"
    >
      {items.map((company) => (
        <RankingItem 
          key={company.id} 
          item={company} 
          index={company.rank - 1}
          onSupport={() => {
            setSelectedCompany(company);
            setIsModalOpen(true);
          }}
        />
      ))}
    </motion.ul>
  );

  // 리그별 회사 분류 (1~10위: 1리그, 11위~: 2리그)
  const league1 = MOCK_COMPANIES.slice(0, 10);
  const league2 = MOCK_COMPANIES.slice(10);

  // 탭 아이템 정의
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
    <div className={styles.rankingContainer}>
      {/* 페이지 헤더 */}
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>{t('ranking')}</h1>
        <button className={styles.notificationButton} aria-label="Notifications">
          <Bell size={20} />
        </button>
      </header>
      
      {/* 리그 탭 */}
      <Tabs items={tabItems} defaultTab='league-1' />

      {/* 서포트 모달 */}
      {selectedCompany && (
        <SupportModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          companyName={selectedCompany.name['en']}
          companyId={selectedCompany.id}
          companyImage={selectedCompany.image}
        />
      )}
    </div>
  );
}
