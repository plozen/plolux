import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  getTwitterShareUrl,
  getFacebookShareUrl,
  copyToClipboard,
  nativeShare,
  generateShareText,
} from '../../src/lib/share';

describe('Share Utilities', () => {
  const testUrl = 'https://moony01.com/mentalage/';
  const testText = 'My mental age is 25!';

  describe('getTwitterShareUrl', () => {
    it('should generate correct Twitter share URL', () => {
      const url = getTwitterShareUrl(testText, testUrl);
      expect(url).toContain('twitter.com/intent/tweet');
      const expectedText = new URLSearchParams({ text: testText }).toString();
      expect(url).toContain(expectedText);
      const expectedUrl = new URLSearchParams({ url: testUrl }).toString();
      expect(url).toContain(expectedUrl);
    });
  });

  describe('getFacebookShareUrl', () => {
    it('should generate correct Facebook share URL', () => {
      const url = getFacebookShareUrl(testUrl);
      expect(url).toContain('facebook.com/sharer/sharer.php');
      expect(url).toContain(`u=${encodeURIComponent(testUrl)}`);
    });
  });

  describe('generateShareText', () => {
    it('should replace {age} placeholder with mental age', () => {
      const template = 'My mental age is {age}!';
      const result = generateShareText(25, template);
      expect(result).toBe('My mental age is 25!');
    });
  });

  describe('Browser APIs', () => {
    const originalNavigator = global.navigator;

    beforeEach(() => {
      // @ts-ignore
      global.navigator = {
        clipboard: {
          writeText: vi.fn().mockResolvedValue(undefined),
        } as unknown as Clipboard,
        share: vi.fn().mockResolvedValue(undefined),
      };
    });

    afterEach(() => {
      global.navigator = originalNavigator;
    });

    describe('copyToClipboard', () => {
      it('should call navigator.clipboard.writeText', async () => {
        const result = await copyToClipboard(testText);
        expect(navigator.clipboard.writeText).toHaveBeenCalledWith(testText);
        expect(result).toBe(true);
      });

      it('should return false if clipboard API is not available', async () => {
        // @ts-ignore
        global.navigator = {};
        const result = await copyToClipboard(testText);
        expect(result).toBe(false);
      });
    });

    describe('nativeShare', () => {
      const shareData = { title: 'Test', text: testText, url: testUrl };

      it('should call navigator.share', async () => {
        const result = await nativeShare(shareData);
        expect(navigator.share).toHaveBeenCalledWith(shareData);
        expect(result).toBe(true);
      });

      it('should return false if share API is not available', async () => {
        // @ts-ignore
        global.navigator = {};
        const result = await nativeShare(shareData);
        expect(result).toBe(false);
      });
    });
  });
});
