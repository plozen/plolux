import { redirect } from 'next/navigation';
import { defaultLocale } from '@/i18n/config';

/**
 * 루트 경로 접근 시 기본 locale(ko)로 리다이렉트
 */
export default function RootPage() {
  redirect(`/${defaultLocale}`);
}
