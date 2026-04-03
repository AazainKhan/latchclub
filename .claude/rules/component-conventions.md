# Component Conventions

## Server vs Client
- Default to Server Components for all section components
- Add "use client" ONLY when using: hooks, Motion animations, form state, onClick
- WaitlistForm.tsx → always client (form state + fetch)
- AnimatedSection.tsx → always client (Motion)
- Navbar.tsx → client (scroll state for sticky behavior)

## File Organization
- Layout components: components/layout/
- Landing sections: components/sections/landing/
- About sections: components/sections/about/
- Shared/reusable: components/shared/
- shadcn primitives: components/ui/

## TypeScript
- Strict mode. No `any` types.
- All props typed with `interface`, not `type` aliases
- Use `type` for unions, `interface` for objects

## Imports
- Use @/ path alias for all imports
- shadcn components: @/components/ui/button
- Shared components: @/components/shared/WaitlistForm

## Forbidden
- No raw HTML <button> or <input> — use shadcn/ui
- No localStorage or sessionStorage
- No hardcoded colors — Tailwind tokens only
- No GSAP, CSS-in-JS, or Pages Router
- No /admin link in public nav or footer — ever
