'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import clsx from 'clsx';

/**
 * 외부 링크 헤더 컴포넌트 (우측 상단)
 */
export default function Header() {
  const params = useParams();
  const locale = params.locale as string;
  const isKo = locale === 'ko';

  const links = [
    {
      href: 'https://moony01.com/kpopface/',
      label: isKo ? '케이팝 얼굴상 테스트' : 'K-Pop Face Test',
      icon: (
        <Image
          src="/mentalage/images/k-logo.svg"
          alt="K-Pop Logo"
          width={24}
          height={24}
          className="rounded-sm"
        />
      ),
      primary: true,
    },
    {
      href: 'https://moony01.com/',
      label: isKo ? '블로그' : 'Tech Blog',
      icon: <span className="text-lg">📝</span>,
      primary: false,
    },
  ];

  return (
    <header className="fixed top-4 right-4 z-50 flex flex-col sm:flex-row gap-3 items-end sm:items-center">
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={clsx(
            'flex items-center gap-2 px-3 py-2 rounded-full shadow-md transition-all duration-300',
            'backdrop-blur-md hover:scale-105 hover:shadow-xl',
            link.primary
              ? 'bg-gradient-to-r from-violet-600/90 to-fuchsia-600/90 text-white hover:from-violet-600 hover:to-fuchsia-600'
              : 'bg-white/80 text-gray-700 hover:bg-white hover:text-black',
          )}
        >
          {link.icon}
          <span className="text-sm font-bold whitespace-nowrap hidden sm:inline-block">
            {link.label}
          </span>
          <span
            className={clsx(
              'text-xs font-bold sm:hidden',
              link.primary ? 'inline-block' : 'hidden',
            )}
          >
            {isKo ? '케이팝 테스트' : 'K-Pop Test'}
          </span>
        </a>
      ))}
    </header>
  );
}
