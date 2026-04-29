import * as SecureStore from "expo-secure-store";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

const ONBOARDING_KEY = "latchclub.hasOnboarded";

export type OnboardingState = {
  loading: boolean;
  hasOnboarded: boolean;
  markOnboarded: () => Promise<void>;
  reset: () => Promise<void>;
};

const OnboardingContext = createContext<OnboardingState | null>(null);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [hasOnboarded, setHasOnboarded] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const v = await SecureStore.getItemAsync(ONBOARDING_KEY);
        if (mounted) setHasOnboarded(v === "1");
      } catch {
        // SecureStore unavailable on web — treat as not onboarded.
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const value = useMemo<OnboardingState>(
    () => ({
      loading,
      hasOnboarded,
      markOnboarded: async () => {
        try {
          await SecureStore.setItemAsync(ONBOARDING_KEY, "1");
        } catch {}
        setHasOnboarded(true);
      },
      reset: async () => {
        try {
          await SecureStore.deleteItemAsync(ONBOARDING_KEY);
        } catch {}
        setHasOnboarded(false);
      },
    }),
    [loading, hasOnboarded],
  );

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding(): OnboardingState {
  const ctx = useContext(OnboardingContext);
  if (!ctx) throw new Error("useOnboarding must be used within OnboardingProvider");
  return ctx;
}
