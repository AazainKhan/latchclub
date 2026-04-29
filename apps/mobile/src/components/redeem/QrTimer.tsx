import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import QRCode from "react-native-qrcode-svg";

import { colors, radius, spacing, text } from "../../theme";

const SIZE = 240;

export function QrTimer({
  payload,
  ttlSeconds,
  onExpire,
}: {
  payload: string;
  ttlSeconds: number;
  onExpire?: () => void;
}) {
  const [remaining, setRemaining] = useState(ttlSeconds);

  useEffect(() => {
    setRemaining(ttlSeconds);
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - start) / 1000);
      const next = Math.max(0, ttlSeconds - elapsed);
      setRemaining(next);
      if (next === 0) {
        clearInterval(interval);
        onExpire?.();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [ttlSeconds, payload, onExpire]);

  const min = Math.floor(remaining / 60);
  const sec = remaining % 60;
  const expiring = remaining <= 60;
  const expired = remaining === 0;

  const fillPct = useMemo(() => remaining / ttlSeconds, [remaining, ttlSeconds]);

  return (
    <View style={styles.root}>
      {/* Glow */}
      <LinearGradient
        colors={[colors.teal.glow, "transparent"]}
        style={[StyleSheet.absoluteFill, { borderRadius: SIZE }]}
      />

      <View style={styles.qrCard}>
        <QRCode
          value={payload}
          size={SIZE}
          backgroundColor="white"
          color="#0F1A22"
          ecl="M"
        />
        {expired ? (
          <View style={styles.expiredOverlay}>
            <Text style={styles.expiredText}>Expired</Text>
          </View>
        ) : null}
      </View>

      <View style={styles.timerWrap}>
        <View style={styles.barTrack}>
          <View
            style={[
              styles.barFill,
              {
                width: `${Math.max(0, fillPct * 100)}%` as any,
                backgroundColor: expiring ? colors.warning : colors.teal[400],
              },
            ]}
          />
        </View>
        <Text
          style={[
            styles.time,
            expiring && { color: colors.warning },
            expired && { color: colors.danger },
          ]}
        >
          {expired
            ? "0:00"
            : `${min}:${sec.toString().padStart(2, "0")}`}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    gap: spacing.lg,
  },
  qrCard: {
    backgroundColor: colors.white,
    padding: spacing.lg,
    borderRadius: radius.xl,
    shadowColor: colors.teal[400],
    shadowOpacity: 0.2,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 0 },
    elevation: 6,
  },
  expiredOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(15,26,34,0.85)",
    borderRadius: radius.xl,
  },
  expiredText: {
    ...text.title,
    color: colors.danger,
    fontWeight: "800",
    letterSpacing: 2,
  },
  timerWrap: {
    alignItems: "center",
    gap: spacing.sm,
    width: 240,
  },
  barTrack: {
    width: "100%",
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255,255,255,0.1)",
    overflow: "hidden",
  },
  barFill: {
    height: 6,
    borderRadius: 3,
  },
  time: {
    ...text.titleLg,
    color: colors.text.primary,
    fontVariant: ["tabular-nums"],
    letterSpacing: 1,
  },
});
