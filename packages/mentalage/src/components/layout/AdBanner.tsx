'use client';

import { useEffect, useRef } from 'react';
import clsx from 'clsx';

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

interface AdBannerProps {
  className?: string;
}

/**
 * Google AdSense 광고 배너 컴포넌트
 * Unit Name: mentalage-display-01
 * data-ad-slot: 9711703942
 */
export default function AdBanner({ className }: AdBannerProps) {
  const adRef = useRef<HTMLModElement>(null);
  const isLoaded = useRef(false);

  useEffect(() => {
    // 이미 로드된 경우 스킵
    if (isLoaded.current) return;

    // 광고 요소가 이미 로드되었는지 체크
    if (adRef.current?.getAttribute('data-adsbygoogle-status')) return;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      isLoaded.current = true;
    } catch (err) {
      // 개발 환경에서는 에러 무시
      if (process.env.NODE_ENV === 'development') return;
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <div className={clsx('w-full clear-both text-center min-h-[100px]', className)}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-8955182453510440"
        data-ad-slot="9711703942"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
