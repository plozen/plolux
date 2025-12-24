import styles from './ServiceSummarySection.module.scss';
import Link from 'next/link';
import { Monitor, Smartphone, Palette } from 'lucide-react';

export default function ServiceSummarySection() {
  const services = [
    {
      icon: <Monitor size={40} />,
      title: '웹사이트 제작',
      desc: '반응형 기업 홈페이지부터 복잡한 웹 애플리케이션까지.',
    },
    {
      icon: <Smartphone size={40} />,
      title: '모바일 앱 개발',
      desc: 'iOS, Android 네이티브 및 하이브리드 앱 개발 솔루션.',
    },
    {
      icon: <Palette size={40} />,
      title: 'UI/UX 컨설팅',
      desc: '사용자 중심의 디자인과 경험을 설계하여 가치를 높입니다.',
    },
  ];

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
            <h2 className={styles.sectionTitle}>Our Services</h2>
            <p className={styles.sectionDesc}>최고의 결과물을 위한 전문적인 서비스를 제공합니다.</p>
        </div>
        <div className={styles.grid}>
          {services.map((svc, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.icon}>{svc.icon}</div>
              <div className={styles.content}>
                <h3>{svc.title}</h3>
                <p>{svc.desc}</p>
                <Link href="/services" className={styles.link}>자세히 보기 &rarr;</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
