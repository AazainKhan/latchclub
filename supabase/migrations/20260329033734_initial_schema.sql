-- =========================================================
-- LatchClub / initial schema
-- =========================================================

create extension if not exists pgcrypto;

-- ---------------------------------------------------------
-- enums
-- ---------------------------------------------------------

do $$
begin
  if not exists (select 1 from pg_type where typname = 'app_user_role') then
    create type public.app_user_role as enum ('consumer', 'admin');
  end if;

  if not exists (select 1 from pg_type where typname = 'merchant_member_role') then
    create type public.merchant_member_role as enum ('owner', 'manager', 'staff');
  end if;

  if not exists (select 1 from pg_type where typname = 'merchant_status') then
    create type public.merchant_status as enum ('pending', 'active', 'suspended', 'churned');
  end if;

  if not exists (select 1 from pg_type where typname = 'subscription_tier') then
    create type public.subscription_tier as enum ('general', 'student_senior', 'premium');
  end if;

  if not exists (select 1 from pg_type where typname = 'subscription_status') then
    create type public.subscription_status as enum (
      'inactive',
      'trialing',
      'active',
      'past_due',
      'canceled'
    );
  end if;

  if not exists (select 1 from pg_type where typname = 'billing_source') then
    create type public.billing_source as enum ('apple', 'google', 'stripe');
  end if;

  if not exists (select 1 from pg_type where typname = 'offer_type') then
    create type public.offer_type as enum (
      'bogo_item',
      'free_item_with_purchase',
      'fixed_credit',
      'percentage_discount',
      'upgrade',
      'exclusive_access'
    );
  end if;

  if not exists (select 1 from pg_type where typname = 'redemption_status') then
    create type public.redemption_status as enum (
      'issued',
      'confirmed',
      'expired',
      'voided',
      'disputed'
    );
  end if;

  if not exists (select 1 from pg_type where typname = 'redemption_channel') then
    create type public.redemption_channel as enum ('dine_in', 'takeout', 'in_store');
  end if;

  if not exists (select 1 from pg_type where typname = 'loyalty_event_reason') then
    create type public.loyalty_event_reason as enum (
      'redemption_confirmed',
      'manual_adjustment',
      'coupon_unlock',
      'referral_bonus',
      'points_expired'
    );
  end if;
end $$;

-- ---------------------------------------------------------
-- utility fns
-- ---------------------------------------------------------

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.points_for_redemption()
returns integer
language sql
immutable
as $$
  select 10;
$$;

-- ---------------------------------------------------------
-- users
-- ---------------------------------------------------------

create table public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  avatar_url text,
  role public.app_user_role not null default 'consumer',
  points_balance integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_users_role on public.users(role);

create trigger trg_users_updated_at
before update on public.users
for each row
execute function public.set_updated_at();

-- auto-create public.users row on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.users (
    id,
    email,
    full_name,
    avatar_url
  )
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_user();

-- ---------------------------------------------------------
-- categories
-- ---------------------------------------------------------

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null unique,
  description text,
  display_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create index idx_categories_active_order
on public.categories(is_active, display_order);

-- ---------------------------------------------------------
-- merchants
-- ---------------------------------------------------------

create table public.merchants (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.categories(id),
  owner_user_id uuid not null references public.users(id),
  name text not null,
  slug text not null unique,
  description text,
  neighbourhood text not null,
  address_line_1 text not null,
  address_line_2 text,
  city text not null default 'Toronto',
  province text not null default 'ON',
  postal_code text,
  country text not null default 'CA',
  latitude double precision,
  longitude double precision,
  phone text,
  website_url text,
  instagram_handle text,
  logo_url text,
  cover_image_url text,
  status public.merchant_status not null default 'pending',
  is_founding boolean not null default false,
  founding_cohort integer,
  onboarding_fee_waived boolean not null default false,
  onboarding_fee_paid boolean not null default false,
  renewal_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint chk_merchants_founding_cohort
    check (
      (is_founding = false and founding_cohort is null)
      or
      (is_founding = true and founding_cohort is not null)
    )
);

create index idx_merchants_category_status
on public.merchants(category_id, status);

create index idx_merchants_neighbourhood_status
on public.merchants(neighbourhood, status);

create trigger trg_merchants_updated_at
before update on public.merchants
for each row
execute function public.set_updated_at();

-- ---------------------------------------------------------
-- merchant_members
-- ---------------------------------------------------------

create table public.merchant_members (
  id uuid primary key default gen_random_uuid(),
  merchant_id uuid not null references public.merchants(id) on delete cascade,
  user_id uuid not null references public.users(id) on delete cascade,
  role public.merchant_member_role not null,
  invited_by uuid references public.users(id),
  invited_at timestamptz not null default now(),
  accepted_at timestamptz,
  created_at timestamptz not null default now(),
  unique (merchant_id, user_id)
);

create index idx_merchant_members_user
on public.merchant_members(user_id);

create index idx_merchant_members_merchant
on public.merchant_members(merchant_id);

-- ---------------------------------------------------------
-- subscriptions
-- ---------------------------------------------------------

create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  tier public.subscription_tier not null,
  status public.subscription_status not null default 'inactive',
  billing_source public.billing_source not null,
  external_customer_id text,
  external_subscription_id text unique,
  current_period_start timestamptz,
  current_period_end timestamptz,
  trial_end timestamptz,
  cancel_at timestamptz,
  canceled_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index idx_subscriptions_one_active_per_user
on public.subscriptions(user_id)
where status in ('active', 'trialing', 'past_due');

create index idx_subscriptions_status
on public.subscriptions(status);

create index idx_subscriptions_billing_source
on public.subscriptions(billing_source);

create trigger trg_subscriptions_updated_at
before update on public.subscriptions
for each row
execute function public.set_updated_at();

-- ---------------------------------------------------------
-- offers
-- ---------------------------------------------------------

create table public.offers (
  id uuid primary key default gen_random_uuid(),
  merchant_id uuid not null references public.merchants(id) on delete cascade,
  title text not null,
  description text not null,
  offer_type public.offer_type not null,
  terms text,
  valid_days text[] not null default array['mon','tue','wed','thu','fri','sat','sun'],
  valid_from time,
  valid_until time,
  valid_channels public.redemption_channel[] not null
    default array['dine_in']::public.redemption_channel[],
  min_spend_cents integer not null default 0,
  max_discount_cents integer,
  min_party_size integer not null default 1,
  max_party_size integer,
  blackout_dates date[] not null default '{}',
  is_stackable boolean not null default false,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint chk_offers_min_spend_nonnegative
    check (min_spend_cents >= 0),
  constraint chk_offers_max_discount_nonnegative
    check (max_discount_cents is null or max_discount_cents >= 0),
  constraint chk_offers_min_party_size_positive
    check (min_party_size >= 1),
  constraint chk_offers_max_party_size_valid
    check (max_party_size is null or max_party_size >= min_party_size),
  constraint chk_offers_valid_days
    check (valid_days <@ array['mon','tue','wed','thu','fri','sat','sun']::text[])
);

create index idx_offers_merchant_active
on public.offers(merchant_id, is_active);

create trigger trg_offers_updated_at
before update on public.offers
for each row
execute function public.set_updated_at();

-- ---------------------------------------------------------
-- redemptions
-- one row per issued token
-- direct client insert is intentionally blocked by RLS.
-- creation should happen only via service-role server code / Edge Functions.
-- ---------------------------------------------------------

create table public.redemptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  merchant_id uuid not null references public.merchants(id) on delete restrict,
  offer_id uuid not null references public.offers(id) on delete restrict,
  token_hash text not null unique,
  status public.redemption_status not null default 'issued',
  issued_at timestamptz not null default now(),
  expires_at timestamptz not null,
  confirmed_at timestamptz,
  confirmed_by uuid references public.users(id),
  bill_amount_cents integer,
  channel public.redemption_channel not null default 'dine_in',
  party_size integer,
  dispute_reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint chk_redemptions_bill_amount_nonnegative
    check (bill_amount_cents is null or bill_amount_cents >= 0),
  constraint chk_redemptions_party_size_positive
    check (party_size is null or party_size >= 1)
);

create index idx_redemptions_user_merchant_status_time
on public.redemptions(user_id, merchant_id, status, issued_at desc);

create index idx_redemptions_merchant_status_time
on public.redemptions(merchant_id, status, issued_at desc);

create index idx_redemptions_offer
on public.redemptions(offer_id);

create index idx_redemptions_expiry
on public.redemptions(status, expires_at)
where status = 'issued';

create trigger trg_redemptions_updated_at
before update on public.redemptions
for each row
execute function public.set_updated_at();

-- ---------------------------------------------------------
-- loyalty_events
-- append-only ledger
-- ---------------------------------------------------------

create table public.loyalty_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  redemption_id uuid references public.redemptions(id) on delete set null,
  points_delta integer not null,
  reason public.loyalty_event_reason not null,
  description text,
  created_at timestamptz not null default now()
);

create index idx_loyalty_events_user_time
on public.loyalty_events(user_id, created_at desc);

-- ---------------------------------------------------------
-- saved_merchants
-- ---------------------------------------------------------

create table public.saved_merchants (
  user_id uuid not null references public.users(id) on delete cascade,
  merchant_id uuid not null references public.merchants(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, merchant_id)
);

create index idx_saved_merchants_merchant
on public.saved_merchants(merchant_id);

-- ---------------------------------------------------------
-- audit_log
-- append-only
-- ---------------------------------------------------------

create table public.audit_log (
  id uuid primary key default gen_random_uuid(),
  actor_user_id uuid references public.users(id) on delete set null,
  action text not null,
  target_type text not null,
  target_id uuid not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index idx_audit_log_target
on public.audit_log(target_type, target_id, created_at desc);

create index idx_audit_log_actor
on public.audit_log(actor_user_id, created_at desc);

-- ---------------------------------------------------------
-- trigger: award points when redemption becomes confirmed
-- ---------------------------------------------------------

create or replace function public.handle_redemption_confirmed()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_points integer := public.points_for_redemption();
begin
  if (
    (tg_op = 'insert' and new.status = 'confirmed')
    or
    (tg_op = 'update' and new.status = 'confirmed' and old.status is distinct from 'confirmed')
  ) then

    insert into public.loyalty_events (
      user_id,
      redemption_id,
      points_delta,
      reason,
      description
    )
    values (
      new.user_id,
      new.id,
      v_points,
      'redemption_confirmed',
      'Points earned for a confirmed redemption'
    );

    update public.users
    set points_balance = points_balance + v_points
    where id = new.user_id;

    insert into public.audit_log (
      actor_user_id,
      action,
      target_type,
      target_id,
      metadata
    )
    values (
      new.confirmed_by,
      'redemption.confirmed',
      'redemption',
      new.id,
      jsonb_build_object(
        'user_id', new.user_id,
        'merchant_id', new.merchant_id,
        'offer_id', new.offer_id,
        'bill_amount_cents', new.bill_amount_cents
      )
    );
  end if;

  return new;
end;
$$;

drop trigger if exists trg_handle_redemption_confirmed on public.redemptions;

create trigger trg_handle_redemption_confirmed
after insert or update on public.redemptions
for each row
execute function public.handle_redemption_confirmed();