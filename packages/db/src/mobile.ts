import { createClient, type SupabaseClientOptions } from "@supabase/supabase-js";

import type { Database } from "./database.types";

/**
 * Supabase client tuned for React Native: PKCE flow (better mobile + future OAuth),
 * autoRefresh + persisted session enabled by default.
 *
 * Caller supplies the `auth.storage` adapter (e.g. AsyncStorage in mobile code) —
 * this package stays platform-agnostic.
 */
export function createMobileSupabaseClient(
  url: string,
  key: string,
  options?: SupabaseClientOptions<"public">,
) {
  return createClient<Database>(url, key, {
    ...options,
    auth: {
      flowType: "pkce",
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
      ...(options?.auth ?? {}),
    },
  });
}
