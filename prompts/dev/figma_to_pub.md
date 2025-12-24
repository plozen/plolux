# Figma Design to Production Code Workflow (UI/Publishing Focus)

## 목적 (Purpose)

- Figma 디자인을 분석하여 **실제 서비스 경로**(`src/app/(site)`, `src/app/(admin)`)에 **상용 수준의 UI 코드**를 구현합니다.
- **작업 범위 제한**:
  - ✅ **포함**: HTML 구조, CSS(SCSS) 스타일링, 반응형 레이아웃, 공통 UI 컴포넌트 분리, 페이지 간 링크(`Next/Link`) 연결.
  - ❌ **제외**: 복잡한 비즈니스 로직, API 데이터 연동(fetching), 복잡한 상태 관리(Context/Redux 등).
- **핵심 목표**: 디자인과 100% 일치하는 시각적 완성도(Pixel Perfect)와 깔끔한 컴포넌트 구조 확보.
- **언어 규칙**: 모든 플랜(Task, Implementation Plan), 주석, 커밋 메시지, 브리핑 내용은 **반드시 한국어**로 작성합니다.

---

## 작업 절차 (Workflow)

에이전트는 **반드시** 아래의 4단계 Planning 과정을 거친 후 구현에 착수해야 합니다.

### Phase 1: Planning (체계적 분석)

코드를 작성하기 전, 다음 순서대로 분석하여 **"전체 개발 플랜(Master Plan)"**을 수립하고 승인받습니다.

1.  **Step 1: 스타일 가이드 페이지 구현 (Style Guide Implementation)**
    - **구현 필수**: 스타일 가이드(Typography, Colors, Components) 디자인이 있다면, 이를 `src/app/(admin)/admin/_guide` 경로에 실제 페이지로 구현합니다.
    - **목적**: 프로젝트의 전역 스타일(SCSS Variables)을 검증하고, 공통 컴포넌트(Button, Input 등)의 미리보기를 제공하기 위함입니다.

2.  **Step 2: 글로벌 레이아웃 (Layout)**
    - 모든 페이지에 공통으로 적용될 `Header`, `Footer`, `Sidebar` 등을 정의합니다.
    - 레이아웃이 적용될 범위(전체 공통 vs 특정 페이지 전용)를 파악합니다.

3.  **Step 3: 디자인 페이지 리스트업 (Page Listing)**
    - 구현해야 할 모든 페이지(화면)를 식별하고, 실제 Next.js 라우트 경로와 매핑합니다.
    - 예: `01.Main` -> `src/app/(site)/page.tsx`
    - 예: `02.About` -> `src/app/(site)/about/page.tsx`

4.  **Step 4: 섹션 단위 상세 계획 (Section Deep Dive)**
    - 각 페이지를 구성하는 **섹션(Frame) 단위**로 쪼개어 상세 할일 목록을 작성합니다.
    - **Plan 출력 예시**:
      ```markdown
      [ ] 1. Base Setup (Style & Layout) - [ ] Global Variables (Colors, Typography) - [ ] Common Layout (Header, Footer)
      [ ] 2. Main Page (src/app/(site)/page.tsx) - [ ] Hero Section - [ ] Feature Section (Component: FeatureCard) - [ ] Contact Banner (Link to /contact)
      [ ] 3. About Page ...
      ```

### Phase 2: Execution (실행 모드)

승인된 플랜에 따라 순차적으로 작업을 진행합니다. **섹션/단위별로 끊어서 진행**하며, 사용자 확인 후 다음 단계로 넘어갑니다.

#### Step 2.1: Base Styles & Layout

- **선행 작업**: `variables.scss` 및 `global.scss` 세팅.
- **레이아웃 구현**: `layout.tsx`에 Header/Footer 적용 및 퍼블리싱.

#### Step 2.2: Page & Section Iteration (반복 작업)

- 각 페이지의 섹션별로 아래 루틴을 수행합니다.
  1.  **HTML Structure**: 시멘틱 태그(`<section>`, `<article>`)로 구조 잡기.
  2.  **Components**: 재사용 가능한 UI 요소(`Button`, `Card` 등)는 `src/components`로 즉시 분리.
  3.  **CSS Styling**: SCSS Modules로 디자인 입히기.
  4.  **Linking**: 버튼이나 링크 영역에 `next/link`를 사용하여 페이지 이동 구현.

---

## 코드 작성 가이드라인 (Coding Standards)

1.  **구조와 스타일 우선 (UI/UX Focus)**
    - `useState` 등은 UI 인터랙션(예: 모바일 메뉴 토글, 아코디언)에만 최소한으로 사용합니다.
    - 데이터가 들어갈 자리는 하드코딩된 더미 데이터(Dummy Data)로 채워 디자인을 완성합니다.

2.  **컴포넌트 및 경로**
    - **Page**: `src/app/(site)/...` (실제 라우트)
    - **Components**: `src/components/shared` (공통), `src/features/[featureName]` (특정 기능)
    - **Assets**: 이미지는 `public/images`에 저장하고 최적화된 이름 사용.

3.  **협업 포인트**
    - 한 섹션이 끝날 때마다 "이 섹션의 디자인 구현이 완료되었습니다. 다음 섹션으로 넘어갈까요?"라고 물어봅니다.
