# Latchclub Design System Rules
> These rules are non-negotiable. Violations are bugs.

## Typography
- Font: Geist (sans + mono). No other fonts.
- Weights: **400 and 500 ONLY**. Never 600, 700, 800.
- Heading letter-spacing: -0.02em to -0.04em (tight, Apple/Linear style)
- Label/caps letter-spacing: +0.08em to +0.12em
- Body line-height: 1.65–1.75. Heading line-height: 1.1–1.15.
- Max line length: 65ch. No text below 13px. Body minimum 16px.
- Section labels: 11px, uppercase, +0.1em tracking, muted color

## Type Scale (1.25 ratio)
| Token | Size | Weight | Use |
|---|---|---|---|
| text-xs | 11px | 400 | Labels, captions |
| text-sm | 13px | 400 | Secondary body |
| text-base | 16px | 400 | Primary body |
| text-lg | 18px | 400 | Hero subtext |
| text-xl | 24px | 500 | Card titles |
| text-2xl | 32px | 500 | Section H2 mobile |
| text-3xl | 40px | 500 | Section H2 desktop |
| text-4xl | 52px | 500 | Page H1 mobile |
| text-5xl | 64px | 500 | Page H1 desktop |

## Spacing (4px base scale ONLY)
4px(xs) / 8px(sm) / 12px(md) / 16px(lg) / 24px(xl) / 32px(2xl) / 48px(3xl) / 64px(4xl) / 96px(5xl) / 128px(6xl)

- Section padding: py-24 (96px) desktop, py-16 (64px) mobile
- No arbitrary values (13px, 22px, 37px). 4px scale only.
- When in doubt, double the spacing.

## Colors
- Brand: Teal #03A493 (10%), Carbon #162028 (text), Mist #D2DBDE (30%), Bone #F5F7F7 (60%)
- Max 3 colors per page. No gradients. No colored section backgrounds.
- Borders: 0.5px default, 2px for featured/highlighted only
- Muted text must pass WCAG AA 4.5:1 contrast on white

## Animation (Motion/framer-motion only)
- Duration: 300–500ms. Nothing longer than 600ms.
- Properties: transform + opacity ONLY. Never color, width, height.
- viewport={{ once: true, amount: 0.15 }} on every scroll animation
- Stagger: 0.08–0.1s between children
- Always implement useReducedMotion()
- No looping or auto-playing animations
- Ease: cubic-bezier(0.25, 0.1, 0.25, 1). No bouncy springs.

## Components
- Cards: 0.5px border, 12px radius, no box-shadow
- Buttons: Black primary CTA (opacity fade on hover), outlined secondary
- One CTA per section. No competing buttons.
- All UI primitives from shadcn/ui. No raw HTML buttons/inputs.

## Mobile
- Mobile-first. 375px minimum width.
- Touch targets: 44px minimum.
- Single column on mobile for all grids.
- Featured pricing card shows first on mobile.

## Hierarchy Pattern (every section)
```
SECTION LABEL  → 11px caps, muted
H2 HEADLINE    → 36-40px, 500, tight tracking
SUPPORTING     → 16-18px, 400, muted
CONTENT        → cards/steps/etc
CTA            → one per section
```
