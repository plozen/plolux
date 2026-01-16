import React, { useEffect, useState } from 'react';
import type { QuizResult } from '../../types';
import Button from '../ui/Button';
import ShareButtons from './ShareButtons';

interface ResultCardProps {
  result: QuizResult;
  title: string;
  description: string;
  onRestart: () => void;
  shareUrl: string;
}

export default function ResultCard({
  result,
  title,
  description,
  onRestart,
  shareUrl,
}: ResultCardProps) {
  const [displayAge, setDisplayAge] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = result.mentalAge;
    // Handle specific edge case where mental age might be very high or negative? No, it's age.
    // If age is 0, handle it.
    if (end <= 0) {
      setDisplayAge(end);
      return;
    }

    const duration = 1500;
    const stepTime = Math.abs(Math.floor(duration / end));

    const timer = setInterval(() => {
      start += 1;
      setDisplayAge(start);
      if (start === end) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, [result.mentalAge]);

  return (
    <div className="w-full max-w-md mx-auto animate-fade-in">
      <div
        className="relative bg-white rounded-3xl overflow-hidden shadow-2xl p-8 text-center"
        style={{ borderTop: `8px solid ${result.resultType.colorTheme}` }}
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-white/30 to-transparent" />

        <div className="mb-6">
          <span className="text-6xl animate-bounce-in inline-block" role="img" aria-label={title}>
            {result.resultType.emoji}
          </span>
        </div>

        <h1 className="text-3xl font-black mb-2" style={{ color: result.resultType.colorTheme }}>
          {title}
        </h1>

        <div className="my-8 py-6 bg-surface rounded-2xl">
          <p className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-2">
            Mental Age
          </p>
          <div className="text-7xl font-black text-gray-800 leading-none tracking-tight">
            {displayAge}
          </div>
        </div>

        <div className="space-y-2 mb-8">
          <p className="text-gray-600 text-lg leading-relaxed">{description}</p>
          <p className="text-sm text-gray-400">
            Real Age: {result.realAge} <span className="mx-1">•</span> Diff:{' '}
            {result.difference > 0 ? `+${result.difference}` : result.difference}
          </p>
        </div>

        <div className="space-y-6">
          <ShareButtons mentalAge={result.mentalAge} shareUrl={shareUrl} />

          <Button onClick={onRestart} variant="ghost" fullWidth>
            Test Again
          </Button>
        </div>
      </div>
    </div>
  );
}
