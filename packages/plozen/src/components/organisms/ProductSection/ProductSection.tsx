"use client";

import React from 'react';
import { motion } from 'framer-motion'; 
import styles from './ProductSection.module.scss';
import ProductCard, { ProductCardProps } from './ProductCard';

/**
 * 표시할 제품 데이터 목록
 */
const products: ProductCardProps[] = [
  {
    theme: 'standard',
    badge: 'Best for Startups',
    title: '소개형 웹사이트',
    subtitle: 'Static Engine',
    description: '포트폴리오, 랜딩페이지, 기업 소개 등 정보 전달에 최적화된 가장 빠른 웹사이트입니다.',
    features: [
      '서버 유지비 평생 0원 (Serverless)',
      '압도적인 속도 (Global CDN)',
      '네이버/구글 SEO 완벽 최적화'
    ],
    buttonText: '스탠다드 구축 문의'
  },
  {
    theme: 'enterprise',
    badge: 'For Business',
    title: '비즈니스 플랫폼',
    subtitle: 'Dynamic Engine',
    description: '쇼핑몰, 예약, SaaS 등 복잡한 기능과 데이터 관리가 필요한 비즈니스 솔루션입니다.',
    features: [
      '회원가입 / 로그인 / 결제 기능',
      '전용 관리자(Admin) 대시보드 제공',
      'AWS 기반의 무제한 트래픽 확장'
    ],
    buttonText: '엔터프라이즈 구축 문의'
  }
];

/**
 * ProductSection 컴포넌트
 * 
 * "Choose Your Engine" 섹션을 담당하며, 제공하는 두 가지 주요 제품(Standard, Enterprise)을
 * 카드로 비교하여 보여줍니다.
 */
export default function ProductSection() {
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
            Choose Your Engine
          </motion.h2>
          <motion.p 
            className={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            가벼운 시작부터 거대한 플랫폼까지,<br />
            비즈니스 규모에 맞춰 선택하세요.
          </motion.p>
        </div>

        <div className={styles.grid}>
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
            >
              <ProductCard {...product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
