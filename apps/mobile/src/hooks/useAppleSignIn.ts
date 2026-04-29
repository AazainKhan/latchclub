import * as AppleAuthentication from "expo-apple-authentication";
import * as SecureStore from "expo-secure-store";
import { useCallback, useEffect, useState } from "react";
import { Platform } from "react-native";

const SHELL_KEY = "latchclub.appleShellSession";

export type AppleShellSession = {
  user: string;
  email: string | null;
  fullName: string | null;
  // identityToken is opaque for the shell — never sent to a server in MVP.
  identityToken: string | null;
};

export function useAppleSignIn() {
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (Platform.OS !== "ios") {
        if (mounted) setAvailable(false);
        return;
      }
      try {
        const ok = await AppleAuthentication.isAvailableAsync();
        if (mounted) setAvailable(ok);
      } catch {
        if (mounted) setAvailable(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const signIn = useCallback(async (): Promise<AppleShellSession | null> => {
    if (Platform.OS !== "ios") return null;
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      const session: AppleShellSession = {
        user: credential.user,
        email: credential.email ?? null,
        fullName:
          [credential.fullName?.givenName, credential.fullName?.familyName]
            .filter(Boolean)
            .join(" ") || null,
        identityToken: credential.identityToken ?? null,
      };
      await SecureStore.setItemAsync(SHELL_KEY, JSON.stringify(session));
      return session;
    } catch (err: any) {
      // User cancelled — return null silently.
      if (err?.code === "ERR_REQUEST_CANCELED") return null;
      return null;
    }
  }, []);

  const restore = useCallback(async (): Promise<AppleShellSession | null> => {
    try {
      const raw = await SecureStore.getItemAsync(SHELL_KEY);
      if (!raw) return null;
      return JSON.parse(raw) as AppleShellSession;
    } catch {
      return null;
    }
  }, []);

  const clear = useCallback(async () => {
    try {
      await SecureStore.deleteItemAsync(SHELL_KEY);
    } catch {}
  }, []);

  return { available, signIn, restore, clear };
}
