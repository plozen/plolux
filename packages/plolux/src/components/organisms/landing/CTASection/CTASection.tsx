import styles from './CTASection.module.scss';
import Link from 'next/link';

export default function CTASection() {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.content}`}>
        <h2>지금 당신의 비전을<br/>PLOLUX와 함께 실현하세요!</h2>
        <p>성공적인 비즈니스를 위한 첫 걸음, 전문가와 상담하세요.</p>
        <Link href="/contact" className={styles.button}>
            무료 견적 요청하기
        </Link>
      </div>
    </section>
  );
}
