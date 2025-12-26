# 구현 계획 (Implementation Plan) - PLOLUX

이 문서는 PLOLUX 웹 플랫폼 개발을 위한 단계별 구현 계획입니다. PLOZEN 아키텍처 가이드 v1.0과 개발 프롬프트 v2.0을 기반으로 작성되었습니다.

## 1단계: 프로젝트 초기화 및 아키텍처 설정

- [x] **초기화 및 정리**: Tailwind CSS 제거 및 관련 설정 삭제.
- [x] **디렉토리 구조**: FSD/Atomic 디자인에 따른 표준 디렉토리 생성 (`src/features`, `src/styles`, `src/components/atomic` 등).
- [x] **SCSS 아키텍처**:
  - [x] `src/styles/abstracts` 생성 (\_variables, \_mixins, \_functions).
  - [x] `src/styles/base` 생성 (\_reset, \_typography, \_base).
  - [x] `src/styles/main.scss` 생성 (진입점).
  - [x] `next.config.ts`에 SCSS 설정 구성.
- [x] **테마 시스템**: `next-themes`와 SCSS 변수를 활용한 라이트/다크 모드 구현.
- [x] **글로벌 레이아웃**: `src/app/layout.tsx`에 ThemeProvider 및 전역 스타일 적용.

## 2단계: 핵심 디자인 시스템 (Atomic Layer)

- [x] **타이포그래피**: 폰트 패밀리(Montserrat, Pretendard, Inter) 및 믹스인 정의.
- [x] **색상**: Bio Lime, Deep Void, Titanium Silver, Pure White 등 SCSS 변수 정의.
- [ ] **Atomic 컴포넌트**:
  - [ ] `Button` (Primary, Secondary 변형).
  - [ ] `Container` (반응형 너비 제어).
  - [ ] `Icon` (Lucide 아이콘 래퍼).

## 3단계: 글로벌 내비게이션 및 레이아웃

- [x] **헤더 컴포넌트**:
  - [x] 데스크탑 뷰 (로고, 내비게이션 링크, 테마 토글).
  - [x] 모바일 뷰 (햄버거 버튼).
  - [x] 글래스모피즘(Glassmorphism) 효과.
- [x] **모바일 메뉴 (Drawer)**:
  - [x] Framer Motion을 활용한 `AnimatePresence` 구현.
  - [x] 링크 라우팅 연결.
- [x] **푸터 컴포넌트**: 표준 푸터 레이아웃 구현.

## 4단계: 주요 페이지 구현

- [ ] **홈 페이지 (히어로 섹션)**:
  - [x] "The Reality Engine" 컨셉 적용.
  - [x] 스파크/회로 애니메이션 (기본 Pulse 효과).
  - [x] "Generate Your Plot" 슬로건.
  - [x] "프로젝트 시작하기" CTA 버튼.
- [ ] **견적 페이지 (Quote)**:
  - [x] 카드 기반의 UI 구현.
  - [x] 라우팅 설정 (`/quote`).
- [ ] **서브 페이지**: 서비스, 포트폴리오, 문의하기, FAQ (기본 골격).

## 4.1단계: 다이내믹 히어로 애니메이션 (네이버 스타일)

- [ ] **인터랙티브 캔버스 그리드 (`SparkGrid`)**:
  - [ ] HTML5 Canvas 배경 구현.
  - [ ] "바늘/나침반" 효과: 마우스에 반응하여 회전하는 그리드 라인.
  - [ ] "에너지 흐름": 유휴 상태(Idle)일 때의 자연스러운 웨이브 애니메이션.
  - [ ] 성능 최적화 (`requestAnimationFrame`, 오프스크린 렌더링 등).
- [ ] **통합 작업**:
  - [ ] `HeroSection`의 정적 CSS 배경을 `SparkGrid`로 교체.
  - [ ] 레이어링 확인 (텍스트 > 캔버스 > 배경).

## 5단계: 검증 및 완성도 향상

- [ ] **반응형 검수**: 모바일/태블릿/데스크탑 렌더링 확인.
- [ ] **인터랙션 튜닝**: 테마 토글 및 모달 트랜지션 부드러움 조정.
- [ ] **린트 및 정리**: Tailwind 잔재 확인 및 절대 경로 Import 준수 여부 점검.
