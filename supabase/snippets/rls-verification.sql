-- LatchClub RLS verification
-- Run after creating the three local auth users and applying dev-demo-data.sql.

-- ---------------------------------------------------------
-- Consumer checks
-- Expect:
-- - can read active categories
-- - can read active merchants
-- - can only read own saved merchants
-- ---------------------------------------------------------
select set_config('request.jwt.claim.role', 'authenticated', true);
select set_config(
  'request.jwt.claim.sub',
  (select id::text from public.users where email = 'consumer@latchclub.local'),
  true
);

select 'consumer_merchants' as check_name, count(*) as visible_count
from public.merchants;

select 'consumer_saved_merchants' as check_name, count(*) as visible_count
from public.saved_merchants;

-- ---------------------------------------------------------
-- Merchant checks
-- Expect:
-- - can read own merchant profile
-- - can read own merchant offers
-- - cannot read audit_log
-- ---------------------------------------------------------
select set_config(
  'request.jwt.claim.sub',
  (select id::text from public.users where email = 'merchant@latchclub.local'),
  true
);

select 'merchant_merchants' as check_name, count(*) as visible_count
from public.merchants;

select 'merchant_offers' as check_name, count(*) as visible_count
from public.offers;

select 'merchant_audit_log' as check_name, count(*) as visible_count
from public.audit_log;

-- ---------------------------------------------------------
-- Admin checks
-- Expect:
-- - can read everything required for admin pages
-- ---------------------------------------------------------
select set_config(
  'request.jwt.claim.sub',
  (select id::text from public.users where email = 'admin@latchclub.local'),
  true
);

select 'admin_categories' as check_name, count(*) as visible_count
from public.categories;

select 'admin_merchants' as check_name, count(*) as visible_count
from public.merchants;

select 'admin_offers' as check_name, count(*) as visible_count
from public.offers;

select 'admin_audit_log' as check_name, count(*) as visible_count
from public.audit_log;
