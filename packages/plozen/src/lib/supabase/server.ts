import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

/**
 * 서버 사이드 전용 Supabase 클라이언트 생성 함수
 *
 * 이 함수는 Next.js 서버 환경(Server Actions, Route Handlers, Middleware, Server Components)에서
 * Supabase에 접근할 때 사용됩니다.
 *
 * @returns {Promise<SupabaseClient>} 인증된 Supabase 클라이언트 객체
 */
export async function createClient() {
  // Next.js의 쿠키 저장소를 가져옵니다. (비동기 함수)
  const cookieStore = await cookies()

  // 환경 변수 유효성 검사 (배포 시 사고 방지)
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error('Supabase 환경 변수가 설정되지 않았습니다. .env.local 파일을 확인해주세요.')
  }

  // Supabase 클라이언트 생성 및 반환
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        /**
         * 쿠키 가져오기 (Get)
         * 브라우저에서 보낸 모든 쿠키를 Supabase가 읽을 수 있게 전달합니다.
         */
        getAll() {
          return cookieStore.getAll()
        },

        /**
         * 쿠키 저장하기 (Set)
         * 로그인/로그아웃 등 인증 상태가 변할 때, Supabase가 클라이언트(브라우저)에
         * 새로운 쿠키를 굽도록 명령하는 부분입니다.
         *
         * @param {Object[]} cookiesToSet - 설정할 쿠키들의 배열
         */
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // 예외 처리 (무시해도 안전함)
            // Next.js의 Server Component(페이지를 그리는 중)에서는 쿠키를 '쓰기'가 불가능합니다.
            // 하지만 Supabase는 세션 갱신을 위해 시도할 수 있습니다.
            // 실제 쿠키 저장은 Server Action이나 Middleware에서 일어나므로 여기선 에러를 무시합니다.
          }
        },
      },
    }
  )
}