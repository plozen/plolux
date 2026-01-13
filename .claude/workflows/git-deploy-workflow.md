# KCL 프로젝트 Git & 배포 워크플로우 요약

> 오케스트레이터(Jeff Dean)와 서브에이전트들이 따라야 할 표준 Git 워크플로우 및 배포 절차

---

## 🎯 핵심 원칙

### 1. 역할 분리

- **오케스트레이터 (Jeff Dean)**: 병합, 배포 총괄
- **서브에이전트 (Max/Luna/Viper)**: 개발 작업 수행, 로컬 커밋만

### 2. Git 전략

- **Phase 0**: main 브랜치에서 직접 작업
- **Phase 1+**: Git Worktree 사용 (병렬 작업 가능)

### 3. 배포 규칙

- **모든 배포는 `/deploy` skill 사용 필수!**
- 배포 태그 자동 생성: `[deploy:kcl]`, `[no-deploy]`, `[deploy:all]`

---

## 📊 워크플로우 다이어그램

```
┌─────────────────────────────────────────────────────────────┐
│                    PLOZEN 개발 워크플로우                    │
└─────────────────────────────────────────────────────────────┘

1️⃣ 태스크 할당
   CEO (사용자)
      ↓
   Jeff Dean (오케스트레이터)
      ├─→ Max (Backend)
      ├─→ Luna (Frontend)
      └─→ Viper (Security)

2️⃣ 개발 (서브에이전트)
   ┌──────────────────────────────┐
   │ Git Worktree 생성 (Phase 1+) │
   │ phase/X-taskname             │
   └──────────────────────────────┘
              ↓
   ┌──────────────────────────────┐
   │ TDD 사이클 (Phase 1+)        │
   │ RED → GREEN → REFACTOR       │
   └──────────────────────────────┘
              ↓
   ┌──────────────────────────────┐
   │ 로컬 커밋 (push 안함!)       │
   │ git commit -m "feat: ..."    │
   └──────────────────────────────┘
              ↓
   ┌──────────────────────────────┐
   │ 완료 보고                    │
   │ → 오케스트레이터에게         │
   └──────────────────────────────┘

3️⃣ 병합 및 배포 (오케스트레이터만!)
   ┌──────────────────────────────┐
   │ 작업 검토                    │
   │ → 사용자 승인 요청           │
   └──────────────────────────────┘
              ↓
   ┌──────────────────────────────┐
   │ /deploy skill 실행           │
   │ @[.agent/prompts/deploy/... ]│
   └──────────────────────────────┘
              ↓
   ┌──────────────────────────────┐
   │ 자동 처리:                   │
   │ • Git pull                   │
   │ • Worktree 병합              │
   │ • 커밋 메시지 생성           │
   │ • Git push                   │
   │ • GitHub Actions 트리거      │
   └──────────────────────────────┘
              ↓
   ┌──────────────────────────────┐
   │ GitHub Pages 배포            │
   │ https://plozen.github.io/... │
   └──────────────────────────────┘
```

---

## 🔄 Phase별 전략

### Phase 0: 프로젝트 셋업

- **Git**: main 브랜치에서 직접 작업
- **TDD**: 적용 안함
- **Worktree**: 생성 안함

### Phase 1+: 기능 개발

- **Git**: Worktree 별도 생성 (병렬 작업)
- **TDD**: 필수 (RED → GREEN → REFACTOR)
- **Worktree**: `../workspace-phaseX-taskname`

---

## 📝 커밋 메시지 규칙

### Conventional Commits 형식

```
타입(스코프): 한글 설명 [배포태그]

상세 내용
```

### 예시

```
feat(auth): 사용자 인증 API 구현 [deploy:kcl]

- JWT 토큰 발급 로직 추가
- bcrypt 비밀번호 해싱
- Supabase Auth 연동
```

### 배포 태그 종류

- `[deploy:kcl]`: KCL 프로젝트만 배포
- `[deploy:all]`: 전체 프로젝트 배포
- `[no-deploy]`: 배포 안함
- (태그 없음): 자동 감지

---

## 🚀 /deploy Skill 사용법

### 기본 사용

```
@[.agent/prompts/deploy/deploy.md]
targetBranch: main
deploymentTarget: kcl
runLint: false
```

### 파라미터

- `targetBranch`: 병합 대상 브랜치 (기본: main)
- `deploymentTarget`:
  - `kcl` (기본): KCL만 배포
  - `auto`: 변경 파일 자동 감지
  - `none`: 배포 안함
  - `all`: 전체 배포
- `runLint`: 배포 전 린트 실행 (기본: false)

---

## ⛔ 금지 사항

### 서브에이전트

- ❌ `git push` 절대 금지!
- ❌ main 브랜치로 직접 병합 금지!
- ❌ 배포 관련 작업 수행 금지!

### 오케스트레이터

- ❌ 사용자 승인 없이 병합 금지!
- ❌ `/deploy` skill 없이 수동 커밋/푸시 금지!
- ❌ 서브에이전트 영역 직접 코딩 금지!

---

## 📚 관련 문서

| 문서                      | 경로                                      | 설명                      |
| ------------------------- | ----------------------------------------- | ------------------------- |
| **오케스트레이터 가이드** | `.claude/commands/orchestrate.md`         | Jeff Dean 역할 및 팀 조율 |
| **서브에이전트 가이드**   | `.claude/commands/subagent-guidelines.md` | Max/Luna/Viper 작업 규칙  |
| **배포 프로세스**         | `.agent/prompts/deploy/deploy.md`         | 배포 자동화 스크립트      |
| **작업 목록**             | `.claude/planning/tasks.md`               | 현재 진행 중인 태스크     |
| **프로젝트 바이블**       | `doc/project/kcl/project_bible.md`        | KCL 설계 원칙             |

---

**마지막 업데이트**: 2026-01-12  
**작성자**: Jeff Dean (CTO)  
**버전**: 1.0.0
