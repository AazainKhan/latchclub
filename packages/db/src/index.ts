export { Constants } from "./database.types";
export type {
  CompositeTypes,
  Database,
  Enums,
  Json,
  Tables,
  TablesInsert,
  TablesUpdate,
} from "./database.types";
export { createBrowserSupabaseClient } from "./browser";
export { createMobileSupabaseClient } from "./mobile";
export { createServerSupabaseClient } from "./server";

export type AppUser = import("./database.types").Tables<"users">;
export type Category = import("./database.types").Tables<"categories">;
export type Merchant = import("./database.types").Tables<"merchants">;
export type Offer = import("./database.types").Tables<"offers">;
export type MerchantMember = import("./database.types").Tables<"merchant_members">;
export type SavedMerchant = import("./database.types").Tables<"saved_merchants">;
export type Subscription = import("./database.types").Tables<"subscriptions">;
