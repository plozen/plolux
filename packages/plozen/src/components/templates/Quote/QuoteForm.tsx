"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./QuoteForm.module.scss";
import { createClient } from "@/lib/supabase/client";

type QuestionType = "text" | "select" | "email" | "multi-input";

interface InputField {
  key: string;
  label?: string;
  type: string;
  placeholder: string;
  required?: boolean;
}

interface Question {
  id: number;
  key?: string; // Optional for multi-input steps
  title: string;
  subtitle: string;
  type: QuestionType;
  options?: string[]; // For select type
  placeholder?: string;
  inputs?: InputField[]; // For multi-input type
}

const questions: Question[] = [
  {
    id: 1,
    key: "project_type",
    title: "안녕하세요! 어떤 프로젝트를 계획 중이신가요?",
    subtitle: "프로젝트의 종류를 선택해주세요.",
    type: "select",
    options: ["Landing Page", "Admin System"],
  },
  {
    id: 2,
    key: "budget_range",
    title: "예산 범위는 어떻게 되시나요?",
    subtitle: "대략적인 예산을 알려주시면 적합한 솔루션을 제안드릴 수 있습니다.",
    type: "select",
    options: ["~ 1,000만원", "1,000만원 ~ 3,000만원", "3,000만원 ~ 5,000만원", "5,000만원 이상", "미정"],
  },
  {
    id: 3,
    title: "프로젝트 상세 정보를 입력해주세요.",
    subtitle: "상세 내용, 일정, 참고자료 등을 알려주시면 도움이 됩니다.",
    type: "multi-input",
    inputs: [
      { key: "description", label: "상세 내용", type: "textarea", placeholder: "프로젝트의 핵심 기능이나 요구사항을 자유롭게 적어주세요.", required: true },
      { key: "target_deadline", label: "희망 마감일", type: "date", placeholder: "", required: false },
      { key: "reference_urls", label: "레퍼런스 URL", type: "text", placeholder: "https://example.com (콤마로 구분)", required: false },
    ],
  },
  {
    id: 4,
    title: "마지막으로 연락처를 남겨주세요.",
    subtitle: "상세 견적 및 제안서를 보내드릴 연락처를 입력해주세요.",
    type: "multi-input",
    inputs: [
      { key: "client_name", label: "성함 (담당자)", type: "text", placeholder: "홍길동", required: true },
      { key: "company_name", label: "회사/팀명", type: "text", placeholder: "(주)플로젠", required: false },
      { key: "contact_email", label: "이메일", type: "email", placeholder: "name@company.com", required: true },
      { key: "contact_phone", label: "연락처", type: "tel", placeholder: "010-1234-5678", required: true },
    ],
  },
];

export default function QuoteForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [direction, setDirection] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitForm = async () => {
    setIsSubmitting(true);
    const supabase = createClient();

    // 데이터 매핑
    const payload = {
      project_type: answers.project_type,
      budget_range: answers.budget_range,
      description: answers.description,
      target_deadline: answers.target_deadline || null, // 빈 문자열은 null로
      reference_urls: answers.reference_urls || null,
      client_name: answers.client_name,
      company_name: answers.company_name || null,
      contact_email: answers.contact_email,
      contact_phone: answers.contact_phone,
    };

    try {
      const { error } = await supabase
        .from('project_requests')
        .insert([payload]);

      if (error) throw error;

      alert("문의가 성공적으로 접수되었습니다! 담당자가 곧 연락드리겠습니다.");
      // 성공 후 처리 (예: 홈으로 이동 또는 폼 초기화)
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert("접수 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setDirection(1);
      setCurrentStep(prev => prev + 1);
    } else {
      submitForm();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSelect = (option: string) => {
    setAnswers({ ...answers, [questions[currentStep].key!]: option });
    // Optional: Auto advance on select for quicker flow
    // setTimeout(() => handleNext(), 300); 
  };

  const handleMultiInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: string) => {
    setAnswers({ ...answers, [key]: e.target.value });
  };

  const currentQuestion = questions[currentStep];
  
  // Validation logic
  const canProceed = (() => {
    if (currentQuestion.type === "multi-input" && currentQuestion.inputs) {
      // Check if all required fields are filled
      return currentQuestion.inputs.every(input => 
        !input.required || (answers[input.key] && answers[input.key].trim() !== "")
      );
    }
    // Existing logic for single inputs
    if (currentQuestion.key) {
      return !!answers[currentQuestion.key] || currentQuestion.type === "text"; 
    }
    return true;
  })();

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
      {/* <div className={styles.progressBar} style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }} /> */}
      
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
                      className={`${styles.optionBtn} ${answers[currentQuestion.key!] === option ? styles.selected : ""}`}
                      onClick={() => handleSelect(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}

              {currentQuestion.type === "text" && currentQuestion.key && (
                <input
                  type="text"
                  className={styles.inputField}
                  placeholder={currentQuestion.placeholder}
                  value={answers[currentQuestion.key] || ""}
                  onChange={(e) => setAnswers({ ...answers, [currentQuestion.key!]: e.target.value })}
                  autoFocus
                />
              )}

              {currentQuestion.type === "multi-input" && (
                <div className={styles.multiInputContainer}>
                  {currentQuestion.inputs?.map((input) => (
                    <div key={input.key} className={styles.inputGroup}>
                      {input.label && <label className={styles.inputLabel}>{input.label}</label>}
                      {input.type === 'textarea' ? (
                        <textarea
                          className={styles.inputField}
                          placeholder={input.placeholder}
                          value={answers[input.key] || ""}
                          onChange={(e) => handleMultiInput(e, input.key)}
                          required={input.required}
                          rows={4}
                          style={{ resize: "none" }}
                        />
                      ) : (
                        <input
                          type={input.type}
                          className={styles.inputField}
                          placeholder={input.placeholder}
                          value={answers[input.key] || ""}
                          onChange={(e) => handleMultiInput(e, input.key)}
                          required={input.required}
                        />
                      )}
                    </div>
                  ))}
                </div>
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
                disabled={(!canProceed && currentQuestion.type !== 'text') || isSubmitting} 
              >
                {isSubmitting ? "전송 중..." : (currentStep === questions.length - 1 ? "제출하기" : "다음")}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
