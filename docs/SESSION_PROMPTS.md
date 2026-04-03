# Latchclub — Claude Code Execution Prompts

> Paste these into Claude Code (terminal) one session at a time.
> Always start each session with: `Read CLAUDE.md fully before writing any code.`

---

## PRE-WORK: MCP Setup + Skills Install (do this ONCE before any sessions)

```bash
# ── MCPs ──────────────────────────────────────────────────────────
claude mcp add context7 -- npx -y @upstash/context7-mcp
claude mcp add filesystem -- npx -y @modelcontextprotocol/server-filesystem ~/Projects/latchclub
claude mcp add sequential-thinking -- npx -y @modelcontextprotocol/server-sequential-thinking
claude mcp add github -e GITHUB_PERSONAL_ACCESS_TOKEN=your_token -- npx -y @modelcontextprotocol/server-github
claude mcp add firecrawl -e FIRECRAWL_API_KEY=your_key -- npx -y firecrawl-mcp
# Claude in Chrome: already connected, no setup needed

# ── SKILLS ────────────────────────────────────────────────────────
# Official Anthropic (install first — most important)
npx skills add anthropics/claude-code --skill frontend-design

# Design quality skills
npx skills add nextlevelbuilder/ui-ux-pro-max-skill
npx skills add Leonxlnx/taste-skill
npx skills add ehmo/platform-design-skills
npx skills add oiloil/oiloil-ui-ux-guide
npx skills add HermeticOrmus/LibreUIUX-Claude-Code
npx skills add Owl-Listener/designer-skills

# Google Labs design-to-code suite
npx skills add google-labs-code/design-md
npx skills add google-labs-code/enhance-prompt
npx skills add google-labs-code/shadcn-ui
npx skills add google-labs-code/stitch-loop

# Workflow skills
npx skills add obra/verification-before-completion
npx skills add obra/finishing-a-development-branch
npx skills add travisvn/webapp-testing

# Patrick Ellis design review workflow (Playwright-based)
git clone https://github.com/OneRedOak/claude-code-workflows.git /tmp/claude-workflows
cp -r /tmp/claude-workflows/.claude/agents/design-reviewer ~/.claude/agents/
cp -r /tmp/claude-workflows/.claude/commands/design-review ~/.claude/commands/

# Verify everything
claude mcp list
npx skills list
```

**Every UI session must start with:**
```
Read CLAUDE.md, DESIGN.md, and SKILLS.md fully.
Activate all relevant design skills before writing any code.
Reference /inspo/ for visual direction.
```

---

## CAPTURE INSPO: Full Visual Capture From Any URL

**Use this in Claude.ai chat (not Claude Code terminal)** — Claude in Chrome runs in your browser.
Paste the URL and run the full capture prompt below. It records everything: animations, hover states, scroll behavior — saved as GIFs + screenshots + a markdown notes file.

---

### Full Capture Prompt (paste this for any URL)

```
I want to capture this website as design inspiration for Latchclub: [PASTE URL]

Do all of the following steps in order:

─── STEP 1: NAVIGATE ───
Navigate to [URL]. Wait 2 seconds for the page to fully load including fonts and initial animations.
Take a full screenshot and save it to disk as the "initial load" capture.

─── STEP 2: RECORD FULL SCROLL ANIMATION ───
Start GIF recording.
Take a screenshot immediately (first frame).
Slowly scroll down the entire page in increments — pause 0.5s between each scroll so animations have time to trigger.
Once at the bottom, stop GIF recording.
Export and download the GIF as: [site-name]-full-scroll.gif
This captures all scroll-triggered entrance animations.

─── STEP 3: HOVER STATE CAPTURES ───
Scroll back to top.
Start a new GIF recording.
Take a screenshot (first frame).
Find and hover over: the primary CTA button, any cards, nav links, pricing cards.
Pause 0.5s on each hover to capture the hover animation.
Stop recording. Export as: [site-name]-hover-states.gif

─── STEP 4: MOBILE VIEW ───
Resize the browser to 390px wide (iPhone 14 size).
Take a screenshot. Save to disk.
Open the mobile nav/hamburger if one exists. Take a screenshot.
Resize back to desktop.

─── STEP 5: SECTION SCREENSHOTS ───
Scroll to and take a zoomed screenshot of each of these if they exist:
- Navbar (default + scrolled state)
- Hero section
- Features / how it works section
- Pricing section
- FAQ / accordion section
- Footer
Save each to disk.

─── STEP 6: CONTENT EXTRACTION ───
Use Firecrawl to scrape [URL] and extract the full page content and structure.

─── STEP 7: SAVE EVERYTHING ───
Save all captures to /inspo/[site-name]/ with this structure:
  /inspo/[site-name]/
    full-scroll.gif
    hover-states.gif  
    mobile.png
    sections/
      navbar.png
      hero.png
      features.png
      pricing.png
      footer.png
    notes.md

Write notes.md with this content:
---
source: [url]
captured: [date]
---

## Overall impression
[2-3 sentences on the vibe, quality level, what makes it premium]

## Layout patterns to steal
[bullet points — spacing, grid, section structure]

## Typography observations
[heading sizes, weights, letter-spacing, font family if identifiable]

## Animation breakdown
[describe exactly what you saw animating — what direction, how fast, what easing, what triggers]

## Hover states
[what changed on hover — color, scale, border, shadow]

## Mobile observations
[how the layout adapts, nav behavior, any mobile-specific patterns]

## Component patterns worth adopting
[specific UI patterns — badge pills, card layouts, button styles, form treatments]

## What NOT to copy
[colors, logo, brand copy, any paid/licensed UI elements]
```

---

### Quick Single-Section Capture

When you only care about one specific section (e.g. just the pricing):

```
Navigate to [URL].
Scroll to the pricing / hero / navbar section.
Start GIF recording → take screenshot → slowly hover over all interactive elements → stop recording.
Export as [site-name]-[section].gif and download.
Take a zoomed screenshot of the section and save to disk.
Write a brief notes.md for /inspo/[section]/[site-name].md covering:
layout, typography, animations, hover states, what to steal, what to avoid.
```

---

### Page Load / Intro Animation Capture

For sites with dramatic load-in animations (like linear.app, stripe.com):

```
Navigate to [URL] in a fresh tab.
Immediately start GIF recording.
Take a screenshot as the first frame.
Wait 3 seconds without scrolling — capture the full page load sequence.
Then slowly scroll to capture scroll animations.
Stop and export as [site-name]-pageload.gif
```

---

## DESIGN AUDIT PROMPT — Run at End of Every UI Session

Paste this at the end of any session that produced UI code:

```
Before finishing this session, run the full design checklist from DESIGN.md against everything built today.

For each item that fails, fix it immediately. Do not skip any item.

After the checklist:
1. Check every font-weight in the output — remove any 600+ values
2. Check every spacing value — replace any non-4px-scale values
3. Check every animation — verify once:true, transform+opacity only, under 500ms
4. Check every color — verify no hex values that aren't in the design token system
5. Run: npm run build && npm run lint — zero errors

Report what you found and what you fixed.
```

---

## SESSION 0 — Project Scaffold

```
Read CLAUDE.md fully before writing any code. Use context7 for all Next.js and shadcn docs.

Scaffold the Latchclub landing page project with this exact setup:

1. Initialize Next.js 15 with App Router, TypeScript strict, Tailwind CSS v4:
   npx create-next-app@latest latchclub --typescript --tailwind --app --src-dir=false --import-alias="@/*"

2. Install dependencies:
   npm install framer-motion @supabase/supabase-js
   npm install -D @types/node

3. Install shadcn/ui and initialize:
   npx shadcn@latest init
   (Choose: Default style, neutral base color, yes for CSS variables)

4. Add these shadcn components:
   npx shadcn@latest add button input sheet badge table

5. Create the full file structure exactly as defined in CLAUDE.md

6. Set up /lib/supabase.ts and /lib/utils.ts as defined in CLAUDE.md

7. Set up .env.local with placeholder values

8. Create a minimal app/layout.tsx with:
   - Inter font (Google Fonts via next/font)
   - Proper metadata for Latchclub (title, description, og tags)
   - viewport meta
   - Dark mode class support via next-themes

9. Create a minimal app/page.tsx that imports and renders all section components as empty placeholders

10. Verify: npm run build passes with no errors

Output: Confirm each step completed and show final file tree.
```

---

## SESSION 1 — Navbar + Hero

```
Read CLAUDE.md fully before writing any code. Use context7 for latest Motion and shadcn docs.

Build the Navbar and Hero section for the Latchclub landing page.

NAVBAR (components/layout/Navbar.tsx):
- "use client" — needs scroll state
- Logo: text-based "latchclub" — "latch" regular weight, "club" font-weight 500
- Nav links: "How it works", "Merchants", "Pricing" — hidden on mobile
- CTA button: "Join waitlist" using shadcn Button, scrolls to #waitlist anchor
- Sticky: after 80px scroll, add border-bottom with 0.5px border in muted color
- Mobile: shadcn Sheet component with hamburger icon (Lucide Menu icon)
- Animate navbar items in on mount with Motion (stagger 0.05s, fade from opacity 0)

HERO (components/sections/Hero.tsx):
- "use client" — needs Motion
- Badge: small pill "Coming to Canada — Join the waitlist" 
- H1: "Save more." on line 1, "Experience more." on line 2 — second line in muted foreground color
  - Desktop: 56px, mobile: 38px
  - letter-spacing: -0.03em
  - font-weight: 500
- Subtext: "One membership. Hundreds of exclusive deals at the best restaurants, spas, and experiences across Canada."
  - 18px, muted, max-width 480px, centered
- WaitlistForm component with id="waitlist" anchor
- Social proof: "Join 1,200+ Canadians already on the waitlist" — 13px muted
- ANIMATIONS (Motion, viewport once:true):
  - Badge: fade in, delay 0
  - H1 line 1: slide up from y:20, delay 0.1
  - H1 line 2: slide up from y:20, delay 0.2
  - Subtext: fade in, delay 0.3
  - Form: fade in, delay 0.4
  - Social proof: fade in, delay 0.5

WAITLISTFORM (components/shared/WaitlistForm.tsx):
- "use client"
- Email input (shadcn Input) + Submit button (shadcn Button) inline on desktop, stacked on mobile
- States: idle → loading (spinner in button) → success ("You're on the list!") → error
- On submit: POST to /api/waitlist with { email }
- Validate email format before submitting
- On success: replace form with success message, no page reload

Use the exact animation pattern from CLAUDE.md. No inline styles — Tailwind only.
TypeScript strict. No any types.
```

---

## SESSION 2 — App Preview + How It Works

```
Read CLAUDE.md fully before writing any code. Use context7 for Motion docs.

Build two sections: AppPreview and HowItWorks.

APP PREVIEW (components/sections/AppPreview.tsx):
- "use client" for Motion
- 3 phone mockup cards arranged in a staggered row (center card slightly higher)
- Each card is a rounded rectangle (border-radius 24px) with:
  - A mock app header (app name, city subtitle, avatar initials)
  - Tab bar (3 category tabs, one "active")
  - One deal card with: colored placeholder image area, deal name, category, discount badge
- Categories and colors:
  - Phone 1: "Dining" — blue tint image area, "Canoe Restaurant", "2-for-1 dining"
  - Phone 2: "Wellness" — amber tint image area, "Elmwood Spa", "50% off treatments"  
  - Phone 3: "Experiences" — pink tint image area, "Casa Loma Tours", "Buy 1 get 1 free"
- ANIMATION: each phone slides up from y:40 with stagger 0.15s, viewport once
- On mobile: show only center phone, hide left and right

HOW IT WORKS (components/sections/HowItWorks.tsx):
- "use client" for Motion
- Section label: "HOW IT WORKS" — 11px, uppercase, letter-spacing 0.1em, muted color
- H2: "Three steps to saving." — 36px desktop, 28px mobile, font-weight 500, letter-spacing -0.02em
- Paragraph: "Latchclub connects you with exclusive deals from Canada's top local businesses — all with one simple membership."
- 3-column grid (stack on mobile) with steps:
  - 01 / "Join as a member" / "Sign up and choose your membership tier. Cancel anytime."
  - 02 / "Browse deals" / "Explore hundreds of exclusive offers across dining, wellness, travel, and experiences."
  - 03 / "Redeem and save" / "Show your digital pass at checkout. No vouchers, no fuss — just instant savings."
- Each step: top border line → step number (muted, 13px) → title (16px, 500) → description (14px, muted)
- ANIMATION: steps stagger in from y:20, viewport once

Divider between sections: full-width 0.5px border in muted color.
TypeScript strict. No any types.
```

---

## SESSION 3 — Pricing + Footer

```
Read CLAUDE.md fully before writing any code. Use context7 for Motion and shadcn docs.

Build Pricing, FooterCTA, and Footer sections.

PRICING (components/sections/Pricing.tsx):
- "use client" for Motion
- Section label: "PRICING"
- H2: "Simple membership. Massive value."
- 3 cards in a grid (stack on mobile):

  Explorer (Free):
  - Badge: "Free"
  - Price: $0/month
  - Description: "Browse deals and see what's available near you."
  - Features: Browse all deals, 5 redemptions/month, One city
  - Button: "Get started free" (outline variant)

  Member ($15/mo): ← FEATURED
  - Badge: "Most popular" with filled background
  - Price: $15/month
  - Description: "Unlimited access to all deals across Canada."
  - Features: Unlimited redemptions, All cities, Early access to new deals, Priority support
  - Border: 2px solid (use foreground color, not muted)
  - Button: "Join waitlist" (filled/default variant)

  Family ($25/mo):
  - Badge: "Family"
  - Price: $25/month
  - Description: "Everything in Member, shared with up to 4 people."
  - Features: Up to 4 members, All Member features, Family dashboard
  - Button: "Join waitlist" (outline variant)

- Feature list items: small checkmark circle icon + text
- ANIMATION: cards scale from 0.96 to 1, fade in, stagger 0.1s, viewport once

FOOTER CTA (components/sections/FooterCTA.tsx):
- "use client"
- Centered layout, max-width 600px
- H2: "Canada's best deals, unlocked."
- Subtext: "Be the first to know when Latchclub launches in your city."
- WaitlistForm component (reuse existing)

FOOTER (components/layout/Footer.tsx):
- Server component
- 1px top border
- Logo left, links center ("Privacy", "Terms", "Contact"), copyright right
- © 2025 Latchclub — all rights reserved
- Mobile: stack vertically, centered

Update app/page.tsx to import and render ALL sections in correct order:
Navbar → Hero → AppPreview → HowItWorks → Pricing → FooterCTA → Footer

Run npm run build — fix any TypeScript or build errors before finishing.
```

---

## SESSION 4 — Polish + Animation Pass

```
Read CLAUDE.md fully before writing any code.

This is the animation and polish pass. Do NOT change functionality or layout — only refine.

1. GLOBAL ANIMATION CONSISTENCY:
   - Audit every section — all Motion animations must use viewport={{ once: true, amount: 0.15 }}
   - All entrance animations: duration 0.5s, ease [0.25, 0.1, 0.25, 1]
   - Stagger delays: 0.1s between children
   - No animation should feel abrupt or too fast

2. NAVBAR POLISH:
   - Smooth border-bottom transition on scroll (Motion layout animation or CSS transition 200ms)
   - Mobile menu: animate open/close with Motion (slide down from y:-10, fade in)
   - Active link highlight if using hash navigation

3. HERO TEXT:
   - Each word in H1 should animate in individually (split text by word, stagger 0.05s)
   - Use a reusable AnimatedText component for this

4. PRICING CARDS:
   - Add subtle hover state: featured card gets scale(1.02) on hover via Motion whileHover
   - Non-featured cards: slight border color change on hover

5. MOBILE RESPONSIVE AUDIT:
   - Test every section at 375px, 390px, 430px widths
   - Ensure all text is readable, no overflow
   - Pricing grid stacks vertically, featured card first on mobile
   - Phone mockups show single centered card on mobile

6. PERFORMANCE:
   - Add will-change: transform to animated elements only when needed
   - All images use next/image with proper width/height
   - No layout shift on page load

7. ACCESSIBILITY:
   - All interactive elements have proper aria-labels
   - Form has proper label association
   - Keyboard navigation works through all CTAs
   - prefers-reduced-motion: wrap all animations with useReducedMotion() hook from framer-motion

8. TYPOGRAPHY FINAL CHECK:
   - Verify NO font-weight above 500 anywhere
   - Heading letter-spacing: -0.02em to -0.04em
   - Body line-height: 1.65 to 1.75
   - All colors from Tailwind tokens only — no hex values in className

Run npm run build. Run npm run lint. Fix all warnings and errors.
```

---

## SESSION 5 — Admin Page + API

```
Read CLAUDE.md fully before writing any code. Use context7 for Supabase docs.

Build the admin panel and finalize backend.

1. WAITLIST API ROUTE (app/api/waitlist/route.ts):
   - Implement exactly as defined in CLAUDE.md
   - Add rate limiting: max 3 requests per IP per hour (use a simple in-memory Map or Upstash Redis if available)
   - Validate email format server-side too
   - Return proper error messages

2. ADMIN AUTH MIDDLEWARE (middleware.ts in root):
   - Protect /admin route
   - Redirect unauthenticated users to /admin/login
   - Use Supabase SSR auth helpers

3. ADMIN LOGIN PAGE (app/admin/login/page.tsx):
   - Simple centered form: email + password
   - shadcn Input and Button
   - On success: redirect to /admin
   - Minimal styling — functional only

4. ADMIN DASHBOARD (app/admin/page.tsx):
   - Header: "Latchclub Admin" + logout button
   - Stat card: total waitlist count (big number, 48px)
   - Full table of waitlist entries: Email | City | Joined date
   - Use shadcn Table component
   - Sort by newest first
   - Server component that fetches data using service role key (never expose in client)

5. Create a Supabase server client for admin use:
   - /lib/supabase-server.ts using service role key
   - Use only in server components and API routes

Run npm run build. Verify /admin redirects properly when not logged in.
```

---

## SESSION 6 — Deploy

```
Read CLAUDE.md fully. This is the deployment session.

1. Final pre-deploy checklist:
   - npm run build passes with 0 errors
   - npm run lint passes with 0 warnings
   - All environment variables documented in .env.example (with placeholder values, no real keys)
   - .env.local is in .gitignore (verify this)
   - No console.log statements in production code
   - All TODO comments resolved or removed

2. Vercel deployment:
   - Initialize git repo if not already done
   - Push to GitHub (use GitHub MCP to create repo and push)
   - Go to vercel.com and import the GitHub repo
   - Add all environment variables from .env.local to Vercel project settings
   - Deploy

3. Custom domain:
   - In Vercel project settings → Domains → add latchclub.ca
   - Follow DNS configuration instructions for the registrar

4. Post-deploy verification:
   - Test waitlist form on live URL — verify email appears in Supabase
   - Test admin login at latchclub.ca/admin
   - Test on iPhone Safari (mobile)
   - Check all animations work on live site
   - Verify no console errors

5. Create a git tag: v0.1.0-landing
```

---

## BONUS: /inspo Folder Reading Prompt (add to start of ANY UI session)

```
Before writing any code for this session:
1. Read CLAUDE.md fully
2. List all files currently in /inspo/ and its subfolders
3. For each file relevant to what I'm about to build, describe:
   - The layout structure you observe
   - The spacing and whitespace rhythm
   - The typography: sizes, weights, letter-spacing
   - Any animation behavior visible (for .mp4 files, describe what you can infer)
   - Component patterns worth adopting
4. Then build, applying those patterns to Latchclub's brand
```

---

## BONUS: Screenshot-to-Code Prompt
Use this when you have reference screenshots to share:

```
Read CLAUDE.md fully before writing any code.

I'm attaching [N] reference screenshots from [website name]. 
Analyze the layout, spacing, typography, and component patterns.

Build the [section name] section for Latchclub that captures the same aesthetic feeling as these references, but adapted to:
- Our brand (latchclub.ca, Canadian deals membership)
- Our exact tech stack (Next.js 15, Tailwind v4, shadcn/ui, Motion)
- Our design principles from CLAUDE.md (premium, minimal, Apple-like)

Do NOT copy colors, logos, or content. Capture the spatial rhythm and component patterns only.

[attach screenshots]
```
