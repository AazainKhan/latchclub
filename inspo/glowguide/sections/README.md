# GlowGuide Screenshots Reference

Screenshots were captured via Puppeteer at 1440x900 desktop viewport on 2026-04-02.

## Sections Captured (in-session, see notes.md for full details)

### Hero (scroll 0)
- White background, centered serif mono heading "YOUR SMARTEST PATH / TO LOOKING YOUR BEST"
- Floating imagery collage: phone mockups + beauty photos flanking text
- Vertical marquee columns of images on left/right edges
- App Store download badge centered below subtitle
- "GlowGuide" logo centered in fixed navbar

### Challenges Section (scroll 400-800)
- Full lavender/purple background rgb(203, 193, 237)
- Two-tone heading: "EVERYONE'S GUESSING" (white) / "GLOWGUIDE HELPS YOU KNOW" (black)
- "Powered by Aesthetic Intelligence" underlined link
- Horizontal scrolling cards (460x282px each) with beauty images + casual question text
- Cards: "Botox vs. Dysport", "Downtime Details", "Was It Worth It?", "Salmon Sperm?!", "Retinol... Again?"

### Features - Pinned Phone (scroll 1600)
- Two-tone heading: "YOUR FACE, YOUR DATA" (taupe) / "YOUR DECISIONS" (black)
- Description text aligned right
- 1px horizontal rule divider
- Large phone mockup pinned center-right showing before/after slider (Day 1 / Day 30)

### Features - Scroll Content (scroll 2400)
- Orange dot + "SMARTER BEAUTY DECISIONS START HERE" label
- "See real progress. One photo at a time." title (Khteka ~36px)
- "Snap, mark up, and compare your progress over time." description (muted taupe)
- Phone mockup still pinned showing comparison UI

## Note
Due to GSAP ScrollSmoother and DOM layering (checkout.com elements in underlying DOM), deeper scroll positions could not be reliably captured. The WebFetch content extraction captured the full page text including FAQ, testimonial, early access CTA, blog, and footer sections. See notes.md for complete analysis.
