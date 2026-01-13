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

## 5. Security & Env

- Never commit secrets.
- Use `NEXT_PUBLIC_` prefix only for variables safe for browser exposure.
- Supabase: Use RLS (Row Level Security) policies on the backend; do not rely solely on client-side logic.
