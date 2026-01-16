import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import ShareButtons from '../../src/components/result/ShareButtons';
import * as shareUtils from '../../src/lib/share';

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
  getTwitterShareUrl: vi.fn().mockReturnValue('https://twitter.com/share'),
  getFacebookShareUrl: vi.fn().mockReturnValue('https://facebook.com/share'),
  copyToClipboard: vi.fn().mockResolvedValue(true),
  nativeShare: vi.fn().mockResolvedValue(true),
  generateShareText: vi.fn().mockReturnValue('Mental Age: 25'),
}));

describe('ShareButtons', () => {
  const defaultProps = {
    mentalAge: 25,
    shareUrl: 'https://example.com',
    onCopySuccess: vi.fn(),
  };

  const originalWindowOpen = window.open;

  beforeEach(() => {
    window.open = vi.fn();
    vi.clearAllMocks();
  });

  afterEach(() => {
    window.open = originalWindowOpen;
  });

  it('renders all share buttons', () => {
    render(<ShareButtons {...defaultProps} />);
    expect(screen.getByText('Twitter')).toBeTruthy();
    expect(screen.getByText('Facebook')).toBeTruthy();
    expect(screen.getByText('Copy Link')).toBeTruthy();
  });

  it('opens Twitter share on click', () => {
    render(<ShareButtons {...defaultProps} />);
    const twitterButton = screen.getByText('Twitter').closest('button');
    fireEvent.click(twitterButton!);
    expect(shareUtils.getTwitterShareUrl).toHaveBeenCalled();
    expect(window.open).toHaveBeenCalledWith(
      'https://twitter.com/share',
      '_blank',
      'noopener,noreferrer',
    );
  });

  it('opens Facebook share on click', () => {
    render(<ShareButtons {...defaultProps} />);
    const fbButton = screen.getByText('Facebook').closest('button');
    fireEvent.click(fbButton!);
    expect(shareUtils.getFacebookShareUrl).toHaveBeenCalled();
    expect(window.open).toHaveBeenCalledWith(
      'https://facebook.com/share',
      '_blank',
      'noopener,noreferrer',
    );
  });

  it('copies link to clipboard on click', async () => {
    render(<ShareButtons {...defaultProps} />);
    const copyButton = screen.getByText('Copy Link').closest('button');
    fireEvent.click(copyButton!);

    await waitFor(() => {
      expect(shareUtils.copyToClipboard).toHaveBeenCalledWith(defaultProps.shareUrl);
    });

    // Check for success toast
    expect(screen.getByText('✅ Link copied!')).toBeTruthy();

    // Check callback
    expect(defaultProps.onCopySuccess).toHaveBeenCalled();
  });
});
