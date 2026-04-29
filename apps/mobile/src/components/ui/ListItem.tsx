import { ChevronRight } from "lucide-react-native";
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
import { colors, spacing, text } from "../../theme";

type Props = Omit<PressableProps, "children" | "style"> & {
  title: string;
  subtitle?: string;
  iconLeft?: ReactNode;
  trailing?: ReactNode;
  showChevron?: boolean;
  destructive?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function ListItem({
  title,
  subtitle,
  iconLeft,
  trailing,
  showChevron = true,
  destructive,
  onPress,
  style,
  ...rest
}: Props) {
  const haptics = useHaptics();

  const handlePress: PressableProps["onPress"] = (e) => {
    haptics.tap();
    onPress?.(e);
  };

  return (
    <Pressable
      onPress={onPress ? handlePress : undefined}
      style={({ pressed }) => [
        styles.row,
        pressed && onPress ? { backgroundColor: "rgba(255,255,255,0.04)" } : null,
        style,
      ]}
      {...rest}
    >
      {iconLeft ? <View style={styles.icon}>{iconLeft}</View> : null}
      <View style={styles.copy}>
        <Text
          style={[
            styles.title,
            destructive && { color: colors.danger },
          ]}
        >
          {title}
        </Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {trailing}
      {showChevron && onPress ? (
        <ChevronRight color={colors.text.muted} size={18} />
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.base,
    gap: spacing.md,
    minHeight: 56,
  },
  icon: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  copy: {
    flex: 1,
    gap: 2,
  },
  title: {
    ...text.bodyMedium,
    color: colors.text.primary,
  },
  subtitle: {
    ...text.small,
    color: colors.text.muted,
  },
});
