import { Stack } from "expo-router";
import { Check } from "lucide-react-native";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { Card } from "../../src/components/ui/Card";
import { ListItem } from "../../src/components/ui/ListItem";
import { Section } from "../../src/components/ui/Section";
import { useHaptics } from "../../src/hooks/useHaptics";
import { colors, spacing } from "../../src/theme";

const LANGUAGES = [
  { code: "en", label: "English", subtitle: "Default" },
  { code: "fr", label: "Français", subtitle: "Beta" },
  { code: "es", label: "Español", subtitle: "Coming soon" },
  { code: "zh", label: "中文 (简体)", subtitle: "Coming soon" },
];

export default function LanguageSettings() {
  const haptics = useHaptics();
  const [selected, setSelected] = useState("en");

  return (
    <>
      <Stack.Screen options={{ title: "Language" }} />
      <ScrollView style={styles.root} contentContainerStyle={styles.content}>
        <Section eyebrow="App language" title="Pick your language">
          <Card padded={false} style={styles.card}>
            {LANGUAGES.map((l, i) => (
              <View key={l.code}>
                <ListItem
                  title={l.label}
                  subtitle={l.subtitle}
                  showChevron={false}
                  trailing={
                    selected === l.code ? (
                      <Check size={18} color={colors.teal[400]} />
                    ) : null
                  }
                  onPress={() => {
                    haptics.select();
                    setSelected(l.code);
                  }}
                />
                {i < LANGUAGES.length - 1 ? <View style={styles.divider} /> : null}
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
