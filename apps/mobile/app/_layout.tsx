import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { initializeMobileAnalytics } from "../src/lib/analytics";
import { initializeMobileSentry } from "../src/lib/sentry";
import { OnboardingProvider } from "../src/state/OnboardingContext";
import { SessionProvider } from "../src/state/SessionContext";
import { TierProvider } from "../src/state/TierContext";
import { colors } from "../src/theme";

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  useEffect(() => {
    initializeMobileSentry();
    initializeMobileAnalytics();
    // Hide splash once providers mount. Splash budget is small; haven't seen FOUT
    // because we use system fonts. If we add custom fonts later, gate on useFonts.
    SplashScreen.hideAsync().catch(() => {});
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: colors.bg.base }}>
      <SafeAreaProvider>
        <SessionProvider>
          <OnboardingProvider>
            <TierProvider>
              <StatusBar style="light" />
              <Stack
                screenOptions={{
                  headerShown: false,
                  contentStyle: { backgroundColor: colors.bg.base },
                  animation: "slide_from_right",
                }}
              >
                <Stack.Screen name="index" />
                <Stack.Screen name="(onboarding)" />
                <Stack.Screen name="(tabs)" />
                <Stack.Screen
                  name="(modals)"
                  options={{ presentation: "modal", animation: "slide_from_bottom" }}
                />
                <Stack.Screen name="merchant/[id]" />
                <Stack.Screen name="offer/[id]" />
                <Stack.Screen
                  name="redeem/[offerId]"
                  options={{ presentation: "modal", animation: "fade" }}
                />
                <Stack.Screen name="settings" />
                <Stack.Screen name="_dev/components" />
              </Stack>
            </TierProvider>
          </OnboardingProvider>
        </SessionProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
