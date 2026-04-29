import { Stack, useRouter } from "expo-router";
import { AlertTriangle } from "lucide-react-native";
import { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";

import { Button } from "../../src/components/ui/Button";
import { Card } from "../../src/components/ui/Card";
import { Input } from "../../src/components/ui/Input";
import { useHaptics } from "../../src/hooks/useHaptics";
import { useSession } from "../../src/state/SessionContext";
import { colors, radius, spacing, text } from "../../src/theme";

const CONFIRM_PHRASE = "delete";

export default function DeleteAccount() {
  const router = useRouter();
  const haptics = useHaptics();
  const { signOut } = useSession();
  const [phrase, setPhrase] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const canSubmit = phrase.trim().toLowerCase() === CONFIRM_PHRASE;

  const handleDelete = () => {
    haptics.warning();
    Alert.alert(
      "Delete your account?",
      "This is permanent. All redemptions, points, and history will be erased.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            setSubmitting(true);
            try {
              // Mock-only — when live, call supabase.rpc('delete_account') or
              // a confirm_redemption-style edge function.
              await signOut();
              haptics.success();
              router.replace("/(onboarding)/welcome");
            } finally {
              setSubmitting(false);
            }
          },
        },
      ],
    );
  };

  return (
    <>
      <Stack.Screen options={{ title: "Delete account" }} />
      <ScrollView style={styles.root} contentContainerStyle={styles.content}>
        <View style={styles.warningWrap}>
          <View style={styles.warningIcon}>
            <AlertTriangle size={24} color={colors.danger} />
          </View>
          <Text style={styles.title}>This can't be undone.</Text>
          <Text style={styles.body}>
            Your profile, points balance, redemption history, and saved merchants will be permanently deleted.
          </Text>
        </View>

        <Card variant="muted" style={styles.list}>
          <Text style={styles.listTitle}>What gets deleted</Text>
          {[
            "Account profile + email",
            "Redemption history",
            "Loyalty points balance",
            "Saved merchants",
            "Subscription (cancelled at period end)",
          ].map((line) => (
            <Text key={line} style={styles.listLine}>
              · {line}
            </Text>
          ))}
        </Card>

        <View style={styles.confirmWrap}>
          <Input
            label={`Type "${CONFIRM_PHRASE}" to confirm`}
            placeholder={CONFIRM_PHRASE}
            autoCapitalize="none"
            autoCorrect={false}
            value={phrase}
            onChangeText={setPhrase}
          />
          <Button
            label="Delete my account"
            variant="danger"
            size="lg"
            fullWidth
            disabled={!canSubmit}
            loading={submitting}
            onPress={handleDelete}
          />
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg.base },
  content: {
    padding: spacing.lg,
    gap: spacing.xl,
  },
  warningWrap: {
    alignItems: "center",
    gap: spacing.sm,
    paddingVertical: spacing.lg,
  },
  warningIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(229,100,91,0.1)",
    borderWidth: 1,
    borderColor: "rgba(229,100,91,0.3)",
    marginBottom: spacing.sm,
  },
  title: {
    ...text.titleLg,
    color: colors.text.primary,
    textAlign: "center",
  },
  body: {
    ...text.body,
    color: colors.text.muted,
    textAlign: "center",
    maxWidth: 320,
  },
  list: {
    gap: spacing.xs,
  },
  listTitle: {
    ...text.smallMedium,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  listLine: {
    ...text.small,
    color: colors.text.muted,
  },
  confirmWrap: {
    gap: spacing.md,
  },
});
