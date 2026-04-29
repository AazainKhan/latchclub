import type { ReactNode } from "react";
import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from "react-native";

import { colors, spacing, text } from "../../theme";

export function EmptyState({
  icon,
  title,
  body,
  action,
  style,
}: {
  icon?: ReactNode;
  title: string;
  body?: string;
  action?: ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View style={[styles.root, style]}>
      {icon ? <View style={styles.icon}>{icon}</View> : null}
      <Text style={styles.title}>{title}</Text>
      {body ? <Text style={styles.body}>{body}</Text> : null}
      {action ? <View style={styles.action}>{action}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xxxl,
    gap: spacing.sm,
  },
  icon: {
    marginBottom: spacing.md,
    opacity: 0.5,
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
    maxWidth: 320,
  },
  action: {
    marginTop: spacing.lg,
  },
});
