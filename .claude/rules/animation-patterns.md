# Animation Patterns — Use These Exact Patterns

## Fade Up (default for all sections)
```tsx
"use client"
import { motion } from "framer-motion"

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
  }
}

<motion.div
  variants={fadeUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.15 }}
>
  {children}
</motion.div>
```

## Stagger Container (for grids/lists)
```tsx
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
}
```

## Hero Load Animation (mount, not scroll)
```tsx
initial={{ opacity: 0, y: 16 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5, delay: index * 0.1 }}
```

## Micro-interactions
```tsx
// Buttons
whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
// Cards
whileHover={{ y: -2 }}
// Timing: 150ms ease-out
```

## Reduced Motion
```tsx
import { useReducedMotion } from "framer-motion"
const prefersReduced = useReducedMotion()
const variants = prefersReduced ? {} : fadeUp
```

## NEVER animate:
- Background colors
- Width/height (causes layout reflow)
- CSS keyframes or @keyframes
- Tailwind `transition` for entrance animations
- `animate` without `initial`
