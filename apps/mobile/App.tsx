import { StatusBar } from "expo-status-bar";
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import type { Session } from "@supabase/supabase-js";

import type { Tables } from "@latchclub/db/database.types";
import {
  ANALYTICS_EVENTS,
  APP_ROUTES,
  CATEGORY_ORDER,
  COUPON_CAP_PER_MERCHANT,
  FEATURE_FLAGS,
  formatCurrency,
} from "@latchclub/utils";

import { trackMobileEvent } from "./src/lib/analytics";
import { captureMobileError, initializeMobileSentry } from "./src/lib/sentry";
import { isSupabaseConfigured, supabase } from "./src/lib/supabase";

type MobileTab =
  (typeof APP_ROUTES.mobileTabs)[keyof typeof APP_ROUTES.mobileTabs];

type CategoryRow = Pick<
  Tables<"categories">,
  "id" | "name" | "slug" | "description" | "display_order"
>;

type OfferRow = Pick<
  Tables<"offers">,
  | "description"
  | "id"
  | "is_active"
  | "max_discount_cents"
  | "min_spend_cents"
  | "offer_type"
  | "terms"
  | "title"
  | "valid_days"
  | "valid_from"
  | "valid_until"
>;

type MerchantRow = Pick<
  Tables<"merchants">,
  | "address_line_1"
  | "category_id"
  | "city"
  | "cover_image_url"
  | "description"
  | "id"
  | "is_founding"
  | "logo_url"
  | "name"
  | "neighbourhood"
  | "province"
  | "slug"
  | "status"
> & {
  category: Pick<Tables<"categories">, "id" | "name" | "slug"> | null;
  offers: OfferRow[] | null;
};

type ProfileRow = Pick<
  Tables<"users">,
  "email" | "full_name" | "id" | "points_balance" | "role"
>;

type SubscriptionRow = Pick<
  Tables<"subscriptions">,
  "billing_source" | "current_period_end" | "status" | "tier"
>;

const TABS: Array<{ key: MobileTab; label: string }> = [
  { key: APP_ROUTES.mobileTabs.browse, label: "Browse" },
  { key: APP_ROUTES.mobileTabs.saved, label: "Saved" },
  { key: APP_ROUTES.mobileTabs.profile, label: "Profile" },
];

function getErrorMessage(error: unknown) {
  if (typeof error === "string" && error.length > 0) {
    return error;
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (error && typeof error === "object") {
    const message = "message" in error ? error.message : undefined;
    const details = "details" in error ? error.details : undefined;
    const hint = "hint" in error ? error.hint : undefined;
    const code = "code" in error ? error.code : undefined;

    const parts = [message, details, hint, code]
      .filter((value) => typeof value === "string" && value.length > 0)
      .join(" | ");

    if (parts) {
      return parts;
    }
  }

  return "Check your Supabase config and local demo data.";
}

function getCategoryObject(category: MerchantRow["category"]) {
  return category;
}

async function requireQuery<T>(
  label: string,
  promise: PromiseLike<{ data: T | null; error: unknown }>,
) {
  const result = await promise;

  if (result.error) {
    throw new Error(`${label}: ${getErrorMessage(result.error)}`);
  }

  return result.data;
}

export default function App() {
  const [mode, setMode] = useState<"sign-in" | "sign-up">("sign-in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [session, setSession] = useState<Session | null>(null);
  const [loadingSession, setLoadingSession] = useState(true);

  const [selectedTab, setSelectedTab] = useState<MobileTab>(
    APP_ROUTES.mobileTabs.browse,
  );
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedMerchant, setSelectedMerchant] = useState<MerchantRow | null>(
    null,
  );

  const [loadingData, setLoadingData] = useState(false);
  const [categories, setCategories] = useState<CategoryRow[]>([]);
  const [merchants, setMerchants] = useState<MerchantRow[]>([]);
  const [profile, setProfile] = useState<ProfileRow | null>(null);
  const [subscription, setSubscription] = useState<SubscriptionRow | null>(null);
  const [savedMerchantIds, setSavedMerchantIds] = useState<string[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    initializeMobileSentry();
    void bootstrapSession();

    const {
      data: { subscription: authSubscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setLoadingSession(false);
    });

    return () => {
      authSubscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!session) {
      setCategories([]);
      setMerchants([]);
      setSavedMerchantIds([]);
      setProfile(null);
      setSubscription(null);
      setSelectedMerchant(null);
      setLoadError(null);
      return;
    }

    void loadAppData(session.user.id);
  }, [session]);

  useEffect(() => {
    if (selectedCategory) {
      void trackMobileEvent(ANALYTICS_EVENTS.categoryViewed, {
        category_slug: selectedCategory,
      });
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedMerchant) {
      void trackMobileEvent(ANALYTICS_EVENTS.merchantViewed, {
        merchant_id: selectedMerchant.id,
        merchant_slug: selectedMerchant.slug,
      });
    }
  }, [selectedMerchant]);

  const filteredMerchants = useMemo(() => {
    const pool =
      selectedTab === APP_ROUTES.mobileTabs.saved
        ? merchants.filter((merchant) => savedMerchantIds.includes(merchant.id))
        : merchants;

    if (!selectedCategory) {
      return pool;
    }

    return pool.filter(
      (merchant) => getCategoryObject(merchant.category)?.slug === selectedCategory,
    );
  }, [merchants, savedMerchantIds, selectedCategory, selectedTab]);

  async function bootstrapSession() {
    try {
      const {
        data: { session: nextSession },
      } = await supabase.auth.getSession();

      setSession(nextSession);
    } catch (error) {
      captureMobileError(error);
    } finally {
      setLoadingSession(false);
    }
  }

  async function loadAppData(userId: string) {
    setLoadingData(true);
    setLoadError(null);

    try {
      const profileData = await requireQuery(
        "users",
        supabase
          .from("users")
          .select("id, email, full_name, points_balance, role")
          .eq("id", userId)
          .single(),
      );

      const categoriesData = await requireQuery(
        "categories",
        supabase
          .from("categories")
          .select("id, name, slug, description, display_order")
          .order("display_order"),
      );

      const merchantsData = await requireQuery(
        "merchants",
        supabase
          .from("merchants")
          .select(
            "id, slug, name, description, neighbourhood, address_line_1, city, province, logo_url, cover_image_url, is_founding, status, category_id",
          )
          .eq("status", "active")
          .order("name"),
      );

      const offersData = await requireQuery(
        "offers",
        supabase
          .from("offers")
          .select(
            "id, merchant_id, title, description, offer_type, terms, min_spend_cents, max_discount_cents, valid_days, valid_from, valid_until, is_active",
          )
          .eq("is_active", true)
          .order("title"),
      );

      const savedData = await requireQuery(
        "saved_merchants",
        supabase.from("saved_merchants").select("merchant_id").eq("user_id", userId),
      );

      const subscriptionData = await requireQuery(
        "subscriptions",
        supabase
          .from("subscriptions")
          .select("tier, status, billing_source, current_period_end")
          .eq("user_id", userId)
          .in("status", ["active", "trialing", "past_due"])
          .order("created_at", { ascending: false })
          .limit(1),
      );

      const orderedCategories = [...(categoriesData ?? [])].sort((left, right) => {
        const leftIndex = CATEGORY_ORDER.indexOf(left.slug as (typeof CATEGORY_ORDER)[number]);
        const rightIndex = CATEGORY_ORDER.indexOf(right.slug as (typeof CATEGORY_ORDER)[number]);

        if (leftIndex === -1 || rightIndex === -1) {
          return left.display_order - right.display_order;
        }

        return leftIndex - rightIndex;
      });

      const categoryMap = new Map(
        orderedCategories.map((category) => [category.id, category]),
      );

      const offersByMerchantId = new Map<string, OfferRow[]>();

      for (const offer of offersData ?? []) {
        const currentOffers = offersByMerchantId.get(offer.merchant_id) ?? [];
        currentOffers.push({
          description: offer.description,
          id: offer.id,
          is_active: offer.is_active,
          max_discount_cents: offer.max_discount_cents,
          min_spend_cents: offer.min_spend_cents,
          offer_type: offer.offer_type,
          terms: offer.terms,
          title: offer.title,
          valid_days: offer.valid_days,
          valid_from: offer.valid_from,
          valid_until: offer.valid_until,
        });
        offersByMerchantId.set(offer.merchant_id, currentOffers);
      }

      const hydratedMerchants: MerchantRow[] = (merchantsData ?? []).map(
        (merchant) => ({
          ...merchant,
          category: categoryMap.get(merchant.category_id) ?? null,
          offers: offersByMerchantId.get(merchant.id) ?? [],
        }),
      );

      setProfile(profileData);
      setCategories(orderedCategories);
      setMerchants(hydratedMerchants);
      setSavedMerchantIds((savedData ?? []).map((item) => item.merchant_id));
      setSubscription(subscriptionData?.[0] ?? null);
      setSelectedCategory((current) => current ?? orderedCategories[0]?.slug ?? null);
    } catch (error) {
      captureMobileError(error);
      console.error("loadAppData failed", error);
      const message = getErrorMessage(error);
      setLoadError(message);
      Alert.alert("Unable to load data", message);
    } finally {
      setLoadingData(false);
    }
  }

  async function handleAuthSubmit() {
    if (!email || !password) {
      Alert.alert("Missing details", "Email and password are required.");
      return;
    }

    setSubmitting(true);

    try {
      if (mode === "sign-up") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
          },
        });

        if (error) {
          throw error;
        }

        Alert.alert(
          "Account created",
          "Your account was created. If confirmations are enabled, check your inbox.",
        );
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          throw error;
        }

        await trackMobileEvent(ANALYTICS_EVENTS.signInSuccess, {
          surface: "mobile",
        });
      }
    } catch (error) {
      captureMobileError(error);
      Alert.alert(
        "Authentication failed",
        error instanceof Error ? error.message : "Unknown auth error.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  async function toggleSavedMerchant(merchantId: string) {
    if (!session) {
      return;
    }

    const alreadySaved = savedMerchantIds.includes(merchantId);

    try {
      if (alreadySaved) {
        const { error } = await supabase
          .from("saved_merchants")
          .delete()
          .eq("user_id", session.user.id)
          .eq("merchant_id", merchantId);

        if (error) {
          throw error;
        }

        setSavedMerchantIds((current) =>
          current.filter((value) => value !== merchantId),
        );
        await trackMobileEvent(ANALYTICS_EVENTS.merchantUnsaved, {
          merchant_id: merchantId,
        });
      } else {
        const { error } = await supabase.from("saved_merchants").insert({
          user_id: session.user.id,
          merchant_id: merchantId,
        });

        if (error) {
          throw error;
        }

        setSavedMerchantIds((current) => [...current, merchantId]);
        await trackMobileEvent(ANALYTICS_EVENTS.merchantSaved, {
          merchant_id: merchantId,
        });
      }
    } catch (error) {
      captureMobileError(error);
      Alert.alert(
        "Update failed",
        error instanceof Error ? error.message : "Unable to update saved merchants.",
      );
    }
  }

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      captureMobileError(error);
      Alert.alert("Sign out failed", error.message);
    }
  }

  if (!isSupabaseConfigured) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <StatusBar style="dark" />
          <View style={styles.configCard}>
            <Text style={styles.kicker}>LatchClub Mobile</Text>
            <Text style={styles.heading}>Supabase env vars are missing.</Text>
            <Text style={styles.body}>
              Add `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
              in `apps/mobile/.env.local` before running the app.
            </Text>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  if (loadingSession) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <StatusBar style="dark" />
          <View style={styles.centered}>
            <ActivityIndicator size="large" color="#d5562f" />
            <Text style={styles.mutedLabel}>Restoring session...</Text>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  if (!session) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <StatusBar style="dark" />
          <ScrollView contentContainerStyle={styles.authLayout}>
            <Text style={styles.kicker}>LatchClub Consumer</Text>
            <Text style={styles.heading}>Toronto memberships, merchant-first economics.</Text>
            <Text style={styles.body}>
              Sign in with a local dev account or create a fresh consumer account to
              test browse, save, and profile flows.
            </Text>

            <View style={styles.modeRow}>
              <Pressable
                onPress={() => setMode("sign-in")}
                style={[styles.modeButton, mode === "sign-in" && styles.modeButtonActive]}
              >
                <Text
                  style={[
                    styles.modeButtonText,
                    mode === "sign-in" && styles.modeButtonTextActive,
                  ]}
                >
                  Sign in
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setMode("sign-up")}
                style={[styles.modeButton, mode === "sign-up" && styles.modeButtonActive]}
              >
                <Text
                  style={[
                    styles.modeButtonText,
                    mode === "sign-up" && styles.modeButtonTextActive,
                  ]}
                >
                  Sign up
                </Text>
              </Pressable>
            </View>

            {mode === "sign-up" ? (
              <TextInput
                autoCapitalize="words"
                onChangeText={setFullName}
                placeholder="Full name"
                placeholderTextColor="#7e675e"
                style={styles.input}
                value={fullName}
              />
            ) : null}

            <TextInput
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={setEmail}
              placeholder="Email"
              placeholderTextColor="#7e675e"
              style={styles.input}
              value={email}
            />
            <TextInput
              autoCapitalize="none"
              onChangeText={setPassword}
              placeholder="Password"
              placeholderTextColor="#7e675e"
              secureTextEntry
              style={styles.input}
              value={password}
            />

            <Pressable
              disabled={submitting}
              onPress={() => {
                void handleAuthSubmit();
              }}
              style={styles.primaryButton}
            >
              <Text style={styles.primaryButtonText}>
                {submitting ? "Working..." : mode === "sign-in" ? "Enter demo" : "Create account"}
              </Text>
            </Pressable>

            <View style={styles.authNote}>
              <Text style={styles.authNoteText}>
                Milestone one intentionally stops at auth + browse + save. Billing and
                redemption are still disabled.
              </Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  if (loadingData) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <StatusBar style="dark" />
          <View style={styles.centered}>
            <ActivityIndicator size="large" color="#d5562f" />
            <Text style={styles.mutedLabel}>Loading merchant data...</Text>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />
        <View style={styles.header}>
          <View>
            <Text style={styles.kicker}>LatchClub</Text>
            <Text style={styles.headerTitle}>
              {selectedMerchant ? selectedMerchant.name : "Explore Toronto"}
            </Text>
          </View>
          <Pressable onPress={() => void handleSignOut()} style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Sign out</Text>
          </Pressable>
        </View>

      {selectedMerchant ? (
        <ScrollView contentContainerStyle={styles.screenContent}>
          <Pressable onPress={() => setSelectedMerchant(null)} style={styles.backLink}>
            <Text style={styles.backLinkText}>← Back to merchants</Text>
          </Pressable>
          <View style={styles.detailCard}>
            <Text style={styles.detailTitle}>{selectedMerchant.name}</Text>
            <Text style={styles.detailMeta}>
              {selectedMerchant.neighbourhood} · {getCategoryObject(selectedMerchant.category)?.name}
            </Text>
            <Text style={styles.body}>
              {selectedMerchant.description ?? "Merchant description coming soon."}
            </Text>
            <Text style={styles.detailAddress}>
              {selectedMerchant.address_line_1}, {selectedMerchant.city}, {selectedMerchant.province}
            </Text>
            <Text style={styles.metricLabel}>
              Coupon cap: {COUPON_CAP_PER_MERCHANT} uses per merchant
            </Text>
          </View>

          {(selectedMerchant.offers ?? [])
            .filter((offer) => offer.is_active)
            .map((offer) => (
              <View key={offer.id} style={styles.offerCard}>
                <Text style={styles.offerEyebrow}>{offer.offer_type.replaceAll("_", " ")}</Text>
                <Text style={styles.offerTitle}>{offer.title}</Text>
                <Text style={styles.body}>{offer.description}</Text>
                <Text style={styles.offerMeta}>
                  Min spend {formatCurrency(offer.min_spend_cents)} · Max discount{" "}
                  {formatCurrency(offer.max_discount_cents)}
                </Text>
                <Text style={styles.offerMeta}>
                  Days: {offer.valid_days.join(", ")}
                </Text>
                {offer.terms ? <Text style={styles.offerTerms}>{offer.terms}</Text> : null}
              </View>
            ))}

          <Pressable
            onPress={() => {
              void toggleSavedMerchant(selectedMerchant.id);
            }}
            style={styles.primaryButton}
          >
            <Text style={styles.primaryButtonText}>
              {savedMerchantIds.includes(selectedMerchant.id)
                ? "Remove from saved"
                : "Save merchant"}
            </Text>
          </Pressable>

          <View style={styles.featureFlagCard}>
            <Text style={styles.kicker}>Later milestone</Text>
            <Text style={styles.body}>
              Redemption is disabled in this slice. `FEATURE_FLAGS.redemption` is{" "}
              {String(FEATURE_FLAGS.redemption)} until server-side token issuance lands.
            </Text>
          </View>
        </ScrollView>
      ) : (
        <>
          <View style={styles.tabRow}>
            {TABS.map((tab) => (
              <Pressable
                key={tab.key}
                onPress={() => setSelectedTab(tab.key)}
                style={[
                  styles.tabButton,
                  selectedTab === tab.key && styles.tabButtonActive,
                ]}
              >
                <Text
                  style={[
                    styles.tabButtonText,
                    selectedTab === tab.key && styles.tabButtonTextActive,
                  ]}
                >
                  {tab.label}
                </Text>
              </Pressable>
            ))}
          </View>

          {selectedTab === APP_ROUTES.mobileTabs.browse ? (
            <>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.categoryScroller}
                contentContainerStyle={styles.categoryScrollerContent}
              >
                {categories.map((category) => (
                  <Pressable
                    key={category.id}
                    onPress={() => setSelectedCategory(category.slug)}
                    style={[
                      styles.categoryChip,
                      selectedCategory === category.slug && styles.categoryChipActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.categoryChipText,
                        selectedCategory === category.slug &&
                          styles.categoryChipTextActive,
                      ]}
                    >
                      {category.name}
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>

              <ScrollView contentContainerStyle={styles.screenContent}>
                {loadError ? (
                  <View style={styles.errorCard}>
                    <Text style={styles.emptyTitle}>Unable to load merchant data.</Text>
                    <Text style={styles.body}>{loadError}</Text>
                    {Platform.OS !== "web" ? (
                      <Text style={styles.body}>
                        If you are testing on a physical phone, your local Supabase API
                        must be reachable from that device. If not, use the iOS simulator
                        with `127.0.0.1`, or expose local Supabase through a tunnel.
                      </Text>
                    ) : null}
                  </View>
                ) : null}
                {filteredMerchants.map((merchant) => (
                  <Pressable
                    key={merchant.id}
                    onPress={() => setSelectedMerchant(merchant)}
                    style={styles.merchantCard}
                  >
                    <View style={styles.merchantCardHeader}>
                      <View>
                        <Text style={styles.merchantName}>{merchant.name}</Text>
                        <Text style={styles.merchantMeta}>
                          {merchant.neighbourhood} · {getCategoryObject(merchant.category)?.name}
                        </Text>
                      </View>
                      <Pressable
                        hitSlop={12}
                        onPress={() => {
                          void toggleSavedMerchant(merchant.id);
                        }}
                        style={styles.savePill}
                      >
                        <Text style={styles.savePillText}>
                          {savedMerchantIds.includes(merchant.id) ? "Saved" : "Save"}
                        </Text>
                      </Pressable>
                    </View>
                    <Text style={styles.body} numberOfLines={2}>
                      {merchant.description ?? "Offer-first merchant profile coming soon."}
                    </Text>
                    <Text style={styles.offerPreview}>
                      {(merchant.offers ?? []).find((offer) => offer.is_active)?.title ??
                        "No active offer"}
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>
            </>
          ) : null}

          {selectedTab === APP_ROUTES.mobileTabs.saved ? (
            <ScrollView contentContainerStyle={styles.screenContent}>
              {filteredMerchants.length === 0 ? (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyTitle}>No saved merchants yet.</Text>
                  <Text style={styles.body}>
                    Save merchants from the browse tab to build your short list.
                  </Text>
                </View>
              ) : (
                filteredMerchants.map((merchant) => (
                  <Pressable
                    key={merchant.id}
                    onPress={() => setSelectedMerchant(merchant)}
                    style={styles.merchantCard}
                  >
                    <Text style={styles.merchantName}>{merchant.name}</Text>
                    <Text style={styles.merchantMeta}>{merchant.neighbourhood}</Text>
                    <Text style={styles.offerPreview}>
                      {(merchant.offers ?? []).find((offer) => offer.is_active)?.title ??
                        "No active offer"}
                    </Text>
                  </Pressable>
                ))
              )}
            </ScrollView>
          ) : null}

          {selectedTab === APP_ROUTES.mobileTabs.profile ? (
            <ScrollView contentContainerStyle={styles.screenContent}>
              <View style={styles.profileCard}>
                <Text style={styles.detailTitle}>
                  {profile?.full_name || profile?.email || "LatchClub member"}
                </Text>
                <Text style={styles.body}>{profile?.email}</Text>
                <Text style={styles.metricLabel}>Role: {profile?.role ?? "consumer"}</Text>
                <Text style={styles.metricValue}>{profile?.points_balance ?? 0} loyalty points</Text>
              </View>

              <View style={styles.profileCard}>
                <Text style={styles.metricLabel}>Subscription</Text>
                <Text style={styles.metricValue}>
                  {subscription ? `${subscription.tier} · ${subscription.status}` : "No active subscription"}
                </Text>
                <Text style={styles.body}>
                  {subscription?.current_period_end
                    ? `Renews through ${new Date(subscription.current_period_end).toLocaleDateString()}`
                    : "Billing is intentionally deferred to a later milestone."}
                </Text>
              </View>
            </ScrollView>
          ) : null}
        </>
      )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  authLayout: {
    gap: 16,
    padding: 24,
    paddingTop: 48,
  },
  authNote: {
    backgroundColor: "#f7e4d5",
    borderRadius: 20,
    padding: 16,
  },
  authNoteText: {
    color: "#6c4f43",
    fontSize: 14,
    lineHeight: 20,
  },
  backLink: {
    marginBottom: 4,
  },
  backLinkText: {
    color: "#9d472a",
    fontSize: 15,
    fontWeight: "700",
  },
  body: {
    color: "#5f4a41",
    fontSize: 15,
    lineHeight: 22,
  },
  categoryChip: {
    backgroundColor: "#f6ece4",
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  categoryChipActive: {
    backgroundColor: "#d5562f",
  },
  categoryChipText: {
    color: "#7e675e",
    fontSize: 14,
    fontWeight: "700",
  },
  categoryChipTextActive: {
    color: "#fff8f2",
  },
  categoryScroller: {
    maxHeight: 64,
  },
  categoryScrollerContent: {
    gap: 12,
    paddingHorizontal: 20,
  },
  centered: {
    alignItems: "center",
    flex: 1,
    gap: 12,
    justifyContent: "center",
  },
  configCard: {
    backgroundColor: "#f6ece4",
    borderRadius: 28,
    gap: 12,
    margin: 20,
    padding: 24,
  },
  container: {
    backgroundColor: "#fff7f1",
    flex: 1,
  },
  detailAddress: {
    color: "#7e675e",
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
  },
  detailCard: {
    backgroundColor: "#fffdfb",
    borderColor: "#ecd9cd",
    borderRadius: 28,
    borderWidth: 1,
    gap: 10,
    padding: 22,
  },
  detailMeta: {
    color: "#9d472a",
    fontSize: 14,
    fontWeight: "700",
  },
  detailTitle: {
    color: "#241412",
    fontSize: 28,
    fontWeight: "800",
  },
  emptyState: {
    backgroundColor: "#fffdfb",
    borderColor: "#ecd9cd",
    borderRadius: 28,
    borderWidth: 1,
    gap: 8,
    padding: 22,
  },
  errorCard: {
    backgroundColor: "#fff1ef",
    borderColor: "#f1c3bb",
    borderRadius: 28,
    borderWidth: 1,
    gap: 10,
    padding: 22,
  },
  emptyTitle: {
    color: "#241412",
    fontSize: 20,
    fontWeight: "800",
  },
  featureFlagCard: {
    backgroundColor: "#241412",
    borderRadius: 28,
    gap: 10,
    padding: 22,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  headerTitle: {
    color: "#241412",
    fontSize: 28,
    fontWeight: "800",
  },
  heading: {
    color: "#241412",
    fontSize: 30,
    fontWeight: "800",
    lineHeight: 36,
  },
  input: {
    backgroundColor: "#fffdfb",
    borderColor: "#ecd9cd",
    borderRadius: 18,
    borderWidth: 1,
    color: "#241412",
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  kicker: {
    color: "#9d472a",
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 1.6,
    textTransform: "uppercase",
  },
  merchantCard: {
    backgroundColor: "#fffdfb",
    borderColor: "#ecd9cd",
    borderRadius: 24,
    borderWidth: 1,
    gap: 10,
    padding: 18,
  },
  merchantCardHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  merchantMeta: {
    color: "#7e675e",
    fontSize: 13,
    fontWeight: "700",
    marginTop: 4,
  },
  merchantName: {
    color: "#241412",
    fontSize: 20,
    fontWeight: "800",
  },
  metricLabel: {
    color: "#7e675e",
    fontSize: 13,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  metricValue: {
    color: "#241412",
    fontSize: 22,
    fontWeight: "800",
  },
  modeButton: {
    alignItems: "center",
    backgroundColor: "#f6ece4",
    borderRadius: 999,
    flex: 1,
    paddingVertical: 12,
  },
  modeButtonActive: {
    backgroundColor: "#241412",
  },
  modeButtonText: {
    color: "#7e675e",
    fontSize: 14,
    fontWeight: "800",
  },
  modeButtonTextActive: {
    color: "#fff8f2",
  },
  modeRow: {
    flexDirection: "row",
    gap: 12,
  },
  mutedLabel: {
    color: "#7e675e",
    fontSize: 14,
    fontWeight: "700",
  },
  offerCard: {
    backgroundColor: "#fffdfb",
    borderColor: "#ecd9cd",
    borderRadius: 24,
    borderWidth: 1,
    gap: 8,
    padding: 18,
  },
  offerEyebrow: {
    color: "#9d472a",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  offerMeta: {
    color: "#7e675e",
    fontSize: 13,
    fontWeight: "700",
  },
  offerPreview: {
    color: "#9d472a",
    fontSize: 14,
    fontWeight: "800",
  },
  offerTerms: {
    color: "#7e675e",
    fontSize: 13,
    lineHeight: 20,
  },
  offerTitle: {
    color: "#241412",
    fontSize: 18,
    fontWeight: "800",
  },
  primaryButton: {
    alignItems: "center",
    backgroundColor: "#d5562f",
    borderRadius: 18,
    justifyContent: "center",
    minHeight: 52,
    paddingHorizontal: 18,
  },
  primaryButtonText: {
    color: "#fff8f2",
    fontSize: 15,
    fontWeight: "800",
  },
  profileCard: {
    backgroundColor: "#fffdfb",
    borderColor: "#ecd9cd",
    borderRadius: 28,
    borderWidth: 1,
    gap: 8,
    padding: 22,
  },
  savePill: {
    backgroundColor: "#f6ece4",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  savePillText: {
    color: "#9d472a",
    fontSize: 13,
    fontWeight: "800",
  },
  screenContent: {
    gap: 16,
    padding: 20,
    paddingBottom: 32,
  },
  secondaryButton: {
    backgroundColor: "#241412",
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  secondaryButtonText: {
    color: "#fff8f2",
    fontSize: 13,
    fontWeight: "800",
  },
  tabButton: {
    backgroundColor: "#f6ece4",
    borderRadius: 999,
    flex: 1,
    paddingVertical: 12,
  },
  tabButtonActive: {
    backgroundColor: "#241412",
  },
  tabButtonText: {
    color: "#7e675e",
    fontSize: 14,
    fontWeight: "800",
    textAlign: "center",
  },
  tabButtonTextActive: {
    color: "#fff8f2",
  },
  tabRow: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 20,
    paddingTop: 6,
  },
});
