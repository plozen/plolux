import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

/**
 * Next.js 미들웨어 진입점
 *
 * 들어오는 모든 요청을 가로채서 updateSession 함수로 넘깁니다.
 * 여기서 세션 확인 및 경로 보호 로직이 수행됩니다.
 */
export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

/**
 * 미들웨어 적용 경로 설정 (Matcher)
 *
 * 모든 경로를 다 검사하면 서버 부하가 심하므로,
 * 꼭 필요한 경로(/admin)만 감시하도록 필터링합니다.
 * 
 * _next/static(정적파일), _next/image 등은 검사에서 제외해야 합니다.
 */
export const config = {
  matcher: [
    /*
     * 아래 패턴과 일치하는 경로만 미들웨어를 실행합니다:
     * 1. /admin 으로 시작하는 모든 경로 (/admin/dashboard, /admin/login 등)
     * 2. (선택사항) 나중에 사용자 페이지 인증이 필요하면 여기에 추가
     */
    '/admin/:path*',
  ],
}