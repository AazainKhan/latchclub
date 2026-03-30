import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-8 px-6 py-10 lg:px-10">
      <section className="grid gap-6 rounded-[36px] border border-[var(--panel-border)] bg-[var(--panel)] p-8 shadow-[0_22px_70px_rgba(36,20,18,0.08)] lg:grid-cols-[1.4fr_0.9fr]">
        <div className="space-y-5">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-[var(--accent)]">
            LatchClub MVP
          </p>
          <h1 className="max-w-3xl text-4xl font-black leading-tight text-[var(--foreground)] md:text-6xl">
            One monorepo, one Supabase backend, two working app surfaces.
          </h1>
          <p className="max-w-2xl text-base leading-7 text-[var(--muted)] md:text-lg">
            This slice is intentionally read-only after auth: browse, save, merchant
            summary, and admin visibility. Billing and redemption stay out until the
            foundation is stable.
          </p>
        </div>

        <div className="rounded-[28px] bg-[var(--accent-dark)] p-6 text-white">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-orange-200">
            Current scope
          </p>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-orange-50">
            <li>Consumer mobile auth + browse + save</li>
            <li>Merchant web sign-in + merchant summary</li>
            <li>Admin web sign-in + merchants/offers/categories visibility</li>
            <li>Shared typed Supabase clients via `@latchclub/db`</li>
          </ul>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Link
          className="rounded-[28px] border border-[var(--panel-border)] bg-[var(--panel)] p-6 transition hover:-translate-y-0.5 hover:shadow-[0_18px_50px_rgba(36,20,18,0.08)]"
          href="/sign-in"
        >
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--accent)]">
            Auth
          </p>
          <h2 className="mt-3 text-2xl font-black">Sign in</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
            Shared web sign-in for merchant and admin users.
          </p>
        </Link>

        <Link
          className="rounded-[28px] border border-[var(--panel-border)] bg-[var(--panel)] p-6 transition hover:-translate-y-0.5 hover:shadow-[0_18px_50px_rgba(36,20,18,0.08)]"
          href="/merchant"
        >
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--accent)]">
            Merchant
          </p>
          <h2 className="mt-3 text-2xl font-black">Dashboard shell</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
            Merchant profile summary plus active offer visibility.
          </p>
        </Link>

        <Link
          className="rounded-[28px] border border-[var(--panel-border)] bg-[var(--panel)] p-6 transition hover:-translate-y-0.5 hover:shadow-[0_18px_50px_rgba(36,20,18,0.08)]"
          href="/admin"
        >
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--accent)]">
            Admin
          </p>
          <h2 className="mt-3 text-2xl font-black">Operations view</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
            Categories, merchants, and offers loaded through real Supabase reads.
          </p>
        </Link>
      </section>
    </main>
  );
}
