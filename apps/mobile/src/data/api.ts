/**
 * Single import surface for every screen. Internally swaps mock/live based on a
 * feature flag. The mock implementation is the only one shipped in MVP.
 *
 * Adding a new endpoint? Add it to `mock/api.ts` AND `live/api.ts` with matching
 * signatures, then add to the destructured re-export below. TypeScript will fail
 * the build if shapes drift.
 */

import { liveApi } from "./live/api";
import { mockApi } from "./mock/api";

// Local feature flag — flip to true once the linked Supabase project has all
// mobile-required tables/columns. See live/api.ts for the migration checklist.
const USE_LIVE_DATA = false;

const api = USE_LIVE_DATA ? liveApi : mockApi;

export const {
  getMerchants,
  getMerchant,
  getMerchantBySlug,
  getOffersForMerchant,
  getOffer,
  getCategories,
  getProfile,
  getWalletHistory,
  getLoyaltyProgress,
} = api;

export type DataApi = typeof mockApi;
