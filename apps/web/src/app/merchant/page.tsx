"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import type { Tables } from "@latchclub/db";
import { compactAddress, formatCurrency, titleCase } from "@latchclub/utils";

import { SessionPanel } from "@/components/session-panel";
import { useAuthSession } from "@/hooks/use-auth-session";
import { captureWebError } from "@/lib/sentry";
import {
  clearSupabaseBrowserStorage,
  getSupabaseBrowserClient,
  resetSupabaseBrowserClient,
} from "@/lib/supabase";

type OfferRow = Pick<
  Tables<"offers">,
  | "description"
  | "id"
  | "is_active"
  | "max_discount_cents"
  | "min_spend_cents"
  | "offer_type"
  | "title"
  | "valid_days"
>;

type MerchantDashboardRow = Pick<
  Tables<"merchants">,
  | "address_line_1"
  | "category_id"
  | "city"
  | "description"
  | "id"
  | "is_founding"
  | "name"
  | "neighbourhood"
  | "province"
  | "slug"
  | "status"
> & {
  category: Pick<Tables<"categories">, "id" | "name" | "slug"> | null;
  offers: OfferRow[] | null;
};

type MerchantMembershipRecord = {
  merchant: MerchantDashboardRow;
  role: Tables<"merchant_members">["role"];
};

export default function MerchantPage() {
  const { loading, profile, session } = useAuthSession();
  const [memberships, setMemberships] = useState<MerchantMembershipRecord[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!session) {
      setLoadingData(false);
      return;
    }

    let active = true;
    const sessionUserId = session.user.id;
    const client = getSupabaseBrowserClient();

    if (!client) {
      setLoadingData(false);
      return () => {
        active = false;
      };
    }

    const browserClient = client;

    async function loadMerchantMembership() {
      setLoadingData(true);
      setErrorMessage(null);

      try {
        const { data: membershipRows, error: membershipError } = await browserClient
          .from("merchant_members")
          .select("merchant_id, role")
          .eq("user_id", sessionUserId)
          .order("merchant_id");

        if (membershipError) {
          throw membershipError;
        }

        const merchantIds = (membershipRows ?? []).map((row) => row.merchant_id);

        if (merchantIds.length === 0) {
          if (active) {
            setMemberships([]);
          }
          return;
        }

        const { data: merchantRows, error: merchantError } = await browserClient
          .from("merchants")
          .select(
            "id, slug, name, description, neighbourhood, address_line_1, city, province, status, is_founding, category_id",
          )
          .in("id", merchantIds)
          .order("name");

        if (merchantError) {
          throw merchantError;
        }

        const { data: categoryRows, error: categoryError } = await browserClient
          .from("categories")
          .select("id, name, slug");

        if (categoryError) {
          throw categoryError;
        }

        const { data: offerRows, error: offerError } = await browserClient
          .from("offers")
          .select(
            "id, merchant_id, title, description, offer_type, min_spend_cents, max_discount_cents, valid_days, is_active",
          )
          .in("merchant_id", merchantIds)
          .eq("is_active", true)
          .order("title");

        if (offerError) {
          throw offerError;
        }

        const categoryMap = new Map(
          (categoryRows ?? []).map((category) => [category.id, category]),
        );
        const offersByMerchantId = new Map<string, OfferRow[]>();

        for (const offer of offerRows ?? []) {
          const currentOffers = offersByMerchantId.get(offer.merchant_id) ?? [];
          currentOffers.push({
            description: offer.description,
            id: offer.id,
            is_active: offer.is_active,
            max_discount_cents: offer.max_discount_cents,
            min_spend_cents: offer.min_spend_cents,
            offer_type: offer.offer_type,
            title: offer.title,
            valid_days: offer.valid_days,
          });
          offersByMerchantId.set(offer.merchant_id, currentOffers);
        }

        const merchantMap = new Map(
          (merchantRows ?? []).map((merchant) => [
            merchant.id,
            {
              ...merchant,
              category: categoryMap.get(merchant.category_id) ?? null,
              offers: offersByMerchantId.get(merchant.id) ?? [],
            } satisfies MerchantDashboardRow,
          ]),
        );

        if (active) {
          const nextMemberships: MerchantMembershipRecord[] = [];

          for (const membership of membershipRows ?? []) {
            const merchant = merchantMap.get(membership.merchant_id);

            if (!merchant) {
              continue;
            }

            nextMemberships.push({
              merchant,
              role: membership.role,
            });
          }

          setMemberships(nextMemberships);
        }
      } catch (error) {
        captureWebError(error);
        setErrorMessage(
          error instanceof Error ? error.message : "Unable to load merchant data.",
        );
      } finally {
        if (active) {
          setLoadingData(false);
        }
      }
    }

    void loadMerchantMembership();

    return () => {
      active = false;
    };
  }, [session]);

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
            Merchant View
          </p>
          <h1 className="mt-3 text-4xl font-black">Merchant dashboard shell</h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--muted)]">
            This page proves that merchant-authenticated reads work under RLS.
            Editing, billing, and scan flows are intentionally deferred.
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

      {!session && loading ? (
        <div className="rounded-[28px] border border-[var(--panel-border)] bg-[var(--panel)] p-6">
          <p className="text-sm font-semibold text-[var(--muted)]">Restoring session...</p>
        </div>
      ) : null}

      {session && loadingData ? (
        <div className="rounded-[28px] border border-[var(--panel-border)] bg-[var(--panel)] p-6">
          <p className="text-sm font-semibold text-[var(--muted)]">Loading merchant data...</p>
        </div>
      ) : null}

      {errorMessage ? (
        <div className="rounded-[28px] border border-rose-200 bg-rose-50 p-6">
          <p className="text-sm font-semibold text-rose-700">{errorMessage}</p>
        </div>
      ) : null}

      {session && !loadingData && memberships.length === 0 ? (
        <div className="rounded-[28px] border border-[var(--panel-border)] bg-[var(--panel)] p-6">
          <p className="text-sm leading-7 text-[var(--muted)]">
            This user is authenticated but is not a merchant member. Use the seeded
            merchant-owner account or run the dev demo SQL snippet after creating local users.
          </p>
        </div>
      ) : null}

      {memberships.length > 0 ? (
        <div className="grid gap-6">
          {memberships.map(({ merchant, role }) => (
            <div
              key={merchant.id}
              className="grid gap-6 lg:grid-cols-[1.25fr_0.95fr]"
            >
              <section className="rounded-[32px] border border-[var(--panel-border)] bg-[var(--panel)] p-7 shadow-[0_18px_50px_rgba(36,20,18,0.06)]">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--accent)]">
                  Merchant profile
                </p>
                <h2 className="mt-3 text-3xl font-black">{merchant.name}</h2>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                  {merchant.description ?? "Merchant description not set yet."}
                </p>

                <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[22px] bg-[var(--highlight)] p-4">
                    <dt className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--accent)]">
                      Category
                    </dt>
                    <dd className="mt-2 text-lg font-black">
                      {merchant.category?.name ?? "Unassigned"}
                    </dd>
                  </div>
                  <div className="rounded-[22px] bg-[var(--highlight)] p-4">
                    <dt className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--accent)]">
                      Status
                    </dt>
                    <dd className="mt-2 text-lg font-black">
                      {titleCase(merchant.status)}
                    </dd>
                  </div>
                  <div className="rounded-[22px] bg-[var(--highlight)] p-4">
                    <dt className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--accent)]">
                      Founding
                    </dt>
                    <dd className="mt-2 text-lg font-black">
                      {merchant.is_founding ? "Founding partner" : "Standard"}
                    </dd>
                  </div>
                  <div className="rounded-[22px] bg-[var(--highlight)] p-4">
                    <dt className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--accent)]">
                      Role
                    </dt>
                    <dd className="mt-2 text-lg font-black">{titleCase(role)}</dd>
                  </div>
                </dl>

                <p className="mt-6 text-sm leading-7 text-[var(--muted)]">
                  {compactAddress([merchant.address_line_1, merchant.city, merchant.province])}
                </p>
              </section>

              <aside className="rounded-[32px] border border-[var(--panel-border)] bg-[var(--panel)] p-7 shadow-[0_18px_50px_rgba(36,20,18,0.06)]">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--accent)]">
                  Active offers
                </p>
                <div className="mt-5 grid gap-4">
                  {(merchant.offers ?? [])
                    .filter((offer) => offer.is_active)
                    .map((offer) => (
                      <div
                        key={offer.id}
                        className="rounded-[24px] border border-[var(--panel-border)] bg-white p-5"
                      >
                        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--accent)]">
                          {offer.offer_type.replaceAll("_", " ")}
                        </p>
                        <h3 className="mt-2 text-xl font-black">{offer.title}</h3>
                        <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                          {offer.description}
                        </p>
                        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                          Min spend {formatCurrency(offer.min_spend_cents)} · Max discount{" "}
                          {formatCurrency(offer.max_discount_cents)}
                        </p>
                        <p className="mt-2 text-sm text-[var(--muted)]">
                          Valid days: {offer.valid_days.join(", ")}
                        </p>
                      </div>
                    ))}
                </div>
              </aside>
            </div>
          ))}
        </div>
      ) : null}
    </main>
  );
}
