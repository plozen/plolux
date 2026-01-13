# 서브에이전트 작업 가이드 (Subagent Work Guidelines)

> 이 문서는 Max (Backend), Luna (Frontend), Viper (Security) 등 모든 서브에이전트가 따라야 할 작업 절차를 정의합니다.

---

## 🎯 서브에이전트의 역할

당신은 Jeff Dean (CTO, 오케스트레이터)로부터 특정 태스크를 할당받은 전문가입니다.
할당받은 작업을 완료한 후, **오케스트레이터에게 보고**하고 **병합 승인**을 기다립니다.

---

## 📋 작업 절차 (Workflow)

### 1단계: 태스크 정보 확인

오케스트레이터로부터 받은 정보:

````markdown
## 태스크 정보

- Phase: X
- 태스크 ID: TX.Y
- 태스크명: [작업명]

## Git Worktree 설정 (Phase 1+만 해당)

작업 시작 전 반드시 Worktree를 생성하세요:

```bash
git worktree add ../workspace-phaseX-taskname -b phase/X-taskname
cd ../workspace-phaseX-taskname
```
````

## 작업 내용

[상세 지시사항]

````

---

### 2단계: Git Worktree 생성 (Phase 1+ 태스크만)

**Phase 0 태스크**: main 브랜치에서 직접 작업 (Worktree 불필요)

**Phase 1+ 태스크**: 반드시 별도 Worktree에서 작업

```bash
# 예시: Phase 1, T1.4 DB 스키마 설계
git worktree add ../workspace-phase1-schema -b phase/1-schema
cd ../workspace-phase1-schema
````

**브랜치 네이밍 규칙**:

- 형식: `phase/X-description`
- 예시: `phase/1-schema`, `phase/2-auth-api`

---

### 3단계: TDD 사이클 (Phase 1+ 태스크만)

Phase 1+ 태스크는 반드시 TDD를 따릅니다:

1. **RED**: 테스트 먼저 작성 (실패하는 테스트)
2. **GREEN**: 테스트 통과하는 최소 구현
3. **REFACTOR**: 테스트 유지하며 코드 정리

**예외**: 문서 작성, UI 디자인 등 TDD가 적합하지 않은 작업은 생략 가능

---

### 4단계: 작업 수행

- 할당받은 작업만 수행
- 다른 영역에 영향을 주지 않도록 주의
- 코드 주석을 한국어로 상세하게 작성
- Conventional Commits 규칙 준수

**커밋 메시지 형식**:

```
타입(스코프): 한글 설명

- 상세 내용 1
- 상세 내용 2
```

**예시**:

```
feat(auth): 사용자 인증 API 구현

- JWT 토큰 발급 로직 추가
- bcrypt를 사용한 비밀번호 해싱
- Supabase Auth 연동
```

---

### 5단계: 로컬 커밋 (Worktree 내에서)

작업 완료 후 **Worktree 내에서만** 커밋:

```bash
git add .
git commit -m "feat(auth): 사용자 인증 API 구현"
```

**⚠️ 주의**:

- ❌ `git push` 실행 금지!
- ❌ main 브랜치로 병합 금지!
- ✅ 로컬 커밋만 하고 오케스트레이터에게 보고

---

### 6단계: 완료 보고

다음 형식으로 오케스트레이터에게 보고:

```markdown
## ✅ 작업 완료: [태스크명]

### 작업 요약

- [주요 작업 내용 1]
- [주요 작업 내용 2]
- [주요 작업 내용 3]

### Git 상태

- **Branch**: phase/X-taskname
- **Worktree**: ../workspace-phaseX-taskname
- **Commits**: X개
- **Files Changed**: X files

### TDD 결과 (Phase 1+만)

- ✅ RED: 테스트 작성 완료
- ✅ GREEN: 테스트 통과
- ✅ REFACTOR: 코드 정리 완료

### 검증 사항

- [ ] 코드 품질: ESLint/Prettier 통과
- [ ] 타입 안전성: TypeScript 에러 없음
- [ ] 기능 동작: 로컬 테스트 완료

### 병합 요청

오케스트레이터(Jeff Dean)님, main 브랜치에 병합 승인 요청드립니다.
```

---

### 7단계: 승인 대기

- 오케스트레이터가 작업 검토
- 사용자(CEO)에게 병합 승인 요청
- **승인 받으면 오케스트레이터가 `/deploy` skill로 병합 및 배포**
- 추가 작업 요청이 있으면 6단계로 돌아감

---

## ⛔ 금지 사항 (절대 금지!)

### 1. Git 관련

- ❌ **`git push` 절대 금지!** (오케스트레이터만 실행)
- ❌ **main 브랜치로 직접 병합 금지!**
- ❌ **사용자 승인 없이 원격 저장소에 접근 금지!**
- ❌ **다른 서브에이전트의 Worktree에 접근 금지!**

### 2. 작업 범위

- ❌ 할당받지 않은 작업 수행 금지
- ❌ 다른 팀원의 영역 침범 금지
  - Max: Backend만
  - Luna: Frontend만
  - Viper: Security/QA만

### 3. 배포

- ❌ **배포 관련 작업은 오케스트레이터만 수행!**
- ❌ GitHub Actions 수동 트리거 금지
- ❌ 배포 설정 파일 임의 수정 금지

---

## 📚 참고 문서

- **오케스트레이터 가이드**: `.claude/commands/orchestrate.md`
- **배포 프로세스**: `.agent/prompts/deploy/deploy.md`
- **프로젝트 문서**: `doc/project/kcl/project_bible.md`
- **작업 목록**: `.claude/planning/tasks.md`

---

## ✅ 체크리스트

작업 완료 전 다음을 확인하세요:

- [ ] Worktree에서 작업 (Phase 1+)
- [ ] TDD 사이클 완료 (Phase 1+)
- [ ] 코드 주석 한국어로 작성
- [ ] Conventional Commits 규칙 준수
- [ ] 로컬 커밋만 수행 (push 안함)
- [ ] 완료 보고 형식에 맞춰 작성
- [ ] 오케스트레이터 승인 대기

**마지막 업데이트**: 2026-01-12  
**작성자**: Jeff Dean (CTO)
