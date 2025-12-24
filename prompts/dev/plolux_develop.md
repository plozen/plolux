# Project Overview

**Summary**: PLOLUX 웹사이트는 '고급스러운' 브랜드 이미지를 기반으로, 깔끔한 UI/UX와 부드러운 인터랙션을 통해 브랜딩 강화, 잠재 고객 DB 확보, 그리고 효과적인 CS를 목적으로 구축될 웹사이트입니다. 기술력과 합리적인 가격이라는 USP를 명확히 전달하여 경쟁 우위를 확보합니다.

## Tech Stack Keywords

- 반응형 웹
- SEO 최적화
- 모션 인터랙션
- 관리자 페이지
- 웹 표준 준수
- 성능 최적화

**Target Environment**: Modern Web Browsers (Chrome, Firefox, Safari, Edge) on Desktop & Mobile

---

## Design System

### Concept Description

PLOLUX의 '고급스러운' 브랜드 이미지를 구현하기 위해, 딥한 메인 컬러와 우아한 액센트 컬러를 조합하여 전문성과 신뢰감을 전달합니다. 카카오의 벤치마킹에서 얻은 '깔끔하고 가독성 높은' 디자인 철학을 바탕으로, 충분한 여백과 명확한 타이포그래피를 사용하여 정보 전달력을 극대화하고, 부드러운 애니메이션으로 사용자 경험을 향상시킵니다. '지저분하고 가독성이 떨어지는' 디자인은 철저히 배제합니다.

### Color Palette

- **Primary**: `#00FFC2`
- **Secondary**: `#0A192F`
- **Background**: `#FFFFFF`

### Typography

국문 폰트는 'Pretendard'를 사용하여 높은 가독성과 모던함을 제공하며, 영문 및 헤딩 폰트는 'Montserrat'를 통해 전문적이고 고급스러운 분위기를 더합니다. 폰트 사이즈와 간격을 일관성 있게 유지하여 전체적인 통일감과 깔끔함을 강조합니다.

### Global CSS Code

```css
/* Global Design Tokens */
:root {
  /* Brand Colors */
  --primary-color: #00ffc2; /* 딥 사파이어: 전문성, 신뢰, 고급스러움 */
  --secondary-color: #0a192f; /* 뮤티드 골드: 우아함, 액센트, 프리미엄 */
  --background-color: #ffffff; /* 오프 화이트: 깔끔함, 여백, 가독성 */
  --text-main: #333333; /* 기본 텍스트 색상 */
  --text-sub: #666666; /* 서브 텍스트, 설명 텍스트 색상 */
  --border-color: #e0e0e0; /* 경계선, 구분선 색상 */

  /* Typography */
  --font-family-base: 'Pretendard', sans-serif; /* 국문 본문 및 UI 텍스트 */
  --font-family-heading: 'Montserrat', sans-serif; /* 영문 및 제목 텍스트 */
  --font-size-base: 16px;
  --line-height-base: 1.6;

  /* Layout & Spacing */
  --container-width: 1280px; /* 최대 콘텐츠 너비 */
  --header-height: 72px; /* 헤더 고정 높이 */
  --padding-section: 80px 0; /* 섹션 상하 패딩 */
  --spacing-lg: 40px;
  --spacing-md: 24px;
  --spacing-sm: 16px;

  /* Border Radius */
  --border-radius-base: 8px; /* 카카오처럼 부드러운 라운딩 */
  --border-radius-pill: 50px;

  /* Shadow */
  --shadow-base: 0 4px 12px rgba(0, 0, 0, 0.08);

  /* Transition */
  --transition-base: all 0.3s ease-in-out;
}

/* Base Reset Suggestion */
body {
  background-color: var(--background-color);
  color: var(--text-main);
  font-family: var(--font-family-base);
  font-size: var(--font-size-base);
  line-height: var(--line-height-base);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: var(--font-family-heading);
  color: var(--text-main);
  line-height: 1.2;
  margin-top: 0;
  margin-bottom: var(--spacing-md);
}

a {
  color: var(--primary-color);
  text-decoration: none;
  transition: var(--transition-base);
}

a:hover {
  color: var(--secondary-color);
}

button {
  cursor: pointer;
  border: none;
  background: none;
  padding: 0;
  font-family: var(--font-family-base);
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}
```

---

## Sitemap

1. **메인**
   - 홈
2. **PLOLUX**
   - 회사 소개
   - 우리의 강점
3. **서비스**
   - 웹사이트 제작
   - 모바일 앱 개발
   - UI/UX 컨설팅
   - 유지보수 및 운영
4. **포트폴리오**
   - 전체 포트폴리오
   - 업종별 사례
5. **문의/견적**
   - 온라인 문의
   - 견적 요청
6. **고객지원**
   - FAQ
   - 공지사항
7. **기타**
   - 개인정보처리방침
   - 이용약관

---

## Page Specifications

### 1. 홈 (Main)

- **Planning Intent**: 방문자에게 PLOLUX의 핵심 가치와 서비스를 명확하게 전달하고, 즉각적인 서비스 탐색 및 문의 유도를 통해 DB를 확보하며 브랜딩 인식을 강화합니다.
- **Sections**:
  1. **메인 히어로 섹션**
     - **UI Layout**: 풀스크린 배경 이미지/비디오 + 중앙 정렬 텍스트 오버레이 + CTA 버튼
     - **Content Detail**: 캐치프레이즈 (예: '기술과 감성으로 완성하는 당신의 웹사이트'), PLOLUX 소개 문구, '프로젝트 시작하기' CTA 버튼. 고품질의 추상적인 기술/고급스러운 이미지를 배경으로 활용. 스크롤 다운 시 애니메이션 유도 아이콘.
     - **Functional Logic**: 패럴랙스 스크롤 효과, 부드러운 이미지/비디오 전환, CTA 버튼 클릭 시 문의/견적 페이지로 이동. 스크롤 다운 시 상단 헤더 고정.
  2. **PLOLUX 강점 (USP) 섹션**
     - **UI Layout**: 3~4단 카드형 레이아웃 (아이콘 + 제목 + 설명)
     - **Content Detail**: PLOLUX의 차별화 포인트 (기술력, 합리적인 가격, 전문성, 고급스러운 디자인 등)를 각각의 카드에 요약하여 설명. 각 카드에 어울리는 고급스러운 아이콘 또는 일러스트.
     - **Functional Logic**: 스크롤 시 카드별 페이드인 또는 슬라이드업 애니메이션. 각 카드 클릭 시 상세 페이지(예: '우리의 강점' 페이지)로 이동.
  3. **주요 서비스 요약 섹션**
     - **UI Layout**: 2~3단 그리드 또는 슬라이드 형태의 서비스 카드
     - **Content Detail**: 핵심 서비스 (웹사이트 제작, 모바일 앱 개발, UI/UX 컨설팅 등)의 간략한 소개와 대표 이미지. 각 서비스별 '자세히 보기' 버튼.
     - **Functional Logic**: 서비스 카드 호버 시 애니메이션 효과 (그림자, 스케일업 등). '자세히 보기' 클릭 시 해당 서비스 상세 페이지로 이동.
  4. **최신 포트폴리오 섹션**
     - **UI Layout**: 캐러셀 또는 갤러리 형태 (이미지 + 프로젝트명 + 카테고리)
     - **Content Detail**: 가장 대표적이거나 최신 포트폴리오 3~4개 미리보기. 각 포트폴리오 클릭 시 상세 페이지로 이동 유도.
     - **Functional Logic**: 자동 재생/수동 탐색 가능한 캐러셀 기능. 이미지 로드 시 지연 로딩 (Lazy Loading) 적용. 포트폴리오 클릭 시 상세 페이지로 이동.
  5. **CTA (Call To Action) 섹션**
     - **UI Layout**: 풀스크린 배경 이미지 + 중앙에 강력한 문구와 CTA 버튼
     - **Content Detail**: '지금 당신의 비전을 PLOLUX와 함께 실현하세요!' 또는 '무료 견적 요청하기'와 같은 강력한 문구. '문의하기' 또는 '견적 받기' 버튼.
     - **Functional Logic**: 버튼 클릭 시 온라인 문의/견적 페이지로 스무스 스크롤 또는 페이지 이동.

### 2. 서비스 상세 페이지 (예: 웹사이트 제작)

- **Planning Intent**: PLOLUX의 웹사이트 제작 서비스의 전문성과 과정을 상세히 설명하여 고객의 신뢰를 구축하고, 서비스 이용을 유도합니다.
- **Sections**:
  1. **서비스 개요 히어로 섹션**
     - **UI Layout**: 상단 배경 이미지/비디오 + 서비스명 (H1) + 간략한 소개
     - **Content Detail**: 서비스의 핵심 가치와 목적을 한 문장으로 요약. 해당 서비스에 적합한 대표 이미지 또는 일러스트.
     - **Functional Logic**: 스크롤 시 페이드인 효과. 하단에 상세 내용으로 스크롤 유도.
  2. **서비스 프로세스 섹션**
     - **UI Layout**: 단계별 아이콘 + 제목 + 설명 (타임라인 또는 순차적 카드형)
     - **Content Detail**: 기획, 디자인, 개발, 테스트, 유지보수 등 웹사이트 제작의 전체 과정을 시각적으로 명확하게 제시. 각 단계별 PLOLUX의 전문성과 차별점을 어필.
     - **Functional Logic**: 스크롤 시 각 단계별 애니메이션 (진행바, 아이콘 강조 등).
  3. **주요 기능 및 기술 스택 섹션**
     - **UI Layout**: 그리드형 또는 리스트형 (아이콘 + 기능/기술명 + 설명)
     - **Content Detail**: 반응형 웹, SEO 최적화, 관리자 페이지 제공, 보안 강화, 성능 최적화 등 PLOLUX가 제공하는 기술적 강점과 활용하는 주요 기술 스택 (예: React, Next.js, WordPress 등)을 아이콘과 함께 명시.
     - **Functional Logic**: 기술 스택 아이콘에 마우스 오버 시 툴팁 제공 (기술 스택 상세 설명).
  4. **FAQ 및 문의 유도 섹션**
     - **UI Layout**: 아코디언 형태의 FAQ + CTA 버튼
     - **Content Detail**: 웹사이트 제작 관련 자주 묻는 질문 3~5개. '지금 바로 문의하기' CTA 버튼.
     - **Functional Logic**: FAQ 클릭 시 아코디언 토글 기능. CTA 버튼 클릭 시 문의 페이지로 이동.

### 3. 포트폴리오 상세 페이지

- **Planning Intent**: PLOLUX의 실제 작업 결과물을 통해 기술력과 디자인 역량을 시각적으로 증명하고, 잠재 고객에게 신뢰를 제공합니다.
- **Sections**:
  1. **프로젝트 개요 섹션**
     - **UI Layout**: 상단에 대표 이미지/동영상 + 프로젝트명 (H1) + 고객사 + 서비스 카테고리 + 기간
     - **Content Detail**: 프로젝트의 핵심 정보와 한 줄 소개. 프로젝트의 '고급스러운' 특징이 잘 드러나는 이미지.
     - **Functional Logic**: 상단 대표 이미지 클릭 시 라이트박스 갤러리 또는 동영상 재생.
  2. **프로젝트 목표 및 결과 섹션**
     - **UI Layout**: 2단 레이아웃 (텍스트 + 관련 이미지/그래프)
     - **Content Detail**: 프로젝트 착수 전의 고객 요구사항 및 목표, 그리고 PLOLUX가 달성한 결과 (KPI, 성과 지표 등).
     - **Functional Logic**: 좌우 콘텐츠 전환 시 부드러운 애니메이션.
  3. **주요 기능 및 디자인 포인트 섹션**
     - **UI Layout**: 이미지 중심의 그리드 또는 슬라이드 레이아웃 (스크린샷 + 상세 설명)
     - **Content Detail**: 프로젝트에서 구현된 주요 기능 (반응형, 관리자 페이지, 특정 인터랙션 등)과 디자인 컨셉, 특징적인 UI/UX 요소들을 고해상도 스크린샷과 함께 설명.
     - **Functional Logic**: 스크린샷 클릭 시 확대 뷰어 (Light Box) 기능. 관련 디자인 애니메이션 시연 영상 포함 가능.
  4. **고객 후기 / 다음 포트폴리오 탐색 섹션**
     - **UI Layout**: 한 줄 고객 후기 (선택 사항) + 이전/다음 프로젝트 탐색 버튼 + 전체 포트폴리오 CTA
     - **Content Detail**: 해당 프로젝트에 대한 고객사의 긍정적인 평가. 다른 포트폴리오로 이동할 수 있는 링크.
     - **Functional Logic**: 이전/다음 버튼 클릭 시 페이지 이동. '전체 포트폴리오 보기' 클릭 시 목록 페이지로 이동.

---

## Functional Requirements

### 1. 기본 기능

- **Category**: 기본 기능
- **Feature Name**: 반응형 웹 디자인
- **Description**: 데스크톱, 태블릿, 모바일 등 모든 디바이스에서 최적화된 레이아웃과 사용자 경험을 제공합니다. (필수 요구사항)
- **Dev Guide**: Mobile-first 접근 방식으로 CSS 미디어 쿼리 및 Flexbox/Grid 레이아웃을 적극 활용하여 구현합니다.

### 2. 콘텐츠 관리

- **Category**: 콘텐츠 관리
- **Feature Name**: 관리자 페이지 (CMS)
- **Description**: 웹사이트의 모든 콘텐츠(페이지 텍스트, 이미지, 서비스, 포트폴리오, FAQ, 공지사항, 문의 내역 등)를 쉽게 추가, 수정, 삭제할 수 있는 백엔드 관리 시스템을 제공합니다. (필수 요구사항)
- **Dev Guide**: 안정적인 프레임워크 (예: Laravel, Django, Next.js + headless CMS) 기반으로 REST API 또는 GraphQL을 활용하여 구축합니다. 사용자 권한 관리 기능 포함.

### 3. 사용자 경험

- **Category**: 사용자 경험
- **Feature Name**: 부드러운 모션 인터랙션
- **Description**: 카카오 벤치마킹 요소 중 하나로, 페이지 전환, 스크롤, 버튼 호버 시 깔끔하고 부드러운 애니메이션 효과를 적용하여 사용자 경험을 향상시킵니다.
- **Dev Guide**: CSS Transitions, CSS Animations, 또는 JavaScript 기반 라이브러리 (GSAP, Framer Motion 등)를 활용하여 구현합니다. 과도한 사용은 지양하고, 성능 저하 없이 미묘한 효과를 중심으로 적용합니다.

### 4. SEO

- **Category**: SEO
- **Feature Name**: 검색 엔진 최적화 (SEO)
- **Description**: 주요 검색 엔진(네이버, 구글 등)에서 PLOLUX 웹사이트가 잘 노출되도록 메타 태그, 시맨틱 마크업, 사이트맵 등록 등 기본적인 SEO 요소를 적용합니다.
- **Dev Guide**: 모든 페이지에 title, description, og:title, og:image 등의 메타 태그를 동적으로 설정합니다. 시맨틱 HTML5 태그를 올바르게 사용하고, sitemap.xml 및 robots.txt를 생성하여 제출합니다.

### 5. DB 확보

- **Category**: DB 확보
- **Feature Name**: 온라인 문의/견적 시스템
- **Description**: 고객이 서비스 관련 문의나 견적을 요청할 수 있는 폼을 제공하며, 제출된 내용은 관리자 페이지에서 확인하고 관리할 수 있습니다.
- **Dev Guide**: 백엔드 연동을 통해 폼 데이터 유효성 검사 및 서버 저장을 구현합니다. CAPTCHA 또는 reCAPTCHA를 적용하여 스팸 방지 기능을 강화합니다.

### 6. CS

- **Category**: CS
- **Feature Name**: FAQ 및 공지사항 관리
- **Description**: 자주 묻는 질문과 공지사항을 쉽게 등록/수정할 수 있는 기능을 관리자 페이지에서 제공하고, 사용자에게는 보기 쉽게 아코디언 형태로 노출합니다.
- **Dev Guide**: 관리자 페이지에서 FAQ 및 공지사항을 CRUD 할 수 있도록 개발하며, 프론트엔드에서는 아코디언 UI 컴포넌트를 사용하여 구현합니다.

---

## Benchmarking Strategy

- **Benchmarking Points**: 카카오 웹사이트(www.kakao.co.kr)의 '깔끔한 스타일'과 '애니메이션' 요소를 벤치마킹합니다. 구체적으로는 정보의 명확한 계층 구조, 충분한 여백을 활용한 간결한 레이아웃, 그리고 스크롤 및 상호작용 시 나타나는 부드러운 마이크로 인터랙션을 주요 참고 요소로 삼습니다. 이는 '지저분하고 가독성이 떨어지는 디자인'을 피하고 '고급스러운' 이미지를 구축하는 데 기여할 것입니다.
- **Differentiation**: 카카오의 '깔끔함'을 PLOLUX의 '고급스러움'에 맞게 재해석합니다. 카카오가 친근하고 직관적인 노란색을 메인으로 사용한다면, PLOLUX는 딥 사파이어와 뮤티드 골드 컬러 팔레트를 사용하여 전문적이고 신뢰감 있는 분위기를 연출합니다. 애니메이션은 카카오처럼 부드럽고 자연스럽게 적용하되, 좀 더 절제되고 세련된 형태로 구현하여 브랜드의 고급스러움을 해치지 않도록 합니다. 기술력과 가격 경쟁력이라는 PLOLUX의 USP는 각 섹션의 콘텐츠와 시각적 요소로 명확하게 부각시켜 차별점을 강조합니다.
