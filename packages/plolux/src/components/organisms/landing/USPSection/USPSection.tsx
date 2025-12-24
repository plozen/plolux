import styles from './USPSection.module.scss';
import { Lightbulb, Code, ShieldCheck } from 'lucide-react'; // Example icons

export default function USPSection() {
  const usps = [
    {
      icon: <Code size={32} />,
      title: '기술력 기반',
      desc: '최신 웹 표준 기술과 프레임워크를 사용하여 빠르고 안정적인 웹사이트를 구축합니다.',
    },
    {
      icon: <Lightbulb size={32} />,
      title: '합리적인 가격',
      desc: '거품 없는 투명한 견적과 최적화된 프로세스로 최고의 가성비를 제공합니다.',
    },
    {
      icon: <ShieldCheck size={32} />,
      title: '전문성 & 신뢰',
      desc: '다양한 프로젝트 경험을 보유한 전문가들이 기획부터 유지보수까지 책임집니다.',
    },
  ];

  return (
    <section className={styles.uspSection}>
      <div className={`container ${styles.container}`}>
        <div className={styles.grid}>
          {usps.map((item, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.icon}>{item.icon}</div>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.desc}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
