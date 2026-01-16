import { describe, it, expect } from 'vitest';
import { calculateMentalAge, getResultType, generateQuizResult } from '../../src/lib/calculate';
import { Answer, ResultTypeId } from '../../src/types';

describe('calculateMentalAge', () => {
  it('should calculate mental age correctly based on real age and answers', () => {
    const realAge = 25;
    const answers: Answer[] = [
      { questionId: 1, optionId: 'a', score: 5 },
      { questionId: 2, optionId: 'b', score: -2 },
      { questionId: 3, optionId: 'c', score: 3 },
    ];
    // 25 + 5 - 2 + 3 = 31
    expect(calculateMentalAge(answers, realAge)).toBe(31);
  });

  it('should clamp the result to minimum 10', () => {
    const realAge = 15;
    const answers: Answer[] = [
      { questionId: 1, optionId: 'a', score: -10 },
      { questionId: 2, optionId: 'b', score: -10 },
    ];
    // 15 - 10 - 10 = -5 -> clamped to 10
    expect(calculateMentalAge(answers, realAge)).toBe(10);
  });

  it('should clamp the result to maximum 80', () => {
    const realAge = 70;
    const answers: Answer[] = [
      { questionId: 1, optionId: 'a', score: 10 },
      { questionId: 2, optionId: 'b', score: 10 },
    ];
    // 70 + 10 + 10 = 90 -> clamped to 80
    expect(calculateMentalAge(answers, realAge)).toBe(80);
  });
});

describe('getResultType', () => {
  it('should return teen for age 10-19', () => {
    expect(getResultType(10).id).toBe('teen');
    expect(getResultType(19).id).toBe('teen');
  });

  it('should return young_adult for age 20-29', () => {
    expect(getResultType(20).id).toBe('young_adult');
    expect(getResultType(29).id).toBe('young_adult');
  });

  it('should return adult for age 30-39', () => {
    expect(getResultType(30).id).toBe('adult');
    expect(getResultType(39).id).toBe('adult');
  });

  it('should return mature for age 40-49', () => {
    expect(getResultType(40).id).toBe('mature');
    expect(getResultType(49).id).toBe('mature');
  });

  it('should return wise for age 50-80', () => {
    expect(getResultType(50).id).toBe('wise');
    expect(getResultType(80).id).toBe('wise');
  });
});

describe('generateQuizResult', () => {
  it('should generate full quiz result object', () => {
    const realAge = 25;
    const answers: Answer[] = [
      { questionId: 1, optionId: 'a', score: 5 },
      { questionId: 2, optionId: 'b', score: -2 },
      { questionId: 3, optionId: 'c', score: 3 },
    ];
    // Mental Age: 31

    const result = generateQuizResult(answers, realAge);

    expect(result.realAge).toBe(25);
    expect(result.mentalAge).toBe(31);
    expect(result.difference).toBe(6); // 31 - 25
    expect(result.resultType.id).toBe('adult');
  });
});
