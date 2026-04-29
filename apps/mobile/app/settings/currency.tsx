import { Stack } from "expo-router";
import { Check } from "lucide-react-native";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { Card } from "../../src/components/ui/Card";
import { ListItem } from "../../src/components/ui/ListItem";
import { Section } from "../../src/components/ui/Section";
import { useHaptics } from "../../src/hooks/useHaptics";
import { colors, spacing } from "../../src/theme";

const CURRENCIES = [
  { code: "CAD", label: "Canadian Dollar", subtitle: "C$ — Default" },
  { code: "USD", label: "US Dollar", subtitle: "US$" },
  { code: "EUR", label: "Euro", subtitle: "€" },
  { code: "GBP", label: "British Pound", subtitle: "£" },
];

export default function CurrencySettings() {
  const haptics = useHaptics();
  const [selected, setSelected] = useState("CAD");

  return (
    <>
      <Stack.Screen options={{ title: "Currency" }} />
      <ScrollView style={styles.root} contentContainerStyle={styles.content}>
        <Section eyebrow="Display" title="Show prices in">
          <Card padded={false} style={styles.card}>
            {CURRENCIES.map((c, i) => (
              <View key={c.code}>
                <ListItem
                  title={c.label}
                  subtitle={c.subtitle}
                  showChevron={false}
                  trailing={
                    selected === c.code ? (
                      <Check size={18} color={colors.teal[400]} />
                    ) : null
                  }
                  onPress={() => {
                    haptics.select();
                    setSelected(c.code);
                  }}
                />
                {i < CURRENCIES.length - 1 ? <View style={styles.divider} /> : null}
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
  divider: { height: 1, backgroundColor: colors.border.subtle, marginLeft: spacing.base },
});
