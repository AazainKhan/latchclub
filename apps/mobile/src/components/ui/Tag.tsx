import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from "react-native";

import { colors, radius, spacing, text } from "../../theme";

export type TagVariant = "default" | "teal" | "gold" | "warning" | "outline";

export function Tag({
  label,
  variant = "default",
  style,
}: {
  label: string;
  variant?: TagVariant;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View style={[styles.base, VARIANTS[variant], style]}>
      <Text style={[styles.text, { color: TEXT_COLOR[variant] }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.pill,
    alignSelf: "flex-start",
  },
  text: {
    ...text.caption,
  },
});

const VARIANTS: Record<TagVariant, ViewStyle> = {
  default: {
    backgroundColor: "rgba(15,26,34,0.6)",
  },
  teal: {
    // Strong opaque tint so the tag stays legible on busy photos
    backgroundColor: "rgba(3,164,147,0.85)",
    borderWidth: 1,
    borderColor: "rgba(3,164,147,0.95)",
  },
  gold: {
    backgroundColor: "rgba(40,28,10,0.85)",
    borderWidth: 1,
    borderColor: "rgba(212,179,106,0.55)",
  },
  warning: {
    backgroundColor: "rgba(40,28,10,0.7)",
    borderWidth: 1,
    borderColor: "rgba(245,193,108,0.5)",
  },
  outline: {
    borderWidth: 1,
    borderColor: colors.border.subtle,
  },
};

const TEXT_COLOR: Record<TagVariant, string> = {
  default: colors.text.primary,
  teal: colors.bg.base,
  gold: "#F0D79A",
  warning: colors.warning,
  outline: colors.text.muted,
};
