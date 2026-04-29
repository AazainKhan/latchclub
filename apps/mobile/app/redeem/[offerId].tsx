import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { QrTimer } from "../../src/components/redeem/QrTimer";
import { RedemptionCode } from "../../src/components/redeem/RedemptionCode";
import { Button } from "../../src/components/ui/Button";
import { IconButton } from "../../src/components/ui/IconButton";
import { getMerchant, getOffer } from "../../src/data/api";
import type { OfferWithMocks } from "../../src/data/types";
import { useBiometric } from "../../src/hooks/useBiometric";
import { useHaptics } from "../../src/hooks/useHaptics";
import { colors, radius, spacing, text } from "../../src/theme";
import { ChevronLeft } from "lucide-react-native";

const TTL_SECONDS = 10 * 60; // mirrors REDEMPTION_TTL_MINUTES from @latchclub/utils

const generateCode = () =>
  Array.from({ length: 6 })
    .map(() => "ABCDEFGHJKMNPQRSTUVWXYZ23456789"[Math.floor(Math.random() * 31)])
    .join("");

export default function Redeem() {
  const { offerId } = useLocalSearchParams<{ offerId: string }>();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const haptics = useHaptics();
  const biometric = useBiometric();

  const [offer, setOffer] = useState<OfferWithMocks | null>(null);
  const [merchantName, setMerchantName] = useState<string>("");
  const [authStage, setAuthStage] = useState<"pending" | "ok" | "denied">("pending");
  const [confirmed, setConfirmed] = useState(false);
  const codeRef = useRef(generateCode());

  useEffect(() => {
    if (!offerId) return;
    (async () => {
      const o = await getOffer(offerId);
      setOffer(o);
      if (o?.merchant_id) {
        const m = await getMerchant(o.merchant_id);
        setMerchantName(m?.name ?? "");
      }
    })();
  }, [offerId]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const ok = await biometric.authenticate("Confirm to redeem");
      if (!mounted) return;
      if (ok) {
        haptics.success();
        setAuthStage("ok");
      } else {
        haptics.warning();
        setAuthStage("denied");
        setTimeout(() => {
          if (mounted) router.back();
        }, 800);
      }
    })();
    return () => {
      mounted = false;
    };
    // biometric changes only when hardware refresh — fine to depend on once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const payload = useMemo(() => {
    if (!offer) return "";
    return `latchclub://redeem?offer=${offer.id}&code=${codeRef.current}`;
  }, [offer]);

  const handleDone = () => {
    haptics.success();
    setConfirmed(true);
    setTimeout(() => router.back(), 1100);
  };

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={["#03A493", "#0F1A22"]}
        locations={[0, 0.55]}
        style={StyleSheet.absoluteFill}
      />
      <View
        style={[
          styles.topRow,
          { top: insets.top + spacing.sm },
        ]}
      >
        <IconButton
          icon={<ChevronLeft size={20} color={colors.text.primary} />}
          accessibilityLabel="Close"
          variant="filled"
          onPress={() => router.back()}
        />
      </View>

      <View style={styles.content}>
        {authStage === "pending" ? (
          <View style={styles.gate}>
            <Text style={styles.gateTitle}>Confirm to redeem</Text>
            <Text style={styles.gateBody}>Use Face ID to unlock the QR.</Text>
          </View>
        ) : authStage === "denied" ? (
          <View style={styles.gate}>
            <Text style={styles.gateTitle}>Cancelled</Text>
            <Text style={styles.gateBody}>Returning…</Text>
          </View>
        ) : confirmed ? (
          <View style={styles.gate}>
            <View style={styles.successDot} />
            <Text style={styles.gateTitle}>Redeemed</Text>
            <Text style={styles.gateBody}>You earned 24 points.</Text>
          </View>
        ) : (
          <>
            <View style={styles.head}>
              {merchantName ? (
                <Text style={styles.merchant}>{merchantName}</Text>
              ) : null}
              <Text style={styles.title}>{offer?.title ?? "Loading…"}</Text>
              <Text style={styles.subtitle}>Show this to your server.</Text>
            </View>
            {offer ? (
              <QrTimer
                payload={payload}
                ttlSeconds={TTL_SECONDS}
                onExpire={() => haptics.warning()}
              />
            ) : null}
            <RedemptionCode code={codeRef.current} />
          </>
        )}
      </View>

      <View
        style={[
          styles.bottom,
          { paddingBottom: insets.bottom + spacing.md },
        ]}
      >
        {authStage === "ok" && !confirmed ? (
          <Button
            label="Done · server scanned"
            variant="primary"
            size="lg"
            fullWidth
            onPress={handleDone}
            haptic="thud"
          />
        ) : null}
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
    position: "absolute",
    left: spacing.base,
    right: spacing.base,
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 2,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  head: {
    alignItems: "center",
    gap: spacing.xs,
  },
  merchant: {
    ...text.caption,
    color: colors.teal[100],
  },
  title: {
    ...text.titleLg,
    color: colors.white,
    textAlign: "center",
  },
  subtitle: {
    ...text.small,
    color: "rgba(245,247,247,0.85)",
  },
  gate: {
    alignItems: "center",
    gap: spacing.sm,
  },
  gateTitle: {
    ...text.titleLg,
    color: colors.white,
  },
  gateBody: {
    ...text.body,
    color: "rgba(245,247,247,0.85)",
  },
  successDot: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(255,255,255,0.95)",
    marginBottom: spacing.sm,
  },
  bottom: {
    paddingHorizontal: spacing.base,
    paddingTop: spacing.md,
  },
});
