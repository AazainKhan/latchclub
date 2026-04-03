# Latchclub — Agent Context File
> Read this entire file before writing any code. This is the source of truth.

---

## Project Overview
**Latchclub** (latchclub.ca) is a premium Canadian deals & membership platform — think The Entertainer App, but for Canada/North America. This repo contains the **marketing landing page only**. No full app yet.

**Goal of this page:** Collect waitlist emails, communicate brand value, show app mockups, display pricing tiers.

---

## Tech Stack (exact versions matter — always use Context7 MCP for latest docs)
- **Next.js 15** — App Router, TypeScript strict mode
- **Tailwind CSS v4**
- **shadcn/ui** — component primitives only
- **Motion (framer-motion v11+)** — all animations
- **Supabase** — minimal: one `waitlist` table, basic admin auth only
- **Vercel** — deployment target

### Do NOT use:
- GSAP (overkill, licensing)
- Pages Router
- Any CSS-in-JS (styled-components, emotion)
- Raw HTML `<button>` or `<input>` — always use shadcn/ui primitives
- `localStorage` or `sessionStorage`
- Hardcoded colors — use Tailwind tokens only

---

## Skills
Read **SKILLS.md** for the full list of installed Claude Code design skills.
All design skills must be installed before running any build session.

The most critical skill is Anthropic's official `frontend-design` skill.
It activates automatically on any UI task and prevents generic "AI slop" output.

At the start of every UI session, include:
```
Activate all relevant design skills before writing any code.
Reference DESIGN.md, SKILLS.md, and /inspo/ for constraints and references.
```

Summary of hard rules (full detail in DESIGN.md):
- Font weights: 400 and 500 ONLY — never 600, 700, 800
- Heading letter-spacing: -0.02em to -0.04em (tight, like Apple/Linear)
- Body line-height: 1.65–1.75. Max line length: 65ch.
- Spacing: 4px base scale only. Section padding: 96px desktop, 64px mobile.
- Colors: max 3 per page. No gradients. No colored backgrounds.
- Borders: 0.5px default, 2px for featured/highlighted only.
- Animations: transform + opacity only. 300–500ms. once:true. useReducedMotion().
- Mobile-first. 375px minimum. Touch targets 44px min.
- One CTA per section. No competing buttons.

---

## File Structure (follow exactly)
```
latchclub/
├── app/
│   ├── layout.tsx                  # Root layout, fonts, metadata
│   ├── page.tsx                    # Landing page
│   ├── about/
│   │   └── page.tsx                # About page
│   ├── admin/
│   │   ├── page.tsx                # Admin dashboard (protected)
│   │   └── login/
│   │       └── page.tsx            # Admin login
│   └── api/
│       └── waitlist/
│           └── route.ts            # POST: insert email to Supabase
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx              # Shared across landing + about
│   │   ├── Footer.tsx              # Shared across landing + about
│   │   └── FooterCTA.tsx           # Shared waitlist CTA above footer
│   ├── sections/
│   │   ├── landing/
│   │   │   ├── Hero.tsx
│   │   │   ├── AppShowcase.tsx
│   │   │   ├── FeaturesGrid.tsx
│   │   │   ├── HowItWorks.tsx
│   │   │   ├── Pricing.tsx
│   │   │   └── FAQ.tsx
│   │   └── about/
│   │       ├── AboutHero.tsx
│   │       ├── MissionStory.tsx
│   │       ├── Team.tsx
│   │       ├── Values.tsx
│   │       └── Investors.tsx
│   ├── ui/                         # shadcn auto-generated
│   └── shared/
│       ├── WaitlistForm.tsx        # Reused on landing + about footer
│       └── AnimatedSection.tsx     # Reusable Motion scroll wrapper
├── lib/
│   ├── supabase.ts                 # Public client
│   ├── supabase-server.ts          # Service role client (server only)
│   └── utils.ts                    # cn() and helpers
├── hooks/
│   └── useWaitlistForm.ts
├── types/
│   └── index.ts
├── middleware.ts                   # Protects /admin routes
├── public/
│   └── assets/                    # Brand assets
├── inspo/                         # Design references (not served)
├── CLAUDE.md
└── .env.local
```

---

## Component Conventions

### Server vs Client
- Default to **Server Components** for all section components
- Add `"use client"` ONLY when using: hooks, Motion animations, form state, onClick
- WaitlistForm.tsx → always client (form state + fetch)
- AnimatedSection.tsx → always client (Motion)
- Navbar.tsx → client (scroll state for sticky behavior)

### Motion Animation Pattern (use this exact pattern everywhere)
```tsx
"use client"
import { motion } from "framer-motion"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } }
}

// In JSX:
<motion.div
  variants={fadeUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}
>
  {children}
</motion.div>
```

### Staggered children pattern:
```tsx
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
}
```

### Never animate with:
- CSS keyframes or `@keyframes`
- `transition` in Tailwind for entrance animations
- `animate` without `initial` — always pair them

---

## Supabase Schema
```sql
-- waitlist table (create this first in Supabase dashboard)
create table waitlist (
  id uuid default gen_random_uuid() primary key,
  email text not null unique,
  city text,
  created_at timestamp with time zone default now()
);

-- Enable RLS
alter table waitlist enable row level security;

-- Allow inserts from anon
create policy "Allow public inserts" on waitlist
  for insert with check (true);

-- Admin can read all
create policy "Admin read" on waitlist
  for select using (auth.role() = 'authenticated');
```

### Supabase client (`/lib/supabase.ts`):
```ts
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
```

### Waitlist API route (`/app/api/waitlist/route.ts`):
```ts
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const { email, city } = await req.json()
  if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 })
  const { error } = await supabase.from('waitlist').insert({ email, city })
  if (error?.code === '23505') return NextResponse.json({ error: 'Already on waitlist' }, { status: 409 })
  if (error) return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  return NextResponse.json({ success: true })
}
```

---

## Landing Page Sections (build in this order)

### 1. Navbar
- Logo left: "latch**club**" (bold suffix), links center, CTA button right
- Sticky on scroll with subtle border-bottom appearing after 80px scroll
- Mobile: hamburger menu with shadcn Sheet component

### 2. Hero
- Badge: "Coming to Canada — Join the waitlist"
- H1: "Save more. Experience more." — 52px desktop, 36px mobile
- Subtext: one sentence, 18px, muted
- WaitlistForm component (email input + submit button inline)
- Social proof line: "Join 1,200+ Canadians already on the waitlist"
- Animate: badge fades in → h1 slides up → subtext → form (stagger 0.1s each)

### 3. App Preview (mock phone screens)
- 3 staggered phone mockup cards showing mock app UI
- Categories: Dining, Wellness, Experiences
- Animate: cards slide up with stagger on scroll

### 4. How It Works
- Section label: "HOW IT WORKS" (12px, uppercase, tracked)
- H2: "Three steps to saving."
- 3 numbered steps in a grid (01, 02, 03)
- Each step: number → title → 1-2 sentence description
- Animate: steps stagger in from bottom

### 5. Pricing
- 3 tiers: Explorer (Free) / Member ($15/mo) / Family ($25/mo)
- Member tier: featured with `border-2 border-foreground`
- Features list with checkmarks (use shadcn Badge or custom)
- Animate: cards scale up from 0.95 to 1 on scroll

### 6. Footer CTA
- Repeat headline + WaitlistForm
- Full bleed section

### 7. Footer
- Logo left, links center, copyright right
- Minimal, 1px top border

---

## Admin Page (`/admin`)
- Protected by Supabase Auth (email/password — set up one admin user manually)
- Shows: total waitlist count, table of emails + city + date
- Use shadcn Table component
- No styling complexity needed — functional only

---

## Environment Variables (`.env.local`)
```
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

---

## TypeScript Conventions
- Strict mode on
- No `any` types
- All props typed with interfaces, not type aliases
- Use `type` for unions, `interface` for objects

---

## Commands Claude Should Know
```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run lint         # ESLint
npx shadcn@latest add [component]  # Add shadcn components
```

---

## What NOT to build (scope boundaries)
- No user authentication (only admin auth)
- No payment flow (waitlist only — Stripe comes later)
- No merchant pages
- No blog or SEO article pages
- No CMS or content management
- No multi-language support
- No /admin link anywhere in public nav or footer — ever

---

## Reference Materials
When building UI, reference these sites for inspiration patterns:
- **Motion Primitives** (motion-primitives.com) — animation component patterns
- **Aceternity UI** (ui.aceternity.com) — premium animation effects
- **shadcn/ui blocks** (ui.shadcn.com/blocks) — layout patterns
- **Magic UI** (magicui.design) — landing page components

---

## /inspo Folder — Design References

All files in `/inspo/` are captured automatically using **Claude in Chrome** (GIF recordings + screenshots) combined with **Firecrawl** (content + structure). Read every relevant file before building any UI.

### What each capture contains:
- `full-scroll.gif` — the real scroll animations playing in-browser
- `hover-states.gif` — actual hover interactions recorded live
- `mobile.png` — 390px viewport screenshot
- `sections/` — zoomed screenshots of each section
- `notes.md` — extracted layout, typography, animation, and component observations

### Folder structure:
```
/inspo/
├── [site-name]/
│   ├── full-scroll.gif          ← scroll animations, recorded live
│   ├── hover-states.gif         ← hover interactions, recorded live
│   ├── pageload.gif             ← page load sequence (if dramatic)
│   ├── mobile.png               ← 390px viewport
│   ├── sections/
│   │   ├── navbar.png
│   │   ├── hero.png
│   │   ├── features.png
│   │   ├── pricing.png
│   │   └── footer.png
│   └── notes.md                 ← layout, typography, animation breakdown
└── [another-site]/
    └── ...
```

### How to add a new reference:
Use the full capture prompt from the Session Prompts file in **Claude.ai chat**.
Give it the URL — it navigates the real browser, records GIFs of animations and hovers,
takes section screenshots, extracts content with Firecrawl, and writes notes.md.

### How to use /inspo in session prompts:
```
Before writing any UI code:
1. Read /inspo/[site-name]/notes.md for relevant sites
2. Reference the GIFs and screenshots for visual patterns
3. Apply: layout rhythm, typography scale, animation timing, component structure
4. Never copy: brand colors, logos, copy, licensed assets
```

---

## Current Sprint
**Goal:** Complete, deployable landing page with working waitlist form.
**Status:** Starting from scratch.
**Priority order:** Scaffold → Navbar/Hero → Sections → Animations → Admin → Deploy
