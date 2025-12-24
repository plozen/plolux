"use client";

import Link from 'next/link';
import styles from './HeroSection.module.scss';
import CodeRainBackground from '@/components/atoms/CodeRainBackground/CodeRainBackground';

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.bg}>
          {/* Replaced Lottie with CodeRainBackground */}
          <CodeRainBackground color="#00FFC2" fontSize={16} speed={50} />
      </div>
      <div className={`container ${styles.content}`}>
        <h1 className={styles.title}>
          기술과 감성으로 완성하는<br />
          당신의 웹사이트
        </h1>
        <p className={styles.subtitle}>
          PLOLUX는 브랜드의 가치를 높이는<br className="mobile-only" /> 프리미엄 웹 에이전시입니다.
        </p>
        <div className={styles.actions}>
            <Link href="/contact" className={styles.ctaButton}>
                프로젝트 시작하기
            </Link>
        </div>
      </div>
    </section>
  );
}
