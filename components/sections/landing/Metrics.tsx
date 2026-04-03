"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion"

const EASE = [0.23, 1, 0.32, 1] as const

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const blurUp = {
  hidden: { opacity: 0, filter: "blur(6px)", y: 80 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
}

const blurUpReduced = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
}

const TARGET = 2_000_000

export default function Metrics() {
  const prefersReduced = useReducedMotion()
  const sectionRef = useRef<HTMLDivElement>(null)
  const [displayValue, setDisplayValue] = useState(0)
  const hasCompleted = useRef(false)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  /* Map scroll progress to a 0-1 range for the counter.
     The number should reach its target roughly when the section
     is centered in the viewport (scrollYProgress ~0.3-0.6). */
  const counterProgress = useTransform(
    scrollYProgress,
    [0.15, 0.55],
    [0, 1]
  )

  useMotionValueEvent(counterProgress, "change", (latest) => {
    if (prefersReduced) {
      setDisplayValue(TARGET)
      return
    }
    if (hasCompleted.current) return

    const clamped = Math.min(Math.max(latest, 0), 1)
    /* Apply an ease-out curve for a more natural ramp */
    const eased = 1 - Math.pow(1 - clamped, 3)
    const value = Math.round(eased * TARGET)
    setDisplayValue(value)

    if (clamped >= 1) {
      hasCompleted.current = true
      setDisplayValue(TARGET)
    }
  })

  /* Set immediately for reduced motion */
  const setImmediate = useCallback(() => {
    if (prefersReduced) {
      setDisplayValue(TARGET)
    }
  }, [prefersReduced])

  useEffect(() => {
    setImmediate()
  }, [setImmediate])

  const itemVariant = prefersReduced ? blurUpReduced : blurUp
  const containerVariant = prefersReduced
    ? { hidden: {}, visible: {} }
    : container

  const formattedValue =
    displayValue >= TARGET
      ? "$2M+"
      : `$${displayValue.toLocaleString()}+`

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 px-6"
      style={{ backgroundColor: "#162028" }}
    >
      <motion.div
        className="mx-auto max-w-4xl"
        variants={containerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        <motion.div
          variants={itemVariant}
          className="rounded-2xl border border-white/10 bg-white/[0.05] p-12 md:p-16 text-center"
        >
          {/* Label */}
          <p
            className="text-xs uppercase text-neutral-400 mb-8"
            style={{ letterSpacing: "0.1em", fontSize: "11px" }}
          >
            Savings you can count on
          </p>

          {/* Big number with blur entrance */}
          <motion.p
            className="text-6xl md:text-8xl lg:text-[10rem] font-medium text-teal-300"
            style={{
              letterSpacing: "-0.04em",
              lineHeight: 1.1,
            }}
            initial={
              prefersReduced
                ? { opacity: 1 }
                : { opacity: 0, filter: "blur(12px)" }
            }
            whileInView={
              prefersReduced
                ? { opacity: 1 }
                : { opacity: 1, filter: "blur(0px)" }
            }
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            {formattedValue}
          </motion.p>

          {/* Description */}
          <p
            className="text-base text-neutral-400 max-w-md mx-auto mt-4"
            style={{ lineHeight: 1.7 }}
          >
            The total savings our members have unlocked across Canada.
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}
