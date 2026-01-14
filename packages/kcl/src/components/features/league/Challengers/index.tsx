/**
 * Challengers
 *
 * 2부 리그 탭 콘텐츠 컴포넌트
 * - 11위 승격 기회 강조 (별도 카드)
 * - 12위~ 리스트
 * - 더 보기 버튼 (페이지네이션)
 */

'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Flame, ArrowUp, ChevronDown } from 'lucide-react';
import type { CompanyRanking } from '@/types/league';
import LeagueRankingItem from '../LeagueRankingItem';
import styles from './Challengers.module.scss';

interface ChallengersProps {
  /** 2부 리그 소속사들 (11위~) */
  companies: CompanyRanking[];
  /** 투표 핸들러 */
  onVote: (companyId: string) => void;
  /** 더 보기 핸들러 */
  onLoadMore: () => void;
  /** 더 불러올 데이터 있는지 */
  hasMore: boolean;
}

export default function Challengers({ companies, onVote, onLoadMore, hasMore }: ChallengersProps) {
  const t = useTranslations('League.challengers');

  // 11위 (승격 기회)
  const rank11 = companies.find((c) => c.rank === 11);
  // 12위 이하
  const restCompanies = companies.filter((c) => c.rank > 11);

  return (
    <section className={styles.challengers}>
      {/* 섹션 헤더 */}
      <header className={styles.header}>
        <Flame className={styles.icon} size={20} />
        <div className={styles.titleGroup}>
          <h2 className={styles.title}>{t('title')}</h2>
          <span className={styles.subtitle}>{t('subtitle')}</span>
        </div>
      </header>

      {/* 11위 (승격 기회) 강조 */}
      {rank11 && (
        <motion.div
          className={styles.promotionZone}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className={styles.promotionHeader}>
            <ArrowUp size={16} className={styles.promotionIcon} />
            <span className={styles.promotionLabel}>{t('promotion_zone')}</span>
          </div>

          <div className={styles.promotionCard}>
            <div className={styles.logo} style={{ background: rank11.gradientColor }}>
              {rank11.nameEn.charAt(0)}
            </div>
            <div className={styles.info}>
              <h3 className={styles.companyName}>{rank11.nameEn}</h3>
              <div className={styles.voteCount}>
                <Flame size={14} />
                <span>{rank11.voteCount.toLocaleString()}</span>
              </div>
            </div>
            <button className={styles.voteButton} onClick={() => onVote(rank11.companyId)}>
              투표하기
            </button>
          </div>

          <p className={styles.promotionMessage}>
            {t('votes_to_promotion', {
              count: (companies[0]?.voteCount || 0) - rank11.voteCount,
            })}{' '}
            {t('promotion_cta')}
          </p>
        </motion.div>
      )}

      {/* 12위~ 리스트 */}
      <motion.div
        className={styles.rankingList}
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: { staggerChildren: 0.05, delayChildren: 0.2 },
          },
        }}
      >
        {restCompanies.map((company) => (
          <motion.div
            key={company.companyId}
            variants={{
              hidden: { opacity: 0, y: 10 },
              show: { opacity: 1, y: 0 },
            }}
          >
            <LeagueRankingItem company={company} onVote={onVote} />
          </motion.div>
        ))}
      </motion.div>

      {/* 더 보기 버튼 */}
      {hasMore && (
        <motion.button
          className={styles.loadMoreButton}
          onClick={onLoadMore}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>{t('show_more')}</span>
          <ChevronDown size={18} />
        </motion.button>
      )}
    </section>
  );
}
