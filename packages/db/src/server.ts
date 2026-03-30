import {
  createServerClient,
  type CookieMethodsServer,
  type CookieOptions,
} from "@supabase/ssr";

import type { Database } from "./database.types";

export type ServerCookieAdapter = CookieMethodsServer;
export type ServerCookieOptions = CookieOptions;

export function createServerSupabaseClient(
  url: string,
  key: string,
  cookies: ServerCookieAdapter,
) {
  return createServerClient<Database>(url, key, { cookies });
}
