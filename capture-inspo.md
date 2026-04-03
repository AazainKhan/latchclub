# Capture Inspo

Capture a website as design inspiration. Records scroll animations, hover states, mobile view, and section screenshots. Saves everything to /inspo/[site-name]/.

## Usage
```
/capture-inspo [url] [site-name] [section]
```

Examples:
- `/capture-inspo https://checkout.com checkout general`
- `/capture-inspo https://linear.app linear hero`
- `/capture-inspo https://stripe.com stripe pricing`

## What Gets Captured
- Full scroll GIF (all entrance animations)
- Hover states GIF (buttons, cards, nav)
- Page load GIF (initial animation sequence)
- Mobile view screenshot (390px)
- Section screenshots (navbar, hero, features, pricing, footer)
- notes.md (layout, typography, animation, component analysis)

## What We're Looking For (Latchclub Design Goals)
This command always captures with Latchclub's specific needs in mind:

**App Showcase** — How does the site present a mobile app? Look for:
- Phone frame/mockup treatment (size, shadows, how it sits on page)
- Scroll-pinned phone with changing content
- Side-by-side phone + feature text layout
- Multiple phones staggered or overlapping

**Hero** — Premium, minimal, Apple-like. Look for:
- Large bold headline with tight letter-spacing
- Muted/secondary color on part of headline
- Minimal CTA — email input or single button
- How whitespace is used above the fold
- Badge/pill elements above headline

**Typography** — Look for:
- Heading size relative to viewport
- Weight contrast between headline lines
- Letter-spacing on headings (tight = premium)
- Section label treatment (small caps, dots, lines)
- Font choices that feel premium but not overdone

**Section Structure** — Look for:
- How sections are separated (whitespace vs dividers vs color change)
- Grid patterns (2-col, 3-col, alternating)
- How "how it works" steps are presented
- Pricing card layout and featured card treatment
- FAQ/accordion patterns

**Micro-interactions** — Look for:
- Button hover (color change, scale, underline, fill)
- Card hover (lift, border, scale)
- Navigation hover states
- Any scroll-linked animations
- Entrance animation timing and easing

---

## Instructions

You are a design capture agent. Your job is to thoroughly capture a website as inspiration material for the Latchclub project.

The user will provide:
1. `$URL` — the website to capture
2. `$SITE_NAME` — folder name to save under (e.g. "checkout", "linear")
3. `$SECTION` — which section is most relevant (e.g. "hero", "general", "app-showcase", "pricing")

### Step 0 — Setup

Use the Claude in Chrome MCP to do all browser work. 

First check available tabs:
```
Use tabs_context_mcp to get available tabs
```

Create the output directory structure:
```
/inspo/$SITE_NAME/
/inspo/$SITE_NAME/sections/
```

Set desktop viewport:
```
Resize window to 1440x900
```

---

### Step 1 — Page Load Animation

Navigate to $URL in a fresh state to capture the load-in animation.

```
1. Navigate to $URL
2. IMMEDIATELY start GIF recording (before page finishes loading)
3. Take screenshot as first frame
4. Wait 3 seconds without scrolling — capture full load sequence
5. Take screenshot as last frame
6. Stop recording
7. Export and download as: $SITE_NAME-pageload.gif
```

---

### Step 2 — Full Scroll Recording

Reload the page, then record the full scroll from top to bottom.

```
1. Navigate to $URL (fresh load)
2. Wait 2 seconds for page to fully load
3. Take initial screenshot — save to disk as hero.png
4. Start GIF recording
5. Take screenshot (first frame)
6. Scroll down slowly in increments of 4 ticks, pausing 0.8s between each scroll
   — Keep scrolling until you reach the bottom of the page
7. Take final screenshot
8. Stop GIF recording
9. Export and download as: $SITE_NAME-full-scroll.gif
```

---

### Step 3 — Hover States Recording

Scroll back to top. Record hover interactions across all interactive elements.

```
1. Scroll back to top of page
2. Wait 1 second
3. Start GIF recording
4. Take screenshot (first frame)
5. Hover over each of the following in sequence, pausing 1s on each:
   - Primary CTA / main button
   - Navigation links (each one)
   - Any card elements visible in the hero
   - Any secondary buttons or links
6. Scroll down to find and hover over:
   - Feature cards or sections
   - Pricing cards if visible
   - Any interactive elements
7. Take final screenshot
8. Stop GIF recording
9. Export and download as: $SITE_NAME-hover-states.gif
```

---

### Step 4 — Section Screenshots

Take precise zoomed screenshots of each major section.

```
Navigate back to top, then capture each section:

1. NAVBAR — zoom region [0, 0, 1440, 90], save as sections/navbar.png
2. HERO — full screenshot of above-the-fold, save as sections/hero.png  
3. Scroll down slowly, taking a full screenshot at each major section:
   - Social proof / logo wall → sections/social-proof.png
   - Features / how it works → sections/features.png
   - App showcase (if exists) → sections/app-showcase.png
   - Pricing (if exists) → sections/pricing.png
   - Footer → sections/footer.png
4. For any section the user marked as $SECTION, also take a zoomed crop of the most important visual element
```

---

### Step 5 — Typography Closeups

Zoom into typography for precise measurements.

```
1. Scroll to hero headline
2. Zoom into just the headline text: zoom region [0, 80, 900, 300], save as sections/typography-hero.png
3. Zoom into body text block if visible, save as sections/typography-body.png
4. Zoom into any section labels (small caps text above headings), save as sections/typography-labels.png
```

---

### Step 6 — Mobile View

```
1. Resize window to 390x844 (iPhone 14)
2. Navigate to $URL
3. Wait 2 seconds
4. Take screenshot, save as mobile-hero.png
5. Scroll down to nav (if mobile nav exists, screenshot it), save as mobile-nav.png
6. Scroll through page taking screenshots of how each section adapts
7. Resize window back to 1440x900
```

---

### Step 7 — Extract Page Structure

```
Use get_page_text to extract the full page text content.
This captures: headlines, body copy, CTA text, nav labels, section labels.
Save as raw-content.txt
```

---

### Step 8 — Write notes.md

Now write a comprehensive notes.md file in /inspo/$SITE_NAME/ based on everything you observed.

The notes.md must follow this exact structure:

```markdown
---
source: $URL
captured: [today's date]
relevant_for: $SECTION
---

## Overall Impression
[2-3 sentences: vibe, quality level, what makes it distinctive]

## Layout & Structure
[Describe the page structure section by section. Be specific about:
- Grid system (how many columns, how content is distributed)
- Section widths and max-widths
- Whether sections are full-bleed or contained
- Background color changes between sections]

## Typography
[Be very specific:]
- H1: [size estimate, weight, font style, letter-spacing, line-height]
- H2: [size estimate, weight, letter-spacing]
- Section labels: [size, weight, case, tracking]
- Body: [size, weight, line-height, max-width]
- Font family: [name if identifiable, or describe: condensed sans, humanist sans, geometric, serif, etc.]
- Special treatments: [any unusual typographic choices]

## Color Palette
- Background: [hex or description]
- Primary text: [hex or description]  
- Secondary text: [hex or description]
- Accent: [hex or description]
- Section backgrounds: [list any colored sections]
- Total colors used: [count]

## Spacing & Rhythm
- Section vertical padding: [estimate in px]
- Content max-width: [estimate]
- Gap between elements within sections: [estimate]
- Overall feel: [airy / dense / balanced]

## Animation Observations
[Describe exactly what you saw:]
- Page load: [what animated, direction, speed, easing]
- Scroll entrance: [how elements enter viewport — fade, slide, scale? Direction? Duration estimate? Stagger?]
- Hover states: [what changed on hover — color, scale, underline, border? Duration?]
- Any other motion: [parallax, looping, scroll-linked?]

## Component Patterns
[Describe specific UI components:]
- Navbar: [layout, sticky behavior, mobile treatment]
- Buttons/CTAs: [shape, size, style, hover behavior]
- Cards: [border, shadow, radius, hover treatment]
- Section labels: [the small text above headings — style, color]
- Logo walls: [grayscale? size? scroll behavior?]
- Any unique components worth noting]

## What to Steal for Latchclub
[3-5 specific, actionable patterns to replicate. Be precise — not "nice typography" but "use a 56px 500-weight heading with -0.03em letter-spacing and a muted second line at 60% opacity"]

## What NOT to Copy
[Colors, logos, copy, any brand-specific elements]

## Latchclub Application
[For each thing worth stealing, write the exact implementation note:]
- Pattern: [what you observed]
- Apply to Latchclub: [which section, how to adapt it]
- Code hint: [Tailwind classes or CSS approach if obvious]

## Direct Quotes (Copy Worth Noting)
[Any headline or copy structures worth referencing for tone/length]
```

---

### Step 9 — Final Summary

After completing all captures, output a summary:

```
✅ Captured: $URL → /inspo/$SITE_NAME/

Files saved:
- $SITE_NAME-pageload.gif
- $SITE_NAME-full-scroll.gif  
- $SITE_NAME-hover-states.gif
- mobile-hero.png
- sections/navbar.png
- sections/hero.png
- sections/features.png
- sections/pricing.png (if found)
- sections/footer.png
- sections/typography-hero.png
- notes.md
- raw-content.txt

Key design patterns identified:
[3 bullet points of the most important things to steal]

Most relevant for Latchclub:
[1-2 sentences on how to apply this to the project]
```