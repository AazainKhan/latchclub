import { LinearGradient } from "expo-linear-gradient";
import { forwardRef, type ReactNode } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
  type PressableProps,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from "react-native";

import { useHaptics } from "../../hooks/useHaptics";
import { colors, radius, spacing, text } from "../../theme";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "gold" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

type Props = Omit<PressableProps, "style" | "children"> & {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  fullWidth?: boolean;
  haptic?: "tap" | "bump" | "thud" | "select" | "none";
  style?: StyleProp<ViewStyle>;
};

export const Button = forwardRef<View, Props>(function Button(
  {
    label,
    variant = "primary",
    size = "md",
    loading,
    disabled,
    iconLeft,
    iconRight,
    fullWidth,
    haptic = "thud",
    style,
    onPress,
    ...rest
  },
  ref,
) {
  const haptics = useHaptics();

  const handlePress: PressableProps["onPress"] = (e) => {
    if (haptic !== "none") haptics[haptic]();
    onPress?.(e);
  };

  const isGold = variant === "gold";
  const sizeStyle = SIZE[size];
  const variantStyle = VARIANTS[variant];
  const labelColor = LABEL_COLOR[variant];

  const inner = (
    <View
      style={[
        styles.inner,
        sizeStyle.padding,
        fullWidth && styles.fullWidth,
      ]}
    >
      {iconLeft}
      <Text
        style={[
          styles.label,
          sizeStyle.label,
          { color: labelColor },
        ]}
      >
        {label}
      </Text>
      {loading ? (
        <ActivityIndicator color={labelColor} size="small" />
      ) : (
        iconRight
      )}
    </View>
  );

  return (
    <Pressable
      ref={ref}
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled || !!loading }}
      disabled={disabled || loading}
      onPress={handlePress}
      style={({ pressed }) => [
        styles.base,
        sizeStyle.height,
        variantStyle,
        fullWidth && styles.fullWidth,
        pressed && !isGold && { transform: [{ scale: 0.98 }], opacity: 0.92 },
        disabled && { opacity: 0.45 },
        style,
      ]}
      {...rest}
    >
      {isGold ? (
        <LinearGradient
          colors={[colors.gold.start, colors.gold.mid, colors.gold.end]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[StyleSheet.absoluteFill, { borderRadius: radius.lg }]}
        />
      ) : null}
      {inner}
    </Pressable>
  );
});

const SIZE: Record<
  ButtonSize,
  { height: ViewStyle; padding: ViewStyle; label: TextStyle }
> = {
  sm: {
    height: { minHeight: 36 },
    padding: { paddingHorizontal: spacing.base },
    label: { fontSize: 13 },
  },
  md: {
    height: { minHeight: 48 },
    padding: { paddingHorizontal: spacing.lg },
    label: { fontSize: 15 },
  },
  lg: {
    height: { minHeight: 56 },
    padding: { paddingHorizontal: spacing.xl },
    label: { fontSize: 17 },
  },
};

const VARIANTS: Record<ButtonVariant, ViewStyle> = {
  primary: {
    backgroundColor: colors.teal[400],
  },
  secondary: {
    backgroundColor: colors.bg.muted,
    borderWidth: 1,
    borderColor: colors.border.subtle,
  },
  ghost: {
    backgroundColor: "transparent",
  },
  gold: {
    backgroundColor: colors.gold.mid,
    overflow: "hidden",
  },
  danger: {
    backgroundColor: colors.danger,
  },
};

const LABEL_COLOR: Record<ButtonVariant, string> = {
  primary: colors.bg.base,
  secondary: colors.text.primary,
  ghost: colors.teal[400],
  gold: "#241412",
  danger: colors.white,
};

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.lg,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  inner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
  },
  label: {
    ...text.bodyMedium,
    fontWeight: "700",
  },
  fullWidth: {
    alignSelf: "stretch",
  },
});
