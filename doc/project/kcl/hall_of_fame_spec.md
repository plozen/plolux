# Hall of Fame (명예의 전당) 화면 기획서

> **작성일**: 2026-01-14  
> **담당**: Jeff Dean (CTO) - 기획 협의  
> **Phase**: 1, Task T1.14 (예정)  
> **상태**: 기획 중

---

## 1. 개요

### 1.1 페이지 목적

**명예의 전당(Hall of Fame)**은 KCL 리그의 **영광과 역사를 기록**하는 권위 있는 페이지입니다.

- 월간 챔피언들의 **업적을 영구 보존**
- 연간 최다 우승 소속사의 **대상(Grand Champion) 수여**
- 팬덤에게 **"우리도 저기 이름을 올리자!"**라는 동기 부여
- KCL의 **브랜드 권위와 역사성** 구축

### 1.2 핵심 컨셉

> **"Legends of KCL"** - K-pop 팬덤 경쟁의 역사가 새겨지는 곳

### 1.3 라우트

```
/[locale]/hall-of-fame
```

**지원 언어**: 12개 (ko, en, ja, zh, es, pt, fr, de, id, vi, th, tr)

---

## 2. 리그 시스템 개요

### 2.1 월간 리그 (Monthly League)

| 항목            | 내용                                |
| --------------- | ----------------------------------- |
| **주기**        | 매월 1일 00:00 KST ~ 말일 23:59 KST |
| **리그 구분**   | 1부 리그 (Top 10), 2부 리그 (11위~) |
| **월간 챔피언** | 해당 월 마감 시점 1위 소속사        |
| **초기화**      | 매월 1일 00:00에 투표 수 리셋       |

### 2.2 연간 명예의 전당 (Yearly Hall of Fame)

| 항목                      | 내용                                    |
| ------------------------- | --------------------------------------- |
| **기준**                  | 해당 연도 **월간 우승 횟수**            |
| **대상 (Grand Champion)** | 12개월 중 가장 많이 1위를 차지한 소속사 |
| **동률 시**               | 총 득표수로 결정 (또는 공동 대상)       |
| **등재 시점**             | 매년 1월 1일 (전년도 결과 확정)         |

### 2.3 예시 시나리오

```
2026년 월간 우승 기록:
- 1월: HYBE
- 2월: SM Entertainment
- 3월: HYBE
- 4월: HYBE
- 5월: JYP Entertainment
- 6월: SM Entertainment
- 7월: HYBE
- 8월: SM Entertainment
- 9월: HYBE
- 10월: SM Entertainment
- 11월: HYBE
- 12월: SM Entertainment

결과:
- HYBE: 6회 우승 --> 2026 Grand Champion
- SM Entertainment: 5회 우승 --> 2nd Place
- JYP Entertainment: 1회 우승 --> 3rd Place
```

---

## 3. 화면 구성 (와이어프레임)

### 3.1 전체 레이아웃

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                    ★ HALL OF FAME ★                            │
│                   Legends of KCL                                │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                                                           │  │
│  │                 [Grand Champion 2025]                     │  │
│  │                                                           │  │
│  │                    ┌─────────────┐                        │  │
│  │                    │             │                        │  │
│  │                    │   [LOGO]    │                        │  │
│  │                    │             │                        │  │
│  │                    └─────────────┘                        │  │
│  │                                                           │  │
│  │                      H Y B E                              │  │
│  │                                                           │  │
│  │              "2025 Annual Champion"                       │  │
│  │                   7 Victories                             │  │
│  │                                                           │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  [2026 Race - Current Standings]                                │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                                                         │    │
│  │   1st   HYBE              ████████████  6 wins         │    │
│  │   2nd   SM Entertainment  ██████████    5 wins         │    │
│  │   3rd   JYP Entertainment ██            1 win          │    │
│  │                                                         │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  [2026 Monthly Champions Timeline]                              │
│                                                                 │
│  ┌──────┬──────┬──────┬──────┬──────┬──────┐                   │
│  │ JAN  │ FEB  │ MAR  │ APR  │ MAY  │ JUN  │ ...               │
│  │      │      │      │      │      │      │                   │
│  │[HYBE]│ [SM] │[HYBE]│[HYBE]│ [JYP]│ [SM] │                   │
│  │      │      │      │      │      │      │                   │
│  └──────┴──────┴──────┴──────┴──────┴──────┘                   │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  [Hall of Fame Archives]                                        │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │    2025     │  │    2024     │  │    2023     │  ...        │
│  │             │  │             │  │             │             │
│  │    HYBE     │  │     SM      │  │    YG       │             │
│  │   7 wins    │  │   8 wins    │  │   6 wins    │             │
│  │             │  │             │  │             │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 3.2 주요 영역 설명

| 영역                 | 내용                                            |
| -------------------- | ----------------------------------------------- |
| **Header**           | "Hall of Fame" 타이틀, 부제: "Legends of KCL"   |
| **Grand Champion**   | 직전 연도 대상 수상자. 가장 크고 화려하게 표시. |
| **Current Race**     | 현재 연도 우승 횟수 순위. 실시간 경쟁 상황.     |
| **Monthly Timeline** | 해당 연도 월별 우승자 배지 컬렉션.              |
| **Archives**         | 역대 연도별 대상 수상자 카드. 슬라이더/캐러셀.  |

---

## 4. 디자인 컨셉

### 4.1 컬러 팔레트

**테마: Black & Gold (권위와 품격)**

| 용도               | 색상       | HEX       |
| ------------------ | ---------- | --------- |
| **Background**     | Deep Black | `#0A0A0A` |
| **Primary Gold**   | Royal Gold | `#D4AF37` |
| **Secondary Gold** | Light Gold | `#F5D061` |
| **Accent**         | Champagne  | `#F7E7CE` |
| **Text Primary**   | White      | `#FFFFFF` |
| **Text Secondary** | Soft Gray  | `#A0A0A0` |

### 4.2 타이포그래피

| 요소              | 폰트                    | 스타일                          |
| ----------------- | ----------------------- | ------------------------------- |
| **Title**         | Serif (Georgia, Times)  | Bold, Uppercase, Letter-spacing |
| **Champion Name** | Sans-serif (Pretendard) | Bold, Large                     |
| **Body**          | Sans-serif (Pretendard) | Regular                         |
| **Numbers**       | Monospace               | Bold                            |

### 4.3 시각 효과

- **Gold Gradient**: 챔피언 카드에 금빛 그라데이션 테두리
- **Shine Animation**: 대상 로고에 반짝이는 애니메이션 (subtle)
- **Particle Effect**: 배경에 미세한 골드 파티클 (optional)
- **Trophy Icon**: 3D 트로피 또는 고급스러운 SVG 아이콘

---

## 5. 데이터 구조

### 5.1 타입 정의

```typescript
// packages/kcl/src/types/hall-of-fame.ts

/** 월간 챔피언 기록 */
export interface MonthlyChampion {
  year: number;
  month: number; // 1-12
  companyId: string;
  companyName: string;
  companyLogo: string;
  totalVotes: number;
  decidedAt: string; // ISO 8601
}

/** 연간 우승 횟수 집계 */
export interface YearlyWinCount {
  year: number;
  companyId: string;
  companyName: string;
  companyLogo: string;
  winCount: number;
  rank: number;
}

/** 연간 대상 수상자 */
export interface GrandChampion {
  year: number;
  companyId: string;
  companyName: string;
  companyLogo: string;
  winCount: number;
  totalVotesInYear: number;
  decidedAt: string;
}

/** 명예의 전당 전체 데이터 */
export interface HallOfFameData {
  currentYear: number;
  latestGrandChampion: GrandChampion | null;
  currentYearRace: YearlyWinCount[];
  currentYearMonthly: MonthlyChampion[];
  archives: GrandChampion[];
}
```

### 5.2 DB 테이블 설계 (추가 필요)

```sql
-- 월간 챔피언 기록 테이블
CREATE TABLE kcl_monthly_champions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  year INTEGER NOT NULL,
  month INTEGER NOT NULL CHECK (month >= 1 AND month <= 12),
  company_id UUID NOT NULL REFERENCES kcl_companies(id),
  total_votes BIGINT NOT NULL DEFAULT 0,
  decided_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  UNIQUE(year, month) -- 한 달에 한 챔피언만
);

-- 연간 대상 수상자 테이블
CREATE TABLE kcl_grand_champions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  year INTEGER NOT NULL UNIQUE,
  company_id UUID NOT NULL REFERENCES kcl_companies(id),
  win_count INTEGER NOT NULL,
  total_votes_in_year BIGINT NOT NULL DEFAULT 0,
  decided_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 인덱스
CREATE INDEX idx_monthly_champions_year ON kcl_monthly_champions(year);
CREATE INDEX idx_monthly_champions_company ON kcl_monthly_champions(company_id);
```

---

## 6. API 엔드포인트

| 엔드포인트                        | 메서드 | 설명                    |
| --------------------------------- | ------ | ----------------------- |
| `/api/hall-of-fame`               | GET    | 명예의 전당 전체 데이터 |
| `/api/hall-of-fame/current`       | GET    | 현재 연도 경쟁 현황     |
| `/api/hall-of-fame/archives`      | GET    | 역대 대상 수상자 목록   |
| `/api/hall-of-fame/monthly/:year` | GET    | 특정 연도 월별 챔피언   |

---

## 7. 반응형 레이아웃

### 7.1 Mobile (1열)

```
┌─────────────────┐
│   HALL OF FAME  │
├─────────────────┤
│ [Grand Champion]│
│     (Large)     │
├─────────────────┤
│ [Current Race]  │
│   (Vertical)    │
├─────────────────┤
│ [Monthly Grid]  │
│   (2x6 Grid)    │
├─────────────────┤
│ [Archives]      │
│  (Horizontal    │
│    Scroll)      │
└─────────────────┘
```

### 7.2 Desktop (풀 레이아웃)

```
┌─────────────────────────────────────────────┐
│              HALL OF FAME                   │
├─────────────────────────────────────────────┤
│            [Grand Champion]                 │
│               (Hero Size)                   │
├──────────────────────┬──────────────────────┤
│   [Current Race]     │  [Monthly Timeline]  │
│   (Bar Chart)        │  (Badge Grid)        │
├──────────────────────┴──────────────────────┤
│              [Archives Carousel]            │
└─────────────────────────────────────────────┘
```

---

## 8. i18n 메시지 키

```json
// packages/kcl/src/messages/ko.json
{
  "HallOfFame": {
    "title": "명예의 전당",
    "subtitle": "Legends of KCL",
    "grand_champion": "대상",
    "annual_champion": "연간 챔피언",
    "victories": "회 우승",
    "current_race": "현재 순위",
    "monthly_champions": "월간 챔피언",
    "archives": "역대 기록",
    "no_champion_yet": "아직 챔피언이 없습니다",
    "months": {
      "1": "1월",
      "2": "2월",
      "3": "3월",
      "4": "4월",
      "5": "5월",
      "6": "6월",
      "7": "7월",
      "8": "8월",
      "9": "9월",
      "10": "10월",
      "11": "11월",
      "12": "12월"
    }
  }
}
```

---

## 9. 컴포넌트 구조

```
packages/kcl/src/
├── app/[locale]/hall-of-fame/
│   ├── page.tsx                    # 메인 페이지
│   └── page.module.scss            # 페이지 스타일 (Black & Gold)
├── components/features/hall-of-fame/
│   ├── GrandChampionCard/
│   │   ├── index.tsx               # 대상 수상자 대형 카드
│   │   └── GrandChampionCard.module.scss
│   ├── CurrentRaceChart/
│   │   ├── index.tsx               # 현재 연도 우승 횟수 차트
│   │   └── CurrentRaceChart.module.scss
│   ├── MonthlyTimeline/
│   │   ├── index.tsx               # 월별 챔피언 타임라인/그리드
│   │   └── MonthlyTimeline.module.scss
│   ├── ArchivesCarousel/
│   │   ├── index.tsx               # 역대 대상 캐러셀
│   │   └── ArchivesCarousel.module.scss
│   └── ChampionBadge/
│       ├── index.tsx               # 개별 챔피언 배지 컴포넌트
│       └── ChampionBadge.module.scss
├── hooks/
│   └── useHallOfFame.ts            # 명예의 전당 데이터 훅
└── types/
    └── hall-of-fame.ts             # 타입 정의
```

---

## 10. 개발 우선순위

### Phase 1 MVP (Must Have)

- [ ] 페이지 라우트 및 기본 레이아웃
- [ ] Grand Champion 카드 (Mock 데이터)
- [ ] Monthly Timeline 그리드
- [ ] Black & Gold 테마 스타일링
- [ ] 반응형 레이아웃

### Phase 1 추가 (Should Have)

- [ ] Current Race 바 차트
- [ ] Archives 캐러셀
- [ ] 12개 언어 i18n

### Phase 2 (Nice to Have)

- [ ] 실제 DB 연동 (월간 정산 자동화)
- [ ] 애니메이션 효과 (Shine, Particle)
- [ ] 공유 기능 (SNS 카드 생성)
- [ ] 알림 기능 (새 챔피언 확정 시)

---

## 11. 네비게이션 메뉴 추가

### 메뉴 구성 (최종)

| 순서 | 메뉴명                     | 라우트          | 아이콘    |
| :--: | -------------------------- | --------------- | --------- |
|  1   | 홈 (League)                | `/`             | Home      |
|  2   | 통계 (Analytics)           | `/analytics`    | BarChart3 |
|  3   | 명예의 전당 (Hall of Fame) | `/hall-of-fame` | Trophy    |

### i18n 키 추가 필요

```json
{
  "Nav": {
    "hall_of_fame": "명예의 전당"
  }
}
```

---

## 12. 관련 문서

| 문서                 | 경로                                       | 설명               |
| -------------------- | ------------------------------------------ | ------------------ |
| **Analytics 기획서** | `doc/project/kcl/analytics_screen_spec.md` | 통계 페이지 (별도) |
| **PRD**              | `.claude/planning/prd.md`                  | 전체 요구사항      |
| **Tasks**            | `.claude/planning/tasks.md`                | 태스크 목록        |
| **DB Schema**        | `doc/project/kcl/schema.md`                | 기존 테이블 구조   |

---

**작성자**: Jeff Dean (CTO) - 사용자 기획 협의 기반  
**검토**: 대기  
**승인**: 대기
