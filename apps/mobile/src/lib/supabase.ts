import "react-native-url-polyfill/auto";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { createMobileSupabaseClient } from "@latchclub/db";

const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
const key = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const isSupabaseConfigured = Boolean(url && key);

export const supabase = createMobileSupabaseClient(url ?? "", key ?? "", {
  auth: {
    storage: AsyncStorage,
  },
});
