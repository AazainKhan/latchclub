-- =========================================================
-- LatchClub / row level security
-- =========================================================

create or replace function public.is_admin()
returns boolean
language sql
stable
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
as $$
  select exists (
    select 1
    from public.merchant_members mm
    where mm.merchant_id = _merchant_id
      and mm.user_id = auth.uid()
      and mm.role in ('owner', 'manager')
  );
$$;

alter table public.users enable row level security;
alter table public.categories enable row level security;
alter table public.merchants enable row level security;
alter table public.merchant_members enable row level security;
alter table public.subscriptions enable row level security;
alter table public.offers enable row level security;
alter table public.redemptions enable row level security;
alter table public.loyalty_events enable row level security;
alter table public.saved_merchants enable row level security;
alter table public.audit_log enable row level security;

-- users
create policy "users_select_own"
on public.users
for select
to authenticated
using (id = auth.uid());

create policy "users_update_own"
on public.users
for update
to authenticated
using (id = auth.uid())
with check (id = auth.uid());

create policy "users_admin_all"
on public.users
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

-- categories
create policy "categories_select_active"
on public.categories
for select
to authenticated
using (is_active = true or public.is_admin());

create policy "categories_admin_all"
on public.categories
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

-- merchants
create policy "merchants_select_active"
on public.merchants
for select
to authenticated
using (
  status = 'active'
  or public.is_admin()
  or public.is_merchant_member(id)
);

create policy "merchants_admin_all"
on public.merchants
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "merchants_update_by_owner"
on public.merchants
for update
to authenticated
using (public.is_merchant_manager_or_owner(id))
with check (public.is_merchant_manager_or_owner(id));

-- merchant_members
create policy "merchant_members_select_visible"
on public.merchant_members
for select
to authenticated
using (
  user_id = auth.uid()
  or public.is_admin()
  or public.is_merchant_manager_or_owner(merchant_id)
);

create policy "merchant_members_insert_by_manager"
on public.merchant_members
for insert
to authenticated
with check (public.is_merchant_manager_or_owner(merchant_id));

create policy "merchant_members_accept_own_invite"
on public.merchant_members
for update
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

create policy "merchant_members_admin_all"
on public.merchant_members
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

-- subscriptions
create policy "subscriptions_select_own"
on public.subscriptions
for select
to authenticated
using (user_id = auth.uid() or public.is_admin());

create policy "subscriptions_admin_all"
on public.subscriptions
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

-- offers
create policy "offers_select_visible"
on public.offers
for select
to authenticated
using (
  public.is_admin()
  or public.is_merchant_member(merchant_id)
  or (
    is_active = true
    and exists (
      select 1
      from public.merchants m
      where m.id = merchant_id
        and m.status = 'active'
    )
  )
);

create policy "offers_admin_all"
on public.offers
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "offers_write_by_manager"
on public.offers
for insert
to authenticated
with check (public.is_merchant_manager_or_owner(merchant_id));

create policy "offers_update_by_manager"
on public.offers
for update
to authenticated
using (public.is_merchant_manager_or_owner(merchant_id))
with check (public.is_merchant_manager_or_owner(merchant_id));

-- redemptions
create policy "redemptions_select_visible"
on public.redemptions
for select
to authenticated
using (
  user_id = auth.uid()
  or public.is_admin()
  or public.is_merchant_member(merchant_id)
);

create policy "redemptions_admin_all"
on public.redemptions
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

-- loyalty_events
create policy "loyalty_select_own"
on public.loyalty_events
for select
to authenticated
using (user_id = auth.uid() or public.is_admin());

create policy "loyalty_admin_all"
on public.loyalty_events
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

-- saved_merchants
create policy "saved_merchants_select_own"
on public.saved_merchants
for select
to authenticated
using (user_id = auth.uid());

create policy "saved_merchants_insert_own"
on public.saved_merchants
for insert
to authenticated
with check (user_id = auth.uid());

create policy "saved_merchants_delete_own"
on public.saved_merchants
for delete
to authenticated
using (user_id = auth.uid());

-- audit_log
create policy "audit_log_admin_select"
on public.audit_log
for select
to authenticated
using (public.is_admin());

create policy "audit_log_admin_all"
on public.audit_log
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());