# Repository Push & Conditional Deploy Prompt

## 목적

- `C:\Plolux\workspace\` 로컬 저장소의 변경 사항을 지정한 브랜치로 안전하게 커밋하고 푸시합니다.
- 자동 배포를 실행할지, 특정 대상에 수동 배포할지, 또는 배포를 건너뛸지 프롬프트에서 선택할 수 있도록 합니다.

## 입력 파라미터

### 파라미터 설명

- `targetBranch`: 푸시할 Git 브랜치명 (예: `main`, `develop`).
- `deploymentTarget`: 배포 실행 방식을 지정합니다.
  - `'auto'`: 커밋 메시지에 별도 태그를 추가하지 않습니다. CI/CD는 변경된 파일을 감지하여 **자동으로 배포**합니다.
  - `'none'`: 커밋 메시지에 `[no-deploy]` 태그를 추가합니다. CI/CD는 **배포를 실행하지 않습니다.**
  - `'plozen'`, `'plolux'`, `'all'` 등: 커밋 메시지에 `[deploy:타겟]` 태그를 추가하여 **수동으로 배포를 강제**합니다. 여러 대상을 지정하려면 쉼표로 구분합니다 (예: `'plozen,plolux'`).
- `runLint`: 린트 테스트(`pnpm lint`) 실행 여부를 결정합니다.

### 파라미터 기본값

- `targetBranch`: `main`
- `deploymentTarget`: `kcl`
- `runLint`: `false`

## 절차 개요

1. **린트 실행 (선택 사항)** → `runLint`가 `true`일 경우, 코드 스타일 및 잠재적 오류가 없는지 확인.
2. **원격 동기화** → `git pull`로 최신 변경 사항 반영.
3. **스테이징** → `git add`로 변경 사항을 스테이징.
4. **커밋** → **한글로 작성된 커밋 메시지**와 함께 커밋. `deploymentTarget` 값에 따라 적절한 배포 태그 포함.
5. **푸시** → `git push origin {targetBranch}`.
6. **배포** → 푸시된 커밋의 태그와 내용에 따라 GitHub Actions 워크플로가 배포를 자동으로 처리합니다.
7. **보고** → 각 단계 완료 및 특이사항을 사용자에게 보고.

## 세부 지침

### 0. 사전 보고

- **배포 작업은 YOLO 모드(질문/확인 생략)로 신속하게 진행합니다.**
- 전체 계획과 사용할 `targetBranch`, `deploymentTarget` 값을 사용자에게 요약 보고합니다.

### 1. 린트 단계 (Lint Phase, 선택 사항)

- `runLint` 파라미터가 `true`일 경우, `pnpm lint`를 실행하여 코드 품질과 스타일을 검증합니다.

### 2. git pull 단계

- `git pull origin {targetBranch}`를 실행합니다.

### 3. git add → commit 단계

- `git status --short`로 변경 파일 확인 후 사용자에게 간단 보고합니다.
- 필요한 파일만 `git add`로 스테이징합니다.
- 커밋 메시지는 **Conventional Commits** 규칙을 따르며, 제목의 전체 형식은 `타입(스코프): 한글 설명 [배포태그]` 입니다.
  - **설명 부분은 반드시 한국어로 작성합니다.**
  - 예시: `fix(ci): CI 빌드 오류 수정 [deploy:all]`
- `deploymentTarget` 값에 따라 위의 `[배포태그]` 부분이 결정됩니다.
  - `deploymentTarget` == `'none'`: `[no-deploy]`
  - `deploymentTarget` == `'auto'`: 태그 없음
  - `deploymentTarget`이 그 외의 값: `[deploy:{deploymentTarget}]`
- 위 규칙에 따라 생성된 커밋 메시지로 변경 사항을 커밋합니다.

### 4. git push 단계

- `git push origin {targetBranch}`를 실행합니다.

### 5. GitHub Actions 배포

- 실제 배포 로직은 GitHub Actions에 의해 커밋 메시지 태그에 따라 자동으로 처리됩니다.
- 에이전트는 배포의 성공/실패 여부를 확인하는 역할만 수행합니다.
- `[deploy:all]` 태그를 사용하면 `.github/workflows/deploy.yml` 워크플로가 `packages` 폴더의 모든 프로젝트를 동시에 배포하도록 트리거됩니다.

### 6. 단계별 보고

- 각 단계 시작 전 계획, 진행 중 발생한 특이사항, 완료 후 결과를 모두 한국어로 사용자에게 공유합니다.
- 문제 발생 시 항상 **“문제 설명 → 해결 방안 제안 → 사용자 승인 → 해결 적용 → 단계 재시도”** 플로우를 따릅니다.
