# AGENTS.md - AI Agent Operational Guidelines

This document defines the operational standards, code style, and workflows for AI agents (Claude, ChatGPT, etc.) working in the Plolux monorepo.

## 1. Project Context & Architecture

- **Type**: Monorepo using `pnpm` workspaces.
- **Framework**: Next.js 16 (App Router), React 19.
- **Language**: TypeScript 5.x (Strict Mode).
- **Backend**: Supabase (Auth, DB, Realtime).
- **Styling**: SCSS (SASS) with Design Tokens. **Do NOT use TailwindCSS**.
- **Package Manager**: `pnpm` (Version 10.x).

### Workspace Structure

- `packages/kcl`: K-pop Company League app (Multi-language i18n).
- `packages/plozen`: Main admin/portfolio platform.
- `packages/plolux`: Landing/Demo sites.

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
plolux (모노레포) ─── CI/CD sync ───┬──→ kcl 리포 (별도)
                                    └──→ plozen 리포 (별도)
```

- **plolux**: 개발용 모노레포. 모든 코드 변경은 여기서 발생.
- **kcl / plozen 리포**: 동일 GitHub 계정의 별도 리포지토리. plolux에서 sync됨.
- **Sync**: plolux 커밋 시 CI/CD가 각 리포로 코드를 push.

### Deployment Flow

| 단계              | 동작                                         |
| ----------------- | -------------------------------------------- |
| 1. plolux 커밋    | 개발자가 모노레포에 push                     |
| 2. CI/CD sync     | `deploy.yml`이 kcl/plozen 리포로 코드 동기화 |
| 3. 개별 리포 배포 | 각 리포의 자체 워크플로우가 배포 실행        |

### SSR 프로젝트와 GitHub Pages

**중요**: `kcl`, `plozen`은 SSR/API 라우트가 있어 **GitHub Pages 배포 불가**.

| 패키지           | SSR/API | 배포 플랫폼       | GitHub Pages |
| ---------------- | ------- | ----------------- | ------------ |
| kcl              | ✅ 있음 | Vercel/Cloudflare | ❌ 불가      |
| plozen           | ✅ 있음 | Vercel/Cloudflare | ❌ 불가      |
| plolux (landing) | ❌ 없음 | GitHub Pages 가능 | ✅ 가능      |

**결론**: SSR 프로젝트는 sync만 실행하고, 정적 배포(gh-pages)는 시도하지 않음.

## 6. Security & Env

- Never commit secrets.
- Use `NEXT_PUBLIC_` prefix only for variables safe for browser exposure.
- Supabase: Use RLS (Row Level Security) policies on the backend; do not rely solely on client-side logic.
