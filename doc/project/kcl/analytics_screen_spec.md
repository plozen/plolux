# Analytics(통계) 화면 기획서

> **작성일**: 2026-01-14  
> **수정일**: 2026-01-14 (전면 개편)  
> **담당**: Kai (Lead) + Luna (Support)  
> **Phase**: 1, Task T1.13  
> **상태**: 기획 완료 - 개발 대기

---

## 1. 개요

### 1.1 페이지 목적

Analytics 페이지는 KCL 투표 데이터의 **심층 분석**을 제공하는 페이지입니다.

- **국가별 팬덤 파워** 시각화: "우리 오빠는 어느 나라에서 인기 많을까?"
- **아티스트별 기여도** 분석: "소속사 내에서 누가 제일 화력이 쎌까?"
- **레이블별 기여도** (HYBE 전용): "HYBE 산하 레이블 중 어디가 강할까?"

### 1.2 타겟 사용자

| 사용자 유형   | 니즈                         | 예상 행동                     |
| ------------- | ---------------------------- | ----------------------------- |
| **코어 팬덤** | 우리 그룹의 글로벌 인기 확인 | 국가별 분포 체크, SNS 공유    |
| **스밍 총대** | 어느 나라 팬덤이 약한지 분석 | 취약 지역 타겟 홍보 전략 수립 |
| **캐주얼 팬** | K-pop 글로벌 현황 탐색       | 국가별 순위 구경              |
| **HYBE 팬**   | 레이블 간 경쟁 현황          | 레이블별 기여도 비교          |

### 1.3 라우트

```
/[locale]/analytics
```

**지원 언어**: 12개 (ko, en, ja, zh, es, pt, fr, de, id, vi, th, tr)

---

## 2. 핵심 기능

### 2.1 기능 요약

| 기능                  | 설명                               | 필터 연동             |
| --------------------- | ---------------------------------- | --------------------- |
| **국가별 투표 현황**  | 어느 나라에서 투표가 많이 나오는지 | 전체/소속사/아티스트  |
| **아티스트별 기여도** | 소속사 내 아티스트별 투표 비중     | 소속사 선택 필수      |
| **레이블별 기여도**   | HYBE 산하 레이블별 투표 비중       | HYBE 선택 시에만 노출 |

### 2.2 삭제된 기능 (기존 기획 대비)

- ~~실시간 투표 추이 (Line Chart)~~
- ~~소속사별 점유율 (Donut Chart)~~
- ~~급상승 Top 5 (Bar Chart)~~

---

## 3. 화면 구성 (와이어프레임)

### 3.1 전체 레이아웃

```
┌─────────────────────────────────────────────────────────────────┐
│ [Filter Bar]                                                    │
│ ┌───────────────────────────────────────────────────────────┐   │
│ │  대상: [전체 ▼] [HYBE ▼] [BTS ▼]    기간: [7일] [30일]   │   │
│ └───────────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ [Global Fandom Power - 국가별 투표 현황]                        │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │                                                             │ │
│ │   🌏 BTS 팬덤의 글로벌 분포                                 │ │
│ │                                                             │ │
│ │   1. 🇺🇸 USA          ████████████████████  35.2%          │ │
│ │   2. 🇰🇷 South Korea  █████████████        22.1%          │ │
│ │   3. 🇯🇵 Japan        ████████             14.5%          │ │
│ │   4. 🇧🇷 Brazil       ██████               10.3%          │ │
│ │   5. 🇮🇩 Indonesia    █████                 8.7%          │ │
│ │      Others           ████                  9.2%          │ │
│ │                                                             │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ [Artist Contribution - 아티스트별 기여도]                       │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │                                                             │ │
│ │   HYBE 소속 아티스트별 투표 비중                            │ │
│ │                                                             │ │
│ │   NewJeans   ████████████████████████████  32%             │ │
│ │   BTS        ████████████████████         24%             │ │
│ │   SEVENTEEN  ████████████████             20%             │ │
│ │   TXT        ██████████                   14%             │ │
│ │   Others     ██████                       10%             │ │
│ │                                                             │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ [Label Contribution - 레이블별 기여도] ⭐ HYBE 전용             │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │                                                             │ │
│ │   HYBE 산하 레이블별 투표 비중                              │ │
│ │                                                             │ │
│ │   ADOR           ████████████████████████  32%  (NewJeans) │ │
│ │   BIGHIT MUSIC   ██████████████████████    28%  (BTS, TXT) │ │
│ │   PLEDIS         ████████████████          20%  (SVT)      │ │
│ │   SOURCE MUSIC   ██████████                12%  (LE SSE)   │ │
│ │   BELIFT LAB     ██████                     8%  (ENHYPEN)  │ │
│ │                                                             │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│ [Footer]                                                        │
│   ⏱️ 마지막 업데이트: 2026-01-14 10:32:45 KST                   │
└─────────────────────────────────────────────────────────────────┘
```

### 3.2 주요 영역 설명

#### Filter Bar (필터 바)

| 필터          | 옵션                     | 설명           |
| ------------- | ------------------------ | -------------- |
| **대상 선택** | 전체 / 소속사 / 아티스트 | 3단계 드릴다운 |
| **기간 선택** | 7일 / 30일 / 전체        | 분석 기간      |

**필터 동작 로직**:

- `전체` 선택: 플랫폼 전체 통계
- `소속사` 선택: 해당 소속사 내 통계 (아티스트 기여도 활성화)
- `아티스트` 선택: 해당 아티스트 팬덤 통계

#### Global Fandom Power (국가별 투표 현황)

| 항목            | 내용                                    |
| --------------- | --------------------------------------- |
| **데이터 소스** | IP 기반 GeoIP 국가 코드                 |
| **표시 형식**   | 국기 + 국가명 + Horizontal Bar + 퍼센트 |
| **표시 개수**   | Top 5 + Others                          |
| **정렬**        | 투표 수 내림차순                        |

#### Artist Contribution (아티스트별 기여도)

| 항목            | 내용                                 |
| --------------- | ------------------------------------ |
| **활성화 조건** | 소속사 또는 아티스트 선택 시         |
| **표시 형식**   | 아티스트명 + Horizontal Bar + 퍼센트 |
| **표시 개수**   | Top 5 + Others                       |

#### Label Contribution (레이블별 기여도) - HYBE 전용

| 항목                 | 내용                                                                         |
| -------------------- | ---------------------------------------------------------------------------- |
| **활성화 조건**      | **HYBE 선택 시에만** 노출                                                    |
| **표시 형식**        | 레이블명 + Bar + 퍼센트 + 대표 아티스트                                      |
| **HYBE 산하 레이블** | BIGHIT MUSIC, PLEDIS, ADOR, SOURCE MUSIC, BELIFT LAB, KOZ, HYBE LABELS JAPAN |

---

## 4. 반응형 레이아웃

### 4.1 브레이크포인트

| 디바이스    | Breakpoint   | 레이아웃                |
| ----------- | ------------ | ----------------------- |
| **Mobile**  | ~767px       | 1열 스택, 필터 드롭다운 |
| **Tablet**  | 768px~1023px | 1열, 필터 가로 배치     |
| **Desktop** | 1024px~      | 2열 그리드 가능         |

### 4.2 Mobile 레이아웃

```
┌─────────────────┐
│ [Filter Bar]    │
│ (Dropdown형)    │
├─────────────────┤
│ [Global Fandom] │
│ (Full Width)    │
├─────────────────┤
│ [Artist Contrib]│
├─────────────────┤
│ [Label Contrib] │
│ (HYBE Only)     │
└─────────────────┘
```

### 4.3 Desktop 레이아웃

```
┌─────────────────────────────────────────┐
│            [Filter Bar]                 │
├─────────────────────────────────────────┤
│         [Global Fandom Power]           │
│            (Full Width)                 │
├───────────────────┬─────────────────────┤
│ [Artist Contrib]  │  [Label Contrib]    │
│                   │  (HYBE Only)        │
└───────────────────┴─────────────────────┘
```

---

## 5. 데이터 구조

### 5.1 타입 정의

```typescript
// packages/kcl/src/types/analytics.ts

/** 필터 옵션 */
export type PeriodFilter = '7days' | '30days' | 'all';

export type TargetType = 'global' | 'company' | 'artist';

export interface AnalyticsFilter {
  target: TargetType;
  companyId?: string;
  artistId?: string;
  period: PeriodFilter;
}

/** 국가별 투표 데이터 */
export interface CountryVote {
  countryCode: string; // ISO 3166-1 alpha-2 (예: "US", "KR")
  countryName: string; // 영문 국가명
  countryNameKo: string; // 한글 국가명
  flagEmoji: string; // 국기 이모지
  voteCount: number;
  percentage: number; // 0~100
  rank: number;
}

export interface GlobalFandomData {
  filter: AnalyticsFilter;
  totalVotes: number;
  countries: CountryVote[];
  updatedAt: string;
}

/** 아티스트별 기여도 */
export interface ArtistContribution {
  artistId: string;
  artistName: string;
  nameKo: string;
  nameEn: string;
  companyId: string;
  voteCount: number;
  percentage: number;
}

export interface ArtistContributionData {
  companyId: string;
  companyName: string;
  period: PeriodFilter;
  totalVotes: number;
  artists: ArtistContribution[];
}

/** 레이블별 기여도 (HYBE 전용) */
export interface LabelContribution {
  labelId: string;
  labelName: string;
  representativeArtists: string[]; // 대표 아티스트명 배열
  voteCount: number;
  percentage: number;
}

export interface LabelContributionData {
  companyId: string; // 항상 HYBE
  companyName: string;
  period: PeriodFilter;
  totalVotes: number;
  labels: LabelContribution[];
}

/** HYBE 산하 레이블 목록 */
export const HYBE_LABELS = [
  { id: 'bighit-music', name: 'BIGHIT MUSIC', artists: ['BTS', 'TXT'] },
  { id: 'pledis', name: 'PLEDIS', artists: ['SEVENTEEN', 'fromis_9'] },
  { id: 'ador', name: 'ADOR', artists: ['NewJeans'] },
  { id: 'source-music', name: 'SOURCE MUSIC', artists: ['LE SSERAFIM'] },
  { id: 'belift-lab', name: 'BELIFT LAB', artists: ['ENHYPEN'] },
  { id: 'koz', name: 'KOZ Entertainment', artists: ['Zico'] },
  { id: 'hybe-japan', name: 'HYBE LABELS JAPAN', artists: ['&TEAM'] },
] as const;
```

### 5.2 DB 테이블 추가 (GeoIP 저장)

```sql
-- kcl_votes 테이블에 국가 코드 컬럼 추가
ALTER TABLE kcl_votes
ADD COLUMN country_code VARCHAR(2);

-- 인덱스 추가
CREATE INDEX idx_votes_country ON kcl_votes(country_code);

-- HYBE 레이블-아티스트 매핑 테이블
CREATE TABLE kcl_labels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES kcl_companies(id),
  name VARCHAR(100) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 아티스트-레이블 연결
ALTER TABLE kcl_groups
ADD COLUMN label_id UUID REFERENCES kcl_labels(id);
```

---

## 6. API 엔드포인트

| 엔드포인트                           | 메서드 | 설명                   |
| ------------------------------------ | ------ | ---------------------- |
| `/api/analytics/global-fandom`       | GET    | 국가별 투표 현황       |
| `/api/analytics/artist-contribution` | GET    | 아티스트별 기여도      |
| `/api/analytics/label-contribution`  | GET    | 레이블별 기여도 (HYBE) |

### 쿼리 파라미터

```typescript
// 공통 파라미터
interface AnalyticsQueryParams {
  period: PeriodFilter; // 필수
  companyId?: string; // 소속사 필터
  artistId?: string; // 아티스트 필터
  limit?: number; // 결과 개수 (기본 5)
}
```

---

## 7. Mock 데이터

### 7.1 파일 위치

```
packages/kcl/src/data/mock/analytics.ts
```

### 7.2 Mock 데이터 구현

```typescript
// packages/kcl/src/data/mock/analytics.ts

import type {
  GlobalFandomData,
  ArtistContributionData,
  LabelContributionData,
} from '@/types/analytics';

/** 국가별 투표 Mock 데이터 */
export const MOCK_GLOBAL_FANDOM: GlobalFandomData = {
  filter: {
    target: 'artist',
    companyId: 'co-hybe',
    artistId: 'ar-bts',
    period: '7days',
  },
  totalVotes: 1250000,
  countries: [
    {
      countryCode: 'US',
      countryName: 'United States',
      countryNameKo: '미국',
      flagEmoji: '🇺🇸',
      voteCount: 440000,
      percentage: 35.2,
      rank: 1,
    },
    {
      countryCode: 'KR',
      countryName: 'South Korea',
      countryNameKo: '대한민국',
      flagEmoji: '🇰🇷',
      voteCount: 276250,
      percentage: 22.1,
      rank: 2,
    },
    {
      countryCode: 'JP',
      countryName: 'Japan',
      countryNameKo: '일본',
      flagEmoji: '🇯🇵',
      voteCount: 181250,
      percentage: 14.5,
      rank: 3,
    },
    {
      countryCode: 'BR',
      countryName: 'Brazil',
      countryNameKo: '브라질',
      flagEmoji: '🇧🇷',
      voteCount: 128750,
      percentage: 10.3,
      rank: 4,
    },
    {
      countryCode: 'ID',
      countryName: 'Indonesia',
      countryNameKo: '인도네시아',
      flagEmoji: '🇮🇩',
      voteCount: 108750,
      percentage: 8.7,
      rank: 5,
    },
  ],
  updatedAt: '2026-01-14T10:32:45Z',
};

/** 아티스트별 기여도 Mock 데이터 */
export const MOCK_ARTIST_CONTRIBUTION: ArtistContributionData = {
  companyId: 'co-hybe',
  companyName: 'HYBE',
  period: '7days',
  totalVotes: 312500,
  artists: [
    {
      artistId: 'ar-newjeans',
      artistName: 'NewJeans',
      nameKo: '뉴진스',
      nameEn: 'NewJeans',
      companyId: 'co-hybe',
      voteCount: 100000,
      percentage: 32,
    },
    {
      artistId: 'ar-bts',
      artistName: 'BTS',
      nameKo: '방탄소년단',
      nameEn: 'BTS',
      companyId: 'co-hybe',
      voteCount: 75000,
      percentage: 24,
    },
    {
      artistId: 'ar-seventeen',
      artistName: 'SEVENTEEN',
      nameKo: '세븐틴',
      nameEn: 'SEVENTEEN',
      companyId: 'co-hybe',
      voteCount: 62500,
      percentage: 20,
    },
    {
      artistId: 'ar-txt',
      artistName: 'TXT',
      nameKo: '투모로우바이투게더',
      nameEn: 'TXT',
      companyId: 'co-hybe',
      voteCount: 43750,
      percentage: 14,
    },
    {
      artistId: 'ar-others',
      artistName: 'Others',
      nameKo: '기타',
      nameEn: 'Others',
      companyId: 'co-hybe',
      voteCount: 31250,
      percentage: 10,
    },
  ],
};

/** 레이블별 기여도 Mock 데이터 (HYBE 전용) */
export const MOCK_LABEL_CONTRIBUTION: LabelContributionData = {
  companyId: 'co-hybe',
  companyName: 'HYBE',
  period: '7days',
  totalVotes: 312500,
  labels: [
    {
      labelId: 'ador',
      labelName: 'ADOR',
      representativeArtists: ['NewJeans'],
      voteCount: 100000,
      percentage: 32,
    },
    {
      labelId: 'bighit-music',
      labelName: 'BIGHIT MUSIC',
      representativeArtists: ['BTS', 'TXT'],
      voteCount: 87500,
      percentage: 28,
    },
    {
      labelId: 'pledis',
      labelName: 'PLEDIS',
      representativeArtists: ['SEVENTEEN', 'fromis_9'],
      voteCount: 62500,
      percentage: 20,
    },
    {
      labelId: 'source-music',
      labelName: 'SOURCE MUSIC',
      representativeArtists: ['LE SSERAFIM'],
      voteCount: 37500,
      percentage: 12,
    },
    {
      labelId: 'belift-lab',
      labelName: 'BELIFT LAB',
      representativeArtists: ['ENHYPEN'],
      voteCount: 25000,
      percentage: 8,
    },
  ],
};
```

---

## 8. 기술 스택

### 8.1 차트 라이브러리: Recharts

```typescript
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
```

### 8.2 데이터 페칭: SWR

```typescript
// packages/kcl/src/hooks/useAnalytics.ts
import useSWR from 'swr';

export function useGlobalFandom(filter: AnalyticsFilter) {
  const params = new URLSearchParams({
    period: filter.period,
    ...(filter.companyId && { companyId: filter.companyId }),
    ...(filter.artistId && { artistId: filter.artistId }),
  });

  return useSWR(`/api/analytics/global-fandom?${params}`, fetcher, {
    refreshInterval: 5 * 60 * 1000,
  });
}
```

### 8.3 상태 관리: URL 파라미터 (nuqs)

```typescript
import { useQueryState, parseAsStringEnum } from 'nuqs';

export function useAnalyticsFilter() {
  const [period, setPeriod] = useQueryState('period', {
    defaultValue: '7days',
  });
  const [companyId, setCompanyId] = useQueryState('company');
  const [artistId, setArtistId] = useQueryState('artist');

  return {
    filter: { period, companyId, artistId },
    setPeriod,
    setCompanyId,
    setArtistId,
  };
}
```

---

## 9. i18n 메시지 키

```json
// packages/kcl/src/messages/ko.json
{
  "Analytics": {
    "title": "통계",
    "filter": {
      "target": "대상 선택",
      "global": "전체",
      "company": "소속사",
      "artist": "아티스트",
      "period": "기간",
      "7days": "7일",
      "30days": "30일",
      "all": "전체"
    },
    "global_fandom": {
      "title": "국가별 투표 현황",
      "subtitle_global": "전 세계 팬덤 파워",
      "subtitle_filtered": "{name} 팬덤의 글로벌 분포",
      "others": "기타"
    },
    "artist_contribution": {
      "title": "아티스트별 기여도",
      "subtitle": "{company} 소속 아티스트별 투표 비중"
    },
    "label_contribution": {
      "title": "레이블별 기여도",
      "subtitle": "HYBE 산하 레이블별 투표 비중",
      "hybe_only": "HYBE 전용"
    },
    "footer": {
      "last_update": "마지막 업데이트"
    },
    "loading": "데이터 로딩 중...",
    "error": "데이터를 불러올 수 없습니다",
    "retry": "다시 시도"
  }
}
```

---

## 10. 컴포넌트 구조

```
packages/kcl/src/
├── app/[locale]/analytics/
│   ├── page.tsx                    # Analytics 페이지
│   └── page.module.scss
├── components/features/analytics/
│   ├── AnalyticsFilterBar/
│   │   ├── index.tsx               # 필터 바 (대상/기간 선택)
│   │   └── AnalyticsFilterBar.module.scss
│   ├── GlobalFandomChart/
│   │   ├── index.tsx               # 국가별 투표 차트
│   │   └── GlobalFandomChart.module.scss
│   ├── ArtistContributionChart/
│   │   ├── index.tsx               # 아티스트별 기여도 차트
│   │   └── ArtistContributionChart.module.scss
│   ├── LabelContributionChart/
│   │   ├── index.tsx               # 레이블별 기여도 (HYBE 전용)
│   │   └── LabelContributionChart.module.scss
│   └── ChartSkeleton/
│       ├── index.tsx               # 로딩 스켈레톤
│       └── ChartSkeleton.module.scss
├── hooks/
│   └── useAnalytics.ts             # 분석 데이터 SWR 훅
├── types/
│   └── analytics.ts                # 타입 정의
└── data/mock/
    └── analytics.ts                # Mock 데이터
```

### 컴포넌트 인터페이스

```typescript
// AnalyticsFilterBar
interface AnalyticsFilterBarProps {
  filter: AnalyticsFilter;
  onFilterChange: (filter: AnalyticsFilter) => void;
  companies: CompanyOption[];
  artists: ArtistOption[];
}

// GlobalFandomChart
interface GlobalFandomChartProps {
  data: GlobalFandomData | undefined;
  isLoading: boolean;
  filterLabel?: string; // "BTS 팬덤의 글로벌 분포"
}

// ArtistContributionChart
interface ArtistContributionChartProps {
  data: ArtistContributionData | undefined;
  isLoading: boolean;
}

// LabelContributionChart
interface LabelContributionChartProps {
  data: LabelContributionData | undefined;
  isLoading: boolean;
  isVisible: boolean; // HYBE 선택 시에만 true
}
```

---

## 11. 개발 우선순위 (Phase 1 MVP)

### 필수 구현 (Must Have)

- [ ] 필터 바 UI (대상/기간 선택)
- [ ] 국가별 투표 현황 차트 (Bar Chart)
- [ ] Mock 데이터 기반 렌더링
- [ ] 반응형 레이아웃

### 권장 구현 (Should Have)

- [ ] 아티스트별 기여도 차트
- [ ] 레이블별 기여도 차트 (HYBE 전용)
- [ ] 로딩/에러 상태 UI

### 추후 구현 (Nice to Have)

- [ ] 실제 GeoIP 연동
- [ ] 실시간 데이터 (Supabase)
- [ ] 세계 지도 시각화

---

## 12. 관련 문서

| 문서                    | 경로                                   | 설명                      |
| ----------------------- | -------------------------------------- | ------------------------- |
| **Hall of Fame 기획서** | `doc/project/kcl/hall_of_fame_spec.md` | 명예의 전당 (별도 페이지) |
| **PRD**                 | `.claude/planning/prd.md`              | 전체 요구사항             |
| **Tasks**               | `.claude/planning/tasks.md`            | 태스크 목록               |
| **DB Schema**           | `doc/project/kcl/schema.md`            | 테이블 구조               |

---

## 13. 협업 포인트 (Luna & Kai)

### Luna 담당 영역

- 필터 바 UI/UX 디자인
- 차트 스타일링 (SCSS 모듈)
- 반응형 레이아웃
- 로딩/에러 상태 UI
- 국기 이모지 표시 처리

### Kai 담당 영역

- 타입 정의 (`types/analytics.ts`)
- Mock 데이터 구조 (`data/mock/analytics.ts`)
- SWR 훅 (`hooks/useAnalytics.ts`)
- GeoIP 처리 로직 (Phase 2)
- API 엔드포인트 설계

---

**작성자**: Jeff Dean (CTO) - 사용자 기획 협의 기반  
**담당**: Kai (Lead) + Luna (Support)  
**검토**: 대기  
**승인**: 대기
