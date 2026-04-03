# Checkout.com — Design Research Notes

> Site: https://www.checkout.com/
> Captured: April 2026
> Purpose: Extract design patterns applicable to Latchclub landing page

---

## Overall Impression

Checkout.com is a dark-mode-dominant, enterprise fintech landing page with a bold, confident visual identity. The page uses a monospaced serif display font for headings, creating a distinctive "technical premium" feel. The design is extremely polished with sophisticated animation choreography, generous whitespace, and a disciplined 3-color palette.

---

## Typography

### Fonts
- **Display / Headings:** `"Checkout Apercu SemiMono", sans-serif` — a custom monospaced serif face. Gives headings a distinctive editorial/technical quality.
- **Body / UI:** `Inter, sans-serif` — clean, modern sans-serif for all body text, navigation, buttons, and descriptions.

### Heading Hierarchy (Desktop)
| Element | Font Size | Weight | Line Height | Letter Spacing | Transform | Color |
|---------|-----------|--------|-------------|----------------|-----------|-------|
| H1 (Hero) | 80px | 700 | 72px (0.9em) | normal | uppercase | white `rgb(255,255,255)` |
| H2 (Section titles) | 48px | 700 | 43.2px (0.9em) | -1.92px (-0.04em) | uppercase | white |
| H1 Mobile | 40px | 700 | 36px (0.9em) | normal | uppercase | white |

### Body Text
| Element | Font Size | Weight | Line Height | Color |
|---------|-----------|--------|-------------|-------|
| Hero subtext | 16px | 400 | 24px (1.5em) | white `rgb(255,255,255)` |
| Section descriptions | 16px | 400 | 24px (1.5em) | white |
| Max-width on hero subtext | — | — | — | 399px |

### Key Typography Observations
- **All headings are uppercase** — this is a strong design choice that creates visual authority
- **Line height on headings is very tight: 0.9em** — creates dense, impactful headline blocks
- **Letter spacing on H2 is -0.04em** — tight tracking for that premium, Apple-like feel
- **Font weights used across the site:** 300, 400, 500, 600, 700
- **H1 hero is split across 3 lines** ("WHERE / THE WORLD / CHECKS OUT") — each line is a separate element, enabling staggered animation
- **"CHECKS OUT" appears in blue (#186AFF) on mobile** — accent color on the key phrase only
- **Section labels ("SPOTLIGHT")** use 14px, 700 weight, uppercase, letter-spacing 1.7px
- **"Learn more" links** use the mono font at 11px, 700 weight — small but authoritative

---

## Color Palette

### Primary Colors (3-color system)
| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| Background | Black | `#000000` / `rgb(0,0,0)` | All sections, full page |
| Text | White | `#FFFFFF` / `rgb(255,255,255)` | All headings, body text |
| Accent | Blue | `#186AFF` / `rgb(24,106,255)` | CTA buttons, active states, accent text, links |

### Secondary/Utility Colors
| Role | Color | Hex |
|------|-------|-----|
| Nav background | Dark charcoal | `#181818` |
| Nav hover state | Darker gray | `#272932` |
| Dividers | Medium gray | `#5C5B61` |
| Secondary/muted text | Gray | `#938F95` / `#B4AFB6` |
| Spotlight badge | Purple | `#AD55FF` / `rgb(173,85,255)` |
| Product tab active | Lime/Neon green | (visible in screenshots — approximately `#BFFF00`) |

### Color Observations
- **Entire page is dark mode** — solid black background throughout, no white/light sections at all
- **Strict 3-color discipline** — black, white, blue. Purple and lime green appear only as small UI accents
- **No gradients on backgrounds** — clean, flat black
- **Blue is used very sparingly** — only for CTA buttons and occasional accent text
- **The neon green/lime on product tabs is a bold accent choice** — draws the eye to the active tab

---

## Spacing & Layout

### Section Padding (Desktop)
| Section | Padding Top | Padding Bottom |
|---------|-------------|----------------|
| Hero | 0px | 0px (full bleed) |
| Products section | 120px | 120px |
| Spotlight/Parallax | 80px | 80px |
| Forrester promo | 80px | 80px |
| Case studies carousel | 120px | 80px |
| CTA/engagement | 64px | 64px |
| Performance metrics | 80px | 80px |

### Layout Patterns
- **Content max-width:** Approximately 1200-1280px centered
- **Hero layout:** Full-viewport height, centered text with floating image cards on both sides (3 left, 3 right)
- **Hero text container:** ~399px max-width for subtext (very narrow, forces readability)
- **Sections use generous vertical padding:** Minimum 64px, up to 120px
- **The page is approximately 13,140px tall** — extremely long-scroll, content-rich

### Grid Patterns
- **Product tabs:** Horizontal pill row, 5 items centered
- **Case studies:** 3D carousel wheel (not a traditional grid)
- **Developer resources:** 3-column card grid
- **FAQ:** Single-column stacked accordion
- **Footer:** Multi-column link grid (5-6 columns)

---

## Components

### Navbar
- **Position:** Sticky (`position: sticky; top: 0`)
- **Background:** Dark charcoal `#181818` — slightly lighter than page background to create subtle separation
- **Height:** ~126px total (includes padding and announcement bar above)
- **Inner nav bar:** Has rounded corners, floating over the page
- **Layout:** Logo left, nav links center (Products, Solutions, Documentation & Resources, Company), buttons right
- **Business/Personal toggle** sits above the main nav bar
- **Announcement banner** above everything: "Checkout.com is a Leader in The Forrester Wave" with "Learn more" pill and close button
- **Nav link style:** Inter font, dropdown toggles with hover underline animation
- **Hover state:** `background-color: rgba(240, 247, 255, 0.5)` — very subtle blue-white tint

### CTA Button ("Get in touch")
| Property | Value |
|----------|-------|
| Background | `#186AFF` (blue) |
| Color | White |
| Border radius | 6px |
| Padding | 12px 24px |
| Font size | 14px |
| Font weight | 500 |
| Font family | Inter |
| Border | none |
| Text transform | none (sentence case) |

### Secondary Button ("Sign in")
| Property | Value |
|----------|-------|
| Background | Transparent |
| Color | White |
| Border radius | 6px |
| Padding | 11px 23px |
| Border | 1px solid white |

### Spotlight Badge
| Property | Value |
|----------|-------|
| Background | `#AD55FF` (purple) |
| Color | White |
| Border radius | 8px |
| Padding | 12px 16px 10px |
| Font size | 14px |
| Font weight | 700 |
| Font family | Checkout Apercu SemiMono |
| Text transform | uppercase |
| Letter spacing | 1.7px |

### Product Tab Pills
- **Container:** Rounded pill bar containing all 5 tabs
- **Active tab:** Bright lime/neon green background with dark text
- **Inactive tabs:** Dark gray background with white text
- **Labels:** Uppercase monospaced font (CONNECT, MOVE, BOOST, PROTECT, MANAGE)
- **Layout:** Horizontally centered, evenly spaced

### Case Study Carousel
- **Incredible 3D wheel/carousel** — cards are arranged in a circular arc, tilted at angles
- **Each card:** Large image with brand logo overlay, colorful backgrounds matching each brand
- **Center card is largest** (featured), cards to the side are progressively smaller and more tilted
- **Below carousel:** Brand logo, description text, and "Read more" CTA
- **Arrow navigation:** Left/right arrows flanking the description
- **Uses GSAP** for the 3D rotation/scaling animation
- **Brands shown:** Spotify (green), Pinterest (red), eBay (blue), Uber (dark), Trip.com (blue), Vinted (teal)

### FAQ Accordion
- **Toggle animation:** `grid-template-rows` from `0fr` to `1fr`
- **Easing:** `cubic-bezier(0.23, 1, 0.32, 1)` — smooth, slightly bouncy deceleration
- **Duration:** 800ms
- **Active state:** Toggle text color changes to blue `#186AFF`
- **Dividers:** Animated line holders between items (no traditional borders)

### Metrics Counter ("$300BN")
- **Animated counter** using `requestAnimationFrame`
- **Duration:** 3000ms
- **Triggered by:** IntersectionObserver at 10% viewport threshold
- **Number formatting:** `toLocaleString()` for comma separators
- **Large display number** with supporting label text below

---

## Animation & Motion

### Scroll Entrance Animations
- **Primary animation:** Elements start at `opacity: 0` with `transform: translate3d(0, 8rem, 0)` — fade up from 128px below
- **GPU-accelerated:** Uses `translate3d()`, `scale3d()`, `rotateZ(0)` for GPU compositing
- **Performance optimized:** `backface-visibility: hidden`, `will-change` properties
- **Triggered by:** Intersection observers and Webflow's `data-w-id` / `data-ix` attributes

### Hero Animation
- **Image cards float/parallax** on both sides of the centered text
- **Likely scroll-linked parallax** on the surrounding image cards
- **Text stagger:** Individual lines ("WHERE", "THE WORLD", "CHECKS OUT") animate in sequence

### Carousel/Swiper Speeds
- **Logo marquee:** `speed: 8000` (very slow, continuous scroll)
- **Case study carousel:** `speed: 400-600` (medium speed transitions)
- **Marquee uses custom cloning logic** to ensure minimum 20 slides for seamless loop

### Overall Animation Feel
- **Medium-to-slow pace** — nothing feels rushed
- **Entrance direction:** Primarily upward (fade + slide up)
- **Easing:** Smooth deceleration curves (ease-out family)
- **Parallax on hero:** Images on sides move at different speeds during scroll

---

## Mobile Design (390px)

### Key Mobile Differences
- **Navbar:** Logo left, hamburger menu right (3-line icon)
- **Hero H1:** Drops to 40px (from 80px desktop) with 36px line-height
- **Announcement bar:** Condensed, shorter text ("A Leader in The Forrester Wave")
- **Hero layout:** Single column, centered text, no floating image cards visible
- **"CHECKS OUT" in blue** — accent color treatment on mobile only
- **Logo marquee bar** visible below the CTA
- **Products section title** partially visible at bottom of first viewport
- **CTA button:** Full-width or near-full-width on mobile

---

## What to Steal for Latchclub (Top 5 Patterns)

### 1. Split-Line Hero Headline with Staggered Animation
The H1 is broken into 3 separate elements ("WHERE" / "THE WORLD" / "CHECKS OUT"), each animating independently with a stagger delay. For Latchclub: break "Save more." / "Experience more." into separate animated lines. Use 48-56px font size, uppercase, tight line-height (0.9em), letter-spacing -0.03em. Stagger each line by 100-150ms, animating from `opacity: 0, y: 128px` to `opacity: 1, y: 0`.

### 2. Floating Contextual Imagery Flanking the Hero Text
Checkout.com places 6 photographic cards (3 per side) floating around the centered hero text, creating visual richness without cluttering the message. For Latchclub: place 3-4 app mockup cards at varying positions and scales around the hero text. Use subtle parallax (different scroll speeds) and slight rotation for depth. This replaces the static "3 staggered phone mockups" spec with something more dynamic and premium.

### 3. Pill Tab Navigation for Product/Feature Categories
The product section uses a centered horizontal pill bar (CONNECT, MOVE, BOOST, PROTECT, MANAGE) with a lime-green active indicator. For Latchclub: use this pattern for the "How It Works" steps or feature categories (Dining, Wellness, Experiences). Rounded pill container with dark background, uppercase labels in monospace/display font, active pill gets brand-color background. Each tab click/scroll reveals different content below.

### 4. Section Label Badge + Split Layout (Heading Left, Description Right)
The Spotlight sections use a small colored badge ("SPOTLIGHT" in purple), a large uppercase heading on the left half, and description text + "Learn more" arrow link on the right half. For Latchclub: use this asymmetric layout for feature sections. Small badge ("HOW IT WORKS" or "PRICING"), large heading left, supporting text right. The badge uses: 14px, 700 weight, uppercase, 1.7px letter-spacing, 8px border-radius, colored background.

### 5. Dual-Style Button Pair (Primary Fill + Secondary Outline)
The nav uses two perfectly balanced buttons side by side: "Sign in" (transparent + 1px white border, 6px radius) and "Get in touch" (solid blue fill, 6px radius, no border). Same padding, same radius, same font. For Latchclub: use this exact pattern. Primary CTA gets solid fill (brand color), secondary action gets transparent + 1px border. Both use 14px Inter, 500 weight, 12px 24px padding, 6px radius. Never use more than these two button styles.

---

## Additional Patterns Worth Noting

### Counter Animation on Metrics
The "$300BN" number counts up from 0 over 3 seconds using `requestAnimationFrame`, triggered by IntersectionObserver. For Latchclub: use this for the social proof line ("Join 1,200+ Canadians") — animate the number counting up when it enters the viewport.

### FAQ Accordion with grid-template-rows
Instead of `max-height` hacks, Checkout.com uses `grid-template-rows: 0fr` to `1fr` transition at 800ms with `cubic-bezier(0.23, 1, 0.32, 1)`. This is the modern, clean way to animate accordions. Apply directly to Latchclub FAQ section.

### Continuous Logo Marquee
Brand logos scroll infinitely at very slow speed (8000ms per slide width). Clone logic ensures minimum 20 items for seamless loop. For Latchclub: if showing partner/merchant logos, use this pattern instead of a static grid.

### Entrance Animation Baseline
Standard entrance: `opacity: 0` + `translateY(8rem)` as initial state, animating to visible position. This is a much larger offset than the typical 24px — creates more dramatic reveals. Consider using 64-128px offsets for Latchclub hero elements, 24-32px for regular section content.

---

## What NOT to Copy

- **Full dark mode** — Latchclub is a consumer deals platform, not enterprise fintech. Dark mode would feel wrong for the friendly, accessible brand.
- **Uppercase everything** — Works for Checkout.com's authority/enterprise positioning. Latchclub should use uppercase sparingly (section labels only, per DESIGN.md).
- **Custom monospaced font** — Too technical. Stick with a clean sans-serif for Latchclub.
- **8rem (128px) entrance offsets on all elements** — Too dramatic for a consumer landing page. Use 24px as specified in CLAUDE.md, reserve larger offsets for hero only.
- **13,000px page length** — Latchclub should be much shorter and more focused. Every section earns its place.
