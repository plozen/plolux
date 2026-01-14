# Home (홈) - League System 화면 기획서

> **작성일**: 2026-01-14  
> **담당**: Luna (Frontend) + Kai (Data Layer)  
> **Phase**: 1, Task T1.14 (예정)  
> **상태**: 기획 완료 - 개발 대기

---

## 1. 개요

### 1.1 페이지 목적

홈 페이지는 KCL의 **핵심 콘텐츠**인 **리그 시스템**을 보여주는 메인 화면입니다.

- 단순 랭킹 나열 ❌ → **1부/2부 승강제 리그** ⭕
- 사용자가 접속하자마자 **"지금 1부 리그는 누구인가?"**를 확인
- **승격/강등 드라마**를 통한 팬덤 경쟁 심리 자극
- 매월 리셋되는 **시즌제**로 지속적인 참여 유도

### 1.2 핵심 컨셉

> **"The League"** - 매달 펼쳐지는 K-pop 소속사 리그전

### 1.3 라우트

```
/[locale]/
```

**지원 언어**: 12개 (ko, en, ja, zh, es, pt, fr, de, id, vi, th, tr)

---

## 2. 리그 시스템 규칙

### 2.1 리그 구분

| 리그                     | 순위       | 특징                   |
| ------------------------ | ---------- | ---------------------- |
| **Premier League (1부)** | 1위 ~ 10위 | 엘리트 존, 화려한 UI   |
| **Challengers (2부)**    | 11위 ~     | 승격을 노리는 도전자들 |

### 2.2 시즌 운영

| 항목            | 내용                                            |
| --------------- | ----------------------------------------------- |
| **시즌 주기**   | **월간** (매월 1일 00:00 KST ~ 말일 23:59 KST)  |
| **초기화**      | 매월 1일 00:00에 투표 수 리셋                   |
| **월간 챔피언** | 시즌 종료 시점 1위 소속사                       |
| **승강**        | 실시간 순위에 따라 즉시 반영 (다음 시즌 대기 X) |

### 2.3 승강전 (Promotion/Relegation Zone)

| 영역                            | 순위 | 설명                      |
| ------------------------------- | ---- | ------------------------- |
| **강등 위기 (Relegation Zone)** | 10위 | 2부로 떨어질 수 있는 위치 |
| **승격 기회 (Promotion Zone)**  | 11위 | 1부로 올라갈 수 있는 위치 |

**승강전 시각화**: 10위와 11위 사이의 **격차(Gap)**를 강조하여 긴장감 연출

---

## 3. 화면 구성 (와이어프레임)

### 3.1 전체 레이아웃

```
┌─────────────────────────────────────────────────────────────────┐
│ [Season Header]                                                 │
│ ┌───────────────────────────────────────────────────────────┐   │
│ │  🏆 2026년 1월 시즌                    D-15 남음          │   │
│ │  현재 1위: HYBE (125,340표)            🔄 실시간 업데이트 │   │
│ └───────────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ [Premier League - 1부 리그]                                     │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │  ⭐ PREMIER LEAGUE                                          │ │
│ │                                                             │ │
│ │  ┌─────────────────────────────────────────────────────┐   │ │
│ │  │  🥇 1. HYBE                                         │   │ │
│ │  │     125,340표  |  +2,340 (1시간)  |  [투표하기]     │   │ │
│ │  └─────────────────────────────────────────────────────┘   │ │
│ │  ┌─────────────────────────────────────────────────────┐   │ │
│ │  │  🥈 2. SM Entertainment                             │   │ │
│ │  │     118,920표  |  +1,890 (1시간)  |  [투표하기]     │   │ │
│ │  └─────────────────────────────────────────────────────┘   │ │
│ │  ┌─────────────────────────────────────────────────────┐   │ │
│ │  │  🥉 3. JYP Entertainment                            │   │ │
│ │  │     105,230표  |  +1,560 (1시간)  |  [투표하기]     │   │ │
│ │  └─────────────────────────────────────────────────────┘   │ │
│ │                                                             │ │
│ │  4. YG Entertainment      98,450표   [투표]                │ │
│ │  5. Starship Ent.         87,320표   [투표]                │ │
│ │  6. Cube Entertainment    76,890표   [투표]                │ │
│ │  7. Pledis Entertainment  72,340표   [투표]                │ │
│ │  8. FNC Entertainment     68,120표   [투표]                │ │
│ │  9. Woollim Ent.          65,430표   [투표]                │ │
│ │                                                             │ │
│ │  ┌─────────────────────────────────────────────────────┐   │ │
│ │  │  ⚠️ 10. RBW Entertainment         62,100표         │   │ │
│ │  │       강등 위기 (Relegation Zone)                   │   │ │
│ │  └─────────────────────────────────────────────────────┘   │ │
│ │                                                             │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│ [Promotion Battle - 승강전 영역]                                │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │                                                             │ │
│ │   ⚔️ 승강전 (PROMOTION BATTLE)                             │ │
│ │                                                             │ │
│ │   10위 RBW          62,100표                               │ │
│ │   ─────────────────────────────────────                    │ │
│ │                    GAP: 1,200표                            │ │
│ │   ─────────────────────────────────────                    │ │
│ │   11위 IST Ent.     60,900표  ▲ 승격 기회!                 │ │
│ │                                                             │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ [Challengers - 2부 리그]                                        │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │  🔥 CHALLENGERS (승격을 노려라!)                            │ │
│ │                                                             │ │
│ │  ┌─────────────────────────────────────────────────────┐   │ │
│ │  │  🔺 11. IST Entertainment          60,900표         │   │ │
│ │  │       승격까지 1,200표!                              │   │ │
│ │  └─────────────────────────────────────────────────────┘   │ │
│ │                                                             │ │
│ │  12. Brand New Music      58,230표   [투표]                │ │
│ │  13. Fantagio             55,670표   [투표]                │ │
│ │  14. WM Entertainment     52,340표   [투표]                │ │
│ │  15. DSP Media            48,900표   [투표]                │ │
│ │  ...                                                       │ │
│ │                                                             │ │
│ │  [더 보기 ▼]                                               │ │
│ │                                                             │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 3.2 주요 영역 설명

#### Season Header (시즌 헤더)

| 요소          | 설명                        |
| ------------- | --------------------------- |
| **시즌 표시** | "2026년 1월 시즌"           |
| **남은 기간** | "D-15 남음" (시즌 종료까지) |
| **현재 1위**  | 실시간 선두 소속사          |
| **갱신 표시** | 실시간 업데이트 인디케이터  |

#### Premier League (1부 리그)

| 요소                 | 설명                                   |
| -------------------- | -------------------------------------- |
| **Top 3 강조**       | 금/은/동 메달 아이콘, 카드 형태로 크게 |
| **4~9위**            | 리스트 형태, 컴팩트하게                |
| **10위 (강등 위기)** | 빨간색 경고 UI, "Relegation Zone" 표시 |
| **투표 버튼**        | 각 항목마다 바로 투표 가능             |

#### Promotion Battle (승강전 영역)

| 요소            | 설명                             |
| --------------- | -------------------------------- |
| **시각적 분리** | 1부와 2부 사이 특별 영역         |
| **격차 표시**   | 10위와 11위의 투표 수 차이 (GAP) |
| **긴장감 연출** | ⚔️ 아이콘, 대결 구도 시각화      |

#### Challengers (2부 리그)

| 요소          | 설명                             |
| ------------- | -------------------------------- |
| **11위 강조** | "승격까지 N표!" 메시지           |
| **12위 이하** | 리스트 형태, 접힌 상태 (더 보기) |
| **동기 부여** | "승격을 노려라!" 문구            |

---

## 4. 투표 인터랙션

### 4.1 투표 플로우

```
[소속사 카드 클릭]
    ↓
[아티스트 선택 모달/패널 열림]
    ↓
[아티스트 선택]
    ↓
[투표 완료 + 파티클 효과]
    ↓
[실시간 순위 업데이트]
```

### 4.2 투표 UI (기존 시스템 활용)

- **Mobile**: BottomSheet로 아티스트 선택
- **Desktop**: StickyPanel 또는 모달
- **파티클 효과**: canvas-confetti 유지

### 4.3 실시간 업데이트

| 항목               | 주기                    |
| ------------------ | ----------------------- |
| **순위 갱신**      | 5초 (또는 투표 시 즉시) |
| **투표 수 카운터** | 실시간 애니메이션       |
| **순위 변동 알림** | 순위 변경 시 하이라이트 |

---

## 5. 반응형 레이아웃

### 5.1 브레이크포인트

| 디바이스    | Breakpoint   | 특징                                     |
| ----------- | ------------ | ---------------------------------------- |
| **Mobile**  | ~767px       | 1열, 카드 축소, BottomSheet 투표         |
| **Tablet**  | 768px~1023px | 1열, 카드 확대                           |
| **Desktop** | 1024px~      | 사이드바 + 메인 콘텐츠, StickyPanel 투표 |

### 5.2 Mobile 레이아웃

```
┌─────────────────┐
│ [Season Header] │
│   (컴팩트)      │
├─────────────────┤
│ [1부 리그]      │
│  Top 3: 카드    │
│  4-10: 리스트   │
├─────────────────┤
│ [승강전 배너]   │
│  GAP 강조       │
├─────────────────┤
│ [2부 리그]      │
│  접힌 상태      │
│  [더 보기]      │
└─────────────────┘
```

### 5.3 Desktop 레이아웃

```
┌─────────────────────────────────────────────┐
│              [Season Header]                │
├─────────────────────────────────────────────┤
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │         [Premier League]            │   │
│  │  Top 3: 대형 카드 (가로 배치)       │   │
│  │  4-10: 리스트                       │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │       [Promotion Battle]            │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │         [Challengers]               │   │
│  │  11위 강조 + 리스트                 │   │
│  └─────────────────────────────────────┘   │
│                                             │
└─────────────────────────────────────────────┘
```

---

## 6. 데이터 구조

### 6.1 타입 정의

```typescript
// packages/kcl/src/types/league.ts

/** 리그 구분 */
export type LeagueTier = 'premier' | 'challengers';

/** 시즌 정보 */
export interface SeasonInfo {
  year: number;
  month: number;
  startDate: string; // ISO 8601
  endDate: string;
  daysRemaining: number;
  isActive: boolean;
}

/** 소속사 순위 정보 */
export interface CompanyRanking {
  companyId: string;
  companyName: string;
  nameKo: string;
  nameEn: string;
  logoUrl: string;
  gradientColor: string;

  rank: number;
  previousRank: number;
  rankChange: number; // +면 상승, -면 하락

  voteCount: number;
  voteCountHourly: number; // 최근 1시간 득표

  tier: LeagueTier;
  isRelegationZone: boolean; // 10위 (강등 위기)
  isPromotionZone: boolean; // 11위 (승격 기회)
}

/** 승강전 정보 */
export interface PromotionBattle {
  relegationCompany: CompanyRanking; // 10위
  promotionCompany: CompanyRanking; // 11위
  gap: number; // 투표 수 격차
}

/** 리그 전체 데이터 */
export interface LeagueData {
  season: SeasonInfo;
  premierLeague: CompanyRanking[]; // 1-10위
  challengers: CompanyRanking[]; // 11위~
  promotionBattle: PromotionBattle;
  totalCompanies: number;
  updatedAt: string;
}
```

### 6.2 API 응답 예시

```typescript
// GET /api/league
{
  "season": {
    "year": 2026,
    "month": 1,
    "startDate": "2026-01-01T00:00:00+09:00",
    "endDate": "2026-01-31T23:59:59+09:00",
    "daysRemaining": 15,
    "isActive": true
  },
  "premierLeague": [
    {
      "companyId": "co-hybe",
      "companyName": "HYBE",
      "rank": 1,
      "voteCount": 125340,
      "tier": "premier",
      "isRelegationZone": false
    },
    // ... 2-10위
  ],
  "challengers": [
    {
      "companyId": "co-ist",
      "companyName": "IST Entertainment",
      "rank": 11,
      "voteCount": 60900,
      "tier": "challengers",
      "isPromotionZone": true
    },
    // ... 12위~
  ],
  "promotionBattle": {
    "relegationCompany": { /* 10위 */ },
    "promotionCompany": { /* 11위 */ },
    "gap": 1200
  }
}
```

---

## 7. API 엔드포인트

| 엔드포인트                | 메서드 | 설명                      |
| ------------------------- | ------ | ------------------------- |
| `/api/league`             | GET    | 전체 리그 데이터          |
| `/api/league/premier`     | GET    | 1부 리그만                |
| `/api/league/challengers` | GET    | 2부 리그만 (페이지네이션) |
| `/api/league/season`      | GET    | 현재 시즌 정보            |
| `/api/vote`               | POST   | 투표 (기존 API)           |

### 쿼리 파라미터

```typescript
// GET /api/league/challengers
interface ChallengersParams {
  page?: number; // 페이지 (기본 1)
  limit?: number; // 개수 (기본 10)
}
```

---

## 8. 시즌 전환 로직

### 8.1 월간 리셋 프로세스

```
[매월 1일 00:00:00 KST]
    ↓
1. 이전 시즌 최종 순위 저장 (kcl_monthly_champions)
2. 월간 챔피언 기록 (1위 소속사)
3. 모든 소속사 투표 수 0으로 초기화
4. 새 시즌 시작 알림
```

### 8.2 시즌 종료 카운트다운

- **D-7**: "시즌 종료 7일 전" 배너
- **D-1**: "내일 시즌 종료!" 긴급 배너
- **D-0**: "오늘 밤 자정 마감!" 최종 배너

---

## 9. 디자인 가이드

### 9.1 리그별 컬러 테마

| 리그                  | Primary Color    | Accent                | 분위기       |
| --------------------- | ---------------- | --------------------- | ------------ |
| **Premier (1부)**     | Gold (#D4AF37)   | Deep Purple (#4A0080) | 엘리트, 권위 |
| **Challengers (2부)** | Silver (#C0C0C0) | Blue (#0066CC)        | 도전, 열정   |
| **Relegation Zone**   | Red (#DC3545)    | -                     | 위기, 긴장   |
| **Promotion Zone**    | Green (#28A745)  | -                     | 기회, 희망   |

### 9.2 Top 3 카드 디자인

```
┌─────────────────────────────────────┐
│  🥇                                 │
│  ┌───────────┐                      │
│  │           │                      │
│  │  [LOGO]   │     HYBE             │
│  │           │     125,340표        │
│  └───────────┘     ▲ +2,340/h       │
│                                     │
│  [투표하기]                         │
└─────────────────────────────────────┘
```

### 9.3 승강전 배너 디자인

```
┌─────────────────────────────────────────────┐
│           ⚔️ PROMOTION BATTLE ⚔️            │
│                                             │
│   [10위 로고]  ←  1,200표  →  [11위 로고]   │
│   RBW              GAP           IST        │
│   62,100표                    60,900표      │
│                                             │
│   "승격까지 단 1,200표!"                    │
└─────────────────────────────────────────────┘
```

---

## 10. i18n 메시지 키

```json
// packages/kcl/src/messages/ko.json
{
  "League": {
    "season": {
      "title": "{year}년 {month}월 시즌",
      "days_remaining": "D-{days} 남음",
      "ends_today": "오늘 마감!",
      "current_leader": "현재 1위",
      "realtime": "실시간 업데이트"
    },
    "premier": {
      "title": "Premier League",
      "subtitle": "1부 리그",
      "relegation_zone": "강등 위기"
    },
    "challengers": {
      "title": "Challengers",
      "subtitle": "2부 리그",
      "promotion_zone": "승격 기회",
      "votes_to_promotion": "승격까지 {count}표!",
      "show_more": "더 보기"
    },
    "promotion_battle": {
      "title": "승강전",
      "gap": "격차"
    },
    "vote": {
      "button": "투표하기",
      "hourly": "시간당 +{count}"
    },
    "rank_change": {
      "up": "▲ {count}",
      "down": "▼ {count}",
      "same": "-"
    }
  }
}
```

---

## 11. 컴포넌트 구조

```
packages/kcl/src/
├── app/[locale]/
│   ├── page.tsx                        # 홈 페이지 (리그 시스템)
│   └── page.module.scss
├── components/features/league/
│   ├── SeasonHeader/
│   │   ├── index.tsx                   # 시즌 정보 헤더
│   │   └── SeasonHeader.module.scss
│   ├── PremierLeague/
│   │   ├── index.tsx                   # 1부 리그 섹션
│   │   └── PremierLeague.module.scss
│   ├── TopThreeCard/
│   │   ├── index.tsx                   # Top 3 대형 카드
│   │   └── TopThreeCard.module.scss
│   ├── LeagueRankingItem/
│   │   ├── index.tsx                   # 순위 리스트 아이템
│   │   └── LeagueRankingItem.module.scss
│   ├── PromotionBattle/
│   │   ├── index.tsx                   # 승강전 영역
│   │   └── PromotionBattle.module.scss
│   ├── Challengers/
│   │   ├── index.tsx                   # 2부 리그 섹션
│   │   └── Challengers.module.scss
│   └── VoteButton/
│       ├── index.tsx                   # 투표 버튼 (기존 활용)
│       └── VoteButton.module.scss
├── hooks/
│   └── useLeague.ts                    # 리그 데이터 SWR 훅
└── types/
    └── league.ts                       # 타입 정의
```

### 컴포넌트 인터페이스

```typescript
// SeasonHeader
interface SeasonHeaderProps {
  season: SeasonInfo;
  leader: CompanyRanking;
}

// PremierLeague
interface PremierLeagueProps {
  companies: CompanyRanking[];
  onVote: (companyId: string) => void;
}

// TopThreeCard
interface TopThreeCardProps {
  company: CompanyRanking;
  rank: 1 | 2 | 3;
  onVote: () => void;
}

// PromotionBattle
interface PromotionBattleProps {
  battle: PromotionBattle;
}

// Challengers
interface ChallengersProps {
  companies: CompanyRanking[];
  onVote: (companyId: string) => void;
  onLoadMore: () => void;
  hasMore: boolean;
}
```

---

## 12. 개발 우선순위 (Phase 1 MVP)

### 필수 구현 (Must Have)

- [ ] 시즌 헤더 (현재 시즌, 남은 기간)
- [ ] 1부 리그 섹션 (Top 10)
- [ ] Top 3 카드 디자인
- [ ] 2부 리그 섹션 (11위~)
- [ ] 투표 기능 연동 (기존 시스템)
- [ ] 반응형 레이아웃

### 권장 구현 (Should Have)

- [ ] 승강전 영역 (10위 vs 11위)
- [ ] 실시간 순위 업데이트
- [ ] 순위 변동 표시 (▲▼)
- [ ] 12개 언어 i18n

### 추후 구현 (Nice to Have)

- [ ] 시즌 종료 카운트다운 애니메이션
- [ ] 순위 변동 알림 토스트
- [ ] 월간 리셋 자동화 (Cron)
- [ ] 시즌 종료 결과 모달

---

## 13. 기존 코드 활용

### 13.1 재사용할 컴포넌트

| 기존 컴포넌트    | 용도                 |
| ---------------- | -------------------- |
| `VoteController` | 투표 인터페이스      |
| `BottomSheet`    | 모바일 아티스트 선택 |
| `StickyPanel`    | 데스크탑 투표 패널   |
| `SearchBar`      | 소속사/아티스트 검색 |

### 13.2 수정 필요한 컴포넌트

| 기존 컴포넌트          | 변경 사항                        |
| ---------------------- | -------------------------------- |
| `DashboardRankingItem` | `LeagueRankingItem`으로 리팩토링 |
| `page.tsx` (홈)        | 리그 시스템 UI로 전면 개편       |

---

## 14. 관련 문서

| 문서                    | 경로                                       | 설명          |
| ----------------------- | ------------------------------------------ | ------------- |
| **Hall of Fame 기획서** | `doc/project/kcl/hall_of_fame_spec.md`     | 명예의 전당   |
| **Analytics 기획서**    | `doc/project/kcl/analytics_screen_spec.md` | 통계 페이지   |
| **PRD**                 | `.claude/planning/prd.md`                  | 전체 요구사항 |
| **Tasks**               | `.claude/planning/tasks.md`                | 태스크 목록   |

---

## 15. 협업 포인트 (Luna & Kai)

### Luna 담당 영역

- Top 3 카드 디자인 (Gold/Silver/Bronze)
- 승강전 배너 UI/UX
- 리그별 컬러 테마 적용
- 반응형 레이아웃
- 순위 변동 애니메이션

### Kai 담당 영역

- 타입 정의 (`types/league.ts`)
- 리그 데이터 API 연동
- 실시간 업데이트 로직 (SWR)
- 시즌 전환 로직
- 투표 시스템 연동

---

**작성자**: Jeff Dean (CTO) - 사용자 기획 협의 기반  
**담당**: Luna (Frontend) + Kai (Data Layer)  
**검토**: 대기  
**승인**: 대기
