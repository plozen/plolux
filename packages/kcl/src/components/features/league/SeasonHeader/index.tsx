/**
 * SeasonHeader
 *
 * 시즌 정보 헤더 컴포넌트
 * - 현재 시즌 (2026년 1월 시즌)
 * - D-day 카운트다운
 * - 현재 1위 소속사 표시
 * - 실시간 업데이트 인디케이터
 */

'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Trophy, RefreshCw, Flame } from 'lucide-react';
import type { SeasonInfo, CompanyRanking } from '@/types/league';
import styles from './SeasonHeader.module.scss';

interface SeasonHeaderProps {
  /** 시즌 정보 */
  season: SeasonInfo;
  /** 현재 1위 소속사 */
  leader: CompanyRanking | null;
}

export default function SeasonHeader({ season, leader }: SeasonHeaderProps) {
  const t = useTranslations('League.season');

  /** D-day 표시 포맷 */
  const formatDaysRemaining = () => {
    if (season.daysRemaining === 0) {
      return t('ends_today');
    }
    return t('days_remaining', { days: season.daysRemaining });
  };

  return (
    <header className={styles.seasonHeader}>
      <div className={styles.seasonInfo}>
        {/* 시즌 타이틀 */}
        <div className={styles.seasonTitle}>
          <Trophy className={styles.trophyIcon} size={20} />
          <h1>{t('title', { year: season.year, month: season.month })}</h1>
        </div>

        {/* D-day 카운트다운 */}
        <motion.div
          className={styles.daysRemaining}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className={season.daysRemaining <= 3 ? styles.urgent : ''}>
            {formatDaysRemaining()}
          </span>
        </motion.div>
      </div>

      {/* 현재 1위 표시 */}
      {leader && (
        <motion.div
          className={styles.leaderInfo}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <span className={styles.leaderLabel}>{t('current_leader')}</span>
          <div className={styles.leaderCompany}>
            <div className={styles.companyLogo} style={{ background: leader.gradientColor }}>
              {leader.nameEn.charAt(0)}
            </div>
            <div className={styles.companyDetails}>
              <span className={styles.companyName}>{leader.nameEn}</span>
              <span className={styles.voteCount}>
                <Flame size={12} />
                {leader.voteCount.toLocaleString()}
              </span>
            </div>
          </div>
        </motion.div>
      )}

      {/* 실시간 업데이트 인디케이터 */}
      <div className={styles.realtimeIndicator}>
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
        >
          <RefreshCw size={14} />
        </motion.span>
        <span>{t('realtime')}</span>
      </div>
    </header>
  );
}
