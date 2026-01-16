import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import QuestionCard from '../../src/components/quiz/QuestionCard';

describe('QuestionCard', () => {
  const mockOptions = [
    { id: 'a', text: 'Option A' },
    { id: 'b', text: 'Option B' },
    { id: 'c', text: 'Option C' },
    { id: 'd', text: 'Option D' },
  ];

  const defaultProps = {
    question: 'What is your favorite color?',
    options: mockOptions,
    currentIndex: 0,
    totalQuestions: 10,
    onAnswer: vi.fn(),
  };

  it('renders question text', () => {
    render(<QuestionCard {...defaultProps} />);
    expect(screen.getByText('What is your favorite color?')).toBeTruthy();
  });

  it('renders all options', () => {
    render(<QuestionCard {...defaultProps} />);
    mockOptions.forEach((option) => {
      expect(screen.getByText(option.text)).toBeTruthy();
    });
  });

  it('calls onAnswer when an option is clicked', () => {
    render(<QuestionCard {...defaultProps} />);
    const optionButton = screen.getByText('Option A');
    fireEvent.click(optionButton);
    expect(defaultProps.onAnswer).toHaveBeenCalledWith('a');
  });

  it('displays progress correctly', () => {
    render(<QuestionCard {...defaultProps} currentIndex={2} totalQuestions={5} />);
    // Verify progress text (e.g., "3 / 5")
    expect(screen.getByText('3 / 5')).toBeTruthy();
    // Verify progress bar existence
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toBeTruthy();
  });
});
