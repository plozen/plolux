'use client';

import { useRouter, usePathname } from 'next/navigation';
import { locales, localeNames, type Locale } from '@/i18n/config';

/**
 * 언어별 국가 코드 매핑 (flagcdn.com용)
 */
const localeToCountry: Record<Locale, string> = {
  ko: 'kr',
  en: 'gb', // 영국 국기 (영어)
  ja: 'jp',
  zh: 'cn',
  es: 'es',
  de: 'de',
  fr: 'fr',
  pt: 'br',
  ru: 'ru',
  id: 'id',
  vi: 'vn',
  tr: 'tr',
};

interface LanguageSwitcherProps {
  currentLocale: string;
}

/**
 * 언어 선택 컴포넌트 (SVG 국기 사용)
 * 6열 그리드로 정렬 (모바일: 4열)
 */
export default function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: Locale) => {
    const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 p-3 bg-white/50 backdrop-blur-sm rounded-2xl shadow-sm">
      {locales.map((locale) => {
        const isActive = currentLocale === locale;
        const countryCode = localeToCountry[locale];
        const flagUrl = `https://flagcdn.com/w40/${countryCode}.png`;

        return (
          <button
            key={locale}
            onClick={() => handleLanguageChange(locale)}
            className={`
              flex flex-col items-center justify-center gap-1
              py-2 px-2 rounded-xl
              transition-all duration-200
              ${
                isActive
                  ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg scale-105'
                  : 'bg-white/70 text-gray-600 hover:bg-white hover:text-gray-900 hover:shadow-md hover:scale-105'
              }
            `}
            aria-label={`Switch to ${localeNames[locale]}`}
          >
            <img
              src={flagUrl}
              alt={localeNames[locale]}
              className="w-6 h-4 object-cover rounded-sm shadow-sm"
            />
            <span className={`text-xs font-bold ${isActive ? 'text-white' : 'text-gray-600'}`}>
              {locale.toUpperCase()}
            </span>
          </button>
        );
      })}
    </div>
  );
}
