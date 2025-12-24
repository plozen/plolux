# PLOLUX 아키텍처 가이드 (PLOLUX Architecture Guide)

> **Document Version**: v1.0
> **Last Updated**: 2025-12-19
> **Description**: PLOLUX 프로젝트의 아키텍처 철학, 디렉토리 구조, 그리고 각 레이어의 역할을 정의한 최종 가이드입니다.

---

## 1. 아키텍처 개요 (Architectural Overview)

PLOLUX는 **Feature-Sliced Design (FSD)**의 모듈성과 **Atomic Design**의 재사용성을 결합하여, 확장 가능하고 유지보수가 용이한 구조를 지향합니다.

### 핵심 철학

1.  **명확한 책임 분리**: 화면(UI), 로직(Logic), API(Controller)의 역할이 명확히 구분되어야 합니다.
2.  **디자인 시스템 중심**: 디자인(Figma)과 코드의 간극을 최소화하는 Atomic Design 패턴을 사용합니다.
3.  **효율적인 라우팅**: Next.js App Router의 기능을 적극 활용하여 서비스 성격에 따라 라우팅을 분리합니다.

---

## 2. 디렉토리 구조 (Directory Structure)

```plaintext
packages/plolux/
├── src/
│   ├── app/                      # [Routing Layer] URL 라우팅 및 페이지 레이아웃 (Controller 역할)
│   │   ├── (site)/               # [Public Site] 일반 사용자용 메인 홈페이지
│   │   │   ├── layout.tsx        # 메인 레이아웃 (GNB, Footer 포함)
│   │   │   ├── page.tsx          # 메인 페이지 (Landing Page)
│   │   │   └── portfolio/        # 포트폴리오 등 서브 페이지
│   │   ├── (admin)/              # [Admin System] 관리자 전용 대시보드
│   │   │   ├── admin/            # URL Prefix: /admin
│   │   │   │   ├── _guide/       # [Dev Only] 스타일 가이드 및 컴포넌트 미리보기 페이지
│   │   │   │   ├── login/        # 관리자 로그인
│   │   │   │   └── dashboard/    # 관리자 메인 대시보드
│   │   │   └── layout.tsx        # 관리자 레이아웃 (Sidebar, Auth Guard 포함)
│   │   ├── api/                  # Backend Proxy / API Controllers
│   │   └── layout.tsx            # [Root Layout] HTML/Body, 전역 Providers (필수)
│   │
│   ├── components/               # [View Layer] 공유 UI 컴포넌트 (Atomic Design) (JSP/Thymeleaf 역할)
│   │   ├── atomic/               # (Atoms) 버튼, 인풋 등 최소 단위
│   │   ├── molecules/            # (Molecules) 검색바, 카드 등 조합
│   │   ├── organisms/            # (Organisms) 헤더, 복잡한 폼 등
│   │   └── templates/            # (Templates) 페이지 구조 스켈레톤
│   │
│   ├── features/                 # [Domain Layer] 비즈니스 로직 & 서비스 (Service/Model 역할)
│   │   ├── authentication/       # 인증/인가 서비스
│   │   ├── showcase/             # 작품/포트폴리오 관련 로직
│   │   └── [feature-name]/       # 기능별 도메인 모듈
│   │
│   ├── lib/                      # [Infrastructure Layer] 공통 유틸리티 및 설정
│   │   ├── utils.ts              # 공용 함수 (Date formatter, etc.)
│   │   └── constants.ts          # 전역 상수 관리 (설정값, 메시지 등)
│   │
│   ├── styles/                   # [Design Layer] 전역 스타일 및 디자인 토큰 관리 (SCSS)
│   │   ├── abstracts/            # (Zero-Output) 변수, 믹스인, 함수 모음 - 디자인 시스템의 핵심
│   │   │   ├── _variables.scss   # Color, Font, Spacing, Breakpoints 등 디자인 토큰
│   │   │   ├── _mixins.scss      # 반응형 분기, Flex/Grid 패턴 등 재사용 로직
│   │   │   └── _functions.scss   # px-to-rem 등 스타일 연산 함수
│   │   ├── base/                 # (Global-Output) 프로젝트 전역 기반 스타일
│   │   │   ├── _reset.scss       # 브라우저 기본 스타일 초기화
│   │   │   ├── _typography.scss  # 웹 폰트 로드 및 전역 텍스트 스타일
│   │   │   └── _base.scss        # HTML, Body, 공통 레이아웃 설정
│   │   ├── main.scss             # 위 파일들을 통합하여 App에 주입하는 진입점
│   │   └── (modules)             # (참고) 컴포넌트별 스타일은 각 컴포넌트 폴더 내 *.module.scss 권장
│   │
│   └── types/                    # [Type Layer] 전역 타입 및 공통 모델 정의 (DTO 역할)
│       └── global.d.ts
```

---

## 3. 계층별 상세 역할 (Layer Details)

스프링 부트(Spring Boot) 아키텍처에 익숙한 개발자를 위한 역할 매핑 가이드입니다.

### 3.1 Routing & API Layer (`src/app`) - **Controller**

- **역할**: 외부 요청을 수신하고, 적절한 화면이나 데이터를 반환합니다.
- **`app/(site), app/(admin)`**: 화면(View)을 서빙하는 컨트롤러입니다. Spring MVC의 `@Controller`와 유사합니다.
  - `page.tsx`: 실제 화면을 그리는 엔트리 포인트.
  - `layout.tsx`: 공통 UI(헤더, 사이드바)를 정의하는 템플릿.
- **`app/api/`**: JSON 데이터를 반환하는 REST API 컨트롤러입니다. Spring Boot의 `@RestController`와 정확히 일치합니다.
  - 외부 요청 수신 → `features` 호출 → 응답 반환.
- **참고**: 최상위 `src/app/layout.tsx`는 **필수 파일**로, 모든 페이지의 `<html lang="ko">`, `<body>` 태그 및 폰트 로드 등을 담당하는 '건물의 기초'입니다.

### 3.2 Domain Layer (`src/features`) - **Service**

- **역할**: 핵심 비즈니스 로직을 처리하는 실무 영역입니다. Spring의 `@Service` 계층에 해당합니다.
- **구성**:
  - 비즈니스 규칙, 상태 관리(State Management), 데이터 가공 로직이 포함됩니다.
  - API 요청(`app/api`)을 받아 실제 처리를 수행하거나, 화면 컴포넌트(`components`)에 필요한 데이터를 제공합니다.
  - UI 요소는 포함하지 않으며, 순수 로직(Hooks, Functions) 위주로 구성합니다.

### 3.3 View Layer (`src/components`) - **View**

- **역할**: 사용자에게 보여지는 UI 요소를 담당합니다. JSP, Thymeleaf, React View에 해당합니다.
- **특징**:
  - **Atomic Design**: 재사용성을 극대화하기 위해 작은 단위(Atom)부터 큰 단위(Organism) 순으로 조립합니다.
  - 로직은 최소화하고, `props`로 데이터를 받아 그리는 데 집중합니다.

### 3.4 Infrastructure Layer (`src/lib`) - **Common/Config**

- **역할**: 프로젝트 전반에서 공통적으로 사용되는 도구상자입니다.
- **`constants.ts`**: "프로젝트의 법전" 역할을 합니다. 하드코딩을 방지하기 위해 사이트명, API 경로, 설정값 등을 모아둡니다.
- **`utils.ts`**: 날짜 변환, 문자열 처리 등 자주 쓰이는 헬퍼 함수들을 모아둡니다.

### 3.5 Type Layer (`src/types`) - **Model/DTO**

- **역할**: 데이터의 형태(구조)를 정의하는 계약서입니다.
- **`global.d.ts`**: 전역적으로 사용되는 타입 정의.
- **공통 모델**: User, Product, Response 등 여러 곳에서 쓰이는 데이터 모델을 정의하여 일관성을 유지합니다.

---

## 4. 개발 핵심 가이드 (Development Guidelines)

1.  **매직 넘버 금지**: 모든 설정값, 반복되는 문자열은 `src/lib/constants.ts`에 정의하여 사용하세요.
2.  **역할 구분 준수**:
    - 화면을 그려야 한다면? → `src/components`
    - 복잡한 로직이나 데이터 처리가 필요하다면? → `src/features`
    - 새로운 페이지를 만들어야 한다면? → `src/app`
3.  **레이아웃 분리**:
4.  **절대 경로 Import 사용 의무화**:
    - 파일 import 시 상대 경로(`../../components/Button`) 대신 **절대 경로(`src/components/Button`)를 사용**하십시오.
    - 이는 프로젝트 구조가 변경되어도 import 경로가 깨지지 않게 하고, 코드 가독성을 높여줍니다.
    - 예시:
      - (O) `import Button from 'src/components/atomic/Button';`
      - (O) `@use "src/styles/abstracts/variables" as v;`
      - (X) `import Button from '../../../components/atomic/Button';`
