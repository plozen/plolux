## Role: DevOps Architect

## Task: Update CI/CD Pipeline for "Sync & Ship" Strategy

현재 프로젝트(`.github/workflows/deploy.yml`)에 **새로운 배포 파이프라인(Job)**을 추가해야 합니다.
기존의 `deploy-gh-pages` Job과 병렬로 실행되도록 설정하고, 모노레포 내의 특정 앱 폴더를 타겟 리포지토리로 동기화하는 로직을 구현해 주세요.

### 요구 사항 (Requirements)

1. **Target File**: `.github/workflows/deploy.yml`
2. **New Job Name**: `sync-to-plolux-web`
3. **Trigger Logic**: `deploy-gh-pages`와 상관없이 병렬 실행 (`needs: []`)
4. **Action**: `s0/git-publish-subdir-action@develop` 사용
5. **Secrets**: `PLOLUX_SYNC_TOKEN` 사용

### 삽입할 코드 (Code Snippet)

기존 `jobs:` 섹션의 가장 아래쪽에 다음 코드를 들여쓰기(Indent)에 맞춰 정확히 추가해 주세요.

```yaml
# [New] Sync specific package to independent repository for Delivery
sync-to-plolux-web:
  runs-on: ubuntu-latest
  needs: [] # Run in parallel with documentation deploy
  if: github.ref == 'refs/heads/main'
  steps:
    - name: Checkout Source Code
      uses: actions/checkout@v4
      with:
        fetch-depth: 0

    - name: Sync App to Plolux Repo
      uses: s0/git-publish-subdir-action@develop
      env:
        REPO: self
        BRANCH: main
        FOLDER: packages/plolux # Source folder in Monorepo
        GITHUB_TOKEN: ${{ secrets.PLOLUX_SYNC_TOKEN }}
        TARGET_REPO: Plolux-Corp/plolux-web # Target Destination
        MESSAGE: 'Ship: Plolux Engine Update ({sha})'
```

### 주의 사항

- YAML 문법 오류가 나지 않도록 jobs 레벨의 들여쓰기를 정확히 맞춰주세요.
- 기존의 deploy-gh-pages 로직은 건드리지 말고 유지해 주세요.

---

### [Check] AI가 작업을 완료하면 확인할 점

1.  `deploy.yml` 파일에 빨간 줄(문법 오류)이 없는지 확인.
2.  `packages/plolux` 경로가 정확한지 확인.
3.  `TARGET_REPO`가 `Plolux-Corp/plolux-web`으로 잘 들어갔는지 확인.

이 프롬프트를 입력하면 AI가 완벽하게 파일을 수정해 줄 것입니다. 바로 실행하십시오.
