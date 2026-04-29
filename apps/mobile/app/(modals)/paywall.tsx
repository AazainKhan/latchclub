import { useRouter } from "expo-router";
import { Check, X } from "lucide-react-native";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button } from "../../src/components/ui/Button";
import { Card } from "../../src/components/ui/Card";
import { IconButton } from "../../src/components/ui/IconButton";
import { Tag } from "../../src/components/ui/Tag";
import { TIER_CONFIG, TIER_ORDER } from "../../src/constants/tiers";
import type { SubscriptionTier } from "../../src/data/types";
import { useHaptics } from "../../src/hooks/useHaptics";
import { useSession } from "../../src/state/SessionContext";
import { useTier } from "../../src/state/TierContext";
import { colors, radius, spacing, text } from "../../src/theme";

export default function Paywall() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const haptics = useHaptics();
  const { setTier } = useTier();
  const { isSignedIn, setAppleShell } = useSession();
  const [selected, setSelected] = useState<SubscriptionTier>("premium");

  const handleConfirm = () => {
    haptics.success();
    setTier(selected);
    // For MVP demo: starting a trial is the implicit identity step.
    // If we don't have a real session, flip the shell flag so redeem
    // gates pass. Real Apple/email auth replaces this in v1.1.
    if (!isSignedIn) setAppleShell(true);
    router.back();
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top + spacing.sm }]}>
      <View style={styles.head}>
        <View>
          <Text style={styles.eyebrow}>Membership</Text>
          <Text style={styles.title}>Unlock to redeem</Text>
        </View>
        <IconButton
          icon={<X size={18} color={colors.text.primary} />}
          accessibilityLabel="Close"
          variant="ghost"
          onPress={() => router.back()}
        />
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.list,
          { paddingBottom: insets.bottom + 120 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.lede}>
          One membership. A city full of experiences. Pick a plan to start redeeming.
        </Text>

        {TIER_ORDER.map((t) => {
          const cfg = TIER_CONFIG[t];
          const active = selected === t;
          const isPremium = t === "premium";

          return (
            <Pressable
              key={t}
              onPress={() => {
                haptics.select();
                setSelected(t);
              }}
              style={({ pressed }) => [
                styles.tier,
                isPremium && styles.tierPremium,
                active && (isPremium ? styles.tierActiveGold : styles.tierActive),
                pressed && { opacity: 0.95 },
              ]}
            >
              <View style={styles.tierHead}>
                <View style={{ flex: 1 }}>
                  <View style={styles.tierTopRow}>
                    <Text
                      style={[
                        styles.tierName,
                        isPremium && { color: colors.gold.start },
                      ]}
                    >
                      {cfg.label}
                    </Text>
                    {cfg.badge ? <Tag label={cfg.badge} variant="gold" /> : null}
                  </View>
                  <Text style={styles.tierPrice}>{cfg.priceLabel}</Text>
                </View>
                <View style={[
                  styles.radio,
                  active && (isPremium ? styles.radioActiveGold : styles.radioActive),
                ]}>
                  {active ? <View style={styles.radioInner} /> : null}
                </View>
              </View>
              <Text style={styles.tierDesc}>{cfg.description}</Text>
              <View style={styles.perks}>
                {cfg.perks.map((p) => (
                  <View key={p} style={styles.perkRow}>
                    <Check
                      size={14}
                      color={isPremium ? colors.gold.start : colors.teal[300]}
                    />
                    <Text style={styles.perkText}>{p}</Text>
                  </View>
                ))}
              </View>
            </Pressable>
          );
        })}

        <Text style={styles.smallPrint}>
          Free 30-day trial. Cancel anytime in Settings · Subscription. Apple, Google, or web billing supported when we go live.
        </Text>
      </ScrollView>

      <View
        style={[
          styles.cta,
          { paddingBottom: insets.bottom + spacing.md },
        ]}
      >
        <Button
          label={`Start trial — ${TIER_CONFIG[selected].label}`}
          variant={selected === "premium" ? "gold" : "primary"}
          size="lg"
          fullWidth
          onPress={handleConfirm}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg.base,
  },
  head: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
  },
  eyebrow: {
    ...text.caption,
    color: colors.teal[400],
    marginBottom: 4,
  },
  title: {
    ...text.titleLg,
    color: colors.text.primary,
  },
  list: {
    paddingHorizontal: spacing.base,
    paddingTop: spacing.sm,
    gap: spacing.md,
  },
  lede: {
    ...text.body,
    color: colors.text.secondary,
    marginBottom: spacing.md,
    lineHeight: 22,
  },
  tier: {
    backgroundColor: colors.bg.elevated,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    padding: spacing.lg,
    gap: spacing.md,
  },
  tierPremium: {
    borderColor: "rgba(212,179,106,0.35)",
  },
  tierActive: {
    borderColor: colors.teal[400],
  },
  tierActiveGold: {
    borderColor: colors.gold.mid,
  },
  tierHead: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.md,
  },
  tierTopRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  tierName: {
    ...text.title,
    color: colors.text.primary,
  },
  tierPrice: {
    ...text.bodyMedium,
    color: colors.text.muted,
    marginTop: 2,
  },
  tierDesc: {
    ...text.small,
    color: colors.text.secondary,
  },
  perks: {
    gap: spacing.xs,
    marginTop: spacing.xs,
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
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.border.subtle,
    alignItems: "center",
    justifyContent: "center",
  },
  radioActive: {
    borderColor: colors.teal[400],
  },
  radioActiveGold: {
    borderColor: colors.gold.mid,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.text.primary,
  },
  smallPrint: {
    ...text.small,
    color: colors.text.muted,
    textAlign: "center",
    marginTop: spacing.lg,
    lineHeight: 18,
  },
  cta: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.bg.base,
    paddingTop: spacing.md,
    paddingHorizontal: spacing.base,
    borderTopWidth: 1,
    borderTopColor: colors.border.subtle,
  },
});
