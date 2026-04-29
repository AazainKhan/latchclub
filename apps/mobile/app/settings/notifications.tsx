import { Stack } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Switch, View } from "react-native";

import { Card } from "../../src/components/ui/Card";
import { ListItem } from "../../src/components/ui/ListItem";
import { Section } from "../../src/components/ui/Section";
import { useHaptics } from "../../src/hooks/useHaptics";
import { colors, spacing } from "../../src/theme";

type ToggleKey = "push_offers" | "push_redemption" | "email_weekly" | "email_invites";

const DEFAULTS: Record<ToggleKey, boolean> = {
  push_offers: true,
  push_redemption: true,
  email_weekly: false,
  email_invites: true,
};

const ROWS: Array<{ key: ToggleKey; title: string; subtitle: string; group: "push" | "email" }> = [
  { key: "push_offers", title: "New offers near you", subtitle: "Daily, location-aware", group: "push" },
  { key: "push_redemption", title: "Redemption confirmations", subtitle: "When the merchant scans your code", group: "push" },
  { key: "email_weekly", title: "Weekly digest", subtitle: "Mondays, the best of the week", group: "email" },
  { key: "email_invites", title: "Invites & events", subtitle: "Founding-member-only", group: "email" },
];

export default function NotificationsSettings() {
  const haptics = useHaptics();
  const [state, setState] = useState(DEFAULTS);

  const toggle = (key: ToggleKey) => {
    haptics.select();
    setState((s) => ({ ...s, [key]: !s[key] }));
  };

  const push = ROWS.filter((r) => r.group === "push");
  const email = ROWS.filter((r) => r.group === "email");

  return (
    <>
      <Stack.Screen options={{ title: "Notifications" }} />
      <ScrollView
        style={styles.root}
        contentContainerStyle={styles.content}
      >
        <Section eyebrow="Push" title="On your phone">
          <Card padded={false} style={styles.card}>
            {push.map((r, i) => (
              <View key={r.key}>
                <ListItem
                  title={r.title}
                  subtitle={r.subtitle}
                  showChevron={false}
                  trailing={
                    <Switch
                      value={state[r.key]}
                      onValueChange={() => toggle(r.key)}
                      trackColor={{ true: colors.teal[400], false: colors.border.subtle }}
                      thumbColor={colors.text.primary}
                    />
                  }
                />
                {i < push.length - 1 ? <View style={styles.divider} /> : null}
              </View>
            ))}
          </Card>
        </Section>

        <Section eyebrow="Email" title="Inbox">
          <Card padded={false} style={styles.card}>
            {email.map((r, i) => (
              <View key={r.key}>
                <ListItem
                  title={r.title}
                  subtitle={r.subtitle}
                  showChevron={false}
                  trailing={
                    <Switch
                      value={state[r.key]}
                      onValueChange={() => toggle(r.key)}
                      trackColor={{ true: colors.teal[400], false: colors.border.subtle }}
                      thumbColor={colors.text.primary}
                    />
                  }
                />
                {i < email.length - 1 ? <View style={styles.divider} /> : null}
              </View>
            ))}
          </Card>
        </Section>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg.base },
  content: { paddingVertical: spacing.lg, gap: spacing.xl },
  card: { marginHorizontal: spacing.base },
  divider: {
    height: 1,
    backgroundColor: colors.border.subtle,
    marginLeft: spacing.base,
  },
});
