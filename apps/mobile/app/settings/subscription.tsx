import { Stack, useRouter } from "expo-router";
import { Check } from "lucide-react-native";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { Button } from "../../src/components/ui/Button";
import { Card } from "../../src/components/ui/Card";
import { Section } from "../../src/components/ui/Section";
import { Tag } from "../../src/components/ui/Tag";
import { TIER_CONFIG, TIER_ORDER } from "../../src/constants/tiers";
import type { SubscriptionTier } from "../../src/data/types";
import { useHaptics } from "../../src/hooks/useHaptics";
import { useTier } from "../../src/state/TierContext";
import { colors, radius, spacing, text } from "../../src/theme";

export default function SubscriptionSettings() {
  const router = useRouter();
  const haptics = useHaptics();
  const { tier, setTier } = useTier();

  const change = (next: SubscriptionTier) => {
    haptics.success();
    setTier(next);
  };

  return (
    <>
      <Stack.Screen options={{ title: "Subscription" }} />
      <ScrollView style={styles.root} contentContainerStyle={styles.content}>
        <Section eyebrow="Current plan" title={TIER_CONFIG[tier].label}>
          <Card style={[styles.summary, tier === "premium" && styles.summaryGold]}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryPrice}>{TIER_CONFIG[tier].priceLabel}</Text>
              {TIER_CONFIG[tier].badge ? (
                <Tag label={TIER_CONFIG[tier].badge!} variant="gold" />
              ) : null}
            </View>
            <Text style={styles.summaryDesc}>{TIER_CONFIG[tier].description}</Text>
            <View style={styles.summaryPerks}>
              {TIER_CONFIG[tier].perks.map((p) => (
                <View key={p} style={styles.perkRow}>
                  <Check size={14} color={colors.teal[300]} />
                  <Text style={styles.perkText}>{p}</Text>
                </View>
              ))}
            </View>
          </Card>
        </Section>

        <Section eyebrow="Change plan" title="Switch tier">
          {TIER_ORDER.filter((t) => t !== tier).map((t) => {
            const cfg = TIER_CONFIG[t];
            const goingPremium = t === "premium";
            return (
              <Pressable
                key={t}
                onPress={() => change(t)}
                style={({ pressed }) => [
                  styles.optionRow,
                  goingPremium && { borderColor: "rgba(212,179,106,0.4)" },
                  pressed && { opacity: 0.95 },
                ]}
              >
                <View style={{ flex: 1 }}>
                  <Text
                    style={[
                      styles.optionName,
                      goingPremium && { color: colors.gold.start },
                    ]}
                  >
                    {cfg.label}
                  </Text>
                  <Text style={styles.optionPrice}>{cfg.priceLabel}</Text>
                </View>
                <Button
                  label={t === "premium" ? "Upgrade" : "Switch"}
                  variant={goingPremium ? "gold" : "secondary"}
                  size="sm"
                  onPress={() => change(t)}
                />
              </Pressable>
            );
          })}
        </Section>

        <Section eyebrow="Or" title="Compare all plans">
          <Pressable onPress={() => router.push("/(modals)/paywall")} style={styles.compareLink}>
            <Text style={styles.compareLinkText}>See all plans →</Text>
          </Pressable>
        </Section>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg.base },
  content: { paddingVertical: spacing.lg, gap: spacing.xl },
  summary: {
    marginHorizontal: spacing.base,
    gap: spacing.md,
    borderWidth: 1,
    borderColor: colors.teal[400],
  },
  summaryGold: {
    borderColor: "rgba(212,179,106,0.5)",
  },
  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  summaryPrice: {
    ...text.titleLg,
    color: colors.text.primary,
  },
  summaryDesc: {
    ...text.body,
    color: colors.text.secondary,
  },
  summaryPerks: {
    gap: spacing.xs,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border.subtle,
  },
  perkRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  perkText: {
    ...text.small,
    color: colors.text.secondary,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    marginHorizontal: spacing.base,
    backgroundColor: colors.bg.elevated,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    padding: spacing.base,
  },
  optionName: {
    ...text.bodyMedium,
    color: colors.text.primary,
  },
  optionPrice: {
    ...text.small,
    color: colors.text.muted,
    marginTop: 2,
  },
  compareLink: {
    paddingHorizontal: spacing.base,
  },
  compareLinkText: {
    ...text.bodyMedium,
    color: colors.teal[300],
  },
});
