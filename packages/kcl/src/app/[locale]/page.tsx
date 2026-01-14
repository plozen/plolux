/**
 * HomePage (리그 시스템)
 *
 * KCL 리그 시스템 메인 페이지
 * - 탭 기반 1부/2부 리그 전환
 * - 승강전 영역 (10위 vs 11위) 항상 표시
 * - 시즌 정보 헤더
 *
 * 레이아웃:
 * - Mobile: 세로 1열, 스와이프 탭
 * - Desktop: 사이드바 + 메인 콘텐츠
 */

'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MOCK_COMPANIES, CompanyType } from '@/lib/mock-data';
import type {
  LeagueTabType,
  CompanyRanking,
  SeasonInfo,
  PromotionBattle as PromotionBattleType,
} from '@/types/league';

// UI Components
import BottomSheet from '@/components/ui/BottomSheet';
import StickyPanel from '@/components/ui/StickyPanel';

// Feature Components
import VoteController from '@/components/features/VoteController';
import SeasonHeader from '@/components/features/league/SeasonHeader';
import LeagueTabs from '@/components/features/league/LeagueTabs';
import PromotionBattle from '@/components/features/league/PromotionBattle';
import PremierLeague from '@/components/features/league/PremierLeague';
import Challengers from '@/components/features/league/Challengers';

import styles from './page.module.scss';

/**
 * Mock 데이터를 CompanyRanking 형식으로 변환
 */
function transformToCompanyRanking(company: CompanyType, index: number): CompanyRanking {
  const rank = index + 1;
  return {
    companyId: company.id,
    companyName: company.name.en,
    nameKo: company.name.ko,
    nameEn: company.name.en,
    logoUrl: '',
    gradientColor: company.image,
    rank,
    previousRank: company.rank,
    rankChange: company.change === 'up' ? 1 : company.change === 'down' ? -1 : 0,
    voteCount: company.firepower,
    voteCountHourly: Math.floor(company.firepower * 0.01), // 시간당 1% 가정
    tier: rank <= 10 ? 'premier' : 'challengers',
    isRelegationZone: rank === 10,
    isPromotionZone: rank === 11,
    artists: company.representative,
  };
}

/**
 * 현재 시즌 정보 생성 (Mock)
 */
function getCurrentSeason(): SeasonInfo {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  // 월말까지 남은 일수 계산
  const lastDay = new Date(year, month, 0).getDate();
  const daysRemaining = lastDay - now.getDate();

  return {
    year,
    month,
    startDate: new Date(year, month - 1, 1).toISOString(),
    endDate: new Date(year, month, 0).toISOString(),
    daysRemaining,
    isActive: true,
  };
}

export default function HomePage() {
  // 탭 상태 (1부 리그 기본)
  const [activeTab, setActiveTab] = useState<LeagueTabType>('premier');

  // 선택된 회사 상태 (투표용)
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

  // 시즌 정보
  const season = useMemo(() => getCurrentSeason(), []);

  // 전체 소속사 순위 데이터 변환
  const allCompanies = useMemo(() => {
    return MOCK_COMPANIES.map(transformToCompanyRanking);
  }, []);

  // 1부 리그 (1-10위)
  const premierLeague = useMemo(() => {
    return allCompanies.filter((c) => c.rank <= 10);
  }, [allCompanies]);

  // 2부 리그 (11위~)
  const challengers = useMemo(() => {
    return allCompanies.filter((c) => c.rank > 10).slice(0, challengersLimit);
  }, [allCompanies, challengersLimit]);

  // 승강전 정보 (10위 vs 11위)
  const promotionBattle: PromotionBattleType | null = useMemo(() => {
    const rank10 = allCompanies.find((c) => c.rank === 10);
    const rank11 = allCompanies.find((c) => c.rank === 11);

    if (!rank10 || !rank11) return null;

    return {
      relegationCompany: rank10,
      promotionCompany: rank11,
      gap: rank10.voteCount - rank11.voteCount,
    };
  }, [allCompanies]);

  // 현재 1위 (리더)
  const leader = useMemo(() => {
    return allCompanies.find((c) => c.rank === 1) || null;
  }, [allCompanies]);

  // 투표 핸들러
  const handleVote = useCallback(
    (companyId: string) => {
      const company = MOCK_COMPANIES.find((c) => c.id === companyId);
      if (!company) return;

      setSelectedCompany(company);

      if (isMobile) {
        setIsSheetOpen(true);
      }
    },
    [isMobile],
  );

  // 투표 성공 핸들러
  const handleVoteSuccess = useCallback(() => {
    // 투표 성공 후 처리 (순위 업데이트 등)
  }, []);

  // 더 보기 핸들러
  const handleLoadMore = useCallback(() => {
    setChallengersLimit((prev) => prev + 10);
  }, []);

  // 더 불러올 데이터 있는지
  const hasMoreChallengers = useMemo(() => {
    const totalChallengers = allCompanies.filter((c) => c.rank > 10).length;
    return challengersLimit < totalChallengers;
  }, [allCompanies, challengersLimit]);

  return (
    <div className={styles.dashboardContainer}>
      {/* 시즌 헤더 */}
      <SeasonHeader season={season} leader={leader} />

      {/* 탭 네비게이션 */}
      <LeagueTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        premierCount={premierLeague.length}
        challengersCount={allCompanies.filter((c) => c.rank > 10).length}
      />

      {/* 승강전 영역 (항상 표시) */}
      {promotionBattle && <PromotionBattle battle={promotionBattle} onVote={handleVote} />}

      {/* 메인 레이아웃 */}
      <div className={styles.mainLayout}>
        {/* 탭 콘텐츠 */}
        <section className={styles.leagueSection}>
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

        {/* 우측 투표 패널 (데스크톱 전용) */}
        <aside className={styles.panelSection}>
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
