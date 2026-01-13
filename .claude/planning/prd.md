# PRD: Product Requirements Document

## 프로젝트 개요

**프로젝트명**: PLOLUX Workspace
**버전**: 1.0.0
**작성일**: 2026-01-12
**최종 수정**: 2026-01-13
**작성자**: PLOZEN Team

---

## 목적 및 비전

## 목적 및 비전

**KCL (Kpop Company League)**는 전 세계 K-pop 팬덤이 **"최애 아티스트를 위해"** 소속사의 화력을 증명하는 실시간 대항전 플랫폼입니다.
단순한 회사 간 경쟁이 아닌, **[아티스트 검색 → 화력 지원 → 소속사 순위 상승]**으로 이어지는 팬심 기반의 인터랙티브 경험을 제공합니다.

---

## 핵심 요구사항

### 기술 스택

- **프레임워크**: Next.js 16.x (App Router)
- **언어**: TypeScript 5.x
- **스타일링**: SASS/SCSS (디자인 토큰)
- **백엔드**: Supabase (PostgreSQL)
- **국제화**: next-intl (12개 언어 지원)
- **패키지 매니저**: pnpm 10.18.1

### 아키텍처 원칙

- Feature-Sliced Design (FSD) 패턴
- 모노레포 구조 (확장성 대비)
- **데이터 중심 설계 (Schema First)**

### 데이터베이스 전략

**인프라 정책**:
- **기존 Supabase 프로젝트 활용** (신규 프로젝트 생성 안함)
- Free tier 2개 슬롯 중 1개 절약
- 환경 변수 및 관리 도구 통합 운영

**네이밍 컨벤션**:
- KCL 전용 테이블: `kcl_` 접두사 필수 (예: `kcl_companies`, `kcl_groups`)
- 다른 프로젝트 테이블과 네임스페이스 분리
- RLS 정책도 `kcl_*` 패턴으로 관리

**개발 단계 분리**:
1. **설계 단계 (현재)**: 스키마 문서(`schema.md`) 작성 및 ERD 설계
2. **구현 단계 (추후)**: 실제 테이블 생성 SQL 실행
3. **시딩 단계 (추후)**: 초기 데이터 입력 및 마이그레이션

---

## 기능 요구사항

### 1. 랭킹/투표 시스템 (Core)

- [ ] 다국어 랭킹 리더보드 (12개 언어)
- [ ] 실시간 투표 및 로직 (Redis Batching 고려)
- [ ] 회사별 상세 페이지 및 통계
- [ ] **통계 및 분석 (Analytics)**: 기존 `/ranking`을 데이터 분석 전용 페이지로 전환

### 2. 데이터베이스 및 관리

**Phase 1A: 스키마 설계** (✅ 완료)
- [x] **DB 스키마 설계 문서 작성** (`doc/project/kcl/schema.md`) ✅
  - `kcl_companies`: 소속사 정보 (HYBE, SM, etc)
  - `kcl_groups`: 아티스트 정보 (BTS, NewJeans, etc)
  - `kcl_votes`: 투표 내역
  - `kcl_comments`: 댓글 시스템 (선택)
  - `kcl_users`: 유저 정보 (Phase 2 대비)
  - ERD 다이어그램 포함
  - 컬럼 명세 및 인덱스 전략
  - Migration SQL 작성 완료 (`doc/project/kcl/migrations/001_create_tables.sql`)

**Phase 1B: 구현 및 시딩** (추후 진행)
- [ ] 실제 테이블 생성 (Migration SQL 실행)
- [ ] 데이터베이스 보안 (RLS 정책 적용)
- [ ] 초기 데이터 시딩 (Entertainments + Groups)

### 3. UI/UX (Integrated Dashboard)

**핵심 철학**: "**Artist First, Company Second**" - 내 가수를 통해 회사에 투표한다.

#### A. 홈 화면 구조 (통합 랭킹 시스템) - ✅ 구현 완료 (병합 대기)

- **기존 분리 구조 폐기**: 홈(선택) + 랭킹(조회) → **홈(조회+선택) 단일 페이지 통합** ✅
- **Mobile Layout**: ✅
  - **Header**: 로고 + **Sticky Search Bar** (최상단 고정)
  - **Body**: 전체 랭킹 리스트 (1위 ~ 끝까지 스크롤). 각 아이템 우측에 **상세 이동(>)** 버튼 배치.
  - **Interact**: 리스트 본문 터치 시 **[Bottom Sheet]** 오픈 (투표 모드)
- **PC Layout (Dual-Pane)**: ✅
  - **좌측 (Explorer)**: 검색바 + 랭킹 리스트 (65%)
  - **우측 (Battle Station)**: **[Sticky Panel]** 고정. 선택된 회사의 투표 컨트롤러 항시 노출 (35%)
  - **반응형**: 768px 브레이크포인트, 화면 축소 시 우측 패널 숨김 → Bottom Sheet 모드로 전환

#### B. 인터랙션 시스템 - ✅ 구현 완료 (병합 대기)

- **검색 & 포커싱 (Artist Context)**: ✅
  - **Keyword**: 소속사 이름뿐만 아니라 **아티스트(그룹) 이름**으로 검색 가능 (예: 'BTS' 검색 → 'HYBE' 매핑)
  - 검색어 입력(Enter) → 해당 소속사 위치로 **Auto-scroll** 및 **Active Highlight**
  - 즉시 투표 패널 활성화되며 **"For [Artist]"** 컨텍스트 자동 선택됨

- **리스트 아이템 인터랙션 (Progressive Action)**: ✅
  - **Main Body (Click)**: **[Bottom Sheet/Panel]** 오픈 → 투표 모드 진입
  - **Accessory (Right Icon)**: `Chevron (>)` 아이콘 클릭 → **[/company/{id}] 상세 페이지** 이동
  - **Visual**: 각 소속사 하단에 **'Key Artists'** (대표 아티스트) 텍스트 뱃지 노출

- **투표 패널 (Bottom Sheet & Sticky Panel)**: ✅
  - 상단: 선택된 소속사 로고 및 현재 화력 점수
  - 중단: **"누구의 팬이신가요?"** 질문과 함께 소속 아티스트 **[Chips]** 가로 스크롤 제공
  - 하단: 초대형 **[투표 버튼]** (클릭 시 파티클 + 숫자 팝업 이펙트 - canvas-confetti 활용)

---

## 비기능 요구사항

### 성능

- [x] React Compiler 활성화
- [x] 정적 사이트 최적화
- [ ] 번들 크기 최적화

### 보안

- [ ] 데이터베이스 보안 (RLS)
- [ ] 환경 변수 보호
- [ ] HTTPS 강제

### 배포

- [x] GitHub Actions 자동 배포
- [x] GitHub Pages 호스팅
- [x] 저장소 동기화

---

## 제약 조건

- Node.js 22.x 필수
- pnpm workspace 사용 필수
- packages/ 안에는 코드만, AI 문서는 workspace 레벨

---

## 성공 기준

1. **통합 대시보드 구현 완료**: 홈에서 투표와 랭킹 확인이 한 화면에서 이루어짐
2. KCL 애플리케이션 정상 빌드 및 배포
3. 12개 언어 모두 정상 작동 및 라우팅
4. GitHub Pages 자동 배포 성공
5. DB 스키마 설계 완료 및 연동
6. 타입 에러 0건, 빌드 경고 최소화
