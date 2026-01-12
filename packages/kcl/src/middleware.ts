/**
 * Next.js Middleware for Internationalization (i18n)
 * 
 * 이 미들웨어는 사용자의 언어 선호도에 따라 자동으로 올바른 로케일 경로로 리디렉션합니다.
 * 
 * 지원 언어 (12개):
 * - ko: 한국어
 * - en: English (기본값)
 * - id: Bahasa Indonesia
 * - tr: Türkçe
 * - ja: 日本語
 * - zh: 中文(简体)
 * - es: Español
 * - pt: Português
 * - th: ภาษาไทย
 * - vi: Tiếng Việt
 * - fr: Français
 * - de: Deutsch
 */

import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // 지원하는 모든 로케일 목록
  locales: ['ko', 'en', 'id', 'tr', 'ja', 'zh', 'es', 'pt', 'th', 'vi', 'fr', 'de'],
  
  // 기본 로케일 (언어 감지 실패 시 사용)
  defaultLocale: 'en',
  
  // URL 경로에 항상 로케일 접두사 포함
  localePrefix: 'always',
  
  // 로케일 감지 설정
  localeDetection: true
});

export const config = {
  // 미들웨어가 실행될 경로 매칭
  matcher: [
    // 로케일이 포함된 모든 경로에서 실행
    '/(ko|en|id|tr|ja|zh|es|pt|th|vi|fr|de)/:path*',
    
    // 루트 경로 (자동 리디렉션)
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ]
};
