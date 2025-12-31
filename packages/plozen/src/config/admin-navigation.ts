import { LayoutDashboard, FileText, MessageSquare, Settings, LogIn, LucideProps } from 'lucide-react';

export interface AdminNavItem {
  title: string;
  href: string;
  // Use the specific type that lucide-react exports for its icons to ensure compatibility with all props including 'size'
  icon: React.ComponentType<LucideProps>; 
  matchPath: string;
}

export const adminNavigation: AdminNavItem[] = [
  {
    title: '대시보드',
    href: '/admin',
    icon: LayoutDashboard,
    matchPath: '/admin',
  },
  {
    title: '프로젝트 의뢰',
    href: '/admin/quotes',
    icon: FileText,
    matchPath: '/admin/quotes',
  },
  {
    title: '일반 문의',
    href: '/admin/inquiries',
    icon: MessageSquare,
    matchPath: '/admin/inquiries',
  },
  {
    title: '설정',
    href: '/admin/settings',
    icon: Settings,
    matchPath: '/admin/settings',
  },
];
