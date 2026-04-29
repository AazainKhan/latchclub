import type {
  Category,
  LoyaltyProgress,
  MerchantWithMocks,
  MockProfile,
  OfferWithMocks,
  RedemptionRecord,
} from "../types";

import { MOCK_CATEGORIES } from "./categories";
import { loyaltyProgress } from "./loyalty";
import {
  MOCK_MERCHANTS,
  MOCK_MERCHANTS_BY_ID,
} from "./merchants";
import {
  MOCK_OFFERS_BY_ID,
  MOCK_OFFERS_BY_MERCHANT,
} from "./offers";
import { MOCK_PROFILE, MOCK_REDEMPTION_HISTORY } from "./user";

/** Tiny artificial latency so screens don't flash empty → loaded → render. */
const delay = <T>(value: T, ms = 120): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(value), ms));

const getMerchants = async (): Promise<MerchantWithMocks[]> =>
  delay(MOCK_MERCHANTS);

const getMerchant = async (id: string): Promise<MerchantWithMocks | null> =>
  delay(MOCK_MERCHANTS_BY_ID[id] ?? null);

const getMerchantBySlug = async (
  slug: string,
): Promise<MerchantWithMocks | null> =>
  delay(MOCK_MERCHANTS.find((m) => m.slug === slug) ?? null);

const getOffersForMerchant = async (
  merchantId: string,
): Promise<OfferWithMocks[]> => delay(MOCK_OFFERS_BY_MERCHANT[merchantId] ?? []);

const getOffer = async (offerId: string): Promise<OfferWithMocks | null> =>
  delay(MOCK_OFFERS_BY_ID[offerId] ?? null);

const getCategories = async (): Promise<Category[]> => delay(MOCK_CATEGORIES);

const getProfile = async (): Promise<MockProfile> => delay(MOCK_PROFILE);

const getWalletHistory = async (): Promise<RedemptionRecord[]> =>
  delay(MOCK_REDEMPTION_HISTORY);

const getLoyaltyProgress = async (): Promise<LoyaltyProgress> =>
  delay(loyaltyProgress(MOCK_PROFILE.points_balance));

export const mockApi = {
  getMerchants,
  getMerchant,
  getMerchantBySlug,
  getOffersForMerchant,
  getOffer,
  getCategories,
  getProfile,
  getWalletHistory,
  getLoyaltyProgress,
};
