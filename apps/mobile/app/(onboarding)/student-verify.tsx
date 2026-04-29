import { useRouter } from "expo-router";
import { ChevronLeft, Clock, GraduationCap } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button } from "../../src/components/ui/Button";
import { Card } from "../../src/components/ui/Card";
import { IconButton } from "../../src/components/ui/IconButton";
import { Tag } from "../../src/components/ui/Tag";
import { colors, spacing, text } from "../../src/theme";

export default function StudentVerify() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={[styles.root, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <View style={styles.topRow}>
        <IconButton
          icon={<ChevronLeft size={20} color={colors.text.primary} />}
          accessibilityLabel="Back"
          variant="ghost"
          onPress={() => router.back()}
        />
      </View>

      <View style={styles.content}>
        <View style={styles.iconRing}>
          <GraduationCap size={36} color={colors.teal[300]} strokeWidth={1.6} />
        </View>
        <Text style={styles.eyebrow}>Student / Senior</Text>
        <Text style={styles.title}>Verification pending</Text>
        <Text style={styles.body}>
          Hold tight — verification is rolling out next month. We'll notify you the moment it goes live, and apply your discounted rate from your first redemption.
        </Text>

        <Card variant="muted" style={styles.statusCard}>
          <View style={styles.statusHead}>
            <Clock size={14} color={colors.warning} />
            <Text style={styles.statusLabel}>Status</Text>
            <Tag label="Coming soon" variant="warning" />
          </View>
          <Text style={styles.statusBody}>
            ID upload via your school's .edu / institutional email. No documents needed for the standard plan in the meantime.
          </Text>
        </Card>
      </View>

      <View style={styles.cta}>
        <Button
          label="Continue with standard rate"
          variant="primary"
          size="lg"
          fullWidth
          onPress={() => router.back()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg.base,
    paddingHorizontal: spacing.lg,
  },
  topRow: {
    paddingTop: spacing.sm,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.md,
    paddingHorizontal: spacing.md,
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
    marginBottom: spacing.md,
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
    ...text.body,
    color: colors.text.muted,
    textAlign: "center",
    maxWidth: 360,
    lineHeight: 22,
  },
  statusCard: {
    width: "100%",
    marginTop: spacing.lg,
    gap: spacing.sm,
  },
  statusHead: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  statusLabel: {
    ...text.smallMedium,
    color: colors.text.primary,
    flex: 1,
  },
  statusBody: {
    ...text.small,
    color: colors.text.muted,
    lineHeight: 20,
  },
  cta: {
    paddingBottom: spacing.lg,
  },
});
