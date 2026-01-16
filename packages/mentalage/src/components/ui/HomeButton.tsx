'use client';

import clsx from 'clsx';

interface HomeButtonProps {
  onClick: () => void;
  className?: string;
}

/**
 * 홈 버튼 컴포넌트 - 클릭하면 시작 화면으로
 */
export default function HomeButton({ onClick, className }: HomeButtonProps) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'fixed top-4 left-4 p-3 rounded-full z-50',
        'bg-white/90 hover:bg-white shadow-lg hover:shadow-xl',
        'transition-all duration-200 hover:scale-110',
        'text-gray-600 hover:text-primary',
        className,
      )}
      aria-label="홈으로"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    </button>
  );
}
