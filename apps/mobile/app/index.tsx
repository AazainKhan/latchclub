import { LinearGradient } from "expo-linear-gradient";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

import { useOnboarding } from "../src/state/OnboardingContext";
import { useSession } from "../src/state/SessionContext";
import { colors, spacing } from "../src/theme";

const MIN_BRAND_SPLASH_MS = 1300;

/**
 * Branded cold-launch splash. Pure wordmark with a subtle accent rule —
 * intentionally restrained so it reads premium and the app reveal feels earned.
 */
export default function Index() {
  const { hasOnboarded, loading } = useOnboarding();
  const { status, isSignedIn } = useSession();
  const [splashReady, setSplashReady] = useState(false);

  // Animations
  const wordmarkOpacity = useSharedValue(0);
  const wordmarkY = useSharedValue(8);
  const ruleScale = useSharedValue(0);
  const taglineOpacity = useSharedValue(0);

  useEffect(() => {
    wordmarkOpacity.value = withTiming(1, {
      duration: 520,
      easing: Easing.out(Easing.cubic),
    });
    wordmarkY.value = withTiming(0, {
      duration: 520,
      easing: Easing.out(Easing.cubic),
    });
    ruleScale.value = withDelay(
      280,
      withTiming(1, { duration: 480, easing: Easing.out(Easing.cubic) }),
    );
    taglineOpacity.value = withDelay(
      560,
      withTiming(1, { duration: 420, easing: Easing.out(Easing.quad) }),
    );

    const t = setTimeout(() => setSplashReady(true), MIN_BRAND_SPLASH_MS);
    return () => clearTimeout(t);
  }, [wordmarkOpacity, wordmarkY, ruleScale, taglineOpacity]);

  const wordmarkStyle = useAnimatedStyle(() => ({
    opacity: wordmarkOpacity.value,
    transform: [{ translateY: wordmarkY.value }],
  }));
  const ruleStyle = useAnimatedStyle(() => ({
    transform: [{ scaleX: ruleScale.value }],
  }));
  const taglineStyle = useAnimatedStyle(() => ({
    opacity: taglineOpacity.value,
  }));

  const dataReady = !loading && status !== "loading";

  if (splashReady && dataReady) {
    const goTabs = hasOnboarded || isSignedIn;
    return <Redirect href={goTabs ? "/(tabs)/home" : "/(onboarding)/welcome"} />;
  }

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={["rgba(3,164,147,0.16)", "transparent"]}
        start={{ x: 0.5, y: 0.3 }}
        end={{ x: 0.5, y: 0.85 }}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.center}>
        <Animated.Text style={[styles.wordmark, wordmarkStyle]}>
          latchclub
        </Animated.Text>
        <Animated.View style={[styles.rule, ruleStyle]} />
        <Animated.Text style={[styles.tagline, taglineStyle]}>
          your key to the city
        </Animated.Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.black,
    alignItems: "center",
    justifyContent: "center",
  },
  center: {
    alignItems: "center",
    gap: spacing.md,
  },
  wordmark: {
    fontSize: 44,
    fontWeight: "300",
    fontStyle: "italic",
    color: colors.text.primary,
    letterSpacing: -1.4,
  },
  rule: {
    width: 72,
    height: 1.5,
    backgroundColor: colors.teal[400],
    marginTop: spacing.xs,
  },
  tagline: {
    fontSize: 11,
    fontWeight: "500",
    color: colors.text.muted,
    letterSpacing: 5,
    textTransform: "uppercase",
    marginTop: spacing.xs,
  },
});
