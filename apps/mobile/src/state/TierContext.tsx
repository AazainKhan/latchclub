import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";

import type { SubscriptionTier } from "../data/types";

export type TierState = {
  tier: SubscriptionTier;
  isSubscribed: boolean;
  setTier: (tier: SubscriptionTier) => void;
  /** Browse-first users have no tier; null until they pick one. */
  clearTier: () => void;
};

const TierContext = createContext<TierState | null>(null);

export function TierProvider({
  children,
  initial,
}: {
  children: ReactNode;
  initial?: SubscriptionTier | null;
}) {
  const [tier, setTierState] = useState<SubscriptionTier | null>(
    initial ?? null,
  );

  const value = useMemo<TierState>(
    () => ({
      tier: tier ?? "general",
      isSubscribed: tier !== null,
      setTier: (next) => setTierState(next),
      clearTier: () => setTierState(null),
    }),
    [tier],
  );

  return <TierContext.Provider value={value}>{children}</TierContext.Provider>;
}

export function useTier(): TierState {
  const ctx = useContext(TierContext);
  if (!ctx) throw new Error("useTier must be used within TierProvider");
  return ctx;
}
