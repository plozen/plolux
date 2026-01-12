-- ============================================================================
-- KCL Database Migration: 001_create_tables
-- ============================================================================
-- 
-- 목적: KCL (Kpop Company League) 서비스의 핵심 데이터베이스 테이블 생성
-- 작성일: 2026-01-12
-- 담당: Max (Backend Lead)
-- Phase: 1, Task T1.8
-- 
-- 실행 방법:
--   1. Supabase Dashboard → SQL Editor 접속
--   2. 이 파일 내용을 복사하여 붙여넣기
--   3. "Run" 버튼 클릭
-- 
-- 주의사항:
--   - 이 스크립트는 멱등성(Idempotent)을 보장하지 않습니다.
--   - 테이블이 이미 존재하는 경우 에러가 발생합니다.
--   - 프로덕션 환경에서는 반드시 백업 후 실행하세요.
-- ============================================================================

-- ============================================================================
-- 1. 유틸리티 함수 (Utility Functions)
-- ============================================================================

-- updated_at 컬럼 자동 업데이트 트리거 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   -- 현재 시간으로 updated_at 컬럼 자동 갱신
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- 2. 테이블 생성 (Table Creation)
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 2.1. kcl_companies (소속사 정보)
-- ----------------------------------------------------------------------------
CREATE TABLE kcl_companies (
    -- Primary Key
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- 회사 기본 정보
    name_ko TEXT NOT NULL,                         -- 한국어 회사명 (예: "하이브")
    name_en TEXT NOT NULL,                         -- 영어 회사명 (예: "HYBE")
    slug TEXT NOT NULL UNIQUE,                     -- URL용 슬러그 (예: "hybe")
    
    -- UI/UX 관련
    logo_url TEXT,                                 -- 로고 이미지 URL
    description TEXT,                              -- 회사 설명
    gradient_color TEXT DEFAULT '#8B5CF6',        -- UI 그라데이션 색상 (Hex)
    
    -- 랭킹 관련
    rank INTEGER NOT NULL DEFAULT 999,             -- 현재 순위 (1위부터 시작)
    firepower BIGINT NOT NULL DEFAULT 0,           -- 현재 화력 점수 (누적 투표)
    
    -- 타임스탬프
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), -- 생성일시
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), -- 수정일시
    
    -- 제약조건
    CONSTRAINT check_rank_positive CHECK (rank > 0),
    CONSTRAINT check_firepower_non_negative CHECK (firepower >= 0)
);

-- 인덱스: 순위 정렬
CREATE INDEX idx_companies_rank ON kcl_companies(rank ASC);

-- 트리거: updated_at 자동 업데이트
CREATE TRIGGER set_updated_at_companies
BEFORE UPDATE ON kcl_companies
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- 코멘트
COMMENT ON TABLE kcl_companies IS 'K-pop 엔터테인먼트 소속사 정보';
COMMENT ON COLUMN kcl_companies.slug IS 'URL 친화적인 고유 식별자 (예: hybe)';
COMMENT ON COLUMN kcl_companies.firepower IS '실시간 화력 점수 (Redis 캐싱 대상)';

-- ----------------------------------------------------------------------------
-- 2.2. kcl_groups (아티스트/그룹 정보)
-- ----------------------------------------------------------------------------
CREATE TABLE kcl_groups (
    -- Primary Key
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Foreign Key
    company_id UUID NOT NULL,                      -- 소속사 ID
    
    -- 그룹 기본 정보
    name_ko TEXT NOT NULL,                         -- 한국어 그룹명 (예: "방탄소년단")
    name_en TEXT NOT NULL,                         -- 영어 그룹명 (예: "BTS")
    slug TEXT NOT NULL UNIQUE,                     -- URL용 슬러그 (예: "bts")
    
    -- 그룹 상세 정보
    debut_date DATE,                               -- 데뷔일
    member_count INTEGER,                          -- 멤버 수
    group_type TEXT DEFAULT 'group',               -- 그룹 타입 (boy/girl/solo/co-ed)
    is_active BOOLEAN NOT NULL DEFAULT true,       -- 활동 여부 (true: 활동, false: 해체/휴식)
    
    -- 타임스탬프
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), -- 생성일시
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), -- 수정일시
    
    -- 제약조건
    CONSTRAINT check_member_count_positive CHECK (member_count > 0),
    CONSTRAINT check_group_type CHECK (group_type IN ('boy', 'girl', 'solo', 'co-ed')),
    
    -- Foreign Key 제약조건
    CONSTRAINT fk_groups_company FOREIGN KEY (company_id) 
        REFERENCES kcl_companies(id) ON DELETE CASCADE
);

-- 인덱스: 소속사별 그룹 조회
CREATE INDEX idx_groups_company_id ON kcl_groups(company_id);

-- 트리거: updated_at 자동 업데이트
CREATE TRIGGER set_updated_at_groups
BEFORE UPDATE ON kcl_groups
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- 코멘트
COMMENT ON TABLE kcl_groups IS 'K-pop 아티스트(그룹) 정보';
COMMENT ON COLUMN kcl_groups.group_type IS 'boy: 남성 그룹, girl: 여성 그룹, solo: 솔로, co-ed: 혼성';

-- ----------------------------------------------------------------------------
-- 2.3. kcl_votes (투표 내역)
-- ----------------------------------------------------------------------------
CREATE TABLE kcl_votes (
    -- Primary Key
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Foreign Keys
    company_id UUID NOT NULL,                      -- 투표 대상 소속사
    group_id UUID,                                 -- 투표 연관 그룹 (선택적)
    
    -- 익명 유저 식별
    user_identifier TEXT,                          -- 익명 유저 식별자 (UUID 또는 fingerprint)
    ip_hash TEXT NOT NULL,                         -- IP 주소 해시 (Rate Limit 용도, SHA-256)
    
    -- 투표 상세 정보
    vote_power INTEGER NOT NULL DEFAULT 1,         -- 투표 화력 (기본 1, 부스터 시 증가)
    vote_source TEXT DEFAULT 'web',                -- 투표 출처 (web/mobile/api)
    metadata JSONB,                                -- 추가 메타데이터 (기기 정보, 언어 등)
    
    -- 타임스탬프
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), -- 투표 일시
    
    -- 제약조건
    CONSTRAINT check_vote_power_positive CHECK (vote_power > 0),
    CONSTRAINT check_vote_source CHECK (vote_source IN ('web', 'mobile', 'api')),
    
    -- Foreign Key 제약조건
    CONSTRAINT fk_votes_company FOREIGN KEY (company_id) 
        REFERENCES kcl_companies(id) ON DELETE CASCADE,
    CONSTRAINT fk_votes_group FOREIGN KEY (group_id) 
        REFERENCES kcl_groups(id) ON DELETE SET NULL
);

-- 인덱스: 실시간 랭킹 계산 (핵심!)
CREATE INDEX idx_votes_company_created ON kcl_votes(company_id, created_at DESC);

-- 인덱스: Rate Limit 체크 (IP 기반)
CREATE INDEX idx_votes_ip_created ON kcl_votes(ip_hash, created_at DESC);

-- 인덱스: 그룹별 투표 분석
CREATE INDEX idx_votes_group_created ON kcl_votes(group_id, created_at DESC) 
WHERE group_id IS NOT NULL;

-- 코멘트
COMMENT ON TABLE kcl_votes IS '유저 투표 기록 (익명 기반)';
COMMENT ON COLUMN kcl_votes.ip_hash IS 'Rate Limit 방지용 IP 해시 (원본 IP 저장 안함)';
COMMENT ON COLUMN kcl_votes.metadata IS 'JSON 형식의 추가 정보 (예: {"device": "mobile", "lang": "ko"})';

-- ----------------------------------------------------------------------------
-- 2.4. kcl_comments (댓글)
-- ----------------------------------------------------------------------------
CREATE TABLE kcl_comments (
    -- Primary Key
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Foreign Keys
    company_id UUID NOT NULL,                      -- 댓글 대상 소속사
    user_id UUID,                                  -- 작성자 (Phase 2 로그인 시 사용)
    
    -- 댓글 내용
    content TEXT NOT NULL,                         -- 댓글 내용 (1~500자)
    author_name TEXT NOT NULL DEFAULT 'Anonymous', -- 작성자 닉네임 (익명 가능)
    password_hash TEXT NOT NULL,                   -- 댓글 수정/삭제용 비밀번호 (bcrypt)
    
    -- 상태 관리
    is_deleted BOOLEAN NOT NULL DEFAULT false,     -- 삭제 여부 (soft delete)
    
    -- 타임스탬프
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), -- 작성일시
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), -- 수정일시
    
    -- 제약조건
    CONSTRAINT check_content_length CHECK (char_length(content) BETWEEN 1 AND 500),
    
    -- Foreign Key 제약조건
    CONSTRAINT fk_comments_company FOREIGN KEY (company_id) 
        REFERENCES kcl_companies(id) ON DELETE CASCADE,
    CONSTRAINT fk_comments_user FOREIGN KEY (user_id) 
        REFERENCES kcl_users(id) ON DELETE SET NULL
);

-- 인덱스: 소속사별 댓글 조회 (삭제되지 않은 댓글만)
CREATE INDEX idx_comments_company_created ON kcl_comments(company_id, created_at DESC) 
WHERE is_deleted = false;

-- 트리거: updated_at 자동 업데이트
CREATE TRIGGER set_updated_at_comments
BEFORE UPDATE ON kcl_comments
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- 코멘트
COMMENT ON TABLE kcl_comments IS '소속사별 응원 댓글 (익명 기반, 비밀번호 보호)';
COMMENT ON COLUMN kcl_comments.password_hash IS 'bcrypt 해시된 비밀번호 (수정/삭제 검증용)';
COMMENT ON COLUMN kcl_comments.is_deleted IS 'soft delete 플래그 (실제 데이터는 유지)';

-- ----------------------------------------------------------------------------
-- 2.5. kcl_users (유저 정보) - Phase 2 대비
-- ----------------------------------------------------------------------------
CREATE TABLE kcl_users (
    -- Primary Key
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- 기본 정보
    email TEXT UNIQUE,                             -- 이메일 (Supabase Auth 연동)
    nickname TEXT,                                 -- 닉네임
    avatar_url TEXT,                               -- 프로필 이미지 URL
    
    -- 유료 회원 정보
    is_premium BOOLEAN NOT NULL DEFAULT false,     -- 유료 회원 여부
    premium_until TIMESTAMPTZ,                     -- 유료 만료일
    
    -- 타임스탬프
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), -- 가입일시
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()  -- 수정일시
);

-- 트리거: updated_at 자동 업데이트
CREATE TRIGGER set_updated_at_users
BEFORE UPDATE ON kcl_users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- 코멘트
COMMENT ON TABLE kcl_users IS '유저 정보 (Phase 2부터 사용)';
COMMENT ON COLUMN kcl_users.is_premium IS '유료 회원 여부 (Phase 2 결제 연동)';

-- ============================================================================
-- 3. RLS (Row Level Security) 정책
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 3.1. kcl_companies RLS
-- ----------------------------------------------------------------------------
ALTER TABLE kcl_companies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "공개: 모든 사용자 조회 가능" 
ON kcl_companies FOR SELECT 
USING (true);

CREATE POLICY "제한: 관리자만 수정 가능" 
ON kcl_companies FOR UPDATE 
USING (auth.role() = 'service_role');

-- ----------------------------------------------------------------------------
-- 3.2. kcl_groups RLS
-- ----------------------------------------------------------------------------
ALTER TABLE kcl_groups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "공개: 모든 사용자 조회 가능" 
ON kcl_groups FOR SELECT 
USING (true);

CREATE POLICY "제한: 관리자만 수정 가능" 
ON kcl_groups FOR UPDATE 
USING (auth.role() = 'service_role');

-- ----------------------------------------------------------------------------
-- 3.3. kcl_votes RLS
-- ----------------------------------------------------------------------------
ALTER TABLE kcl_votes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "공개: 모든 사용자 조회 가능" 
ON kcl_votes FOR SELECT 
USING (true);

CREATE POLICY "공개: 익명 투표 허용" 
ON kcl_votes FOR INSERT 
WITH CHECK (true);
-- 주의: Rate Limit은 Edge Function 또는 Application Layer에서 처리

-- ----------------------------------------------------------------------------
-- 3.4. kcl_comments RLS
-- ----------------------------------------------------------------------------
ALTER TABLE kcl_comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "공개: 삭제되지 않은 댓글 조회" 
ON kcl_comments FOR SELECT 
USING (is_deleted = false);

CREATE POLICY "공개: 익명 댓글 작성 허용" 
ON kcl_comments FOR INSERT 
WITH CHECK (true);

-- 댓글 수정/삭제는 비밀번호 검증 후 Application Layer에서 처리
-- (RLS로는 비밀번호 검증 불가, Edge Function 필요)

-- ----------------------------------------------------------------------------
-- 3.5. kcl_users RLS (Phase 2 대비)
-- ----------------------------------------------------------------------------
ALTER TABLE kcl_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "공개: 프로필 조회 가능" 
ON kcl_users FOR SELECT 
USING (true);

CREATE POLICY "제한: 본인만 수정 가능" 
ON kcl_users FOR UPDATE 
USING (auth.uid() = id);

-- ============================================================================
-- 4. 완료 메시지
-- ============================================================================

DO $$
BEGIN
    RAISE NOTICE '========================================';
    RAISE NOTICE 'KCL Database Migration 001 완료!';
    RAISE NOTICE '========================================';
    RAISE NOTICE '생성된 테이블:';
    RAISE NOTICE '  - kcl_companies (소속사 정보)';
    RAISE NOTICE '  - kcl_groups (아티스트/그룹 정보)';
    RAISE NOTICE '  - kcl_votes (투표 내역)';
    RAISE NOTICE '  - kcl_comments (댓글)';
    RAISE NOTICE '  - kcl_users (유저 정보)';
    RAISE NOTICE '';
    RAISE NOTICE '다음 단계:';
    RAISE NOTICE '  1. Supabase Studio에서 테이블 생성 확인';
    RAISE NOTICE '  2. 초기 데이터 시딩 (002_seed_data.sql)';
    RAISE NOTICE '  3. Frontend API 연동';
    RAISE NOTICE '========================================';
END $$;
