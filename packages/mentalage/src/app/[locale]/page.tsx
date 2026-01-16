'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useQuiz } from '@/hooks/useQuiz';
import Button from '@/components/ui/Button';
import QuestionCard from '@/components/quiz/QuestionCard';
import ResultCard from '@/components/result/ResultCard';
// import AdBanner from '@/components/layout/AdBanner'; // AdSense 자동 광고 사용
import LanguageSwitcher from '@/components/layout/LanguageSwitcher';

export default function Home() {
  const params = useParams();
  const currentLocale = params.locale as string;

  const t = useTranslations();
  const tQuestions = useTranslations('questions');
  const tResults = useTranslations('results');

  const {
    isStarted,
    currentIndex,
    currentQuestion,
    totalQuestions,
    isCompleted,
    result,
    realAge,
    start,
    setRealAge,
    submitAnswer,
    reset,
  } = useQuiz();

  const [inputAge, setInputAge] = useState<string>('');
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShareUrl(window.location.href);
    }
  }, []);

  const handleStart = () => {
    start();
  };

  const handleAgeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const age = parseInt(inputAge);
    if (age > 0 && age <= 120) {
      setRealAge(age);
    }
  };

  const handleAnswer = (optionId: string) => {
    if (!currentQuestion) return;

    // Find score for the selected option from data
    const selectedOption = currentQuestion.options.find((opt) => opt.id === optionId);
    if (selectedOption) {
      submitAnswer(optionId, selectedOption.score);
    }
  };

  // 1. Landing Screen
  if (!isStarted) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-background animate-fade-in text-center">
        <div className="max-w-md w-full space-y-8">
          {/* 언어 선택 플래그 바 */}
          <LanguageSwitcher currentLocale={currentLocale} />

          <div className="space-y-4">
            <div className="text-8xl animate-bounce-slow">🧠</div>
            <h1 className="text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
              {t('home.title')}
            </h1>
            <p className="text-xl text-gray-600 font-medium">{t('home.subtitle')}</p>
          </div>

          <Button
            onClick={handleStart}
            size="lg"
            fullWidth
            className="text-xl py-6 shadow-xl shadow-primary/20"
          >
            {t('home.startButton')}
          </Button>

          {/* <AdBanner slot="landing-bottom" className="mt-8" /> */}
        </div>
      </main>
    );
  }

  // 2. Age Input Screen
  if (isStarted && realAge === null) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-background animate-slide-in">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl space-y-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800">{t('home.ageInput')}</h2>

          <form onSubmit={handleAgeSubmit} className="space-y-6">
            <input
              type="number"
              min="1"
              max="120"
              value={inputAge}
              onChange={(e) => setInputAge(e.target.value)}
              placeholder={t('home.agePlaceholder')}
              className="w-full text-center text-4xl font-bold border-b-2 border-gray-200 py-4 focus:outline-none focus:border-primary transition-colors placeholder:text-gray-300"
              autoFocus
            />

            <Button
              type="submit"
              disabled={!inputAge || parseInt(inputAge) < 1 || parseInt(inputAge) > 120}
              fullWidth
              size="lg"
            >
              {t('home.ageConfirm')}
            </Button>
          </form>
        </div>
      </main>
    );
  }

  // 3. Quiz Screen
  if (currentQuestion && !isCompleted) {
    const questionText = tQuestions(`q${currentQuestion.id}.text`);
    const options = currentQuestion.options.map((opt) => ({
      id: opt.id,
      text: tQuestions(`q${currentQuestion.id}.options.${opt.id}`),
    }));

    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-background">
        <QuestionCard
          question={questionText}
          options={options}
          currentIndex={currentIndex}
          totalQuestions={totalQuestions}
          onAnswer={handleAnswer}
        />

        {/* AdSense 자동 광고 사용으로 주석처리 */}
        {/* {(currentIndex + 1) % 5 === 0 && (
          <AdBanner slot="quiz-interval" className="mt-6" label="Sponsor" />
        )} */}
      </main>
    );
  }

  // 4. Result Screen
  if (isCompleted && result) {
    const resultKey = result.resultType.id;
    const title = tResults(`${resultKey}.title`);
    const description = tResults(`${resultKey}.description`);

    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-background py-10">
        {/* <AdBanner slot="result-top" className="mb-8" /> */}
        <ResultCard
          result={result}
          title={title}
          description={description}
          onRestart={reset}
          shareUrl={shareUrl}
        />
      </main>
    );
  }

  return null;
}
