/**
 * Live Supabase implementation. Off behind FEATURE_FLAGS.useLiveData for the MVP.
 *
 * When the swap is flipped on:
 *   1. Push migrations: `supabase link --project-ref <ref>` then `pnpm db:push`
 *   2. Apply `006_mobile_redesign_fields` (offers.image_url, premium_only,
 *      redemption_kind, merchant_photos, pet_care + activities categories)
 *   3. `pnpm db:types` to regenerate row shapes
 *   4. Set `FEATURE_FLAGS.useLiveData = true` in @latchclub/utils
 *
 * Each function below mirrors the mock signature exactly. The thrown error here
 * is intentional — TypeScript will surface it at the swap point if shapes drift.
 */

import type {
  Category,
  LoyaltyProgress,
  MerchantWithMocks,
  MockProfile,
  OfferWithMocks,
  RedemptionRecord,
} from "../types";

const notImplemented = (name: string): never => {
  throw new Error(
    `[data/live] ${name} not implemented. Live data is gated behind FEATURE_FLAGS.useLiveData.`,
  );
};

export const liveApi = {
  async getMerchants(): Promise<MerchantWithMocks[]> {
    return notImplemented("getMerchants");
  },
  async getMerchant(_id: string): Promise<MerchantWithMocks | null> {
    return notImplemented("getMerchant");
  },
  async getMerchantBySlug(_slug: string): Promise<MerchantWithMocks | null> {
    return notImplemented("getMerchantBySlug");
  },
  async getOffersForMerchant(_merchantId: string): Promise<OfferWithMocks[]> {
    return notImplemented("getOffersForMerchant");
  },
  async getOffer(_offerId: string): Promise<OfferWithMocks | null> {
    return notImplemented("getOffer");
  },
  async getCategories(): Promise<Category[]> {
    return notImplemented("getCategories");
  },
  async getProfile(): Promise<MockProfile> {
    return notImplemented("getProfile");
  },
  async getWalletHistory(): Promise<RedemptionRecord[]> {
    return notImplemented("getWalletHistory");
  },
  async getLoyaltyProgress(): Promise<LoyaltyProgress> {
    return notImplemented("getLoyaltyProgress");
  },
};
