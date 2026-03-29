insert into public.categories (slug, name, description, display_order, is_active)
values
  ('dining', 'Dining', 'Restaurants, cafes, bars', 1, true),
  ('wellness', 'Wellness', 'Health and self-care services', 2, true),
  ('leisure', 'Leisure', 'Activities and services', 3, true)
on conflict (slug) do update
set
  name = excluded.name,
  description = excluded.description,
  display_order = excluded.display_order,
  is_active = excluded.is_active;