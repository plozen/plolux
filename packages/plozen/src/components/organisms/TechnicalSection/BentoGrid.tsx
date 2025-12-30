import React from 'react';
import { motion, Variants } from 'framer-motion';
import styles from './BentoGrid.module.scss';

/**
 * BentoGrid 컴포넌트의 Props 인터페이스
 * @property children - 그리드 내부에 배치될 자식 요소들
 */
interface BentoGridProps {
  children: React.ReactNode;
}

/**
 * 그리드 컨테이너의 애니메이션 변형 객체 (Variants)
 * 자식 요소들의 애니메이션을 순차적으로 실행(stagger)하도록 설정합니다.
 */
const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

/**
 * 개별 그리드 아이템의 애니메이션 변형 객체 (Variants)
 * 아래에서 위로 떠오르며 나타나는 효과를 정의합니다.
 */
const itemVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.5, 
      ease: "easeOut" 
    } 
  },
};

/**
 * BentoGrid 컴포넌트
 * 
 * 벤토(도시락) 격자 레이아웃을 구현하며, Framer Motion을 사용하여 
 * 자식 요소들이 순차적으로 나타나는 애니메이션을 제공합니다.
 */
export default function BentoGrid({ children }: BentoGridProps) {
  // BentoGrid가 모션 컨테이너(ul/div) 역할을 하며, 내부 아이템들의 애니메이션을 조율합니다.
  return (
    <motion.div 
      className={styles.grid}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
    >
      {React.Children.map(children, (child) => {
        const isWide = React.isValidElement(child) && (child.props as { isWide?: boolean }).isWide;
        return (
          <motion.div 
            variants={itemVariant} 
            className={isWide ? styles.wideWrapper : ''}
            style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
          >
            {child}
          </motion.div>
        );
      })}
    </motion.div>
  );
}
