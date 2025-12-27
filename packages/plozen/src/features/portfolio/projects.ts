import { Project } from "./types";

export const PORTFOLIO_PROJECTS: Project[] = [
  {
    id: "1",
    title: "Fintech Dashboard Renewal",
    client: "Future Bank",
    category: "Web App",
    description: "차세대 금융 플랫폼을 위한 직관적이고 강력한 대시보드 리뉴얼 프로젝트입니다. 실시간 데이터 시각화와 사용자 경험 중심의 UI 설계를 통해 업무 효율성을 40% 증대시켰습니다.",
    imageUrl: "/images/portfolio/fintech_dashboard.jpg",
    gradient: "linear-gradient(135deg, #1A2980 0%, #26D0CE 100%)",
    tags: ["React", "Next.js", "D3.js", "TypeScript"],
    year: "2024",
  },
  {
    id: "2",
    title: "E-Commerce Mobile App",
    client: "Shopify Plus",
    category: "Mobile App",
    description: "글로벌 패션 브랜드를 위한 하이브리드 모바일 앱 개발. 빠른 로딩 속도와 매끄러운 결제 경험을 제공하여 구매 전환율을 극대화했습니다.",
    imageUrl: "/images/portfolio/ecommerce_app.jpg",
    gradient: "linear-gradient(135deg, #FF416C 0%, #FF4B2B 100%)",
    tags: ["React Native", "Redux", "Node.js"],
    year: "2023",
  },
  {
    id: "3",
    title: "AI Medical Diagnosis Assistant",
    client: "MediCore AI",
    category: "AI Solution",
    description: "의료진의 진단을 보조하는 AI 기반 분석 도구입니다. 복잡한 의료 데이터를 분석하여 시각적인 리포트를 제공합니다.",
    imageUrl: "/images/portfolio/ai_medical.jpg",
    gradient: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
    tags: ["Python", "TensorFlow", "FastAPI", "React"],
    year: "2024",
  },
  {
    id: "4",
    title: "Global Logistics Cloud System",
    client: "LogisOne",
    category: "Cloud Infra",
    description: "전 세계 물류 흐름을 추적하고 최적화하는 클라우드 기반 관제 시스템 구축. AWS 기반의 확장성 있는 아키텍처를 설계했습니다.",
    imageUrl: "/images/portfolio/logistics_cloud.jpg",
    gradient: "linear-gradient(135deg, #2980B9 0%, #6DD5FA 100%, #FFFFFF 100%)", // Fixed typo in hex if any, simplified
    tags: ["AWS", "Docker", "Kubernetes", "Go"],
    year: "2023",
  },
  {
    id: "5",
    title: "Luxury Brand Identity",
    client: "Esther & Co.",
    category: "Branding",
    description: "프리미엄 쥬얼리 브랜드를 위한 웹사이트 구축 및 디지털 브랜딩 전략 수립. 우아한 애니메이션과 인터랙션으로 브랜드 가치를 높였습니다.",
    imageUrl: "/images/portfolio/luxury_brand.jpg",
    gradient: "linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%)",
    tags: ["WebGL", "Three.js", "GSAP"],
    year: "2024",
  },
];

export const CATEGORIES: { label: string; value: Project['category'] | 'All' }[] = [
  { label: 'All', value: 'All' },
  { label: 'Web App', value: 'Web App' },
  { label: 'Mobile App', value: 'Mobile App' },
  { label: 'AI Solution', value: 'AI Solution' },
  { label: 'Cloud Infra', value: 'Cloud Infra' },
  { label: 'Branding', value: 'Branding' },
];
