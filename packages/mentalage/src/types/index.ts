/** 질문 선택지 */
export interface QuestionOption {
  id: string; // 'a' | 'b' | 'c' | 'd'
  score: number; // -10 ~ +15
}

/** 질문 */
export interface Question {
  id: number;
  category: 'technology' | 'lifestyle' | 'social' | 'values' | 'habits';
  weight: number;
  options: QuestionOption[];
}

/** 사용자 답변 */
export interface Answer {
  questionId: number;
  optionId: string;
  score: number;
}

/** 결과 타입 ID */
export type ResultTypeId = 'teen' | 'young_adult' | 'adult' | 'mature' | 'wise';

/** 결과 타입 */
export interface ResultType {
  id: ResultTypeId;
  minAge: number;
  maxAge: number;
  emoji: string;
  colorTheme: string;
}

/** 퀴즈 결과 */
export interface QuizResult {
  mentalAge: number;
  realAge: number;
  difference: number;
  resultType: ResultType;
}

/** 퀴즈 상태 */
export interface QuizState {
  currentIndex: number;
  answers: Answer[];
  realAge: number | null;
  result: QuizResult | null;
  isCompleted: boolean;
}

/** 댓글 */
export interface Comment {
  id: string;
  nickname: string;
  mentalAge: number;
  realAge?: number;
  resultId: string;
  content: string;
  language: string;
  createdAt: string;
}

/** 지원 언어 */
export type Locale =
  | 'ko'
  | 'en'
  | 'ja'
  | 'zh'
  | 'es'
  | 'de'
  | 'fr'
  | 'pt'
  | 'ru'
  | 'id'
  | 'vi'
  | 'tr';
