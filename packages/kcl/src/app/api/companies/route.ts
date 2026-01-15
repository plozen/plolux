/**
 * Companies API Route
 *
 * 소속사 목록 조회 엔드포인트
 * - GET: 전체 소속사 목록 (순위순 정렬)
 *
 * 응답 형식:
 * - companies: 소속사 배열
 * - totalCount: 전체 개수
 * - updatedAt: 데이터 갱신 시각
 */

import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

/**
 * 소속사 목록 조회
 *
 * Query Parameters:
 * - tier: 'premier' | 'challengers' (선택, 리그별 필터)
 * - limit: number (선택, 기본 전체)
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient();

    if (!supabase) {
      return NextResponse.json({ error: 'Supabase client not available' }, { status: 503 });
    }

    // Query Parameters 파싱
    const { searchParams } = new URL(request.url);
    const tier = searchParams.get('tier');
    const limit = searchParams.get('limit');

    // 기본 쿼리: 순위순 정렬
    let query = supabase
      .from('kcl_companies')
      .select(
        `
        id,
        name_ko,
        name_en,
        slug,
        logo_url,
        gradient_color,
        rank,
        firepower
      `,
      )
      .order('rank', { ascending: true });

    // 리그 필터 적용
    if (tier === 'premier') {
      query = query.lte('rank', 10);
    } else if (tier === 'challengers') {
      query = query.gt('rank', 10);
    }

    // 개수 제한 적용
    if (limit) {
      const limitNum = parseInt(limit, 10);
      if (!isNaN(limitNum) && limitNum > 0) {
        query = query.limit(limitNum);
      }
    }

    const { data: companies, error } = await query;

    if (error) {
      console.error('[Companies API] Supabase error:', error.message);
      return NextResponse.json({ error: 'Failed to fetch companies' }, { status: 500 });
    }

    return NextResponse.json({
      companies: companies || [],
      totalCount: companies?.length || 0,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[Companies API] Unexpected error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
