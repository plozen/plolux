import { useState, useCallback, useMemo } from 'react';
import { Question, Answer, QuizResult } from '@/types';
import { generateQuizResult } from '@/lib/calculate';
import questionsData from '@/data/questions.json';

interface UseQuizReturn {
  // State
  currentIndex: number;
  answers: Answer[];
  realAge: number | null;
  result: QuizResult | null;
  isCompleted: boolean;
  isStarted: boolean;

  // Computed
  currentQuestion: Question | null;
  progress: number; // 0-100
  totalQuestions: number;

  // Actions
  start: () => void;
  setRealAge: (age: number) => void;
  submitAnswer: (optionId: string, score: number) => void;
  reset: () => void;
}

export function useQuiz(): UseQuizReturn {
  const [isStarted, setIsStarted] = useState(false);
  const [realAge, setRealAgeState] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const questions = questionsData.questions as unknown as Question[];
  const totalQuestions = questions.length;

  const currentQuestion = useMemo(() => {
    if (currentIndex >= totalQuestions) return null;
    return questions[currentIndex];
  }, [currentIndex, questions, totalQuestions]);

  const progress = useMemo(() => {
    return Math.round((currentIndex / totalQuestions) * 100);
  }, [currentIndex, totalQuestions]);

  const start = useCallback(() => {
    setIsStarted(true);
  }, []);

  const setRealAge = useCallback((age: number) => {
    setRealAgeState(age);
  }, []);

  const submitAnswer = useCallback(
    (optionId: string, score: number) => {
      if (!currentQuestion) return;

      const newAnswer: Answer = {
        questionId: currentQuestion.id,
        optionId,
        score,
      };

      const newAnswers = [...answers, newAnswer];
      setAnswers(newAnswers);

      if (currentIndex < totalQuestions - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setIsCompleted(true);
        if (realAge !== null) {
          const finalResult = generateQuizResult(newAnswers, realAge);
          setResult(finalResult);
        }
      }
    },
    [answers, currentQuestion, currentIndex, totalQuestions, realAge],
  );

  const reset = useCallback(() => {
    setIsStarted(false);
    setRealAgeState(null);
    setCurrentIndex(0);
    setAnswers([]);
    setResult(null);
    setIsCompleted(false);
  }, []);

  return {
    currentIndex,
    answers,
    realAge,
    result,
    isCompleted,
    isStarted,
    currentQuestion,
    progress,
    totalQuestions,
    start,
    setRealAge,
    submitAnswer,
    reset,
  };
}
