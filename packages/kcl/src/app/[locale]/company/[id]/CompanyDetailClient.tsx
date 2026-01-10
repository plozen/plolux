/**
 * CompanyDetailClient.tsx
 * 
 * 회사 상세 페이지 클라이언트 컴포넌트
 * 회사 정보, 파이어파워 트렌드, 분석 데이터, 댓글을 표시합니다.
 * 
 * 참고: Support(투표)는 홈 화면 전용 기능으로, 상세 페이지에서는 홈으로 유도합니다.
 */

"use client";

import { useTranslations } from 'next-intl';
import { ArrowLeft, TrendingUp, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Header from '@/components/layout/Header';
import { MOCK_COMPANIES, MOCK_VOTES } from '@/lib/mock-data';
import styles from './page.module.scss';
import CommentSection from '@/components/features/comments/CommentSection';
import Tabs from '@/components/common/Tabs';

// 차트 컴포넌트 동적 로딩 (SSR 비활성화)
const StockChart = dynamic(() => import('@/components/features/chart/StockChart'), { ssr: false });

interface CompanyDetailClientProps {
  locale: string;
  id: string;
}

export default function CompanyDetailClient({ locale, id }: CompanyDetailClientProps) {
  const t = useTranslations('Home');

  // 회사 데이터 조회
  const company = MOCK_COMPANIES.find(c => c.id === id);

  if (!company) {
    return <div>Company not found</div>;
  }

  // 로케일에 맞는 회사명 가져오기
  const targetName = company.name[locale as 'en' | 'ko'] || company.name['en'];
  
  // 페이지 전환 애니메이션 설정
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

      {/* 상세 페이지 헤더 (뒤로가기 + 제목) */}
      <div className={styles.header}>
        <Link href={`/${locale}/ranking`} className={styles.backBtn}>
          <ArrowLeft size={24} />
        </Link>
        <span className={styles.title}>{targetName}</span>
        <div style={{ width: 24 }} /> {/* 중앙 정렬을 위한 스페이서 */}
      </div>

      <main className={styles.content}>
        {/* 회사 정보 카드 */}
        <motion.div 
          className={styles.companyCard}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          style={{ background: company.image }}
        >
          <div className={styles.cardHeader}>
            <div className={styles.rankBadge}>No. {company.rank}</div>
            {/* 홈에서 서포트하기 링크 (Support 버튼 대체) */}
            <Link 
              href={`/${locale}`}
              className={styles.supportLink}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: '1px solid rgba(255,255,255,0.4)',
                borderRadius: '20px',
                padding: '6px 12px',
                display: 'flex', 
                alignItems: 'center', 
                gap: '6px',
                color: '#fff', 
                fontWeight: 'bold', 
                cursor: 'pointer',
                backdropFilter: 'blur(4px)',
                textDecoration: 'none',
                fontSize: '0.85rem'
              }}
            >
              <Home size={16} />
              홈에서 서포트
            </Link>
          </div>
          
          <div className={styles.firepower} style={{ marginBottom: '12px' }}>
             <TrendingUp size={16} />
             <span>{company.firepower.toLocaleString()}</span>
          </div>

          <h1 className={styles.companyName}>{targetName}</h1>
          <p className={styles.companyId}>K-Pop Entertainment</p>
        </motion.div>

        {/* 파이어파워 트렌드 차트 */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Firepower Trend</h2>
          {company.stockHistory && (
             <div style={{ width: '100%', height: '250px' }}>
                <StockChart data={company.stockHistory} color={company.image} />
             </div>
          )}
        </section>

        {/* 분석 탭 (그룹별, 레이블별, 상위 팬) */}
        <section className={styles.section}>
           <DataAnalysisTabs companyId={company.id} />
        </section>

        {/* 댓글 섹션 */}
        <section className={styles.section}>
          <CommentSection />
        </section>
      </main>
    </motion.div>
  );
}

/**
 * DataAnalysisTabs
 * 
 * 투표 데이터를 그룹별, 레이블별, 상위 팬별로 분석하여 탭 형태로 표시
 */
function DataAnalysisTabs({ companyId }: { companyId: string }) {
  // 해당 회사의 투표 데이터 필터링
  const votes = MOCK_VOTES.filter(v => v.companyId === companyId);
  const totalVotes = votes.length;

  if (totalVotes === 0) {
    return <div className={styles.emptyState}>No vote data available yet.</div>;
  }

  // 그룹별 통계 집계
  const groupStats = Object.entries(
    votes.reduce((acc, vote) => {
      acc[vote.groupId] = (acc[vote.groupId] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).sort((a, b) => b[1] - a[1]);

  // 레이블별 통계 집계
  const labelStats = Object.entries(
    votes.reduce((acc, vote) => {
      acc[vote.labelId] = (acc[vote.labelId] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).sort((a, b) => b[1] - a[1]);

  // 사용자별 통계 집계 (상위 5명)
  const userStats = Object.entries(
    votes.reduce((acc, vote) => {
      acc[vote.userId] = (acc[vote.userId] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).sort((a, b) => b[1] - a[1]).slice(0, 5);

  /**
   * 통계 리스트 렌더링 헬퍼
   */
  const renderList = (items: [string, number][]) => (
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

  // 탭 아이템 정의
  const tabItems = [
    {
      id: 'group',
      label: 'By Group',
      content: renderList(groupStats)
    },
    {
      id: 'label',
      label: 'By Label',
      content: renderList(labelStats)
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
