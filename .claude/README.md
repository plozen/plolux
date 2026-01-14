# .claude 디렉토리 구조

이 디렉토리는 Claude Code AI 에이전트들의 작업 가이드라인과 계획 문서를 포함합니다.

## 📁 디렉토리 구조

```
.claude/
├── agents/             # 에이전트 프로필
│   ├── jeff-dean.md            # Jeff Dean (CTO - 오케스트레이터)
│   ├── backend-max.md          # Max (Principal Engineer - Backend)
│   ├── frontend-luna.md        # Luna (Lead Frontend - UI/UX)
│   ├── fullstack-kai.md        # Kai (Senior Full-Stack - 데이터/API)
│   └── security-viper.md       # Viper (Security Manager - QA)
├── commands/           # AI 에이전트 명령 및 가이드
│   ├── orchestrate.md          # 오케스트레이터 가이드 (슬래시 커맨드용)
│   └── subagent-guidelines.md  # 서브에이전트 작업 규칙
├── planning/          # 프로젝트 계획 문서
│   ├── tasks.md               # 작업 목록 및 진행 상황
│   └── prd.md                 # 제품 요구사항 명세
└── workflows/         # 워크플로우 가이드
    └── git-deploy-workflow.md # Git & 배포 워크플로우 요약
```

## 🎭 역할 구분

| 코드명 | 이름      | 직급                       | 역할                             | 에이전트 파일              | 모델                                   |
| ------ | --------- | -------------------------- | -------------------------------- | -------------------------- | -------------------------------------- |
| 👑     | Jeff Dean | CTO                        | 오케스트레이션 & 아키텍처        | `agents/jeff-dean.md`      | `anthropic/claude-opus-4-5`            |
| 🔧     | Max       | Principal Engineer         | Backend, DB, Docker              | `agents/backend-max.md`    | `anthropic/claude-opus-4-5`            |
| 🎨     | Luna      | Lead Frontend Engineer     | Frontend UI/UX, 디자인, 스타일링 | `agents/frontend-luna.md`  | `anthropic/claude-opus-4-5`            |
| ⚡     | Kai       | Senior Full-Stack Engineer | Frontend 데이터 레이어, API 연동 | `agents/fullstack-kai.md`  | `anthropic/claude-opus-4-5`            |
| 🛡️     | Viper     | Security Manager           | Security, QA, 코드 리뷰          | `agents/security-viper.md` | `google/antigravity-gemini-3-pro-high` |

### 권한 요약

- **Jeff Dean (CTO)**: `/deploy` skill 사용, main 브랜치 병합, 팀원 조율
- **서브에이전트 (Max, Luna, Kai, Viper)**: Worktree 내 로컬 커밋만 가능
- **Luna & Kai 협업**: Luna=UI/UX, Kai=데이터/로직으로 Frontend 영역 분담

## 📖 핵심 문서

### 1. [orchestrate.md](commands/orchestrate.md)

오케스트레이터(Jeff Dean)가 따라야 할 지침:

- 팀 구성 및 역할
- Git Worktree 전략
- `/deploy` skill 사용법
- 병합 및 배포 절차

### 2. [subagent-guidelines.md](commands/subagent-guidelines.md)

서브에이전트(Max, Luna, Kai, Viper)가 따라야 할 작업 규칙:

- Worktree 생성 및 사용
- TDD 사이클
- 완료 보고 형식
- 금지 사항

### 3. [git-deploy-workflow.md](workflows/git-deploy-workflow.md)

전체 Git & 배포 워크플로우 요약:

- 역할별 워크플로우 다이어그램
- Phase별 전략
- 커밋 메시지 규칙
- `/deploy` skill 사용 가이드

### 4. [tasks.md](planning/tasks.md)

현재 진행 중인 모든 작업 목록:

- 마일스톤별 태스크
- 담당자 및 상태
- 의존성 그래프

### 5. [prd.md](planning/prd.md)

KCL 프로젝트 요구사항 명세:

- 기술 스택
- 기능 요구사항
- 비기능 요구사항

## 🚀 빠른 시작

### 새로운 작업 시작하기

1. **CEO(사용자)**: `@[orchestrate.md]` 호출
2. **Jeff Dean**: 작업 분석 및 팀원 할당
3. **서브에이전트**: `subagent-guidelines.md` 참조하여 작업
4. **완료**: Jeff Dean이 `/deploy` skill로 배포

### 배포하기

```
@[.agent/prompts/deploy/deploy.md]
targetBranch: main
deploymentTarget: kcl
runLint: false
```

## 📝 규칙 요약

- ✅ 모든 배포는 `/deploy` skill 사용
- ✅ Phase 1+는 Worktree 필수
- ✅ 서브에이전트는 로컬 커밋만
- ✅ 오케스트레이터가 병합 및 배포 총괄
- ❌ 수동 커밋/푸시 금지
- ❌ 사용자 승인 없이 병합 금지

---

**마지막 업데이트**: 2026-01-14  
**관리자**: Jeff Dean (CTO)

### 변경 이력

- 2026-01-14: Kai (Senior Full-Stack Engineer) 팀 합류
- 2026-01-14: Jeff Dean 에이전트 파일 추가 (`agents/jeff-dean.md`)
- 2026-01-14: 에이전트 모델 설정 정리 (Viper → Gemini)
