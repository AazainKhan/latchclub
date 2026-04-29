import type { SubscriptionTier } from "../data/types";

export type TierConfig = {
  label: string;
  priceLabel: string;
  description: string;
  /** Total coupons per merchant per year. */
  couponsPerMerchant: number;
  /** Of those, how many are premium-exclusive. */
  exclusivesPerMerchant: number;
  perks: string[];
  badge?: string;
};

export const TIER_CONFIG: Record<SubscriptionTier, TierConfig> = {
  general: {
    label: "General",
    priceLabel: "$89.99 / yr",
    description: "For everyday explorers across the city.",
    couponsPerMerchant: 3,
    exclusivesPerMerchant: 0,
    perks: [
      "Full merchant directory",
      "3 coupons per merchant / year",
      "Loyalty points",
      "Standard support",
    ],
  },
  student_senior: {
    label: "Student / Senior",
    priceLabel: "$59.99 / yr",
    description: "Full access, discounted rate. ID verified.",
    couponsPerMerchant: 3,
    exclusivesPerMerchant: 0,
    perks: [
      "Full merchant directory",
      "3 coupons per merchant / year",
      "Loyalty points",
      "Standard support",
    ],
  },
  premium: {
    label: "Premium",
    priceLabel: "$129.99 / yr",
    description: "Power users who want it all, first.",
    couponsPerMerchant: 4,
    exclusivesPerMerchant: 1,
    badge: "Most Popular",
    perks: [
      "Everything in General",
      "4 coupons per merchant / year",
      "Exclusive higher-value offers",
      "Priority support",
    ],
  },
};

export const TIER_ORDER: SubscriptionTier[] = [
  "general",
  "student_senior",
  "premium",
];

/** Whether a tier can redeem a given offer. Premium-only locks out non-premium. */
export function canRedeemOffer(
  tier: SubscriptionTier,
  premiumOnly: boolean,
): boolean {
  if (!premiumOnly) return true;
  return tier === "premium";
}
