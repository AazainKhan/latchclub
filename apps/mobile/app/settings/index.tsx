import { Stack, useRouter } from "expo-router";
import {
  Bell,
  CreditCard,
  Globe,
  Languages,
  Trash2,
} from "lucide-react-native";
import { ScrollView, StyleSheet, View } from "react-native";

import { Card } from "../../src/components/ui/Card";
import { ListItem } from "../../src/components/ui/ListItem";
import { Section } from "../../src/components/ui/Section";
import { TIER_CONFIG } from "../../src/constants/tiers";
import { useTier } from "../../src/state/TierContext";
import { colors, spacing } from "../../src/theme";

export default function SettingsHub() {
  const router = useRouter();
  const { tier } = useTier();

  return (
    <>
      <Stack.Screen options={{ title: "Settings" }} />
      <ScrollView
        style={styles.root}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Section eyebrow="Account" title="Membership">
          <Card padded={false} style={styles.card}>
            <ListItem
              title="Subscription"
              subtitle={TIER_CONFIG[tier].label}
              iconLeft={<CreditCard size={18} color={colors.teal[300]} />}
              onPress={() => router.push("/settings/subscription")}
            />
          </Card>
        </Section>

        <Section eyebrow="Preferences" title="App">
          <Card padded={false} style={styles.card}>
            <ListItem
              title="Notifications"
              subtitle="Push, email, weekly digest"
              iconLeft={<Bell size={18} color={colors.teal[300]} />}
              onPress={() => router.push("/settings/notifications")}
            />
            <View style={styles.divider} />
            <ListItem
              title="Language"
              subtitle="English"
              iconLeft={<Languages size={18} color={colors.teal[300]} />}
              onPress={() => router.push("/settings/language")}
            />
            <View style={styles.divider} />
            <ListItem
              title="Currency"
              subtitle="CAD"
              iconLeft={<Globe size={18} color={colors.teal[300]} />}
              onPress={() => router.push("/settings/currency")}
            />
          </Card>
        </Section>

        <Section eyebrow="Danger zone" title="Permanent actions">
          <Card padded={false} style={styles.card}>
            <ListItem
              title="Delete account"
              subtitle="Erase all data permanently"
              iconLeft={<Trash2 size={18} color={colors.danger} />}
              destructive
              onPress={() => router.push("/settings/delete-account")}
            />
          </Card>
        </Section>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg.base,
  },
  content: {
    paddingVertical: spacing.lg,
    gap: spacing.xl,
  },
  card: {
    marginHorizontal: spacing.base,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border.subtle,
    marginLeft: spacing.base + 28 + spacing.md,
  },
});
