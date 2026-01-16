import './globals.css';

/**
 * 루트 레이아웃 - Next.js 15 필수 html/body 태그 포함
 * 언어별 설정은 [locale]/layout.tsx에서 처리
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/mentalage/favicon.ico" />
      </head>
      <body className="min-h-screen bg-gradient-to-br from-surface to-white">{children}</body>
    </html>
  );
}
