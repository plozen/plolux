import type { Metadata } from "next";
import "@/styles/main.scss";

export const metadata: Metadata = {
  title: "PLOLUX | Premium Web Agency",
  description: "기술과 감성으로 완성하는 당신의 웹사이트. PLOLUX는 브랜드의 가치를 높이는 프리미엄 웹 에이전시입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        {children}
      </body>
    </html>
  );
}
