import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ResultCard from '../../src/components/result/ResultCard';
import type { QuizResult } from '../../src/types';

// Mock next-intl
vi.mock('next-intl', () => ({
  useTranslations: (namespace: string) => (key: string) => {
    if (namespace === 'share') {
      const messages: Record<string, string> = {
        twitter: 'Twitter',
        facebook: 'Facebook',
        copySuccess: 'Link copied!',
        shareText: 'Mental Age: {age}',
      };
      return messages[key] || key;
    }
    if (namespace === 'result') {
      const messages: Record<string, string> = {
        copyLink: 'Copy Link',
      };
      return messages[key] || key;
    }
    return key;
  },
}));

// Mock share utils
vi.mock('../../src/lib/share', () => ({
  getTwitterShareUrl: vi.fn(),
  getFacebookShareUrl: vi.fn(),
  copyToClipboard: vi.fn(),
  nativeShare: vi.fn(),
  generateShareText: vi.fn(),
}));

describe('ResultCard', () => {
  const mockResult: QuizResult = {
    mentalAge: 25,
    realAge: 30,
    difference: -5,
    resultType: {
      id: 'young_adult',
      minAge: 20,
      maxAge: 29,
      emoji: '😎',
      colorTheme: '#4ECDC4',
    },
  };

  const defaultProps = {
    result: mockResult,
    title: 'Young Soul',
    description: 'You are energetic and full of life!',
    onRestart: vi.fn(),
    shareUrl: 'https://example.com/result',
  };

  it('renders mental age correctly after animation', async () => {
    vi.useFakeTimers();
    render(<ResultCard {...defaultProps} />);

    // Fast-forward time
    await act(async () => {
      vi.advanceTimersByTime(2000);
    });

    expect(screen.getByText('25')).toBeTruthy();
    vi.useRealTimers();
  });

  it('renders result emoji and title', () => {
    render(<ResultCard {...defaultProps} />);
    expect(screen.getByText('😎')).toBeTruthy();
    expect(screen.getByText('Young Soul')).toBeTruthy();
  });

  it('renders description', () => {
    render(<ResultCard {...defaultProps} />);
    expect(screen.getByText('You are energetic and full of life!')).toBeTruthy();
  });

  it('renders real age comparison', () => {
    render(<ResultCard {...defaultProps} />);
    expect(screen.getByText(/30/i)).toBeTruthy();
  });

  it('renders share buttons', () => {
    render(<ResultCard {...defaultProps} />);
    // Check if share buttons are present (via mocked translation)
    expect(screen.getByText('Twitter')).toBeTruthy();
    expect(screen.getByText('Facebook')).toBeTruthy();
  });
});
