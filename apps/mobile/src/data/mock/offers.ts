import type { OfferWithMocks } from "../types";

import {
  ACTIVITIES_PHOTOS,
  DINING_PHOTOS,
  PET_CARE_PHOTOS,
  WELLNESS_PHOTOS,
} from "./images";
import { MOCK_MERCHANTS } from "./merchants";

const now = "2026-03-01T00:00:00.000Z";

type OfferSeed = {
  title: string;
  description: string;
  terms: string;
  offer_type: OfferWithMocks["offer_type"];
  min_spend_cents?: number | null;
  max_discount_cents?: number | null;
  valid_days?: string[];
  premium_only?: boolean;
  redemption_kind?: "qr" | "code";
  image_url: string;
};

const offer = (
  merchantId: string,
  index: number,
  seed: OfferSeed,
): OfferWithMocks => ({
  id: `offer-${merchantId.slice(-3)}-${String(index).padStart(2, "0")}`,
  merchant_id: merchantId,
  title: seed.title,
  description: seed.description,
  offer_type: seed.offer_type,
  terms: seed.terms,
  valid_days: seed.valid_days ?? ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
  valid_from: "11:00:00",
  valid_until: "23:00:00",
  valid_channels: ["dine_in"],
  min_spend_cents: seed.min_spend_cents ?? 0,
  max_discount_cents: seed.max_discount_cents ?? null,
  min_party_size: 0,
  max_party_size: null,
  blackout_dates: [],
  is_stackable: false,
  is_active: true,
  created_at: now,
  updated_at: now,
  image_url: seed.image_url,
  premium_only: seed.premium_only ?? false,
  redemption_kind: seed.redemption_kind ?? "qr",
});

const offersFor = (merchantId: string, seeds: OfferSeed[]) =>
  seeds.map((s, i) => offer(merchantId, i + 1, s));

const m = (slug: string) => {
  const found = MOCK_MERCHANTS.find((x) => x.slug === slug);
  if (!found) throw new Error(`Mock merchant missing: ${slug}`);
  return found.id;
};

export const MOCK_OFFERS: OfferWithMocks[] = [
  // ── Bar Bodega ─────────────────────────────────────────────────
  ...offersFor(m("bar-bodega"), [
    {
      title: "Free pasta of the night",
      description: "Complimentary handmade pasta with any two mains.",
      terms: "Min. spend $60. Dine-in only. One per table.",
      offer_type: "free_item_with_purchase",
      min_spend_cents: 6000,
      max_discount_cents: 2400,
      valid_days: ["tue", "wed", "thu"],
      image_url: DINING_PHOTOS.bar_bodega[1] ?? "",
    },
    {
      title: "$25 off first bottle",
      description: "Take $25 off any bottle on the wine list.",
      terms: "First bottle only. Mon–Thu.",
      offer_type: "fixed_credit",
      max_discount_cents: 2500,
      valid_days: ["mon", "tue", "wed", "thu"],
      image_url: DINING_PHOTOS.bar_bodega[2] ?? "",
    },
    {
      title: "BOGO antipasti board",
      description: "Order one chef's antipasti board, get the second free.",
      terms: "Sun–Tue only. Dine-in.",
      offer_type: "bogo_item",
      max_discount_cents: 3200,
      valid_days: ["sun", "mon", "tue"],
      image_url: DINING_PHOTOS.bar_bodega[0] ?? "",
    },
    {
      title: "Chef's tasting upgrade",
      description: "Premium-only: complimentary upgrade to the seasonal tasting menu.",
      terms: "By reservation. Premium members only.",
      offer_type: "exclusive_access",
      max_discount_cents: 6000,
      premium_only: true,
      image_url: DINING_PHOTOS.bar_bodega[3] ?? "",
    },
  ]),

  // ── Maison Selby ───────────────────────────────────────────────
  ...offersFor(m("maison-selby"), [
    {
      title: "Complimentary dessert",
      description: "Profiteroles or crème brûlée on the house with two entrées.",
      terms: "Min. spend $80. One dessert per table.",
      offer_type: "free_item_with_purchase",
      min_spend_cents: 8000,
      max_discount_cents: 1600,
      image_url: DINING_PHOTOS.maison_selby[2] ?? "",
    },
    {
      title: "20% off bar tab",
      description: "Twenty percent off your full bar tab any night.",
      terms: "Bar seating only. Excludes wine list.",
      offer_type: "percentage_discount",
      max_discount_cents: 4000,
      image_url: DINING_PHOTOS.maison_selby[1] ?? "",
    },
    {
      title: "BOGO Sunday brunch entrée",
      description: "Buy one brunch entrée, get one free. Sundays only.",
      terms: "Dine-in. Sundays. Lower-priced free.",
      offer_type: "bogo_item",
      max_discount_cents: 2800,
      valid_days: ["sun"],
      image_url: DINING_PHOTOS.maison_selby[3] ?? "",
    },
    {
      title: "Premium chef's table",
      description: "Reserve the chef's counter for two. Five courses.",
      terms: "Premium only. 7-day notice.",
      offer_type: "exclusive_access",
      premium_only: true,
      image_url: DINING_PHOTOS.maison_selby[0] ?? "",
    },
  ]),

  // ── Le Sélect Bistro ───────────────────────────────────────────
  ...offersFor(m("le-select-bistro"), [
    {
      title: "$20 off steak frites for two",
      description: "Two classic steak frites — $20 off the bill.",
      terms: "Min. spend $90. Dine-in.",
      offer_type: "fixed_credit",
      min_spend_cents: 9000,
      max_discount_cents: 2000,
      image_url: DINING_PHOTOS.le_select[0] ?? "",
    },
    {
      title: "Half-price dozen oysters",
      description: "Get a dozen oysters at half price with any main.",
      terms: "Mon–Thu happy hour 4–6pm.",
      offer_type: "percentage_discount",
      max_discount_cents: 1800,
      valid_days: ["mon", "tue", "wed", "thu"],
      image_url: DINING_PHOTOS.le_select[1] ?? "",
    },
    {
      title: "Free apéro hour",
      description: "Complimentary apéritif for two before 6pm.",
      terms: "Dine-in. One per booking.",
      offer_type: "free_item_with_purchase",
      max_discount_cents: 2400,
      image_url: DINING_PHOTOS.le_select[2] ?? "",
    },
    {
      title: "Wine cellar tour & pour",
      description: "Premium-only: private tour with the sommelier and three pours.",
      terms: "Premium members. Sat afternoons.",
      offer_type: "exclusive_access",
      premium_only: true,
      valid_days: ["sat"],
      image_url: DINING_PHOTOS.le_select[3] ?? "",
    },
  ]),

  // ── Pulse Recovery ─────────────────────────────────────────────
  ...offersFor(m("pulse-recovery"), [
    {
      title: "$20 off recovery session",
      description: "Twenty dollars off any single recovery session.",
      terms: "First session of the week.",
      offer_type: "fixed_credit",
      max_discount_cents: 2000,
      image_url: WELLNESS_PHOTOS.pulse_recovery[0] ?? "",
    },
    {
      title: "BOGO sauna pass",
      description: "Buy one infrared sauna pass, get one free for a friend.",
      terms: "Same-day use. Mon–Wed.",
      offer_type: "bogo_item",
      max_discount_cents: 4500,
      valid_days: ["mon", "tue", "wed"],
      image_url: WELLNESS_PHOTOS.pulse_recovery[1] ?? "",
    },
    {
      title: "30% off contrast therapy",
      description: "Thirty percent off the cold plunge + sauna combo.",
      terms: "60-min minimum. Mon–Fri.",
      offer_type: "percentage_discount",
      max_discount_cents: 3500,
      valid_days: ["mon", "tue", "wed", "thu", "fri"],
      image_url: WELLNESS_PHOTOS.pulse_recovery[2] ?? "",
    },
    {
      title: "Premium recovery hour",
      description: "Premium-only: private 60-min suite with concierge service.",
      terms: "Premium members. Booking required.",
      offer_type: "exclusive_access",
      premium_only: true,
      image_url: WELLNESS_PHOTOS.pulse_recovery[3] ?? "",
    },
  ]),

  // ── Othership ──────────────────────────────────────────────────
  ...offersFor(m("othership"), [
    {
      title: "Free guest pass",
      description: "Bring a friend free to any group breathwork session.",
      terms: "One use per month. Booking required.",
      offer_type: "free_item_with_purchase",
      max_discount_cents: 4500,
      image_url: WELLNESS_PHOTOS.othership[0] ?? "",
    },
    {
      title: "$15 off any class",
      description: "Fifteen dollars off any drop-in session.",
      terms: "Mon–Thu only.",
      offer_type: "fixed_credit",
      max_discount_cents: 1500,
      valid_days: ["mon", "tue", "wed", "thu"],
      image_url: WELLNESS_PHOTOS.othership[1] ?? "",
    },
    {
      title: "BOGO ice bath",
      description: "Buy one ice bath session, get one free.",
      terms: "Same week, same person allowed.",
      offer_type: "bogo_item",
      max_discount_cents: 4000,
      image_url: WELLNESS_PHOTOS.othership[2] ?? "",
    },
    {
      title: "Premium private booking",
      description: "Premium-only: book a full sauna for your crew.",
      terms: "Up to 8 guests. Off-peak hours.",
      offer_type: "exclusive_access",
      premium_only: true,
      image_url: WELLNESS_PHOTOS.othership[3] ?? "",
    },
  ]),

  // ── Hammam Spa ─────────────────────────────────────────────────
  ...offersFor(m("hammam-spa"), [
    {
      title: "$30 off hammam ritual",
      description: "Thirty dollars off the signature steam-scrub-soak ritual.",
      terms: "First-time guests welcome. Booking required.",
      offer_type: "fixed_credit",
      max_discount_cents: 3000,
      image_url: WELLNESS_PHOTOS.hammam_spa[0] ?? "",
    },
    {
      title: "Couples upgrade",
      description: "Free upgrade to a couples treatment room.",
      terms: "Mon–Thu. Subject to availability.",
      offer_type: "upgrade",
      max_discount_cents: 4000,
      valid_days: ["mon", "tue", "wed", "thu"],
      image_url: WELLNESS_PHOTOS.hammam_spa[1] ?? "",
    },
    {
      title: "20% off massage add-on",
      description: "Twenty percent off any 30-min massage add-on.",
      terms: "With any ritual booking.",
      offer_type: "percentage_discount",
      max_discount_cents: 2400,
      image_url: WELLNESS_PHOTOS.hammam_spa[2] ?? "",
    },
    {
      title: "Premium signature day",
      description: "Premium-only: the full 4-hour signature day with lunch.",
      terms: "Premium members. Weekday booking only.",
      offer_type: "exclusive_access",
      premium_only: true,
      image_url: WELLNESS_PHOTOS.hammam_spa[3] ?? "",
    },
  ]),

  // ── Tailwaggers ────────────────────────────────────────────────
  ...offersFor(m("tailwaggers"), [
    {
      title: "Free first daycare day",
      description: "First day of daycare on us for new pups.",
      terms: "New clients only. Vaccination check required.",
      offer_type: "free_item_with_purchase",
      max_discount_cents: 4500,
      image_url: PET_CARE_PHOTOS.tailwaggers[0] ?? "",
      redemption_kind: "code",
    },
    {
      title: "$30 off full groom",
      description: "Thirty dollars off any full groom service.",
      terms: "Booking 7 days ahead.",
      offer_type: "fixed_credit",
      max_discount_cents: 3000,
      image_url: PET_CARE_PHOTOS.tailwaggers[1] ?? "",
    },
    {
      title: "BOGO daycare day",
      description: "Buy one daycare day, get one free.",
      terms: "Same dog, within 30 days.",
      offer_type: "bogo_item",
      max_discount_cents: 4500,
      image_url: PET_CARE_PHOTOS.tailwaggers[2] ?? "",
    },
    {
      title: "Premium overnight package",
      description: "Premium-only: discounted overnight boarding with photo updates.",
      terms: "Premium members. Includes daily walks.",
      offer_type: "exclusive_access",
      premium_only: true,
      image_url: PET_CARE_PHOTOS.tailwaggers[3] ?? "",
    },
  ]),

  // ── Bone & Biscuit ─────────────────────────────────────────────
  ...offersFor(m("bone-and-biscuit"), [
    {
      title: "15% off raw food",
      description: "Fifteen percent off any raw food brand.",
      terms: "In-store only.",
      offer_type: "percentage_discount",
      max_discount_cents: 2000,
      image_url: PET_CARE_PHOTOS.bone_biscuit[0] ?? "",
      redemption_kind: "code",
    },
    {
      title: "Free biscuit bag",
      description: "Take home a fresh-baked biscuit bag with any $50 purchase.",
      terms: "Min. spend $50. While supplies last.",
      offer_type: "free_item_with_purchase",
      min_spend_cents: 5000,
      max_discount_cents: 1200,
      image_url: PET_CARE_PHOTOS.bone_biscuit[1] ?? "",
    },
    {
      title: "$10 off first delivery",
      description: "Ten dollars off your first home delivery order.",
      terms: "First-time delivery customers.",
      offer_type: "fixed_credit",
      max_discount_cents: 1000,
      image_url: PET_CARE_PHOTOS.bone_biscuit[2] ?? "",
    },
    {
      title: "Premium nutrition consult",
      description: "Premium-only: 30-min consult with our raw nutrition specialist.",
      terms: "Premium members. By appointment.",
      offer_type: "exclusive_access",
      premium_only: true,
      image_url: PET_CARE_PHOTOS.bone_biscuit[3] ?? "",
    },
  ]),

  // ── Midtown Social Club ────────────────────────────────────────
  ...offersFor(m("midtown-social-club"), [
    {
      title: "Free bocce hour",
      description: "One free hour of bocce with any food order.",
      terms: "Mon–Thu. Subject to lane availability.",
      offer_type: "free_item_with_purchase",
      max_discount_cents: 3500,
      valid_days: ["mon", "tue", "wed", "thu"],
      image_url: ACTIVITIES_PHOTOS.midtown_social[0] ?? "",
    },
    {
      title: "BOGO shuffleboard",
      description: "Buy one hour of shuffleboard, get the second free.",
      terms: "Subject to lane availability.",
      offer_type: "bogo_item",
      max_discount_cents: 3500,
      image_url: ACTIVITIES_PHOTOS.midtown_social[1] ?? "",
    },
    {
      title: "$20 off group booking",
      description: "Twenty dollars off any 6+ person reservation.",
      terms: "Min. party 6. Pre-book required.",
      offer_type: "fixed_credit",
      max_discount_cents: 2000,
      image_url: ACTIVITIES_PHOTOS.midtown_social[2] ?? "",
    },
    {
      title: "Premium private lane",
      description: "Premium-only: reserve a full lane with a host for the night.",
      terms: "Premium members only.",
      offer_type: "exclusive_access",
      premium_only: true,
      image_url: ACTIVITIES_PHOTOS.midtown_social[3] ?? "",
    },
  ]),

  // ── The Rec Room ───────────────────────────────────────────────
  ...offersFor(m("the-rec-room"), [
    {
      title: "$25 game card",
      description: "Get a $25 game card free with any food order.",
      terms: "Min. spend $40 food. One per visit.",
      offer_type: "free_item_with_purchase",
      min_spend_cents: 4000,
      max_discount_cents: 2500,
      image_url: ACTIVITIES_PHOTOS.rec_room[0] ?? "",
    },
    {
      title: "BOGO axe-throwing lane",
      description: "Buy one axe-throwing lane, get one free.",
      terms: "Subject to availability. Pre-book.",
      offer_type: "bogo_item",
      max_discount_cents: 4500,
      image_url: ACTIVITIES_PHOTOS.rec_room[1] ?? "",
    },
    {
      title: "30% off VR experience",
      description: "Thirty percent off any 30-min VR experience.",
      terms: "Mon–Wed. One per person per visit.",
      offer_type: "percentage_discount",
      max_discount_cents: 1500,
      valid_days: ["mon", "tue", "wed"],
      image_url: ACTIVITIES_PHOTOS.rec_room[2] ?? "",
    },
    {
      title: "Premium reserved table",
      description: "Premium-only: reserved table with bottle service in The Three Brewers.",
      terms: "Premium members only. Bottle service min applies.",
      offer_type: "exclusive_access",
      premium_only: true,
      image_url: ACTIVITIES_PHOTOS.rec_room[3] ?? "",
    },
  ]),
];

export const MOCK_OFFERS_BY_MERCHANT: Record<string, OfferWithMocks[]> =
  MOCK_OFFERS.reduce<Record<string, OfferWithMocks[]>>((acc, off) => {
    if (!off.merchant_id) return acc;
    (acc[off.merchant_id] ??= []).push(off);
    return acc;
  }, {});

export const MOCK_OFFERS_BY_ID: Record<string, OfferWithMocks> =
  Object.fromEntries(MOCK_OFFERS.map((o) => [o.id, o]));
