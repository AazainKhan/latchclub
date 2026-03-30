# LatchClub

Monorepo MVP for the LatchClub consumer mobile app and merchant/admin web app, backed by a single Supabase project.

## Workspace Layout

- `apps/mobile`: Expo mobile app for consumers
- `apps/web`: Next.js app with `/merchant` and `/admin` surfaces
- `packages/db`: shared typed Supabase client helpers and generated schema types
- `packages/utils`: shared constants and formatting helpers
- `supabase/`: migrations, baseline seed, and dev snippets

## Milestone One Scope

- consumer auth in mobile
- mobile browse, merchant detail, save/unsave, profile shell
- merchant web sign-in and merchant summary
- admin web sign-in and operational visibility for categories, merchants, offers
- local demo data loaded through real Supabase reads

Out of scope for this slice:

- billing
- redemption issuance/confirmation
- push notifications
- POS integration
- merchant self-serve signup

## Local Setup

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Start Supabase locally:

   ```bash
   pnpm db:start
   ```

3. Create these auth users manually in Supabase Studio:

   - `admin@latchclub.local`
   - `merchant@latchclub.local`
   - `consumer@latchclub.local`

4. After the users exist, run the snippet in [supabase/snippets/dev-demo-data.sql](/Users/yusufmoola/Desktop/Latch/latchclub/supabase/snippets/dev-demo-data.sql) from Studio SQL Editor.

5. Add app env files from the provided examples:

   - [apps/mobile/.env.example](/Users/yusufmoola/Desktop/Latch/latchclub/apps/mobile/.env.example)
   - [apps/web/.env.example](/Users/yusufmoola/Desktop/Latch/latchclub/apps/web/.env.example)

6. Start the workspace:

   ```bash
   pnpm dev
   ```

## Useful Commands

```bash
pnpm dev
pnpm build
pnpm lint
pnpm typecheck
pnpm db:reset
pnpm db:types
```

## RLS Verification

Use [supabase/snippets/rls-verification.sql](/Users/yusufmoola/Desktop/Latch/latchclub/supabase/snippets/rls-verification.sql) after your dev users and demo data are in place to validate consumer, merchant, and admin visibility.
