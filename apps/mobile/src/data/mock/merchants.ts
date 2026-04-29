import type { MerchantWithMocks, WeeklyHours } from "../types";

import { MOCK_CATEGORIES } from "./categories";
import {
  ACTIVITIES_PHOTOS,
  DINING_PHOTOS,
  PET_CARE_PHOTOS,
  WELLNESS_PHOTOS,
} from "./images";

const cat = (slug: string) => {
  const c = MOCK_CATEGORIES.find((x) => x.slug === slug);
  if (!c) throw new Error(`Mock category missing: ${slug}`);
  return c.id;
};

const now = "2026-03-01T00:00:00.000Z";

const baseHours = (open: string, close: string): WeeklyHours => ({
  mon: `${open} – ${close}`,
  tue: `${open} – ${close}`,
  wed: `${open} – ${close}`,
  thu: `${open} – ${close}`,
  fri: `${open} – 1:00 AM`,
  sat: `${open} – 1:00 AM`,
  sun: `${open} – ${close}`,
});

const closedSundays = (open: string, close: string): WeeklyHours => ({
  ...baseHours(open, close),
  sun: "Closed",
});

const merchant = (
  partial: Pick<
    MerchantWithMocks,
    | "id"
    | "name"
    | "slug"
    | "category_id"
    | "neighbourhood"
    | "address_line_1"
    | "city"
    | "province"
    | "latitude"
    | "longitude"
    | "rating"
    | "service_type"
    | "hours"
    | "photos"
    | "employee_quote"
  > & { description: string; phone?: string; is_founding?: boolean },
): MerchantWithMocks => ({
  id: partial.id,
  name: partial.name,
  slug: partial.slug,
  description: partial.description,
  category_id: partial.category_id,
  owner_user_id: "00000000-0000-0000-0000-000000000merchant",
  neighbourhood: partial.neighbourhood,
  address_line_1: partial.address_line_1,
  address_line_2: null,
  city: partial.city,
  province: partial.province,
  postal_code: null,
  country: "CA",
  latitude: partial.latitude,
  longitude: partial.longitude,
  phone: partial.phone ?? null,
  website_url: null,
  instagram_handle: null,
  logo_url: null,
  cover_image_url: partial.photos[0] ?? null,
  status: "active",
  is_founding: partial.is_founding ?? false,
  founding_cohort: partial.is_founding ? 1 : null,
  onboarding_fee_waived: false,
  onboarding_fee_paid: true,
  renewal_date: null,
  created_at: now,
  updated_at: now,
  rating: partial.rating,
  service_type: partial.service_type,
  hours: partial.hours,
  photos: partial.photos,
  employee_quote: partial.employee_quote,
});

export const MOCK_MERCHANTS: MerchantWithMocks[] = [
  // ── Dining ──────────────────────────────────────────────────────
  merchant({
    id: "22222222-2222-2222-2222-2222222222d1",
    name: "Bar Bodega",
    slug: "bar-bodega",
    description:
      "Neighbourhood Italian wine bar with handmade pasta and a tight, low-intervention list.",
    category_id: cat("dining"),
    neighbourhood: "Ossington",
    address_line_1: "98 Ossington Ave",
    city: "Toronto",
    province: "ON",
    latitude: 43.6480,
    longitude: -79.4205,
    rating: 4.7,
    service_type: "Italian wine bar",
    hours: baseHours("5:00 PM", "11:00 PM"),
    photos: DINING_PHOTOS.bar_bodega,
    employee_quote: "Come hungry, leave loose. We pour what we'd drink.",
    is_founding: true,
  }),
  merchant({
    id: "22222222-2222-2222-2222-2222222222d2",
    name: "Maison Selby",
    slug: "maison-selby",
    description:
      "Storied Bloor brasserie inside a Victorian mansion — French classics, Toronto pace.",
    category_id: cat("dining"),
    neighbourhood: "Bloor-Yorkville",
    address_line_1: "592 Sherbourne St",
    city: "Toronto",
    province: "ON",
    latitude: 43.6708,
    longitude: -79.3789,
    rating: 4.6,
    service_type: "French brasserie",
    hours: baseHours("5:30 PM", "11:00 PM"),
    photos: DINING_PHOTOS.maison_selby,
    employee_quote: "We treat every table like it's their first time and their hundredth.",
  }),
  merchant({
    id: "22222222-2222-2222-2222-2222222222d3",
    name: "Le Sélect Bistro",
    slug: "le-select-bistro",
    description:
      "Queen West institution. Steak frites, oysters, a basket of bread on a string.",
    category_id: cat("dining"),
    neighbourhood: "Queen West",
    address_line_1: "432 Wellington St W",
    city: "Toronto",
    province: "ON",
    latitude: 43.6440,
    longitude: -79.3964,
    rating: 4.5,
    service_type: "French bistro",
    hours: baseHours("12:00 PM", "11:00 PM"),
    photos: DINING_PHOTOS.le_select,
    employee_quote: "If it ain't broke. We've been doing this since '77.",
  }),

  // ── Wellness ───────────────────────────────────────────────────
  merchant({
    id: "22222222-2222-2222-2222-2222222222w1",
    name: "Pulse Recovery",
    slug: "pulse-recovery",
    description:
      "Drop-in recovery studio. Cold plunge, infrared sauna, pneumatic compression.",
    category_id: cat("wellness"),
    neighbourhood: "King West",
    address_line_1: "642 King St W",
    city: "Toronto",
    province: "ON",
    latitude: 43.6443,
    longitude: -79.4078,
    rating: 4.8,
    service_type: "Recovery studio",
    hours: baseHours("6:00 AM", "10:00 PM"),
    photos: WELLNESS_PHOTOS.pulse_recovery,
    employee_quote: "Sixty minutes here is worth a full rest day. We promise.",
    is_founding: true,
  }),
  merchant({
    id: "22222222-2222-2222-2222-2222222222w2",
    name: "Othership",
    slug: "othership",
    description:
      "Guided breathwork, ice bath, sauna. Group sessions designed like a soundtrack.",
    category_id: cat("wellness"),
    neighbourhood: "Adelaide",
    address_line_1: "364 Adelaide St W",
    city: "Toronto",
    province: "ON",
    latitude: 43.6470,
    longitude: -79.3922,
    rating: 4.9,
    service_type: "Sauna & ice bath",
    hours: baseHours("7:00 AM", "10:00 PM"),
    photos: WELLNESS_PHOTOS.othership,
    employee_quote: "You don't think your way out. You breathe.",
  }),
  merchant({
    id: "22222222-2222-2222-2222-2222222222w3",
    name: "Hammam Spa",
    slug: "hammam-spa",
    description:
      "Moroccan-inspired urban hammam. Steam, scrub, soak, repeat.",
    category_id: cat("wellness"),
    neighbourhood: "Front",
    address_line_1: "602 King St W",
    city: "Toronto",
    province: "ON",
    latitude: 43.6442,
    longitude: -79.4040,
    rating: 4.6,
    service_type: "Hammam & spa",
    hours: closedSundays("10:00 AM", "9:00 PM"),
    photos: WELLNESS_PHOTOS.hammam_spa,
    employee_quote: "Take the long version. Trust us.",
  }),

  // ── Pet Care ───────────────────────────────────────────────────
  merchant({
    id: "22222222-2222-2222-2222-2222222222p1",
    name: "Tailwaggers",
    slug: "tailwaggers",
    description:
      "Daycare, grooming, and overnight boarding. Real backyard, real staff who know names.",
    category_id: cat("pet_care"),
    neighbourhood: "Roncesvalles",
    address_line_1: "276 Roncesvalles Ave",
    city: "Toronto",
    province: "ON",
    latitude: 43.6475,
    longitude: -79.4490,
    rating: 4.8,
    service_type: "Daycare & grooming",
    hours: baseHours("7:00 AM", "7:00 PM"),
    photos: PET_CARE_PHOTOS.tailwaggers,
    employee_quote: "Drop-off looks like a school reunion every morning.",
  }),
  merchant({
    id: "22222222-2222-2222-2222-2222222222p2",
    name: "Bone & Biscuit",
    slug: "bone-and-biscuit",
    description:
      "Independent pet supply with raw food specialists and biscuits baked in-store.",
    category_id: cat("pet_care"),
    neighbourhood: "Leslieville",
    address_line_1: "1071 Queen St E",
    city: "Toronto",
    province: "ON",
    latitude: 43.6614,
    longitude: -79.3422,
    rating: 4.7,
    service_type: "Pet supply",
    hours: baseHours("9:00 AM", "8:00 PM"),
    photos: PET_CARE_PHOTOS.bone_biscuit,
    employee_quote: "We won't sell what we wouldn't feed our own dog.",
  }),

  // ── Activities ─────────────────────────────────────────────────
  merchant({
    id: "22222222-2222-2222-2222-2222222222a1",
    name: "Midtown Social Club",
    slug: "midtown-social-club",
    description:
      "Bocce, shuffleboard, and a long bar. Drop in or book a lane for the table.",
    category_id: cat("activities"),
    neighbourhood: "Yonge-Eglinton",
    address_line_1: "2479 Yonge St",
    city: "Toronto",
    province: "ON",
    latitude: 43.7088,
    longitude: -79.3984,
    rating: 4.4,
    service_type: "Social games & bar",
    hours: baseHours("4:00 PM", "12:00 AM"),
    photos: ACTIVITIES_PHOTOS.midtown_social,
    employee_quote: "Whoever says it's not a sport hasn't lost a bocce match here.",
    is_founding: true,
  }),
  merchant({
    id: "22222222-2222-2222-2222-2222222222a2",
    name: "The Rec Room",
    slug: "the-rec-room",
    description:
      "Arcade, axe-throwing, virtual reality, live entertainment. The biggest backyard on the lake.",
    category_id: cat("activities"),
    neighbourhood: "Roundhouse",
    address_line_1: "255 Bremner Blvd",
    city: "Toronto",
    province: "ON",
    latitude: 43.6420,
    longitude: -79.3852,
    rating: 4.3,
    service_type: "Entertainment complex",
    hours: baseHours("11:00 AM", "12:00 AM"),
    photos: ACTIVITIES_PHOTOS.rec_room,
    employee_quote: "It's a sandbox. Bring a crew, we handle the rest.",
  }),
];

/** Map of merchant id → merchant for fast lookups. */
export const MOCK_MERCHANTS_BY_ID: Record<string, MerchantWithMocks> =
  Object.fromEntries(MOCK_MERCHANTS.map((m) => [m.id, m]));

export const TORONTO_CENTER = {
  latitude: 43.6532,
  longitude: -79.3832,
  latitudeDelta: 0.06,
  longitudeDelta: 0.04,
};
