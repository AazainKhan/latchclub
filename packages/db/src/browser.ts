import { createClient, type SupabaseClientOptions } from "@supabase/supabase-js";

import type { Database } from "./database.types";

export function createBrowserSupabaseClient(
  url: string,
  key: string,
  options?: SupabaseClientOptions<"public">,
) {
  return createClient<Database>(url, key, options);
}
