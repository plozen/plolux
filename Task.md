# 태스크 리스트: PLOZEN 웹 플랫폼 개발

## 1단계: 프로젝트 초기 설정 및 아키텍처

- [x] `packages/plozen` 디렉토리 초기화 및 정리 (Tailwind 제거 확인)
- [x] 필수 의존성 설치 (`sass`, `framer-motion`, `lucide-react`, `next-themes`)
- [x] `next.config.ts` 설정 (SCSS 지원 및 GitHub Pages 배포 설정)
- [x] `PLOLUX_Architecture_Guide_v1.0.md`에 따른 디렉토리 구조 생성
  - [x] `src/styles/{abstracts,base,main.scss}`
  - [x] `src/app/(site)`, `src/app/(admin)`
  - [x] `src/components/{atomic,molecules,organisms,templates}`
  - [x] `src/features`, `src/lib`, `src/types`

## 2단계: 디자인 시스템 및 글로벌 스타일 (Sass)

- [x] `src/styles/abstracts/_variables.scss` 구현 (색상, 폰트, 브레이크포인트)
- [x] `src/styles/abstracts/_mixins.scss` 구현 (반응형, 유틸리티)
- [x] `src/styles/base/_reset.scss` 및 `_typography.scss` 구현
- [x] `src/styles/main.scss` 및 `globals.scss` 통합 및 테마 설정
- [x] `ThemeContext` (다크 모드) 구현

## 3단계: 레이아웃 및 내비게이션

- [x] `Header` 컴포넌트 구현 (데스크탑 및 모바일 햄버거 메뉴)
- [x] `Footer` 컴포넌트 구현
- [x] 루트 레이아웃 `src/app/layout.tsx` 작성 (Providers, 전역 스타일)
- [x] 사이트 레이아웃 `src/app/(site)/layout.tsx` 작성

## 4단계: 핵심 페이지 개발

- [x] 홈 (`/`): 히어로 섹션 ("Reality Engine" 애니메이션)
- [x] 서비스 (`/services`): 디자인 고도화 및 한글화, 이미지 추가
- [x] 포트폴리오 (`/portfolio`): 포트폴리오 그리드/리스트
- [x] 견적 요청 (`/quote`): 카드 스타일의 Typeform UI
- [x] 문의하기 & 자주 묻는 질문: 단순 정보 페이지

## 5단계: 검증 및 완성도 향상

- [ ] 모바일 반응형 테스트 (햄버거 메뉴, 터치 인터랙션)
- [ ] 다크 모드 토글 기능 검증
- [ ] Framer Motion 애니메이션 성능 점검
- [ ] 아키텍처 가이드 준수 여부 코드 리뷰
