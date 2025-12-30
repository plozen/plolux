"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./HeroSection.module.scss";
import SparkGrid from "./SparkGrid";

/**
 * SVG 그라데이션 정의를 위한 헬퍼 컴포넌트입니다.
 * 현재는 코드 내에서 직접 사용되지 않으나, 추후 스파크 효과 확장을 위해 유지합니다.
 */
const SparkIcon = () => (
  <svg width="0" height="0">
    <defs>
      <linearGradient id="sparkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#D6FF00" stopOpacity="1" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

/**
 * 메인 랜딩 페이지의 최상단 히어로 섹션 컴포넌트입니다.
 * 
 * 주요 기능:
 * - SparkGrid를 배경으로 사용하여 역동적인 시각 효과 제공
 * - Framer Motion을 활용한 텍스트 및 버튼 등장 애니메이션
 * - "프로젝트 시작하기" CTA 버튼을 포함하여 사용자 전환 유도
 * 
 * 구조:
 * - section.hero: 전체 컨테이너 (위치 및 배경 설정)
 * - SparkGrid: 배경 애니메이션 캔버스
 * - div.content: 중앙 정렬된 텍스트 및 버튼 콘텐츠
 */
export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <SparkGrid className={styles.backgroundCanvas} />
      {/* 배경 애니메이션 컴포넌트 */}

      <div className={styles.content}>
        <motion.h2 
          className={styles.slogan}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          The Reality Engine
        </motion.h2>

        <motion.h1 
          className={styles.title}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
        >
          GENERATE<br />
          YOUR <span className={styles.highlight}>PLOT</span>
        </motion.h1>

        <motion.div
           className={styles.ctaWrapper}
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 1.0, duration: 0.8 }}
        >
          <Link href="/contact?tab=project" className={styles.ctaButton}>
            프로젝트 시작하기
          </Link>
        </motion.div>
      </div>

      {/* 추후 확장 시 오버레이 애니메이션 추가 위치 */}
    </section>
  );
}
