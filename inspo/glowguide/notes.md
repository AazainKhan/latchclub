# GlowGuide (glowguide.com) — Design Research Notes

> Captured: 2026-04-02
> Platform: Webflow + GSAP 3.12.2 + custom JS
> Page type: Beauty/skincare app landing page with waitlist + App Store CTA

---

## Typography

### Font Families (3 fonts total)
1. **PP Right Serif Mono** (Georgia fallback) — all headings (H1, H2, section titles)
   - Serif monospaced font with elegant, editorial feel
   - Used exclusively at display/heading sizes
2. **Khteka** (Arial fallback) — subheadings, feature titles (H3-level)
   - Clean sans-serif with slightly geometric character
3. **Beltram** (Arial fallback) — body text, navigation, links, descriptions
   - Lightweight sans-serif, very clean

### Font Sizes (extracted from computed styles)
| Element | Size | Weight | Letter-spacing | Line-height | Transform |
|---------|------|--------|----------------|-------------|-----------|
| H1 (hero) | ~64px (clamp 2rem-4rem) | 400 | normal | 0.94em (60px) | uppercase |
| H2 (section titles) | 48px | 400 | 0.36px | 0.94em (45px) | uppercase |
| H3 (feature cards) | ~36px | 400 | 0.36px | 0.94em (34px) | none |
| Display text | clamp(1.75rem-5rem) | 400 | normal | tight | uppercase |
| Body / descriptions | 18px | 300 | 0.36px | 1.3 (23.4px) | none |
| Nav links | 18px | 300 | 0.36px | 1.3 | none |
| Small links (Terms) | 12px | 300 | 0.24px | 1.3 | none |

### Key Typography Observations
- **All weights are 300-400.** No bold text anywhere on the page. Maximum weight is 400 (regular). Body text uses 300 (light). This creates an extremely refined, editorial feel.
- Headings use **uppercase + serif mono** — a striking contrast against the light sans-serif body
- The **two-tone heading technique** is the signature move: first line in muted color `rgb(131, 120, 111)`, second line in black `rgb(0, 0, 0)`. Creates visual hierarchy within a single heading block.
- Line-height on headings is very tight: ~0.94em. This stacks uppercase lines close together for a compact, impactful block.
- Letter-spacing on body is slightly positive (0.36px) — adds airiness to the light weight text.
- Uses `clamp()` for fluid responsive sizing, not breakpoint jumps.

---

## Color Palette

### Primary Colors (5 total, very restrained)
| Color | Value | Usage |
|-------|-------|-------|
| Black | `rgb(0, 0, 0)` | Primary text, heading emphasis line |
| White | `rgb(255, 255, 255)` | Background, text on colored sections |
| Muted Taupe | `rgb(131, 120, 111)` | Secondary text, heading de-emphasis line, descriptions |
| Coral/Burnt Orange | `rgb(203, 115, 75)` / `#cb734b` | Accent dots, pill buttons, warm highlights |
| Lavender | `rgb(203, 193, 237)` / light purple | "Challenges" section full background |

### Secondary / Supporting Colors
| Color | Value | Usage |
|-------|-------|-------|
| Light Peach Cream | `rgb(252, 245, 242)` | Suggestions section background |
| Warm Sand | `rgb(247, 234, 228)` | Card backgrounds, subtle warmth |
| Peach | `rgb(237, 207, 193)` | Pill buttons, badges |
| Light Pink | `rgb(255, 222, 222)` | Subtle accent |
| Dark Muted | `rgb(51, 51, 51)` | Footer text |
| Light Gray | `rgb(161, 159, 158)` | Tertiary/disabled text |

### Gradients
- **Radial gradient glow (coral):** `radial-gradient(circle closest-side at 50% 50%, rgba(203, 115, 75, 0.2), transparent 75%)` — subtle warm glow behind elements
- **Radial gradient glow (blue):** `radial-gradient(circle farthest-side at 50% 100%, rgba(213, 236, 243, 1), transparent 75%)` — cool glow, likely hero area
- These are very subtle background atmospherics, NOT applied to text or UI elements

### Color Strategy
- Maximum restraint: white background dominates, with ONE colored section (lavender)
- The only "bright" color is the coral accent, used very sparingly (dots, small pills)
- Two-tone text (black vs taupe) creates hierarchy without introducing new colors
- No colored buttons — the main CTA is the App Store badge (black)

---

## Spacing & Layout

### Section Padding
| Section | Padding Top | Padding Bottom | Height |
|---------|------------|----------------|--------|
| Hero | 0 | 0 | Full viewport (100vh) |
| AI features wrapper | 120px | 0 | 777px |
| Calendar wrapper | 120px | 0 | 777px |
| Suggestions wrapper | 200px | 0 | 777px |
| Before/After wrapper | 0 | 0 | 777px |
| Blog details | 24px | 24px | 300px |

### Layout Patterns
- **Max content width:** Content is centered, appears ~1200px max-width
- **Hero:** Full-width, center-aligned text with floating imagery (phone mockups + beauty photos) scattered around edges in a collage/marquee pattern
- **Features section:** Left-aligned text + right-side pinned phone mockup (sticky scroll pattern). Text updates change as you scroll, phone stays centered.
- **Challenges section:** Full-width horizontal scrolling carousel of cards (460px wide each, 282px tall)
- **Blog section:** 2-column card grid with generous 24px padding
- **Generous whitespace everywhere** — sections breathe with 120-200px top padding

### Grid / Columns
- Hero: Single column, centered, with floating edge imagery
- Challenges cards: Horizontal scroll (no grid)
- Features: 2-column — left text (40%) + right phone mockup (60%), pinned
- AI chat example: Content-width centered, phone mockup centered
- Treatment planner: Full-width with tabs
- Blog: 2-column equal grid
- FAQ: Single column, full-width accordion

---

## Animation & Motion

### GSAP Configuration
- **GSAP version:** 3.12.2
- **Easing:** `power2.out` (smooth deceleration)
- **Duration:** 0.4s for most fade/blur effects
- **Scroll-linked:** `scrub: 1` for parallax/pin effects

### Scroll Animations Observed
1. **Hero marquee:** Continuous vertical marquee of images on left and right sides, scrolling in alternating directions (up/down). Creates a dynamic visual frame around centered text.
2. **Text character split animation:** Headings animate in character-by-character with blur-to-clear + fade effect. Each character starts blurred and transparent, then sharpens into place with a stagger.
3. **Horizontal scroll carousel:** "Challenges" cards scroll horizontally as user scrolls vertically (scroll-jacking with GSAP pin). Cards have images + text and slide left continuously.
4. **Pinned phone mockup:** In the features section, the phone stays fixed in the center-right while left-side text content scrolls through multiple slides (sticky scroll pattern). Each scroll "step" swaps the feature description on the left and the phone screen content.
5. **Fade + blur entrance:** Elements fade in from `opacity: 0` + `filter: blur(Xpx)` to `opacity: 1` + `filter: blur(0)` on scroll intersection.
6. **Parallax depth:** Background images and floating elements move at different scroll speeds, creating subtle depth.

### Hover States
- Links have subtle underline transitions
- No dramatic hover effects on cards (editorial restraint)
- CTA buttons likely have opacity or background-color transitions

### Motion Principles
- Everything feels **smooth and slow** — no snappy/springy animations
- Blur-to-sharp is the signature entrance effect (vs typical fade-up)
- Character-level text animation gives headings a "typewriter meets focus" feel
- Scroll-driven, not time-driven — animations are tied to scroll position

---

## Component Patterns

### Navbar
- **Fixed position** with transparent background
- Height: 64px
- Logo: "GlowGuide" in center (serif font)
- Left: "GET THE APP" link (small caps, mono-spaced look)
- Right: Close/menu button
- Minimal — only 2-3 elements visible, no dropdown menus
- Uses a gradient mask at the bottom edge for seamless fade into content

### Hero Section
- **Layout:** Centered text block with floating imagery collage around edges
- Uses a continuous Swiper-based vertical marquee on left and right sides with beauty/treatment photos and app screen mockups
- Three marquee tracks: `first-slide-track`, `second-slide-track`, `third-slide-track` — one reversed direction
- Center: Large serif mono heading (two-tone), subtitle, App Store button
- CTA: Apple App Store download badge (black, standard badge)
- No email input form in hero — just app download CTA
- Also has a **waitlist modal/popup** overlay with email capture form

### Challenges Carousel
- Full-width lavender/purple background `rgb(203, 193, 237)`
- Section heading uses the two-tone technique: "Everyone's Guessing" (muted), "GlowGuide helps you know" (black)
- Subtext: "Powered by Aesthetic Intelligence(TM)" with underlined link
- Horizontally scrolling cards, each 460x282px
- Each card: topic label with colored dot + image + question text
- Cards use the **Khteka** font for questions at ~36px
- Topic labels: "BOTOX VS. DYSPORT", "DOWNTIME DETAILS", "WAS IT WORTH IT?", "SALMON SPERM?!", "RETINOL... AGAIN?" — conversational, relatable

### Features (Pinned Scroll)
- Section heading: "Your face, Your data / Your Decisions" (two-tone, serif mono, uppercase)
- Description text right-aligned: "GlowGuide blends expert insight with real-time results..."
- Thin horizontal rule (1px border) separates heading from feature scroll area
- Left side: text that scrolls through 4 features:
  1. "See real progress. One photo at a time." — progress tracking
  2. "Get Results Faster" — personalized planning
  3. "Never Miss a moment" — reminders
  4. "Aesthetic Intelligence(TM)" — AI personalization
- Each feature has: orange dot label ("SMARTER BEAUTY DECISIONS START HERE"), H2 title (Khteka ~36px), description (Beltram 18px, muted taupe)
- Right side: Large phone mockup (pinned/sticky) showing app UI
- Phone mockup shows a before/after comparison slider with "Day 1" / "Day 30" pill labels

### AI Chat Section
- Shows conversational Q&A examples with the AI
- Clean chat bubble UI

### Treatment Planning Section
- Interactive "I want to..." statement builder
- Tab switcher: "Treatments" / "Skincare" with emoji icons
- Budget range shown: "$2.5K-$5K"
- Before/after timeline comparison

### Testimonial
- Simple quote block: italic or serif styling
- "For the first time, I felt like my skincare and treatments were actually working together."
- Attribution: "-- Nadia, 37, SF"
- Minimal, no photo of person, no card/container — just text

### Early Access / CTA Section
- "Early Access Ends Soon" heading
- Waitlist form repeat with email capture
- Urgency language

### FAQ Section
- "Frequently asked questions" heading
- Accordion-style expand/collapse
- 6 questions covering: what is GlowGuide, photo tracking, booking clarity, product recommendations, Aesthetic Intelligence(TM), privacy

### Blog / Resources
- "Trusted Resources for Your Treatment Journey"
- 2-column card layout
- Each card: large image, title, excerpt
- "View all" link

### Footer
- Contact: info@glowguide.com
- Links: Magazine
- Legal: Privacy Policy, Terms of Service
- Social: Instagram, TikTok, LinkedIn
- Copyright: (c) 2025 GlowGuide
- Minimal, clean

---

## What's Most Impressive / Worth Stealing for Latchclub

### 1. Two-Tone Heading Technique
**Specific implementation:** H1 uses `PP Right Serif Mono` at ~64px, weight 400, uppercase. First line rendered in muted taupe `rgb(131, 120, 111)`, second line in pure black `rgb(0, 0, 0)`. Creates instant visual hierarchy and sophistication within a single heading block. The muted line acts as a setup/context, the black line delivers the punch.

**For Latchclub:** Apply to "Save more." (muted) / "Experience more." (black). Use a monospaced serif for headings to differentiate from the sans-serif body — immediately elevates the page from "startup template" to "premium editorial."

### 2. Character-Level Blur-to-Sharp Text Animation
**Specific implementation:** GSAP SplitText splits headings into individual characters. Each character starts at `opacity: 0` + `filter: blur(8px)` and animates to `opacity: 1` + `filter: blur(0)` with `stagger: 0.02`, `duration: 0.4`, `ease: power2.out`. The effect is like focusing a camera on text.

**For Latchclub:** Use this for the hero H1 on page load instead of a simple fade-up. It's dramatically more premium than translateY animations. Can be implemented with Motion (framer-motion) using the `filter` property + staggered children.

### 3. Pinned Phone Mockup with Scrolling Feature Text
**Specific implementation:** The features section uses GSAP ScrollTrigger pin. A large phone mockup (showing the app's before/after UI) stays fixed in the center-right while the left column scrolls through 4 feature descriptions. Each feature has a small orange dot + uppercase label, a ~36px title in Khteka, and an 18px description in muted taupe. The phone screen content transitions between features.

**For Latchclub:** Perfect for the AppShowcase section. Pin 3 phone mockups and scroll through "Dining deals", "Wellness", "Experiences" content on the left side. This is more engaging than a static grid and shows the app in context.

### 4. Ultra-Light Font Weights (300-400 Only) + Uppercase Serif Mono Headings
**Specific implementation:** Body text at weight 300 (Beltram), headings at weight 400 (PP Right Serif Mono). No bold anywhere. Combined with uppercase transform and tight line-height (0.94em) on headings, this creates a luxury editorial aesthetic without any bold/heavy elements.

**For Latchclub:** This aligns perfectly with the CLAUDE.md constraint of "400 and 500 only." Push further: use 400 for body, 500 only for nav links. Use a serif or mono-serif for headings with uppercase + tight line-height to achieve the premium look without relying on weight.

### 5. Restrained Color Palette with One Signature Colored Section
**Specific implementation:** 95% of the page is white/black/taupe. ONE section (Challenges) uses a full-bleed lavender `rgb(203, 193, 237)` background. The single coral accent `rgb(203, 115, 75)` appears only as tiny dots next to labels. This extreme restraint makes the colored section feel special and the accent color feel precious.

**For Latchclub:** Use white/black/muted for everything. Consider ONE section (maybe HowItWorks or Pricing) with a subtle warm background like `rgb(252, 245, 242)`. Use the brand accent color only for tiny indicators (dots, underlines, form focus states) — never for large fills or button backgrounds.

---

## Additional Patterns Worth Noting

### Vertical Image Marquee (Hero)
Three columns of continuously scrolling images flanking the hero text. Uses Swiper with infinite loop. Alternating scroll directions (up, down, up). Creates energy and visual richness without cluttering the centered message. For Latchclub: could use a similar technique with deal/restaurant/experience imagery to create a dynamic hero frame.

### Conversational Card Labels
The challenges carousel uses extremely relatable, casual language: "Salmon Sperm?!", "Retinol... Again?", "Was It Worth It?" — with emoji-like colored dots. This makes the product feel approachable despite the premium design. For Latchclub: consider using real questions like "Another $20 brunch?" or "Worth the drive?" to make deals feel personal.

### Horizontal Thin Rule as Section Divider
A single 1px horizontal line separates the features heading from the scrolling content. No heavy borders, no background changes — just one elegant line. This is the kind of minimal structural element that communicates sophistication.

### Warm-Toned Neutrals Instead of Cool Grays
The secondary text color is taupe `rgb(131, 120, 111)` not gray. The subtle backgrounds are warm cream `rgb(252, 245, 242)` not cool gray-50. This warmth makes the page feel inviting and human rather than clinical/tech.

---

## Technical Notes

- Built on **Webflow** (`w-nav`, `w-inline-block` classes)
- **GSAP 3.12.2** for all animations (ScrollTrigger, SplitText, pin effects)
- **Swiper** for hero marquee and challenges carousel
- Responsive typography via CSS `clamp()` functions
- Mobile breakpoint at 768px
- Uses `-webkit-font-smoothing: antialiased` globally
- Font loading: custom fonts loaded via Webflow's font system (PP Right Serif Mono, Khteka, Beltram)
