/**
 * 다국어 설정 파일
 * 지원 언어 및 기본 설정 정의
 */

/** 지원 언어 목록 */
export const locales = [
  'ko',
  'en',
  'ja',
  'zh',
  'es',
  'de',
  'fr',
  'pt',
  'ru',
  'id',
  'vi',
  'tr',
] as const;

export type Locale = (typeof locales)[number];

/** 기본 언어 */
export const defaultLocale: Locale = 'ko';

/** 언어별 표시 이름 */
export const localeNames: Record<Locale, string> = {
  ko: '한국어',
  en: 'English',
  ja: '日本語',
  zh: '中文',
  es: 'Español',
  de: 'Deutsch',
  fr: 'Français',
  pt: 'Português',
  ru: 'Русский',
  id: 'Bahasa Indonesia',
  vi: 'Tiếng Việt',
  tr: 'Türkçe',
};

/** 언어별 HTML lang 속성 값 */
export const localeHtmlLang: Record<Locale, string> = {
  ko: 'ko',
  en: 'en',
  ja: 'ja',
  zh: 'zh-Hans',
  es: 'es',
  de: 'de',
  fr: 'fr',
  pt: 'pt',
  ru: 'ru',
  id: 'id',
  vi: 'vi',
  tr: 'tr',
};
