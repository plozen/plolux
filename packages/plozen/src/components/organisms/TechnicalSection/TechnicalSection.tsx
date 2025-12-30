"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Github, Globe, Layers, ShieldCheck } from 'lucide-react';
import styles from './TechnicalSection.module.scss';
import BentoGrid from './BentoGrid';
import BentoItem from './BentoItem';

/**
 * TechnicalSection 컴포넌트
 * 
 * "Why PLOZEN?" 섹션을 담당하며, 기술적 장점을 BentoGrid 레이아웃으로 시각화하여 보여줍니다.
 * 스크롤 시 텍스트와 그리드 아이템들이 애니메이션과 함께 등장합니다.
 */
export default function TechnicalSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <motion.h2 
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Why PLOZEN?
          </motion.h2>
          <motion.p 
            className={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            우리는 '툴'을 쓰지 않습니다.<br className={styles.desktopOnly} />
            개발자가 짠 '진짜 코드'를 드립니다.
          </motion.p>
        </div>

        <BentoGrid>
          {/* Row 1: Span 2 + Span 1 */}
          <BentoItem
            icon={Github}
            title="100% 소스 코드 소유권 제공"
            description="매달 내는 구독료나 벤더 락인(Vendor Lock-in)이 없습니다. 완성된 Next.js 소스 코드가 담긴 GitHub Repository를 귀하에게 그대로 양도합니다."
            isWide={true}
            isAccent={true}
          />
          <BentoItem
            icon={Globe}
            title="글로벌 CDN 배포"
            description="AWS & CloudFlare 엣지 네트워크를 통해 전 세계 어디서든 0.1초 로딩 속도를 보장합니다."
          />

          {/* Row 2: Span 1 + Span 2 */}
          <BentoItem
            icon={Layers}
            title="글로벌 개발 표준"
            description="Next.js, TypeScript 등 전 세계 개발자들이 사용하는 표준 스택을 준수합니다."
          />
          <BentoItem
            icon={ShieldCheck}
            title="엔터프라이즈급 보안"
            description="Supabase의 RLS(Row Level Security) 정책과 SSL/HTTPS 암호화가 기본 적용됩니다."
            isWide={true}
          />
        </BentoGrid>
      </div>
    </section>
  );
}
