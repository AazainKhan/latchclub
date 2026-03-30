"use client";

import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";

import type { Tables } from "@latchclub/db";

import { getSupabaseBrowserClient, isSupabaseConfigured } from "@/lib/supabase";

type ProfileRow = Pick<
  Tables<"users">,
  "email" | "full_name" | "id" | "points_balance" | "role"
>;

export function useAuthSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<ProfileRow | null>(null);
  const [loading, setLoading] = useState(isSupabaseConfigured);

  useEffect(() => {
    let active = true;
    const client = getSupabaseBrowserClient();

    if (!client) {
      return () => {
        active = false;
      };
    }

    const browserClient = client;

    async function loadProfile(userId: string) {
      try {
        const { data } = await browserClient
          .from("users")
          .select("id, email, full_name, points_balance, role")
          .eq("id", userId)
          .single();

        if (active) {
          setProfile(data ?? null);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    async function bootstrap() {
      const {
        data: { session: nextSession },
      } = await browserClient.auth.getSession();

      if (!active) {
        return;
      }

      setSession(nextSession);
      setLoading(false);

      if (nextSession) {
        void loadProfile(nextSession.user.id);
      } else if (active) {
        setProfile(null);
      }
    }

    void bootstrap();

    const {
      data: { subscription },
    } = browserClient.auth.onAuthStateChange(async (_event, nextSession) => {
      setSession(nextSession);
      setLoading(false);

      if (!nextSession) {
        setProfile(null);
        return;
      }

      void loadProfile(nextSession.user.id);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  return {
    loading,
    profile,
    session,
  };
}
