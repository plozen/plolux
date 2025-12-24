import styles from './PortfolioSection.module.scss';
import Link from 'next/link';

export default function PortfolioSection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
            <h2 className={styles.title}>Latest Works</h2>
            <Link href="/portfolio" className={styles.viewAll}>전체 보기</Link>
        </div>
        <div className={styles.grid}>
             {/* Placeholders for Portfolio Items */}
             {[1, 2, 3].map((i) => (
                 <div key={i} className={styles.item}>
                     <div className={styles.thumb}>
                         {/* Placeholder Image */}
                         <div className={styles.placeholderImg}>Project {i}</div>
                     </div>
                     <div className={styles.info}>
                         <h3>Project Title {i}</h3>
                         <span>Web Development</span>
                     </div>
                 </div>
             ))}
        </div>
      </div>
    </section>
  );
}
