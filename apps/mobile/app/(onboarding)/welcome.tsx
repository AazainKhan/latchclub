import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { MembershipCard } from "../../src/components/card/MembershipCard";
import { Button } from "../../src/components/ui/Button";
import { useOnboarding } from "../../src/state/OnboardingContext";
import { colors, spacing, text } from "../../src/theme";

export default function Welcome() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { markOnboarded } = useOnboarding();

  const handleBrowseFirst = async () => {
    await markOnboarded();
    router.replace("/(tabs)/home");
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      {/* Ambient glows behind the card (matches website welcome mockup) */}
      <LinearGradient
        colors={["rgba(3,164,147,0.22)", "transparent"]}
        start={{ x: 0.5, y: 0.2 }}
        end={{ x: 0.5, y: 0.7 }}
        style={[StyleSheet.absoluteFill]}
      />
      <LinearGradient
        colors={["transparent", "rgba(212,179,106,0.10)", "transparent"]}
        start={{ x: 0.5, y: 0.4 }}
        end={{ x: 0.5, y: 1 }}
        style={[StyleSheet.absoluteFill]}
      />

      {/* Hero card */}
      <View style={styles.cardWrap}>
        <MembershipCard
          memberName="Aazain"
          memberId="• • • •"
          tierLabel="Founding"
          memberSince="Apr 2026"
          size="lg"
        />
      </View>

      {/* Copy */}
      <View style={styles.copyWrap}>
        <Text style={styles.eyebrow}>LatchClub</Text>
        <Text style={styles.title}>Your key to the city.</Text>
        <Text style={styles.subtitle}>
          One membership. A city full of experiences. Your Toronto, unlocked.
        </Text>
      </View>

      {/* CTAs */}
      <View style={styles.actions}>
        <Button
          label="Get started"
          variant="primary"
          size="lg"
          fullWidth
          onPress={() => router.push("/(onboarding)/value")}
        />
        <Button
          label="I already have an account"
          variant="secondary"
          size="lg"
          fullWidth
          onPress={() => router.push("/(onboarding)/auth")}
          haptic="tap"
        />
        <Button
          label="Browse first"
          variant="ghost"
          size="md"
          fullWidth
          onPress={handleBrowseFirst}
          haptic="tap"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.black,
    paddingHorizontal: spacing.lg,
    justifyContent: "space-between",
  },
  cardWrap: {
    alignItems: "center",
    marginTop: spacing.xxl,
    transform: [{ rotate: "-3deg" }, { scale: 0.95 }],
  },
  copyWrap: {
    alignItems: "center",
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  eyebrow: {
    ...text.caption,
    color: colors.teal[300],
    letterSpacing: 4,
  },
  title: {
    ...text.display,
    color: colors.text.primary,
    textAlign: "center",
    fontStyle: "italic",
  },
  subtitle: {
    ...text.body,
    color: colors.text.muted,
    textAlign: "center",
    maxWidth: 320,
    lineHeight: 22,
  },
  actions: {
    gap: spacing.sm,
    paddingBottom: spacing.lg,
  },
});
