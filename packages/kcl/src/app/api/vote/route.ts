/**
 * Vote API
 *
 * 투표 처리 엔드포인트
 *
 * 규칙:
 * - 1회 투표 = 1점 (기존 100점에서 변경)
 * - IP 기반 Rate Limit (1시간당 30회)
 * - 클라이언트에 남은 투표권 정보 반환
 */

import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import { checkVoteRateLimit } from '@/lib/rate-limit';

/** 1회 투표당 점수 */
const VOTE_SCORE = 1;

const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? Redis.fromEnv()
    : null;

/**
 * 클라이언트 IP 추출
 */
function getClientIP(req: NextRequest): string {
  // Vercel/Cloudflare 환경에서 실제 IP 추출
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  const realIP = req.headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }
  return '127.0.0.1';
}

export async function POST(req: NextRequest) {
  try {
    // IP 기반 Rate Limit 검사
    const clientIP = getClientIP(req);
    const rateLimitResult = await checkVoteRateLimit(clientIP);

    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Too many votes. Please try again later.',
          remaining: rateLimitResult.remaining,
          reset: rateLimitResult.reset,
        },
        { status: 429 },
      );
    }

    const body = await req.json();
    const { companyId } = body;

    if (!companyId) {
      return NextResponse.json({ success: false, message: 'Missing companyId' }, { status: 400 });
    }

    let newScore = 0;

    if (redis) {
      // 1점 증가 (기존 100점에서 변경)
      newScore = await redis.incrby(`company:${companyId}:score`, VOTE_SCORE);
      // 전체 투표 수 카운트
      await redis.incrby('global:total_votes', 1);
    } else {
      // 개발 환경 Mock
      console.log(`[MOCK REDIS /vote] Voted Company ${companyId}, +${VOTE_SCORE} point`);
      newScore = Math.floor(Math.random() * 1000000) + VOTE_SCORE;
    }

    return NextResponse.json({
      success: true,
      currentScore: newScore,
      voteScore: VOTE_SCORE,
      remaining: rateLimitResult.remaining,
      message: 'Vote successful',
    });
  } catch (error) {
    console.error('Vote API Error:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
