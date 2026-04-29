import { useRouter } from "expo-router";
import { Locate } from "lucide-react-native";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MapView, {
  Marker,
  PROVIDER_DEFAULT,
  type Region,
} from "react-native-maps";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { MerchantCard } from "../../src/components/card/MerchantCard";
import {
  MerchantMarker,
  type MarkerCategory,
} from "../../src/components/map/MerchantMarker";
import { GlassSurface } from "../../src/components/glass/GlassSurface";
import { IconButton } from "../../src/components/ui/IconButton";
import { Pill } from "../../src/components/ui/Pill";
import { SkeletonGroup } from "../../src/components/ui/Skeleton";
import { getCategories, getMerchants } from "../../src/data/api";
import {
  CATEGORY_LABEL,
  MOBILE_CATEGORY_ORDER,
  type MobileCategorySlug,
} from "../../src/data/mock/categories";
import { TORONTO_CENTER } from "../../src/data/mock/merchants";
import type { Category, MerchantWithMocks } from "../../src/data/types";
import { useHaptics } from "../../src/hooks/useHaptics";
import { colors, radius, spacing, text } from "../../src/theme";

type FilterValue = "all" | MobileCategorySlug;

const isMobileSlug = (s: string): s is MobileCategorySlug =>
  (MOBILE_CATEGORY_ORDER as readonly string[]).includes(s);

export default function Explore() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const haptics = useHaptics();
  const mapRef = useRef<MapView>(null);

  const [merchants, setMerchants] = useState<MerchantWithMocks[] | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filter, setFilter] = useState<FilterValue>("all");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [region, setRegion] = useState<Region>(TORONTO_CENTER);

  useEffect(() => {
    (async () => {
      const [m, c] = await Promise.all([getMerchants(), getCategories()]);
      setMerchants(m);
      setCategories(c);
    })();
  }, []);

  const categoryById = useMemo(() => {
    const map: Record<string, MobileCategorySlug | undefined> = {};
    categories.forEach((c) => {
      if (isMobileSlug(c.slug)) map[c.id] = c.slug;
    });
    return map;
  }, [categories]);

  const filtered = useMemo(() => {
    if (!merchants) return [];
    if (filter === "all") return merchants;
    return merchants.filter((m) => categoryById[m.category_id ?? ""] === filter);
  }, [merchants, filter, categoryById]);

  const recenter = () => {
    haptics.tap();
    mapRef.current?.animateToRegion(TORONTO_CENTER, 600);
  };

  const focusMerchant = (m: MerchantWithMocks) => {
    haptics.select();
    setActiveId(m.id);
    if (m.latitude != null && m.longitude != null) {
      mapRef.current?.animateToRegion(
        {
          latitude: m.latitude,
          longitude: m.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.014,
        },
        500,
      );
    }
  };

  // Zoom-aware fade: when zoomed far out, dim non-active pins
  const zoomedOut = region.latitudeDelta > 0.08;

  return (
    <View style={styles.root}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_DEFAULT}
        style={StyleSheet.absoluteFill}
        initialRegion={TORONTO_CENTER}
        userInterfaceStyle="dark"
        showsCompass={false}
        showsMyLocationButton={false}
        toolbarEnabled={false}
        onRegionChangeComplete={(r) => setRegion(r)}
      >
        {filtered.map((m) => {
          const slug = categoryById[m.category_id ?? ""];
          if (!slug || m.latitude == null || m.longitude == null) return null;
          const isActive = m.id === activeId;
          return (
            <Marker
              key={m.id}
              coordinate={{ latitude: m.latitude, longitude: m.longitude }}
              onPress={() => focusMerchant(m)}
              tracksViewChanges={false}
              anchor={{ x: 0.5, y: 1 }}
            >
              <MerchantMarker
                category={slug as MarkerCategory}
                active={isActive}
                dimmed={zoomedOut && !isActive}
              />
            </Marker>
          );
        })}
      </MapView>

      {/* Top: title + chips */}
      <View
        style={[
          styles.topOverlay,
          { paddingTop: insets.top + spacing.sm },
        ]}
        pointerEvents="box-none"
      >
        <GlassSurface intensity="strong" rounded="pill" style={styles.titlePill}>
          <Text style={styles.title}>Explore Toronto</Text>
        </GlassSurface>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chips}
        >
          <Pill
            label="All"
            active={filter === "all"}
            onPress={() => setFilter("all")}
          />
          {MOBILE_CATEGORY_ORDER.map((slug) => (
            <Pill
              key={slug}
              label={CATEGORY_LABEL[slug]}
              active={filter === slug}
              onPress={() => setFilter(slug)}
            />
          ))}
        </ScrollView>
      </View>

      {/* Recenter floating button */}
      <View
        style={[
          styles.recenterWrap,
          { bottom: insets.bottom + 84 + 220 },
        ]}
        pointerEvents="box-none"
      >
        <IconButton
          icon={<Locate size={18} color={colors.text.primary} />}
          accessibilityLabel="Recenter map"
          variant="filled"
          onPress={recenter}
        />
      </View>

      {/* Bottom sheet — list of visible merchants */}
      <View style={styles.sheetWrap} pointerEvents="box-none">
        <GlassSurface
          intensity="medium"
          corners={{ topLeft: 28, topRight: 28, bottomLeft: 0, bottomRight: 0 }}
          style={styles.sheet}
        >
          <View style={styles.sheetHandle} />
          <View style={styles.sheetHead}>
            <Text style={styles.sheetTitle}>
              {filtered.length} {filtered.length === 1 ? "spot" : "spots"} in view
            </Text>
            {filter !== "all" ? (
              <Text style={styles.sheetSub}>{CATEGORY_LABEL[filter]}</Text>
            ) : null}
          </View>
          {!merchants ? (
            <View style={{ padding: spacing.base }}>
              <SkeletonGroup count={3} />
            </View>
          ) : filtered.length === 0 ? (
            <Text style={styles.empty}>No merchants in this category yet.</Text>
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={[
                styles.sheetList,
                { paddingBottom: insets.bottom + 76 + spacing.sm },
              ]}
              snapToInterval={260 + spacing.sm}
              decelerationRate="fast"
              snapToAlignment="start"
            >
              {filtered.map((m, i) => (
                <View
                  key={m.id}
                  style={{
                    width: 260,
                    marginRight: i === filtered.length - 1 ? 0 : spacing.sm,
                  }}
                >
                  <MerchantCard
                    merchant={m}
                    variant="compact"
                    onPress={() => router.push(`/merchant/${m.id}`)}
                    style={
                      m.id === activeId
                        ? { borderColor: colors.teal[400] }
                        : undefined
                    }
                  />
                </View>
              ))}
            </ScrollView>
          )}
        </GlassSurface>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg.base,
  },
  topOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    gap: spacing.md,
  },
  titlePill: {
    alignSelf: "center",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  title: {
    ...text.bodyMedium,
    color: colors.text.primary,
  },
  chips: {
    gap: spacing.sm,
    paddingHorizontal: spacing.base,
  },
  recenterWrap: {
    position: "absolute",
    right: spacing.base,
  },
  sheetWrap: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  sheet: {
    paddingTop: spacing.sm,
    gap: spacing.sm,
  },
  sheetHandle: {
    alignSelf: "center",
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(255,255,255,0.25)",
  },
  sheetHead: {
    paddingHorizontal: spacing.base,
    paddingTop: spacing.xs,
  },
  sheetTitle: {
    ...text.bodyMedium,
    color: colors.text.primary,
  },
  sheetSub: {
    ...text.small,
    color: colors.text.muted,
    marginTop: 2,
  },
  sheetList: {
    paddingHorizontal: spacing.base,
    paddingTop: spacing.xs,
  },
  empty: {
    ...text.small,
    color: colors.text.muted,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
  },
});
