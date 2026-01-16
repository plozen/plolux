# AGENTS.md - AI Agent Operational Guidelines

This document defines the operational standards, code style, and workflows for AI agents (Claude, ChatGPT, etc.) working in the Plolux monorepo.

## 1. Project Context & Architecture

- **Type**: Monorepo using `pnpm` workspaces.
- **Framework**: Next.js 16 (App Router), React 19.
- **Language**: TypeScript 5.x (Strict Mode).
- **Backend**: Supabase (Auth, DB, Realtime).
- **Styling**: SCSS (SASS) with Design Tokens. **Do NOT use TailwindCSS** (exception: `mentalage` uses Tailwind).
- **Package Manager**: `pnpm` (Version 10.x).

### Workspace Structure

- `packages/kcl`: K-pop Company League app (Multi-language i18n).
- `packages/plozen`: Main admin/portfolio platform.
- `packages/plolux`: Landing/Demo sites.
- `packages/mentalage`: Mental Age Test viral quiz app (Multi-language, Static Export).

## 2. Operational Commands

**IMPORTANT**: Always run commands from the root using `pnpm --filter <package>`. Do not `cd` into packages.

### Build & Run

- **Start Dev Server**:
  ```bash
  pnpm --filter <package_name> dev  # e.g., pnpm --filter kcl dev
  ```
- **Build for Production**:
  ```bash
  pnpm --filter <package_name> build
  ```
- **Linting & Formatting**:
  ```bash
  pnpm lint  # Runs eslint, prettier, tsc across workspace
  pnpm --filter <package_name> lint # Target specific package
  ```

### Testing

- **Current Status**: ⚠️ No test runner is currently configured (`"test": "echo..."`).
- **Action**: If asked to test, check if a runner (Vitest/Jest) has been added. If not, inform the user or propose setting up **Vitest**.
- **Future Convention**: If adding tests, use `*.test.tsx` or `*.spec.ts` colocated with components/logic.

## 3. Code Style & Conventions

### Language & Localization

- **Comments**: **MUST be in KOREAN**. All JSDoc and inline explanations must be written in Korean.
  - Example: `/** 사용자 프로필을 업데이트합니다 */`
- **Strings**:
  - `kcl`: Use `next-intl`. Add keys to `src/messages/{locale}.json`. Do not hardcode strings in UI.
  - `plozen`/`plolux`: Hardcoded strings allowed if no i18n req, but prefer constants.

### Naming Conventions

- **Directories**: `kebab-case` (e.g., `src/components/user-profile`).
- **Files**:
  - Components: `PascalCase` (e.g., `UserProfile.tsx`).
  - Utilities/Hooks: `camelCase` (e.g., `useAuth.ts`, `formatDate.ts`).
- **Variables/Functions**: `camelCase`.
- **Types/Interfaces**: `PascalCase`.

### Imports

- **Aliases**: Use `@/` for `src/` imports.
  ```typescript
  // ✅ Good
  import { Button } from '@/components/common/Button';
  // ❌ Bad
  import { Button } from '../../../components/common/Button';
  ```
- **Order**: External deps -> Internal absolute (`@/...`) -> Relative.

### Component Structure (FSD Inspired)

Follow the specific layer structure:

- `src/app/`: App Router pages (Controllers).
- `src/components/common/`: Generic UI (Buttons, Inputs).
- `src/components/features/`: Domain-specific components.
- `src/features/`: Business logic, services.
- `src/lib/`: Infrastructure (Supabase client, Utils).
- `src/types/`: Shared TypeScript definitions.

### Styling (SCSS)

- Use **SCSS** files in `src/styles/` or Component-level modules (`*.module.scss`).
- Use `classnames` library for conditional classes.
- Use variables/mixins from `src/styles/abstracts/`.
- **Prohibited**: TailwindCSS (unless explicitly overridden by user).

### Error Handling & Validation

- **Validation**: Use **Zod** for all schema validation (forms, API responses).
- **Forms**: Use `react-hook-form` with `zodResolver`.
- **Async**: Always use `try/catch` in async handlers.

## 4. Agent Workflow Rules

1.  **Read First**: Always read the relevant files (`read` tool) before editing. Never guess content.
2.  **Verify**: After editing, run `pnpm --filter <pkg> lint` to ensure no regressions.
3.  **Docs**: If creating new features, verify `doc/` or `CLAUDE.md` alignment.
4.  **Deps**: Use `pnpm --filter <pkg> add <lib>` to install dependencies.
5.  **Persona**: Act as a technical partner (Jeff Dean persona defined in `CLAUDE.md`).
6.  **I18n Check**: When modifying `kcl`, ALWAYS check `src/messages/` to ensure translations exist for 12 supported languages if adding text.

## 5. Deployment Architecture (CRITICAL)

### Repository Structure

Plolux는 **모노레포 + 개별 리포 sync** 구조를 사용한다:

```
plolux (모노레포)
    │
    ├── packages/plozen ──sync──→ plozen/plozen-web (Cloudflare Pages)
    ├── packages/plolux ──sync──→ plozen/plolux-web (Cloudflare Pages)
    ├── packages/kcl ─────sync──→ plozen/kcl (Cloudflare Workers)
    └── packages/mentalage sync──→ moony01/mentalage (GitHub Pages)
```

### Sync 대상 리포지토리 목록

| 패키지    | 소스 경로            | 대상 리포지토리     | 배포 플랫폼        |
| --------- | -------------------- | ------------------- | ------------------ |
| plozen    | `packages/plozen`    | `plozen/plozen-web` | Cloudflare Pages   |
| plolux    | `packages/plolux`    | `plozen/plolux-web` | Cloudflare Pages   |
| kcl       | `packages/kcl`       | `plozen/kcl`        | Cloudflare Workers |
| mentalage | `packages/mentalage` | `moony01/mentalage` | GitHub Pages       |

### CI/CD 워크플로우 (`.github/workflows/deploy.yml`)

#### 트리거

- `main` 브랜치에 push 시 자동 실행

#### Jobs 구조

```yaml
jobs:
  changes: # 변경된 패키지 감지 (dorny/paths-filter)
  build-and-deploy: # plolux 정적 사이트 → GitHub Pages 직접 배포
  sync-to-plozen-web: # packages/plozen → plozen/plozen-web
  sync-to-plolux-web: # packages/plolux → plozen/plolux-web
  sync-to-kcl: # packages/kcl → plozen/kcl
  sync-to-mentalage: # packages/mentalage → moony01/mentalage
```

#### Sync 메커니즘

- **Action**: `cpina/github-action-push-to-another-repository@main`
- **Token**: `FORJEX_SYNC_TOKEN` (GitHub Personal Access Token)
- **동작**: 소스 디렉토리 전체를 대상 리포의 main 브랜치로 push

### Deployment Flow

```
1. 개발자가 plolux 모노레포 main 브랜치에 push
                    ↓
2. GitHub Actions (deploy.yml) 실행
                    ↓
3. 각 패키지를 개별 리포지토리로 sync
                    ↓
4. 개별 리포의 자체 워크플로우가 배포 실행
   - Cloudflare: Git 연동으로 자동 배포
   - GitHub Pages: 리포 내 워크플로우 실행
```

### SSR 프로젝트와 정적 사이트

**중요**: SSR/API 라우트가 있는 프로젝트는 **GitHub Pages 배포 불가** → Cloudflare 사용.

| 패키지    | SSR/API | output 모드 | 배포 플랫폼        |
| --------- | ------- | ----------- | ------------------ |
| kcl       | ✅ 있음 | standalone  | Cloudflare Workers |
| plozen    | ✅ 있음 | standalone  | Cloudflare Pages   |
| plolux    | ❌ 없음 | export      | Cloudflare Pages   |
| mentalage | ❌ 없음 | export      | GitHub Pages       |

### 새 패키지 추가 시 CI/CD 설정 가이드

새로운 패키지를 추가하고 배포하려면:

1. **패키지 생성**: `packages/<new-package>/` 디렉토리 생성
2. **대상 리포 생성**: GitHub에서 빈 리포지토리 생성
3. **Sync Job 추가**: `.github/workflows/deploy.yml`에 sync job 추가:
   ```yaml
   sync-to-<new-package>:
     runs-on: ubuntu-latest
     needs: []
     if: github.ref == 'refs/heads/main'
     steps:
       - uses: actions/checkout@v4
         with:
           fetch-depth: 0
       - uses: cpina/github-action-push-to-another-repository@main
         env:
           API_TOKEN_GITHUB: ${{ secrets.FORJEX_SYNC_TOKEN }}
         with:
           source-directory: 'packages/<new-package>'
           destination-github-username: '<owner>'
           destination-repository-name: '<repo-name>'
           user-email: 'devops@plozen.com'
           target-branch: 'main'
           create-target-branch-if-needed: true
           commit-message: 'Ship: <Package> Update (ORIGIN_COMMIT)'
   ```
4. **대상 리포에 배포 워크플로우 추가** (필요시):
   - 정적 사이트: GitHub Pages 워크플로우
   - SSR 앱: Cloudflare 자동 연동 또는 별도 설정

### 배포 커밋 태그 (선택적)

| 태그              | 동작                  |
| ----------------- | --------------------- |
| `[no-deploy]`     | 배포 스킵             |
| `[deploy:plolux]` | plolux만 강제 배포    |
| `[deploy:all]`    | 모든 패키지 강제 배포 |

## 6. Security & Env

- Never commit secrets.
- Use `NEXT_PUBLIC_` prefix only for variables safe for browser exposure.
- Supabase: Use RLS (Row Level Security) policies on the backend; do not rely solely on client-side logic.
