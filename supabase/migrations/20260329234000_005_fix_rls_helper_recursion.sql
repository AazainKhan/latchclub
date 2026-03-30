-- =========================================================
-- Fix recursive RLS helper functions
-- =========================================================
--
-- These helpers are called inside row-level security policies.
-- If they run as invoker and query tables that are also protected
-- by policies referring back to the same helpers, Postgres can
-- recurse until it hits `stack depth limit exceeded` (54001).
--
-- Mark them as SECURITY DEFINER so they execute with the privileges
-- of their owner and bypass RLS for the internal membership/role
-- checks they perform.

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
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
security definer
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
security definer
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
