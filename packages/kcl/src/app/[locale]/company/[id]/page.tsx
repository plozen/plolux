import { MOCK_COMPANIES } from '@/lib/mock-data';
import { notFound } from 'next/navigation';
import CompanyDetailClient from './CompanyDetailClient';
import { use } from 'react';

export function generateStaticParams() {
  const locales = ['ko', 'en', 'id', 'tr', 'ja', 'zh', 'es', 'pt', 'th', 'vi', 'fr', 'de'];
  const params = [];

  for (const locale of locales) {
    for (const company of MOCK_COMPANIES) {
      params.push({ locale, id: company.id });
    }
  }

  return params;
}

export default function CompanyDetailPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  // Await params properly in Next.js 15+ equivalent behavior
  const { locale, id } = use(params);

  const company = MOCK_COMPANIES.find(c => c.id === id);

  if (!company) {
    notFound();
  }

  return <CompanyDetailClient locale={locale} id={id} />;
}
