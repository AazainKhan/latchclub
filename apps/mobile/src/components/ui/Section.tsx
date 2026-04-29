import type { ReactNode } from "react";
import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from "react-native";

import { colors, spacing, text } from "../../theme";

export function Section({
  eyebrow,
  title,
  subtitle,
  children,
  trailing,
  style,
}: {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  trailing?: ReactNode;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  const hasHeader = eyebrow || title || subtitle || trailing;
  return (
    <View style={[styles.root, style]}>
      {hasHeader ? (
        <View style={styles.head}>
          <View style={styles.headCopy}>
            {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
            {title ? <Text style={styles.title}>{title}</Text> : null}
            {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
          </View>
          {trailing ? <View>{trailing}</View> : null}
        </View>
      ) : null}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    gap: spacing.md,
  },
  head: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: spacing.sm,
    paddingHorizontal: spacing.base,
  },
  headCopy: {
    flex: 1,
    gap: 4,
  },
  eyebrow: {
    ...text.caption,
    color: colors.teal[400],
  },
  title: {
    ...text.title,
    color: colors.text.primary,
  },
  subtitle: {
    ...text.small,
    color: colors.text.muted,
  },
});
