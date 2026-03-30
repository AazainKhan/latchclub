-- LatchClub local demo data
-- Run this after creating the auth users below in Supabase Studio:
--   admin@latchclub.local
--   merchant@latchclub.local
--   consumer@latchclub.local

do $$
begin
  if not exists (
    select 1 from public.users where email = 'admin@latchclub.local'
  ) then
    raise exception 'Missing local auth user: admin@latchclub.local';
  end if;

  if not exists (
    select 1 from public.users where email = 'merchant@latchclub.local'
  ) then
    raise exception 'Missing local auth user: merchant@latchclub.local';
  end if;

  if not exists (
    select 1 from public.users where email = 'consumer@latchclub.local'
  ) then
    raise exception 'Missing local auth user: consumer@latchclub.local';
  end if;
end
$$;

update public.users
set role = 'admin'
where email = 'admin@latchclub.local';

with merchant_user as (
  select id
  from public.users
  where email = 'merchant@latchclub.local'
),
dining as (
  select id
  from public.categories
  where slug = 'dining'
),
wellness as (
  select id
  from public.categories
  where slug = 'wellness'
),
leisure as (
  select id
  from public.categories
  where slug = 'leisure'
)
insert into public.merchants (
  id,
  category_id,
  owner_user_id,
  name,
  slug,
  description,
  neighbourhood,
  address_line_1,
  city,
  province,
  country,
  status,
  is_founding,
  founding_cohort,
  onboarding_fee_waived
)
select
  '11111111-1111-1111-1111-111111111111',
  dining.id,
  merchant_user.id,
  'Bar Bodega',
  'bar-bodega-ossington',
  'Neighbourhood wine bar with strong weeknight foot traffic upside.',
  'Ossington',
  '137 Ossington Ave',
  'Toronto',
  'ON',
  'CA',
  'active',
  true,
  1,
  true
from merchant_user
cross join dining
on conflict (id) do update
set
  category_id = excluded.category_id,
  owner_user_id = excluded.owner_user_id,
  name = excluded.name,
  slug = excluded.slug,
  description = excluded.description,
  neighbourhood = excluded.neighbourhood,
  address_line_1 = excluded.address_line_1,
  city = excluded.city,
  province = excluded.province,
  country = excluded.country,
  status = excluded.status,
  is_founding = excluded.is_founding,
  founding_cohort = excluded.founding_cohort,
  onboarding_fee_waived = excluded.onboarding_fee_waived;

with merchant_user as (
  select id
  from public.users
  where email = 'merchant@latchclub.local'
),
wellness as (
  select id
  from public.categories
  where slug = 'wellness'
)
insert into public.merchants (
  id,
  category_id,
  owner_user_id,
  name,
  slug,
  description,
  neighbourhood,
  address_line_1,
  city,
  province,
  country,
  status,
  is_founding,
  founding_cohort,
  onboarding_fee_waived
)
select
  '22222222-2222-2222-2222-222222222222',
  wellness.id,
  merchant_user.id,
  'Pulse Recovery',
  'pulse-recovery-queen-west',
  'Modern recovery studio offering contrast therapy and physio-led sessions.',
  'Queen West',
  '785 Queen St W',
  'Toronto',
  'ON',
  'CA',
  'active',
  true,
  1,
  true
from merchant_user
cross join wellness
on conflict (id) do update
set
  category_id = excluded.category_id,
  owner_user_id = excluded.owner_user_id,
  name = excluded.name,
  slug = excluded.slug,
  description = excluded.description,
  neighbourhood = excluded.neighbourhood,
  address_line_1 = excluded.address_line_1,
  city = excluded.city,
  province = excluded.province,
  country = excluded.country,
  status = excluded.status,
  is_founding = excluded.is_founding,
  founding_cohort = excluded.founding_cohort,
  onboarding_fee_waived = excluded.onboarding_fee_waived;

with merchant_user as (
  select id
  from public.users
  where email = 'merchant@latchclub.local'
),
leisure as (
  select id
  from public.categories
  where slug = 'leisure'
)
insert into public.merchants (
  id,
  category_id,
  owner_user_id,
  name,
  slug,
  description,
  neighbourhood,
  address_line_1,
  city,
  province,
  country,
  status,
  is_founding,
  founding_cohort,
  onboarding_fee_waived
)
select
  '33333333-3333-3333-3333-333333333333',
  leisure.id,
  merchant_user.id,
  'Midtown Social Club',
  'midtown-social-club-yonge-eglinton',
  'Social gaming and lounge concept designed for groups and off-peak memberships.',
  'Yonge & Eglinton',
  '2516 Yonge St',
  'Toronto',
  'ON',
  'CA',
  'active',
  false,
  null,
  true
from merchant_user
cross join leisure
on conflict (id) do update
set
  category_id = excluded.category_id,
  owner_user_id = excluded.owner_user_id,
  name = excluded.name,
  slug = excluded.slug,
  description = excluded.description,
  neighbourhood = excluded.neighbourhood,
  address_line_1 = excluded.address_line_1,
  city = excluded.city,
  province = excluded.province,
  country = excluded.country,
  status = excluded.status,
  is_founding = excluded.is_founding,
  founding_cohort = excluded.founding_cohort,
  onboarding_fee_waived = excluded.onboarding_fee_waived;

insert into public.offers (
  id,
  merchant_id,
  title,
  description,
  offer_type,
  min_spend_cents,
  max_discount_cents,
  valid_days,
  is_active
)
values
  (
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    '11111111-1111-1111-1111-111111111111',
    'Complimentary shared plate',
    'Get a complimentary shared plate with any two mains ordered.',
    'free_item_with_purchase',
    4000,
    2200,
    array['mon', 'tue', 'wed', 'thu'],
    true
  ),
  (
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    '22222222-2222-2222-2222-222222222222',
    '$20 off recovery session',
    'Receive a $20 credit on a booked recovery session.',
    'fixed_credit',
    6000,
    2000,
    array['mon', 'tue', 'wed', 'thu', 'fri'],
    true
  ),
  (
    'cccccccc-cccc-cccc-cccc-cccccccccccc',
    '33333333-3333-3333-3333-333333333333',
    'BOGO lounge pass',
    'Bring a friend on the same booking and unlock a complimentary second pass.',
    'bogo_item',
    4500,
    4500,
    array['sun', 'mon', 'tue', 'wed'],
    true
  )
on conflict (id) do update
set
  merchant_id = excluded.merchant_id,
  title = excluded.title,
  description = excluded.description,
  offer_type = excluded.offer_type,
  min_spend_cents = excluded.min_spend_cents,
  max_discount_cents = excluded.max_discount_cents,
  valid_days = excluded.valid_days,
  is_active = excluded.is_active;

insert into public.merchant_members (
  merchant_id,
  user_id,
  role,
  accepted_at
)
select
  merchant_id,
  user_id,
  'owner',
  now()
from (
  select '11111111-1111-1111-1111-111111111111'::uuid as merchant_id, id as user_id
  from public.users
  where email = 'merchant@latchclub.local'

  union all

  select '22222222-2222-2222-2222-222222222222'::uuid as merchant_id, id as user_id
  from public.users
  where email = 'merchant@latchclub.local'

  union all

  select '33333333-3333-3333-3333-333333333333'::uuid as merchant_id, id as user_id
  from public.users
  where email = 'merchant@latchclub.local'
) seeded_members
on conflict (merchant_id, user_id) do update
set
  role = excluded.role,
  accepted_at = excluded.accepted_at;

insert into public.saved_merchants (user_id, merchant_id)
select id, '11111111-1111-1111-1111-111111111111'::uuid
from public.users
where email = 'consumer@latchclub.local'
on conflict (user_id, merchant_id) do nothing;

insert into public.saved_merchants (user_id, merchant_id)
select id, '22222222-2222-2222-2222-222222222222'::uuid
from public.users
where email = 'consumer@latchclub.local'
on conflict (user_id, merchant_id) do nothing;

insert into public.subscriptions (
  user_id,
  tier,
  status,
  billing_source,
  external_customer_id,
  external_subscription_id,
  current_period_start,
  current_period_end
)
select
  id,
  'general',
  'active',
  'stripe',
  'demo-customer-consumer',
  'demo-subscription-consumer',
  now() - interval '10 days',
  now() + interval '20 days'
from public.users
where email = 'consumer@latchclub.local'
on conflict (external_subscription_id) do update
set
  user_id = excluded.user_id,
  tier = excluded.tier,
  status = excluded.status,
  billing_source = excluded.billing_source,
  current_period_start = excluded.current_period_start,
  current_period_end = excluded.current_period_end;
