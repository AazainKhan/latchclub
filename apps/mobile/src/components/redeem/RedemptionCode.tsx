import { StyleSheet, Text, View } from "react-native";

import { colors, spacing, text } from "../../theme";

export function RedemptionCode({ code }: { code: string }) {
  const grouped = code.match(/.{1,3}/g)?.join(" · ") ?? code;
  return (
    <View style={styles.root}>
      <Text style={styles.label}>Or one-time code</Text>
      <Text style={styles.code}>{grouped}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    gap: spacing.xs,
  },
  label: {
    ...text.caption,
    color: colors.text.muted,
  },
  code: {
    ...text.monoBold,
    color: colors.text.primary,
    letterSpacing: 4,
  },
});
