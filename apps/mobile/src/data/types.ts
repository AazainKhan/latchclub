import type { Enums, Tables } from "@latchclub/db";

export type Merchant = Tables<"merchants">;
export type Offer = Tables<"offers">;
export type Category = Tables<"categories">;
export type AppUser = Tables<"users">;

export type SubscriptionTier = Enums<"subscription_tier">;
export type OfferType = Enums<"offer_type">;
export type RedemptionChannel = Enums<"redemption_channel">;

/** Loyalty tier names — locked. Stored client-side, derived from points_balance. */
export type LoyaltyTier = "Bronze" | "Silver" | "Gold" | "Platinum";

/** Day-of-week → "11:00 AM – 11:00 PM" or "Closed". */
export type WeeklyHours = {
  mon: string;
  tue: string;
  wed: string;
  thu: string;
  fri: string;
  sat: string;
  sun: string;
};

/**
 * Merchant row + mock-only fields the schema doesn't yet have.
 * When these fields land in `006_mobile_redesign_fields`, drop the extension.
 */
export type MerchantWithMocks = Merchant & {
  rating: number; // 4.2–4.9
  service_type: string; // "Italian", "Float therapy", "Daycare & grooming"
  hours: WeeklyHours;
  photos: string[]; // multi-photo carousel; supersedes single cover_image_url
  employee_quote: string;
};

/**
 * Offer row + mock-only fields. `image_url`, `premium_only`, `redemption_kind`
 * become real columns in `006_mobile_redesign_fields`.
 */
export type OfferWithMocks = Offer & {
  image_url: string;
  premium_only: boolean;
  redemption_kind: "qr" | "code";
};

export type LoyaltyProgress = {
  tier: LoyaltyTier;
  points: number;
  next: { tier: LoyaltyTier; threshold: number; remaining: number } | null;
  perks: string[];
};

export type RedemptionRecord = {
  id: string;
  merchant_id: string;
  merchant_name: string;
  merchant_neighbourhood: string;
  offer_id: string;
  offer_title: string;
  redeemed_at: string; // ISO
  points_earned: number;
};

export type MockProfile = {
  id: string;
  email: string;
  full_name: string;
  points_balance: number;
  tier: SubscriptionTier;
  member_since: string; // ISO
  redemptions_count: number;
};
