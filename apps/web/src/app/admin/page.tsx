"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import type { Tables } from "@latchclub/db";
import { formatCurrency, titleCase } from "@latchclub/utils";

import { SessionPanel } from "@/components/session-panel";
import { useAuthSession } from "@/hooks/use-auth-session";
import { captureWebError } from "@/lib/sentry";
import {
  clearSupabaseBrowserStorage,
  getSupabaseBrowserClient,
  resetSupabaseBrowserClient,
} from "@/lib/supabase";

type CategoryRow = Pick<
  Tables<"categories">,
  "display_order" | "id" | "is_active" | "name" | "slug"
>;

type MerchantRow = Pick<
  Tables<"merchants">,
  "id" | "is_founding" | "name" | "neighbourhood" | "slug" | "status"
> & {
  category:
    | Pick<Tables<"categories">, "name" | "slug">
    | Pick<Tables<"categories">, "name" | "slug">[]
    | null;
};

type OfferRow = Pick<
  Tables<"offers">,
  "id" | "is_active" | "max_discount_cents" | "min_spend_cents" | "offer_type" | "title"
> & {
  merchant:
    | Pick<Tables<"merchants">, "name" | "neighbourhood">
    | Pick<Tables<"merchants">, "name" | "neighbourhood">[]
    | null;
};

function firstItem<T>(value: T | T[] | null | undefined) {
  return Array.isArray(value) ? value[0] ?? null : value ?? null;
}

export default function AdminPage() {
  const { loading, profile, session } = useAuthSession();
  const [categories, setCategories] = useState<CategoryRow[]>([]);
  const [merchants, setMerchants] = useState<MerchantRow[]>([]);
  const [offers, setOffers] = useState<OfferRow[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!session || profile?.role !== "admin") {
      setLoadingData(false);
      return;
    }

    let active = true;
    const client = getSupabaseBrowserClient();

    if (!client) {
      setLoadingData(false);
      return () => {
        active = false;
      };
    }

    const browserClient = client;

    async function loadAdminData() {
      setLoadingData(true);
      setErrorMessage(null);

      try {
        const [categoryResult, merchantResult, offerResult] = await Promise.all([
          browserClient
            .from("categories")
            .select("id, name, slug, is_active, display_order")
            .order("display_order"),
          browserClient
            .from("merchants")
            .select("id, slug, name, neighbourhood, status, is_founding, category_id")
            .order("name"),
          browserClient
            .from("offers")
            .select(
              "id, title, offer_type, is_active, min_spend_cents, max_discount_cents, merchant_id",
            )
            .order("created_at", { ascending: false }),
        ]);

        if (categoryResult.error) {
          throw categoryResult.error;
        }
        if (merchantResult.error) {
          throw merchantResult.error;
        }
        if (offerResult.error) {
          throw offerResult.error;
        }

        if (!active) {
          return;
        }

        const categoryRows = (categoryResult.data ?? []) as CategoryRow[];
        const categoryMap = new Map(
          categoryRows.map((category) => [category.id, category]),
        );
        const merchantRows = merchantResult.data ?? [];
        const merchantMap = new Map(merchantRows.map((merchant) => [merchant.id, merchant]));

        setCategories(categoryRows);
        setMerchants(
          merchantRows.map((merchant) => ({
            id: merchant.id,
            is_founding: merchant.is_founding,
            name: merchant.name,
            neighbourhood: merchant.neighbourhood,
            slug: merchant.slug,
            status: merchant.status,
            category: categoryMap.get(merchant.category_id)
              ? {
                  name: categoryMap.get(merchant.category_id)!.name,
                  slug: categoryMap.get(merchant.category_id)!.slug,
                }
              : null,
          })),
        );
        setOffers(
          (offerResult.data ?? []).map((offer) => ({
            id: offer.id,
            is_active: offer.is_active,
            max_discount_cents: offer.max_discount_cents,
            min_spend_cents: offer.min_spend_cents,
            offer_type: offer.offer_type,
            title: offer.title,
            merchant: merchantMap.get(offer.merchant_id)
              ? {
                  name: merchantMap.get(offer.merchant_id)!.name,
                  neighbourhood: merchantMap.get(offer.merchant_id)!.neighbourhood,
                }
              : null,
          })),
        );
      } catch (error) {
        captureWebError(error);
        setErrorMessage(
          error instanceof Error ? error.message : "Unable to load admin data.",
        );
      } finally {
        if (active) {
          setLoadingData(false);
        }
      }
    }

    void loadAdminData();

    return () => {
      active = false;
    };
  }, [profile?.role, session]);

  async function handleSignOut() {
    const client = getSupabaseBrowserClient();

    if (!client) {
      clearSupabaseBrowserStorage();
      resetSupabaseBrowserClient();
      window.location.assign(`/sign-in?logout=${Date.now()}`);
      return;
    }

    try {
      await client.auth.signOut({ scope: "local" });
    } catch (error) {
      captureWebError(error);
    }
    clearSupabaseBrowserStorage();
    resetSupabaseBrowserClient();
    window.location.assign(`/sign-in?logout=${Date.now()}`);
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-6 px-6 py-10 lg:px-10">
      <div className="flex flex-col justify-between gap-4 md:flex-row">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--accent)]">
            Admin View
          </p>
          <h1 className="mt-3 text-4xl font-black">Operational visibility</h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--muted)]">
            This surface proves that admin reads can reach categories, merchants, and
            offers without bypassing the existing RLS model.
          </p>
        </div>

        <SessionPanel
          email={profile?.email}
          onSignOut={handleSignOut}
          session={session}
        />
      </div>

      {!session && !loading ? (
        <div className="rounded-[28px] border border-[var(--panel-border)] bg-[var(--panel)] p-6">
          <p className="text-sm leading-7 text-[var(--muted)]">
            Sign in first at <Link className="font-bold text-[var(--accent)]" href="/sign-in">/sign-in</Link>.
          </p>
        </div>
      ) : null}

      {session && profile?.role !== "admin" && !loading ? (
        <div className="rounded-[28px] border border-[var(--panel-border)] bg-[var(--panel)] p-6">
          <p className="text-sm leading-7 text-[var(--muted)]">
            This page is admin-only. Use the seeded admin account or update the local
            `public.users.role` value for your dev user.
          </p>
        </div>
      ) : null}

      {!session && loading ? (
        <div className="rounded-[28px] border border-[var(--panel-border)] bg-[var(--panel)] p-6">
          <p className="text-sm font-semibold text-[var(--muted)]">Restoring session...</p>
        </div>
      ) : null}

      {session && loadingData ? (
        <div className="rounded-[28px] border border-[var(--panel-border)] bg-[var(--panel)] p-6">
          <p className="text-sm font-semibold text-[var(--muted)]">Loading admin data...</p>
        </div>
      ) : null}

      {errorMessage ? (
        <div className="rounded-[28px] border border-rose-200 bg-rose-50 p-6">
          <p className="text-sm font-semibold text-rose-700">{errorMessage}</p>
        </div>
      ) : null}

      {session && profile?.role === "admin" && !loadingData ? (
        <div className="grid gap-6 lg:grid-cols-3">
          <section className="rounded-[32px] border border-[var(--panel-border)] bg-[var(--panel)] p-7 shadow-[0_18px_50px_rgba(36,20,18,0.06)]">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--accent)]">
              Categories
            </p>
            <div className="mt-5 grid gap-3">
              {categories.map((category) => (
                <div key={category.id} className="rounded-[22px] bg-[var(--highlight)] p-4">
                  <p className="text-lg font-black">{category.name}</p>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    {category.slug} · order {category.display_order}
                  </p>
                  <p className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
                    {category.is_active ? "Active" : "Hidden"}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[32px] border border-[var(--panel-border)] bg-[var(--panel)] p-7 shadow-[0_18px_50px_rgba(36,20,18,0.06)]">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--accent)]">
              Merchants
            </p>
            <div className="mt-5 grid gap-3">
              {merchants.map((merchant) => (
                <div key={merchant.id} className="rounded-[22px] border border-[var(--panel-border)] bg-white p-4">
                  <p className="text-lg font-black">{merchant.name}</p>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    {firstItem(merchant.category)?.name ?? "Unassigned"} · {merchant.neighbourhood}
                  </p>
                  <p className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
                    {titleCase(merchant.status)} {merchant.is_founding ? "· founding" : ""}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[32px] border border-[var(--panel-border)] bg-[var(--panel)] p-7 shadow-[0_18px_50px_rgba(36,20,18,0.06)]">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--accent)]">
              Offers
            </p>
            <div className="mt-5 grid gap-3">
              {offers.map((offer) => (
                <div key={offer.id} className="rounded-[22px] border border-[var(--panel-border)] bg-white p-4">
                  <p className="text-lg font-black">{offer.title}</p>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    {firstItem(offer.merchant)?.name ?? "Unknown merchant"} ·{" "}
                    {firstItem(offer.merchant)?.neighbourhood ?? "Unknown neighbourhood"}
                  </p>
                  <p className="mt-2 text-sm text-[var(--muted)]">
                    {titleCase(offer.offer_type)} · min {formatCurrency(offer.min_spend_cents)}
                  </p>
                  <p className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
                    {offer.is_active ? "Active" : "Inactive"} · max{" "}
                    {formatCurrency(offer.max_discount_cents)}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      ) : null}
    </main>
  );
}
