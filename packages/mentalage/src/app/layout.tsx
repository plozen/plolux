import './globals.css';

/**
 * 루트 레이아웃 - Next.js 15 필수 html/body 태그 포함
 * 언어별 설정은 [locale]/layout.tsx에서 처리
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  // SVG favicon을 데이터 URL로 인라인 처리 (정적 export 호환)
  const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23667eea"/><stop offset="100%" style="stop-color:%23764ba2"/></linearGradient></defs><rect width="100" height="100" rx="20" fill="url(%23g)"/><text x="50" y="70" font-size="60" text-anchor="middle">🧠</text></svg>`;
  const faviconUrl = `data:image/svg+xml,${faviconSvg}`;

  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link rel="icon" href={faviconUrl} />
      </head>
      <body className="min-h-screen bg-gradient-to-br from-surface to-white">{children}</body>
    </html>
  );
}
