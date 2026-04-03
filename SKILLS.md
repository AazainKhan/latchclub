# SKILLS.md — Claude Code Design Skills
> Install all skills in this file before running any build session.
> Skills are SKILL.md files that give Claude Code specialized design knowledge on-demand.
> They auto-activate when relevant, or invoke manually with a slash command.

---

## How Skills Work
Skills use progressive disclosure — each skill costs ~100 tokens to scan, only loads its full content (<5k tokens) when the task is relevant. You can install many without bloating context.

---

## STEP 1 — Install the Official Anthropic Frontend Design Skill
**This is the most important one. Install first.**

```bash
# Official Anthropic skill — 277K+ installs
# Prevents "AI slop": generic Inter fonts, purple gradients, cookie-cutter layouts
# Auto-activates on any UI build task
npx skills add anthropics/claude-code --skill frontend-design
```

What it does: Before writing any UI, forces Claude to commit to a bold aesthetic direction — purpose, tone, differentiation. Explicitly bans: Inter/Roboto/Arial, purple gradients on white, predictable component patterns. Demands production-grade, visually distinctive, memorable interfaces.

---

## STEP 2 — Install Community Design Skills

```bash
# 1. UI/UX Pro Max — searchable database of UI styles, palettes, font pairings
#    Covers Next.js, shadcn/ui, Tailwind — perfect match for Latchclub stack
npx skills add nextlevelbuilder/ui-ux-pro-max-skill

# 2. Taste Skill — gives Claude "good taste" with tunable design variance
#    Stops generic UI slop. High-agency frontend decisions.
npx skills add Leonxlnx/taste-skill

# 3. Platform Design Skills — 300+ rules from Apple HIG, Material Design 3, WCAG 2.2
#    Real design system rules baked into Claude's context
npx skills add ehmo/platform-design-skills

# 4. oiloil UI/UX Guide — CRAP principles, HCI laws, interaction psychology
#    Guide + review modes. Covers modern minimal style.
npx skills add oiloil/oiloil-ui-ux-guide

# 5. LibreUIUX — 67 specialized UI/UX agents
#    Before: Bootstrap-era. After: Motion Primitives, bento grids, micro-interactions
npx skills add HermeticOrmus/LibreUIUX-Claude-Code

# 6. Designer Skills (63 design skills) by Owl-Listener/Marie Claire Dean
#    Includes /discover, /strategize, /handoff workflows
#    Invoke: /handoff to generate developer handoff with measurements + QA checklist
npx skills add Owl-Listener/designer-skills
```

---

## STEP 3 — Install the Design Review Workflow (Patrick Ellis)
This is a full automated design review system using Playwright + Claude subagents.
It catches UI/UX issues, accessibility failures, and design inconsistencies before you ship.

```bash
# Clone the workflow into your project
git clone https://github.com/OneRedOak/claude-code-workflows.git /tmp/claude-workflows
cp -r /tmp/claude-workflows/.claude/agents/design-reviewer ~/.claude/agents/
cp -r /tmp/claude-workflows/.claude/commands/design-review ~/.claude/commands/

# Verify install
claude /design-review --help
```

What it does: Runs Playwright MCP browser automation against your local dev server, takes screenshots, compares against design intent, checks: visual hierarchy, responsive breakpoints, accessibility (WCAG AA), typography consistency, spacing rhythm, animation behavior, color contrast.

**Invoke during Session 6 (polish pass):**
```bash
npm run dev  # start dev server
# then in Claude Code:
/design-review http://localhost:3000
```

---

## STEP 4 — Install Google Labs Design Skills (Stitch)
Google's official design-to-code skill suite. Works with shadcn/ui and Next.js.

```bash
# Design.md manager — creates and keeps DESIGN.md in sync with code
npx skills add google-labs-code/design-md

# Prompt enhancer — rewrites your prompts with design vocabulary
# Use: "enhance this prompt before building" → richer, more precise output
npx skills add google-labs-code/enhance-prompt

# shadcn/ui expert — specialized knowledge for shadcn component patterns
npx skills add google-labs-code/shadcn-ui

# Stitch loop — iterative design-to-code feedback cycle
# Generates design → builds code → reviews output → refines
npx skills add google-labs-code/stitch-loop
```

---

## STEP 5 — Install Workflow Skills

```bash
# Verification before completion — forces Claude to verify work before marking done
# Critical for design work: runs checklist, checks responsive, checks animations
npx skills add obra/verification-before-completion

# Finishing a development branch — proper branch completion workflow
npx skills add obra/finishing-a-development-branch

# Webapp testing — Playwright UI verification and debugging
# Use after each session to verify the page looks correct in browser
npx skills add travisvn/webapp-testing
```

---

## Verify All Skills Installed

```bash
npx skills list
```

Expected output should include:
- `frontend-design` (Anthropic official)
- `ui-ux-pro-max-skill`
- `taste-skill`
- `platform-design-skills`
- `oiloil-ui-ux-guide`
- `LibreUIUX-Claude-Code`
- `designer-skills`
- `design-md`
- `enhance-prompt`
- `shadcn-ui` (google-labs)
- `stitch-loop`
- `verification-before-completion`
- `finishing-a-development-branch`
- `webapp-testing`

---

## How to Invoke Skills in Sessions

### Auto-activation
Most design skills activate automatically when you ask Claude to build UI.
The `frontend-design` skill activates on any request containing: "build", "create", "design", "component", "page", "landing", "hero", "section".

### Manual invocation
For targeted skill use, prefix your prompt:

```
# Use the frontend-design skill for this task:
/frontend-design Build the Hero section for Latchclub

# Use the design review workflow after building:
/design-review http://localhost:3000

# Use the handoff skill to generate developer spec:
/handoff Generate handoff documentation for the pricing section

# Use prompt enhancement before complex UI tasks:
/enhance-prompt "Build the app showcase section with phone mockups"
```

### At the start of every UI session, add this line:
```
Activate all relevant design skills for this task before writing any code.
Reference DESIGN.md and SKILLS.md for design constraints.
Use the frontend-design skill's aesthetic framework to commit to a visual direction first.
```

---

## Skill Priority Order for Latchclub

When multiple skills apply, Claude should prioritize in this order:

1. **DESIGN.md** — Latchclub-specific design constraints (non-negotiable)
2. **frontend-design** (Anthropic) — aesthetic decision-making framework
3. **platform-design-skills** — Apple HIG rules (matches our Apple-like target)
4. **ui-ux-pro-max** — specific component and layout patterns
5. **taste-skill** — override generic AI choices
6. **oiloil-ui-ux-guide** — CRAP + HCI principles for UX decisions

If any skill conflicts with DESIGN.md, DESIGN.md wins.

---

## Key Slash Commands Available After Install

| Command | Skill | What It Does |
|---|---|---|
| `/frontend-design` | Anthropic | Force aesthetic direction before building |
| `/design-review` | Patrick Ellis | Run full automated UI/UX review |
| `/enhance-prompt` | Google | Rewrite prompt with design vocabulary |
| `/handoff` | Owl-Listener | Generate dev handoff + QA checklist |
| `/discover` | Owl-Listener | Full research discovery cycle |
| `/strategize` | Owl-Listener | UX strategy from vision to metrics |
| `/stitch-loop` | Google | Design → build → review → refine loop |
| `/webapp-testing` | travisvn | Playwright browser verification |
| `/verification-before-completion` | obra | Pre-completion checklist enforcement |

---

## What These Skills Prevent

Without skills, Claude defaults to "AI slop":
- ❌ Inter font everywhere
- ❌ Purple/blue gradients on white
- ❌ Predictable card layouts
- ❌ Animations that don't serve the content
- ❌ Generic shadcn default styling with no character
- ❌ Inconsistent spacing (mixing 13px, 22px, 37px)
- ❌ Missing accessibility
- ❌ No review before shipping

With these skills:
- ✅ Committed aesthetic direction before first line of code
- ✅ Apple HIG spacing and typography rules
- ✅ Playwright-verified visual output
- ✅ WCAG AA accessibility built-in
- ✅ Design checklist enforced before marking done
- ✅ Distinctive, memorable interfaces instead of generic templates
