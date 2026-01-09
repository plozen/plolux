# QuoteForm Input vs Database Table Mapping

이 문서는 새로운 기획에 맞춰 리뉴얼된 `QuoteForm`의 입력 데이터와 Supabase `project_requests` 테이블 컬럼 간의 매핑을 정의합니다.

## 1. Current Table Schema (`project_requests`)

| Column Name       | Type        | Description           |
| :---------------- | :---------- | :-------------------- |
| `id`              | uuid        | Primary Key           |
| `project_type`    | text        | 프로젝트 유형         |
| `budget_range`    | text        | 예산 범위             |
| `client_name`     | text        | 담당자 성함           |
| `company_name`    | text        | 회사/팀명             |
| `contact_email`   | text        | 이메일                |
| `contact_phone`   | text        | 연락처                |
| `description`     | text        | 상세 내용             |
| `target_deadline` | text        | (Legacy) 희망 마감일  |
| `reference_urls`  | text        | (Legacy) 레퍼런스 URL |
| `created_at`      | timestamptz | 생성일                |
| `status`          | text        | 처리 상태             |

---

## 2. New Form Requirements & Mapping Strategy

새로운 폼은 기존보다 더 세분화된 정보를 수집하므로, **필드를 신규 추가**하거나 **JSONB 컬럼**을 활용하여 구조화된 데이터를 저장할 필요가 있습니다.

### Step 1: 서비스 유형 (Card 1)

- **Form Key**: `service_type`
- **Value**: "corporate" | "landing"
- **Target Column**: `project_type` (Existing)
  - _Note_: 기존 컬럼 재사용.

### Step 2: 예산 범위 (Card 2)

- **Form Key**: `budget` / `budget_custom`
- **Value**: "350k", "1m", "2m", "3m", "pending", "custom input"
- **Target Column**: `budget_range` (Existing)
  - _Logic_: 직접 입력일 경우 "Custom: {입력값}" 형태로 저장하거나, 그대로 텍스트 저장.

### Step 3: 디자인 분위기 (Card 3)

- **Form Key**: `design_mood` / `design_ref_url`
- **Value**: "trustworthy", "warm", "luxury", "creative", "unsure" (with url input)
- **Target Column**: `design_mood` (New) or `details` (JSONB)
  - **Proposal**: **`design_mood`** 컬럼 추가 (Text)
  - _Ref URL_: `reference_urls` 컬럼에 매핑.

### Step 4: 기능 및 콘텐츠 (Card 4)

- **Form Key**: `features` (Array) / `service_count`, `contact_email_target` etc.
- **Value**: List of features + conditional inputs
- **Target Column**: `features` (New: JSONB or Text Array)
  - **Proposal**: **`features`** 컬럼 추가 (JSONB 권장)
  - _Reason_: 각 기능별 추가 입력값(서비스 개수 등)을 함께 저장하기 위함.
  - _Structure Example_:
    ```json
    {
      "selected": ["company_intro", "service_intro"],
      "service_count": 5,
      "contact_target": "CEO"
    }
    ```

### Step 5: 타겟 고객 (Card 5)

- **Form Key**: `target_audience`
- **Value**: Text (Long)
- **Target Column**: `target_audience` (New)
  - **Proposal**: **`target_audience`** 컬럼 추가 (Text)
  - _Alternative_: `description` 상단에 병합 저장.

### Step 6-A: 제작 목표 (Card 6)

- **Form Key**: `project_goal`
- **Value**: "trust", "leads", "sales", "info"
- **Target Column**: `project_goal` (New)
  - **Proposal**: **`project_goal`** 컬럼 추가 (Text)

### Step 6-B: 담당자 정보 (Card 6)

- **Form Key**: `client_name`, `contact_phone`, `contact_email`, `company_name`, `description`
- **Target Columns**: (All Existing)
  - `client_name` -> `client_name`
  - `contact_phone` -> `contact_phone`
  - `contact_email` -> `contact_email`
  - `company_name` -> `company_name`
  - `description` -> `description` (추가 요청사항)

---

## 3. Summary of Schema Changes Required

데이터의 무결성과 향후 확장성을 위해 **Supabase 테이블 스키마 변경**을 제안합니다.

| Action  | Column Name       | Type    | Note                        |
| :------ | :---------------- | :------ | :-------------------------- |
| **Add** | `design_mood`     | `text`  | 디자인 분위기 저장          |
| **Add** | `features`        | `jsonb` | 기능 목록 및 세부 옵션 저장 |
| **Add** | `target_audience` | `text`  | 타겟 고객 설명 저장         |
| **Add** | `project_goal`    | `text`  | 프로젝트 핵심 목표 저장     |

> 위 변경사항이 승인되면 `migration.sql`을 작성하여 DB에 적용할 예정입니다.
