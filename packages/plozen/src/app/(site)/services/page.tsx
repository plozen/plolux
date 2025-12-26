"use client";

import Image from "next/image"; // Assuming Next.js Image
import { ArrowUpRight } from "lucide-react";
import styles from "./services.module.scss";

// Static Data with Imports (or paths if using public)
// Since we generated artifacts, we need to copy them to public or use `import`. 
// For now, I will assume the `generate_image` tool output paths will be moved to `public/images/services`.
// I will implement the logic assuming the files exist at `/images/services/...`.

const services = [
  {
    id: "web",
    title: "Web Development",
    titleKo: "웹 애플리케이션 개발",
    desc: "최신 기술 스택(Next.js, React)을 활용하여 빠르고 확장 가능한 웹 플랫폼을 구축합니다. SEO 최적화와 뛰어난 UX를 보장합니다.",
    image: "/images/services/service_web_development.png", // Path to be confirmed
    tags: ["Next.js", "React", "SEO", "Performance"],
  },
  {
    id: "mobile",
    title: "Mobile Apps",
    titleKo: "모바일 앱 개발",
    desc: "iOS 및 Android를 위한 네이티브 및 크로스 플랫폼(Flutter, React Native) 애플리케이션을 개발합니다.",
    image: "/images/services/service_mobile_app.png",
    tags: ["iOS", "Android", "Flutter", "React Native"],
  },
  {
    id: "ai",
    title: "AI Solutions",
    titleKo: "AI 솔루션 통합",
    desc: "비즈니스 프로세스 자동화를 위한 맞춤형 AI 모델 통합 및 데이터 분석 솔루션을 제공합니다.",
    image: "/images/services/service_ai_solution.png",
    tags: ["LLM Integration", "Data Analysis", "Automation"],
  },
  {
    id: "cloud",
    title: "Cloud Infra",
    titleKo: "클라우드 인프라",
    desc: "AWS, GCP 기반의 안정적이고 비용 효율적인 클라우드 아키텍처를 설계하고 구축합니다.",
    image: "/images/services/service_cloud_infra.png",
    tags: ["AWS", "DevOps", "CI/CD", "Security"],
  },
];

export default function ServicesPage() {
  return (
    <div className={styles.servicesPage}>
      <header className={styles.hero}>
        <h1>
          OUR <span>SERVICES</span>
        </h1>
        <p>
          PLOZEN은 단순한 개발을 넘어, 비즈니스의 성공을 위한<br />
          최적의 기술 파트너십을 제공합니다.
        </p>
      </header>

      <div className={styles.gridContainer}>
        {services.map((service) => (
          <div key={service.id} className={styles.serviceCard}>
            <div className={styles.imageWrapper}>
               {/* 
                 Note: Since generated images are artifacts, we might need to verify their location.
                 For now, I'll use a placeholder or the assumed path if I can move them.
                 If image load fails, we should have a fallback.
               */}
               <img 
                 src={service.image} 
                 alt={service.title} 
                 onError={(e) => {
                   (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/111/D6FF00?text=' + service.title;
                 }}
               />
            </div>
            <div className={styles.content}>
              <h3>
                {service.titleKo}
                <ArrowUpRight className={styles.arrowIcon} />
              </h3>
              <p>{service.desc}</p>
              <div className={styles.tags}>
                {service.tags.map(tag => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
