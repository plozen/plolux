import React from 'react';
import ProgressBar from './ProgressBar';

interface Option {
  id: string;
  text: string;
}

interface QuestionCardProps {
  question: string;
  options: Option[];
  currentIndex: number;
  totalQuestions: number;
  onAnswer: (id: string) => void;
}

export default function QuestionCard({
  question,
  options,
  currentIndex,
  totalQuestions,
  onAnswer,
}: QuestionCardProps) {
  return (
    <div className="w-full max-w-xl mx-auto p-4 animate-slide-in">
      <ProgressBar current={currentIndex + 1} total={totalQuestions} />

      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 leading-tight text-center">
        {question}
      </h2>

      <div className="space-y-4">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onAnswer(option.id)}
            className="w-full p-5 text-left bg-white rounded-2xl shadow-md hover:shadow-xl border-2 border-transparent hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1 active:scale-98 group"
          >
            <div className="flex items-center">
              <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-surface text-primary font-bold mr-4 group-hover:bg-primary group-hover:text-white transition-colors">
                {option.id.toUpperCase()}
              </span>
              <span className="text-lg font-medium text-gray-700 group-hover:text-gray-900">
                {option.text}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
