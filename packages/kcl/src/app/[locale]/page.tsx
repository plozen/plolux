/**
 * HomePage (리그 시스템)
 *
 * KCL 리그 시스템 메인 페이지
 * - 탭 기반 1부/2부 리그 전환
 * - 시즌 대시보드 (1위 + 승강전 통합)
 * - 검색 기능
 *
 * 레이아웃:
 * - Mobile: 세로 1열, 스와이프 탭
 * - Desktop: 메인 콘텐츠 + 고정 Battle Station 패널
 *
 * @updated T1.10 - Mock → Supabase API 연동
 */

'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { CompanyType } from '@/lib/mock-data';
import type { LeagueTabType, PromotionBattle as PromotionBattleType } from '@/types/league';

// 데이터 Hooks
import { useLeagueData } from '@/hooks/useLeagueData';
import { dbCompanyToLegacy } from '@/lib/company-transform';
import type { CompaniesResponse } from '@/types/api';

// UI Components
import BottomSheet from '@/components/ui/BottomSheet';
import StickyPanel from '@/components/ui/StickyPanel';
import SearchBar from '@/components/ui/SearchBar';

// Feature Components
import VoteController from '@/components/features/VoteController';
import SeasonHeader from '@/components/features/league/SeasonHeader';
import LeagueTabs from '@/components/features/league/LeagueTabs';
import PremierLeague from '@/components/features/league/PremierLeague';
import Challengers from '@/components/features/league/Challengers';

import styles from './page.module.scss';

export default function HomePage() {
  // 탭 상태 (1부 리그 기본)
  const [activeTab, setActiveTab] = useState<LeagueTabType>('premier');

  // 선택된 회사 상태 (투표용) - 레거시 타입 유지
  const [selectedCompany, setSelectedCompany] = useState<CompanyType | null>(null);

  // BottomSheet 열림 상태 (모바일)
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Challengers 더 보기 상태
  const [challengersLimit, setChallengersLimit] = useState(10);

  // 화면 크기 감지
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 🔥 Supabase API에서 데이터 가져오기
  const {
    premierLeague,
    challengers: allChallengers,
    allCompanies,
    season,
    promotionBattle,
    leader,
    isLoading,
    error,
    refresh,
  } = useLeagueData({ refreshInterval: 30000 });

  // 2부 리그 페이지네이션
  const challengers = useMemo(() => {
    return allChallengers.slice(0, challengersLimit);
  }, [allChallengers, challengersLimit]);

  // 더 불러올 데이터 있는지
  const hasMoreChallengers = useMemo(() => {
    return challengersLimit < allChallengers.length;
  }, [allChallengers, challengersLimit]);

  // 투표 핸들러 - DB 데이터를 레거시 타입으로 변환
  const handleVote = useCallback(
    (companyId: string) => {
      // allCompanies에서 해당 회사 찾기
      const companyRanking = allCompanies.find((c) => c.companyId === companyId);
      if (!companyRanking) return;

      // CompanyRanking → CompanyType 변환
      const legacyCompany: CompanyType = {
        id: companyRanking.companyId,
        name: {
          en: companyRanking.nameEn,
          ko: companyRanking.nameKo,
        },
        representative: companyRanking.artists,
        firepower: companyRanking.voteCount,
        rank: companyRanking.rank,
        change:
          companyRanking.rankChange > 0 ? 'up' : companyRanking.rankChange < 0 ? 'down' : 'same',
        image: companyRanking.gradientColor.startsWith('linear-gradient')
          ? companyRanking.gradientColor
          : `linear-gradient(135deg, ${companyRanking.gradientColor} 0%, #1A1A1A 100%)`,
        stockHistory: [],
      };

      setSelectedCompany(legacyCompany);

      if (isMobile) {
        setIsSheetOpen(true);
      }
    },
    [allCompanies, isMobile],
  );

  // 투표 성공 핸들러 - 데이터 새로고침
  const handleVoteSuccess = useCallback(() => {
    refresh();
  }, [refresh]);

  // 더 보기 핸들러
  const handleLoadMore = useCallback(() => {
    setChallengersLimit((prev) => prev + 10);
  }, []);

  // 검색 결과 선택 핸들러
  const handleSearchSelect = useCallback(
    (companyId: string) => {
      handleVote(companyId);
    },
    [handleVote],
  );

  // 로딩 상태
  if (isLoading && allCompanies.length === 0) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner} />
        <p>Loading league data...</p>
      </div>
    );
  }

  // 에러 상태
  if (error && allCompanies.length === 0) {
    return (
      <div className={styles.errorContainer}>
        <p>Failed to load data</p>
        <button onClick={() => refresh()}>Retry</button>
      </div>
    );
  }

  return (
    <div className={styles.dashboardContainer}>
      {/* 메인 레이아웃 (Grid/Flex) */}
      <div className={styles.mainLayout}>
        {/* 좌측 콘텐츠 영역 (헤더 + 탭 + 리스트) */}
        <div className={styles.contentColumn}>
          {/* 시즌 대시보드 */}
          <SeasonHeader
            season={season}
            leader={leader}
            promotionBattle={promotionBattle}
            onVote={handleVote}
          />

          {/* 검색창 */}
          <div className={styles.searchSection}>
            <SearchBar onSelect={handleSearchSelect} />
          </div>

          {/* 탭 네비게이션 */}
          <LeagueTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            premierCount={premierLeague.length}
            challengersCount={allChallengers.length}
          />

          {/* 탭 콘텐츠 */}
          <section className={styles.leagueListSection}>
            <AnimatePresence mode="wait">
              {activeTab === 'premier' ? (
                <motion.div
                  key="premier"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                >
                  <PremierLeague companies={premierLeague} onVote={handleVote} />
                </motion.div>
              ) : (
                <motion.div
                  key="challengers"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <Challengers
                    companies={challengers}
                    onVote={handleVote}
                    onLoadMore={handleLoadMore}
                    hasMore={hasMoreChallengers}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        </div>

        {/* 우측 투표 패널 (데스크톱 전용) */}
        <aside className={styles.panelColumn}>
          <StickyPanel isVisible={true} title="Battle Station">
            <VoteController company={selectedCompany} onVoteSuccess={handleVoteSuccess} />
          </StickyPanel>
        </aside>
      </div>

      {/* 모바일 투표 BottomSheet */}
      <BottomSheet
        isOpen={isSheetOpen && isMobile}
        onClose={() => setIsSheetOpen(false)}
        heightRatio={0.55}
      >
        <VoteController company={selectedCompany} onVoteSuccess={handleVoteSuccess} />
      </BottomSheet>
    </div>
  );
}
