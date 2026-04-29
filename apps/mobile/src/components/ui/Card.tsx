import type { ReactNode } from "react";
import { StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";

import { colors, radius, spacing } from "../../theme";

export type CardVariant = "elevated" | "outlined" | "muted" | "flat";

export function Card({
  children,
  variant = "elevated",
  padded = true,
  style,
}: {
  children: ReactNode;
  variant?: CardVariant;
  padded?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View
      style={[
        styles.base,
        VARIANTS[variant],
        padded && styles.padded,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.xl,
    overflow: "hidden",
  },
  padded: {
    padding: spacing.base,
  },
});

const VARIANTS: Record<CardVariant, ViewStyle> = {
  elevated: {
    backgroundColor: colors.bg.elevated,
    borderWidth: 1,
    borderColor: colors.border.subtle,
  },
  outlined: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.border.subtle,
  },
  muted: {
    backgroundColor: colors.bg.muted,
  },
  flat: {
    backgroundColor: colors.bg.base,
  },
};
