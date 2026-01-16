import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useQuiz } from '@/hooks/useQuiz';

describe('useQuiz Hook', () => {
  it('should initialize with default state', () => {
    const { result } = renderHook(() => useQuiz());

    expect(result.current.isStarted).toBe(false);
    expect(result.current.currentIndex).toBe(0);
    expect(result.current.answers).toHaveLength(0);
    expect(result.current.realAge).toBeNull();
    expect(result.current.result).toBeNull();
    expect(result.current.isCompleted).toBe(false);
    expect(result.current.progress).toBe(0);
  });

  it('should start the quiz', () => {
    const { result } = renderHook(() => useQuiz());

    act(() => {
      result.current.start();
    });

    expect(result.current.isStarted).toBe(true);
  });

  it('should set real age', () => {
    const { result } = renderHook(() => useQuiz());

    act(() => {
      result.current.setRealAge(25);
    });

    expect(result.current.realAge).toBe(25);
  });

  it('should handle answer submission and progress', () => {
    const { result } = renderHook(() => useQuiz());

    act(() => {
      result.current.start();
      result.current.setRealAge(20);
    });

    // Submit first answer
    act(() => {
      result.current.submitAnswer('a', 10);
    });

    expect(result.current.currentIndex).toBe(1);
    expect(result.current.answers).toHaveLength(1);
    expect(result.current.answers[0]).toEqual({
      questionId: 1,
      optionId: 'a',
      score: 10,
    });
    expect(result.current.progress).toBeGreaterThan(0);
  });

  it('should complete quiz and generate result', () => {
    const { result } = renderHook(() => useQuiz());

    act(() => {
      result.current.start();
      result.current.setRealAge(20);
    });

    const totalQuestions = result.current.totalQuestions;

    // Answer all questions
    for (let i = 0; i < totalQuestions; i++) {
      act(() => {
        result.current.submitAnswer('a', 10);
      });
    }

    expect(result.current.isCompleted).toBe(true);
    expect(result.current.result).not.toBeNull();
    expect(result.current.result?.realAge).toBe(20);
  });

  it('should reset quiz state', () => {
    const { result } = renderHook(() => useQuiz());

    act(() => {
      result.current.start();
      result.current.setRealAge(20);
      result.current.submitAnswer('a', 10);
      result.current.reset();
    });

    expect(result.current.isStarted).toBe(false);
    expect(result.current.currentIndex).toBe(0);
    expect(result.current.answers).toHaveLength(0);
    expect(result.current.realAge).toBeNull();
    expect(result.current.result).toBeNull();
    expect(result.current.isCompleted).toBe(false);
  });
});
