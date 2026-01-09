## 역할 (Role)

당신은 Next.js와 SCSS(Sass) 아키텍처 전문가이자 UI 인터랙션 장인입니다.
애플(Apple)이나 리니어(Linear) 스타일의 세련된 **Bento Grid 레이아웃**을 SCSS로 구현하는 데 능숙합니다.

## 목표 (Task)

PLOZEN 랜딩 페이지의 **[Section 3: Technical Edge]** 컴포넌트를 구현하세요.
일반적인 리스트 형식이 아닌, 정보의 위계에 따라 크기가 다른 **격자형(Bento Grid) 카드 레이아웃**입니다.

## 기술 스택 & 제약사항 (Critical)

1.  **Framework**: Next.js (App Router), TypeScript
2.  **Styling**: **SCSS Modules (`.module.scss`)**
    - **절대 금지**: Tailwind CSS 클래스 사용 금지. 오직 CSS Grid와 Flexbox로 레이아웃을 잡으세요.
    - **Mixins**: `@include mobile`, `@include tablet` 등 반응형 믹스인을 활용하세요 (`@/styles/abstracts` import 필수).
    - **Variables**: 색상 변수(`$col-bio-lime`, `$col-deep-void`, `$col-titanium-silver` 등)를 철저히 준수하세요.
3.  **Interaction**:
    - Framer Motion을 사용하여 각 카드가 순차적으로 등장(`staggerChildren`)하는 효과 구현.
    - 호버 시 미세한 `scale` 변화와 테두리 발광(Glow) 효과 적용.
4.  **Component Structure**:
    - `TechnicalSection.tsx` (Layout Container)
    - `BentoGrid.tsx` (Grid Wrapper)
    - `BentoItem.tsx` (Individual Card Component)

## 구현 상세 명세

### 1. 섹션 헤더 (Section Header)

- **Title**: "Why PLOZEN?"
- **Sub Title**: "우리는 '툴'을 쓰지 않습니다.<br class="desktop-only" /> 개발자가 짠 '진짜 코드'를 드립니다."
- **Align**: 중앙 정렬 (Text Center).
- **Typography**: Title은 `Montserrat` (Bold), Sub Title은 `Pretendard`.

### 2. 벤토 그리드 콘텐츠 (Bento Grid Items)

**공통 레이아웃 (SCSS Grid)**:

- **Desktop**: 3 Columns (`grid-template-columns: repeat(3, 1fr)`).
- **Mobile**: 1 Column (`grid-template-columns: 1fr`).
- **Gap**: `24px`.

#### **Item 1: Code Ownership (가장 중요)**

- **Grid Span**: **Desktop에서 가로 2칸 차지 (`grid-column: span 2`)**
- **Icon**: `Github` (Lucide React)
- **Title**: "100% 소스 코드 소유권 제공"
- **Description**: "매달 내는 구독료나 벤더 락인(Vendor Lock-in)이 없습니다. 완성된 Next.js 소스 코드가 담긴 GitHub Repository를 귀하에게 그대로 양도합니다."
- **Visual Accent**: 아이콘 주변에 `$col-bio-lime` 컬러의 은은한 Glow 효과.

#### **Item 2: Global Scale**

- **Grid Span**: 1칸 차지 (`span 1`)
- **Icon**: `Globe`
- **Title**: "글로벌 CDN 배포"
- **Description**: "AWS & CloudFlare 엣지 네트워크를 통해 전 세계 어디서든 0.1초 로딩 속도를 보장합니다."

#### **Item 3: Modern Tech Stack**

- **Grid Span**: 1칸 차지 (`span 1`)
- **Icon**: `Layers` (또는 `Cpu`)
- **Title**: "글로벌 개발 표준"
- **Description**: "Next.js, TypeScript 등 전 세계 개발자들이 사용하는 표준 스택을 준수합니다."

#### **Item 4: Enterprise Security**

- **Grid Span**: **Desktop에서 가로 2칸 차지 (`grid-column: span 2`)**
- **Icon**: `ShieldCheck`
- **Title**: "엔터프라이즈급 보안"
- **Description**: "Supabase의 RLS(Row Level Security) 정책과 SSL/HTTPS 암호화가 기본 적용됩니다."

_(참고: 배치 순서는 Grid Area 등을 활용하여 1행[2칸, 1칸] / 2행[1칸, 2칸] 형태로 지그재그 균형을 맞춰주세요.)_

### 3. 디자인 & 애니메이션 가이드

1.  **Card Style (SCSS)**:
    - **Background**: `$col-deep-void` (#0F0F0F - 아주 어두운 배경) 또는 `$col-dark-gray`.
    - **Border**: `1px solid rgba($col-titanium-silver, 0.15)`.
    - **Radius**: `20px`.
    - **Padding**: `32px`.
    - **Transition**: `all 0.3s ease-in-out`.

2.  **Hover Interaction**:
    - **Border**: 호버 시 테두리 색상이 `$col-titanium-silver`(밝은 회색) 또는 `$col-bio-lime`(강조색)으로 변경.
    - **Transform**: `translateY(-4px)` 위로 살짝 떠오름.
    - **Background**: 아주 미세하게 밝아짐 (Sass `lighten()` 함수 금지, CSS `filter: brightness()` 활용).

3.  **Typography Hierarchy**:
    - **Icon**: 크기 `32px`, 기본 색상은 `$col-titanium-silver`. Item 1(Ownership)은 `$col-bio-lime` 사용 권장.
    - **Title**: `font-size: 1.25rem`, `font-weight: 700`, `margin-bottom: 12px`.
    - **Desc**: `font-size: 0.95rem`, `color: $col-gray-400` (가독성 확보), `line-height: 1.5`.

## 코드 작성 시 주의사항

- **CSS Grid 활용**: Tailwind의 `col-span-2` 대신 SCSS에서 `.item-wide { grid-column: span 2; }` 와 같은 유틸리티 클래스나 `&:nth-child` 선택자를 활용하여 레이아웃을 제어하세요.
- **접근성**: 아이콘에는 `aria-hidden="true"`, 텍스트 명도 대비 준수.
- **모바일 대응**: 모바일(`@include mobile`)에서는 모든 카드가 `span 1`이 되어 세로로 쌓여야 합니다.
