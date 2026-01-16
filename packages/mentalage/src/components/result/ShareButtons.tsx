'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  getTwitterShareUrl,
  getFacebookShareUrl,
  copyToClipboard,
  nativeShare,
  generateShareText,
} from '../../lib/share';

interface ShareButtonsProps {
  mentalAge: number;
  shareUrl: string;
  onCopySuccess?: () => void;
}

export default function ShareButtons({ mentalAge, shareUrl, onCopySuccess }: ShareButtonsProps) {
  const tShare = useTranslations('share');
  const tResult = useTranslations('result');
  const [showToast, setShowToast] = useState(false);

  const shareText = generateShareText(mentalAge, tShare('shareText'));

  const handleTwitterShare = () => {
    const url = getTwitterShareUrl(shareText, shareUrl);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleFacebookShare = () => {
    const url = getFacebookShareUrl(shareUrl);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCopyLink = async () => {
    const success = await copyToClipboard(shareUrl);
    if (success) {
      setShowToast(true);
      if (onCopySuccess) onCopySuccess();
      setTimeout(() => setShowToast(false), 2000);
    }
  };

  // Keep for future use or if we decide to use a single share button
  // const handleNativeShare = async () => {
  //   await nativeShare({
  //     title: shareText,
  //     text: shareText,
  //     url: shareUrl,
  //   });
  // };

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="flex flex-wrap justify-center gap-3">
        <button
          onClick={handleTwitterShare}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-black text-white hover:opacity-80 transition-all active:scale-95"
          aria-label={tShare('twitter')}
        >
          <span>🐦</span>
          <span className="font-medium">{tShare('twitter')}</span>
        </button>

        <button
          onClick={handleFacebookShare}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1877F2] text-white hover:opacity-90 transition-all active:scale-95"
          aria-label={tShare('facebook')}
        >
          <span>📘</span>
          <span className="font-medium">{tShare('facebook')}</span>
        </button>

        <button
          onClick={handleCopyLink}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-200 text-gray-800 hover:bg-gray-300 transition-all active:scale-95"
          aria-label={tResult('copyLink')}
        >
          <span>🔗</span>
          <span className="font-medium">{tResult('copyLink')}</span>
        </button>
      </div>

      {/* Toast Notification */}
      <div
        className={`fixed bottom-8 left-1/2 -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-lg text-sm transition-opacity duration-300 ${
          showToast ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        ✅ {tShare('copySuccess')}
      </div>
    </div>
  );
}
