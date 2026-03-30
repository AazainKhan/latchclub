"use client";

import { useState } from "react";

import { ANALYTICS_EVENTS } from "@latchclub/utils";

import { SessionPanel } from "@/components/session-panel";
import { useAuthSession } from "@/hooks/use-auth-session";
import { trackWebEvent } from "@/lib/analytics";
import { captureWebError } from "@/lib/sentry";
import {
  clearSupabaseBrowserStorage,
  getSupabaseBrowserClient,
  isSupabaseConfigured,
  resetSupabaseBrowserClient,
} from "@/lib/supabase";

export default function SignInPage() {
  const { loading, profile, session } = useAuthSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const client = getSupabaseBrowserClient();

    if (!client) {
      setErrorMessage("Supabase env vars are missing.");
      return;
    }

    setSubmitting(true);
    setErrorMessage(null);

    try {
      await client.auth.signOut({ scope: "local" });
      clearSupabaseBrowserStorage();
      resetSupabaseBrowserClient();

      const freshClient = getSupabaseBrowserClient();

      if (!freshClient) {
        throw new Error("Supabase env vars are missing.");
      }

      const { data, error } = await freshClient.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      const userId = data.user?.id;
      let nextPath = "/merchant";

      if (userId) {
        const { data: nextProfile, error: profileError } = await freshClient
          .from("users")
          .select("role")
          .eq("id", userId)
          .single();

        if (profileError) {
          throw profileError;
        }

        if (nextProfile?.role === "admin") {
          nextPath = "/admin";
        }
      }

      trackWebEvent(ANALYTICS_EVENTS.signInSuccess, { surface: "web" });
      window.location.replace(nextPath);
    } catch (error) {
      captureWebError(error);
      setErrorMessage(error instanceof Error ? error.message : "Unable to sign in.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleSignOut() {
    const client = getSupabaseBrowserClient();

    if (!client) {
      clearSupabaseBrowserStorage();
      resetSupabaseBrowserClient();
      window.location.assign(`/sign-in?logout=${Date.now()}`);
      return;
    }

    try {
      await client.auth.signOut({ scope: "local" });
    } catch (error) {
      captureWebError(error);
    }
    clearSupabaseBrowserStorage();
    resetSupabaseBrowserClient();
    window.location.assign(`/sign-in?logout=${Date.now()}`);
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-6 px-6 py-10 lg:px-10">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-[32px] border border-[var(--panel-border)] bg-[var(--panel)] p-8 shadow-[0_20px_60px_rgba(36,20,18,0.06)]">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--accent)]">
            LatchClub Web
          </p>
          <h1 className="mt-3 text-4xl font-black">Merchant and admin sign-in</h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--muted)]">
            Use the merchant-owner account to test `/merchant`, or the admin account
            to test `/admin`. This slice intentionally stops before any write-heavy
            operations.
          </p>

          {!isSupabaseConfigured ? (
            <div className="mt-8 rounded-[24px] bg-[var(--highlight)] p-5 text-sm leading-7 text-[var(--muted)]">
              Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
              in `apps/web/.env.local` before using the web app.
            </div>
          ) : (
            <form className="mt-8 grid gap-4" onSubmit={handleSubmit}>
              <label className="grid gap-2">
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--accent)]">
                  Email
                </span>
                <input
                  className="rounded-[18px] border border-[var(--panel-border)] bg-white px-4 py-3 outline-none ring-0 transition focus:border-[var(--accent)]"
                  onChange={(event) => setEmail(event.target.value)}
                  type="email"
                  value={email}
                />
              </label>

              <label className="grid gap-2">
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--accent)]">
                  Password
                </span>
                <input
                  className="rounded-[18px] border border-[var(--panel-border)] bg-white px-4 py-3 outline-none ring-0 transition focus:border-[var(--accent)]"
                  onChange={(event) => setPassword(event.target.value)}
                  type="password"
                  value={password}
                />
              </label>

              {errorMessage ? (
                <p className="rounded-[18px] bg-rose-100 px-4 py-3 text-sm text-rose-700">
                  {errorMessage}
                </p>
              ) : null}

              <button
                className="mt-2 rounded-[18px] bg-[var(--accent)] px-4 py-3 text-sm font-black text-white"
                disabled={submitting || loading}
                type="submit"
              >
                {submitting ? "Signing in..." : "Sign in"}
              </button>
            </form>
          )}
        </section>

        <div className="grid gap-6">
          <SessionPanel
            email={profile?.email}
            onSignOut={handleSignOut}
            session={session}
          />
          <div className="rounded-[28px] border border-[var(--panel-border)] bg-[var(--panel)] p-5 shadow-[0_16px_40px_rgba(36,20,18,0.05)]">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--accent)]">
              After sign-in
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--muted)]">
              <li>Merchant members should continue to `/merchant`.</li>
              <li>Admin users should continue to `/admin`.</li>
              <li>Consumer users belong in the Expo mobile app, not here.</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
