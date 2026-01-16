/**
 * next-intl 서버 컴포넌트용 설정
 * 정적 export를 위한 getRequestConfig
 */
import { getRequestConfig } from 'next-intl/server';
import { locales, type Locale } from './config';

export default getRequestConfig(async ({ requestLocale }) => {
  // requestLocale은 [locale] 세그먼트에서 자동으로 전달됨
  let locale = await requestLocale;

  // locale이 없거나 유효하지 않으면 기본값 사용
  if (!locale || !locales.includes(locale as Locale)) {
    locale = 'ko';
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
