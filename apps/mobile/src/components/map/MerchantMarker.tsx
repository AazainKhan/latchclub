import { Coffee, Dog, Sparkles, Ticket } from "lucide-react-native";
import { StyleSheet, View } from "react-native";

import { colors } from "../../theme";

export type MarkerCategory = "dining" | "wellness" | "pet_care" | "activities";

const ICONS: Record<MarkerCategory, React.ComponentType<any>> = {
  dining: Coffee,
  wellness: Sparkles,
  pet_care: Dog,
  activities: Ticket,
};

const COLORS: Record<MarkerCategory, string> = {
  dining: "#F0B065",
  wellness: colors.teal[300],
  pet_care: "#B7C8E8",
  activities: "#E5645B",
};

/**
 * Custom merchant pin used inside `<Marker>`. No animated children — keeps the
 * react-native-maps + new-arch bridge stable on Expo Go.
 */
export function MerchantMarker({
  category,
  active,
  dimmed,
}: {
  category: MarkerCategory;
  active?: boolean;
  dimmed?: boolean;
}) {
  const Icon = ICONS[category];
  const tint = COLORS[category];
  return (
    <View
      style={[
        styles.outer,
        active && styles.outerActive,
        { borderColor: active ? colors.text.primary : "rgba(0,0,0,0.35)" },
        dimmed && { opacity: 0.45 },
      ]}
    >
      <View style={[styles.inner, { backgroundColor: tint }]}>
        <Icon size={16} color={"#0F1A22"} strokeWidth={2.5} />
      </View>
      <View style={styles.tail} />
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    width: 44,
    height: 56,
    alignItems: "center",
  },
  outerActive: {
    transform: [{ scale: 1.1 }],
  },
  inner: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    borderWidth: 2,
    borderColor: "white",
  },
  tail: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 8,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "white",
    marginTop: -2,
  },
});
