import React from 'react';
import { LucideIcon } from 'lucide-react';
import styles from './BentoItem.module.scss';

/**
 * BentoItem 컴포넌트의 Props 인터페이스
 * @property icon - 표시할 Lucide 아이콘 컴포넌트
 * @property title - 아이템 제목
 * @property description - 아이템 설명 텍스트
 * @property [isWide] - 가로로 2칸을 차지할지 여부 (기본값: false)
 * @property [isAccent] - 강조 색상(Bio Lime)을 적용할지 여부 (기본값: false)
 */
export interface BentoItemProps {
  icon: LucideIcon;
  title: string;
  description: string;
  isWide?: boolean;
  isAccent?: boolean;
}

/**
 * BentoItem 컴포넌트
 * 
 * BentoGrid 내부에 배치되는 개별 카드 아이템입니다.
 * 아이콘, 제목, 설명을 표시하며, `isWide` 속성을 통해 그리드 내 크기를 조절할 수 있습니다.
 */
const BentoItem: React.FC<BentoItemProps> = ({
  icon: Icon,
  title,
  description,
  isWide = false,
  isAccent = false,
}) => {
  return (
    <div 
      className={`
        ${styles.item} 
        ${isWide ? styles.wide : ''} 
        ${isAccent ? styles.accentCheck : ''}
      `}
    >
      <div className={`${styles.iconWrapper} ${isAccent ? styles.accent : ''}`}>
        <Icon size={32} aria-hidden="true" />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};

export default BentoItem;
