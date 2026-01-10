/**
 * HomePage
 * 
 * KCL 메인 홈 페이지 컴포넌트
 * 회사 선택 및 투표 기능UI를 제공합니다.
 * 
 * 레이아웃 구조:
 * - 히어로 섹션: 타이틀 + 회사 선택기 + 투표 버튼
 * - 랭킹 바로가기 버튼
 * 
 * 참고: AppShell이 사이드바(Desktop)와 BottomNav(Mobile)를 처리하므로
 * 이 페이지에서는 헤더를 별도로 렌더링하지 않습니다.
 */

"use client";

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';
import { MOCK_COMPANIES } from '@/lib/mock-data';
import CompanySelector from '@/components/features/home/CompanySelector';
import VoteButton from '@/components/features/home/VoteButton';
import styles from './page.module.scss';

export default function HomePage() {
  const t = useTranslations('Home');
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1] || 'en';

  // 선택된 회사 ID 상태 관리
  const [selectedCompanyId, setSelectedCompanyId] = useState(MOCK_COMPANIES[0].id);

  // 선택된 회사 데이터 조회
  const selectedCompany = MOCK_COMPANIES.find(c => c.id === selectedCompanyId) || MOCK_COMPANIES[0];

  return (
    <div className={styles.homeContainer}>
      {/* 히어로 섹션 - 메인 투표 영역 */}
      <section className={styles.hero}>
        {/* 타이틀 */}
        <motion.div
          className={styles.heroTitle}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>KCL</h1>
          <p>Choose & Support Your Favorite</p>
        </motion.div>

        {/* 투표 섹션 */}
        <motion.div 
          className={styles.voteSection}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* 회사 선택 캐러셀 */}
          <CompanySelector 
            companies={MOCK_COMPANIES} 
            selectedCompanyId={selectedCompanyId} 
            onSelect={setSelectedCompanyId} 
          />

          {/* 투표 버튼 */}
          <VoteButton company={selectedCompany} />
        </motion.div>

        {/* 랭킹 페이지 이동 버튼 */}
        <motion.button
          className={styles.rankingButton}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => router.push(`/${currentLocale}/ranking`)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          View Full Ranking
        </motion.button>
      </section>
    </div>
  );
}
