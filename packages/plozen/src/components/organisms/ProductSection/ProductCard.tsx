import React from 'react';
import { Check } from 'lucide-react';
import styles from './ProductCard.module.scss';

/**
 * ProductCard 컴포넌트의 Props 인터페이스
 * @property theme - 카드 테마 스타일 ('standard' | 'enterprise')
 * @property badge - 카드 상단에 표시될 배지 텍스트
 * @property title - 상품 제목
 * @property [subtitle] - 상품 부제목 (선택 사항)
 * @property description - 상품 설명
 * @property features - 상품 특징 목록 (문자열 배열)
 * @property buttonText - 버튼 텍스트
 */
export interface ProductCardProps {
  theme: 'standard' | 'enterprise';
  badge: string;
  title: string;
  subtitle?: string;
  description: string;
  features: string[];
  buttonText: string;
}

/**
 * ProductCard 컴포넌트
 * 
 * 제품 소개 섹션에서 사용되는 개별 카드 컴포넌트입니다.
 * 테마에 따라 스타일이 달라지며, 특징 목록을 체크리스트 형태로 보여줍니다.
 */
const ProductCard: React.FC<ProductCardProps> = ({
  theme,
  badge,
  title,
  subtitle,
  description,
  features,
  buttonText,
}) => {
  const isEnterprise = theme === 'enterprise';
  const themeClass = isEnterprise ? styles.themeEnterprise : styles.themeStandard;
  const iconClass = isEnterprise ? styles.enterpriseIcon : styles.standardIcon;
  const buttonClass = isEnterprise ? styles.solid : styles.outline;

  return (
    <div className={`${styles.card} ${themeClass}`}>
      <span className={`${styles.badge} ${themeClass}`}>
        {badge}
      </span>
      <h3 className={styles.title}>
        {title}
        {subtitle && <span className={styles.titleEngine}>{subtitle}</span>}
      </h3>
      <p className={styles.description}>{description}</p>
      
      <div className={styles.separator} />
      
      <ul className={styles.features}>
        {features.map((feature, index) => (
          <li key={index} className={`${styles.featureItem} ${iconClass}`}>
            <Check size={20} strokeWidth={3} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <button className={`${styles.button} ${buttonClass}`}>
        {buttonText}
      </button>
    </div>
  );
};

export default ProductCard;
