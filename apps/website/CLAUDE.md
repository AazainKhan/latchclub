# latchclub.ca website

Marketing site for LatchClub. Lives at https://latchclub.ca.

## Branch + deploy workflow

- **Develop on the `latchclub.ca-website` branch** (long-lived, tracks `main`).
- **Deploy:** `pnpm deploy:website` from repo root → fast-forwards `origin/main` to your branch HEAD → Vercel git webhook builds `apps/website/` and deploys to `latchclub.ca`. The script (`scripts/deploy-website.sh`) refuses to run if you're on the wrong branch, the tree is dirty, or `main` has commits you don't have.
- **Preview URL** is auto-generated on every push to `latchclub.ca-website` (or any non-`main` branch). Use it to verify before deploying.
- Direct-to-`main` pushes are still possible but bypass the safeguards — prefer the deploy script.

## Don't touch (other apps + shared packages)

- `apps/web/` — separate Next.js app (different Vercel project, different dev).
- `apps/mobile/` — Expo React Native app (`latch/mobile-app` branch is the active dev branch for it).
- `packages/db`, `packages/utils` — shared workspace packages; coordinate before changing.
- `supabase/` at repo root — shared Supabase migrations. Per-app Supabase split is a future refactor, don't preempt.

## Stack

- Next.js 16 App Router · React 19 · TypeScript
- Tailwind CSS **v4** (PostCSS, **no `tailwind.config`** — theme is in `app/globals.css` via `@theme {}`). When adding tokens, edit `globals.css`, not a config file.
- shadcn/ui (style `base-nova`, baseColor `neutral`, cssVariables on). Aliases: `@/components`, `@/lib`, `@/components/ui`.
- GSAP + ScrollTrigger via the wrapper at `lib/gsap.ts`. Always use `useGSAP({ scope: ref })` from `@gsap/react`. Don't import `gsap` directly elsewhere.
- Lucide React for icons.
- Supabase (server-side via `lib/supabase-server.ts` — lazy-init pattern, don't break it).
- Resend for transactional email; one-click unsubscribe token in `lib/unsubscribe-token.ts`.
- Fonts: Geist (sans/mono) + Space Grotesk (heading) — wired via Next.js font loaders, exposed as `var(--font-*)`.
- Brand colors live in `globals.css` `@theme`: `teal-50..500`, `carbon`, `carbon-light`, `mist`, `bone`. Use these (`bg-carbon`, `text-teal-400`) instead of hex.

## Where things go

- `app/` — App Router routes. `app/api/*` for route handlers (`waitlist`, `contact`, `unsubscribe`).
- `app/screens/{welcome,home,deal,qr,map,earn,share}/page.tsx` — pixel-precise iOS-style mockups used as design source for the mobile app team. `app/screens/_shared.tsx` has the `Phone`, `StatusBar`, `DynamicIsland`, `HomeIndicator`, `VenuePhoto`, `SFIcon` primitives — reuse them.
- `components/sections/` — landing-page sections (`Hero`, `AppWalkthrough`, `Features`, `Industries`, `Pricing`, `WaitlistCTA`, `FAQ`, etc.). Named exports.
- `components/layout/` — site chrome (`Navbar`).
- `components/ui/` — shadcn primitives (don't edit by hand; use the shadcn CLI).
- `components/waitlist/` — waitlist dialog flow.
- `components/shared/` — shared composites used in multiple sections.
- `public/app-screens/LC-00{1..7}-*.png` — app screenshots used by `AppWalkthrough.tsx`.
- `public/hero carousel/*.{jpg,jpeg}` — Hero deal-card images (note: filename casing is inconsistent in source assets — match exactly when referencing).
- `public/marquee/` — Hero marquee row images.

## Conventions seen in the codebase

- Client components declare `"use client"` at the top.
- Sections use a single `useGSAP` block keyed to `sectionRef` for scoping; `gsap.matchMedia()` for responsive animation gating.
- Mobile-specific copy/layout often lives in a sibling sub-component (e.g. `MobileWalkthrough`) inside the same section file rather than a separate route.
- API routes lazy-init Supabase + Resend clients (don't construct at module top-level — breaks build).
- `globals.css` has a `prefers-reduced-motion` media query disabling the smooth-scroll on mobile; preserve that pattern when adding scroll behavior.

## Vercel project

- Project: `latchclub-website` under team `aazain-khans-projects`.
- Dashboard: https://vercel.com/aazain-khans-projects/latchclub-website.
- Root Directory = `apps/website`. "Include source files outside Root Directory" = ON (required for `pnpm-lock.yaml`).
- `apps/website/vercel.json` overrides install/build commands — keep them as `pnpm install --frozen-lockfile` and `pnpm turbo build --filter=latchclub`.
- `.vercel/` link is at repo root (gitignored). For multi-Vercel-project expansion later (e.g. `apps/web/`), per-app links would move into each app folder.

## When making frontend changes

- Run `pnpm --filter latchclub dev` from repo root to test locally on http://localhost:3000.
- Verify the preview URL (auto-generated on push to `latchclub.ca-website`) before running `pnpm deploy:website`.
- For UI/animation work, read the existing `Hero.tsx` and `AppWalkthrough.tsx` first — they set the tone for scroll-jacked + GSAP-scrubbed patterns the rest of the site echoes.
