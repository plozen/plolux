-- ============================================================================
-- KCL Database Migration: 002_seed_companies
-- ============================================================================
-- 
-- 목적: KCL 서비스의 초기 소속사(Entertainment Company) 데이터 시딩
-- 작성일: 2026-01-14
-- 담당: Max (Backend Lead)
-- Phase: 1, Task T1.9
-- 
-- 실행 방법:
--   1. Supabase Dashboard → SQL Editor 접속
--   2. 이 파일 내용을 복사하여 붙여넣기
--   3. "Run" 버튼 클릭
-- 
-- 주의사항:
--   - ON CONFLICT로 중복 INSERT 방지 (멱등성 보장)
--   - slug가 UNIQUE이므로 slug 기준으로 충돌 처리
--   - 실행 전 001_create_tables.sql이 적용되어 있어야 함
-- ============================================================================

-- ============================================================================
-- 1부 리그 대상 소속사 (Top Tier - Big 4 + Major Labels)
-- ============================================================================

INSERT INTO kcl_companies (name_ko, name_en, slug, description, gradient_color, rank, firepower)
VALUES
  -- Big 4 엔터테인먼트
  ('하이브', 'HYBE', 'hybe', 
   'BTS, SEVENTEEN, TXT, NewJeans, LE SSERAFIM 등을 보유한 대한민국 최대 엔터테인먼트 기업. 구 빅히트 엔터테인먼트.', 
   '#000000', 1, 0),
  
  ('SM 엔터테인먼트', 'SM Entertainment', 'sm-entertainment', 
   'aespa, NCT, EXO, Red Velvet, SHINee 등을 보유. K-POP 1세대부터 이어온 명가.', 
   '#FF0000', 2, 0),
  
  ('JYP 엔터테인먼트', 'JYP Entertainment', 'jyp-entertainment', 
   'TWICE, Stray Kids, ITZY, NMIXX 등을 보유. 박진영이 설립한 글로벌 엔터테인먼트.', 
   '#0066FF', 3, 0),
  
  ('YG 엔터테인먼트', 'YG Entertainment', 'yg-entertainment', 
   'BLACKPINK, TREASURE, BABYMONSTER 등을 보유. 힙합 기반의 독특한 음악색.', 
   '#FFD700', 4, 0),

  -- Major 엔터테인먼트 (대형)
  ('스타쉽 엔터테인먼트', 'Starship Entertainment', 'starship-entertainment', 
   'IVE, 몬스타엑스, 크래비티 등을 보유. 카카오엔터테인먼트 산하.', 
   '#8B5CF6', 5, 0),
  
  ('큐브 엔터테인먼트', 'Cube Entertainment', 'cube-entertainment', 
   '(여자)아이들, PENTAGON, LIGHTSUM 등을 보유. 독자적인 음악 색깔로 유명.', 
   '#00CED1', 6, 0),
  
  ('플레디스 엔터테인먼트', 'Pledis Entertainment', 'pledis-entertainment', 
   'SEVENTEEN, fromis_9 등을 보유. 현재 HYBE 산하 레이블.', 
   '#FF69B4', 7, 0),
  
  ('FNC 엔터테인먼트', 'FNC Entertainment', 'fnc-entertainment', 
   'CNBLUE, SF9, P1Harmony 등을 보유. 밴드와 아이돌 그룹을 모두 육성.', 
   '#FF4500', 8, 0),
  
  ('울림 엔터테인먼트', 'Woollim Entertainment', 'woollim-entertainment', 
   '인피니트, 골든차일드, Rocket Punch 등을 보유. SM 출신 이종명 대표 설립.', 
   '#9370DB', 9, 0),
  
  ('RBW', 'RBW', 'rbw', 
   '마마무, 원어스, 퍼플키스 등을 보유. 실력파 보컬 그룹으로 유명.', 
   '#FF1493', 10, 0)

ON CONFLICT (slug) DO UPDATE SET
  name_ko = EXCLUDED.name_ko,
  name_en = EXCLUDED.name_en,
  description = EXCLUDED.description,
  gradient_color = EXCLUDED.gradient_color,
  updated_at = NOW();

-- ============================================================================
-- 2부 리그 대상 소속사 (Mid Tier - Growing Labels)
-- ============================================================================

INSERT INTO kcl_companies (name_ko, name_en, slug, description, gradient_color, rank, firepower)
VALUES
  ('IST 엔터테인먼트', 'IST Entertainment', 'ist-entertainment', 
   '더보이즈, 에이핑크 등을 보유. 구 플레이엠/크레커 엔터테인먼트.', 
   '#4169E1', 11, 0),
  
  ('브랜뉴뮤직', 'Brand New Music', 'brandnew-music', 
   'AB6IX, BDC 등을 보유. 라이머가 설립한 힙합 기반 레이블.', 
   '#32CD32', 12, 0),
  
  ('판타지오', 'Fantagio', 'fantagio', 
   '아스트로, 위키미키 등을 보유. 배우 매니지먼트로도 유명.', 
   '#DDA0DD', 13, 0),
  
  ('WM 엔터테인먼트', 'WM Entertainment', 'wm-entertainment', 
   'OH MY GIRL, ONF, LIMELIGHT 등을 보유. B2M 출신 이원민 대표 설립.', 
   '#FFB6C1', 14, 0),
  
  ('DSP 미디어', 'DSP Media', 'dsp-media', 
   '카라, SS501, 에이프릴의 소속사. K-POP 초창기 명가 중 하나.', 
   '#00FA9A', 15, 0),
  
  ('젤리피쉬 엔터테인먼트', 'Jellyfish Entertainment', 'jellyfish-entertainment', 
   '빅스, 구구단, 세정 등을 보유. 감성적인 음악으로 유명.', 
   '#87CEEB', 16, 0),
  
  ('KQ 엔터테인먼트', 'KQ Entertainment', 'kq-entertainment', 
   'ATEEZ, XIKERS 등을 보유. 퍼포먼스 강자 그룹으로 글로벌 인기.', 
   '#DC143C', 17, 0),
  
  ('AOMG', 'AOMG', 'aomg', 
   '박재범이 설립한 힙합 레이블. 아이돌 그룹보다는 솔로 아티스트 중심.', 
   '#1C1C1C', 18, 0),
  
  ('피네이션', 'P Nation', 'p-nation', 
   '싸이가 설립한 엔터테인먼트. TNX, 제시, 현아 등 소속.', 
   '#FF6347', 19, 0),
  
  ('하이업 엔터테인먼트', 'High Up Entertainment', 'highup-entertainment', 
   'STAYC를 보유. 블랙아이드필승이 설립한 신생 레이블.', 
   '#00BFFF', 20, 0)

ON CONFLICT (slug) DO UPDATE SET
  name_ko = EXCLUDED.name_ko,
  name_en = EXCLUDED.name_en,
  description = EXCLUDED.description,
  gradient_color = EXCLUDED.gradient_color,
  updated_at = NOW();

-- ============================================================================
-- 추가 소속사 (신생/중소 레이블)
-- ============================================================================

INSERT INTO kcl_companies (name_ko, name_en, slug, description, gradient_color, rank, firepower)
VALUES
  ('빌리프랩', 'BELIFT LAB', 'belift-lab', 
   'ENHYPEN, ILLIT 등을 보유. HYBE와 CJ ENM 합작사.', 
   '#6B5B95', 21, 0),
  
  ('어도어', 'ADOR', 'ador', 
   'NewJeans를 보유. 민희진이 이끄는 HYBE 산하 레이블.', 
   '#00CED1', 22, 0),
  
  ('소스뮤직', 'Source Music', 'source-music', 
   'LE SSERAFIM을 보유. 여자친구의 전 소속사, 현재 HYBE 산하.', 
   '#FF85A2', 23, 0),
  
  ('TS 엔터테인먼트', 'TS Entertainment', 'ts-entertainment', 
   'Secret, B.A.P의 전 소속사. 현재는 활동 축소.', 
   '#C0C0C0', 24, 0),
  
  ('미스틱스토리', 'Mystic Story', 'mystic-story', 
   '빌리, 루시 등을 보유. SM C&C 계열사.', 
   '#E6E6FA', 25, 0),
  
  ('모모랜드 컴퍼니', 'MLD Entertainment', 'mld-entertainment', 
   '모모랜드, 트리플에스 등을 보유. 구 MLD엔터.', 
   '#FF00FF', 26, 0),
  
  ('어트랙트', 'ATTRAKT', 'attrakt', 
   'FIFTY FIFTY를 보유. 2022년 설립된 신생 레이블.', 
   '#FFD700', 27, 0),
  
  ('143 엔터테인먼트', '143 Entertainment', '143-entertainment', 
   '있지 전 멤버 등 신인 아티스트를 보유한 중소 기획사.', 
   '#98FB98', 28, 0),
  
  ('SM 문화컨텐츠', 'SM Culture & Contents', 'sm-cc', 
   'SM 계열 배우/솔로 매니지먼트. NCT WISH 합류.', 
   '#FF4040', 29, 0),

  ('YG플러스', 'YG PLUS', 'yg-plus', 
   'YG 계열사. 유통 및 MD 사업 담당.', 
   '#FFE135', 30, 0)

ON CONFLICT (slug) DO UPDATE SET
  name_ko = EXCLUDED.name_ko,
  name_en = EXCLUDED.name_en,
  description = EXCLUDED.description,
  gradient_color = EXCLUDED.gradient_color,
  updated_at = NOW();

-- ============================================================================
-- 완료 메시지
-- ============================================================================

DO $$
DECLARE
  company_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO company_count FROM kcl_companies;
  
  RAISE NOTICE '========================================';
  RAISE NOTICE 'KCL Seed Migration 002 완료!';
  RAISE NOTICE '========================================';
  RAISE NOTICE '시딩된 소속사 수: %', company_count;
  RAISE NOTICE '';
  RAISE NOTICE '다음 단계:';
  RAISE NOTICE '  1. 003_seed_groups.sql 실행 (아티스트 데이터)';
  RAISE NOTICE '========================================';
END $$;
