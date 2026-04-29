import * as LocalAuthentication from "expo-local-authentication";
import { useCallback, useEffect, useState } from "react";

export type BiometricKind = "FaceID" | "TouchID" | "Iris" | "Generic";

export type BiometricSupport = {
  hasHardware: boolean;
  isEnrolled: boolean;
  kind: BiometricKind | null;
};

/**
 * Wraps expo-local-authentication. Use to gate redemption.
 *
 * Returns `authenticate(promptMessage)` → resolves true on success, false otherwise.
 * If hardware is unavailable, resolves true (don't block users without biometrics).
 */
export function useBiometric() {
  const [support, setSupport] = useState<BiometricSupport>({
    hasHardware: false,
    isEnrolled: false,
    kind: null,
  });

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const [hasHardware, isEnrolled, types] = await Promise.all([
          LocalAuthentication.hasHardwareAsync(),
          LocalAuthentication.isEnrolledAsync(),
          LocalAuthentication.supportedAuthenticationTypesAsync(),
        ]);
        const kind: BiometricKind | null = types.includes(
          LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION,
        )
          ? "FaceID"
          : types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)
            ? "TouchID"
            : types.includes(LocalAuthentication.AuthenticationType.IRIS)
              ? "Iris"
              : hasHardware
                ? "Generic"
                : null;
        if (mounted) setSupport({ hasHardware, isEnrolled, kind });
      } catch {
        if (mounted) setSupport({ hasHardware: false, isEnrolled: false, kind: null });
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const authenticate = useCallback(
    async (promptMessage = "Confirm to redeem"): Promise<boolean> => {
      // No hardware? Bypass — don't block users.
      if (!support.hasHardware || !support.isEnrolled) return true;
      try {
        const result = await LocalAuthentication.authenticateAsync({
          promptMessage,
          cancelLabel: "Cancel",
          disableDeviceFallback: false,
        });
        return result.success;
      } catch {
        return false;
      }
    },
    [support.hasHardware, support.isEnrolled],
  );

  return { ...support, authenticate };
}
