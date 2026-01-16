'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { defaultLocale } from '@/i18n/config';

/**
 * 루트 경로 접근 시 기본 locale(ko)로 리다이렉트
 * output: 'export'에서는 클라이언트 사이드 리다이렉트 사용
 */
export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace(`/${defaultLocale}`);
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="animate-pulse text-4xl">🧠</div>
    </div>
  );
}
