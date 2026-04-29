import { useRouter } from "expo-router";
import {
  Bell,
  ChevronRight,
  Globe,
  HelpCircle,
  LogOut,
  Settings,
  Trash2,
} from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { LoyaltyTierCard } from "../../src/components/card/LoyaltyTierCard";
import { MembershipCard } from "../../src/components/card/MembershipCard";
import { Button } from "../../src/components/ui/Button";
import { Card } from "../../src/components/ui/Card";
import { ListItem } from "../../src/components/ui/ListItem";
import { Section } from "../../src/components/ui/Section";
import { SkeletonGroup } from "../../src/components/ui/Skeleton";
import { Tag } from "../../src/components/ui/Tag";
import { TIER_CONFIG } from "../../src/constants/tiers";
import {
  getLoyaltyProgress,
  getProfile,
  getWalletHistory,
} from "../../src/data/api";
import type {
  LoyaltyProgress,
  MockProfile,
  RedemptionRecord,
} from "../../src/data/types";
import { useOnboarding } from "../../src/state/OnboardingContext";
import { useSession } from "../../src/state/SessionContext";
import { useTier } from "../../src/state/TierContext";
import { colors, spacing, text } from "../../src/theme";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

export default function Profile() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const session = useSession();
  const { tier } = useTier();
  const { reset: resetOnboarding } = useOnboarding();
  const [profile, setProfile] = useState<MockProfile | null>(null);
  const [loyalty, setLoyalty] = useState<LoyaltyProgress | null>(null);
  const [history, setHistory] = useState<RedemptionRecord[]>([]);

  useEffect(() => {
    (async () => {
      const [p, l, h] = await Promise.all([
        getProfile(),
        getLoyaltyProgress(),
        getWalletHistory(),
      ]);
      setProfile(p);
      setLoyalty(l);
      setHistory(h);
    })();
  }, []);

  const tierConfig = TIER_CONFIG[tier];

  const handleSignOut = () => {
    Alert.alert("Sign out?", "You'll need to sign in again to redeem.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign out",
        style: "destructive",
        onPress: async () => {
          await session.signOut();
          router.replace("/(onboarding)/welcome");
        },
      },
    ]);
  };

  if (!profile || !loyalty) {
    return (
      <View style={[styles.root, { paddingTop: insets.top + spacing.lg }]}>
        <View style={{ paddingHorizontal: spacing.base }}>
          <SkeletonGroup count={5} />
        </View>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={[
        styles.content,
        { paddingTop: insets.top + spacing.md, paddingBottom: insets.bottom + 96 },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.headerRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.eyebrow}>Profile</Text>
          <Text style={styles.title}>{profile.full_name}</Text>
        </View>
        <Tag label={tierConfig.label} variant={tier === "premium" ? "gold" : "teal"} />
      </View>

      <View style={styles.cardWrap}>
        <MembershipCard
          memberName={profile.full_name}
          memberId={profile.id.slice(-6).toUpperCase()}
          tierLabel={tierConfig.label}
          memberSince={formatDate(profile.member_since)}
        />
      </View>

      <View style={styles.statsRow}>
        <Card variant="muted" style={styles.statCard}>
          <Text style={styles.statValue}>{profile.points_balance.toLocaleString()}</Text>
          <Text style={styles.statLabel}>Points</Text>
        </Card>
        <Card variant="muted" style={styles.statCard}>
          <Text style={styles.statValue}>{profile.redemptions_count}</Text>
          <Text style={styles.statLabel}>Redeemed</Text>
        </Card>
        <Card variant="muted" style={styles.statCard}>
          <Text style={styles.statValue}>{loyalty.tier}</Text>
          <Text style={styles.statLabel}>Tier</Text>
        </Card>
      </View>

      <View style={{ paddingHorizontal: spacing.base }}>
        <LoyaltyTierCard progress={loyalty} />
      </View>

      <Section eyebrow="Wallet" title="Recent redemptions">
        {history.length === 0 ? (
          <Text style={styles.empty}>No redemptions yet.</Text>
        ) : (
          <Card padded={false} style={{ marginHorizontal: spacing.base }}>
            {history.slice(0, 5).map((r, i) => (
              <View
                key={r.id}
                style={[
                  styles.historyRow,
                  i < history.length - 1 && i < 4 ? styles.historyRowBorder : null,
                ]}
              >
                <View style={{ flex: 1, gap: 4 }}>
                  <Text style={styles.historyTitle} numberOfLines={1}>
                    {r.offer_title}
                  </Text>
                  <Text style={styles.historyMeta} numberOfLines={1}>
                    {r.merchant_name} · {r.merchant_neighbourhood}
                  </Text>
                </View>
                <View style={styles.historyRight}>
                  <Text style={styles.historyPoints}>+{r.points_earned}</Text>
                  <Text style={styles.historyDate}>{formatDate(r.redeemed_at)}</Text>
                </View>
              </View>
            ))}
          </Card>
        )}
      </Section>

      <Section eyebrow="Settings" title="Preferences">
        <Card padded={false} style={{ marginHorizontal: spacing.base }}>
          <ListItem
            title="Subscription"
            subtitle={tierConfig.label}
            iconLeft={<Settings size={18} color={colors.text.secondary} />}
            onPress={() => router.push("/settings/subscription")}
          />
          <View style={styles.divider} />
          <ListItem
            title="Notifications"
            iconLeft={<Bell size={18} color={colors.text.secondary} />}
            onPress={() => router.push("/settings/notifications")}
          />
          <View style={styles.divider} />
          <ListItem
            title="Language"
            subtitle="English"
            iconLeft={<Globe size={18} color={colors.text.secondary} />}
            onPress={() => router.push("/settings/language")}
          />
          <View style={styles.divider} />
          <ListItem
            title="Currency"
            subtitle="CAD"
            iconLeft={<Globe size={18} color={colors.text.secondary} />}
            onPress={() => router.push("/settings/currency")}
          />
          <View style={styles.divider} />
          <ListItem
            title="Help & support"
            iconLeft={<HelpCircle size={18} color={colors.text.secondary} />}
            onPress={() => router.push("/settings")}
            trailing={
              <ChevronRight size={18} color={colors.text.muted} />
            }
            showChevron={false}
          />
          <View style={styles.divider} />
          <ListItem
            title="Delete account"
            iconLeft={<Trash2 size={18} color={colors.danger} />}
            destructive
            onPress={() => router.push("/settings/delete-account")}
          />
        </Card>
      </Section>

      <View style={styles.signOutWrap}>
        <Button
          label="Sign out"
          variant="secondary"
          iconLeft={<LogOut size={16} color={colors.text.primary} />}
          onPress={handleSignOut}
          fullWidth
        />
        {__DEV__ ? (
          <Button
            label="Reset onboarding (dev)"
            variant="ghost"
            size="sm"
            fullWidth
            onPress={() => {
              Alert.alert(
                "Reset onboarding?",
                "This signs you out and clears the onboarded flag so you re-enter the welcome flow.",
                [
                  { text: "Cancel", style: "cancel" },
                  {
                    text: "Reset",
                    style: "destructive",
                    onPress: async () => {
                      await session.signOut();
                      await resetOnboarding();
                      router.replace("/(onboarding)/welcome");
                    },
                  },
                ],
              );
            }}
          />
        ) : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg.base,
  },
  content: {
    gap: spacing.xl,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.base,
    gap: spacing.md,
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
  cardWrap: {
    alignItems: "center",
  },
  statsRow: {
    flexDirection: "row",
    gap: spacing.sm,
    paddingHorizontal: spacing.base,
  },
  statCard: {
    flex: 1,
    alignItems: "center",
    paddingVertical: spacing.lg,
    gap: 4,
  },
  statValue: {
    ...text.title,
    color: colors.text.primary,
    fontVariant: ["tabular-nums"],
  },
  statLabel: {
    ...text.caption,
    color: colors.text.muted,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border.subtle,
    marginLeft: spacing.base + 28 + spacing.md,
  },
  historyRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.base,
    gap: spacing.md,
  },
  historyRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border.subtle,
  },
  historyTitle: {
    ...text.bodyMedium,
    color: colors.text.primary,
  },
  historyMeta: {
    ...text.small,
    color: colors.text.muted,
  },
  historyRight: {
    alignItems: "flex-end",
    gap: 2,
  },
  historyPoints: {
    ...text.bodyMedium,
    color: colors.teal[300],
    fontVariant: ["tabular-nums"],
  },
  historyDate: {
    ...text.small,
    color: colors.text.muted,
  },
  empty: {
    ...text.body,
    color: colors.text.muted,
    textAlign: "center",
    paddingHorizontal: spacing.base,
  },
  signOutWrap: {
    paddingHorizontal: spacing.base,
  },
});
