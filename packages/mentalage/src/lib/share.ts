/**
 * Share utility functions for social media and clipboard
 */

/**
 * 트위터 공유 URL 생성
 * @param text 공유할 텍스트
 * @param url 공유할 URL
 */
export function getTwitterShareUrl(text: string, url: string): string {
  const params = new URLSearchParams({
    text: text,
    url: url,
  });
  return `https://twitter.com/intent/tweet?${params.toString()}`;
}

/**
 * 페이스북 공유 URL 생성
 * @param url 공유할 URL
 */
export function getFacebookShareUrl(url: string): string {
  const params = new URLSearchParams({
    u: url,
  });
  return `https://www.facebook.com/sharer/sharer.php?${params.toString()}`;
}

/**
 * 클립보드에 URL 복사
 * @param text 복사할 텍스트
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (typeof navigator === 'undefined' || !navigator.clipboard) {
    return false;
  }
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
}

/**
 * Web Share API 사용 (모바일)
 */
export async function nativeShare(data: {
  title: string;
  text: string;
  url: string;
}): Promise<boolean> {
  if (typeof navigator === 'undefined' || !navigator.share) {
    return false;
  }
  try {
    await navigator.share(data);
    return true;
  } catch (error) {
    // User cancelled share or other error
    if ((error as Error).name !== 'AbortError') {
      console.error('Failed to share:', error);
    }
    return false;
  }
}

/**
 * 공유 텍스트 생성
 * @param mentalAge 정신 연령
 * @param messageTemplate 메시지 템플릿 (e.g. "My mental age is {age}! Try it too 👉")
 */
export function generateShareText(mentalAge: number, messageTemplate: string): string {
  return messageTemplate.replace('{age}', mentalAge.toString());
}
