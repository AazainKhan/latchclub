-- =========================================================
-- Fix performance warnings
-- 1. auth_rls_initplan  — wrap auth.uid() in (select ...)
-- 2. multiple_permissive_policies — merge overlapping policies
-- 3. unindexed_foreign_keys — add 4 missing indexes
-- =========================================================

-- ---------------------------------------------------------
-- Drop all existing policies that will be replaced
-- ---------------------------------------------------------

-- users
drop policy if exists "users_select_own"     on public.users;
drop policy if exists "users_update_own"     on public.users;
drop policy if exists "users_admin_all"      on public.users;

-- categories
drop policy if exists "categories_select_active" on public.categories;
drop policy if exists "categories_admin_all"     on public.categories;

-- merchants
drop policy if exists "merchants_select_active"    on public.merchants;
drop policy if exists "merchants_update_by_owner"  on public.merchants;
drop policy if exists "merchants_admin_all"        on public.merchants;

-- merchant_members
drop policy if exists "merchant_members_select_visible"     on public.merchant_members;
drop policy if exists "merchant_members_insert_by_manager"  on public.merchant_members;
drop policy if exists "merchant_members_accept_own_invite"  on public.merchant_members;
drop policy if exists "merchant_members_admin_all"          on public.merchant_members;

-- subscriptions
drop policy if exists "subscriptions_select_own" on public.subscriptions;
drop policy if exists "subscriptions_admin_all"  on public.subscriptions;

-- offers
drop policy if exists "offers_select_visible"    on public.offers;
drop policy if exists "offers_write_by_manager"  on public.offers;
drop policy if exists "offers_update_by_manager" on public.offers;
drop policy if exists "offers_admin_all"         on public.offers;

-- redemptions
drop policy if exists "redemptions_select_visible" on public.redemptions;
drop policy if exists "redemptions_admin_all"      on public.redemptions;

-- loyalty_events
drop policy if exists "loyalty_select_own"  on public.loyalty_events;
drop policy if exists "loyalty_admin_all"   on public.loyalty_events;

-- saved_merchants
drop policy if exists "saved_merchants_select_own" on public.saved_merchants;
drop policy if exists "saved_merchants_insert_own" on public.saved_merchants;
drop policy if exists "saved_merchants_delete_own" on public.saved_merchants;

-- audit_log
drop policy if exists "audit_log_admin_select" on public.audit_log;
drop policy if exists "audit_log_admin_all"    on public.audit_log;

-- ---------------------------------------------------------
-- Recreate all policies
-- Fixes both auth_rls_initplan (select auth.uid())
-- and multiple_permissive_policies (merged into single policy per action)
-- ---------------------------------------------------------

-- users
create policy "users_select"
on public.users for select to authenticated
using (
  id = (select auth.uid())
  or public.is_admin()
);

create policy "users_update"
on public.users for update to authenticated
using (id = (select auth.uid()) or public.is_admin())
with check (id = (select auth.uid()) or public.is_admin());

create policy "users_admin_insert"
on public.users for insert to authenticated
with check (public.is_admin());

create policy "users_admin_delete"
on public.users for delete to authenticated
using (public.is_admin());

-- categories
create policy "categories_select"
on public.categories for select to authenticated
using (is_active = true or public.is_admin());

create policy "categories_admin_insert"
on public.categories for insert to authenticated
with check (public.is_admin());

create policy "categories_admin_update"
on public.categories for update to authenticated
using (public.is_admin()) with check (public.is_admin());

create policy "categories_admin_delete"
on public.categories for delete to authenticated
using (public.is_admin());

-- merchants
create policy "merchants_select"
on public.merchants for select to authenticated
using (
  status = 'active'
  or public.is_admin()
  or public.is_merchant_member(id)
);

create policy "merchants_update"
on public.merchants for update to authenticated
using (public.is_merchant_manager_or_owner(id) or public.is_admin())
with check (public.is_merchant_manager_or_owner(id) or public.is_admin());

create policy "merchants_admin_insert"
on public.merchants for insert to authenticated
with check (public.is_admin());

create policy "merchants_admin_delete"
on public.merchants for delete to authenticated
using (public.is_admin());

-- merchant_members
create policy "merchant_members_select"
on public.merchant_members for select to authenticated
using (
  user_id = (select auth.uid())
  or public.is_admin()
  or public.is_merchant_manager_or_owner(merchant_id)
);

create policy "merchant_members_insert"
on public.merchant_members for insert to authenticated
with check (
  public.is_merchant_manager_or_owner(merchant_id)
  or public.is_admin()
);

create policy "merchant_members_update"
on public.merchant_members for update to authenticated
using (
  user_id = (select auth.uid())
  or public.is_admin()
)
with check (
  user_id = (select auth.uid())
  or public.is_admin()
);

create policy "merchant_members_admin_delete"
on public.merchant_members for delete to authenticated
using (public.is_admin());

-- subscriptions
create policy "subscriptions_select"
on public.subscriptions for select to authenticated
using (
  user_id = (select auth.uid())
  or public.is_admin()
);

create policy "subscriptions_admin_insert"
on public.subscriptions for insert to authenticated
with check (public.is_admin());

create policy "subscriptions_admin_update"
on public.subscriptions for update to authenticated
using (public.is_admin()) with check (public.is_admin());

create policy "subscriptions_admin_delete"
on public.subscriptions for delete to authenticated
using (public.is_admin());

-- offers
create policy "offers_select"
on public.offers for select to authenticated
using (
  public.is_admin()
  or public.is_merchant_member(merchant_id)
  or (
    is_active = true
    and exists (
      select 1 from public.merchants m
      where m.id = merchant_id
        and m.status = 'active'
    )
  )
);

create policy "offers_insert"
on public.offers for insert to authenticated
with check (
  public.is_merchant_manager_or_owner(merchant_id)
  or public.is_admin()
);

create policy "offers_update"
on public.offers for update to authenticated
using (
  public.is_merchant_manager_or_owner(merchant_id)
  or public.is_admin()
)
with check (
  public.is_merchant_manager_or_owner(merchant_id)
  or public.is_admin()
);

create policy "offers_admin_delete"
on public.offers for delete to authenticated
using (public.is_admin());

-- redemptions
create policy "redemptions_select"
on public.redemptions for select to authenticated
using (
  user_id = (select auth.uid())
  or public.is_admin()
  or public.is_merchant_member(merchant_id)
);

create policy "redemptions_admin_delete"
on public.redemptions for delete to authenticated
using (public.is_admin());

-- loyalty_events
create policy "loyalty_events_select"
on public.loyalty_events for select to authenticated
using (
  user_id = (select auth.uid())
  or public.is_admin()
);

create policy "loyalty_events_admin_delete"
on public.loyalty_events for delete to authenticated
using (public.is_admin());

-- saved_merchants
create policy "saved_merchants_select"
on public.saved_merchants for select to authenticated
using (user_id = (select auth.uid()));

create policy "saved_merchants_insert"
on public.saved_merchants for insert to authenticated
with check (user_id = (select auth.uid()));

create policy "saved_merchants_delete"
on public.saved_merchants for delete to authenticated
using (user_id = (select auth.uid()));

-- audit_log
create policy "audit_log_select"
on public.audit_log for select to authenticated
using (public.is_admin());

create policy "audit_log_admin_insert"
on public.audit_log for insert to authenticated
with check (public.is_admin());

create policy "audit_log_admin_delete"
on public.audit_log for delete to authenticated
using (public.is_admin());

-- ---------------------------------------------------------
-- Add 4 missing FK indexes (unindexed_foreign_keys)
-- ---------------------------------------------------------

create index idx_loyalty_events_redemption_id
  on public.loyalty_events(redemption_id);

create index idx_merchant_members_invited_by
  on public.merchant_members(invited_by);

create index idx_merchants_owner_user_id
  on public.merchants(owner_user_id);

create index idx_redemptions_confirmed_by
  on public.redemptions(confirmed_by);