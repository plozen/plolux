# PLOLUX System Architecture Technical Specification

## 1. Planning & User Interface Layer (기획 및 사용자 접점)

이 섹션은 사용자 요구사항이 데이터화되어 시스템으로 유입되는 초기 진입점과 자동화된 기획 파이프라인을 정의한다.

### 1.1 Actors & Interfaces

- **Node:** User (사용자)
  - **Role:** 서비스 최종 사용자.
  - **Action:** PLOLUX 홈페이지를 통해 '제작 의뢰'를 수행.
  - **Flow:** User → PLOLUX 홈페이지 (Request).
- **Node:** 기획자 (Human Planner)
  - **Role:** 사용자 요구사항 분석 및 시스템 감독.
  - **Action:**
    - User와 커뮤니케이션(communication) 수행.
    - Prototype을 확인(read)하고 검수.
    - Figma Design에 대해 직접적인 디자인 수정(디자인 수정) 수행.
- **Node:** PLOLUX 홈페이지 (Front Interface)
  - **Component:** 홈페이지 기획 입력 페이지 (Form Submit).
  - **Logic:** 사용자의 의뢰 내용을 정형화된 데이터로 변환하여 DB로 전송.
  - **Connection:** User → Input Page → Database.

### 1.2 Automation Logic (Orchestration)

- **Node:** Database
  - **Role:** 기획 데이터(Raw Data)의 저장소.
  - **Connection:** PLOLUX 홈페이지 (Write) / n8n (Read).
- **Node:** n8n (Workflow Orchestrator)
  - **Trigger:** DB에 새로운 기획 데이터 적재 시 실행.
  - **Process:** '데이터 조회' 수행 후, 내장된 로직에 따라 프롬프트 엔지니어링 수행.
  - **Integration:**
    - Database에서 데이터 조회.
    - 기존에 가지고 있는 프롬프트와 데이터를 조합.
    - LLM (Gemini, Claude)에게 전송하여 최적화된 input prompt 생성.
  - **Output:** Figma Make 노드로 생성된 프롬프트 전달.
- **Node:** LLM (Service Level)
  - **Models:** Gemini, Claude.
  - **Role:** n8n의 요청을 받아 자연어 기획서를 Figma가 이해할 수 있는 구조화된 프롬프트로 변환.

## 2. Design Layer (Figma Ecosystem)

이 섹션은 텍스트 기반의 기획이 시각적 산출물로 변환되고, 이를 다시 개발 가능한 코드로 추출하는 과정을 정의한다.

### 2.1 AI-Driven Design Generation

- **Node:** Figma Make (AI Generator)
  - **Input:** n8n으로부터 input prompt 수신.
  - **Action:** 별도의 LLM에 입력하여 UI/UX 컴포넌트 및 레이아웃 자동 생성.
  - **Output:** 생성된 디자인 초안.
- **Node:** Figma Design (Main Artifact)
  - **Role:** 실제 개발의 기준이 되는 마스터 디자인 파일.
  - **Transition:** Figma Make에서 생성된 결과물은 [Copy Design] click 액션을 통해 Figma Design으로 이관됨.
  - **Interaction:** 기획자가 수동으로 수정(디자인 수정) 가능하며, 이 변경사항은 실시간 반영됨.

### 2.2 Visualization & Feedback

- **Node:** Prototype
  - **Role:** User와 기획자가 시각적으로 확인하는 뷰어.
  - **Source:** Figma Design의 상태를 실시간으로 반영(read).

### 2.3 Design-to-Code Bridge (Critical Path)

- **Node:** Figma Desktop MCP Server
  - **Protocol:** MCP (Model Context Protocol).
  - **Role:** Figma Design의 시각적 속성(Layout, Color, Typography, Grid)을 텍스트 기반의 컨텍스트(JSON/Code Spec)로 변환.
  - **Action:** "디자인을 읽어서 개발 진행 가능" 상태로 데이터를 가공하여 Forjex (AI Agent) 및 Cursor Talk MCP Server로 전달.
  - **Connection:** Figma Design → Figma Desktop MCP Server → Development Layer.

## 3. Development Layer (Forjex Locator On-Premise Server)

이 아키텍처의 핵심 엔진으로, Human-AI 협업과 완전 자동화된 코딩 루프(Robo-Coding)가 실행되는 영역이다.

### 3.1 Human Control Tower

- **Node:** 개발자 (Lead Developer)
  - **Authority:** 최종 의사결정권자 및 AI 감독관.
  - **Actions:**
    - Claude Desktop LLM에게 자연어로 수정 명령(수정 명령) 전달.
    - Cursor Talk MCP Server를 통해 직접적인 컨텍스트 주입.
    - Forjex AI Agent에게 개발 시작 명령(명령) 하달.
- **Node:** Claude Desktop LLM
  - **Role:** 개발자의 로컬 환경에서 실행되는 1차 AI 인터페이스.
  - **Flow:** 개발자 ↔ Claude Desktop ↔ Forjex.

### 3.2 Connectivity & Context

- **Node:** Cursor Talk to MCP Server
  - **Role:** 이기종 도구 간의 맥락(Context)을 연결하는 허브.
  - **Inputs:** Figma Desktop MCP, Claude Desktop LLM.
  - **Outputs:** Forjex (AI Agent).
  - **Function:** 디자인 정보와 개발자의 의도를 통합하여 Agent가 참조할 수 있는 형태로 변환.

### 3.3 Forjex (Autonomous AI Agent)

- **Definition:** 다중 LLM 엔진을 탑재한 자율 코딩 에이전트 시스템.
- **Internal Engines (Brain):**
  - **Claude Code:** 메인 코딩 로직 처리.
  - **Cursor:** 에디터 통합 및 코드 조작.
  - **Antigravity (Gemini 3.0 / Claude Sonnet):** 고난이도 추론 및 아키텍처 설계.
  - **Gemini CLI:** 터미널 기반의 신속한 명령 처리.
- **Data Ingestion:** Figma Desktop MCP Server로부터 디자인 데이터 수신 ("디자인을 읽어서 개발 진행 가능").

### 3.4 Vibe Coding Workflow (Robo-Coding Loop)

Forjex 내부에서 실행되는 순차적 자동화 프로세스이다.

- **Trigger:** Vibe Coding Start.
- **Step 1: Publishing**
  - Figma 데이터를 기반으로 정적 UI(HTML/CSS/React) 구조화.
- **Step 2: Frontend Develop**
  - 동적 기능 구현, 상태 관리(State Management) 로직 작성.
- **Step 3: Backend Develop**
  - API 연동 및 서버 사이드 로직 구현 (필요 시).
  - **Note:** Frontend 완료 후 순차 진행.
- **Step 4: TEST / Debugging**
  - **Action:** 생성된 코드의 런타임 테스트 및 에러 검출.
  - **Feedback Loop:** 에러 발생 시 Frontend Develop 또는 Backend Develop 단계로 회귀하여 자체 수정(Self-Correction) 수행.
- **Step 5: Commit / Push / Pull**
  - **Action:** 검증된 코드를 로컬 Git 저장소에 커밋하고 원격 서버로 푸시.
  - **Output:** Github MCP Server를 통해 배포 파이프라인으로 이관.

## 4. Deployment Layer (GitHub & Cloud)

코드가 저장되고 실제 서비스 환경으로 배포되는 CI/CD 파이프라인이다.

### 4.1 Repository & Sync

- **Node:** Github MCP Server
  - **Role:** 로컬 개발 환경(Forjex)과 원격 저장소(GitHub) 간의 동기화 에이전트.
  - **Flow:** Forjex Output → Github MCP Server → Forjex Repository.
- **Node:** Forjex (Repository)
  - **Type:** GitHub Remote Repository.
  - **Role:** 소스 코드 형상 관리 및 CI/CD 트리거.

### 4.2 CI/CD Pipeline

- **Node:** CICD
  - **Role:** Github Actions 등을 이용한 자동 빌드 및 배포 스크립트 실행.
  - **Branching Strategy:** 브랜치 또는 태그에 따라 MVP 또는 Product 환경으로 분기.

### 4.3 Target Environments

- **Path A: MVP (Minimum Viable Product)**
  - **Infrastructure:** Github Pages, Vercel.
  - **Purpose:** 기획자 및 내부 이해관계자 테스트용, 빠른 배포 주기.
- **Path B: Product (Production)**
  - **Infrastructure:** AWS, CloudFlare Pages.
  - **Purpose:** 실제 사용자 트래픽을 처리하는 운영 환경. 안정성 최우선.
- **User Feedback:** 배포된 Product는 다시 User에게 제공되어 순환 구조(Loop) 완성.

---

## System Constraints & Rules (시스템 제약 사항 및 규칙)

- **Automation Priority:** 디자인 변경 사항은 Figma MCP를 통해 자동으로 개발 환경에 전파되어야 하며, 수동 복사/붙여넣기를 지양한다.
- **Single Source of Truth:** 디자인의 원본은 Figma Design이며, 코드의 원본은 Forjex Repository이다.
- **Agent Loop:** Forjex Agent는 Test/Debugging 단계에서 오류가 없을 때까지 코드를 커밋하지 않는다 (Atomic Commit 원칙).
- **Role Separation:** n8n은 기획의 자동화를, Forjex는 개발의 자동화를 담당하며 두 영역은 명확히 분리된다.
