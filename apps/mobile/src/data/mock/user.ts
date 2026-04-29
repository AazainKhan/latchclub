import type { MockProfile, RedemptionRecord } from "../types";

import { MOCK_MERCHANTS_BY_ID } from "./merchants";
import { MOCK_OFFERS_BY_ID } from "./offers";

const MOCK_USER_ID = "00000000-0000-0000-0000-000000000aaa";

export const MOCK_PROFILE: MockProfile = {
  id: MOCK_USER_ID,
  email: "aazain@latchclub.local",
  full_name: "Aazain",
  points_balance: 173,
  tier: "general",
  member_since: "2026-01-12T00:00:00.000Z",
  redemptions_count: 6,
};

const recordFor = (
  offerId: string,
  redeemedAt: string,
  pointsEarned: number,
): RedemptionRecord | null => {
  const offer = MOCK_OFFERS_BY_ID[offerId];
  if (!offer) return null;
  const merchant = MOCK_MERCHANTS_BY_ID[offer.merchant_id ?? ""];
  if (!merchant) return null;
  return {
    id: `redemption-${offerId.slice(0, 12)}-${redeemedAt}`,
    merchant_id: merchant.id,
    merchant_name: merchant.name,
    merchant_neighbourhood: merchant.neighbourhood ?? "",
    offer_id: offer.id,
    offer_title: offer.title,
    redeemed_at: redeemedAt,
    points_earned: pointsEarned,
  };
};

const offerOrFirst = (preferredId: string, merchantSlug: string): string => {
  if (MOCK_OFFERS_BY_ID[preferredId]) return preferredId;
  // fallback: first offer of merchant (defensive — keeps mocks resilient if seed IDs change)
  const merchant = Object.values(MOCK_MERCHANTS_BY_ID).find(
    (m) => m.slug === merchantSlug,
  );
  if (!merchant) return preferredId;
  // we know ids follow a pattern; just take any
  const merchantOffer = Object.values(MOCK_OFFERS_BY_ID).find(
    (o) => o.merchant_id === merchant.id,
  );
  return merchantOffer?.id ?? preferredId;
};

const seed: Array<{ slug: string; daysAgo: number; points: number }> = [
  { slug: "bar-bodega", daysAgo: 4, points: 24 },
  { slug: "pulse-recovery", daysAgo: 10, points: 35 },
  { slug: "le-select-bistro", daysAgo: 18, points: 22 },
  { slug: "othership", daysAgo: 25, points: 28 },
  { slug: "midtown-social-club", daysAgo: 38, points: 18 },
  { slug: "tailwaggers", daysAgo: 52, points: 46 },
];

const buildHistory = (): RedemptionRecord[] => {
  const items: RedemptionRecord[] = [];
  for (const s of seed) {
    const merchant = Object.values(MOCK_MERCHANTS_BY_ID).find(
      (m) => m.slug === s.slug,
    );
    if (!merchant) continue;
    const merchantOffers = Object.values(MOCK_OFFERS_BY_ID).filter(
      (o) => o.merchant_id === merchant.id && !o.premium_only,
    );
    const offer = merchantOffers[0];
    if (!offer) continue;
    const date = new Date();
    date.setDate(date.getDate() - s.daysAgo);
    const rec = recordFor(offer.id, date.toISOString(), s.points);
    if (rec) items.push(rec);
  }
  return items;
};

export const MOCK_REDEMPTION_HISTORY: RedemptionRecord[] = buildHistory();

// Keep imports referenced for tooling
void offerOrFirst;
