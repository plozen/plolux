**Executive Summary**

1. **Tech Stack 변경**: Tailwind CSS 제거, **Sass(SCSS)** 기반의 독자적인 스타일링 아키텍처 구축.
2. **Navigation**: 모바일 **햄버거 메뉴** 및 오버레이 메뉴 구현.
3. **Hero Section**: 인트로 애니메이션(컨셉: Reality Engine/Spark) 추가, 문구 삭제 및 "프로젝트 시작하기" 버튼 추가.
4. **Menu Structure**: 홈 / 서비스 / 포트폴리오 / 문의하기 / 자주 묻는 질문(FAQ) / 견적 요청.
5. **Theme**: Light/Dark 모드 시스템 구현 (SCSS Variables 활용).
6. **Quote Page**: 카드 형식 UI 및 레퍼런스 링크 반영.
7. **Style**: Utility Class가 아닌 Semantic Class 명명 규칙 준수.

---

# PLOZEN Official Web Platform Development Prompt (v2.0 - Sass Edition)

## 0. 역할 및 목표 정의 (Role & Context)

**Role**: 당신은 Next.js 14 (App Router), TypeScript, Sass(SCSS), Framer Motion 전문 시니어 프론트엔드 아키텍트입니다.
**Goal**: Tailwind CSS를 사용하지 않고, Sass를 활용하여 백지상태에서 브랜드 아이덴티티를 완벽하게 구현한 유지보수 가능한 코드를 작성하십시오.
**Language**: 코드는 영어(변수명 등)로 작성하되, 주석과 설명은 한국어로 작성하십시오.

## 1. 프로젝트 개요 (Project Overview)

**Summary**: PLOZEN은 기획(Plot)을 현실(Reality)로 구현하는 AI 벤처 빌더입니다. "The Reality Engine"이라는 컨셉에 맞춰, 역동적인 애니메이션과 정교한 인터랙션을 제공하는 고성능 웹사이트를 구축해야 합니다.
**Tech Stack Keywords**:

- Framework: Next.js 14 (App Router)
- Language: TypeScript
- Styling: **Sass (SCSS Modules)** - _Tailwind CSS 사용 절대 금지_
- Animation: **Framer Motion** (필수: 인트로, 햄버거 메뉴, 카드 효과)
- State Mgmt: React Context (Theme Management)
- Form: React Hook Form

## 2. 기술적 제약 및 코딩 규칙 (Technical Constraints & Rules)

**다음 규칙을 준수하십시오.**

1. **렌더링 및 구조**:

- `src/app`, `src/components`, `src/styles` 구조를 따르십시오.
- 기본적으로 Server Components를 사용하되, 애니메이션과 테마 토글이 필요한 경우 `'use client'`를 사용하십시오.

2. **스타일링 전략 (Strict Sass Architecture)**:

- **No Tailwind**: Tailwind CSS는 설치조차 하지 마십시오.
- **SCSS Modules**: 컴포넌트별 스타일은 `*.module.scss`로 격리하십시오.
- **Global Styles**: `src/styles/` 폴더 내에 다음 파일들을 구조화하여 관리하십시오.
- `_variables.scss`: 색상, 폰트, 브레이크포인트 변수 정의
- `_mixins.scss`: 미디어 쿼리, Flexbox/Grid 유틸리티 믹스인
- `_reset.scss`: CSS Reset
- `globals.scss`: 전체 테마 및 다크모드 루트 변수 설정

3. **테마 시스템 (Light/Dark Mode)**:

- `next-themes` 혹은 Context API를 사용하여 다크모드를 구현하십시오.
- `globals.scss`에서 `:root`와 `[data-theme='dark']`를 구분하여 CSS 변수(Custom Properties)로 색상 값을 관리하십시오. (예: `--bg-primary`, `--text-primary`)

4. **반응형 전략**:

- **Mobile First**: 모바일 뷰를 기준으로 스타일을 작성하고, PC 뷰로 확장하십시오.
- 헤더는 모바일에서 **햄버거 버튼**으로 동작해야 합니다.

## 3. 디자인 시스템 (Design System)

### Concept: "Clean Tech & High Contrast"

- **Light Mode**: Pure White 배경에 Deep Void 텍스트, Bio Lime 포인트.
- **Dark Mode**: Deep Void 배경에 White 텍스트, Bio Lime 포인트.

### Color Palette (SCSS Variables 적용 필수)

- Primary Accent: **Bio Lime** (#D6FF00) - 에너지, 강조, 스파크
- Primary Strong: **Deep Void Black** (#111111) - 무게감, 배경(Dark)
- Secondary Tech: **Titanium Silver** (#747D8C) - 구조, 라인
- Base Canvas: **Pure White** (#FFFFFF)

### Typography

- Titles: **Montserrat** (Bold/ExtraBold)
- Body: **Pretendard**
- Code: **Inter**

## 4. 사이트맵 (Sitemap)

1. **홈** (Route: `/`)
2. **서비스** (Route: `/services`)
3. **포트폴리오** (Route: `/portfolio`)
4. **문의하기** (Route: `/contact`)
5. **자주 묻는 질문** (Route: `/faq`)
6. **견적 요청** (Route: `/quote`)

## 5. 기능 및 페이지 상세 명세 (Page Specifications)

### 1. Global Navigation Bar (Header)

- **Position**: Fixed Top, 스크롤 시 Glassmorphism 효과 적용.
- **Layout**:
- Left: 'PLOZEN' 로고.
- Right:
- **Desktop**: 메뉴 항목 나열 + 테마 토글 버튼.
- **Mobile**: 테마 토글 버튼 + **햄버거 메뉴 아이콘**.

- **Interaction (Mobile)**:
- 햄버거 버튼 클릭 시, 우측에서 메뉴 드로어(Drawer)가 부드럽게 슬라이드되어 나옵니다 (Framer Motion `AnimatePresence` 사용).
- 메뉴 오픈 시 배경은 흐리게(Backdrop Blur) 처리합니다.

### 2. Main Home (Hero Section)

- **Visual Concept**: "The Reality Engine"
- **Components**:
- **Intro Animation**: 페이지 로드 시, PLO(기획)와 GEN(생성) 사이를 잇는 스파크(Z)가 점화되거나, 회로가 연결되는 듯한 **강렬한 오프닝 애니메이션**이 재생되어야 합니다.
- **Text**: 메인 슬로건 "Generate Your Plot". (_참고: "Powered by Plozen Engine" 문구는 삭제할 것_)
- **CTA Button**: **"프로젝트 시작하기"** (클릭 시 `/quote`로 이동). Bio Lime 컬러를 사용하여 눈에 띄게 배치.

### 3. Request Quote (견적문의)

- **Style Reference**: `https://danny89824.github.io/PLOLUX-TypeForm/`
- **Layout**: 일반적인 긴 폼(Form) 형식이 아닌, **카드(Card) 형식**의 UI를 사용하십시오.
- **Interaction**:
- 질문 하나하나에 집중할 수 있도록 깔끔하게 분리된 카드 디자인.
- 부드러운 전환 효과.

### 4. Theme Toggle

- 헤더 우측에 해/달 아이콘으로 직관적인 토글 버튼 배치.
- 전환 시 모든 컴포넌트의 색상 변수가 부드럽게(`transition: background-color 0.3s`) 변경되어야 함.

## 6. 실행 지시 (Action Item)

위 명세를 바탕으로 다음 단계를 수행하십시오.

1. **프로젝트 세팅**: Next.js 설치 및 Sass 패키지 설치 (`npm install sass`).
2. **스타일 아키텍처 구축**: `src/styles` 폴더 생성 및 변수/믹스인 파일 작성.
3. **Layout 구현**: 햄버거 메뉴 기능이 포함된 `Header`, `ThemeContext` 구현.
4. **Hero Section 구현**: 인트로 애니메이션과 수정된 콘텐츠(버튼 포함) 반영.

지금 바로 **폴더 구조와 글로벌 스타일(SCSS) 설정 코드**부터 작성을 시작하십시오.
