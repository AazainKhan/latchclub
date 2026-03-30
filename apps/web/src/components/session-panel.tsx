"use client";

import type { Session } from "@supabase/supabase-js";

type SessionPanelProps = {
  session: Session | null;
  email?: string | null;
  onSignOut?: () => Promise<void> | void;
};

export function SessionPanel({ session, email, onSignOut }: SessionPanelProps) {
  return (
    <div className="rounded-[28px] border border-[var(--panel-border)] bg-[var(--panel)] p-5 shadow-[0_16px_40px_rgba(36,20,18,0.05)]">
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--accent)]">
        Session
      </p>
      <p className="mt-2 text-sm text-[var(--muted)]">
        {session ? email ?? session.user.email : "Not signed in"}
      </p>
      {session && onSignOut ? (
        <button
          className="mt-4 rounded-full bg-[var(--accent-dark)] px-4 py-2 text-sm font-bold text-white"
          onClick={() => {
            void onSignOut();
          }}
          type="button"
        >
          Sign out
        </button>
      ) : null}
    </div>
  );
}
