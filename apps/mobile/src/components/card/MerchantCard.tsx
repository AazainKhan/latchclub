import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Heart, Star } from "lucide-react-native";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import type { MerchantWithMocks } from "../../data/types";
import { useHaptics } from "../../hooks/useHaptics";
import { colors, radius, spacing, text } from "../../theme";
import { Tag } from "../ui/Tag";

type Props = {
  merchant: MerchantWithMocks;
  topOfferLabel?: string;
  saved?: boolean;
  onPress?: () => void;
  onToggleSave?: () => void;
  style?: StyleProp<ViewStyle>;
  variant?: "card" | "wide" | "compact";
};

export function MerchantCard({
  merchant,
  topOfferLabel,
  saved,
  onPress,
  onToggleSave,
  style,
  variant = "card",
}: Props) {
  const haptics = useHaptics();

  if (variant === "wide") {
    return (
      <Pressable
        onPress={() => {
          haptics.tap();
          onPress?.();
        }}
        style={({ pressed }) => [
          styles.wide,
          pressed && { opacity: 0.92 },
          style,
        ]}
      >
        <Image
          source={{ uri: merchant.photos[0] }}
          style={styles.wideImage}
          contentFit="cover"
          transition={200}
        />
        <LinearGradient
          colors={["rgba(15,26,34,0.15)", "transparent", "rgba(15,26,34,0.95)"]}
          locations={[0, 0.35, 1]}
          style={StyleSheet.absoluteFill}
        />
        {topOfferLabel ? (
          <View style={styles.wideOfferTop}>
            <Tag label={topOfferLabel} variant="teal" />
          </View>
        ) : null}
        <View style={styles.wideFooter}>
          <View style={{ flex: 1, gap: 4 }}>
            <Text style={styles.wideName} numberOfLines={1}>
              {merchant.name}
            </Text>
            <View style={styles.metaRow}>
              <Star size={12} color={colors.gold.start} fill={colors.gold.start} />
              <Text style={styles.metaText}>{merchant.rating.toFixed(1)}</Text>
              <Text style={styles.metaDot}>·</Text>
              <Text style={styles.metaText}>{merchant.neighbourhood}</Text>
            </View>
          </View>
        </View>
      </Pressable>
    );
  }

  if (variant === "compact") {
    return (
      <Pressable
        onPress={() => {
          haptics.tap();
          onPress?.();
        }}
        style={({ pressed }) => [
          styles.compact,
          pressed && { opacity: 0.92 },
          style,
        ]}
      >
        <Image
          source={{ uri: merchant.photos[0] }}
          style={styles.compactImage}
          contentFit="cover"
          transition={150}
        />
        <View style={styles.compactCopy}>
          <Text style={styles.compactName} numberOfLines={1}>
            {merchant.name}
          </Text>
          <Text style={styles.compactMeta} numberOfLines={1}>
            {merchant.neighbourhood} · {merchant.service_type}
          </Text>
        </View>
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={() => {
        haptics.tap();
        onPress?.();
      }}
      style={({ pressed }) => [
        styles.card,
        pressed && { transform: [{ scale: 0.99 }] },
        style,
      ]}
    >
      <View style={styles.imageWrap}>
        <Image
          source={{ uri: merchant.photos[0] }}
          style={styles.image}
          contentFit="cover"
          transition={200}
        />
        <LinearGradient
          colors={["transparent", "rgba(15,26,34,0.6)"]}
          locations={[0.5, 1]}
          style={StyleSheet.absoluteFill}
        />
        {topOfferLabel ? (
          <View style={styles.offerBadge}>
            <Tag label={topOfferLabel} variant="teal" />
          </View>
        ) : null}
        {onToggleSave ? (
          <Pressable
            onPress={() => {
              haptics.select();
              onToggleSave();
            }}
            hitSlop={10}
            style={styles.heartBtn}
          >
            <Heart
              size={18}
              color={saved ? colors.danger : colors.text.primary}
              fill={saved ? colors.danger : "transparent"}
              strokeWidth={2}
            />
          </Pressable>
        ) : null}
      </View>

      <View style={styles.body}>
        <View style={{ flex: 1, gap: 2 }}>
          <Text style={styles.name} numberOfLines={1}>
            {merchant.name}
          </Text>
          <Text style={styles.meta} numberOfLines={1}>
            {merchant.neighbourhood} · {merchant.service_type}
          </Text>
        </View>
        <View style={styles.rating}>
          <Star size={12} color={colors.gold.start} fill={colors.gold.start} />
          <Text style={styles.ratingText}>{merchant.rating.toFixed(1)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  // Default card (shown in feed)
  card: {
    backgroundColor: colors.bg.elevated,
    borderRadius: radius.xl,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.border.subtle,
  },
  imageWrap: {
    aspectRatio: 16 / 10,
    width: "100%",
    backgroundColor: colors.bg.muted,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  offerBadge: {
    position: "absolute",
    top: spacing.md,
    left: spacing.md,
  },
  heartBtn: {
    position: "absolute",
    top: spacing.md,
    right: spacing.md,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(0,0,0,0.45)",
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.base,
    gap: spacing.md,
  },
  name: {
    ...text.bodyLg,
    color: colors.text.primary,
    fontWeight: "700",
  },
  meta: {
    ...text.small,
    color: colors.text.muted,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.pill,
    backgroundColor: "rgba(255,255,255,0.06)",
  },
  ratingText: {
    ...text.smallMedium,
    color: colors.text.primary,
  },

  // Wide / hero variant
  wide: {
    width: "100%",
    aspectRatio: 16 / 10,
    borderRadius: radius.xxl,
    overflow: "hidden",
    backgroundColor: colors.bg.elevated,
    position: "relative",
  },
  wideImage: {
    width: "100%",
    height: "100%",
  },
  wideOfferTop: {
    position: "absolute",
    top: spacing.lg,
    left: spacing.lg,
  },
  wideFooter: {
    position: "absolute",
    left: spacing.lg,
    right: spacing.lg,
    bottom: spacing.lg,
    flexDirection: "row",
    alignItems: "flex-end",
    gap: spacing.md,
  },
  wideName: {
    ...text.titleLg,
    color: colors.text.primary,
    textShadowColor: "rgba(0,0,0,0.55)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  metaText: {
    ...text.smallMedium,
    color: colors.text.secondary,
  },
  metaDot: {
    ...text.smallMedium,
    color: colors.text.muted,
  },

  // Compact (used inside lists / map sheets)
  compact: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: colors.bg.elevated,
    borderWidth: 1,
    borderColor: colors.border.subtle,
  },
  compactImage: {
    width: 56,
    height: 56,
    borderRadius: radius.md,
    backgroundColor: colors.bg.muted,
  },
  compactCopy: {
    flex: 1,
    gap: 2,
  },
  compactName: {
    ...text.bodyMedium,
    color: colors.text.primary,
  },
  compactMeta: {
    ...text.small,
    color: colors.text.muted,
  },
});
