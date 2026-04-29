import { Bell } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useRouter } from "expo-router";

import { MerchantCard } from "../../src/components/card/MerchantCard";
import { IconButton } from "../../src/components/ui/IconButton";
import { Section } from "../../src/components/ui/Section";
import { SkeletonGroup } from "../../src/components/ui/Skeleton";
import { getMerchants, getOffersForMerchant } from "../../src/data/api";
import type { MerchantWithMocks, OfferWithMocks } from "../../src/data/types";
import { useHaptics } from "../../src/hooks/useHaptics";
import { colors, spacing, text } from "../../src/theme";

const dateLabel = (d: Date) =>
  d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

export default function Home() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const haptics = useHaptics();
  const [merchants, setMerchants] = useState<MerchantWithMocks[] | null>(null);
  const [offers, setOffers] = useState<Record<string, OfferWithMocks[]>>({});
  const [refreshing, setRefreshing] = useState(false);

  const load = async () => {
    const list = await getMerchants();
    const offerMap: Record<string, OfferWithMocks[]> = {};
    await Promise.all(
      list.map(async (m) => {
        offerMap[m.id] = await getOffersForMerchant(m.id);
      }),
    );
    setMerchants(list);
    setOffers(offerMap);
  };

  useEffect(() => {
    load();
  }, []);

  const onRefresh = async () => {
    haptics.bump();
    setRefreshing(true);
    await load();
    setRefreshing(false);
  };

  if (!merchants) {
    return (
      <View style={[styles.root, { paddingTop: insets.top + spacing.lg }]}>
        <View style={{ paddingHorizontal: spacing.base, gap: spacing.lg }}>
          <SkeletonGroup count={1} />
          <SkeletonGroup count={4} />
        </View>
      </View>
    );
  }

  const featured = merchants[0];
  const featuredOffer = offers[featured.id]?.[0];
  const dropped = merchants.slice(1, 4);
  const nearYou = merchants.slice(2, 6);
  const curated = merchants.slice(4, 10);

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={[
        styles.content,
        { paddingTop: insets.top + spacing.md, paddingBottom: insets.bottom + 96 },
      ]}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={colors.teal[400]}
        />
      }
    >
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text style={styles.eyebrow}>Tonight in Toronto</Text>
          <Text style={styles.title}>{dateLabel(new Date())}</Text>
        </View>
        <IconButton
          icon={<Bell size={18} color={colors.text.primary} />}
          accessibilityLabel="Notifications"
          variant="filled"
        />
      </View>

      <View style={{ paddingHorizontal: spacing.base }}>
        <MerchantCard
          merchant={featured}
          topOfferLabel={featuredOffer?.title}
          onPress={() => router.push(`/merchant/${featured.id}`)}
          variant="wide"
        />
      </View>

      <Section eyebrow="Just dropped" title="Fresh offers this week">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.hStack}
        >
          {dropped.map((m) => (
            <View key={m.id} style={{ width: 280 }}>
              <MerchantCard
                merchant={m}
                topOfferLabel={offers[m.id]?.[0]?.title}
                onPress={() => router.push(`/merchant/${m.id}`)}
              />
            </View>
          ))}
        </ScrollView>
      </Section>

      <Section eyebrow="Near you" title="Around the corner">
        <View style={styles.vStack}>
          {nearYou.map((m) => (
            <MerchantCard
              key={m.id}
              merchant={m}
              topOfferLabel={offers[m.id]?.[0]?.title}
              onPress={() => router.push(`/merchant/${m.id}`)}
              style={{ marginHorizontal: spacing.base }}
            />
          ))}
        </View>
      </Section>

      <Section eyebrow="Curated for you" title="Picks for the weekend">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.hStack}
        >
          {curated.map((m) => (
            <View key={m.id} style={{ width: 280 }}>
              <MerchantCard
                merchant={m}
                topOfferLabel={offers[m.id]?.[0]?.title}
                onPress={() => router.push(`/merchant/${m.id}`)}
              />
            </View>
          ))}
        </ScrollView>
      </Section>
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
  header: {
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
  hStack: {
    gap: spacing.md,
    paddingHorizontal: spacing.base,
  },
  vStack: {
    gap: spacing.md,
  },
});
