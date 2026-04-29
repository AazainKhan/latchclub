import type { ReactNode } from "react";
import {
  Pressable,
  StyleSheet,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import { useHaptics } from "../../hooks/useHaptics";
import { colors, radius } from "../../theme";

export type IconButtonVariant = "filled" | "ghost" | "tinted";
export type IconButtonSize = "sm" | "md" | "lg";

type Props = Omit<PressableProps, "children" | "style"> & {
  icon: ReactNode;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  haptic?: "tap" | "bump" | "thud" | "select" | "none";
  accessibilityLabel: string;
  style?: StyleProp<ViewStyle>;
};

export function IconButton({
  icon,
  variant = "ghost",
  size = "md",
  haptic = "tap",
  onPress,
  style,
  ...rest
}: Props) {
  const haptics = useHaptics();
  const dim = SIZES[size];

  const handlePress: PressableProps["onPress"] = (e) => {
    if (haptic !== "none") haptics[haptic]();
    onPress?.(e);
  };

  return (
    <Pressable
      onPress={handlePress}
      hitSlop={8}
      style={({ pressed }) => [
        styles.base,
        VARIANTS[variant],
        { width: dim, height: dim, borderRadius: dim / 2 },
        pressed && { transform: [{ scale: 0.92 }], opacity: 0.85 },
        style,
      ]}
      {...rest}
    >
      {icon}
    </Pressable>
  );
}

const SIZES: Record<IconButtonSize, number> = {
  sm: 32,
  md: 40,
  lg: 48,
};

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    justifyContent: "center",
  },
});

const VARIANTS: Record<IconButtonVariant, ViewStyle> = {
  filled: {
    backgroundColor: colors.bg.elevated,
    borderWidth: 1,
    borderColor: colors.border.subtle,
  },
  ghost: {
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  tinted: {
    backgroundColor: colors.teal.soft,
    borderRadius: radius.pill,
  },
};
