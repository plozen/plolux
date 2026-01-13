/**
 * HomePage (Dashboard)
 *
 * KCL 통합 대시보드 페이지
 * 투표와 순위 확인이 한 곳에서 이루어지는 단일 페이지입니다.
 *
 * 레이아웃:
 * - Mobile: 랭킹 리스트 + BottomSheet(투표)
 * - Desktop: 랭킹 리스트(좌측 60-70%) + StickyPanel(우측 30-40%)
 *
 * 기능:
 * - Sticky Search Bar (아티스트/소속사 통합 검색)
 * - Split Action UI (리스트 본문=투표 / Chevron=상세)
 * - Auto-Scroll & Highlight (검색 시)
 * - 반응형 투표 인터페이스
 */

'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { MOCK_COMPANIES, CompanyType } from '@/lib/mock-data';

// UI Components
import SearchBar from '@/components/ui/SearchBar';
import BottomSheet from '@/components/ui/BottomSheet';
import StickyPanel from '@/components/ui/StickyPanel';

// Feature Components
import VoteController from '@/components/features/VoteController';
import DashboardRankingItem from '@/components/features/dashboard/DashboardRankingItem';

import styles from './page.module.scss';

export default function HomePage() {
  const t = useTranslations('Home');

  // 선택된 회사 상태
  const [selectedCompany, setSelectedCompany] = useState<CompanyType | null>(null);
  // 검색에서 선택된 아티스트
  const [selectedArtist, setSelectedArtist] = useState<string | undefined>(undefined);
  // BottomSheet 열림 상태 (모바일)
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  // 하이라이트된 회사 ID
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  // 최근 투표된 회사 ID
  const [votedId, setVotedId] = useState<string | null>(null);

  // 아이템 ref 맵 (auto-scroll용)
  const itemRefs = useRef<Map<string, HTMLLIElement>>(new Map());

  // 화면 크기 감지 (모바일 vs 데스크톱)
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 검색 결과 선택 핸들러
  const handleSearchSelect = useCallback(
    (companyId: string, artistName?: string) => {
      const company = MOCK_COMPANIES.find((c) => c.id === companyId);
      if (!company) return;

      // 회사 선택 및 아티스트 컨텍스트 설정
      setSelectedCompany(company);
      setSelectedArtist(artistName);

      // Auto-scroll to item
      const itemEl = itemRefs.current.get(companyId);
      if (itemEl) {
        itemEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      // 하이라이트 효과
      setHighlightedId(companyId);
      setTimeout(() => setHighlightedId(null), 2000);

      // 모바일에서는 BottomSheet 자동 오픈
      if (isMobile) {
        setIsSheetOpen(true);
      }
    },
    [isMobile],
  );

  // 랭킹 아이템 선택 핸들러 (투표 패널 오픈)
  const handleItemSelect = useCallback(
    (company: CompanyType) => {
      setSelectedCompany(company);
      setSelectedArtist(undefined); // 아티스트 컨텍스트 리셋

      // 모바일에서는 BottomSheet 오픈
      if (isMobile) {
        setIsSheetOpen(true);
      }
    },
    [isMobile],
  );

  // 투표 성공 핸들러
  const handleVoteSuccess = useCallback((companyId: string) => {
    setVotedId(companyId);
    setTimeout(() => setVotedId(null), 1500);
  }, []);

  // ref 등록 콜백
  const setItemRef = useCallback((id: string, el: HTMLLIElement | null) => {
    if (el) {
      itemRefs.current.set(id, el);
    } else {
      itemRefs.current.delete(id);
    }
  }, []);

  return (
    <div className={styles.dashboardContainer}>
      {/* Sticky Search Bar */}
      <header className={styles.searchHeader}>
        <SearchBar onSelect={handleSearchSelect} placeholder={t('search_placeholder')} />
      </header>

      {/* Main Content Area */}
      <div className={styles.mainLayout}>
        {/* 랭킹 리스트 (좌측/전체) */}
        <section className={styles.rankingSection}>
          <h2 className={styles.sectionTitle}>{t('ranking')}</h2>

          <motion.ul
            className={styles.rankingList}
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.05 },
              },
            }}
          >
            {MOCK_COMPANIES.map((company, index) => (
              <DashboardRankingItem
                key={company.id}
                ref={(el) => setItemRef(company.id, el)}
                item={company}
                index={index}
                onSelect={handleItemSelect}
                isHighlighted={highlightedId === company.id}
                isVoted={votedId === company.id}
              />
            ))}
          </motion.ul>
        </section>

        {/* 우측 투표 패널 (데스크톱 전용) */}
        <aside className={styles.panelSection}>
          <StickyPanel isVisible={true} title="Battle Station">
            <VoteController
              company={selectedCompany}
              selectedArtist={selectedArtist}
              onVoteSuccess={handleVoteSuccess}
            />
          </StickyPanel>
        </aside>
      </div>

      {/* 모바일 투표 BottomSheet */}
      <BottomSheet
        isOpen={isSheetOpen && isMobile}
        onClose={() => setIsSheetOpen(false)}
        heightRatio={0.55}
      >
        <VoteController
          company={selectedCompany}
          selectedArtist={selectedArtist}
          onVoteSuccess={handleVoteSuccess}
        />
      </BottomSheet>
    </div>
  );
}
