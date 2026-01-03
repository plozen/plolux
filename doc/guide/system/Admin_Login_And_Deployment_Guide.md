# Plozen Admin 로그인 및 Cloudflare 배포 기술 명세서

## 개요

본 문서는 Plozen Admin 대시보드의 인증 시스템 구현과 Cloudflare Pages 배포 설정에 대한 상세 기술 가이드입니다. Next.js App Router, Supabase SSR 인증, Cloudflare Edge Runtime 환경 설정 과정에서 발생한 이슈와 해결 방법을 포함하여, 추후 동일한 환경을 재구축하거나 유지보수할 때 참조할 수 있도록 작성되었습니다.

---

## 1. 사전 준비 사항 (Prerequisites)

구현 시작 전 Supabase 프로젝트 설정과 환경 변수 구성이 필요합니다.

### 1.1 Supabase 프로젝트 설정

1. Supabase 대시보드에서 새 프로젝트를 생성합니다.
2. `Project Settings > API` 메뉴로 이동하여 다음 정보를 확보합니다.
   - Project URL
   - `anon` public key

### 1.2 환경 변수 설정

로컬 개발 환경의 경우 `.env.local` 파일에 다음과 같이 키를 저장합니다. 배포 환경(Cloudflare Pages)에서는 대시보드의 `Settings > Environment variables` 메뉴에 등록해야 합니다.

```env
NEXT_PUBLIC_SUPABASE_URL=YOUR_PROJECT_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
```

### 1.3 관리자 계정 생성

초기 관리자 계정은 Supabase 대시보드에서 직접 생성하는 것을 권장합니다.

1. `Authentication > Users` 메뉴로 이동합니다.
2. `Add User > Create New User`를 클릭합니다.
3. 이메일과 비밀번호를 입력하고 **Auto Confirm User** 옵션을 반드시 체크합니다. (이메일 인증 절차 생략을 위함)

---

## 2. 인증 시스템 구현 (Implementation)

Next.js 14+ 버전의 SSR(Server-Side Rendering) 기능을 활용하여 보안성이 강화된 인증 로직을 구현합니다.

### 2.1 패키지 설치

`@supabase/ssr` 패키지는 서버 사이드 쿠키 관리를 위한 필수 패키지입니다.

```bash
pnpm add @supabase/ssr
```

### 2.2 Server Client 유틸리티 (`src/lib/supabase/server.ts`)

Next.js 서버 컴포넌트 및 Server Action에서 사용할 Supabase 클라이언트를 생성합니다. `try-catch` 블록은 Server Component에서 쿠키 쓰기 시도 시 발생하는 에러를 예외 처리하기 위함입니다.

```typescript
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createClient() {
  const cookieStore = await cookies();

  // 환경 변수 검증
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error('Supabase environments variables are missing.');
  }

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Server Component에서의 set 쿠키 에러 무시
          }
        },
      },
    },
  );
}
```

### 2.3 미들웨어 보안 설정 (`src/middleware.ts`)

`src/lib/supabase/middleware.ts`에 실제 로직을 분리하여 구현합니다. 모든 요청에 대해 세션을 확인하고, 보호된 경로(`/admin`) 접근을 제어합니다.

- 비로그인 사용자가 `/admin` 접근 시: `/admin/login`으로 리다이렉트
- 로그인 사용자가 `/admin/login` 접근 시: `/admin`으로 리다이렉트

### 2.4 Server Action (`actions.ts`)

로그인 폼(Form) 데이터를 처리하는 서버 액션 함수입니다. 주의할 점은 이 파일에는 반드시 `async function`만 export 해야 합니다. 상수나 일반 변수를 export 할 경우 빌드 에러가 발생합니다.

### 2.5 Edge Runtime 설정 (중요)

Cloudflare Pages(Workers) 환경은 Node.js 런타임이 아닌 Edge 런타임에서 동작하므로, 동적 기능이 포함된 페이지(`page.tsx`)에 반드시 런타임 설정을 명시해야 합니다.

```typescript
// src/app/(admin)/admin/login/page.tsx 최상단
export const runtime = 'edge';
```

---

## 3. Cloudflare 배포 설정 (Deployment Configuration)

가장 많은 트러블슈팅이 필요한 배포 단계입니다. 순서대로 정확히 설정해야 배포 성공을 보장할 수 있습니다.

### 3.1 Cloudflare 어댑터 설치

Next.js 서버 기능을 Cloudflare Workers 환경으로 변환해 주는 어댑터를 설치합니다.

```bash
pnpm add -D @cloudflare/next-on-pages
```

### 3.2 빌드 스크립트 수정 (`package.json`)

기존 `next build` 대신 어댑터를 사용하는 명령어를 추가합니다.

```json
"scripts": {
  "pages:build": "npx @cloudflare/next-on-pages",
  // ...
}
```

### 3.3 정적 배포 설정 해제 (`next.config.ts`)

Middleware와 Server Action은 정적 파일 내보내기(`output: 'export'`)와 호환되지 않습니다. 해당 설정이 있다면 반드시 주석 처리하거나 제거해야 합니다.

```typescript
const nextConfig: NextConfig = {
  // output: "export",  <-- 반드시 제거
  // ...
};
```

### 3.4 NPM 의존성 충돌 해결

`@cloudflare/next-on-pages` 패키지와 최신 Next.js 버전 간의 peer dependency 충돌이 발생할 수 있습니다. 이를 해결하기 위해 `.npmrc` 파일을 프로젝트 루트와 패키지 루트에 생성합니다.

- **파일명**: `.npmrc`
- **내용**: `legacy-peer-deps=true`

---

## 4. Cloudflare 대시보드 설정 및 트러블슈팅

코드를 배포한 후 Cloudflare 웹사이트에서 수행해야 하는 필수 설정입니다.

### 4.1 빌드 설정 (Build Settings)

- **Framework values**: Next.js
- **Build command**: `pnpm run pages:build` (또는 `npm run pages:build`)
- **Build output directory**: `.vercel/output/static` (중요: `out`이 아님)

### 4.2 Node.js 호환성 플래그 (Compatibility Flags)

배포 후 사이트 접속 시 `Node.JS Compatibility Error`가 발생할 경우 해결 방법입니다. Cloudflare Workers 환경에서 Node.js 내장 모듈(`buffer`, `events` 등)을 사용할 수 있도록 허용해야 합니다.

1. Cloudflare Pages 프로젝트 설정(`Settings`)의 `Functions` 메뉴로 이동합니다.
2. `Compatibility Flags` 섹션을 찾습니다.
3. **Production** 및 **Preview** 설정에 `nodejs_compat` 플래그를 추가합니다.
4. 저장 후 반드시 **재배포(Retry deployment)**를 수행해야 적용됩니다.

---

## 5. 트러블슈팅 요약 (Summary)

배포 실패 시 다음 체크리스트를 순서대로 확인하십시오.

1. **빌드 실패 (Build Error)**: `actions.ts` 등의 `use server` 파일에서 비동기 함수 외의 변수(`export const runtime`)를 export 하고 있는지 확인하십시오.
2. **의존성 에러 (Dependency Error)**: `.npmrc` 파일에 `legacy-peer-deps=true`가 설정되어 있는지 확인하십시오.
3. **런타임 에러 (Edge Runtime Error)**: 동적 페이지(`page.tsx`)에 `export const runtime = 'edge'`가 선언되어 있는지 확인하십시오.
4. **호환성 에러 (Compatibility Error)**: Cloudflare 대시보드에 `nodejs_compat` 플래그가 설정되어 있는지 확인하십시오.
