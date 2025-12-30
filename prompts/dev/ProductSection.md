## 역할 (Role)

당신은 Next.js와 SCSS(Sass) 아키텍처 전문가입니다. PLOZEN의 디자인 시스템(Atomic Design)을 준수하여 유지보수 가능하고 확장성 높은 컴포넌트를 개발합니다.

## 목표 (Task)

PLOZEN 랜딩 페이지의 **[Section 2: Product Lineup]** 컴포넌트를 구현하세요.
사용자가 자신의 비즈니스 목적에 맞는 상품(Type A vs Type B)을 비교하고 선택할 수 있는 **2-Column 카드 레이아웃**입니다.

## 기술 스택 & 제약사항 (Critical)

1.  **Framework**: Next.js (App Router), TypeScript
2.  **Styling**: **SCSS Modules (`.module.scss`)**
    - **절대 금지**: Tailwind CSS 클래스(`w-full`, `flex`, `hidden` 등) 사용 금지. 오직 SCSS로만 스타일링하세요.
    - **Mixins**: `@include mobile`, `@include tablet` 등 반응형 믹스인을 활용하세요 (`@/styles/abstracts` import 필수).
    - **Variables**: 색상, 폰트, 간격은 반드시 `_variables.scss`에 정의된 변수를 사용하세요.
3.  **Interaction**:
    - Framer Motion이나 CSS Transition을 사용하여 부드러운 Hover Effect 구현.
    - 카드 전체가 클릭 가능하거나 CTA 버튼이 명확해야 함.
4.  **Component Structure**:
    - `ProductSection.tsx` (Container)
    - `ProductCard.tsx` (Presentational - Reusable)

## 구현 상세 명세

### 1. 섹션 헤더 (Text Content)

- **Title**: "Choose Your Engine"
- **Sub Title**: "가벼운 시작부터 거대한 플랫폼까지,<br class="desktop-only" /> 비즈니스 규모에 맞춰 선택하세요." (모바일에서는 줄바꿈 없음)
- **Align**: 중앙 정렬 (Text Center).
- **Typography**: Title은 `Montserrat` (Bold), Body는 `Pretendard`.

### 2. 카드 콘텐츠 (2 Columns)

**공통 레이아웃**:

- Grid 또는 Flex를 사용하여 Desktop에서는 가로(Row), Mobile에서는 세로(Column) 배치.
- Gap: Desktop `24px` ~ `32px`, Mobile `16px`.

#### **Card A: 스탠다드 (Standard)**

- **Visual Theme**: **Titanium Silver & Clean White**
- **Badge**: "Best for Startups" (Neutral Gray Tone)
- **Title**: "소개형 웹사이트" (Static Engine)
- **Description**: "포트폴리오, 랜딩페이지, 기업 소개 등 정보 전달에 최적화된 가장 빠른 웹사이트입니다."
- **Data (Features)**:
  - 서버 유지비 평생 0원 (Serverless)
  - 압도적인 속도 (Global CDN)
  - 네이버/구글 SEO 완벽 최적화
- **Action**: "스탠다드 구축 문의" (Outline Button - `$col-titanium-silver`)

#### **Card B: 엔터프라이즈 (Enterprise)**

- **Visual Theme**: **Bio Lime (Brand High-light)**
- **Badge**: "For Business" (Primary Color Background, Black Text)
- **Title**: "비즈니스 플랫폼" (Dynamic Engine)
- **Description**: "쇼핑몰, 예약, SaaS 등 복잡한 기능과 데이터 관리가 필요한 비즈니스 솔루션입니다."
- **Data (Features)**:
  - 회원가입 / 로그인 / 결제 기능
  - 전용 관리자(Admin) 대시보드 제공
  - AWS 기반의 무제한 트래픽 확장
- **Action**: "엔터프라이즈 구축 문의" (Solid Button - `$col-bio-lime`, Text Color `$col-deep-void`)

### 3. 디자인 & 애니메이션 가이드

1.  **Card Base Style**:
    - Background: `$col-dark-gray` (#1E1E1E)
    - Border: `1px solid rgba($col-titanium-silver, 0.2)`
    - Radius: `16px` (or `$border-radius-lg`)
    - Padding: `40px` (Mobile `24px`)

2.  **Hover Interaction** (Desktop Only):
    - **Scale**: `scale(1.02)` 정도로 살짝 커짐.
    - **Border Color**:
      - Standard: `$col-pure-white`
      - Enterprise: `$col-bio-lime`
    - **Glow (Box Shadow)**: 테두리 색상에 맞춰 은은한 `box-shadow` 발생.

3.  **Responsive (Mobile)**:
    - 카드가 세로로 쌓임 (Stack).
    - 모바일에서는 Hover 효과 대신 터치 시 Active 효과 적용 고려.

## 코드 작성 시 주의사항

- **시멘틱 태그 사용**: `<section>`, `<h2>`, `<article>`, `<ul>`, `<li>` 등 웹 접근성을 고려한 태그 구조.
- **아이콘**: `lucide-react`의 `Check`, `Zap`, `Server`, `Database` 등 적절한 아이콘 사용.
- **반복 최소화**: 카드 컴포넌트는 데이터를 Props로 받아 렌더링하도록 구현 (`map` 함수 활용).
