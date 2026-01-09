import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const redis = (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN)
  ? Redis.fromEnv()
  : null;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { companyId } = body;

    if (!companyId) {
      return NextResponse.json({ success: false, message: 'Missing companyId' }, { status: 400 });
    }

    let newScore = 0;

    if (redis) {
      newScore = await redis.incrby(`company:${companyId}:score`, 100);
      // await redis.incrby('global:total_votes', 1);
    } else {
      console.log(`[MOCK REDIS /vote] Voted Company ${companyId}, +100 point`);
      newScore = Math.floor(Math.random() * 1000000) + 100;
    }

    return NextResponse.json({
      success: true,
      currentScore: newScore,
      message: 'Vote successful'
    });

  } catch (error) {
    console.error('Vote API Error:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
