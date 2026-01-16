import { Answer, QuizResult, ResultType } from '../types';
import resultsData from '../data/results.json';

const RESULT_TYPES = resultsData.results as unknown as ResultType[];

/**
 * Calculate mental age based on real age and answers
 * Formula: Real Age + Sum of Scores (Clamped 10-80)
 */
export function calculateMentalAge(answers: Answer[], realAge: number): number {
  let scoreSum = 0;
  answers.forEach((ans) => {
    scoreSum += ans.score;
  });

  let mentalAge = realAge + scoreSum;

  // Clamp
  if (mentalAge < 10) mentalAge = 10;
  if (mentalAge > 80) mentalAge = 80;

  return mentalAge;
}

/**
 * Get result type definition based on mental age
 */
export function getResultType(mentalAge: number): ResultType {
  const found = RESULT_TYPES.find((type) => mentalAge >= type.minAge && mentalAge <= type.maxAge);

  if (found) return found;

  // Fallback
  if (mentalAge < 10) return RESULT_TYPES[0]; // Teen
  return RESULT_TYPES[RESULT_TYPES.length - 1]; // Wise
}

/**
 * Generate full quiz result
 */
export function generateQuizResult(answers: Answer[], realAge: number): QuizResult {
  const mentalAge = calculateMentalAge(answers, realAge);
  const resultType = getResultType(mentalAge);

  return {
    mentalAge,
    realAge,
    difference: mentalAge - realAge,
    resultType,
  };
}
