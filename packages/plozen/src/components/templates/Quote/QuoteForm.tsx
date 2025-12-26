"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./QuoteForm.module.scss";

type QuestionType = "text" | "select" | "email";

interface Question {
  id: number;
  title: string;
  subtitle: string;
  type: QuestionType;
  options?: string[]; // For select type
  placeholder?: string;
}

const questions: Question[] = [
  {
    id: 1,
    title: "안녕하세요! 어떤 프로젝트를 계획 중이신가요?",
    subtitle: "프로젝트의 종류를 선택해주세요.",
    type: "select",
    options: ["Web App Development", "Mobile App", "Landing Page", "Admin System", "AI Integration"],
  },
  {
    id: 2,
    title: "예산 범위는 어떻게 되시나요?",
    subtitle: "대략적인 예산을 알려주시면 적합한 솔루션을 제안드릴 수 있습니다.",
    type: "select",
    options: ["~ 1,000만원", "1,000만원 ~ 3,000만원", "3,000만원 ~ 5,000만원", "5,000만원 이상", "미정"],
  },
  {
    id: 3,
    title: "프로젝트에 대해 조금 더 설명해주세요.",
    subtitle: "핵심 기능이나 참고하고 싶은 레퍼런스가 있다면 적어주세요.",
    type: "text",
    placeholder: "자유롭게 작성해주세요...",
  },
  {
    id: 4,
    title: "연락처를 남겨주세요.",
    subtitle: "이메일 주소를 남겨주시면 검토 후 연락드리겠습니다.",
    type: "email",
    placeholder: "name@company.com",
  },
];

export default function QuoteForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [direction, setDirection] = useState(0);

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setDirection(1);
      setCurrentStep(prev => prev + 1);
    } else {
      // Submit logic
      alert("문의가 접수되었습니다!");
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSelect = (option: string) => {
    setAnswers({ ...answers, [questions[currentStep].id]: option });
    // Optional: Auto advance on select for quicker flow
    // setTimeout(() => handleNext(), 300); 
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswers({ ...answers, [questions[currentStep].id]: e.target.value });
  };

  const currentQuestion = questions[currentStep];
  const canProceed = !!answers[currentQuestion.id] || currentQuestion.type === "text"; // Text optional for demo

  // Motion Variants
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -50 : 50,
      opacity: 0,
    }),
  };

  return (
    <div className={styles.quotePage}>
      <div className={styles.progressBar} style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }} />
      
      <div className={styles.cardContainer}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={styles.card}
          >
            <div className={styles.question}>
              <motion.h2 layoutId="title">{currentQuestion.title}</motion.h2>
              <p>{currentQuestion.subtitle}</p>
            </div>

            <div className={styles.content}>
              {currentQuestion.type === "select" && (
                <div className={styles.options}>
                  {currentQuestion.options?.map((option) => (
                    <button
                      key={option}
                      className={`${styles.optionBtn} ${answers[currentQuestion.id] === option ? styles.selected : ""}`}
                      onClick={() => handleSelect(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}

              {currentQuestion.type === "text" && (
                <input
                  type="text"
                  className={styles.inputField}
                  placeholder={currentQuestion.placeholder}
                  value={answers[currentQuestion.id] || ""}
                  onChange={handleInput}
                  autoFocus
                />
              )}

               {currentQuestion.type === "email" && (
                <input
                  type="email"
                  className={styles.inputField}
                  placeholder={currentQuestion.placeholder}
                  value={answers[currentQuestion.id] || ""}
                  onChange={handleInput}
                  autoFocus
                />
              )}
            </div>

            <div className={styles.navigation}>
              <button 
                className={`${styles.navBtn} ${styles.prev}`} 
                onClick={handlePrev}
                disabled={currentStep === 0}
              >
                {currentStep > 0 && "이전"}
              </button>
              
              <button 
                className={`${styles.navBtn} ${styles.next}`} 
                onClick={handleNext}
                disabled={!canProceed && currentQuestion.type !== 'text'} // Allow text skip for UX if needed, or strictly validate
              >
                {currentStep === questions.length - 1 ? "제출하기" : "다음"}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
