"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { motion, useReducedMotion, useInView } from "framer-motion"
import WaitlistForm from "@/components/shared/WaitlistForm"

const EASE = [0.25, 0.1, 0.25, 1] as const

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
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
      // Ease out cubic
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
      className="flex min-h-[90vh] items-center justify-center px-4 md:px-6"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto flex max-w-2xl flex-col items-center text-center"
      >
        {/* Badge */}
        <motion.span
          variants={itemVariants}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-mist bg-bone px-4 py-1.5 text-sm text-neutral-300"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-teal-300" />
          Coming to Canada &mdash; Join the waitlist
        </motion.span>

        {/* H1 — Two-tone heading */}
        <motion.h1
          variants={itemVariants}
          className="font-medium tracking-[-0.04em]"
          style={{
            fontSize: "clamp(2.5rem, 6vw + 1rem, 4rem)",
            lineHeight: 1.05,
          }}
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
