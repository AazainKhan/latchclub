import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ChevronLeft,
  Clock,
  Heart,
  MapPin,
  Phone,
  Star,
} from "lucide-react-native";
import { useEffect, useMemo, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { OfferCard } from "../../src/components/card/OfferCard";
import { Card } from "../../src/components/ui/Card";
import { IconButton } from "../../src/components/ui/IconButton";
import { Section } from "../../src/components/ui/Section";
import { SkeletonGroup } from "../../src/components/ui/Skeleton";
import { Tag } from "../../src/components/ui/Tag";
import { canRedeemOffer } from "../../src/constants/tiers";
import { getMerchant, getOffersForMerchant } from "../../src/data/api";
import type {
  MerchantWithMocks,
  OfferWithMocks,
} from "../../src/data/types";
import { useTier } from "../../src/state/TierContext";
import { colors, radius, spacing, text } from "../../src/theme";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const PHOTO_HEIGHT = SCREEN_WIDTH * 0.92;
const dayKey = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"] as const;

export default function MerchantDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { tier } = useTier();

  const [merchant, setMerchant] = useState<MerchantWithMocks | null>(null);
  const [offers, setOffers] = useState<OfferWithMocks[]>([]);
  const [saved, setSaved] = useState(false);
  const [photoIdx, setPhotoIdx] = useState(0);

  useEffect(() => {
    if (!id) return;
    (async () => {
      const [m, o] = await Promise.all([getMerchant(id), getOffersForMerchant(id)]);
      setMerchant(m);
      setOffers(o);
    })();
  }, [id]);

  const todayHours = useMemo(() => {
    if (!merchant) return null;
    const k = dayKey[new Date().getDay()];
    return merchant.hours[k as keyof typeof merchant.hours];
  }, [merchant]);

  if (!merchant) {
    return (
      <View style={[styles.root, { paddingTop: insets.top + spacing.xl }]}>
        <View style={{ paddingHorizontal: spacing.base }}>
          <SkeletonGroup count={4} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + spacing.xxxl }}
      >
        {/* Photo carousel */}
        <View style={[styles.photoWrap, { height: PHOTO_HEIGHT }]}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(e) => {
              const i = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
              setPhotoIdx(i);
            }}
          >
            {merchant.photos.map((url, i) => (
              <Image
                key={`${url}-${i}`}
                source={{ uri: url }}
                style={{ width: SCREEN_WIDTH, height: PHOTO_HEIGHT }}
                contentFit="cover"
                transition={200}
              />
            ))}
          </ScrollView>
          <LinearGradient
            colors={["rgba(15,26,34,0.8)", "transparent", "rgba(15,26,34,0.85)"]}
            locations={[0, 0.4, 1]}
            style={StyleSheet.absoluteFill}
          />
          {/* Top controls */}
          <View
            style={[
              styles.topControls,
              { top: insets.top + spacing.sm },
            ]}
          >
            <IconButton
              icon={<ChevronLeft size={20} color={colors.text.primary} />}
              accessibilityLabel="Back"
              variant="filled"
              onPress={() => router.back()}
            />
            <IconButton
              icon={
                <Heart
                  size={18}
                  color={saved ? colors.danger : colors.text.primary}
                  fill={saved ? colors.danger : "transparent"}
                />
              }
              accessibilityLabel={saved ? "Unsave" : "Save"}
              variant="filled"
              haptic="select"
              onPress={() => setSaved((s) => !s)}
            />
          </View>
          {/* Photo dots */}
          <View style={styles.dotRow}>
            {merchant.photos.map((_, i) => (
              <View
                key={i}
                style={[
                  styles.dot,
                  i === photoIdx ? styles.dotActive : null,
                ]}
              />
            ))}
          </View>
        </View>

        {/* Info */}
        <View style={styles.body}>
          <View style={styles.titleRow}>
            <Text style={styles.name}>{merchant.name}</Text>
            {merchant.is_founding ? (
              <Tag label="Founding" variant="gold" />
            ) : null}
          </View>
          <View style={styles.metaRow}>
            <Star size={13} color={colors.gold.start} fill={colors.gold.start} />
            <Text style={styles.metaText}>{merchant.rating.toFixed(1)}</Text>
            <Text style={styles.metaDot}>·</Text>
            <Text style={styles.metaText}>{merchant.service_type}</Text>
            <Text style={styles.metaDot}>·</Text>
            <Text style={styles.metaText}>{merchant.neighbourhood}</Text>
          </View>
          <Text style={styles.description}>{merchant.description}</Text>

          {/* Quick info card */}
          <Card variant="outlined" padded={false} style={{ marginTop: spacing.lg }}>
            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Clock size={16} color={colors.teal[400]} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.infoLabel}>Today</Text>
                <Text style={styles.infoValue}>{todayHours ?? "—"}</Text>
              </View>
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <MapPin size={16} color={colors.teal[400]} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.infoLabel}>Address</Text>
                <Text style={styles.infoValue}>
                  {merchant.address_line_1}, {merchant.city}
                </Text>
              </View>
            </View>
            {merchant.phone ? (
              <>
                <View style={styles.infoDivider} />
                <View style={styles.infoRow}>
                  <View style={styles.infoIcon}>
                    <Phone size={16} color={colors.teal[400]} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.infoLabel}>Phone</Text>
                    <Text style={styles.infoValue}>{merchant.phone}</Text>
                  </View>
                </View>
              </>
            ) : null}
          </Card>

          {/* Quote */}
          {merchant.employee_quote ? (
            <View style={styles.quoteWrap}>
              <Text style={styles.quoteMark}>"</Text>
              <Text style={styles.quoteText}>{merchant.employee_quote}</Text>
              <Text style={styles.quoteAttribution}>— {merchant.name} team</Text>
            </View>
          ) : null}

          {/* Offers */}
          <Section
            eyebrow="Coupons"
            title={`${offers.length} offers available`}
            style={{ marginTop: spacing.xxl }}
          >
            <View style={styles.offerList}>
              {offers.map((o) => (
                <OfferCard
                  key={o.id}
                  offer={o}
                  locked={!canRedeemOffer(tier, o.premium_only)}
                  onPress={() => router.push(`/offer/${o.id}`)}
                />
              ))}
            </View>
          </Section>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg.base,
  },
  photoWrap: {
    backgroundColor: colors.bg.muted,
    position: "relative",
  },
  topControls: {
    position: "absolute",
    left: spacing.base,
    right: spacing.base,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dotRow: {
    position: "absolute",
    bottom: spacing.lg,
    alignSelf: "center",
    flexDirection: "row",
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(245,247,247,0.4)",
  },
  dotActive: {
    backgroundColor: colors.text.primary,
    width: 18,
  },
  body: {
    padding: spacing.lg,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    flexWrap: "wrap",
  },
  name: {
    ...text.hero,
    color: colors.text.primary,
    flexShrink: 1,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: spacing.sm,
    flexWrap: "wrap",
  },
  metaText: {
    ...text.smallMedium,
    color: colors.text.secondary,
  },
  metaDot: {
    ...text.smallMedium,
    color: colors.text.muted,
  },
  description: {
    ...text.body,
    color: colors.text.secondary,
    marginTop: spacing.md,
    lineHeight: 22,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.base,
    gap: spacing.md,
  },
  infoIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.teal.soft,
    alignItems: "center",
    justifyContent: "center",
  },
  infoLabel: {
    ...text.caption,
    color: colors.text.muted,
  },
  infoValue: {
    ...text.bodyMedium,
    color: colors.text.primary,
    marginTop: 2,
  },
  infoDivider: {
    height: 1,
    backgroundColor: colors.border.subtle,
    marginLeft: spacing.base + 32 + spacing.md,
  },
  quoteWrap: {
    marginTop: spacing.xxl,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    borderLeftWidth: 3,
    borderLeftColor: colors.teal[400],
  },
  quoteMark: {
    fontSize: 36,
    color: colors.teal[400],
    fontWeight: "800",
    lineHeight: 36,
    marginBottom: -4,
  },
  quoteText: {
    ...text.bodyLg,
    color: colors.text.primary,
    fontStyle: "italic",
    lineHeight: 26,
  },
  quoteAttribution: {
    ...text.caption,
    color: colors.text.muted,
    marginTop: spacing.sm,
  },
  offerList: {
    paddingHorizontal: spacing.base,
    gap: spacing.md,
  },
});
