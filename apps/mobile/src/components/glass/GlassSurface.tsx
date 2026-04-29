import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import type { ReactNode } from "react";
import { StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";

import { colors, radius } from "../../theme";

export type GlassIntensity = "subtle" | "medium" | "strong";

const INTENSITY: Record<GlassIntensity, number> = {
  subtle: 18,
  medium: 32,
  strong: 60,
};

type CornerRadii = {
  topLeft?: number;
  topRight?: number;
  bottomLeft?: number;
  bottomRight?: number;
};

/**
 * "Liquid glass" surface — a `BlurView` over a soft gradient. Use for tab bars,
 * modal backdrops, sticky headers, and overlays where you want to see what's behind
 * without losing legibility.
 *
 * Pass `corners` for asymmetric radii (e.g. bottom sheet with rounded top, flush bottom).
 */
export function GlassSurface({
  children,
  intensity = "medium",
  rounded = "xl",
  corners,
  bordered = true,
  style,
}: {
  children?: ReactNode;
  intensity?: GlassIntensity;
  rounded?: keyof typeof radius;
  corners?: CornerRadii;
  bordered?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  const r = radius[rounded];
  const cornerStyle: ViewStyle = corners
    ? {
        borderTopLeftRadius: corners.topLeft ?? r,
        borderTopRightRadius: corners.topRight ?? r,
        borderBottomLeftRadius: corners.bottomLeft ?? r,
        borderBottomRightRadius: corners.bottomRight ?? r,
      }
    : { borderRadius: r };

  return (
    <View style={[styles.base, cornerStyle, style]}>
      <BlurView
        intensity={INTENSITY[intensity]}
        tint="dark"
        style={[StyleSheet.absoluteFill, cornerStyle]}
      />
      <LinearGradient
        colors={["rgba(22,32,40,0.55)", "rgba(15,26,34,0.65)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={[StyleSheet.absoluteFill, cornerStyle]}
      />
      {bordered ? (
        <View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            cornerStyle,
            {
              borderWidth: 1,
              borderColor: "rgba(255,255,255,0.14)",
            },
          ]}
        />
      ) : null}
      <View style={styles.inner}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    overflow: "hidden",
    backgroundColor: colors.bg.elevated,
  },
  inner: {
    position: "relative",
    zIndex: 1,
  },
});
