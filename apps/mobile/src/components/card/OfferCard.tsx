import { LinearGradient } from "expo-linear-gradient";
import {
  ArrowUp,
  ArrowUpRight,
  Crown,
  DollarSign,
  Gift,
  Lock,
  Percent,
  Tags,
  type LucideProps,
} from "lucide-react-native";
import type { ComponentType } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import type { OfferWithMocks } from "../../data/types";
import { useHaptics } from "../../hooks/useHaptics";
import { colors, radius, spacing, text } from "../../theme";
import { Tag } from "../ui/Tag";

type IconCmp = ComponentType<LucideProps>;

const OFFER_ICON: Record<OfferWithMocks["offer_type"], IconCmp> = {
  bogo_item: Tags,
  free_item_with_purchase: Gift,
  fixed_credit: DollarSign,
  percentage_discount: Percent,
  upgrade: ArrowUp,
  exclusive_access: Crown,
};

const OFFER_TYPE_LABEL: Record<OfferWithMocks["offer_type"], string> = {
  bogo_item: "BOGO",
  free_item_with_purchase: "Free with",
  fixed_credit: "Credit",
  percentage_discount: "% Off",
  upgrade: "Upgrade",
  exclusive_access: "Exclusive",
};

const formatMinSpend = (cents: number | null) => {
  if (!cents || cents <= 0) return null;
  return `Min $${Math.round(cents / 100)}`;
};

export function OfferCard({
  offer,
  locked,
  onPress,
  style,
}: {
  offer: OfferWithMocks;
  /** True when this offer is gated (e.g. premium-only and user is not premium). */
  locked?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}) {
  const haptics = useHaptics();
  const Icon = OFFER_ICON[offer.offer_type] ?? Tags;
  const typeLabel = OFFER_TYPE_LABEL[offer.offer_type] ?? "Offer";
  const minSpend = formatMinSpend(offer.min_spend_cents);
  const isPremium = offer.premium_only;

  return (
    <Pressable
      onPress={() => {
        haptics.tap();
        onPress?.();
      }}
      style={({ pressed }) => [
        styles.root,
        isPremium && styles.rootPremium,
        pressed && { transform: [{ scale: 0.99 }] },
        style,
      ]}
    >
      {/* Subtle backdrop gradient — premium gets gold-tinted */}
      <LinearGradient
        colors={
          isPremium
            ? ["rgba(212,179,106,0.08)", "transparent"]
            : ["rgba(3,164,147,0.06)", "transparent"]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* Left accent bar */}
      <View
        style={[
          styles.accent,
          { backgroundColor: isPremium ? colors.gold.start : colors.teal[400] },
        ]}
      />

      <View style={styles.iconWrap}>
        <View
          style={[
            styles.iconCircle,
            isPremium && styles.iconCirclePremium,
          ]}
        >
          <Icon
            size={18}
            color={isPremium ? colors.gold.start : colors.teal[300]}
            strokeWidth={2}
          />
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.tagRow}>
          <Tag label={typeLabel} variant={isPremium ? "gold" : "teal"} />
          {minSpend ? <Tag label={minSpend} variant="outline" /> : null}
        </View>
        <Text style={styles.title} numberOfLines={2}>
          {offer.title}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {offer.description}
        </Text>
      </View>

      <View style={styles.cta}>
        <ArrowUpRight
          size={16}
          color={isPremium ? colors.gold.start : colors.teal[300]}
        />
      </View>

      {locked ? (
        <View style={styles.lockOverlay}>
          <View style={styles.lockBadge}>
            <Lock size={14} color={colors.gold.start} />
            <Text style={styles.lockText}>Premium only</Text>
          </View>
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.bg.elevated,
    borderRadius: radius.xl,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.border.subtle,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.base,
    paddingHorizontal: spacing.lg,
    paddingLeft: spacing.lg + 4, // make room for accent bar
    gap: spacing.md,
    minHeight: 96,
  },
  rootPremium: {
    borderColor: "rgba(212,179,106,0.35)",
  },
  accent: {
    position: "absolute",
    left: 0,
    top: spacing.base,
    bottom: spacing.base,
    width: 3,
    borderRadius: 2,
  },
  iconWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.teal.soft,
    borderWidth: 1,
    borderColor: "rgba(3,164,147,0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  iconCirclePremium: {
    backgroundColor: "rgba(212,179,106,0.1)",
    borderColor: "rgba(212,179,106,0.35)",
  },
  body: {
    flex: 1,
    gap: 4,
  },
  tagRow: {
    flexDirection: "row",
    gap: spacing.xs,
    flexWrap: "wrap",
    marginBottom: 2,
  },
  title: {
    ...text.bodyLg,
    color: colors.text.primary,
    fontWeight: "700",
  },
  description: {
    ...text.small,
    color: colors.text.muted,
  },
  cta: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  lockOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(15,26,34,0.7)",
  },
  lockBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: "rgba(40,28,10,0.92)",
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: "rgba(212,179,106,0.45)",
  },
  lockText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.gold.start,
    letterSpacing: 0.4,
    textTransform: "uppercase",
  },
});
