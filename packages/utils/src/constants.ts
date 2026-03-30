export const APP_ROUTES = {
  mobileTabs: {
    browse: "browse",
    saved: "saved",
    profile: "profile",
  },
  web: {
    home: "/",
    signIn: "/sign-in",
    merchant: "/merchant",
    admin: "/admin",
  },
} as const;

export const CATEGORY_SLUGS = {
  dining: "dining",
  wellness: "wellness",
  leisure: "leisure",
} as const;

export const CATEGORY_ORDER = [
  CATEGORY_SLUGS.dining,
  CATEGORY_SLUGS.wellness,
  CATEGORY_SLUGS.leisure,
] as const;

export const COUPON_CAP_PER_MERCHANT = 3;
export const REDEMPTION_TTL_MINUTES = 10;

export const FEATURE_FLAGS = {
  billing: false,
  notifications: false,
  redemption: false,
  merchantSelfServeSignup: false,
  recommendations: false,
} as const;

export const ANALYTICS_EVENTS = {
  signInSuccess: "sign_in_success",
  categoryViewed: "category_viewed",
  merchantViewed: "merchant_viewed",
  merchantSaved: "merchant_saved",
  merchantUnsaved: "merchant_unsaved",
} as const;

export const DEV_ACCOUNTS = {
  adminEmail: "admin@latchclub.local",
  merchantEmail: "merchant@latchclub.local",
  consumerEmail: "consumer@latchclub.local",
} as const;
