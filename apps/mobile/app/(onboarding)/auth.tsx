import * as AppleAuthentication from "expo-apple-authentication";
import { useRouter } from "expo-router";
import { Mail } from "lucide-react-native";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button } from "../../src/components/ui/Button";
import { Input } from "../../src/components/ui/Input";
import { useAppleSignIn } from "../../src/hooks/useAppleSignIn";
import { useHaptics } from "../../src/hooks/useHaptics";
import { supabase } from "../../src/lib/supabase";
import { useOnboarding } from "../../src/state/OnboardingContext";
import { useSession } from "../../src/state/SessionContext";
import { colors, spacing, text } from "../../src/theme";

type Mode = "sign-in" | "sign-up";

export default function Auth() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const haptics = useHaptics();
  const { setAppleShell } = useSession();
  const { markOnboarded } = useOnboarding();
  const apple = useAppleSignIn();

  const [mode, setMode] = useState<Mode>("sign-in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleEmailSubmit = async () => {
    if (!email || !password) {
      Alert.alert("Missing details", "Email and password are required.");
      return;
    }
    setSubmitting(true);
    try {
      if (mode === "sign-up") {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        Alert.alert(
          "Check your email",
          "If confirmation is enabled, confirm via email then sign in.",
        );
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        haptics.success();
        await markOnboarded();
        router.replace("/(tabs)/home");
      }
    } catch (err: any) {
      haptics.error();
      Alert.alert("Authentication failed", err?.message ?? "Unknown error.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleApple = async () => {
    haptics.tap();
    const session = await apple.signIn();
    if (session) {
      setAppleShell(true);
      haptics.success();
      await markOnboarded();
      router.replace("/(tabs)/home");
    }
  };

  const handleBrowseFirst = async () => {
    haptics.tap();
    await markOnboarded();
    router.replace("/(tabs)/home");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        style={styles.root}
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + spacing.xxl, paddingBottom: insets.bottom + spacing.xl },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.head}>
          <Text style={styles.eyebrow}>
            {mode === "sign-up" ? "Create account" : "Welcome back"}
          </Text>
          <Text style={styles.title}>
            {mode === "sign-up" ? "Join the club." : "Sign in to redeem."}
          </Text>
        </View>

        {/* Apple */}
        {apple.available ? (
          <AppleAuthentication.AppleAuthenticationButton
            buttonType={
              mode === "sign-up"
                ? AppleAuthentication.AppleAuthenticationButtonType.SIGN_UP
                : AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN
            }
            buttonStyle={
              AppleAuthentication.AppleAuthenticationButtonStyle.WHITE
            }
            cornerRadius={20}
            style={styles.appleButton}
            onPress={handleApple}
          />
        ) : null}

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or with email</Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.fields}>
          <Input
            label="Email"
            placeholder="you@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            value={email}
            onChangeText={setEmail}
          />
          <Input
            label="Password"
            placeholder="••••••••"
            secureTextEntry
            autoComplete="password"
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <Button
          label={mode === "sign-up" ? "Create account" : "Sign in"}
          variant="primary"
          size="lg"
          fullWidth
          loading={submitting}
          iconLeft={<Mail size={16} color={colors.bg.base} />}
          onPress={handleEmailSubmit}
        />

        <View style={styles.footerRow}>
          <Text style={styles.footerCopy}>
            {mode === "sign-up" ? "Already have an account?" : "New to LatchClub?"}
          </Text>
          <Text
            onPress={() => setMode((m) => (m === "sign-up" ? "sign-in" : "sign-up"))}
            style={styles.footerLink}
            suppressHighlighting
          >
            {mode === "sign-up" ? "Sign in" : "Sign up"}
          </Text>
        </View>

        <Button
          label="Browse first"
          variant="ghost"
          size="md"
          fullWidth
          onPress={handleBrowseFirst}
          style={{ marginTop: spacing.xl }}
        />

        {mode === "sign-up" ? (
          <Text
            onPress={() => router.push("/(onboarding)/student-verify")}
            style={styles.studentLink}
            suppressHighlighting
          >
            Are you a student or senior? Verify for the discounted rate.
          </Text>
        ) : null}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg.base,
  },
  content: {
    paddingHorizontal: spacing.lg,
    gap: spacing.lg,
  },
  head: {
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  eyebrow: {
    ...text.caption,
    color: colors.teal[400],
  },
  title: {
    ...text.titleLg,
    color: colors.text.primary,
  },
  appleButton: {
    height: 52,
    width: "100%",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border.subtle,
  },
  dividerText: {
    ...text.caption,
    color: colors.text.muted,
  },
  fields: {
    gap: spacing.md,
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
  },
  footerCopy: {
    ...text.small,
    color: colors.text.muted,
  },
  footerLink: {
    ...text.smallMedium,
    color: colors.teal[300],
  },
  studentLink: {
    ...text.small,
    color: colors.text.muted,
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
