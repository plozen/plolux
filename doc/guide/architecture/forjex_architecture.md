# 🧠 Forjex — 시스템 아키텍처 개요

Forjex는 구조화된 디자인 브리프(설계 요약서)를 모듈식 AI 도구(MCP 서버) 체인을 통해, 완전히 배포 가능한 웹 애플리케이션으로 변환하는 **AI 기반 자동화 시스템**입니다.

---

## 📦 프로젝트 구조 (Monorepo)

```text
/forjex/
├── packages/
│   └── plolux/             # Next.js 기반 메인 웹 애플리케이션 (보일러플레이트)
├── prompts/                # 오케스트레이션을 위한 에이전트 지침 (.prompt.txt)
├── doc/                    # AI 및 개발자를 위한 기술 문서
├── AGENTS.md               # 주요 에이전트 정의
└── GEMINI.md               # Gemini 에이전트(Jeff Dean 페르소나) 지침
```

---

## 🔗 MCP 기반 자동화 흐름

1. **브리프 입력 (Brief Input)**
   - 사용자가 디자인 요구사항을 정의합니다.
   - `design-brief.json`이 로컬에 저장되거나 클라우드 저장소로 업로드됩니다.

2. **프롬프트 생성 (Prompt Generation)**
   - 브리프를 기반으로 `/prompts/` 디렉토리에 실행 가능한 `.prompt.txt` 파일이 생성됩니다.
   - 디자인 톤, 목표, 필요 섹션 등이 자연어로 변환되어 명시됩니다.

3. **에이전트 트리거 (Agent Triggered)**
   - Gemini CLI 에이전트가 프롬프트를 감지하고 작업을 시작합니다.
   - 필요한 경우 `doc/`의 기술 문서를 참조하여 `packages/plolux`에 코드를 작성합니다.

4. **MCP 도구 체인 활성화 (MCP Toolchain Activated)**
   - **Figma MCP Server**: 브리프 내용에 맞춰 디자인을 자동 생성하거나 가져옵니다.
   - **CodeGen MCP Server**: React/Next.js 컴포넌트 코드를 생성합니다.
   - **Deploy MCP Server**: 애플리케이션을 빌드하고 배포합니다.

5. **배포 결과물 (Deployment Output)**
   - **SSG (Static Site Generation)**: GitHub Pages, S3 (랜딩 페이지 등 저비용 호스팅)
   - **SSR (Server-Side Rendering)**: Vercel, AWS Lambda (SEO 및 동적 기능 필요 시)

---

## 💡 비즈니스 모델에 따른 이원화 아키텍처

Forjex의 `plolux` 패키지는 Next.js의 유연함을 활용하여 두 가지 트랙을 모두 지원합니다.

| 트랙 (Track) | 대상 프로젝트              | 렌더링 방식   | 배포 타겟            | 비용 효율       |
| :----------- | :------------------------- | :------------ | :------------------- | :-------------- |
| **CSR/SSG**  | 랜딩 페이지, 정보성 사이트 | Static Export | GitHub Pages, AWS S3 | 높음 (Low Cost) |
| **SSR**      | 쇼핑몰, 예약 시스템        | SSR / ISR     | Vercel, AWS Lambda   | 성능 중시       |

---

## 🎯 설계 목표 (Design Goals)

- **단일 진실 공급원 (Single Source of Truth)**: `design-brief.json` 파일 하나가 앱의 모든 구성을 결정하는 기준이 됩니다.
- **모듈식 자동화**: 각 도구는 독립적인 MCP 호환 마이크로서비스로 동작합니다.
- **프롬프트 기반 제어**: 복잡한 명령 없이 `.prompt.txt` 파일 생성만으로 작업 흐름을 트리거합니다.
- **확장성**: 다중 클라이언트 및 멀티 테넌트 SaaS 환경을 고려하여 설계되었습니다.
- **에이전트 친화적**: Gemini 등 AI 에이전트가 문서를 읽고 코드를 작성하기 최적화된 구조입니다.

---

## 🧾 관련 문서

- **[`GEMINI.md`](../GEMINI.md)**: 에이전트 페르소나 및 핵심 행동 지침
