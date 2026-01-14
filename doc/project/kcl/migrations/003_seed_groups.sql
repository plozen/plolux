-- ============================================================================
-- KCL Database Migration: 003_seed_groups
-- ============================================================================
-- 
-- 목적: KCL 서비스의 초기 아티스트(그룹) 데이터 시딩
-- 작성일: 2026-01-14
-- 담당: Max (Backend Lead)
-- Phase: 1, Task T1.9
-- 
-- 실행 방법:
--   1. 002_seed_companies.sql 먼저 실행 (소속사 데이터 필요)
--   2. Supabase Dashboard → SQL Editor 접속
--   3. 이 파일 내용을 복사하여 붙여넣기
--   4. "Run" 버튼 클릭
-- 
-- 주의사항:
--   - 소속사 데이터가 먼저 존재해야 함 (FK 제약조건)
--   - ON CONFLICT로 중복 INSERT 방지 (멱등성 보장)
-- ============================================================================

-- ============================================================================
-- HYBE 소속 그룹
-- ============================================================================

INSERT INTO kcl_groups (company_id, name_ko, name_en, slug, debut_date, member_count, group_type, is_active)
SELECT 
  c.id,
  g.name_ko,
  g.name_en,
  g.slug,
  g.debut_date::DATE,
  g.member_count,
  g.group_type,
  g.is_active
FROM kcl_companies c
CROSS JOIN (VALUES
  ('방탄소년단', 'BTS', 'bts', '2013-06-13', 7, 'boy', true),
  ('세븐틴', 'SEVENTEEN', 'seventeen', '2015-05-26', 13, 'boy', true),
  ('투모로우바이투게더', 'TOMORROW X TOGETHER', 'txt', '2019-03-04', 5, 'boy', true),
  ('엔하이픈', 'ENHYPEN', 'enhypen', '2020-11-30', 7, 'boy', true),
  ('뉴진스', 'NewJeans', 'newjeans', '2022-07-22', 5, 'girl', true),
  ('르세라핌', 'LE SSERAFIM', 'le-sserafim', '2022-05-02', 5, 'girl', true),
  ('아일릿', 'ILLIT', 'illit', '2024-03-25', 5, 'girl', true),
  ('프로미스나인', 'fromis_9', 'fromis-9', '2018-01-24', 9, 'girl', true),
  ('지코', 'ZICO', 'zico', '2011-04-15', 1, 'solo', true)
) AS g(name_ko, name_en, slug, debut_date, member_count, group_type, is_active)
WHERE c.slug = 'hybe'
ON CONFLICT (slug) DO UPDATE SET
  name_ko = EXCLUDED.name_ko,
  name_en = EXCLUDED.name_en,
  debut_date = EXCLUDED.debut_date,
  member_count = EXCLUDED.member_count,
  group_type = EXCLUDED.group_type,
  is_active = EXCLUDED.is_active,
  updated_at = NOW();

-- ============================================================================
-- SM Entertainment 소속 그룹
-- ============================================================================

INSERT INTO kcl_groups (company_id, name_ko, name_en, slug, debut_date, member_count, group_type, is_active)
SELECT 
  c.id,
  g.name_ko,
  g.name_en,
  g.slug,
  g.debut_date::DATE,
  g.member_count,
  g.group_type,
  g.is_active
FROM kcl_companies c
CROSS JOIN (VALUES
  ('에스파', 'aespa', 'aespa', '2020-11-17', 4, 'girl', true),
  ('NCT', 'NCT', 'nct', '2016-04-09', 25, 'boy', true),
  ('NCT 127', 'NCT 127', 'nct-127', '2016-07-07', 10, 'boy', true),
  ('NCT DREAM', 'NCT DREAM', 'nct-dream', '2016-08-24', 7, 'boy', true),
  ('WayV', 'WayV', 'wayv', '2019-01-17', 7, 'boy', true),
  ('레드벨벳', 'Red Velvet', 'red-velvet', '2014-08-01', 5, 'girl', true),
  ('엑소', 'EXO', 'exo', '2012-04-08', 9, 'boy', true),
  ('샤이니', 'SHINee', 'shinee', '2008-05-25', 4, 'boy', true),
  ('슈퍼주니어', 'Super Junior', 'super-junior', '2005-11-06', 9, 'boy', true),
  ('소녀시대', 'Girls Generation', 'girls-generation', '2007-08-05', 8, 'girl', true),
  ('라이즈', 'RIIZE', 'riize', '2023-09-04', 7, 'boy', true),
  ('보아', 'BoA', 'boa', '2000-08-25', 1, 'solo', true),
  ('태연', 'TAEYEON', 'taeyeon', '2015-10-07', 1, 'solo', true)
) AS g(name_ko, name_en, slug, debut_date, member_count, group_type, is_active)
WHERE c.slug = 'sm-entertainment'
ON CONFLICT (slug) DO UPDATE SET
  name_ko = EXCLUDED.name_ko,
  name_en = EXCLUDED.name_en,
  debut_date = EXCLUDED.debut_date,
  member_count = EXCLUDED.member_count,
  group_type = EXCLUDED.group_type,
  is_active = EXCLUDED.is_active,
  updated_at = NOW();

-- ============================================================================
-- JYP Entertainment 소속 그룹
-- ============================================================================

INSERT INTO kcl_groups (company_id, name_ko, name_en, slug, debut_date, member_count, group_type, is_active)
SELECT 
  c.id,
  g.name_ko,
  g.name_en,
  g.slug,
  g.debut_date::DATE,
  g.member_count,
  g.group_type,
  g.is_active
FROM kcl_companies c
CROSS JOIN (VALUES
  ('트와이스', 'TWICE', 'twice', '2015-10-20', 9, 'girl', true),
  ('스트레이 키즈', 'Stray Kids', 'stray-kids', '2018-03-25', 8, 'boy', true),
  ('있지', 'ITZY', 'itzy', '2019-02-11', 5, 'girl', true),
  ('엔믹스', 'NMIXX', 'nmixx', '2022-02-22', 6, 'girl', true),
  ('데이식스', 'DAY6', 'day6', '2015-09-07', 5, 'boy', true),
  ('엑시드', 'Xdinary Heroes', 'xdinary-heroes', '2021-12-06', 6, 'boy', true),
  ('VCHA', 'VCHA', 'vcha', '2024-01-20', 6, 'girl', true),
  ('NEXZ', 'NEXZ', 'nexz', '2024-05-20', 7, 'boy', true),
  ('박진영', 'J.Y. Park', 'jypark', '1994-04-13', 1, 'solo', true)
) AS g(name_ko, name_en, slug, debut_date, member_count, group_type, is_active)
WHERE c.slug = 'jyp-entertainment'
ON CONFLICT (slug) DO UPDATE SET
  name_ko = EXCLUDED.name_ko,
  name_en = EXCLUDED.name_en,
  debut_date = EXCLUDED.debut_date,
  member_count = EXCLUDED.member_count,
  group_type = EXCLUDED.group_type,
  is_active = EXCLUDED.is_active,
  updated_at = NOW();

-- ============================================================================
-- YG Entertainment 소속 그룹
-- ============================================================================

INSERT INTO kcl_groups (company_id, name_ko, name_en, slug, debut_date, member_count, group_type, is_active)
SELECT 
  c.id,
  g.name_ko,
  g.name_en,
  g.slug,
  g.debut_date::DATE,
  g.member_count,
  g.group_type,
  g.is_active
FROM kcl_companies c
CROSS JOIN (VALUES
  ('블랙핑크', 'BLACKPINK', 'blackpink', '2016-08-08', 4, 'girl', true),
  ('트레저', 'TREASURE', 'treasure', '2020-08-07', 10, 'boy', true),
  ('베이비몬스터', 'BABYMONSTER', 'babymonster', '2024-04-01', 7, 'girl', true),
  ('빅뱅', 'BIGBANG', 'bigbang', '2006-08-19', 4, 'boy', true),
  ('아이콘', 'iKON', 'ikon', '2015-09-15', 6, 'boy', true),
  ('위너', 'WINNER', 'winner', '2014-08-17', 4, 'boy', true),
  ('악동뮤지션', 'AKMU', 'akmu', '2014-04-07', 2, 'co-ed', true),
  ('제니', 'JENNIE', 'jennie', '2018-11-12', 1, 'solo', true),
  ('로제', 'ROSE', 'rose', '2021-03-12', 1, 'solo', true)
) AS g(name_ko, name_en, slug, debut_date, member_count, group_type, is_active)
WHERE c.slug = 'yg-entertainment'
ON CONFLICT (slug) DO UPDATE SET
  name_ko = EXCLUDED.name_ko,
  name_en = EXCLUDED.name_en,
  debut_date = EXCLUDED.debut_date,
  member_count = EXCLUDED.member_count,
  group_type = EXCLUDED.group_type,
  is_active = EXCLUDED.is_active,
  updated_at = NOW();

-- ============================================================================
-- Starship Entertainment 소속 그룹
-- ============================================================================

INSERT INTO kcl_groups (company_id, name_ko, name_en, slug, debut_date, member_count, group_type, is_active)
SELECT 
  c.id,
  g.name_ko,
  g.name_en,
  g.slug,
  g.debut_date::DATE,
  g.member_count,
  g.group_type,
  g.is_active
FROM kcl_companies c
CROSS JOIN (VALUES
  ('아이브', 'IVE', 'ive', '2021-12-01', 6, 'girl', true),
  ('몬스타엑스', 'MONSTA X', 'monsta-x', '2015-05-14', 6, 'boy', true),
  ('크래비티', 'CRAVITY', 'cravity', '2020-04-14', 9, 'boy', true),
  ('우주소녀', 'WJSN', 'wjsn', '2016-02-25', 10, 'girl', true),
  ('케플러', 'Kep1er', 'kep1er', '2022-01-03', 9, 'girl', false),
  ('장원영', 'JANG WONYOUNG', 'jang-wonyoung', '2021-12-01', 1, 'solo', true)
) AS g(name_ko, name_en, slug, debut_date, member_count, group_type, is_active)
WHERE c.slug = 'starship-entertainment'
ON CONFLICT (slug) DO UPDATE SET
  name_ko = EXCLUDED.name_ko,
  name_en = EXCLUDED.name_en,
  debut_date = EXCLUDED.debut_date,
  member_count = EXCLUDED.member_count,
  group_type = EXCLUDED.group_type,
  is_active = EXCLUDED.is_active,
  updated_at = NOW();

-- ============================================================================
-- Cube Entertainment 소속 그룹
-- ============================================================================

INSERT INTO kcl_groups (company_id, name_ko, name_en, slug, debut_date, member_count, group_type, is_active)
SELECT 
  c.id,
  g.name_ko,
  g.name_en,
  g.slug,
  g.debut_date::DATE,
  g.member_count,
  g.group_type,
  g.is_active
FROM kcl_companies c
CROSS JOIN (VALUES
  ('(여자)아이들', '(G)I-DLE', 'g-i-dle', '2018-05-02', 5, 'girl', true),
  ('펜타곤', 'PENTAGON', 'pentagon', '2016-10-10', 9, 'boy', true),
  ('라잇썸', 'LIGHTSUM', 'lightsum', '2021-06-10', 6, 'girl', true),
  ('비투비', 'BTOB', 'btob', '2012-03-21', 6, 'boy', true),
  ('유선호', 'YU SEONHO', 'yu-seonho', '2018-04-19', 1, 'solo', true)
) AS g(name_ko, name_en, slug, debut_date, member_count, group_type, is_active)
WHERE c.slug = 'cube-entertainment'
ON CONFLICT (slug) DO UPDATE SET
  name_ko = EXCLUDED.name_ko,
  name_en = EXCLUDED.name_en,
  debut_date = EXCLUDED.debut_date,
  member_count = EXCLUDED.member_count,
  group_type = EXCLUDED.group_type,
  is_active = EXCLUDED.is_active,
  updated_at = NOW();

-- ============================================================================
-- FNC Entertainment 소속 그룹
-- ============================================================================

INSERT INTO kcl_groups (company_id, name_ko, name_en, slug, debut_date, member_count, group_type, is_active)
SELECT 
  c.id,
  g.name_ko,
  g.name_en,
  g.slug,
  g.debut_date::DATE,
  g.member_count,
  g.group_type,
  g.is_active
FROM kcl_companies c
CROSS JOIN (VALUES
  ('씨엔블루', 'CNBLUE', 'cnblue', '2010-01-14', 4, 'boy', true),
  ('SF9', 'SF9', 'sf9', '2016-10-05', 9, 'boy', true),
  ('피원하모니', 'P1Harmony', 'p1harmony', '2020-10-28', 6, 'boy', true),
  ('체리블렛', 'Cherry Bullet', 'cherry-bullet', '2019-01-21', 7, 'girl', true),
  ('엔플라잉', 'N.Flying', 'n-flying', '2015-05-20', 4, 'boy', true)
) AS g(name_ko, name_en, slug, debut_date, member_count, group_type, is_active)
WHERE c.slug = 'fnc-entertainment'
ON CONFLICT (slug) DO UPDATE SET
  name_ko = EXCLUDED.name_ko,
  name_en = EXCLUDED.name_en,
  debut_date = EXCLUDED.debut_date,
  member_count = EXCLUDED.member_count,
  group_type = EXCLUDED.group_type,
  is_active = EXCLUDED.is_active,
  updated_at = NOW();

-- ============================================================================
-- RBW 소속 그룹
-- ============================================================================

INSERT INTO kcl_groups (company_id, name_ko, name_en, slug, debut_date, member_count, group_type, is_active)
SELECT 
  c.id,
  g.name_ko,
  g.name_en,
  g.slug,
  g.debut_date::DATE,
  g.member_count,
  g.group_type,
  g.is_active
FROM kcl_companies c
CROSS JOIN (VALUES
  ('마마무', 'MAMAMOO', 'mamamoo', '2014-06-18', 4, 'girl', true),
  ('원어스', 'ONEUS', 'oneus', '2019-01-09', 6, 'boy', true),
  ('원위', 'ONEWE', 'onewe', '2019-05-13', 4, 'boy', true),
  ('퍼플키스', 'Purple Kiss', 'purple-kiss', '2021-03-15', 7, 'girl', true),
  ('화사', 'HWASA', 'hwasa', '2019-02-13', 1, 'solo', true)
) AS g(name_ko, name_en, slug, debut_date, member_count, group_type, is_active)
WHERE c.slug = 'rbw'
ON CONFLICT (slug) DO UPDATE SET
  name_ko = EXCLUDED.name_ko,
  name_en = EXCLUDED.name_en,
  debut_date = EXCLUDED.debut_date,
  member_count = EXCLUDED.member_count,
  group_type = EXCLUDED.group_type,
  is_active = EXCLUDED.is_active,
  updated_at = NOW();

-- ============================================================================
-- KQ Entertainment 소속 그룹
-- ============================================================================

INSERT INTO kcl_groups (company_id, name_ko, name_en, slug, debut_date, member_count, group_type, is_active)
SELECT 
  c.id,
  g.name_ko,
  g.name_en,
  g.slug,
  g.debut_date::DATE,
  g.member_count,
  g.group_type,
  g.is_active
FROM kcl_companies c
CROSS JOIN (VALUES
  ('에이티즈', 'ATEEZ', 'ateez', '2018-10-24', 8, 'boy', true),
  ('싸이커스', 'XIKERS', 'xikers', '2023-03-30', 10, 'boy', true)
) AS g(name_ko, name_en, slug, debut_date, member_count, group_type, is_active)
WHERE c.slug = 'kq-entertainment'
ON CONFLICT (slug) DO UPDATE SET
  name_ko = EXCLUDED.name_ko,
  name_en = EXCLUDED.name_en,
  debut_date = EXCLUDED.debut_date,
  member_count = EXCLUDED.member_count,
  group_type = EXCLUDED.group_type,
  is_active = EXCLUDED.is_active,
  updated_at = NOW();

-- ============================================================================
-- Woollim Entertainment 소속 그룹
-- ============================================================================

INSERT INTO kcl_groups (company_id, name_ko, name_en, slug, debut_date, member_count, group_type, is_active)
SELECT 
  c.id,
  g.name_ko,
  g.name_en,
  g.slug,
  g.debut_date::DATE,
  g.member_count,
  g.group_type,
  g.is_active
FROM kcl_companies c
CROSS JOIN (VALUES
  ('인피니트', 'INFINITE', 'infinite', '2010-06-09', 7, 'boy', true),
  ('골든차일드', 'Golden Child', 'golden-child', '2017-08-28', 10, 'boy', true),
  ('로켓펀치', 'Rocket Punch', 'rocket-punch', '2019-08-07', 6, 'girl', true),
  ('드리핀', 'DRIPPIN', 'drippin', '2020-10-28', 7, 'boy', true),
  ('러블리즈', 'Lovelyz', 'lovelyz', '2014-11-12', 8, 'girl', false)
) AS g(name_ko, name_en, slug, debut_date, member_count, group_type, is_active)
WHERE c.slug = 'woollim-entertainment'
ON CONFLICT (slug) DO UPDATE SET
  name_ko = EXCLUDED.name_ko,
  name_en = EXCLUDED.name_en,
  debut_date = EXCLUDED.debut_date,
  member_count = EXCLUDED.member_count,
  group_type = EXCLUDED.group_type,
  is_active = EXCLUDED.is_active,
  updated_at = NOW();

-- ============================================================================
-- IST Entertainment 소속 그룹
-- ============================================================================

INSERT INTO kcl_groups (company_id, name_ko, name_en, slug, debut_date, member_count, group_type, is_active)
SELECT 
  c.id,
  g.name_ko,
  g.name_en,
  g.slug,
  g.debut_date::DATE,
  g.member_count,
  g.group_type,
  g.is_active
FROM kcl_companies c
CROSS JOIN (VALUES
  ('더보이즈', 'THE BOYZ', 'the-boyz', '2017-12-06', 11, 'boy', true),
  ('에이핑크', 'Apink', 'apink', '2011-04-19', 6, 'girl', true),
  ('비클리', 'VICTON', 'victon', '2016-11-09', 7, 'boy', true)
) AS g(name_ko, name_en, slug, debut_date, member_count, group_type, is_active)
WHERE c.slug = 'ist-entertainment'
ON CONFLICT (slug) DO UPDATE SET
  name_ko = EXCLUDED.name_ko,
  name_en = EXCLUDED.name_en,
  debut_date = EXCLUDED.debut_date,
  member_count = EXCLUDED.member_count,
  group_type = EXCLUDED.group_type,
  is_active = EXCLUDED.is_active,
  updated_at = NOW();

-- ============================================================================
-- WM Entertainment 소속 그룹
-- ============================================================================

INSERT INTO kcl_groups (company_id, name_ko, name_en, slug, debut_date, member_count, group_type, is_active)
SELECT 
  c.id,
  g.name_ko,
  g.name_en,
  g.slug,
  g.debut_date::DATE,
  g.member_count,
  g.group_type,
  g.is_active
FROM kcl_companies c
CROSS JOIN (VALUES
  ('오마이걸', 'OH MY GIRL', 'oh-my-girl', '2015-04-20', 7, 'girl', true),
  ('온앤오프', 'ONF', 'onf', '2017-08-02', 6, 'boy', true),
  ('라임라잇', 'LIMELIGHT', 'limelight', '2023-02-24', 7, 'girl', true)
) AS g(name_ko, name_en, slug, debut_date, member_count, group_type, is_active)
WHERE c.slug = 'wm-entertainment'
ON CONFLICT (slug) DO UPDATE SET
  name_ko = EXCLUDED.name_ko,
  name_en = EXCLUDED.name_en,
  debut_date = EXCLUDED.debut_date,
  member_count = EXCLUDED.member_count,
  group_type = EXCLUDED.group_type,
  is_active = EXCLUDED.is_active,
  updated_at = NOW();

-- ============================================================================
-- Brand New Music 소속 그룹
-- ============================================================================

INSERT INTO kcl_groups (company_id, name_ko, name_en, slug, debut_date, member_count, group_type, is_active)
SELECT 
  c.id,
  g.name_ko,
  g.name_en,
  g.slug,
  g.debut_date::DATE,
  g.member_count,
  g.group_type,
  g.is_active
FROM kcl_companies c
CROSS JOIN (VALUES
  ('에이비식스', 'AB6IX', 'ab6ix', '2019-05-22', 4, 'boy', true),
  ('BDC', 'BDC', 'bdc', '2019-10-29', 3, 'boy', true)
) AS g(name_ko, name_en, slug, debut_date, member_count, group_type, is_active)
WHERE c.slug = 'brandnew-music'
ON CONFLICT (slug) DO UPDATE SET
  name_ko = EXCLUDED.name_ko,
  name_en = EXCLUDED.name_en,
  debut_date = EXCLUDED.debut_date,
  member_count = EXCLUDED.member_count,
  group_type = EXCLUDED.group_type,
  is_active = EXCLUDED.is_active,
  updated_at = NOW();

-- ============================================================================
-- Fantagio 소속 그룹
-- ============================================================================

INSERT INTO kcl_groups (company_id, name_ko, name_en, slug, debut_date, member_count, group_type, is_active)
SELECT 
  c.id,
  g.name_ko,
  g.name_en,
  g.slug,
  g.debut_date::DATE,
  g.member_count,
  g.group_type,
  g.is_active
FROM kcl_companies c
CROSS JOIN (VALUES
  ('아스트로', 'ASTRO', 'astro', '2016-02-23', 6, 'boy', true),
  ('위키미키', 'Weki Meki', 'weki-meki', '2017-08-08', 8, 'girl', true)
) AS g(name_ko, name_en, slug, debut_date, member_count, group_type, is_active)
WHERE c.slug = 'fantagio'
ON CONFLICT (slug) DO UPDATE SET
  name_ko = EXCLUDED.name_ko,
  name_en = EXCLUDED.name_en,
  debut_date = EXCLUDED.debut_date,
  member_count = EXCLUDED.member_count,
  group_type = EXCLUDED.group_type,
  is_active = EXCLUDED.is_active,
  updated_at = NOW();

-- ============================================================================
-- High Up Entertainment 소속 그룹
-- ============================================================================

INSERT INTO kcl_groups (company_id, name_ko, name_en, slug, debut_date, member_count, group_type, is_active)
SELECT 
  c.id,
  g.name_ko,
  g.name_en,
  g.slug,
  g.debut_date::DATE,
  g.member_count,
  g.group_type,
  g.is_active
FROM kcl_companies c
CROSS JOIN (VALUES
  ('스테이씨', 'STAYC', 'stayc', '2020-11-12', 6, 'girl', true)
) AS g(name_ko, name_en, slug, debut_date, member_count, group_type, is_active)
WHERE c.slug = 'highup-entertainment'
ON CONFLICT (slug) DO UPDATE SET
  name_ko = EXCLUDED.name_ko,
  name_en = EXCLUDED.name_en,
  debut_date = EXCLUDED.debut_date,
  member_count = EXCLUDED.member_count,
  group_type = EXCLUDED.group_type,
  is_active = EXCLUDED.is_active,
  updated_at = NOW();

-- ============================================================================
-- P Nation 소속 그룹
-- ============================================================================

INSERT INTO kcl_groups (company_id, name_ko, name_en, slug, debut_date, member_count, group_type, is_active)
SELECT 
  c.id,
  g.name_ko,
  g.name_en,
  g.slug,
  g.debut_date::DATE,
  g.member_count,
  g.group_type,
  g.is_active
FROM kcl_companies c
CROSS JOIN (VALUES
  ('티엔엑스', 'TNX', 'tnx', '2022-05-17', 5, 'boy', true),
  ('싸이', 'PSY', 'psy', '2001-01-17', 1, 'solo', true),
  ('제시', 'Jessi', 'jessi', '2005-07-27', 1, 'solo', true),
  ('현아', 'HyunA', 'hyuna', '2010-06-01', 1, 'solo', true)
) AS g(name_ko, name_en, slug, debut_date, member_count, group_type, is_active)
WHERE c.slug = 'p-nation'
ON CONFLICT (slug) DO UPDATE SET
  name_ko = EXCLUDED.name_ko,
  name_en = EXCLUDED.name_en,
  debut_date = EXCLUDED.debut_date,
  member_count = EXCLUDED.member_count,
  group_type = EXCLUDED.group_type,
  is_active = EXCLUDED.is_active,
  updated_at = NOW();

-- ============================================================================
-- AOMG 소속 아티스트
-- ============================================================================

INSERT INTO kcl_groups (company_id, name_ko, name_en, slug, debut_date, member_count, group_type, is_active)
SELECT 
  c.id,
  g.name_ko,
  g.name_en,
  g.slug,
  g.debut_date::DATE,
  g.member_count,
  g.group_type,
  g.is_active
FROM kcl_companies c
CROSS JOIN (VALUES
  ('박재범', 'Jay Park', 'jay-park', '2011-02-08', 1, 'solo', true),
  ('그레이', 'GRAY', 'gray', '2013-04-01', 1, 'solo', true),
  ('사이먼 도미닉', 'Simon Dominic', 'simon-dominic', '2011-06-01', 1, 'solo', true),
  ('로꼬', 'Loco', 'loco', '2012-02-01', 1, 'solo', true)
) AS g(name_ko, name_en, slug, debut_date, member_count, group_type, is_active)
WHERE c.slug = 'aomg'
ON CONFLICT (slug) DO UPDATE SET
  name_ko = EXCLUDED.name_ko,
  name_en = EXCLUDED.name_en,
  debut_date = EXCLUDED.debut_date,
  member_count = EXCLUDED.member_count,
  group_type = EXCLUDED.group_type,
  is_active = EXCLUDED.is_active,
  updated_at = NOW();

-- ============================================================================
-- BELIFT LAB (빌리프랩) 소속 그룹
-- ============================================================================

INSERT INTO kcl_groups (company_id, name_ko, name_en, slug, debut_date, member_count, group_type, is_active)
SELECT 
  c.id,
  g.name_ko,
  g.name_en,
  g.slug,
  g.debut_date::DATE,
  g.member_count,
  g.group_type,
  g.is_active
FROM kcl_companies c
CROSS JOIN (VALUES
  ('엔하이픈', 'ENHYPEN', 'enhypen-belift', '2020-11-30', 7, 'boy', true)
) AS g(name_ko, name_en, slug, debut_date, member_count, group_type, is_active)
WHERE c.slug = 'belift-lab'
ON CONFLICT (slug) DO UPDATE SET
  name_ko = EXCLUDED.name_ko,
  name_en = EXCLUDED.name_en,
  debut_date = EXCLUDED.debut_date,
  member_count = EXCLUDED.member_count,
  group_type = EXCLUDED.group_type,
  is_active = EXCLUDED.is_active,
  updated_at = NOW();

-- ============================================================================
-- ADOR (어도어) 소속 그룹
-- ============================================================================

INSERT INTO kcl_groups (company_id, name_ko, name_en, slug, debut_date, member_count, group_type, is_active)
SELECT 
  c.id,
  g.name_ko,
  g.name_en,
  g.slug,
  g.debut_date::DATE,
  g.member_count,
  g.group_type,
  g.is_active
FROM kcl_companies c
CROSS JOIN (VALUES
  ('뉴진스', 'NewJeans', 'newjeans-ador', '2022-07-22', 5, 'girl', true)
) AS g(name_ko, name_en, slug, debut_date, member_count, group_type, is_active)
WHERE c.slug = 'ador'
ON CONFLICT (slug) DO UPDATE SET
  name_ko = EXCLUDED.name_ko,
  name_en = EXCLUDED.name_en,
  debut_date = EXCLUDED.debut_date,
  member_count = EXCLUDED.member_count,
  group_type = EXCLUDED.group_type,
  is_active = EXCLUDED.is_active,
  updated_at = NOW();

-- ============================================================================
-- Source Music (소스뮤직) 소속 그룹
-- ============================================================================

INSERT INTO kcl_groups (company_id, name_ko, name_en, slug, debut_date, member_count, group_type, is_active)
SELECT 
  c.id,
  g.name_ko,
  g.name_en,
  g.slug,
  g.debut_date::DATE,
  g.member_count,
  g.group_type,
  g.is_active
FROM kcl_companies c
CROSS JOIN (VALUES
  ('르세라핌', 'LE SSERAFIM', 'le-sserafim-source', '2022-05-02', 5, 'girl', true),
  ('여자친구', 'GFRIEND', 'gfriend', '2015-01-15', 6, 'girl', false)
) AS g(name_ko, name_en, slug, debut_date, member_count, group_type, is_active)
WHERE c.slug = 'source-music'
ON CONFLICT (slug) DO UPDATE SET
  name_ko = EXCLUDED.name_ko,
  name_en = EXCLUDED.name_en,
  debut_date = EXCLUDED.debut_date,
  member_count = EXCLUDED.member_count,
  group_type = EXCLUDED.group_type,
  is_active = EXCLUDED.is_active,
  updated_at = NOW();

-- ============================================================================
-- Mystic Story 소속 그룹
-- ============================================================================

INSERT INTO kcl_groups (company_id, name_ko, name_en, slug, debut_date, member_count, group_type, is_active)
SELECT 
  c.id,
  g.name_ko,
  g.name_en,
  g.slug,
  g.debut_date::DATE,
  g.member_count,
  g.group_type,
  g.is_active
FROM kcl_companies c
CROSS JOIN (VALUES
  ('빌리', 'Billlie', 'billlie', '2021-11-10', 7, 'girl', true),
  ('루시', 'LUCY', 'lucy', '2020-05-07', 4, 'boy', true)
) AS g(name_ko, name_en, slug, debut_date, member_count, group_type, is_active)
WHERE c.slug = 'mystic-story'
ON CONFLICT (slug) DO UPDATE SET
  name_ko = EXCLUDED.name_ko,
  name_en = EXCLUDED.name_en,
  debut_date = EXCLUDED.debut_date,
  member_count = EXCLUDED.member_count,
  group_type = EXCLUDED.group_type,
  is_active = EXCLUDED.is_active,
  updated_at = NOW();

-- ============================================================================
-- ATTRAKT 소속 그룹
-- ============================================================================

INSERT INTO kcl_groups (company_id, name_ko, name_en, slug, debut_date, member_count, group_type, is_active)
SELECT 
  c.id,
  g.name_ko,
  g.name_en,
  g.slug,
  g.debut_date::DATE,
  g.member_count,
  g.group_type,
  g.is_active
FROM kcl_companies c
CROSS JOIN (VALUES
  ('피프티피프티', 'FIFTY FIFTY', 'fifty-fifty', '2022-11-18', 4, 'girl', true)
) AS g(name_ko, name_en, slug, debut_date, member_count, group_type, is_active)
WHERE c.slug = 'attrakt'
ON CONFLICT (slug) DO UPDATE SET
  name_ko = EXCLUDED.name_ko,
  name_en = EXCLUDED.name_en,
  debut_date = EXCLUDED.debut_date,
  member_count = EXCLUDED.member_count,
  group_type = EXCLUDED.group_type,
  is_active = EXCLUDED.is_active,
  updated_at = NOW();

-- ============================================================================
-- 완료 메시지
-- ============================================================================

DO $$
DECLARE
  group_count INTEGER;
  company_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO group_count FROM kcl_groups;
  SELECT COUNT(*) INTO company_count FROM kcl_companies;
  
  RAISE NOTICE '========================================';
  RAISE NOTICE 'KCL Seed Migration 003 완료!';
  RAISE NOTICE '========================================';
  RAISE NOTICE '시딩된 소속사 수: %', company_count;
  RAISE NOTICE '시딩된 아티스트(그룹) 수: %', group_count;
  RAISE NOTICE '';
  RAISE NOTICE '다음 단계:';
  RAISE NOTICE '  1. Frontend API 연동 테스트';
  RAISE NOTICE '  2. 투표 기능 테스트';
  RAISE NOTICE '========================================';
END $$;
