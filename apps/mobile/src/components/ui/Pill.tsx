import type { ReactNode } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import { useHaptics } from "../../hooks/useHaptics";
import { colors, radius, spacing, text } from "../../theme";

export type PillVariant = "default" | "active" | "tinted" | "outlined";

type Props = Omit<PressableProps, "children" | "style"> & {
  label: string;
  variant?: PillVariant;
  iconLeft?: ReactNode;
  active?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function Pill({
  label,
  variant = "default",
  iconLeft,
  active,
  onPress,
  style,
  ...rest
}: Props) {
  const haptics = useHaptics();
  const isActive = active ?? variant === "active";
  const resolvedVariant: PillVariant = isActive ? "active" : variant;

  const handlePress: PressableProps["onPress"] = (e) => {
    haptics.select();
    onPress?.(e);
  };

  if (!onPress) {
    return (
      <View style={[styles.base, VARIANTS[resolvedVariant], style]}>
        {iconLeft}
        <Text style={[styles.label, { color: LABEL_COLOR[resolvedVariant] }]}>
          {label}
        </Text>
      </View>
    );
  }

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.base,
        VARIANTS[resolvedVariant],
        pressed && { transform: [{ scale: 0.97 }] },
        style,
      ]}
      {...rest}
    >
      {iconLeft}
      <Text style={[styles.label, { color: LABEL_COLOR[resolvedVariant] }]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: spacing.md,
    height: 32,
    borderRadius: radius.pill,
  },
  label: {
    ...text.smallMedium,
  },
});

const VARIANTS: Record<PillVariant, ViewStyle> = {
  default: {
    backgroundColor: colors.bg.muted,
    borderWidth: 1,
    borderColor: colors.border.subtle,
  },
  active: {
    backgroundColor: colors.teal[400],
  },
  tinted: {
    backgroundColor: colors.teal.soft,
    borderWidth: 1,
    borderColor: "rgba(3,164,147,0.5)",
  },
  outlined: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.border.subtle,
  },
};

const LABEL_COLOR: Record<PillVariant, string> = {
  default: colors.text.secondary,
  active: colors.bg.base,
  tinted: colors.teal[300],
  outlined: colors.text.muted,
};
