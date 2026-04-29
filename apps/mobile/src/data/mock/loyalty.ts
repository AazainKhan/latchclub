import type { LoyaltyProgress, LoyaltyTier } from "../types";

/** Locked thresholds. Tier is derived from points_balance at read time. */
export const LOYALTY_THRESHOLDS: Record<LoyaltyTier, number> = {
  Bronze: 0,
  Silver: 250,
  Gold: 750,
  Platinum: 2000,
};

export const LOYALTY_TIER_ORDER: LoyaltyTier[] = [
  "Bronze",
  "Silver",
  "Gold",
  "Platinum",
];

export const LOYALTY_PERKS: Record<LoyaltyTier, string[]> = {
  Bronze: ["Standard offers", "Basic referral rewards"],
  Silver: ["+5% bonus points", "Early access to new merchants"],
  Gold: ["+10% bonus points", "Priority support", "Exclusive Gold offers"],
  Platinum: [
    "+20% bonus points",
    "Concierge requests",
    "Platinum-only experiences",
    "Member-only events",
  ],
};

export function tierForPoints(points: number): LoyaltyTier {
  let tier: LoyaltyTier = "Bronze";
  for (const t of LOYALTY_TIER_ORDER) {
    if (points >= LOYALTY_THRESHOLDS[t]) tier = t;
  }
  return tier;
}

export function loyaltyProgress(points: number): LoyaltyProgress {
  const current = tierForPoints(points);
  const idx = LOYALTY_TIER_ORDER.indexOf(current);
  const nextTier = LOYALTY_TIER_ORDER[idx + 1] ?? null;
  const next = nextTier
    ? {
        tier: nextTier,
        threshold: LOYALTY_THRESHOLDS[nextTier],
        remaining: LOYALTY_THRESHOLDS[nextTier] - points,
      }
    : null;
  return {
    tier: current,
    points,
    next,
    perks: LOYALTY_PERKS[current],
  };
}
