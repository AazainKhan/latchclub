import type { Session } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

import { supabase } from "../lib/supabase";

export type SessionStatus = "loading" | "authenticated" | "anonymous";

export type SessionState = {
  session: Session | null;
  status: SessionStatus;
  /** True when the user signed in via the Apple-shell demo path (no real backend session). */
  isAppleShell: boolean;
  /** True for any real or demo signed-in state. */
  isSignedIn: boolean;
  setAppleShell: (on: boolean) => void;
  signOut: () => Promise<void>;
};

const SessionContext = createContext<SessionState | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [status, setStatus] = useState<SessionStatus>("loading");
  const [isAppleShell, setIsAppleShell] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;
      setSession(data.session ?? null);
      setStatus(data.session ? "authenticated" : "anonymous");
    })();
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, next) => {
        setSession(next ?? null);
        setStatus(next ? "authenticated" : "anonymous");
      },
    );
    return () => {
      mounted = false;
      subscription.subscription.unsubscribe();
    };
  }, []);

  const value = useMemo<SessionState>(
    () => ({
      session,
      status,
      isAppleShell,
      isSignedIn: Boolean(session) || isAppleShell,
      setAppleShell: setIsAppleShell,
      signOut: async () => {
        if (isAppleShell) {
          setIsAppleShell(false);
        }
        await supabase.auth.signOut();
      },
    }),
    [session, status, isAppleShell],
  );

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

export function useSession(): SessionState {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession must be used within SessionProvider");
  return ctx;
}
