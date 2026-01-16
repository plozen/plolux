import React from 'react';
import clsx from 'clsx';

interface AdBannerProps {
  slot: string;
  format?: 'auto' | 'horizontal' | 'vertical';
  className?: string;
  label?: string; // Optional label for debugging/visibility
}

/**
 * Google AdSense Placeholder Component
 *
 * Future Implementation:
 * 1. Add <script> tag for adsbygoogle in layout or component
 * 2. Replace this placeholder with <ins className="adsbygoogle" ... />
 * 3. Ensure client=ca-pub-XXXXXXXXXXXXXXXX matches the account
 */
export default function AdBanner({
  slot,
  format = 'auto',
  className,
  label = 'Advertisement',
}: AdBannerProps) {
  // Production environment check could be added here to only show real ads in prod
  // const isProd = process.env.NODE_ENV === 'production';

  return (
    <div className={clsx('w-full my-4 flex flex-col items-center justify-center', className)}>
      {/* Placeholder Visual */}
      <div
        className={clsx(
          'bg-gray-200 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 font-medium text-sm select-none',
          format === 'horizontal'
            ? 'w-full h-[90px] max-w-[728px]'
            : format === 'vertical'
              ? 'w-[160px] h-[600px]'
              : 'w-full h-[250px] max-w-[300px] sm:max-w-[336px] md:max-w-[728px] md:h-[90px]', // Responsive auto
        )}
      >
        <div className="flex flex-col items-center gap-1">
          <span>{label}</span>
          <span className="text-xs text-gray-400/70">Slot: {slot}</span>
        </div>
      </div>
    </div>
  );
}
