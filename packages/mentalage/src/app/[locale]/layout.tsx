import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/i18n/config';

/**
 * 정적 export를 위한 모든 locale 경로 생성
 */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/**
 * 동적 메타데이터 생성 (언어별)
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    ko: '정신연령 테스트 - 당신의 정신연령은?',
    en: 'Mental Age Test - What is Your Mental Age?',
    ja: '精神年齢テスト - あなたの精神年齢は?',
    zh: '心理年龄测试 - 你的心理年龄是多少?',
    es: 'Test de Edad Mental - ¿Cuál es tu edad mental?',
    de: 'Mentalalter-Test - Wie alt bist du im Kopf?',
    fr: "Test d'Âge Mental - Quel est votre âge mental?",
    pt: 'Teste de Idade Mental - Qual é a sua idade mental?',
    ru: 'Тест на Психологический Возраст - Какой твой возраст?',
    id: 'Tes Usia Mental - Berapa Usia Mentalmu?',
    vi: 'Bài Kiểm Tra Tuổi Tâm Lý - Tuổi Tâm Lý Của Bạn Là Bao Nhiêu?',
    tr: 'Zihinsel Yaş Testi - Zihinsel Yaşınız Kaç?',
  };

  const descriptions: Record<string, string> = {
    ko: '재미있는 질문에 답하고 당신의 진짜 정신연령을 알아보세요! 친구들과 결과를 공유하세요.',
    en: 'Answer fun questions and discover your real mental age! Share results with friends.',
    ja: '楽しい質問に答えて、あなたの本当の精神年齢を発見しましょう！結果を友達と共有しよう。',
    zh: '回答有趣的问题，发现你真实的心理年龄！与朋友分享结果。',
    es: '¡Responde preguntas divertidas y descubre tu edad mental real! Comparte los resultados con amigos.',
    de: 'Beantworte lustige Fragen und entdecke dein wahres mentales Alter! Teile Ergebnisse mit Freunden.',
    fr: 'Répondez à des questions amusantes et découvrez votre vrai âge mental ! Partagez les résultats avec vos amis.',
    pt: 'Responda perguntas divertidas e descubra sua idade mental real! Compartilhe os resultados com amigos.',
    ru: 'Ответьте на веселые вопросы и узнайте свой настоящий психологический возраст! Поделитесь результатами с друзьями.',
    id: 'Jawab pertanyaan seru dan temukan usia mental aslimu! Bagikan hasilnya dengan teman-teman.',
    vi: 'Trả lời các câu hỏi thú vị và khám phá tuổi tâm lý thực sự của bạn! Chia sẻ kết quả với bạn bè.',
    tr: 'Eğlenceli sorulara cevap verin ve gerçek zihinsel yaşınızı keşfedin! Sonuçları arkadaşlarınızla paylaşın.',
  };

  const baseUrl = 'https://moony01.com/mentalage';

  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    keywords: ['mental age test', '정신연령 테스트', 'quiz', '테스트', 'viral'],
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: Object.fromEntries(locales.map((l) => [l, `${baseUrl}/${l}`])),
    },
    openGraph: {
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      type: 'website',
      locale: locale,
      siteName: 'Mental Age Test',
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
    },
  };
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  // 유효하지 않은 locale이면 404
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  // 정적 렌더링을 위해 locale 설정
  setRequestLocale(locale);

  // 메시지 로드
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <main className="flex min-h-screen flex-col items-center justify-center p-4">{children}</main>
    </NextIntlClientProvider>
  );
}
