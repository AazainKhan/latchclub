import { StyleSheet, Text, View } from "react-native";

import { colors, spacing, text } from "../../theme";

/** Tiny helper used by route stubs during scaffold. Replaced with real screens. */
export function Placeholder({ title, body }: { title: string; body?: string }) {
  return (
    <View style={styles.root}>
      <Text style={styles.tag}>route</Text>
      <Text style={styles.title}>{title}</Text>
      {body ? <Text style={styles.body}>{body}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg.base,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.xl,
    gap: spacing.sm,
  },
  tag: {
    ...text.caption,
    color: colors.teal[400],
  },
  title: {
    ...text.titleLg,
    color: colors.text.primary,
    textAlign: "center",
  },
  body: {
    ...text.body,
    color: colors.text.muted,
    textAlign: "center",
  },
});
