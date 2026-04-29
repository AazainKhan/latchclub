import { useEffect } from "react";
import { StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

import { colors, radius } from "../../theme";

export function Skeleton({
  width,
  height = 16,
  rounded = "sm",
  style,
}: {
  width?: number | `${number}%`;
  height?: number;
  rounded?: keyof typeof radius;
  style?: StyleProp<ViewStyle>;
}) {
  const opacity = useSharedValue(0.5);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(1, { duration: 900, easing: Easing.inOut(Easing.ease) }),
      -1,
      true,
    );
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <Animated.View
      style={[
        styles.base,
        { width, height, borderRadius: radius[rounded] },
        animatedStyle,
        style,
      ]}
    />
  );
}

export function SkeletonGroup({
  count = 3,
  spacing: gap = 8,
  style,
}: {
  count?: number;
  spacing?: number;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View style={[{ gap }, style]}>
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} width={i % 2 === 0 ? "100%" : "70%"} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: colors.bg.muted,
  },
});
