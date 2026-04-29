import * as Haptics from "expo-haptics";
import { useMemo } from "react";

/**
 * Type-safe haptic helpers. All wrapped in try/catch so a haptics failure never
 * breaks UI (e.g. simulator without haptics).
 */
export function useHaptics() {
  return useMemo(
    () => ({
      tap: () => safe(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)),
      bump: () => safe(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)),
      thud: () => safe(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)),
      select: () => safe(() => Haptics.selectionAsync()),
      success: () =>
        safe(() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)),
      warning: () =>
        safe(() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)),
      error: () =>
        safe(() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)),
    }),
    [],
  );
}

const safe = (fn: () => Promise<void>) => {
  fn().catch(() => {});
};
