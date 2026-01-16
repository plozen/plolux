'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { defaultLocale } from '@/i18n/config';

/**
 * 404 페이지 - 기본 locale로 리다이렉트
 */
export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    router.replace(`/${defaultLocale}`);
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <div className="text-6xl mb-4">🤔</div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">페이지를 찾을 수 없습니다</h1>
      <p className="text-gray-600">잠시 후 메인 페이지로 이동합니다...</p>
    </div>
  );
}
