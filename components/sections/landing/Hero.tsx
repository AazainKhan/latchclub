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
  color: string
}

const dealCards: DealCard[] = [
  {
    category: "Dining",
    name: "Kinka Izakaya",
    description: "2-for-1 Dinner",
    badge: "50% OFF",
    top: "12%",
    left: "4%",
    rotate: -6,
    delay: 0,
    color: "from-orange-400 to-red-400",
  },
  {
    category: "Wellness",
    name: "Scandinave Spa",
    description: "Day Pass",
    badge: "$45 OFF",
    top: "8%",
    right: "5%",
    rotate: 4,
    delay: 0.8,
    color: "from-teal-300 to-cyan-400",
  },
  {
    category: "Experiences",
    name: "ROM Tickets",
    description: "Family Pack",
    badge: "BOGO",
    bottom: "24%",
    left: "5%",
    rotate: 3,
    delay: 1.6,
    color: "from-violet-400 to-indigo-400",
  },
  {
    category: "Fitness",
    name: "Barry's Bootcamp",
    description: "First Month",
    badge: "40% OFF",
    bottom: "18%",
    right: "4%",
    rotate: -4,
    delay: 2.4,
    color: "from-pink-400 to-rose-400",
  },
  {
    category: "Travel",
    name: "Porter Airlines",
    description: "Weekend Getaway",
    badge: "$120 OFF",
    top: "44%",
    right: "2%",
    rotate: 5,
    delay: 3.2,
    color: "from-sky-400 to-blue-400",
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
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1.2 + card.delay * 0.3, ease: EASE }}
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
        <div className="rounded-xl border border-white/10 bg-white/[0.07] backdrop-blur-sm p-4 max-w-[160px]">
          {/* Category color indicator */}
          <div className={`h-2 w-8 rounded-full bg-gradient-to-r ${card.color} mb-2 opacity-80`} />
          <p className="text-[11px] tracking-[0.08em] uppercase text-white/40">{card.category}</p>
          <p className="text-sm font-medium text-white mt-1 tracking-[-0.01em]">{card.name}</p>
          <p className="text-[11px] text-white/40 mt-0.5">{card.description}</p>
          <span className="inline-block mt-2 text-[10px] font-medium bg-teal-300/20 text-teal-300 px-2 py-0.5 rounded-full">
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
      style={{ backgroundColor: "#162028" }}
    >
      {/* Subtle ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(3, 164, 147, 0.08), transparent)",
        }}
      />

      {/* Floating deal cards — desktop only */}
      {dealCards.map((card) => (
        <FloatingDealCard key={card.name} card={card} prefersReducedMotion={prefersReducedMotion} />
      ))}

      {/* Main content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center"
      >
        {/* Badge with pulsing teal dot */}
        <motion.span
          variants={itemVariants}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/[0.15] bg-white/5 px-4 py-1.5 text-sm text-white/70"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-[pulse_2s_ease-in-out_infinite] rounded-full bg-teal-300 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-300" />
          </span>
          Coming to Canada &mdash; Join the waitlist
        </motion.span>

        {/* H1 — Large two-tone heading on dark */}
        <motion.h1
          variants={itemVariants}
          className="font-medium uppercase tracking-[-0.04em] text-5xl md:text-7xl lg:text-[5.5rem]"
          style={{ lineHeight: 0.95 }}
        >
          <span className="text-neutral-400">Save more.</span>
          <br />
          <span className="text-white">Experience more.</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          variants={itemVariants}
          className="mt-8 max-w-md text-base text-neutral-400"
          style={{ lineHeight: 1.7 }}
        >
          Unlock exclusive deals on dining, wellness, and experiences across
          Canada.
        </motion.p>

        {/* Waitlist Form — dark variant */}
        <motion.div
          variants={itemVariants}
          className="mt-10 flex w-full justify-center"
        >
          <WaitlistForm variant="dark" />
        </motion.div>

        {/* Social Proof — Animated counter */}
        <motion.p
          ref={counterRef}
          variants={itemVariants}
          className="mt-5 text-sm text-neutral-400"
        >
          Join {prefersReducedMotion ? "1,200" : count.toLocaleString()}+ Canadians already on the waitlist
        </motion.p>
      </motion.div>

      {/* Bottom gradient transition to next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, #F5F7F7)",
        }}
      />
    </section>
  )
}
