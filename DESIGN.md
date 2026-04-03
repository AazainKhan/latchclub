# DESIGN.md — Latchclub Frontend Design Reference
> Read this file alongside CLAUDE.md before writing any UI code.
> This is not optional. Bad design is a bug. Treat every design rule here as code-level constraints.

---

## The One Rule That Governs Everything

**Design is communication, not decoration.**
Every spacing choice, font size, color, and animation either helps the user understand or gets in their way.
If you can't explain why a design decision is there, remove it.

The sites that look premium (Linear, Stripe, Vercel, Apple) share one trait: **ruthless subtraction.**
They don't add effects to look good. They remove everything until only what matters remains.

---

## 1. Gestalt Psychology — How the Eye Groups Things

The brain doesn't see pixels. It sees patterns. These are the rules it follows:

### Proximity — the most powerful rule
Elements close together are perceived as related. Unequal spacing communicates structure.

```css
/* WRONG — equal spacing = no hierarchy */
.form { gap: 16px; }

/* RIGHT — tight within groups, wide between groups */
.form-group { margin-bottom: 24px; }   /* Between groups: wide */
.form-group label { margin-bottom: 4px; }  /* Label to input: tight */
```

**Rule for Latchclub:** Section padding minimum `5rem`. Internal component padding `1rem–1.5rem`. Whitespace is not wasted — it creates hierarchy.

### Similarity — same look = same function
If two things look the same, users assume they do the same thing. This is why consistency in button styles, card treatments, and typography is non-negotiable.

**Rule for Latchclub:** One button style per intent. All "join waitlist" CTAs look identical. All section labels look identical. No exceptions.

### Figure-Ground — content must clearly separate from background
Users need to distinguish what to focus on from what to ignore.

```css
/* Cards need enough separation from the page */
.card {
  background: var(--color-surface);
  border: 0.5px solid hsl(0 0% 0% / 0.08);
  border-radius: var(--radius-lg);
}
/* No drop shadows on minimal designs — use border instead */
```

### Continuity — the eye follows alignment
Left-align everything on a consistent grid. When one element breaks the alignment, it must be intentional and meaningful — not accidental.

**Rule for Latchclub:** All section content uses `max-width: 900px; margin: 0 auto;`. No orphaned elements floating off-grid.

### Closure — users complete incomplete shapes
You don't need to draw every border. A partially visible card communicates scrollability. A subtle line communicates separation. Less is enough.

---

## 2. Typography — The Single Most Important Design Element

Good typography is **invisible**. Users read the content, not the type itself.

### The Type Scale for Latchclub
Use a modular scale (1.25 ratio). Never deviate from these sizes:

| Token | Size | Weight | Use |
|---|---|---|---|
| `--text-xs` | 11px | 400 | Labels, captions, legal |
| `--text-sm` | 13px | 400 | Secondary body, metadata |
| `--text-base` | 16px | 400 | Primary body copy |
| `--text-lg` | 18px | 400 | Large body, hero subtext |
| `--text-xl` | 24px | 500 | Small headings, card titles |
| `--text-2xl` | 32px | 500 | Section H2 (mobile H1) |
| `--text-3xl` | 40px | 500 | Section H2 desktop |
| `--text-4xl` | 52px | 500 | Page H1 (mobile) |
| `--text-5xl` | 64px | 500 | Page H1 (desktop) |

**Hard rules:**
- Font weights: **400 and 500 only.** Never 600, 700, 800.
- Letter spacing on headings: **-0.02em to -0.04em** (tight, like Apple/Linear)
- Letter spacing on labels/caps: **+0.08em to +0.12em** (opened up)
- Line height on headings: **1.1 to 1.15**
- Line height on body: **1.65 to 1.75**
- Max line length: **60–75 characters** (`max-width: 65ch`)
- Never go below 13px for any visible text
- Body text is always **16px minimum**

### Typography Hierarchy Pattern (used on every section)
```
SECTION LABEL     → 11px, 400, uppercase, +0.1em spacing, muted color
H2 Headline       → 36–40px, 500, -0.02em spacing, full opacity
Supporting text   → 16–18px, 400, 1.7 line-height, muted (60–70% opacity)
Body / details    → 16px, 400, muted
```

### Font Pairing for Latchclub
- **Headings + UI:** Geist (Vercel's font — clean, modern, designed for screens)
- **Fallback stack:** `-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`
- Never use more than one font family

### Text Color System
```css
/* Use opacity variants — never hardcode grays */
--text-primary:   hsl(0 0% 5%);      /* Headlines, labels */
--text-secondary: hsl(0 0% 40%);     /* Body, descriptions */
--text-muted:     hsl(0 0% 60%);     /* Captions, metadata */
--text-subtle:    hsl(0 0% 80%);     /* Disabled, placeholder */
```

---

## 3. Spacing — The Second Most Important Element

Inconsistent spacing is the #1 thing that makes a site feel amateur.

### The Spacing Scale (4px base)
Use only these values. Never arbitrary numbers like 13px or 22px.

```
4px   — xs   (icon to label, badge padding)
8px   — sm   (tight internal padding)
12px  — md   (component internal gap)
16px  — lg   (standard gap, card padding)
24px  — xl   (between related elements)
32px  — 2xl  (between components)
48px  — 3xl  (section internal padding)
64px  — 4xl  (between sections, mobile)
96px  — 5xl  (between sections, desktop)
128px — 6xl  (hero padding, dramatic sections)
```

**Rule:** Between sections, use `py-24` (96px) desktop, `py-16` (64px) mobile.
**Rule:** Between related elements inside a component, use 8px–16px.
**Rule:** Between unrelated elements, use 24px–32px minimum.

### The Whitespace Principle
> "If it feels too spacious, you're close to optimal. If it feels cramped, you're definitely not."

More padding always wins over less. The premium feel of Apple, Linear, and Stripe comes directly from their aggressive use of whitespace. **When in doubt, double the spacing.**

---

## 4. Color — Minimal and Intentional

### Latchclub Color System
```css
:root {
  /* Backgrounds */
  --bg-page:      #ffffff;
  --bg-surface:   #f9f9f8;
  --bg-elevated:  #ffffff;

  /* Borders */
  --border-subtle:  hsl(0 0% 0% / 0.06);
  --border-default: hsl(0 0% 0% / 0.10);
  --border-strong:  hsl(0 0% 0% / 0.18);

  /* Text */
  --text-primary:   hsl(0 0% 5%);
  --text-secondary: hsl(0 0% 38%);
  --text-muted:     hsl(0 0% 58%);

  /* Accent — use sparingly */
  --accent:         #000000;         /* Black as primary CTA */
  --accent-success: #16a34a;         /* Green for badges/tags */
}
```

**Rules:**
- Maximum 3 colors on any page: black, white, one muted gray for text
- Accent colors only for: badges, success states, the featured pricing card
- Never use color to decorate — only to communicate meaning
- Background: white (`#fff`) or very slightly warm white (`#fafaf9`)
- No gradients. No colored section backgrounds. No glassmorphism.

### Contrast Requirements (WCAG AA)
- Body text on white: minimum 4.5:1 ratio
- Large text (18px+) on white: minimum 3:1 ratio
- Muted text minimum: `hsl(0 0% 38%)` on white = 4.6:1 ✅
- Never use `text-gray-400` (`#9ca3af`) on white — it fails contrast

---

## 5. Visual Hierarchy — Controlling What Users See First

Every page has one most important thing. Then a second. Then a third.
Your job is to make that order visually obvious without the user thinking about it.

### The Hierarchy Stack for Every Section
```
1. Section label (11px caps) — orients the user
2. H2 Headline (36–40px, 500) — the main message
3. Supporting text (16–18px, muted) — clarifies the promise
4. Content (cards, steps, etc.) — delivers the detail
5. CTA (if needed) — asks for action
```

### Size creates importance
```css
/* Eye goes: H1 → H2 → body → CTA → label */
h1 { font-size: clamp(2.5rem, 5vw, 4rem); }   /* Hero */
h2 { font-size: clamp(1.75rem, 3vw, 2.5rem); } /* Section */
p  { font-size: 1rem; }                          /* Body */
```

### Contrast creates focus
```css
/* High contrast = important. Low contrast = supporting. */
.headline  { color: var(--text-primary); }    /* Near black */
.body-text { color: var(--text-secondary); }  /* 60% gray */
.label     { color: var(--text-muted); }      /* 40% gray */
```

### Spacing creates relationships
```css
/* Wide gap = different section. Tight gap = same component. */
.section + .section { margin-top: 96px; }
.card-title + .card-body { margin-top: 8px; }
```

---

## 6. Animation — Motion With Purpose

**The golden rule: Motion should explain, not decorate.**
Every animation on Latchclub must answer: "What does this teach the user?"

### Animation Timing Tokens
```css
:root {
  --ease-out:     cubic-bezier(0.25, 0.1, 0.25, 1);
  --ease-spring:  cubic-bezier(0.34, 1.56, 0.64, 1);  /* Subtle bounce — use sparingly */
  --ease-linear:  linear;

  --duration-fast:   150ms;   /* Hover states, micro-interactions */
  --duration-base:   300ms;   /* Page elements, reveals */
  --duration-slow:   500ms;   /* Section entrances */
  --duration-slower: 700ms;   /* Hero, dramatic moments */
}
```

### The 4 Animation Types for Latchclub

**1. Entrance (scroll-triggered):**
```tsx
// Every section block — use this exact pattern
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
  }
}
// viewport={{ once: true, amount: 0.15 }} — always
```

**2. Stagger (children entering in sequence):**
```tsx
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
}
// 0.08s stagger for cards, 0.05s for text words
```

**3. Micro-interaction (hover/tap):**
```tsx
// Buttons: whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
// Cards: whileHover={{ y: -2 }} — 2px lift max
// Timing: 150ms ease-out — instant feel, not laggy
```

**4. Page load (hero only):**
```tsx
// Hero elements: animate on mount (not scroll)
// Use initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
// Stagger: 0.1s between hero elements
```

### Animation Rules (Non-Negotiable)
- `viewport={{ once: true }}` on every scroll animation — never repeat
- `amount: 0.15` — trigger when 15% of element is visible
- No animation longer than 600ms (anything longer feels slow)
- No bouncy spring on professional/minimal designs — use ease-out
- Respect `prefers-reduced-motion` — wrap everything:
```tsx
const { prefersReducedMotion } = useReducedMotion()
const variants = prefersReducedMotion ? {} : fadeUp
```
- Never animate color directly — it's expensive. Animate opacity and transform only.
- `will-change: transform` only on actively animating elements

### What NOT to animate on Latchclub
- Background colors (expensive, jarring)
- Width/height (causes layout reflow)
- Multiple properties simultaneously beyond opacity + transform
- Auto-playing looped animations — only on user scroll/hover

---

## 7. Component Design Patterns

### Cards
```css
/* Latchclub card base */
.card {
  background: var(--bg-elevated);
  border: 0.5px solid var(--border-default);
  border-radius: 12px;           /* --radius-lg */
  padding: 1.25rem 1.5rem;
}
/* Never: box-shadow on minimal cards. Use border. */
/* Featured/highlighted: border-width: 2px, border-color: var(--text-primary) */
```

### Buttons
```css
/* Primary CTA */
.btn-primary {
  background: var(--text-primary);   /* Black */
  color: white;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 15px;
  font-weight: 500;
  border: none;
  transition: opacity 150ms ease;
}
.btn-primary:hover { opacity: 0.85; }  /* Fade, not color change */

/* Secondary */
.btn-secondary {
  background: transparent;
  border: 0.5px solid var(--border-strong);
  color: var(--text-primary);
  /* Same size/radius as primary */
}
```

### Section Labels
```css
/* The small uppercase label above every H2 */
.section-label {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 12px;
}
```

### Badges / Pills
```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  border-radius: 100px;
  font-size: 12px;
  font-weight: 500;
  border: 0.5px solid var(--border-default);
  color: var(--text-secondary);
  background: var(--bg-surface);
}
/* Success badge (deal tags): */
.badge-success {
  background: #f0fdf4;
  color: #16a34a;
  border-color: #bbf7d0;
}
```

---

## 8. Responsive Design Rules

### Breakpoints
```css
--mobile:  375px   /* Smallest supported */
--sm:      640px
--md:      768px
--lg:      1024px  /* Primary desktop target */
--xl:      1280px
```

### Mobile-First Rules
- Start with mobile layout, add complexity for larger screens
- Never hide critical content on mobile — reorder instead
- Touch targets minimum: 44px × 44px
- Font size minimum on mobile: 15px body, 32px H1
- Horizontal padding on mobile: 20px minimum each side
- Single column on mobile: everything stacks
- Featured pricing card: shows first on mobile

### Typography Responsive Scale
```css
/* Use clamp() — scales fluidly between breakpoints */
h1 { font-size: clamp(2rem, 5vw + 1rem, 4rem); }
h2 { font-size: clamp(1.5rem, 3vw + 0.5rem, 2.5rem); }
p  { font-size: clamp(1rem, 1.5vw, 1.125rem); }
```

---

## 9. Design Checklist — Run Before Every Session Ends

Copy this into every Claude Code session before marking it done:

```
TYPOGRAPHY
□ All font weights are 400 or 500 only — no 600, 700, 800
□ Heading letter-spacing is negative (-0.02em or tighter)
□ Body line-height is 1.65–1.75
□ Max line length: 65ch on body text
□ No text below 13px visible to user
□ Section labels: 11px, uppercase, +0.1em tracking

SPACING  
□ Section padding: py-24 desktop (96px), py-16 mobile (64px)
□ Internal component gaps use 4px scale only (4/8/12/16/24/32px)
□ No arbitrary spacing values (13px, 22px, 37px)
□ Whitespace between unrelated elements: 24px minimum

COLOR
□ Maximum 3 colors on any view
□ No gradients, no colored section backgrounds
□ Muted text passes 4.5:1 contrast on white
□ Borders are max 0.5–1px, never heavy
□ Featured cards use 2px border-foreground, not a color

ANIMATION
□ All scroll animations have viewport={{ once: true, amount: 0.15 }}
□ Duration: 300–500ms. Nothing longer.
□ Only transform + opacity animated (never color, width, height)
□ useReducedMotion() implemented
□ No looping or auto-playing animations
□ Stagger: 0.08–0.1s between children

VISUAL HIERARCHY
□ One primary CTA per section — never two competing buttons
□ H1 → H2 → body → CTA order respected everywhere
□ Section labels appear before H2 always
□ Most important element has most contrast/size

COMPONENTS
□ Cards: 0.5px border, 12px radius, no box-shadow
□ Buttons: consistent padding/radius everywhere
□ All CTAs scroll to #waitlist or navigate — no dead buttons

MOBILE
□ Tested at 375px — no overflow, no tiny text
□ Touch targets minimum 44px
□ Single column layout on mobile for all grids
□ Pricing: featured card first on mobile

ACCESSIBILITY
□ Color contrast passes WCAG AA (4.5:1 body, 3:1 large)
□ All images have alt text
□ Form inputs have associated labels
□ Keyboard navigation works through all interactive elements
□ Focus states visible
```

---

## 10. Reference Sites — What to Study

These are the sites that define the standard. Study them before building:

| Site | What to learn |
|---|---|
| **linear.app** | Tight letter-spacing, section rhythm, scroll animations |
| **stripe.com** | Typography hierarchy, gradient-free premium feel |
| **vercel.com** | Minimal bento grid, dark/light balance, card patterns |
| **arc.net** | Animation timing, entrance sequences, micro-interactions |
| **raycast.com** | Feature sections, screenshot presentation, badges |
| **notion.so** | Clean body typography, whitespace, pricing layout |
| **resend.com** | Minimal landing page, developer-aesthetic precision |
| **loom.com** | App showcase/mockup sections done right |
