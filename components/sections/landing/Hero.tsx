"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { motion, useReducedMotion, useInView } from "framer-motion"
import WaitlistForm from "@/components/shared/WaitlistForm"

const EASE = [0.25, 0.1, 0.25, 1] as const

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
}

const blurUp = {
  hidden: { opacity: 0, filter: "blur(8px)", y: 40 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
}

const noAnimation = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
}

/* Floating deal cards data */
interface DealCard {
  category: string
  name: string
  description: string
  badge: string
  top?: string
  left?: string
  right?: string
  bottom?: string
  rotate: number
  delay: number
}

const dealCards: DealCard[] = [
  {
    category: "Dining",
    name: "Kinka Izakaya",
    description: "2-for-1 Dinner",
    badge: "50% OFF",
    top: "14%",
    left: "4%",
    rotate: -6,
    delay: 0,
  },
  {
    category: "Wellness",
    name: "Scandinave Spa",
    description: "Day Pass",
    badge: "$45 OFF",
    top: "12%",
    right: "4%",
    rotate: 3,
    delay: 0.8,
  },
  {
    category: "Experiences",
    name: "ROM Tickets",
    description: "Family Pack",
    badge: "BOGO",
    bottom: "22%",
    left: "6%",
    rotate: 2,
    delay: 1.6,
  },
]

function useAnimatedCounter(target: number, duration: number, shouldAnimate: boolean) {
  const [count, setCount] = useState(0)
  const hasAnimated = useRef(false)

  const start = useCallback(() => {
    if (hasAnimated.current || !shouldAnimate) {
      setCount(target)
      return
    }
    hasAnimated.current = true
    const startTime = performance.now()

    function tick(now: number) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) {
        requestAnimationFrame(tick)
      }
    }

    requestAnimationFrame(tick)
  }, [target, duration, shouldAnimate])

  return { count, start }
}

/* Floating deal card component */
function FloatingDealCard({ card, prefersReducedMotion }: { card: DealCard; prefersReducedMotion: boolean | null }) {
  const style: React.CSSProperties = {
    top: card.top,
    bottom: card.bottom,
    left: card.left,
    right: card.right,
  }

  return (
    <motion.div
      className="absolute hidden lg:block"
      style={style}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.2 + card.delay * 0.3, ease: EASE }}
    >
      <motion.div
        style={{ rotate: card.rotate }}
        animate={
          prefersReducedMotion
            ? {}
            : {
                y: [0, -8, 0],
              }
        }
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: card.delay,
        }}
      >
        <div className="rounded-xl border border-mist bg-white p-4 shadow-sm max-w-[180px]">
          <p className="text-[11px] tracking-[0.08em] uppercase text-neutral-300">{card.category}</p>
          <p className="text-sm font-medium text-carbon mt-1 tracking-[-0.01em]">{card.name}</p>
          <p className="text-[11px] text-neutral-300 mt-0.5">{card.description}</p>
          <span className="inline-block mt-2 text-[10px] font-medium bg-teal-50 text-teal-400 px-2 py-0.5 rounded-full">
            {card.badge}
          </span>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Hero() {
  const prefersReducedMotion = useReducedMotion()
  const counterRef = useRef<HTMLParagraphElement>(null)
  const isInView = useInView(counterRef, { once: true, amount: 0.5 })

  const itemVariants = prefersReducedMotion ? noAnimation : blurUp
  const containerVariants = prefersReducedMotion ? noAnimation : container

  const { count, start } = useAnimatedCounter(1200, 1500, !prefersReducedMotion)

  useEffect(() => {
    if (isInView) {
      start()
    }
  }, [isInView, start])

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center px-4 md:px-6 overflow-hidden"
      style={{
        background: "radial-gradient(circle at 50% 40%, rgba(3, 164, 147, 0.04), transparent 60%)",
      }}
    >
      {/* Ambient gradient orbs */}
      <div className="absolute top-[20%] left-[10%] w-64 h-64 bg-teal-300/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[20%] right-[15%] w-80 h-80 bg-mist/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-[50%] right-[30%] w-48 h-48 bg-teal-300/3 rounded-full blur-3xl pointer-events-none" />

      {/* Floating deal cards — desktop only */}
      {dealCards.map((card) => (
        <FloatingDealCard key={card.name} card={card} prefersReducedMotion={prefersReducedMotion} />
      ))}

      {/* Main content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center"
      >
        {/* Badge with pulsing dot */}
        <motion.span
          variants={itemVariants}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-mist bg-bone px-4 py-1.5 text-sm text-neutral-300"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-[pulse_2s_ease-in-out_infinite] rounded-full bg-teal-300 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-300" />
          </span>
          Coming to Canada &mdash; Join the waitlist
        </motion.span>

        {/* H1 — Two-tone heading, MUCH bigger */}
        <motion.h1
          variants={itemVariants}
          className="font-medium tracking-[-0.04em] text-5xl md:text-7xl lg:text-8xl"
          style={{ lineHeight: 1.05 }}
        >
          <span className="text-neutral-200">Save more.</span>
          <br />
          <span className="text-carbon">Experience more.</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          variants={itemVariants}
          className="mt-8 max-w-lg text-lg text-neutral-300"
          style={{ lineHeight: 1.7 }}
        >
          Unlock exclusive deals on dining, wellness, and experiences across
          Canada.
        </motion.p>

        {/* Waitlist Form */}
        <motion.div
          variants={itemVariants}
          className="mt-10 flex w-full justify-center"
        >
          <WaitlistForm />
        </motion.div>

        {/* Social Proof — Animated counter */}
        <motion.p
          ref={counterRef}
          variants={itemVariants}
          className="mt-5 text-sm text-neutral-200"
        >
          Join {prefersReducedMotion ? "1,200" : count.toLocaleString()}+ Canadians already on the waitlist
        </motion.p>
      </motion.div>
    </section>
  )
}
