import { LinearGradient } from "expo-linear-gradient";
import {
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import { colors, radius, spacing } from "../../theme";

/**
 * Premium gold membership card. Mirrors the welcome screen mockup on
 * `apps/website/app/screens/welcome/page.tsx` (gold linear gradient + foil sheen).
 *
 * Used on:
 * - Onboarding welcome screen (hero)
 * - Profile tab (member identity)
 */
export function MembershipCard({
  memberName,
  memberId,
  tierLabel,
  memberSince,
  style,
  size = "lg",
}: {
  memberName: string;
  memberId: string;
  tierLabel: string;
  memberSince?: string;
  style?: StyleProp<ViewStyle>;
  size?: "md" | "lg";
}) {
  const dim = SIZES[size];

  return (
    <View
      style={[
        styles.root,
        { width: dim.width, height: dim.height },
        style,
      ]}
    >
      <LinearGradient
        colors={[
          colors.gold.start,
          colors.gold.midLight,
          colors.gold.mid,
          colors.gold.midDark,
          colors.gold.end,
        ]}
        locations={[0, 0.18, 0.48, 0.78, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      {/* Foil sheen */}
      <LinearGradient
        colors={["transparent", colors.gold.sheen, "transparent"]}
        locations={[0.2, 0.42, 0.6]}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[StyleSheet.absoluteFill, { opacity: 0.55 }]}
      />
      {/* Wordmark */}
      <Text style={[styles.wordmark, { fontSize: dim.wordmark }]}>
        latchclub
      </Text>
      {/* Tier */}
      <View style={[styles.tierBadge, { top: dim.padding, right: dim.padding }]}>
        <Text style={styles.tierText}>{tierLabel}</Text>
      </View>
      {/* Chip */}
      <View
        style={[
          styles.chip,
          { left: dim.padding, top: dim.height * 0.42 },
        ]}
      >
        <View style={styles.chipInner} />
      </View>
      {/* Footer info */}
      <View style={[styles.footer, { left: dim.padding, right: dim.padding, bottom: dim.padding }]}>
        <View style={{ flex: 1 }}>
          <Text style={styles.memberLabel}>Member</Text>
          <Text style={[styles.memberName, { fontSize: dim.memberName }]}>{memberName}</Text>
        </View>
        <View>
          <Text style={styles.memberLabel}>ID</Text>
          <Text style={styles.memberId}>{memberId}</Text>
        </View>
      </View>
      {memberSince ? (
        <Text style={[styles.since, { left: dim.padding, top: dim.padding * 2.6 }]}>
          Member since {memberSince}
        </Text>
      ) : null}
    </View>
  );
}

const SIZES = {
  md: {
    width: 280,
    height: 175,
    padding: 18,
    wordmark: 12,
    memberName: 16,
  },
  lg: {
    width: 332,
    height: 208,
    padding: 22,
    wordmark: 14,
    memberName: 18,
  },
};

const styles = StyleSheet.create({
  root: {
    borderRadius: radius.lg,
    overflow: "hidden",
    shadowColor: colors.gold.shadow,
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 0.4,
    shadowRadius: 32,
    elevation: 8,
  },
  wordmark: {
    position: "absolute",
    top: 22,
    left: 22,
    fontWeight: "800",
    color: "rgba(40,28,10,0.95)",
    letterSpacing: -0.4,
  },
  tierBadge: {
    position: "absolute",
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: "rgba(40,28,10,0.18)",
    borderWidth: 1,
    borderColor: "rgba(40,28,10,0.25)",
  },
  tierText: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.2,
    color: "rgba(40,28,10,0.85)",
    textTransform: "uppercase",
  },
  chip: {
    width: 38,
    height: 28,
    borderRadius: 5,
    backgroundColor: "rgba(120,86,33,0.55)",
    overflow: "hidden",
    padding: 3,
  },
  chipInner: {
    flex: 1,
    borderRadius: 3,
    backgroundColor: "rgba(255,221,160,0.5)",
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.3)",
  },
  footer: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "flex-end",
    gap: spacing.md,
  },
  memberLabel: {
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 1.4,
    color: "rgba(40,28,10,0.78)",
    textTransform: "uppercase",
  },
  memberName: {
    fontWeight: "700",
    color: "rgba(40,28,10,0.95)",
    letterSpacing: -0.3,
  },
  memberId: {
    fontWeight: "600",
    color: "rgba(40,28,10,0.9)",
    fontSize: 12,
    letterSpacing: 0.6,
  },
  since: {
    position: "absolute",
    fontSize: 10,
    color: "rgba(40,28,10,0.78)",
    fontWeight: "600",
    letterSpacing: 0.4,
  },
});
