import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Supabase 세션 관리 및 보안 미들웨어 로직
 *
 * 이 함수는 모든 요청에 대해 Supabase 인증 상태를 확인하고
 * 쿠키를 갱신하거나 보호된 경로에 대한 접근을 제어합니다.
 *
 * @param request Next.js 요청 객체
 * @returns 처리된 Next.js 응답 객체 (리다이렉트 또는 통과)
 */
export async function updateSession(request: NextRequest) {
  // 초기 응답 객체 생성 (일단 통과시킨다는 전제로 시작)
  // request 객체를 포함해야 쿠키 처리가 올바르게 동작합니다.
  let supabaseResponse = NextResponse.next({
    request,
  })

  // 미들웨어 환경을 위한 Supabase 클라이언트 생성
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        /**
         * 요청에서 쿠키를 가져옵니다.
         */
        getAll() {
          return request.cookies.getAll()
        },
        /**
         * 응답에 쿠키를 설정합니다.
         *
         * Server Action이나 Route Handler와 달리 미들웨어에서는
         * request와 response 양쪽에 모두 쿠키를 업데이트해줘야
         * 동기화 문제가 발생하지 않습니다.
         */
        setAll(cookiesToSet) {
          // 1. 요청 객체에 쿠키 업데이트
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          
          // 2. 응답 객체 재생성 (업데이트된 요청 바탕으로)
          supabaseResponse = NextResponse.next({
            request,
          })
          
          // 3. 응답 객체에 쿠키 설정
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  /**
   * 중요: getUser()를 호출하여 사용자 정보를 가져옵니다.
   * 단순히 getSession()을 쓰는 것보다 보안상 안전합니다. 
   * (매 요청마다 Supabase Auth 서버와 검증하기 때문)
   */
  const {
    data: { user },
  } = await supabase.auth.getUser()

  /**
   * 🛡️ 경로 보호 로직 (Security Logic)
   */

  // 1. 비로그인 접근 차단
  // 사용자가 '/admin'으로 시작하는 페이지에 접근하려는데
  // 로그인된 정보(user)가 없다면 로그인 페이지로 튕겨냅니다.
  // 단, 이미 로그인 페이지('/admin/login')에 있는 경우는 제외합니다 (무한 루프 방지).
  if (request.nextUrl.pathname.startsWith('/admin') && !request.nextUrl.pathname.startsWith('/admin/login')) {
    if (!user) {
      const url = request.nextUrl.clone()
      url.pathname = '/admin/login'
      return NextResponse.redirect(url)
    }
  }

  // 2. 이미 로그인된 사용자 리다이렉트
  // 이미 로그인이 되어 있는데 굳이 또 로그인 페이지('/admin/login')에 들어오면
  // 메인 대시보드('/admin')로 보내버립니다.
  if (user && request.nextUrl.pathname.startsWith('/admin/login')) {
    const url = request.nextUrl.clone()
    url.pathname = '/admin'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}