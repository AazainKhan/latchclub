import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ArrowUp,
  ChevronLeft,
  Crown,
  DollarSign,
  Gift,
  Lock,
  Percent,
  ShieldCheck,
  Tags as TagsIcon,
  type LucideProps,
} from "lucide-react-native";
import { useEffect, useMemo, useState, type ComponentType } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button } from "../../src/components/ui/Button";
import { Card } from "../../src/components/ui/Card";
import { IconButton } from "../../src/components/ui/IconButton";
import { Section } from "../../src/components/ui/Section";
import { SkeletonGroup } from "../../src/components/ui/Skeleton";
import { Tag } from "../../src/components/ui/Tag";
import { canRedeemOffer } from "../../src/constants/tiers";
import { getMerchant, getOffer } from "../../src/data/api";
import type {
  MerchantWithMocks,
  OfferWithMocks,
} from "../../src/data/types";
import { useSession } from "../../src/state/SessionContext";
import { useTier } from "../../src/state/TierContext";
import { colors, radius, spacing, text } from "../../src/theme";

const HERO_HEIGHT = 280;

const OFFER_ICON: Record<OfferWithMocks["offer_type"], ComponentType<LucideProps>> = {
  bogo_item: TagsIcon,
  free_item_with_purchase: Gift,
  fixed_credit: DollarSign,
  percentage_discount: Percent,
  upgrade: ArrowUp,
  exclusive_access: Crown,
};

const formatTime = (s: string | null) => {
  if (!s) return null;
  const [h, m] = s.split(":");
  const hour = parseInt(h ?? "0", 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  const display = ((hour + 11) % 12) + 1;
  return `${display}:${m ?? "00"} ${ampm}`;
};

const dayLabel: Record<string, string> = {
  mon: "Mon",
  tue: "Tue",
  wed: "Wed",
  thu: "Thu",
  fri: "Fri",
  sat: "Sat",
  sun: "Sun",
};

export default function OfferDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { tier, isSubscribed } = useTier();
  const session = useSession();

  const [offer, setOffer] = useState<OfferWithMocks | null>(null);
  const [merchant, setMerchant] = useState<MerchantWithMocks | null>(null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      const o = await getOffer(id);
      setOffer(o);
      if (o?.merchant_id) {
        const m = await getMerchant(o.merchant_id);
        setMerchant(m);
      }
    })();
  }, [id]);

  const validDaysLabel = useMemo(() => {
    if (!offer?.valid_days?.length) return "Daily";
    if (offer.valid_days.length === 7) return "Daily";
    return offer.valid_days.map((d) => dayLabel[d] ?? d).join(", ");
  }, [offer]);

  const validTime = useMemo(() => {
    if (!offer) return null;
    const from = formatTime(offer.valid_from);
    const until = formatTime(offer.valid_until);
    if (!from || !until) return null;
    return `${from} – ${until}`;
  }, [offer]);

  if (!offer) {
    return (
      <View style={[styles.root, { paddingTop: insets.top + spacing.xl }]}>
        <View style={{ paddingHorizontal: spacing.base }}>
          <SkeletonGroup count={4} />
        </View>
      </View>
    );
  }

  const tierLocked = !canRedeemOffer(tier, offer.premium_only);
  const needsAuth = !session.isSignedIn;

  const handleRedeem = () => {
    if (needsAuth || !isSubscribed || tierLocked) {
      router.push("/(modals)/paywall");
      return;
    }
    router.push(`/redeem/${offer.id}`);
  };

  const Icon = OFFER_ICON[offer.offer_type] ?? TagsIcon;
  const isPremium = offer.premium_only;

  return (
    <View style={styles.root}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 + insets.bottom }}
      >
        {/* Brand banner — gradient + icon. Replaces the offer image. */}
        <View style={[styles.hero, { height: HERO_HEIGHT + insets.top }]}>
          <LinearGradient
            colors={
              isPremium
                ? ["#3D2C0F", "rgba(15,26,34,0.6)", colors.bg.base]
                : ["rgba(3,164,147,0.4)", "rgba(15,26,34,0.6)", colors.bg.base]
            }
            locations={[0, 0.65, 1]}
            style={StyleSheet.absoluteFill}
          />
          <View style={[styles.heroTop, { top: insets.top + spacing.sm }]}>
            <IconButton
              icon={<ChevronLeft size={20} color={colors.text.primary} />}
              accessibilityLabel="Back"
              variant="filled"
              onPress={() => router.back()}
            />
            {isPremium ? (
              <Tag label="Premium only" variant="gold" />
            ) : null}
          </View>
          <View style={[styles.heroIconWrap, { paddingTop: insets.top + spacing.xxxl }]}>
            <View
              style={[
                styles.heroIconCircle,
                isPremium && styles.heroIconCirclePremium,
              ]}
            >
              <Icon
                size={42}
                color={isPremium ? colors.gold.start : colors.teal[200]}
                strokeWidth={1.4}
              />
            </View>
          </View>
        </View>

        <View style={styles.body}>
          {merchant ? (
            <Text style={styles.merchantLabel}>{merchant.name}</Text>
          ) : null}
          <Text style={styles.title}>{offer.title}</Text>
          <Text style={styles.description}>{offer.description}</Text>

          <Card variant="outlined" padded={false} style={{ marginTop: spacing.lg }}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Valid days</Text>
              <Text style={styles.detailValue}>{validDaysLabel}</Text>
            </View>
            <View style={styles.detailDivider} />
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Hours</Text>
              <Text style={styles.detailValue}>{validTime ?? "All day"}</Text>
            </View>
            <View style={styles.detailDivider} />
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Redemption</Text>
              <Text style={styles.detailValue}>
                {offer.redemption_kind === "qr" ? "Show QR at the table" : "One-time code"}
              </Text>
            </View>
            {offer.min_spend_cents ? (
              <>
                <View style={styles.detailDivider} />
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Min spend</Text>
                  <Text style={styles.detailValue}>
                    ${(offer.min_spend_cents / 100).toFixed(0)}
                  </Text>
                </View>
              </>
            ) : null}
          </Card>

          <Section
            eyebrow="Terms"
            title="The fine print"
            style={{ marginTop: spacing.xxl }}
          >
            <View style={{ paddingHorizontal: spacing.base }}>
              <Text style={styles.terms}>{offer.terms}</Text>
            </View>
          </Section>

          {tierLocked ? (
            <Card variant="muted" style={styles.lockNotice}>
              <View style={styles.lockHead}>
                <Lock size={16} color={colors.gold.start} />
                <Text style={styles.lockTitle}>Premium-only offer</Text>
              </View>
              <Text style={styles.lockBody}>
                Upgrade to Premium to redeem this exclusive. Tap Redeem to compare plans.
              </Text>
            </Card>
          ) : null}
        </View>
      </ScrollView>

      {/* Sticky Redeem CTA */}
      <View
        style={[
          styles.cta,
          { paddingBottom: insets.bottom + spacing.md },
        ]}
      >
        <View style={styles.ctaInner}>
          <View style={styles.ctaTrust}>
            <ShieldCheck size={14} color={colors.teal[300]} />
            <Text style={styles.ctaTrustText}>
              Verified merchant · Refund-safe
            </Text>
          </View>
          <Button
            label={
              needsAuth
                ? "Sign in to redeem"
                : !isSubscribed
                  ? "Unlock to redeem"
                  : tierLocked
                    ? "Upgrade to redeem"
                    : "Redeem"
            }
            variant={tierLocked ? "gold" : "primary"}
            size="lg"
            fullWidth
            onPress={handleRedeem}
            haptic="thud"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg.base,
  },
  hero: {
    position: "relative",
    backgroundColor: colors.bg.base,
  },
  heroTop: {
    position: "absolute",
    left: spacing.base,
    right: spacing.base,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 2,
  },
  heroIconWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  heroIconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "rgba(3,164,147,0.15)",
    borderWidth: 1,
    borderColor: "rgba(3,164,147,0.4)",
    alignItems: "center",
    justifyContent: "center",
  },
  heroIconCirclePremium: {
    backgroundColor: "rgba(212,179,106,0.12)",
    borderColor: "rgba(212,179,106,0.45)",
  },
  body: {
    padding: spacing.lg,
    marginTop: -spacing.xl,
  },
  merchantLabel: {
    ...text.caption,
    color: colors.teal[400],
  },
  title: {
    ...text.hero,
    color: colors.text.primary,
    marginTop: spacing.xs,
  },
  description: {
    ...text.bodyLg,
    color: colors.text.secondary,
    marginTop: spacing.md,
    lineHeight: 24,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: spacing.base,
    gap: spacing.md,
  },
  detailDivider: {
    height: 1,
    backgroundColor: colors.border.subtle,
    marginHorizontal: spacing.base,
  },
  detailLabel: {
    ...text.smallMedium,
    color: colors.text.muted,
  },
  detailValue: {
    ...text.bodyMedium,
    color: colors.text.primary,
    flex: 1,
    textAlign: "right",
  },
  terms: {
    ...text.body,
    color: colors.text.muted,
    lineHeight: 22,
  },
  lockNotice: {
    marginTop: spacing.xl,
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: "rgba(212,179,106,0.4)",
  },
  lockHead: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  lockTitle: {
    ...text.bodyMedium,
    color: colors.gold.start,
  },
  lockBody: {
    ...text.small,
    color: colors.text.secondary,
    lineHeight: 20,
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
  ctaInner: {
    gap: spacing.md,
  },
  ctaTrust: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    alignSelf: "center",
  },
  ctaTrustText: {
    ...text.caption,
    color: colors.teal[300],
    letterSpacing: 0.6,
  },
});
