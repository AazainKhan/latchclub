import { LinearGradient } from "expo-linear-gradient";
import {
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import type { LoyaltyProgress, LoyaltyTier } from "../../data/types";
import { colors, radius, spacing, text } from "../../theme";

const TIER_COLORS: Record<LoyaltyTier, string> = {
  Bronze: colors.tier.bronze,
  Silver: colors.tier.silver,
  Gold: colors.tier.gold,
  Platinum: colors.tier.platinum,
};

export function LoyaltyTierCard({
  progress,
  style,
}: {
  progress: LoyaltyProgress;
  style?: StyleProp<ViewStyle>;
}) {
  const tierColor = TIER_COLORS[progress.tier];
  const next = progress.next;
  const prevThreshold = TIER_THRESHOLDS[progress.tier];
  const pct = next
    ? Math.min(1, Math.max(0, (progress.points - prevThreshold) / (next.threshold - prevThreshold)))
    : 1;

  return (
    <View style={[styles.root, style]}>
      <View style={styles.head}>
        <View style={[styles.tierDot, { backgroundColor: tierColor }]} />
        <View style={{ flex: 1 }}>
          <Text style={styles.tierLabel}>Current tier</Text>
          <Text style={styles.tierName}>{progress.tier}</Text>
        </View>
        <View style={styles.pointsCol}>
          <Text style={styles.tierLabel}>Points</Text>
          <Text style={styles.points}>{progress.points.toLocaleString()}</Text>
        </View>
      </View>

      {next ? (
        <View style={styles.progressBlock}>
          <View style={styles.barTrack}>
            <LinearGradient
              colors={[tierColor, TIER_COLORS[next.tier]]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.barFill, { width: `${pct * 100}%` as any }]}
            />
          </View>
          <View style={styles.progressMeta}>
            <Text style={styles.progressMetaText}>
              {next.remaining.toLocaleString()} pts to {next.tier}
            </Text>
            <Text style={[styles.progressMetaText, styles.progressMetaTextDim]}>
              {next.threshold.toLocaleString()} pts
            </Text>
          </View>
        </View>
      ) : (
        <View style={styles.maxTier}>
          <Text style={styles.maxTierText}>You've reached the highest tier.</Text>
        </View>
      )}

      {progress.perks.length > 0 ? (
        <View style={styles.perks}>
          {progress.perks.map((p) => (
            <View key={p} style={styles.perkRow}>
              <View style={[styles.perkDot, { backgroundColor: tierColor }]} />
              <Text style={styles.perkText}>{p}</Text>
            </View>
          ))}
        </View>
      ) : null}
    </View>
  );
}

const TIER_THRESHOLDS: Record<LoyaltyTier, number> = {
  Bronze: 0,
  Silver: 250,
  Gold: 750,
  Platinum: 2000,
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.bg.elevated,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    padding: spacing.lg,
    gap: spacing.lg,
  },
  head: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  tierDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  tierLabel: {
    ...text.caption,
    color: colors.text.muted,
  },
  tierName: {
    ...text.title,
    color: colors.text.primary,
  },
  pointsCol: {
    alignItems: "flex-end",
  },
  points: {
    ...text.title,
    color: colors.text.primary,
    fontVariant: ["tabular-nums"],
  },
  progressBlock: {
    gap: spacing.sm,
  },
  barTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.06)",
    overflow: "hidden",
  },
  barFill: {
    height: 8,
    borderRadius: 4,
  },
  progressMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressMetaText: {
    ...text.smallMedium,
    color: colors.text.secondary,
  },
  progressMetaTextDim: {
    color: colors.text.muted,
  },
  maxTier: {
    paddingVertical: spacing.sm,
  },
  maxTierText: {
    ...text.small,
    color: colors.text.muted,
  },
  perks: {
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
  perkDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  perkText: {
    ...text.small,
    color: colors.text.secondary,
  },
});
