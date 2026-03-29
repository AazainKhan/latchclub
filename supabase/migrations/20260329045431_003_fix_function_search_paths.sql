-- =========================================================
-- Fix mutable search_path security warnings on all functions
-- =========================================================

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
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
set search_path = ''
as $$
  select 10;
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
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

create or replace function public.is_admin()
returns boolean
language sql
stable
set search_path = ''
as $$
  select exists (
    select 1
    from public.users u
    where u.id = auth.uid()
      and u.role = 'admin'
  );
$$;

create or replace function public.is_merchant_member(_merchant_id uuid)
returns boolean
language sql
stable
set search_path = ''
as $$
  select exists (
    select 1
    from public.merchant_members mm
    where mm.merchant_id = _merchant_id
      and mm.user_id = auth.uid()
  );
$$;

create or replace function public.is_merchant_manager_or_owner(_merchant_id uuid)
returns boolean
language sql
stable
set search_path = ''
as $$
  select exists (
    select 1
    from public.merchant_members mm
    where mm.merchant_id = _merchant_id
      and mm.user_id = auth.uid()
      and mm.role in ('owner', 'manager')
  );
$$;

create or replace function public.handle_redemption_confirmed()
returns trigger
language plpgsql
security definer
set search_path = ''
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