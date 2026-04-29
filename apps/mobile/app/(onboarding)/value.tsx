import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Compass, MapPin, QrCode } from "lucide-react-native";
import type { ComponentType } from "react";
import { useRef, useState } from "react";
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button } from "../../src/components/ui/Button";
import { useHaptics } from "../../src/hooks/useHaptics";
import { colors, radius, spacing, text } from "../../src/theme";

const { width: W } = Dimensions.get("window");

type Slide = {
  eyebrow: string;
  title: string;
  body: string;
  Icon: ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;
  glow: string;
};

const SLIDES: Slide[] = [
  {
    eyebrow: "Discover",
    title: "See what's tonight.",
    body: "Curated offers across Toronto's best neighbourhoods — refreshed daily.",
    Icon: Compass,
    glow: "rgba(3,164,147,0.25)",
  },
  {
    eyebrow: "Explore",
    title: "Deals on the map.",
    body: "Find what's near you. Every pin is a handpicked spot worth your night.",
    Icon: MapPin,
    glow: "rgba(212,179,106,0.18)",
  },
  {
    eyebrow: "Redeem",
    title: "One tap at the table.",
    body: "Show the QR, your server scans, the deal applies. No codes, no friction.",
    Icon: QrCode,
    glow: "rgba(3,164,147,0.3)",
  },
];

export default function Value() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const haptics = useHaptics();
  const scrollRef = useRef<ScrollView>(null);
  const [idx, setIdx] = useState(0);

  const goNext = () => {
    haptics.tap();
    if (idx < SLIDES.length - 1) {
      const nextIdx = idx + 1;
      scrollRef.current?.scrollTo({ x: nextIdx * W, animated: true });
      setIdx(nextIdx);
    } else {
      router.push("/(onboarding)/auth");
    }
  };

  const goSkip = () => {
    haptics.tap();
    router.push("/(onboarding)/auth");
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <View style={styles.topRow}>
        <View style={styles.dots}>
          {SLIDES.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, i === idx ? styles.dotActive : null]}
            />
          ))}
        </View>
        <Pressable onPress={goSkip} hitSlop={10}>
          <Text style={styles.skip}>Skip</Text>
        </Pressable>
      </View>

      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const next = Math.round(e.nativeEvent.contentOffset.x / W);
          setIdx(next);
        }}
        style={{ flex: 1 }}
      >
        {SLIDES.map((s, i) => (
          <View key={i} style={[styles.slide, { width: W }]}>
            <LinearGradient
              colors={[s.glow, "transparent"]}
              style={[StyleSheet.absoluteFill]}
            />
            <View style={styles.iconRing}>
              <s.Icon size={36} color={colors.teal[300]} strokeWidth={1.6} />
            </View>
            <Text style={styles.eyebrow}>{s.eyebrow}</Text>
            <Text style={styles.title}>{s.title}</Text>
            <Text style={styles.body}>{s.body}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.cta}>
        <Button
          label={idx === SLIDES.length - 1 ? "Continue" : "Next"}
          variant="primary"
          size="lg"
          fullWidth
          onPress={goNext}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg.base,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  dots: {
    flexDirection: "row",
    gap: 6,
  },
  dot: {
    width: 8,
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(255,255,255,0.18)",
  },
  dotActive: {
    backgroundColor: colors.teal[400],
    width: 22,
  },
  skip: {
    ...text.smallMedium,
    color: colors.text.muted,
  },
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.xl,
    gap: spacing.md,
  },
  iconRing: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.bg.elevated,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.lg,
  },
  eyebrow: {
    ...text.caption,
    color: colors.teal[300],
    letterSpacing: 4,
  },
  title: {
    ...text.hero,
    color: colors.text.primary,
    textAlign: "center",
  },
  body: {
    ...text.bodyLg,
    color: colors.text.muted,
    textAlign: "center",
    maxWidth: 320,
    lineHeight: 24,
  },
  cta: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
});
