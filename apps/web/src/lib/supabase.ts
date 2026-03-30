"use client";

import { createBrowserSupabaseClient } from "@latchclub/db";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const WEB_STORAGE_KEY = "latchclub-web-auth";
const BROWSER_CLIENT_KEY = "__latchclub_supabase_browser_client__";

export const isSupabaseConfigured = Boolean(url && key);

function getClientStore() {
  return globalThis as typeof globalThis & {
    [BROWSER_CLIENT_KEY]?: ReturnType<typeof createBrowserSupabaseClient> | null;
  };
}

export function getSupabaseBrowserClient() {
  if (!isSupabaseConfigured) {
    return null;
  }

  const store = getClientStore();

  if (!store[BROWSER_CLIENT_KEY]) {
    store[BROWSER_CLIENT_KEY] = createBrowserSupabaseClient(url!, key!, {
      auth: {
        storageKey: WEB_STORAGE_KEY,
      },
    });
  }

  return store[BROWSER_CLIENT_KEY] ?? null;
}

export function resetSupabaseBrowserClient() {
  const store = getClientStore();
  delete store[BROWSER_CLIENT_KEY];
}

export function clearSupabaseBrowserStorage() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(WEB_STORAGE_KEY);

  for (const storageKey of Object.keys(window.localStorage)) {
    if (storageKey.startsWith("sb-")) {
      window.localStorage.removeItem(storageKey);
    }
  }
}
