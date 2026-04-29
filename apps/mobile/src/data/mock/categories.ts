import type { Category } from "../types";

/**
 * Mobile-specific category order. Schema currently has only dining/wellness/leisure;
 * the additions (pet_care, activities) ship in `006_mobile_redesign_fields`.
 *
 * Do NOT shadow @latchclub/utils CATEGORY_ORDER — that's the schema-canonical list.
 */
export const MOBILE_CATEGORY_ORDER = [
  "dining",
  "wellness",
  "pet_care",
  "activities",
] as const;

export type MobileCategorySlug = (typeof MOBILE_CATEGORY_ORDER)[number];

const now = new Date("2026-04-01T00:00:00.000Z").toISOString();

export const MOCK_CATEGORIES: Category[] = [
  {
    id: "11111111-1111-1111-1111-111111111101",
    slug: "dining",
    name: "Dining",
    description: "Restaurants, cafés, bars",
    display_order: 1,
    is_active: true,
    created_at: now,
  },
  {
    id: "11111111-1111-1111-1111-111111111102",
    slug: "wellness",
    name: "Wellness",
    description: "Recovery, spa, fitness",
    display_order: 2,
    is_active: true,
    created_at: now,
  },
  {
    id: "11111111-1111-1111-1111-111111111103",
    slug: "pet_care",
    name: "Pet Care",
    description: "Grooming, daycare, boarding",
    display_order: 3,
    is_active: true,
    created_at: now,
  },
  {
    id: "11111111-1111-1111-1111-111111111104",
    slug: "activities",
    name: "Activities",
    description: "Entertainment & nightlife",
    display_order: 4,
    is_active: true,
    created_at: now,
  },
];

export const CATEGORY_LABEL: Record<MobileCategorySlug, string> = {
  dining: "Dining",
  wellness: "Wellness",
  pet_care: "Pet Care",
  activities: "Activities",
};
